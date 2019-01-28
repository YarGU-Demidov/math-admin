import EntityWithNameAndAlias from "./EntityWithNameAndAlias";
import Group from "./Group";

export default class GroupType extends EntityWithNameAndAlias<string> {
  description: string;
  groups: Group[];
}
