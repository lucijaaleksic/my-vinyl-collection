import React from "react";
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

export function IsMobile() {
  const [width, setWidth] = React.useState(undefined);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width < 768;
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const colors = [
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
];

const shades = ["200", "300", "400"];

export function getRandomColor() {
  const shadeIndex = Math.round(Math.random() * (shades.length - 1));
  const shade = shades[shadeIndex];
  const colorIndex = Math.round(Math.random() * (colors.length - 1));
  const color = colors[colorIndex];
  return color[shade];
}

export const ThemeContext = React.createContext();

export function getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    return (user!=null) ? user.username : user;
  }


