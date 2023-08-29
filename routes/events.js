/**
 * Events Routes
 * /api/events
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { validator } = require('../middlewares/validator')
const { validatorJWT } = require('../middlewares/validatorJwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const router = Router()

// all request must be passed the validator of token
router.use(validatorJWT)

// get events
router.get('/', getEvents)

// create events
router.post(
  '/',
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('start', 'Start date is required.').custom(isDate),
    check('end', 'End date is required.').custom(isDate),
    validator
  ],
  createEvent)

// update events
router.put('/:id', updateEvent)

// delete event
router.delete('/:id', deleteEvent)


module.exports = router