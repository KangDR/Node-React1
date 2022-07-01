const express = require('express')
const app = express()
const port = 5000
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://KangDR:kkang8377!@atlascluster.utpkr.mongodb.net/?retryWrites=true&w=majority',{
 useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log('MongoDB-OK'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 출력테스트')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})