import React, { Component } from "react";
import PropTypes from "prop-types";

// React Redux
import { connect } from "react-redux";

// components
import FilterBar from "./FilterBar";
import Header from "./Header";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

import Position from "./Position";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { clearJobs, fetchJobs } from "../redux/actions/dataActions";
import { changePage } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1,
      positions: [],
    };
  }
  componentDidMount() {
    this.props.clearJobs();
    this.props.fetchJobs(this.props.filter, this.props.jobs.page);
  }

  handleLoad = (event) => {
    event.preventDefault();
    let newPage = this.props.jobs.page + 1;
    this.props.changePage(newPage);
    console.log(this.props.jobs.page);
    this.props.fetchJobs(this.props.filter, newPage);
  };

  render() {
    const {
      classes,
      jobs: { jobs, loading_jobs },
      filter,
    } = this.props;

    return (
      <div className="flex container column" style={{ overflow: "hidden" }}>
        <div
          style={{
            height: "100px",
            maxHeight: "100px",
          }}
        >
          <Header />
        </div>
        <div className={classes.headerMargin}>
          <FilterBar></FilterBar>
        </div>

        <div
          className="flex container column"
          style={{
            overflow: "hidden scroll",
            padding: "0% 8%",
            width: "auto",
            //  justifyContent: "center",
            margin: "3% 0%",
          }}
        >
          <div
            className="flex"
            style={{
              flexWrap: "wrap",
            }}
          >
            {jobs.map((position) => (
              <Position position={position} key={position.id} />
            ))}
          </div>

          <div
            className="flex"
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {loading_jobs ? (
              <CircularProgress size={30} thickness={5}></CircularProgress>
            ) : (
              <Button
                onClick={this.handleLoad}
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={false}
              >
                Load More
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  jobs: PropTypes.object,
  filter: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  fetchJobs: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  clearJobs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    filter: state.filter,
    isMobile: state.browser.isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobs: (filterOptions, pageNumber) =>
      dispatch(fetchJobs(filterOptions, pageNumber)),
    changePage: (pageNumber) => dispatch(changePage(pageNumber)),
    clearJobs: () => dispatch(clearJobs()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
