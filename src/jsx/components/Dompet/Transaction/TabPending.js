import React,{useEffect, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { IconGreen, DropdownBox} 
	from './TransactionData';
//Images	
import avat11 from './../../../../images/avatar/1.jpg';
import avat20 from './../../../../images/avatar/3.jpg';
import avat27 from './../../../../images/avatar/7.jpg';
	
const TabPending = () => {
	const [data, setData] = useState(
		document.querySelectorAll('#pending-data tbody tr')
	)
	const sort = 3
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
		setData(document.querySelectorAll('#pending-data tbody tr'))
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
	const chackbox = document.querySelectorAll('.pending_sorting_1 input')
	const motherChackBox = document.querySelector('.sorting_pending input')
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
			<div className="table-responsive  fs-14  dataTables_wrapper" id="pending-data">
				<table	className='table card-table display mb-4 dataTablesCard  dataTable text-black no-footer' id='example5'>
					<thead>
						<tr role='row'>
							<th className="sorting_pending">
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check custom-checkbox '>
										<input type='checkbox' className='form-check-input' id='checkAll' required onClick={() => chackboxFun('all')}/>
										<label className='form-check-label' htmlFor='checkAll'/>
									</div>
								</div>
							</th>
							<th className="sorting_pending">ID Invoice</th>
							<th className="sorting_pending">Date</th>
							<th className="sorting_pending">Recipient</th>
							<th className="sorting_pending">Amount</th>
							<th className="sorting_pending">Type</th>
							<th className="sorting_pending">Location</th>
							<th className="sorting_pending">Status</th>
							<th className="sorting_pending">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr role='row' className='odd'>
							<td className='pending_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check31' required/>
										<label className='form-check-label' htmlFor='check31'/>
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
						<tr role='row' className='even'>
							<td className='pending_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check32' required/>
										<label className='form-check-label' htmlFor='check32'/>
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
							<td className='pending_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check33' required/>
										<label className='form-check-label' htmlFor='check33'/>
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
		</>
	)
}
export default TabPending;