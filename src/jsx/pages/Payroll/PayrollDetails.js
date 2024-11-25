import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Alert, Table, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
const PayrollDetails = () => {
  const { id } = useParams();
  const history = useNavigate();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = parser?.access;
  const { language } = useLanguage();
  const t = translations.payroll[language];
  // Add state variables for filters
  const [nameFilter, setNameFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");

  const urlLink = process.env.REACT_APP_API_URL;

  const handleBack = () => {
    history(-1);
  };

  useEffect(() => {
    if (!token) {
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        t.noaccesstokenavailable,
        "error"
      );
      history("/login");
      return;
    }

    const url = `${urlLink}/payroll-calculation-details/${id}/`;

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
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response && data.Response.length > 0) {
          setDetails(data.Response);
        } else {
          setError(t.notimesheetfound);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timesheet details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id, token, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace(/,/g, " "); // Replace commas with spaces
  };

  // Filter details based on the filter input values
  const filteredDetails = details.filter((item) => {
    const fullName = item.Employee_data
      ? `${item.Employee_data.firstname} ${item.Employee_data.surname}`
      : "";
    const projectName =
      item.CostCenter_data["ProjectName" + language.toUpperCase()] || "";
    const jobTitle =
      item.JobTitle_data["JobTitle" + language.toUpperCase()] || "";

    return (
      fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      projectName.toLowerCase().includes(projectFilter.toLowerCase()) &&
      jobTitle.toLowerCase().includes(jobTitleFilter.toLowerCase())
    );
  });

  return (
    <>
      <div className="card mb-2">
        <div className="card-header d-flex justify-content-between">
          <h4 className="card-title">
            Project: {details[0]?.CostCenter_data?.ProjectNameEN || "N/A"}
          </h4>
        </div>

        {/* Filter inputs */}
        <div className="card-body">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t.filterbyname}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterfullname}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t.filterbyproject}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterprojectname}
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t.filterbyjobtitle}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterjobtitle}
                value={jobTitleFilter}
                onChange={(e) => setJobTitleFilter(e.target.value)}
              />
            </Form.Group>
          </Form>

          <Table className="display w-100 dataTable table-responsive">
            <thead>
              <tr className="sticky-header">
                <th>{t.date}</th>
                <th>{t.fullname}</th>
                <th>{t.costcenter}</th>
                <th>{t.jobtitle}</th>
                <th>{t.workschedule}</th>
                <th>{t.paymenttype}</th>
                <th>{t.currency}</th>
                <th>{t.regularhoursdays}</th>
                <th>{t.overtimehoursdays}</th>
                <th>{t.totalhoursdaysworked}</th>
                <th>{t.calculatedsalary}</th>
                <th>{t.overtimesalary}</th>
                <th>{t.totalsalary}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDetails.map((item, index) => {
                const isSalaryPayment =
                  item.PaymentType_data?.PaymentTypeEN === "Salary payment";
                const timeUnit = isSalaryPayment ? t.days : t.hours;

                const currencySymbol =
                  item.Currency_data?.CurrencyEN === "US Dollar"
                    ? "$"
                    : item.Currency_data?.CurrencyEN === "Turkish Lira"
                    ? "tl"
                    : "";

                return (
                  <tr key={index}>
                    <td>{item.Date || "N/A"}</td>
                    <td>
                      {item.Employee_data
                        ? `${item.Employee_data.firstname} ${item.Employee_data.surname}`
                        : "N/A"}
                    </td>
                    <td>{item.CostCenter_data?.ProjectNameEN || "N/A"}</td>
                    <td>{item.JobTitle_data?.JobTitleEN || "N/A"}</td>
                    <td>{item.WorkSchedule_data?.WorkScheduleEN || "N/A"}</td>
                    <td>{item.PaymentType_data?.PaymentTypeEN || "N/A"}</td>
                    <td>{item.Currency_data?.CurrencyEN || "N/A"}</td>
                    <td>
                      {item.RegularHoursOrDays
                        ? `${item.RegularHoursOrDays} ${timeUnit}`
                        : 0}
                    </td>
                    <td>
                      {item.OvertimeHoursOrDays
                        ? `${item.OvertimeHoursOrDays} ${timeUnit}`
                        : 0}
                    </td>
                    <td>
                      {item.TotalHoursOrDaysWorked
                        ? `${item.TotalHoursOrDaysWorked} ${timeUnit}`
                        : 0}
                    </td>
                    <td>
                      {item.CalculatedSalary
                        ? `${formatAmount(
                            item.CalculatedSalary
                          )} ${currencySymbol}`
                        : `0 ${currencySymbol}`}
                    </td>
                    <td>
                      {item.OverTimeSalary
                        ? `${formatAmount(
                            item.OverTimeSalary
                          )} ${currencySymbol}`
                        : `0 ${currencySymbol}`}
                    </td>
                    <td>
                      {item.TotalSalary
                        ? `${formatAmount(item.TotalSalary)} ${currencySymbol}`
                        : `0 ${currencySymbol}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <div>
        <Button variant="secondary" className="mb-3" onClick={handleBack}>
          {t.back}
        </Button>
      </div>
    </>
  );
};

export default PayrollDetails;