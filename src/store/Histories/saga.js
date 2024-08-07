import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionHistoriesFailed, actionHistoriesSuccess } from "./action";
import * as ActionTypes from "./constant";
function* callApiHistories({ params }) {
  try {
    const response = yield call(get, ENDPOINT.HISTORIES, params);
    console.log("function*callApiHistories  response:", response);
    if (response.status === 200) {
      yield put(actionHistoriesSuccess(response.data));
    } else {
      yield put(actionHistoriesFailed());
    }
  } catch (error) {
    yield put(actionHistoriesFailed(error.response.data.error));
  }
}

export default function* historiesSaga() {
  yield all([yield takeLeading(ActionTypes.HISTORIES, callApiHistories)]);
}
