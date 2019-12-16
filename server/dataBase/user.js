const express = require('express')
const router = express.Router()
const method = require('./method')

router.get('/login',method.Login)
router.get('/getName',method.queryUserforName)
router.post('/Register',method.Register)
router.get('/getAllName',method.queryAllUserforName)
router.get('/queryUserforfile',method.queryUserforfile)
router.post('/replaceUser',method.replaceUser)
router.post('/replaceUserpassword',method.replaceUserpassword)

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('api home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About api')
})

module.exports = router
