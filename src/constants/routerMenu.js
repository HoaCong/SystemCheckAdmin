import { ROUTES } from "./routerWeb";
export const MENU_ADMIN = [
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users-cog"></i>,
  },
  {
    label: "Lịch sử tìm kiếm",
    active: false,
    src: ROUTES.ADMIN_HISTORY,
    icon: <i className="fas fa-history"></i>,
  },
];

export const MENU_MANAGER = [
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users-cog"></i>,
  },
  {
    label: "Lịch sử tìm kiếm",
    active: false,
    src: ROUTES.ADMIN_HISTORY,
    icon: <i className="fas fa-history"></i>,
  },
];

export const MENU_EMPLOYEE = [
  {
    label: "Lịch sử tìm kiếm",
    active: false,
    src: ROUTES.ADMIN_HISTORY,
    icon: <i className="fas fa-history"></i>,
  },
];
