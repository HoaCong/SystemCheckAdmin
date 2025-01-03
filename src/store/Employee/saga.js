import { ENDPOINT } from "constants/routerApi";
import { saveAs } from "file-saver";
import { get, post, put as puts, remove } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { actionLogout } from "store/Login/action";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionChangeActiveFailed,
  actionChangeActiveSuccess,
  actionDeleteFailed,
  actionDeleteSuccess,
  actionDetailFailed,
  actionDetailSuccess,
  actionDownloadExcelFailed,
  actionDownloadExcelSuccess,
  actionEditFailed,
  actionEditSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_EMPLOYEE, params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
    }
  } catch (error) {
    
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiAdd({ params }) {
  try {
    const response = yield call(post, ENDPOINT.ADD_EMPLOYEE, params);
    if (response.status === 200) {
      yield put(actionAddSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionAddFailed());
      yield put(
        addToast({
          text: response.message || "Add employee failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
   
    yield put(actionAddFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Add employee failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEdit({ params }) {
  try {
    const { id } = params;
    const response = yield call(puts, ENDPOINT.EDIT_EMPLOYEE + id, params);

    if (response.status === 200) {
      yield put(actionEditSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditFailed());
      yield put(
        addToast({
          text: "Update employee failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update employee failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiChangeActive({ id }) {
  try {
    const response = yield call(puts, ENDPOINT.ACTIVE_EMPLOYEE + id);
    if (response.status === 200) {
      yield put(actionChangeActiveSuccess(id));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionChangeActiveFailed());
      yield put(
        addToast({
          text: "Update employee failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update employee failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDelete({ id }) {
  try {
    const response = yield call(remove, ENDPOINT.DELETE_EMPLOYEE + id);
    if (response.status === 200) {
      yield put(actionDeleteSuccess(id));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionDeleteFailed());
      yield put(
        addToast({
          text: "Update employee failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update employee failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDetail({ id }) {
  try {
    const response = yield call(get, ENDPOINT.DETAIL_EMPLOYEE + id);
    if (response.status === 200) {
      yield put(actionDetailSuccess(response.data.data));
    } else {
      yield put(actionDetailFailed());
    }
  } catch (error) {
   
    yield put(actionDetailFailed(error.response.data.error));
  }
}

function* callApiUpdateDetail({ params }) {
  try {
    const { id } = params;
    const response = yield call(
      puts,
      ENDPOINT.UPDATE_DETAIL_EMPLOYEE + id,
      params
    );

    if (response.status === 200) {
      yield put(actionEditSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditFailed());
      yield put(
        addToast({
          text: "Update employee failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
   
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update employee failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDownloadExcel({ params }) {
  try {
    const response = yield call(get, ENDPOINT.DOWNLOAD_EXCEL, {
      responseType: "blob",
    });
    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "employee_library.xlsx");
      yield put(actionDownloadExcelSuccess(response.data.data));
      yield put(
        addToast({
          text: "Tải xuống thành công",
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionDownloadExcelFailed());
      yield put(
        addToast({
          text: "Tải xuống thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
   
    yield put(actionDownloadExcelFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Tải xuống thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* employeeSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.ADD, callApiAdd),
    yield takeLatest(ActionTypes.EDIT, callApiEdit),
    yield takeLatest(ActionTypes.CHANGE_ACTIVE, callApiChangeActive),
    yield takeLatest(ActionTypes.DELETE, callApiDelete),
    yield takeLatest(ActionTypes.DETAIL, callApiDetail),
    yield takeLatest(ActionTypes.UPDATE, callApiUpdateDetail),
    yield takeLatest(ActionTypes.DOWNLOAD_EXCEL, callApiDownloadExcel),
  ]);
}
