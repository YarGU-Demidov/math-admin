import Directory from "src/app/enteties/Directory";
import File from "src/app/enteties/File";

export class TreeNode {
  item: Directory | File;
  parentItem: TreeNode;
  get level(): number {
    if (this.parentItem) return this.parentItem.level + 1;
    return 1;
  }
  get isExpandable(): boolean {
    return this.item["directories"] ? true : false;
  }
  constructor(item: Directory | File, parentItem?: TreeNode) {
    this.item = item;
    this.parentItem = parentItem;
  }
}
