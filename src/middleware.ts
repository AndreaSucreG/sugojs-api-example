import SuGoRequest from "@sugo/server/dist/Request";
import SuGoResponse from "@sugo/server/dist/Response";
import { ResourceNotFoundError } from "./exceptions";
import * as service from './service'

export const setUpCors = (req: SuGoRequest, res: SuGoResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.setHeader("Access-Control-Max-Age", 2592000);
};

export const patientExists = async (req: SuGoRequest, res: SuGoResponse) => {
  const exists = await service.existsPatient(req.params.id)
  if (!exists) throw new ResourceNotFoundError(req.params.id)
}