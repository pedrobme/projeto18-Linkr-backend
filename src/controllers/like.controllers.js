import likeRepository from "../repositories/like.repository.js"

export async function  likePost (req, res) {

    const userId = res.locals.userId

    const postId = req.body.postId

    try {
        
        const verify = await likeRepository.verifyLike(postId, userId)

        if(verify.rows[0]){
            res.sendStatus(409)
            return
        }

        await likeRepository.postLikeUser(postId, userId)
        res.sendStatus(201)

    } catch (error) {
        res.status(400).send(error.message)
    }
}