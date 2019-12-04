import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FlywayMigration } from '@models/flyway-response';

@Component({
  selector: 'app-flyway-datatable',
  templateUrl: './flyway-datatable.component.html',
  styleUrls: ['./flyway-datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlywayDatatableComponent implements OnInit {

  @Input()
  migrations$: Observable<FlywayMigration[]>;

  constructor() { }

  ngOnInit() {
  }

}
