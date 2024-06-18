import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BiChevronDown, BiMoveHorizontal } from "react-icons/bi";
import { Task } from "../utils/types";
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
                className={`p-2 ${statusColor} p-2 rounded-md fit text-center`}
              >
                {title}
              </span>
              <BiChevronDown
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-black`}
              />
            </DisclosureButton>
            <DisclosurePanel className="text-sm text-gray-500 rounded-md w-full">
              {tasks.map((task, index) => (
                <div key={index} className="p-2 w-full hover:bg-mint">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex flex-col w-2/4 justify-center hover:bg-mint p-2"
                      onClick={() => handleEditTask(task)}
                    >
                      <div className="font-medium text-black">{task.title}</div>
                      <div>{task.description}</div>
                    </div>
                    <div className="flex gap-1 w-2/4 md:w-1/4 justify-center items-center p-2">
                      <button
                        className="flex justify-center items-center gap-2 w-1/2 text-white bg-primary p-1 rounded-md hover:bg-gray-500"
                        onClick={() => handleMoveTask(task)}
                      >
                        Move <BiMoveHorizontal />
                      </button>
                      <div className="w-1/2">
                        <DeleteButton task={task} />
                      </div>
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
