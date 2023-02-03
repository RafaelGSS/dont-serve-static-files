const path = require('path')
const fastify = require('fastify')({
  logger: false
})

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

// fastify.listen({ port: 3000, host: '0.0.0.0' })
fastify.listen({ port: 3000 })
