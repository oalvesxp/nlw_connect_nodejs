import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['Referral', 'Ranking'],
          description: 'Get subscriber ranking position by subscriberId',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (request, _) => {
        const { subscriberId } = request.params

        console.log(`POST 200 /subscribers/${subscriberId}/ranking/position`)
        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return {
          position,
        }
      }
    )
  }
