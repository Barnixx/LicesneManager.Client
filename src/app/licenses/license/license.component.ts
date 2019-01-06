import {Component, OnInit} from '@angular/core';
import {License} from '../../shared/models/license';
import {PagedResult} from '../../shared/models/paged-result';
import {MatTableDataSource, PageEvent} from '@angular/material';
import {LicenseService} from '../shared/license.service';
import {PageQuery} from '../../shared/models/page-query';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'IP', 'HWID', 'KEY', 'Created', 'Modify', 'Status'];

  query$: Subject<PageQuery> = new BehaviorSubject(new class implements PageQuery {
    page = 1;
    results = 5;
    sortOrder: string;
    orderBy: string;
  });

  licenses: PagedResult<License> = new PagedResult<License>();
  dataSource: MatTableDataSource<License>;
  pageEvent: PageEvent;

  constructor(private licenseService: LicenseService) {

  }

  ngOnInit() {
    this.subscribeToQuery();
  }

  browse(query: PageQuery) {
    this.licenseService.browse(query).subscribe(page => {
      this.licenses = page;
      console.log(page);
      this.dataSource = new MatTableDataSource<License>(this.licenses.items);
    });
  }

  startEvent(event?: PageEvent) {
    console.log(event);
    const newQuery = new class implements PageQuery {
      page = event.pageIndex + 1;
      results = event.pageSize;
      sortOrder: string;
      orderBy: string;
    };
    console.log(newQuery);
    this.query$.next(newQuery);
  }

  private subscribeToQuery() {
    this.query$.subscribe((query) => {
      this.browse(query);
    });
  }

  test() {
    // this.licenses.items.pop();
    // this.dataSource = new MatTableDataSource<License>(this.licenses.items);
    // this.dataSource.paginator = this.paginator;
  }
}
