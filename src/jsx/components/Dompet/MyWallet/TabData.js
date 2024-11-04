import React from 'react';
import {Link} from 'react-router-dom';

import avt1 from './../../../../images/avatar/1.jpg';
import avt2 from './../../../../images/avatar/2.jpg';
import avt3 from './../../../../images/avatar/3.jpg';
import avt4 from './../../../../images/avatar/4.jpg';
import avt5 from './../../../../images/avatar/5.jpg';


const AccordionBlog1 = [
	{ image: avt1, title:"XYZ Store ID", status: <PendingBlog />, cardbody: <AccordBox />, },
	{ image: avt2, title:"Olivia Brownlee", status: <CompleteBlog />, cardbody: <AccordBox />,	},
	{ image: avt3, title:"Angela Moss", status: <CancelBlog />, cardbody: <AccordBox />, },
	{ image: avt4, title:"XYZ Store ID", status: <PendingBlog />, cardbody: <AccordBox />, },
	{ image: avt5, title:"Peter Parkur", status: <PendingBlog />, cardbody: <AccordBox />, },
];
const AccordionBlog2 = [
	{ image: avt2, title:"Olivia Brownlee", status: <CompleteBlog />, cardbody: <AccordBox />,	},
	{ image: avt5, title:"Peter Parkur", status: <PendingBlog />, cardbody: <AccordBox />, },
	{ image: avt3, title:"Angela Moss", status: <CancelBlog />, cardbody: <AccordBox />, },
	{ image: avt4, title:"XYZ Store ID", status: <PendingBlog />, cardbody: <AccordBox />, },
];const AccordionBlog3 = [
	{ image: avt3, title:"Angela Moss", status: <CancelBlog />, cardbody: <AccordBox />, },
	{ image: avt4, title:"XYZ Store ID", status: <PendingBlog />, cardbody: <AccordBox />, },
	{ image: avt5, title:"Peter Parkur", status: <CompleteBlog />, cardbody: <AccordBox />, },
];


const TabData = () =>{
		
} 
function CancelBlog(){
	return(
		<Link to={"#"} className="btn btn-dark light btn-sm" >Canceled</Link>
	)	
}
function CompleteBlog(){
	return(
		<Link to={"#"} className="btn btn-success light btn-sm" >Completed</Link>
	)	
}
function PendingBlog(){
	return(
		<Link to={"#"} className="btn btn-danger light btn-sm" >Pending</Link>
	)	
}

function IconSuccess(){
	return(
		<>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip3)">
				<path d="M10.4125 14.85C10.225 14.4625 10.3906 13.9937 10.7781 13.8062C11.8563 13.2875 12.7688 12.4812 13.4188 11.4719C14.0844 10.4375 14.4375 9.23749 14.4375 7.99999C14.4375 4.44999 11.55 1.56249 8 1.56249C4.45 1.56249 1.5625 4.44999 1.5625 7.99999C1.5625 9.23749 1.91562 10.4375 2.57812 11.475C3.225 12.4844 4.14062 13.2906 5.21875 13.8094C5.60625 13.9969 5.77187 14.4625 5.58437 14.8531C5.39687 15.2406 4.93125 15.4062 4.54062 15.2187C3.2 14.575 2.06562 13.575 1.2625 12.3187C0.4375 11.0312 -4.16897e-07 9.53749 -3.49691e-07 7.99999C-2.56258e-07 5.86249 0.83125 3.85312 2.34375 2.34374C3.85313 0.831242 5.8625 -7.37314e-06 8 -7.2797e-06C10.1375 -7.18627e-06 12.1469 0.831243 13.6563 2.34374C15.1688 3.85624 16 5.86249 16 7.99999C16 9.53749 15.5625 11.0312 14.7344 12.3187C13.9281 13.5719 12.7938 14.575 11.4563 15.2187C11.0656 15.4031 10.6 15.2406 10.4125 14.85Z" fill="white"/>
				<path d="M11.0407 8.41563C11.1938 8.56876 11.2688 8.76876 11.2688 8.96876C11.2688 9.16876 11.1938 9.36876 11.0407 9.52188L9.07503 11.4875C8.78753 11.775 8.40628 11.9313 8.00315 11.9313C7.60003 11.9313 7.21565 11.7719 6.93127 11.4875L4.96565 9.52188C4.6594 9.21563 4.6594 8.72188 4.96565 8.41563C5.2719 8.10938 5.76565 8.10938 6.0719 8.41563L7.22502 9.56876L7.22502 5.12814C7.22502 4.69689 7.57503 4.34689 8.00628 4.34689C8.43753 4.34689 8.78753 4.69689 8.78753 5.12814L8.78753 9.57188L9.94065 8.41876C10.2407 8.11251 10.7344 8.11251 11.0407 8.41563Z" fill="white"/>
				</g>
				<defs>
				<clipPath id="clip3">
				<rect width="16" height="16" fill="white" transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 -7.62939e-06)"/>
				</clipPath>
				</defs>
			</svg>
		</>
	)
}

