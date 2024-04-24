import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/Sign-In.tsx';
import SignupPage from './pages/Sign-Up.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/signup", 
    element: <SignupPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*<RouterProvider router={router}/>*/}
    <App/>
  </React.StrictMode>
)
