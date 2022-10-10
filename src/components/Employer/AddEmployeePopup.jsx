import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { db, app2 } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddEmployeePopup() {
  
  const { currentUser } = useAuth();
  
  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const departmentRef = useRef();
  const dojRef = useRef();
  const passwordRef = useRef();
  
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const handleCloseEmployeeAdd = () => setShow(false);
  const handleShowEmployeeAdd = () => setShow(true);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let newEmployee = await app2
        .auth()
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        );
      await app2.auth().signOut();
      await addDoc(collection(db, currentUser.uid), {
        uid: newEmployee.user.uid,
        name: nameRef.current.value,
        email: emailRef.current.value,
        number: numberRef.current.value,
        department: departmentRef.current.value,
        doj: dojRef.current.value,
      });
      await addDoc(collection(db, "users"),{
        uid: newEmployee.user.uid,
        type: "employee",
      });
      window.location.reload();
    } catch {
      setError("An error occured, Please try again");
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowEmployeeAdd}>
        Add Employee
      </Button>

      <Modal
        show={show}
        onHide={handleCloseEmployeeAdd}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add an Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEmployee}>
            <Form.Group className="" id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                placeholder="Enter name of the employee"
                required
              />
            </Form.Group>
            <Form.Group className="my-3" id="email">
              <Form.Label>E-mail address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter Employee's email address"
                required
              />
            </Form.Group>
            <Form.Group className="my-3" id="number">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                ref={numberRef}
                placeholder="Enter Employee's contact number"
                required
              />
            </Form.Group>
            <Form.Group className="my-3" id="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                ref={departmentRef}
                placeholder="Enter Employee's department"
                required
              />
            </Form.Group>
            <Form.Group className="my-3" id="doj">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                ref={dojRef}
                placeholder="Enter Employee"
                required
              />
            </Form.Group>
            <Form.Group className="" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password for the Employee"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Create new employee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
