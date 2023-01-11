import { connectionDB } from "../database/db.js";

async function addFollower (userId, followedId) {
    return connectionDB.query(`INSERT INTO followers ("user-id", "followed-id") VALUES ($1, $2);`, [userId, followedId])
}

async function deleteFollower (userId, followedId) {
    return connectionDB.query(`DELETE FROM followers WHERE "user-id" = $1 AND "followed-id"=$2;`, [userId, followedId])
}

const followedRepository = {
    addFollower,
    deleteFollower
}

export default followedRepository