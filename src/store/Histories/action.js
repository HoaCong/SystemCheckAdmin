import * as ActionTypes from "./constant";

export const actionHistories = (params) => ({
  type: ActionTypes.HISTORIES,
  params,
});

export const actionHistoriesSuccess = (payload) => ({
  type: ActionTypes.HISTORIES_SUCCESS,
  payload,
});

export const actionHistoriesFailed = (error) => ({
  type: ActionTypes.HISTORIES_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
