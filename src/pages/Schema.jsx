import React from 'react'
import { generateSchema } from '../utility/generareFirebaseSchema'
import { useState } from 'react'
import { useEffect } from 'react'

const Schema = () => {
  const [schema,setSchema]=useState(null)
  const [collectionName,setCollectionName]=useState('categories')
   
  const handleSchema=()=>{
    console.log('klikk volt');
    
    generateSchema(collectionName,setSchema)
  }
  console.log(schema);
  
  return (
    <div style={{padding:'6rem'}}>
      
      <button onClick={handleSchema}>show schema</button>
     {schema && Object.entries(schema).map(([key,value])=>
     <div>{key} - {value}</div>
     )}

    </div>
  )
}

export default Schema
