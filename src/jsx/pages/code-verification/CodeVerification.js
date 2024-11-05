import { useState, useEffect } from "react";
import './CodeVerification.css'
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// image
import logo from "../../../images/plain2do.png";
import loginbg from "../../../images/bg-login.jpg";
import { IoArrowBackOutline } from "react-icons/io5";
import { SlLogout } from 'react-icons/sl'
import StatusPopup from "../../components/popup/Popup";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import LanguageSelector from "../../components/language-selector/LanguageSelector";
import SocialMediaApps from "../../components/socialmedia-apps/SocialMediaApps";
function CodeVerification(props) {
  if(!localStorage.getItem("email")) window.location='/login'
  const [username, setUsername] = useState("");
  const [disabledState,setDisabledState] = useState(true)
  let errorsObj = { username: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [btnPreviousPageState, setBtnPreviousPageState] = useState(false)
  const [statusPopup, setStatusPopup] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  const [redirectState, setRedirectState] = useState(true)
  const language2 = useLanguage().language
  const t = translations.registration[language2]
  const [languageBoxState, setLanguageBoxState] = useState(false);
  useEffect(() => {
    if(redirectState === false){
      localStorage.setItem('verified', true)
      window.location.pathname = '/reset-password'
    }
  }, [redirectState])
  const submit = async (e) => {
    e.preventDefault();
      try{
      const responseUsers = await fetch('https://dev.plain2do.com/api/user-registration/')
      const dataUsers = await responseUsers.json()
      if(dataUsers.Response.filter(e => e.email === localStorage.getItem('email')).length > 0){
        setErrorMsg({msg: t.checkyouremailplease, status: 200, title: t.success.charAt(0).toUpperCase() + t.success.slice(1)})
        setStatusPopup(true)
      const reponseEmail = await fetch("https://dev.plain2do.com/api/validate-verification-code/",{
        method: "POST",
        body: JSON.stringify({
          verification_code: username,
          email: localStorage.getItem('email')
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      const dataEmail = await reponseEmail.json()
      if(dataEmail.Response){
        setErrorMsg({msg: t.successfulverification, status: 200, title: t.success.charAt(0).toUpperCase() + t.success.slice(1)})
        setStatusPopup(true)  
        setRedirectState(false)
      }
      else {throw new Error(t.incorrectcode)}
      }
      else {
      throw new Error(t.usernotfound)
      }
     } catch(error){
      setErrorMsg({msg: error.message, status: 404, title:  t.error.charAt(0).toUpperCase() + t.error.slice(1)})
       setStatusPopup(true)
     }
  }
  useEffect(() => {
    setDisabledState(true)
    if(username.split(" ").join('').split("").length ===6){
      setDisabledState(false)
    }
    else{
      setDisabledState(true)
    }
      }, [username])
  return (
    <div onClick={e => {
      if (e.target.dataset.btnPreviousPage !== 'switch') {
        setBtnPreviousPageState(false)
    }
    if (e.target.dataset.selectLanguage !== "select-language") {
      setLanguageBoxState(false);
    }
    }}
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
    <LanguageSelector languageBoxState={languageBoxState} setLanguageBoxState={setLanguageBoxState}/>
      {statusPopup && <StatusPopup status={errorMsg?.status} setStatusPopup={setStatusPopup} msg={errorMsg?.msg} title_msg={errorMsg?.title}/>}
       <Link to={btnPreviousPageState ? "/page-forgot-password" : "/code-verification"}>
                    <div data-btn-previous-page="switch" style={btnPreviousPageState ? { right: "0" } : { right: "-170px" }} onClick={() => {
                        setBtnPreviousPageState(!btnPreviousPageState)
                    }} className="registration-demo_box_back">
                        <span data-btn-previous-page="switch" className="registration_demo_previous_page_icon"><SlLogout data-btn-previous-page="switch" /></span>
                        <div data-btn-previous-page="switch" className="registration_demo_btn_previous_page_signup w-50">{t.previous}</div>
                    </div>
                </Link>
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
                        <h3 className="dz-title mb-1">{t.codeverification}</h3>
                        <p className="">
                          {t.enterthesentcodefromyouremail}
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
                          <form onSubmit={submit}>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong>{t.code}</strong>
                          </label>
                          <input
                          type="text"
                            className="form-control"
                            value={username}
                            onInput={(e) => {
                            if(e.target.value.length <=6)    setUsername(e.target.value.split(" ").join("").split('').filter(b => !isNaN(b)).join(""))
                            }}
                            placeholder={t.enterthecode}
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
                        </div>
                        <div className="text-center">
                          <button disabled={disabledState}
                            className="btn_submit__register btn btn-purple p-0 text-white overflow-hidden"
                          >{t.verify}
                          </button>
                        </div>
                        </form>
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
export default connect(mapStateToProps)(CodeVerification);
