const express = require('express')

const getEvents = (req, res = express.response) => {

  try {
    console.log('success')
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error server'
    })
  }

  return res.json({
    ok: true,
    msg: 'getEvents'
  })
}

const createEvent = (req, res = express.response) => {

  try {
    console.log(req.body)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error server'
    })
  }

  return res.json({
    ok: true,
    msg: 'createEvent'
  })
}

const updateEvent = (req, res = express.response) => {

  try {
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error server'
    })
  }

  return res.json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res = express.response) => {

  try {
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error server'
    })
  }

  return res.json({
    ok: true,
    msg: 'deleteEvent'
  })
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}
