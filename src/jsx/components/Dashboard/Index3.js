import React,{useContext, useEffect} from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ThemeContext } from "../../../context/ThemeContext";
import CardAreaCharts from '../Dompet/Dashboard3/CardAreaCharts';
import SpendingsBlog from '../Dompet/Home/SpendingsBlog';
import QuickTransferBlog from '../Dompet/Home/QuickTransferBlog';
import PreviousTab from '../Dompet/Home/PreviousTab';
import TransactionChartHome3 from '../Dompet/Dashboard3/TransactionChartHome3';
import DonutChart from '../Dompet/Dashboard3/DonutChart';

const CardBlog = [
    {number:'2,478', title:'Total Loan', bgcard:'bg-card-loan', cardcolor:'#717579', chartcolor1 :'var(--secondary)', chartcolor2 :'rgba(113, 117, 121, 0.14)', },
    {number:'983', title:'Paid EMI',bgcard:'bg-card-loan-1', cardcolor:'var(--primary)', chartcolor1 :'var(--primary)', chartcolor2 :'rgba(22, 192, 70, 0.14)', },
    {number:'1,256', title:'Unpaid EMI',bgcard:'bg-card-loan-2', cardcolor:'#09BD3C', chartcolor1 :'#FD5353', chartcolor2 :'rgba(253, 83, 83, 0.14)', },
    {number:'652', title:'Total Payment',bgcard:'bg-card-loan-3', cardcolor:'#44814E', chartcolor1 :"#FFAA2B", chartcolor2 :'rgba(255, 170, 43, 0.14)', },
];

