import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { fetchCitizenship, fetchDoc } from "../../components/apiData/apiData";
import { fetchPositions } from "../../components/apiData/employeeApi";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
const AddEmployee = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const [citizenship, setCitizenship] = useState([]);
  const [positions, setPositions] = useState([]);
  const [doc, setdoc] = useState([]);
  const history = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const userID = decodedToken.payload.user_id;
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [employeeData, setEmployeeData] = useState({
    name: "",
    surname: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    position_data: 0,
    citizenship_data: 0,
    current_doc_category_data: 0,
    personnel_number: "",
    other_name: "",
    tin_number: "",
    snils_number: "",
    address: "",
    others: "",
    photo: "",
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const handleBack = () => {
    history.goBack();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file); // Set the selected file
      setFileName(file.name); // Update file name for display
    }
  };

  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getPositions = async () => {
      const data = await fetchPositions(token);
      setPositions(data);
    };

    getPositions();
  }, [token]);

  useEffect(() => {
    const getCitizenship = async () => {
      const data = await fetchCitizenship(token);
      setCitizenship(data);
    };

    getCitizenship();
  }, [token]);

  useEffect(() => {
    const getDoc = async () => {
      const data = await fetchDoc(token);
      setdoc(data);
    };

    getDoc();
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
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    // Append formatted dates
    formData.append(
      "date_of_birth",
      formatDateForInput(employeeData.date_of_birth)
    );
    formData.append(
      "date_of_dismissal",
      formatDateForInput(employeeData.date_of_dismissal)
    );
    formData.append(
      "date_of_employment",
      formatDateForInput(employeeData.date_of_employment)
    );

    // Append formatted data and cast necessary fields to numbers
    formData.append("position", Number(employeeData.position_data));
    formData.append("responsible_user", Number(userID));
    formData.append("citizenship", Number(employeeData.citizenship_data));
    formData.append(
      "current_doc_category",
      Number(employeeData.current_doc_category_data)
    );
    formData.append("current_status", "active");
    formData.append("personnel_number", employeeData.personnel_number);
    formData.append("surname", employeeData.surname);
    formData.append("firstname", employeeData.firstname);
    formData.append("other_name", employeeData.other_name);
    formData.append("gender", employeeData.gender);
    formData.append("tin_number", employeeData.tin_number);
    formData.append("snils_number", employeeData.snils_number);

    // Remove leading + from mobile_number before appending
    formData.append(
      "mobile_number",
      employeeData.mobile_number.replace(/^\+/, "")
    );

    formData.append("address", employeeData.address);
    formData.append("others", employeeData.others);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const response = await fetch(`${urlLink}/employee/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const validationErrors = {};
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            validationErrors[key] = errorData[key][0];
          }
        }
        setErrors(validationErrors); // Update the error state
        return;
      }

      // Clear errors and display success message
      setErrors({});
      swal(
        t.success.charAt(0).toUpperCase() + t.success.slice(1),
        t.employeeaddedsuccessfully,
        "success"
      ).then(() => {
        window.location.href = "/employee-list";
      });
    } catch (error) {
      const validationErrors = {};
      if (error instanceof Object) {
        for (const key in error) {
          if (error.hasOwnProperty(key)) {
            validationErrors[key] = error[key][0];
          }
        }
        setErrors(validationErrors);
      } else {
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtoaddtreasure + (error.message || t.anerrorocurred),
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateForInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  function limitTo12Digits(event) {
    const input = event.target.value;
    event.target.value = input.replace(/\D/g, "").slice(0, 12);
  }

  function formatSnilsNumber(value) {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "").slice(0, 12);

    // Format to XXX-XXX-XXX XX
    const formatted =
      numbers.slice(0, 3) +
      (numbers.length > 3 ? "-" : "") +
      numbers.slice(3, 6) +
      (numbers.length > 6 ? "-" : "") +
      numbers.slice(6, 9) +
      (numbers.length > 9 ? " " : "") +
      numbers.slice(9, 11);

    return formatted;
  }

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

        <Form.Group controlId="date_of_employment">
          <Form.Label>{t.dateofemployment}</Form.Label>
          <Form.Control
            type="date"
            name="date_of_employment"
            value={employeeData.date_of_employment}
            onChange={handleChange}
            required
            isInvalid={!!errors.date_of_employment}
          />
          {errors.date_of_employment && (
            <Form.Control.Feedback type="invalid">
              {errors.date_of_employment}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="date_of_dismissal">
          <Form.Label>{t.dateofdismissial}</Form.Label>
          <Form.Control
            type="date"
            name="date_of_dismissal"
            value={employeeData.date_of_dismissal}
            onChange={handleChange}
            required
            isInvalid={!!errors.date_of_dismissal}
          />
          {errors.date_of_dismissal && (
            <Form.Control.Feedback type="invalid">
              {errors.date_of_dismissal}
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
            onChange={handleChange}
            isInvalid={!!errors.surname}
          />
          {errors.surname && (
            <Form.Control.Feedback type="invalid">
              {errors.surname}
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
            onChange={handleChange}
            isInvalid={!!errors.firstname}
          />
          {errors.firstname && (
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="other_name">
          <Form.Label>{t.othername}</Form.Label>
          <Form.Control
            type="text"
            name="other_name"
            placeholder={t.enterOthername}
            value={employeeData.other_name}
            onChange={handleChange}
            isInvalid={!!errors.other_name}
          />
          {errors.other_name && (
            <Form.Control.Feedback type="invalid">
              {errors.other_name}
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

        <Form.Group controlId="tin_number">
          <Form.Label>{t.tinumber}</Form.Label>
          <Form.Control
            type="text"
            name="tin_number"
            placeholder={t.enterInn}
            value={employeeData.tin_number}
            onChange={handleChange}
            onInput={limitTo12Digits}
            isInvalid={!!errors.tin_number}
          />
          {errors.tin_number && (
            <Form.Control.Feedback type="invalid">
              {errors.tin_number}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="snils_number">
          <Form.Label>{t.snilsnumber}</Form.Label>
          <Form.Control
            type="text"
            name="snils_number"
            value={formatSnilsNumber(employeeData.snils_number)}
            onChange={handleChange}
            placeholder="XXX-XXX-XXX XX"
            isInvalid={!!errors.snils_number}
          />
          {errors.snils_number && (
            <Form.Control.Feedback type="invalid">
              {errors.snils_number}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="mobile_number">
          <Form.Label>{t.phonenumber}</Form.Label>
          <Form.Control
            type="text"
            name="mobile_number"
            value={employeeData.mobile_number}
            onChange={handleChange}
            placeholder={t.phonenumber}
            isInvalid={!!errors.mobile_number}
          />
          {errors.mobile_number && (
            <Form.Control.Feedback type="invalid">
              {errors.mobile_number}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>{t.address}</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder={t.address}
            value={employeeData.address}
            onChange={handleChange}
            isInvalid={!!errors.address}
          />
          {errors.address && (
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="others">
          <Form.Label>{t.others}</Form.Label>
          <Form.Control
            type="text"
            name="others"
            value={employeeData.others}
            onChange={handleChange}
            isInvalid={!!errors.others}
            placeholder={t.enterothers}
          />
          {errors.others && (
            <Form.Control.Feedback type="invalid">
              {errors.others}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="photo" className="mb-3">
          <Form.Label>{t.photo}</Form.Label>
          <div className="custom-file-upload">
            <Form.Control
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="file-input"
              accept="image/*"
            />
            <button type="button" className="btn btn-primary upload-btn">
              {t.upload}
            </button>
            <span className="file-name">{fileName}</span>
          </div>
        </Form.Group>

        <Form.Group controlId="position_data">
          <Form.Label>{t.position}</Form.Label>
          <Form.Control
            as="select"
            name="position_data"
            value={employeeData.position_data}
            onChange={handleChange}
            required
            isInvalid={!!errors.position_data}
          >
            <option value="">{t.selectposition}</option>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.JobTitleEN}
              </option>
            ))}
          </Form.Control>
          {errors.position_data && (
            <Form.Control.Feedback type="invalid">
              {errors.position_data}
            </Form.Control.Feedback>
          )}
        </Form.Group>

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

        <Form.Group controlId="current_doc_category_data">
          <Form.Label>{t.currentdocumentcategorydata}</Form.Label>
          <Form.Control
            as="select"
            name="current_doc_category_data"
            value={employeeData.current_doc_category_data}
            onChange={handleChange}
            required
            isInvalid={!!errors.current_doc_category_data}
          >
            <option value="">{t.selectdocument}</option>
            {doc.map((document) => (
              <option key={document.id} value={document.id}>
                {document.name}
              </option>
            ))}
          </Form.Control>
          {errors.current_doc_category_data && (
            <Form.Control.Feedback type="invalid">
              {errors.current_doc_category_data}
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