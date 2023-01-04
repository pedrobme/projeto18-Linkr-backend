import { connectionDB } from "../database/db.js";

export async function loadPost (req, res){

    try {        
        const postsExists = await connectionDB.query(`
        SELECT username, image, date, text, url FROM posts JOIN users ON posts.id = users.id;
        `)
        res.send(postsExists.rows);

    }
    catch(err){
        console.log(err.message);

    }


}

