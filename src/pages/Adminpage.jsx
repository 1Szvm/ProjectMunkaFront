import React, { useState } from 'react'
import Schema from './Schema'
import AdminUsersList from './AdminUsersList'

export default function AdminPage() {
    const [selected,setSelected]=useState(false)
  return (
    <div>
        <div className="join flex justify-center mb-4 mt-4">
            <div className={`btn text-white join-item ${!selected?"bg-blue-600 hover:bg-blue-700":""}`} onClick={()=>setSelected(false)}>Users</div>
            <div className={`btn text-white join-item ${selected?"bg-blue-600 hover:bg-blue-700":""}`} onClick={()=>setSelected(true)}>Schema</div>
        </div>
        {!selected?
        <AdminUsersList />
        :
        <Schema />}
    </div>
  )
}
