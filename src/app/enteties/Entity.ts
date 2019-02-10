export default abstract class Entity<TPrimaryKey> {
  id: TPrimaryKey = null;
  public creationDate: Date = null;
}
