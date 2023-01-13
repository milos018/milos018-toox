import { Server, IncomingMessage, ServerResponse } from "http"
import log from 'pino'
import { App, Router } from "./declarations"



export const toox = () => {

  let router: Router = {}

  const app: App = (req: IncomingMessage, res: ServerResponse) => {

    const { url, method } = req
    log().info(`path: ${url} method: ${method}`)

    if (!router[url] || !router[url][method.toLowerCase() + " /"]) {
      res.end(JSON.stringify({ error: "no route/method" }))
      return
    }

    const response = router[url][method.toLowerCase() + " /"](req, res)
    res.end(response)
  }

  /**
   * @param port number port number (optional), default to 3000
   * @param showMessage boolean show in console 'Server running on {port}'
  */
  app.listen = (port?: number, showMessage = true) => {
    new Server(app).listen(port || 3000)
    if (!showMessage) return
    console.log('Server running on', port)
  }

  /**
   * @param object object routes
   * @example
    "/users": {
        "get /": getUsers,
        "get /:id": getUserId,
        "post /": postUser,
        "put /:id": putUser,
        "delete /:id": deleteUser,
    },
    "/products": {
        "get /": getProducts,
        "post /": postProduct,
        "get /:id": getProductId,
        "put /:id": putProductId,
        "delete /:id": deleteProductId,
    },
  */
  app.router = function (obj) {
    router = obj
    Object.freeze(router)
  }


  return { router, app }
}