import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BiChevronDown, BiMoveHorizontal } from "react-icons/bi";
import { Task } from "../utils/types";
import EditTaskModal from "./modals/EditTaskModal";

type AccordionProps = {
  title: string;
  tasks: Task[];
  statusColor: string;
};

export const TaskAccordion: React.FC<AccordionProps> = ({
  title,
  tasks,
  statusColor,
}) => {

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);

  const openEditTaskModal = () => {
    console.log(selectedTask);
    setEditTaskModalIsOpen(true);
  };

  const closeEditTaskModal = () => {
    setEditTaskModalIsOpen(false);
  };

  const handleSelectedTask = (task: Task | null) => {
    setSelectedTask(task);
    openEditTaskModal();
  };


  return (
    <div className="w-full bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-black bg-white rounded-lg hover:bg-mint">
                <span className={`p-2 ${statusColor} rounded-md w-1/6 text-center`}>{title}</span>
                <BiChevronDown
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-purple-500`}
                />
              </DisclosureButton>
              <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="mt-2 cursor-pointer p-2 rounded-md hover:bg-mint"
                    onClick={() => handleSelectedTask(task)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col justify-center">
                        <div className="font-medium">{task.title}</div>
                        <div>{task.description}</div>
                      </div>
                      <button className="flex items-center gap-2 text-white bg-primary p-2 rounded-md hover:bg-green-500">Move <BiMoveHorizontal/> </button>
                    </div>
                  </div>
                ))}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      {editTaskModalIsOpen && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          closeEditTaskModal={closeEditTaskModal}
        />
      )}
      </div>
  );
};

export default TaskAccordion;
