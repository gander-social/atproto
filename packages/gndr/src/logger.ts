import { IncomingMessage } from 'node:http'
import { stdSerializers } from 'pino'
import { pinoHttp } from 'pino-http'
import { obfuscateHeaders, subsystemLogger } from '@atproto/common'

export const dbLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:db')
export const cacheLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:cache')
export const subLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:sub')
export const labelerLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:labeler')
export const hydrationLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:hydration')
export const featureGatesLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:featuregates')
export const dataplaneLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr:dp')
export const httpLogger: ReturnType<typeof subsystemLogger> =
  subsystemLogger('gndr')

export const loggerMiddleware = pinoHttp({
  logger: httpLogger,
  serializers: {
    err: (err: unknown) => ({
      code: err?.['code'],
      message: err?.['message'],
    }),
    req: (req: IncomingMessage) => {
      const serialized = stdSerializers.req(req)
      const headers = obfuscateHeaders(serialized.headers)
      return { ...serialized, headers }
    },
  },
})
