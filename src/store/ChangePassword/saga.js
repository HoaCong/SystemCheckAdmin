import { ENDPOINT } from "constants/routerApi";
import { put as puts } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLogout } from "store/Login/action";
import { addToast } from "store/Toast/action";
import {
  actionChangePasswordFailed,
  actionChangePasswordSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiChangePassword({ params }) {
  try {
    const { id, email, password } = params;
    const response = yield call(puts, ENDPOINT.CHANGE_PASSWORD + id, {
      email,
      password,
    });
    if (response.status === 200) {
      yield put(actionChangePasswordSuccess(response.data.data));
      yield put(
        addToast({
          text: "Cập nhật mật khẩu thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionChangePasswordFailed());
      yield put(
        addToast({
          text: "Cập nhật mật khẩu thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
   
    yield put(actionChangePasswordFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Cập nhật mật khẩu thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* changePasswordSaga() {
  yield all([
    yield takeLeading(ActionTypes.CHANGE_PASSWORD, callApiChangePassword),
  ]);
}
