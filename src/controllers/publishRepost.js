import { connectionDB } from "../database/db.js";

const publishRepost = async (req, res) => {
  const postId = req.params.id;
  const userId = res.locals.userId;

  try {
    const response = await connectionDB.query(
      'INSERT INTO reposts ("user-id", "reposted-post-id",date) VALUES ($1,$2,NOW())',
      [userId, postId]
    );

    res.sendStatus(201);
    return;
  } catch (err) {
    console.log("publishRepost ERROR", err);
  }
};

export default publishRepost;
