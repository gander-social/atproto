/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util'
import type * as AppGndrActorDefs from '../actor/defs.js'
import type * as AppGndrEmbedImages from '../embed/images.js'
import type * as AppGndrEmbedVideo from '../embed/video.js'
import type * as AppGndrEmbedExternal from '../embed/external.js'
import type * as AppGndrEmbedRecord from '../embed/record.js'
import type * as AppGndrEmbedRecordWithMedia from '../embed/recordWithMedia.js'
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js'
import type * as AppGndrRichtextFacet from '../richtext/facet.js'
import type * as AppGndrGraphDefs from '../graph/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'app.gndr.feed.defs'

export interface PostView {
  $type?: 'app.gndr.feed.defs#postView'
  uri: string
  cid: string
  author: AppGndrActorDefs.ProfileViewBasic
  record: { [_ in string]: unknown }
  embed?:
    | $Typed<AppGndrEmbedImages.View>
    | $Typed<AppGndrEmbedVideo.View>
    | $Typed<AppGndrEmbedExternal.View>
    | $Typed<AppGndrEmbedRecord.View>
    | $Typed<AppGndrEmbedRecordWithMedia.View>
    | { $type: string }
  replyCount?: number
  repostCount?: number
  likeCount?: number
  quoteCount?: number
  indexedAt: string
  viewer?: ViewerState
  labels?: ComAtprotoLabelDefs.Label[]
  threadgate?: ThreadgateView
}

const hashPostView = 'postView'

export function isPostView<V>(v: V) {
  return is$typed(v, id, hashPostView)
}

export function validatePostView<V>(v: V) {
  return validate<PostView & V>(v, id, hashPostView)
}

/** Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests. */
export interface ViewerState {
  $type?: 'app.gndr.feed.defs#viewerState'
  repost?: string
  like?: string
  threadMuted?: boolean
  replyDisabled?: boolean
  embeddingDisabled?: boolean
  pinned?: boolean
}

const hashViewerState = 'viewerState'

export function isViewerState<V>(v: V) {
  return is$typed(v, id, hashViewerState)
}

export function validateViewerState<V>(v: V) {
  return validate<ViewerState & V>(v, id, hashViewerState)
}

/** Metadata about this post within the context of the thread it is in. */
export interface ThreadContext {
  $type?: 'app.gndr.feed.defs#threadContext'
  rootAuthorLike?: string
}

const hashThreadContext = 'threadContext'

export function isThreadContext<V>(v: V) {
  return is$typed(v, id, hashThreadContext)
}

export function validateThreadContext<V>(v: V) {
  return validate<ThreadContext & V>(v, id, hashThreadContext)
}

export interface FeedViewPost {
  $type?: 'app.gndr.feed.defs#feedViewPost'
  post: PostView
  reply?: ReplyRef
  reason?: $Typed<ReasonRepost> | $Typed<ReasonPin> | { $type: string }
  /** Context provided by feed generator that may be passed back alongside interactions. */
  feedContext?: string
  /** Unique identifier per request that may be passed back alongside interactions. */
  reqId?: string
}

const hashFeedViewPost = 'feedViewPost'

export function isFeedViewPost<V>(v: V) {
  return is$typed(v, id, hashFeedViewPost)
}

export function validateFeedViewPost<V>(v: V) {
  return validate<FeedViewPost & V>(v, id, hashFeedViewPost)
}

export interface ReplyRef {
  $type?: 'app.gndr.feed.defs#replyRef'
  root:
    | $Typed<PostView>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | { $type: string }
  parent:
    | $Typed<PostView>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | { $type: string }
  grandparentAuthor?: AppGndrActorDefs.ProfileViewBasic
}

const hashReplyRef = 'replyRef'

export function isReplyRef<V>(v: V) {
  return is$typed(v, id, hashReplyRef)
}

export function validateReplyRef<V>(v: V) {
  return validate<ReplyRef & V>(v, id, hashReplyRef)
}

export interface ReasonRepost {
  $type?: 'app.gndr.feed.defs#reasonRepost'
  by: AppGndrActorDefs.ProfileViewBasic
  uri?: string
  cid?: string
  indexedAt: string
}

const hashReasonRepost = 'reasonRepost'

export function isReasonRepost<V>(v: V) {
  return is$typed(v, id, hashReasonRepost)
}

export function validateReasonRepost<V>(v: V) {
  return validate<ReasonRepost & V>(v, id, hashReasonRepost)
}

