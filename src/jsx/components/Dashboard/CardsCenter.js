import React from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown } from "react-bootstrap";
import CardsList from '../Dompet/CardsCenter/CardsCenter';
import CardCenterOwl from '../Dompet/CardsCenter/CardCenterOwl';


const PolarChart = loadable(() =>
	pMinDelay(import("../Dompet/Home/PolarChart"), 1000)
);
const CardsCenter = () => {
	
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<CardCenterOwl />
				</div>
				<div className="col-xl-9">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header flex-wrap border-0 pb-0 align-items-end">
									<div className="mb-3 me-3">
										<h5 className="fs-20 text-black font-w500">Main Balance</h5>
										<span className="text-num text-black fs-36 font-w500">$673,412.66</span>
									</div>
									<div className="me-3 mb-3">
										<p className="fs-14 mb-1">VALID THRU</p>
										<span className="text-black fs-16">08/21</span>
									</div>
									<div className="me-3 mb-3">
										<p className="fs-14 mb-1">CARD HOLDER</p>
										<span className="text-black fs-16">WilliamFacyson</span>
									</div>
									<span className="fs-20 text-black font-w500 me-3 mb-3">**** **** **** 1234</span>
									<Dropdown className="mb-auto">
										<Dropdown.Toggle variant="" as="div" className="btn-link i-false" >	
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757"   ></path>
												<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757"   ></path>
												<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757"   ></path>
											</svg>
										</Dropdown.Toggle>	
										<Dropdown.Menu className="dropdown-menu-right" >
											<Dropdown.Item >Delete </Dropdown.Item>
											<Dropdown.Item >Edit </Dropdown.Item>		
										</Dropdown.Menu>			
									</Dropdown>
								</div>
								<div className="card-body">
									<div className="progress default-progress">
										<div className="progress-bar bg-gradient-5 progress-animated" style={{width: "50%", height:"20px"}} role="progressbar">
											<span className="sr-only">50% Complete</span>
										</div>
									</div>
								</div>
							</div>
						</div>	
						<div className="col-xl-12">
							<CardsList />
						</div>	
					</div>
				</div>
				<div className="col-xl-3">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<div>
										<h4 className="card-title mb-2">Card Statistic</h4>
										<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
									</div>
								</div>
								<div className="card-body">
									<div className="maxh250">
										<PolarChart />
									</div>
									<ul className="card-list mt-4">
										<li><span className="bg-blue circle"></span>Account<span>20%</span></li>
										<li><span className="bg-success circle"></span>Services<span>40%</span></li>
										<li><span className="bg-warning circle"></span>Restaurant<span>15%</span></li>
										<li><span className="bg-light circle"></span>Others<span>15%</span></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>		
		</>
	)
} 
export default CardsCenter;