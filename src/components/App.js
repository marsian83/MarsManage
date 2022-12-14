import React from "react";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import "../styles/universal.css";
import Auth from "./Auth";
import NavbarComponent from "./NavbarComponent";
import PrivateRoute from "./PrivateRoute";
import Logout from "./Logout";
import Footer from "./Footer";

// import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <NavbarComponent />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Router basename="/">
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/logout" element={<Logout />}/>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </Container>
      <Footer/>
    </>
  );
}

export default App;
