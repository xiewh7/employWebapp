const express = require('express')
const router = express.Router()
const method = require('./method')

router.post('/addChat',method.addChat)
router.get('/queryChat',method.queryChat)
router.get('/queryChatformsg',method.queryChatformsg)
router.post('/updateChatRead',method.updateChatRead)

router.get('/', function (req, res) {
    res.send('chat home page')
  })
//   router.get('/queryChat', function (req, res) {
//     res.send('chat')
//   })
module.exports = router
