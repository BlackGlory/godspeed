import { app, BrowserWindow, BrowserView, shell } from 'electron'
import { isDev } from '@main/utils/is-dev.js'
import { getResourcePath } from '@main/utils/paths.js'
import contextMenu from 'electron-context-menu'

export async function createAppWindow(): Promise<{
  window: BrowserWindow
  view: BrowserView
  load(): Promise<void>
}> {
  const window = new BrowserWindow({
    width: 1024
  , height: 768
  , resizable: true
  , autoHideMenuBar: true
  , show: !(
      app.getLoginItemSettings().wasOpenedAsHidden ||
      app.commandLine.hasSwitch('hidden')
    )
  , webPreferences: {
      preload: getResourcePath('lib/renderer/app-preload.cjs')
    , devTools: true
    , backgroundThrottling: false
    }
  })

  // 阻止在Electron里打开新链接
  window.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 将关闭窗口改为隐藏窗口
  window.addListener('close', evt => {
    evt.preventDefault()
    window.hide()
  })

  const view = new BrowserView({
    webPreferences: { devTools: true }
  })

  window.setBrowserView(view)

  const [windowContentWidth, windowContentHeight] = window.getContentSize()
  const addressBarHeight = 49
  view.setBounds({
    x: 0
  , y: addressBarHeight
  , width: windowContentWidth
  , height: windowContentHeight - addressBarHeight
  })
  view.setAutoResize({
    width: true
  , height: true
  })

  // https://github.com/sindresorhus/electron-context-menu/pull/127#issue-776326691
  view.webContents.addListener('did-finish-load', () => {
    contextMenu({
      window: view
    , showCopyLink: true
    , showCopyImage: true
    , showCopyImageAddress: true
    , showSaveImageAs: true
    , showCopyVideoAddress: true
    , showSaveVideoAs: true
    , showInspectElement: true
    })
  })

  view.webContents.addListener('page-title-updated', (e, title) => {
    window.setTitle(title)
  })

  await view.webContents.loadURL('about:blank')

  return {
    window
  , view
  , async load() {
      await window.loadURL(
        isDev()
        ? 'http://localhost:8080/app.html'
        : `file://${getResourcePath('dist/app.html')}`
      )

      if (isDev()) {
        window.webContents.openDevTools({ mode: 'detach' })
      }
    }
  }
}
