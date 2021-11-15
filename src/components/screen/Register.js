import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100 mt-5">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  {error && <span className="errorMessage">{error}</span>}
                  <form
                    onSubmit={registerHandler}
                    className="needs-validation"
                    autoComplete="off">
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="name">
                        User Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        required
                        autoFocus
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <div className="invalid-feedback">Name is required</div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">
                        E-Mail Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        required
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        className="mb-2 text-muted"
                        htmlFor="confirmpassword">
                        Confirm Password
                      </label>
                      <input
                        id="confirmpassword"
                        type="password"
                        className="form-control"
                        name="confirmpassword"
                        required
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="align-items-center d-flex">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account?
                    <Link to="/login" className="text-dark">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5 text-muted">
                Copyright &copy; 2021 &mdash; Aditya Doshi
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
