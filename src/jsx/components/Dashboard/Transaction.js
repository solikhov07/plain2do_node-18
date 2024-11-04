import React,{useEffect, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import {Tab, Nav} from 'react-bootstrap';
import { IconGreen,IconRed, DropdownBox} 
	from '../Dompet/Transaction/TransactionData';
import TabComplete from  '../Dompet/Transaction/TabComplete';
import TabPending from  '../Dompet/Transaction/TabPending';
import TabCancel from  '../Dompet/Transaction/TabCancel';
//Images 
import avat11 from './../../../images/avatar/1.jpg';
import avat17 from './../../../images/avatar/2.jpg';
import avat20 from './../../../images/avatar/3.jpg';
import avat22 from './../../../images/avatar/4.jpg';
import avat23 from './../../../images/avatar/5.jpg';
import avat25 from './../../../images/avatar/6.jpg';
import avat27 from './../../../images/avatar/7.jpg';
import avat28 from './../../../images/avatar/8.jpg';
import avat29 from './../../../images/avatar/1.jpg';

const Transaction = () => {
	//Tab function
	// const [activeTab, setActiveTab] = useState('1');
    // const toggle = tab => {
    //     if (activeTab !== tab) setActiveTab(tab);
    // }
	//
	const [data, setData] = useState(
		document.querySelectorAll('#transactions-data tbody tr')
	)
	const sort = 9
	const activePag = useRef(0)
	const [test, settest] = useState(0)

	  // Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove('d-none')
			} else {
				data[i].classList.add('d-none')
			}
		}
	}
	// use effect
	useEffect(() => {
		setData(document.querySelectorAll('#transactions-data tbody tr'))
		//chackboxFun()
	}, [test])
	// Active pagginarion
		activePag.current === 0 && chageData(0, sort)
	// paggination
		let paggination = Array(Math.ceil(data.length / sort))
			.fill()
			.map((_, i) => i + 1)
	 // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i
		chageData(activePag.current * sort, (activePag.current + 1) * sort)
		settest(i)
	}
	const chackbox = document.querySelectorAll('.application_sorting_1 input')
	const motherChackBox = document.querySelector('.sorting_asc input')
	const chackboxFun = (type) => {
		for (let i = 0; i < chackbox.length; i++) {
		const element = chackbox[i]
			if (type === 'all') {
				if (motherChackBox.checked) {
					element.checked = true
				} else {
					element.checked = false
				}
			} else {
				if (!element.checked) {
					motherChackBox.checked = false
					break
				} else {
					motherChackBox.checked = true
				}
			}
		}
	}
	return (
		<>
			<Tab.Container defaultActiveKey={'All'}>
				<div className="d-flex flex-wrap align-items-center mb-3">
					<div className="mb-3 me-auto">
						<div className="card-tabs style-1 mt-3 mt-sm-0">
							<Nav as="ul" className="nav nav-tabs" role="tablist">							
								<Nav.Item as="li">
									<Nav.Link eventKey="All">All transaction</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link eventKey="Completed">Completed</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link eventKey="Pending">Pending</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link eventKey="Canceled">Canceled</Nav.Link>
								</Nav.Item>
							</Nav>
						</div>
					</div>
					<Link to={"#"} className="btn btn-outline-primary mb-3"><i className="fa fa-calendar me-3 scale3"></i>Filter Date</Link>
				</div>
				<div className="row">
					<div className="col-xl-12">					
						<Tab.Content>
							<Tab.Pane eventKey="All">
								<div className="table-responsive  fs-14  dataTables_wrapper" id="transactions-data">
									<table	className='table card-table display mb-4 dataTablesCard  dataTable text-black no-footer' id='example5'>
										<thead>
											<tr role='row'>
												<th className="sorting_asc">
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' className='form-check-input' id='checkAll' required onClick={() => chackboxFun('all')}/>
															<label className='form-check-label' htmlFor='checkAll'/>
														</div>
													</div>
												</th>
												<th className="sorting_asc">ID Invoice</th>
												<th className="sorting_asc">Date</th>
												<th className="sorting_asc">Recipient</th>
												<th className="sorting_asc">Amount</th>
												<th className="sorting_asc">Type</th>
												<th className="sorting_asc">Location</th>
												<th className="sorting_asc">Status</th>
												<th className="sorting_asc">Action</th>
											</tr>
										</thead>
										<tbody>
											<tr role='row' className='odd'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check1' required/>
															<label className='form-check-label' htmlFor='check1'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412451</span></td>
												<td><span className="text-black text-nowrap">#June 2, 2020, 08:24 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat11} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">David Oconner</Link></h6>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$128.89</span></td>
												<td>
													<div className="text-black">
														<span className="me-2 oi-icon bgl-success"><IconGreen /></span>Outcome
													</div>
												</td>
												<td><span className="text-black">Medan, <br/>Sumut Indonesia</span></td>
												<td><Link to={"#"} className="btn btn-dark btn-rounded light">Pending</Link></td>									
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='even'	>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check2' required/>
															<label className='form-check-label' htmlFor='check2'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412452</span></td>
												<td><span className="text-black text-nowrap">#June 3, 2020, 08:31 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat17} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Julia Esteh</Link></h6>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$128.89</span></td>
												<td>
													<div className="text-black">
														<span className="me-2 oi-icon bgl-success"><IconGreen /></span>Outcome
													</div>
												</td>
												<td><span className="text-black">Bangladesh,<br/>India</span></td>
												<td><Link to={"#"} className="btn btn-danger btn-rounded light">Canceled</Link></td>								
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='odd'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check3' required/>
															<label className='form-check-label' htmlFor='check3'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412453</span></td>
												<td><span className="text-black text-nowrap">#June 4, 2020, 08:45 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat25} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Clown Studio</Link></h6>
															<span className="fs-14">Freelancer</span>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$560.67</span></td>
												<td>
													<div className="text-black">
														<span className="me-2 oi-icon bgl-danger"><IconRed /></span>
														Outcome
													</div>
												</td>
												<td><span className="text-black">London, <br/>England</span></td>
												<td><Link to={"#"} className="btn btn-success btn-rounded light">Completed</Link></td>							
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='even'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check4' required/>
															<label className='form-check-label' htmlFor='check4'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412454</span></td>
												<td><span className="text-black text-nowrap">#June 5, 2020, 09:12 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat27} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Clown Studio</Link></h6>
															<span className="fs-14">Freelancer</span>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$560.67</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-success"><IconGreen /></span>Outcome</div>
												</td>
												<td><span className="text-black">Medan, <br/>Sumut Indonesia</span></td>
												<td><Link to={"#"} className="btn btn-dark btn-rounded light">Pending</Link></td>						
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='odd'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check5' required/>
															<label className='form-check-label' htmlFor='check5'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412455</span></td>
												<td><span className="text-black text-nowrap">#June 7, 2020, 09:25 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat23} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Samuel Bro</Link></h6>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$128.89</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-success"><IconGreen /></span>Outcome</div>
												</td>
												<td><span className="text-black">Bangladesh, <br/>India</span></td>
												<td><Link to={"#"} className="btn btn-danger btn-rounded light">Canceled</Link></td>					
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='even'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check6' required/>
															<label className='form-check-label' htmlFor='check6'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412456</span></td>
												<td><span className="text-black text-nowrap">#June 8, 2020, 09:45 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat28} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Yellow Caw</Link></h6>
															<span className="fs-14">Studio</span>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$560.67</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-success"><IconGreen /></span>Outcome</div>
												</td>
												<td><span className="text-black">London,<br/>England</span></td>
												<td><Link to={"#"} className="btn btn-success btn-rounded light">Completed</Link></td>				
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='odd'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check7' required/>
															<label className='form-check-label' htmlFor='check7'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412457</span></td>
												<td><span className="text-black text-nowrap">#June 9, 2020, 08:22 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat29} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Cindy Seea</Link></h6>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$128.89</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-danger"><IconRed /></span>Outcome</div>
												</td>
												<td><span className="text-black">Bangladesh, <br/>India</span></td>
												<td><Link to={"#"} className="btn btn-danger btn-rounded light">Canceled</Link></td>			
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='even'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check8' required/>
															<label className='form-check-label' htmlFor='check8'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412458</span></td>
												<td><span className="text-black text-nowrap">#June 5, 2020, 07:35 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat22} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Nurkomariah</Link></h6>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$783.22</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-success"><IconGreen /></span>Income</div>
												</td>
												<td><span className="text-black">Bangladesh, <br/>India</span></td>
												<td><Link to={"#"} className="btn btn-danger btn-rounded light">Canceled</Link></td>			
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='odd'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check9' required/>
															<label className='form-check-label' htmlFor='check9'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412459</span></td>
												<td><span className="text-black text-nowrap">#June 6, 2020, 09:45 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat25} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">XYZ Store ID</Link></h6>
															<span className="fs-14">Online Shop</span>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$560.67</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-danger"><IconRed /></span>Outcome</div>
												</td>
												<td><span className="text-black">London, <br/>England</span></td>
												<td><Link to={"#"} className="btn btn-success btn-rounded light">Completed</Link></td>		
												<td><DropdownBox /></td>
											</tr>
											<tr role='row' className='even'>
												<td className='application_sorting_1'>
													<div className='checkbox me-0 align-self-center'>
														<div className='form-check custom-checkbox '>
															<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check10' required/>
															<label className='form-check-label' htmlFor='check10'/>
														</div>
													</div>
												</td>
												<td><span className="text-black font-w500">#123412460</span></td>
												<td><span className="text-black text-nowrap">#June 8, 2020, 07:54 AM</span></td>
												<td>
													<div className="d-flex align-items-center">
														<img src={avat20} alt="" className="rounded-circle me-3" width="50" />
														<div>
															<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"./transactions-details"} className="text-black">Romeo Wayudi</Link></h6>
														</div>
													</div>
												</td>
												<td><span className="text-black fs-20 font-w600">$783.22</span></td>
												<td>
													<div className="text-black"><span className="me-2 oi-icon bgl-success"><IconGreen /></span>Income</div>
												</td>
												<td><span className="text-black">Medan, <br/>Sumut Indonesia</span></td>
												<td><Link to={"#"} className="btn btn-dark btn-rounded light">Pending</Link></td>		
												<td><DropdownBox /></td>
											</tr>
										</tbody>
									</table>	
									<div className='d-sm-flex text-center justify-content-between align-items-center'>
										<div className='dataTables_info' id='example5_info'>
												Showing {activePag.current * sort + 1} to{' '}
												{data.length > (activePag.current + 1) * sort
												? (activePag.current + 1) * sort
												: data.length}{' '}
												of {data.length} entries
										</div>

										<div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
											<Link to='/transaction-history' className='paginate_button previous disabled' onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}>
												<i className="fa fa-angle-double-left" aria-hidden="true"></i>
											</Link>
											<span>
												{paggination.map((number, i) => (
													<Link key={i} to='/transaction-history' className={`paginate_button  ${ activePag.current === i ? 'current' : '' } `} onClick={() => onClick(i)}>
														{number}
													</Link>
												))}
											</span>
											<Link to='/transaction-history' className='paginate_button next' onClick={() => activePag.current + 1 < paggination.length && onClick(activePag.current + 1)}>
												<i className="fa fa-angle-double-right" aria-hidden="true"></i>
											</Link>
										</div>
									</div>	
								</div>
							</Tab.Pane>
							<Tab.Pane eventKey="Completed">
								<TabComplete />
							</Tab.Pane>
							<Tab.Pane eventKey="Pending">	
								<TabPending />
							</Tab.Pane>
							<Tab.Pane eventKey="Canceled">	
								<TabCancel />
							</Tab.Pane>
						</Tab.Content>
						
					</div>
				</div>	
			</Tab.Container>

		</>	
	);
};

export default Transaction;