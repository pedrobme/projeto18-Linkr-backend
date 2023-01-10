import { connectionDB } from "../database/db.js";
import urlMetadata from "url-metadata";



export async function loadPost(req, res) {

    try {
        
        const postsExists = await connectionDB.query(`
        SELECT username, posts.id, image, date, text, url 
        FROM posts 
        JOIN users ON posts."user-id" = users.id 
        ORDER BY date DESC LIMIT 20;
        `)

        const arr = await Promise.all(postsExists.rows.map( async (obj) => {
            

            let objectNew = {...obj};
            
            const metaDatasUrl =  await urlMetadata(obj.url).then(
                function (metadata) {
                    /* console.log(metadata.title); */
                    
                    objectNew.titleUrl = metadata.title;
                    objectNew.imageUrl = metadata.image;
                    objectNew.descriptionUrl = metadata.description;

                },
                function (error) {
                    console.log(error)
                })
                console.log(objectNew)

            return objectNew;


        }))
        /* console.log(arr) */

        res.send(arr);

    }
    catch (err) {
        console.log(err.message);

    }
}


export async function otherUserPosts(req, res){
    const id = req.params.id; 
   
    try {
        const postsExists = await connectionDB.query(`
        SELECT username, posts.id, image, date, text, url 
        FROM posts 
        JOIN users ON posts."user-id" = users.id 
        WHERE posts."user-id" = $1
        ORDER BY date DESC LIMIT 20;
        `, [id])

        const arr = await Promise.all(postsExists.rows.map( async (obj) => {
            
            let objectNew = {...obj};
            
            const metaDatasUrl =  await urlMetadata(obj.url).then(
                function (metadata) {
                    /* console.log(metadata.title); */
                    
                    objectNew.titleUrl = metadata.title;
                    objectNew.imageUrl = metadata.image;
                    objectNew.descriptionUrl = metadata.description;

                },
                function (error) {
                    console.log(error)
                })
                console.log(objectNew)

            return objectNew;


        }))
        /* console.log(arr) */

        console.log(id)
        res.send(arr);

    }
    catch (err) {
        console.log(err.message);

    }
}
