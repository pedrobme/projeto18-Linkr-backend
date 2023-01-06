import { connectionDB } from "../database/db.js";

export async function loadPost (req, res){

    try {        
        const postsExists = await connectionDB.query(`
        SELECT username, posts.id, image, date, text, url 
        FROM posts 
        JOIN users ON posts."user-id" = users.id 
        ORDER BY date LIMIT 20;
        `)
        res.send(postsExists.rows);

    }
    catch(err){
        console.log(err.message);

    }


}

