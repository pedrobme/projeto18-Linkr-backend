import { connectionDB } from "../database/db.js";

const publishPost = async (req, res) => {
  const userId = res.locals.userId;
  const hashtags = res.locals.hashtags;
  const { text, url } = req.body;
  const date = Date.now();

  try {
    const insertedPost = await connectionDB.query(
      'INSERT INTO posts ("user-id", date, text, url) VALUES ($1,$2,$3,$4) RETURNING id',
      [userId, date, text.toString(), url]
    );

    if (hashtags) {
      let queryPiece = "";

      hashtags.forEach((value, index) => {
        queryPiece += ` ($${index + 1}),`;
      });

      queryPiece = queryPiece.substring(0, queryPiece.length - 1);

      const hashtagsQuery =
        "INSERT INTO hashtags (name) VALUES" +
        queryPiece +
        " ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id";

      console.log(hashtagsQuery);
      console.log(hashtags);

      const insertedHashtags = await connectionDB.query(
        hashtagsQuery,
        hashtags
      );
      console.log(insertedHashtags.rows);

      const middleTableQueryValues = insertedHashtags.rows.map((hashtagObj) => {
        return hashtagObj.id;
      });

      middleTableQueryValues.push(insertedPost.rows[0].id);

      console.log(middleTableQueryValues);

      let middleTableQueryPiece = "";

      hashtags.forEach((value, index) => {
        middleTableQueryPiece += ` ($${hashtags.length + 1}, $${index + 1}),`;
      });

      middleTableQueryPiece = middleTableQueryPiece.substring(
        0,
        middleTableQueryPiece.length - 1
      );

      const middleTableQuery =
        'INSERT INTO "posts-hashtags" ("post-id", "hashtag-id") VALUES' +
        middleTableQueryPiece;

      console.log("Middle table query: ", middleTableQuery);

      await connectionDB.query(middleTableQuery, middleTableQueryValues);
    }

    res
      .status(201)
      .send({ "user-Id": userId, date: date, text: text.toString(), url: url });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default publishPost;
