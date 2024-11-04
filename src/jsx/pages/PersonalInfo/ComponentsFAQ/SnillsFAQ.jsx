import React, { useState } from "react";
import "../styles.css";
import swal from "sweetalert";
import { Button, Form } from "react-bootstrap";

const SnillsFAQ = ({
  data,
  openSection,
  handleToggle,
  t,
  id,
  token,
  dataFilter,
  employee,
  handleUpdate,
}) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowContent, setWindowContent] = useState("");
  const urlLink = process.env.REACT_APP_API_URL;

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit SNILS Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document No (SNILS Format):</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              defaultValue={formatDocumentNo(data.Snils[0]?.DocumentNo || "")}
              className="edit__input"
              required
              maxLength={14} // Max length for SNILS format
              onInput={handleInputMask} // Mask the input dynamically
              placeholder="XXX-XXX-XXX XX"
              pattern="\d{3}-\d{3}-\d{3} \d{2}" // Validation pattern
              title="Please enter the SNILS in the format XXX-XXX-XXX XX" // Tooltip guidance
            />
            <Form.Text className="text-muted">
              Format: XXX-XXX-XXX XX (e.g., 123-456-789 01)
            </Form.Text>
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

  const formatDocumentNo = (value) => {
    if (!value) return "";

    const digits = value.replace(/\D/g, "");

    let formattedValue = "";

    if (digits.length <= 3) {
      formattedValue = digits;
    } else if (digits.length <= 6) {
      formattedValue = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length <= 9) {
      formattedValue = `${digits.slice(0, 3)}-${digits.slice(
        3,
        6
      )}-${digits.slice(6)}`;
    } else if (digits.length <= 11) {
      formattedValue = `${digits.slice(0, 3)}-${digits.slice(
        3,
        6
      )}-${digits.slice(6, 9)} ${digits.slice(9)}`;
    } else {
      formattedValue = `${digits.slice(0, 3)}-${digits.slice(
        3,
        6
      )}-${digits.slice(6, 9)} ${digits.slice(9, 11)}`;
    }

    return formattedValue;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formElements = e.target.elements;
    const docTypeEn = parseInt(14, 10);

    formData.append("Doc_Type_En", docTypeEn);
    formData.append("DocumentNo", formElements.DocumentNo.value);

    try {
      const response = await fetch(
        `${urlLink}/employee/snils/${data.Snils[0]?.id}/`,
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
        swal("Success", "INN information updated successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        // Handle non-OK responses
        const responseText = await response.text();
        console.error("Server Error Response:", responseText);
        swal(
          "Error",
          "Failed to update INN information. Please check the server logs for details.",
          "error"
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      swal("Error", error.message || "Unexpected error occurred", "error");
    }
  };

  const handleInputMask = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    value = value.slice(0, 11); // Limit to 11 digits

    // Format the value to SNILS format: XXX-XXX-XXX XX
    if (value.length > 3) value = `${value.slice(0, 3)}-${value.slice(3)}`;
    if (value.length > 7) value = `${value.slice(0, 7)}-${value.slice(7)}`;
    if (value.length > 11) value = `${value.slice(0, 11)} ${value.slice(11)}`;

    e.target.value = value; // Update input value
  };

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add New SNILS Information</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document No (SNILS Format):</Form.Label>
            <Form.Control
              type="text"
              name="DocumentNo"
              className="edit__input"
              required
              maxLength={14}
              onInput={handleInputMask}
              placeholder="XXX-XXX-XXX XX"
              title="Please enter the SNILS in the format XXX-XXX-XXX XX"
            />
            <Form.Text className="text-muted">
              Format: XXX-XXX-XXX XX (e.g., 123-456-789 01)
            </Form.Text>
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

    const employeeId = parseInt(id, 10);
    const docTypeEn = parseInt(14, 10);

    formData.append("DocumentNo", formElements.DocumentNo.value);
    formData.append("Employee", employeeId);
    formData.append("Doc_Type_En", docTypeEn);

    console.log("FormData Payload:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${urlLink}/employee/snils/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        swal("Success", "INN information added successfully!", "success");
        handleCloseWindow();
        handleUpdate();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Log the detailed error response
        swal(
          "Error",
          errorData.message || "Failed to add INN information",
          "error"
        );
      }
    } catch (error) {
      console.error("Fetch error:", error); // Log general fetch errors
      swal("Error", error.message || "Unexpected error occurred", "error");
    }
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  return (
    <div className="faq-container3">
      <div onClick={() => handleToggle("snils")} className="faq__t-wrapper">
        <h5 className="toggle-title">SNILS Information</h5>
        <p className="faq__header-seria">
          {data.Snils && data.Snils.length > 0
            ? data.Snils[0].DocumentNo
            : "No SNILS information"}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "snils" ? "open" : ""
        }`}
      >
        {data.Snils && data.Snils.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.inn}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.documentNumber}</p>
                <p className="faq__country-code">{data.Snils[0].DocumentNo}</p>
              </div>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.documentType}</p>
                <p className="faq__country-code">
                  {data.Snils[0].Doc_Type_En_data.Doc_Type_En}
                </p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div className="faq__info faq__inn">
                <div className="faq-field">
                  <span className="field-label">{t.nameSurname}:</span>
                  <p className="field__data">
                    {employee?.firstname} {employee?.surname}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.employeeNumber}:</span>
                  <p className="field__data">
                    {data.Snils[0].Employee_data.personnel_number}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.address}:</span>
                  <p className="field__data">
                    {employee?.address || "There is no address available"}
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
                    Add Snils
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

export default SnillsFAQ;
