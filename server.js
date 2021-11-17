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

 const {PORT,DATABASE_URL} = process.env

 
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

// Listener
app.listen(PORT, () => {console.log('listening on port', PORT)})