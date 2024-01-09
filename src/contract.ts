export interface IAppMainAPI {
  ping(): string

  navigate(url: string): void

  canGoBack(): boolean
  goForward(): void

  canGoForward(): boolean
  goBack(): void

  refresh(): void
}

export interface IAppRendererAPI {
  ping(): string

  urlUpdated(url: string): void
}
