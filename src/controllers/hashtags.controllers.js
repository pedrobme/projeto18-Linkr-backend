import urlMetadata from "url-metadata";
import hashRepository from "../repositories/hashtag.repository.js";

export async function trendingHashtags (req, res) {

    try {
        const trending = await hashRepository.getTrending()

        res.send(trending.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function specificHashtag (req, res){
    const hashtagName = req.params.hashtag
    try {
        const posts = await hashRepository.getPostHash(hashtagName)

        const arr = await Promise.all(posts.rows.map( async (obj) => {
            

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
        
        res.status(200).send(arr)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

