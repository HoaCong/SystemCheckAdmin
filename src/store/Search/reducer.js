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
  data: [],
  error: "",
};

const searchReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SEARCH:
        draft.status.isLoading = true;
        draft.status.isSuccess = false;
        draft.status.isFailure = false;
        draft.error = "";
        draft.data = null;
        break;

      case ActionTypes.SEARCH_SUCCESS:
        draft.status.isLoading = false;
        draft.status.isSuccess = true;
        draft.data = action.payload;
        break;

      case ActionTypes.SEARCH_FAILED:
        draft.status.isLoading = false;
        draft.status.isFailure = true;
        draft.error = action.error;
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default searchReducer;
