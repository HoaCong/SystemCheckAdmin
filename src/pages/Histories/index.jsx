/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import { format } from "date-fns";
import _size from "lodash/size";
import { Fragment, useEffect, useState } from "react";
import { Collapse, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionHistories, resetData } from "store/Histories/action";

function Histories(props) {
  const {
    status: { isLoading },
    list,
    params,
    meta,
  } = useSelector((state) => state.historiesReducer);

  const dispatch = useDispatch();
  const onGetListHistories = (body) => dispatch(actionHistories(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);

  // const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isLoading) onGetListHistories(params);
    return () => {
      onResetData();
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListHistories({ ...params, page });
  };

  const [expandedRows, setExpandedRows] = useState(null);

  const handleExpandCollapse = (index) => {
    setExpandedRows((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };

  const getData = (item) => {
    return JSON.parse(item.data);
  };

  return (
    <div>
      <TemplateContent
        title="Lịch sử tìm kiếm"
        cardProps={{
          className: "col-12 card result-table overflow-auto",
        }}
      >
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="align-middle"></th>
              <th scope="col" className="align-middle">
                #
              </th>
              <th scope="col" className="align-middle">
                Thời gian
              </th>
              <th scope="col" className="align-middle">
                Chứng minh thư/CCCD
              </th>
              <th scope="col" className="align-middle">
                Số điện thoại
              </th>
              <th scope="col" className="align-middle">
                Họ tên
              </th>
              <th scope="col" className="align-middle">
                Ngày sinh
              </th>
              <th scope="col" className="align-middle">
                Mã tỉnh
              </th>
            </tr>
          </thead>
          <tbody className="overflow-auto tbody-scroll">
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={8}>
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
            {list.map((item, index) => (
              <Fragment key={item.updatedAt + index}>
                <tr onClick={() => handleExpandCollapse(index)}>
                  <th scope="row" className="align-middle">
                    <div style={{ width: 16 }}>
                      {expandedRows === index ? (
                        <i className="fas fa-chevron-down text-secondary"></i>
                      ) : (
                        <i className="fas fa-chevron-right text-secondary"></i>
                      )}
                    </div>
                  </th>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">
                    {item.updatedAt
                      ? format(item.updatedAt, "dd-MM-yyyy")
                      : "_"}
                  </td>
                  <td className="align-middle">{item.cmnd || "_"}</td>
                  <td className="align-middle">{item.sdt || "_"}</td>
                  <td className="align-middle">{item.fullname || "_"}</td>
                  <td className="align-middle">{item.ngay_sinh || "_"}</td>
                  <td className="align-middle">{item.tinh || "_"}</td>
                </tr>
                <tr>
                  <td colSpan="9" className="p-0">
                    <Collapse in={expandedRows === index}>
                      <div>
                        <div className="card p-2">
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
                                  <td className="align-middle">
                                    {getData(item)?.infor?.cmnd || "_"}
                                  </td>
                                  <td className="align-middle">
                                    {getData(item)?.infor?.ho_va_ten || "_"}
                                  </td>
                                  <td className="align-middle">
                                    {getData(item)?.infor?.ngay_sinh || "_"}
                                  </td>
                                  <td className="align-middle">
                                    {getData(item)?.infor?.sdt || "_"}
                                  </td>
                                  <td className="align-middle">
                                    {getData(item)?.infor?.email || "_"}
                                  </td>

                                  <td className="align-middle">
                                    {getData(item)?.infor?.dia_chi_kbxh || "_"}
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
                                {getData(item).relative.map((ele, index) => (
                                  <tr key={ele.id}>
                                    <th scope="row" className="align-middle">
                                      {index + 1}
                                    </th>
                                    <td className="align-middle">
                                      {ele.cmnd || "_"}
                                    </td>
                                    <td className="align-middle">
                                      {ele.ho_va_ten || "_"}
                                    </td>
                                    <td className="align-middle">
                                      {ele.ngay_sinh || "_"}
                                    </td>
                                    <td className="align-middle">
                                      {ele.moi_quan_he || "_"}
                                    </td>
                                    <td className="align-middle">
                                      {ele.sdt || "_"}
                                    </td>
                                    <td className="align-middle">
                                      {ele.email || "_"}
                                    </td>

                                    <td className="align-middle">
                                      {ele.dia_chi_kbxh || "_"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </section>
                        </div>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        {isLoading && _size(list) > 0 && (
          <div className="mb-2">
            <LinearProgress />
          </div>
        )}
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
    </div>
  );
}

export default Histories;
