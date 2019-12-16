const express = require('express')
const router = express.Router()
const method = require('./method')

router.post('/replaceResume',method.replaceResume)

router.get('/queryResume',method.queryResume)
router.get('/', function (req, res) {
    res.send('posts home page')
  })
module.exports = router
