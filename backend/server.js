require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const notesRoutes = require('./routes/notesRoute')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/api/notes', notesRoutes)

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
