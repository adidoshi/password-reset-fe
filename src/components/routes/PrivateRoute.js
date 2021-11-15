import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const PrivateRoute = () => {
  let history = useHistory();
  const [error, setError] = useState("");

  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "https://reset-password-flow.herokuapp.com/api/private",
          config
        );
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };

    fetchPrivateData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span>{error}</span>
  ) : (
    <>
      <div style={{ backgroundColor: "green", color: "white" }}>
        {privateData}
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default PrivateRoute;
