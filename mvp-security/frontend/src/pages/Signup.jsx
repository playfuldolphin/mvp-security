import React, {useState} from 'react'
export default function Signup(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')
  async function submit(){
    const r=await fetch('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    const j=await r.json()
    if(j.ok) setMsg('Signed up — please login')
    else setMsg(JSON.stringify(j))
  }
  return (
    React.createElement('div',null,
      React.createElement('h2',null,'Signup'),
      React.createElement('input',{placeholder:'email',value:email,onChange:e=>setEmail(e.target.value)}),
      React.createElement('br'),
      React.createElement('input',{placeholder:'password',type:'password',value:password,onChange:e=>setPassword(e.target.value)}),
      React.createElement('br'),
      React.createElement('button',{onClick:submit},'Signup'),
      React.createElement('div',null,msg)
    )
  )
}
