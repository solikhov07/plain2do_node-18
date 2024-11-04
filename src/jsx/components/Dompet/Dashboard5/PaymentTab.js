import React from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const WeeklyPieChart = loadable(() =>
	pMinDelay(import("../../Dompet/MyWallet/WeeklyPieChart"), 1000)
);

const PaymentTab = () => {
    return (
        <>
            <div className="d-flex flex-wrap order-manage p-3 align-items-center mb-4">
                <Link to={"#"} className="btn fs-22 text-white py-1 btn-primary px-4 me-3">25</Link>
                <h4 className="mb-0">New Payments <i className="fa fa-circle text-primary ms-1 fs-15"></i></h4>
                <Link to={"#"} className="ms-sm-auto mt-sm-0 mt-2 text-primary font-w500">Manage payment <i className="ti-angle-right ms-1"></i></Link>
            </div>
            <div className="row">
                <div className="col-sm-4 mb-4">
                    <div className="border px-3 py-3 rounded-xl">
                        <h2 className="fs-32 font-w600 counter">25</h2>
                        <p className="fs-16 mb-0">On process</p>
                    </div>
                </div>
                <div className="col-sm-4 mb-4">
                    <div className="border px-3 py-3 rounded-xl">
                        <h2 className="fs-32 font-w600 counter">60</h2>
                        <p className="fs-16 mb-0">Completed</p>
                    </div>
                </div>
                <div className="col-sm-4 mb-4">
                    <div className="border px-3 py-3 rounded-xl">
                        <h2 className="fs-32 font-w600 counter">7</h2>
                        <p className="fs-16 mb-0">Canceled</p>
                    </div>
                </div>
            </div>
            <div className="widget-timeline-icon p-0">
                <div className="row align-items-center">
                    <div className="col-xl-3 col-lg-2 col-xxl-4 col-sm-3 col-md-3 my-2 text-center text-sm-left" style={{height:"150px"}}>                                            
                        <WeeklyPieChart />
                    </div>	
                    <div className="col-xl-9 col-lg-10 col-xxl-8 col-sm-9 col-md-9">
                        <div className="d-flex align-items-center mb-3">
                            <p className="mb-0 fs-14 me-2 col-4 col-xxl-5 px-0">Credit Card (24%)</p>
                            <div className="progress mb-0" style={{height:"18px", width:"100%"}}>
                                <div className="progress-bar  bg-light progress-animated" style={{width:"25%", height:"18px"}}>
                                    <span className="sr-only">25% Complete</span>
                                </div>
                            </div>	
                            <span className=" ms-auto col-1 col-xxl-2 px-0 text-end">25</span>
                        </div>
                        <div className="d-flex align-items-center  mb-3">
                            <p className="mb-0 fs-14 me-2 col-4 col-xxl-5 px-0">UPI ID (41%)</p>
                            <div className="progress mb-0" style={{height:"18px", width:"100%"}}>
                                <div className="progress-bar  bg-success progress-animated" style={{width:"60%", height:"18px"}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                            </div>	
                            <span className="ms-auto col-1 col-xxl-2 px-0 text-end">60</span>
                        </div>
                        <div className="d-flex align-items-center  mb-3">
                            <p className="mb-0 fs-14 me-2 col-4 col-xxl-5 px-0">Cash (41%)</p>
                            <div className="progress mb-0" style={{height:"18px", width:"100%"}}>
                                <div className="progress-bar  bg-danger progress-animated" style={{width:"10%", height:"18px"}}>
                                    <span className="sr-only">10% Complete</span>
                                </div>
                            </div>	
                            <span className="ms-auto col-1 col-xxl-2 px-0 text-end">10</span>
                        </div>
                    </div>	
                </div>	
            </div>
        </>
    );
};

export default PaymentTab;