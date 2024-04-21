import React from "react";
import {
  BsListUl,
  BsFilter,
  BsGrid3X3Gap,
  BsArrowBarDown,
} from "react-icons/bs";
import EmptyTaskboard from "./EmptyTaskboard";

const TaskBoard: React.FC = () => {
  return (
    <div className="bg-slate-50 h-screen">
      {/* Top bar with options */}
      <div className="flex justify-between items-center w-full shadow-lg">
        {/* Options list */}
        <ul className="flex w-full bg-slate-50 h-fit">
          <li className="">
            <button className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5">
              <BsListUl className="inline-block mr-2" />
              Tasks
            </button>
          </li>
          <li className="">
            <button className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5">
              <BsFilter className="inline-block mr-2" />
              Filter
            </button>
          </li>
          <li className="">
            <button className="text-gray-800 bg-slate-50 hover:bg-slate-100 p-5">
              <BsGrid3X3Gap className="inline-block mr-2" />
              Group by Stage
            </button>
          </li>
        </ul>
        {/* Other elements in the top bar */}
        {/* Add more elements as needed */}
      </div>

      {/* Main content of the dashboard */}
      <div className="h-screen">
        <EmptyTaskboard/>
      </div>
    </div>
  );
};

export default TaskBoard;
