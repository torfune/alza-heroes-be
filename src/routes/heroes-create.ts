import * as Fastify from 'fastify'
import { Db } from 'mongodb'
import Hero from '../types/Hero'
import getNextSequenceId from '../utils/getNextSequenceId'

function heroesCreate(db: Db) {
  return {
    method: 'POST',
    url: '/heroes',
    handler: async (request, reply) => {
      const col = db.collection<Hero>('heroes')
      const hero = {
        _id: await getNextSequenceId(db, 'hero'),
        name: request.body.name,
      }

      await col.insertOne(hero)
      reply.send(hero)
    },
    schema: {
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

export default heroesCreate
