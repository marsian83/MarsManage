import React from "react";
import { ListGroup } from "react-bootstrap";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EmployeeListItem from "./EmployeeListItem";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [contents, setContents] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    async function loadEmployees() {
      const querySnapshot = await getDocs(collection(db, currentUser.uid));
      let emps = [];
      querySnapshot.forEach((doc) => {
        emps.push(doc.data());
      });
      setEmployees(emps);
    }
    loadEmployees();
  }, []);

  return (
    <>
      Your Employees :
      <ListGroup>
        {employees.map((emp) => {
          return (
            <EmployeeListItem
              employeeId={emp.uid}
              employeeName={emp.name}
              employee={emp}
            />
          );
        })}
      </ListGroup>
    </>
  );
}
