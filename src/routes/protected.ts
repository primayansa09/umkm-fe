import { ManageStore } from "../pages/Store/ManageStore/ManageStore";
import { Login } from "../pages/login/login";
import { Route } from "../types/route";

export const protectedRoutes: Route[] = [
  {
    key: "manage-store",
    title: "Store",
    description: "Store",
    component: ManageStore,
    path: "/manage-store",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "login",
    title: "Login",
    description: "Login",
    component: Login,
    path: "/login",
    isEnabled: true,
    appendDivider: true,
  },
];
