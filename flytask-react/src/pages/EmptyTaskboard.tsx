import React, { useState } from 'react';
import emptybox from '../assets/caja-vacia 1.png';
import { MdClose } from 'react-icons/md';
import { Formik, Form, Field } from 'formik';
import { createTask } from '../api/createTaskAPI';
import AddTaskModal from '../components/modals/AddTaskModal';


const EmptyTaskboard: React.FC = () => {
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);

  const openAddTaskModal = () => {
    setAddTaskModalIsOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-8/12 h-4/5 max-w-lg p-8 rounded-lg shadow-md flex flex-col justify-between align-center">
        <h2 className="text-2xl font-bold">It looks a little empty in here...</h2>
        <div className="flex justify-center">
          <img src={emptybox} alt="Card Image" className="w-2/5 h-full object-cover" />
        </div>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md" onClick={openAddTaskModal}>
          Create task
        </button>
        {addTaskModalIsOpen && <AddTaskModal closeAddTaskModal={closeAddTaskModal} />}
      </div>
    </div>
  );
};



export default EmptyTaskboard;
