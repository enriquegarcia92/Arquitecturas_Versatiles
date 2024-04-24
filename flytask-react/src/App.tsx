import "./App.css";
import LoginPage from "./pages/Sign-In";
import SignupPage from "./pages/Sign-Up";
import TaskBoard from "./pages/TaskBoard";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SignupPage />} path="/register" />
          <Route element={<LoginPage />} path="/sign-in" />
          <Route element={<PrivateRoutes/>} path="/">
            <Route element={<TaskBoard />} path="/board" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
