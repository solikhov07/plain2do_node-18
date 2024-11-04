import React, {useState} from 'react';
// import Nouislider from "nouislider-react";
// import ReactSlider from 'react-slider'
import Slider from 'rsuite/Slider';
import 'rsuite/dist/rsuite.min.css';
import {Link} from 'react-router-dom';
import DropdownBlog from './../DropdownBlog';

//Images
import small from './../../../../images/profile/small/pic1.jpg';
import avatar1 from './../../../../images/avatar/1.jpg';
import avatar2 from './../../../../images/avatar/2.jpg';
import avatar3 from './../../../../images/avatar/3.jpg';
import avatar4 from './../../../../images/avatar/4.jpg';
import avatar5 from './../../../../images/avatar/5.jpg';
import avatar6 from './../../../../images/avatar/6.jpg';


const QuickTransferBlog = () => {
	const [value, setValue] = useState(20);
	return(
		<>
			<div className="card">
				<div className="card-header border-0 pb-0">
					<div>
						<h4 className="card-title mb-2">Quick Transfer</h4>
						<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
					</div>
					<DropdownBlog />
				</div>
				<div className="card-body">	
					<div className="user-bx">
						<img src={small} alt="" />
						<div>
							<h6 className="user-name">Samuel</h6>
							<span className="meta">@sam224</span>
						</div>
						<i className="las la-check-circle check-icon"></i>
					</div>
					<h4 className="mt-3 mb-3">Recent Friend<Link to={"#"} className="fs-16 float-end text-secondary font-w600">See More</Link></h4>
					<ul className="user-list">
						<li><img src={avatar1} alt=""/></li>
						<li><img src={avatar2} alt=""/></li>
						<li><img src={avatar3} alt=""/></li>
						<li><img src={avatar4} alt=""/></li>
						<li><img src={avatar5} alt=""/></li>
						<li><img src={avatar6} alt=""/></li>
					</ul>
					<h4 className="mt-3 mb-0">Insert Amount</h4>
					<div className="format-slider">
						<input className="form-control amount-input" value={`${value}.00`}  title="Formatted number" id="input-format"  							
							onChange={value => {
								setValue(value);
							}}
						/>
						
						<div id="combined">
							<Slider
								progress								
								value={value}
								onChange={value => {
									setValue(value);
								}}
							/>
						</div>
					</div>
					<div className="text-secondary fs-16 d-flex justify-content-between font-w600 mt-4">
						<span>Your Balance</span>
						<span>$ 456,345.62</span>
					</div>
				</div>
				<div className="card-footer border-0 pt-0">
					<Link to={"#"} className="btn btn-primary d-block btn-lg text-uppercase">Transfer Now</Link>
				</div>
			</div>
		</>	
	)
} 
export default QuickTransferBlog;