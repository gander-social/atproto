import { InvalidRequestError } from '@atproto/xrpc-server'
import { AccountPreference } from '../../../../actor-store/preference/reader'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'

export default function (server: Server, ctx: AppContext) {
  if (!ctx.gndrAppView) return

  server.app.gndr.actor.putPreferences({
    auth: ctx.authVerifier.accessStandard({ checkTakedown: true }),
    handler: async ({ auth, input }) => {
      const { preferences } = input.body
      const requester = auth.credentials.did
      const checkedPreferences: AccountPreference[] = []
      for (const pref of preferences) {
        if (typeof pref.$type === 'string') {
          checkedPreferences.push(pref as AccountPreference)
        } else {
          throw new InvalidRequestError('Preference is missing a $type')
        }
      }
      await ctx.actorStore.transact(requester, async (actorTxn) => {
        await actorTxn.pref.putPreferences(
          checkedPreferences,
          'app.gndr',
          auth.credentials.scope,
        )
      })
    },
  })
}
