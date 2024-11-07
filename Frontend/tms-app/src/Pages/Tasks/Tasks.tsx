import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import AdminTaskPage from './AdminTaskPage'
import UserTasks from './UserTaskPage'

const Tasks = () => {
  const role=useAppSelector((state)=>state.auth.role)
  return (
    <>
    {role && role=='Admin'? <AdminTaskPage></AdminTaskPage>
    : <UserTasks></UserTasks>}
    </>
  )
}

export default Tasks