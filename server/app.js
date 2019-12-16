const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const user = require('./dataBase/user')
const posts = require('./dataBase/post')
const chats = require('./dataBase/chat')
const resume = require('./dataBase/resume')
var birds = require('./dataBase/bird')
const chart = require('./dataBase/chart')
const employ =require('./dataBase/employ')
app.use('/birds', birds)
app.use('/api', user)
app.use('/posts', posts)
app.use('/chats', chats)
app.use('/resume', resume)
app.use('/chart', chart)
app.use('/employ',employ)
// app.use('/api/getAll', router);
//app.get('/api', (req, res) => res.send('Hello World!'))
app.listen(3000, function(){
    console.log('1success listen at port:3000......')
});
