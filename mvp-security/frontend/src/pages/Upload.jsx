import React, {useState} from 'react'
export default function Upload(){
  const [logs,setLogs]=useState('')
  const [res,setRes]=useState(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  async function upload(){
    const r = await fetch('/api/upload-logs',{method:'POST',headers:{'Content-Type':'application/json', Authorization: token?`Bearer ${token}`:''},body:JSON.stringify({logs:logs.split('\n')})})
    const j = await r.json()
    setRes(j)
    try{ localStorage.setItem('incidents', JSON.stringify(j.incidents || [])) }catch(e){}
  }
  return (
    React.createElement('div',null,
      React.createElement('h2',null,'Upload Logs'),
      React.createElement('textarea',{value:logs,onChange:e=>setLogs(e.target.value),rows:10,cols:80}),
      React.createElement('div',null, React.createElement('button',{onClick:upload},'Upload Logs')),
      res && React.createElement('pre',null,JSON.stringify(res,null,2))
    )
  )
}
