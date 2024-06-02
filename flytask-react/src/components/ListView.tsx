import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Task } from "../utils/types";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import { numberToStatusColorConverter, numberToStatusConverter } from "../utils/dataConversions";

type ListViewProps = {
  tasks: Task[];
};

const ListView: React.FC<ListViewProps> = ({ tasks }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const openAddTaskModal = () => {
    setAddTaskModalIsOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalIsOpen(false);
  };

  const openEditTaskModal = () => {
    setEditTaskModalIsOpen(true);
  };

  const closeEditTaskModal = () => {
    setEditTaskModalIsOpen(false);
  };

  const handleSelectedTask = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-4/5 w-11/12 bg-glacierWhite rounded-lg shadow-lg flex flex-col">
        <div className="h-fit flex justify-between p-3 gap-3">
          <input
            type="text"
            className="w-5/6 bg-mint focus:outline-none focus:ring-primary focus:ring-1 rounded-md px-3 py-2"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="w-1/6 flex gap-2">
            <button
              className="bg-charcoal px-3 rounded-md text-white"
              onClick={openEditTaskModal}
            >
              Edit Task
            </button>
            <button
              className="bg-yellow px-3 rounded-md text-white"
              onClick={openAddTaskModal}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="h-4/5 p-3 overflow-y-auto">
          {/* List of tasks */}
          {filteredTasks.map((task) => (
            <div
              key={task.taskId}
              className={`flex items-center cursor-pointer ${
                selectedTask?.taskId === task.taskId ? "bg-mint rounded-md" : ""
              }`}
              onClick={() => handleSelectedTask(task)}
            >
              {/* Render task details here */}
              <div className="w-full flex justify-between border border-primary rounded-md py-1">
                <div className="flex flex-col w-fit">
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className="text-gray-500">{task.description}</p>
                </div>
                <div className="flex flex-col w-fit justify-center items-center gap-1">
                  <p className="text-md font-medium border border-primary rounded-md p-1">Due: {task.dueDate}</p>
                  <p className={`text-md font-medium p-1 rounded-md ${numberToStatusColorConverter(task.status)}`}>{numberToStatusConverter(task.status)}</p>
                </div>
              </div>
              {/* Add more task details if needed */}
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
    </div>
  );
};

export default ListView;
