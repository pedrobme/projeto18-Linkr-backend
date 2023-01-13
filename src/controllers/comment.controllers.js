import { connectionDB } from "../database/db.js";

export async function create(req,res){
    try{
        const {comment, userId, postId} = res.locals.comment;
        await connectionDB.query('INSERT INTO comments (comment, "user-id","post-id" ) VALUES ($1, $2, $3)',[comment, userId, postId]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function findAllComments(req,res){
    const {postId} = req.params;
    try{
        const getId = await connectionDB.query(`
            SELECT * FROM users;
        `);

        const sessions = await connectionDB.query(`
            SELECT * FROM sessions;
        `)
        const getAllComments = await connectionDB.query(`
            SELECT 
                users.id AS "userId",
                users.username AS "userName",
                users.image AS "userImage",
                posts.id AS "postId",
                comments.comment AS "commentText"
            FROM 
                comments
           
            JOIN
                users
            ON
                comments."user-id" = users.id
            JOIN 
                posts
            ON
                comments."post-id" = posts.id
            
            WHERE
                posts.id=$1
           
           
            `,[postId]);
            
            // console.log(getAllComments.rowCount);
            // console.log(sessions.rows.length -1);
            const userIdComment = (sessions.rows[sessions.rows.length -1]['user-id']);
            const imageComment = (getId.rows.filter((comm) => comm.id === userIdComment)[0].image);


            const idUser = { id: userIdComment};
            const imageUser = {imageMain: imageComment }
            const returnAllCommnents = Object.assign(getAllComments, idUser, imageUser);


            console.log(returnAllCommnents.id);
            res.send(returnAllCommnents).status(200);
            console.log(returnAllCommnents.rows);

    }catch(err){
        return res.sendStatus(500)
    }
}