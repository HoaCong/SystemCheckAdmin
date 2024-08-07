import produce from "immer";
import * as ActionTypes from "./constant";

const status = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
};
// DEFAULT STATE
const initialState = {
  status,
  list: [],
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
};

const historiesReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.HISTORIES:
        draft.status.isLoading = true;
        draft.status.isSuccess = false;
        draft.status.isFailure = false;
        draft.params.page = action.params.page;
        break;

      case ActionTypes.HISTORIES_SUCCESS:
        draft.status.isLoading = false;
        draft.status.isSuccess = true;
        draft.list = action.payload.histories;
        draft.meta.total = action.payload.total;
        break;

      case ActionTypes.HISTORIES_FAILED:
        draft.status.isLoading = false;
        draft.status.isFailure = true;
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default historiesReducer;
