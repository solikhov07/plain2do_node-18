import React, { Fragment } from "react";
import Swal from "sweetalert2"; // Change this import
import swal from "sweetalert"; // Keep this for regular alerts if needed
import PageTitle from "../../../layouts/PageTitle";

const MainSweetAlert = () => {
  return (
    <Fragment>
      <PageTitle activeMenu="Sweet Alert" motherMenu="Components" />

      <div className="row">
        <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sweet Wrong</h4>
              <div className="card-content">
                <div className="sweetalert mt-5">
                  <button
                    onClick={() =>
                      swal("Oops", "Something went wrong!", "error")
                    }
                    className="btn btn-danger btn sweet-wrong"
                  >
                    Sweet Wrong
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sweet Message</h4>
              <div className="card-content">
                <div className="sweetalert mt-5">
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: 'Hey, Here\'s a message !!',
                        html: '<h2>Hey, Here\'s a message !!</h2>',
                        icon: 'info',
                      })
                    }
                    className="btn btn-info btn sweet-message"
                  >
                    Sweet Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sweet Text</h4>
              <div className="card-content">
                <div className="sweetalert mt-5">
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: 'Hey, Here\'s a message !!',
                        html: '<h2>Hey, Here\'s a message !!</h2><p>It\'s pretty, isn\'t it?</p>',
                        icon: 'info',
                      })
                    }
                    className="btn btn-primary btn sweet-text"
                  >
                    Sweet Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sweet Success</h4>
              <div className="card-content">
                <div className="sweetalert mt-5">
                  <button
                    onClick={() =>
                      Swal.fire("Good job!", "You clicked the button!", "success")
                    }
                    className="btn btn-success btn sweet-success"
                  >
                    Sweet Success
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update other alert buttons similarly */}
        {/* Example for confirm button */}
        <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sweet Confirm</h4>
              <div className="card-content">
                <div className="sweetalert mt-5">
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel!',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                          });
                        } else {
                          Swal.fire("Your imaginary file is safe!");
                        }
                      })
                    }
                    className="btn btn-warning btn sweet-confirm"
                  >
                    Sweet Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Repeat similar updates for other buttons as needed */}

      </div>
    </Fragment>
  );
};

export default MainSweetAlert;