const Index3 = () => {
    const { changeBackground, 
        changeSideBarStyle , changePrimaryColor,
        chnageSidebarColor, 
    } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
        if (window.innerWidth >= 768) {
		    changeSideBarStyle({ value: "compact", label: "Compact" });
        }
		changePrimaryColor("color_10");
		chnageSidebarColor("color_10");
	}, []);	
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="row invoice-card-row">
                    {CardBlog.map((item, ind)=>(
                        <div className="col-xl-3 col-xxl-6 col-sm-6" key={ind}>
                            <div className="card overflow-hidden invoice-card position-unset">
                                <div className="card-header border-0">
                                    <div className="d-flex">
                                        <span className={`icon me-3 ${item.bgcard}`}>                                           
                                            <svg width="40" height="40" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill={item.cardcolor}/>
                                                <circle cx="40.5" cy="11.5" r="8.5" fill={item.cardcolor} stroke="white" strokeWidth="3"/>
                                            </svg>
                                        </span>
                                        <div className="invoices">
                                            <h4 className="invoice-num">{item.number}</h4>
                                            <span className="fs-18">{item.title}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">                                                                    
                                    <CardAreaCharts color1 = {item.chartcolor1} color2={item.chartcolor2} />                                
                                </div>                            
                            </div>
                        </div>
                    ))}                    
                </div>
            </div>
            <div className="col-xl-6">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header d-sm-flex d-block border-0 pb-0">
                                <div className="pe-3 me-auto mb-sm-0 mb-3">
                                    <h4 className=" card-title mb-1">Transaction Overview</h4>
                                    <span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <Link to={"#"} className="btn btn-outline-primary me-3"><i className="las la-download text-primary scale5 me-3"></i>Download Report</Link>
                                    <Dropdown className="dropdown c-pointer">
                                        <Dropdown.Toggle as="div" className="i-false btn-link">
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right" align="end">
                                            <Dropdown.Item >Delete</Dropdown.Item>
                                            <Dropdown.Item >Edit</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="card-body">                                
                                <TransactionChartHome3 />
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div className="d-flex">
                                        <label className="form-check-label mt-0 font-w600 fs-16" htmlFor="flexSwitchCheckChecked1">Number</label>
                                        <div className="form-check form-switch toggle-switch">
                                            <input className="form-check-input custome" type="checkbox" id="flexSwitchCheckChecked1" defaultChecked />
                                        </div>
                                        <label className="form-check-label mt-0 font-w600 fs-16" htmlFor="flexSwitchCheckChecked2">Analytics</label>	
                                        <div className="form-check  form-switch toggle-switch">
                                            <input className="form-check-input custome" type="checkbox" id="flexSwitchCheckChecked2" defaultChecked />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="fs-16 font-w600">
                                            <svg className="me-2" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.639771" width="18.9471" height="19" rx="9.47357" fill="var(--primary)"/>
                                            </svg>
                                            Income	
                                        </span>
                                        <span className="fs-16 font-w600">
                                            <svg className="mx-2" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.344925" width="18.9471" height="19" rx="9.47357" fill="#FD5353"/>
                                            </svg>
                                            Expense	
                                        </span>
                                    </div>
                                </div>	
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-5 col-xxl-12 col-md-5">
                                        <h4 className="card-title mb-4">Spendings</h4>
                                        <div className="row">
                                            <div className="d-flex col-xl-12 col-xxl-6  col-md-12 col-6 mb-4">
                                                <svg className="me-3" width="14" height="54" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="-6.10352e-05" width="14" height="54" rx="7" fill=" #461EE7"/>
                                                </svg>
                                                <div>
                                                    <p className="fs-14 mb-2">Cash</p>
                                                    <span className="fs-16 font-w600 text-light"><span className="text-black me-2 font-w700">$1,567</span>/$5,000</span>
                                                </div>
                                            </div>
                                            <div className="d-flex col-xl-12 col-xxl-6 col-md-12 col-6 mb-4">
                                                <svg className="me-3" width="14" height="54" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="-6.10352e-05" width="14" height="54" rx="7" fill="#1EB6E7"/>
                                                </svg>
                                                <div>
                                                    <p className="fs-14 mb-2">Checks</p>
                                                    <span className="fs-16 font-w600 text-light"><span className="text-black me-2 font-w700">$1,567</span>/$5,000</span>
                                                </div>
                                            </div>
                                            <div className="d-flex col-xl-12 col-xxl-6 col-md-12 col-6 mb-4">
                                                <svg className="me-3" width="14" height="54" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="-6.10352e-05" width="14" height="54" rx="7" fill="#40D4A8"/>
                                                </svg>
                                                <div>
                                                    <p className="fs-14 mb-2">Debit Cards</p>
                                                    <span className="fs-16 font-w600 text-light"><span className="text-black me-2 font-w700">$1,567</span>/$5,000</span>
                                                </div>
                                            </div>
                                            <div className="d-flex col-xl-12 col-xxl-6 col-md-12 col-6 mb-4">
                                                <svg className="me-3" width="14" height="54" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="-6.10352e-05" width="14" height="54" rx="7" fill="#AC39D4"/>
                                                </svg>
                                                <div>
                                                    <p className="fs-14 mb-2">Credit Cards</p>
                                                    <span className="fs-16 font-w600 text-light"><span className="text-black me-2 font-w700">$1,567</span>/$5,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7  col-xxl-12 col-md-7">
                                        <div className="row">
                                            <div className="col-sm-6 mb-4">
                                                <div className="bg-gradient4 rounded text-center p-3">
                                                    <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                                        <DonutChart value="71" backgroundColor="rgba(255, 255, 255,1)"
                                                            backgroundColor2= "rgba(255, 255, 255, 0.2)"
                                                        />
                                                        <small className="text-white">71%</small>
                                                    </div>
                                                    <span className="fs-14 text-white d-block">Cash</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="bg-gradient3 rounded text-center p-3">
                                                    <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                                        <DonutChart value="30" backgroundColor="rgba(255, 255, 255,1)"
                                                            backgroundColor2= "rgba(255, 255, 255, 0.2)"
                                                        />
                                                        <small className="text-white">30%</small>
                                                    </div>
                                                    <span className="fs-14 text-white d-block">Checks</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-sm-0 mb-4">
                                                <div className="rounded text-center p-3 bg-gradient2">
                                                    <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                                        <DonutChart value="15" backgroundColor="rgba(255, 255, 255,1)"
                                                            backgroundColor2= "rgba(255, 255, 255, 0.2)"
                                                        />
                                                        <small className="text-white">15%</small>
                                                    </div>
                                                    <span className="fs-14 text-white d-block">Debit cards</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-sm-0 mb-4">
                                                <div className="rounded text-center p-3 bg-gradient1">
                                                    <div className="d-inline-block position-relative donut-chart-sale mb-3">
                                                        <DonutChart value="90" backgroundColor="rgba(255, 255, 255,1)"
                                                            backgroundColor2= "rgba(255, 255, 255, 0.2)"
                                                        />
                                                        <small className="text-white">96%</small>
                                                    </div>
                                                    <span className="fs-14 text-white d-block">Credit Cards</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>  
            <div className="col-xl-6">
                <div className="row">
                    <div className="col-xl-12">
                        <div className='row'>
                            <div className="col-xl-6 col-xxl-12 col-sm-6">                            
                                <SpendingsBlog />
                            </div>
                            <div className="col-xl-6 col-xxl-12 col-sm-6">
                                <QuickTransferBlog />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <PreviousTab  /> 
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Index3;