import * as DelightRPC from 'delight-rpc'
import { IAppMainAPI } from '@src/contract.js'
import { BrowserView } from 'electron'

export function createAppMainAPI(
  { appView }: {
    appView: BrowserView
  }
): DelightRPC.ImplementationOf<IAppMainAPI> {
  return {
    ping() {
      return 'pong'
    }

  , async navigate(url) {
      appView.webContents.focus()
      await appView.webContents.loadURL(url)
    }

  , canGoBack() {
      return appView.webContents.canGoBack()
    }
  , goBack() {
      appView.webContents.goBack()
    }

  , canGoForward() {
      return appView.webContents.canGoBack()
    }
  , goForward() {
      appView.webContents.goForward()
    }

  , refresh() {
      appView.webContents.reload()
    }
  }
}
