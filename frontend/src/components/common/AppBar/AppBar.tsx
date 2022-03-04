import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface IProps {
  linkHref: string;
  linkText: string;
}

const Wrapper = styled(Box)({
  width: "100%",
  "& a": {
    textDecoration: "none",
    color: "white",
  },
});

const CustomAppBar: React.FC<IProps> = ({ linkHref, linkText }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Wrapper
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            <b>DiceGame</b>
          </Typography>
          <Link to={linkHref}>{linkText}</Link>
        </Wrapper>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
