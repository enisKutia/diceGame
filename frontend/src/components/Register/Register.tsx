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

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { makeApiCall } = useFetch();

  const { setUser: setAuth } = useAuth();

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
        route: "/auth/register",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
            password_confirm: user.passwordConfirm,
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
      buttonText="Register"
      fields={[
        {
          label: "First Name",
          onChange: (ev) => setUser({ ...user, firstName: ev.target.value }),
          icon: null,
        },
        {
          label: "Last Name",
          onChange: (ev) => setUser({ ...user, lastName: ev.target.value }),
          icon: null,
        },
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
        {
          label: "Confirm Password",
          onChange: (ev) =>
            setUser({ ...user, passwordConfirm: ev.target.value }),
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
        <Link to="/login">Already have an account? Login...</Link>
      </Box>
    </FormContainer>
  );
};

export default Register;
