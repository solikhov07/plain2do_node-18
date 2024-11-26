import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { fetchCitizenship, fetchDoc } from "../../components/apiData/apiData";
import { fetchPositions } from "../../components/apiData/employeeApi";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { convertToCyrillic } from "../../../utils/latinToCyrillicUtils";
const AddEmployee = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const [citizenship, setCitizenship] = useState([]);
  const history = useNavigate();
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const userID = decodedToken.payload.user_id;
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [employeeData, setEmployeeData] = useState({
    passportNumber: "",
    name: "",
    firstname_latin: "",
    surname_latin: "",
    surname: "",
    date_of_birth: "",
    IssueDate: "",
    ValidityDate: "",
    IssueBy: "",
    CountryPersNo: "",
    gender: "",
    citizenship_data: 0,
    personnel_number: "",
  });
  const [errors, setErrors] = useState({});
  const [latinText, setLatinText] = useState("");
  const [cyrillicText, setCyrillicText] = useState("");

  const handleBack = () => {
    history(-1);
  };

  const handleLatinChange = (e) => {
    const value = e.target.value;
    setLatinText(value);
    setCyrillicText(convertToCyrillic(value));
  };

  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getCitizenship = async () => {
      const data = await fetchCitizenship(token);
      setCitizenship(data);
    };

    getCitizenship();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict year length to 4 characters in date inputs
    if (name.includes("date")) {
      const [year] = value.split("-");
      if (year.length > 4) return;
    }

    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Construct the payload as a JSON object
    const jsonPayload = {
      date_of_birth: formatDateForInput(employeeData.date_of_birth),
      ValidityDate: formatDateForInput(employeeData.ValidityDate),
      IssueDate: formatDateForInput(employeeData.IssueDate),
      responsible_user: Number(userID),
      citizenship: Number(employeeData.citizenship_data),
      personnel_number: employeeData.personnel_number,
      surname: employeeData.surname,
      IssuedBy: employeeData.IssueBy,
      CountryPersNo: employeeData.CountryPersNo,
      firstname: employeeData.firstname,
      firstname_latin: employeeData.firstname_latin,
      surname_latin: employeeData.surname_latin,
      PassportNumber: employeeData.passportNumber,
      gender: employeeData.gender,
    };

    try {
      // Send a POST request with the JSON payload
      const response = await fetch(`${urlLink}/employee-passport/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonPayload), // Convert the payload to a JSON string
      });

      // Handle the server response
      if (response.ok) {
        const data = await response.json();
        swal(
          t.success.charAt(0).toUpperCase() + t.success.slice(1),
          data.message || t.employeeaddedsuccessfully,
          "success"
        ).then(() => {
          window.location.href = "/employee-list";
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtoaddtreasure + (errorData.message || t.anerrorocurred),
          "error"
        );
      }
    } catch (error) {
      console.error("Request failed:", error);
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        t.failedtoaddtreasure + (error.message || t.anerrorocurred),
        "error"
      );
    }
  };

  const formatDateForInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      {isLoading && (
        <div className="fullscreen-overlay">
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="citizenship_data">
          <Form.Label>{t.citizenship}</Form.Label>
          <Form.Control
            as="select"
            name="citizenship_data"
            value={employeeData.citizenship_data}
            onChange={handleChange}
            required
            isInvalid={!!errors.citizenship_data}
          >
            <option value="">{t.selectcountry}</option>
            {citizenship.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Form.Control>
          {errors.citizenship_data && (
            <Form.Control.Feedback type="invalid">
              {errors.citizenship_data}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="personnel_number">
          <Form.Label>{t.personal_number}</Form.Label>
          <Form.Control
            type="text"
            name="personnel_number"
            placeholder={t.enterNumber}
            value={employeeData.personnel_number}
            onChange={handleChange}
            isInvalid={!!errors.personnel_number}
          />
          {errors.personnel_number && (
            <Form.Control.Feedback type="invalid">
              {errors.personnel_number}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="firstname_latin">
          <Form.Label>{t.first_name} (Latin)</Form.Label>
          <Form.Control
            type="text"
            name="firstname_latin"
            placeholder={t.enterFirstname}
            value={employeeData.firstname_latin}
            onChange={(e) => {
              const { name, value } = e.target;
              setEmployeeData((prevState) => ({
                ...prevState,
                [name]: value,
                firstname: convertToCyrillic(value), // Automatically fill Cyrillic
              }));
            }}
            isInvalid={!!errors.firstname_latin}
          />
          {errors.firstname_latin && (
            <Form.Control.Feedback type="invalid">
              {errors.firstname_latin}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="firstname">
          <Form.Label>{t.first_name}</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder={t.enterFirstname}
            value={employeeData.firstname}
            onChange={handleChange} // Optional: Allow manual edits
            isInvalid={!!errors.firstname}
            readOnly
          />
          {errors.firstname && (
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="surname_latin">
          <Form.Label>{t.surname} (Latin)</Form.Label>
          <Form.Control
            type="text"
            name="surname_latin"
            placeholder={t.enterSurname}
            value={employeeData.surname_latin}
            onChange={(e) => {
              const { name, value } = e.target;
              setEmployeeData((prevState) => ({
                ...prevState,
                [name]: value,
                surname: convertToCyrillic(value), // Automatically fill Cyrillic
              }));
            }}
            isInvalid={!!errors.surname_latin}
          />
          {errors.surname_latin && (
            <Form.Control.Feedback type="invalid">
              {errors.surname_latin}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="surname">
          <Form.Label>{t.surname}</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder={t.enterSurname}
            value={employeeData.surname}
            onChange={handleChange} // Optional: Allow manual edits
            isInvalid={!!errors.surname}
            readOnly
          />
          {errors.surname && (
            <Form.Control.Feedback type="invalid">
              {errors.surname}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>{t.gender}</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={employeeData.gender}
            onChange={handleChange}
            required
            isInvalid={!!errors.gender}
          >
            <option value="">{t.selectgender}</option>
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </Form.Control>
          {errors.gender && (
            <Form.Control.Feedback type="invalid">
              {errors.gender}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="date_of_birth">
          <Form.Label>{t.dateOfBirth}</Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            value={employeeData.date_of_birth}
            onChange={handleChange}
            required
            isInvalid={!!errors.date_of_birth}
          />
          {errors.date_of_birth && (
            <Form.Control.Feedback type="invalid">
              {errors.date_of_birth}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="passportNumber">
          <Form.Label>{t.passportNumber}</Form.Label>
          <Form.Control
            type="text"
            name="passportNumber"
            placeholder={t.enteryourpassportnumber}
            value={employeeData.passportNumber}
            onChange={handleChange}
            isInvalid={!!errors.PassportNumber}
          />
          {errors.PassportNumber && (
            <Form.Control.Feedback type="invalid">
              {errors.PassportNumber}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="IssueBy">
          <Form.Label>{t.issuedby}</Form.Label>
          <Form.Control
            type="text"
            name="IssueBy"
            placeholder={`${t.issuedby} ...`}
            value={employeeData.IssueBy}
            onChange={handleChange}
            isInvalid={!!errors.IssuedBy}
          />
          {errors.IssuedBy && (
            <Form.Control.Feedback type="invalid">
              {errors.IssuedBy}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="IssueDate">
          <Form.Label>{t.issuedate}</Form.Label>
          <Form.Control
            type="date"
            name="IssueDate"
            value={employeeData.IssueDate}
            onChange={handleChange}
            required
            isInvalid={!!errors.IssueDate}
          />
          {errors.IssueDate && (
            <Form.Control.Feedback type="invalid">
              {errors.IssueDate}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="ValidityDate">
          <Form.Label>{t.validitydate}</Form.Label>
          <Form.Control
            type="date"
            name="ValidityDate"
            value={employeeData.ValidityDate}
            onChange={handleChange}
            required
            isInvalid={!!errors.ValidityDate}
          />
          {errors.ValidityDate && (
            <Form.Control.Feedback type="invalid">
              {errors.ValidityDate}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="CountryPersNo">
          <Form.Label>{t.personalidentificationnumber}</Form.Label>
          <Form.Control
            type="text"
            name="CountryPersNo"
            placeholder={t.enterpersonalidentificationnumber}
            value={employeeData.CountryPersNo}
            onChange={handleChange}
            isInvalid={!!errors.CountryPersNo}
          />
          {errors.CountryPersNo && (
            <Form.Control.Feedback type="invalid">
              {errors.CountryPersNo}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="add__btn-wrapper">
          <Button className="add__btn me-2" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : t.add}
          </Button>
          <Button
            className="add__btn"
            onClick={handleBack}
            disabled={isLoading}
          >
            {t.back}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEmployee;