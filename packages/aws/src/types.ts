// @NOTE keep in sync with same interface in gndr/src/image/invalidator.ts
// this is separate to avoid the dependency on @atproto/gndr.
export interface ImageInvalidator {
  invalidate(subject: string, paths: string[]): Promise<void>
}
