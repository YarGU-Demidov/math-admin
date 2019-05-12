import Entity from "./Entity";
import File from "./File";

export default class Directory extends Entity<string> {
  name: string = "";
  rootDirectoryId: string;
  rootDirectory: Directory;
  files: File[] = [];
  directories: Directory[] = [];
}
