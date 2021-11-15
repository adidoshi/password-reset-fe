import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
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
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  {error && <span className="errorMessage">{error}</span>}

                  <form
                    className="needs-validation"
                    onSubmit={loginHandler}
                    autoComplete="off">
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
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">
                          Password
                        </label>
                        <Link to="/forgotpassword" className="float-end">
                          Forgot Password?
                        </Link>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-dark">
                      Create One
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
