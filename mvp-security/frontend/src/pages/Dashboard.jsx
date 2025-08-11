import React, {useEffect, useState} from 'react'
export default function Dashboard(){
  const [incidents,setIncidents]=useState([])
  useEffect(()=>{
    try{ const s = JSON.parse(localStorage.getItem('incidents')||'[]'); setIncidents(s)}catch(e){}
  },[])
  return (
    React.createElement('div',null,
      React.createElement('h2',null,'Dashboard'),
      incidents.length===0 ? React.createElement('div',null,'No incidents yet') : incidents.map((inc,i)=>React.createElement('div',{key:i,className:'incident'},JSON.stringify(inc)))
    )
  )
}
