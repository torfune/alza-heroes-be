import * as Fastify from 'fastify'
import { Db } from 'mongodb'
import Hero from '../types/Hero'

function heroesDelete(db: Db) {
  return {
    method: 'DELETE',
    url: '/heroes/:id',
    handler: async (request, reply) => {
      const col = db.collection<Hero>('heroes')
      const { result } = await col.deleteOne({ _id: request.params.id })

      if (!result.n) {
        reply.callNotFound()
        return
      }

      reply.send('Deleted')
    },
    schema: {
      params: {
        id: { type: 'number' },
      },
    },
  } as Fastify.RouteOptions
}

export default heroesDelete
