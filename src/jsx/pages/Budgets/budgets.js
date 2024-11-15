import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { Badge } from "react-bootstrap";
import { fetchProjects } from "../../components/apiData/apiData";
import { getUserPermissions } from "../../components/Permissions/getUserPermissions";

const BudgetList = () => {
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
    VersionDate: "",
    Author: "",
    TotalCost: "",
    ProjectName: "",
    BudgetVersion: "",
  });
  const [dataFilter, setDataFilter] = useState("all");
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const urlLink = process.env.REACT_APP_API_URL;

  const userPermissions = getUserPermissions("budgets");

  const handleRowSelect = (projectId) => {
    setSelectedItems((prevSelectedItems) => {
      const itemIndex = prevSelectedItems.findIndex(
        (item) => item.id === projectId
      );
      if (itemIndex !== -1) {
        const updatedSelectedItems = prevSelectedItems.filter(
          (item) => item.id !== projectId
        );
        console.log(updatedSelectedItems);
        return updatedSelectedItems;
      } else {
        const selectedItem = contents.find(
          (content) => content.id === projectId
        );
        const updatedSelectedItems = [...prevSelectedItems, selectedItem];
        console.log(updatedSelectedItems);
        return updatedSelectedItems;
      }
    });
  };

  const isRowSelected = (projectId) => {
    return selectedItems.find((item) => item.id === projectId);
  };

  const handleSelectAll = () => {
    const allSelected = selectedItems.length === contents.length;
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(contents.slice());
    }
  };

  const handleInfoClick = (budget) => {
    history(`/budgets/${budget.id}/budget-details`);
  };

  const handleEditClick = (budget) => {
    history(`/budgets/${budget.id}/edit-budget`);
  };

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/gendt/budget-data/?page=${currentPage}&limit=${itemsPerPage}&${dataFilter}=True`;
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
          history("/login");
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContents(
          data.results.map((item) => ({
            id: item.id,
            Author: item.Author_data.email,
            BudgetVersion: item.BudgetVersion,
            TotalCost: item.total_cost,
            ProjectName: item.Project_data.ProjectNameEN,
            VersionDate: item.VersionDate,
            EndOfWorkDate: item.Project_data.EndDate,
            Status: item.Status,
          }))
        );
        setTotalItems(data.count);
        setCanGoNext(data.next != null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          t.error
        );
      });
  }, [token, history, currentPage, itemsPerPage, dataFilter]);

  const downloadBudget = () => {
    if (!token) {
      console.error("No access token available.");
      return;
    }

    // Get the IDs of selected items
    const selectedIds = selectedItems.map((item) => item.id);

    if (selectedIds.length === 0) {
      // Show an error message if no items are selected
      swal(t.error.charAt(0).toUpperCase() + t.error.slice(1), t.pleaseselectatleastoneitemtodownload, t.error);
      return;
    }

    let url = `${urlLink}/gendt/budget-data/`;
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
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }

        // Extract filename from headers
        const disposition = response.headers.get("Content-Disposition");
        let filename = "budget.xls"; // Default filename

        if (disposition && disposition.includes("filename=")) {
          // Extracting the filename from the Content-Disposition header
          const matches = disposition.match(/filename="([^"]+)"/);
          if (matches && matches[1]) {
            filename = matches[1];
          }
        }

        return response.blob().then((blob) => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // Use the extracted filename from the response
        document.body.appendChild(a);
        a.click();
        a.remove(); // Cleanup
        window.URL.revokeObjectURL(url); // Free up memory
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtodownloadbudgetdata + error.message,
          t.error
        );
      });
  };

  const handleAddProject = () => {
    history("/budgets/add-budget");
  };

  const handleDeleteClick = (projectId) => {
    swal({
      title: t.areyousure,
      text: t.oncedeletedyouwillnotbeabletorecoverthisproject,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${urlLink}/gendt/budget-data/${projectId}/`;
        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) throw new Error(t.failedtodeletetheproject);
            return response.json();
          })
          .then(() => {
            setContents(contents.filter((item) => item.id !== projectId));
            swal(t.proofyourprojecthasbeendeleted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting project:", error);
            swal(t.error.charAt(0).toUpperCase() + t.error.slice(1), t.failedtodeletetheproject, t.error);
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

  const handleDataFilterChange = (event) => {
    setDataFilter(event.target.value);
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
          const contentStatus = content.Status
            ? content.Status.toLowerCase()
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
        <td>{content.ProjectName}</td>
        <td>{content.BudgetVersion}</td>
        <td>{content.VersionDate}</td>
        <td>{content.Author}</td>
        <td>{content.TotalCost}</td>
        <td>
          <Badge variant={content.Status === "Success" ? "success" : "danger"}>
            {content.Status}
          </Badge>
        </td>
        <td className="datab">
          {userPermissions.canEdit && (
            <button
              className="btn btn-secondary shadow btn-xs sharp me-1"
              onClick={() => handleEditClick(content)}
            >
              <i className="fa fa-pencil"></i>
            </button>
          )}

          {userPermissions.canDelete && (
            <button
              className="btn btn-danger shadow btn-xs sharp"
              onClick={() => handleDeleteClick(content.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          )}

          <button
            className="btn btn-warning shadow btn-xs sharp ms-1"
            onClick={() => handleInfoClick(content)}
          >
            <i className="fa fa-info"></i>
          </button>
        </td>
      </tr>
    ));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page with new page size
  };

  return (
    <>
      <PageTitle activeMenu={t.budgets} motherMenu={t.projects} />
      <div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{t.budgetData}</h4>
            <div className="btn-wrapper ">
              <Button className="btn btn-info ms-1" onClick={downloadBudget}>
                <i className="flaticon-028-download"></i> {t.downloadBudgets}
              </Button>
            </div>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div className="d-flex align-items-center justify-content-between">
                <div className="form-group d-flex align-items-center">
                  <label htmlFor="itemsPerPageSelect" className="m-0 me-2">
                    {t.budgetsPerPage}:
                  </label>
                  <select
                    className="form-control"
                    style={{
                      width: "100px",
                    }}
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>

                  <div className="d-flex me-3">
                    <div className="form-check me-3 ms-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dataFilter"
                        id="latest"
                        value="latest"
                        checked={dataFilter === "latest"}
                        onChange={handleDataFilterChange}
                      />
                      <label className="form-check-label" htmlFor="latest">
                        {t.latest}
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dataFilter"
                        id="archived"
                        value="archived"
                        checked={dataFilter === "archived"}
                        onChange={handleDataFilterChange}
                      />
                      <label className="form-check-label" htmlFor="archived">
                        {t.archive}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dataFilter"
                        id="all"
                        value="all"
                        checked={dataFilter === "all"}
                        onChange={handleDataFilterChange}
                      />
                      <label className="form-check-label" htmlFor="all">
                        {t.all}
                      </label>
                    </div>
                  </div>
                </div>
                {userPermissions.canAdd && (
                  <Button
                    onClick={() => handleAddProject()}
                    className="btn btn-info"
                  >
                    <i className="flaticon-067-plus"></i> {t.addBudget}
                  </Button>
                )}
              </div>
              <table className="display w-100 dataTable ">
                <thead>
                  <tr>
                    <th>{t.select.charAt(0).toUpperCase() + t.select.slice(1)}</th>
                    <th>{t.projectName}</th>
                    <th>{t.budgetVersion}</th>
                    <th>{t.versiondate}</th>
                    <th>{t.author}</th>
                    <th>{t.totalcost}</th>
                    <th>{t.current_status}</th>
                    <th>{t.action}</th>
                  </tr>
                  <tr>
                    <th></th>

                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="ProjectName"
                        value={filters.ProjectName}
                        onChange={handleFilterChange}
                        placeholder={t.projectName}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="BudgetVersion"
                        value={filters.BudgetVersion}
                        onChange={handleFilterChange}
                        placeholder={t.budgetVersion}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="VersionDate"
                        value={filters.VersionDate}
                        onChange={handleFilterChange}
                        placeholder={t.versiondate}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="Author"
                        value={filters.Author}
                        onChange={handleFilterChange}
                        placeholder={t.Author}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="TotalCost"
                        value={filters.TotalCost}
                        onChange={handleFilterChange}
                        placeholder={t.totalcost}
                      />
                    </th>
                    <th>
                      <select
                        className="form-control border border-info"
                        name="Status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">{t.all}</option>
                        <option value="Successful">{t.successfull}</option>
                        <option value="Pending">{t.pending}</option>
                        {/* Add more options for other status values */}
                      </select>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
              <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                <h5 className="m-0">
                  {t.pagination} {currentPage} {t.paginationOf} {totalPages}
                </h5>

                <div className="d-flex ">
                  {" "}
                  <button className="btn btn-primary" onClick={handleSelectAll}>
                    {selectedItems.length === contents.length
                      ? t.deselect_all
                      : t.select_all}
                  </button>
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
                      !canGoNext ? "disabled" : ""
                    }`}
                    disabled={!canGoNext}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {t.next}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetList;