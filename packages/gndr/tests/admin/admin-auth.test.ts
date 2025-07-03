import assert from 'node:assert'
import { AtpAgent } from '@atproto/api'
import { Secp256k1Keypair } from '@atproto/crypto'
import { SeedClient, TestNetwork, usersSeed } from '@atproto/dev-env'
import { createServiceAuthHeaders } from '@atproto/xrpc-server'
import { ids } from '../../src/lexicon/lexicons'
import {
  RepoRef,
  isRepoRef,
} from '../../src/lexicon/types/com/atproto/admin/defs'
import { $Typed } from '../../src/lexicon/util'

describe('admin auth', () => {
  let network: TestNetwork
  let agent: AtpAgent
  let sc: SeedClient

  let repoSubject: $Typed<RepoRef>

  const modServiceDid = 'did:example:mod'
  const altModDid = 'did:example:alt'
  let modServiceKey: Secp256k1Keypair
  let gndrDid: string

  beforeAll(async () => {
    network = await TestNetwork.create({
      dbPostgresSchema: 'gndr_admin_auth',
      gndr: {
        modServiceDid,
      },
    })

    gndrDid = network.gndr.ctx.cfg.serverDid

    modServiceKey = await Secp256k1Keypair.create()
    const origResolve = network.gndr.dataplane.idResolver.did.resolve
    network.gndr.dataplane.idResolver.did.resolve = async function (
      did: string,
      forceRefresh?: boolean,
    ) {
      if (did === modServiceDid || did === altModDid) {
        return {
          '@context': [
            'https://www.w3.org/ns/did/v1',
            'https://w3id.org/security/multikey/v1',
            'https://w3id.org/security/suites/secp256k1-2019/v1',
          ],
          id: did,
          verificationMethod: [
            {
              id: `${did}#atproto`,
              type: 'Multikey',
              controller: did,
              publicKeyMultibase: modServiceKey.did().replace('did:key:', ''),
            },
          ],
        }
      }
      return origResolve.call(this, did, forceRefresh)
    }

    agent = network.gndr.getClient()
    sc = network.getSeedClient()
    await usersSeed(sc)
    await network.processAll()
    repoSubject = {
      $type: 'com.atproto.admin.defs#repoRef',
      did: sc.dids.bob,
    }
  })

  afterAll(async () => {
    await network.close()
  })

  it('allows service auth requests from the configured appview did', async () => {
    const updateHeaders = await createServiceAuthHeaders({
      iss: modServiceDid,
      aud: gndrDid,
      lxm: ids.ComAtprotoAdminUpdateSubjectStatus,
      keypair: modServiceKey,
    })
    await agent.api.com.atproto.admin.updateSubjectStatus(
      {
        subject: repoSubject,
        takedown: { applied: true, ref: 'test-repo' },
      },
      {
        ...updateHeaders,
        encoding: 'application/json',
      },
    )

    const getHeaders = await createServiceAuthHeaders({
      iss: modServiceDid,
      aud: gndrDid,
      lxm: ids.ComAtprotoAdminGetSubjectStatus,
      keypair: modServiceKey,
    })
    const res = await agent.api.com.atproto.admin.getSubjectStatus(
      { did: repoSubject.did },
      getHeaders,
    )
    assert(isRepoRef(res.data.subject))
    expect(res.data.subject.did).toBe(repoSubject.did)
    expect(res.data.takedown?.applied).toBe(true)
  })

  it('does not allow requests from another did', async () => {
    const headers = await createServiceAuthHeaders({
      iss: altModDid,
      aud: gndrDid,
      lxm: ids.ComAtprotoAdminUpdateSubjectStatus,
      keypair: modServiceKey,
    })
    const attempt = agent.api.com.atproto.admin.updateSubjectStatus(
      {
        subject: repoSubject,
        takedown: { applied: true, ref: 'test-repo' },
      },
      {
        ...headers,
        encoding: 'application/json',
      },
    )
    await expect(attempt).rejects.toThrow('Untrusted issuer')
  })

  it('does not allow requests from an authenticated user', async () => {
    const aliceKey = await network.pds.ctx.actorStore.keypair(sc.dids.alice)
    const headers = await createServiceAuthHeaders({
      iss: sc.dids.alice,
      aud: gndrDid,
      lxm: ids.ComAtprotoAdminUpdateSubjectStatus,
      keypair: aliceKey,
    })
    const attempt = agent.api.com.atproto.admin.updateSubjectStatus(
      {
        subject: repoSubject,
        takedown: { applied: true, ref: 'test-repo' },
      },
      {
        ...headers,
        encoding: 'application/json',
      },
    )
    await expect(attempt).rejects.toThrow('Untrusted issuer')
  })

  it('does not allow requests with a bad signature', async () => {
    const badKey = await Secp256k1Keypair.create()
    const headers = await createServiceAuthHeaders({
      iss: modServiceDid,
      aud: gndrDid,
      lxm: ids.ComAtprotoAdminUpdateSubjectStatus,
      keypair: badKey,
    })
    const attempt = agent.api.com.atproto.admin.updateSubjectStatus(
      {
        subject: repoSubject,
        takedown: { applied: true, ref: 'test-repo' },
      },
      {
        ...headers,
        encoding: 'application/json',
      },
    )
    await expect(attempt).rejects.toThrow(
      'jwt signature does not match jwt issuer',
    )
  })

  it('does not allow requests with a bad aud', async () => {
    // repo subject is bob, so we set alice as the audience
    const headers = await createServiceAuthHeaders({
      iss: modServiceDid,
      aud: sc.dids.alice,
      lxm: ids.ComAtprotoAdminUpdateSubjectStatus,
      keypair: modServiceKey,
    })
    const attempt = agent.api.com.atproto.admin.updateSubjectStatus(
      {
        subject: repoSubject,
        takedown: { applied: true, ref: 'test-repo' },
      },
      {
        ...headers,
        encoding: 'application/json',
      },
    )
    await expect(attempt).rejects.toThrow(
      'jwt audience does not match service did',
    )
  })
})
