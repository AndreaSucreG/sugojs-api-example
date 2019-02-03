import SuGoRequest from "@sugo/server/dist/Request";
import SuGoResponse from "@sugo/server/dist/Response";

export const setUpCors = (req: SuGoRequest, res: SuGoResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.setHeader("Access-Control-Max-Age", 2592000);
};
