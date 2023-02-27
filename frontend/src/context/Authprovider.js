import React from "react";
import Authcontext from "./Authcontext";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const handleLogout = React.useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
  }, []);

  const authValue = {
    isLoggedIn,
    handleLogout,
    handleLogin,
  };
  return (
    <Authcontext.Provider value={authValue}>
      {props.children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;
