import { connectionDB } from "../database/db.js";

const validateSession = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (authorization) {
      const authToken = authorization.split(" ")[1];

      const findUser = await connectionDB.query(
        "SELECT * FROM sessions WHERE sessions.token=$1;",
        [authToken]
      );

      if (findUser.rowCount == 0) {
        res.status(404).send("User not found");
        return;
      }

      req.userId = findUser["rows"][0]["user-id"];

      next();
      return;
    }

    res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default validateSession;