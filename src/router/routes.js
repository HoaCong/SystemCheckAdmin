import AdminLayout from "components/layout/AdminLayout";
import { ROUTES } from "constants/routerWeb";
import ChangePassword from "pages/ChangePassword";
import Employee from "pages/Employee";
import Login from "pages/Login";
import PageNotFound from "pages/NotFoundPage";
// import Register from "pages/Register";

export const EnumHome = {
  ADMIN: ROUTES.ADMIN_HOME_PAGE,
  MANAGER: ROUTES.ADMIN_HOME_PAGE,
  EMPLOYEE: ROUTES.ADMIN_HOME_PAGE,
};

export const adminRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Employee", element: <Employee /> },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee",
        element: <Employee />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const managerRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Employee", element: <Employee /> },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee",
        element: <Employee />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const employeeRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee",
        element: <Employee />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const publicRoutes = [
  {
    path: ROUTES.HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      {
        path: ROUTES.CHANGE_PASSWORD,
        name: "Employee",
        element: <ChangePassword />,
      },
    ],
  },
  { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
  // { path: ROUTES.REGISTER, name: "Register Page", element: <Register /> },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];
