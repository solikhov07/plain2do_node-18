
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Alert, Table, Button } from "react-bootstrap";
import swal from "sweetalert";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
const TimesheetDetails = () => {
  const { id } = useParams();
  const history = useNavigate();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = parser?.access;
  const { language } = useLanguage()
  const t = translations.timesheet[language]
  const urlLink = process.env.REACT_APP_API_URL;
  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (!token) {
      swal(t.error.charAt(0).toUpperCase(), t.noaccesstokenavailable, t.error);
      history.push("/login");
      return;
    }

    const url = `${urlLink}/time-sheet/details/${id}/`;

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
          history.push("/login");
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

  return (
    <>
      <div className="card mb-2">
        <div className="card-header d-flex justify-content-between">
          <h4 className="card-title">
            {details[0].TimeSheet_data.Project_data["ProjectName"+language.toUpperCase()]} -{" "}
            {details[0].TimeSheet_data.Date}
          </h4>
        </div>
        <div className="card-body w-100 table-responsive">
          <Table className="display w-100 dataTable">
            <thead>
              <tr>
                <th>{t.employeeeid}</th>
                <th>{t.namesurname}</th>
                <th>{t.jobtitle}</th>
                <th>{t.status}</th>
                <th>{t.shift}</th>
                <th>{t.working}?</th>
                <th>{t.timesheetcode}</th>
                <th>{t.totalhours}</th>
                <th>{t.budgetcode}</th>
                <th>{t.comment}</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.Employee_data?.personnel_number}</td>
                  <td>{`${detail.Employee_data?.surname} ${detail.Employee_data?.firstname}`}</td>
                  <td>{detail.JobTitle_data["JobTitle"+language.toUpperCase()] || "N/A"}</td>
                  <td>
                    {detail.JobTitle_data?.EmpClass_data["EmpClass"+language.toUpperCase()] || "N/A"}
                  </td>
                  <td>{detail?.Shift}</td>
                  <td>
                    {detail.Status_data?.Working ? "Working" : "Not Working"}
                  </td>
                  <td>{detail.Status_data["Code"+language.toUpperCase()] || "N/A"}</td>
                  <td>{detail.TotalHours}</td>
                  <td>{detail.BudgetCode}</td>
                  <td>{detail.Comment}</td>
                </tr>
              ))}
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

export default TimesheetDetails;
