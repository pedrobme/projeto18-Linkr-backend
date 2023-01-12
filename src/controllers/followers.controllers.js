import followedRepository from "../repositories/followers.repository.js"

export async function follow (req, res) {

    const userId = res.locals.userId
    const followedId = req.params.followed

    if(userId == followedId){
        res.sendStatus(409)
        return
    }

    try {

        const {rows} = await followedRepository.getFollow(userId, followedId)

        if(rows[0]){
            res.sendStatus(409)
        }

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

        const follow = await followedRepository.getFollow(userId, followedId)

        if(!follow.rows[0]){
            res.sendStatus(404)
            return
        }

        await followedRepository.deleteFollower(userId, followedId)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function getFollows (req, res){
    const userId = res.locals.userId
    const followedId = req.params.followed

    try {
        
        const oshe = await followedRepository.getFollow(userId, followedId)

        res.status(200).send(oshe.rows)
        

    } catch (error) {
        res.status(400).send(error.message)
    }
}