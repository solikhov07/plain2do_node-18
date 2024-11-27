import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import "./styles.css";
import { useLanguage } from "../../../context/LanguageContext";
import { Spinner } from "react-bootstrap";
import translations from "../../../translation/translation";
import PassportFAQ from "./ComponentsFAQ/PasportFAQ";
import VisaFAQ from "./ComponentsFAQ/VisaFAQ";
import PatentFAQ from "./ComponentsFAQ/PatentFAQ";
import InnFAQ from "./ComponentsFAQ/InnFAQ";
import RegistrationFAQ from "./ComponentsFAQ/RegistrationFAQ";
import MedicalFAQ from "./ComponentsFAQ/MedicalFAQ";
import MigrFAQ from "./ComponentsFAQ/MigrFAQ";
import CertFAQ from "./ComponentsFAQ/CertFAQ";
import PermitFAQ from "./ComponentsFAQ/PermitFAQ";
import FingerPrintFAQ from "./ComponentsFAQ/FingerPrintFAQ";
import SnillsFAQ from "./ComponentsFAQ/SnillsFAQ";

const FAQ = () => {
  const history = useNavigate();
  const { id } = useParams();
  const { language } = useLanguage();
  const t = translations[language];
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser ? parser.access : null;
  const [data, setData] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [alphaCode, setAlphaCode] = useState("");
  const [dataFilter, setDataFilter] = useState("latest");
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const urlLink = process.env.REACT_APP_API_URL;

  const handleDataFilterChange = (event) => {
    setDataFilter(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/employee/${id}/?documents=True&${dataFilter}=True`;
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data.Response);
        if (data?.Response?.Passport && data?.Response?.Passport.length > 0) {
          setAlphaCode(
            data?.Response?.Passport[0]?.IssuedBy_data?.AlphaCode3.toLowerCase()
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      });
  }, [token, history, id, dataFilter, shouldRefetch]);

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const url = `${urlLink}/employee/${id}/`;
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data.Response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      });
  }, [token, history, id, dataFilter, shouldRefetch]);

  const handleUpdate = () => {
    setShouldRefetch((prev) => !prev);
  };

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBack = () => {
    history(-1);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex me-3 mb-2">
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
      </div>

      <PassportFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        token={token}
        t={t}
        alphaCode={alphaCode}
        handleUpdate={handleUpdate}
        id={id}
        dataFilter={dataFilter}
      />

      <VisaFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        handleUpdate={handleUpdate}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
      />

      <PatentFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        handleUpdate={handleUpdate}
      />

      <SnillsFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />

      <InnFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />
      <RegistrationFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />
      <MedicalFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />

      <MigrFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />
      <CertFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />
      <PermitFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />
      <FingerPrintFAQ
        data={data}
        openSection={openSection}
        handleToggle={handleToggle}
        t={t}
        id={id}
        token={token}
        dataFilter={dataFilter}
        employee={employee}
        handleUpdate={handleUpdate}
      />

      <button className="btn btn-secondary " onClick={handleBack}>
        {t.back}
      </button>
    </div>
  );
};

export default FAQ;