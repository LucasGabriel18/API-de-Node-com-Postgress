import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #vídeos = new Map()

    list(search){
        return Array.from(this.#vídeos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search) {
                return video.title.includes(search)
            }

            return true
        })
    }

    create(video){
        const videoId = randomUUID()

        this.#vídeos.set(videoId, video)
    }

    update(id, video){
        this.#vídeos.set(id, video)
    }

    delete(id){
        this.#vídeos.delete(id)
    }
}

//set - EX: não aceita valores duplicados, como ID
//map - trabalha com uma API versátil e legal de usar