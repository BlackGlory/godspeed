import { app, ipcMain } from 'electron'
import { setupTray } from './tray.js'
import { createAppWindow } from '@windows/app.js'
import { createClientInMain } from '@delight-rpc/electron'
import { createServerInMain } from '@delight-rpc/electron'
import { createAppMainAPI } from './apis/app.js'
import * as DelightRPC from 'delight-rpc'
import { Deferred } from 'extra-promise'
import { IAppRendererAPI } from '@src/contract.js'
import { go } from '@blackglory/prelude'

// https://github.com/electron/electron/issues/40719
go(async () => {
  await app.whenReady()

  const {
    window: appWindow
  , view: appView
  , load: loadAppWindow
  } = await createAppWindow()
  setupTray({ appWindow, appView })

  const appRendererClientPromise = new Deferred<DelightRPC.ClientProxy<IAppRendererAPI>>()

  ipcMain.on('app-message-port-for-server', async event => {
    const [port] = event.ports
    port.start()
    const appMainAPI = createAppMainAPI({ appView })
    createServerInMain(appMainAPI, port)
  })

  ipcMain.on('app-message-port-for-client', event => {
    const [port] = event.ports
    port.start()
    const [client] = createClientInMain<IAppRendererAPI>(port)
    appRendererClientPromise.resolve(client)

    appView.webContents.addListener('did-navigate', async (e, url) => {
      await client.urlUpdated(url)
    })

    appView.webContents.addListener('did-navigate-in-page', async (e, url) => {
      await client.urlUpdated(url)
    })
  })

  await loadAppWindow()
})
