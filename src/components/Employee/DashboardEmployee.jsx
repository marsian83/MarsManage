import React from "react";
import AddTaskPopup from "./AddTaskPopup";
import EmployeeStats from "./EmployeeStats";

export default function DashboardEmployee() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center w-100">
        <div className="d-flex justify-content-center mb-5">
          <AddTaskPopup />
        </div>
        <div className="w-100">
          <EmployeeStats />
        </div>
        <div>
        </div>
      </div>
    </>
  );
}
