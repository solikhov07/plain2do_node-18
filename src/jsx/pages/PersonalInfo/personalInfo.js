import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Navbar,
  Nav,
  Modal,
  Image,
  Table,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Badge } from "react-bootstrap";
import defaultImg from "../../../images/avatar/8.jpg";
import accountimg from "../../../images/account.jpg";
import swal from "sweetalert";
import Loader from "../../components/Loader/Loader";
import FAQ from "./FAQ";
import { useParams, useNavigate } from "react-router-dom";
import PayrollHistoryTable from "./Payroll/PayrollHistoryTable";
import PayrollHistoryUser from "./Payroll/PayrollHistoryUsers";
import translation from '../../../translation/translation'
import { useLanguage } from '../../../context/LanguageContext'
const UserInfo = ({
  userData,
  setUserData,
  token,
  id,
  fetchUserData,
  loading,
}) => {
  const [photoFile, setPhotoFile] = useState(null);
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActivated, setIsActivated] = useState(
    userData.current_status === "active"
  );
  const urlLink = process.env.REACT_APP_API_URL;
  const initialData = useRef(userData);
  const { language } = useLanguage();
  const t = translation[language];
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(`${urlLink}/employee/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPositions(data.Position || []);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, [urlLink, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const hasChanges = () => {
    return (
      userData.firstname !== initialData.current.firstname ||
      userData.surname !== initialData.current.surname ||
      userData.other_name !== initialData.current.other_name ||
      userData.position !== initialData.current.position ||
      userData.mobile_number !== initialData.current.mobile_number ||
      photoFile
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      swal(t.nochanges, t.therearenochangestosave, "info");
      return;
    }

    const url = `${urlLink}/employee/${id}/`;

    const formData = new FormData();

    if (userData.firstname !== initialData.current.firstname) {
      formData.append("firstname", userData.firstname);
    }
    if (userData.surname !== initialData.current.surname) {
      formData.append("surname", userData.surname);
    }
    if (userData.other_name !== initialData.current.other_name) {
      formData.append("other_name", userData.other_name);
    }

    if (userData.position !== initialData.current.position) {
      formData.append("position", userData.position);
    }

    if (userData.mobile_number !== initialData.current.mobile_number) {
      formData.append("mobile_number", userData.mobile_number);
    }

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Error response:", errorData);
            throw new Error(`${t.httperrorstatus} ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        swal(
          t.success.charAt(0).toUpperCase() + t.success.slice(1),
          t.personalinformationupdatedsuccessfully,
          "success"
        );
        fetchUserData();
        setShowModal(false); // Close modal after successful update
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasanissueupdatingtheinformation + error.message,
          "error"
        );
      });
  };

  useEffect(() => {
    setIsActivated(userData.current_status === "active");
  }, [userData]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const handleActivationToggle = async (isChecked) => {
    const newStatus = isChecked ? "active" : "inactive";

    setIsActivated(isChecked);

    const payload = {
      current_status: newStatus, // Use the correct status for the backend
    };

    try {
      const response = await fetch(`${urlLink}/employee/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the new status
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Failed to update activation status:", response.status);
        setIsActivated(!isChecked); // Revert the switch if the request fails
      }
    } catch (error) {
      console.error("Error updating activation status:", error);
      setIsActivated(!isChecked); // Revert the switch state on error
    }
  };

  return (
    <div>
      <div className="card mb-2">
        <div className="card-header p-3 ps-4 pe-4 d-flex align-items-center">
          <h4 className="m-0">{t.personalInformation}</h4>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            {t.edit}
          </Button>
        </div>

        <div className="card-body p-0 ps-3 pe-3">
          <Table className="mb-3">
            <tbody>
              <tr>
                <th>
                  <h5>{t.first_name}</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.firstname || "N/A"}</h5>
                </td>
              </tr>
              <tr>
                <th>
                  <h5>{t.surname}</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.surname || "N/A"}</h5>
                </td>
              </tr>
              <tr>
                <th>
                  <h5>{t.othername}</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.other_name || "N/A"}</h5>
                </td>
              </tr>
              <tr>
                <th>
                  <h5>{t.mobile_number}</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.mobile_number || "N/A"}</h5>
                </td>
              </tr>
              <tr>
                <th>
                  <h5>{t.position}</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.position_data?.["JobTitle"+language.toUpperCase()] ? userData.position_data["JobTitle"+language.toUpperCase()] : "N/A"}</h5>
                </td>
              </tr>

              <tr>
                <th>
                  <h5>{t.employeeActivation}</h5>
                </th>
                <td classname="p-0">
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={isActivated}
                      onChange={(e) => handleActivationToggle(e.target.checked)}
                    />
                  </Form>
                </td>
              </tr>

              {/* <tr>
                <th>
                  <h5>Birth Date</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.date_of_birth || "N/A"}</h5>
                </td>
              </tr>

              <tr>
                <th>
                  <h5>Date of Employment</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.date_of_employment || "N/A"}</h5>
                </td>
              </tr>

              <tr>
                <th>
                  <h5>Date of Dismissal</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.date_of_dismissal || "N/A"}</h5>
                </td>
              </tr>

              <tr>
                <th>
                  <h5>SNILS Number</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.snils_number || "N/A"}</h5>
                </td>
              </tr>

              <tr>
                <th>
                  <h5>TIN number</h5>
                </th>
                <td classname="p-0">
                  <h5>{userData.tin_number || "N/A"}</h5>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t.editPersonalInfo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formFirstname">
              <Form.Label>{t.first_name}</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={userData.firstname || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>{t.surname}</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={userData.surname || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formOtherName">
              <Form.Label>{t.othername}</Form.Label>
              <Form.Control
                type="text"
                name="other_name"
                value={userData.other_name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>{t.mobile_number}</Form.Label>
              <Form.Control
                type="text"
                name="mobile_number"
                value={userData.mobile_number || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPosition">
              <Form.Label>{t.position}</Form.Label>
              <Form.Control
                as="select"
                name="position"
                defaultValue={userData.position_data?.id || ""}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position["JobTitle"+language.toUpperCase()]?position["JobTitle"+language.toUpperCase()]: position.JobTitleEN }
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>{t.photo}</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t.save}
            </Button>
            <Button
              variant="secondary"
              className="ml-2"
              onClick={() => setShowModal(false)}
            >
              {t.cancel}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const EmployeeDocuments = () => (
  <div>
    <FAQ />
  </div>
);

const TenderTemplates = () => {
  return (
    <div>
      <PayrollHistoryTable />
    </div>
  );
};

const PayrollHistoryUsers = () => {
  return (
    <div>
      <PayrollHistoryUser />
    </div>
  );
};

const PersonalInformation = () => {
  const { id } = useParams();
  const history = useNavigate();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const [activeContent, setActiveContent] = useState("user-info");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState({});
  const urlLink = process.env.REACT_APP_API_URL;
  const [profileImage, setProfileImage] = useState(defaultImg);
  const { language } = useLanguage();
  const t = translation[language];
  const fetchUserData = () => {
    const url = `${urlLink}/employee/${id}/`;
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
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.Response);

        if (data.Response.photo) {
          setProfileImage(data.Response.photo);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          "error"
        );
      });
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }
    fetchUserData();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLinkClick = () => {
    setExpanded(false);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "user-info":
        return (
          <UserInfo
            userData={userData}
            setUserData={setUserData}
            token={token}
            id={id}
            history={history}
            fetchUserData={fetchUserData}
            loading={loading}
          />
        );
      case "user-favorite-list":
        return <EmployeeDocuments />;
      case "tender-templates":
        return <TenderTemplates />;
      case "payroll-user":
        return <PayrollHistoryUsers />;
      default:
        return null;
    }
  };

  return (
    <Row>
      <Navbar expand="lg" className="w-100 d-lg-none">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={expanded ? "show" : ""}
        >
          <Nav className="mr-auto flex-column">
            <Nav.Link
              onClick={() => {
                setActiveContent("user-info");
                handleLinkClick();
              }}
            >
              {t.personalInformation}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setActiveContent("user-favorite-list");
                handleLinkClick();
              }}
            >
              {t.employmentdocuments}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setActiveContent("delegations");
                handleLinkClick();
              }}
            >
              {t.certificates}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setActiveContent("tender-templates");
                handleLinkClick();
              }}
            >
              {t.salarytransferinfo}
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                setActiveContent("payroll-user");
                handleLinkClick();
              }}
            >
              {t.payrollHistory}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Col lg={3} className="navbar__style p-3 d-none d-lg-block">
        <div className="text-center">
          <img
            src={userData.photo ? userData.photo : accountimg}
            alt="Profile"
            className="img-fluid rounded-circle mb-2 profile-image"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h5>
            {userData.firstname} {userData.surname}
          </h5>
          <p className="text-muted text-over" title={userData.mobile_number}>
            {userData.mobile_number}
          </p>
        </div>
        <hr />
        <Nav className="flex-column">
          <Nav.Link
            onClick={() => setActiveContent("user-info")}
            className="text-decoration-none"
          >
             {t.personalInformation}
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveContent("user-favorite-list")}
            className="text-decoration-none"
          >
            {t.employmentdocuments}
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveContent("delegations")}
            className="text-decoration-none"
          >
           {t.certificates}
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveContent("tender-templates")}
            className="text-decoration-none"
          >
            {t.salarytransferinfo}
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveContent("payroll-user")}
            className="text-decoration-none"
          >
            {t.payrollHistory}
          </Nav.Link>
        </Nav>
      </Col>

      <Col lg={9} className="p-3">
        {renderContent()}
      </Col>
    </Row>
  );
};

export default PersonalInformation;
