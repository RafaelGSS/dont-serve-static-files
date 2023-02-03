const fastify = require('fastify')({
  logger: true
})

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000, host: '0.0.0.0' })
