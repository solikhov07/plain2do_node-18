import React from 'react';
import {Link} from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
// import { TabContent, TabPane, } from 'reactstrap';
// import classnames from 'classnames';

import {TransactionsData, TransactionsData2, TransactionsData3} from './TabContent';

const PreviousTab = () =>{
	// const [activeTab, setActiveTab] = useState('1');
    // const toggle = tab => {
    //     if (activeTab !== tab) setActiveTab(tab);
    // }
	return(
		<>
			
			<div className="card">
				<Tab.Container defaultActiveKey={'Month'}>
					<div className="card-header d-block d-sm-flex border-0">
						<div className="me-3">
							<h4 className="card-title mb-2">Previous Transactions</h4>
							<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
						</div>
						<div className="card-tabs mt-3 mt-sm-0">
							<Nav as="ul" className="nav nav-tabs" role="tablist">
								<Nav.Item as="li">
									<Nav.Link 											
										eventKey={'Month'}
									>
										Monthly
									</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link 
										eventKey={'Week'}
									>
										Weekly
									</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link 
										eventKey={'Today'}
									>
										Today
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</div>
					</div>
					<div className="card-body tab-content p-0">
						<div className="tab-pane active show fade" id="monthly" role="tabpanel">
							<Tab.Content >
								<Tab.Pane eventKey={'Month'}>
									<div className="table-responsive">
										<table className="table table-responsive-md card-table transactions-table">
											<tbody>
												{TransactionsData.map((item, index)=>(
													<tr key={index}>
														<td>
															{item.icons}
														</td>
														<td>
															<h6 className="fs-16 font-w600 mb-0"><Link to={"#"} className="text-black">{item.title}</Link></h6>
															<span className="fs-14">{item.subtitle}</span>
														</td>
														<td>
															<h6 className="fs-16 text-black font-w600 mb-0">{item.date}</h6>
															<span className="fs-14">05:34:45 AM</span>
														</td>
														<td><span className="fs-16 text-black font-w600">{item.price}</span></td>
														<td>{item.status}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</Tab.Pane>	
								<Tab.Pane eventKey={'Week'}>	
									<div className="table-responsive">
										<table className="table table-responsive-md card-table transactions-table">
											<tbody>
												{TransactionsData2.map((item, index)=>(
													<tr key={index}>
														<td>
															{item.icons}
														</td>
														<td>
															<h6 className="fs-16 font-w600 mb-0"><Link to={"#"} className="text-black">{item.title}</Link></h6>
															<span className="fs-14">{item.subtitle}</span>
														</td>
														<td>
															<h6 className="fs-16 text-black font-w600 mb-0">{item.date}</h6>
															<span className="fs-14">05:34:45 AM</span>
														</td>
														<td><span className="fs-16 text-black font-w600">{item.price}</span></td>
														<td>{item.status}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</Tab.Pane>	
								<Tab.Pane eventKey={'Today'}>	
									<div className="table-responsive">
										<table className="table table-responsive-md card-table transactions-table">
											<tbody>
												{TransactionsData3.map((item, index)=>(
													<tr key={index}>
														<td>
															{item.icons}
														</td>
														<td>
															<h6 className="fs-16 font-w600 mb-0"><Link to={"#"}  className="text-black">{item.title}</Link></h6>
															<span className="fs-14">{item.subtitle}</span>
														</td>
														<td>
															<h6 className="fs-16 text-black font-w600 mb-0">{item.date}</h6>
															<span className="fs-14">05:34:45 AM</span>
														</td>
														<td><span className="fs-16 text-black font-w600">{item.price}</span></td>
														<td>{item.status}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</Tab.Pane>	
							</Tab.Content>		
						</div>
					</div>
				</Tab.Container>
			</div>
			
		</>
	)
} 
export default PreviousTab;