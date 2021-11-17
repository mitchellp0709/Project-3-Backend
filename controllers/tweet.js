const Tweet = require('../models/tweet')
const User = require('../models/user')
const {Router, application} = require('express')
const router = Router()


router.get('/tweet/:user', async (req,res) => {
    const user = req.params.user
    try {
        const thisUser = await User.find({username: user})
        const friends = thisUser.friends
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

router.post('/tweet', async (req,res) => {
    try {
        res.status(200).json(await Tweet.create(req.body))
    } catch ({error}) {
        res.status(400).json(error)
    }
})

router.put('/tweet/:id', async (req,res) => {
    const id = req.params.id
    try {
        res.status(200).json(await Tweet.findByIdAndUpdate(id,req.body,{new:true}))
    } catch ({error}) {
        res.status(400).json(error)
    }
})

router.delete('/tweet/:id', async (req,res) => {
    const id = req.params.id
    try {
        res.status(200).json(await Tweet.findByIdAndRemove(id))
    } catch (error){
        res.status(400).json({error})
    }
})