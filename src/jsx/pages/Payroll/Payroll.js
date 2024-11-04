import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Badge, Button } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";

const Payroll = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const history = useNavigate();
  const [contents, setContents] = useState([]);
  const { language } = useLanguage();
  const t = translations.payroll[language];
  const [filters, setFilters] = useState({
    projectName: "",
    responsibleUser: "",
    status: "",
  });
  const [projectData, setProjectData] = useState([]);
  const [project, setProject] = useState("all");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const urlLink = process.env.REACT_APP_API_URL;

  const handleInfoClick = (payroll) => {
    history.push(`/payroll/${payroll.id}/details`);
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    fetch(`${urlLink}/gendt/project/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProjectData(data.Response || []))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [token, history, urlLink]);

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    let url = `${urlLink}/payroll-calculation/?page=${currentPage}&limit=${itemsPerPage}`;

    if (project !== "all") {
      url += `&project=${project}`;
    }

    if (year !== "all") {
      url += `&year=${year}`;
    }

    if (month !== "all") {
      url += `&month=${month}`;
    }

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
          throw new Error(`${t.httperrorstatus} ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContents(data?.results || []);
        setTotalPages(data?.results?.totalPages || 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          t.error
        );
      });
  }, [token, history, currentPage, itemsPerPage, year, month]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteClick = (payrollId) => {
    swal({
      title: t.areyousure,
      text: t.onceudeleteituwillnotbeabletorecoverthispayroll,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${urlLink}/payroll-calculation/${payrollId}/`;
        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error("Failed to delete the payroll");
            return response.json();
          })
          .then(() => {
            setContents(contents.filter((item) => item.id !== payrollId));
            swal(t.proofyourpayrollhasbeendeleted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting payroll:", error);
            swal(
              t.error.charAt(0).toUpperCase() + t.error.slice(1),
              t.failedtodeletepayroll,
              t.error
            );
          });
      }
    });
  };

  const renderTableRows = () => {
    const filteredContents = contents?.filter((content) => {
      const projectNameMatch =
        content?.Project_data?.ProjectNameEN?.toLowerCase().includes(
          filters.projectName.toLowerCase()
        );
      const responsibleUserMatch = content?.ResponsibleUser_data?.email
        ?.toLowerCase()
        .includes(filters.responsibleUser.toLowerCase());
      const statusMatch = content?.Status?.toLowerCase().includes(
        filters.status.toLowerCase()
      );

      return projectNameMatch && responsibleUserMatch && statusMatch;
    });

    return filteredContents.map((content) => (
      <tr className="" key={content.id}>
        <td>{content.Date}</td>
        <td>{content.Project_data.ProjectNameEN}</td>
        <td>{content.ResponsibleUser_data.email}</td>
        <td style={{ whiteSpace: "nowrap" }}>
          {formatAmount(content.TotalCost)}
        </td>
        <td>
          <Badge variant={content.Status === "Approved" ? "success" : "danger"}>
            {content.Status}
          </Badge>
        </td>
        <td className="datab">
          <button
            className="btn btn-danger shadow btn-xs sharp me-1"
            onClick={() => handleDeleteClick(content.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
          <button
            className="btn btn-success shadow btn-xs sharp"
            onClick={() => handleInfoClick(content)}
          >
            <i className="fa fa-info"></i>
          </button>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => {
    return (
      <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
        <h5 className="m-0">
          {t.pagination} {currentPage} {t.paginationOf} {totalPages}
        </h5>
        <div className="d-flex">
          <button
            className={`btn btn-primary ms-2 ${
              currentPage === 1 ? "disabled" : ""
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {t.previous}
          </button>
          <button
            className={`btn btn-primary ms-2 ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {t.next}
          </button>
        </div>
      </div>
    );
  };

  const handleTimesheetAdd = () => {
    history.push("/payroll/add-payroll");
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => 2000 + index
  );

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace(/,/g, " "); // Replace commas with spaces
  };

  return (
    <>
      <PageTitle activeMenu={t.payrolllist} motherMenu={t.employee.charAt(0).toUpperCase() + t.employee.slice(1)} />
      <div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{t.payrolllist}</h4>

            <Button
              className="btn btn-primary ms-2"
              onClick={handleTimesheetAdd}
            >
              <i className="flaticon-067-plus"></i> {t.addpayroll}
            </Button>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group controlId="yearSelect">
                  <Form.Label>{t.year}</Form.Label>
                  <Form.Control
                    as="select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="all">{t.all}</option>
                    {years.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="monthSelect">
                  <Form.Label>{t.month}</Form.Label>
                  <Form.Control
                    as="select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="all">{t.all}</option>
                    {[
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
                    ].map((mnth, index) => (
                      <option key={mnth} value={index + 1}>
                        {mnth["name" + language.toUpperCase()]}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group controlId="projectSelect">
                  <Form.Label>{t.project}</Form.Label>
                  <Form.Control
                    as="select"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  >
                    <option value="all">{t.all}</option>
                    {projectData.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value["ProjectName" + language.toUpperCase()]}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="w-100 table-responsive">
              <table className="display w-100 dataTable">
                <thead>
                  <tr>
                    <th>{t.date}</th>
                    <th>{t.projectname}</th>
                    <th>{t.responsibleuser}</th>
                    <th>{t.totalcost}</th>
                    <th>{t.status}</th>
                    <th className="datab">{t.action}</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
              <div className="pagination-container">{renderPagination()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payroll;
