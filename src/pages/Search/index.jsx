/* eslint-disable react-hooks/exhaustive-deps */
import TemplateContent from "components/layout/TemplateContent";
import _map from "lodash/map";
import { useState } from "react";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionSearch, resetData } from "store/Search/action";
import CODE_PREFECTURE from "./data.json";
function Search(props) {
  const {
    status: { isLoading, isSuccess, isFailure },
    data,
    error,
  } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();
  const onSearch = (body) => dispatch(actionSearch(body));
  const onResetData = () => dispatch(resetData());

  const [query, setQuery] = useState("");
  const [queryCustom, setQueryCustom] = useState({
    fullname: "",
    date: "",
    code: "",
  });

  const [currentTab, setCurrentTab] = useState("cccd");

  const handleSearch = () => {
    onSearch({
      query,
      queryCustom,
      type: currentTab,
    });
  };

  const handleReset = () => {
    onResetData();
    setQuery("");
    setQueryCustom({
      fullname: "",
      date: "",
      code: "",
    });
  };

  const handleSelect = (key) => {
    setCurrentTab(key);
    handleReset();
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Tìm kiếm"
        filter={
          <>
            <Tabs
              activeKey={currentTab}
              id="uncontrolled-tab-example"
              className="mb-3"
              onSelect={handleSelect}
            >
              <Tab eventKey="cccd" title="Căn cước công dân"></Tab>
              <Tab eventKey="phone" title="Số điện thoại"></Tab>
              <Tab eventKey="custom" title="Thông tin tùy chọn"></Tab>
            </Tabs>
            <div className="d-flex align-items-end gap-2 flex-wrap">
              {currentTab === "cccd" && (
                <div style={{ width: "100%", maxWidth: 250 }}>
                  <NumericFormat
                    value={query}
                    displayType={"input"}
                    className="form-control"
                    placeholder="Nhập CCCD"
                    onValueChange={({ value }) => setQuery(value)}
                    allowNegative={false} // Không cho phép số âm
                    decimalScale={0} // Không sử dụng dấu thập phân
                    fixedDecimalScale={false} // Không cố định số chữ số thập phân
                    allowLeadingZeros
                  />
                </div>
              )}

              {currentTab === "phone" && (
                <div style={{ width: "100%", maxWidth: 250 }}>
                  <NumericFormat
                    value={query}
                    displayType={"input"}
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    onValueChange={({ value }) => setQuery(value)}
                    allowNegative={false} // Không cho phép số âm
                    decimalScale={0} // Không sử dụng dấu thập phân
                    fixedDecimalScale={false} // Không cố định số chữ số thập phân
                    allowLeadingZeros
                  />
                </div>
              )}

              {currentTab === "custom" && (
                <>
                  <div style={{ width: "100%", maxWidth: 250 }}>
                    <Form.Control
                      placeholder="Họ tên"
                      name="query"
                      value={queryCustom.fullname}
                      onChange={(e) => {
                        setQueryCustom((prevData) => ({
                          ...prevData,
                          fullname: e.target.value,
                        }));
                      }}
                    ></Form.Control>
                  </div>
                  <div
                    id="search-date"
                    style={{ width: "100%", maxWidth: 250 }}
                  >
                    <DatePicker
                      placeholderText="Ngày sinh"
                      selected={queryCustom.date}
                      dateFormat="dd/MM/yyyy" // Định dạng ngày
                      className="form-control"
                      name="date"
                      onChange={(date) => {
                        setQueryCustom((prevData) => ({ ...prevData, date }));
                      }}
                    />
                  </div>
                  <div style={{ width: "100%", maxWidth: 250 }}>
                    <Form.Select
                      name="code"
                      value={queryCustom.code}
                      onChange={(e) =>
                        setQueryCustom((prevData) => ({
                          ...prevData,
                          code: e.target.value,
                        }))
                      }
                    >
                      <option value="" disabled>
                        Chọn tỉnh thành
                      </option>
                      {_map(CODE_PREFECTURE, (item, index) => (
                        <option key={index} value={item.code}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </>
              )}

              <Button onClick={handleSearch} disabled={isLoading}>
                Tìm kiếm
              </Button>
              <Button
                variant="outline-secondary"
                disabled={isLoading}
                onClick={handleReset}
              >
                Đặt lại
              </Button>
            </div>
          </>
        }
      >
        {!(isLoading || isSuccess || isFailure) && (
          <div>Nhập thông tin để tra cứu kết quả</div>
        )}
        {isLoading && <div>Loading...</div>}
        {isSuccess && (
          <>
            <section>
              <h5>Thông tin chi tiết</h5>
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="align-middle">
                      CMND/CCCD
                    </th>
                    <th scope="col" className="align-middle">
                      Họ tên
                    </th>
                    <th scope="col" className="align-middle">
                      Ngày sinh
                    </th>
                    <th scope="col" className="align-middle">
                      Số điện thoại
                    </th>
                    <th scope="col" className="align-middle">
                      Email
                    </th>
                    <th scope="col" className="align-middle">
                      Địa chỉ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-middle">{data.info.cmnd || "_"}</td>
                    <td className="align-middle">
                      {data.info.ho_va_ten || "_"}
                    </td>
                    <td className="align-middle">
                      {data.info.ngay_sinh || "_"}
                    </td>
                    <td className="align-middle">{data.info.sdt || "_"}</td>
                    <td className="align-middle">{data.info.email || "_"}</td>

                    <td className="align-middle">
                      {data.info.dia_chi_kbxh || "_"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <hr />
            <section>
              <h5>Thông tin liên quan</h5>
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="align-middle">
                      #
                    </th>
                    <th scope="col" className="align-middle">
                      CMND/CCCD
                    </th>
                    <th scope="col" className="align-middle">
                      Họ tên
                    </th>
                    <th scope="col" className="align-middle">
                      Ngày sinh
                    </th>
                    <th scope="col" className="align-middle">
                      Quan hệ
                    </th>
                    <th scope="col" className="align-middle">
                      Số điện thoại
                    </th>
                    <th scope="col" className="align-middle">
                      Email
                    </th>
                    <th scope="col" className="align-middle">
                      Địa chỉ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.relative.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row" className="align-middle">
                        {index + 1}
                      </th>
                      <td className="align-middle">{item.cmnd || "_"}</td>
                      <td className="align-middle">{item.ho_va_ten || "_"}</td>
                      <td className="align-middle">{item.ngay_sinh || "_"}</td>
                      <td className="align-middle">
                        {item.moi_quan_he || "_"}
                      </td>
                      <td className="align-middle">{item.sdt || "_"}</td>
                      <td className="align-middle">{item.email || "_"}</td>

                      <td className="align-middle">
                        {item.dia_chi_kbxh || "_"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
        {isFailure && <div>{error}</div>}
      </TemplateContent>
    </div>
  );
}

export default Search;
