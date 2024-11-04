import React from "react";
import { Link } from "react-router-dom";

import bgimg from './../../images/student-bg.jpg';
import errorimg from './../../images/error-media.png';

const Error403 = () => {
   return (
      <div className="authincation " style={{backgroundImage: "url("+ bgimg +")" , backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
         <div className="container">
            <div className="row h-100 align-items-center">
               <div className="col-lg-6 col-sm-12">
                  <div className="form-input-content  error-page">
                     <h1 className="error-text text-primary">403</h1>
                     <h4> Forbidden Error!</h4>
                     <p>You do not have permission to view this resource.</p>
                     <Link to={"/dashboard"} className="btn btn-primary">Back to Home</Link>
                  </div>
               </div>
               <div className="col-lg-6 col-sm-12">
                  <img  className="move-2 error-media" src={errorimg} alt="" />
               </div>
            </div>
         </div>
      </div>    
   );
};

export default Error403;
