import SuGoRequest from "@sugo/server/dist/Request";
import SuGoResponse from "@sugo/server/dist/Response";
import { createServer } from '@sugo/server'
import router from "./router";
import logger from "./logger";
import {setUpCors} from "./middleware";

const server = createServer(async (req:SuGoRequest, res:SuGoResponse) => {
  if (!router.match(req.method, res.path))
    throw {
      name: "ResourceNotFound",
      message: "Resource not found",
      status: 404
    };
  await router.handle(req, res);
})
  .setLogger(logger)
  .useMiddleware(setUpCors);
export default server;
