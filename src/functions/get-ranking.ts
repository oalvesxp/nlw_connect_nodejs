import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscriberScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberScore)))

  const rankingWithScore = subscribers
    .map(item => {
      return {
        id: item.id,
        name: item.name,
        score: subscriberScore[item.id],
      }
    })
    .sort((a, b) => {
      return b.score - a.score
    })

  return {
    rankingWithScore,
  }
}
