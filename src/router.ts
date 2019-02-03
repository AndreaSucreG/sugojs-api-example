import Router from '@sugo/router'
import * as service from './service'
import SuGoRequest from '@sugo/server/dist/Request';
import SuGoResponse from '@sugo/server/dist/Response';
import { patientExists } from './middleware';
const router = new Router();

const handleResponse = (res:SuGoResponse,status:number, data: any) => {
  res.status(status);
  res.json(data);
};



router
  .get("/patients/", async (req: SuGoRequest, res: SuGoResponse) => {
    const { projection, skip, limit, sort } = req.query;
    delete req.query.projection;
    delete req.query.skip;
    delete req.query.limit;
    delete req.query.sort;
    const data = await service.listPatients(req.query, projection, skip, limit, sort);
    return handleResponse(res, 200, data);
  })
  .post("/patients/", async (req: SuGoRequest, res: SuGoResponse) =>
    handleResponse(res, 200, await service.createPatient(req.body.firstName, req.body.lastName))
  )
  .patch("/patients/:id", patientExists, async (req: SuGoRequest, res: SuGoResponse) =>
    handleResponse(res, 200, await service.patchPatient(req.params.id, req.body.firstName, req.body.lastName))
  )
  .delete("/patients/:id", patientExists, async (req: SuGoRequest, res: SuGoResponse) => handleResponse(res, 200, await service.deletePatient(req.params.id)))
  .options("/(.*)", (req: SuGoRequest, res: SuGoResponse) => res.end());

export default router;
