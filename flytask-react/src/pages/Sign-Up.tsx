import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import chincheta from "../images/chincheta.png";
import { registerUser } from "../api/registerAPI";

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
          setIsLoading(false);
          let status = response.status === 200;
          setErrorStatus(!status);
          setRegStatus(status);
        })
        .catch((error) => {
          let status = error.response.status === 200;
          setErrorStatus(!status);
          setRegStatus(status);
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="h-screen bg-signup-background bg-cover bg-center flex justify-center items-center w-screen">
      {/* Container for the card and the image */}
      <div className="relative bg-slate-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center font-bold">{
          regStatus ? "Your account has been registered" : errorStatus ? "An error has ocurred, try again" : "Join us!"
        }</h1>
        {/* Absolute positioned image */}
        <img
          src={chincheta} // Replace with your image path
          alt="Decorative"
          className="absolute top-0 left-0 w-20 h-20 object-cover" // Adjust width (w) and height (h) as needed
          style={{ transform: "translate(-50%, -50%)" }} // Adjust the image to "peek" from the corner
        />

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading
                ? "Loading..."
                : regStatus
                ? "Success!, please" + <a href="/login">Log in.</a>
                : "Register"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;