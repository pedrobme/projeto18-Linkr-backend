import { connectionDB } from "../database/db.js";
import urlMetadata from "url-metadata";

export async function loadPost(req, res) {
  try {
    const postsExists = await connectionDB.query(`
        SELECT username, posts.id, image, date, text, url 
        FROM posts 
        JOIN users ON posts."user-id" = users.id 
        ORDER BY date DESC LIMIT 20;
        `);

    const arr = await Promise.all(
      postsExists.rows.map(async (obj) => {
        let objectNew = { ...obj };

        const metaDatasUrl = await urlMetadata(obj.url).then(
          function (metadata) {
            /* console.log(metadata.title); */
            objectNew.titleUrl = metadata.title;
            objectNew.imageUrl = metadata.image;
            objectNew.descriptionUrl = metadata.description;
          },
          function (error) {
            console.log(error);
          }
        );
        console.log(objectNew);

        return objectNew;
      })
    );
    /* console.log(arr) */

    res.send(arr);
  } catch (err) {
    console.log(err.message);
  }
}

export async function deletePost(req, res) {
  const { postId } = req.params;

  try {
    const deletePostLikes = await connectionDB.query(
      'DELETE FROM "users-like-posts" where "users-like-posts"."post-id"=$1',
      [postId]
    );

    const deletePostHashtags = await connectionDB.query(
      'DELETE FROM "posts-hashtags" where "posts-hashtags"."post-id"=$1',
      [postId]
    );

    const deletePost = await connectionDB.query(
      "DELETE FROM posts WHERE posts.id=$1",
      [postId]
    );

    res.status(201).send(deletePost.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected Error");
  }
  console.log(postId);
}

export async function editPost(req, res) {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    const updatePost = await connectionDB.query(
      "UPTATE posts SET text=$2 WHERE posts.id=$1",
      [postId, text]
    );

    res.status(201).send(updatePost.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected Error");
  }
}

export async function searchUsers(req, res){
    const querys = req.body.querys;
    

    try{
        const resp = await connectionDB.query(`
        SELECT 
            id,
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
   
    try {
      const postsExists = await connectionDB.query(`
          SELECT posts."user-id" AS "useId", username, posts.id, image, date, text, url 
          FROM posts 
          JOIN users ON posts."user-id" = users.id 
          WHERE posts."user-id" = $1
          ORDER BY date 
          `,[id]);
  
      const arr = await Promise.all(
        postsExists.rows.map(async (obj) => {
          let objectNew = { ...obj };
  
          const metaDatasUrl = await urlMetadata(obj.url).then(
            function (metadata) {
              /* console.log(metadata.title); */
              objectNew.titleUrl = metadata.title;
              objectNew.imageUrl = metadata.image;
              objectNew.descriptionUrl = metadata.description;
            },
            function (error) {
              console.log(error);
            }
          );
          console.log(objectNew);
  
          return objectNew;
        })
      );
      console.log('Aqui no goToClickUser',id,arr)
        
      res.send(arr);
    } catch (err) {
      console.log(err.message);
    }
  
  }
