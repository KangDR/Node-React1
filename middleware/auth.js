const {User}=require('../models/User');
const cookieParser=require('cookie-parser');
let auth=(req,res,next)=>{
//인증처리하는곳

//클라이언트쿠키 토큰가져옴
let token=req.cookies.x_auth;
//복호화 후 유저를 찾는다.
User.findByToken(token,(err,user)=>{
    if(err) throw err;
    if(!user) return res.json({isAuth:false,error:true});
    req.token=token;
    req.user=user;
    next();

})
//유저의 유무에 따라 인증한다.
}
module.exports={auth};