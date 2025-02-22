import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.post('/subscribers', {
  schema: {
    body: z.object({
      name: z.string(),
      email: z.string().email()
    }),
    response: {
      201: z.object({
        name: z.string(),
        email: z.string().email()
      })
    }
  }
}, async (request, reply) => {
  const { name, email } = request.body

  // criação da inscrição no banco de dados

  console.log('POST /subscribers', request.body)
  return reply.status(201).send({
    name,
    email
  })
})

app.get('/healthcheck', () => {
  console.log('GET 200 /healthcheck')
  return 'Ok'
})

app.listen({ port: 3000 }).then(() => {
  console.log('🚀 HTTP server is running!', 'http://127.0.0.1:3000')
})