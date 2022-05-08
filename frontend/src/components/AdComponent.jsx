import React, { useState } from "react";

import { getRandomColor, ThemeContext } from "../util/utils";
import { Grow } from "@mui/material";
import { useHistory } from "react-router-dom";

const flexedCenterStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function AdComponent({ size, name, id }) {
  const { theme } = React.useContext(ThemeContext);
  const outline = theme.palette.mode === "dark" ? "black" : "white";

  const [color, setColor] = useState(getRandomColor());

  const history = useHistory();

  const containerStyle = {
    background: "rgb(33,33,33)",
    borderRadius: size,
    width: size,
    height: size,
    margin: "5px",
    cursor: "pointer",
  };
  const vinylStyle = {
    borderRadius: size,
    height: 0.5 * size,
    width: 0.5 * size,
    background: color,
  };

  return (
    <Grow in timeout={500}>
      <div
        style={{ ...containerStyle, ...flexedCenterStyle }}
        onClick={() =>
          history.push("/vinyl/info", {
            id: id,
          })
        }
      >
        <div style={{ ...vinylStyle, ...flexedCenterStyle }}>
          <h3
            align="center"
            style={{
              textShadow: `-1px -1px 0 ${outline}, 1px -1px 0 ${outline}, -1px 1px 0 ${outline}, 1px 1px 0 ${outline}`,
            }}
          >
            {name}
          </h3>
        </div>
      </div>
    </Grow>
  );
}

export default AdComponent;
