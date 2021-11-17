require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {Router} = require('express')
const jwt = require('jsonwebtoken')
const router = Router()
const {SECRET} = process.env


router.post('/signup', async (req,res) => {
    try{
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create(req.body)
    res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({error})
    }
})


router.post('/login', async (req,res) => {
    try{
        const {username, password} = req.body
        const user = await User.find({username})
        if (user){
            const match = await bcrypt.compare(password, user.password)
            if(match){
                const token = await jwt.sign({username}, SECRET)
                res.status(200).json({token})
            } else{
                res.status(400).json({error: "password is incorrect"})
            }
        } else {
            res.status(400).json({error: "user does not exist"})
        }
    } catch(error){
        res.status(400).json({error})
    }
})






module.exports = router