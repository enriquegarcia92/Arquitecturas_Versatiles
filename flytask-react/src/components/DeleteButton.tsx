import React, { useState } from 'react';
import { Task } from '../utils/types';
import { deleteTask } from '../api/deleteTaskAPI';
import { FcDeleteRow } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import Notification from './Notification';

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

  const [notification, setNotification] = useState({
    message: 'Hello, this is a notification!',
    color: 'bg-green-500',
    showNotification: false
  });

  const setShowNotification = (show: boolean) => {
    setNotification({
      ...notification,
      showNotification: show,
    });
  };

  const handleDelete = () => {
    deleteTask
      .deleteTask(task.taskId)
      .then((response) => {
        if(response.status === 200){
          setNotification({
            message: 'Task deleted!',
            color: 'bg-green-500',
            showNotification: true,
          });
          window.location.reload()
        } 
      })
      .catch((error) => {
        setNotification({
          message: 'An error has ocurred, try again!',
          color: 'bg-red-500',
          showNotification: true,
        });
      })
      
    setConfirming(false);
  };

  return (
    <div className="w-full">
      {!confirming ? (
        <button
          onClick={handleConfirm}
          className="bg-red-600 flex justify-center items-center text-white p-1 rounded-md hover:bg-red-700 w-full"
        >
          Delete
          <MdDeleteOutline/>
        </button>
      ) : (
        <div className='flex gap-1 w-full'>
          <button
            onClick={handleDelete}
            className="bg-red-600 w-1/2 text-white p-1 rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="bg-gray-600 w-1/2 text-white p-1 rounded-md hover:bg-gray-700"
          >
            No
          </button>
        </div>
      )}
      <Notification
          message={notification.message}
          color={notification.color}
          showNotification={notification.showNotification}
          setShowNotification={setShowNotification}
        />
    </div>
  );
};

export default DeleteButton;