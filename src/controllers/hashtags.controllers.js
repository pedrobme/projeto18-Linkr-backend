import { connectionDB } from "../database/db.js";

export async function trendingHashtags (req, res) {

    try {
        const trending = await connectionDB.query(`SELECT COUNT("posts-hashtags"."post-id") as "postCount", hashtags.name as "Hashtag" FROM hashtags JOIN "posts-hashtags" ON hashtags.id = "posts-hashtags"."hashtag-id" GROUP BY hashtags.name ORDER BY "postCount" DESC LIMIT 10;`)

        res.send(trending.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
    

}