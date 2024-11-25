import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert, Table, Button, Form } from "react-bootstrap";
import Select from "react-select"; // Ensure you install react-select
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";

const AnalyticalReports = () => {
  const history = useNavigate();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = parser?.access;
  const { language } = useLanguage();
  const t = translations.payroll[language];
  const m = translations[language];
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;

  const handleBack = () => {
    history.goBack();
  };

  // Helper to get number of days in the selected month and year
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Fetch project options
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${urlLink}/gendt/project/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data?.Response) {
          setProjectOptions(
            data.Response.map((project) => ({
              value: project.id,
              label: project.ProjectNameEN,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching project options:", error);
      }
    };

    fetchProjects();
  }, [token]);

  const fetchData = () => {
    setLoading(true);
    let url = `${urlLink}/employee-report/?year=${year}&month=${month + 1}`;

    const projectParam = selectedProjects.length
      ? selectedProjects.map((project) => project.value).join(",")
      : "all";
    url += `&projects=${projectParam}`;

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
        setDetails(data?.Response || []);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee report:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Generate table headers dynamically
  const daysInMonth = getDaysInMonth(month, year);
  const tableHeaders = Array.from({ length: daysInMonth }, (_, i) => (
    <th key={i + 1}>{i + 1}</th>
  ));

  const monthNames = [
    { name: "January", number: 1, days: 31 },
    { name: "February", number: 2, days: 28 },
    { name: "March", number: 3, days: 31 },
    { name: "April", number: 4, days: 30 },
    { name: "May", number: 5, days: 31 },
    { name: "June", number: 6, days: 30 },
    { name: "July", number: 7, days: 31 },
    { name: "August", number: 8, days: 31 },
    { name: "September", number: 9, days: 30 },
    { name: "October", number: 10, days: 31 },
    { name: "November", number: 11, days: 30 },
    { name: "December", number: 12, days: 31 },
  ];

  console.log(details);

  return (
    <>
      <div className="card mb-2">
        <div className="card-header d-flex justify-content-between">
          <h4 className="card-title">Employee Report</h4>
        </div>

        <div className="card-body pt-0">
          <div className="filters mb-3">
            <Form.Group controlId="yearSelect">
              <Form.Label>{t.year}</Form.Label>
              <Form.Control
                style={{
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                }}
                as="select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {Array.from(
                  { length: 10 },
                  (_, index) => new Date().getFullYear() - index
                ).map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="monthSelect">
              <Form.Label>{t.month}</Form.Label>
              <Form.Control
                style={{
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                }}
                as="select"
                value={month + 1}
                onChange={(e) => setMonth(Number(e.target.value) - 1)}
              >
                {monthNames.map((monthOption) => (
                  <option key={monthOption.number} value={monthOption.number}>
                    {monthOption.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="projectSelect">
              <Form.Label>{m.projects}</Form.Label>
              <Select
                isMulti
                style={{
                  border: "1px solid #cccccc",
                }}
                options={projectOptions}
                value={selectedProjects}
                onChange={(selected) => setSelectedProjects(selected || [])}
                placeholder={t.selectProjects}
              />
            </Form.Group>

            <Button variant="primary" className="mr-2" onClick={fetchData}>
              Apply
            </Button>

            <Button variant="primary" disabled={details.length === 0}>
              Download Excel
            </Button>
          </div>
          {details.length > 0 ? (
            <Table className="display w-100 dataTable table-responsive">
              <thead>
                <tr className="sticky-header">
                  <th rowSpan={2}>Employee Name</th>
                  <th rowSpan={2}>Project</th>
                  <th rowSpan={2}>Job Title</th>
                  <th rowSpan={2}>Period</th>
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const currentDay = new Date(year, month, i + 1);
                    const dayOfWeek = currentDay.getDay();

                    const bgColor =
                      dayOfWeek === 0
                        ? "#ffebee" // Sunday (red tint)
                        : dayOfWeek === 6
                        ? "#e3f2fd" // Saturday (blue tint)
                        : "transparent"; // Weekdays

                    return (
                      <th
                        key={`day-${i + 1}`}
                        style={{
                          backgroundColor: bgColor,
                          borderBottom: "1px solid #000",
                        }}
                      >
                        {i + 1}
                      </th>
                    );
                  })}
                  <th rowSpan={2}>Total Days & Hours</th>
                  <th rowSpan={2}>Payroll Amounts</th>
                  <th rowSpan={2}>Total Payroll Amount</th>
                  <th rowSpan={2}>Total Paid Amount</th>
                  <th rowSpan={2}>Remaining</th>
                </tr>
              </thead>

              <tbody>
                {details.map((report, reportIndex) => {
                  const detectDays =
                    report.payment_typeEN === "days" ? "Days" : "Hours";

                  return (
                    <>
                      <tr key={`row-main-${reportIndex}`}>
                        <td rowSpan={2}>{report?.employee_full_name}</td>
                        <td rowSpan={2}>
                          {report?.["project" + language.toUpperCase()]}
                        </td>
                        <td rowSpan={2}>
                          {report?.["job_title" + language.toUpperCase()]}
                        </td>
                        <td rowSpan={2}>
                          {report?.["period" + language.toUpperCase()]}
                        </td>
                        {Array.from({ length: daysInMonth }, (_, i) => {
                          const currentDay = new Date(year, month, i + 1);
                          const dayOfWeek = currentDay.getDay();

                          const bgColor =
                            dayOfWeek === 0
                              ? "#ffebee" // Sunday (red tint)
                              : dayOfWeek === 6
                              ? "#e3f2fd" // Saturday (blue tint)
                              : "transparent"; // Weekdays

                          const dayData = report.data.find(
                            (entry) => entry.Payroll__Date__day === i + 1
                          );

                          return (
                            <React.Fragment key={`day-${i + 1}`}>
                              <td
                                style={{
                                  backgroundColor: bgColor,
                                }}
                              >
                                {dayData?.RegularHoursOrDays || "-"}
                              </td>
                            </React.Fragment>
                          );
                        })}
                        <td>
                          {report?.total_regular_hours || "0"} {detectDays}
                        </td>

                        <td>Regular</td>
                        <td rowSpan={2}>{report?.total_payroll}</td>
                        <td rowSpan={2}>{report?.total_given_amount || "0"}</td>
                        <td rowSpan={2}>{report?.remaining || "0"}</td>
                      </tr>
                      <tr>
                        {Array.from({ length: daysInMonth }, (_, i) => {
                          const currentDay = new Date(year, month, i + 1);
                          const bgColor =
                            currentDay.getDay() === 0
                              ? "#ffebee" // Sunday (red tint)
                              : currentDay.getDay() === 6
                              ? "#e3f2fd" // Saturday (blue tint)
                              : "transparent"; // Weekdays

                          const dayData = report.data.find(
                            (entry) => entry.Payroll__Date__day === i + 1
                          );

                          return (
                            <React.Fragment key={`day-${i + 1}-overtime`}>
                              <td
                                style={{
                                  backgroundColor: bgColor,
                                  borderBottom: "1px solid #000",
                                }}
                              >
                                {dayData?.OvertimeHoursOrDays || "-"}
                              </td>
                            </React.Fragment>
                          );
                        })}
                        <td>
                          {report?.total_overtime_hours || "0"} {detectDays}
                        </td>

                        <td>Overtime</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p>{t.nodata}</p>
          )}
        </div>
      </div>

      <Button variant="secondary" className="mb-3" onClick={handleBack}>
        {t.back}
      </Button>
    </>
  );
};

export default AnalyticalReports;