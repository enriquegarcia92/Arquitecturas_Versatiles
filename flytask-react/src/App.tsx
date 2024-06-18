import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Sign-In";
import SignupPage from "./pages/Sign-Up";
import TaskBoard from "./pages/TaskBoard";
import PrivateRoutes from "./utils/PrivateRoute";
import PasswordRecovery from "./pages/PasswordRecovery";

const BASE_PATH = import.meta.env.VITE_BASE_ROUTES
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SignupPage />} path={`${BASE_PATH}register`} />
          <Route element={<LoginPage />} path={`${BASE_PATH}/*`} />
          <Route element={<LoginPage />} path={`${BASE_PATH}/`} />
          <Route element={<LoginPage />} path={`${BASE_PATH}sign-in`} />
          <Route element={<PasswordRecovery />} path={`${BASE_PATH}recover-password`} />
          <Route element={<PrivateRoutes />} path={`${BASE_PATH}`}>
            <Route element={<TaskBoard />} path={`${BASE_PATH}board`} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
