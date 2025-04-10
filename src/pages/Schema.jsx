import React, { useState, useEffect } from 'react'
import { generateSchema } from '../utility/generareFirebaseSchema'

const Schema = () => {
  const [schema, setSchema] = useState(null)
  const [collectionName, setCollectionName] = useState('bajnoksagok')

  const handleSchema = () => {
    generateSchema(collectionName, setSchema)
  }

  console.log(schema)

  return (
    <div>
      <div className='btn' onClick={handleSchema}>show schema</div>

      {schema && Object.entries(schema).map(([key, value]) => (
        <div>
          <div key={key}>{key} - {String(value)}</div>
        </div>
        
      ))}
    </div>
  )
}

export default Schema
