import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import {
  fetchCurrency,
  fetchEmployee,
  fetchJobs,
  fetchPaymentType,
  fetchWorkSchedule,
} from "../../../components/apiData/apiEmployee";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const PayrollModal = ({ show, onClose, onSubmit, token, id, urlLink }) => {
  const [employee, setEmployee] = useState([]);
  const [workSchedule, setWorkSchedule] = useState([]);
  const [projects, setProjects] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [jobtitle, setjobtitle] = useState([]);
  const [currency, setCurrency] = useState([]);
  const history = useNavigate();
  const [formData, setFormData] = useState({
    Date: "",
    Manager: 0,
    Employee: parseInt(id, 10),
    CostCentre: 0,
    JobTitle: 0,
    WorkSchedule: 0,
    PaymentType: 0,
    Currency: 0,
    Salary: "",
    Comment: "",
    Basis: "",
  });

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    fetch(`${urlLink}/gendt/project/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProjects(data.Response || []))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [token, history, urlLink]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployee(token);
      setEmployee(data);
    };

    getEmployees();
  }, [token]);

  useEffect(() => {
    const getWorkSchedule = async () => {
      const data = await fetchWorkSchedule(token);
      setWorkSchedule(data);
    };

    getWorkSchedule();
  }, [token]);

  useEffect(() => {
    const getPaymentType = async () => {
      const data = await fetchPaymentType(token);
      setPaymentType(data);
    };

    getPaymentType();
  }, [token]);

  useEffect(() => {
    const getCurrency = async () => {
      const data = await fetchCurrency(token);
      setCurrency(data);
    };

    getCurrency();
  }, [token]);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(token);
      setjobtitle(data);
    };

    getJobs();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Date") {
      const formattedDate = formatDateToDDMMYYYY(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = {
      ...formData,
      Manager: parseInt(formData.Manager, 10),
      CostCentre: parseInt(formData.CostCentre, 10),
      JobTitle: parseInt(formData.JobTitle, 10),
      WorkSchedule: parseInt(formData.WorkSchedule, 10),
      PaymentType: parseInt(formData.PaymentType, 10),
      Currency: parseInt(formData.Currency, 10),
      Salary: parseInt(formData.Salary, 10),
    };

    try {
      const response = await onSubmit(formDataToSubmit);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add payroll history");
      }

      swal("Success", "Payroll history added successfully!", "success");
      onClose();
    } catch (error) {
      swal("Error", `Failed to add payroll history: ${error.message}`, "error");
    }
  };

  if (!show) return null;

  return (
    <div className="overlay show" onClick={onClose}>
      <div className="sliding-window show" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="edit-form">
          <h3>Add Payroll History</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="Date"
                defaultValue={formData.Date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formManager">
              <Form.Label>Manager:</Form.Label>
              <Form.Control
                as="select"
                name="Manager"
                onChange={handleChange}
                required
              >
                <option value="">Select Manager</option>
                {employee.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstname} {employee.surname}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCostCentre">
              <Form.Label>Cost Centre:</Form.Label>
              <Form.Control
                as="select"
                name="CostCentre"
                onChange={handleChange}
                required
              >
                <option value="">Select CostCentre</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.ProjectNameEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPaymenttype">
              <Form.Label>Payment type:</Form.Label>
              <Form.Control
                as="select"
                name="PaymentType"
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Type</option>
                {paymentType.map((paymentType) => (
                  <option key={paymentType.id} value={paymentType.id}>
                    {paymentType.PaymentTypeEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCurrency">
              <Form.Label>Currency type:</Form.Label>
              <Form.Control
                as="select"
                name="Currency"
                onChange={handleChange}
                required
              >
                <option value="">Select Currency</option>
                {currency.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.CurrencyEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title type:</Form.Label>
              <Form.Control
                as="select"
                name="JobTitle"
                onChange={handleChange}
                required
              >
                <option value="">Select Job Title</option>
                {jobtitle.map((jobtitle) => (
                  <option key={jobtitle.id} value={jobtitle.id}>
                    {jobtitle.JobTitleEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formWorkSchedule">
              <Form.Label>Work Schedule:</Form.Label>
              <Form.Control
                as="select"
                name="WorkSchedule"
                onChange={handleChange}
                required
              >
                <option value="">Select Work Schedule</option>
                {workSchedule.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.WorkScheduleEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary:</Form.Label>
              <Form.Control
                type="number"
                name="Salary"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                type="text"
                name="Comment"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasis">
              <Form.Label>Basis:</Form.Label>
              <Form.Control type="text" name="Basis" onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PayrollModal;
