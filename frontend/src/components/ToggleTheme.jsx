import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { themeDark, themeLight } from "../styles/theme";
import { ThemeContext } from "../util/utils";

function ToggleTheme() {
  const context = React.useContext(ThemeContext);

  function changeMode() {
    return context.theme === themeLight
      ? context.setTheme(themeDark)
      : context.setTheme(themeLight);
  }

  return (
    <Tooltip title={context.theme.palette.mode}>
      <IconButton sx={{ ml: 1 }} onClick={changeMode}>
        {context.theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default ToggleTheme;
