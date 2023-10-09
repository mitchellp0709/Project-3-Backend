//////////////////////////
// Dependencies
//////////////////////////

 require('dotenv').config()
 const express = require('express')
 const morgan = require('morgan')
 const mongoose = require('./db/db')
 const cors = require('cors')
 const app = express()
 const AuthRouter = require('./controllers/user')
 const auth = require('./auth/index.js')

 const TweetRouter = require('./controllers/tweet')


 //const {PORT,DATABASE_URL} = process.env

const DATABASE_URL = process.env
let PORT = process.env.PORT || 8999

 
 module.exports = mongoose


 //////////////////////////
 // Middleware
 //////////////////////////

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


///////////////////////////
// Routes
///////////////////////////

app.get('/', auth, (req,res)=>{
    res.json(req.payload)
})


//Routers
app.use('/auth', AuthRouter)
app.use('/tweet', TweetRouter)

// Listener
app.listen(PORT, () => {console.log('listening on port', PORT)})