export const securePathPrefix = '/secure';
export const NavigationRoutes = {
  LANDING: '/',
  CHANGELOG: '/changelog',
  FORGOTTEN_PASSWORD: '/forgotten-password',
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
