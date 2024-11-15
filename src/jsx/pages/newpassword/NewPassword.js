import { useState, useEffect } from "react";
import './NewPassword.css'
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/plain2do.png";
import loginbg from "../../../images/bg-login.jpg";
import { IoArrowBackOutline } from "react-icons/io5";
import { SlLogout } from 'react-icons/sl'
import StatusPopup from "../../components/popup/Popup";
import { IoInformationCircleOutline } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import LanguageSelector from "../../components/language-selector/LanguageSelector";
import SocialMediaApps from "../../components/socialmedia-apps/SocialMediaApps";
import { loadingToggleAction, loginAction } from "../../../store/actions/AuthActions";
function NewPassword(props) {
  const link = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email") 
  if(!email || !localStorage.getItem('verified')) window.location='/login'
  const [redirectState, setRedirectState] = useState(true)
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [disabledState,setDisabledState] = useState(true)
  const [inputDisabledState, setInputDisabledState] = useState(true)
  const [btnPreviousPageState, setBtnPreviousPageState] = useState(false)
  const [statusPopup, setStatusPopup] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  const [passwordVisibility, setPasswordVisibility] = useState('password')
  const [confirmationVisibility, setConfirmationVisibility] = useState('password')
  const language2 = useLanguage().language
  const t = translations.registration[language2]
  const [languageBoxState, setLanguageBoxState] = useState(false);
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);

    const dispatch = useDispatch();
    const nav  = useNavigate();
  useEffect(() => {
    if(redirectState === false){
  dispatch(loadingToggleAction(true));	
  dispatch(loginAction(email, username, nav));
      }
  }, [redirectState])
  useEffect(() => {
    if(
    username.split("").some((e) => isNaN(e) && e === e.toLowerCase()) &&
    username.split("").some((e) => !isNaN(e)) &&
    username.split("").length > 7){
        setInputDisabledState(false)
    }
    else setInputDisabledState(true)
    if((username === passwordConfirm) && ((username.length > 0 && passwordConfirm.length > 0))){
      setDisabledState(false)
    }
    else setDisabledState(true)

  }, [username, passwordConfirm])
  const submit = async (e) => {
    e.preventDefault();
      try{
          if(passwordConfirm === username){
              const reponseEmail = await fetch(`${link}/password-reset-confirm/`,{
                  method: "POST",
                  body: JSON.stringify({
                      email,
                      new_password: username
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                const dataEmail = await reponseEmail.json()
      if(dataEmail.Response){
        setErrorMsg({msg: t.thepasswordhasbeenreset, status: 200, title: t.success.charAt(0).toUpperCase() + t.success.slice(1)})
        setStatusPopup(true)  
        setRedirectState(false)
      };
    }
      else throw new Error(t.thepassworddoesnotmatch)
     } catch(error){
      setErrorMsg({msg: error.message, status: 404, title:  t.error.charAt(0).toUpperCase() + t.error.slice(1)})
       setStatusPopup(true)
     }
  }
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
       <Link to={btnPreviousPageState ? "/page-forgot-password" : `/reset-password`}>
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
                        <h3 className="dz-title mb-1">{t.newpassword}</h3>
                        <p className="">
                          {t.createanewpassword}
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
                            <strong>{t.updatepassword}</strong>
                          </label>
                          <div className="new-password-input-password-box">
                          <input
                          type={passwordVisibility}
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t.typeyournewpassword}
                          />
                          <div className="new-password-visibility-box">
                          {passwordVisibility === 'text' ? <i onClick={() => setPasswordVisibility('password')}><AiFillEyeInvisible/></i> : <i onClick={() => setPasswordVisibility('text')}><IoMdEye/></i>}
                          </div>
                          </div>
                          {errors.username && (
                            <div className="text-danger fs-12">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong>{t.confirmpassword}</strong>
                          </label>
                          <div className="new-password-input-password-box">
                          <input
                          type={confirmationVisibility}
                          disabled={inputDisabledState}
                            className="form-control"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder={t.typeyournewpassword}
                          /> <div className="new-password-visibility-box">
                          {confirmationVisibility === 'text' ? <i onClick={() => setConfirmationVisibility('password')}><AiFillEyeInvisible/></i> : <i onClick={() => setConfirmationVisibility('text')}><IoMdEye/></i>}
                          </div>
                          </div>
                            <div style={disabledState ? {visibility: "visible"} : {visibility: "hidden"}} className="text-danger fs-12">
                            <i><IoInformationCircleOutline/></i>  {t.thepasswordmustmatch}
                            </div>
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
                          <button style={disabledState ? {background: "gray"} : null} disabled={disabledState}
                            className="btn_submit__register btn btn-purple p-0 text-white overflow-hidden"
                          >{t.submit}
                          </button>
                          <div className="new-password-requirements">
                            <div className="new-password-requirement-box">
                              <div style={username.length >= 8 ? {background: "purple"} : {background: "rgb(173, 173, 173)"}} className="new-password__condition_circle"></div>
                              <span style={username.length >= 8 ? {color: "black"} : null}>{t.nolessthan8words}</span>
                            </div>
                            <div className="new-password-requirement-box">
                              <div style={username.split("").some((e) => isNaN(e) && e === e.toUpperCase()) ? {background: "purple"} : {background: "rgb(173, 173, 173)"}} className="new-password__condition_circle"></div>
                              <span style={username.split("").some((e) => isNaN(e) && e === e.toUpperCase()) ? {color: "black"} : null}>{t.morethanoneuppercaseletter}</span>
                            </div>
                            <div className="new-password-requirement-box">
                              <div style={username.split("").some((e) => isNaN(e) && e === e.toLowerCase()) ? {background: "purple"} : {background: "rgb(173, 173, 173)"}} className="new-password__condition_circle"></div>
                              <span style={username.split("").some((e) => isNaN(e) && e === e.toLowerCase()) ? {color: "black"} : null}>{t.morethanonelowercaseletter}</span>
                            </div>
                            <div className="new-password-requirement-box">
                              <div style={username.split("").some((e) => !isNaN(e)) ? {background: "purple"} : {background: "rgb(173, 173, 173)"}} className="new-password__condition_circle"></div>
                              <span style={username.split("").some((e) => !isNaN(e)) ? {color: "black"} : null}>{t.morethanonedigit}</span>
                            </div>
                          </div>
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
export default connect(mapStateToProps)(NewPassword);