const fastify = require('fastify')({
  logger: false
})

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000, host: '127.0.0.1' })
