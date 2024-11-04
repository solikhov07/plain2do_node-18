import React, { useEffect, useState } from "react";
import "../styles.css";
import swal from "sweetalert";
import { Button, Form } from "react-bootstrap";
import accountImg from "../../../../images/account.jpg";

const VisaFAQ = ({
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
  const urlLink = process.env.REACT_APP_API_URL;

  const formatDateForInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit Visa Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>{t.issueDate}:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              defaultValue={formatDateToShow(data.Visa[0]?.IssueDate) || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formFromDate">
            <Form.Label>{t.fromDate}:</Form.Label>
            <Form.Control
              type="date"
              name="FromDate"
              defaultValue={formatDateToShow(data.Visa[0]?.FromDate) || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>{t.validityDate}:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              defaultValue={formatDateToShow(data.Visa[0]?.ValidityDate) || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formVisaSerie">
            <Form.Label>Visa Seria:</Form.Label>
            <Form.Control
              type="text"
              name="Visa_Serie"
              defaultValue={data.Visa[0]?.Visa_Serie || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formVisaNo">
            <Form.Label>Visa No:</Form.Label>
            <Form.Control
              type="text"
              name="VisaNo"
              defaultValue={data.Visa[0]?.VisaNo || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formDurationOfStay">
            <Form.Label>{t.durationOfStay}:</Form.Label>
            <Form.Control
              type="number"
              name="DurationOfStay"
              defaultValue={data.Visa[0]?.DurationOfStay || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssueBy">
            <Form.Label>{t.issuedBy}:</Form.Label>
            <Form.Control
              type="text"
              name="IssueBy"
              defaultValue={data.Visa[0]?.IssueBy || ""}
              className="edit__input"
            />
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
    const formattedFromDate = formatDateForInput(formElements.FromDate.value);
    const formattedValidityDate = formatDateForInput(
      formElements.ValidityDate.value
    );

    // Append form data
    formData.append("IssueDate", formattedIssueDate);
    formData.append("FromDate", formattedFromDate);
    formData.append("ValidityDate", formattedValidityDate);
    formData.append("Visa_Serie", formElements.Visa_Serie.value);
    formData.append("VisaNo", formElements.VisaNo.value);
    formData.append("DurationOfStay", formElements.DurationOfStay.value);
    formData.append("IssueBy", formElements.IssueBy.value);

    try {
      const response = await fetch(
        `${urlLink}/employee/visa/${data.Visa[0].id}/`,
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
        swal("Success", "Visa information updated successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update visa information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add New Visa Information</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>{t.issueDate}:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formFromDate">
            <Form.Label>{t.fromDate}:</Form.Label>
            <Form.Control type="date" name="FromDate" className="edit__input" />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>{t.validityDate}:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formVisaSerie">
            <Form.Label>Visa Seria:</Form.Label>
            <Form.Control
              type="text"
              name="Visa_Serie"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formVisaNo">
            <Form.Label>Visa Number:</Form.Label>
            <Form.Control type="text" name="VisaNo" className="edit__input" />
          </Form.Group>

          <Form.Group controlId="formDurationOfStay">
            <Form.Label>{t.durationOfStay}:</Form.Label>
            <Form.Control
              type="number"
              name="DurationOfStay"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssueBy">
            <Form.Label>{t.issuedBy}:</Form.Label>
            <Form.Control type="text" name="IssueBy" className="edit__input" />
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
    const formattedFromDate = formatDateForInput(formElements.FromDate.value);
    const formattedValidityDate = formatDateForInput(
      formElements.ValidityDate.value
    );
    const employeeId = parseInt(id, 10);
    const durationOfStay = parseInt(formElements.DurationOfStay.value, 10);
    const docTypeEn = parseInt(2, 10);

    formData.append("IssueDate", formattedIssueDate);
    formData.append("FromDate", formattedFromDate);
    formData.append("ValidityDate", formattedValidityDate);
    formData.append("Visa_Serie", formElements.Visa_Serie.value);
    formData.append("VisaNo", formElements.VisaNo.value);
    formData.append("DurationOfStay", durationOfStay);
    formData.append("IssueBy", formElements.IssueBy.value);
    formData.append("Employee", employeeId);
    formData.append("Doc_Type_En", docTypeEn);

    try {
      const response = await fetch(`${urlLink}/employee/visa/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        swal("Success", "New visa information added successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add visa information");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  return (
    <div className="faq-container">
      <div onClick={() => handleToggle("visa")} className="faq__t-wrapper">
        <h5 className="toggle-title">{t.visaInformation}</h5>
        <p className="faq__header-seria">
          {data.Visa && data.Visa.length > 0
            ? `${data.Visa[0].Visa_Serie}${data.Visa[0].VisaNo}`
            : t.noVisaInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "visa" ? "open" : ""
        }`}
      >
        {data.Visa && data.Visa.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.visa}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.visaNumber}</p>
                <p className="faq__country-code">{data.Visa[0].VisaNo}</p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div>
                <img
                  className="faq-photo"
                  src={employee?.photo ? employee?.photo : accountImg}
                  alt={t.passportPhotoAlt}
                />
                <div className="faq__functions-wrapper">
                  <button
                    className="btn btn-secondary mt-2 faq__edit-btn"
                    onClick={handleEditClick}
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </button>
                </div>
              </div>
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">Full Name:</span>{" "}
                  <p className="field__data">
                    {employee?.firstname} {employee?.surname}
                  </p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">{t.issueDate}:</span>{" "}
                    <p className="field__data">{data.Visa[0].IssueDate}</p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">{t.fromDate}:</span>{" "}
                    <p className="field__data">{data.Visa[0].FromDate}</p>
                  </div>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.validityDate}:</span>{" "}
                  <p className="field__data">{data.Visa[0].ValidityDate}</p>
                </div>

                <div className="faq-field">
                  <span className="field-label">{t.issuedBy}:</span>{" "}
                  <p className="field__data">{data.Visa[0].IssueBy}</p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.durationOfStay}:</span>{" "}
                  <p className="field__data">
                    {data.Visa[0].DurationOfStay} {t.days}
                  </p>
                </div>
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
                    Add Visa
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

export default VisaFAQ;
