import React, { useEffect, useState } from "react";
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GanttChart = () => {
  const [viewMode, setViewMode] = useState("month");
  const parser = JSON.parse(localStorage.getItem("userDetails"));
  const token = parser.access;
  const history = useNavigate();
  const urlLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${urlLink}/gantt-chart/`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const fetchGanttData = async () => {
      try {
        const response = await fetch(url, requestOptions);
        const apiData = await response.json();
        const tasks = transformData(apiData);
        gantt.clearAll();
        gantt.parse(tasks);
      } catch (error) {
        console.error("Error fetching Gantt chart data:", error);
      }
    };

    const transformData = (apiData) => {
      const tasks = { data: [] };
      let taskId = 1;

      apiData.forEach((project) => {
        const projectId = taskId++;
        tasks.data.push({
          id: projectId,
          text: project.ProjectNameEN,
          start_date: project.StartDate,
          end_date: project.EndDate,
        });

        project.Discipline.forEach((discipline) => {
          const disciplineId = taskId++;
          tasks.data.push({
            id: disciplineId,
            text: discipline.DisciplineEN,
            start_date: project.StartDate,
            end_date: project.EndDate,
            parent: projectId,
          });

          discipline.JobTitle.forEach((job) => {
            tasks.data.push({
              id: taskId++,
              text: job.JobTitleEN,
              start_date: job.StartOfWorkDate,
              end_date: job.EndOfWorkDate,
              parent: disciplineId,
            });
          });
        });
      });

      return tasks;
    };

    const updateGanttConfig = () => {
      switch (viewMode) {
        case "day":
          gantt.config.scale_unit = "day";
          gantt.config.date_scale = "%d %M";
          gantt.config.subscales = [];
          break;
        case "week":
          gantt.config.scale_unit = "week";
          gantt.config.date_scale = "Week #%W";
          gantt.config.subscales = [
            { unit: "day", step: 1, date: "%D %d" }, // Displays the day and date
          ];
          break;
        case "month":
          gantt.config.scale_unit = "month";
          gantt.config.date_scale = "%Y";
          gantt.config.subscales = [{ unit: "month", step: 1, date: "%M" }];
          break;
        case "year":
          gantt.config.scale_unit = "year";
          gantt.config.date_scale = "%Y";
          gantt.config.subscales = [];
          break;
        default:
          break;
      }
      gantt.render();
    };

    gantt.config.columns = [
      { name: "text", label: "Project", width: 150, tree: true },
      { name: "start_date", label: "Start Date", align: "center" },
      { name: "end_date", label: "End Date", width: 80, align: "center" },
      { name: "duration", label: "Duration", width: 50, align: "center" },
    ];

    gantt.config.date_format = "%Y-%m-%d";

    gantt.init("gantt_here");
    fetchGanttData();
    updateGanttConfig();
  }, [token, viewMode]);

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div>
      <div
        className=""
        style={{
          marginBottom: "10px",
          paddingTop: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Form.Group controlId="viewMode" className="d-flex m-0">
          <Form.Check
            type="radio"
            id="viewModeDay"
            label="Days"
            value="day"
            className="me-3"
            checked={viewMode === "day"}
            onChange={handleViewModeChange}
          />
          <Form.Check
            type="radio"
            id="viewModeWeek"
            label="Weeks"
            value="week"
            className="me-3"
            checked={viewMode === "week"}
            onChange={handleViewModeChange}
          />
          <Form.Check
            type="radio"
            id="viewModeMonth"
            label="Months"
            value="month"
            className="me-3"
            checked={viewMode === "month"}
            onChange={handleViewModeChange}
          />
          <Form.Check
            type="radio"
            id="viewModeYear"
            label="Years"
            value="year"
            className="me-3"
            checked={viewMode === "year"}
            onChange={handleViewModeChange}
          />
        </Form.Group>
      </div>

      <div id="gantt_here" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default GanttChart;
