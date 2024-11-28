import React, { useState } from "react";
import "../styles.css";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";

const MigrFAQ = ({
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
        <h3>Add Migration Information</h3>
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

          <Form.Group controlId="formFrom">
            <Form.Label>From Date:</Form.Label>
            <Form.Control
              type="date"
              name="From"
              className="add__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formTo">
            <Form.Label>To Date:</Form.Label>
            <Form.Control
              type="date"
              name="To"
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
              required
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentNo"
              className="add__input"
              required
            />
          </Form.Group>

          <Form.Group controlId="formVisitPurpose">
            <Form.Label>Visit Purpose:</Form.Label>
            <Form.Control
              as="select"
              name="VisitPurpose"
              className="add__input"
              required
            >
              <option value="Служебный/ Official">Служебный/ Official</option>
              <option value="Туризм/ Tourism">Туризм/ Tourism</option>
              <option value="Коммерческий/ Business">
                Коммерческий/ Business
              </option>
              <option value="Учеба/ Education">Учеба/ Education</option>
              <option value="Работа/ Employment">Работа/ Employment</option>
              <option value="Частный/ Private">Частный/ Private</option>
              <option value="Транзит/ Transit">Транзит/ Transit</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBorderCheckpoint">
            <Form.Label>Border Checkpoint:</Form.Label>
            <Form.Control
              type="text"
              name="BorderCheckpoint"
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
      Doc_Type_En: parseInt(7, 10),
      Employee: parseInt(id, 10),
      From: formatDateForInput(formElements.From.value),
      To: formatDateForInput(formElements.To.value),
      IssueDate: formatDateForInput(formElements.IssueDate.value),
      DocumentSerie: parseInt(formElements.DocumentSerie.value, 10),
      DocumentNo: parseInt(formElements.DocumentNo.value, 10),
      VisitPurpose: formElements.VisitPurpose.value,
      BorderCheckpoint: formElements.BorderCheckpoint.value,
    };

    console.log("Add Payload:", payload);

    try {
      const response = await fetch(`${urlLink}/employee/migr-card/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        swal("Success", "Migration information added successfully!", "success");
        handleCloseWindow();
        handleUpdate(); // Trigger update to refresh the list
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(
          errorData.message || "Failed to add migration information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit Migration Information</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formIssueDate">
            <Form.Label>Issue Date:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              className="edit__input"
              defaultValue={formatDateToShow(data?.MigrCard[0]?.IssueDate)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFrom">
            <Form.Label>From Date:</Form.Label>
            <Form.Control
              type="date"
              name="From"
              className="edit__input"
              defaultValue={formatDateToShow(data?.MigrCard[0]?.From)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTo">
            <Form.Label>To Date:</Form.Label>
            <Form.Control
              type="date"
              name="To"
              className="edit__input"
              defaultValue={formatDateToShow(data?.MigrCard[0]?.To)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDocumentSerie">
            <Form.Label>Document Serie:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentSerie"
              className="edit__input"
              defaultValue={data?.MigrCard[0]?.DocumentSerie}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDocumentNo">
            <Form.Label>Document Number:</Form.Label>
            <Form.Control
              type="number"
              name="DocumentNo"
              className="edit__input"
              defaultValue={data?.MigrCard[0]?.DocumentNo}
              required
            />
          </Form.Group>

          <Form.Group controlId="formVisitPurpose">
            <Form.Label>Visit Purpose:</Form.Label>
            <Form.Control
              as="select"
              name="VisitPurpose"
              className="edit__input"
              defaultValue={data?.MigrCard[0]?.VisitPurpose}
              required
            >
              <option value="Служебный/ Official">Служебный/ Official</option>
              <option value="Туризм/ Tourism">Туризм/ Tourism</option>
              <option value="Коммерческий/ Business">
                Коммерческий/ Business
              </option>
              <option value="Учеба/ Education">Учеба/ Education</option>
              <option value="Работа/ Employment">Работа/ Employment</option>
              <option value="Частный/ Private">Частный/ Private</option>
              <option value="Транзит/ Transit">Транзит/ Transit</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBorderCheckpoint">
            <Form.Label>Border Checkpoint:</Form.Label>
            <Form.Control
              type="text"
              name="BorderCheckpoint"
              className="edit__input"
              defaultValue={data?.MigrCard[0]?.BorderCheckpoint}
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
    const formData = new FormData();
    const formElements = e.target.elements;
    const employeeId = parseInt(id, 10);

    // Append form data
    formData.append(
      "IssueDate",
      formatDateForInput(formElements.IssueDate.value)
    );
    formData.append("From", formatDateForInput(formElements.From.value));
    formData.append("To", formatDateForInput(formElements.To.value));
    formData.append("DocumentSerie", formElements.DocumentSerie.value);
    formData.append("DocumentNo", formElements.DocumentNo.value);
    formData.append("VisitPurpose", formElements.VisitPurpose.value);
    formData.append("BorderCheckpoint", formElements.BorderCheckpoint.value);
    formData.append("Employee", employeeId);

    try {
      const response = await fetch(
        `${urlLink}/employee/migr-card/${data?.MigrCard[0].id}/`,
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
          "Migration information updated successfully!",
          "success"
        );
        handleCloseWindow();
        handleUpdate();
      } else {
        // Log raw response text
        const errorText = await response.text();
        console.error("Raw error response from server:", errorText);

        // Attempt to parse the error response as JSON
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          errorData = { message: "Unable to parse error response" };
        }

        // Display detailed error message
        const errorMessage =
          errorData?.message || "Failed to update migration information";

        // Display detailed error message to the user
        swal("Error", `Error: ${errorMessage}`, "error");
      }
    } catch (error) {
      console.error("Error in the request:", error);
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
    <div className="faq-container6">
      <div onClick={() => handleToggle("migrInfo")} className="faq__t-wrapper">
        <h5 className="toggle-title">{t.migrationInformation}</h5>
        <p className="faq__header-seria">
          {data?.MigrCard && data?.MigrCard.length > 0
            ? data?.MigrCard[0].IssueDate
            : t.noMigrationInformation}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "migrInfo" ? "open" : ""
        }`}
      >
        {data?.MigrCard && data?.MigrCard.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.migrationCard}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.issueDate}</p>
                <p className="faq__country-code">
                  {data?.MigrCard[0].IssueDate}
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
                  <span className="field-label">Border Checkpoint:</span>
                  <p className="field__data">
                    {data?.MigrCard[0].BorderCheckpoint}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">Visit Purpose:</span>
                  <p className="field__data">{data?.MigrCard[0].VisitPurpose}</p>
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
                    Add Migration Information
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

export default MigrFAQ;
