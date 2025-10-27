import { ManageStore } from "../pages/Store/ManageStore/ManageStore";
import { Login } from "../pages/login/login";
import { Route } from "../types/route";
import { ManageUser } from "../pages/User/ManageUser";
import { ManageServiceItem } from "../pages/ServiceItem/ManageServiceItem";

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
  {
    key: "manage-user",
    title: "Manage User",
    description: "Manage User",
    component: ManageUser,
    path: "/manage-user",
    isEnabled: true,
    appendDivider: true,
  },
  {
    key: "manage-service-item",
    title: "Manage Service Item",
    description: "anage Service Item",
    component: ManageServiceItem,
    path: "/manage-service-item",
    isEnabled: true,
    appendDivider: true,
  },
];
