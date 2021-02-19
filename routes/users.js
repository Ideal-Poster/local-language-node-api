let express = require('express')
let router = express.Router()
let User = require('../models/user/User')

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    res.status(500).send(error._message)
  }
})

module.exports = router
