import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BiChevronDown, BiMoveHorizontal } from "react-icons/bi";
import { Task } from "../utils/types";
import { MdAddTask } from "react-icons/md";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import MoveTaskModal from "./modals/MoveTaskModal";
import DeleteButton from "./DeleteButton";

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
  const [moveTaskModalIsOpen, setMoveTaskModalIsOpen] = useState(false);

  const openEditTaskModal = () => {
    console.log(selectedTask);
    setEditTaskModalIsOpen(true);
  };

  const closeEditTaskModal = () => {
    setEditTaskModalIsOpen(false);
  };

  const openMoveTaskModal = () => {
    setMoveTaskModalIsOpen(true);
  };

  const closeMoveTaskModal = () => {
    setMoveTaskModalIsOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    openEditTaskModal();
  };

  const handleMoveTask = (task: Task) => {
    setSelectedTask(task);
    openMoveTaskModal();
  };

  return (
    <div className="w-full bg-glacierWhite rounded-md border border-primary">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="flex justify-between border-b-2 border-primary items-center w-full px-4 py-2 text-sm font-medium text-left text-black bg-glacierWhite rounded-lg hover:bg-mint">
              <span
                className={`p-2 ${statusColor} rounded-md w-1/6 text-center`}
              >
                {title}
              </span>
              <BiChevronDown
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-purple-500`}
              />
            </DisclosureButton>
            <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              {tasks.map((task, index) => (
                <div key={index} className="cursor-pointer p-2 rounded-md">
                  <div className="flex justify-between items-center border border-gray-500 rounded-md">
                    <div
                      className="flex flex-col w-4/5 justify-center hover:bg-mint p-2"
                      onClick={() => handleEditTask(task)}
                    >
                      <div className="font-medium text-black">{task.title}</div>
                      <div>{task.description}</div>
                    </div>
                    <div className="flex gap-1 w-1/5 justify-center items-center p-2">
                      <button
                        className="flex items-center gap-2 text-white bg-charcoal p-2 rounded-md hover:bg-gray-500"
                        onClick={() => handleMoveTask(task)}
                      >
                        Move <BiMoveHorizontal />
                      </button>
                      <DeleteButton task={task} />
                    </div>
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
      {moveTaskModalIsOpen && selectedTask && (
        <MoveTaskModal
          task={selectedTask}
          closeMoveTaskModal={closeMoveTaskModal}
        />
      )}
    </div>
  );
};

export default TaskAccordion;
