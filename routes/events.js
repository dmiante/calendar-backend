/**
 * Events Routes
 * /api/events
 */

const { Router } = require('express')
const { validatorJWT } = require('../middlewares/validatorJwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const router = Router()

// all request must be passed the validator of token
router.use(validatorJWT)

// get events
router.get('/', getEvents)

// create events
router.post('/', createEvent)

// update events
router.put('/:id', updateEvent)

// delete event
router.delete('/:id', deleteEvent)


module.exports = router