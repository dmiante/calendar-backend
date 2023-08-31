const express =  require('express')
const { dbConnection } = require('./db/config')
const cors = require('cors')
require('dotenv').config()

console.log('connect watch')
// create server express
const app = express()
const PORT = process.env.PORT

// database
dbConnection()

app.use(cors())

// public directory
app.use(express.static('public'))

// parse body and read
app.use(express.json())

// routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// })


// listen request from server
app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`)
})