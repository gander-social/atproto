import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { OutputSchema } from '../../../../lexicon/types/app/gndr/feed/getActorLikes'
import {
  LocalRecords,
  LocalViewer,
  pipethroughReadAfterWrite,
} from '../../../../read-after-write'

export default function (server: Server, ctx: AppContext) {
  if (!ctx.gndrAppView) return

  server.app.gndr.feed.getActorLikes({
    auth: ctx.authVerifier.accessStandard(),
    handler: async (reqCtx) => {
      return pipethroughReadAfterWrite(ctx, reqCtx, getAuthorMunge)
    },
  })
}

const getAuthorMunge = async (
  localViewer: LocalViewer,
  original: OutputSchema,
  local: LocalRecords,
  requester: string,
): Promise<OutputSchema> => {
  const localProf = local.profile
  let feed = original.feed
  // first update any out of date profile pictures in feed
  if (localProf) {
    feed = feed.map((item) => {
      if (item.post.author.did === requester) {
        return {
          ...item,
          post: {
            ...item.post,
            author: localViewer.updateProfileViewBasic(
              item.post.author,
              localProf.record,
            ),
          },
        }
      } else {
        return item
      }
    })
  }
  return {
    ...original,
    feed,
  }
}
