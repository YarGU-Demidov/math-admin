import Entity from "./Entity";
import Directory from "./Directory";

export default class File extends Entity<string> {
  name: string;
  path: string;
  extension: string;
  hash: string;
  directoryId: string;
  directory: Directory;
}
