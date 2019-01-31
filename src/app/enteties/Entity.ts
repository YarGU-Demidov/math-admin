export default abstract class Entity<TPrimaryKey> {
  id: TPrimaryKey = null;
  public CreationDate: Date = null;
}
