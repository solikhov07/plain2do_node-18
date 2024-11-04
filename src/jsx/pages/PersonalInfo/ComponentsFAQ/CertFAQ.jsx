import React, { useState } from "react";
import "../styles.css";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";

const CertFAQ = ({
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
        <h3>Add New RL Certification</h3>
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

          <Form.Group controlId="formDocumenNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formPlaceOfIssue">
            <Form.Label>Place of Issue:</Form.Label>
            <Form.Control
              type="text"
              name="PlaceOfIssue"
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
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      Doc_Type_En: parseInt(13, 10),
      Employee: parseInt(id, 10),
      DocumentNo: formElements.DocumentNo.value,
      PlaceOfIssue: formElements.PlaceOfIssue.value,
      IssuedBy: formElements.IssuedBy.value,
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(`${urlLink}/employee/RusLCert/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        swal("Success", "RL certification added successfully!", "success");
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
        throw new Error(errorData.message || "Failed to add RL certification");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit RL Certification</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
              defaultValue={formatDateToShow(data.RusLCert[0]?.IssueDate)}
            />
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>Validity Date:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              className="edit__input"
              defaultValue={formatDateToShow(data.RusLCert[0]?.ValidityDate)}
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
              defaultValue={data.RusLCert[0]?.DocumentNo}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceOfIssue">
            <Form.Label>Place of Issue:</Form.Label>
            <Form.Control
              type="text"
              name="PlaceOfIssue"
              className="edit__input"
              defaultValue={data.RusLCert[0]?.PlaceOfIssue}
            />
          </Form.Group>

          <Form.Group controlId="formIssuedBy">
            <Form.Label>Issued By:</Form.Label>
            <Form.Control
              type="text"
              name="IssuedBy"
              className="edit__input"
              defaultValue={data.RusLCert[0]?.IssuedBy}
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
      ValidityDate: formatDateForInput(formElements.ValidityDate.value),
      Doc_Type_En: parseInt(13, 10), // Assuming default or specific Doc_Type_En value
      Employee: parseInt(id, 10), // Ensure employee ID is an integer
      DocumentNo: formElements.DocumentNo.value,
      PlaceOfIssue: formElements.PlaceOfIssue.value,
      IssuedBy: formElements.IssuedBy.value,
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(
        `${urlLink}/employee/RusLCert/${data.RusLCert[0].id}/`,
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
        swal("Success", "RL certification updated successfully!", "success");
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
        throw new Error(
          errorData.message || "Failed to update RL certification"
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
    <div className="faq-container7">
      <div
        onClick={() => handleToggle("certifications")}
        className="faq__t-wrapper"
      >
        <h5 className="toggle-title">{t.certificationsInformation}</h5>
        <p className="faq__header-seria">
          {data.RusLCert && data.RusLCert.length > 0
            ? data.RusLCert[0].IssueDate
            : t.noCertificationsInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "certifications" ? "open" : ""
        }`}
      >
        {data.RusLCert && data.RusLCert.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.certifications}</p>
              <span className="faq__line"></span>

              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.validityDate}</p>
                <p className="faq__country-code">
                  {data.RusLCert[0].ValidityDate}
                </p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">Full Name:</span>
                  <p className="field__data">
                    {employee?.firstname} {employee?.surname}
                  </p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">Issue By:</span>
                    <p className="field__data">{data.RusLCert[0].IssuedBy}</p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">Place of Issue:</span>
                    <p className="field__data">
                      {data.RusLCert[0].PlaceOfIssue}
                    </p>
                  </div>
                </div>
                <div className="faq-field">
                  <span className="field-label">Issue date:</span>
                  <p className="field__data">{data.RusLCert[0].IssueDate}</p>
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
                    Add RL Certificate
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

export default CertFAQ;
