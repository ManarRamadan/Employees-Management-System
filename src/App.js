import React, { useState,useMemo } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./routes";
export const history = createBrowserHistory();
function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [selectedMode, setSelectedMode] = useState();

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: selectedMode
            ? selectedMode
            : prefersDarkMode
            ? "dark"
            : "light",
          primary: {
            main: "#000",
          },
          secondary: {
            main: "#B2D36B",
          },
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.2,
        },
      }),
    [prefersDarkMode, selectedMode]
  );

  const handleThemeChange = (mode) => {
    setSelectedMode(mode);
    document
      .querySelector("body")
      ?.classList.remove(mode === "dark" ? "light" : "dark");
    document.querySelector("body")?.classList.add(mode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history} >

        <Routes onThemeChange={handleThemeChange} mode={selectedMode} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
