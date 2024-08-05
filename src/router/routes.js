import AdminLayout from "components/layout/AdminLayout";
import { ROUTES } from "constants/routerWeb";
import AdminDashboard from "pages/Admin/Dashboard";
import AdminEmployee from "pages/Admin/Employee";
import Login from "pages/Login";
import PageNotFound from "pages/NotFoundPage";
// import Register from "pages/Register";

export const EnumHome = {
  MANAGER: ROUTES.ADMIN_HOME_PAGE,
  EMPLOYEE: ROUTES.ADMIN_HOME_PAGE,
};

export const managerRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <AdminDashboard /> },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        name: "Dashboard Page",
        element: <AdminDashboard />,
      },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee",
        element: <AdminEmployee />,
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
        element: <AdminEmployee />,
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
  },
  { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
  // { path: ROUTES.REGISTER, name: "Register Page", element: <Register /> },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];
