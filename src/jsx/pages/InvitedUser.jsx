import React, { useState, useEffect } from "react";
import { Spinner, Form, Button, Container } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons for eye
import swal from "sweetalert";
import "./Invitation/Invited.css"; // Assuming you have a CSS file for custom styles
import { fetchCountries } from "../components/apiData/apiData";
import loginbg from "../../images/bg-login.jpg";

const InvitedUser = ({ u, token }) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [valid, setValid] = useState(false); // Validation state
  const [responseData, setResponseData] = useState(null);
  const [countries, setCountries] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    company_id: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    user_type: "",
    country: "",
    invitation_id: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const validateInvitation = async () => {
      try {
        const response = await fetch(
          `${urlLink}/validate-invitation/${u}/${token}/`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setResponseData(result);
          setFormData({
            email: result.email,
            company_id: result.company_id,
            user_type: result.user_type,
            invitation_id: result.invitation_id,
            password: "",
            confirmPassword: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            country: "",
          });
          setValid(true);
        } else {
          const error = await response.json();
          swal(
            "Error",
            error.message || "Failed to validate the invitation",
            "error"
          ).then(() => {
            window.location.href = "/login";
          });
        }
      } catch (error) {
        swal(
          "Error",
          error.message || "Unexpected error occurred",
          "error"
        ).then(() => {
          window.location.href = "/login";
        });
      } finally {
        setLoading(false);
      }
    };

    validateInvitation();
  }, [u, token, urlLink]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    getCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      swal("Error", "Passwords do not match", "error");
      return;
    }

    const payload = {
      email: formData.email,
      company_id: formData.company_id,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      user_type: formData.user_type,
      country: formData.country,
      invitation_id: formData.invitation_id,
    };

    try {
      const response = await fetch(`${urlLink}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        swal("Success", "Registration successful!", "success").then(() => {
          window.location.href = "/login";
        });
      } else {
        const error = await response.json();
        swal("Error", error.message || "Registration failed", "error");
      }
    } catch (error) {
      swal("Error", error.message || "Unexpected error occurred", "error");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!valid) {
    return null;
  }

  return (
    <div style={{ backgroundImage: "url(" + loginbg + ")" }}>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="form-container"
          style={{
            maxWidth: "500px",
            width: "100%",
            padding: "2rem",
            background: "#f8f9fa",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="text-center">
            Welcome to <span className="invit__header">Plain2do</span>
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="position-relative">
              <Form.Label>Password</Form.Label>
              <div className="password-field">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  onClick={toggleShowPassword}
                  className="password-toggle-icon"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>

            <Form.Group className="position-relative">
              <Form.Label>Confirm Password</Form.Label>
              <div className="password-field">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  onClick={toggleShowConfirmPassword}
                  className="password-toggle-icon"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.CountryEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <button type="submit" className="w-100 mt-3 btn btn-purple">
              Register
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default InvitedUser;
