import React, { useState } from "react";
import "../styles.css";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";

const MedicalFAQ = ({
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

          <Form.Group controlId="formFromDate">
            <Form.Label>From Date:</Form.Label>
            <Form.Control type="date" name="FromDate" className="edit__input" />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentSerie"
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

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control type="text" name="IssuedBy" className="edit__input" />
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
    const formElements = e.target.elements;

    const payload = {
      IssueDate: formatDateForInput(formElements.IssueDate.value),
      FromDate: formatDateForInput(formElements.FromDate.value),
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      Doc_Type_En: parseInt(5, 10),
      Employee: parseInt(id, 10),
      DocumentSerie: formElements.DocumentSerie.value,
      DocumentNo: formElements.DocumentNo.value,
      IssuedBy: formElements.IssuedBy.value,
    };

    try {
      const response = await fetch(`${urlLink}/employee/med/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(
          errorData.message || "Failed to add registration information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit Medical Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
              defaultValue={formatDateToShow(data?.Med[0]?.IssueDate)}
            />
          </Form.Group>

          <Form.Group controlId="formFromDate">
            <Form.Label>From Date:</Form.Label>
            <Form.Control
              type="date"
              name="FromDate"
              className="edit__input"
              defaultValue={formatDateToShow(data?.Med[0]?.FromDate)}
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
              defaultValue={formatDateToShow(data?.Med[0]?.ValidityDate)}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentSerie"
              className="edit__input"
              defaultValue={data?.Med[0]?.DocumentSerie}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
              defaultValue={data?.Med[0]?.DocumentNo}
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="IssuedBy"
              className="edit__input"
              defaultValue={data?.Med[0]?.IssuedBy}
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
    const formElements = e.target.elements;

    const payload = {
      IssueDate: formatDateForInput(formElements.IssueDate.value),
      FromDate: formatDateForInput(formElements.FromDate.value),
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      Doc_Type_En: parseInt(5, 10),
      Employee: parseInt(id, 10),
      DocumentSerie: formElements.DocumentSerie.value,
      DocumentNo: formElements.DocumentNo.value,
      IssuedBy: formElements.IssuedBy.value,
    };

    try {
      const response = await fetch(
        `${urlLink}/employee/med/${data?.Med[0].id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
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

  const formatDateForInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  return (
    <div className="faq-container5">
      <div onClick={() => handleToggle("medInfo")} className="faq__t-wrapper">
        <h5 className="toggle-title">{t.medicalInformation}</h5>
        <p className="faq__header-seria">
          {data?.Med && data?.Med.length > 0
            ? data?.Med[0].IssueDate
            : t.noMedicalInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "medInfo" ? "open" : ""
        }`}
      >
        {data?.Med && data?.Med.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.medicalCheckup}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">Document seria</p>
                <p className="faq__country-code">
                  {data?.Med[0].DocumentSerie}
                  {data?.Med[0].DocumentNo}
                </p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">{t.nameSurname}:</span>
                  <p className="field__data">
                    {employee.firstname} {employee.surname}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.issuedBy}:</span>
                  <p className="field__data">{data?.Med[0].IssuedBy}</p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">Issue Date:</span>
                    <p className="field__data">{data?.Med[0].IssueDate}</p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">Validity Date:</span>
                    <p className="field__data">{data?.Med[0].ValidityDate}</p>
                  </div>
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
                    Add Medical Information
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

export default MedicalFAQ;
