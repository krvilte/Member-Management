import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import Members from "./pages/Members.jsx";
import Plans from "./pages/Plans.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // Protected routes
  {
    path: "/app",
    element: <ProtectedLayout />,
    children: [
      {
        index: true, 
        element: <Navigate to= "dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

//   Undefined routes
{
    path: "*",
    element: <div>404 Not Found</div>,
}
]);
