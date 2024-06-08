import { useFormik } from 'formik';
import * as Yup from 'yup';
import chincheta from '../images/chincheta.png';
import { loginUser } from '../api/loginAPI';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Password is too short').required('Required'),
});

const LoginPage: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      loginUser
        .login(values)
        .then((response) => {
          console.log(response);
          let token = response.data.token 
          if(token){
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('token', token)
            localStorage.setItem('id', response.data.id)
            window.location.href = '/board'
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div className="h-screen bg-signup-background bg-cover bg-center flex justify-center items-center w-screen">
      {/* Container for the card and the image */}
      <div className="relative bg-slate-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className='text-center font-bold text-lg'>Welcome</h1>
        <h1 className='text-center text-sm'>FlyTask: where your productivity takes flight!</h1>
        {/* Absolute positioned image */}
        <img
          src={chincheta} // Use your image path
          alt="Decorative"
          className="absolute top-0 left-0 w-20 h-20 object-cover" // Adjust width (w) and height (h) as needed
          style={{ transform: 'translate(-50%, -50%)' }} // Adjust the image to "peek" from the corner
        />

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-600">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
