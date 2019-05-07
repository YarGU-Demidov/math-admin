import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  Component,
  Injectable,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TreeDataSource } from "src/app/dataSources/TreeDataSource";
import { DirectoryDataProiver } from "src/app/services/directory-service/DirectoryDataProvider";
import { FileDataProvider } from "src/app/services/directory-service/FileDataProvider";
import { TreeNode } from "./treeNode";
import { MatDialog } from "@angular/material";
import { DeleteDirectoryDialogComponent } from "../dialogs/delete-dialog/delete-directory-dialog/delete-directory-dialog.component";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.css"]
})
export class TreeComponent {
  @Output()
  public onUploadFinished = new EventEmitter();
  constructor(
    private directoriesProvider: DirectoryDataProiver,
    private filesProvider: FileDataProvider,
    private dialog: MatDialog
  ) {
    this.treeControl = new FlatTreeControl<TreeNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new TreeDataSource(
      this.treeControl,
      directoriesProvider,
      filesProvider
    );
    this.dataSource.getInitialData();
  }

  treeControl: FlatTreeControl<TreeNode>;

  dataSource: TreeDataSource;

  isExpandable = (node: TreeNode) => node.isExpandable;
  getLevel = (node: TreeNode) => node.level;
  isFolder = (_: number, _nodeData: TreeNode) => _nodeData.isExpandable;
  isFile = (_: number, _nodeData: TreeNode) => !_nodeData.isExpandable;
  hasNoContent = (_: number, _nodeData: TreeNode) => _nodeData.item.name === "";

  addNewDirectory(node: TreeNode) {
    this.dataSource.insertNewNode(node);
  }

  deleteDirectory(node: TreeNode) {
    const dialogRef = this.dialog.open(DeleteDirectoryDialogComponent, {
      data: node.item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        if (!node.parentItem) {
          this.dataSource.getInitialData();
        } else {
          this.treeControl.collapse(node.parentItem);
          this.treeControl.expand(node.parentItem);
        }
      }
    });
  }
  deleteFile(node: TreeNode) {
    this.filesProvider.delete(node.item.id).subscribe(x => {
      if (!node.parentItem) {
        this.dataSource.getInitialData();
      } else {
        this.treeControl.collapse(node.parentItem);
        this.treeControl.expand(node.parentItem);
      }
    });
  }
  /** Save the node to database */
  saveNode(node: TreeNode, directoryName: string) {
    this.directoriesProvider
      .addNewDirectory(node && node.parentItem.item.id, directoryName)
      .subscribe(res => {
        if (!node) {
          this.dataSource.getInitialData();
        } else {
          this.treeControl.collapse(node.parentItem);
          this.treeControl.expand(node.parentItem);
        }
      });
  }
  fileChange(event, node) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("uploadFile", file, file.name);
      this.filesProvider.uploadFile(formData, node.item.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.dataSource.loadingSubject.next(true);
        else if (event.type === HttpEventType.Response) {
          this.dataSource.loadingSubject.next(false);
          this.treeControl.collapse(node);
          this.treeControl.expand(node);
        }
      });
    }
  }
}
