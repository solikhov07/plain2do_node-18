import React from "react";
import { Link } from "react-router-dom";

import bgimg from './../../images/student-bg.jpg';
import errorimg from './../../images/error.png';

const Error500 = () => {
   return (
      <div className="authincation " style={{backgroundImage: "url("+ bgimg +")" , backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
         <div className="container">
            <div className="row h-100 align-items-center">
               <div className="col-lg-6 col-sm-12">
                  <div className="form-input-content  error-page">
                     <h1 className="error-text text-primary">500</h1>
                     <h4> Internal Server Error</h4>
                     <p>You do not have permission to view this resource.</p>
                     <Link to={"/dashboard"} className="btn btn-primary">Back to Home</Link>
                  </div>
               </div>
               <div className="col-lg-6 col-sm-12">
                  <img  className="w-100 move-2" src={errorimg} alt="" />
               </div>
            </div>
         </div>
      </div>  
   );
};

export default Error500;
