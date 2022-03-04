import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IAuthResponse } from "../../common/types";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hook/useFetch";
import { setToken } from "../../services/manage-token";
import FormContainer from "../common/FormContainer/FormContainer";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setUser: setAuth } = useAuth();

  const { makeApiCall } = useFetch();

  const successCallback = (data: IAuthResponse) => {
    setToken(data.access_token);

    setAuth({
      firstName: data.user.first_name,
      lastName: data.user.last_name,
      email: data.user.email,
    });
  };

  const handleSubmit = async () => {
    makeApiCall(
      {
        route: "/auth/login",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        },
      },
      {
        callback: (data) => {
          console.log(data);
          successCallback(data as IAuthResponse);
        },
        message: "Welcome!",
        redirect: () => navigate("/play"),
      }
    );
  };

  return (
    <FormContainer
      onClick={handleSubmit}
      buttonText="Login"
      fields={[
        {
          label: "Email",
          onChange: (ev) => setUser({ ...user, email: ev.target.value }),
          icon: <AccountCircle />,
        },
        {
          label: "Password",
          onChange: (ev) => setUser({ ...user, password: ev.target.value }),
          icon: <LockIcon />,
          type: "password",
        },
      ]}
    >
      <Box
        sx={{
          marginTop: 2,
          textAlign: "center",
          "& a": { textDecoration: "none", color: "primary.main" },
        }}
      >
        <Link to="/register">Don't have an account? Register...</Link>
      </Box>
    </FormContainer>
  );
};

export default Login;
