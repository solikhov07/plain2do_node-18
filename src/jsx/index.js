import React, { useContext } from "react";
/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import MyWallet from "./components/Dashboard/MyWallet";
import Invoices from "./components/Dashboard/Invoices";
import CardsCenter from "./components/Dashboard/CardsCenter";
import Transaction from "./components/Dashboard/Transaction";
import TransactionDetails from "./components/Dashboard/TransactionDetails";

/// Plain2do
import ProjectsList from "./pages/Projects/listProjects";

import BudgetList from "./pages/Budgets/budgets";
import BudgetItem from "./pages/Budgets/budgetItem";
import EditBudget from "./pages/Budgets/EditBudget";
import AddBudgetItem from "./pages/Budgets/AddBudgetItem";
import GanttChart from "./pages/Gantt/ganttChart";
import PersonalInformation from "./pages/PersonalInfo/personalInfo";
import EmployeeList from "./pages/Employee/employeeList";
import AddEmployee from "./pages/Employee/AddEmployee";
import TimeSheetTable from "./pages/Timesheet/Timesheet";
import TimesheetDetails from "./pages/Timesheet/TimesheetDetails";
import AddTimesheet from "./pages/Timesheet/AddTimesheet";
import Payroll from "./pages/Payroll/Payroll";
import AddPayroll from "./pages/Payroll/AddPayroll";
import PayrollDetails from "./pages/Payroll/PayrollDetails";

import Treasury from "./pages/Finance/Treasury";

import KanbanBoard from "./pages/Kanban/Kanban";
import CompanyList from "./pages/CompanyList/CompanyList";
import SubscriptionChart from "./pages/test";
import ScrollToTop from "./pages/ScrollToTop";
/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
// import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
// import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
import Todo from "./pages/Todo";
import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
import WizardForm from "./components/Forms/ReduxWizard/Index";

/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import InvoiceList from "./pages/Invoice";
import Statistics from "./pages/Statistics";
import AnaliticalReports from "./pages/AnaliticalReports";
import Pendingtasks from "./pages/Pendingtasks";
import Labordemand from "./pages/Labordemand";
const Markup = () => {
  const allroutes = [
    //temporary pages
    { url: "labor-demand", component: <Labordemand/> },
    { url: "pending-tasks", component: <Pendingtasks/> },
    { url: "analytical-reports", component: <AnaliticalReports/> },
    { url: "statistics", component: <Statistics/> },
    ////
    { url: "projects", component: <ProjectsList/> },
    { url: "budgets", component: <BudgetList/> },
    { url: "budgets/add-budget", component: <AddBudgetItem/> },
    { url: "budgets/:id/budget-details", component: <BudgetItem/> },
    { url: "budgets/:id/edit-budget", component: <EditBudget/> },

    { url: "gantt-chart", component: <GanttChart/> },

    {
      url: "employee-list/:id/employee-information",
      component: <PersonalInformation/>,
    },

    { url: "employees/add-employee", component: <AddEmployee/> },

    { url: "timesheet", component: <TimeSheetTable/> },
    { url: "timesheet/:id/details", component: <TimesheetDetails/> },
    { url: "timesheet/add-timesheet", component: <AddTimesheet/> },
    { url: "employee-list", component: <EmployeeList/> },
    { url: "payroll", component: <Payroll/> },
    { url: "payroll/add-payroll", component: <AddPayroll/> },
    { url: "payroll/:id/details", component: <PayrollDetails/> },
    { url: "treasury", component: <Treasury/> },

    { url: "invoice", component: <InvoiceList/> },
    { url: "kanban-board", component: <KanbanBoard/> },
    { url: "company-list", component: <CompanyList/> },
    { url: "test", component: <SubscriptionChart/> },
    /// Dashboard
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "dashboard-dark", component: <DashboardDark /> },
    { url: "my-wallet", component: <MyWallet /> },
    { url: "invoices", component: <Invoices /> },
    { url: "cards-center", component: <CardsCenter /> },
    { url: "transaction-history", component: <Transaction /> },
    { url: "transaction-details", component: <TransactionDetails /> },

    //Cms
    // { url: "content", component: <Content /> },
    // { url: "menu", component: <Menu /> },
    // { url: "email-template", component: <EmailTemplate /> },
    // { url: "blog", component: <Blog /> },
    // { url: "add-content", component: <ContentAdd /> },
    // { url: "add-email", component: <AddMail /> },
    // { url: "add-blog", component: <AddBlog /> },
    // { url: "blog-category", component: <BlogCategory /> },

    /// Apps
    { url: "app-profile", component: <AppProfile /> },
    { url: "email-compose", component: <Compose /> },
    { url: "email-inbox", component: <Inbox /> },
    { url: "email-read", component: <Read /> },
    // { url: "app-calender", component: <Calendar /> },
    { url: "post-details", component: <PostDetails /> },

    /// Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },

    /// Bootstrap
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-card", component: <UiCards /> },
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },

    /// Plugin
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-nestable", component: <Nestable /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },
    // { url: "map-jqvmap", component: <JqvMap /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },

    ///Redux
    { url: "todo", component: <Todo /> },


    /// Widget
    { url: "widget-basic", component: <Widget /> },

    /// Shop
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-customers", component: <Customers /> },

    /// Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    // { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    // { url: "form-validation", component: <FormValidation /> },

    /// table
    { url: "table-filtering", component: <FilteringTable /> },
    { url: "table-sorting", component: <SortingTable /> },
    { url: "table-datatable-basic", component: <DataTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },

    /// pages
    { url: "page-error-400", component: <Error400 /> },
    { url: "page-error-403", component: <Error403 /> },
    { url: "page-error-404", component: <Error404 /> },
    { url: "page-error-500", component: <Error500 /> },
    { url: "page-error-503", component: <Error503 /> },
  ];

  return (
    <>
      <Routes>
        <Route path="/page-lock-screen" element={<LockScreen />} />
        <Route path="/page-error-400" element={<Error400 />} />
        <Route path="/page-error-403" element={<Error403 />} />
        <Route path="/page-error-404" element={<Error404 />} />
        <Route path="/page-error-500" element={<Error500 />} />
        <Route path="/page-error-503" element={<Error503 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector((state) => state.sideMenu);
  return (
    <>
      <div
        id="main-wrapper"
        className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
          sideMenu ? "menu-toggle" : ""
        }`}
      >
        <Nav />
        <div
          className="content-body"
          style={{ minHeight: window.screen.height - 60 }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Markup;
