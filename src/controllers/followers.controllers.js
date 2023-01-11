import followedRepository from "../repositories/followers.repository.js"

export async function follow (req, res) {

    const userId = res.locals.userId
    const followedId = req.params.followed

    if(userId == followedId){
        res.sendStatus(409)
        return
    }

    try {
        await followedRepository.addFollower(userId, followedId)
        res.sendStatus(201)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}

export async function unfollow (req, res) {
    const userId = res.locals.userId
    const followedId = req.params.followed

    try {
        await followedRepository.deleteFollower(userId, followedId)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}