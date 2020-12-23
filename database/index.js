import { Database } from '@vuex-orm/core'
import Session from '@/models/Session'
import User from '@/models/User'

const database = new Database()

database.register(Session)
database.register(User)

export default database