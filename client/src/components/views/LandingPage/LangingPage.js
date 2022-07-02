import React, { useEffect } from 'react'
import axios from 'axios';

function LangingPage() {
  useEffect(()=>{
    axios.get('/api/hello').then(response=>{console.log(response)})
  },[])
  const onClickHandler=()=>{
    axios.get('./api/user/logout')
    .then(response=>{
      if(response.data.success){

      }
      else{
        alert("로그아웃 실패")
      }
    })
  }
    return (
    <div style={{
      display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'
    }}><h2>시작페이지</h2>
    <button onClick={onClickHandler}>로그아웃</button>
    </div>
    
  )
}

export default LangingPage