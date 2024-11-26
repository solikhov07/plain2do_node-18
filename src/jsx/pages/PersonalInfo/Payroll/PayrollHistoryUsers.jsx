import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const PayrollHistoryUser = () => {
  const { id } = useParams();
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const history = useNavigate();
  const urlLink = process.env.REACT_APP_API_URL;
  const [historyUser, setHistoryUser] = useState([]);

  const appLanguage = localStorage.getItem("appLanguage");
  const languageMap = {
    en: "english",
    tr: "turkish",
    ru: "russian",
  };
  const language = languageMap[appLanguage] || "english"; // Default to 'english' if not found

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history("/login");
      return;
    }

    const fetchData = async () => {
      const url = `${urlLink}/employee-history-payroll/${id}/?language=${language}`;

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        setHistoryUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      }
    };

    fetchData();
  }, [language, token, history, id, urlLink]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace(/,/g, " "); // Replace commas with spaces
  };

  const renderTableRows = () => {
    return historyUser.map((content) => (
      <tr key={content.id}>
        <td style={{ whiteSpace: "nowrap" }}>
          {content?.payroll_date || "No date"}
        </td>
        <td>{content?.period || "No Period"}</td>
        <td>{content?.description || "No Finance"}</td>
        <td style={{ whiteSpace: "nowrap" }}>
          {formatAmount(content?.payroll_amount) || "0"}
        </td>
        <td style={{ whiteSpace: "nowrap" }}>
          {formatAmount(content?.finance_amount) || "0"}
        </td>
        <td style={{ whiteSpace: "nowrap" }}>
          {formatAmount(content?.cumulative_saldo) || "No Saldo"}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="card">
        <div
          className="card-header"
          style={{ padding: "20px", paddingLeft: "30px" }}
        >
          <h4 className="card-title">Payroll Histroy User</h4>
        </div>
        <div className="card-body" style={{ padding: "20px" }}>
          <div className="table-responsive">
            <table className="table table-responsive-md card-table transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Period</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Amount</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollHistoryUser;
