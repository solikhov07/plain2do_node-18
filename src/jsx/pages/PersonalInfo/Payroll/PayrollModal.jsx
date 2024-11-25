import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import { fetchJobs } from "../../../components/apiData/apiEmployee";
import "../styles.css";

const PayrollModal = ({
  show,
  onClose,
  onSubmit,
  token,
  id,
  projects,
  manager,
  currency,
  paymentType,
  workSchedule,
}) => {
  const [jobtitle, setjobtitle] = useState([]);
  const [disableInputs, setDisableInputs] = useState(false); // State to control disabling inputs

  const [formData, setFormData] = useState({
    Date: "",
    Manager: null,
    Employee: parseInt(id, 10),
    CostCentre: null,
    JobTitle: null,
    WorkSchedule: null,
    PaymentType: null,
    Currency: null,
    Salary: 0,
    Comment: null,
    Basis: null,
  });

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(token);
      setjobtitle(data);
    };

    getJobs();
  }, [token]);

  const handleCheckboxChange = () => {
    setDisableInputs((prevState) => !prevState);
    if (!disableInputs) {
      // Set all other fields except Date to null when disabling inputs
      setFormData((prevData) => ({
        ...prevData,
        Manager: null,
        CostCentre: null,
        JobTitle: null,
        WorkSchedule: null,
        PaymentType: null,
        Currency: null,
        Salary: 0,
        Comment: null,
        Basis: null,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDateToDDMMYYYY = (dateString) => {
      const [year, month, day] = dateString.split("-"); // Split the "YYYY-MM-DD" format
      return `${day}.${month}.${year}`; // Rearrange to "DD.MM.YYYY"
    };

    const formattedDate = formatDateToDDMMYYYY(formData.Date);

    const payload = {
      ...formData,
      Date: formattedDate, // Replace with the formatted date
    };

    try {
      const response = await onSubmit(payload);

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
            <Form.Group controlId="disableInputsCheckbox">
              <Form.Check
                type="checkbox"
                label="Dissmisal date"
                checked={disableInputs}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formManager">
              <Form.Label>Manager:</Form.Label>
              <Form.Control
                as="select"
                name="Manager"
                value={formData.Manager || ""}
                onChange={handleChange}
                disabled={disableInputs}
              >
                <option value="">Select Manager</option>
                {manager.map((employee) => (
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
                value={formData.CostCentre || ""}
                onChange={handleChange}
                disabled={disableInputs}
              >
                <option value="">Select Cost Centre</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.ProjectNameEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title:</Form.Label>
              <Form.Control
                as="select"
                name="JobTitle"
                value={formData.JobTitle || ""}
                onChange={handleChange}
                disabled={disableInputs}
              >
                <option value="">Select Job Title</option>
                {jobtitle.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.JobTitleEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formWorkSchedule">
              <Form.Label>Work Schedule:</Form.Label>
              <Form.Control
                as="select"
                name="WorkSchedule"
                value={formData.WorkSchedule || ""}
                onChange={handleChange}
                disabled={disableInputs}
              >
                <option value="">Select Work Schedule</option>
                {workSchedule.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.WorkScheduleEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPaymentType">
              <Form.Label>Payment Type:</Form.Label>
              <Form.Control
                as="select"
                name="PaymentType"
                value={formData.PaymentType || ""}
                onChange={handleChange}
                disabled={disableInputs}
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
              <Form.Label>Currency Type:</Form.Label>
              <Form.Control
                as="select"
                name="Currency"
                value={formData.Currency || ""}
                onChange={handleChange}
                disabled={disableInputs}
              >
                <option value="">Select Currency</option>
                {currency.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.CurrencyEN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary:</Form.Label>
              <Form.Control
                type="number"
                name="Salary"
                value={formData.Salary}
                onChange={handleChange}
                disabled={disableInputs}
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                type="text"
                name="Comment"
                value={formData.Comment || ""}
                onChange={handleChange}
                disabled={disableInputs}
              />
            </Form.Group>
            <Form.Group controlId="formBasis">
              <Form.Label>Basis:</Form.Label>
              <Form.Control
                type="text"
                name="Basis"
                value={formData.Basis || ""}
                onChange={handleChange}
                disabled={disableInputs}
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PayrollModal;