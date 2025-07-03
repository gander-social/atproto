import { AppContext } from '../context'
import { Server } from '../lexicon'
import getProfile from './app/gndr/actor/getProfile'
import getProfiles from './app/gndr/actor/getProfiles'
import getSuggestions from './app/gndr/actor/getSuggestions'
import searchActors from './app/gndr/actor/searchActors'
import searchActorsTypeahead from './app/gndr/actor/searchActorsTypeahead'
import getActorFeeds from './app/gndr/feed/getActorFeeds'
import getActorLikes from './app/gndr/feed/getActorLikes'
import getAuthorFeed from './app/gndr/feed/getAuthorFeed'
import getFeed from './app/gndr/feed/getFeed'
import getFeedGenerator from './app/gndr/feed/getFeedGenerator'
import getFeedGenerators from './app/gndr/feed/getFeedGenerators'
import getLikes from './app/gndr/feed/getLikes'
import getListFeed from './app/gndr/feed/getListFeed'
import getPostThread from './app/gndr/feed/getPostThread'
import getPosts from './app/gndr/feed/getPosts'
import getQuotes from './app/gndr/feed/getQuotes'
import getRepostedBy from './app/gndr/feed/getRepostedBy'
import getSuggestedFeeds from './app/gndr/feed/getSuggestedFeeds'
import getTimeline from './app/gndr/feed/getTimeline'
import searchPosts from './app/gndr/feed/searchPosts'
import getActorStarterPacks from './app/gndr/graph/getActorStarterPacks'
import getBlocks from './app/gndr/graph/getBlocks'
import getFollowers from './app/gndr/graph/getFollowers'
import getFollows from './app/gndr/graph/getFollows'
import getKnownFollowers from './app/gndr/graph/getKnownFollowers'
import getList from './app/gndr/graph/getList'
import getListBlocks from './app/gndr/graph/getListBlocks'
import getListMutes from './app/gndr/graph/getListMutes'
import getLists from './app/gndr/graph/getLists'
import getMutes from './app/gndr/graph/getMutes'
import getRelationships from './app/gndr/graph/getRelationships'
import getStarterPack from './app/gndr/graph/getStarterPack'
import getStarterPacks from './app/gndr/graph/getStarterPacks'
import getSuggestedFollowsByActor from './app/gndr/graph/getSuggestedFollowsByActor'
import muteActor from './app/gndr/graph/muteActor'
import muteActorList from './app/gndr/graph/muteActorList'
import muteThread from './app/gndr/graph/muteThread'
import searchStarterPacks from './app/gndr/graph/searchStarterPacks'
import unmuteActor from './app/gndr/graph/unmuteActor'
import unmuteActorList from './app/gndr/graph/unmuteActorList'
import unmuteThread from './app/gndr/graph/unmuteThread'
import getLabelerServices from './app/gndr/labeler/getServices'
import getUnreadCount from './app/gndr/notification/getUnreadCount'
import listNotifications from './app/gndr/notification/listNotifications'
import putPreferences from './app/gndr/notification/putPreferences'
import registerPush from './app/gndr/notification/registerPush'
import updateSeen from './app/gndr/notification/updateSeen'
import getConfig from './app/gndr/unspecced/getConfig'
import getPopularFeedGenerators from './app/gndr/unspecced/getPopularFeedGenerators'
import getPostThreadHiddenV2 from './app/gndr/unspecced/getPostThreadHiddenV2'
import getPostThreadV2 from './app/gndr/unspecced/getPostThreadV2'
import getUnspeccedSuggestedFeeds from './app/gndr/unspecced/getSuggestedFeeds'
import getSuggestedStarterPacks from './app/gndr/unspecced/getSuggestedStarterPacks'
import getSuggestedUsers from './app/gndr/unspecced/getSuggestedUsers'
import getTaggedSuggestions from './app/gndr/unspecced/getTaggedSuggestions'
import getTrendingTopics from './app/gndr/unspecced/getTrendingTopics'
import getTrends from './app/gndr/unspecced/getTrends'
import getAccountInfos from './com/atproto/admin/getAccountInfos'
import getSubjectStatus from './com/atproto/admin/getSubjectStatus'
import updateSubjectStatus from './com/atproto/admin/updateSubjectStatus'
import resolveHandle from './com/atproto/identity/resolveHandle'
import queryLabels from './com/atproto/label/queryLabels'
import getRecord from './com/atproto/repo/getRecord'
import fetchLabels from './com/atproto/temp/fetchLabels'

export * as health from './health'

export * as wellKnown from './well-known'

export * as blobResolver from './blob-resolver'

export default function (server: Server, ctx: AppContext) {
  // app.gndr
  getTimeline(server, ctx)
  getActorFeeds(server, ctx)
  getSuggestedFeeds(server, ctx)
  getAuthorFeed(server, ctx)
  getFeed(server, ctx)
  getFeedGenerator(server, ctx)
  getFeedGenerators(server, ctx)
  getLikes(server, ctx)
  getListFeed(server, ctx)
  getQuotes(server, ctx)
  getPostThread(server, ctx)
  getPostThreadHiddenV2(server, ctx)
  getPostThreadV2(server, ctx)
  getPosts(server, ctx)
  searchPosts(server, ctx)
  getActorLikes(server, ctx)
  getProfile(server, ctx)
  getProfiles(server, ctx)
  getRepostedBy(server, ctx)
  getActorStarterPacks(server, ctx)
  getBlocks(server, ctx)
  getListBlocks(server, ctx)
  getFollowers(server, ctx)
  getKnownFollowers(server, ctx)
  getFollows(server, ctx)
  getList(server, ctx)
  getLists(server, ctx)
  getListMutes(server, ctx)
  getMutes(server, ctx)
  getRelationships(server, ctx)
  getStarterPack(server, ctx)
  getStarterPacks(server, ctx)
  searchStarterPacks(server, ctx)
  muteActor(server, ctx)
  unmuteActor(server, ctx)
  muteActorList(server, ctx)
  unmuteActorList(server, ctx)
  muteThread(server, ctx)
  unmuteThread(server, ctx)
  getSuggestedFollowsByActor(server, ctx)
  getTrendingTopics(server, ctx)
  getTrends(server, ctx)
  getSuggestedStarterPacks(server, ctx)
  getSuggestedUsers(server, ctx)
  getUnspeccedSuggestedFeeds(server, ctx)
  getLabelerServices(server, ctx)
  searchActors(server, ctx)
  searchActorsTypeahead(server, ctx)
  getSuggestions(server, ctx)
  getUnreadCount(server, ctx)
  listNotifications(server, ctx)
  updateSeen(server, ctx)
  putPreferences(server, ctx)
  registerPush(server, ctx)
  getConfig(server, ctx)
  getPopularFeedGenerators(server, ctx)
  getTaggedSuggestions(server, ctx)
  // com.atproto
  getSubjectStatus(server, ctx)
  updateSubjectStatus(server, ctx)
  getAccountInfos(server, ctx)
  resolveHandle(server, ctx)
  getRecord(server, ctx)
  fetchLabels(server, ctx)
  queryLabels(server, ctx)
  return server
}
