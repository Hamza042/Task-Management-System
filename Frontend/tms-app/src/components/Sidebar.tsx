import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../redux/hooks";
import { clearCredentials } from "../redux/slices/AuthSlice";
import { clearUser } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(clearCredentials());
    dispatch(clearUser());
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`flex flex-col h-full py-5 transition-all duration-300 ${
        isHovered ? "bg-gray-900 text-white" : "bg-gray-900 text-gray-300"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center mb-9">
        <h1 className="text-2xl font-bold">🚀TMS</h1>
      </div>

      <div className="flex flex-col items-center">
        <SidebarItem
          icon="dashboard"
          label="Dashboard"
          onClick={() => handleNavigation('/layout')}
        />
        <SidebarItem
          icon="tasks"
          label="Task List"
          onClick={() => handleNavigation('/layout/tasks')}
        />
        <SidebarItem
          icon="tasks"
          label="Task Detail"
          onClick={() => handleNavigation('tasks/taskdetail/:id')}
        />
        <SidebarItem
          icon="tasks"
          label="New Task"
          onClick={() => handleNavigation('/layout/tasks/create')}
        />
         <SidebarItem
          icon="people-group"
          label="Teams"
          onClick={() => handleNavigation('team')}
        />
       
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) => {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
      <span className="text-lg">{label}</span>
    </div>
  );
};

export default Sidebar;
