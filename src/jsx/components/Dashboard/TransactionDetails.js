import React from 'react';
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import DropdownBlog from '../Dompet/DropdownBlog';
//Images
import profile1 from './../../../images/profile/1.png';
import pattern11 from './../../../images/pattern/pattern11.png';
import circle from './../../../images/pattern/circle.png';


const TransactionApexChart = loadable(() =>
	pMinDelay(import("../Dompet/TransactionDetail/TransactionApexChart"), 1000)
);
const TransactionDetails = () =>{
	return(
		<>
			<div className="row">	
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body pb-3">
							<div className="row align-items-center">
								<div className="col-xl-4 mb-3">
									<p className="mb-2">ID Payment</p>
									<h2 className="mb-0">#00123521</h2>
								</div>
								<div className="col-xl-8 d-flex flex-wrap justify-content-between align-items-center">
									<div className="d-flex me-3 mb-3 ms-2 align-items-start">
										<i className="fa fa-phone scale-2 me-4 mt-2"></i>
										<div>
											<p className="mb-2">Telephone</p>
											<h4 className="mb-0">+12 345 5662 66</h4>
										</div>
									</div>
									<div className="d-flex me-3 mb-3 ms-2 align-items-start">
										<i className="fa fa-envelope scale-2 me-4 mt-2"></i>
										<div>
											<p className="mb-2">Email</p>
											<h4 className="mb-0">samuelbro@mail.com</h4>
										</div>
									</div>
									<div className="d-flex mb-3">
										<Link to={"#"} className="btn btn-dark light me-3" ><i className="las la-print me-3 scale5"></i>Print</Link>
										<Link to={"#"} className="btn btn-primary"><i className="las la-download scale5 me-3"></i>Download Report</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="card-body pb-3 transaction-details d-flex flex-wrap justify-content-between align-items-center">
							<div className="user-bx-2 me-3 mb-3">
								<img src={profile1} className="rounded" alt="" />
								<div>
									<h3>Richard Michael</h3>
									<span>@richardmichael</span>
								</div>
							</div>
							<div className="me-3 mb-3">
								<p className="mb-2">Payment Method</p>
								<h4 className="mb-0">MasterCard 404</h4>
							</div>
							<div className="me-3 mb-3">
								<p className="mb-2">Invoice Date</p>
								<h4 className="mb-0">April 29, 2020</h4>
							</div>
							<div className="me-3 mb-3">
								<p className="mb-2">Due Date</p>
								<h4 className="mb-0">June 5, 2020</h4>
							</div>
							<div className="me-3 mb-3">
								<p className="mb-2">Date Paid</p>
								<h4 className="mb-0">June 4, 2020</h4>
							</div>
							<div className="amount-bx mb-3">
								<i className="fa fa-usd"></i>
								<div>
									<p className="mb-1">Amount</p>
									<h3 className="mb-0">$ 986.23</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-12">
					<div className="card">	
						<div className="card-body">
							<div className="d-xl-flex d-block align-items-start description-bx">
								<div>
									<h4 className="card-title">Description</h4>
									<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
									<p className="description mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
								</div>
								<div className="card-bx bg-dark-blue ms-xl-5 ms-0">
									<img className="pattern-img" src={pattern11} alt="" />
									<div className="card-info text-white">
										<img src={circle} className="mb-4" alt="" />
										<h2 className="text-white card-balance">$24,567</h2>
										<p className="fs-16">Wallet Balance</p>
										<span>+0,8% than last week</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-9">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<div>
								<h4 className="card-title mb-2">Chart Activity</h4>
								<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
							</div>
							<DropdownBlog />
						</div>
						<div className="card-body py-0 px-2">
							<div id="activityChart">
								<TransactionApexChart />
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<div>
								<h4 className="card-title mb-2">Specifics</h4>
								<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
							</div>
						</div>
						<div className="card-body pt-3">
							<p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem</p>
							<ul className="specifics-list">
								<li>
									<span className="bg-blue"></span>
									<div>
										<h4>63,876</h4>
										<span>Property Sold</span>
									</div>
								</li>
								<li>
									<span className="bg-orange"></span>
									<div>
										<h4>97,125</h4>
										<span>Income</span>
									</div>
								</li>
								<li>
									<span className="bg-primary"></span>
									<div>
										<h4>872,235</h4>
										<span>Expense</span>
									</div>
								</li>
								<li>
									<span className="bg-danger"></span>
									<div>
										<h4>21,224</h4>
										<span>Property Ranted</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>	
		</>
	)
}
export default TransactionDetails; 