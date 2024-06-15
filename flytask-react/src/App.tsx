import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Sign-In";
import SignupPage from "./pages/Sign-Up";
import TaskBoard from "./pages/TaskBoard";
import PrivateRoutes from "./utils/PrivateRoute";
import PasswordRecovery from "./pages/PasswordRecovery";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SignupPage />} path="/react/register" />
          <Route element={<LoginPage />} path="/react/sign-in" />
          <Route element={<PasswordRecovery />} path="/react/recover-password" />
          <Route element={<PrivateRoutes/>} path="/react/">
            <Route element={<TaskBoard />} path="/react/board" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
