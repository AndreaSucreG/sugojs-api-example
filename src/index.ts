import server from './server'
import * as db from './db'

db.connect().then(() => server.listen(3000));
