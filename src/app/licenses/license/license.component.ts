import {Component, OnInit, ViewChild} from '@angular/core';
import {License} from '../../shared/models/license';
import {PagedResult} from '../../shared/models/paged-result';
import {MatDialog, MatTableDataSource, PageEvent} from '@angular/material';
import {LicenseService} from '../shared/license.service';
import {PageQuery} from '../../shared/models/page-query';
import {BehaviorSubject, Subject} from 'rxjs';
import {AddLicenseComponent} from '../add-license/add-license.component';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  showSpinner = true;
  displayedColumns: string[] = ['ID', 'IP', 'HWID', 'KEY', 'Created', 'Modify', 'Status'];

  query: PageQuery;
  query$: Subject<PageQuery>;
  licenses: PagedResult<License>;
  dataSource: MatTableDataSource<License>;

  @ViewChild(OverlayRef) overlayRef: OverlayRef;

  constructor(private licenseService: LicenseService, public dialog: MatDialog) {
    this.query = new class implements PageQuery {
      page = 1;
      results = 5;
      sortOrder: string;
      orderBy: string;
    };
    this.query$ = new BehaviorSubject(this.query);
    this.licenses = new PagedResult<License>();
  }

  ngOnInit() {
    this.subscribeToQuery();
  }

  browse(query: PageQuery) {
    this.showSpinner = true;
    this.licenseService.browse(query).subscribe(page => {
      this.licenses = page;
      this.dataSource = new MatTableDataSource<License>(this.licenses.items);
      this.showSpinner = false;
    });
  }

  startEvent(event?: PageEvent) {
    this.query = new class implements PageQuery {
      page = event.pageIndex + 1;
      results = event.pageSize;
      sortOrder: string;
      orderBy: string;
    };
    this.query$.next(this.query);
  }

  private subscribeToQuery() {
    this.query$.subscribe((query) => {
      this.browse(query);
    });
  }

  showDialog(edit: boolean, license?: License) {
    const dialogRef = this.dialog.open(AddLicenseComponent, {
      data: {
        license: Object.assign(new License(), license === null ? new License() : license),
        edit: edit,
      },
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x) {
        this.query$.next(this.query);
      }
    });
  }
}
