/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import changePasswordReducer from "./ChangePassword/reducer";
import employeeReducer from "./Employee/reducer";
import historiesReducer from "./Histories/reducer";
import loginReducer from "./Login/reducer";
import searchReducer from "./Search/reducer";
import searchProvinceReducer from "./SearchByProvince/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  loginReducer,
  toastReducer,
  employeeReducer,
  changePasswordReducer,
  historiesReducer,
  searchReducer,
  searchProvinceReducer,
});

export default rootReducer;
