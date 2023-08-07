import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import Navbar from "./scripts/components/navbar";
import Login from "./scripts/sections/login";
import SignUp from "./scripts/sections/signup";
import Dashboard from "./scripts/sections/dashboard";
import Alert from "./scripts/components/alert";
import { bgImg } from "./scripts/functions";
import AboutPage from "./scripts/sections/about";
import axios from "axios";

const navigatorItems = [
  {
    name: "Dashboard",
    link: "./dashboard",
  },
  {
    name: "Peers",
    link: "#",
  },
  {
    name: "Peer Groups",
    link: "#",
  },
  {
    name: "Pushes",
    link: "#",
  },
  {
    name: "Alerts",
    link: "#",
  },
];

document.documentElement.style.setProperty(
  "--bgImg",
  bgImg(Math.floor(Math.random() * 10))
);

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const triggerAlert = (message = "", trigger = true) => {
    setShowAlert(trigger);
    setDisplayMessage(message);
  };

  useEffect(() => {
    axios
      .get("https://roots-social-media-app-api.onrender.com/api/v1/users")
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoggedIn(true);
          window.localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.user)
          );
        }
      });
  });

  return (
    <BrowserRouter>
      <Navbar
        listItems={navigatorItems}
        loggedIn={loggedIn}
        Alert={triggerAlert}
        setLoggedIn={setLoggedIn}
      />
      {showAlert && <Alert message={displayMessage} Alert={triggerAlert} />}
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" />}></Route>
        <Route
          exact
          path="/dashboard"
          element={<Dashboard Alert={triggerAlert} isLoggedIn={loggedIn} />}
        />
        <Route
          exact
          path="/login"
          element={<Login Alert={triggerAlert} onLogin={setLoggedIn} />}
        />
        <Route
          exact
          path="/signup"
          element={<SignUp Alert={triggerAlert} onLogin={setLoggedIn} />}
        />
        <Route exact path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
