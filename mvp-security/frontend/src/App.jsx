import React, { useState } from 'react';
export default function App(){
  const [logs,setLogs]=useState('');
  const [res,setRes]=useState(null);
  async function upload(){
    const r=await fetch('/api/upload-logs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({logs:logs.split('\n')})});
    setRes(await r.json());
  }
  return (
    React.createElement('div',null,
      React.createElement('h1',null,'LogShield MVP'),
      React.createElement('textarea',{value:logs,onChange:e=>setLogs(e.target.value),rows:10,cols:60}),
      React.createElement('div',null,
        React.createElement('button',{onClick:upload},'Upload')),
      res && React.createElement('pre',null,JSON.stringify(res,null,2))
    )
  );
}
