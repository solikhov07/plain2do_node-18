import React,{useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Tab, Nav, Dropdown} from 'react-bootstrap';

import { ThemeContext } from '../../../context/ThemeContext';
import PieChart7 from '../Dompet/Dashboard7/PieChart7';
import TotalRevenuebar from '../Dompet/Dashboard7/TotalRevenuebar';

import Test11 from './../../../images/testimonial/pic11.jpg';
import Test22 from './../../../images/testimonial/pic22.jpg';
import OverViewPayment from '../Dompet/Dashboard7/OverViewPayment';


const ChartDounutCard = loadable(() =>
	pMinDelay(import("../Dompet/Dashboard7/ChartDounutCard"), 1000)
);
const CardBlog = [
    {title:'Inter. transaction', number:'684', color1:"rgba(72, 133, 237,1)", color2:"rgba(242, 246, 252,1)", value:'80',},
    {title:'Domestic transaction', number:'546', color1:'rgba(56, 226, 93,1)', color2:"rgba(242, 246, 252,1)", value:'25',},
    {title:'Operating Revenue', number:'972', color1:'rgba(255, 135, 35,1)', color2:"rgba(242, 246, 252,1)", value:'60',},
    {title:'Total Expenses', number:'175', color1:'rgba(51, 62, 75,1)', color2:"rgba(242, 246, 252,1)", value:'40',},
];

