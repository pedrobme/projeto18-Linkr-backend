import { connectionDB } from "../database/db.js";

async function postLikeUser (postId, userId) {
    return connectionDB.query(`INSERT INTO "users-like-posts" ("user-id", "post-id") VALUES ($1, $2);`, [userId, postId])
}

async function verifyLike (postId, userId) {
    return connectionDB.query(`SELECT * FROM "users-like-posts" WHERE "user-id" = $1 AND "post-id" = $2;`, [userId, postId])
}

const likeRepository = {
    postLikeUser,
    verifyLike
}

export default likeRepository