import { randomUUID } from "node:crypto"
import { sql } from "./db.js";

// Seu código continua aqui...


export class DatabasePostgres {
    #vídeos = new Map()

    async list(search){
        let videos

        if (search) {
            videos = await sql`SELECT * FROM VIDEOS WHERE ILIKE ${'%' + search + '%'}`
        } else {
            videos = await sql`SELECT * FROM VIDEOS`
        }

        return videos
    }

    async create(video){
        const videoId = randomUUID()

        const {title, description, duration} = video

        await sql`INSERT INTO VIDEOS(id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video){
        const {title, description, duration} = video

        await sql`UPDATE VIDEOS SET title = ${title}, description = ${description}, duration ${description} WHERE id = ${id}`
    }

    async delete(id){   
        await sql`DELETE VIDEOS WHERE id = ${id}`
    }
}