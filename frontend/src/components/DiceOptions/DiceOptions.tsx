import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IAllDiceResults, IGetAllDiceResponse } from "../../common/types";

const OptionsWrapper = styled(Paper)(({ theme }) => ({
  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const OptionWrapper = styled(Box)({
  cursor: "pointer",
  "& :hover": {
    backgroundColor: "#bbdefb",
    "& > *": {
      backgroundColor: "#bbdefb",
    },
  },
});

const WinningFace = styled(Typography)({
  color: "#66bb6a",
  fontWeight: "bold",
});

interface IProps {
  selectedOption?: IAllDiceResults | null;
  options: IGetAllDiceResponse | null;
  onClick: (option: IAllDiceResults) => void;
}

const DiceOptions: React.FC<IProps> = ({
  options,
  selectedOption,
  onClick,
}) => {
  return (
    <OptionsWrapper elevation={3}>
      <Typography variant="h2" textAlign="center">
        Dice options
      </Typography>

      {options?.[0]?.map((option, index) => (
        <OptionWrapper
          sx={{
            border:
              selectedOption?.id === option.id ? "2px solid #1976d2" : "none",
          }}
          onClick={() => onClick(option)}
          key={option.id}
        >
          <Box p={3}>
            <Typography variant="h5">
              Dice No <b>{index + 1}</b>
            </Typography>
            <Typography>
              Dice shape: <b>{option.shape}</b>
            </Typography>
            <Typography>
              Number of faces: <b>{option.faces}</b>
            </Typography>
            <Typography>Faces:</Typography>
            <Box pl={3}>
              {option.diceFaces.map((face) => (
                <Box mb={2}>
                  <Typography>
                    Color: <b>{face.color}</b>
                  </Typography>
                  <Typography>
                    Value: <b>{face.value}</b>
                  </Typography>
                  {face.winning === "true" ? (
                    <WinningFace>WINNING FACE!</WinningFace>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>
        </OptionWrapper>
      ))}
    </OptionsWrapper>
  );
};

export default DiceOptions;
