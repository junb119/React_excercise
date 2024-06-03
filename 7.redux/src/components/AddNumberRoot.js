import React, { Component } from 'react'
import AddNumber from './AddNumber';

function AddNumberRoot(props){
  return (
    <div>
      <h1>Add Number Root</h1>
      <AddNumber onclick={(size)=>{
        props.onclick(size);
    }}/>
    </div>
  )
}

export default AddNumberRoot;