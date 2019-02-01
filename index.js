const server = require("./server");
const db = require("./db");

db.connect("mongodb://localhost/test").then(() => server.listen(3000));
