import { connectionDB } from "../database/db.js";
import urlMetadata from "url-metadata";

export async function loadPost(req, res) {
  const page = req.query.page || 0; 
  const offSet = page*10;
  const userId = res.locals.userId;

  try {
    const postsExists = await connectionDB.query(
      `
      SELECT 
        "posts-reposts"."post-id", "posts-reposts"."user-id", "posts-reposts"."reposted-post-id", "posts-reposts"."post-creator-name", "posts-reposts"."date", users.image, posts.text, posts.url 
      FROM 
        (
		      (SELECT posts.id as "post-id", posts."user-id", NULL as "reposted-post-id", users.username as "post-creator-name", posts.date FROM posts JOIN users on posts."user-id"=users.id)
	          UNION ALL
		      (SELECT NULL as "post-id", reposts."user-id", reposts."reposted-post-id" as "reposted-post-id", users.username as "post-creator-name", reposts.date FROM reposts JOIN posts ON reposts."reposted-post-id"=posts.id JOIN users ON posts."user-id"=users.id)
	)"posts-reposts"
      JOIN users ON users.id = "posts-reposts"."user-id"
      JOIN posts ON "posts-reposts"."post-id"=posts.id OR "posts-reposts"."reposted-post-id"=posts.id
      WHERE EXISTS (SELECT FROM followers WHERE followers."user-id"=$1 AND followers."followed-id"="posts-reposts"."user-id")
      ORDER BY date DESC OFFSET $2 LIMIT 10;

        `,
      [userId, offSet]
    );

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

export async function searchUsers(req, res) {
  const querys = req.body.querys;

  try {
    const resp = await connectionDB.query(
      `
        SELECT 
            id,
            username,
            image
        FROM users
        WHERE username
        LIKE $1
        `,
      [`%${querys}%`]
    );
    /* console.log(resp.rows, "r as querys =>", querys); */
    res.send(resp.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

export async function goToClickUser(req, res) {
  const id = req.params.id;

  try {
    const postsExists = await connectionDB.query(
      `
      SELECT 
        "posts-reposts"."post-id", "posts-reposts"."user-id", "posts-reposts"."reposted-post-id", "posts-reposts"."post-creator-name", "posts-reposts"."date", users.username, users.image, posts.text, posts.url 
      FROM 
        (
		      (SELECT posts.id as "post-id", posts."user-id", NULL as "reposted-post-id", users.username as "post-creator-name", posts.date FROM posts JOIN users on posts."user-id"=users.id)
	          UNION ALL
		      (SELECT NULL as "post-id", reposts."user-id", reposts."reposted-post-id" as "reposted-post-id", users.username as "post-creator-name", reposts.date FROM reposts JOIN posts ON reposts."reposted-post-id"=posts.id JOIN users ON posts."user-id"=users.id)
	)"posts-reposts"
      JOIN users ON users.id = "posts-reposts"."user-id"
      JOIN posts ON "posts-reposts"."post-id"=posts.id OR "posts-reposts"."reposted-post-id"=posts.id
      WHERE "posts-reposts"."user-id"=$1
      ORDER BY date DESC LIMIT 20;
        `,
      [id]
    );

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
    console.log("Aqui no goToClickUser", id, arr);

    res.send(arr);
  } catch (err) {
    console.log(err.message);
  }
}
