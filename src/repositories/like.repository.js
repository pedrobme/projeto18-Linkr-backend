import { connectionDB } from "../database/db.js";

async function postLikeUser (postId, userId) {
    return connectionDB.query(`INSERT INTO "users-like-posts" ("user-id", "post-id") VALUES ($1, $2);`, [userId, postId])
}

async function verifyLike (postId, userId) {
    return connectionDB.query(`SELECT * FROM "users-like-posts" WHERE "user-id" = $1 AND "post-id" = $2;`, [userId, postId])
}

async function deleteLike (postId, userId) {
    return connectionDB.query(`DELETE FROM "users-like-posts" WHERE "users-like-posts"."post-id" = $1 AND "users-like-posts"."user-id"  = $2;`, [postId, userId])
}

const likeRepository = {
    postLikeUser,
    verifyLike,
    deleteLike
}

export default likeRepository