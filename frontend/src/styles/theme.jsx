import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#b66857",
    },
    secondary: {
      main: "rgb(164,164,164)",
    },
    mode: "light",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: "rgb(42,42,42)",
            "&:hover": {
              background: "rgb(73,73,73)",
            },
            color: "white",
          },
        },
      ],
    },
  },
});

export const themeDark = createTheme({
  palette: {
    primary: {
      main: "rgb(213,212,212)",
    },
    secondary: {
      main: "rgb(164,164,164)",
    },
    mode: "dark",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: "rgb(42,42,42)",
            "&:hover": {
              background: "rgb(73,73,73)",
            },
            color: "white",
          },
        },
      ],
    },
  },
});

export const themeForms = createTheme({
  palette: {
    primary: {
      main: "rgb(226,92,59)",
    },
    secondary: {
      main: "rgb(225,168,168)",
    },
    mode: "dark",
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#e25c3b",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          width: "50%",
          margin: "auto",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          height: 0,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          color: "black",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
  },
});

export const themeLanding = createTheme({
  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
    secondary: {
      main: "rgb(255, 255, 255)",
    },
  },
});
