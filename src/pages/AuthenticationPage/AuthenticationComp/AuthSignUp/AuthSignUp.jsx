import { useLocation, useNavigate } from "react-router-dom";
import "../AuthenticationComp.css";
import { useState } from "react";
import {
  FaUserAlt,
  MdEmail,
  BsKeyFill,
  BsFillEyeSlashFill,
  BsFillEyeFill,
} from "../../../../icons/icons";
import { Loading, Navbar } from "../../../../components/components";
import { useInputHandler } from "../../../../hooks/customHooks";
import { useAuthContext } from "../../../../context/context";

function AuthSignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [formSubmitState, setformSubmitState] = useState(false);
  const { signUpUser } = useAuthContext();
  function toggleShowPassword() {
    setPasswordShown((passwordShown) => !passwordShown);
  }
  const navigate = useNavigate();
  const { inputState, inputUpdate } = useInputHandler({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const passwordExpression = 
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  function submitFormHandler(e) {
    e.preventDefault();
    const passwordMatch = (inputState.password !== inputState.password2);
    const passwordExpressionMatch = (!passwordExpression.test(inputState.password) || !inputState.password2.match(passwordExpression))  
    if(!passwordMatch && !passwordExpressionMatch){
      signUpUser(inputState,setformSubmitState);;
    }else{
      console.log('password must contain more than 8 characters with number,lower and upper case alphabet and atleast 1 special character')
    }
    return true;
  }
  return (
    <>
      <Navbar isMenuRequired={false} searchBarRequired={false} />
      <section className="flex form-container">
        <form
          onSubmit={submitFormHandler}
          action="sign-up form register"
          className="signup-form"
        >
          <h2 className="form-title txt-center h2 ">Create Account</h2>
          <div className="name-input-box">
            <div className="input-with-icon ">
              <FaUserAlt className="icon size-xs" />
              <input
                type="text"
                required
                onChange={inputUpdate}
                placeholder="First Name"
                name="firstName"
                className="input firstname-input"
              />
            </div>
            <div className="input-with-icon">
              <FaUserAlt className="icon size-xs" />
              <input
                type="text"
                onChange={inputUpdate}
                name="lastName"
                required
                placeholder="Last Name"
                className="input lastname-input"
              />
            </div>
          </div>
          <div className="input-with-icon">
            <MdEmail className="icon size-xs" />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={inputUpdate}
              className="input email-input"
            />
          </div>
          <div className="flex input-with-icon password-box">
            <BsKeyFill className="icon size-xs  key-icon" />
            <input
              type="text"
              onChange={inputUpdate}
              required
              name="password"
              placeholder=" Password"
              className="input see-password-input"
            />
          </div>

          <div className="flex input-with-icon active-inp">
            <BsKeyFill className="icon size-xs key-icon" />
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="password2"
              onChange={inputUpdate}
              className="input password-input"
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
          <button type="submit" className="signup-btn btn btn-md link">
            {formSubmitState ? (
              <Loading width="15px" height="15px" />
            ) : (
              `Sign Up`
            )}
          </button>
          <div className="login-way">
            <span className="account-yes">Already have an Account?</span>
            <p className="lt-bold try-btn" onClick={() => navigate("/login")}>
              Sign In
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export { AuthSignUp };