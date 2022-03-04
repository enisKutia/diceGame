import { Typography } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/common/RequireAuth/RequireAuth";
import SnackbarProvider from "./components/common/Snackbar/Snackbar";
import Login from "./components/Login/Login";
import ModeratorDashboard from "./components/ModeratorDashboard/ModeratorDashboard";
import Play from "./components/Play/Play";
import Register from "./components/Register/Register";
import { AuthContext, IUser } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <SnackbarProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <Play />
                </RequireAuth>
              }
            />
            <Route
              path="/play"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <Play />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <ModeratorDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={<Typography variant="h1">404 not found</Typography>}
            />
          </Routes>
        </SnackbarProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
