import React, { useState } from "react";
import "../styles.css";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";

const FingerPrintFAQ = ({
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

  const handleDocumentSerieInput = (e) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  };

  const handleDocumentNoInput = (e) => {
    if (e.target.value.length > 7) {
      e.target.value = e.target.value.slice(0, 7);
    }
  };

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add Daktil Record</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="add__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="add__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentSerie"
              className="add__input"
              min="10"
              onInput={handleDocumentSerieInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentNo"
              className="add__input"
              min="1000000"
              max="9999999"
              onInput={handleDocumentNoInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="IssuedBy"
              className="add__input"
              required
            />
          </Form.Group>

          <div className="add__btn-wrapper">
            <Button className="add__btn" type="submit">
              Add
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
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      DocumentSerie: parseInt(formElements.DocumentSerie.value, 10),
      DocumentNo: parseInt(formElements.DocumentNo.value, 10),
      IssuedBy: formElements.IssuedBy.value,
      Employee: parseInt(id, 10),
      Doc_Type_En: parseInt(3, 10),
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(`${urlLink}/employee/daktil/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        swal("Success", "Daktil record added successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        let errorData;
        try {
          const errorText = await response.text();
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          errorData = { message: "Unable to parse error response" };
        }

        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to add Daktil record");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit Daktil Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
              defaultValue={formatDateToShow(data?.Daktil[0]?.IssueDate)}
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
              defaultValue={formatDateToShow(data?.Daktil[0]?.ValidityDate)}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentSerie"
              className="edit__input"
              defaultValue={data?.Daktil[0]?.DocumentSerie}
              min="10"
              required
              onInput={handleDocumentSerieInput}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
              min="1000000"
              required
              defaultValue={data?.Daktil[0]?.DocumentNo}
              onInput={handleDocumentNoInput}
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="IssuedBy"
              className="edit__input"
              defaultValue={data?.Daktil[0]?.IssuedBy}
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

    // Validate DocumentSerie and DocumentNo
    const documentSerie = parseInt(formElements.DocumentSerie.value, 10);
    const documentNo = parseInt(formElements.DocumentNo.value, 10);

    if (documentSerie < 10) {
      swal("Error", "Document Serie must be at least 10.", "error");
      return;
    }

    if (documentNo < 1000000 || documentNo > 9999999) {
      swal(
        "Error",
        "Document Number must be between 1000000 and 9999999.",
        "error"
      );
      return;
    }

    const payload = {
      IssueDate: formatDateForInput(formElements.IssueDate.value),
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      DocumentSerie: documentSerie,
      DocumentNo: documentNo,
      IssuedBy: formElements.IssuedBy.value,
      Employee: parseInt(id, 10), // Assuming `id` is the employee's ID
      Doc_Type_En: parseInt(3, 10),
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(
        `${urlLink}/employee/daktil/${data?.Daktil[0].id}/`, // URL to update specific `daktil`
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
        swal("Success", "Daktil information updated successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(
          errorData.message || "Failed to update daktil information"
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
    <div className="faq-container9">
      <div
        onClick={() => handleToggle("fingerprinting")}
        className="faq__t-wrapper"
      >
        <h5 className="toggle-title">{t.fingerprintingInformation}</h5>
        <p className="faq__header-seria">
          {data?.Daktil && data?.Daktil.length > 0
            ? data?.Daktil[0].DocumentNo
            : t.noFingerprintingInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "fingerprinting" ? "open" : ""
        }`}
      >
        {data?.Daktil && data?.Daktil.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.fingerprinting}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.documentNumber}</p>
                <p className="faq__country-code">
                  {data?.Daktil[0].DocumentSerie}
                  {data?.Daktil[0].DocumentNo}
                </p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">Full Name:</span>
                  <p className="field__data">
                    {employee.firstname} {employee.surname}
                  </p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">Issue Date:</span>
                    <p className="field__data">{data?.Daktil[0]?.IssueDate}</p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">Validity Date:</span>
                    <p className="field__data">
                      {data?.Daktil[0]?.ValidityDate}
                    </p>
                  </div>
                </div>
                <div className="faq-field">
                  <span className="field-label">Issued By:</span>
                  <p className="field__data">{data?.Daktil[0]?.IssuedBy}</p>
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
                    Add FingerPrint Information
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

export default FingerPrintFAQ;
