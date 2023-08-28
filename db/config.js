const mongoose = require('mongoose')

const dbConnection = async() => {

  try {
    await mongoose.connect(process.env.DB_CONN)
    

    console.log('🟢 DB online')
  } catch (error) {
    console.error(error)
    throw new Error('Error to connect the db')
  }
}

module.exports = {
  dbConnection
}