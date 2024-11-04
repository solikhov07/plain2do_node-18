import React, { useEffect, useState } from "react";
import "../styles.css";
import swal from "sweetalert";
import { Row, Col, Form, Button, Navbar, Nav } from "react-bootstrap";
import { fetchCountries } from "../../../components/apiData/apiData";
import accountImg from "../../../../images/account.jpg";

const PassportFAQ = ({
  data = { Passport: [] },
  openSection,
  handleToggle,
  t,
  alphaCode,
  token,
  handleUpdate,
  id,
  dataFilter,
}) => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowContent, setWindowContent] = useState(null);
  const [countries, setCountries] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries(token);
      setCountries(data);
    };

    getCountries();
  }, [token]);

  const formatDateForInput = (dateString) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const handlePdfClick = () => {
    const imageContent = (
      <img
        className="sliding-image"
        src={
          data.Passport[0].Employee_data.photo
            ? data.Passport[0].Employee_data.photo
            : accountImg
        }
        alt="PDF Image"
      />
    );
    setWindowContent(imageContent);
    setIsWindowOpen(true);
  };

  const handleEditClick = () => {
    const editContent = (
      <div className="edit-form">
        <h3>Edit Passport Information</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCitizenshipData">
            <Form.Label>{t.nationality}:</Form.Label>
            <Form.Control
              as="select"
              name="citizenship"
              defaultValue={data.Passport[0]?.citizenship_data?.id || ""}
              className="edit__input"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.CountryEN}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formIssuedByData">
            <Form.Label>{t.issuedBy}:</Form.Label>
            <Form.Control
              as="select"
              name="IssuedBy"
              defaultValue={data.Passport[0]?.IssuedBy_data?.id || ""}
              className="edit__input"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.CountryEN}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formPassportSerie">
            <Form.Label>Passport Serie:</Form.Label>
            <Form.Control
              type="text"
              name="PassportSerie"
              defaultValue={data.Passport[0]?.PassportSerie || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formPassportNumber">
            <Form.Label>Passport Number:</Form.Label>
            <Form.Control
              type="text"
              name="PassportNumber"
              defaultValue={data.Passport[0]?.PassportNumber || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formCountryPersNo">
            <Form.Label>Country Pers Number:</Form.Label>
            <Form.Control
              type="text"
              name="CountryPersNo"
              defaultValue={data.Passport[0]?.CountryPersNo || ""}
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formLetter">
            <Form.Label>Letter:</Form.Label>
            <Form.Control
              as="select"
              name="Letter"
              defaultValue={data.Passport[0]?.Letter || ""}
              className="edit__input"
            >
              <option value="Latin">Latin</option>
              <option value="Cyrillic">Cyrillic</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>{t.dateOfExpiry}:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              defaultValue={
                formatDateForInput(data.Passport[0]?.ValidityDate) || ""
              }
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssueDate">
            <Form.Label>{t.dateOfIssue}:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              defaultValue={
                formatDateForInput(data.Passport[0]?.IssueDate) || ""
              }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const formElements = e.target.elements;

    formData.append("citizenship", formElements.citizenship.value);
    formData.append("IssuedBy", formElements.IssuedBy.value);
    formData.append("PassportSerie", formElements.PassportSerie.value);
    formData.append("PassportNumber", formElements.PassportNumber.value);
    formData.append("CountryPersNo", formElements.CountryPersNo.value);
    formData.append("Letter", formElements.Letter.value);

    const formattedValidityDate = new Date(formElements.ValidityDate.value)
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");
    const formattedIssueDate = new Date(formElements.IssueDate.value)
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");

    formData.append("ValidityDate", formattedValidityDate);
    formData.append("IssueDate", formattedIssueDate);

    try {
      const response = await fetch(
        `${urlLink}/employee/passport/${data.Passport[0]?.id}/`,
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
          "Passport information updated successfully!",
          "success"
        );
        handleCloseWindow();
        handleUpdate(); // Trigger a re-fetch after a successful update
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update passport information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleAddClick = () => {
    const addContent = (
      <div className="edit-form">
        <h3>Add New Passport Information</h3>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formCitizenshipData">
            <Form.Label>{t.nationality}:</Form.Label>
            <Form.Control
              as="select"
              name="citizenship"
              defaultValue=""
              className="edit__input"
            >
              <option value="" disabled>
                Select Nationality
              </option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.CountryEN}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formIssuedByData">
            <Form.Label>{t.issuedBy}:</Form.Label>
            <Form.Control
              as="select"
              name="IssuedBy"
              defaultValue=""
              className="edit__input"
            >
              <option value="" disabled>
                Select Issued By
              </option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.CountryEN}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formPassportSerie">
            <Form.Label>Passport Serie:</Form.Label>
            <Form.Control
              type="text"
              name="PassportSerie"
              defaultValue=""
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formPassportNumber">
            <Form.Label>Passport Number:</Form.Label>
            <Form.Control
              type="text"
              name="PassportNumber"
              defaultValue=""
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formCountryPersNo">
            <Form.Label>Country Pers Number:</Form.Label>
            <Form.Control
              type="text"
              name="CountryPersNo"
              defaultValue=""
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formLetter">
            <Form.Label>Letter:</Form.Label>
            <Form.Control
              as="select"
              name="Letter"
              defaultValue="Latin"
              className="edit__input"
            >
              <option value="Latin">Latin</option>
              <option value="Cyrillic">Cyrillic</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formValidityDate">
            <Form.Label>{t.dateOfExpiry}:</Form.Label>
            <Form.Control
              type="date"
              name="ValidityDate"
              defaultValue=""
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formIssueDate">
            <Form.Label>{t.dateOfIssue}:</Form.Label>
            <Form.Control
              type="date"
              name="IssueDate"
              defaultValue=""
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

    formData.append("citizenship", formElements.citizenship.value);
    formData.append("IssuedBy", formElements.IssuedBy.value);
    formData.append("DocumentTypeData", 8);
    formData.append("PassportSerie", formElements.PassportSerie.value);
    formData.append("PassportNumber", formElements.PassportNumber.value);
    formData.append("CountryPersNo", formElements.CountryPersNo.value);
    formData.append("Letter", formElements.Letter.value);
    formData.append("Employee", id);

    const formattedValidityDate = new Date(formElements.ValidityDate.value)
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");
    const formattedIssueDate = new Date(formElements.IssueDate.value)
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");

    formData.append("ValidityDate", formattedValidityDate);
    formData.append("IssueDate", formattedIssueDate);

    try {
      const response = await fetch(`${urlLink}/employee/passport/`, {
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
          "New passport information added successfully!",
          "success"
        );
        handleCloseWindow();
        handleUpdate(); // Trigger a re-fetch after a successful addition
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to add passport information"
        );
      }
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  return (
    <div className={`faq-container1 ${alphaCode}-bg table-responsive`}>
      <div onClick={() => handleToggle("passport")} className="faq__t-wrapper">
        <h5 className="toggle-title">{t.passportInformation}</h5>
        <p className="faq__header-seria">
          {data.Passport && data.Passport.length > 0 ? (
            <>{data.Passport[0].PassportNumber}</>
          ) : (
            t.noPassportInformation
          )}
        </p>
      </div>
      <div
        className={`collapsible-content ${
          openSection === "passport" ? "open" : ""
        }`}
      >
        {data.Passport && data.Passport.length > 0 ? (
          <div className="faq-details">
            <div className="faq__top-wrapper">
              <p className="faq__section-title">{t.passport}</p>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.countryCode}</p>
                <p className="faq__country-code">
                  {data.Passport[0].IssuedBy_data.AlphaCode3}
                </p>
              </div>
              <span className="faq__line"></span>
              <div className="faq__wrapper">
                <p className="faq__topsubheader">{t.passportNumber}</p>
                <p className="faq__country-code">
                  {data.Passport[0].PassportNumber}
                </p>
              </div>
            </div>
            <div className="faq__main-wrapper">
              <div className="d-flex flex-column align-items-center">
                <img
                  className="faq-photo"
                  src={
                    data.Passport[0].Employee_data.photo
                      ? data.Passport[0].Employee_data.photo
                      : accountImg
                  }
                  alt={t.passportPhotoAlt}
                />

                {dataFilter === "latest" ? (
                  <div className="faq__functions-wrapper">
                    <button
                      className="btn btn-secondary faq__edit-btn p-2 pe-3 ps-3"
                      onClick={handleEditClick}
                    >
                      <i className="fa fa-pencil"></i> Edit
                    </button>

                    <button
                      className=" btn btn-secondary faq__pdf-btn p-2 pe-3 ps-3 me-1 ms-1"
                      onClick={handlePdfClick}
                    >
                      PDF
                    </button>

                    <button
                      className="btn btn-secondary faq__edit-btn p-2 pe-3 ps-3"
                      onClick={handleAddClick}
                    >
                      <i className="flaticon-067-plus"></i> Add
                    </button>
                  </div>
                ) : (
                  <div className="faq__functions-wrapper">
                    <button
                      className="btn btn-secondary faq__edit-btn p-2 pe-3 ps-3"
                      onClick={handleEditClick}
                    >
                      <i className="fa fa-pencil"></i> Edit
                    </button>

                    <button
                      className=" btn btn-secondary faq__pdf-btn p-2 pe-3 ps-3 me-1 ms-1"
                      onClick={handlePdfClick}
                    >
                      PDF
                    </button>
                  </div>
                )}
              </div>
              <div className="faq__info">
                <div className="faq-field">
                  <span className="field-label">{t.surname}:</span>{" "}
                  <p className="field__data">
                    {data.Passport[0].Employee_data.surname}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.givenNames}:</span>{" "}
                  <p className="field__data">
                    {data.Passport[0].Employee_data.firstname}
                  </p>
                </div>
                <div className="faq-field">
                  <span className="field-label">{t.nationality}:</span>{" "}
                  <p className="field__data">
                    {data.Passport[0].citizenship_data.CountryEN}
                  </p>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">{t.birthDate}:</span>{" "}
                    <p className="field__data">
                      {data.Passport[0].Employee_data.date_of_birth}
                    </p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">{t.gender}:</span>{" "}
                    <p className="field__data">
                      {data.Passport[0].Employee_data.gender}
                    </p>
                  </div>
                </div>
                <div className="faq__birthwrapper">
                  <div className="faq-field">
                    <span className="field-label">{t.dateOfExpiry}:</span>{" "}
                    <p className="field__data">
                      {data.Passport[0].ValidityDate}
                    </p>
                  </div>
                  <div className="faq-field">
                    <span className="field-label">{t.dateOfIssue}:</span>{" "}
                    <p className="field__data">{data.Passport[0].IssueDate}</p>
                  </div>
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
                    Add Passport
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

export default PassportFAQ;
