import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(username, password, navigate) {
  return (dispatch) => {
    signUp(username, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(navigate) {
  localStorage.removeItem("userDetails");
  window.location = ("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(username, password, navigate) {
  console.log(username, password);
  return (dispatch) => {
    login(username, password)
      .then((response) => {
        console.log(response.data);

        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
        dispatch(loginConfirmedAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        // Log the entire error object for debugging
        console.error("Login error:", error);

        // Check if there's a response with data and log the specific details
        const errorMessage = formatError(
          error.response ? error.response.data : "An error occurred"
        );
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
