import React, {useState} from 'react'
export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')
  async function submit(){
    const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    const j=await r.json()
    if(j.token){localStorage.setItem('token',j.token);setMsg('Logged in')}
    else setMsg(JSON.stringify(j))
  }
  return (
    React.createElement('div',null,
      React.createElement('h2',null,'Login'),
      React.createElement('input',{placeholder:'email',value:email,onChange:e=>setEmail(e.target.value)}),
      React.createElement('br'),
      React.createElement('input',{placeholder:'password',type:'password',value:password,onChange:e=>setPassword(e.target.value)}),
      React.createElement('br'),
      React.createElement('button',{onClick:submit},'Login'),
      React.createElement('div',null,msg)
    )
  )
}
