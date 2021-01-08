import {
  CHANGE_PAGE,
  CLEAR_JOBS,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOB_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
} from "../types";

import axios from "axios";
import { testValue, testValues } from "../../test";

// All Jobs
export const fetchJobsRequest = () => {
  return {
    type: FETCH_JOBS_REQUEST,
  };
};

export const fetchJobsSuccess = (jobs) => {
  return {
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
  };
};

export const fetchJobsFailure = (error) => {
  return {
    type: FETCH_JOBS_FAILURE,
    payload: error,
  };
};

export const fetchJobs = (filterData, pageNumber) => (dispatch) => {
  let params = {};
  if (pageNumber) {
    params["page"] = pageNumber;
  }
  if (filterData) {
    if (filterData.filterJob) {
      params["description"] = filterData.filterJob;
    }
    if (filterData.filterLocation) {
      params["location"] = filterData.filterLocation;
    }
    if (filterData.fullTime !== null) {
      params["full_time"] = filterData.fullTime;
    }
    if (filterData.filterLatLong) {
      if (filterData.filterLatLong.lat && filterData.filterLatLong.long) {
        params["lat"] = filterData.filterLatLong.lat;
        params["long"] = filterData.filterLatLong.long;
      }
    }
  }
  dispatch(fetchJobsRequest());
  console.log("GET Jobss : ", params);
  // setTimeout(() => {
  //   dispatch(fetchJobsSuccess(testValues));
  // }, 2000);
  var date = new Date();
  console.log(date.getTime());
  axios
    .get("/positions.json", { params: params })
    .then((res) => {
      var date = new Date();
      console.log(date.getTime());
      dispatch(fetchJobsSuccess(res.data));
    })
    .catch((err) => {
      console.log("error", err);
      dispatch(fetchJobsFailure(err.message));
    });
};

// Single Job
export const fetchJobRequest = () => {
  return {
    type: FETCH_JOB_REQUEST,
  };
};

export const fetchJobSuccess = (job) => {
  return {
    type: FETCH_JOB_SUCCESS,
    payload: job,
  };
};

export const fetchJobFailure = (error) => {
  return {
    type: FETCH_JOB_FAILURE,
    payload: error,
  };
};

export const fetchJob = (jobId) => (dispatch) => {
  dispatch(fetchJobRequest());
  // setTimeout(() => {
  //   console.log("GET Job : ", testValue);
  //   dispatch(fetchJobSuccess(testValue));
  // }, 2000);
  axios
    .get(`/positions/${jobId}.json`)
    .then((res) => {
      dispatch(fetchJobSuccess(res.data));
    })
    .catch((err) => {
      console.log("error", err);
      dispatch(fetchJobFailure(err.message));
    });
};

// Change A Page
export const changePage = (pageNumber) => {
  return {
    type: CHANGE_PAGE,
    payload: pageNumber,
  };
};

// Clear Jobs
export const clearJobs = () => {
  return {
    type: CLEAR_JOBS,
  };
};
