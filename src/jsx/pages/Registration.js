import React, { useState, useEffect } from "react";
import "./Registration.css";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// image
import logo from "../../images/plain2do.png";
import loginbg from "../../images/bg-login.jpg";
import {useLanguage} from '../../context/LanguageContext'
import translation from '../../translation/translation'
import LanguageSelector from "../components/language-selector/LanguageSelector";
import StatusPopup from "../components/popup/Popup";
import SocialMediaApps from "../components/socialmedia-apps/SocialMediaApps";
function Login(props) {
  const [statusPopup, setStatusPopup] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem("email") || "");
  const [disabledState, setDisabledState] = useState(true);
  let errorsObj = { username: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const language2 = useLanguage().language
  const t = translation.registration[language2]
  const [languageBoxState, setLanguageBoxState] = useState(false);
  const [errorMsg, setErrorMsg] = useState({})
  useEffect(() => {
    if (
      username.length &&
      username.split("").includes("@") &&
      username.split("").includes(".") &&
      username.split("@")[0].length > 0 &&
      username.split("@")[username.split("@").length - 1].length > 0 &&
      username.split(".")[username.split(".").length - 1].length > 0
    ) {
      (async () => {
        const responseUsers = await fetch(
          "https://dev.plain2do.com/api/user-registration/"
        );
        const dataUsers = await responseUsers.json();
        if (
          dataUsers.Response.length > 0 &&
          dataUsers.Response.filter((e) => e.email === username).length > 0
        ) {
          setErrorMsg({msg: t.theuserexists, status: 404, title: t.error.charAt(0).toUpperCase() + t.error.slice(1)})
          setStatusPopup(true)
          setUsername("");
        }
      })();
      localStorage.setItem("email", username.trim(""));
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
  }, [username]);
  return (
    <div onClick={(e) => {
      if (e.target.dataset.selectLanguage !== "select-language") {
        setLanguageBoxState(false);
      }
    }}
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
            {statusPopup && <StatusPopup status={errorMsg?.status} setStatusPopup={setStatusPopup} msg={errorMsg?.msg} title_msg={errorMsg?.title}/>}

         <LanguageSelector languageBoxState={languageBoxState} setLanguageBoxState={setLanguageBoxState}/>
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
                        <h3 className="ds-title mb-1 text-capitalize">{t.signup.charAt(0).toUpperCase() + t.signup.slice(1)}</h3>
                        <p className="">
                          {t.signupbyenteringinformationbelow}
                        </p>
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
                      <div className="form-group">
                        <label className="mb-2 ">
                          <strong>{t.email}</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder={t.typeyouremailaddress}
                        />
                        {errors.username && (
                          <div className="text-danger fs-12">
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        {errors.password && (
                          <div className="text-danger fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="custom-control custom-checkbox ml-1 ">
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
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          disabled={disabledState}
                          className="btn_submit__register btn btn-purple p-0 text-white overflow-hidden"
                        >
                          <Link
                            className="btn_submit--signup text-white fw-bolder"
                            to="/registration-demo"
                          >
                            {t.signup.charAt(0).toUpperCase() + t.signup.slice(1)}
                          </Link>
                        </button>
                      </div>
                      <div className="new-account mt-2">
                        <p className="">
                          {t.haveanaccount}{" "}
                          <Link className="text__purple" to="./login">
                            {t.signin}
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