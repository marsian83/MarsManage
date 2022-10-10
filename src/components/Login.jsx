import { collection, getDocs } from "firebase/firestore";
import { React, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../firebase";

export const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logout } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((usr) => {
        if (usr.data().uid == auth.currentUser.uid) {
          if (usr.data().disabled == true) {
            logout();
            throw {
              message: "Your account has been deactivated by your employer",
            };
          }
        }
      });
      navigate("/");
    } catch (err) {
      if (err.code == "auth/user-not-found") {
        setError("This email is not registered");
      } else if (err.code == "auth/invalid-credential") {
        setError("Invalid credentials");
      } else if (err.code == "auth/invalid-email") {
        setError("Invalid email");
      } else if (err.code == "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        let displayError = err.message;
        displayError = displayError.toString().replaceAll("firebase:", "");
        displayError = displayError.toString().replaceAll("Firebase:", "");
        displayError = displayError.toString().replaceAll("firebase", "");
        displayError = displayError.toString().replaceAll("Firebase", "");
        setError(displayError);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="w-100" style={{ maxWidth: "444px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Loking to register as an Employer? <Link onClick={() => { props.changeState('signup') }}>Click here</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
