import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {connectionDB} from "../database/db.js";

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