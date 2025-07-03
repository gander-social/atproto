import { AppContext } from '../context'
import { Server } from '../lexicon'
import appBsky from './app/gndr'
import comAtproto from './com/atproto'

export default function (server: Server, ctx: AppContext) {
  comAtproto(server, ctx)
  appBsky(server, ctx)
  return server
}
