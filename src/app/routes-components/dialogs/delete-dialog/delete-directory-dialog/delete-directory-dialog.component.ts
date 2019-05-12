import { Component, OnInit, Inject } from "@angular/core";
import { DeleteDialogComponent } from "../../deleteDialogComponent";
import Directory from "src/app/enteties/Directory";
import { DirectoryDataProiver } from "src/app/services/directory-service/DirectoryDataProvider";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-delete-directory-dialog",
  templateUrl: "./delete-directory-dialog.component.html",
  styleUrls: ["./delete-directory-dialog.component.css"]
})
export class DeleteDirectoryDialogComponent {
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(
    protected dialogRef: MatDialogRef<DeleteDirectoryDialogComponent>,
    protected directoryDataService: DirectoryDataProiver,
    @Inject(MAT_DIALOG_DATA) protected data: Directory
  ) {}
  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    this.loadingSubject.next(true);
    this.directoryDataService.deleteDirectory(this.data.id).subscribe(() => {
      this.loadingSubject.next(false);
      this.dialogRef.close(1);
    });
  }
}
