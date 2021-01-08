import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObj from "./util/theme";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Components
import Home from "./components/Home";
import PositionDetails from "./components/PositionDetails";

import axios from "axios";
import { mobileActions } from "./redux/actions/browserActions";
import { filterActions } from "./redux/actions/filterActions";
import browserChecker from "./util/browserChecker";

const corsURl = "https://egen-job-board.herokuapp.com";
axios.defaults.baseURL = `${corsURl}/https://jobs.github.com`;

const lightTheme = createMuiTheme({
  ...themeObj,
  palette: {
    primary: {
      main: "#5865E0",
      contrastText: getComputedStyle(document.documentElement).getPropertyValue(
        "--light-paper-bg"
      ),
    },
    type: "light",
    background: {
      default: getComputedStyle(document.documentElement).getPropertyValue(
        "--light-bg"
      ),
      paper: getComputedStyle(document.documentElement).getPropertyValue(
        "--light-paper-bg"
      ),
    },
  },
});

const darkTheme = createMuiTheme({
  ...themeObj,
  palette: {
    primary: {
      main: "#5865E0",
      contrastText: getComputedStyle(document.documentElement).getPropertyValue(
        "--dark-paper-bg"
      ),
    },
    type: "dark",
    background: {
      default: getComputedStyle(document.documentElement).getPropertyValue(
        "--dark-bg"
      ),
      paper: getComputedStyle(document.documentElement).getPropertyValue(
        "--dark-paper-bg"
      ),
    },
  },
});

function App() {
  const light = useSelector((state) => state.theme.light);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mobileActions(browserChecker()));

    // navigator.permissions.query({ name: "geolocation" }).then((result) => {
    //   if (result.state === "granted") {
    //     console.log("main granted", result);
    //   } else if (result.state === "prompt") {
    //     console.log("main prompt");
    //     navigator.geolocation.getCurrentPosition(
    //       (location) => {
    //         console.log("main location", location);
    //       },
    //       (error) => {
    //         console.log("main error", error);
    //       }
    //     );
    //   } else if (result.state === "denied") {
    //     console.log("main denied", result);
    //   }
    // });

    // navigator.geolocation.getCurrentPosition(
    //   (location) => {
    //     console.log("main location", location);
    //     dispatch(
    //       filterActions({
    //         filterLatLong: {
    //           lat: location.coords.latitude,
    //           long: location.coords.longitude,
    //         },
    //       })
    //     );
    //   },
    //   (error) => {
    //     console.log("main error", error);
    //   }
    // );
  }, []);

  const theme = createMuiTheme(light ? lightTheme : darkTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={`container ` + (light ? "light" : "dark")}>
          <Switch>
            <Route exact path="/" component={Home}>
              <Redirect to="/positions" />
            </Route>
            <Route exact path="/positions" component={Home} />
            <Route exact path="/positions/:id" component={PositionDetails} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
