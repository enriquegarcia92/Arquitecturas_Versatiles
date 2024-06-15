import React, { useState } from "react";
import {
  BsArrow90DegRight,
  BsArrowsMove,
  BsPencil,
  BsSearch,
} from "react-icons/bs";
import { Task } from "../utils/types";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import {
  isoToYYYYMMDD,
  numberToStatusColorConverter,
  numberToStatusConverter,
} from "../utils/dataConversions";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiMoveHorizontal,
  BiX,
} from "react-icons/bi";
import { MdAddTask } from "react-icons/md";
import MoveTaskModal from "./modals/MoveTaskModal";
import DeleteButton from "./DeleteButton";

type ListViewProps = {
  tasks: Task[];
};

const ListView: React.FC<ListViewProps> = ({ tasks }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);
  const [moveTaskModalIsOpen, setMoveTaskModalIsOpen] = useState(false);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const openAddTaskModal = () => {
    setAddTaskModalIsOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalIsOpen(false);
  };

  const openMoveTaskModal = () => {
    setMoveTaskModalIsOpen(true);
  };

  const closeMoveTaskModal = () => {
    setMoveTaskModalIsOpen(false);
  };

  const openEditTaskModal = () => {
    setEditTaskModalIsOpen(true);
  };

  const closeEditTaskModal = () => {
    setEditTaskModalIsOpen(false);
  };

  const handleSelectedTask = (task: Task) => {
    setSelectedTask(task);
    openEditTaskModal();
  };

  const handleMoveTask = (task: Task) => {
    setSelectedTask(task);
    openMoveTaskModal();
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-4/5 w-11/12 bg-glacierWhite rounded-lg shadow-lg flex flex-col">
        <div className="h-fit flex justify-between p-3 gap-3">
          <input
            type="text"
            className="w-5/6 bg-mint rounded-md px-3 py-2"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="w-1/6 flex gap-2">
            <button
              className="bg-yellow px-3 rounded-md text-white w-full flex justify-center items-center gap-2"
              onClick={openAddTaskModal}
            >
              Add Task
              <MdAddTask />
            </button>
          </div>
        </div>
        <div className="h-4/5 p-3 overflow-y-auto flex flex-col gap-2">
          {/* List of tasks */}
          {filteredTasks.map((task) => (
            <div key={task.taskId}>
              {/* Render task details here */}
              <div className="w-full flex justify-between rounded-md py-1 shadow-md border border-mint">
                <div
                  className="flex justify-between m-1 items-center w-4/5 hover:bg-mint hover:rounded-md hover:border-r-2 hover:border-primary"
                  onClick={() => handleSelectedTask(task)}
                >
                  <div className="flex flex-col w-1/2 p-2 gap-1 justify-start">
                    <h3 className="text-lg font-medium">{task.title}</h3>
                    <p className="text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex justify-center items-end w-full me-2">
                    <p className="text-md font-medium rounded-md p-1 w-1/2 text-center">
                      Due: {isoToYYYYMMDD(task.dueDate)}
                    </p>
                    <p
                      className={`text-md font-medium p-1 rounded-md w-1/2 text-center ${numberToStatusColorConverter(
                        task.status
                      )}`}
                    >
                      {numberToStatusConverter(task.status)}
                    </p>
                  </div>
                </div>
                <div className="w-full flex w-1/5 justify-center me-2 gap-1 items-center">
                  <button
                    className="bg-primary text-white p-2 w-fit rounded-md hover:bg-gray-500 flex gap-1 items-center justify-center"
                    onClick={() => handleMoveTask(task)}
                  >
                    Move
                    <BiMoveHorizontal />
                  </button>
                  <DeleteButton task={task} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {addTaskModalIsOpen && (
        <AddTaskModal closeAddTaskModal={closeAddTaskModal} />
      )}
      {editTaskModalIsOpen && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          closeEditTaskModal={closeEditTaskModal}
        />
      )}
      {moveTaskModalIsOpen && selectedTask && (
        <MoveTaskModal
          closeMoveTaskModal={closeMoveTaskModal}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default ListView;
