import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  useLocalStorageGetItem,
  useLocalStorageSetItem,
} from "../hooks/customHooks";
import { getAllPlaylistCall } from "../utils/operations/playlistOperations";
import { useVideoContext } from "./video-context";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const { dispatch } = useVideoContext();
  const [userState, setUserState] = useState({ id: "" });
  async function logInUser(email, password, setState) {
    try {
      setState(true);
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      const encodedToken = response.data.encodedToken;
      if (response) {
        useLocalStorageSetItem("shed-video-token", encodedToken);
        setState(false);
        setUserState({ ...userState, id: encodedToken });
      }
    } catch (error) {
      setState(false);
      console.log(error);
    }
  }
  const guestLogin = async () => {
    try {
      const loginResponse = await axios.post("/api/auth/login", {
        email: "shekhardhangar@yahoo.com",
        password: "shekhar",
      });
      const encodedToken = loginResponse.data.encodedToken;
      if (loginResponse) {
        setUserState({ ...userState, id: encodedToken });
      }

      useLocalStorageSetItem("shed-video-token", encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  async function signUpUser(inputState, setState) {
    try {
      setState(true);
      const response = await axios.post("/api/auth/signup", {
        firstName: inputState.firstName,
        lastName: inputState.lastName,
        email: inputState.email,
        password: inputState.password,
      });
      const encodedToken = response.data.encodedToken;

      if (response) {
        setState(false);
        setUserState({ ...userState, id: encodedToken });
        useLocalStorageSetItem("shed-video-token", encodedToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function logOutUser() {
    localStorage.clear();
    setUserState({ id: "" });
  }

  const userToken = useLocalStorageGetItem("shed-video-token");
  useEffect(() => {
    (async () => {
      try {
        if (userToken) {
          setUserState({ ...userState, id: userToken });
          getAllPlaylistCall(userToken, dispatch);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ logInUser, logOutUser, signUpUser, userState, guestLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