const Index7 = () => {
    const { changeBackground, 
        changeSideBarStyle , changePrimaryColor,
        chnageSidebarColor, 
    } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
        if (window.innerWidth >= 768) {
		    changeSideBarStyle({ value: "mini", label: "Mini" });
        }
		changePrimaryColor("color_14");
		chnageSidebarColor("color_14");
	}, []);	
    return (
        <>
            <div className="row invoice-card-row">
                {CardBlog.map((item, ind)=>(
                    <div className="col-xl-3 col-sm-6" key={ind}>
                        <div className="card">
                            <div className="card-body  position-unset d-flex align-items-center justify-content-between">
                                <div className="card-data me-2">                                    
                                    <h5>{item.title}</h5>
									<h2 className="fs-40 font-w600">{item.number}</h2>
                                </div>
                                <div>                                   
                                    <ChartDounutCard value={item.value} backgroundColor={item.color1} backgroundColor2= {item.color2} />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}                
            </div>  
            <div className="row">
                <div className="col-xl-9 col-xxl-8">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <Tab.Container defaultActiveKey="Monthly">
                                    <div className="card-header border-0  flex-wrap">
                                        <h4 className="card-title">Total Revenue</h4>
                                        <div className="d-flex">
                                            <div className="card-action card-tabs mt-3 mt-sm-0">
                                                <Nav as="ul" className="nav nav-tabs" role="tablist">
                                                    <Nav.Item as="li">
                                                        <Nav.Link eventKey="Monthly">Monthly</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as="li">
                                                        <Nav.Link eventKey="Daily" >Daily</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item as="li">
                                                        <Nav.Link eventKey="Today">Today</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                            <Dropdown className="dropdown custom-dropdown mb-0 ms-3">
                                                <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn dark-btn">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="end">
                                                    <Dropdown.Item eventKey="Monthly" >Details</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Monthly" className="text-danger">Cancel</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="card-body py-0">
                                        <Tab.Content className="tab-content">
                                            <Tab.Pane  eventKey="Monthly">
                                                <div className="flex-wrap mb-sm-4 mb-2 align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <span className=" text-num text-black fs-36 font-w500 me-2">$236,535</span>
                                                        <div className="d-flex align-items-center">
                                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
                                                            </svg>
                                                            <div className="ms-3">
                                                                <span className="revenue-1 font-w500 text-success">0,8%</span>
                                                                <p className="mb-0">than last week</p>
                                                            </div>	
                                                        </div>
                                                    </div>
                                                </div>
                                                <TotalRevenuebar />
                                            </Tab.Pane>	
                                            <Tab.Pane  eventKey="Daily">
                                                <div className="flex-wrap mb-sm-4 mb-2 align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <span className=" text-num text-black fs-36 font-w500 me-2">$236,535</span>
                                                        <div className="d-flex align-items-center">
                                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
                                                            </svg>
                                                            <div className="ms-3">
                                                                <span className="revenue-1 font-w500 text-success">0,8%</span>
                                                                <p className="mb-0">than last week</p>
                                                            </div>	
                                                        </div>
                                                    </div>
                                                </div>
                                                <TotalRevenuebar />
                                            </Tab.Pane>	
                                            <Tab.Pane eventKey="Today">
                                                <div className="flex-wrap mb-sm-4 mb-2 align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <span className=" text-num text-black fs-36 font-w500 me-2">$236,535</span>
                                                        <div className="d-flex align-items-center">
                                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
                                                            </svg>
                                                            <div className="ms-3">
                                                                <span className="revenue-1 font-w500 text-success">0,8%</span>
                                                                <p className="mb-0">than last week</p>
                                                            </div>	
                                                        </div>
                                                    </div>
                                                </div>
                                                <TotalRevenuebar />
                                            </Tab.Pane>	
                                        </Tab.Content>	
                                    </div>
                                </Tab.Container>
                            </div>
                        </div>
                        
                        <div className="col-xl-8 col-xxl-12">
                            <div className="card">
                                <div className="card-header d-block border-0">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h4 className="card-title">Overview Payment</h4>
                                        <Dropdown className="dropdown custom-dropdown mb-0">
                                            <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn dark-btn">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end">
                                                <Dropdown.Item eventKey="Monthly" >Details</Dropdown.Item>
                                                <Dropdown.Item eventKey="Monthly" className="text-danger">Cancel</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex col-lg-4 col-sm-6  align-items-center">
                                            <div className="building-icon">
                                                <svg height="35px" viewBox="-24 0 511 511.997" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="m452.707031 267.480469c-23.527343-23.421875-50.726562-1.5-50.726562-1.5v-123.300781c0-4.140626-3.355469-7.5-7.496094-7.5-4.144531 0-7.5 3.359374-7.5 7.5v133.851562s-35.761719 28.191406-51.132813 35.082031v-222.007812c0-10.320313 8.394532-18.714844 18.714844-18.714844h13.703125c10.320313 0 18.714844 8.394531 18.714844 18.714844v22.371093c0 4.144532 3.355469 7.5 7.5 7.5 4.140625 0 7.496094-3.355468 7.496094-7.5v-22.371093c0-18.589844-15.121094-33.710938-33.710938-33.710938h-13.703125c-18.589844 0-33.714844 15.121094-33.714844 33.710938v227.953125c-4.472656 1.253906-9.0625 2.105468-13.726562 2.554687v-158.113281c0-18.683594-15.199219-33.882812-33.878906-33.882812h-13.371094c-18.679688 0-33.878906 15.199218-33.878906 33.882812v76.414062l-13.730469 7.289063v-25.429687c0-16.820313-13.683594-30.503907-30.5-30.503907h-20.125c-16.820313 0-30.5 13.683594-30.5 30.503907v68.492187l-24.488281 12.996094-68.765625 19.652343c-11.964844 3.417969-21.957031 11.253907-28.128907 22.058594-6.175781 10.808594-7.851562 23.394532-4.71875 35.4375l7.691407 29.59375c1.039062 4.007813 5.132812 6.410156 9.144531 5.371094 4.007812-1.042969 6.414062-5.136719 5.371094-9.148438l-7.691406-29.589843c-4.460938-17.164063 5.402343-34.429688 22.457031-39.300781l62.871093-17.96875 47.253907 126.117187c3.164062 8.445313 2.664062 32.539063-22.332031 41.417969l-47.511719 10.792968c-16.558594 3.757813-32.875-6.167968-37.148438-22.605468l-9.644531-37.113282c-1.042969-4.007812-5.136719-6.414062-9.144531-5.375-4.011719 1.042969-6.414063 5.136719-5.375 9.148438l9.648437 37.117188c5.421875 20.851562 23.945313 34.628906 44.566406 34.628906 15.152344 0 57.933594-11.96875 57.933594-11.96875 13.019532-2.953125 24.121094-11.390625 30.453125-23.140625 5.226563-9.695313 6.777344-20.851563 4.535157-31.480469l164.375-40.242188c13.59375-3.332031 26.5-9.789062 37.3125-18.675781l79.992187-65.726562c24.386719-21.628907 10.082031-46.144531 2.910156-53.28125zm-192.832031-124.363281h13.371094c10.410156 0 18.878906 8.472656 18.878906 18.882812v158.488281l-47.324219-.019531c-4.347656-.039062-1.339843-2.910156-1.101562-3.105469l13.628906-11.039062c12.714844-10.300781 21.019531-24.621094 24.679687-42.570313 2.324219-11.386718-2.019531-22.785156-11.328124-29.746094-8.695313-6.5-19.878907-7.75-29.683594-3.453124v-68.554688c0-10.410156 8.46875-18.882812 18.878906-18.882812zm-113.734375 77.15625c0-8.546876 6.953125-15.503907 15.5-15.503907h20.125c8.546875 0 15.503906 6.957031 15.503906 15.503907v33.390624l-51.132812 27.140626v-60.53125zm294.136719 88.902343-79.996094 65.726563c-9.085938 7.46875-19.929688 12.894531-31.355469 15.691406l-165.585937 40.542969-44.53125-118.839844 127.148437-67.492187c5.167969-2.746094 11.054688-2.289063 15.738281 1.214843 4.683594 3.503907 6.785157 9.011719 5.617188 14.738281-2.949219 14.449219-9.484375 25.859376-19.425781 33.910157l-13.628907 11.042969c-5.585937 4.523437-7.644531 11.824218-5.246093 18.601562 2.398437 6.773438 8.59375 11.15625 15.78125 11.15625l54.644531.023438h.039062c19.453126 0 38.148438-5.914063 54.0625-17.105469l61.070313-42.945313c8.550781-6.015625 20.0625-4.953125 27.367187 2.523438 4.207032 4.296875 12.441407 17.066406-1.699218 31.210937zm0 0"/><path d="m123.414062 448.789062c0-16.292968-13.253906-29.550781-29.546874-29.550781-16.292969 0-29.546876 13.257813-29.546876 29.550781 0 16.289063 13.253907 29.546876 29.546876 29.546876 16.292968 0 29.546874-13.257813 29.546874-29.546876zm-44.09375 0c0-8.023437 6.523438-14.550781 14.546876-14.550781 8.019531 0 14.546874 6.527344 14.546874 14.550781 0 8.019532-6.523437 14.546876-14.546874 14.546876-8.023438 0-14.546876-6.527344-14.546876-14.546876zm0 0"/><path d="m39.933594 235.480469 109.023437-109.863281 24.523438 12.683593c8.785156 4.542969 19.476562 2.988281 26.601562-3.871093l59.34375-57.125s-1.632812 29.339843 23.074219 29.339843c12.71875 0 23.070312-10.351562 23.070312-23.074219v-60.5c0-.070312-.003906-.144531-.003906-.21875-.082031-15.785156-11.625-22.851562-23.066406-22.851562h-59.972656c-12.722656 0-23.070313 10.351562-23.070313 23.070312 0 25.359376 25.808594 23.070313 25.808594 23.070313l-45.273437 43.578125-24.878907-12.867188c-8.996093-4.65625-19.835937-2.949218-26.976562 4.238282l-120.953125 121.886718c-8.960938 9.03125-8.90625 23.667969.125 32.628907 4.351562 4.316406 19.210937 13.289062 32.625-.125zm-22.105469-21.9375 120.953125-121.886719c1.5625-1.570312 4.070312-4.320312 9.441406-1.480469l29.652344 15.335938c2.855469 1.476562 6.332031.972656 8.648438-1.257813l62.546874-60.207031c2.203126-2.121094 2.898438-5.371094 1.753907-8.207031-1.144531-2.839844-3.894531-4.695313-6.957031-4.695313h-21.339844c-4.449219 0-8.070313-3.621093-8.070313-8.074219 0-4.449218 3.621094-8.070312 8.070313-8.070312h59.972656c2.207031 0 8.066406 0 8.066406 8.023438 0 .066406.003906.132812.003906.203124v60.34375c0 4.449219-3.621093 8.070313-8.070312 8.070313-4.453125 0-8.074219-3.621094-8.074219-8.070313v-23.894531c0-3.007812-1.796875-5.726562-4.5625-6.902343-2.765625-1.179688-5.96875-.585938-8.136719 1.5l-72.046874 69.351562c-2.492188 2.398438-6.234376 2.945312-9.304688 1.355469l-29.414062-15.214844c-2.910157-1.503906-6.460938-.945313-8.769532 1.378906l-112.902344 113.769531c-4.921874 4.921876-9.894531 1.554688-11.417968.042969-3.15625-3.136719-3.175782-8.257812-.042969-11.414062zm0 0"/></svg>
                                            </div>
                                            <div className="ms-sm-3 ms-2 building">
                                                <span className="fs-14">High Transaction</span>
                                                <h4 className="font-w600 mb-0">2,346 Unit</h4>
                                            </div>
                                        </div>
                                        <div className="d-flex col-lg-4 col-sm-6 align-items-center">
                                            <div className="building-icon style-1">
                                                <svg height="35px" viewBox="-24 0 511 511.997" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="m452.707031 267.480469c-23.527343-23.421875-50.726562-1.5-50.726562-1.5v-123.300781c0-4.140626-3.355469-7.5-7.496094-7.5-4.144531 0-7.5 3.359374-7.5 7.5v133.851562s-35.761719 28.191406-51.132813 35.082031v-222.007812c0-10.320313 8.394532-18.714844 18.714844-18.714844h13.703125c10.320313 0 18.714844 8.394531 18.714844 18.714844v22.371093c0 4.144532 3.355469 7.5 7.5 7.5 4.140625 0 7.496094-3.355468 7.496094-7.5v-22.371093c0-18.589844-15.121094-33.710938-33.710938-33.710938h-13.703125c-18.589844 0-33.714844 15.121094-33.714844 33.710938v227.953125c-4.472656 1.253906-9.0625 2.105468-13.726562 2.554687v-158.113281c0-18.683594-15.199219-33.882812-33.878906-33.882812h-13.371094c-18.679688 0-33.878906 15.199218-33.878906 33.882812v76.414062l-13.730469 7.289063v-25.429687c0-16.820313-13.683594-30.503907-30.5-30.503907h-20.125c-16.820313 0-30.5 13.683594-30.5 30.503907v68.492187l-24.488281 12.996094-68.765625 19.652343c-11.964844 3.417969-21.957031 11.253907-28.128907 22.058594-6.175781 10.808594-7.851562 23.394532-4.71875 35.4375l7.691407 29.59375c1.039062 4.007813 5.132812 6.410156 9.144531 5.371094 4.007812-1.042969 6.414062-5.136719 5.371094-9.148438l-7.691406-29.589843c-4.460938-17.164063 5.402343-34.429688 22.457031-39.300781l62.871093-17.96875 47.253907 126.117187c3.164062 8.445313 2.664062 32.539063-22.332031 41.417969l-47.511719 10.792968c-16.558594 3.757813-32.875-6.167968-37.148438-22.605468l-9.644531-37.113282c-1.042969-4.007812-5.136719-6.414062-9.144531-5.375-4.011719 1.042969-6.414063 5.136719-5.375 9.148438l9.648437 37.117188c5.421875 20.851562 23.945313 34.628906 44.566406 34.628906 15.152344 0 57.933594-11.96875 57.933594-11.96875 13.019532-2.953125 24.121094-11.390625 30.453125-23.140625 5.226563-9.695313 6.777344-20.851563 4.535157-31.480469l164.375-40.242188c13.59375-3.332031 26.5-9.789062 37.3125-18.675781l79.992187-65.726562c24.386719-21.628907 10.082031-46.144531 2.910156-53.28125zm-192.832031-124.363281h13.371094c10.410156 0 18.878906 8.472656 18.878906 18.882812v158.488281l-47.324219-.019531c-4.347656-.039062-1.339843-2.910156-1.101562-3.105469l13.628906-11.039062c12.714844-10.300781 21.019531-24.621094 24.679687-42.570313 2.324219-11.386718-2.019531-22.785156-11.328124-29.746094-8.695313-6.5-19.878907-7.75-29.683594-3.453124v-68.554688c0-10.410156 8.46875-18.882812 18.878906-18.882812zm-113.734375 77.15625c0-8.546876 6.953125-15.503907 15.5-15.503907h20.125c8.546875 0 15.503906 6.957031 15.503906 15.503907v33.390624l-51.132812 27.140626v-60.53125zm294.136719 88.902343-79.996094 65.726563c-9.085938 7.46875-19.929688 12.894531-31.355469 15.691406l-165.585937 40.542969-44.53125-118.839844 127.148437-67.492187c5.167969-2.746094 11.054688-2.289063 15.738281 1.214843 4.683594 3.503907 6.785157 9.011719 5.617188 14.738281-2.949219 14.449219-9.484375 25.859376-19.425781 33.910157l-13.628907 11.042969c-5.585937 4.523437-7.644531 11.824218-5.246093 18.601562 2.398437 6.773438 8.59375 11.15625 15.78125 11.15625l54.644531.023438h.039062c19.453126 0 38.148438-5.914063 54.0625-17.105469l61.070313-42.945313c8.550781-6.015625 20.0625-4.953125 27.367187 2.523438 4.207032 4.296875 12.441407 17.066406-1.699218 31.210937zm0 0"/><path d="m123.414062 448.789062c0-16.292968-13.253906-29.550781-29.546874-29.550781-16.292969 0-29.546876 13.257813-29.546876 29.550781 0 16.289063 13.253907 29.546876 29.546876 29.546876 16.292968 0 29.546874-13.257813 29.546874-29.546876zm-44.09375 0c0-8.023437 6.523438-14.550781 14.546876-14.550781 8.019531 0 14.546874 6.527344 14.546874 14.550781 0 8.019532-6.523437 14.546876-14.546874 14.546876-8.023438 0-14.546876-6.527344-14.546876-14.546876zm0 0"/><path d="m39.933594 235.480469 109.023437-109.863281 24.523438 12.683593c8.785156 4.542969 19.476562 2.988281 26.601562-3.871093l59.34375-57.125s-1.632812 29.339843 23.074219 29.339843c12.71875 0 23.070312-10.351562 23.070312-23.074219v-60.5c0-.070312-.003906-.144531-.003906-.21875-.082031-15.785156-11.625-22.851562-23.066406-22.851562h-59.972656c-12.722656 0-23.070313 10.351562-23.070313 23.070312 0 25.359376 25.808594 23.070313 25.808594 23.070313l-45.273437 43.578125-24.878907-12.867188c-8.996093-4.65625-19.835937-2.949218-26.976562 4.238282l-120.953125 121.886718c-8.960938 9.03125-8.90625 23.667969.125 32.628907 4.351562 4.316406 19.210937 13.289062 32.625-.125zm-22.105469-21.9375 120.953125-121.886719c1.5625-1.570312 4.070312-4.320312 9.441406-1.480469l29.652344 15.335938c2.855469 1.476562 6.332031.972656 8.648438-1.257813l62.546874-60.207031c2.203126-2.121094 2.898438-5.371094 1.753907-8.207031-1.144531-2.839844-3.894531-4.695313-6.957031-4.695313h-21.339844c-4.449219 0-8.070313-3.621093-8.070313-8.074219 0-4.449218 3.621094-8.070312 8.070313-8.070312h59.972656c2.207031 0 8.066406 0 8.066406 8.023438 0 .066406.003906.132812.003906.203124v60.34375c0 4.449219-3.621093 8.070313-8.070312 8.070313-4.453125 0-8.074219-3.621094-8.074219-8.070313v-23.894531c0-3.007812-1.796875-5.726562-4.5625-6.902343-2.765625-1.179688-5.96875-.585938-8.136719 1.5l-72.046874 69.351562c-2.492188 2.398438-6.234376 2.945312-9.304688 1.355469l-29.414062-15.214844c-2.910157-1.503906-6.460938-.945313-8.769532 1.378906l-112.902344 113.769531c-4.921874 4.921876-9.894531 1.554688-11.417968.042969-3.15625-3.136719-3.175782-8.257812-.042969-11.414062zm0 0"/></svg>
                                            </div>
                                            <div className="ms-sm-3 ms-2 building">
                                                <span className="fs-14">Low Transaction</span>
                                                <h4 className="font-w600 mb-0">2,346 Unit</h4>
                                            </div>
                                        </div>
                                        <div className="d-flex col-lg-4 col-sm-6 mt-sm-0 mt-3 align-items-center">
                                            <div className="me-3 text-sm-end text-start">
                                                <span className="fs-20 font-w500 text-success">0,8%</span>
                                                <p className="mb-0">than last week</p>
                                            </div>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
                                            </svg>													
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body py-0 px-sm-3 px-2">
                                    <OverViewPayment />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h4 className="card-title">Pie Chart</h4>
                                </div>
                                <div className="card-body pt-0 text-center">                                    
                                    <PieChart7 />
                                    <div className="chart-items">
                                        <div className=" col-xl-12 col-sm-12">
                                            <div className="row text-black text-start mt-4 chart-link">
                                                <span className="mb-2 col-6">
                                                    <svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="19" height="19" rx="9.5" fill="#1EAAE7"/>
                                                    </svg>
                                                    Sale Properties
                                                </span>
                                                <span className="mb-2 col-6">
                                                    <svg className="me-1" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="19" height="19" rx="9.5" fill="#FF7A30"/>
                                                    </svg>
                                                    Rented Prop
                                                </span>
                                                <span className="mb-2 col-6">
                                                    <svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="19" height="19" rx="9.5" fill="#6418C3"/>
                                                    </svg>

                                                    Purple Card
                                                </span>
                                                <span className="mb-2 col-6">
                                                    <svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="19" height="19" rx="9.5" fill="#FFEF5F"/>
                                                    </svg>
                                                    Yellow Card
                                                </span>
                                                <span className="mb-2 col-6">
                                                    <svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="19" height="19" rx="9.5" fill="#2BC155"/>
                                                    </svg>
                                                    Green Card
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>	
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-4">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body pb-3">
                                    <p className="mb-2 d-flex  fs-16 text-black font-w500">Product Viewed
                                        <span className="ms-auto text-dark fs-14 font-w400">561/days</span>
                                    </p>
                                    <div className="progress mb-4" style={{height:"18px"}}>
                                        <div className="progress-bar  bg-gradient-1 progress-animated" style={{width:"60%", height:"18px"}}>
                                            <span className="sr-only">60% Complete</span>
                                        </div>
                                    </div>
                                    <p className="mb-2 d-flex  fs-16 text-black font-w500">Product Listed
                                        <span className="ms-auto text-dark fs-14 font-w400">3,456 Unit</span>
                                    </p>
                                    <div className="progress mb-3" style={{height:"18px"}}>
                                        <div className="progress-bar  bg-gradient-2 progress-animated" style={{width:"90%", height:"18px"}}>
                                            <span className="sr-only">90% Complete</span>
                                        </div>
                                    </div>
                                    <p className="mb-2 d-flex  fs-16 text-black font-w500">Reviews
                                        <span className="ms-auto text-dark fs-14 font-w400">456 Comment</span>
                                    </p>
                                    <div className="progress mb-3" style={{height:"18px"}}>
                                        <div className="progress-bar  bg-gradient-3 progress-animated" style={{width:"50%", height:"18px"}}>
                                            <span className="sr-only">50% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-md-6">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="card-title">Customer Review</h4>
                                    <Dropdown className="dropdown custom-dropdown mb-0">
                                        <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn dark-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item eventKey="Monthly" >Details</Dropdown.Item>
                                            <Dropdown.Item eventKey="Monthly" className="text-danger">Cancel</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="card-body pb-0">
                                    <div className="pb-3 border-bottom mb-3">
                                        <div className="d-flex mb-3 flex-wrap align-items-end">
                                            <img className="rounded me-3" src={Test11} width="40" alt="" />
                                            <div>
                                                <h5 className="fs-16 font-w600 mb-0"><Link to={"#"} className="text-black">Hawkins Maru</Link></h5>
                                                <span className="fs-12">5m ago</span>
                                            </div>
                                            <div className="star-icons ms-auto">
                                                <i className="las la-star"/>{" "}
                                                <i className="las la-star" /> {" "}
                                                <i className="las la-star text-light"/>{" "}
                                                <i className="las la-star text-light"/>{" "}
                                                <i className="las la-star text-light"/>
                                            </div>
                                        </div>
                                        <p className="fs-14 mb-0">I viewed a number of properties with Just Property and found them to be professional, efficient, patient, courteous and helpful every time.
                                        </p>
                                    </div>
                                    <div className="pb-3 border-bottom mb-3">
                                        <div className="d-flex mb-3 flex-wrap align-items-end">
                                            <img className="rounded me-3" src={Test22} width="40" alt="" />
                                            <div>
                                                <h5 className="fs-16 font-w600 mb-0"><Link to={"#"} className="text-black" >Bella Smith</Link></h5>
                                                <span className="fs-12">20m ago</span>
                                            </div>
                                            <div className="star-icons ms-auto">
                                                <i className="las la-star"/>{" "}
                                                <i className="las la-star"/>{" "}
                                                <i className="las la-star"/>{" "}
                                                <i className="las la-star"/>{" "}
                                                <i className="las la-star text-light" />
                                            </div>
                                        </div>
                                        <p className="fs-14 mb-0">Dealing with Syamsudin and Bakri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye. Both Syamsudin and Bakri strive to deliver a professional service and surpassed my expectations - they were not only helpful but extremely approachable and not at all bumptious...
                                        </p>
                                    </div>
                                    
                                </div>
                                <div className="card-footer border-0 pt-0">
                                    <Link to={"#"} className="btn btn-primary btn-block">See More Reviews</Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index7;