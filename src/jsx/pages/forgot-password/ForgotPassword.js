import { useState, useEffect } from "react";
import './ForgotPassword.css'
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// image
import logo from "../../../images/plain2do.png";
import loginbg from "../../../images/bg-login.jpg";
import { IoArrowBackOutline } from "react-icons/io5";
import { SlLogout } from 'react-icons/sl'
import StatusPopup from "../../components/popup/Popup";
import { useLanguage } from "../../../context/LanguageContext";
import translation from "../../../translation/translation";
import LanguageSelector from "../../components/language-selector/LanguageSelector";
function ResetPassword(props) {
  const [username, setUsername] = useState("");
  localStorage.setItem('email',username.trim())
  const [disabledState,setDisabledState] = useState(true)
  let errorsObj = { username: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [btnPreviousPageState, setBtnPreviousPageState] = useState(false)
  const [statusPopup, setStatusPopup] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  const [redirectState, setRedirectState] = useState(true)
  const language2 = useLanguage().language
  const t = translation.registration[language2]
  const [languageBoxState, setLanguageBoxState] = useState(false);
  useEffect(() => {
    if(redirectState === false){setTimeout(() => {
      window.location.pathname = '/code-verification'
    }, 5000)}
  }, [redirectState])
  const submit = async (e) => {
    e.preventDefault();
      try{
      const responseUsers = await fetch('https://dev.plain2do.com/api/user-registration/')
      const dataUsers = await responseUsers.json()
      console.log(dataUsers.Response.filter(e => e.email === username).length>0);
      if(dataUsers.Response.filter(e => e.email === username).length > 0){
        setErrorMsg({msg: t.checkyouremailplease, status: 200, title: t.success.charAt(0).toUpperCase() + t.success.slice(1)})
        setStatusPopup(true)
      const reponseEmail = await fetch("https://dev.plain2do.com/api/password-reset/",{
        method: "POST",
        body: JSON.stringify({
          email: username
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      const dataEmail = await reponseEmail.json()
      console.log(dataEmail);
      setRedirectState(false)
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
    if(username.length && username.split('').includes("@") && username.split('').includes(".") && username.split('@')[0].length > 0 && username.split('@')[username.split('@').length - 1].length > 0  && username.split('.')[username.split('.').length - 1].length > 0){
      localStorage.setItem('email', username.trim(''))
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
       <Link to={btnPreviousPageState ? "/login" : "/page-forgot-password"}>
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
            <p className="">
              {t.herodescription}
            </p>
            <ul className="social-icons mt-4">
              <li>
                <Link to={"#"}>
                  <i className="fa fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link to={"#"}>
                  <i className="fa fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to={"#"}>
                  <i className="fa fa-linkedin"></i>
                </Link>
              </li>
            </ul>
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
                        <h3 className="dz-title mb-1">{t.forgotpassword}</h3>
                        <p className="">
                          {t.getnewpasswordbyenteringyouremail}
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
                        </div>
                        <div className="text-center">
                          <button type="submit" style={disabledState ? {background: "gray"}:null} disabled={disabledState}
                            className="btn_submit__register btn btn-purple p-0 text-white overflow-hidden"
                          >{t.send}
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
export default connect(mapStateToProps)(ResetPassword);
