import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { Button, Dropdown, Modal, Form, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import Select from "react-select";
import "./appProfile.css";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../../jwt/jwtDecoder";
import { useNavigate } from "react-router-dom";
import {
  fetchCompany,
  fetchCountries,
  fetchProjects,
} from "../../apiData/apiData";
import { useLanguage } from "../../../../context/LanguageContext";
import translations from "../../../../translation/translation";

const AppProfile = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const history = useNavigate();
  const [myData, setMyData] = useState([]);
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const id = decodedToken.payload.user_id;
  const [company, setCompany] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowContent, setWindowContent] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [invited, setInvited] = useState([]);
  const [emailFilter, setEmailFilter] = useState(""); // State for email filter
  const [userTypeFilter, setUserTypeFilter] = useState(""); // State for user type filter
  const [acceptedFilter, setAcceptedFilter] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;
  const [refreshData, setRefreshData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [companyNumber, setCompanyNumber] = useState("");
  const [companyDetails, setCompanyDetails] = useState(null);
  const [sphereOptions, setSphereOptions] = useState([]);
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const { language } = useLanguage();
  const t = translations[language];
  const r = translations.registration[language];
  const [selectedSphere, setSelectedSphere] = useState("");
  const userType = decodedToken.payload.user_type;

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects(token);
      const formattedproject = data.map((project) => ({
        value: project.id,
        label: project.ProjectNameEN,
      }));

      setProjects(formattedproject);
    };

    getProjects();
  }, []);

  useEffect(() => {
    const getCountry = async () => {
      const data = await fetchCountries(token);
      setCountries(data);
    };

    getCountry();
  }, []);

  useEffect(() => {
    const getCompany = async () => {
      const data = await fetchCompany(token);
      setCompanies(data);
    };

    getCompany();
  }, [token]);

  const companyId = decodedToken.payload.company_id;

  const filteredCompany = companies.find((company) => company.id === companyId);

  const handleEditMyData = () => {
    const EditMyData = (
      <div className="edit-form">
        <h3>Edit my data</h3>
        <Form onSubmit={handleEditMyDataSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Your name:</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              defaultValue={myData?.first_name}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formSurname">
            <Form.Label>Your last name:</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              defaultValue={myData?.last_name}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Your phone number:</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              defaultValue={myData?.phone_number}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formCountry">
            <Form.Label>Your country</Form.Label>
            <Form.Control
              as="select"
              name="country"
              defaultValue={myData?.country || ""}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.CountryEN}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="edit__btn-wrapper">
            <Button className="edit__btn" type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </Form>
      </div>
    );
    setWindowContent(EditMyData);
    setIsWindowOpen(true);
  };

  const handleEditMyDataSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const formElements = e.target.elements;

    formData.append("first_name", formElements.first_name.value);
    formData.append("last_name", formElements.last_name.value);
    formData.append("phone_number", formElements.phone_number.value);
    formData.append("country", formElements.country.value);

    try {
      const response = await fetch(`${urlLink}/user-registration/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        swal("Success", "Editable data successfully changed!", "success");
        handleCloseWindow();
        setRefreshData(!refreshData); // Trigger refresh after successful edit
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change editable data.");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add New User</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email of User:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue=""
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formTypeUser">
            <Form.Label>Type of User:</Form.Label>
            <Form.Control
              as="select"
              name="user_type"
              defaultValue="System admin"
              className="edit__input"
            >
              <option value="System admin">System admin</option>
              <option value="Project Admin">Project Admin</option>
              <option value="Budget User">Budget User</option>
              <option value="Budget Manager">Budget Manager</option>
              <option value="HR User">HR User</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Timekeeper">Timekeeper</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formProjects">
            <Form.Label>Projects:</Form.Label>
            <Select
              isMulti
              options={projects} // `projects` should be an array of { value, label } objects
              defaultValue={selectedProjects}
              onChange={(selected) => setSelectedProjects(selected || [])}
              placeholder="Select projects..."
            />
          </Form.Group>

          <div className="edit__btn-wrapper">
            <Button className="edit__btn" type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </Form>
      </div>
    );
    setSelectedProjects([]);
    setWindowContent(addContent);
    setIsWindowOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const formElements = e.target.elements;

    formData.append("email", formElements.email.value);
    formData.append("user_type", formElements.user_type.value);
    formData.append("company", parseInt(company, 10));
    formData.append("inviter", id);

    // Remove any existing 'projects' field, in case it was previously added
    formData.delete("projects");

    // Append selected projects as integers to `formData`
    if (Array.isArray(selectedProjects) && selectedProjects.length > 0) {
      selectedProjects.forEach((project) => {
        const projectId = parseInt(project.value, 10);
        formData.append("projects", projectId); // Append each project ID
      });
    }

    // Convert formData to a JSON-like object for logging
    const payload = {};
    formData.forEach((value, key) => {
      if (payload[key]) {
        // Handle multiple values for `projects`
        payload[key] = Array.isArray(payload[key])
          ? payload[key]
          : [payload[key]];
        payload[key].push(value);
      } else {
        payload[key] = value;
      }
    });

    // Log the JSON-like payload to console for debugging
    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`${urlLink}/send-invitation/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        swal("Success", "Invitation mail sent successfully!", "success");
        handleCloseWindow();
        setRefreshData(!refreshData);
      } else {
        const errorData = await response.json();

        if (response.status === 409) {
          throw new Error(
            errorData.message ||
              "Duplicate entry. This user already has access to the System."
          );
        }

        throw new Error(errorData.message || "Failed to send Invitation");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEditableDate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const formElements = e.target.elements;

    formData.append("editable_date", parseInt(formElements.formEdit.value, 10));

    try {
      const response = await fetch(`${urlLink}/gendt/company/${companyId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Show success message and reload after confirmation
        swal("Success", "Editable date successfully changed!", "success").then(
          () => {
            // This will be executed after the user clicks "OK" on the alert
            window.location.reload();
          }
        );
        handleCloseWindow(); // Close the modal after showing the message
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change editable date.");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditableDate = () => {
    const editableDate = (
      <div className="edit-form">
        <h3>Edit Number of Days</h3>
        <Form onSubmit={handleAddEditableDate}>
          <Form.Group controlId="formEdit">
            <Form.Label>Enter a number:</Form.Label>
            <Form.Control
              type="number"
              name="formEdit"
              defaultValue={filteredCompany?.editable_date || ""}
              className="edit__input"
            />
            <Form.Text className="text-muted">
              Please enter the number of days to add valid timesheet.
            </Form.Text>
          </Form.Group>

          <div className="edit__btn-wrapper">
            <Button className="edit__btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </div>
    );

    setWindowContent(editableDate);
    setIsWindowOpen(true);
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/user-registration/${id}/`;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem("userDetails");
          history("/login");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCompany(data.Response.company?.id);
        setMyData(data.Response);
      })
      .catch((error) => {
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      });
  }, [token, id, refreshData]);

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  useEffect(() => {
    if (userType !== "System admin") {
      return;
    }

    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/send-invitation/${id}/`;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem("userDetails");
          history("/login");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setInvited(data?.Response);
        console.log(data.Response);
      })
      .catch((error) => {
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      });
  }, [token, id, refreshData, userType]);

  const filteredInvited = invited.filter((content) => {
    const isEmailMatch = content.email
      .toLowerCase()
      .includes(emailFilter.toLowerCase());
    const isUserTypeMatch =
      userTypeFilter === "" ? true : content.user_type === userTypeFilter;
    const isAcceptedMatch =
      acceptedFilter === ""
        ? true
        : acceptedFilter === "accepted"
        ? content.is_accepted
        : !content.is_accepted;

    return isEmailMatch && isUserTypeMatch && isAcceptedMatch;
  });

  const renderTableRows = () => {
    return filteredInvited.map((content) => {
      const formattedDateInvited = new Date(
        content.date_invited
      ).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedExpiresAt = new Date(content.expires_at).toLocaleString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      return (
        <tr key={content.id}>
          <td>{content.id}</td>
          <td>{content.email}</td>
          <td>{content.user_type}</td>
          <td>{formattedDateInvited}</td>
          <td>{formattedExpiresAt}</td>
          <td>
            {content.is_accepted ? (
              <span className="badge badge-success">{t.accepted}</span>
            ) : (
              <span className="badge badge-danger">{t.notaccepted}</span>
            )}
          </td>
        </tr>
      );
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
    setCompanyNumber("");
    setCompanyDetails(null);
  };

  const fetchCompanyDetails = async (number) => {
    if (number) {
      try {
        const response = await fetch(`${urlLink}/find-company/${number}/`);
        const data = await response.json();
        if (data.Response) {
          setCompanyDetails(data.Response[0]);
          console.log(data);
        } else {
          setCompanyDetails(null);
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    } else {
      setCompanyDetails(null);
    }
  };

  const fetchSphereOptions = async () => {
    try {
      const response = await fetch(`${urlLink}/company-sphere/`);
      const data = await response.json();
      setSphereOptions(data.Response);
    } catch (error) {
      console.error("Error fetching sphere options:", error);
    }
  };

  React.useEffect(() => {
    if (showModal) {
      fetchSphereOptions();
    }
  }, [showModal]);

  const handleCompanyNumberChange = (e) => {
    const value = e.target.value;
    setCompanyNumber(value);
    fetchCompanyDetails(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      OurCompanyINN: companyDetails?.data?.inn,
      OurCompanyEN: companyDetails?.value,
      OurCompanyKPP: companyDetails?.data?.kpp,
      ShortCode: companyDetails?.data?.name?.short, // Adjust as needed
      number_of_employees: numberOfEmployees,
      sphere: selectedSphere,
      address: companyDetails?.data?.address?.unrestricted_value,
    };

    try {
      const response = await fetch(`${urlLink}/gendt/company/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Make sure 'token' is defined or passed in as a prop
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);

        // Handle multiple error messages
        const errorMessages =
          Object.values(errorData).flat().join(", ") || response.statusText;
        throw new Error(errorMessages); // Throw an error with formatted messages
      }

      const result = await response.json();
      console.log("Success:", result);
      swal("Success", "Company data submitted successfully!", "success");
      setShowModal(false); // Close the modal on success
    } catch (error) {
      console.error("Error submitting company data:", error);
      swal("Error", error.message, "error"); // Display the error message from the backend
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu={t.profile} />
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-details align-items-center justify-content-between">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">
                      {myData.first_name} {myData.last_name}
                    </h4>
                    <p>{myData?.user_type}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{myData?.email}</h4>
                    <p>{r.email}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-primary mb-0">
                      {filteredCompany?.OurCompanyEN}
                    </h4>
                    <p>{t.company}</p>
                  </div>

                  <Dropdown className="dropdown ">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={handleAddClick}
                      >
                        Add User
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={handleEditMyData}
                      >
                        Edit My data
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        Edit User
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={handleEditableDate}
                      >
                        Edit the adding time
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={handleShowModal}
                      >
                        Add Company
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userType === "System admin" && (
        <div className="card">
          <div
            className="card-header"
            style={{ padding: "20px", paddingLeft: "30px" }}
          >
            <h4 className="card-title">{t.invitedUser}</h4>
            <div className="btn-wrapper">
              <input
                type="text"
                placeholder="Filter by email..."
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                style={{
                  marginLeft: "20px",
                  padding: "9px",
                  width: "200px",
                  border: "1px solid #5bcfc5",
                  borderRadius: "5px",
                }}
              />
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                style={{
                  marginLeft: "20px",
                  padding: "5px",
                  border: "1px solid #5bcfc5",
                  borderRadius: "5px",
                }}
              >
                <option value="">All User Types</option>
                <option value="System admin">System admin</option>
                <option value="Project Admin">Project Admin</option>
                <option value="Budget User">Budget User</option>
                <option value="Budget Manager">Budget Manager</option>
                <option value="HR User">HR User</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Timekeeper">Timekeeper</option>
              </select>
              <select
                value={acceptedFilter}
                onChange={(e) => setAcceptedFilter(e.target.value)}
                style={{
                  marginLeft: "20px",
                  padding: "5px",
                  border: "1px solid #5bcfc5",
                  borderRadius: "5px",
                }}
              >
                <option value="">All</option>
                <option value="accepted">Accepted</option>
                <option value="notAccepted">Not Accepted</option>
              </select>
            </div>
          </div>

          <div
            className="card-body"
            style={{ padding: "20px", paddingTop: "0px" }}
          >
            <div className="w-100 table-responsive">
              <table className="display w-100 dataTable">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{r.email}</th>
                    <th>{t.userType}</th>
                    <th>{t.dateinvited}</th>
                    <th>{t.dateOfExpiry}</th>
                    <th>{t.accepted}</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isWindowOpen && (
        <div className="overlay show" onClick={handleCloseWindow}>
          <div
            className="sliding-window show"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-btn" onClick={handleCloseWindow}>
              &times;
            </span>
            {windowContent}
          </div>
        </div>
      )}

      {loading && (
        <div className="fullscreen-overlay">
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading...</p>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCompanyNumber">
              <Form.Label>Company Number</Form.Label>
              <Form.Control
                type="text"
                value={companyNumber}
                onChange={handleCompanyNumberChange}
                placeholder="Enter company number"
                required
              />
            </Form.Group>

            {companyDetails && (
              <div>
                <h5>Company Details:</h5>
                <p>Name: {companyDetails?.value}</p>
                <p>INN: {companyDetails?.data?.inn}</p>
                <p>KPP: {companyDetails?.data?.kpp || "No KPP"}</p>
                <p>
                  Address: {companyDetails?.data?.address?.unrestricted_value}
                </p>

                <Form.Group controlId="formNumberOfEmployees">
                  <Form.Label>Number of Employees</Form.Label>
                  <Form.Control
                    type="number"
                    value={numberOfEmployees}
                    onChange={(e) => setNumberOfEmployees(e.target.value)}
                    placeholder="Enter number of employees"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSphere">
                  <Form.Label>Company Sphere</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setSelectedSphere(e.target.value)}
                    defaultValue={selectedSphere}
                    required
                  >
                    <option value="">Select Sphere</option>
                    {sphereOptions.map((sphere) => (
                      <option key={sphere.id} value={sphere.id}>
                        {sphere.nameEN} {/* Change based on language setting */}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            )}

            <Modal.Footer className="p-0">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {" "}
                {/* This button is now correctly inside the Form */}
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default AppProfile;