import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { Badge } from "react-bootstrap";
// import "./employee.css";

const EmployeeList = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const history = useNavigate();
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const { language } = useLanguage();
  const t = translations[language];
  const [canGoNext, setCanGoNext] = useState(false);
  const [filters, setFilters] = useState({
    surname: "",
    firstname: "",
    position: "",
    personnel_number: "",
    mobile_number: "",
  });
  const urlLink = process.env.REACT_APP_API_URL;
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleRowSelect = (employeeId) => {
    setSelectedItems((prevSelectedItems) => {
      const itemIndex = prevSelectedItems.findIndex(
        (item) => item.id === employeeId
      );
      if (itemIndex !== -1) {
        const updatedSelectedItems = prevSelectedItems.filter(
          (item) => item.id !== employeeId
        );
        console.log(updatedSelectedItems);
        return updatedSelectedItems;
      } else {
        const selectedItem = contents.find(
          (content) => content.id === employeeId
        );
        const updatedSelectedItems = [...prevSelectedItems, selectedItem];
        console.log(updatedSelectedItems);
        return updatedSelectedItems;
      }
    });
  };

  const isRowSelected = (employeeId) => {
    return selectedItems.find((item) => item.id === employeeId);
  };

  const handleSelectAll = () => {
    const allSelected = selectedItems.length === contents.length;
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(contents.slice());
    }
  };

  const handleInfoClick = (employee) => {
    history(`/employee-list/${employee.id}/employee-information`);
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/employee/?page=${currentPage}&limit=${itemsPerPage}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    setLoading(true); // Set loading to true before fetching data

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
        setContents(data.results);
        setTotalItems(data.count);
        setCanGoNext(data.next != null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          "error"
        );
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch is complete
  }, [token, history, currentPage, itemsPerPage]);

  const downloadEmployeeData = () => {
    if (!token) {
      console.error("No access token available.");
      return;
    }

    const selectedIds = selectedItems.map((item) => item.id);

    if (selectedIds.length === 0) {
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        t.pleaseselectatleastoneitemtodownload,
        "error"
      );
      return;
    }

    let url = `${urlLink}/employee/`;
    if (selectedIds.length > 0) {
      url += `?excel=${selectedIds.join(",")}`;
    } else {
      url += "?excel=True";
    }

    console.log(url);

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "employee_data.xls";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtodownloademployeedata + error.message,
          "error"
        );
      });
  };

  const handleAddEmployee = () => {
    history("/employees/add-employee");
  };

  const handleDeleteClick = (employeeId) => {
    swal({
      title: t.areyousure,
      text: t.oncedeletedyouwillnotbeabletorecoverthisemployee,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${urlLink}/employee/${employeeId}/`;
        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error(t.failedtodeletetheemployee);
            return response.json();
          })
          .then(() => {
            setContents(contents.filter((item) => item.id !== employeeId));
            swal(t.proofyouremployeehasbeendeleted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
            swal(
              t.error.charAt(0).toUpperCase() + t.error.slice(1),
              t.failedtodeleteemployee,
              "error"
            );
          });
      }
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const renderTableRows = () => {
    const filteredContents = contents
      .filter((content) => {
        return Object.keys(filters).every((key) => {
          if (!filters[key]) return true;
          const contentValue = content[key]
            ? content[key].toString().toLowerCase()
            : "";
          const filterValue = filters[key].toLowerCase();
          return contentValue.includes(filterValue);
        });
      })
      .filter((content) => {
        if (statusFilter) {
          const contentStatus = content.current_status
            ? content.current_status.toLowerCase()
            : "";
          const filterStatus = statusFilter.toLowerCase();
          return contentStatus === filterStatus;
        } else {
          return true;
        }
      });

    return filteredContents.map((content) => (
      <tr className="" key={content.id}>
        <td>
          <input
            type="checkbox"
            checked={isRowSelected(content.id)}
            onChange={() => handleRowSelect(content.id)}
          />
        </td>
        <td>{content.personnel_number}</td>
        <td>{content.surname}</td>
        <td>{content.firstname}</td>
        <td>
          {content.position_data["JobTitle" + language.toUpperCase()] || "N/A"}
        </td>
        <td>{content.mobile_number || "N/A"}</td>
        <td>
          <Badge
            variant={content.current_status === "active" ? "success" : "danger"}
          >
            {content.current_status}
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

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("excel", file);

    try {
      setUploading(true);

      const response = await fetch(`${urlLink}/excel/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(t.failedtouploadexcelfile);
      }

      const result = await response.json();
      swal(
        t.success.charAt(0).toUpperCase() + t.success.slice(1),
        t.excelfileuploadedsuccessfully,
        "success"
      );
      setCurrentPage(1);

      // Reset the file input
      event.target.value = null;
    } catch (error) {
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        t.failedtouploadexcelfile,
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <PageTitle activeMenu={t.employees} motherMenu={t.dashboard} />
      <div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{t["employeesList"]}</h4>
            <div className="btn-wrapper">
              <Button
                className="btn btn-primary"
                onClick={downloadEmployeeData}
              >
                <i className="flaticon-028-download"></i>{" "}
                {t["downloadEmployee"]}
              </Button>

              <Button className="btn btn-secondary ms-2">
                <i className="flaticon-045-upload"></i>
                <label
                  htmlFor="excelUpload"
                  style={{ cursor: "pointer", margin: 0 }}
                >
                  {uploading ? t.uploading : t.upload}
                </label>
              </Button>
              <input
                id="excelUpload"
                type="file"
                accept=".xls,.xlsx"
                onChange={handleExcelUpload}
                style={{ display: "none" }}
                disabled={uploading}
              />
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-group d-flex align-items-center">
                <label htmlFor="itemsPerPageSelect" className="m-0 me-2">
                  {t["employeePerPage"]}:
                </label>
                <select
                  className="form-control"
                  style={{ width: "100px" }}
                  onChange={handleItemsPerPageChange}
                  value={itemsPerPage}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <Button
                className="btn btn-primary ms-2"
                onClick={handleAddEmployee}
              >
                <i className="flaticon-067-plus"></i> {t["addEmployee"]}
              </Button>
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
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            selectedItems.length === contents.length &&
                            contents.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>{t["personal_number"]}</th>
                      <th>{t["surname"]}</th>
                      <th>{t["first_name"]}</th>
                      <th>{t["position"]}</th>
                      <th>{t["mobile_number"]}</th>
                      <th>{t["current_status"]}</th>
                      <th className="datab">{t["action"]}</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>
                        <input
                          type="text"
                          className="form-control border border-info"
                          name="personnel_number"
                          value={filters.personnel_number}
                          onChange={handleFilterChange}
                          placeholder={t["personal_number"]}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          className="form-control border border-info"
                          name="surname"
                          value={filters.surname}
                          onChange={handleFilterChange}
                          placeholder={t["surname"]}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          className="form-control border border-info"
                          name="firstname"
                          value={filters.firstname}
                          onChange={handleFilterChange}
                          placeholder={t["first_name"]}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          className="form-control border border-info"
                          name="position"
                          value={filters.position}
                          onChange={handleFilterChange}
                          placeholder={t["position"]}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          className="form-control border border-info"
                          name="mobile_number"
                          value={filters.mobile_number}
                          onChange={handleFilterChange}
                          placeholder={t["mobile_number"]}
                        />
                      </th>
                      <th>
                        <select
                          className="form-control border border-info"
                          name="current_status"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="">{t["all"]}</option>
                          <option value="active">{t["active"]}</option>
                          <option value="inactive">{t["inactive"]}</option>
                        </select>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{renderTableRows()}</tbody>
                </table>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
              <h5 className="m-0">
                {t.pagination} {currentPage} {t.paginationOf} {totalPages}
              </h5>
              <div className="d-flex">
                <button className="btn btn-primary" onClick={handleSelectAll}>
                  {selectedItems.length === contents.length
                    ? t["deselect_all"]
                    : t["select_all"]}
                </button>
                <button
                  className={`btn btn-primary ms-2 ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {t.previous}
                </button>
                <button
                  className={`btn btn-primary ms-2 ${
                    !canGoNext ? "disabled" : ""
                  }`}
                  disabled={!canGoNext}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {t.next}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;