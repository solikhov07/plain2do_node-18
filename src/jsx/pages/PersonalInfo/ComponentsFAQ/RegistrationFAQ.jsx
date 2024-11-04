import React, { useEffect, useState } from "react";
import "../styles.css";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { fetchDormitories } from "../../../components/apiData/apiData";

const RegistrationFAQ = ({
  data,
  openSection,
  handleToggle,
  t,
  token,
  id,
  dataFilter,
  handleUpdate,
  employee,
}) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowContent, setWindowContent] = useState("");
  const [dormitory, setDormitory] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getDormitory = async () => {
      const data = await fetchDormitories(token);
      setDormitory(data);
    };

    getDormitory();
  }, [token]);

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add New Registration Information</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formRegistrationAddress">
            <Form.Label>Registration Address:</Form.Label>
            <Form.Control
              type="text"
              name="Registration_Address"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="Issued_by"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formDormitory">
            <Form.Label>Dormitory:</Form.Label>
            <Form.Control as="select" name="Dormitory" className="edit__input">
              <option value="">Select Dormitory</option>
              {dormitory.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.Dormname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="edit__btn-wrapper">
            <Button className="edit__btn" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    );
    setWindowContent(addContent);
    setIsWindowOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formElements = e.target.elements;

    const formattedIssueDate = formatDateForInput(formElements.IssueDate.value);
    const formattedValidityDate = formatDateForInput(
      formElements.ValidityDate.value
    );

    const docTypeEn = parseInt(12, 10);
    const formattedreginform = "Yes";
    const employeeId = parseInt(id, 10);

    formData.append("IssueDate", formattedIssueDate);
    formData.append("ValidityDate", formattedValidityDate);
    formData.append("DocumentNo", formElements.DocumentNo.value);
    formData.append(
      "Registration_Address",
      formElements.Registration_Address.value
    );
    formData.append("Issued_by", formElements.Issued_by.value);
    formData.append("Registration_in_Dorm", formattedreginform);
    formData.append("Dormitory", formElements.Dormitory.value);
    formData.append("Employee", employeeId);
    formData.append("Doc_Type_En", docTypeEn);

    // Log the payload to the console
    console.log("FormData Payload:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${urlLink}/employee/registration/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        swal(
          "Success",
          "New registration information added successfully!",
          "success"
        );
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json(); // Extract error response
        console.error("Error response from server:", errorData); // Log the error details
        throw new Error(
          errorData.message || "Failed to add registration information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleEditClick = (registration) => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit Registration Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
              defaultValue={formatDateToShow(data.Registration[0]?.IssueDate)}
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
              defaultValue={formatDateToShow(
                data.Registration[0]?.ValidityDate
              )}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
              defaultValue={data.Registration[0]?.DocumentNo}
            />
          </Form.Group>

          <Form.Group controlId="formRegistrationAddress">
            <Form.Label>Registration Address:</Form.Label>
            <Form.Control
              type="text"
              name="Registration_Address"
              className="edit__input"
              defaultValue={data.Registration[0]?.Registration_Address}
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="Issued_by"
              className="edit__input"
              defaultValue={data.Registration[0]?.Issued_by}
            />
          </Form.Group>

          <Form.Group controlId="formDormitory">
            <Form.Label>Dormitory:</Form.Label>
            <Form.Control
              as="select"
              name="Dormitory"
              className="edit__input"
              defaultValue={data.Registration[0]?.Dormitory}
            >
              {dormitory.map((dorm) => (
                <option key={dorm.id} value={dorm.id}>
                  {dorm.Dormname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="edit__btn-wrapper">
            <Button className="edit__btn" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    );

    setWindowContent(editContent);
    setIsWindowOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formElements = e.target.elements;

    const formattedIssueDate = formatDateForInput(formElements.IssueDate.value);
    const formattedValidityDate = formatDateForInput(
      formElements.ValidityDate.value
    );
    const employeeId = parseInt(id, 10);

    // Append form data
    formData.append("IssueDate", formattedIssueDate);
    formData.append("ValidityDate", formattedValidityDate);
    formData.append("DocumentNo", formElements.DocumentNo.value);
    formData.append(
      "Registration_Address",
      formElements.Registration_Address.value
    );
    formData.append("Issued_by", formElements.Issued_by.value);
    formData.append("Dormitory", formElements.Dormitory.value);
    formData.append("Employee", employeeId);
    formData.append("Doc_Type_En", 12);

    try {
      const response = await fetch(
        `${urlLink}/employee/registration/${data.Registration[0].id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        swal(
          "Success",
          "Registration information updated successfully!",
          "success"
        );
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(
          errorData.message || "Failed to update registration information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  const formatDateForInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="faq-container4">
      <div
        onClick={() => handleToggle("registration")}
        className="faq__t-wrapper"
      >
        <h5 className="toggle-title">{t.registrationInformation}</h5>
        <p className="faq__header-seria">
          {data.Registration && data.Registration.length > 0
            ? data.Registration[0].IssueDate
            : t.noRegistrationInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "registration" ? "open" : ""
        }`}
      >
        {data.Registration && data.Registration.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.registration}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">Document No</p>
                <p className="faq__country-code">
                  {data.Registration[0].DocumentNo}
                </p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">{t.nameSurname}:</span>
                  <p className="field__data">
                    {employee?.firstname} {employee?.surname}
                  </p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">
                      {t.registrationAddress}:
                    </span>
                    <p className="field__data">
                      {data.Registration[0].Registration_Address}
                    </p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">{t.issuedBy}:</span>
                    <p className="field__data">
                      {data.Registration[0].Issued_by}
                    </p>
                  </div>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.dormitory}:</span>
                  <p className="field__data">
                    {data.Registration[0].Dormitory}
                  </p>
                </div>

                <button
                  className="btn btn-secondary mt-2 faq__edit-btn"
                  onClick={handleEditClick}
                >
                  <i className="fa fa-pencil"></i> Edit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data">
            {dataFilter === "latest" ? (
              <div className="no-data-wrapper">
                <p className="no-data">{t.noData}</p>
                <div className="faq__add-btn-wrapper">
                  <Button className="faq__edit-btn" onClick={handleAddClick}>
                    Add Registration
                  </Button>
                </div>
              </div>
            ) : (
              <p>{t.noData}</p>
            )}
          </div>
        )}
      </div>

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
    </div>
  );
};

export default RegistrationFAQ;
