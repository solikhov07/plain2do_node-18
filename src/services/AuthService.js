import axios from "axios";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";

// Sign-up function
export function signUp(username, password) {
  const postData = {
    username,
    password,
    returnSecureToken: true,
  };

  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=API_KEY`,
    postData)
}

// Login function
export function login(email, password) {
  const urlLink = process.env.REACT_APP_API_URL;
  const postData = {
    email,
    password,
  };

  return axios.post(`${urlLink}/token/`, postData);
}

// Format error function
export function formatError(errorResponse) {
  if (errorResponse && errorResponse.data && errorResponse.data.error) {
    const message = errorResponse.data.error.message;
    swal("Oops", message, "error");
    return message;
  } else if (errorResponse && errorResponse.detail) {
    swal("Error", errorResponse.detail, "error");
    return errorResponse.detail;
  } else {
    swal("Error", "An unknown error occurred.", "error");
    return "An unknown error occurred.";
  }
}

// Save token details in localStorage
export function saveTokenInLocalStorage(tokenDetails) {
  const expiresIn = 1800; // Set short expiry for testing
  const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

  const detailsToStore = {
    access: tokenDetails.access, // Update access token
    refresh: tokenDetails.refresh, // Keep refresh token unchanged
    expireDate: expireDate,
  };

  localStorage.setItem("userDetails", JSON.stringify(detailsToStore));
}

// Refresh access token function
export function refreshToken(dispatch, navigate) {
  const urlLink = process.env.REACT_APP_API_URL;
  const tokenDetailsString = localStorage.getItem("userDetails");

  if (!tokenDetailsString) {
    dispatch(logout(navigate));
    return Promise.reject("No token details found.");
  }

  const tokenDetails = JSON.parse(tokenDetailsString);

  return axios
    .post(`${urlLink}/token/refresh/`, { refresh: tokenDetails.refresh }) // Send refresh token
    .then((response) => {
      if (response && response.data && response.data.access) {
        const newAccessToken = response.data.access;

        tokenDetails.access = newAccessToken;
        saveTokenInLocalStorage(tokenDetails); // Save updated token details with the same refresh token
        dispatch(loginConfirmedAction(tokenDetails)); // Confirm login with new token
        return newAccessToken;
      } else {
        throw new Error("Invalid response structure.");
      }
    })
    .catch((error) => {
      formatError(error.response);
      dispatch(logout(navigate));
      return Promise.reject("Token refresh failed.");
    });
}

// Logout timer function
export function runLogoutTimer(dispatch, timer, navigate) {
  setTimeout(() => {
    refreshToken(dispatch, navigate)
      .then(() => {
        const tokenDetails = JSON.parse(localStorage.getItem("userDetails"));
        const newExpireDate = new Date(tokenDetails.expireDate);
        const newTimer = newExpireDate.getTime() - new Date().getTime();
        runLogoutTimer(dispatch, newTimer, navigate);
      })
      .catch(() => {
        dispatch(logout(navigate)); // If refresh fails, logout the user
      });
  }, timer || 1800000); // Refresh token before the access token expires
}

// Auto-login function with token refresh check
export function checkAutoLogin(dispatch, navigate) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  if (!tokenDetailsString) {
    dispatch(logout(navigate));
    return;
  }

  const tokenDetails = JSON.parse(tokenDetailsString);
  const expireDate = new Date(tokenDetails.expireDate);
  const todaysDate = new Date();

  if (todaysDate > expireDate) {
    refreshToken(dispatch, navigate)
      .then(() => {
        const newExpireDate = new Date(tokenDetails.expireDate);
        const timer = newExpireDate.getTime() - new Date().getTime();
        runLogoutTimer(dispatch, timer, navigate);
      })
      .catch(() => {
        dispatch(logout(navigate));
      });
    return;
  }

  dispatch(loginConfirmedAction(tokenDetails));
  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, navigate);
}
