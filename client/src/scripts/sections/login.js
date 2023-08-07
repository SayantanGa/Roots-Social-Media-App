import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  GetInput,
  FormSubmitButton,
  ContinueWithSocial,
  KnowledgeArea,
} from "../components/account-form";

function FormArea({ Alert, onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePwdChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const login = async (email, password) => {
    try {
      const res = await axios({
        method: "POST",
        url:"https://roots-social-media-app-api.onrender.com/api/v1/users/login",
        data: {
          email,
          password,
        },
      });

      if (res.data.status === "success") {
        Alert("Logged in successfully!");
        navigate("/dashboard");
        onLogin(true);
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }
    } catch (err) {
      Alert(`${err.message}`);
    }
  };

  return (
    <div className="form__formarea" onSubmit={handleSubmit}>
      <form action="#" className="form" id="form-login">
        <p className="form__text">Login to your account!</p>
        <GetInput
          type="email"
          name="Email"
          value={email}
          onChangeHandler={handleEmailChange}
        />
        <GetInput
          type="password"
          name="Password"
          onChangeHandler={handlePwdChange}
        />
        <a href="#" className="form__forgotpassword">
          Forgot your password?
        </a>
        <FormSubmitButton value="Continue" />
        <hr />
        <ContinueWithSocial Alert={Alert} onLogin={onLogin} />
      </form>
    </div>
  );
}

function Login({ Alert, onLogin }) {
  return (
    <div className="page-container container login-container">
      <KnowledgeArea />
      <FormArea Alert={Alert} onLogin={onLogin} />
    </div>
  );
}

export default Login;
