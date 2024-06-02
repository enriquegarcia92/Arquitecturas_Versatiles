import React from "react";
import { Task } from "../utils/types";
import TaskAccordion from "./TaskAccordion";
import { filterTasksById, numberToStatusColorConverter } from "../utils/dataConversions";

type KanBanProps = {
  tasks: Task[]
};

const KanBan: React.FC<KanBanProps> = ({tasks}) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-5/6  w-11/12 bg-glacierWhite rounded-lg shadow-lg flex flex-col p-2 gap-2">
        <TaskAccordion tasks={filterTasksById(tasks, 0)} title="Upcoming" statusColor={numberToStatusColorConverter(0)}/>
        <TaskAccordion tasks={filterTasksById(tasks, 1)} title="To do" statusColor={numberToStatusColorConverter(1)}/>
        <TaskAccordion tasks={filterTasksById(tasks, 2)} title="Doing" statusColor={numberToStatusColorConverter(2)}/>
        <TaskAccordion tasks={filterTasksById(tasks, 3)} title="Done" statusColor={numberToStatusColorConverter(3)}/>
      </div>
    </div>
  );
};

export default KanBan;
