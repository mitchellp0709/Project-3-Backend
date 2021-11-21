const Tweet = require('../models/tweet')
const User = require('../models/user')

const {Router} = require('express')
const router = Router()


router.get('/oneTweet/:id', async (req,res) => {
    const id = req.params.id
    try {
        res.status(200).json(await Tweet.findById(id))
    } catch(error){
        res.status(400).json({error})
    }
})

router.get('/:user', async (req,res) => {
    const user = req.params.user // this should be an ID for that user's MongoDB entry, not a username
    try {
        const thisUser = await User.findById(user)
        const followArray = await thisUser.follows
        console.log(followArray)
        const userArray = []
        for (item of followArray){
            userArray.push(await User.findById(item))
        }
        const tweetArray = []
        for (item of userArray){
            tweetArray.push(await Tweet.find({username: item.username}))
        }
        console.log(tweetArray)
        res.status(200).json(tweetArray)
        }        
    catch (error){
        res.status(400).json({error})
    }
})

// unfollow a user
router.put('/unfollow/:thisUser/:followUser', async (req,res) => {
    const thisUserId = req.params.thisUser
    const followUserId = req.params.followUser
    const followName = await User.findById(followUserId)
    console.log(followName.username)

    res.status(200).json(await User.findByIdAndUpdate(thisUserId, {$pull: {follows: followName._id}}, {new:true}))

})

// follow a user
router.put('/follow/:thisUser/:followUser', async (req,res) => {
    const thisUserId = req.params.thisUser
    const followUserId = req.params.followUser
    const followName = await User.findById(followUserId)
    console.log(followName.username)

    res.status(200).json(await User.findByIdAndUpdate(thisUserId, {$push: {follows: [followName._id]}}, {new:true}))

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

