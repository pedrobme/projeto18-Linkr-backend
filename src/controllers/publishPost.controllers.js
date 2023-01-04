import { connectionDB } from "../database/db.js";

const publishPost = async (req, res) => {
  const userId = req.userId;
  const { text, url } = req.body;
  const date = Date.now();

  console.log("userId: ", userId);
  console.log("postObject: ", text, url);

  try {
    await connectionDB.query(
      'INSERT INTO posts ("user-id", date, text, url) VALUES ($1,$2,$3,$4)',
      [userId, date, text.toString(), url]
    );

    res
      .status(201)
      .send({ "user-Id": userId, date: date, text: text.toString(), url: url });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default publishPost;
