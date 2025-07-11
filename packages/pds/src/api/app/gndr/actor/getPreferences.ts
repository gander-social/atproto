import { AuthScope } from '../../../../auth-verifier'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'

export default function (server: Server, ctx: AppContext) {
  if (!ctx.gndrAppView) return

  server.app.gndr.actor.getPreferences({
    auth: ctx.authVerifier.accessStandard({
      additional: [AuthScope.Takendown],
    }),
    handler: async ({ auth }) => {
      const requester = auth.credentials.did
      const preferences = await ctx.actorStore.read(requester, (store) =>
        store.pref.getPreferences('app.gndr', auth.credentials.scope),
      )
      return {
        encoding: 'application/json',
        body: { preferences },
      }
    },
  })
}
