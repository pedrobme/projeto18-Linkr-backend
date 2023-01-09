import { connectionDB } from "../database/db.js";

export async function loadPost (req, res){

    try {        
        const postsExists = await connectionDB.query(`
        SELECT username, image, date, text, url 
        FROM posts 
        JOIN users ON posts.id = users.id 
        ORDER BY date LIMIT 20;
        `)
        res.send(postsExists.rows);

    }
    catch(err){
        console.log(err.message);

    }
}


export async function searchUsers(req, res){
    const querys = req.body.querys;
    

    try{
        const resp = await connectionDB.query(`
        SELECT 
            username,
            image
        FROM users
        WHERE username
        LIKE $1
        `,[`%${querys}%`])
        console.log(resp.rows, 'a seguir as querys =>',querys);
        res.send(resp.rows)
    }catch(error){
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export async function goToClickUser(req, res){
    const id = req.params.id;
  
     try{
       const userClicked = await connectionDB.query(`
         SELECT
            username,
            image,
            text,
            url,
            hashtags.name AS name
        FROM posts
        JOIN users ON posts."user-id" = users.id
        JOIN "posts-hashtags" ON posts.id = "posts-hashtags"."post-id"
        JOIN hashtags ON "posts-hashtags"."hashtag-id" =  hashtags.id
        WHERE users.id = 1
        ORDER BY date 
       `,[id])
  
       if(!userClicked){
        res.sendStatus(500)
       }   
  
       res.send(userClicked.rows)
  
     }catch(error){
  
      coconsole.log(error);
  
      return res.status(500).send(error.message);
  
     }
  
  }
