import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GetInput,
  FormSubmitButton,
  KnowledgeArea,
} from "../components/account-form";

function formData() {
  this.fullname = "";
  this.name = "";
  this.email = "";
  this.phone = "";
  this.password = "";
  this.confirmPassword = "";
}

function FormArea({ Alert, onLogin }) {
  const navigate = useNavigate();
  const [data, setData] = useState(new formData());
  const [usernameValid, setUsernameValid] = useState(false);

  const handleChange = (e, property) => {
    const { value } = e.target;
    setData({ ...data, [property]: value });
  };

  const handleSubmit = (e) => {
    if (data.password === data.confirmPassword) {
      signup(data);
    } else if (data.Password !== data.ConfirmPassword) {
      Alert("Confirm Password and Password don't match");
    } else {
      Alert("Invalid details");
    }
  };

  const signup = async (userData) => {
    try {
      const userDataCopy = userData;
      delete userDataCopy.confirmPassword;
      const res = await axios({
        method: "POST",
        url: "http://roots-social-media-app-api.onrender.com/api/v1/users/signup",
        data: userDataCopy,
      });

      if (res.data.status === "success") {
        Alert("Account created successfully!");
        onLogin(true);
        navigate("/dashboard");
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }
    } catch (err) {
      Alert(`${err.message}`);
    }
  };

  useEffect(() => {
    axios
      .post("http://roots-social-media-app-api.onrender.com/api/v1/users", { username: data.name })
      .then((res) => {
        if (res.status === 200) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      })
      .catch((err) => {
        Alert(`${err.message}`);
      });
  }, [data]);

  return (
    <div className="form__formarea" onSubmit={handleSubmit}>
      <form action="#" className="form" id="form-signup">
        <p className="form__text">Get a new account!</p>
        <GetInput
          type="text"
          name="Name"
          phtext="You know how to be called"
          value={data.fullname}
          onChangeHandler={(e) => handleChange(e, "fullname")}
        />
        <GetInput
          type="text"
          name="Username"
          phtext="The phrase to identify you"
          value={data.name}
          onChangeHandler={(e) => handleChange(e, "name")}
        />
        {data.name && <span className="form__group" style={{fontSize: ".7rem", color:usernameValid ? "green" : "red"}}>{usernameValid ? "Username Available!" : "Username already taken..."}</span>}
        <GetInput
          type="email"
          name="Email"
          phtext="The online address to mail you"
          value={data.email}
          onChangeHandler={(e) => handleChange(e, "email")}
        />
        <GetInput
          type="tel"
          name="Phone(Indian format)"
          phtext="The number to reach you at"
          patternRequired={true}
          value={data.phone}
          onChangeHandler={(e) => handleChange(e, "phone")}
        />
        <GetInput
          type="password"
          name="Password"
          phtext="The thing used to log in"
          value={data.password}
          onChangeHandler={(e) => handleChange(e, "password")}
        />
        <GetInput
          type="cpassword"
          name="Confirm Password"
          phtext="Have you typed correctly?"
          value={data.confirmPassword}
          onChangeHandler={(e) => handleChange(e, "confirmPassword")}
        />
        <FormSubmitButton value="Continue" />
      </form>
    </div>
  );
}

function SignUp({ Alert, onLogin }) {
  return (
    <div
      className="page-container container login-container"
      style={{ backgroundImage: "none" }}
    >
      <div className="bg-video">
        <video className="bg-video__content" autoPlay loop muted>
          <source src="/video.webm" type="video/mp4" />
        </video>
      </div>
      <KnowledgeArea />
      <FormArea Alert={Alert} onLogin={onLogin} />
    </div>
  );
}

export default SignUp;
