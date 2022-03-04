import { AlertColor } from "@mui/material";
import { createContext, useContext } from "react";

export interface ISnackbar {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
}

export interface ISnackbarContext {
  openSnackbar: (snackbarOptions: ISnackbar) => void;
  closeSnackbar: (snackbarOptions: ISnackbar) => void;
}

const DEFAULT_CONTEXT: ISnackbarContext = {
  openSnackbar: () => {},
  closeSnackbar: () => {},
};

const SnackbarContext = createContext(DEFAULT_CONTEXT);

const useSnackbar = () => useContext(SnackbarContext);

export { SnackbarContext, useSnackbar };
