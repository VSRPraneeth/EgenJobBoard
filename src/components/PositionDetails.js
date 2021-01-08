import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Components
import Header from "./Header";
import PositionHeader from "./PositionHeader";
import PositionDescription from "./PositionDescription";

// Redux
import { connect } from "react-redux";
import { fetchJob } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    float: "right",
    margin: "10px 0px",
  },
  mobileButton: {
    width: "100%",
    margin: "10px 0px",
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

class PositionDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      job: {},
    };
  }

  componentDidMount() {
    const jobId = this.props.match.params.id;
    this.props.fetchJob(jobId);
  }

  render() {
    const {
      classes,
      jobs: {
        job: {
          id,
          type,
          url,
          created_at,
          company,
          company_url,
          location,
          title,
          description,
          how_to_apply,
          company_logo,
        },
        loading_job,
      },
      isMobile,
    } = this.props;
    console.log("positionDetails is mobile", isMobile);
    return (
      <div className="flex container column" style={{ overflow: "hidden" }}>
        <div style={{ display: "inline" }}>
          <div
            style={{
              height: "100px",
              maxHeight: "100px",
            }}
          >
            <Header />
          </div>
          <div className={classes.headerMargin}>
            <PositionHeader
              company={company}
              company_url={company_url}
              company_logo={company_logo}
              loading_job={loading_job}
            ></PositionHeader>
          </div>
        </div>
        {loading_job ? (
          <div
            className="flex container"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <CircularProgress size={100} thickness={2}></CircularProgress>
          </div>
        ) : (
          <div
            className="flex container column"
            style={{
              overflow: "hidden scroll",
              padding: "0% 8%",
              margin: "20px 0px",
              width: "auto",
            }}
          >
            <PositionDescription
              created_at={created_at}
              type={type}
              title={title}
              location={location}
              description={description}
              loading_job={loading_job}
            ></PositionDescription>
            <Paper
              className="flex container column"
              style={{
                height: "auto",
                width: "auto",
                margin: "20px 0px",
                padding: "10px",
                backgroundColor: "var(--main)",
              }}
            >
              <div
                style={{ fontSize: "12px" }}
                dangerouslySetInnerHTML={{
                  __html: how_to_apply && how_to_apply.replace(/\n/g, "<br />"),
                }}
              ></div>
            </Paper>

            <div className={`flex container ` + (isMobile ? "column" : "row")}>
              <div className="flex container column">
                <Typography variant="h5" color="textSecondary">
                  {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {company}
                </Typography>
              </div>
              <div className="container" style={{ display: "inline" }}>
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
          </div>
        )}
      </div>
    );
  }
}

PositionDetails.propTypes = {
  jobs: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
  fetchJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    isMobile: state.browser.isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJob: (id) => dispatch(fetchJob(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PositionDetails));
