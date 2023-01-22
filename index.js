const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const config = require("./config/key");

const {User} = require("./models/User.js");


//application/x-www-form-urlencode
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 아잉?')
})

app.post('/register', (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 db에 넣어 준다.

    const user = new User(req.body)

    user.save((err, doc) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      })
      //status(200) == 성공했다
    })
    //mongoDB method
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})