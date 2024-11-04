import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { useNavigate } from "react-router-dom";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";

const AddBudgetItem = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const userID = decodedToken.payload.user_id;
  const { language } = useLanguage();
  const history = useNavigate();
  const t = translations[language];
  const [budgetDetails, setBudgetDetails] = useState({
    Project: "",
    VersionDate: "",
    BudgetVersion: "",
  });

  const [projects, setProjects] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${urlLink}/gendt/budget-data/?data=True`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        const data = await response.json();
        setProjects(data.Projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasanissuefetchingtheprojectdata + error.message,
          t.error
        );
      }
    };

    fetchProjects();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`; // Convert YYYY-MM-DD to DD.MM.YYYY
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    const formattedDate = formatDate(budgetDetails.VersionDate);

    const url = `${urlLink}/gendt/budget-data/`;
    const requestBody = {
      Project: parseInt(budgetDetails.Project),
      Author: userID,
      VersionDate: formattedDate,
      BudgetVersion: parseInt(budgetDetails.BudgetVersion),
      Status: "success",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 403) {
          throw new Error(t.youdonothaveaccesstoaddbudgetdata);
        }
        if (!response.ok) {
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        swal(t.success.charAt(0).toUpperCase() + t.success.slice(1), t.budgetitemaddedsuccessfully, t.success);
        history.push("/budgets");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        swal(t.error.charAt(0).toUpperCase() + t.error.slice(1), error.message, t.error);
      });
  };

  return (
    <>
      <PageTitle activeMenu={t.addbudgetitem} motherMenu={t.budgets} />
      <div className="container mt-5">
        <h2 className="mb-4">{t.addBudgetItem}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="VersionDate" className="form-label">
              {t.selectdate}:
            </label>
            <input
              type="date"
              className="form-control"
              id="VersionDate"
              name="VersionDate"
              value={budgetDetails.VersionDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Project" className="form-label">
              {t.selectproject}:
            </label>
            <select
              id="Project"
              name="Project"
              className="form-select pt-2 pb-2"
              value={budgetDetails.Project}
              onChange={handleChange}
              placeholder={t.selectproject}
              required
            >
              <option value="">{t.selectproject}</option>
              {Array.isArray(projects) &&
                projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project["ProjectName"+language.toUpperCase()]}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="BudgetVersion" className="form-label">
              {t.budgetVersion}:
            </label>
            <input
              type="number"
              className="form-control"
              id="BudgetVersion"
              name="BudgetVersion"
              value={budgetDetails.BudgetVersion}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {t.submit}
          </button>

          <button
            onClick={handleBackClick}
            className="btn btn-secondary"
            style={{ marginLeft: "10px" }}
          >
            {t.back}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBudgetItem;