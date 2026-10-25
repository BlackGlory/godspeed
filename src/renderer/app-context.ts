import * as DelightRPC from 'delight-rpc'
import { createStrictContext } from 'extra-react-hooks'
import { IAppMainAPI } from '@src/contract.js'
import { Subject } from 'rxjs'

export const MainAPIContext = createStrictContext<DelightRPC.ClientProxy<IAppMainAPI>>()

export const urlUpdatedObservable = new Subject<string>()
