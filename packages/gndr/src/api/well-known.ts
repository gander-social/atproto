import { Router } from 'express'
import { AppContext } from '../context'

export const createRouter = (ctx: AppContext): Router => {
  const router = Router()

  const did = ctx.cfg.serverDid
  if (did.startsWith('did:web:')) {
    const hostname = did.slice('did:web:'.length)
    const serviceEndpoint = `https://${hostname}`

    router.get('/.well-known/did.json', (_req, res) => {
      res.json({
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://w3id.org/security/multikey/v1',
        ],
        id: did,
        verificationMethod: [
          {
            id: `${did}#atproto`,
            type: 'Multikey',
            controller: did,
            publicKeyMultibase: ctx.signingKey.did().replace('did:key:', ''),
          },
        ],
        service: [
          {
            id: '#gndr_notif',
            type: 'GndrNotificationService',
            serviceEndpoint,
          },
          {
            id: '#gndr_appview',
            type: 'GndrAppView',
            serviceEndpoint,
          },
        ],
      })
    })
  }

  return router
}
