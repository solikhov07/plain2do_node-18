import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import Editable from "./Editable";

const tableList = [
  {
    id: "1",
    name: "Tiger Nixon",
    department: "Architect",
    gender: "Male",
    education: "M.COM., M.B.A",
    mobile: "12345 67890",
    email: "info1@example.com",
  },
  {
    id: "2",
    name: "Gloria Little",
    department: " Administrator",
    gender: "Male",
    education: "BTech, MTech",
    mobile: "09876 54321",
    email: "info2@example.com",
  },
  {
    id: "3",
    name: "Bradley Greer",
    department: "Software Engineer",
    gender: "Male",
    education: "B.CA M.CA",
    mobile: "98765 67890",
    email: "info3@example.com",
  },
  {
    id: "4",
    name: "Gloria Little",
    department: " Administrator",
    gender: "Male",
    education: "BTech, MTech",
    mobile: "09876 54321",
    email: "info4@example.com",
  },
  {
    id: "5",
    name: "Tiger Nixon",
    department: "Architect",
    gender: "Male",
    education: "M.COM., M.B.A",
    mobile: "12345 67890",
    email: "info5@example.com",
  },
  {
    id: "6",
    name: "Bradley Greer",
    department: "Software Engineer",
    gender: "Male",
    education: "B.CA M.CA",
    mobile: "98765 67890",
    email: "info6@example.com",
  },
];

const Todo = () => {
  const [contents, setContents] = useState(tableList);
  const [filters, setFilters] = useState({
    name: "",
    department: "",
    gender: "",
    education: "",
    mobile: "",
    email: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDeleteClick = (contentId) => {
    const newContents = contents.filter((content) => content.id !== contentId);
    setContents(newContents);
  };

  const [addCard, setAddCard] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    department: "",
    gender: "",
    education: "",
    mobile: "",
    email: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setAddFormData({
      ...addFormData,
      [fieldName]: fieldValue,
    });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const errorMessages = [];
    if (!addFormData.name.trim()) {
      errorMessages.push("Please fill the name field.");
    }
    if (!addFormData.department.trim()) {
      errorMessages.push("Please fill the department field.");
    }
    if (!addFormData.gender.trim()) {
      errorMessages.push("Please fill the gender field.");
    }
    if (errorMessages.length > 0) {
      swal("Oops", errorMessages.join("\n"), "error");
    } else {
      const newContent = {
        id: nanoid(),
        ...addFormData,
      };
      setContents([...contents, newContent]);
      setAddCard(false);
      setAddFormData({
        name: "",
        department: "",
        gender: "",
        education: "",
        mobile: "",
        email: "",
      });
      swal("Good job!", "Successfully Added", "success");
    }
  };

  const [editContentId, setEditContentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    department: "",
    gender: "",
    education: "",
    mobile: "",
    email: "",
  });

  const handleEditClick = (event, content) => {
    event.preventDefault();
    setEditContentId(content.id);
    const formValues = {
      name: content.name,
      department: content.department,
      gender: content.gender,
      education: content.education,
      mobile: content.mobile,
      email: content.email,
    };
    setEditFormData(formValues);
  };

  const renderTableRows = () => {
    const filteredContents = contents.filter((content) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return content[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });

    return filteredContents.map((content) => {
      if (editContentId === content.id) {
        return (
          <Editable
            key={content.id}
            editFormData={editFormData}
            handleEditFormChange={handleEditFormChange}
            handleCancelClick={handleCancelClick}
          />
        );
      } else {
        return (
          <tr key={content.id}>
            <td>{content.name}</td>
            <td>{content.department}</td>
            <td>{content.gender}</td>
            <td>{content.education}</td>
            <td>
              <Link to={"#"}>
                <strong>{content.mobile}</strong>
              </Link>
            </td>
            <td>
              <Link to={"#"}>
                <strong>{content.email}</strong>
              </Link>
            </td>
            <td>
              <div className="d-flex">
                <Link
                  className="btn btn-secondary shadow btn-xs sharp me-2"
                  onClick={(event) => handleEditClick(event, content)}
                >
                  <i className="fa fa-pencil"></i>
                </Link>
                <Link
                  className="btn btn-danger shadow btn-xs sharp"
                  onClick={() => handleDeleteClick(content.id)}
                >
                  <i className="fa fa-trash"></i>
                </Link>
              </div>
            </td>
          </tr>
        );
      }
    });
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setEditFormData({
      ...editFormData,
      [fieldName]: fieldValue,
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContent = {
      id: editContentId,
      ...editFormData,
    };
    const newContents = contents.map((content) =>
      content.id === editContentId ? editedContent : content
    );
    setContents(newContents);
    setEditContentId(null);
  };

  const handleCancelClick = () => {
    setEditContentId(null);
  };

  return (
    <>
      <PageTitle activeMenu="Table" motherMenu="Post" />
      <div className="col-12">
        <div className="card">
          <div className="card-header ">
            <h4 className="card-title">Profile Datatable</h4>

            <button className="btn btn-info" onClick={() => setAddCard(true)}>
              <i className="flaticon-067-plus"></i> Add Project
            </button>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <form onSubmit={handleEditFormSubmit}>
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Gender</th>
                        <th>Education</th>
                        <th>Mobile</th>
                        <th>Email</th>
                      </tr>
                      <tr>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            placeholder="Name"
                          />
                        </th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={filters.department}
                            onChange={handleFilterChange}
                            placeholder="Department"
                          />
                        </th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="gender"
                            value={filters.gender}
                            onChange={handleFilterChange}
                            placeholder="Gender"
                          />
                        </th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="education"
                            value={filters.education}
                            onChange={handleFilterChange}
                            placeholder="Education"
                          />
                        </th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            value={filters.mobile}
                            onChange={handleFilterChange}
                            placeholder="Mobile"
                          />
                        </th>
                        <th>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={filters.email}
                            onChange={handleFilterChange}
                            placeholder="Email"
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal fade"
        show={addCard}
        onHide={() => setAddCard(false)}
      >
        <div className="" role="document">
          <div className="">
            <form>
              <div className="modal-header">
                <h4 className="modal-title fs-20">Add Contact</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddCard(false)}
                  data-dismiss="modal"
                >
                  <span></span>
                </button>
              </div>
              <div className="modal-body">
                <i
                  className="flaticon-cancel-12 close"
                  data-dismiss="modal"
                ></i>
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Name</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="name"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="name"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Department</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="department"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="department"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Gender</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="gender"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="gender"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Education</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="education"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="education"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Mobile</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="mobile"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="mobile"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Email</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="email"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="email"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddFormSubmit}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setAddCard(false)}
                  className="btn btn-danger"
                >
                  {" "}
                  <i className="flaticon-delete-1"></i> Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Todo;