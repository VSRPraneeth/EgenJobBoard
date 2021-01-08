import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    float: "right",
    margin: "10px 0px",
  },
  mobileButton: {
    margin: "10px 0px",
    width: "100%",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    left: "91%",
    top: "6%",
    position: "absolute",
  },
  root: {
    minWidth: 275,
    maxWidth: 275,
    margin: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paperHeight: {
    height: "auto",
  },
  paperMargin: {
    margin: "20px 0px",
  },

  paperPadding: {
    padding: "10px",
  },
});

function PositionDescription(props) {
  const {
    classes,
    created_at,
    type,
    title,
    location,
    description,
    loading_job,
    isMobile,
  } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Paper
      className="flex container column"
      style={{
        height: "auto",
        width: "auto",
        margin: "20px 0px",
        padding: "20px",
        flexShrink: 0,
      }}
    >
      {!loading_job && (
        <>
          <div className={`flex container ` + (isMobile ? "column" : "row")}>
            <div className="flex container column">
              <Typography color="textSecondary">
                {moment(created_at, "ddd MMM DD h:mm:ss [UTC] YYYY")
                  .utc()
                  .fromNow()}
                {bull} {type}
              </Typography>
              <Typography variant="h5">{title} </Typography>
              <Typography variant="body1" color="primary">
                {location}
              </Typography>
            </div>
            <div
              className="container"
              style={{ display: "inline", width: "100%" }}
            >
              <Button
                variant="contained"
                color="primary"
                className={
                  isMobile ? classes.mobileButton : classes.submitButton
                }
              >
                Apply Now
              </Button>
            </div>
          </div>
          <div
            style={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{
              __html: description && description.replace(/\n/g, "<br />"),
            }}
            className="container"
          />
        </>
      )}
    </Paper>
  );
}

PositionDescription.propTypes = {
  created_at: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  loading_job: PropTypes.bool,
  isMobile: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.browser.isMobile,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(PositionDescription)
);
