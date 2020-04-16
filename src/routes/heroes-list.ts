import * as Fastify from 'fastify'
import { Db } from 'mongodb'
import Hero from '../types/Hero'

function heroesList(db: Db) {
  return {
    method: 'GET',
    url: '/heroes',
    handler: async (request, reply) => {
      const col = db.collection<Hero>('heroes')
      const heroes = await col.find().toArray()

      reply.send(heroes)
    },
  } as Fastify.RouteOptions
}

export default heroesList
