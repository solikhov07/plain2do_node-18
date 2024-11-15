
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { fetchCompany } from "../../components/apiData/apiData";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
const AddTimesheet = () => {
  const history = useNavigate();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const [project, setProject] = useState("");
  const [date, setDate] = useState(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const { language } = useLanguage()
  const t = translations.timesheet[language]
  const [status, setStatus] = useState("Approved");
  const [comment, setComment] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [timesheetCodes, setTimesheetCodes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [timesheetCodesByStatus, setTimesheetCodesByStatus] = useState({
    Working: [],
    "Not Working": [],
  });

  useEffect(() => {
    const getCompany = async () => {
      const data = await fetchCompany(token);
      setCompanies(data);
    };

    getCompany();
  }, [token]);

  const urlLink = process.env.REACT_APP_API_URL;
  const responsibleUser = decodedToken.payload.user_id;

  const companyId = decodedToken.payload.company_id;
  const filteredCompany = companies.find((company) => company.id === companyId);

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    // Fetch Projects
    fetch(`${urlLink}/gendt/project/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProjects(data.Response || []))
      .catch((error) => console.error("Error fetching projects:", error));

    fetchTimesheetCodes();
  }, [token, history, urlLink]);

  const handleProjectChange = (projectId) => {
    setProject(projectId);

    if (!projectId) {
      setUsers([]);
      return;
    }

    fetch(`${urlLink}/time-sheet/details/?project_id=${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.Employees || []);
        const initialAttendanceData = (data.Employees || []).map((user) => ({
          EmployeeID: user.id,
          working: "Working",
          timesheetCode: 0,
          totalHrs: 8,
          budgetCode: "",
          comment: "",
          JobTitle: user.position_data.id,
        }));
        setAttendanceData(initialAttendanceData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleBack = () => {
    history("/timesheet"); // Redirects the user to the /add-timesheet route
  };

  const fetchTimesheetCodes = () => {
    fetch(`${urlLink}/time-sheet/code/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const workingCodes = data.Response.filter(
          (code) => code.Working === true
        );
        const notWorkingCodes = data.Response.filter(
          (code) => code.Working === false
        );
        setTimesheetCodesByStatus({
          Working: workingCodes,
          "Not Working": notWorkingCodes,
        });
        setTimesheetCodes(workingCodes); // Set default to Working
      })
      .catch((error) =>
        console.error("Error fetching timesheet codes:", error)
      );
  };

  const handleAttendanceChange = (userId, field, value) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) => {
        if (entry.EmployeeID === userId) {
          const updatedEntry = { ...entry, [field]: value };
          if (field === "working") {
            updatedEntry.timesheetCode =
              timesheetCodesByStatus[value][0]?.Shift || "";
          }
          return updatedEntry;
        }
        return entry;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!attendanceData || attendanceData.length === 0) {
      swal(
        t.validationerror,
        t.noemployeesfoundinattendancelist,
        t.warning
      );
      return;
    }

    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const timesheetData = {
      Project: parseInt(project, 10),
      ResponsibleUser: responsibleUser,
      Date: formattedDate,
      Status: status,
      Comment: comment,
    };

    const attendancePayload = attendanceData.map((entry) => ({
      TimeSheet: 1,
      Employee: entry.EmployeeID,
      Status: parseInt(entry.timesheetCode, 10) || 2,
      Shift: entry.shift || "Day",
      TotalHours: parseInt(entry.totalHrs, 10),
      BudgetCode: entry.budgetCode || "",
      Comment: entry.comment || "",
      JobTitle: entry.JobTitle || "",
    }));

    try {
      const timesheetResponse = await fetch(`${urlLink}/time-sheet/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timesheetData),
      });

      if (!timesheetResponse.ok) {
        if (timesheetResponse.status === 409) {
          throw new Error(
            t.duplicateentrysimilartimesheetalreadyexists
          );
        }
        const errorData = await timesheetResponse.json();
        console.error("Timesheet POST error response:", errorData);
        throw new Error(errorData.message || t.failedtoaddtimesheet);
      }

      const timesheetResponseData = await timesheetResponse.json();
      const timesheetId =
        timesheetResponseData["Data is successfully saved"]?.id;

      if (!timesheetId) {
        throw new Error(t.timesheetidnotfoundintheresponse);
      }

      const attendanceResponse = await fetch(`${urlLink}/time-sheet/details/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          attendancePayload.map((entry) => ({
            ...entry,
            TimeSheet: timesheetId,
          }))
        ),
      });

      if (!attendanceResponse.ok) {
        const errorData = await attendanceResponse.json();
        console.error("Attendance POST error response:", errorData);
        throw new Error(
          errorData.message || t.failedtoaddattendancedetails
        );
      }

      swal(
        t.success.charAt(0).toUpperCase() + t.success.slice(1),
        t.timesheetandattendanceaddedsuccessfully,
        t.success
      ).then(() => history("/timesheet"));
    } catch (error) {
      console.error("Error adding timesheet or attendance:", error);
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        error.message || t.failedtoaddtimesheetorattendance,
        t.error
      );
    }
  };

  return (
    <>
      <PageTitle activeMenu={t.addtimesheet} motherMenu={t.timesheet} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{t.addtimesheet}</h4>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="project">
              <Form.Label>{t.project}</Form.Label>
              <Form.Control
                as="select"
                value={project}
                onChange={(e) => handleProjectChange(e.target.value)}
                required
                style={{
                  border: "1px solid #5bcfc5",
                }}
              >
                <option value="">{t.selectproject}</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj["ProjectName"+language.toUpperCase()] || "N/A"} - {proj["Address"+language.toUpperCase()] || "N/A"}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>{t.date}</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={
                  filteredCompany
                    ? new Date(
                        Date.now() -
                          filteredCompany.editable_date * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                max={
                  new Date(Date.now() - 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                required
                style={{
                  border: "1px solid #5bcfc5",
                }}
              />
            </Form.Group>

            <Form.Group controlId="comment">
              <Form.Label>{t.comment}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.entercomment}
                style={{
                  border: "1px solid #5bcfc5",
                }}
              />
            </Form.Group>

            <div className="d-flex">
              <Button variant="primary" type="submit" className="me-2">
                {t.addtimesheet}
              </Button>

              <button className="btn btn-secondary" onClick={handleBack}>
                {t.back}
              </button>
            </div>
          </Form>

          {users.length > 0 && (
            <div className="mt-4">
              <h4>{t.attendancelist}</h4>
              <Table className="display w-100 dataTable table-responsive">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t.name}</th>
                    <th>{t.jobtitle}</th>
                    <th>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</th>
                    <th>{t.shift}</th>
                    <th>{t.workingstatus}</th>
                    <th>{t.timesheetcode}</th>
                    <th>{t.totalhours}</th>
                    <th>{t.budgetcode}</th>
                    <th>{t.comment}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const attendance = attendanceData.find(
                      (entry) => entry.EmployeeID === user.id
                    );
                    const availableTimesheetCodes =
                      timesheetCodesByStatus[attendance?.working || "Working"];

                    return (
                      <tr key={user.id}>
                        <td>{user.id || "N/A"}</td>
                        <td>
                          {`${user.firstname || ""} ${
                            user.surname || ""
                          }`.trim() || "N/A"}
                        </td>
                        <td>{user.position_data["JobTitle"+language.toUpperCase()] || "N/A"}</td>
                        <td>
                          {user.position_data?.EmpClass_data["EmpClass"+language.toUpperCase()] ||
                            "N/A"}
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            value={user.Shift} // Correctly setting the value to ensure it displays "Day" or "Night"
                            onChange={(e) =>
                              handleAttendanceChange(
                                user.id,
                                "shift",
                                e.target.value
                              )
                            }
                            style={{
                              width: "100px",
                              border: "1px solid #5bcfc5",
                            }}
                          >
                            <option value="Day">{t.day}</option>
                            <option value="Night">{t.night}</option>
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            value={attendance?.working}
                            onChange={(e) =>
                              handleAttendanceChange(
                                user.id,
                                "working",
                                e.target.value
                              )
                            }
                            style={{
                              border: "1px solid #5bcfc5",
                            }}
                          >
                            <option value="Working">{t.working}</option>
                            <option value="Not Working">{t.notworking}</option>
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            value={attendance?.timesheetCode}
                            onChange={(e) =>
                              handleAttendanceChange(
                                user.id,
                                "timesheetCode",
                                e.target.value
                              )
                            }
                            style={{
                              border: "1px solid #5bcfc5",
                            }}
                          >
                            {availableTimesheetCodes.map((code) => (
                              <option key={code.id} value={code.id}>
                                {code["Code"+language.toUpperCase()]}
                              </option>
                            ))}
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={attendance?.totalHrs}
                            onChange={(e) =>
                              handleAttendanceChange(
                                user.id,
                                "totalHrs",
                                e.target.value
                              )
                            }
                            style={{
                              border: "1px solid #5bcfc5",
                            }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={attendance?.budgetCode}
                            onChange={(e) =>
                              handleAttendanceChange(
                                user.id,
                                "budgetCode",
                                e.target.value
                              )
                            }
                            style={{
                              border: "1px solid #5bcfc5",
                            }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={attendance?.comment}
                            required
                            onChange={(e) =>
                              handleAttendanceChange(
                                user.id,
                                "comment",
                                e.target.value
                              )
                            }
                            style={{
                              border: "1px solid #5bcfc5",
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddTimesheet;
