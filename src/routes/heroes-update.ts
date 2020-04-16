import * as Fastify from 'fastify'
import { Db } from 'mongodb'
import Hero from '../types/Hero'

function heroesUpdate(db: Db) {
  return {
    method: 'PATCH',
    url: '/heroes/:id',
    handler: async (request, reply) => {
      const col = db.collection<Hero>('heroes')
      const { value: hero } = await col.findOneAndUpdate(
        { _id: request.params.id },
        { $set: { name: request.body.name } },
        { returnOriginal: false }
      )

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
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
    },
  } as Fastify.RouteOptions
}

export default heroesUpdate
