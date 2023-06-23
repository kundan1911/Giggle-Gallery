import "../AuthenticationComp.css";
import {
  FaUserAlt,
  BsKeyFill,
  BsFillEyeSlashFill,
  BsFillEyeFill,
} from "../../../../icons/icons";
import "./AuthLogin.css";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import { useState } from "react";
import {  Loading, Navbar } from "../../../../components/components";
import { useInputHandler } from "../../../../hooks/customHooks";
import { useAuthContext } from "../../../../context/context";
function AuthLogin() {
  const navigate = useNavigate();
  const {logInUser,guestLogin}= useAuthContext();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [Guest, setGuest] = useState(false);
  const { inputState, inputUpdate } = useInputHandler({
    email: "",
    password: "",
  });

  function toggleShowPassword() {
    setPasswordShown((passwordShown) => !passwordShown);
  }

  function logInAsGuest(e) {
    e.preventDefault();
    guestLogin();
  }

  function userLogin(e) {
    e.preventDefault();
    logInUser(
      inputState.email,
      inputState.password,
      setSubmitState
    );
   }
  return (
    <>
      <Navbar isMenuRequired={false} searchBarRequired={false} />
      <div className="flex form-container">
        <form className="login-form">
          <h2 className="form-title txt-center h2">Log in</h2>
          <div className="input-with-icon">
            <FaUserAlt className="icon size-xs" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input email-input"
              onChange={inputUpdate}
            />
          </div>
          <div className="flex input-with-icon">
            <BsKeyFill className="icon key-icon size-xs" />
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="password"
              name="password"
              className="input password-input"
              onChange={inputUpdate}
              
            />
            {passwordShown ? (
              <BsFillEyeSlashFill
                onClick={toggleShowPassword}
                className="icon eye-icon "
              />
            ) : (
              <BsFillEyeFill
                onClick={toggleShowPassword}
                className="icon eye-icon"
              />
            )}
          </div>
          <div className="flex remember-forgot-grp">
            <div className="flex remember-box">
              <input
                type="checkbox"
                id="yes"
                name="bydefault"
                value="yes"
                className="form-checkbox pointer"
              />
              <label htmlFor="yes" className="lt-bold txt-xs">
                Remember me
              </label>
            </div>
            <div
              onClick={() => setShowForgotPassword(true)}
              className="login-forgot pointer txt-sm"
            >
              Forgot password?
            </div>
            {showForgotPassword && (
              <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
            )}
          </div>
          <button onClick={userLogin} className="btn btn-md login-btn">
            {submitState ? <Loading width="25px" height="25px" /> : `Log in`}
          </button>
          <button onClick={logInAsGuest} className="btn btn-sm m-1">
            {Guest ? <Loading width="25px" height="25px" /> : `Log As Guest`}
          </button>
          <div className="signup-way">
            <span className="account-no">Don't have an Account?</span>
            <p className="lt-bold try-btn" onClick={() => navigate("/signup")}>
              Create one
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export { AuthLogin };
{
  /* <div className="flex validation-style">
          <img className="icon size-xs" src="/assets/warning.png" alt="" />
          <span className="msg-txt error-txt lt-bold">
            Please enter correct email
          </span>
        </div> */
}

{
  /* <div className="flex validation-style">
          <img className="icon size-xs" src="/assets/warning.png" alt="" />
          <span className="error-txt lt-bold">
            Please enter correct Password
          </span>
        </div> */
}
