
import hashRepository from "../repositories/hashtag.repository.js";

export async function trendingHashtags (req, res) {

    try {
        const trending = await hashRepository.getTrending()

        res.send(trending.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
    

}

