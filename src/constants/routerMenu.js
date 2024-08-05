import { ROUTES } from "./routerWeb";
export const MENU_MANAGER = [
  {
    label: "Trang chủ",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users-cog"></i>,
  },
];

export const MENU_EMPLOYEE = [
  {
    label: "Nhân viên",
    active: false,
    src: ROUTES.ADMIN_EMPLOYEE,
    icon: <i className="fas fa-users-cog"></i>,
  },
];
