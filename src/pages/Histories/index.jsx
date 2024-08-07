/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
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

  // const handleSearch = (type) => {
  //   const tmpQuery = !query || type === "reset" ? null : query.trim();
  //   onGetListHistories({ ...params, page: 1, query: tmpQuery });
  //   setCurrentPage(1);
  //   if (type === "reset") setQuery("");
  // };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Lịch sử tìm kiếm"
        // filter={
        //   <div className="d-flex align-items-end gap-2 flex-wrap">
        //     <div style={{ width: "100%", maxWidth: 250 }}>
        //       <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
        //       <Form.Control
        //         id="search"
        //         aria-label="Tìm kiếm"
        //         placeholder="Tìm kiếm"
        //         name="query"
        //         value={query}
        //         onChange={(e) => {
        //           setQuery(e.target.value);
        //         }}
        //       ></Form.Control>
        //     </div>
        //     <Button
        //       onClick={() => handleSearch("filter")}
        //       disabled={isLoading && _size(list) > 0}
        //     >
        //       Tìm kiếm
        //     </Button>
        //     <Button
        //       variant="outline-secondary"
        //       disabled={isLoading && _size(list) > 0}
        //       onClick={() => handleSearch("reset")}
        //     >
        //       Đặt lại
        //     </Button>
        //   </div>
        // }
      >
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" className="align-middle">
                #
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
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={6}>
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
              <tr key={item.updatedAt + index}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">{item.cmnd || "_"}</td>
                <td className="align-middle">{item.sdt || "_"}</td>
                <td className="align-middle">{item.fullname || "_"}</td>
                <td className="align-middle">{item.ngay_sinh || "_"}</td>
                <td className="align-middle">{item.tinh || "_"}</td>
              </tr>
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
