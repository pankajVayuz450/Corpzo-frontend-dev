/**
=========================================================
* Material Tailwind Dashboard React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './redux/store';
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <ThemeProvider>
    <Provider store={store}>
        <MaterialTailwindControllerProvider>
        
             <App />
         
        </MaterialTailwindControllerProvider>
    </Provider>
      </ThemeProvider>
  </BrowserRouter>
);
