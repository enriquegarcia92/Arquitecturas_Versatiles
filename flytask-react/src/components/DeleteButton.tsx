import React, { useState } from 'react';
import { Task } from '../utils/types';
import { deleteTask } from '../api/deleteTaskAPI';
import { FcDeleteRow } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

type DeleteButtonProps = {
  task: Task
};

const DeleteButton: React.FC<DeleteButtonProps> = ({task}) => {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
    }, 3000); // Automatically revert to the original state after 3 seconds
  };

  const handleDelete = () => {
    deleteTask
      .deleteTask(task.taskId)
      .then((response) => {
        if(response.status === 200){
          window.location.reload()
        } 
      })
      .catch((error) => {
        console.log(error);
      })
      
    setConfirming(false);
  };

  return (
    <div className="w-fit">
      {!confirming ? (
        <button
          onClick={handleConfirm}
          className="bg-red-600 flex justify-evenly items-center text-white p-2 rounded-md hover:bg-red-700 w-full"
        >
          Delete
          <MdDeleteOutline/>
        </button>
      ) : (
        <div className='flex gap-1'>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;