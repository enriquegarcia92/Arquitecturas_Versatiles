import { Field, Form, Formik } from "formik";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";
import { createTask } from "../../api/createTaskAPI";
import { useState } from "react";
import Notification from "../Notification";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Task Name is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date()
    .min(new Date(), "Due Date cannot be earlier than today")
    .required("Due Date is required"),
  userId: Yup.number().required(),
});

export const AddTaskModal: React.FC<{ closeAddTaskModal: () => void }> = ({
  closeAddTaskModal,
}) => {
  const idValue = localStorage.getItem("id");
  const userId: number = Number(idValue);

  const [notification, setNotification] = useState({
    message: "Hello, this is a notification!",
    color: "bg-green-500",
    showNotification: false,
  });

  const setShowNotification = (show: boolean) => {
    setNotification({
      ...notification,
      showNotification: show,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden h-fit p-8 w-5/6 md:w-2/3 lg:w-1/3">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={closeAddTaskModal}
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create new task</h2>
        <Formik
          initialValues={{
            title: "",
            description: "",
            dueDate: "",
            userId: userId,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);

            createTask
              .createTask(values)
              .then((response) => {
                if (response.status === 200) {
                  setNotification({
                    message: 'Task created!',
                    color: 'bg-green-500',
                    showNotification: true,
                  });
                  window.location.reload();
                }
              })
              .catch((error) => {
                setNotification({
                  message: 'An error has ocurred, try again!',
                  color: 'bg-red-500',
                  showNotification: true,
                });
              });
            closeAddTaskModal();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Task Name:
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-2 border border-primary bg-mint rounded-md shadow-md"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500">{errors.title}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description:
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full p-2 border border-primary bg-mint  rounded-md shadow-md"
                  rows={4}
                />
                {errors.description && touched.description && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Due Date:
                </label>
                <Field
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="w-full p-2 border border-primary bg-mint  rounded-md shadow-md"
                />
                {errors.dueDate && touched.dueDate && (
                  <div className="text-red-500">{errors.dueDate}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow hover:bg-yellow text-white py-2 px-4 rounded-md shadow-md"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Notification
          message={notification.message}
          color={notification.color}
          showNotification={notification.showNotification}
          setShowNotification={setShowNotification}
        />
    </div>
  );
};

export default AddTaskModal;
