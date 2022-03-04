import { useState } from "react";
import { API_BASE_URL } from "../common/constants";
import {
  IAuthResponse,
  IGetAllDiceResponse,
  IHistoryResponse,
} from "../common/types";
import { useSnackbar } from "../context/SnackbarContext";

interface IHttpOptions {
  route: string;
  options: RequestInit;
}

interface ISuccessOptions {
  callback: (
    data: IAuthResponse | IGetAllDiceResponse | IHistoryResponse
  ) => void;
  message?: string;
  redirect?: () => void;
}

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const { openSnackbar } = useSnackbar();

  const makeApiCall = async (
    { route, options }: IHttpOptions,
    { callback, message, redirect }: ISuccessOptions
  ) => {
    setLoading(true);

    fetch(`${API_BASE_URL}${route}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
          throw new Error(data.error);
        }
        console.log("hoook", data);
        callback(data);
      })
      .then(() => {
        setLoading(false);

        if (message) {
          openSnackbar({
            severity: "success",
            message,
            open: true,
          });
        }

        if (redirect) {
          redirect();
        }
      })
      .catch(({ message }) => {
        setLoading(false);

        openSnackbar({
          severity: "error",
          open: true,
          message,
        });
      });
  };

  return { loading, makeApiCall };
};

export default useFetch;
