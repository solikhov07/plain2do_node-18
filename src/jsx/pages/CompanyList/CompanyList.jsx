import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import PageTitle from "../../layouts/PageTitle";
import { useLanguage } from "../../../context/LanguageContext";
import translations from "../../../translation/translation";

const CompanyList = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const history = useNavigate();
  const [contents, setContents] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];
  const r = translations.registration[language];
  const m = translations.timesheet[language];
  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/gendt/company/`;
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
        setContents(data.Response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          t.error.charAt(0).toUpperCase() + t.error.slice(1),
          t.therewasissuewithfetchoperation + error.message,
          "error"
        );
      });
  }, [token, history]);

  const handleDeleteClick = (companyId) => {
    swal({
      title: t.areyousure,
      text: t.oncedeletedyouwillnotbeabletorecoverthisproject,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `${urlLink}/gendt/company/${companyId}/`;
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
            setContents(contents.filter((item) => item.id !== companyId));
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

  const renderTableRows = () => {
    return contents.map((content) => (
      <tr className="" key={content.id}>
        <td>{content?.OurCompanyINN || "N/A"}</td>
        <td>{content?.OurCompanyKPP || "N/A"}</td>
        <td>{content?.ShortCode || "N/A"}</td>
        <td>{content?.address || "N/A"}</td>
        <td>{content?.number_of_employees || 0}</td>
        <td>{content?.employees_in_plain2do || 0}</td>
        <td>
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

  return (
    <>
      <PageTitle activeMenu={t.companyList} motherMenu={t.profile} />
      <div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{t.companyList}</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <table className="display w-100 dataTable ">
                <thead>
                  <tr className="sticky-header">
                    <th>{r.companyINN}</th>
                    <th>{r.companyKPP}</th>
                    <th>{m.name}</th>
                    <th>{t.address}</th>
                    <th>Number of employee</th>
                    <th>Employee in Plain2do</th>
                    <th>{t.action}</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyList;