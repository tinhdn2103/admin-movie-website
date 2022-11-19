import "./login.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, login } from "../../store/reducers/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="Email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={auth.isFetching}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
