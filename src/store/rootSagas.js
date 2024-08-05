/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";
import dashboardSaga from "./Dashboard/saga";
import employeeSaga from "./Employee/saga";
import loginSaga from "./Login/saga";

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(employeeSaga), fork(dashboardSaga)]);
}