function AccordBox(){
	return(
		<>
			<div className="payment-details accordion-body-text">
				<div className="me-3 mb-3">
					<p className="fs-12 mb-2">ID Payment</p>
					<span className="font-w500">#00123521</span>
				</div>
				<div className="me-3 mb-3">
					<p className="fs-12 mb-2">Payment Method</p>
					<span className="font-w500">MasterCard 404</span>
				</div>
				<div className="me-3 mb-3">
					<p className="fs-12 mb-2">Invoice Date</p>
					<span className="font-w500">April 29, 2020</span>
				</div>
				<div className="me-3 mb-3">
					<p className="fs-12 mb-2">Due Date</p>
					<span className="font-w500">June 5, 2020</span>
				</div>
				<div className="me-3 mb-3">
					<p className="fs-12 mb-2">Date Paid</p>
					<span className="font-w500">June 4, 2020</span>
				</div>
				<div className="info mb-3">
					<svg className="me-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 1C9.82441 1 7.69767 1.64514 5.88873 2.85384C4.07979 4.06253 2.66989 5.7805 1.83733 7.79049C1.00477 9.80047 0.786929 12.0122 1.21137 14.146C1.6358 16.2798 2.68345 18.2398 4.22183 19.7782C5.76021 21.3166 7.72022 22.3642 9.85401 22.7887C11.9878 23.2131 14.1995 22.9953 16.2095 22.1627C18.2195 21.3301 19.9375 19.9202 21.1462 18.1113C22.3549 16.3023 23 14.1756 23 12C22.9966 9.08368 21.8365 6.28778 19.7744 4.22563C17.7122 2.16347 14.9163 1.00344 12 1ZM12 21C10.22 21 8.47992 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89471 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17293C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36627 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C20.9971 14.3861 20.0479 16.6736 18.3608 18.3608C16.6736 20.048 14.3861 20.9971 12 21Z" fill="#fff"/>
						<path d="M12 9C11.7348 9 11.4804 9.10536 11.2929 9.29289C11.1054 9.48043 11 9.73478 11 10V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8947 17.5196 13 17.2652 13 17V10C13 9.73478 12.8947 9.48043 12.7071 9.29289C12.5196 9.10536 12.2652 9 12 9Z" fill="#fff"/>
						<path d="M12 8C12.5523 8 13 7.55228 13 7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7C11 7.55228 11.4477 8 12 8Z" fill="#fff"/>
					</svg>
					<p className="mb-0 fs-14">Lorem ipsum dolor sit amet, <br/>consectetur </p>
				</div>
			</div>
		
		</>
	)
}
export {AccordionBlog1,IconSuccess,AccordBox,AccordionBlog2,AccordionBlog3};	
export default TabData;