import {
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOB_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  CHANGE_PAGE,
  CLEAR_JOBS,
} from "../types";

const initialState = {
  loading_jobs: false,
  jobs: [],
  error: "",
  loading_job: false,
  job: {},
  error_job: "",
  page: 1,
};

const jobsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_JOBS_REQUEST:
      return { ...state, loading_jobs: true };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading_jobs: false,
        jobs:
          payload && payload.length
            ? [...state.jobs, ...payload]
            : [...state.jobs],
        error_jobs: "",
      };
    case FETCH_JOBS_FAILURE:
      return { ...state, loading_jobs: false, jobs: [], error_jobs: payload };

    case FETCH_JOB_REQUEST:
      return { ...state, loading_job: true };
    case FETCH_JOB_SUCCESS:
      return {
        ...state,
        loading_job: false,
        job: payload,
        error_job: "",
      };
    case FETCH_JOB_FAILURE:
      return { ...state, loading_job: false, job: {}, error_job: payload };
    case CHANGE_PAGE:
      return { ...state, page: payload };
    case CLEAR_JOBS:
      return { ...state, jobs: [] };
    default:
      return state;
  }
};

export default jobsReducer;
