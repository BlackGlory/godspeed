import { IAppRendererAPI } from '@src/contract.js'
import { ImplementationOf } from 'delight-rpc'
import { urlUpdatedObservable } from '@renderer/app-context.js'

export const api: ImplementationOf<IAppRendererAPI> = {
  ping() {
    return 'pong'
  }

, urlUpdated(url) {
    urlUpdatedObservable.next(url)
  }
}
