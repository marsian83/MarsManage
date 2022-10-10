import React from "react";
import { Container } from "react-bootstrap";
import AddEmployeePopup from "./AddEmployeePopup";
import EmployeeList from "./EmployeeList";

export default function DashboardEmployer() {
  return (
    <>
      <Container className="d-flex flex-column">
        <Container
          fluid
          className="d-flex flew-row justify-content-center my-5"
        >
          <AddEmployeePopup />
        </Container>
        <Container>
          <EmployeeList />
        </Container>
      </Container>
    </>
  );
}
