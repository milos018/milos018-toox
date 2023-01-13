
export type RouteHandler = (req, res) => any

export interface Router {
  [path: string]: {
    [methodPath: string]: RouteHandler
  }
}

export interface App {
  (req: IncomingMessage, res: ServerResponse): void;
  listen(port?: number, showMessage?: boolean): void;
  router(obj: any): void;
}