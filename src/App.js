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
import Home from "./page/Home/Home/Home";
import Blogs from "./page/Blogs/Blogs/Blogs";
import BlogDetails from "./page/Blogs/BlogDetails/BlogDetails";
import QuestionsAnswersHome from "./page/QuestionsAnswers/QuestionsAnswersHome/QuestionsAnswersHome";
import QuestionQuickView from "./page/QuestionsAnswers/QuestionsQuickView/QuestionQuickView";
import PostQuickView from "./page/Home/PostQuickView/PostQuickView";
import ProfileHome from "./page/Profile/ProfileHome/ProfileHome";
import DashboardHome from "./page/Dashboard/DashboardHome/DashboardHome";
import AdminRoute from "./page/Security/AdminRoute/AdminRoute";

function App() {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
          />
          <Route
            path="home/:problemsId"
            element={
              <PrivateRoute>
                <PostQuickView />
              </PrivateRoute>
            }
          />
          <Route
            path="/:problemsId"
            element={
              <PrivateRoute>
                <PostQuickView />
              </PrivateRoute>
            }
          />
          <Route
            path="/answers"
            element={
              <PrivateRoute>
                <QuestionsAnswersHome />
              </PrivateRoute>
            }
          />
          <Route
            path="answers/:questionsId"
            element={
              <PrivateRoute>
                <QuestionQuickView />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <Blogs></Blogs>
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/:blogsId"
            element={
              <PrivateRoute>
                <BlogDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:profileId"
            element={
              <PrivateRoute>
                <ProfileHome></ProfileHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <DashboardHome />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
        </Routes>
        <Footer></Footer>
        {/* </div> */}
      </AuthProvider>
    </BrowserRouter>,

    document.getElementById("root")
  );
}

export default App;
