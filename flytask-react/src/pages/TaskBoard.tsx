import React, { useEffect, useState } from "react";
import {
  BsListUl,
  BsFilter,
  BsGrid3X3Gap,
  BsArrowBarDown,
} from "react-icons/bs";
import EmptyTaskboard from "./EmptyTaskboard";
import { getTasks } from "../api/getTasksAPI";
import ListView from "../components/ListView";
import KanBan from "../components/KanBan";
import { BiExit } from "react-icons/bi";

const TaskBoard: React.FC = () => {
  const [listMode, setListMode] = useState(false);
  const [kanBanMode, setKanbanMode] = useState(false);
  const [tasks, setTasks] = useState<any>(null)

  useEffect(() => {
    getTasks
      .getTasks()
      .then((response) => {
        console.log(response);
        let tasks = response.data.data;
        console.log(tasks);
        setTasks(tasks);
      })
      .catch((error) => {
        if(error){
          window.location.href = '/sign-in'
        }
      })
  }, []);

  const handleKanBanMode = () => {
    setKanbanMode(true)
    setListMode(false)
  }

  const handleListMode = () => {
    setListMode(true)
    setKanbanMode(false)
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="bg-slate-50 h-screen">
      {/* Top bar with options */}
      <div className="flex justify-between items-center w-full shadow-lg h-[10vh]">
        {/* Options list */}
        <ul className="flex justify-end w-full bg-slate-50">
          <li className="">
            <button className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5" onClick={handleListMode}>
              <BsListUl className="inline-block mr-2" />
              List
            </button>
          </li>
          <li className="">
            <button className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5" onClick={handleKanBanMode}>
              <BsGrid3X3Gap className="inline-block mr-2" />
              Group by Stage  
            </button>
          </li>
          <li className="">
            <button className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5" onClick={handleLogout}>
              <BiExit className="inline-block mr-2" />
              Exit
            </button>
          </li>
        </ul>
      </div>

      <div className="h-[90vh]">
        {tasks ? (listMode ? <ListView tasks={tasks}/> : kanBanMode ? <KanBan tasks={tasks}/> : <ListView tasks={tasks}/>) : <EmptyTaskboard/>}
      </div>
    </div>
  );
};

export default TaskBoard;
