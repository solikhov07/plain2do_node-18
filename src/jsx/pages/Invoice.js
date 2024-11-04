import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const InvoiceList = () => {
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser?.access;
  const history = useNavigate();
  const [subscription, setSubscription] = useState([]);
  const [invoice, setInvoice] = useState([]);

  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!token) {
      console.error("No access token available.");
      history.push("/login");
      return;
    }

    const url = `${urlLink}/subscription/1/`;

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSubscription(data?.Response);
        setInvoice(data?.Invoices);
        console.log(data);
      })
      .catch((error) => {
        swal(
          "Error",
          "There was an issue with the fetch operation: " + error.message,
          "error"
        );
      });
  }, [token, history]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid Date";
    }

    const datePart = dateString.split(" ")[0];
    const parts = datePart.split(".");
    if (parts.length !== 3) {
      console.error("Date string is not in DD.MM.YYYY format:", datePart);
      return "Invalid Date";
    }

    const [day, month, year] = parts.map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      console.error("Parsed date parts are invalid:", { day, month, year });
      return "Invalid Date";
    }

    return `${String(day).padStart(2, "0")}.${String(month).padStart(
      2,
      "0"
    )}.${year}`;
  };

  const formatSubscriptionDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const getBadge = (type, status) => {
    switch (type) {
      case "invoice_status":
        switch (status) {
          case "Draft":
            return <span className="badge badge-warning">{status}</span>;
          case "Sent":
            return <span className="badge badge-info">{status}</span>;
          case "Void":
            return <span className="badge badge-danger">{status}</span>;
          default:
            return <span className="badge badge-secondary">Unknown</span>;
        }
      case "payment_status":
        return status === "Paid" ? (
          <span className="badge badge-success">{status}</span>
        ) : (
          <span className="badge badge-danger">{status}</span>
        );
      case "subscription_type":
        switch (status) {
          case "New":
            return <span className="badge badge-primary">{status}</span>;
          case "Renew":
            return <span className="badge badge-success">{status}</span>;
          case "Cancel":
            return <span className="badge badge-danger">{status}</span>;
          default:
            return <span className="badge badge-secondary">Unknown</span>;
        }
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <div className="card">
        <div
          className="card-header"
          style={{ padding: "20px", paddingLeft: "30px" }}
        >
          <h4 className="card-title">Subscription Plan</h4>
        </div>

        <div
          className="card-body"
          style={{ padding: "20px", paddingTop: "0px" }}
        >
          <div className="w-100 table-responsive">
            <table className="display w-100 dataTable">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>Expires in</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscription && (
                  <tr key={subscription.id}>
                    <td>{subscription.plan_name}</td>
                    <td>{subscription.subscription_duration}</td>
                    <td>{getBadge("subscription_type", subscription.type)}</td>
                    <td>{subscription.start_date}</td>
                    <td>
                      {formatSubscriptionDate(
                        subscription.subscription_end_date
                      )}
                    </td>
                    <td>
                      {subscription.status ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-danger">Not active</span>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card">
        <div
          className="card-header"
          style={{ padding: "20px", paddingLeft: "30px" }}
        >
          <h4 className="card-title">Invoices</h4>
        </div>

        <div
          className="card-body"
          style={{ padding: "20px", paddingTop: "0px" }}
        >
          <div className="w-100 table-responsive">
            <table className="display w-100 dataTable">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Created at</th>
                  <th>Due Date</th>
                  <th>Sub total</th>
                  <th>Total</th>
                  <th>Invoice Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((inv) => (
                  <tr key={inv.invoice_number}>
                    <td>{inv.invoice_number}</td>
                    <td>{formatDate(inv.created_at)}</td>
                    <td>{formatDate(inv.invoice_due_date)}</td>
                    <td>{inv.subtotal}</td>
                    <td>{inv.total}</td>
                    <td>{getBadge("invoice_status", inv.invoice_status)}</td>
                    <td>{getBadge("payment_status", inv.payment_status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InvoiceList;
