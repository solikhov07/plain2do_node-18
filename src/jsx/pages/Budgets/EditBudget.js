import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { fetchProjects } from "../../components/apiData/apiData";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
const EditBudget = () => {
  const { id } = useParams(); // Get budget ID from the URL
  const [editingBudget, setEditingBudget] = useState(null);
  const [projects, setProjects] = useState([]);
  const history = useNavigate();
  const token = JSON.parse(localStorage.getItem("userDetails")).access; // Retrieve token
  const {language} = useLanguage()
  const t = translations[language]
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gendt/budget-data/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEditingBudget(data.Response))
      .catch((error) => console.error("Error fetching budget data:", error));
  }, [id, token]);

  const handleBack = () => {
    history.push("/budgets");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects(token);
      setProjects(data);
    };

    getProjects();
  }, [token]);

  console.log(editingBudget);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const url = `${process.env.REACT_APP_API_URL}/gendt/budget-data/${id}/`;

    const payload = {
      Project: editingBudget.Project,
      VersionDate: editingBudget.VersionDate,
      BudgetVersion: editingBudget.BudgetVersion,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        swal(t.success.charAt(0).toUpperCase() + t.success.slice(1), t.budgetitemeditedsuccessfully, t.success);
        console.log("Budget updated:", updatedData);
        history.push("/budgets");
      })
      .catch((error) => {
        console.error("Error updating budget:", error);
      });
  };

  if (!editingBudget) return <p>{t.loading}...</p>;

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  console.log(editingBudget.Project_data.StartDate);

  return (
    <div>
      <form>
        <div className="form-group">
          <label>{t.project}</label>
          <select
            name="Project"
            className="form-select pt-2 pb-2"
            defaultValue={editingBudget.Project_data?.id || ""}
            onChange={handleFormChange}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project["ProjectName"+language.toUpperCase()]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t.versiondate}</label>
          <input
            type="date"
            name="VersionDate"
            className="form-control"
            min={formatDateToShow(editingBudget.Project_data.StartDate)}
            max={formatDateToShow(editingBudget.Project_data.EndDate)}
            defaultValue={formatDateToShow(editingBudget.VersionDate)}
            onChange={(e) =>
              handleFormChange({
                target: {
                  name: "VersionDate",
                  value: formatDate(e.target.value),
                },
              })
            }
          />
        </div>

        <div className="form-group">
          <label>{t.budgetVersion}</label>
          <input
            type="number"
            name="BudgetVersion"
            className="form-control"
            value={editingBudget.BudgetVersion}
            onChange={handleFormChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleSaveChanges}
        >
          {t.savechanges}
        </button>

        <button onClick={handleBack} className="btn btn-secondary m-0">
          {t.back}
        </button>
      </form>
    </div>
  );
};

export default EditBudget;