import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useLanguage } from "../../../../context/LanguageContext";
import translations from "../../../../translation/translation";
import PayrollModal from "./PayrollModal"; // Import the modal
import "../styles.css";
import { Button, Form, Spinner } from "react-bootstrap";
import {
  fetchCurrency,
  fetchEmployee,
  fetchJobs,
  fetchPaymentType,
  fetchWorkSchedule,
} from "../../../components/apiData/apiEmployee";

const PayrollHistoryTable = () => {
  const { id } = useParams();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const history = useNavigate();
  const [contents, setContents] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];
  const m = translations.payroll[language];
  const [filters, setFilters] = useState({
    employeeName: "",
    projectName: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowOpen, setWindowOpen] = useState(false);
  const [windowContent, setWindowContent] = useState("");
  const [employee, setEmployee] = useState([]);
  const [workSchedule, setWorkSchedule] = useState([]);
  const [projects, setProjects] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [jobtitle, setjobtitle] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [userId, setUserId] = useState([]);
  const [loading, setLoading] = useState(false);
  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(token);
      setjobtitle(data);
    };

    getJobs();
  }, [token]);

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  const handleClose = () => {
    setWindowOpen(false);
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    fetchTableData();
  }, [token, history, currentPage, itemsPerPage]);

  const fetchTableData = () => {
    let url = `${urlLink}/payroll-history/${id}/`;

    setLoading(true);

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem("userDetails");
          history("/login");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data?.Managers);
        setContents(data?.Response || []);
        setCurrency(data?.Currency);
        setPaymentType(data?.PaymentType);
        setWorkSchedule(data?.WorkSchedule);
        setProjects(data?.Projects);
        setTotalPages(data?.totalPages || 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteClick = async (project_id) => {
    try {
      const confirmed = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (confirmed) {
        const url = `${urlLink}/payroll-history/${project_id}/`; // Confirm URL correctness
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is valid
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `Failed to delete record: Server responded with status ${response.status}`
          );
        }

        swal("Deleted!", "The payroll record has been deleted.", "success");
        fetchTableData(); // Refresh table data
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      swal("Error", `Failed to delete record: ${error.message}`, "error");
    }
  };

  const handleAddPayroll = async (formData) => {
    try {
      const response = await fetch(`${urlLink}/payroll-history/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("FormData:", formData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      const result = await response.json();
      fetchTableData();
      setCurrentPage(1);
      return response;
    } catch (error) {
      swal("Error", `Failed to add payroll: ${error.message}`, "error");
      throw error; // Rethrow to allow further handling
    }
  };

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formElements = e.target.elements;

    const payload = {
      Date: formatDate(formElements.Date.value),
      Manager: parseInt(formElements.Manager.value, 10),
      CostCentre: parseInt(formElements.CostCentre.value, 10),
      PaymentType: parseInt(formElements.PaymentType.value, 10),
      Currency: parseInt(formElements.Currency.value, 10),
      JobTitle: parseInt(formElements.JobTitle.value, 10),
      WorkSchedule: parseInt(formElements.WorkSchedule.value, 10),
      Salary: parseInt(formElements.Salary.value, 10),
      Comment: formElements.Comment.value,
      Basis: formElements.Basis.value,
    };

    try {
      const response = await fetch(`${urlLink}/payroll-history/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        setContents((prevContents) =>
          prevContents.map((content) =>
            content.id === responseData["Data is successfully edited"].id
              ? { ...content, ...responseData["Data is successfully edited"] }
              : content
          )
        );
        swal("Success", "Editable data successfully changed!", "success");
        handleClose();
      } else {
        throw new Error(responseData.message || "Failed to change.");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content) => {
    if (loading) {
      return;
    }
    const EditData = (
      <div className="edit-form">
        <h3>Edit Salary & Transfer history</h3>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="Date"
              defaultValue={formatDateToShow(content.Date)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formManager">
            <Form.Label>Manager:</Form.Label>
            <Form.Control
              as="select"
              defaultValue={content?.Manager_data?.id || ""}
              name="Manager"
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
              defaultValue={content?.CostCentre_data?.id}
              name="CostCentre"
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
              defaultValue={content?.PaymentType_data?.id}
              name="PaymentType"
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
              defaultValue={content?.Currency_data?.id}
              name="Currency"
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
              defaultValue={content?.JobTitle_data?.id}
              name="JobTitle"
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
              defaultValue={content?.WorkSchedule_data?.id}
              name="WorkSchedule"
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
              defaultValue={content?.Salary}
              name="Salary"
              required
            />
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={content?.Comment}
              name="Comment"
            />
          </Form.Group>
          <Form.Group controlId="formBasis">
            <Form.Label>Basis:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={content?.Basis}
              name="Basis"
            />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
    setWindowOpen(true);
    setUserId(content.id);
    setWindowContent(EditData);
  };

  const renderTableRows = () => {
    const filteredContents = contents.filter((content) => {
      const employeeNameMatch =
        `${content?.Employee_data?.firstname} ${content?.Employee_data?.surname}`
          .toLowerCase()
          .includes(filters.employeeName.toLowerCase());
      const projectNameMatch =
        content?.CostCentre_data?.ProjectNameEN?.toLowerCase().includes(
          filters.projectName.toLowerCase()
        );

      return employeeNameMatch && projectNameMatch;
    });

    console.log(filteredContents);

    return filteredContents.map((content) => (
      <tr key={content.id}>
        <td>{content.Date}</td>
        <td>
          {content.Employee_data.firstname} {content.Employee_data.surname}
        </td>
        <td>
          {content.JobTitle_data?.[`JobTitle${language.toUpperCase()}`] ||
            "N/A"}
        </td>
        <td>
          {content.WorkSchedule_data?.[
            `WorkSchedule${language.toUpperCase()}`
          ] || "N/A"}
        </td>
        <td>
          {content.CostCentre_data?.[`ProjectName${language.toUpperCase()}`] ||
            "N/A"}
        </td>
        <td>
          {content.PaymentType_data?.[`PaymentType${language.toUpperCase()}`] ||
            "N/A"}
        </td>
        <td>
          {content.Currency_data?.[`Currency${language.toUpperCase()}`] ||
            "N/A"}
        </td>
        <td>{content.Salary}</td>
        <td>
          {content.Manager_data?.firstname || "N/A"}{" "}
          {content.Manager_data?.surname}
        </td>
        <td>{content.Comment}</td>
        <td>{content.Basis}</td>
        <td className="datab">
          <button
            className="btn btn-danger shadow btn-xs sharp"
            onClick={() => handleDeleteClick(content.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
          <button
            className="btn btn-warning shadow btn-xs sharp ms-1"
            onClick={() => handleEdit(content)}
          >
            <i className="fa fa-pencil"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{t.costCentreTransferHistory}</h4>

          <button
            className="btn btn-primary ms-1"
            onClick={() => setIsWindowOpen(true)}
          >
            {t.add}
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="w-100 table-responsive">
              <table className="display w-100 dataTable">
                <thead>
                  <tr>
                    <th>{m.date}</th>
                    <th>{m.employee}</th>
                    <th>{m.jobtitle}</th>
                    <th>{m.workschedule}</th>
                    <th>{m.projectname}</th>
                    <th>{m.paymenttype}</th>
                    <th>{m.currency}</th>
                    <th>{t.salary}</th>
                    <th>{t.manager}</th>
                    <th>{t.comment}</th>
                    <th>{t.basis}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PayrollModal
        show={isWindowOpen}
        projects={projects}
        manager={employee}
        currency={currency}
        paymentType={paymentType}
        workSchedule={workSchedule}
        onClose={handleCloseWindow}
        onSubmit={handleAddPayroll}
        token={token}
        id={id}
        urlLink={urlLink}
      />

      {windowOpen && (
        <div className="overlay show" onClick={handleClose}>
          <div
            className="sliding-window show"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
            {windowContent}
          </div>
        </div>
      )}
    </>
  );
};

export default PayrollHistoryTable;