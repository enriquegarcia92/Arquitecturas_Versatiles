import { useFormik } from "formik";
import * as Yup from "yup";
import chincheta from "../images/chincheta.png";
import { loginUser } from "../api/loginAPI";
import { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { whoami } from "../api/whoamiAPI";
const BASE_PATH = import.meta.env.VITE_BASE_ROUTES;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short").required("Required"),
});

const LoginPage: React.FC = () => {
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

  useEffect(() => {
    whoami
    .whoami()
      .then((response) => {
        if (response.status === 200) {
          setNotification({
            message: 'Session restored!',
            color: 'bg-green-500',
            showNotification: true,
          });
          window.location.href = `${BASE_PATH}board`
        }
      })
      .catch((error) => {
        localStorage.clear();
      });
      
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      loginUser
        .login(values)
        .then((response) => {
          if (response.status === 200) {
            setNotification({
              message: 'Sign in successful!',
              color: 'bg-green-500',
              showNotification: true,
            });
            
            let token = response.data.token;
            if (token) {
              localStorage.setItem("name", response.data.name);
              localStorage.setItem("token", token);
              localStorage.setItem("id", response.data.id);
              window.location.href = `${BASE_PATH}board`;
            }
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
    <div className="flex flex-col justify-center items-center h-screen w-full md:bg-signup-bg md:bg-cover">
      {/* Container for the card and the image */}
      <div className="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3">
        <h1 className="text-center font-bold text-lg">Welcome</h1>
        <h1 className="text-center text-sm">
          FlyTask: where your productivity takes flight!
        </h1>
        {/* Absolute positioned image */}
        <img
          src={chincheta} // Use your image path
          alt="Decorative"
          className="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible" // Adjust width (w) and height (h) as needed
          style={{ transform: "translate(-50%, -50%)" }} // Adjust the image to "peek" from the corner
        />

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
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
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow"
            >
              Login
            </button>
          </div>
          <a href={`${BASE_PATH}register`} className="text-center mb-4">
            New around here? register for free!
          </a>
          <a href={`${BASE_PATH}recover-password`} className="text-center">
            Forgot your password?
          </a>
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

export default LoginPage;
