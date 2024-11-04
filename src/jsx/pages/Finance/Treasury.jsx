import React, { useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";
import { fetchOperationType } from "../../components/apiData/apiFinance";
import {
  fetchCurrency,
  fetchEmployee,
} from "../../components/apiData/apiEmployee";
import { fetchProjects } from "../../components/apiData/apiData";
import { Tab, Tabs } from "react-bootstrap";
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";

const Treasury = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const { language } = useLanguage();
  const t = translations[language];
  const [errors, setErrors] = useState({});
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [canGoNext, setCanGoNext] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTreasure, setSelectedTreasure] = useState(null);
  const [operationType, setOperationType] = useState([]);
  const [countryParty, setCountryParty] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const history = useNavigate();
  const urlLink = process.env.REACT_APP_API_URL;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [activeTab, setActiveTab] = useState("Bank");
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const [loading, setLoading] = useState(true);
  const id = decodedToken.payload.user_id;

  const initialTreasureState = {
    our_company: 0,
    operation_type: 0,
    counter_party: 0,
    date: "",
    document_number: 0,
    transaction_method: "",
    bank_account: "",
    bank_account_cp: 0,
    expense_type: "",
    currency: "",
    amount: 0,
    vat: 0,
    vat_amount: 0,
    payment_details: "",
    comment: "",
    kbbo_code: "",
    cr: 0,
    dr: 0,
    responsible_user: 0,
    cost_center: 0,
  };
  const [newTreasure, setNewTreasure] = useState(initialTreasureState);

  // Fetching Options

  useEffect(() => {
    const getOperationType = async () => {
      const data = await fetchOperationType(token);
      setOperationType(data);
    };

    getOperationType();
  }, [token]);

  useEffect(() => {
    const getCountryParty = async () => {
      const data = await fetchEmployee(token);
      setCountryParty(data);
    };

    getCountryParty();
  }, [token]);

  useEffect(() => {
    const getCurrency = async () => {
      const data = await fetchCurrency(token);
      setCurrency(data);
    };

    getCurrency();
  }, [token]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects(token);
      setProjects(data);
    };

    getProjects();
  }, [token]);

  // Main fetch API

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    setLoading(true);

    const fetchData = async (transactionMethod) => {
      const url = `${urlLink}/finance/?page=${currentPage}&limit=${itemsPerPage}&transaction_method=${transactionMethod}`;

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`${t.httperrorstatus}${response.status}`);
        }
        const data = await response.json();
        setContents(data.results);
        setTotalItems(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          t.error
        );
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "Bank") {
      fetchData("Bank");
    } else if (activeTab === "Cash") {
      fetchData("Cash");
    }
  }, [activeTab, currentPage, itemsPerPage]);

  // Edit Treasure

  const handleEditClick = (treasure) => {
    setSelectedTreasure(treasure);
    setShowEditModal(true);
    setErrors({});
  };

  const handleTreasureChange = (event) => {
    const { name, value } = event.target;
    setSelectedTreasure((prevTreasure) => ({
      ...prevTreasure,
      [name]: value,
    }));
  };

  const handleUpdateTreasure = () => {
    const url = `${urlLink}/finance/${selectedTreasure.id}/`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTreasure),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw data;
          });
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
          t.success
        );
        setErrors({});
      })
      .catch((error) => {
        if (typeof error === "object") {
          const validationErrors = {};
          for (const key in error) {
            if (error.hasOwnProperty(key)) {
              validationErrors[key] = error[key][0];
            }
          }
          setErrors(validationErrors);
        } else {
          swal(
            t.error.charAt(0).toUpperCase() + t.error.slice(1),
            t.failedtoaddtreasure + (error.message || t.anerrorocurred),
            t.error
          );
        }
      });
  };

  // Delete Treasure

  const handleDeleteClick = (treasureId) => {
    swal({
      title: t.areyousure,
      text: t.oncedeletedyouwillnotbeabletorecoverthisproject,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${urlLink}/finance/${treasureId}/`;
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
            setContents(contents.filter((item) => item.id !== treasureId));
            swal(t.proofyourprojecthasbeendeleted, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting project:", error);
            swal("Error", "Failed to delete project", "error");
          });
      }
    });
  };

  // Add Treasue

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTreasure((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowModal = () => {
    setNewTreasure(initialTreasureState);
    setShowModal(true);
    setErrors({});
  };

  const handleAddTreasure = (event) => {
    event.preventDefault();

    const formattedTreasure = {
      ...newTreasure,
      responsible_user: id,
      our_company: 1,
      transaction_method: activeTab,
      date: formatDate(newTreasure.date),
    };

    const url = `${urlLink}/finance/`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedTreasure),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw data;
          });
        }
        return response.json();
      })
      .then((data) => {
        const savedData = data["Data is successfully saved"];
        setContents((prev) => [...prev, savedData]);
        setShowModal(false);
        swal("Success", "Treasure added successfully!", "success");
        setErrors({});
      })
      .catch((error) => {
        if (typeof error === "object") {
          const validationErrors = {};
          for (const key in error) {
            if (error.hasOwnProperty(key)) {
              validationErrors[key] = error[key][0];
            }
          }
          setErrors(validationErrors);
        } else {
          swal(
            "Error",
            "Failed to add treasure: " + (error.message || "An error occurred"),
            "error"
          );
        }
      });
  };

  // Select row

  const downloadProjects = () => {
    if (!token) {
      console.error("No access token available.");
      return;
    }

    const selectedIds = selectedItems.map((item) => item.id);

    if (selectedIds.length === 0) {
      swal("Error", "Please select at least one item to download.", "error");
      return;
    }

    let url = `${urlLink}/finance/`;
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
        const disposition = response.headers.get("Content-Disposition");
        let filename = "finance.xls";

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
          t.failedtodownloadprojectdata + error.message,
          t.error
        );
      });
  };

  const handleSelectAll = () => {
    const allSelected = selectedItems.length === contents.length;
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(contents.slice());
    }
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

  //Render

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace(/,/g, " "); // Replace commas with spaces
  };

  const renderTableRows = () => {
    return contents.map((content) => (
      <tr key={content.id}>
        <td>
          <input
            type="checkbox"
            checked={isRowSelected(content.id)}
            onChange={() => handleRowSelect(content.id)}
          />
        </td>
        <td>{content.id}</td>
        <td>{content.date}</td>
        <td style={{ whiteSpace: "nowrap" }}>{formatAmount(content.amount)}</td>
        <td>{content.document_number}</td>
        <td>{content.expense_type}</td>
        <td>
          {content.operation_type_data["name" + language.toUpperCase()] ||
            "N/A"}
        </td>
        <td>
          {content.our_company_data["OurCompany" + language.toUpperCase()] ||
            "N/A"}
        </td>
        <td>
          {content.counter_party_data.firstname}{" "}
          {content.counter_party_data.surname}
        </td>
        <td>{content.operation_type_data?.nameEN || "N/A"}</td>
        <td>{content.our_company_data?.OurCompanyEN || "N/A"}</td>
        <td>
          {content.counter_party_data?.firstname}
          {"  "}
          {content.counter_party_data?.surname}
        </td>
        <td>{content.vat}</td>
        <td>{content.cr}</td>
        <td>{content.currency}</td>

        <td className="datab">
          <button
            className="btn btn-secondary shadow btn-xs sharp me-2"
            onClick={() => handleEditClick(content)}
          >
            <i className="fa fa-pencil"></i>
          </button>

          <button
            className="btn btn-danger shadow btn-xs sharp"
            onClick={() => handleDeleteClick(content.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatDateToShow = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  // Pagination
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <PageTitle activeMenu={t.bankandcash} motherMenu={t.treasury} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Tabs
          activeKey={activeTab}
          onSelect={(tabKey) => setActiveTab(tabKey)}
          className="ms-3 custom-tabs"
        >
          <Tab eventKey="Bank" title="Bank">
            <div className="card">
              <div
                className="card-header"
                style={{ padding: "20px", paddingLeft: "30px" }}
              >
                <h4 className="card-title">{t.financetreasury}</h4>
                <div className="btn-wrapper">
                  <Button
                    className="btn btn-info ms-1"
                    onClick={handleShowModal}
                  >
                    <i
                      className="flaticon-069-plus
"
                    ></i>{" "}
                    {t.addtreasurybank}
                  </Button>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  paddingTop: "20px",
                  paddingRight: "20px",
                  paddingLeft: "30px",
                }}
              >
                <div className="form-group d-flex align-items-center m-0">
                  <label htmlFor="itemsPerPageSelect" className="m-0 me-2">
                    {t.projectsPerPage}:
                  </label>
                  <select
                    className="form-control"
                    style={{
                      width: "100px",
                      border: "1px solid #5bcfc5",
                    }}
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>

                <div className="d-flex ">
                  <Button className="btn btn-info ms-1">
                    <i className="flaticon-002-arrow-down me-1"></i>{" "}
                    {t.importtreasury}
                  </Button>

                  <Button
                    className="btn btn-info ms-1"
                    onClick={downloadProjects}
                  >
                    <i className="flaticon-004-arrow-up me-1"></i>{" "}
                    {t.exporttreasury}
                  </Button>
                </div>
              </div>

              <div className="card-body" style={{ padding: "20px" }}>
                <div className="table-responsive">
                  <table className="table table-responsive-md card-table transactions-table">
                    <thead>
                      <tr>
                        <th>{t.select}</th>
                        <th>ID</th>
                        <th>Date</th>
                        <th>{t.amount}</th>
                        <th>{t.documentNumber}</th>
                        <th>{t.expensetype}</th>
                        <th>{t.operationtype}</th>
                        <th>{t.our_company}</th>
                        <th>{t.counter_party}</th>
                        <th>VAT</th>
                        <th>CR</th>
                        <th>{t.currency}</th>
                        <th>{t.action}</th>
                      </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                  </table>
                </div>
              </div>

              <div
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                className="d-flex align-items-center justify-content-between mt-3 mb-3"
              >
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
          </Tab>
          <Tab eventKey="Cash" title="Cash">
            <div className="card">
              <div
                className="card-header"
                style={{ padding: "20px", paddingLeft: "30px" }}
              >
                <h4 className="card-title">{t.financetreasury}</h4>
                <div className="btn-wrapper">
                  <Button
                    className="btn btn-info ms-1"
                    onClick={handleShowModal}
                  >
                    <i
                      className="flaticon-069-plus
"
                    ></i>{" "}
                    {t.addtreasurycash}
                  </Button>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{
                  paddingTop: "20px",
                  paddingRight: "20px",
                  paddingLeft: "30px",
                }}
              >
                <div className="form-group d-flex align-items-center m-0">
                  <label htmlFor="itemsPerPageSelect" className="m-0 me-2">
                    {t.projectsPerPage}:
                  </label>
                  <select
                    className="form-control"
                    style={{
                      width: "100px",
                      border: "1px solid #5bcfc5",
                    }}
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>

                <div className="d-flex ">
                  <Button className="btn btn-info ms-1">
                    <i className="flaticon-002-arrow-down me-1"></i>{" "}
                    {t.importtreasury}
                  </Button>

                  <Button
                    className="btn btn-info ms-1"
                    onClick={downloadProjects}
                  >
                    <i className="flaticon-004-arrow-up me-1"></i>{" "}
                    {t.exporttreasury}
                  </Button>
                </div>
              </div>

              <div className="card-body" style={{ padding: "20px" }}>
                <div className="table-responsive">
                  <table className="table table-responsive-md card-table transactions-table">
                    <thead>
                      <tr>
                        <th>{t.select}</th>
                        <th>ID</th>
                        <th>Date</th>
                        <th>{t.amount}</th>
                        <th>{t.documentNumber}</th>
                        <th>{t.expensetype}</th>
                        <th>{t.operationtype}</th>
                        <th>{t.our_company}</th>
                        <th>{t.counter_party}</th>
                        <th>VAT</th>
                        <th>CR</th>
                        <th>{t.currency}</th>
                        <th>{t.action}</th>
                      </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                  </table>
                </div>
              </div>

              <div
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                className="d-flex align-items-center justify-content-between mt-3 mb-3"
              >
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
          </Tab>
        </Tabs>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t.addnewtreasury}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t.operationtype}</Form.Label>
              <Form.Control
                as="select"
                name="operation_type"
                value={newTreasure.operation_type}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "operation_type",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                isInvalid={!!errors.operation_type}
                required
              >
                <option value="">{t.selectoperationtype}</option>
                {operationType.map((operation) => (
                  <option key={operation.id} value={operation.id}>
                    {operation["name" + language.toUpperCase()]}
                  </option>
                ))}
              </Form.Control>
              {errors.operation_type && (
                <Form.Control.Feedback type="invalid">
                  {errors.operation_type}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Counter Party */}
            <Form.Group className="mb-3">
              <Form.Label>{t.counter_party}</Form.Label>
              <Form.Control
                as="select"
                name="counter_party"
                value={newTreasure.counter_party}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "counter_party",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                isInvalid={!!errors.counter_party}
                required
              >
                <option value="">{t.selectcounterparty}</option>
                {countryParty.map((counterParty) => (
                  <option key={counterParty.id} value={counterParty.id}>
                    {counterParty?.firstname} {counterParty?.surname}
                  </option>
                ))}
              </Form.Control>
              {errors.counter_party && (
                <Form.Control.Feedback type="invalid">
                  {errors.counter_party}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Date */}
            <Form.Group className="mb-3">
              <Form.Label>{t.date}</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newTreasure.date}
                onChange={handleInputChange}
                isInvalid={!!errors.date}
                required
              />
              {errors.date && (
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Document Number */}
            <Form.Group className="mb-3">
              <Form.Label>{t.documentNumber}</Form.Label>
              <Form.Control
                type="number"
                name="document_number"
                value={newTreasure.document_number}
                onChange={handleInputChange}
                isInvalid={!!errors.document_number}
                required
              />
              {errors.document_number && (
                <Form.Control.Feedback type="invalid">
                  {errors.document_number}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Bank Account */}
            <Form.Group className="mb-3">
              <Form.Label>{t.bankaccount}</Form.Label>
              <Form.Control
                type="text"
                name="bank_account"
                value={newTreasure.bank_account}
                onChange={handleInputChange}
                isInvalid={!!errors.bank_account}
                required
              />
              {errors.bank_account && (
                <Form.Control.Feedback type="invalid">
                  {errors.bank_account}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Bank Account CP */}
            <Form.Group className="mb-3">
              <Form.Label>{t.bankaccountcp}</Form.Label>
              <Form.Control
                type="number"
                name="bank_account_cp"
                value={newTreasure.bank_account_cp}
                onChange={handleInputChange}
                isInvalid={!!errors.bank_account_cp}
                required
              />
              {errors.bank_account_cp && (
                <Form.Control.Feedback type="invalid">
                  {errors.bank_account_cp}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Expense Type */}
            <Form.Group className="mb-3">
              <Form.Label>{t.expensetype}</Form.Label>
              <Form.Control
                type="text"
                name="expense_type"
                value={newTreasure.expense_type}
                onChange={handleInputChange}
                isInvalid={!!errors.expense_type}
                required
              />
              {errors.expense_type && (
                <Form.Control.Feedback type="invalid">
                  {errors.expense_type}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Currency */}
            <Form.Group className="mb-3">
              <Form.Label>{t.currency}</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={newTreasure.currency}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "currency",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                isInvalid={!!errors.currency}
                required
              >
                <option value="">{t.selectcurrency}</option>
                {currency.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency["Currency" + language.toUpperCase()]}
                  </option>
                ))}
              </Form.Control>
              {errors.currency && (
                <Form.Control.Feedback type="invalid">
                  {errors.currency}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Amount */}
            <Form.Group className="mb-3">
              <Form.Label>{t.amount}</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newTreasure.amount}
                onChange={handleInputChange}
                isInvalid={!!errors.amount}
                required
              />
              {errors.amount && (
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* VAT */}
            <Form.Group className="mb-3">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="number"
                name="vat"
                value={newTreasure.vat}
                onChange={handleInputChange}
                isInvalid={!!errors.vat}
                required
              />
              {errors.vat && (
                <Form.Control.Feedback type="invalid">
                  {errors.vat}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* VAT Amount */}
            <Form.Group className="mb-3">
              <Form.Label>{t.vatamount}</Form.Label>
              <Form.Control
                type="number"
                name="vat_amount"
                value={newTreasure.vat_amount}
                onChange={handleInputChange}
                isInvalid={!!errors.vat_amount}
                required
              />
              {errors.vat_amount && (
                <Form.Control.Feedback type="invalid">
                  {errors.vat_amount}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Payment Details */}
            <Form.Group className="mb-3">
              <Form.Label>{t.paymentdetails}</Form.Label>
              <Form.Control
                type="text"
                name="payment_details"
                value={newTreasure.payment_details}
                onChange={handleInputChange}
                isInvalid={!!errors.payment_details}
                required
              />
              {errors.payment_details && (
                <Form.Control.Feedback type="invalid">
                  {errors.payment_details}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Comment */}
            <Form.Group className="mb-3">
              <Form.Label>{t.comment}</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={newTreasure.comment}
                onChange={handleInputChange}
                isInvalid={!!errors.comment}
              />
              {errors.comment && (
                <Form.Control.Feedback type="invalid">
                  {errors.comment}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* KBBO Code */}
            <Form.Group className="mb-3">
              <Form.Label>
                {t.kbbo} {t.code}
              </Form.Label>
              <Form.Control
                type="text"
                name="kbbo_code"
                value={newTreasure.kbbo_code}
                onChange={handleInputChange}
                isInvalid={!!errors.kbbo_code}
              />
              {errors.kbbo_code && (
                <Form.Control.Feedback type="invalid">
                  {errors.kbbo_code}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* CR */}
            <Form.Group className="mb-3">
              <Form.Label>CR</Form.Label>
              <Form.Control
                type="number"
                name="cr"
                value={newTreasure.cr}
                onChange={handleInputChange}
                isInvalid={!!errors.cr}
              />
              {errors.cr && (
                <Form.Control.Feedback type="invalid">
                  {errors.cr}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* DR */}
            <Form.Group className="mb-3">
              <Form.Label>DR</Form.Label>
              <Form.Control
                type="number"
                name="dr"
                value={newTreasure.dr}
                onChange={handleInputChange}
                isInvalid={!!errors.dr}
              />
              {errors.dr && (
                <Form.Control.Feedback type="invalid">
                  {errors.dr}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t.costcenter}</Form.Label>
              <Form.Control
                as="select"
                name="cost_center"
                value={newTreasure.cost_center}
                isInvalid={!!errors.cost_center}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "cost_center",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                required
              >
                {" "}
                <option value="">{t.selectproject}</option>
                {projects.map((projects) => (
                  <option key={projects.id} value={projects.id}>
                    {projects?.ProjectNameEN}
                  </option>
                ))}
              </Form.Control>
              {errors.cost_center && (
                <Form.Control.Feedback type="invalid">
                  {errors.cost_center}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t.close}
          </Button>
          <Button variant="primary" onClick={handleAddTreasure}>
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
            <Form.Group className="mb-3">
              <Form.Label>{t.operationtype}</Form.Label>
              <Form.Control
                as="select"
                name="operation_type"
                defaultValue={selectedTreasure?.operation_type_data.id}
                onChange={(e) =>
                  handleTreasureChange({
                    target: {
                      name: "operation_type",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                isInvalid={!!errors.operation_type}
                required
              >
                <option value="">{t.selectoperationtype}</option>
                {operationType.map((operation) => (
                  <option key={operation.id} value={operation.id}>
                    {operation["name" + language.toUpperCase()]}
                  </option>
                ))}
              </Form.Control>
              {errors.operation_type && (
                <Form.Control.Feedback type="invalid">
                  {errors.operation_type}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Counter Party */}
            <Form.Group className="mb-3">
              <Form.Label>{t.counter_party}</Form.Label>
              <Form.Control
                as="select"
                name="counter_party"
                defaultValue={selectedTreasure?.counter_party_data.id}
                onChange={(e) =>
                  handleTreasureChange({
                    target: {
                      name: "counter_party",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                isInvalid={!!errors.counter_party}
                required
              >
                <option value="">{t.selectcounterparty}</option>
                {countryParty.map((counterParty) => (
                  <option key={counterParty.id} value={counterParty.id}>
                    {counterParty.firstname} {counterParty.surname}
                  </option>
                ))}
              </Form.Control>
              {errors.counter_party && (
                <Form.Control.Feedback type="invalid">
                  {errors.counter_party}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Date */}
            <Form.Group className="mb-3">
              <Form.Label>{t.date}</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formatDateToShow(selectedTreasure?.date)}
                onChange={(e) =>
                  handleTreasureChange({
                    target: {
                      name: "date",
                      value: formatDate(e.target.value),
                    },
                  })
                }
                isInvalid={!!errors.date}
                required
              />
              {errors.date && (
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Document Number */}
            <Form.Group className="mb-3">
              <Form.Label>{t.documentNumber}</Form.Label>
              <Form.Control
                type="number"
                name="document_number"
                value={selectedTreasure?.document_number}
                onChange={handleTreasureChange}
                isInvalid={!!errors.document_number}
                required
              />
              {errors.document_number && (
                <Form.Control.Feedback type="invalid">
                  {errors.document_number}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Bank Account */}
            <Form.Group className="mb-3">
              <Form.Label>{t.bankaccount}</Form.Label>
              <Form.Control
                type="text"
                name="bank_account"
                value={selectedTreasure?.bank_account}
                onChange={handleTreasureChange}
                isInvalid={!!errors.bank_account}
                required
              />
              {errors.bank_account && (
                <Form.Control.Feedback type="invalid">
                  {errors.bank_account}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Bank Account CP */}
            <Form.Group className="mb-3">
              <Form.Label>{t.bankaccountcp}</Form.Label>
              <Form.Control
                type="number"
                name="bank_account_cp"
                value={selectedTreasure?.bank_account_cp}
                onChange={handleTreasureChange}
                isInvalid={!!errors.bank_account_cp}
                required
              />
              {errors.bank_account_cp && (
                <Form.Control.Feedback type="invalid">
                  {errors.bank_account_cp}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Expense Type */}
            <Form.Group className="mb-3">
              <Form.Label>{t.expensetype}</Form.Label>
              <Form.Control
                type="text"
                name="expense_type"
                value={selectedTreasure?.expense_type}
                onChange={handleTreasureChange}
                isInvalid={!!errors.expense_type}
                required
              />
              {errors.expense_type && (
                <Form.Control.Feedback type="invalid">
                  {errors.expense_type}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Currency */}
            <Form.Group className="mb-3">
              <Form.Label>{t.currency}</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={selectedTreasure?.currency}
                onChange={(e) =>
                  handleTreasureChange({
                    target: {
                      name: "currency",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                isInvalid={!!errors.currency}
                required
              >
                <option value="">Select Currency</option>
                {currency.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency["Currency" + language.toUpperCase()]}
                  </option>
                ))}
              </Form.Control>
              {errors.currency && (
                <Form.Control.Feedback type="invalid">
                  {errors.currency}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Amount */}
            <Form.Group className="mb-3">
              <Form.Label>{t.amount}</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={selectedTreasure?.amount}
                onChange={handleTreasureChange}
                isInvalid={!!errors.amount}
                required
              />
              {errors.amount && (
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* VAT */}
            <Form.Group className="mb-3">
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="number"
                name="vat"
                value={selectedTreasure?.vat}
                onChange={handleTreasureChange}
                isInvalid={!!errors.vat}
                required
              />
              {errors.vat && (
                <Form.Control.Feedback type="invalid">
                  {errors.vat}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* VAT Amount */}
            <Form.Group className="mb-3">
              <Form.Label>{t.vatamount}</Form.Label>
              <Form.Control
                type="number"
                name="vat_amount"
                value={selectedTreasure?.vat_amount}
                onChange={handleTreasureChange}
                isInvalid={!!errors.vat_amount}
                required
              />
              {errors.vat_amount && (
                <Form.Control.Feedback type="invalid">
                  {errors.vat_amount}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Payment Details */}
            <Form.Group className="mb-3">
              <Form.Label>{t.paymentdetails}</Form.Label>
              <Form.Control
                type="text"
                name="payment_details"
                value={selectedTreasure?.payment_details}
                onChange={handleTreasureChange}
                isInvalid={!!errors.payment_details}
                required
              />
              {errors.payment_details && (
                <Form.Control.Feedback type="invalid">
                  {errors.payment_details}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Comment */}
            <Form.Group className="mb-3">
              <Form.Label>{t.comment}</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={selectedTreasure?.comment}
                onChange={handleTreasureChange}
                isInvalid={!!errors.comment}
              />
              {errors.comment && (
                <Form.Control.Feedback type="invalid">
                  {errors.comment}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* KBBO Code */}
            <Form.Group className="mb-3">
              <Form.Label>
                {t.kbbo} {t.code}
              </Form.Label>
              <Form.Control
                type="text"
                name="kbbo_code"
                value={selectedTreasure?.kbbo_code}
                onChange={handleTreasureChange}
                isInvalid={!!errors.kbbo_code}
              />
              {errors.kbbo_code && (
                <Form.Control.Feedback type="invalid">
                  {errors.kbbo_code}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* CR */}
            <Form.Group className="mb-3">
              <Form.Label>CR</Form.Label>
              <Form.Control
                type="number"
                name="cr"
                value={selectedTreasure?.cr}
                onChange={handleTreasureChange}
                isInvalid={!!errors.cr}
              />
              {errors.cr && (
                <Form.Control.Feedback type="invalid">
                  {errors.cr}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* DR */}
            <Form.Group className="mb-3">
              <Form.Label>DR</Form.Label>
              <Form.Control
                type="number"
                name="dr"
                value={selectedTreasure?.dr}
                onChange={handleTreasureChange}
                isInvalid={!!errors.dr}
              />
              {errors.dr && (
                <Form.Control.Feedback type="invalid">
                  {errors.dr}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t.costcenter}</Form.Label>
              <Form.Control
                as="select"
                name="cost_center"
                defaultValue={selectedTreasure?.cost_center}
                isInvalid={!!errors.cost_center}
                onChange={(e) =>
                  handleTreasureChange({
                    target: {
                      name: "cost_center",
                      value: parseInt(e.target.value, 10) || "",
                    },
                  })
                }
                required
              >
                {" "}
                <option value="">{t.selectproject}</option>
                {projects.map((projects) => (
                  <option key={projects.id} value={projects.id}>
                    {projects["ProjectName" + language.toUpperCase()]}
                  </option>
                ))}
              </Form.Control>
              {errors.cost_center && (
                <Form.Control.Feedback type="invalid">
                  {errors.cost_center}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            {t.close}
          </Button>
          <Button variant="primary" onClick={handleUpdateTreasure}>
            {t.savechanges}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Treasury;
