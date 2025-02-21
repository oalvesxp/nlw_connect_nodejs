import { fastify } from 'fastify'

const app = fastify()

app.get('/healthcheck', () => {
  console.log('GET 200 /healthcheck')
  return 'Ok'
})

app.listen({ port: 3000 }).then(() => {
  console.log('🚀 HTTP server is running!', 'http://127.0.0.1:3000')
})