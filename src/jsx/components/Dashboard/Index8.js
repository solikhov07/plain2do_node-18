import React,{useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import { Dropdown, Tab, Nav } from 'react-bootstrap';
import loadable from "@loadable/component";

//Images
import rated1 from "../../../images/testimonial/reated-img/1.jpg";
import rated2 from "../../../images/testimonial/reated-img/2.jpg";
import rated3 from "../../../images/testimonial/reated-img/3.jpg";
import rated5 from "../../../images/testimonial/reated-img/5.jpg";

//Component
import CustomerSlider from '../Dompet/Dashboard8/CustomerSlider';
import { ThemeContext } from '../../../context/ThemeContext';
const RevenuBarChart = loadable(() => import("../Dompet/Dashboard8/RevenuBarChart"));
const InvoiceLineChart = loadable(() => import("../Dompet/Dashboard8/InvoiceLineChart"));

const patientList = [
   {image:rated1, title:'Aziz Bakree', status:'Completed', color:'text-success'},
   {image:rated2, title:'Griezerman', status:'On Recovery', color:'text-primary'},
   {image:rated3, title:'Oconner', status:'Rejected', color:'text-danger'},
   {image:rated5, title:'Uli Trumb', status:'Recovered', color:'text-primary'},
   {image:rated2, title:'Aziz Bakree', status:'Pending', color:'text-info'},
   {image:rated5, title:'Oconner', status:'Rejected', color:'text-danger'},
];

const Index8 = () => {
    const { changeBackground, 
        changeSideBarStyle , changePrimaryColor,
        chnageSidebarColor, 
    } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
        if (window.innerWidth >= 768) {
		    changeSideBarStyle({ value: "mini", label: "Mini" });
        }
		changePrimaryColor("color_11");
		chnageSidebarColor("color_11");
	}, []);	
    return (
        <div className="row invoice-card-row">	
            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card invoice-card gradient-bx text-white bg-danger rounded position-unset">	
                    <div className="card-body">
                        <div className="media align-items-center">
                            <div className="media-body">
                                <p className="text-white fs-18 mb-1">Total invoice</p>
                                <div className="d-flex flex-wrap">
                                    <h2 className="text-white mb-0 me-3 invoice-num">783k</h2>
                                    <div>	
                                        <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.875 9.25C21.0787 11.6256 25.1753 16.0091 26.4375 17.5H1V1L10.625 13.375L18.875 9.25Z" fill="url(#paint0_linear1)"/>
                                            <path d="M26.4375 17.5C25.1753 16.0091 21.0787 11.6256 18.875 9.25L10.625 13.375L1 1" stroke="white" strokeWidth="2"/>
                                            <defs>
                                            <linearGradient id="paint0_linear1" x1="13.7188" y1="3.0625" x2="12.6875" y2="17.5" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" stopOpacity="0.73" offset="0.1"/>
                                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                                            </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="fs-14">+4%</div>
                                    </div>
                                </div>
                            </div>
                            <span className="border  rounded-circle p-4">
                                <svg className="svg-icon" height="34" viewBox="0 -11 493.78 493" width="34" xmlns="http://www.w3.org/2000/svg"><path d="m378.351562 70.472656c.214844.015625.429688.03125.648438.03125.371094 0 .742188-.03125 1.105469-.082031 9.722656.199219 17.503906 8.128906 17.515625 17.851563 0 4.417968 3.582031 8 8 8 4.417968 0 8-3.582032 8-8-.019532-15.902344-11.089844-29.660157-26.621094-33.082032v-7.6875c0-4.417968-3.582031-8-8-8s-8 3.582032-8 8v8.050782c-16.421875 4.390624-27.046875 20.277343-24.832031 37.132812 2.214843 16.855469 16.582031 29.457031 33.582031 29.457031 9.871094 0 17.871094 8.003907 17.871094 17.875 0 9.867188-8 17.871094-17.871094 17.871094s-17.871094-8.003906-17.871094-17.871094c0-4.417969-3.582031-8-8-8-4.417968 0-8 3.582031-8 8 .019532 15.328125 10.316406 28.738281 25.121094 32.71875v8.765625c0 4.417969 3.582031 8 8 8s8-3.582031 8-8v-8.398437c16.894531-3.699219 28.289062-19.535157 26.425781-36.730469-1.859375-17.195312-16.378906-30.226562-33.675781-30.222656-9.597656.003906-17.484375-7.574219-17.863281-17.164063-.375-9.589843 6.894531-17.765625 16.464843-18.511719zm0 0"/><path d="m380.207031.390625c-49.214843 0-91.214843 32.113281-106.949219 75.113281h-198.558593c-4.398438 0-7.96875 3.964844-8 8.359375l-1.890625 280.640625h-56.597656c-4.417969 0-8.210938 3.199219-8.210938 7.625v35.613282c.101562 33.527343 26.507812 61.070312 60 62.585937v.175781h247v-.234375c2 .074219 2.824219.234375 4.089844.234375h.171875c34.664062-.054687 62.738281-28.171875 62.738281-62.835937v-180.0625c2 .109375 4.117188.167969 6.1875.167969 62.628906 0 113.59375-51.0625 113.59375-113.695313 0-62.628906-50.941406-113.6875-113.574219-113.6875zm-317.164062 454.113281h-.050781c-25.878907-.035156-46.875-20.960937-46.992188-46.84375v-27.15625h232v27.042969c.011719 16.695313 6.679688 32.699219 18.523438 44.46875.839843.839844 1.882812 1.488281 2.761718 2.488281zm294.957031-46.84375c.003906 25.835938-20.914062 46.792969-46.746094 46.84375h-.152344c-25.9375-.046875-46.972656-21.015625-47.101562-46.949218v-35.425782c.066406-2.046875-.714844-4.027344-2.164062-5.472656-1.449219-1.445312-3.429688-2.222656-5.472657-2.152344h-175.554687l1.835937-273h186.171875c-1.417968 7.324219-2.152344 14.761719-2.191406 22.21875-.015625 15.769532 3.273438 31.363282 9.65625 45.78125h-75.5625c-4.421875 0-8 3.582032-8 8 0 4.417969 3.578125 8 8 8h84.242188c16.503906 25.953125 42.886718 44.046875 73.039062 50.101563zm22.207031-195.882812c-53.890625 0-97.582031-43.6875-97.578125-97.582032 0-53.894531 43.6875-97.582031 97.582032-97.582031 53.890624 0 97.578124 43.691407 97.578124 97.582031-.058593 53.867188-43.710937 97.523438-97.582031 97.582032zm0 0"/><path d="m149.367188 212.746094c-14.121094 0-25.605469 11.121094-25.605469 24.792968 0 13.671876 11.484375 24.792969 25.605469 24.792969 14.121093 0 25.609374-11.121093 25.609374-24.792969 0-13.671874-11.488281-24.792968-25.609374-24.792968zm0 33.585937c-5.300782 0-9.605469-3.945312-9.605469-8.792969 0-4.851562 4.308593-8.792968 9.605469-8.792968 5.296874 0 9.609374 3.945312 9.609374 8.792968 0 4.847657-4.3125 8.792969-9.609374 8.792969zm0 0"/><path d="m192.71875 237.503906c0 4.417969 3.578125 8 8 8h106.65625c4.417969 0 8-3.582031 8-8 0-4.417968-3.582031-8-8-8h-106.65625c-4.421875 0-8 3.582032-8 8zm0 0"/><path d="m149.367188 143.203125c-14.121094 0-25.605469 11.125-25.605469 24.796875s11.484375 24.792969 25.605469 24.792969c14.121093 0 25.609374-11.121094 25.609374-24.792969s-11.488281-24.796875-25.609374-24.796875zm0 33.589844c-5.300782 0-9.605469-3.945313-9.605469-8.792969s4.308593-8.796875 9.605469-8.796875c5.296874 0 9.609374 3.945313 9.609374 8.796875 0 4.847656-4.3125 8.796875-9.609374 8.796875zm0 0"/><path d="m149.367188 282.28125c-14.121094 0-25.605469 11.121094-25.605469 24.792969s11.484375 24.792969 25.605469 24.792969c14.121093 0 25.609374-11.121094 25.609374-24.792969s-11.488281-24.792969-25.609374-24.792969zm0 33.585938c-5.300782 0-9.605469-3.941407-9.605469-8.792969 0-4.847657 4.308593-8.792969 9.605469-8.792969 5.296874 0 9.609374 3.945312 9.609374 8.792969 0 4.847656-4.3125 8.792969-9.609374 8.792969zm0 0"/><path d="m307.375 299.503906h-106.65625c-4.421875 0-8 3.582032-8 8 0 4.417969 3.578125 8 8 8h106.65625c4.417969 0 8-3.582031 8-8 0-4.417968-3.582031-8-8-8zm0 0"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card invoice-card gradient-bx text-white bg-success rounded position-unset">	
                    <div className="card-body">
                        <div className="media align-items-center">
                            <div className="media-body">
                                <p className="mb-1 text-white fs-18">Secure Payment</p>
                                <div className="d-flex flex-wrap">
                                    <h2 className="invoice-num text-white mb-0 me-3">76</h2>
                                    <div>	
                                        <svg width="28" height="19" viewBox="0 0 28 19" fill="none">
                                            <path d="M18.875 9.25C21.0787 11.6256 25.1753 16.0091 26.4375 17.5H1V1L10.625 13.375L18.875 9.25Z" fill="url(#paint0_linear1)"/>
                                            <path d="M26.4375 17.5C25.1753 16.0091 21.0787 11.6256 18.875 9.25L10.625 13.375L1 1" stroke="white" strokeWidth="2"/>
                                            <defs>
                                            <linearGradient id="paint0_linear2" x1="13.7188" y1="3.0625" x2="12.6875" y2="17.5" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" stopOpacity="0.73" offset="0.1"/>
                                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                                            </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="fs-14">-4%</div>
                                    </div>
                                </div>
                            </div>
                            <span className="border rounded-circle p-4">
                                <svg className="svg-icon" id="line" height="30" viewBox="0 0 64 64" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m33.81856 44.8171h-24.81885a3.00311 3.00311 0 0 1 -2.99983-2.99982v-19.3226h46.137v4.48362a1.00006 1.00006 0 0 0 1.99988-.00006v-11.5393a5.0056 5.0056 0 0 0 -4.99976-4.99971h-40.13729a5.0056 5.0056 0 0 0 -4.99971 4.99971v26.37834a5.00559 5.00559 0 0 0 4.99971 4.99972h24.81885a1.00012 1.00012 0 0 0 0-1.9999zm-27.81868-29.37816a3.00311 3.00311 0 0 1 2.99983-2.99982h40.13729a3.00311 3.00311 0 0 1 2.99983 2.99982v1.49015h-46.13695zm0 3.49h46.137v1.56586h-46.137z"/><path d="m11.23981 38.32139a1.00013 1.00013 0 0 0 .00006 1.99988h7.13038a1.00013 1.00013 0 0 0 -.00006-1.99988z"/><path d="m59.58561 33.44619c-.12036-.572-.18017-1.31926-.84273-1.51115l-10.87924-3.50126a1.01134 1.01134 0 0 0 -.61325 0l-10.87826 3.50122c-.661.19378-.721.9358-.84371 1.50919-1.60146 8.00783 1.5214 15.1788 7.95462 18.269l3.64138 1.74892a.99767.99767 0 0 0 .86519 0l3.64239-1.74893c6.43319-3.08966 9.55508-10.26063 7.95361-18.26699zm-8.81882 16.46436-3.20979 1.54093-3.2088-1.54093c-5.634-2.68874-8.32306-9.1537-6.82284-16.24514l10.03164-3.2293 10.03261 3.22881c1.49706 7.09413-1.189 13.55689-6.82282 16.24563z"/><path d="m52.39462 37.55288-5.29754 4.72042-2.33482-2.3343a1 1 0 0 0 -1.41392 1.414l3.00172 3.00178a.99946.99946 0 0 0 1.372.03954l6.00256-5.34832a1 1 0 0 0 -1.33-1.49312z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card invoice-card gradient-bx text-white bg-info rounded position-unset">	
                    <div className="card-body">
                        <div className="media align-items-center">
                            <div className="media-body">
                                <p className="mb-1 text-white fs-18">Total</p>
                                <div className="d-flex flex-wrap">
                                    <h2 className="invoice-num text-white mb-0 me-3">76</h2>
                                    <div>	
                                        <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.875 9.25C21.0787 11.6256 25.1753 16.0091 26.4375 17.5H1V1L10.625 13.375L18.875 9.25Z" fill="url(#paint0_linear2)"/>
                                            <path d="M26.4375 17.5C25.1753 16.0091 21.0787 11.6256 18.875 9.25L10.625 13.375L1 1" stroke="white" strokeWidth="2"/>
                                            <defs>
                                            <linearGradient id="paint0_linear3" x1="13.7188" y1="3.0625" x2="12.6875" y2="17.5" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" stopOpacity="0.73" offset="0.1"/>
                                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                                            </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="fs-14">-4%</div>
                                    </div>
                                </div>
                            </div>
                            <span className="border rounded-circle p-4">
                                <svg className="svg-icon" id="Layer_1" enableBackground="new 0 0 48 48" height="30" viewBox="0 0 48 48" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m46 25.695v-14.695c0-.552-.448-1-1-1h-42c-.552 0-1 .448-1 1v26c0 .552.448 1 1 1h24.792c1.966 3.006 5.356 5 9.208 5 6.065 0 11-4.935 11-11 0-2.346-.744-4.517-2-6.305zm-2-13.695v11.521c-.613-.507-1.286-.941-2-1.307v-7.214c0-.552-.448-1-1-1h-7.221c-.783-.766-1.661-1.433-2.605-2zm-6.349 9.033c-.4-1.834-1.135-3.543-2.178-5.033h4.527v5.426c-.754-.214-1.54-.345-2.349-.393zm-33.651 14.967v-24h12.826c-.945.567-1.822 1.234-2.605 2h-7.221c-.552 0-1 .448-1 1v18c0 .552.448 1 1 1h7.221c.783.766 1.661 1.433 2.605 2zm8.527-20c-1.588 2.27-2.527 5.026-2.527 8s.939 5.73 2.527 8h-4.527v-16zm11.473 20c-6.617 0-12-5.383-12-12s5.383-12 12-12c5.613 0 10.324 3.88 11.626 9.095-3.011.378-5.641 1.975-7.389 4.283-.712-1.151-1.868-1.998-3.237-2.277v-5.917c1.161.414 2 1.514 2 2.816 0 .552.448 1 1 1s1-.448 1-1c0-2.414-1.721-4.434-4-4.899v-1.101c0-.552-.448-1-1-1s-1 .448-1 1v1.101c-2.279.465-4 2.484-4 4.899s1.721 4.434 4 4.899v5.917c-1.161-.414-2-1.514-2-2.816 0-.552-.448-1-1-1s-1 .448-1 1c0 2.414 1.721 4.434 4 4.899v1.101c0 .552.448 1 1 1s1-.448 1-1v-1.101c.36-.073.703-.19 1.028-.34.056 1.097.27 2.15.625 3.14-.854.194-1.741.301-2.653.301zm1-5.184v-5.631c1.017.362 1.786 1.25 1.962 2.339-.355.793-.617 1.634-.776 2.513-.326.344-.729.616-1.186.779zm-2-13.632v5.631c-1.161-.414-2-1.514-2-2.816s.839-2.401 2-2.815zm14 23.816c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.037 9-9 9zm4.707-5.707c.391.391.391 1.023 0 1.414s-1.023.391-1.414 0l-3.293-3.293-3.293 3.293c-.391.391-1.023.391-1.414 0s-.391-1.023 0-1.414l3.293-3.293-3.293-3.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l3.293 3.293 3.293-3.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-3.293 3.293z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card invoice-card gradient-bx text-white bg-secondary rounded position-unset">	
                    <div className="card-body">
                        <div className="media align-items-center">
                            <div className="media-body">
                                <p className="mb-1 text-white fs-18">Total Promotion</p>
                                <div className="d-flex flex-wrap">
                                    <h2 className="invoice-num text-white mb-0 me-3">$56k</h2>
                                    <div>	
                                        <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.56244 9.25C6.35869 11.6256 2.26214 16.0091 0.999939 17.5H26.4374V1L16.8124 13.375L8.56244 9.25Z" fill="url(#paint0_linear3)"/>
                                            <path d="M0.999939 17.5C2.26214 16.0091 6.35869 11.6256 8.56244 9.25L16.8124 13.375L26.4374 1" stroke="white" strokeWidth="2"/>
                                            <defs>
                                            <linearGradient id="paint0_linear4" x1="13.7187" y1="3.0625" x2="14.7499" y2="17.5" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" stopOpacity="0.73" offset="0.1"/>
                                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                                            </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="fs-14">+4%</div>
                                    </div>
                                </div>
                            </div>
                            <span className="border rounded-circle p-4">
                                <svg className="svg-icon" width="30" height="30" id="Layer_5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m55.751 461.082a8 8 0 1 1 -8-8 8 8 0 0 1 8 8zm369.649-339.054c-6.921 0-12.551-4.562-12.551-10.17a8 8 0 0 0 -16 0c0 11.885 8.691 21.938 20.551 25.117v4.225a8 8 0 0 0 16 0v-4.221c11.86-3.179 20.551-13.232 20.551-25.117 0-20.325-16.842-23.868-26.9-25.984-12.207-2.568-14.2-4.016-14.2-10.327 0-5.608 5.63-10.17 12.551-10.17s12.551 4.562 12.551 10.17a8 8 0 1 0 16 0c0-11.885-8.691-21.938-20.551-25.117v-4.226a8 8 0 0 0 -16 0v4.222c-11.86 3.179-20.551 13.232-20.551 25.117 0 20.325 16.842 23.867 26.9 25.984 12.207 2.568 14.2 4.015 14.2 10.327.002 5.608-5.628 10.17-12.551 10.17zm-56.222 29.572a80.706 80.706 0 0 1 96.565-127.8 80.71 80.71 0 0 1 -62.361 147.549l-23.853 16.228a8 8 0 0 1 -12.478-7.2zm13.533-9.279a8 8 0 0 1 2.708 6.607l-1.19 16.1 13.344-9.077a8 8 0 0 1 7.07-.962 64.721 64.721 0 1 0 -21.932-12.671zm116.03 96a8 8 0 0 0 -7.31-8.634l-60.747-5.046a8 8 0 0 0 -8.345 10.2l1.191 4.1-29.695-5.606a8 8 0 1 0 -2.969 15.722l42.491 8.022a8 8 0 0 0 9.168-10.091l-1.581-5.446 49.162 4.083a8 8 0 0 0 8.635-7.305zm-61.622 33.345-48.5-9.156a8 8 0 1 0 -2.969 15.722l48.5 9.156a8.106 8.106 0 0 0 1.493.14 8 8 0 0 0 1.476-15.862zm-44.064-55a8 8 0 0 0 2.075-.275l73.728-19.757a8 8 0 1 0 -4.14-15.454l-73.729 19.757a8 8 0 0 0 2.066 15.729zm-355.141 157.32-21.83 6.106a8 8 0 0 1 -4.311-15.409l29.594-8.277a8 8 0 0 1 9.876 5.608l.519 1.911 24.067-21.143a41.715 41.715 0 0 1 -6.86-7.471l-3.833 1.034a25.957 25.957 0 0 1 -31.75-18.325l-6.491-24.2a25.959 25.959 0 0 1 18.328-31.74l3.845-1.029a42.018 42.018 0 0 1 30.843-36.391l67.3-18.03c40.778-10.933 95.479-54.509 116.484-92.4a22.646 22.646 0 0 1 16.613-24.24l.027-.007a22.682 22.682 0 0 1 27.706 16.017l18.11 67.587a53.9 53.9 0 0 1 26.511 98.938l18.106 67.575a22.617 22.617 0 0 1 -42.534 15 188.656 188.656 0 0 0 -110.6-27.669 23.175 23.175 0 0 1 2.019 5.02 22.912 22.912 0 0 1 -2.16 17.2 26.138 26.138 0 0 1 8.366 34.549 26.138 26.138 0 0 1 9.236 35.588 26.662 26.662 0 0 1 -3.437 4.683 23.126 23.126 0 0 1 -10.635 38.39l-31.466 8.419a23.025 23.025 0 0 1 -5.981.794 22.743 22.743 0 0 1 -3.076-.212l-40.485 10.868a32.709 32.709 0 0 1 -8.467 1.147 32.2 32.2 0 0 1 -12.644-2.664l-14-5.894a15.008 15.008 0 0 0 -10.604-.819l-11.616 3.311.762 2.809a8 8 0 0 1 -5.565 9.8l-29.594 8.277a8 8 0 0 1 -4.31-15.41l21.948-6.138-.722-2.658v-.014l-.006-.025-26.097-96.078c-.041-.143-.088-.282-.121-.428 0-.017-.005-.034-.009-.052zm125.168 64.3a23.281 23.281 0 0 1 5.044-6.531 26.08 26.08 0 0 1 -4.082-30.99 26.084 26.084 0 0 1 -11.886-15.7 25.808 25.808 0 0 1 -.862-6.371 24.6 24.6 0 0 1 -2.569-6.106l-2.55-9.493a8.693 8.693 0 0 0 -4.081-5.306 8.93 8.93 0 0 0 -1.551-.709 29.648 29.648 0 0 1 -9.191 15.611l20.446 53.921a20.3 20.3 0 0 0 11.282 11.674zm40.391-96.315a7.125 7.125 0 0 0 -7.981-10.442l-6.078 1.635 3.693 13.767 6.055-1.629a7.074 7.074 0 0 0 4.311-3.331zm-16.5 44.364 18.633-4.98a10.238 10.238 0 0 0 -5.3-19.78l-3.208.858a24.8 24.8 0 0 1 -10.122 23.902zm22.777 10.474-25.46 6.8a10.236 10.236 0 0 0 5.218 19.8l6.284-1.681 19.246-5.165a10.108 10.108 0 0 0 6.194-4.769 10.2 10.2 0 0 0 -11.482-14.985zm12.162 41.851a7.164 7.164 0 0 0 -8.706-5.028l-12.964 3.468-6.51 1.747c-.049.013-.1.021-.149.035l-11.847 3.169a7.136 7.136 0 0 0 -5.231 6.246v.091s-.012.084-.017.126a7.04 7.04 0 0 0 3.553 6.579 7.225 7.225 0 0 0 1.922.771l.1.022a6.967 6.967 0 0 0 3.355-.064l31.472-8.422a7.161 7.161 0 0 0 5.025-8.742zm108.7-248.431 17.588 65.649a37.911 37.911 0 0 0 -17.591-65.649zm-50.837-76.687 62.734 234.127a6.628 6.628 0 0 0 12.81-3.412l-42.959-160.32c-.04-.13-.073-.261-.106-.394l-19.671-73.413a6.538 6.538 0 0 0 -3.091-4 6.56 6.56 0 0 0 -9.044 2.423 6.511 6.511 0 0 0 -.675 4.989zm-120.77 106.192 25.8 96.283a204.248 204.248 0 0 1 137.295 17.303l-53-197.785c-25.209 35.378-71.322 71.007-110.095 84.199zm-98.023 101.16 1.248-.337-11.625-43.357-1.245.333a9.957 9.957 0 0 0 -7.01 12.141l6.49 24.206a9.958 9.958 0 0 0 12.142 7.016zm27.082 11.138 19.6-17.216a31.389 31.389 0 0 1 12.983-6.932l26.6-7.116a32.025 32.025 0 0 1 16.922.045l-20.54-76.658-59.571 15.959a25.985 25.985 0 0 0 -19.158 26.427c.011.127.02.254.025.38a25.9 25.9 0 0 0 .816 4.926l12.268 45.773a25.761 25.761 0 0 0 10.055 14.412zm-31.759 48.626 22.184 81.707 11.4-3.25a31.192 31.192 0 0 1 21.231 1.456l14 5.895a15.683 15.683 0 0 0 10.764.805l27.38-7.351a23.083 23.083 0 0 1 -2.006-4.983c-.042-.155-.074-.309-.112-.464a36.642 36.642 0 0 1 -24.3-22.189l-19.619-51.733a48.94 48.94 0 0 1 -14.626 2.218 8 8 0 0 1 0-16c2.133 0 9.032-.268 14.689-3.445a8.031 8.031 0 0 1 .788-.47c4.082-2.552 7.335-6.754 7.335-13.682a8 8 0 0 1 5.933-7.728 24.78 24.78 0 0 1 30.29 17.509l2.549 9.488a8.757 8.757 0 0 0 16.915-4.531l-9.643-35.945c-.025-.084-.057-.164-.08-.249l-.052-.195a16.351 16.351 0 0 0 -19.931-11.3l-26.6 7.117a15.508 15.508 0 0 0 -6.579 3.509l-23.862 20.958c-.05.045-.1.091-.152.134l-33.601 29.524a33.825 33.825 0 0 1 -4.295 3.195z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-lg-12">
                <div className="card">
                    <div className="card-header border-0 pb-0">
                        <h3 className="card-title">Revenue</h3>                       
                        <Dropdown className="dropdown d-inline-block">
                            <Dropdown.Toggle                           
                            variant=""                                                    
                            className="btn btn-outline-primary btn-md"
                            >
                            <span className="font-w500">2023</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-left">
                                <Dropdown.Item className="dropdown-item" to="/">2023</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" to="/">2022</Dropdown.Item>
                                <Dropdown.Item className="dropdown-item" to="/">2021</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="card-body">
                        <div className="d-flex align-items-end">
                            
                            <h2 className="mb-0 me-2">$41,512k</h2>
                            <span className="text-secondary fs-18 font-w400">$25,612k</span>
                        </div>
                        
                        <RevenuBarChart />
                    </div>
                </div>
            </div>
            <div className="col-xl-9 col-xxl-8 col-lg-8">
               <Tab.Container defaultActiveKey="monthly">
                  <div className="card">
                     <div className="card-header d-sm-flex d-block border-0 pb-0">
                        <h3 className="fs-20 mb-3 mb-sm-0 text-black">
                            Invoice Statistic
                        </h3>
                        <div className="card-action card-tabs mt-3 mt-sm-0 mt-3 mt-sm-0">
                           <Nav className="nav nav-tabs" role="tablist">
                              <Nav.Item className="nav-item">
                                 <Nav.Link
                                    className="nav-link" eventKey="monthly" 
                                 >
                                    Monthly
                                 </Nav.Link>
                              </Nav.Item>
                              <li className="nav-item">
                                 <Nav.Link
                                    className="nav-link" eventKey="weekly" 
                                 >
                                    Weekly
                                 </Nav.Link>
                              </li>
                              <li className="nav-item">
                                 <Nav.Link
                                    className="nav-link" eventKey="today" 
                                 >
                                    Today
                                 </Nav.Link>
                              </li>
                           </Nav>
                        </div>
                     </div>
                     <div className="card-body pb-0">
                        <Tab.Content>
                           <Tab.Pane eventKey="monthly" >
                                <div
                                    className="chart-warp"
                                    style={{ overflow: "hidden" }}
                                >
                                 <InvoiceLineChart />
                              </div>                        
                           </Tab.Pane>
                           <Tab.Pane eventKey="weekly">
                              <InvoiceLineChart />
                           </Tab.Pane>
                           <Tab.Pane eventKey="today">
                              <InvoiceLineChart />
                           </Tab.Pane>
                        </Tab.Content>
                     </div>
                  </div>
               </Tab.Container>
            </div>
            <div className="col-xl-9 col-xxl-8 col-lg-7">
               <div className="card">
                  <div className="card-header border-0 pb-0">
                     <h3 className="fs-20 mb-0 text-black">
                        Top Rated Doctors
                     </h3>
                     <Link to="#" className="text-primary font-w500">
                        View more &gt;&gt;
                     </Link>
                  </div>
                  <div className="card-body">
                     <CustomerSlider />
                  </div>
               </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-lg-5">
               <div className="card border-0 pb-0">
                  <div className="card-header flex-wrap border-0 pb-0">
                     <h3 className="fs-20 mb-0 text-black">Recent Patient</h3>
                     <Link
                        to="/patient-list"
                        className="text-primary font-w500"
                     >
                        View more &gt;&gt;
                     </Link>
                  </div>
                  <div className="card-body recent-patient px-0">
                     <div id="DZ_W_Todo2" className="widget-media dlab-scroll px-4 height320">
                        <ul className="timeline">
                           {patientList.map((item, ind)=>(
                              <li key={ind}>
                                 <div className="timeline-panel flex-wrap">
                                    <div className="media me-3">
                                       <img className="rounded-circle" alt="widget" width={50} src={item.image}/>
                                    </div>
                                    <div className="media-body">
                                       <h5 className="mb-1">
                                          <Link className="text-black" to="/patient-details">{item.title}</Link>
                                       </h5>
                                       <span className="fs-14">24 Years</span>
                                    </div>
                                    <Link to="/dashboard" className={`mt-2 ${item.color}`}>{item.status}</Link>
                                 </div>
                              </li>
                           ))}                           
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

         </div>   
    );
};

export default Index8;