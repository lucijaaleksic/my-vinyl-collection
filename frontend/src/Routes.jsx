import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";

import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { themeForms, themeLight, themeLanding } from "./styles/theme";
import { ThemeContext } from "./util/utils";
import SubRoutes from "./SubRoutes";

function Routes() {
  const [theme, setTheme] = React.useState(themeLight);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ThemeProvider theme={themeLanding}>
            <LandingPage />
          </ThemeProvider>
        </Route>
        <Route path="/login">
          <ThemeProvider theme={themeForms}>
            <LogInPage />
          </ThemeProvider>
        </Route>
        <Route path="/signup">
          <ThemeProvider theme={themeForms}>
            <SignUpPage />
          </ThemeProvider>
        </Route>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider theme={theme}>
            <SubRoutes />
          </ThemeProvider>
        </ThemeContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
