import React, { useState } from "react";
import "../styles.css";
import swal from "sweetalert";
import { Button, Form } from "react-bootstrap";

const PatentFAQ = ({
  data,
  openSection,
  handleToggle,
  t,
  id,
  token,
  dataFilter,
  handleUpdate,
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
        <h3>Edit Patent Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Series:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentSerie"
              defaultValue={data?.Patent[0]?.DocumentSerie || ""}
              className="edit__input"
              min="10"
              max="99"
              step="1"
              required
              onInput={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 2);
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentNo"
              defaultValue={data?.Patent[0]?.DocumentNo || ""}
              className="edit__input"
              min="1000000000" // Minimum value greater than 1000000000
              required
            />
          </Form.Group>

          <Form.Group controlId="formIssueDate">
            <Form.Label>{t.issueDate}:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              defaultValue={formatDateToShow(data?.Patent[0]?.IssueDate) || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>{t.validityDate}:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              defaultValue={
                formatDateToShow(data?.Patent[0]?.ValidityDate) || ""
              }
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formJobTitle">
            <Form.Label>Job Title:</Form.Label>
            <Form.Control
              type="text"
              name="Job_Title"
              defaultValue={data?.Patent[0]?.Job_Title || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formSpecialMarks">
            <Form.Label>Special Marks:</Form.Label>
            <Form.Control
              as="select"
              name="SpecialMarks"
              className="edit__input"
              defaultValue={data?.Patent[0]?.SpecialMarks || "Работа у ЮЛ/ИП"}
            >
              <option value="ВКС">ВКС</option>
              <option value="Работа у ЮЛ/ИП">Работа у ЮЛ/ИП</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formValidTerritories">
            <Form.Label>Valid Territories:</Form.Label>
            <Form.Control
              type="text"
              name="ValidTerritories"
              defaultValue={data?.Patent[0]?.ValidTerritories || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>{t.issuedBy}:</Form.Label>
            <Form.Control
              type="text"
              name="Issued_by"
              defaultValue={data?.Patent[0]?.Issued_by || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formRegisterSerialNumber">
            <Form.Label>Register Serial Number:</Form.Label>
            <Form.Control
              type="text"
              name="Register_Serial_number"
              defaultValue={data?.Patent[0]?.Register_Serial_number || ""}
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
    const formattedValidityDate = formatDateForInput(
      formElements.ValidityDate.value
    );

    // Append form data
    formData.append("DocumentSerie", formElements.DocumentSerie.value);
    formData.append("DocumentNo", formElements.DocumentNo.value);
    formData.append("IssueDate", formattedIssueDate);
    formData.append("ValidityDate", formattedValidityDate);
    formData.append("Job_Title", formElements.Job_Title.value);
    formData.append("SpecialMarks", formElements.SpecialMarks.value);
    formData.append("ValidTerritories", formElements.ValidTerritories.value);
    formData.append("Issued_by", formElements.Issued_by.value);
    formData.append(
      "Register_Serial_number",
      formElements.Register_Serial_number.value
    );

    try {
      // Adjust URL according to the endpoint used for editing patent information
      const response = await fetch(
        `${urlLink}/employee/patent/${data?.Patent[0].id}/`, // Make sure `data?.Patent[0].id` reflects the correct ID
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
        swal("Success", "Patent information updated successfully!", "success");
        handleCloseWindow(); // Close the modal window
        handleUpdate(); // Function to refresh the data or re-render the component
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update patent information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add New Patent Information</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Series:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentSerie"
              className="edit__input"
              min="10"
              max="99"
              step="1"
              required
              onInput={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 2);
                }
              }}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentNo"
              className="edit__input"
              min="1000000001"
              max="9999999999"
              required
            />
          </Form.Group>

          <Form.Group controlId="formIssueDate">
            <Form.Label>{t.issueDate}:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>{t.validityDate}:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formJobTitle">
            <Form.Label>Job Title:</Form.Label>
            <Form.Control
              type="text"
              name="Job_Title"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formSpecialMarks">
            <Form.Label>Special Marks:</Form.Label>
            <Form.Control
              as="select"
              name="SpecialMarks"
              className="edit__input"
              defaultValue="Работа у ЮЛ/ИП"
            >
              <option value="ВКС">ВКС</option>
              <option value="Работа у ЮЛ/ИП">Работа у ЮЛ/ИП</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formValidTerritories">
            <Form.Label>Valid Territories:</Form.Label>
            <Form.Control
              type="text"
              name="ValidTerritories"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>{t.issuedBy}:</Form.Label>
            <Form.Control
              type="text"
              name="Issued_by"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formRegisterSerialNumber">
            <Form.Label>Register Serial Number:</Form.Label>
            <Form.Control
              type="text"
              name="Register_Serial_number"
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
    const employeeId = parseInt(id, 10);
    const docTypeEn = parseInt(15, 10);
    const docSerie = parseInt(formElements.DocumentSerie.value, 10);
    const documentNo = parseInt(formElements.DocumentNo.value, 10);

    formData.append("DocumentSerie", docSerie);
    formData.append("DocumentNo", documentNo);
    formData.append("IssueDate", formattedIssueDate);
    formData.append("ValidityDate", formattedValidityDate);
    formData.append("Doc_Type_En", docTypeEn);
    formData.append("Employee", employeeId);
    formData.append("Job_Title", formElements.Job_Title.value);
    formData.append("SpecialMarks", formElements.SpecialMarks.value);
    formData.append("ValidTerritories", formElements.ValidTerritories.value);
    formData.append("Issued_by", formElements.Issued_by.value);
    formData.append(
      "Register_Serial_number",
      formElements.Register_Serial_number.value
    );
    formData.append("Type", "Patent");

    try {
      const response = await fetch(`${urlLink}/employee/patent/`, {
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
          "New patent information added successfully!",
          "success"
        );
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        swal(
          "Error",
          errorData.message || "Failed to add patent information",
          "error"
        );
      }
    } catch (error) {
      console.error("Catch Error:", error);
      swal("Error", error.message, "error");
    }
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };
  return (
    <div className="faq-container2">
      <div onClick={() => handleToggle("patent")} className="faq__t-wrapper">
        <h5 className="toggle-title">{t.patentInformation}</h5>
        <p className="faq__header-seria">
          {data?.Patent && data?.Patent.length > 0
            ? `${data?.Patent[0].Register_Serial_number}`
            : t.noPatentInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "patent" ? "open" : ""
        }`}
      >
        {data?.Patent && data?.Patent.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.patent}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.issuedBy}</p>
                <p className="faq__country-code">{data?.Patent[0].Issued_by}</p>
              </div>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.documentNumber}</p>
                <p className="faq__country-code">{data?.Patent[0].DocumentNo}</p>
              </div>
            </div>
            <div className=" faq__patent-wrapper">
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">{t.nameSurname}:</span>{" "}
                  <p className="field__data">
                    {data?.Patent[0].Employee_data.firstname}{" "}
                    {data?.Patent[0].Employee_data.surname}
                  </p>
                </div>
                <div className="faq__patentWrapper">
                  <div className="faq-field">
                    <span className="field-label">{t.jobTitle}:</span>{" "}
                    <p className="field__data">{data?.Patent[0].Job_Title}</p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">Special Marks:</span>{" "}
                    <p className="field__data">{data?.Patent[0].SpecialMarks}</p>
                  </div>
                </div>
                <div className="faq-field">
                  <span className="field-label">Valid Territories:</span>{" "}
                  <p className="field__data">
                    {data?.Patent[0].ValidTerritories}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.registerSerialNumber}:</span>{" "}
                  <p className="field__data">
                    {data?.Patent[0].Register_Serial_number}
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
                    Add Patent
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

export default PatentFAQ;
