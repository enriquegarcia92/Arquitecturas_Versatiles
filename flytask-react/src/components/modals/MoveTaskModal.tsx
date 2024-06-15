import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Task } from "../../utils/types";
import { moveTask } from "../../api/moveTaskAPI";

const statuses = [
  { label: "Upcoming", value: "upcoming" },
  { label: "To Do", value: "todo" },
  { label: "Doing", value: "doing" },
  { label: "Done", value: "done" },
];

type MoveTaskModalProps = {
  closeMoveTaskModal: () => void;
  task: Task;
};

export const MoveTaskModal: React.FC<MoveTaskModalProps> = ({
  closeMoveTaskModal,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleMoveTask = (selectedStatus: string, taskId: number) => {
    console.log(selectedStatus);
    console.log(taskId);
    
    moveTask
        .moveTask(selectedStatus, taskId)
        .then((response) => {
            console.log(response);
            window.location.reload()
        }) 
        .catch((error) => {
            console.log(error);
            
        })
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={closeMoveTaskModal}
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Move task</h2>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Where should this task go?
          </label>
          <select
            id="status"
            name="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select status
            </option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {handleMoveTask(selectedStatus, task.taskId)}}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-500"
        >
          Move task
        </button>
      </div>
    </div>
  );
};

export default MoveTaskModal;
