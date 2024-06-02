import React from "react";
import { Field, Form, Formik } from "formik";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";
import { Task } from "../../utils/types";
import { editTask } from "../../api/editTaskAPI";
import { yyyymmddToISO } from "../../utils/dataConversions";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Task Name is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date()
    .min(new Date(), "Due Date cannot be earlier than today")
    .required("Due Date is required"),
  userId: Yup.number().required(),
});

type EditTaskModalProps = {
  closeEditTaskModal: () => void;
  task: Task;
};

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  closeEditTaskModal,
  task,
}) => {
  const idValue = localStorage.getItem("id");
  const userId: number = Number(idValue);

  const handleEdit = () => {
    console.log();
    
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={closeEditTaskModal}
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit task</h2>
        <Formik
          initialValues={{
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.split("T")[0], // to format as YYYY-MM-DD
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            editTask
              .editTask(
                {
                  title: values.title,
                  description: values.description,
                  dueDate: yyyymmddToISO(values.dueDate),
                },
                task.taskId
              )
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
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
                  className="w-full p-2 border border-primary bg-mint rounded-md shadow-md"
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
                  className="w-full p-2 border border-primary bg-mint rounded-md shadow-md"
                />
                {errors.dueDate && touched.dueDate && (
                  <div className="text-red-500">{errors.dueDate}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow hover:bg-yellow text-white py-2 px-4 rounded-md shadow-md"
              >
                Update task
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditTaskModal;
