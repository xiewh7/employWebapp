const express = require('express')
const router = express.Router()
const method = require('./method')

router.post('/addPost',method.addPost)
router.post('/updatePostCount',method.updatePostCount)

router.get('/queryPost',method.queryPost)
router.get('/', function (req, res) {
    res.send('posts home page')
  })
module.exports = router
