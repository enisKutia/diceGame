import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { ChangeEvent, ReactNode } from "react";
import { FullScreenLayout } from "../Layout/Layout";

const Container = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
}));

export interface IField {
  label: string;
  icon: ReactNode;
  type?: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  fields: IField[];
  buttonText?: string;
  onClick?: () => void;
}

const Login: React.FC<IProps> = ({ fields, buttonText, onClick, children }) => {
  return (
    <FullScreenLayout>
      <Container>
        {fields.map(({ label, icon, onChange, type }) => (
          <TextField
            key={label}
            sx={{ width: "100%", marginBottom: 3 }}
            label={label}
            type={type}
            InputProps={{
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : null,
            }}
            variant="outlined"
            onChange={onChange}
          />
        ))}
        {buttonText && onClick && (
          <Button fullWidth variant="contained" onClick={onClick}>
            {buttonText}
          </Button>
        )}
        {children}
      </Container>
    </FullScreenLayout>
  );
};

export default Login;
