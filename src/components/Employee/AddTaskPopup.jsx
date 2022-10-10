import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {auth} from "../../firebase"

export default function AddTaskPopup() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { currentUser } = useAuth();

  const taskTypeRef = useRef();
  const descriptionRef = useRef();
  const startDateRef = useRef();
  const startTimeRef = useRef();
  const timelineHoursRef = useRef();
  const timelineMinutesRef = useRef();

  const handleCloseAddTask = () => setShow(false);
  const handleShowAddTask = () => {
    setShow(true);
    setError("");
    setTimeout(() => {
      startDateRef.current.value = `${new Date().getFullYear()}-${(
        new Date().getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
      startTimeRef.current.value = `${new Date().getHours()}:${new Date().getMinutes()}`;
      timelineMinutesRef.current.value = 0;
      timelineHoursRef.current.value = 0;
    }, 123);
  };
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, currentUser.uid));
      if (descriptionRef.current.value == "") {
        throw "Enter a description for your task";
      }
      if (
        Number(timelineHoursRef.current.value) * 60 +
          Number(timelineMinutesRef.current.value) <=
        0
      ) {
        throw "Please tell us how long you took to complete the task";
      }
      if(startDateRef=="" || startTimeRef==""){
        throw "Enter a valid datetime for starting the task"
      }
      if (
        startDateRef.current.value >
        `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${new Date()
          .getDate()
          .toString()
          .padStart(2, "0")}`
      ) {
        throw "The task date can't be in the future";
      }
      querySnapshot.forEach((doc) => {
        if (startDateRef.current.value == doc.data().startDate) {
          let s =
            Number(doc.data().startTime.slice(0, 2)) * 60 +
            Number(doc.data().startTime.slice(3, 5));
          let e = s + Number(doc.data().timeline);
          let cs =
            Number(startTimeRef.current.value.slice(0, 2)) * 60 +
            Number(startTimeRef.current.value.slice(3, 5));
          let ce =
            cs +
            Number(timelineHoursRef.current.value) * 60 +
            Number(timelineMinutesRef.current.value);
          // alert(`s ${s} e ${e} cs ${cs} ce ${ce} `)
          if ((s < cs && cs < e) || (s < ce && ce < e)) {
            throw "This task conflicts with another pre-existing task entry";
          }
        }
      });
      await addDoc(collection(db, currentUser.uid), {
        taskType: taskTypeRef.current.value,
        description: descriptionRef.current.value,
        startDate: startDateRef.current.value,
        startTime: startTimeRef.current.value,
        timeline:
          Number(timelineHoursRef.current.value) * 60 +
          Number(timelineMinutesRef.current.value),
      });
      window.location.reload(false);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  const checkValidTime = () => {
    let timeT =
      Number(startTimeRef.current.value.slice(0, 2)) * 60 +
      Number(startTimeRef.current.value.slice(3, 5));
    if (
      timeT +
        Number(timelineHoursRef.current.value) * 60 +
        Number(timelineMinutesRef.current.value) >=
      24 * 60
    ) {
      let timeR =
        24 * 60 -
        (timeT +
          Number(timelineHoursRef.current.value) * 60 +
          Number(timelineMinutesRef.current.value) -
          61);
      timelineHoursRef.current.value = "0"; //Math.floor(Number(timeR / 60));
      timelineMinutesRef.current.value = "0"; //Math.floor(Number(timeR % 60));
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Button variant="primary" onClick={handleShowAddTask}>
        Add Task
      </Button>

      {
        <Modal
          show={show}
          onHide={handleCloseAddTask}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {}
            {error && <Alert variant="danger">{error || ""}</Alert>}
            <Form>
              <Form.Group className="" id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={descriptionRef}
                  placeholder="Describe your task"
                  required
                />
              </Form.Group>
              <Form.Group className="my-3" id="type">
                <Form.Label>Task Type</Form.Label>
                <Form.Select ref={taskTypeRef}>
                  <option value="break">Break</option>
                  <option value="work">Work</option>
                  <option value="meeting">Meeting</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3" id="start-datetime">
                <Form.Label>Start Time</Form.Label>
                <div className="d-flex flex-row">
                  <Form.Control
                    type="date"
                    ref={startDateRef}
                    placeholder="What date did you start this task?"
                    required
                    max={`${new Date().getFullYear()}-${(
                      new Date().getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}-${new Date()
                      .getDate()
                      .toString()
                      .padStart(2, "0")}`}
                  />
                  <Form.Control type="time" ref={startTimeRef} required />
                </div>
              </Form.Group>
              <Form.Group className="my-3" id="timeline">
                <Form.Label>Time for completion</Form.Label>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <Form.Control
                    ref={timelineHoursRef}
                    className="w-25 me-2"
                    type="number"
                    min="0"
                    max="23"
                    placeholder="hours"
                    required
                    onChange={checkValidTime}
                  />
                  hrs
                  <Form.Control
                    ref={timelineMinutesRef}
                    className="w-25 ms-5 me-2"
                    type="number"
                    min="0"
                    max="60"
                    placeholder="minutes"
                    required
                    onChange={checkValidTime}
                  />
                  mins
                </div>
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mt-4"
                type="button"
                onClick={handleAddTask}
              >
                Add New Task
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      }
    </>
  );
}
