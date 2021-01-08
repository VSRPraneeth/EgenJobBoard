import React from "react";
import PropTypes from "prop-types";

//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import ToggleOff from "@material-ui/icons/ToggleOff";
import ToggleOn from "@material-ui/icons/ToggleOn";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";

//Redux
import { connect } from "react-redux";
import { toggleTheme } from "../redux/actions/themeActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  marginRight: {
    marginRight: "5px",
  },
  icons: {
    padding: "30px 16% 0%",
  },
  headerText: {
    padding: "30px 0% 0% 16%",
  },
});

function Header(props) {
  const {
    classes,
    theme: { light },
  } = props;
  let lightOn = light ? (
    <ToggleOff className={classes.marginRight}></ToggleOff>
  ) : (
    <ToggleOn className={classes.marginRight}></ToggleOn>
  );
  return (
    <div className="flex container row" style={{ backgroundColor: "#5865E0" }}>
      <div className="flex container">
        <Typography
          className={classes.headerText}
          style={{ color: "white" }}
          variant="h4"
        >
          JOB BOARD
        </Typography>
      </div>
      <div className="flex container" style={{ justifyContent: "flex-end" }}>
        <span onClick={props.toggleTheme} className={classes.icons}>
          <WbSunnyIcon className={classes.marginRight}></WbSunnyIcon> {lightOn}
          <Brightness3Icon className={classes.marginRight}></Brightness3Icon>
        </span>
      </div>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: () => dispatch(toggleTheme()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
