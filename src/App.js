import { lazy, Suspense, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Index from "./jsx";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { checkAutoLogin } from "./services/AuthService";
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import { DemoRegistr } from "./jsx/pages/Registration-demo/Registration-demo.js";
import InvitedUser from "./jsx/pages/InvitedUser.jsx";
import ResetPassword from './jsx/pages/forgot-password/ForgotPassword.js';
import CodeVerification from './jsx/pages/code-verification/CodeVerification.js';
import NewPassword from "./jsx/pages/newpassword/NewPassword";
const SignUp = lazy(() => import("./jsx/pages/Registration"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login.js")), 500);
  });
});

function App(props) {
  const tokenLocal = localStorage.getItem("userDetails");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();  // Use useNavigate instead of history

  const publicRoutes = [
    "/login",
    "/page-register",
    "/page-forgot-password",
    "/registration-demo",
    '/reset-password',
    '/code-verification'
  ];
  
  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const u = searchParams.get("u");
  const token = searchParams.get("token");

  // Check auto-login for non-public routes
  useEffect(() => {
    if (
      !publicRoutes.includes(location.pathname) &&
      !location.pathname.startsWith("/invited-user")
    ) {
      checkAutoLogin(dispatch);
    }
  }, [dispatch, location.pathname]);

  // Redirect to login if parameters are missing
  useEffect(() => {
    if (location.pathname === "/invited-user" && (!u || !token)) {
      navigate("/login");  // Use navigate instead of history.push
    }
  }, [u, token, location.pathname, navigate]);

  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/page-register" element={<SignUp />} />
      <Route path="/page-forgot-password" element={<ResetPassword />} />
      <Route path="/registration-demo" element={<DemoRegistr />} />
      <Route path="/reset-password" element={<NewPassword />} />
      <Route path="/code-verification" element={<CodeVerification />} />
      <Route path="/invited-user" element={<InvitedUser u={u} token={token} />} />
    </Routes>
  );

  if (tokenLocal) {
    return (
      <Suspense
        fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
      >
        <Index />
      </Suspense>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
      </div>
    );
  }
}

export default connect()(App);  // Remove withRouter
