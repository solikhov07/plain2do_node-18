import React, { useState } from "react";
import "../styles.css";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";

const PermitFAQ = ({
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
        <h3>Add New VnjRvp Record</h3>
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
          <Form.Group controlId="formDecisionDate">
            <Form.Label>Decision Date:</Form.Label>
            <Form.Control
              type="date"
              name="DecisionDate"
              className="add__input"
              required
            />
          </Form.Group>
          <Form.Group controlId="formDecisionNumber">
            <Form.Label>Decision Number:</Form.Label>
            <Form.Control
              type="text"
              name="DecisionNumber"
              className="add__input"
              onChange={handleDecisionNumberChange}
              required
            />
            <Form.Text className="text-muted">
              Format: '1234/2024/50' or 'No'
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentSerie"
              className="add__input"
              onChange={handleDocumentSerieChange}
              required
            />
            <Form.Text className="text-muted">
              Enter a 2-digit number or "No"
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="add__input"
              onChange={handleDocumentNoChange}
              required
            />
            <Form.Text className="text-muted">
              Format: '1234567' or '12345/12'
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formValidTerritories">
            <Form.Label>Valid Territories:</Form.Label>
            <Form.Control
              type="text"
              name="ValidTerritories"
              className="add__input"
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

  const handleDecisionNumberChange = (e) => {
    const value = e.target.value;
    // Apply mask or format
    const formattedValue = value.replace(/[^0-9\/]/g, "").slice(0, 12);
    e.target.value = formattedValue;
  };

  const handleDocumentSerieChange = (e) => {
    const value = e.target.value;
    // Apply mask or format
    const formattedValue = value.replace(/[^0-9]/g, "").slice(0, 2);
    e.target.value = formattedValue;
  };

  const handleDocumentNoChange = (e) => {
    const value = e.target.value;
    // Apply mask or format
    const formattedValue = value.replace(/[^0-9\/]/g, "").slice(0, 9);
    e.target.value = formattedValue;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    const decisionNumber = formElements.DecisionNumber.value;
    const documentSerie = formElements.DocumentSerie.value;
    const documentNo = formElements.DocumentNo.value;

    // Additional validation if needed
    if (!/^(\d{4}\/\d{4}\/\d{2}|No)$/.test(decisionNumber)) {
      swal(
        "Error",
        "Decision Number must be in format '1234/2024/50' or 'No'.",
        "error"
      );
      return;
    }

    if (!/^(No|\d{2})$/.test(documentSerie)) {
      swal(
        "Error",
        "Document Series must be either 'No' or a 2-digit number.",
        "error"
      );
      return;
    }

    if (!/^(No|\d{7}|\d{5}\/\d{2})$/.test(documentNo)) {
      swal(
        "Error",
        "Document No must be either a 7-digit number or in the format '12345/12'.",
        "error"
      );
      return;
    }

    const payload = {
      IssueDate: formatDateForInput(formElements.IssueDate.value),
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      DecisionDate: formatDateForInput(formElements.DecisionDate.value),
      DecisionNumber: decisionNumber,
      DocumentSerie: documentSerie,
      DocumentNo: documentNo,
      ValidTerritories: formElements.ValidTerritories.value,
      IssuedBy: formElements.IssuedBy.value,
      Employee: parseInt(id, 10),
      Doc_Type_En: parseInt(1, 10), // Update this value as needed
    };

    try {
      const response = await fetch(`${urlLink}/employee/VnjRvp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        swal("Success", "VnjRvp record added successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        // Check if the response is JSON and handle it accordingly
        let errorData;
        try {
          const errorText = await response.text();
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          errorData = { message: "Unable to parse error response" };
        }

        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to add VnjRvp record");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleEditClick = (record) => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit VnjRvp Record</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              defaultValue={formatDateToShow(data.VnjRvp[0]?.IssueDate) || ""}
              className="edit__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              defaultValue={
                formatDateToShow(data.VnjRvp[0]?.ValidityDate) || ""
              }
              className="edit__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDecisionDate">
            <Form.Label>Decision Date:</Form.Label>
            <Form.Control
              type="date"
              name="DecisionDate"
              defaultValue={
                formatDateToShow(data.VnjRvp[0]?.DecisionDate) || ""
              }
              className="edit__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDecisionNumber">
            <Form.Label>Decision Number:</Form.Label>
            <Form.Control
              type="text"
              name="DecisionNumber"
              defaultValue={data.VnjRvp[0]?.DecisionNumber}
              className="edit__input"
              onChange={handleDecisionNumberChange}
              required
            />
            <Form.Text className="text-muted">
              Format: '1234/2024/50' or 'No'
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentSerie"
              defaultValue={data.VnjRvp[0]?.DocumentSerie}
              className="edit__input"
              onChange={handleDocumentSerieChange}
              required
            />
            <Form.Text className="text-muted">
              Enter a 2-digit number or "No"
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              defaultValue={data.VnjRvp[0]?.DocumentNo}
              className="edit__input"
              onChange={handleDocumentNoChange}
              required
            />
            <Form.Text className="text-muted">
              Format: '1234567' or '12345/12'
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formValidTerritories">
            <Form.Label>Valid Territories:</Form.Label>
            <Form.Control
              type="text"
              name="ValidTerritories"
              defaultValue={data.VnjRvp[0]?.ValidTerritories}
              className="edit__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="IssuedBy"
              defaultValue={data.VnjRvp[0]?.IssuedBy}
              className="edit__input"
              required
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

    const decisionNumber = formElements.DecisionNumber.value;
    const documentSerie = formElements.DocumentSerie.value;
    const documentNo = formElements.DocumentNo.value;

    // Additional validation if needed
    if (!/^(\d{4}\/\d{4}\/\d{2}|No)$/.test(decisionNumber)) {
      swal(
        "Error",
        "Decision Number must be in format '1234/2024/50' or 'No'.",
        "error"
      );
      return;
    }

    if (!/^(No|\d{2})$/.test(documentSerie)) {
      swal(
        "Error",
        "Document Series must be either 'No' or a 2-digit number.",
        "error"
      );
      return;
    }

    if (!/^(No|\d{7}|\d{5}\/\d{2})$/.test(documentNo)) {
      swal(
        "Error",
        "Document No must be either a 7-digit number or in the format '12345/12'.",
        "error"
      );
      return;
    }

    const payload = {
      IssueDate: formatDateForInput(formElements.IssueDate.value),
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      DecisionDate: formatDateForInput(formElements.DecisionDate.value),
      DecisionNumber: decisionNumber,
      DocumentSerie: documentSerie,
      DocumentNo: documentNo,
      ValidTerritories: formElements.ValidTerritories.value,
      IssuedBy: formElements.IssuedBy.value,
      Employee: parseInt(id, 10),
      Doc_Type_En: parseInt(1, 10),
    };

    try {
      const response = await fetch(
        `${urlLink}/employee/VnjRvp/${data.VnjRvp[0].id}/`, // Replace `recordId` with the actual ID of the record being edited
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
        swal("Success", "VnjRvp record updated successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        // Check if the response is JSON and handle it accordingly
        let errorData;
        try {
          const errorText = await response.text();
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          errorData = { message: "Unable to parse error response" };
        }

        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to update VnjRvp record");
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
    <div className="faq-container8">
      <div
        onClick={() => handleToggle("residencePermit")}
        className="faq__t-wrapper"
      >
        <h5 className="toggle-title">{t.residencePermitInformation}</h5>
        <p className="faq__header-seria">
          {data.VnjRvp && data.VnjRvp.length > 0
            ? data.VnjRvp[0].IssueDate
            : t.noResidencePermitInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "residencePermit" ? "open" : ""
        }`}
      >
        {data.VnjRvp && data.VnjRvp.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.residencePermit}</p>

              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">Document No</p>
                <p className="faq__country-code">
                  {data.VnjRvp[0]?.DocumentNo}
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
                <div className="faq-field">
                  <span className="field-label">Issued By:</span>
                  <p className="field__data">{data.VnjRvp[0]?.IssuedBy}</p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">Valid Territories:</span>
                    <p className="field__data">
                      {data.VnjRvp[0]?.ValidTerritories}
                    </p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">Valid Date:</span>
                    <p className="field__data">
                      {data.VnjRvp[0]?.ValidityDate}
                    </p>
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
                    Add Residence Permit Information
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

export default PermitFAQ;
