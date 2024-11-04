import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { useNavigate } from "react-router-dom";
import "./BudgetItem.css"; // Import the CSS file
import { getUserPermissions } from "../../components/Permissions/getUserPermissions";
import { Button, Form } from "react-bootstrap";

const BudgetItem = () => {
  const { id } = useParams();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const { language } = useLanguage();
  const history = useNavigate();
  const t = translations[language];
  const [budgetDetails, setBudgetDetails] = useState(null);
  const [newRow, setNewRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    Discipline: "",
    BudgetCode: "",
    PrimaveraCode: "",
    JobTitle: "",
    DocumentType: "",
    Currency: "",
    UoM: "",
    StartOfWorkDate: "",
    EndOfWorkDate: "",
    EmpQty: "",
    EmpNetSalary: "",
  });
  const userPermissions = getUserPermissions("budgets");
  const [disciplineOptions, setDisciplineOptions] = useState([]);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [isOptionsLoaded, setIsOptionsLoaded] = useState(false);
  const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
  const [unitOfMeasureOptions, setUnitOfMeasureOptions] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowContent, setWindowContent] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const urlLink = process.env.REACT_APP_API_URL;

  const fetchJobTitleOptions = () => {
    const url = `${urlLink}/gendt/budget-details/`;
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
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJobTitleOptions(
          data.Selection.JobTitle.map((item) => {
            return {
              label: item[`JobTitle${language.toUpperCase()}`],
              value: item.id,
              EmpClass: item.EmpClass_data[`EmpClass${language.toUpperCase()}`],
              EmpLevel: item.EmpLevel_data[`EmpLevel${language.toUpperCase()}`],
            };
          })
        );
        setUnitOfMeasureOptions(
          data.Selection.UoM.map((item) => ({
            label: item[`UoM_${language.toUpperCase()}`],
            value: item.id,
          }))
        );
        setCurrencyOptions(
          data.Selection.Currency.map((item) => ({
            label: item[`Currency${language.toUpperCase()}`],
            value: item.id,
          }))
        );

        setDisciplineOptions(
          data.Selection.Discipline.map((item) => ({
            label: item[`Discipline${language.toUpperCase()}`],
            value: item.id,
          }))
        );

        setIsOptionsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching job title options:", error);
      });
  };

  useEffect(() => {
    fetchDocumentTypeOptions();
  }, []);

  useEffect(() => {
    fetchJobTitleOptions();
  }, []);

  console.log(jobTitleOptions);

  const fetchDocumentTypeOptions = () => {
    const url = `${urlLink}/gendt/doctype/`;
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
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDocumentTypeOptions(
          data.Response.map((item) => ({
            label: item[`DocumentType${language.toUpperCase()}`],
            value: item.id,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching document type options:", error);
        // Handle error
      });
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    const url = `${urlLink}/gendt/budget-details/${id}/`;

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
        console.log(data.Response);

        setBudgetDetails(data.Response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          t.error
        );
      });
  }, [id, token, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!budgetDetails) {
    return <div>{t.loading}...</div>;
  }

  const handleBackClick = () => {
    history.goBack();
  };

  const handleAddClick = () => {
    setNewRow(true);
    fetchJobTitleOptions();
  };

  const handleCancelClick = () => {
    setNewRow(false);
    setNewRowData({
      Discipline: "",
      BudgetCode: "",
      PrimaveraCode: "",
      JobTitle: "",
      DocumentType: "",
      Currency: "",
      UoM: "",
      StartOfWorkDate: "",
      EndOfWorkDate: "",
      EmpQty: "",
      EmpNetSalary: "",
    });
  };

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";

    const dateObj = new Date(date);

    if (isNaN(dateObj)) return "";

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const fetchBudgetDetails = () => {
    const url = `${urlLink}/gendt/budget-details/${id}/`;

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
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBudgetDetails(data.Response);
      })
      .catch((error) => {
        console.error("Error fetching budget details:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasanissuefetchingthebudgetdetails + error.message,
          t.error
        );
      });
  };

  const handleSaveClick = () => {
    const url = `${urlLink}/gendt/budget-details/`;

    const formattedStartOfWorkDate = formatDateToDDMMYYYY(
      newRowData.StartOfWorkDate
    );
    const formattedEndOfWorkDate = formatDateToDDMMYYYY(
      newRowData.EndOfWorkDate
    );

    const payload = {
      Discipline: parseInt(newRowData.Discipline, 10),
      Currency: parseInt(newRowData.Currency, 10),
      UoM: parseInt(newRowData.UoM, 10),
      LegDocumentType: parseInt(newRowData.DocumentType, 10),
      JotTitle: parseInt(newRowData.JobTitle, 10),
      BudgetCode: newRowData.BudgetCode,
      PrimaveraCode: newRowData.PrimaveraCode,
      StartOfWorkDate: formattedStartOfWorkDate,
      EndOfWorkDate: formattedEndOfWorkDate,
      EmpQty: parseInt(newRowData.EmpQty, 10),
      EmpNetSalary: parseFloat(newRowData.EmpNetSalary),
      Budget_ID: parseInt(id, 10),
    };

    const requestOptions = {
      method: "POST",
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
      .then((data) => {
        if (data && data["Data is successfully saved"]) {
          // Re-fetch the updated budget details
          fetchBudgetDetails();
          // Reset form and other states
          setNewRow(false);
          setNewRowData({
            Discipline: "",
            BudgetCode: "",
            PrimaveraCode: "",
            JobTitle: "",
            DocumentType: "",
            Currency: "",
            UoM: "",
            StartOfWorkDate: "",
            EndOfWorkDate: "",
            EmpQty: "",
            EmpNetSalary: "",
          });
          swal(t.success.charAt(0).toUpperCase() + t.success.slice(1), t.newbudgetitemaddedsuccessfully, t.success);
        } else {
          throw new Error(t.unexpectedresponseformat);
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasanissuewiththesaveoperationpleasetryagainlater,
          t.error
        );
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobTitleChange = (e) => {
    const { value } = e.target;
    const selectedJobTitle = jobTitleOptions.find(
      (option) => option.value === parseInt(value)
    );
    setNewRowData((prevData) => ({
      ...prevData,
      JobTitle: value,
      EmpClass: selectedJobTitle ? selectedJobTitle.EmpClass : "",
      EmpLevel: selectedJobTitle ? selectedJobTitle.EmpLevel : "",
    }));
  };

  const handleDeleteClick = (itemId) => {
    const url = `${urlLink}/gendt/budget-details/${itemId}/`;

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    swal({
      title: t.areyousure,
      text: t.onceudeleteituwillnotbeabletorecoverthisbudgetitem,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`${t.httperrorstatus}${response.status}`);
            }
            // Update the state to remove the deleted item
            setBudgetDetails((prevDetails) =>
              prevDetails.filter((item) => item.id !== itemId)
            );
            swal(t.proofyourbudgetitemhasbeendeleted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            swal(
              t.error.charAt(0).toUpperCase() + t.error.slice(1),
              t.therewasanissuewiththedeleteoperationpleasetryagainlater,
              t.error
            );
          });
      }
    });
  };

  const handleEditRow = (item) => {
    const EditContent = (
      <div className="edit-form">
        <h3>{t.editmydata}</h3>
        <Form>
          <Form.Group controlId="formDiscipline">
            <Form.Label>{t.selectdiscipline}</Form.Label>
            <Form.Control as="select" name="Discipline">
              <option value="">{t.selectdiscipline}</option>
              {disciplineOptions.map((discipline) => (
                <option key={discipline.value} value={discipline.value}>
                  {discipline.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBudgetCode">
            <Form.Label>{t.enterbudgetcode}:</Form.Label>
            <Form.Control
              type="text"
              name="BudgetCode"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formPrimaveraCode">
            <Form.Label>{t.enterprimaveracode}:</Form.Label>
            <Form.Control
              type="text"
              name="PrimaveraCode"
              className="edit__input"
            />
          </Form.Group>

          <Form.Group controlId="formJobTitle">
            <Form.Label>{t.selectjobtitle}</Form.Label>
            <Form.Control as="select" name="JobTitle">
              <option value="">{t.selectjobtitle}</option>
              {jobTitleOptions.map((jobTitle) => (
                <option key={jobTitle.value} value={jobTitle.value}>
                  {jobTitle.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="formPhoneNumber">
            <Form.Label>Your phone number:</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              className="edit__input"
            />
          </Form.Group> */}

          <div className="edit__btn-wrapper">
            <Button className="edit__btn" type="submit">
              {t.savechanges}
            </Button>
          </div>
        </Form>
      </div>
    );
    setWindowContent(EditContent);
    setIsWindowOpen(true);
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
  };

  return (
    <>
      <PageTitle activeMenu={t.budgetdetails} motherMenu={t.budgets} />
      <div className=" ms-0 me-0">
        <h2>{t.budgetDetails}</h2>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="budget-table display w-100">
              <thead>
                <tr>
                  <th className="bg-secondary text-nowrap">{t.discipline}</th>
                  <th className="bg-secondary text-nowrap">{t.budgetCode}</th>
                  <th className="bg-secondary text-nowrap">
                    {t.primaveraCode}
                  </th>
                  <th className="bg-secondary text-nowrap">{t.jobTitle}</th>
                  <th className="bg-secondary text-nowrap">
                    {t.employeeClass}
                  </th>
                  <th className="bg-secondary text-nowrap">
                    {t.employeeLevel}
                  </th>
                  <th className="bg-secondary text-nowrap">{t.documentType}</th>
                  <th className="bg-secondary text-nowrap">{t.currency}</th>
                  <th className="bg-secondary text-nowrap">
                    {t.unitOfMeasure}
                  </th>
                  <th className="bg-secondary text-nowrap">{t.startDate}</th>
                  <th className="bg-secondary text-nowrap">{t.endDate}</th>
                  <th className="bg-secondary text-nowrap">
                    {t.employeeQuantity}
                  </th>
                  <th className="bg-secondary text-nowrap">
                    {t.employeeSalary}
                  </th>
                  <th className="bg-secondary text-nowrap">{t.salary}</th>
                  <th className="bg-secondary text-nowrap">
                    {t.dayDifference}
                  </th>
                  <th className="bg-secondary text-nowrap">
                    {t.monthDifference}
                  </th>
                  <th className="bg-secondary text-nowrap">
                    {t.yearDifference}
                  </th>
                  <th className="bg-secondary text-nowrap">{t.taxes}</th>
                  <th className="bg-secondary text-nowrap">
                    {t.legalExpenses}
                  </th>
                  {(userPermissions.canEdit || userPermissions.canDelete) && (
                    <th className="bg-secondary text-nowrap">{t.actions}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {budgetDetails.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {
                        item.Discipline_data?.[
                          `Discipline${language.toUpperCase()}`
                        ]
                      }
                    </td>
                    <td>{item.BudgetCode}</td>
                    <td>{item.PrimaveraCode}</td>
                    <td>
                      {item.JotTitle_data[`JobTitle${language.toUpperCase()}`]}
                    </td>
                    <td>
                      {
                        item.JotTitle_data.EmpClass_data[
                          `EmpClass${language.toUpperCase()}`
                        ]
                      }
                    </td>
                    <td>
                      {
                        item.JotTitle_data.EmpLevel_data[
                          `EmpLevel${language.toUpperCase()}`
                        ]
                      }
                    </td>
                    <td>
                      {
                        item.LegDocumentType_data[
                          `DocumentType${language.toUpperCase()}`
                        ]
                      }
                    </td>
                    <td>
                      {item.Currency_data[`Currency${language.toUpperCase()}`]}
                    </td>
                    <td>
                      {item.UoM_data[`UoM_Short_${language.toUpperCase()}`]}
                    </td>
                    <td>{item.StartOfWorkDate}</td>
                    <td>{item.EndOfWorkDate}</td>
                    <td>{item.EmpQty}</td>
                    <td>{item.EmpNetSalary}</td>
                    <td>{item.salary}</td>
                    <td>{item.day_difference}</td>
                    <td>{item.month_difference}</td>
                    <td>{item.year_difference}</td>
                    <td>{item.taxes}</td>
                    <td>{item.legal_expenses}</td>
                    {(userPermissions.canEdit || userPermissions.canDelete) && (
                      <td>
                        <div className="datab">
                          <button
                            className="btn btn-secondary shadow btn-xs sharp me-1"
                            onClick={() => handleEditRow(item)}
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button
                            className="btn btn-danger shadow btn-xs sharp"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {newRow && (
                  <tr>
                    <td>
                      {isOptionsLoaded ? (
                        <select
                          name="Discipline"
                          value={newRowData.Discipline}
                          onChange={handleInputChange}
                          className="table-input"
                        >
                          <option value="">{t.selectdiscipline}</option>
                          {disciplineOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="Discipline"
                          value={newRowData.Discipline}
                          onChange={handleInputChange}
                          className="table-input"
                          placeholder={`${t.loadingoptions}...`}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="BudgetCode"
                        value={newRowData.BudgetCode}
                        onChange={handleInputChange}
                        className="table-input"
                        placeholder={t.enterinput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="PrimaveraCode"
                        value={newRowData.PrimaveraCode}
                        onChange={handleInputChange}
                        className="table-input"
                        placeholder={t.enterinput}
                      />
                    </td>
                    <td>
                      {isOptionsLoaded ? (
                        <select
                          name="JobTitle"
                          value={newRowData.JobTitle}
                          onChange={handleJobTitleChange}
                          className="table-input"
                        >
                          <option value="">Select Job Title</option>
                          {jobTitleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="JobTitle"
                          value={newRowData.JobTitle}
                          onChange={handleInputChange}
                          className="table-input"
                          placeholder={`${t.loadingoptions}...`}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="EmpClass"
                        value={newRowData.EmpClass} // Ensure EmpClass value is passed here
                        className="table-input"
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="EmpLevel"
                        value={newRowData.EmpLevel}
                        className="table-input"
                        disabled
                      />
                    </td>
                    <td>
                      {isOptionsLoaded ? (
                        <select
                          name="DocumentType"
                          value={newRowData.DocumentType}
                          onChange={handleInputChange}
                          className="table-input"
                        >
                          <option value="">Select Document Type</option>
                          {documentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="DocumentType"
                          value={newRowData.DocumentType}
                          onChange={handleInputChange}
                          className="table-input"
                          placeholder={`${t.loadingoptions}...`}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      {isOptionsLoaded ? (
                        <select
                          name="Currency"
                          value={newRowData.Currency}
                          onChange={handleInputChange}
                          className="table-input"
                        >
                          <option value="">Select Currency</option>
                          {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="Currency"
                          value={newRowData.Currency}
                          onChange={handleInputChange}
                          className="table-input"
                          placeholder={`${t.loadingoptions}...`}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      {isOptionsLoaded ? (
                        <select
                          name="UoM"
                          value={newRowData.UoM}
                          onChange={handleInputChange}
                          className="table-input"
                        >
                          <option value="">Select Unit of Measure</option>
                          {unitOfMeasureOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="UoM"
                          value={newRowData.UoM}
                          onChange={handleInputChange}
                          className="table-input"
                          placeholder={`${t.loadingoptions}...`}
                          disabled
                        />
                      )}
                    </td>
                    <td>
                      <input
                        type="date"
                        name="StartOfWorkDate"
                        value={newRowData.StartOfWorkDate}
                        onChange={handleInputChange}
                        max={newRowData.EndOfWorkDate || ""}
                        className="table-input"
                        placeholder={t.enterinput}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="EndOfWorkDate"
                        value={newRowData.EndOfWorkDate}
                        onChange={handleInputChange}
                        min={newRowData.StartOfWorkDate || ""}
                        className="table-input"
                        placeholder={t.enterinput}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="EmpQty"
                        value={newRowData.EmpQty}
                        onChange={handleInputChange}
                        className="table-input"
                        placeholder={t.enterinput}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="EmpNetSalary"
                        value={newRowData.EmpNetSalary}
                        onChange={handleInputChange}
                        className="table-input"
                        placeholder={t.enterinput}
                      />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="button-container d-flex align-items-center justify-content-center">
          {userPermissions.canDelete && (
            <div>
              {newRow ? (
                <>
                  <button onClick={handleSaveClick} className="btn btn-success">
                    {t.savechanges}
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="btn btn-danger"
                  >
                    {t.cancel}
                  </button>
                </>
              ) : (
                <button onClick={handleAddClick} className="btn btn-primary">
                  {t.add}
                </button>
              )}
            </div>
          )}
          <button onClick={handleBackClick} className="btn btn-secondary m-0">
            {t.back}
          </button>
        </div>
      </div>

      {isWindowOpen && (
        <div className="overlay show" onClick={handleCloseWindow}>
          <div
            className="sliding-window show"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-btn" onClick={handleCloseWindow}>
              &times;
            </span>
            {windowContent}
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetItem;