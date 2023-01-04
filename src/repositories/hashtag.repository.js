import { connectionDB } from "../database/db.js";

async function getTrending () {
     return connectionDB.query(`SELECT COUNT("posts-hashtags"."post-id") as "postCount", hashtags.name as "Hashtag" FROM hashtags JOIN "posts-hashtags" ON hashtags.id = "posts-hashtags"."hashtag-id" GROUP BY hashtags.name ORDER BY "postCount" DESC LIMIT 10;`)
}

const hashRepository = {
    getTrending
}

export default hashRepository