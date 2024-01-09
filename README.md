# Godspeed
Godspeed is a simplified web browser based on Electron.

It aims to lift the built-in limitations of Chromium to provide a better environment for web applications.

## What it actually does
### `webPreferences.backgroundThrottling = false`
When the browser is in the background,
your timers are still running at full speed,
`requestAnimationFrame` and `requestVideoFrameCallback` are always available.

## Development
```sh
# The first terminal
yarn dev

# The second terminal
yarn start
```

## Packaging
```sh
yarn clean
yarn build
yarn package
```
