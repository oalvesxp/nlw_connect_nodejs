import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscribers',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['Subscription'],
        description: 'Route to subscribes someone to the event',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      })

      console.log('POST /subscribers', request.body)
      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
