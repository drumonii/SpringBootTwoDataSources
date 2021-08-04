import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FlywayMigration } from '@models/flyway-response';

@Component({
  selector: 'app-flyway-datatable',
  templateUrl: './flyway-datatable.component.html',
  styleUrls: ['./flyway-datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlywayDatatableComponent implements OnInit {

  @Input()
  migrations: FlywayMigration[];

  constructor() { }

  ngOnInit(): void {
  }

}
