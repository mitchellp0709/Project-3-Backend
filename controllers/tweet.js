const Tweet = require('../models/tweet')
const User = require('../models/user')
const {Router} = require('express')
const router = Router()


router.get('/:user', async (req,res) => {
    const user = req.params.user // this should be an ID for that user's MongoDB entry, not a username
    try {
        const thisUser = await User.find({_id: user})
        const friends = thisUser.follows
        const friendsTweets = await []
        for (friend of friends){
            const tweets = await Tweet.find({username: friend.username})
            friendsTweets.push(tweets)
        }
        res.status(200).json(friendsTweets)

    } catch (error){
        res.status(400).json({error})
    }
})

router.post('/', async (req,res) => {
    try {
        res.status(200).json(await Tweet.create(req.body))
    } catch ({error}) {
        res.status(400).json(error)
    }
})

router.put('/:id', async (req,res) => {
    const id = req.params.id
    try {
        res.status(200).json(await Tweet.findByIdAndUpdate(id,req.body,{new:true}))
    } catch ({error}) {
        res.status(400).json(error)
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        res.status(200).json(await Tweet.findByIdAndRemove(id))
    } catch (error){
        res.status(400).json({error})
    }
})


module.exports = router