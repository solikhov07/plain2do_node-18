import React,{useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ApexCharts from 'apexcharts';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown } from 'react-bootstrap';

import { ThemeContext } from "../../../context/ThemeContext";
import SliderDashboard4 from '../Dompet/Dashboard4/SliderDashboard4';
import DropdownBlog from '../Dompet/DropdownBlog';

const RedialChart = loadable(() =>
 	pMinDelay(import("../Dompet/Dashboard4/RedialChart"), 1000)
);
const ProjectAreaChart = loadable(() =>
 	pMinDelay(import("../Dompet/Dashboard4/ProjectAreaChart"), 1000)
);
const EmailPieChart = loadable(() =>
 	pMinDelay(import("../Dompet/Dashboard4/EmailPieChart"), 1000)
);
const StatisticBarChart = loadable(() =>
 	pMinDelay(import("../Dompet/Dashboard4/StatisticBarChart"), 1000)
);

const CharacterData = [
	{ svgColor:'#FFD125', changeClass:'up', title:'Income'},
	{ svgColor:'#FCFCFC',  title:'Expense'},
];

const Index4 = () => {
    const { changeBackground, changeSideBarLayout,
        changeSideBarStyle , changePrimaryColor,
        chnageSidebarColor, changeHeaderPostion
    } = useContext(ThemeContext);
	useEffect(() => {        
		changeBackground({ value: "light", label: "Light" });
        if (window.innerWidth >= 768) {
		    changeSideBarStyle({ value: "icon-hover", label: "icon-hover" });
        }
        if (window.innerWidth >= 768) {
		    changeSideBarLayout({ value: "horizontal", label: "Horizontal" });
        }
		changeHeaderPostion({ value: "static", label: "Static" });
		changePrimaryColor("color_10");		
		chnageSidebarColor("color_10");
	}, []);	

    // Payment   
    const handleSeries = (value) => {       
        ApexCharts.exec('assetDistribution', 'toggleSeries', value)
      }
    const projectSeries = (value) => {       
        ApexCharts.exec('assetDistribution2', 'toggleSeries', value)
    }

    const [country1, setCountry1] = useState("Today");
    return (
        <div className="row invoice-card-row">
            <div className="col-xl-12">
                <SliderDashboard4 />
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-12">
                        <div className="card Upgrade">
                            <div className="card-body d-flex align-items-center ps-0">
                                <div className="d-inline-block position-relative donut-chart-sale ">
                                    <RedialChart />
                                </div>
                                <div className="upgread-stroage">
                                    <h4 className="card-title">Upgrade Your Storage</h4>
                                    <p>Lorem ipsum dolor sit amet, onsectetur.</p>
                                    <button className="btn btn-sm btn-success">Upgrade</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-6 col-12">
                        <div className="card overflow-hidden">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div>
                                        <h2>7,642</h2>
                                        <span className="fs-18 text-secondary font-w600 mb-3 d-block">Total emails Subcriber.</span>
                                    </div>
                                    <div className="compose-btn">
                                        <Link to={"/email-compose"} className="btn btn-sm btn-secondary btn-sm ">+ Compose Email</Link>
                                    </div>	
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                                <div className="mail-img">
                                    <svg width="156" height="84" viewBox="0 0 156 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.1" d="M164.961 6.14744C165.013 5.67345 165.013 5.1969 164.961 4.72291L164.136 3.36961C164.136 3.36961 164.136 2.87103 163.678 2.65735L163.22 2.30122L161.754 1.37527C161.353 1.05833 160.888 0.79377 160.379 0.591786L158.821 0.164429H156.988H8.52299H6.69009L5.13212 0.663011C4.62116 0.832312 4.15505 1.07382 3.75745 1.37527L2.29113 2.30122C2.29113 2.30122 2.29113 2.30122 2.29113 2.65735C2.29113 3.01348 2.29113 3.15593 1.8329 3.36961L1.00809 4.72291C0.956224 5.1969 0.956224 5.67345 1.00809 6.14744L0 6.93093V92.4025C0 94.2916 0.965543 96.1032 2.68422 97.439C4.4029 98.7747 6.73393 99.5252 9.16451 99.5252H91.6451C94.0756 99.5252 96.4067 98.7747 98.1253 97.439C99.844 96.1032 100.81 94.2916 100.81 92.4025C100.81 90.5135 99.844 88.7018 98.1253 87.3661C96.4067 86.0303 94.0756 85.2799 91.6451 85.2799H18.329V21.1762L76.9818 55.3648C78.5682 56.2895 80.4976 56.7894 82.4805 56.7894C84.4635 56.7894 86.3929 56.2895 87.9792 55.3648L146.632 21.1762V85.2799H128.303C125.872 85.2799 123.541 86.0303 121.823 87.3661C120.104 88.7018 119.139 90.5135 119.139 92.4025C119.139 94.2916 120.104 96.1032 121.823 97.439C123.541 98.7747 125.872 99.5252 128.303 99.5252H155.797C158.227 99.5252 160.558 98.7747 162.277 97.439C163.996 96.1032 164.961 94.2916 164.961 92.4025V6.93093C164.961 6.93093 164.961 6.43234 164.961 6.14744ZM82.4805 40.7634L36.658 14.0536H128.303L82.4805 40.7634Z" fill="var(--primary)"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7 col-12">
                        <div className="card crypto-chart ">
                            <div className="card-header pb-0 border-0 flex-wrap">
                                <div className="mb-2 mb-sm-0">
                                    <div className="chart-title mb-3">
                                        <h2 className="card-title">Payment Statistic</h2>	
                                    </div>
                                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                                        <div className="round weekly" id="dzOldSeries">
                                            <div>
                                                <input type="checkbox" id="checkbox1" 
                                                    value="Persent" onClick={()=>projectSeries('Persent')}
                                                    name="radio" 
                                                />
                                                <label htmlFor="checkbox1" className="checkmark"></label>
                                            </div>
                                            <div>
                                                <span className="fs-14">This Week</span>
                                                <h4 className="fs-5 font-w600 mb-0">1.982</h4>
                                            </div>
                                        </div>
                                        <div className="round " id="dzNewSeries">
                                            <div>
                                                <input type="checkbox" id="checkbox" name="radio" 
                                                    value="Visitors" onClick={()=>projectSeries('Visitors')}
                                                />
                                                <label htmlFor="checkbox" className="checkmark"></label>
                                            </div>
                                            <div>
                                                <span className="fs-14">This Week</span>
                                                <h4 className="fs-5 font-w600 mb-0">1.982</h4>
                                            </div>	
                                        </div>
                                    </div>
                                </div>
                                <div className="p-static">
                                    <div className="d-flex align-items-center mb-3 ">                                        
                                        <Dropdown className="d-inline-block">
                                            <Dropdown.Toggle variant="" as="div" className="btn-sm btn btn-outline-primary btn-rounded ">{country1}</Dropdown.Toggle>
                                            <Dropdown.Menu >
                                                <Dropdown.Item onClick={() => setCountry1("This Month")}>This Month</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setCountry1("This Weeks")}>This Weeks</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setCountry1("Today")}>Today</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <DropdownBlog />
                                    </div>
                                    <div className="progress-content">
                                        <div className="d-flex justify-content-between">
                                            <h6>Total</h6>
                                            <span className="pull-end">3.982</span>
                                        </div>
                                        <div className="progress mt-1">
                                            <div className="progress-bar bg-primary" style={{width: "70%", height:	"100%" }} role="progressbar">
                                                <span className="sr-only">60% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-2 custome-tooltip">                                
                                <ProjectAreaChart />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-12">
                        <div className="card">
                            <div className="card-header border-0">
                                <h2 className="card-title">Invoices</h2>
                                <DropdownBlog />
                            </div>
                            <div className="card-body text-center pt-0 pb-2">                                
                                <EmailPieChart />
                                <div className="chart-items">                                    
                                    <div className="row">                                            
                                        <div className=" col-xl-12 col-sm-12">
                                            <div className="text-start mt-2">
                                                <span className="font-w600 mb-3 d-block text-black fs-14">Legend</span>
                                                <div className="color-picker">
                                                    <span className="mb-0 col-6 fs-14">
                                                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="14" height="14" rx="4" fill="var(--primary)"/>
                                                        </svg>
                                                        Primary (27%)
                                                    </span>
                                                    <h5>763</h5>													
                                                </div>
                                                <div className="color-picker">
                                                    <span className="mb-0 col-6 fs-14">
                                                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="14" height="14" rx="4" fill="#9568ff"/>
                                                        </svg>
                                                        Promotion (11%)
                                                    </span>
                                                    <h5>321</h5>
                                                </div>
                                                <div className="color-picker">
                                                    <span className="mb-0 col-6 fs-14">
                                                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="14" height="14" rx="4" fill="#2bc844"/>
                                                        </svg>
                                                        Forum (22%)
                                                    </span>
                                                    <h5>154</h5>
                                                </div>
                                                <div className="color-picker">
                                                    <span className="mb-0 col-6 fs-14">
                                                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="14" height="14" rx="4" fill="#2a353a"/>
                                                        </svg>
                                                        Socials (15%)
                                                    </span>
                                                    <h5>154</h5>
                                                </div>	
                                            </div>
                                        </div>                                            
                                    </div>                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card statistic">
                            <div className="row">
                                <div className="col-xl-9">
                                    <div className="card-header border-0 flex-wrap pb-2">
                                        <div className="chart-title mb-2 ">
                                            <h2 className="card-title text-white">Statistic</h2>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0 custome-tooltip pe-0">
                                        <StatisticBarChart  />
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="statistic-content">
                                        <div className="d-flex justify-content-between">
                                            <Dropdown className="me-3 drop-select">
                                                <Dropdown.Toggle as="div" className="i-false btn btn-sm bg-white">This Month 
                                                    <i className="fa-solid fa-angle-down ms-2" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>This Month</Dropdown.Item>
                                                    <Dropdown.Item >This Weeks</Dropdown.Item>
                                                    <Dropdown.Item >Today</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Dropdown className="dropdown custom-dropdown">
                                                <Dropdown.Toggle className="i-false btn sharp primary-light" data-bs-toggle="dropdown">
                                                    <svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g>
                                                    </svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                    <Dropdown.Item>Option 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="statistic-toggle my-3">
                                            <div className="toggle-btn" >
                                                <div >
                                                    <input type="checkbox" id="checkbox3" name="toggle-btn" value="Income"  className="expense-value" onClick={()=>handleSeries('Income')}/>
                                                    <label htmlFor="checkbox3" className="check"></label>
                                                </div>
                                                <div>
                                                    <span className="fs-14  text-white">Income</span>
                                                    <h4 className="fs-15 font-w600 mb-0  text-white">1.982</h4>
                                                </div>	
                                            </div>
                                            <div className="toggle-btn expense"  >
                                                <div>
                                                    <input type="checkbox" id="checkbox2" name="toggle-btn" value="Expense"  className="income-value" onClick={()=>handleSeries('Expense')}/>
                                                    <label htmlFor="checkbox2" className="check"></label>
                                                </div>
                                                <div>
                                                    <span className="fs-14  text-white">Expense</span>
                                                    <h4 className="fs-15 font-w600 mb-0  text-white">1.982</h4>
                                                </div>
                                            </div>
                                        </div>
                                        {CharacterData.map((item, ind)=>(
                                            <div className="card expense mb-3" key={ind}>
                                                <div className="card-body p-3">	
                                                    <div className="students1 d-flex align-items-center justify-content-between ">
                                                        <div className="content">
                                                            <span>{item.title}</span>
                                                            <h2>$ 12,890,00</h2>
                                                            <h5 className={item.changeClass}>
                                                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M23.25 11.5C23.25 5.275 18.225 0.25 12 0.25C5.775 0.249999 0.75 5.275 0.75 11.5C0.749999 17.725 5.775 22.75 12 22.75C18.225 22.75 23.25 17.725 23.25 11.5ZM11.25 16.075L11.25 9.175L9.3 10.9C8.85 11.275 8.25 11.2 7.875 10.825C7.725 10.6 7.65 10.375 7.65 10.15C7.65 9.85 7.8 9.55 8.025 9.4L11.625 6.25C11.7 6.175 11.775 6.175 11.85 6.1C11.925 6.1 11.925 6.1 12 6.025C12.075 6.025 12.075 6.025 12.15 6.025L12.225 6.025C12.3 6.025 12.3 6.025 12.375 6.025L12.45 6.025C12.525 6.025 12.525 6.025 12.6 6.1C12.6 6.1 12.675 6.1 12.675 6.175L12.75 6.25C12.75 6.25 12.75 6.25 12.825 6.325L15.975 9.55C16.35 9.925 16.35 10.6 15.975 10.975C15.6 11.35 14.925 11.35 14.55 10.975L13.125 9.475L13.125 16.15C13.125 16.675 12.675 17.2 12.075 17.2C11.7 17.05 11.25 16.6 11.25 16.075Z" fill={item.svgColor}/>
                                                                </svg>
                                                                {" "}+15% 
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default Index4;