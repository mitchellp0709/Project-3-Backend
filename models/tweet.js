const mongoose = require('../db/db')

const {Schema, model} = require('mongoose')

const tweetSchema = new Schema({
    username: {type: String, required: true},
    content: {type: String, required: true},
}, {timestamps: true})


const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet