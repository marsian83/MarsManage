import React, { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import PieChart from "../PieChart";
import StackedBarGraph from "../StackedBarGraph";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DayData from "../DayData";

export default function EmployeeListContent(props) {
  const { currentUser } = useAuth();
  const [timeToday, setTimeToday] = useState({});
  const [timeYesterday, setTimeYesterday] = useState({});
  const [timeY2, setTimeY2] = useState({});
  const [timeY3, setTimeY3] = useState({});
  const [timeY4, setTimeY4] = useState({});
  const [timeY5, setTimeY5] = useState({});
  const [timeY6, setTimeY6] = useState({});
  const [loading, setLoading] = useState(true);

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return `${previous.getFullYear()}-${(previous.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${previous.getDate().toString().padStart(2, "0")}`;
  }

  function getPastDay(date = new Date(), count) {
    if (count == 1) {
      return getPreviousDay(date);
    }
    return getPastDay(new Date(getPreviousDay(date)), count - 1);
  }
  async function loadData() {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, props.employeeId));
    let tms = {};
    let tmy = {};
    let tmy2 = {},
      tmy3 = {},
      tmy4 = {},
      tmy5 = {},
      tmy6 = {};
    let day = new Date(
      `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date()
        .getDate()
        .toString()
        .padStart(2, "0")}`
    );
    querySnapshot.forEach((doc) => {
      if (
        doc.data().startDate ==
        `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${new Date()
          .getDate()
          .toString()
          .padStart(2, "0")}`
      ) {
        tms[doc.data().taskType] =
          (tms[doc.data().taskType] || 0) + doc.data().timeline;
      } // YESTERDAY
      else if (doc.data().startDate == getPreviousDay(day)) {
        tmy[doc.data().taskType] =
          (tmy[doc.data().taskType] || 0) + doc.data().timeline;
      } // DAY - 2
      else if (doc.data().startDate == getPastDay(day, 2)) {
        tmy2[doc.data().taskType] =
          (tmy2[doc.data().taskType] || 0) + doc.data().timeline;
      } // DAY - 3
      else if (doc.data().startDate == getPastDay(day, 3)) {
        tmy3[doc.data().taskType] =
          (tmy3[doc.data().taskType] || 0) + doc.data().timeline;
      } // DAY - 4
      else if (doc.data().startDate == getPastDay(day, 4)) {
        tmy4[doc.data().taskType] =
          (tmy4[doc.data().taskType] || 0) + doc.data().timeline;
      } // DAY - 5
      else if (doc.data().startDate == getPastDay(day, 5)) {
        tmy5[doc.data().taskType] =
          (tmy5[doc.data().taskType] || 0) + doc.data().timeline;
      } // DAY - 6
      else if (doc.data().startDate == getPastDay(day, 6)) {
        tmy6[doc.data().taskType] =
          (tmy6[doc.data().taskType] || 0) + doc.data().timeline;
      }
    });
    setTimeToday(tms);
    setTimeYesterday(tmy);
    setTimeY2(tmy2);
    setTimeY3(tmy3);
    setTimeY4(tmy4);
    setTimeY5(tmy5);
    setTimeY6(tmy6);

    setLoading(false);
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Tab.Pane eventKey={`#link${props.employeeId}`}>
        <div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center my-1">
              <h6 className="m-0 mx-3 p-0">Name : </h6>
              <p className="m-0 p-0">{props.employee.name}</p>
            </div>
            <div className="d-flex flex-row align-items-center my-1">
              <h6 className="m-0 mx-3 p-0">Email : </h6>
              <p className="m-0 p-0">{props.employee.email}</p>
            </div>
            <div className="d-flex flex-row align-items-center my-1">
              <h6 className="m-0 mx-3 p-0">Contact Number : </h6>
              <p className="m-0 p-0">{props.employee.number}</p>
            </div>
            <div className="d-flex flex-row align-items-center my-1">
              <h6 className="m-0 mx-3 p-0">Department : </h6>
              <p className="m-0 p-0">{props.employee.department}</p>
            </div>
            <div className="d-flex flex-row align-items-center my-1">
              <h6 className="m-0 mx-3 p-0">Date of Joining : </h6>
              <p className="m-0 p-0">{props.employee.doj}</p>
            </div>
          </div>
          {!loading  && (
            <div>
              <div className="d-flex flex-row my-5">
                <div className="w-25">
                  <PieChart
                    title="Yesterday"
                    breakTime={timeYesterday["break"]}
                    workTime={timeYesterday["work"]}
                    meetingTime={timeYesterday["meeting"]}
                  />
                </div>
                <div className="w-25">
                  <PieChart
                    title="Today"
                    breakTime={timeToday["break"]}
                    workTime={timeToday["work"]}
                    meetingTime={timeToday["meeting"]}
                  />
                </div>
                <div className="w-50 mt-5">
                  <StackedBarGraph
                    title="Past week"
                    tms={timeToday}
                    tmy={timeYesterday}
                    tmy2={timeY2}
                    tmy3={timeY3}
                    tmy4={timeY4}
                    tmy5={timeY5}
                    tmy6={timeY6}
                  />
                </div>
              </div>
            </div>
          )}
          <DayData employeeId = {props.employeeId}/>
        </div>
      </Tab.Pane>
    </>
  );
}
