import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

import { useState } from "react";
import MediaPlayer from "./components/MediaPlayer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          padding: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MediaPlayer setDarkMode={setDarkMode} darkMode={darkMode} />
      </Box>
    </ThemeProvider>
  );
}
export default App;
