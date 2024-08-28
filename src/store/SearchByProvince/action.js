import * as ActionTypes from "./constant";

export const actionSearch = (params) => ({
  type: ActionTypes.SEARCH,
  params,
});

export const actionSearchSuccess = (payload) => ({
  type: ActionTypes.SEARCH_SUCCESS,
  payload,
});

export const actionSearchFailed = (error) => ({
  type: ActionTypes.SEARCH_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
