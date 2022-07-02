const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const {User}=require("./models/User");
const config=require("./config/key")
const cookieParser=require('cookie-parser');
const {auth}=require('./middleware/auth')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json())
app.use(cookieParser());

mongoose.connect(config.mongoURI,{
 useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log('MongoDB-OK'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 출력테스트와 노드맨테스트')
})

app.post('/api/user/register',(req,res)=>{
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
app.post('/api/user/login',(req,res)=>{
    //요청된 이메일 DB에서 찾기
    //있다면 비밀번호와 일치하는지 확인
    //이후 토큰생성하기
    User.findOne(
        {email:req.body.email},(err,user)=>{
            if(!user){
                return res.json({
                    loginSuccess:false,
                    message:"email 없음"
                })
            }
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(!isMatch)
                    return res.json({loginSuccess:false,message:"비밀번호 틀립니다."})
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    //토큰을 저장한다.(쿠키,로컬등)
                    res.cookie('x_auth',user.token)
                    .status(200)
                    .json({loginSuccess:true,userId:user._id})
                })
            })
        })
})
app.get('/api/user/auth',auth,(req,res)=>{
    //여기까지 미들웨어를 통과했다는 것은 Auth가 TRUE
    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role===0?false:true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})
app.get('/api/user/logout',auth,(req,res)=>{
    User.findOneAndUpdate({
        _id:req.user._id
    },
    {
        token:""
    },
    (err,user)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send({
            success:true
        })
    }
    )
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get('/api/hello',(req,res)=>res.send('안녕하세요'))