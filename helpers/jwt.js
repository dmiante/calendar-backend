const jwt = require('jsonwebtoken')

const setJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }

    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      if (err){
        console.error(err)
        reject('Couldn\'t generate token')
      }
      resolve(token)
    })

  })
}

module.exports = {
  setJWT
}