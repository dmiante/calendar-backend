const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const { setJWT } = require('../helpers/jwt')

const createUser = async(req, res = express.response) => {

  const { email, password } = req.body

  try {

    let user = await User.findOne({ email })
    
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User have already exist.'
      })
    }
    user = new User(req.body)

    // encrypt pass
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
  
    await user.save()

    const token = await setJWT(user.id, user.name)
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact with the admin.'
    })
  }
}

const loginUser = async(req, res = express.response) => {

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User or password are incorrect.'
      })
    }

    // password valid
    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'User or password are incorrect.'
      })
    }

    // JWT
    const token = await setJWT(user.id, user.name)

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })



  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact with the admin.'
    })
  }
}

const renewToken = async(req, res = express.response) => {

  const uid = req.uid
  const name = req.name

  const token = await setJWT(uid, name)

  res.json({
    ok: true,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}