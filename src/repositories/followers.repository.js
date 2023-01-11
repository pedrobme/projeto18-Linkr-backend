import { connectionDB } from "../database/db.js";

async function addFollower (userId, followedId) {
    return connectionDB.query(`INSERT INTO followers ("user-id", "followed-id") VALUES ($1, $2);`, [userId, followedId])
}

const followedRepository = {
    addFollower
}

export default followedRepository