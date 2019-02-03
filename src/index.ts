import server from './server'
import * as db from './db'
import env from './environment'
db.connect().then(() => server.listen(env.server.port));
