import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";

import Tasks, { List } from "./tasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <Box
              display="flex"
              marginLeft={10}
              marginRight={10}
              sx={{
                "& > *": {
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRight: "1px solid",
                },
                "& > *:last-child": {
                  paddingRight: 0,
                  borderRight: "none",
                },
              }}
            >
              <div
                style={{
                  width: "5vw",
                  minWidth: 100,
                  maxWidth: 400,
                  align: "left",
                  paddingLeft: 5,
                }}
              >
                <h1 style={{ textAlign: "left" }}>Tasks</h1>
                <List />
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                <h1 style={{ textAlign: "center" }}>Your Implementation</h1>
                <Tasks />
              </div>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
