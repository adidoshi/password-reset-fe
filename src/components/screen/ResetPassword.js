import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ResetPassword = ({ match }) => {
  let history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `https://reset-password-flow.herokuapp.com/api/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );
      // console.log(match.params.resetToken);

      console.log(data);
      setSuccess(data.data);
      history.push("/login");
    } catch (error) {
      // console.log(error);
      setError(error.response.data.err);
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
                    Reset Password
                  </h1>
                  {error && <span>{error}</span>}
                  {success && <span>{success}</span>}
                  <form
                    onSubmit={resetPasswordHandler}
                    className="needs-validation"
                    autoComplete="off">
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="password">
                        New Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        className="mb-2 text-muted"
                        htmlFor="password-confirm">
                        Confirm Password
                      </label>
                      <input
                        id="password-confirm"
                        type="password"
                        className="form-control"
                        name="password_confirm"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please confirm your new password
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
