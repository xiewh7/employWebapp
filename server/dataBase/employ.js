const express = require('express')
const router = express.Router()
const method = require('./method')


router.get('/queryEmploy',method.queryEmploy)
router.post('/updateEmploy',method.updateEmploy)
router.post('/addEmploy',method.addEmploy)
router.get('/', function (req, res) {
    res.send('Employ home page')
  })
module.exports = router
