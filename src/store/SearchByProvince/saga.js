import { ENDPOINT } from "constants/routerApi";
import { get, post } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLogout, actionMinusCountCheck } from "store/Login/action";
import { addToast } from "store/Toast/action";
import { actionSearchFailed, actionSearchSuccess } from "./action";
import * as ActionTypes from "./constant";
function* callApiSearch({ params }) {
  try {
    const response = yield call(get, ENDPOINT.SEARCH_BY_PROVINCE, params);
    if (response.status === 200 && response.data.status) {
      yield put(actionSearchSuccess(response.data));
      // yield put(actionMinusCountCheck());
    } else {
      yield put(actionSearchFailed(response.data.message));
    }
  } catch (error) {
    yield put(
      actionSearchFailed(
        error.response.status === 400
          ? "Vui lòng điền thông tin để tra cứu"
          : error.response.data.message
      )
    );
  }
}

export default function* searchProvinceSaga() {
  yield all([yield takeLeading(ActionTypes.SEARCH, callApiSearch)]);
}
