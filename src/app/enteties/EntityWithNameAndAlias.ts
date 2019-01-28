import EntityWithAlias from "./EntityWithAlias";

export default class EntityWithNameAndAlias<
  TPrimarykey
> extends EntityWithAlias<TPrimarykey> {
  name: string = null;
}
