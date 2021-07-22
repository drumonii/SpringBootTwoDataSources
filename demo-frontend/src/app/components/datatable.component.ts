import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { DatatableRequest } from '@models/datatable-request';
import { PaginatedResponse } from '@models/paginated-response';
import { BaseEntity } from '@models/base-entity';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnInit, AfterViewInit {

  @Input()
  data: PaginatedResponse<BaseEntity>;

  displayedColumns = [ 'name' ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @Output()
  getDataEvent = new EventEmitter<DatatableRequest>(true); // must be true or else ExpressionChangedAfterItHasBeenCheckedError

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.emitChange(this.sort, this.paginator);
  }

  sortChange(sort: Sort): void {
    this.emitChange(sort, this.paginator);
  }

  pageChange(page: PageEvent) {
    this.emitChange(this.sort, page);
  }

  private emitChange(sort: Sort | MatSort, page: PageEvent | MatPaginator): void {
    const datatableRequest: DatatableRequest = {
      page: page.pageIndex,
      size: page.pageSize,
      sorts: [`${sort.active},${sort.direction || sort.active}`]
    };
    this.getDataEvent.emit(datatableRequest);
  }

}
