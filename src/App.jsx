import { Routes, Route, Navigate, RouterProvider, useRoutes, BrowserRouter } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from 'react-toastify';
import { SignIn } from "./pages/auth";
import routes from "./routes";
import NoNetwork from "./pages/NoNetwork/NoNetwork";
import "./index.css"

function App() {
  const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
  };

  return (
    <>
    <AppRoutes />
    <ToastContainer position="bottom-right" limit={4} autoClose={3000}/>
    </>
  );
}

export default App;
