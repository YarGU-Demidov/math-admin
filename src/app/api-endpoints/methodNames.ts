export const server = "http://localhost:80";
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
  getByPageNested = "get-all-by-page-nested",
  getById = "get-by-id"
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
export enum categories {
  categories = "categories"
}
export enum settings {
  settings = "site-settings",
  setSettings = "set-site-settings",
  getSettings = "get-site-settings"
}

export enum persons {
  persons = "persons",
  getAllWithoutUsers = "get-all-without-users",
  getAllWithoutProfessors = "get-all-without-professors",
  getAllBySurname = "get-all-by-surname",
  getAllBySurnameWithoutUsers = "get-all-by-surname-without-users",
  getAllBySurnameWithoutProfessors = "get-all-by-surname-without-professors"
}

export enum groups {
  groups = "groups",
  getGroupsByType = "get-groups-by-type"
}

export enum professors {
  professors = "professors",
  getAllBySurname = "get-all-by-surname",
  getByIdWithPerson = "get-by-id-with-person"
}
export enum directories {
  directories = "directories",
  getRootDirectories = "get-root-directories",
  getChildDirectories = "get-child-directories-by-parent-id"
}
export enum files {
  files = "files",
  getByDirectoryId = "get-by-directory-id",
  getRootFiles = "get-root-files",
  uploadFile = "upload-file"
}
export enum auth {
  auth = "auth",
  login = "get-token"
}
