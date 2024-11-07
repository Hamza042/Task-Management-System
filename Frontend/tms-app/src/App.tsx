import './index.css';
import {Register} from "./Pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Pages/Login';
import Layout from './layout';
import Profile from './Pages/Profile';
import Tasks from './Pages/Tasks/Tasks';
import Team from './Pages/Team';
import Dashboard from './Pages/Dashboard';
import { CreateTaskForm } from './Pages/CreateTask';
import './styles.css';
import TaskDetails from './Pages/TaskDetailsPage/TaskDetails';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/layout' element={<Layout />}>
            <Route path='' element={<Dashboard/>} />
            <Route path='profile' element={<Profile />} />
            <Route path='tasks' element={<Tasks />} />
            <Route path='team' element={<Team/>} />
            <Route path='tasks/create' element={<CreateTaskForm/>} />
            <Route path='tasks/taskdetail/:id' element={<TaskDetails/>} />
           

        </Route>
    </Routes>
</BrowserRouter>

    
  )
}

export default App
