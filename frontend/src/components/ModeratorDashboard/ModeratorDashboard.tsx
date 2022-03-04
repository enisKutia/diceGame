import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useFetch from "../../hook/useFetch";
import { getToken } from "../../services/manage-token";
import AppBar from "../common/AppBar/AppBar";
import { Layout } from "../common/Layout/Layout";

const DEFAULT_FACE_VALUES = {
  color: "",
  value: "",
  winning: false,
};

const DEFAULT_DICE_VALUES = {
  faces: 1,
  shape: "",
  diceFaces: [DEFAULT_FACE_VALUES],
};

const Input = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
}));

const DashedBox = styled(Box)({
  border: "1px dashed #1976d2",
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  marginBottom: theme.spacing(2),
}));

const ModeratorDashboard = () => {
  const [newDice, setNewDice] = useState(DEFAULT_DICE_VALUES);

  const { loading, makeApiCall } = useFetch();

  const handleClearForm = () => {
    setNewDice(DEFAULT_DICE_VALUES);
  };

  const handleSubmit = async () => {
    await makeApiCall(
      {
        route: "/dice",
        options: {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDice),
        },
      },
      {
        callback: (data) => {
          console.log(data);
          handleClearForm();
        },
        message: "Successfully created a new preset!",
      }
    );
  };

  return (
    <Layout>
      <AppBar linkHref="/play" linkText="Roll Dice" />
      <Typography variant="h2" textAlign="center">
        Create a dice preset
      </Typography>
      <Box mb={4}>
        <Title>Generic options</Title>
        <DashedBox p={2} mb={2}>
          <Input
            error={newDice.faces === 0}
            required
            value={newDice.faces}
            disabled={loading}
            label="Number of faces"
            variant="outlined"
            type="number"
            onChange={(ev) =>
              setNewDice((prevState) => ({
                ...prevState,
                faces: +ev.target.value,
              }))
            }
          />
          <Input
            required
            disabled={loading}
            label="Shape type"
            variant="outlined"
            value={newDice.shape}
            onChange={(ev) =>
              setNewDice((prevState) => ({
                ...prevState,
                shape: ev.target.value,
              }))
            }
          />
        </DashedBox>
        <Box>
          <Title>Faces</Title>
          {newDice.diceFaces.map((face, index) => {
            return (
              <DashedBox p={2} mb={2} key={index}>
                <Box
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Face No {index + 1}</Typography>
                </Box>
                <Input
                  value={newDice.diceFaces[index].color}
                  required
                  disabled={loading}
                  label="Color"
                  variant="outlined"
                  onChange={(ev) => {
                    const updatedFace = { ...face };
                    updatedFace.color = ev.target.value;

                    const updatedFaces = [...newDice.diceFaces];
                    updatedFaces[index] = updatedFace;

                    setNewDice((prevState) => ({
                      ...prevState,
                      diceFaces: updatedFaces,
                    }));
                  }}
                />
                <Input
                  required
                  value={newDice.diceFaces[index].value}
                  disabled={loading}
                  label="Value"
                  variant="outlined"
                  onChange={(ev) => {
                    const updatedFace = { ...face };
                    updatedFace.value = ev.target.value;

                    const updatedFaces = [...newDice.diceFaces];
                    updatedFaces[index] = updatedFace;

                    setNewDice((prevState) => ({
                      ...prevState,
                      diceFaces: updatedFaces,
                    }));
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      disabled={loading}
                      onChange={(ev) => {
                        const updatedFace = { ...face };
                        updatedFace.winning = ev.target.value === "on";

                        const updatedFaces = [...newDice.diceFaces];
                        updatedFaces[index] = updatedFace;

                        setNewDice((prevState) => ({
                          ...prevState,
                          diceFaces: updatedFaces,
                        }));
                      }}
                    />
                  }
                  label="Is winning face?"
                />
              </DashedBox>
            );
          })}
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setNewDice((prevState) => ({
                ...prevState,
                diceFaces: [...prevState.diceFaces, DEFAULT_FACE_VALUES],
              }));
            }}
            disabled={loading}
          >
            Add Face
          </Button>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit Dice
        </Button>
        <Button onClick={handleClearForm}>Clear form</Button>
      </Box>
    </Layout>
  );
};

export default ModeratorDashboard;
