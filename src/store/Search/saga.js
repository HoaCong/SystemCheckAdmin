import { ENDPOINT } from "constants/routerApi";
import { get, post } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLogout, actionMinusCountCheck } from "store/Login/action";
import { addToast } from "store/Toast/action";
import { actionSearchFailed, actionSearchSuccess } from "./action";
import * as ActionTypes from "./constant";
function* callApiSearch({ params }) {
  try {
    const { type, query, queryCustom } = params;
    const CASE_SURFIX = {
      cccd: {
        surfix: "/cccd/" + query,
        options: null,
        method: get,
      },
      phone: {
        surfix: "/phone/" + query,
        options: null,
        method: get,
      },
      custom: {
        surfix: "",
        options: queryCustom,
        method: post,
      },
    };
    const surfix = CASE_SURFIX[type].surfix;
    const options = CASE_SURFIX[type].options;
    const response = yield call(
      CASE_SURFIX[type].method,
      ENDPOINT.SEARCH + surfix,
      options
    );
    if (response.status === 200 && response.data.status) {
      yield put(actionSearchSuccess(response.data));
      yield put(actionMinusCountCheck());
    } else {
      yield put(actionSearchFailed(response.data.message));
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
    yield put(
      actionSearchFailed(
        error.response.status === 400
          ? "Vui lòng điền thông tin để tra cứu"
          : error.response.data.message
      )
    );
  }
}

export default function* searchSaga() {
  yield all([yield takeLeading(ActionTypes.SEARCH, callApiSearch)]);
}
