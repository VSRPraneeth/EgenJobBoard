import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import LocationOffIcon from "@material-ui/icons/LocationOff";

// Redux
import { connect } from "react-redux";
import { changePage, fetchJobs, clearJobs } from "../redux/actions/dataActions";
import { filterActions } from "../redux/actions/filterActions";
import { locationActions } from "../redux/actions/browserActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitIcon: {
    margin: "5px 7px",
    minWidth: "25px",
  },
  submitButton: {
    margin: "5px 15px",
  },
});

export class FilterBar extends Component {
  constructor(props) {
    super();
    this.state = {
      filters: {
        filterJob: "",
        filterLocation: "",
        filterLatLong: { lat: null, long: null },
        fullTime: false,
      },
      locationOn: false,
    };
  }

  setLatLong = (event) => {
    console.log("event", event);
    if (!this.state.locationOn) {
      this.getLocationCoords();
    } else {
      this.setState({
        filters: {
          ...this.state.filters,
          filterLatLong: {
            lat: null,
            long: null,
          },
        },
        locationOn: false,
      });
      this.props.locationActions(false);
    }
  };

  componentDidMount() {
    this.setState(
      {
        filters: { ...this.props.filter },
        locationOn: true,
      },
      () => {
        this.getLocationCoords();
      }
    );
  }

  getLocationCoords() {
    if (navigator && navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          console.log("filterBar granted", result);
          this.returnGeoCoords();
        } else if (result.state === "prompt") {
          console.log("filterBar prompt");
          this.returnGeoCoords();
        } else if (result.state === "denied") {
          console.log("filterBar denied", result);
          this.returnGeoCoords();
        }
      });
    }
  }

  returnGeoCoords() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        console.log("filterBar location", location);
        this.setState(
          {
            filters: {
              ...this.state.filters,
              filterLocation: "",
              filterLatLong: {
                lat: location.coords.latitude,
                long: location.coords.longitude,
              },
            },
            locationOn: true,
          },
          () => this.props.locationActions(true)
        );
      },
      (error) => {
        console.log("filterBar error", error);
        this.setState({
          filters: {
            ...this.state.filters,
            filterLatLong: {
              lat: null,
              long: null,
            },
          },
          locationOn: false,
        });
        this.props.locationActions(false);
      }
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.filterActions(this.state.filters);
    this.props.changePage(1);
    this.props.clearJobs();
    this.props.fetchJobs(this.state.filters, 1);
  };

  render() {
    const { classes, light, isMobile } = this.props;
    const {
      filters: { filterJob, filterLocation, fullTime },
      locationOn,
    } = this.state;

    console.log("filterBar", this.state);
    var color = light
      ? getComputedStyle(document.documentElement).getPropertyValue(
          "--light-paper-bg"
        )
      : getComputedStyle(document.documentElement).getPropertyValue(
          "--dark-paper-bg"
        );
    return (
      <form
        className={classes.filterForm}
        style={{ backgroundColor: color }}
        onSubmit={this.handleSubmit}
      >
        {!isMobile && (
          <SearchIcon color="primary" style={{ margin: "0px 10px" }} />
        )}
        <TextField
          name="filterJob"
          value={filterJob}
          InputProps={{ disableUnderline: true }}
          type="text"
          placeholder="Filter by title, companies, ...."
          className={classes.textField}
          onChange={(e) =>
            this.setState({
              filters: { ...this.state.filters, filterJob: e.target.value },
              location: this.state.locationOn,
            })
          }
          fullWidth
        ></TextField>
        {isMobile ? (
          <FilterListOutlinedIcon></FilterListOutlinedIcon>
        ) : (
          <>
            <Divider orientation="vertical" flexItem />
            {locationOn ? (
              <LocationOnIcon
                color="primary"
                onClick={this.setLatLong}
                style={{ margin: "0px 10px" }}
              />
            ) : (
              <LocationOffIcon
                color="primary"
                onClick={this.setLatLong}
                style={{ margin: "0px 10px" }}
              />
            )}
            <TextField
              name="filterLocation"
              value={filterLocation}
              InputProps={{ disableUnderline: true }}
              type="text"
              placeholder="Filter by location"
              className={classes.textField}
              onChange={(e) =>
                this.setState({
                  filters: {
                    ...this.state.filters,
                    filterLocation: e.target.value,
                    filterLatLong: { lat: null, long: null },
                  },
                  locationOn: false,
                })
              }
              fullWidth
            ></TextField>
            <Divider orientation="vertical" flexItem />
            <div
              className="flex container row"
              style={{ margin: "0px 10px", alignItems: "center" }}
            >
              <Checkbox
                color="primary"
                checked={fullTime}
                onChange={() =>
                  this.setState({
                    filters: {
                      ...this.state.filters,
                      fullTime: !this.state.filters.fullTime,
                    },
                    locationOn: this.state.locationOn,
                  })
                }
                name="fullTime"
              />
              <Typography color="textPrimary" variant="body1">
                Full Time Only
              </Typography>
            </div>
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={isMobile ? classes.submitIcon : classes.submitButton}
          disabled={false}
        >
          {isMobile ? <SearchIcon></SearchIcon> : <>Search</>}
        </Button>
      </form>
    );
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object,
  light: PropTypes.bool,
  isMobile: PropTypes.bool,
  page: PropTypes.number,
  filter: PropTypes.object,
  filterActions: PropTypes.func,
  fetchJobs: PropTypes.func,
  changePage: PropTypes.func,
  clearJobs: PropTypes.func,
  locationActions: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    page: state.jobs.page,
    light: state.theme.light,
    browser: state.browser.isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterActions: (filters) => dispatch(filterActions(filters)),
    fetchJobs: (filters, page) => dispatch(fetchJobs(filters, page)),
    changePage: (page) => dispatch(changePage(page)),
    clearJobs: () => dispatch(clearJobs()),
    locationActions: (locationOn) => dispatch(locationActions(locationOn)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterBar));
