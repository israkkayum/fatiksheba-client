import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Alert, Box, CircularProgress } from "@mui/material";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const [message, setMessage] = useState("");

  const { registerUser, isLoading, authError, authInfo } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
      setMessage("Your password did not match");
    } else {
      registerUser(
        loginData.email,
        loginData.password,
        loginData.name,
        loginData.status,
        navigate
      );
      setMessage("");
    }

    e.preventDefault();
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {isLoading || authInfo || authError || message ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "50px",
              }}
            >
              {isLoading && <CircularProgress />} <br />
              {authInfo && (
                <Alert variant="filled" severity="success">
                  {authInfo}
                </Alert>
              )}
              {authError && (
                <Alert variant="filled" severity="error">
                  {authError}
                </Alert>
              )}
              {message && (
                <Alert variant="filled" severity="error">
                  {message}
                </Alert>
              )}
            </Box>
          ) : (
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          )}

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <span class="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Full Name
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <span class="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Email address
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password2"
                className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Confirm
              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500">
                Profile status
              </legend>
              <div className="mt-4 flex items-center justify-around">
                <div className="flex items-center gap-x-3">
                  <input
                    id="status"
                    name="status"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    // defaultChecked
                    onChange={handleOnChange}
                    value="patient"
                    required
                  />
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Patient
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="status"
                    name="status"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handleOnChange}
                    value="physician"
                    required
                  />
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Physician
                  </label>
                </div>
              </div>
            </fieldset>

            {/* {loginData.status == "physician" && (
              <>
                <div>
                  <label
                    htmlFor="specialist"
                    className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Specialist
                  </label>
                  <div className="mt-2">
                    <select
                      id="specialist"
                      name="specialist"
                      autoComplete="specialist"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                      onChange={handleOnChange}
                      required
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="certificate"
                    className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Certificates (Drive Link)
                  </label>
                  <div className="mt-2">
                    <input
                      id="certificate"
                      name="certificate"
                      type="text"
                      autoComplete="certificate"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onBlur={handleOnChange}
                    />
                  </div>
                </div>
              </>
            )} */}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
