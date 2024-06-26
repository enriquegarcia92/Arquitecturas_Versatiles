// PasswordRecovery.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import chincheta from '../images/chincheta.png';
import { recoverPRequest } from '../api/recoverPasswordAPI';
import NewPasswordForm from '../components/NewPasswordForm';
import Notification from '../components/Notification';

const RecoverPSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const PasswordRecovery: React.FC = () => {
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
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

  const formikRecover = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: RecoverPSchema,
    onSubmit: (values) => {
      console.log(values);
      recoverPRequest
        .recoverPassword(values.email)
        .then((response) => {
          if(response.status === 200){
            setNotification({
              message: 'Email sent!',
              color: 'bg-green-500',
              showNotification: true,
            });
            setShowNewPasswordForm(true); // Show the new password form on successful request
          }
        })
        .catch((error) => {
          setNotification({
            message: 'An error ocurred, try again!',
            color: 'bg-red-500',
            showNotification: true,
          });
        });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full md:bg-signup-bg md:bg-cover">
      <div className="relative md:h-fit md:border md:rounded-md md:p-8 md:w-2/4 md:shadow-lg md:bg-white xl:w-1/3">
        <h1 className='text-center font-bold text-lg'>{showNewPasswordForm ? 'Reset Your Password' : 'Forgot your password?'}</h1>
        <h1 className='text-center text-sm'>{showNewPasswordForm ? 'Enter your new password and the token you received' : 'Enter your email and receive a temporary access code'}</h1>
        <img
          src={chincheta}
          alt="Decorative"
          className="invisible absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:visible"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        {showNewPasswordForm ? (
          <NewPasswordForm/>
        ) : (
          <form onSubmit={formikRecover.handleSubmit} className="space-y-6 mt-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                {...formikRecover.getFieldProps('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formikRecover.touched.email && formikRecover.errors.email ? (
                <div className="text-sm text-red-600">{formikRecover.errors.email}</div>
              ) : null}
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Send!
            </button>
          </form>
        )}
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

export default PasswordRecovery;
