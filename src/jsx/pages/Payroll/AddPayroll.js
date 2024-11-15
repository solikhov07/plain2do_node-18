import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
const AddPayroll = () => {
  const { language } = useLanguage();
  const t = translations.payroll[language];
  const history = useNavigate();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const [project, setProject] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [projects, setProjects] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    fullName: "",
    costCenter: "",
    jobTitle: "",
  }); // New filter state

  const urlLink = process.env.REACT_APP_API_URL;
  const responsibleUser = decodedToken.payload.user_id;

  const months = [
    {
      value: "1",
      nameEN: "January",
      nameRU: "Январь",
      nameTR: "Ocak",
    },
    {
      value: "2",
      nameEN: "February",
      nameRU: "Февраль",
      nameTR: "Şubat",
    },
    {
      value: "3",
      nameEN: "March",
      nameRU: "Март",
      nameTR: "Mart",
    },
    {
      value: "4",
      nameEN: "April",
      nameTR: "Nisan",
      nameRU: "Апрель",
    },
    {
      value: "5",
      nameEN: "May",
      nameTR: "-ebilmek",
      nameRU: "Май",
    },
    {
      value: "6",
      nameEN: "June",
      nameRU: "Haziran",
      nameTR: "Июнь",
    },
    {
      value: "7",
      nameEN: "July",
      nameRU: "Июль",
      nameTR: "Temmuz",
    },
    {
      value: "8",
      nameEN: "August",
      nameRU: "Август",
      nameTR: "Ağustos",
    },
    {
      value: "9",
      nameEN: "September",
      nameRU: "Сентябрь",
      nameTR: "Eylül",
    },
    {
      value: "10",
      nameEN: "October",
      nameRU: "Октябрь",
      nameTR: "Ekim",
    },
    {
      value: "11",
      nameEN: "November",
      nameRU: "Ноябрь",
      nameTR: "Kasım",
    },
    {
      value: "12",
      nameEN: "December",
      nameRU: "Декабрь",
      nameTR: "Aralık",
    },
  ];

  const formatDateForInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
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
    if (project && year && month) {
      const fetchPayrollData = async () => {
        const apiUrl = `${urlLink}/payroll-calculation-details/?project_id=${project}&year=${year}&month=${month}`;
        try {
          const response = await fetch(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Backend error response:", errorData);
            swal(
              t.error.charAt(0).toUpperCase() + t.error.slice(1),
              errorData.message || t.failedtofetchpayrolldata,
              t.error
            );
            return;
          }

          const data = await response.json();
          console.log(data);

          if (Array.isArray(data.Response) && data.Response.length > 0) {
            setPayrollData(data.Response); // Set payroll data to state
          } else {
            setPayrollData([]); // Clear payroll data if empty
          }
        } catch (error) {
          console.error("Error fetching payroll data:", error);
          swal(
            t.error.charAt(0).toUpperCase() + t.error.slice(1),
            t.failedtofetchpayrolldata,
            t.error
          );
        }
      };

      fetchPayrollData();
    }
  }, [project, year, month, token, urlLink]);

  // Function to handle selecting/deselecting rows
  const handleRowSelection = (item) => {
    if (selectedRows.includes(item)) {
      setSelectedRows(selectedRows.filter((row) => row !== item)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, item]); // Select row
    }
  };

  // "Select All" Button Handler
  const handleSelectAll = () => {
    if (selectedRows.length === payrollData.length) {
      setSelectedRows([]); // Deselect all if everything is selected
    } else {
      setSelectedRows(payrollData); // Select all rows
    }
  };

  const handleAddPayroll = async () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${today.getFullYear()}`;

    const payload = {
      ResponsibleUser: responsibleUser,
      Project: parseInt(project, 10),
      Date: formattedDate,
      Status: "Approved",
    };

    try {
      const addPayrollResponse = await fetch(
        `${urlLink}/payroll-calculation/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!addPayrollResponse.ok) {
        const errorData = await addPayrollResponse.json();
        console.error("Error adding payroll:", errorData);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          errorData.message || t.failedtoaddpayroll,
          t.error
        );
        return;
      }

      const payrollResponseData = await addPayrollResponse.json();
      const payrollId = payrollResponseData["Data is successfully saved"]?.id;

      if (!payrollId) {
        throw new Error(t.payrollidnotfoundintheresponse);
      }

      // Modify payrollData to include only selected rows
      const modifiedPayrollData = selectedRows.map((item) => ({
        JobTitle: item.JobTitle.id,
        WorkSchedule: item.WorkSchedule.id,
        Currency: item.Currency.id,
        PaymentType: item.PaymentType.id,
        Employee: item.Employee.id,
        CostCenter: item.CostCenter.id,
        CalculatedSalary: item.CalculatedSalary,
        OverTimeSalary: item.OverTimeSalary,
        TotalSalary: item.TotalSalary,
        RegularHoursOrDays: item.RegularHoursOrDays,
        OvertimeHoursOrDays: item.OvertimeHoursOrDays,
        TotalHoursOrDaysWorked: item.TotalHoursOrDaysWorked,
        Salary: parseInt(item.Salary),
        OverTimeMultiplier: item.OverTimeMultiplier,
        Date: formatDateForInput(item.Date),
        Payroll: payrollId, // Attach the payroll ID
      }));

      const sendPayrollDetailsResponse = await fetch(
        `${urlLink}/payroll-calculation-details/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(modifiedPayrollData),
        }
      );

      if (!sendPayrollDetailsResponse.ok) {
        const errorData = await sendPayrollDetailsResponse.json();
        console.error("Error sending payroll details:", errorData);

        await fetch(`${urlLink}/payroll-calculation/${payrollId}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          errorData.message || t.failedtosendpayrolldetailsrolledbackchanges,
          t.error
        );
        return;
      }

      swal(
        t.success.charAt(0).toUpperCase() + t.success.slice(1),
        t.payrolladdedanddetailssentsuccessfully,
        t.success
      ).then(() => history("/payroll"));
    } catch (error) {
      console.error(
        "Error during payroll addition and details sending:",
        error
      );
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        t.failedtoaddpayrollandsenddetails,
        t.error
      );
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace(/,/g, " "); // Replace commas with spaces
  };

  // Filtering the table based on filter inputs
  const filteredPayrollData = payrollData.filter((item) => {
    const fullName =
      `${item.Employee?.firstname} ${item.Employee?.surname}`.toLowerCase();
    return (
      (!filters.fullName ||
        fullName.includes(filters.fullName.toLowerCase())) &&
      (!filters.costCenter ||
        item.CostCenter?.ProjectNameEN.toLowerCase().includes(
          filters.costCenter.toLowerCase()
        )) &&
      (!filters.jobTitle ||
        item.JobTitle?.JobTitleEN.toLowerCase().includes(
          filters.jobTitle.toLowerCase()
        ))
    );
  });

  return (
    <>
      <PageTitle activeMenu={t.addpayrolllist} motherMenu={t.payrolllist} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{t.addpayrolllist}</h4>
        </div>
        <div className="card-body">
          <Form>
            <Form.Group controlId="project">
              <Form.Label>{t.project}</Form.Label>
              <Form.Control
                as="select"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="">{t.selectproject}</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj["ProjectName" + language.toUpperCase()] || "N/A"} -{" "}
                    {proj["Address" + language.toUpperCase()] || "N/A"}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>{t.year}</Form.Label>
              <Form.Control
                as="select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="month">
              <Form.Label>{t.month}</Form.Label>
              <Form.Control
                as="select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">{t.selectmonth}</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m["name" + language.toUpperCase()]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <div className="d-flex">
              <Button
                variant="primary"
                className="me-2"
                onClick={handleAddPayroll}
              >
                {t.addpayrolllist}
              </Button>
              <Button
                variant="secondary"
                onClick={() => history("/payroll")}
              >
                {t.back}
              </Button>
              <Button variant="info" className="ms-2" onClick={handleSelectAll}>
                {selectedRows.length === payrollData.length
                  ? t.deselectall
                  : t.select_all}
              </Button>
            </div>
          </Form>

          {filteredPayrollData.length > 0 && (
            <>
              <Row className="mb-3 mt-3">
                {/* Filters for Full Name, Cost Center, Job Title */}
                <Col>
                  <Form.Control
                    placeholder={t.filterbyfullname}
                    value={filters.fullName}
                    onChange={(e) =>
                      setFilters({ ...filters, fullName: e.target.value })
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder={t.filterbyjobtitle}
                    value={filters.jobTitle}
                    onChange={(e) =>
                      setFilters({ ...filters, jobTitle: e.target.value })
                    }
                  />
                </Col>
              </Row>

              <Table className=" display w-100 dataTable table-responsive">
                <thead>
                  <tr>
                    <th>{t.select}</th>
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
                    <th>{t.overtimemultiplier}</th>
                    <th>{t.totalsalary}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayrollData
                    .sort((a, b) => (selectedRows.includes(b) ? 1 : -1))
                    .map((item, index) => {
                      const isSelected = selectedRows.includes(item);
                      const rowStyle = {
                        opacity: isSelected ? 1 : 0.6,
                      };

                      const isSalaryPayment =
                        item.PaymentType_data?.PaymentTypeEN ===
                        "Salary payment";
                      const timeUnit = isSalaryPayment ? t.days : t.hours;

                      const currencySymbol =
                        item.Currency?.CurrencyEN === "US Dollar"
                          ? "$"
                          : item.Currency?.CurrencyEN === "Turkish Lira"
                          ? "tl"
                          : "";

                      return (
                        <tr
                          key={item.id}
                          style={rowStyle}
                          onClick={() => handleRowSelection(item)}
                          className={isSelected ? "selected" : ""}
                        >
                          <td>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleRowSelection(item)} // Handle row selection toggle
                            />
                          </td>
                          <td>{item.Date || "N/A"}</td>
                          <td>
                            {item.Employee
                              ? `${item.Employee.firstname} ${item.Employee.surname}`
                              : "N/A"}
                          </td>
                          <td>
                            {item.CostCenter[
                              "ProjectName" + language.toUpperCase()
                            ] || "N/A"}
                          </td>
                          <td>
                            {item.JobTitle[
                              "JobTitle" + language.toUpperCase()
                            ] || "N/A"}
                          </td>
                          <td>
                            {item.WorkSchedule[
                              "WorkSchedule" + language.toUpperCase()
                            ] || "N/A"}
                          </td>
                          <td>
                            {item.PaymentType[
                              "PaymentType" + language.toUpperCase()
                            ] || "N/A"}
                          </td>
                          <td>
                            {item.Currency[
                              "Currency" + language.toUpperCase()
                            ] || "N/A"}
                          </td>
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
                              ? `${currencySymbol} ${formatAmount(
                                  item.CalculatedSalary
                                )} `
                              : `${currencySymbol} 0`}
                          </td>
                          <td>
                            {item.OverTimeSalary
                              ? `${currencySymbol} ${formatAmount(
                                  item.OverTimeSalary
                                )} `
                              : `${currencySymbol} 0`}
                          </td>
                          <td>{item.OverTimeMultiplier || "N/A"}</td>
                          <td>
                            {item.TotalSalary
                              ? `${currencySymbol} ${formatAmount(
                                  item.TotalSalary
                                )} `
                              : `${currencySymbol} 0`}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddPayroll;
