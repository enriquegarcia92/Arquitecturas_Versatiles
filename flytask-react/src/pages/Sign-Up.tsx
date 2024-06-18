import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import chincheta from "../images/chincheta.png";
import { registerUser } from "../api/registerAPI";
import Notification from "../components/Notification";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const SignupPage: React.FC = () => {
  const [regStatus, setRegStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    color: '',
    showNotification: false,
  });

  const setShowNotification = (show: boolean) => {
    setNotification({
      ...notification,
      showNotification: show,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      console.log(values);

      registerUser
        .register(values)
        .then((response) => {
          if(response.status === 200){
            setNotification({
              message: 'Account registered!',
              color: 'bg-green-500',
              showNotification: true,
            });
            window.location.href = "/react/login"
          }
        })
        .catch((error) => {
          setNotification({
            message: 'An error has ocurred, try again!',
            color: 'bg-red-500',
            showNotification: true,
          });
        });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full md:bg-appBg md:bg-cover">
      {/* Container for the card and the image */}
      <div className="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3">
        <h1 className="text-center font-bold">{
          regStatus ? "Your account has been registered" : errorStatus ? "An error has ocurred, try again" : "Join us!"
        }</h1>
        {/* Absolute positioned image */}
        <img
          src={chincheta} // Replace with your image path
          alt="Decorative"
          className="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible" // Adjust width (w) and height (h) as needed
          style={{ transform: "translate(-50%, -50%)" }} // Adjust the image to "peek" from the corner
        />

        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm text-red-600">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-yellow flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white"
              >
                Register
            </button>
          </div>
          <a href="" className="text-center">I already have an account!</a>
        </form>
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

export default SignupPage;
