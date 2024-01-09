import { createContext } from 'react'
import * as DelightRPC from 'delight-rpc'
import { IAppMainAPI } from '@src/contract.js'
import { Subject } from 'rxjs'

export const MainAPIContext = createContext<DelightRPC.ClientProxy<IAppMainAPI>>(
  {} as DelightRPC.ClientProxy<IAppMainAPI>
)

export const urlUpdatedObservable = new Subject<string>()
