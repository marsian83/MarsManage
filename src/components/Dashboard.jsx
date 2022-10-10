import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DashboardEmployee from "./Employee/DashboardEmployee";
import DashboardEmployer from "./Employer/DashboardEmployer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const {currentUser} = useAuth()

  const [userType,setUserType] = useState();

  useEffect(() => {
    async function loadEmployees() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((usr) => {
        if(usr.data().uid==currentUser.uid){
          setUserType(usr.data().type)
        }
      });
    }
    loadEmployees();
  }, []);

  return (
    <>
    {userType=="employee" && <DashboardEmployee />}
    {userType=="employer" && <DashboardEmployer />}
    </>
  );
}
