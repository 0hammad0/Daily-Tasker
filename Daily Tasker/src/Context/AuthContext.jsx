import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthStateContext = createContext({
  currentUser: null,
  token: null,
  login: () => {},
  logout: () => {},
  setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [otpEmail, setOtpEmail] = useState({});

  const [notification, setNotification] = useState({
    isOpen: false,
    status: "",
    msg: "",
  });

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const SetAlert = (bool, status, msg) => {
    setNotification({ isOpen: bool, status: status, msg: msg });

    setTimeout(() => {
      setNotification({ isOpen: false, status: "", msg: "" });
    }, 5000);
  };

  return (
    <AuthStateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        otpEmail,
        setOtpEmail,
        setNotification,
        notification,
        SetAlert,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthStateContext = () => useContext(AuthStateContext);

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
