import Entity from "./Entity";

export default class EntityWithAlias<TPrimaryKey> extends Entity<TPrimaryKey> {
  alias: string = null;
}
