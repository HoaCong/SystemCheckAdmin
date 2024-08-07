/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";
import changePasswordSaga from "./ChangePassword/saga";
import employeeSaga from "./Employee/saga";
import historiesSaga from "./Histories/saga";
import loginSaga from "./Login/saga";
import searchSaga from "./Search/saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(employeeSaga),
    fork(changePasswordSaga),
    fork(historiesSaga),
    fork(searchSaga),
  ]);
}
