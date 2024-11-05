import React, { useState } from "react";
import "./Login/Login.css";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

// image
import logo from "../../images/plain2do.png";
import loginbg from "../../images/bg-login.jpg";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";
import translation from "../../translation/translation.js";
import LanguageSelector from "../components/language-selector/LanguageSelector";
import SocialMediaApps from "../components/socialmedia-apps/SocialMediaApps";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState("password");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const language2 = useLanguage()?.language || "en";
  const t = translation.registration[language2];
  const [languageBoxState, setLanguageBoxState] = useState(false);

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (username === "") {
      errorObj.username = t.usernamerequired;
      error = true;
    }
    if (password === "") {
      errorObj.password = t.passwordisrequired;
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    dispatch(loadingToggleAction(true));
    dispatch(loginAction(username, password, navigate)); // Pass navigate here
  }

  return (
    <div
      onClick={(e) => {
        if (e.target.dataset.selectLanguage !== "select-language") {
          setLanguageBoxState(false);
        }
      }}
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
      <LanguageSelector
        languageBoxState={languageBoxState}
        setLanguageBoxState={setLanguageBoxState}
      />
      <div className="login-wrapper">
        <div className="login-aside-left">
          <Link to="/dashboard" className="login-logo">
            <img src={logo} width={200} alt="" />
          </Link>
          <div className="login-description">
            <h2 className="main-title mb-2">{t.welcometoplain2do}</h2>
           <SocialMediaApps/>
            <div className="mt-5 bottom-privacy"></div>
          </div>
        </div>
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="p-5">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form-1">
                      <div className="mb-4">
                        <h3 className="dz-title mb-1">
                          {t.signin.charAt(0).toUpperCase() + t.signin.slice(1)}
                        </h3>
                        <p className="">{t.signinbyenteringinformationbelow}</p>
                      </div>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onLogin}>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="input-username-label">
                              {t.username}
                            </strong>
                          </label>
                          <input
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t.typeyourusernameaddress}
                          />
                          {errors.username && (
                            <div className="text-danger fs-12">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong>{t.password}</strong>
                          </label>
                          <div className="login-password-input-box">
                            <input
                              type={isVisiblePassword}
                              className="form-control"
                              value={password}
                              placeholder={t.typeyourpassword}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                              onClick={() => {
                                setIsVisiblePassword("text");
                              }}
                              style={
                                isVisiblePassword === "password"
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                              className="login-password-visible-button"
                            >
                              <MdOutlineVisibility />
                            </span>
                            <span
                              onClick={() => {
                                setIsVisiblePassword("password");
                              }}
                              style={
                                isVisiblePassword === "text"
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                              className="login-password-visible-button"
                            >
                              <MdOutlineVisibilityOff />
                            </span>
                          </div>
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                          <div className="form-group-control">
                            <div className="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="basic_checkbox_1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="basic_checkbox_1"
                              >
                                {t.remembermypreferemce}
                              </label>
                            </div>
                            <Link
                              className="forgot-password-link"
                              to="/page-forgot-password"
                            >
                              {t.forgotpassword}
                            </Link>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="registration-demo-btn-submit"
                          >
                            {t.signin.charAt(0).toUpperCase() +
                              t.signin.slice(1)}
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-2">
                        <p className="">
                          {t.donothaveaccount}{" "}
                          <Link className="text__purple" to="/registration-demo">
                            {t.signup.charAt(0).toUpperCase() +
                              t.signup.slice(1)}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
