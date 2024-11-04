import React, { useReducer, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import {Collapse ,Dropdown } from "react-bootstrap";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import {MenuList} from './Menu';
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';
/// Image
import profile from "../../../images/profile/pic1.jpg";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active : "",
  activeSubmenu : "",
}

const SideBar = () => {
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);	

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
  }, []);

  let handleheartBlast = document.querySelector('.heart');
  function heartBlast(){
    return handleheartBlast.classList.toggle("heart-blast");
  }
  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )

 
  const handleMenuActive = status => {		
    setState({active : status});			
    if(state.active === status){				
      setState({active : ""});
    }   
  }
  const handleSubmenuActive = (status) => {		
    setState({activeSubmenu : status})
    if(state.activeSubmenu === status){
      setState({activeSubmenu : ""})			
    }    
  }

  //let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
 
  return (
    <div
        onMouseEnter={()=>ChangeIconSidebar(true)}
        onMouseLeave={()=>ChangeIconSidebar(false)}
        className={`dlabnav ${iconHover} ${
          sidebarposition.value === "fixed" &&
          sidebarLayout.value === "horizontal" &&
          headerposition.value === "static"
            ? hideOnScroll > 120
              ? "fixed"
              : ""
            : ""
        }`}
    >
      <PerfectScrollbar className="dlabnav-scroll"> 
          <ul className="metismenu" id="menu">
            <Dropdown as="li" className="nav-item dropdown header-profile">
              <Dropdown.Toggle
                variant=""
                as="a"
                className="nav-link i-false c-pointer"
                // href="#"
                role="button"
                data-toggle="dropdown"
              >
                <img src={profile} width={20} alt="" />
                <div className="header-info ms-3">
                  <span className="font-w600 ">Hi,<b>William</b></span>
                  <small className="text-end font-w400">william@gmail.com</small>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu align="right" className="mt-2 dropdown-menu dropdown-menu-end">
                <Link to="/app-profile" className="dropdown-item ai-icon">
                  <svg
                    id="icon-user1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  <span className="ms-2">Profile </span>
                </Link>
                <Link to="/email-inbox" className="dropdown-item ai-icon">
                  <svg
                    id="icon-inbox"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-success"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="ms-2">Inbox </span>
                </Link>
        { /* <Link to="/page-login" className="dropdown-item ai-icon">
                  <svg
                    id="icon-logout"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-danger"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                  </svg>
                  <span className="ms-2">Logout </span>
                </Link> */}
        <LogoutPage />
              </Dropdown.Menu>
            </Dropdown>
              {MenuList.map((data, index)=>{
                let menuClass = data.classsChange;
                  if(menuClass === "menu-title"){
                    return(
                        <li className={menuClass}  key={index} >{data.title}</li>
                    )
                  }else{
                    return(				
                      <li className={` ${ state.active === data.title ? 'mm-active' : ''}`}
                        key={index} 
                      >
                        
                        {data.content && data.content.length > 0 ?
                            <>
                              <Link to={"#"} 
                                className="has-arrow"
                                onClick={() => {handleMenuActive(data.title)}}
                              >								
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                                  <span className="badge badge-xs style-1 badge-danger ms-2">{data.update}</span>
                              </Link>
                              <Collapse in={state.active === data.title ? true :false}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content && data.content.map((data,index) => {									
                                      return(	
                                          <li key={index}
                                            className={`${ state.activeSubmenu === data.title ? "mm-active" : ""}`}                                    
                                          >
                                            {data.content && data.content.length > 0 ?
                                                <>
                                                  <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                                      onClick={() => { handleSubmenuActive(data.title)}}
                                                  >
                                                    {data.title}
                                                  </Link>
                                                  <Collapse in={state.activeSubmenu === data.title ? true :false}>
                                                      <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                        {data.content && data.content.map((data,index) => {
                                                          return(	                                                            
                                                            <li key={index}>
                                                              <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                                            </li>                                                            
                                                          )
                                                        })}
                                                      </ul>
                                                  </Collapse>
                                                </>
                                              :
                                              <Link to={data.to}>
                                                {data.title}
                                              </Link>
                                            }
                                            
                                          </li>                                        
                                      )
                                    })}
                                  </ul>
                                </Collapse>
                            </>
                        :
                          <Link  to={data.to} >
                              {data.iconStyle}
                              <span className="nav-text">{data.title}</span>
                          </Link>
                        }
                        
                      </li>	
                    )
                }
              })}          
          </ul>	        
          <div className="copyright">
            <p><strong>Dompet Payment Admin Template</strong> © 2023 All Rights Reserved</p>
            <p className="fs-12">Made with <span className="heart" onClick={heartBlast}></span> by DexignLab</p>
          </div>
        </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
