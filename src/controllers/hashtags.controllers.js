
import hashRepository from "../repositories/hashtag.repository.js";

export async function trendingHashtags (req, res) {

    try {
        const trending = await hashRepository.getTrending()

        res.send(trending.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
    

}

export async function specificHashtag (req, res){
    const hashtagName = req.params.hashtag
    try {
        const posts = await hashRepository.getPostHash(hashtagName)
        res.status(200).send(posts.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

