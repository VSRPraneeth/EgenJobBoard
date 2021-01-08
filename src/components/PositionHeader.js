import React from "react";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
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
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 50,
    maxWidth: 200,
    height: 100,
    objectFit: "contain",
  },
  content: {
    padding: 25,
  },
});

function PositionHeader(props) {
  const {
    classes,
    company,
    company_url,
    company_logo,
    loading_job,
    isMobile,
  } = props;

  const imageMarkup = isMobile ? (
    <Avatar
      style={{
        marginTop: "-20px",
        backgroundColor: "lightgrey",
        borderRadius: "12px",
      }}
      alt={company}
      src={company_logo}
    />
  ) : (
    <CardMedia
      image={company_logo}
      alt="Company Logo"
      title="Company Logo"
      className={classes.image}
      component="img"
    />
  );
  return (
    <Paper
      className={`flex container ` + (isMobile ? "column" : "row")}
      style={{ width: "auto", alignItems: "center" }}
      data-test="PositionHeaderComponent"
    >
      {loading_job ? (
        <div
          className="flex container"
          style={{
            justifyContent: "center",
            WebkitJustifyContent: "center",
            alignItems: "center",
            WebkitAlignItems: "center",
            height: "100px",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </div>
      ) : (
        <>
          {imageMarkup}
          <div
            className={`flex container ` + (isMobile ? "column" : "row")}
            style={{
              width: "100%",
              padding: "1.5em",
              textAlign: isMobile ? "center" : "",
            }}
          >
            <div className="flex container column">
              <Typography variant="h5">{company}</Typography>
              <Typography color="textSecondary">{company_url}</Typography>
            </div>
            <div className="container" style={{ display: "inline" }}>
              <Button
                variant="outlined"
                color="primary"
                href={company_url}
                style={{ marginTop: 10 }}
                className={isMobile ? "" : classes.submitButton}
              >
                Company Site
              </Button>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
}

PositionHeader.propTypes = {
  company: PropTypes.string,
  company_url: PropTypes.string,
  company_logo: PropTypes.string,
  loading_job: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.browser.isMobile,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PositionHeader));
