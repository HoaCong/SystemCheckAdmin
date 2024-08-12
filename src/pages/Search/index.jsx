/* eslint-disable react-hooks/exhaustive-deps */
import TemplateContent from "components/layout/TemplateContent";
import { format } from "date-fns";
import _map from "lodash/map";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    return () => {
      onResetData();
    };
  }, []);

  const handleSearch = () => {
    onSearch({
      query,
      queryCustom: {
        ...queryCustom,
        date: queryCustom.date
          ? format(new Date(queryCustom.date), "dd/MM/yyyy")
          : queryCustom.date,
      },
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
    <div>
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
              <Tab eventKey="cccd" title={<b>Căn cước công dân</b>}></Tab>
              <Tab eventKey="phone" title={<b>Số điện thoại</b>}></Tab>
              <Tab eventKey="custom" title={<b>Thông tin tùy chọn</b>}></Tab>
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
                        setQueryCustom((prevData) => ({
                          ...prevData,
                          date,
                        }));
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
                          {item.code} - {item.label}
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
        cardProps={{
          className: "col-12 card overflow-y-auto result-search",
        }}
      >
        {!(isLoading || isSuccess || isFailure) && (
          <div>Nhập thông tin để tra cứu kết quả</div>
        )}
        {isLoading && <div>Loading...</div>}
        {isSuccess && (
          <>
            <h5>Thông tin chi tiết</h5>
            <section className="card p-2">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div>
                    <div>
                      <strong className="me-1">Mã kiểm tra:</strong>{" "}
                      <span>{data.info?.ma_kiem_tra || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Họ và tên:</strong>{" "}
                      <span>{data.info?.ho_va_ten || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Mối quan hệ:</strong>{" "}
                      <span>{data.info?.moi_quan_he || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">CMND:</strong>{" "}
                      <span>{data.info?.cmnd || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Ngày sinh:</strong>{" "}
                      <span>{data.info?.ngay_sinh || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">SĐT:</strong>{" "}
                      <span>{data.info?.sdt || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Mã tỉnh:</strong>{" "}
                      <span>{data.info?.ma_tinh || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Địa chỉ:</strong>{" "}
                      <span>{data.info?.dia_chi_kbxh || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Từ tháng:</strong>{" "}
                      <span>{data.info?.tu_thang || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Đến tháng:</strong>{" "}
                      <span>{data.info?.den_thang || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Chức danh:</strong>{" "}
                      <span>{data.info?.chuc_danh || "_"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div>
                    <div>
                      <strong className="me-1">Mức lương:</strong>{" "}
                      <span>{data.info?.muc_luong || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">HSL:</strong>{" "}
                      <span>{data.info?.hsl || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Tên đơn vị:</strong>{" "}
                      <span>{data.info?.ten_don_vi || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Tên phòng ban:</strong>{" "}
                      <span>{data.info?.ten_phong_ban || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Nơi làm việc:</strong>{" "}
                      <span>{data.info?.noi_lam_viec || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Tên nhân sự:</strong>{" "}
                      <span>{data.info?.ten_nhan_su || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">SĐT nhân sự:</strong>{" "}
                      <span>{data.info?.sdt_nhan_su || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Email:</strong>{" "}
                      <span>{data.info?.email || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Giám đốc công ty:</strong>{" "}
                      <span>{data.info?.giam_doc_cong_ty || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Số CMND:</strong>{" "}
                      <span>{data.info?.so_cmnd || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">SĐT giám đốc:</strong>{" "}
                      <span>{data.info?.sdt_giam_doc || "_"}</span>
                    </div>
                    <div>
                      <strong className="me-1">Ghi chú:</strong>{" "}
                      <span>{data.info?.ghi_chu || "_"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <hr />
            <section>
              <h5>Thông tin liên quan</h5>
              {data.relative.map((item, index) => (
                <section className="card p-2 mt-2" key={item.id}>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div>
                        <div>
                          <strong className="me-1">Mã kiểm tra:</strong>{" "}
                          <span>{item.ma_kiem_tra || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Phân loại:</strong>{" "}
                          <span>{item.phan_loai || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Họ và tên:</strong>{" "}
                          <span>{item.ho_va_ten || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Mối quan hệ:</strong>{" "}
                          <span>{item.moi_quan_he || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">CMND:</strong>{" "}
                          <span>{item.cmnd || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Ngày sinh:</strong>{" "}
                          <span>{item.ngay_sinh || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">SĐT:</strong>{" "}
                          <span>{item.sdt || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Mã tỉnh:</strong>{" "}
                          <span>{item.ma_tinh || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Địa chỉ:</strong>{" "}
                          <span>{item.dia_chi_kbxh || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Từ tháng:</strong>{" "}
                          <span>{item.tu_thang || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Đến tháng:</strong>{" "}
                          <span>{item.den_thang || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Chức danh:</strong>{" "}
                          <span>{item.chuc_danh || "_"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div>
                        <div>
                          <strong className="me-1">Mức lương:</strong>{" "}
                          <span>{item.muc_luong || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">HSL:</strong>{" "}
                          <span>{item.hsl || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Tên đơn vị:</strong>{" "}
                          <span>{item.ten_don_vi || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Tên phòng ban:</strong>{" "}
                          <span>{item.ten_phong_ban || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Nơi làm việc:</strong>{" "}
                          <span>{item.noi_lam_viec || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Tên nhân sự:</strong>{" "}
                          <span>{item.ten_nhan_su || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">SĐT nhân sự:</strong>{" "}
                          <span>{item.sdt_nhan_su || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Email:</strong>{" "}
                          <span>{item.email || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Giám đốc công ty:</strong>{" "}
                          <span>{item.giam_doc_cong_ty || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Số CMND:</strong>{" "}
                          <span>{item.so_cmnd || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">SĐT giám đốc:</strong>{" "}
                          <span>{item.sdt_giam_doc || "_"}</span>
                        </div>
                        <div>
                          <strong className="me-1">Ghi chú:</strong>{" "}
                          <span>{item.ghi_chu || "_"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </section>
          </>
        )}
        {isFailure && <div>{error}</div>}
      </TemplateContent>
    </div>
  );
}

export default Search;
