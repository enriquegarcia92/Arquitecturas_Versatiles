import React, { useState } from 'react';
import emptybox from '../assets/caja-vacia 1.png';
import { MdClose } from 'react-icons/md';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createTask } from '../api/createTaskAPI';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Task Name is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date().min(new Date(), 'Due Date cannot be earlier than today').required('Due Date is required'),
  userId: Yup.number().required()
});

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

  const idValue = localStorage.getItem('id');
  const userId: number = Number(idValue) 
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md relative">
        <button className="absolute top-2 right-2 text-gray-700" onClick={closeModal}>
          <MdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create new task</h2>
        <Formik
          initialValues={{ title: '', description: '', dueDate: '', userId: userId}}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);

            createTask
              .createTask(values)
              .then((response) => {
                console.log(response);
                
              })
              .catch((error) => {
                console.log(error);
              })
            closeModal();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="taskName" className="block text-gray-700 font-bold mb-2">Task Name:</label>
                <Field type="text" id="title" name="title" className="w-full p-2 border rounded-md shadow-md" />
                {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <Field as="textarea" id="description" name="description" className="w-full p-2 border rounded-md shadow-md" rows={4} />
                {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
                <Field type="date" id="dueDate" name="dueDate" className="w-full p-2 border rounded-md shadow-md" />
                {errors.dueDate && touched.dueDate && <div className="text-red-500">{errors.dueDate}</div>}
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md">
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default EmptyTaskboard;
