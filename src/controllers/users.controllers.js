import {connectionDB} from "../database/db.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const { username, image, email, password } = req.body;

  try {
    const existingUsers = await connectionDB.query(
      `SELECT * FROM users WHERE email = $1 `,
      [email]
    );

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    await connectionDB.query(
      `
    INSERT INTO users (username, image, email, password) 
    VALUES ($1, $2, $3, $4)`,
      [username, image, email, passwordHash]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}