// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render } from "react-dom";

import Login from "./page/Security/Login/Login";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import Register from "./page/Security/Register/Register";
import PrivateRoute from "./page/Security/PrivateRoute/PrivateRoute";
import Navbar from "./page/Share/Navbar/Navbar";
import Footer from "./page/Share/Footer/Footer";
import SettingsHome from "./page/Settings/SettingsHome/SettingsHome";

function App() {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsHome />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
        </Routes>
        <Footer></Footer>
      </AuthProvider>
    </BrowserRouter>,

    document.getElementById("root")
  );
}

export default App;
