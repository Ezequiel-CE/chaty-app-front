import { useEffect } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Chat from "./Chat";
import { checkIfUserIsValid } from "../api/auth.api";
import { setLogin } from "../store/auth.slice";

const ValidationComponent = () => {
  const dispatcher = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    const getUser = async (token: string) => {
      try {
        const { user } = await checkIfUserIsValid(token);
        dispatcher(setLogin({ token, user }));
      } catch (error) {
        console.log(error);
      }
    };

    //if token is in local storage get the user and set the state
    if (window.localStorage.getItem("token")) {
      getUser(window.localStorage.getItem("token")!);
    }
  }, [dispatcher]);

  let mainPage = isLogin ? <Chat /> : <Login />;

  return (
    <Routes>
      <Route path="/" element={mainPage} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default ValidationComponent;
