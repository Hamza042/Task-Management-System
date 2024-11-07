import { useAppSelector } from "../../redux/hooks"
import AdminTaskDetails from "./AdminTaskDetails"
import UserTaskDetails from "./UserTaskDetails"

const TaskDetails: React.FC=()=>{
    const role=useAppSelector((state)=>state.auth.role)
    return(
        <>
            {role ==="Admin"? <AdminTaskDetails/>:
            <UserTaskDetails/>}
        </>
    )
}

export default TaskDetails