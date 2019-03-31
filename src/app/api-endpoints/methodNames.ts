export const server = "http://localhost:5002";
export enum global {
  getCount = "get-count",
  getPaged = "get-all-by-page",
  create = "create",
  update = "update",
  delete = "delete",
  deleteMany = "delete-many",
  getOne = "get-by-id",
  getByAlias = "get-by-alias",
  getAll = "get-all",
  hasRight = "has-right",
  getByPageNested = "get-all-by-page-nested"
}

export enum users {
  users = "users",
  getByLogin = "get-by-login",
  getByLoginAndPassword = "get-by-login-and-password",
  hasRight = "has-right",
  hasCurrentUserRight = "has-current-user-right",
  getCurrentUser = "get-current-user",
  doesCurrentUserGuest = "does-current-user-is-guest"
}

export enum persons {
  persons = "persons",
  getAllWithoutUsers = "get-all-without-users",
  getAllWithoutProfessors = "get-all-without-professors",
  getAllBySurname = "get-all-by-surname",
  getAllBySurnameWithoutUsers = "get-all-by-surname-without-users"
}

export enum groups {
  groups = "groups",
  getGroupsByType = "get-groups-by-type"
}
