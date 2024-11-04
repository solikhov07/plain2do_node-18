import React,{useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import DropdownBlog from '../Dompet/DropdownBlog';

//Images
import avatar1 from './../../../images/avatar/1.jpg';
import avatar2 from './../../../images/avatar/2.jpg';
import avatar3 from './../../../images/avatar/3.jpg';
import avatar4 from './../../../images/avatar/4.jpg';
import avatar5 from './../../../images/avatar/5.jpg';
import avatar6 from './../../../images/avatar/6.jpg';
import avatar7 from './../../../images/avatar/7.jpg';
import avatar8 from './../../../images/avatar/8.jpg';


const Invoices = () => {
	const [data, setData] = useState(
		document.querySelectorAll('#invoices-data tbody tr')
	)
	const sort = 8
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
		setData(document.querySelectorAll('#invoices-data tbody tr'))
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
	return(
		<>
			<div className="d-flex mb-3">
				<div className="mb-3 align-items-center me-auto">
					<h4 className="card-title">Payment History</h4>
					<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
				</div>
				<Link to={"#"} className="btn btn-outline-primary mb-3"><i className="fa fa-calendar me-3 scale3"></i>Filter Date</Link>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="table-responsive fs-14 dataTables_wrapper" id="invoices-data">
						<table className="table card-table display mb-4 dataTablesCard dataTable no-footer " id="example5">
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
									<th className="sorting_asc">Email</th>
									<th className="sorting_asc">Service Type</th>
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
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar1} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">XYZ Store ID</h6>
												<span className="fs-14">Online Shop</span>
											</div>
										</div>
									</td>
									<td><span className="text-black">xyzstore@mail.com</span></td>
									<td><span className="text-black">Server Maintenance </span></td>
									<td><Link to={"#"} className="btn btn-success light">Completed</Link></td>										
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='even'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check2' required/>
												<label className='form-check -label' htmlFor='check2'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar2} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">David Oconner</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">davidocon@mail.com</span></td>
									<td><span className="text-black">Clean Up </span></td>
									<td><Link to={"#"} className="btn btn-danger light">Pending</Link></td>									
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='even'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check3' required/>
												<label className='form-check -label' htmlFor='check3'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar3} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">Julia Esteh</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">juliaesteh@mail.com</span></td>
									<td><span className="text-black">Upgrade Component </span></td>
									<td><Link to={"#"} className="btn btn-dark light">Canceled</Link></td>
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='odd'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check4' required/>
												<label className='form-check -label' htmlFor='check4'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar4} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">Power Supp Store</Link></h6>
												<span className="fs-14">Online Shop</span>
											</div>
										</div>
									</td>
									<td><span className="text-black">xyzstore@mail.com</span></td>
									<td><span className="text-black">Server Maintenance </span></td>
									<td><Link to={"#"} className="btn btn-success light">Completed</Link></td>
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='even'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check5' required/>
												<label className='form-check -label' htmlFor='check5'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar5} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">James Known</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">davidocon@mail.com</span></td>
									<td><span className="text-black">Clean Up</span></td>
									<td><Link to={"#"} className="btn btn-danger light">Pending</Link></td>
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='odd'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check6' required/>
												<label className='form-check -label' htmlFor='check6'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar6} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">Rock Lee</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">juliaesteh@mail.com</span></td>
									<td><span className="text-black">Upgrade Component </span></td>
									<td><Link to={"#"} className="btn btn-dark light">Canceled</Link></td>
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='even'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check7' required/>
												<label className='form-check -label' htmlFor='check7'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar7} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">Geovanny Jr.</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">davidocon@mail.com</span></td>
									<td><span className="text-black">Clean Up</span></td>
									<td><Link to={"#"} className="btn btn-danger light">Pending</Link></td>
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='odd'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check8' required/>
												<label className='form-check -label' htmlFor='check8'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar8} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">Bella Ingrid</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">juliaesteh@mail.com</span></td>
									<td><span className="text-black">Upgrade Component</span></td>
									<td><Link to={"#"} className="btn btn-success light">Completed</Link></td>	
									<td><DropdownBlog /></td>
								</tr>
								<tr role='row' className='even'>
									<td className='application_sorting_1'>
										<div className='checkbox me-0 align-self-center'>
											<div className='form-check  custom-checkbox '>
												<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check9' required/>
												<label className='form-check -label' htmlFor='check9'/>
											</div>
										</div>
									</td>
									<td><span className="text-black font-w500">#123412451</span></td>
									<td><span className="text-black text-nowrap">#June 1, 2020, 08:22 AM</span></td>
									<td>
										<div className="d-flex align-items-center">
											<img src={avatar5} alt="" className="rounded-circle me-3" width="50" />
											<div>
												<h6 className="fs-16 font-w600 mb-0 text-nowrap"><Link to={"#"} className="text-black">Rock Lee</Link></h6>
											</div>
										</div>
									</td>
									<td><span className="text-black">juliaesteh@mail.com</span></td>
									<td><span className="text-black">Upgrade Component </span></td>
									<td><Link to={"#"} className="btn btn-dark light">Canceled</Link></td>
									<td><DropdownBlog /></td>
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
								<Link to='/invoices' className='paginate_button previous disabled' onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}>
									<i className="fa fa-angle-double-left" aria-hidden="true"></i>
								</Link>
								<span>
									{paggination.map((number, i) => (
										<Link key={i} to='/invoices' className={`paginate_button  ${ activePag.current === i ? 'current' : '' } `} onClick={() => onClick(i)}>
											{number}
										</Link>
									))}
								</span>
								<Link to='/invoices' className='paginate_button next' onClick={() => activePag.current + 1 < paggination.length && onClick(activePag.current + 1)}>
									<i className="fa fa-angle-double-right" aria-hidden="true"></i>
								</Link>
							</div>
						</div>
					</div>	
				</div>
			</div>	
		</>
	)
} 
export default Invoices;