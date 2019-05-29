import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { merge, Observable, of, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { DatatableRequest } from '@models/datatable-request';
import { BaseEntity } from '@models/base-entity';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  data$: Observable<BaseEntity[]>;

  @Input()
  isLoadingResults = false;

  @Input()
  resultsLength = 0;

  displayedColumns = [ 'name' ];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @Output()
  getDataEvent = new EventEmitter<DatatableRequest>(true); // must be true or else ExpressionChangedAfterItHasBeenCheckedError

  private subscription = new Subscription();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.subscription.add(merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const datatableRequest: DatatableRequest = {
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            sorts: [`${this.sort.active},${this.sort.direction || this.sort.active}`]
          };
          return of(datatableRequest);
        })
      )
      .subscribe(datatableRequest => this.getDataEvent.emit(datatableRequest)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
