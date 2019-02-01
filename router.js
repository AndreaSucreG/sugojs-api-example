const Router = require("@sugo/router");
const service = require("./service");
const router = new Router();

const handleResponse = (res, status, data) => {
  res.status(status);
  res.json(data);
};

router
  .get("/patients/", async (req, res) => {
    const { projection, skip, limit, sort } = req.query;
    delete req.query.projection;
    delete req.query.skip;
    delete req.query.limit;
    delete req.query.sort;
    const data = await service.listPatients(req.query, projection, skip, limit, sort);
    return handleResponse(res, 200, data);
  })
  .post("/patients/", async (req, res) =>
    handleResponse(res, 200, await service.createPatient(req.body.firstName, req.body.lastName))
  )
  .patch("/patients/:id", async (req, res) =>
    handleResponse(res, 200, await service.patchPatient(req.params.id, req.body.firstName, req.body.lastName))
  )
  .delete("/patients/:id", async (req, res) => handleResponse(res, 200, await service.deletePatient(req.params.id)))
  .options("/(.*)", (req, res) => res.end());

module.exports = router;
