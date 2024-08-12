import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLogout } from "store/Login/action";
import { addToast } from "store/Toast/action";
import { actionHistoriesFailed, actionHistoriesSuccess } from "./action";
import * as ActionTypes from "./constant";
function* callApiHistories({ params }) {
  try {
    const response = yield call(get, ENDPOINT.HISTORIES, params);
    if (response.status === 200) {
      yield put(actionHistoriesSuccess(response.data));
    } else {
      yield put(actionHistoriesFailed());
    }
  } catch (error) {
    if (error.response.status === 401) {
      yield put(actionLogout());
      yield put(
        addToast({
          text: "Tài khoản được đăng nhập từ nơi khác, vui lòng đăng nhập lại để sử dụng",
          type: "warning",
          title: "",
          life: 5000,
        })
      );
    }
    yield put(actionHistoriesFailed(error.response.data.error));
  }
}

export default function* historiesSaga() {
  yield all([yield takeLeading(ActionTypes.HISTORIES, callApiHistories)]);
}
