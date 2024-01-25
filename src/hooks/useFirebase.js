import { useState, useEffect, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";
import initializeAuthentication from "../page/Security/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authInfo, setAuthInfo] = useState("");
  const [admin, setAdmin] = useState(false);
  const [profile, setProfile] = useState({});

  const auth = getAuth();

  const registerUser = (email, password, name, status, navigate) => {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        setAuthInfo("");

        // name split
        const namesArray = name.split(" ");
        const firstName = namesArray[0];
        const lastName = namesArray[namesArray.length - 1];

        const newUser = { email, firstName, lastName };
        setUser(newUser);
        saveUser(email, firstName, lastName, status, "POST");

        navigate("/");
      })
      .catch((error) => {
        setAuthInfo("");
        setAuthError("This email already registered.");
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        setAuthInfo("");

        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setAuthInfo("");
        setAuthError("Email address or password are incorrect.");
      })
      .finally(() => setIsLoading(false));
  };

  const resetPassword = (email) => {
    if (!email) {
      setAuthInfo("Please fill in email address field!");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setAuthError("");
        setAuthInfo(
          "Your request successfully submitted! Please check your email ..."
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const emailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  const deleteUserAccount = () => {
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  useEffect(() => {
    fetch(`http://localhost:65000/users/isAdmin/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch(`http://localhost:65000/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, [user?.email]);

  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, firstName, lastName, status, method) => {
    const user = { email, firstName, lastName, status };

    fetch("http://localhost:65000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    user,
    admin,
    profile,
    isLoading,
    setIsLoading,
    authError,
    authInfo,
    registerUser,
    loginUser,
    logout,
    resetPassword,
    emailVerification,
    deleteUserAccount,
  };
};

export default useFirebase;
