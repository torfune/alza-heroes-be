import { MongoClient } from 'mongodb'
import { PORT, MONGO_URI } from './config'
import * as cors from 'fastify-cors'
import * as Fastify from 'fastify'
import corsOptions from './corsOptions'
import heroesCreate from './routes/heroes-create'
import heroesDelete from './routes/heroes-delete'
import heroesDetail from './routes/heroes-detail'
import heroesList from './routes/heroes-list'
import heroesUpdate from './routes/heroes-update'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

new MongoClient(MONGO_URI, options).connect().then(client => {
  const db = client.db('alza-heroes')

  Fastify()
    .register(cors, corsOptions)
    .route(heroesCreate(db))
    .route(heroesDelete(db))
    .route(heroesDetail(db))
    .route(heroesList(db))
    .route(heroesUpdate(db))
    .listen(PORT, err => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening on ${PORT} ...`)
    })
})
