// GET, POST, PUT, DELETE e PATCH = São métodos HTTP
// POST http://localhost:3333/videos
/* Route Parameter = Basicamento quando utilizamos o método PUT, 
ele indica que terá que retornar um ID de identificação do vídeo por ex.*/

import { fastify } from "fastify"
//import {DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put ('/videos/:id', async (request, reply) => {
    const videoId = request.params.id //Com params consigo acessar os parametros que vem da minha rota
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})