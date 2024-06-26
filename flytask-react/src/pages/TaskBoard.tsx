import React, { useEffect, useState } from "react";
import { BsListUl, BsGrid3X3Gap } from "react-icons/bs";
import EmptyTaskboard from "./EmptyTaskboard";
import { getTasks } from "../api/getTasksAPI";
import ListView from "../components/ListView";
import KanBan from "../components/KanBan";
import { BiExit } from "react-icons/bi";
import Notification from "../components/Notification";

const BASE_PATH = import.meta.env.VITE_BASE_ROUTES;

const TaskBoard: React.FC = () => {
  const [listMode, setListMode] = useState(false);
  const [kanBanMode, setKanbanMode] = useState(false);
  const [tasks, setTasks] = useState<any>(null);
  const [tasksNumber, setTasksNumber] = useState<any>(null);
  const [notification, setNotification] = useState({
    message: 'Hello, this is a notification!',
    color: 'bg-green-500',
    showNotification: false
  });

  const setShowNotification = (show: boolean) => {
    setNotification({
      ...notification,
      showNotification: show,
    });
  };

  useEffect(() => {
    getTasks
      .getTasks()
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data)
          let tasks = response.data.data;
          setTasks(tasks);
          setTasksNumber(response.data.totalTasks);
        }
      })
      .catch((error) => {
        setNotification({
          message: "An error has ocurred, try again!",
          color: "bg-red-500",
          showNotification: true,
        });
      });
  }, []);

  const handleKanBanMode = () => {
    setKanbanMode(true);
    setListMode(false);
  };

  const handleListMode = () => {
    setListMode(true);
    setKanbanMode(false);
  };

  const handleLogout = () => {
    setNotification({
      message: "Session closed!",
      color: "bg-green-500",
      showNotification: true,
    });
    localStorage.clear();
    window.location.href = `${BASE_PATH}sign-in`;
  };

  return (
    <div className="bg-slate-50 h-screen">
      {/* Top bar with options */}
      <div className="flex justify-center md:justify-end items-center w-full shadow-lg h-[10vh]">
        {/* Options list */}
        <ul className="flex w-fit bg-slate-50">
          <li className="">
            <button
              className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5"
              onClick={handleListMode}
            >
              <BsListUl className="inline-block mr-2" />
              List
            </button>
          </li>
          <li className="">
            <button
              className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5"
              onClick={handleKanBanMode}
            >
              <BsGrid3X3Gap className="inline-block mr-2" />
              Group by Stage
            </button>
          </li>
          <li className="">
            <button
              className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5"
              onClick={handleLogout}
            >
              <BiExit className="inline-block mr-2" />
              Exit
            </button>
          </li>
        </ul>
      </div>

      <div className="h-[90vh]">
        {(tasksNumber > 0) ? (
          listMode ? (
            <ListView tasks={tasks} />
          ) : kanBanMode ? (
            <KanBan tasks={tasks} />
          ) : (
            <ListView tasks={tasks} />
          )
        ) : (
          <EmptyTaskboard />
        )}
      </div>
      <Notification
        message={notification.message}
        color={notification.color}
        showNotification={notification.showNotification}
        setShowNotification={setShowNotification}
      />
    </div>
  );
};

export default TaskBoard;
