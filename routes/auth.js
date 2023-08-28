/**
 * RUTAS DE USUARIOS / Auth
 * host + /api/auth
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { validator } = require('../middlewares/validator')
const { validatorJWT } = require('../middlewares/validatorJwt')
const router = Router()

const { createUser, loginUser, renewToken } = require('../controllers/auth')


router.post(
  '/new',
  [ // middleware
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
    validator
  ],
  createUser
)

router.post(
  '/',
  [ // middleware
    check('email', 'Email is required').isEmail().notEmpty(),
    check('password', 'Password is required').notEmpty(),
    validator
  ],
  loginUser
)

router.get('/renew', validatorJWT, renewToken)

module.exports = router