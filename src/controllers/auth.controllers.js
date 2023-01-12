import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { connectionDB } from "../database/db.js";

export async function signin(req, res) {
  const { email, password } = req.body;

  const { rows: users } = await connectionDB.query(
    `SELECT * FROM users WHERE email = $1 `,
    [email]
  );
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await connectionDB.query(
      `
   INSERT INTO sessions ("user-id", token) VALUES ($1, $2)`,
      [user.id, token]
    );
    return res.send(token);
  }

  res.sendStatus(401);
}

export async function getUserInfo(req, res) {
  const userId = res.locals.userId;

  try {
    const response = await connectionDB.query(
      "SELECT username,image FROM users WHERE id=$1",
      [userId]
    );

    res.status(200).send(response.rows);
  } catch (err) {
    console.log("getUserInfo error:", err);
  }
}

export async function signOut(req, res) {
  const { token } = req.body;
  console.log("deleteRouteBody:", req.body);

  try {
    const deleteSession = await connectionDB.query(
      `
    DELETE FROM sessions 
    WHERE token = $1`,
      [token]
    );

    res.status(201).send(deleteSession.rows);
  } catch (err) {
    /* console.log(err); */
    res.status(500).send("Unexpected Error");
  }
}
