const express = require('express')
const router = express.Router()
const method = require('./method')

router.post('/replaceChart',method.replaceChart)

router.get('/queryChart',method.queryChart)
router.get('/', function (req, res) {
    res.send('Chart home page')
  })
module.exports = router
