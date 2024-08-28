/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import _map from "lodash/map";
import _size from "lodash/size";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionSearch, resetData } from "store/SearchByProvince/action";
import CODE_PREFECTURE from "../Search/data.json";

export default function SearchProvince(props) {
  const {
    status: { isLoading },
    list,
    params,
    total,
  } = useSelector((state) => state.searchProvinceReducer);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(actionSearch(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);

  const handleLimitChange = (limit) => {
    setLimit(limit);
    onGetList({ ...params, limit, page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetList({ ...params, limit, page });
  };

  const handleSearch = (type) => {
    if (type === "reset") {
      onResetData();
      setCurrentPage(1);
      setQuery("");
      setLimit(10);
    } else {
      if (query) onGetList({ ...params, limit, page: 1, matinh: query });
    }
  };

  return (
    <div>
      <TemplateContent
        title="Tìm kiếm theo tỉnh"
        filter={
          <div className="d-flex align-items-end gap-2 flex-wrap">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
              <Form.Select
                name="code"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
            <Button
              onClick={() => handleSearch("filter")}
              disabled={isLoading && _size(list) > 0}
            >
              Tìm kiếm
            </Button>
            <Button
              variant="outline-secondary"
              disabled={isLoading && _size(list) > 0}
              onClick={() => handleSearch("reset")}
            >
              Đặt lại
            </Button>
          </div>
        }
      >
        <table className="table table-hover table-striped" id="search_province">
          <thead className="position-sticky">
            <tr>
              <th scope="col" className="align-middle">
                #
              </th>
              <th scope="col">Mã kiểm tra</th>
              <th scope="col">Họ và tên</th>
              <th scope="col">Mối quan hệ</th>
              <th scope="col">CMND</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">SĐT</th>
              <th scope="col">Mã tỉnh</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Từ tháng</th>
              <th scope="col">Đến tháng</th>
              <th scope="col">Chức danh</th>
              <th scope="col">Mức lương</th>
              <th scope="col">HSL</th>
              <th scope="col">Tên đơn vị</th>
              <th scope="col">Tên phòng ban</th>
              <th scope="col">Nơi làm việc</th>
              <th scope="col">Tên nhân sự</th>
              <th scope="col">SĐT nhân sự</th>
              <th scope="col">Email</th>
              <th scope="col">Giám đốc công ty</th>
              <th scope="col">Số CMND</th>
              <th scope="col">SĐT giám đốc</th>
              <th scope="col">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={32}>
                  <div
                    className="d-flex justify-content-center align-items-center w-full"
                    style={{ height: 400 }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </td>
              </tr>
            )}
            {list?.map((item, index) => (
              <tr key={item.updatedAt + index}>
                <th scope="row" className="align-middle">
                  {index + params.limit * (params.page - 1) + 1}
                </th>
                <td>{item?.ma_kiem_tra || "_"}</td>
                <td>{item?.ho_va_ten || "_"}</td>
                <td>{item?.moi_quan_he || "_"}</td>
                <td>{item?.cmnd || "_"}</td>
                <td>{item?.ngay_sinh || "_"}</td>
                <td>{item?.sdt || "_"}</td>
                <td>{item?.ma_tinh || "_"}</td>
                <td>{item?.dia_chi_kbxh || "_"}</td>
                <td>{item?.tu_thang || "_"}</td>
                <td>{item?.den_thang || "_"}</td>
                <td>{item?.chuc_danh || "_"}</td>
                <td>{item?.muc_luong || "_"}</td>
                <td>{item?.hsl || "_"}</td>
                <td>{item?.ten_don_vi || "_"}</td>
                <td>{item?.ten_phong_ban || "_"}</td>
                <td>{item?.noi_lam_viec || "_"}</td>
                <td>{item?.ten_nhan_su || "_"}</td>
                <td>{item?.sdt_nhan_su || "_"}</td>
                <td>{item?.email || "_"}</td>
                <td>{item?.giam_doc_cong_ty || "_"}</td>
                <td>{item?.so_cmnd || "_"}</td>
                <td>{item?.sdt_giam_doc || "_"}</td>
                <td>{item?.ghi_chu || "_"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && _size(list) > 0 && (
          <div className="mb-2">
            <LinearProgress />
          </div>
        )}

        {total > 0 && (
          <div className="d-flex justify-content-center gap-3">
            <Form.Select
              size="sm"
              className="w-auto"
              name="code"
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
            >
              {_map([10, 25, 50, 100, 500], (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
            <CustomPagination
              loading={isLoading}
              totalItems={total}
              perPage={params.limit}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        )}
      </TemplateContent>
    </div>
  );
}
