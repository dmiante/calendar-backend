const express = require('express')
const Event = require('../models/Event')

const getEvents = async(req, res = express.response) => {

  try {
    const events = await Event.find().populate('user', 'name')


    res.json({
      ok: true,
      events
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error server'
    })
  }

}

const createEvent = async(req, res = express.response) => {

  const event = new Event(req.body)

  try {

    event.user = req.uid
    const eventSaved = await event.save()

    res.json({
      ok: true,
      event: eventSaved
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: 'Error. Contact with the admin.'
    })
  }
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
