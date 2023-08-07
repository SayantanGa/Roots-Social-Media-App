import { Link } from "react-router-dom";
import { PostCreator } from "./posts";
import axios from "axios";

function Logo() {
  return (
    <Link to="/about">
      <img src="/logo-main.png" alt="logo" className="logo navbar__logo" />
    </Link>
  );
}

function NavItem(props) {
  return (
    <li className="navbar__item">
      <a className="navbar__link" href={props.to || "#"}>
        {" "}
        {props.item}{" "}
      </a>
    </li>
  );
}

/**
 * Renders an anchor element with a button style.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.to - The URL to navigate to when the button is clicked.
 * @param {string} props.value - The text value to display inside the button.
 * @return {JSX.Element} The rendered anchor element.
 */
function GetAuth(props) {
  return (
    <a href={props.to} className="btn form__submit-button">
      {" "}
      <span> {props.value} </span>{" "}
    </a>
  );
}

function UserAccess() {
  return (
    <>
      <GetAuth value="Sign Up!" to="./signup" />
      <GetAuth value="Login" to="./login" />
    </>
  );
}

function Logout(props) {

  const logout = () => {
    axios
      .get(`http://roots-social-media-app-api.onrender.com/api/v1/users/logout`)
      .then(function (response) {
        if (response.status === 200) {
          props.Alert("Logout successful");
          props.setLoggedIn(false);
        }
      })
      .catch(function (error) {
        props.Alert(`${error.message}`);
      });
  }

  return (
    <>
      <button className="btn form__submit-button" onClick={logout}>
        <span className="material-symbols-outlined post__stats-item-icon">
          logout
        </span>
      </button>
    </>
  );
}

function Navbar(props) {
  const listItems = props.listItems?.map((item, index) => {
    return <NavItem item={item.name} to={item.link} key={item.name + index} />;
  });
  return (
    <nav className="navbar">
      <Logo />
      <ul className="navbar__list navbar__items">{listItems}</ul>
      <ul className="navbar__list">
        {props.loggedIn ? (
          <div style={{ display: "flex" }}>
            <PostCreator
              avatar="/user1.jpg"
              userName={JSON.parse(window.localStorage.getItem("user")).name}
            />
            <Logout Alert={props.Alert} setLoggedIn={props.setLoggedIn} />
          </div>
        ) : (
          <UserAccess />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
