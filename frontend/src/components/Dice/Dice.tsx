import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface IProps {
  value?: string;
  diceStyles?: { [key: string]: string | undefined };
  faceStyles?: { [key: string]: string | undefined };
}

const Dice = styled(Box)(({ theme }) => ({
  width: 200,
  height: 200,
  backgroundColor: "#fff",
  border: "3px solid #000",
  borderRadius: theme.spacing(1.25),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Face = styled(Typography)({
  color: "#000",
  fontSize: 50,
});

const LoaderContainer = styled(Box)({
  width: 200,
  height: 200,
  borderRadius: "3px solid white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CustomDice: React.FC<IProps> = ({ value, diceStyles, faceStyles }) => {
  return value ? (
    <Dice style={diceStyles}>
      <Face style={faceStyles}>{value}</Face>
    </Dice>
  ) : (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default CustomDice;
