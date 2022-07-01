const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const {User}=require("./models/User");
const config=require("./config/key")

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json())

mongoose.connect(config.mongoURI,{
 useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log('MongoDB-OK'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 출력테스트와 노드맨테스트')
})

app.post('/register',(req,res)=>{
    //회원가입시 필요한 정보를 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const user=new User(req.body);
    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})