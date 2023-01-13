import {commentSchema} from '../models/commentSchema.js';
import { connectionDB } from '../database/db.js';

export async function validCommentSchema(req,res,next) {
    const comment = req.body;
    const {error} = commentSchema.validate(comment, {abortEarly: false});
    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send({errors})
    
    }
    const existingUsers = await connectionDB.query(
        `SELECT * FROM users WHERE id = $1 `,
        [comment.userId]
      );
  
      if (existingUsers.rowCount === 0) {
        return res.sendStatus(409);
      }

      const postingUsers = await connectionDB.query(
        `SELECT * FROM posts WHERE id = $1 `,
        [comment.postId]
      );

      if (postingUsers.rowCount === 0) {
        return res.sendStatus(409);
      }
      res.locals.comment = comment;

    next();

}