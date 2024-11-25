import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//Images
import pattern6 from "./../../../images/pattern/pattern6.png";
import circle from "./../../../images/pattern/circle.png";
//Components
import { ThemeContext } from "../../../context/ThemeContext";
import DropdownBlog from "../Dompet/DropdownBlog";
import PreviousTab from "../Dompet/Home/PreviousTab";
import InvoiceCard from "../Dompet/Home/InvoiceCard";
import SpendingsBlog from "../Dompet/Home/SpendingsBlog";
import QuickTransferBlog from "../Dompet/Home/QuickTransferBlog";
import CardBlog from "../Dompet/Home/CardBlog";
import ChartPie from "../charts/Chartjs/pie";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

const PolarChart = loadable(() =>
  pMinDelay(import("../Dompet/Home/PolarChart"), 1000)
);
const ActivityApexBarGraph = loadable(() =>
  pMinDelay(import("../Dompet/Home/ActivityApexBarGraph"), 1000)
);
const TransactionApexBar = loadable(() =>
  pMinDelay(import("../Dompet/Home/TransactionApexBar"), 1000)
);

const Home = () => {
  const paidPercentage = 43;
  const unpaidPercentage = 57;

  return (
    <>
      <div className="row invoice-card-row">
        <InvoiceCard />
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-xl-6">
                  <div className="card-bx bg-blue">
                    <img className="pattern-img" src={pattern6} alt="" />
                    <div className="card-info text-white">
                      <img src={circle} className="mb-4" alt="" />
                      <h2 className="text-white card-balance">$824,571.93</h2>
                      <p className="fs-16">Total Payroll</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="row mt-xl-0 mt-4">
                    <div className="col-md-6">
                      <h4 className="card-title">Payroll's Overview</h4>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        psu olor
                      </span>
                      <ul className="card-list mt-4">
                        <li>
                          <span className="bg-success circle"></span>Paid
                          <span>{paidPercentage}%</span>
                        </li>
                        <li>
                          <span className="bg-danger circle"></span>Unpaid
                          <span>{unpaidPercentage}%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ChartPie
                        data={[paidPercentage, unpaidPercentage]}
                        labels={["Paid", "Unpaid"]}
                        colors={["#68e365", "#f44336"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;