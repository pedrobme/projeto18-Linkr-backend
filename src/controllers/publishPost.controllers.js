import { connectionDB } from "../database/db.js";
import createQueryPiece from "../utils/createQueriesPieces.js";

const publishPost = async (req, res) => {
  const userId = res.locals.userId;
  const hashtags = res.locals.hashtags;
  let { text, url } = req.body;

  if (!text) {
    text = "";
  }

  try {
    const insertedPost = await connectionDB.query(
      'INSERT INTO posts ("user-id", date, text, url) VALUES ($1,NOW(),$2,$3) RETURNING id',
      [userId, text.toString(), url]
    );

    if (hashtags) {
      const { postQueryPiece, middleTableQueryPiece } =
        createQueryPiece(hashtags);

      console.log(hashtags);
      console.log(postQueryPiece);
      console.log(middleTableQueryPiece);

      const hashtagsQuery =
        "INSERT INTO hashtags (name) VALUES" +
        postQueryPiece +
        " ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id";

      console.log(hashtagsQuery);

      const insertedHashtags = await connectionDB.query(
        hashtagsQuery,
        hashtags
      );

      const middleTableQueryValues = insertedHashtags.rows.map((hashtagObj) => {
        return hashtagObj.id;
      });

      middleTableQueryValues.push(insertedPost.rows[0].id);

      const middleTableQuery =
        'INSERT INTO "posts-hashtags" ("post-id", "hashtag-id") VALUES' +
        middleTableQueryPiece;

      console.log("Middle table query: ", middleTableQuery);

      await connectionDB.query(middleTableQuery, middleTableQueryValues);
    }

    res.status(201).send(insertedPost.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("uncaught error");
  }
};

export default publishPost;
