const { createServer } = require("@sugo/server");
const router = require("./router");
const logger = require("./logger");
const { setUpCors } = require("./middleware");

const server = createServer(async (req, res) => {
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

module.exports = server;
