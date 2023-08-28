const { response } = require('express')
const jwt = require('jsonwebtoken')

const validatorJWT = (req, res = response, next) => {
  // x-token
  const token = req.header('x-token')
  if (!token){
    return res.status(401).json({
      ok: false,
      msg: 'No token exist.'
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name - name

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalid.'
    })
  }

  next()
}

module.exports = {
  validatorJWT
}