export interface ReasonPin {
  $type?: 'app.gndr.feed.defs#reasonPin'
}

const hashReasonPin = 'reasonPin'

export function isReasonPin<V>(v: V) {
  return is$typed(v, id, hashReasonPin)
}

export function validateReasonPin<V>(v: V) {
  return validate<ReasonPin & V>(v, id, hashReasonPin)
}

export interface ThreadViewPost {
  $type?: 'app.gndr.feed.defs#threadViewPost'
  post: PostView
  parent?:
    | $Typed<ThreadViewPost>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | { $type: string }
  replies?: (
    | $Typed<ThreadViewPost>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | { $type: string }
  )[]
  threadContext?: ThreadContext
}

const hashThreadViewPost = 'threadViewPost'

export function isThreadViewPost<V>(v: V) {
  return is$typed(v, id, hashThreadViewPost)
}

export function validateThreadViewPost<V>(v: V) {
  return validate<ThreadViewPost & V>(v, id, hashThreadViewPost)
}

export interface NotFoundPost {
  $type?: 'app.gndr.feed.defs#notFoundPost'
  uri: string
  notFound: true
}

const hashNotFoundPost = 'notFoundPost'

export function isNotFoundPost<V>(v: V) {
  return is$typed(v, id, hashNotFoundPost)
}

export function validateNotFoundPost<V>(v: V) {
  return validate<NotFoundPost & V>(v, id, hashNotFoundPost)
}

export interface BlockedPost {
  $type?: 'app.gndr.feed.defs#blockedPost'
  uri: string
  blocked: true
  author: BlockedAuthor
}

const hashBlockedPost = 'blockedPost'

export function isBlockedPost<V>(v: V) {
  return is$typed(v, id, hashBlockedPost)
}

export function validateBlockedPost<V>(v: V) {
  return validate<BlockedPost & V>(v, id, hashBlockedPost)
}

export interface BlockedAuthor {
  $type?: 'app.gndr.feed.defs#blockedAuthor'
  did: string
  viewer?: AppGndrActorDefs.ViewerState
}

const hashBlockedAuthor = 'blockedAuthor'

export function isBlockedAuthor<V>(v: V) {
  return is$typed(v, id, hashBlockedAuthor)
}

export function validateBlockedAuthor<V>(v: V) {
  return validate<BlockedAuthor & V>(v, id, hashBlockedAuthor)
}

export interface GeneratorView {
  $type?: 'app.gndr.feed.defs#generatorView'
  uri: string
  cid: string
  did: string
  creator: AppGndrActorDefs.ProfileView
  displayName: string
  description?: string
  descriptionFacets?: AppGndrRichtextFacet.Main[]
  avatar?: string
  likeCount?: number
  acceptsInteractions?: boolean
  labels?: ComAtprotoLabelDefs.Label[]
  viewer?: GeneratorViewerState
  contentMode?:
    | 'app.gndr.feed.defs#contentModeUnspecified'
    | 'app.gndr.feed.defs#contentModeVideo'
    | (string & {})
  indexedAt: string
}

const hashGeneratorView = 'generatorView'

export function isGeneratorView<V>(v: V) {
  return is$typed(v, id, hashGeneratorView)
}

export function validateGeneratorView<V>(v: V) {
  return validate<GeneratorView & V>(v, id, hashGeneratorView)
}

export interface GeneratorViewerState {
  $type?: 'app.gndr.feed.defs#generatorViewerState'
  like?: string
}

const hashGeneratorViewerState = 'generatorViewerState'

export function isGeneratorViewerState<V>(v: V) {
  return is$typed(v, id, hashGeneratorViewerState)
}

export function validateGeneratorViewerState<V>(v: V) {
  return validate<GeneratorViewerState & V>(v, id, hashGeneratorViewerState)
}

export interface SkeletonFeedPost {
  $type?: 'app.gndr.feed.defs#skeletonFeedPost'
  post: string
  reason?:
    | $Typed<SkeletonReasonRepost>
    | $Typed<SkeletonReasonPin>
    | { $type: string }
  /** Context that will be passed through to client and may be passed to feed generator back alongside interactions. */
  feedContext?: string
}

const hashSkeletonFeedPost = 'skeletonFeedPost'

export function isSkeletonFeedPost<V>(v: V) {
  return is$typed(v, id, hashSkeletonFeedPost)
}

export function validateSkeletonFeedPost<V>(v: V) {
  return validate<SkeletonFeedPost & V>(v, id, hashSkeletonFeedPost)
}

