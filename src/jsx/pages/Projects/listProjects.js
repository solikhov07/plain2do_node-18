import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { Badge } from "react-bootstrap";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { getUserPermissions } from "../../components/Permissions/getUserPermissions";

const ProjectsList = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const history = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [contents, setContents] = useState([]);
  const [filters, setFilters] = useState({
    ProjectNameEN: "",
    AddressEN: "",
    StartDate: "",
    EndDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [canGoNext, setCanGoNext] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedItems, setSelectedItems] = useState([]);
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const userID = decodedToken.payload.user_id;
  const [showModal, setShowModal] = useState(false);
  const initialProjectState = {
    ProjectID_1C: "",
    ProjectCode: "",
    ProjectNameEN: "",
    ProjectNameRU: "",
    ProjectNameTR: "",
    AddressEN: "",
    AddressRU: "",
    AddressTR: "",
    StartDate: "",
    EndDate: "",
    Author: userID,
    SubjectofRF: "",
  };
  const [newProject, setNewProject] = useState(initialProjectState);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const urlLink = process.env.REACT_APP_API_URL;

  const userPermissions = getUserPermissions("projects");

  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${urlLink}/gendt/subject-rf/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(t.failedtofetchsubjects);
      }
      const data = await response.json();
      setSubjectOptions(data.Response);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/gendt/project/?page=${currentPage}&limit=${itemsPerPage}`;

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
          throw new Error(`${t.httperrorstatus} ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setContents(
          data.results.map((item) => ({
            id: item.id,
            ProjectNameEN: item.ProjectNameEN,
            AddressEN: item.AddressEN,
            StartDate: item.StartDate,
            EndDate: item.EndDate,
            ProjectID_1C: item.ProjectID_1C,
            ProjectCode: item.ProjectCode,
            ProjectNameRU: item.ProjectNameRU,
            ProjectNameTR: item.ProjectNameTR,
            AddressRU: item.AddressRU,
            AddressTR: item.AddressTR,
            SubjectofRF: item.SubjectofRF,
          }))
        );
        setTotalItems(data.count);
        setCanGoNext(data.next != null); // If 'next' URL is not null, there are more pages
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
  }, [token, history, currentPage, itemsPerPage]);

  const downloadProjects = () => {
    if (!token) {
      console.error("No access token available.");
      return;
    }

    const allSelected = selectedItems.length === contents.length;
    let url = `${urlLink}/gendt/project/`;

    if (allSelected) {
      url += "?excel=True"; // All items selected
    } else if (selectedItems.length > 0) {
      const selectedIds = selectedItems.map((item) => item.id);
      url += `?excel=${selectedIds.join(",")}`; // Specific items selected
    } else {
      swal(
        t.error.charAt(0).toUpperCase() + t.error.slice(1),
        t.pleaseselectatleastoneitemtodownload,
        "error"
      );
      return;
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
        const disposition = response.headers.get("Content-Disposition");
        let filename = "project.xls";

        if (disposition && disposition.includes("filename=")) {
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
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtodownloadprojectdata + error.message,
          "error"
        );
      });
  };

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = (event) => {
    event.preventDefault();

    const formattedProject = {
      ...newProject,
      StartDate: formatDate(newProject.StartDate),
      EndDate: formatDate(newProject.EndDate),
    };

    const url = `${urlLink}/gendt/project/`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedProject),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(t.failedtocreatenewproject);
        }
        return response.json();
      })
      .then((data) => {
        const savedData = data["Data is successfully saved"];

        setContents((prev) => [...prev, savedData]);

        setShowModal(false);
        swal(
          t.success.charAt(0).toUpperCase() + t.success.slice(1),
          t.projectaddedsuccessfully,
          "success"
        );
      })
      .catch((error) => {
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtoaddproject + error.message,
          "error"
        );
      });
  };

  const handleUpdateProject = () => {
    const url = `${urlLink}/gendt/project/${selectedProject.id}/`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProject),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(t.failedtoupdateproject);
        }
        return response.json();
      })
      .then((data) => {
        setContents((prev) =>
          prev.map((item) =>
            item.id === data["Data is successfully edited"].id
              ? data["Data is successfully edited"]
              : item
          )
        );

        setShowEditModal(false);
        swal(
          t.success.charAt(0).toUpperCase() + t.success.slice(1),
          t.projectupdatedsuccessfully,
          "success"
        );
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.failedtoupdateproject + error.message,
          "error"
        );
      });
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setSelectedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
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
        const url = `${urlLink}/gendt/project/${projectId}/`;
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
            console.log(contents);
            setContents(contents.filter((item) => item.id !== projectId));
            swal(t.proofyourprojecthasbeendeleted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting project:", error);
            swal(
              t.error.charAt(0).toUpperCase() + t.error.slice(1),
              t.failedtodeletetheproject,
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
    const filteredContents = contents.filter((content) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        const contentValue = content[key]
          ? content[key].toString().toLowerCase()
          : "";
        const filterValue = filters[key].toLowerCase();
        return contentValue.includes(filterValue);
      });
    });

    return filteredContents.map((content) => (
      <tr key={content.id}>
        <td>
          <input
            type="checkbox"
            checked={isRowSelected(content.id)}
            onChange={() => handleRowSelect(content.id)}
          />
        </td>
        <td>{content["ProjectName" + language.toUpperCase()]}</td>
        <td>{content["Address" + language.toUpperCase()]}</td>
        <td>{content.StartDate}</td>
        <td>{content.EndDate}</td>
        <td>
          <Badge variant="success light">{t.successfull}</Badge>
        </td>
        {(userPermissions.canEdit || userPermissions.canDelete) && (
          <td className="datab">
            {userPermissions.canEdit && (
              <button
                className="btn btn-secondary shadow btn-xs sharp me-2"
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
          </td>
        )}
      </tr>
    ));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    const allSelected = selectedItems.length === contents.length;
    if (allSelected) {
      setSelectedItems([]); // Clear selection
    } else {
      setSelectedItems(contents.slice()); // Select all items
    }
  };

  const handleShowModal = () => {
    setNewProject(initialProjectState); // Reset newProject to initial state
    setShowModal(true); // Show the modal
  };

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      <PageTitle activeMenu={t.listProjects} motherMenu={t.projects} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{t.projectDatatables}</h4>
          <div className="btn-wrapper">
            <Button className="btn btn-info ms-1" onClick={downloadProjects}>
              <i
                className="flaticon-028-download
"
              ></i>{" "}
              {t.downloadProjects}
            </Button>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="form-group d-flex align-items-center">
              <label htmlFor="itemsPerPageSelect" className="m-0 me-2">
                {t.projectsPerPage}:
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
            </div>
            {userPermissions.canAdd && (
              <Button onClick={handleShowModal} className="btn btn-info">
                <i className="flaticon-067-plus"></i> {t.addProject}
              </Button>
            )}
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="w-100 table-responsive">
              <table className="display w-100 dataTable ">
                <thead>
                  <tr className="sticky-header">
                    <th>{t.select}</th>
                    <th>{t.projectName}</th>
                    <th>{t.address}</th>
                    <th>{t.startDate}</th>
                    <th>{t.endDate}</th>
                    <th>{t.status}</th>
                    {(userPermissions.canEdit || userPermissions.canDelete) && (
                      <th>{t.action}</th>
                    )}
                  </tr>
                  <tr>
                    <th></th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="ProjectNameEN"
                        value={filters.ProjectNameEN}
                        onChange={handleFilterChange}
                        placeholder={t.projectName}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="AddressEN"
                        value={filters.AddressEN}
                        onChange={handleFilterChange}
                        placeholder={t.address}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="StartDate"
                        value={filters.StartDate}
                        onChange={handleFilterChange}
                        placeholder={t.startDate}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="form-control border border-info"
                        name="EndDate"
                        value={filters.EndDate}
                        onChange={handleFilterChange}
                        placeholder={t.endDate}
                      />
                    </th>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>{t.addnewproject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="ProjectID_1C">
              <Form.Label>{t.projectid}</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterprojectid}
                name="ProjectID_1C"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.ProjectID_1C}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="ProjectCode">
              <Form.Label>{t.projectcode}</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterprojectcode}
                name="ProjectCode"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.ProjectCode}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="ProjectNameEN">
              <Form.Label>{t.projectName} (EN)</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterenglishprojectname}
                name="ProjectNameEN"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.ProjectNameEN}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="ProjectNameRU">
              <Form.Label>{t.projectName} (RU)</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterrussianprojectname}
                name="ProjectNameRU"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.ProjectNameRU}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="ProjectNameTR">
              <Form.Label>{t.projectName} (TR)</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterturkishprojectname}
                name="ProjectNameTR"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.ProjectNameTR}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="AddressEN">
              <Form.Label>{t.address} (EN)</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterenglishaddress}
                name="AddressEN"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.AddressEN}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="AddressRU">
              <Form.Label>{t.address} (RU)</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterrussianaddress}
                name="AddressRU"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.AddressRU}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="AddressTR">
              <Form.Label>{t.address} (TR)</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t.enterturkishaddress}
                name="AddressTR"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.AddressTR}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="StartDate">
              <Form.Label>{t.startDate}</Form.Label>
              <Form.Control
                type="date"
                name="StartDate"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                defaultValue={newProject.StartDate}
                onChange={handleInputChange}
                max={newProject.EndDate || ""}
              />
            </Form.Group>
            <Form.Group controlId="EndDate">
              <Form.Label>{t.endDate}</Form.Label>
              <Form.Control
                type="date"
                name="EndDate"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                defaultValue={newProject.EndDate}
                onChange={handleInputChange}
                min={newProject.StartDate || ""}
              />
            </Form.Group>
            <Form.Group controlId="formSubjectofRF">
              <Form.Label>{t.subjectofrf}</Form.Label>
              <Form.Control
                as="select"
                name="SubjectofRF"
                style={{
                  border: "1px solid #5bcfc5",
                }}
                value={newProject.SubjectofRF}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "SubjectofRF",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
              >
                <option value="">{t.selectsubject}</option>
                {subjectOptions.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject[`SubjectOfRF_${language.toUpperCase()}`]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t.close}
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            {t.savechanges}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>{t.editproject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="ProjectID_1C">
              <Form.Label>{t.project} ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterprojectid}
                name="ProjectID_1C"
                value={selectedProject?.ProjectID_1C || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="ProjectCode">
              <Form.Label>{t.projectcode}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterprojectcode}
                name="ProjectCode"
                value={selectedProject?.ProjectCode || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="ProjectNameEN">
              <Form.Label>{t.projectName} (EN)</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterenglishprojectname}
                name="ProjectNameEN"
                value={selectedProject?.ProjectNameEN || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="ProjectNameRU">
              <Form.Label>{t.projectName} (RU)</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterrussianprojectname}
                name="ProjectNameRU"
                value={selectedProject?.ProjectNameRU || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="ProjectNameTR">
              <Form.Label>{t.projectName} (TR)</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterturkishprojectname}
                name="ProjectNameTR"
                value={selectedProject?.ProjectNameTR || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="AddressEN">
              <Form.Label>{t.address} (EN)</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterenglishaddress}
                name="AddressEN"
                value={selectedProject?.AddressEN || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="AddressRU">
              <Form.Label>{t.address} (RU)</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterrussianaddress}
                name="AddressRU"
                value={selectedProject?.AddressRU || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="AddressTR">
              <Form.Label>{t.address} (TR)</Form.Label>
              <Form.Control
                type="text"
                placeholder={t.enterturkishaddress}
                name="AddressTR"
                value={selectedProject?.AddressTR || ""}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="StartDate">
              <Form.Label>{t.startDate}</Form.Label>
              <Form.Control
                type="date"
                name="StartDate"
                max={formatDateToShow(selectedProject?.EndDate)}
                value={formatDateToShow(selectedProject?.StartDate) || ""}
                onChange={(e) =>
                  handleProjectChange({
                    target: {
                      name: "StartDate",
                      value: formatDate(e.target.value),
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="EndDate">
              <Form.Label>{t.endDate}</Form.Label>
              <Form.Control
                type="date"
                name="EndDate"
                min={formatDateToShow(selectedProject?.StartDate)}
                value={formatDateToShow(selectedProject?.EndDate) || ""}
                onChange={(e) =>
                  handleProjectChange({
                    target: {
                      name: "EndDate",
                      value: formatDate(e.target.value),
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formSubjectofRF">
              <Form.Label>{t.subjectofrf}</Form.Label>
              <Form.Control
                as="select"
                name="SubjectofRF"
                value={selectedProject?.SubjectofRF || ""}
                onChange={handleProjectChange}
              >
                <option value="">{t.selectsubject}</option>
                {subjectOptions.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.SubjectOfRF_EN}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            {t.close}
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            {t.savechanges}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectsList;