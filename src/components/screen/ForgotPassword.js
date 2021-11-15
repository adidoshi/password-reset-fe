import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://reset-password-flow.herokuapp.com/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
                  <h1 className="fs-4 card-title fw-bold mb-4">
                    Forgot Password
                  </h1>
                  {error && <span className="errorMessage">{error}</span>}
                  {success && <h3 className="successMessage">{success}</h3>}
                  <form
                    onSubmit={forgotPasswordHandler}
                    className="needs-validation"
                    noValidate=""
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="d-flex align-items-center">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Send Link
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Remember your password?{" "}
                    <Link to="/login" className="text-dark">
                      Login
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

export default ForgotPassword;