export interface SkeletonReasonRepost {
  $type?: 'app.gndr.feed.defs#skeletonReasonRepost'
  repost: string
}

const hashSkeletonReasonRepost = 'skeletonReasonRepost'

export function isSkeletonReasonRepost<V>(v: V) {
  return is$typed(v, id, hashSkeletonReasonRepost)
}

export function validateSkeletonReasonRepost<V>(v: V) {
  return validate<SkeletonReasonRepost & V>(v, id, hashSkeletonReasonRepost)
}

export interface SkeletonReasonPin {
  $type?: 'app.gndr.feed.defs#skeletonReasonPin'
}

const hashSkeletonReasonPin = 'skeletonReasonPin'

export function isSkeletonReasonPin<V>(v: V) {
  return is$typed(v, id, hashSkeletonReasonPin)
}

export function validateSkeletonReasonPin<V>(v: V) {
  return validate<SkeletonReasonPin & V>(v, id, hashSkeletonReasonPin)
}

export interface ThreadgateView {
  $type?: 'app.gndr.feed.defs#threadgateView'
  uri?: string
  cid?: string
  record?: { [_ in string]: unknown }
  lists?: AppGndrGraphDefs.ListViewBasic[]
}

const hashThreadgateView = 'threadgateView'

export function isThreadgateView<V>(v: V) {
  return is$typed(v, id, hashThreadgateView)
}

export function validateThreadgateView<V>(v: V) {
  return validate<ThreadgateView & V>(v, id, hashThreadgateView)
}

export interface Interaction {
  $type?: 'app.gndr.feed.defs#interaction'
  item?: string
  event?:
    | 'app.gndr.feed.defs#requestLess'
    | 'app.gndr.feed.defs#requestMore'
    | 'app.gndr.feed.defs#clickthroughItem'
    | 'app.gndr.feed.defs#clickthroughAuthor'
    | 'app.gndr.feed.defs#clickthroughReposter'
    | 'app.gndr.feed.defs#clickthroughEmbed'
    | 'app.gndr.feed.defs#interactionSeen'
    | 'app.gndr.feed.defs#interactionLike'
    | 'app.gndr.feed.defs#interactionRepost'
    | 'app.gndr.feed.defs#interactionReply'
    | 'app.gndr.feed.defs#interactionQuote'
    | 'app.gndr.feed.defs#interactionShare'
    | (string & {})
  /** Context on a feed item that was originally supplied by the feed generator on getFeedSkeleton. */
  feedContext?: string
  /** Unique identifier per request that may be passed back alongside interactions. */
  reqId?: string
}

const hashInteraction = 'interaction'

export function isInteraction<V>(v: V) {
  return is$typed(v, id, hashInteraction)
}

export function validateInteraction<V>(v: V) {
  return validate<Interaction & V>(v, id, hashInteraction)
}

/** Request that less content like the given feed item be shown in the feed */
export const REQUESTLESS = `${id}#requestLess`
/** Request that more content like the given feed item be shown in the feed */
export const REQUESTMORE = `${id}#requestMore`
/** User clicked through to the feed item */
export const CLICKTHROUGHITEM = `${id}#clickthroughItem`
/** User clicked through to the author of the feed item */
export const CLICKTHROUGHAUTHOR = `${id}#clickthroughAuthor`
/** User clicked through to the reposter of the feed item */
export const CLICKTHROUGHREPOSTER = `${id}#clickthroughReposter`
/** User clicked through to the embedded content of the feed item */
export const CLICKTHROUGHEMBED = `${id}#clickthroughEmbed`
/** Declares the feed generator returns any types of posts. */
export const CONTENTMODEUNSPECIFIED = `${id}#contentModeUnspecified`
/** Declares the feed generator returns posts containing app.gndr.embed.video embeds. */
export const CONTENTMODEVIDEO = `${id}#contentModeVideo`
/** Feed item was seen by user */
export const INTERACTIONSEEN = `${id}#interactionSeen`
/** User liked the feed item */
export const INTERACTIONLIKE = `${id}#interactionLike`
/** User reposted the feed item */
export const INTERACTIONREPOST = `${id}#interactionRepost`
/** User replied to the feed item */
export const INTERACTIONREPLY = `${id}#interactionReply`
/** User quoted the feed item */
export const INTERACTIONQUOTE = `${id}#interactionQuote`
/** User shared the feed item */
export const INTERACTIONSHARE = `${id}#interactionShare`
