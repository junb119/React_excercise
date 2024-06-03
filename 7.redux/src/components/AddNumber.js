import React, { Component,useState } from 'react'

function AddNumber(props){
  const[size, setSize]=useState(0);
  return (
    <div>
      <h1>Add Number</h1>
      <button onClick={()=>{
        let number = size
        setSize(++number);
        props.onclick(number);
      }}>Add</button>
      <input type="text" value={size}/>
    </div>
  )
}

export default AddNumber;