import * as Fastify from 'fastify'
import { Db } from 'mongodb'
import Hero from '../types/Hero'

function heroesDetail(db: Db) {
  return {
    method: 'GET',
    url: '/heroes/:id',
    handler: async (request, reply) => {
      const col = db.collection<Hero>('heroes')
      const hero = await col.findOne({ _id: request.params.id })

      if (!hero) {
        reply.callNotFound()
        return
      }

      reply.send(hero)
    },
    schema: {
      params: {
        id: { type: 'number' },
      },
    },
  } as Fastify.RouteOptions
}

export default heroesDetail
