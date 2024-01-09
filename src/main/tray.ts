import { app, Tray, Menu, MenuItem, BrowserWindow, BrowserView } from 'electron'
import { assert, isUndefined } from '@blackglory/prelude'

export let tray: Tray | undefined // prevent GC

export async function setupTray({ appWindow, appView }: {
  appWindow: BrowserWindow
  appView: BrowserView
}): Promise<void> {
  assert(isUndefined(tray), 'Tray is already setup')

  tray = new Tray(await app.getFileIcon(app.getPath('exe')))
  tray.setToolTip('Godspeed')
  tray.addListener('click', showAppWindow)
  tray.setContextMenu(createContextMenu())

  appView.webContents.addListener('page-title-updated', (e, title) => {
    tray?.setToolTip(title)
  })

  function createContextMenu(): Menu {
    const show = new MenuItem({
      type: 'normal'
    , label: 'Show'
    , click: showAppWindow
    })
    const quit = new MenuItem({
      type: 'normal'
    , label: 'Quit'
    , click(): void {
        app.exit()
      }
    })
    const separator = new MenuItem({
      type: 'separator'
    })

    const contextMenu = new Menu()
    contextMenu.append(show)
    contextMenu.append(separator)
    contextMenu.append(quit)

    return contextMenu
  }

  function showAppWindow(): void {
    appWindow.show()
  }
}
