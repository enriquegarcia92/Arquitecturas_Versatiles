// NewPasswordForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setNewPassword } from '../api/newPasswordAPI';

const NewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
  token: Yup.string().required('Required'),
});

const NewPasswordForm: React.FC = () => {
  const formikNewPassword = useFormik({
    initialValues: {
      newPassword: '',
      passwordConfirmation: '',
      token: '',
    },
    validationSchema: NewPasswordSchema,
    onSubmit: (values) => {
        console.log(values);
        setNewPassword
            .setPassword(values)
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    window.location.href = "/react/sign-in"
                }
            })
            .catch((error) => {
                console.log(error); 
            })
    },
  });

  return (
    <form onSubmit={formikNewPassword.handleSubmit} className="space-y-6 mt-2">
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          id="newPassword"
          type="password"
          {...formikNewPassword.getFieldProps('newPassword')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formikNewPassword.touched.newPassword && formikNewPassword.errors.newPassword ? (
          <div className="text-sm text-red-600">{formikNewPassword.errors.newPassword}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          id="passwordConfirmation"
          type="password"
          {...formikNewPassword.getFieldProps('passwordConfirmation')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formikNewPassword.touched.passwordConfirmation && formikNewPassword.errors.passwordConfirmation ? (
          <div className="text-sm text-red-600">{formikNewPassword.errors.passwordConfirmation}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="token" className="block text-sm font-medium text-gray-700">Token</label>
        <textarea
          id="token"
          {...formikNewPassword.getFieldProps('token')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formikNewPassword.touched.token && formikNewPassword.errors.token ? (
          <div className="text-sm text-red-600">{formikNewPassword.errors.token}</div>
        ) : null}
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Reset Password
      </button>
    </form>
  );
};

export default NewPasswordForm;
