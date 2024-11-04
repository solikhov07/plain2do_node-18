import {Link} from 'react-router-dom';
import DropdownBlog from './../DropdownBlog';

const SpendingsBlog = () => {
	return(
		<>
			<div className="card">
				<div className="card-header border-0 pb-0">
					<div>
						<h4 className="card-title mb-2">Spendings</h4>
						<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
					</div>
					<DropdownBlog />
				</div>
				<div className="card-body">	
					<div className="progress default-progress">
						<div className="progress-bar bg-gradient-1 progress-animated" style={{width: "45%", height:"20px"}} role="progressbar">
							<span className="sr-only">45% Complete</span>
						</div>
					</div>
					<div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
						<span>Investment</span>
						<span className="fs-18"><span className="text-black pe-2">$1415</span>/$2000</span>
					</div>
					<div className="progress default-progress mt-4">
						<div className="progress-bar bg-gradient-2 progress-animated" style={{width: "70%", height:"20px"}} role="progressbar">
							<span className="sr-only">70% Complete</span>
						</div>
					</div>
					<div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
						<span>Restaurant</span>
						<span className="fs-18"><span className="text-black pe-2">$1567</span>/$5000</span>
					</div>
					<div className="progress default-progress mt-4">
						<div className="progress-bar bg-gradient-3 progress-animated" style={{width: "35%", height:"20px"}} role="progressbar">
							<span className="sr-only">35% Complete</span>
						</div>
					</div>
					<div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
						<span>Installment</span>
						<span className="fs-18"><span className="text-black pe-2">$487</span>/$10000</span>
					</div>
					<div className="progress default-progress mt-4">
						<div className="progress-bar bg-gradient-4 progress-animated" style={{width: "95%", height:"20px"}} role="progressbar">
							<span className="sr-only">95% Complete</span>
						</div>
					</div>
					<div className="d-flex align-items-end mt-2 justify-content-between">
						<span>Property</span>
						<span className="fs-18"><span className="text-black pe-2">$3890</span>/$4000</span>
					</div>
				</div>
				<div className="card-footer border-0 pt-0">
					<Link to={"#"} className="btn btn-outline-primary d-block btn-lg">View More</Link>
				</div>
			</div>
		</>	
	)
} 
export default SpendingsBlog;