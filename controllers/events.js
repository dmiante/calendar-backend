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

const updateEvent = async(req, res = express.response) => {

  const eventId = req.params.id
  const uid = req.uid
  
  try {

    const event = await Event.findById(eventId)

    if(!event) {
      return res.status(404).json({
      ok: false,
      msg: 'Event doesn\'t exist.'
    })}

    if (event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No privilegies for edit this event.'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }
    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

    return res.json({
      ok: true,
      event: updateEvent
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error. Contact with the admin.'
    })
  }

}

const deleteEvent = async(req, res = express.response) => {

  const eventId = req.params.id
  const uid = req.uid
  
  try {

    const event = await Event.findById(eventId)

    if(!event) {
      return res.status(404).json({
      ok: false,
      msg: 'Event doesn\'t exist.'
    })}

    if (event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No privilegies for delete this event.'
      })
    }

    const deleteEvent = await Event.findByIdAndDelete(eventId)

    return res.json({
      ok: true,
      event: deleteEvent
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error. Contact with the admin.'
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}
