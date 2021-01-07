export default {
  palette: {
    primary: {
      light: getComputedStyle(document.documentElement).getPropertyValue(
        "--light-paper-bg"
      ),
      main: getComputedStyle(document.documentElement).getPropertyValue(
        "--main"
      ),
      dark: getComputedStyle(document.documentElement).getPropertyValue(
        "--dark-paper-bg"
      ),
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: getComputedStyle(document.documentElement).getPropertyValue(
        "--main"
      ),
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    filterForm: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      border: "1px solid black",
      borderRadius: "10px",
      backgroundColor: "white",
    },

    headerMargin: {
      margin: "-25px 8% 0px",
    },

    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {},
    button: {
      marginTop: 20,
      position: "relative",
    },
    progress: {
      position: "absolute",
    },
    paper: {
      padding: 20,
    },
  },
};
