import React, { useState } from 'react';
import emptybox from '../assets/caja-vacia 1.png';
import { MdClose } from 'react-icons/md';

const EmptyTaskboard: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-8/12 h-4/5 max-w-lg p-8 rounded-lg shadow-md flex flex-col justify-between align-center">
        <h2 className="text-2xl font-bold">It looks a little empty in here...</h2>
        <div className="flex justify-center">
          <img src={emptybox} alt="Card Image" className="w-2/5 h-full object-cover" />
        </div>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md" onClick={openModal}>
          Create task
        </button>
        {modalIsOpen && <Modal closeModal={closeModal} />}
      </div>
    </div>
  );
};

const Modal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
      <div className="bg-white w-96 p-8 rounded-lg shadow-md relative">
        <button className="absolute top-2 right-2 text-gray-700" onClick={closeModal}>
          <MdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create new task</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="taskName" className="block text-gray-700 font-bold mb-2">Task Name:</label>
            <input type="text" id="taskName" className="w-full p-2 border rounded-md shadow-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea id="description" className="w-full p-2 border rounded-md shadow-md" rows={4}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
            <input type="date" id="dueDate" className="w-full p-2 border rounded-md shadow-md" />
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md" onClick={closeModal}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmptyTaskboard;
