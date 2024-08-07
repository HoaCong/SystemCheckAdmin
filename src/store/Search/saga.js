import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionMinusCountCheck } from "store/Login/action";
import { actionSearchFailed, actionSearchSuccess } from "./action";
import * as ActionTypes from "./constant";
function* callApiSearch({ params }) {
  try {
    const { type, query, queryCustom } = params;
    const CASE_SURFIX = {
      cccd: {
        surfix: "/cccd/" + query,
        option: null,
      },
      phone: {
        surfix: "/phone/" + query,
        option: null,
      },
      custome: {
        surfix: "",
        option: queryCustom,
      },
    };
    const surfix = CASE_SURFIX[type].surfix;
    const options = CASE_SURFIX[type].options;
    const response = yield call(get, ENDPOINT.SEARCH + surfix, options);
    if (response.status === 200 && response.data.status) {
      yield put(actionSearchSuccess(response.data));
      yield put(actionMinusCountCheck());
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

export default function* searchSaga() {
  yield all([yield takeLeading(ActionTypes.SEARCH, callApiSearch)]);
}
