/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Employee/action";
import { isValidPhoneNumber } from "../../helper/functions";
import { roleEnum } from "./helper";

const initialData = {
  count_check_current: "",
  username: "",
  cccd: "",
  email: "",
  phone: "",
  password: "",
  role_id: "",
};

function FormEmployee({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.employeeReducer);
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const onAddEmployee = (body) => dispatch(actionAdd(body));
  const onEditEmployee = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) {
      setData({ ...info });
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(
      _omit(data, ["image", "session_id", "cccd", "phone"])
    );
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
      if (
        data[key] !== "" &&
        key === "phone" &&
        !isValidPhoneNumber(data[key])
      ) {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} invalid format`,
        }));
        validates = false;
      }
    });
    if (validates) {
      const newData = { ...data };
      newData.count_check_current = +data.count_check_current;
      if (type === "create") onAddEmployee({ ...newData });
      if (type === "edit") onEditEmployee({ ...newData });
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin tài khoản",
    edit: "Chỉnh sửa tài khoản",
    create: "Thêm mới tài khoản",
  };

  const ROLE = {
    ADMIN: roleEnum,
    MANAGER: {
      EMPLOYEE: "Employee",
    },
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
      propsModal={{
        size: "lg",
      }}
    >
      <form className="row">
        <div className="col-6">
          <Form.Label htmlFor="Employeename">
            Tên tài khoản <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Employeename"
            name="username"
            defaultValue={data.username}
            aria-describedby="helperEmployeename"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.username && (
            <Form.Text
              id="helperEmployeename"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.username}
            </Form.Text>
          )}
        </div>
        <div className="col-6">
          <Form.Label htmlFor="CCCD">CCCD</Form.Label>
          <Form.Control
            type="text"
            id="cccd"
            name="cccd"
            defaultValue={data.cccd}
            aria-describedby="helperCCCD"
            disabled={["detail"].includes(type)}
            onChange={handleChange}
          />
          {error.cccd && (
            <Form.Text
              id="helperCCCD"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.cccd}
            </Form.Text>
          )}
        </div>
        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">
            Email <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            id="Email"
            name="email"
            defaultValue={data.email}
            aria-describedby="helperEmail"
            disabled={["detail", "edit"].includes(type)}
            onChange={handleChange}
          />
          {error.email && (
            <Form.Text
              id="helperEmail"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.email}
            </Form.Text>
          )}
        </div>
        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            id="Phone"
            name="phone"
            defaultValue={data.phone}
            aria-describedby="helperPhone"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.phone && (
            <Form.Text
              id="helperPhone"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.phone}
            </Form.Text>
          )}
        </div>
        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">
            Mật khẩu <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            id="Password"
            name="password"
            defaultValue={data.password}
            aria-describedby="helperPassword"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.password && (
            <Form.Text
              id="helperPassword"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.password}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Role">
            Quyền <span className="required">*</span>
          </Form.Label>
          <Form.Select
            aria-label="Quyền"
            name="role_id"
            value={data.role_id}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            <option value="" disabled>
              Chọn quyền
            </option>
            {_map(ROLE[user?.role_id], (value, index) => (
              <option key={value} value={index}>
                {value}
              </option>
            ))}
          </Form.Select>
          {error.role_id && (
            <Form.Text
              id="helperRoleId"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.role_id}
            </Form.Text>
          )}
        </div>
        <div className="col-6 mt-3">
          <Form.Label htmlFor="CountCheckCurrent">
            Số lượt check <span className="required">*</span>
          </Form.Label>
          <NumericFormat
            thousandSeparator={true}
            id="CountCheckCurrent"
            name="count_check_current"
            value={data.count_check_current}
            displayType={"input"}
            className="form-control"
            disabled={type === "detail"}
            onValueChange={({ value }) =>
              handleChange({
                target: {
                  name: "count_check_current",
                  value,
                },
              })
            }
          />
          {error.count_check_current && (
            <Form.Text
              id="helperCountCheckCurrent"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.count_check_current}
            </Form.Text>
          )}
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormEmployee;
