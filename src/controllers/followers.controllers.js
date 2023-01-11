import followedRepository from "../repositories/followers.repository.js"

export async function follow (req, res) {

    const userId = res.locals.userId
    const followedId = req.params.followed

    try {
        await followedRepository.addFollower(userId, followedId)
        res.sendStatus(201)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}