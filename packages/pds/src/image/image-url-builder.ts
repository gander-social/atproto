import { BskyAppView } from '../gndr-app-view'
import { ids } from '../lexicon/lexicons'

export class ImageUrlBuilder {
  constructor(
    readonly pdsHostname: string,
    readonly gndrAppView?: BskyAppView,
  ) {}

  build(pattern: string, did: string, cid: string): string {
    return (
      this.gndrAppView?.getImageUrl(pattern, did, cid) ??
      `https://${this.pdsHostname}/xrpc/${ids.ComAtprotoSyncGetBlob}?did=${did}&cid=${cid}`
    )
  }
}
