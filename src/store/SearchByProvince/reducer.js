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
  params: {
    limit: 10,
    page: 1,
  },
  total: 0,
  error: "",
};

const searchProvinceReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SEARCH:
        draft.status.isLoading = true;
        draft.status.isSuccess = false;
        draft.status.isFailure = false;
        draft.params = action.params;
        draft.error = "";
        break;

      case ActionTypes.SEARCH_SUCCESS:
        draft.status.isLoading = false;
        draft.status.isSuccess = true;
        draft.list = action.payload.data;
        draft.total = action.payload.total;
        break;

      case ActionTypes.SEARCH_FAILED:
        draft.status.isLoading = false;
        draft.status.isFailure = true;
        draft.list = [];
        draft.error = action.error;
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default searchProvinceReducer;
