import React from 'react'
import { useAppSelector } from '../redux/hooks'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import UserDashboard from './UserDashboard/UserDashboard'

export default function Dashboard() {
 const role=useAppSelector((state)=>state.auth.role)

  return (
    <div>
        {role=="Admin"?<AdminDashboard/> : <UserDashboard/>}
    </div>
  )
}
