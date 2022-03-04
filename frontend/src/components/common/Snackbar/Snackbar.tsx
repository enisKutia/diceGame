import { Alert, Snackbar } from "@mui/material";
import { ReactNode, useState } from "react";
import { ISnackbar, SnackbarContext } from "../../../context/SnackbarContext";

interface IProps {
  children: ReactNode;
}

const CustomSnackbar: React.FC<IProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: "",
    severity: "error",
  });

  const handleOpenSnackbar = (snackbarOptions: ISnackbar) => {
    setSnackbar({ ...snackbarOptions, open: true });
  };

  const handleCloseSnackbar = (snackbarOptions: ISnackbar) => {
    setSnackbar({ ...snackbarOptions, open: false });
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar: handleOpenSnackbar,
        closeSnackbar: handleCloseSnackbar,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((prevState) => ({ ...prevState, open: false }))
        }
      >
        <Alert
          onClose={() =>
            setSnackbar((prevState) => ({ ...prevState, open: false }))
          }
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default CustomSnackbar;
