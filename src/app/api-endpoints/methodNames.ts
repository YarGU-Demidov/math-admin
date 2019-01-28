export const server = "http://localhost:5002";
export enum global {
  getCount = "get-count",
  getPaged = "get-all-by-page",
  create = "create",
  update = "update",
  delete = "delete",
  getOne = "get-by-id",
  getByAlias = "get-by-alias"
}

export enum users {
  users = "users",
  getAll = "get-all",
  getByLogin = "get-by-login",
  getByLoginAndPassword = "get-by-login-and-password",
  hasRight = "has-right",
  hasCurrentUserRight = "has-current-user-right",
  getCurrentUser = "get-current-user",
  doesCurrentUserGuest = "does-current-user-is-guest"
}
