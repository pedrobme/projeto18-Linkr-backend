import { connectionDB } from "../database/db.js";

async function getTrending () {
     return connectionDB.query(`SELECT COUNT("posts-hashtags"."post-id") as "postCount", hashtags.name as "Hashtag" FROM hashtags JOIN "posts-hashtags" ON hashtags.id = "posts-hashtags"."hashtag-id" GROUP BY hashtags.name ORDER BY "postCount" DESC LIMIT 10;`)
}

async function getPostHash(hashtag) {
    return connectionDB.query(`SELECT username, posts.id, posts."user-id", users.image, posts.date, posts.text, posts.url FROM posts JOIN "posts-hashtags" ON posts.id = "posts-hashtags"."post-id" JOIN hashtags ON "posts-hashtags"."hashtag-id" = hashtags.id JOIN users ON posts."user-id" = users.id WHERE hashtags.name = $1 ORDER BY posts.date DESC;`, [hashtag])
}

const hashRepository = {
    getTrending,
    getPostHash
}

export default hashRepository