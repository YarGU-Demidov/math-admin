import EntityWithNameAndAlias from "./EntityWithNameAndAlias";
import GroupType from "./GroupType";

export default class Group extends EntityWithNameAndAlias<string> {
  description: string;
  parentGroup: Group;
  groupType: GroupType;
  groupTypeId: string;
  parentGroupId: string;
}
