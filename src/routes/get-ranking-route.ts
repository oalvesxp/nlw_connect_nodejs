import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get top 3 from ranking',
        tags: ['Referral', 'Ranking'],
        description: 'Get top 3 from ranking',
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request, _) => {
      console.log('POST 200 /ranking')
      const { rankingWithScore } = await getRanking()

      return {
        ranking: rankingWithScore,
      }
    }
  )
}
