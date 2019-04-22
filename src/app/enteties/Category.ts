import EntityWithNameAndAlias from "./EntityWithNameAndAlias";

export default class Category extends EntityWithNameAndAlias<string> {
  description: string;
}
