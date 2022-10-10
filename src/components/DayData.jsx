import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

export default function DayData(props) {
  const [dayData, setDayData] = useState([]);
  const workingDay =
    props.date ||
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    async function loadData() {
      let dd = {};
      const querySnapshot = await getDocs(collection(db, props.employeeId));
      querySnapshot.forEach((doc) => {
        if (doc.data().startDate == workingDay) {
          dd[doc.data().startTime] = {
            type: doc.data().type,
            description: doc.data().description,
            timeline: doc.data().timeline,
          };
        }
      });
      var orderedData = Object.keys(dd)
        .sort()
        .reduce((obj, key) => {
          obj[key] = dd[key];
          return obj;
        }, {});
       setDayData( orderedData);
    }
    loadData()
  }, []);

  return <>
  <div>
    <h2 className="my-5">Tasks</h2>
  </div>
  </>;
}
