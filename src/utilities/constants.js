import { getItemIconUrls } from "./helper.js";

export const securePathPrefix = "/secure";
export const NavigationRoutes = {
  LANDING: "/",
  CHANGELOG: "/changelog",
  FORGOTTEN_PASSWORD: "/forgotten-password",
  SECURE_DASHBOARD_HOME: `${securePathPrefix}/`,
  SECURE_DASHBOARD_USER_PROFILE: `${securePathPrefix}/profile`,
  SECURE_DASHBOARD_USER: `${securePathPrefix}/user`,
  SECURE_DASHBOARD_ADMIN: `${securePathPrefix}/admin`,
  SECURE_DASHBOARD_ADMIN_USER: `${securePathPrefix}/admin/user`,
  SECURE_DASHBOARD_ADMIN_USERS: `${securePathPrefix}/admin/users`,
  SECURE_DASHBOARD_ADMIN_NAMESPACES: `${securePathPrefix}/admin/namespaces`,
  SECURE_DASHBOARD_ADMIN_NAMESPACE: `${securePathPrefix}/admin/namespace`,
  SECURE_DASHBOARD_CHARTS: `${securePathPrefix}/charts`,
};
export const itemIconsUrls = getItemIconUrls();

export const profilePlaceholderColors = [
  "#009FB7",
  "#FF5733",
  "#007A16",
  "#3357FF",
  "#FF33A1",
  "#FF8C33",
  "#E63946",
  "#F1FAEE",
  "#A8DADC",
  "#457B9D",
  "#1D3557",
  "#F72585",
  "#7209B7",
  "#3A0CA3",
  "#4361EE",
  "#4CC9F0",
  "#5CDB95",
  "#05386B",
  "#379683",
  "#5CDB95",
  "#8EE4AF",
  "#EDF5E1",
  "#006D77",
  "#83C5BE",
  "#E29578",
  "#FFDDD2",
];
