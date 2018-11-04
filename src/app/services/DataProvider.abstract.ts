export abstract class DataProvider<T> {
  abstract addData(data: T);
  abstract editData(newData: T);
  abstract deleteData(id: string);
}
