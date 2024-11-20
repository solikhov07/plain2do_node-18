import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Badge, Button, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";

const TimeSheetTable = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const history = useNavigate();
  const [contents, setContents] = useState([]);
  const { language } = useLanguage();
  const t = translations.timesheet[language];
  const [filters, setFilters] = useState({
    projectName: "",
    responsibleUser: "",
    status: "",
  });
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [canGoNext, setCanGoNext] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleInfoClick = (timeSheet) => {
    history(`/timesheet/${timeSheet.id}/details`);
  };
  const urlLink = process.env.REACT_APP_API_URL;

  const settotalPages = Math.ceil(totalPages / itemsPerPage);

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    let url = `${urlLink}/time-sheet/?page=${currentPage}&limit=${itemsPerPage}`;
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

    setLoading(true);

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem("userDetails");
          history("/login");
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContents(data?.results?.Response || []);
        setTotalPages(data?.count || 1);
        setCanGoNext(data?.next != null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          "error"
        );
      })
      .finally(() => setLoading(false));
  }, [token, history, currentPage, itemsPerPage, year, month]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteClick = (timeSheetId) => {
    swal({
      title: t.areyousure,
      text: t.onceudeleteituwillnotbeabletorecoverthistimesheet,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${urlLink}/time-sheet/${timeSheetId}/`;
        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error(t.failedtodeletethetimesheet);
            return response.json();
          })
          .then(() => {
            setContents(contents.filter((item) => item.id !== timeSheetId));
            swal(t.proofyourtimesheethasbeendelted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting timesheet:", error);
            swal(
              t.error.charAt(0).toUpperCase() + t.error.slice(1),
              t.failedtodeletethetimesheet,
              "error"
            );
          });
      }
    });
  };

  const renderTableRows = () => {
    // const filteredContents = contents?.filter((content) => {
    //   const projectNameMatch =
    //     content?.Project_data?.ProjectNameEN?.toLowerCase().includes(
    //       filters.projectName.toLowerCase()
    //     );
    //   const responsibleUserMatch = content?.ResponsibleUser_data?.email
    //     ?.toLowerCase()
    //     .includes(filters.responsibleUser.toLowerCase());
    //   const statusMatch = content?.Status?.toLowerCase().includes(
    //     filters.status.toLowerCase()
    //   );

    //   return projectNameMatch && responsibleUserMatch && statusMatch;
    // });

    return contents.map((content) => (
      <tr className="" key={content.id}>
        <td>{content?.Date}</td>
        <td>{content?.Project_data?.ProjectNameEN || "N/A"}</td>
        <td>{content?.ResponsibleUser_data?.email || "N/A"}</td>
        <td>{content?.TotalHours}</td>
        <td>
          <Badge
            variant={content?.Status === "Approved" ? "success" : "danger"}
          >
            {content?.Status}
          </Badge>
        </td>
        <td>{content?.Comment}</td>
        <td className="datab">
          <button
            className="btn btn-danger shadow btn-xs sharp me-1"
            onClick={() => handleDeleteClick(content?.id)}
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
          {t.pagination} {currentPage} {t.paginationOf} {settotalPages}
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
            className={`btn btn-primary ms-2 ${!canGoNext ? "disabled" : ""}`}
            disabled={!canGoNext}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {t.next}
          </button>
        </div>
      </div>
    );
  };

  const handleTimesheetAdd = () => {
    history("/timesheet/add-timesheet");
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => 2000 + index
  );

  return (
    <>
      <PageTitle activeMenu={t.timesheet} motherMenu={t.employee} />
      <div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{t.timesheet}</h4>

            <Button
              className="btn btn-primary ms-2"
              onClick={handleTimesheetAdd}
            >
              <i className="flaticon-067-plus"></i> {t.addtimesheet}
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
                        nameEN: "January",
                        nameRU: "Январь",
                        nameTR: "Ocak",
                      },
                      {
                        nameEN: "February",
                        nameRU: "Февраль",
                        nameTR: "Şubat",
                      },
                      {
                        nameEN: "March",
                        nameRU: "Март",
                        nameTR: "Mart",
                      },
                      {
                        nameEN: "April",
                        nameTR: "Nisan",
                        nameRU: "Апрель",
                      },
                      {
                        nameEN: "May",
                        nameTR: "-ebilmek",
                        nameRU: "Май",
                      },
                      {
                        nameEN: "June",
                        nameRU: "Haziran",
                        nameTR: "Июнь",
                      },
                      {
                        nameEN: "July",
                        nameRU: "Июль",
                        nameTR: "Temmuz",
                      },
                      {
                        nameEN: "August",
                        nameRU: "Август",
                        nameTR: "Ağustos",
                      },
                      {
                        nameEN: "September",
                        nameRU: "Сентябрь",
                        nameTR: "Eylül",
                      },
                      {
                        nameEN: "October",
                        nameRU: "Октябрь",
                        nameTR: "Ekim",
                      },
                      {
                        nameEN: "November",
                        nameRU: "Ноябрь",
                        nameTR: "Kasım",
                      },
                      {
                        nameEN: "December",
                        nameRU: "Декабрь",
                        nameTR: "Aralık",
                      },
                    ].map((mnth, index) => (
                      <option
                        key={mnth["name" + language.toUpperCase()]}
                        value={index + 1}
                      >
                        {mnth["name" + language.toUpperCase()]}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
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
                    <tr className="sticky-header">
                      <th>{t.date}</th>
                      <th>{t.projectname}</th>
                      <th>{t.responsibleuser}</th>
                      <th>{t.totalhours}</th>
                      <th>{t.status}</th>
                      <th>{t.comment}</th>
                      <th className="datab">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>{renderTableRows()}</tbody>
                </table>
              </div>
            )}
            <div className="pagination-container">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSheetTable;