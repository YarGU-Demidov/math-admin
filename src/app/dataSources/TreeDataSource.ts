import { SelectionChange, CollectionViewer } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, merge, of } from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import { map, catchError, finalize } from "rxjs/operators";
import { FileDataProvider } from "../services/directory-service/FileDataProvider";
import { TreeNode } from "../routes-components/tree/treeNode";
import { DirectoryDataProiver } from "../services/directory-service/DirectoryDataProvider";
import Directory from "../enteties/Directory";
import File from "../enteties/File";

@Injectable()
export class TreeDataSource {
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  dataChange = new BehaviorSubject<TreeNode[]>([]);
  dataSubject: any;

  get data(): TreeNode[] {
    return this.dataChange.value;
  }
  set data(value: TreeNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<TreeNode>,
    private directoryProvider: DirectoryDataProiver,
    private filesProvider: FileDataProvider
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<TreeNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if (
        (change as SelectionChange<TreeNode>).added ||
        (change as SelectionChange<TreeNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<TreeNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }
  insertNewNode(node: TreeNode) {
    const index = this.data.indexOf(node);
    this.data.splice(index + 1, 0, new TreeNode(new Directory(), node));
    this.dataChange.next(this.data);
  }
  getInitialData() {
    this.loadingSubject.next(true);
    this.directoryProvider
      .getRootDirectories()
      .pipe<Directory[], Directory[]>(
        catchError<Directory[], Directory[]>(() => of<Directory[]>()),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(res =>
        this.dataChange.next(
          res.map(directory => {
            return new TreeNode(directory);
          })
        )
      );
  }

  handleTreeControl(change: SelectionChange<TreeNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  toggleNode(node: TreeNode, expand: boolean) {
    const index = this.data.indexOf(node);
    if (expand) {
      this.filesProvider.getByDirectoryId(node.item.id).subscribe(res => {
        const nodes = res.map(file => new TreeNode(file, node));
        this.data.splice(index + 1, 0, ...nodes);
        this.directoryProvider
          .getChildDirectories(node.item.id)
          .pipe<Directory[], Directory[]>(
            catchError<Directory[], Directory[]>(() => of<Directory[]>()),
            finalize(() => this.loadingSubject.next(false))
          )
          .subscribe(res => {
            const nodes = res.map(directory => new TreeNode(directory, node));
            this.data.splice(index + 1, 0, ...nodes);
            this.dataChange.next(this.data);
          });
      });
      return;
    }
    let count = 0;
    for (
      let i = index + 1;
      i < this.data.length && this.data[i].level > node.level;
      i++, count++
    ) {}
    this.data.splice(index + 1, count);
    this.dataChange.next(this.data);
  }
}
