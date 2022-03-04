import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  IAllDiceResults,
  IGetAllDiceResponse,
  IHistoryResponse,
} from "../../common/types";
import useFetch from "../../hook/useFetch";
import { getToken } from "../../services/manage-token";
import AppBar from "../common/AppBar/AppBar";
import { Layout } from "../common/Layout/Layout";
import Dice from "../Dice/Dice";
import DiceOptions from "../DiceOptions/DiceOptions";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > *": {
    marginBottom: theme.spacing(5),
  },
}));

const PlayBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(5),
}));

const YouWon = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  fontWeight: "bold",
  color: "#66bb6a",
  marginBottom: theme.spacing(5),
}));

const Play = () => {
  const [options, setOptions] = useState<IGetAllDiceResponse | null>(null);
  const [selectedOption, setSelectedOption] = useState<IAllDiceResults | null>(
    null
  );
  const [face, setFace] = useState<IHistoryResponse | null>(null);

  const { loading, makeApiCall } = useFetch();

  useEffect(() => {
    makeApiCall(
      {
        route: "/dice",
        options: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      },
      {
        callback: (data) => {
          console.log(data);
          setOptions(data as IGetAllDiceResponse);
        },
      }
    );
  }, []);

  const handleClick = () => {
    if (selectedOption) {
      makeApiCall(
        {
          route: "/history",
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ diceId: selectedOption.id }),
          },
        },
        {
          callback: (data) => {
            console.log(data);
            setFace(data as IHistoryResponse);
          },
        }
      );
    }
  };

  return (
    <Layout>
      <AppBar linkHref="/dashboard" linkText="Create preset" />
      {selectedOption && (
        <PlayBox>
          <Wrapper>
            <Dice
              value={face?.value || face?.result}
              diceStyles={{
                backgroundColor: face?.gameRes?.color || face?.color,
              }}
              faceStyles={{ backgroundColor: face?.color }}
            />
            <YouWon>{face?.winning === "true" ? "YOU WON!" : ""}</YouWon>
          </Wrapper>
          <Button variant="contained" disabled={loading} onClick={handleClick}>
            {loading ? "Rolling..." : "Roll Dice!"}
          </Button>
        </PlayBox>
      )}
      <DiceOptions
        options={options}
        selectedOption={selectedOption}
        onClick={(option) => {
          setSelectedOption(option);
          setFace(option.diceFaces[0]);
          window.scroll(0, 0);
        }}
      />
    </Layout>
  );
};

export default Play;
