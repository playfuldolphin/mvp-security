import React, {useEffect, useState} from 'react'
export default function Subscriptions(){
  const [subs,setSubs]=useState([])
  const [err,setErr]=useState(null)
  useEffect(()=>{ (async ()=>{
    try{
      const token = localStorage.getItem('token')
      const r = await fetch('/api/admin/subscriptions',{headers: token?{Authorization:`Bearer ${token}`}:{}})
      const j = await r.json()
      if(r.ok) setSubs(j.subscriptions||[])
      else setErr(JSON.stringify(j))
    }catch(e){setErr(e.message)}
  })() },[])
  return (
    React.createElement('div',null,
      React.createElement('h2',null,'Subscriptions Admin'),
      err && React.createElement('div',null, 'Error: ', err),
      subs.length===0 ? React.createElement('div',null,'No subscriptions yet') : subs.map((s,i)=>(
        React.createElement('div',{key:i,className:'incident'},
          React.createElement('div',null, 'id: ', s.id),
          React.createElement('div',null, 'email: ', s.customer_email || 'N/A'),
          React.createElement('pre',null, JSON.stringify(s.session || s, null, 2))
        )
      ))
    )
  )
}
