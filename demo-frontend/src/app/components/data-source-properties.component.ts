import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { DatasourceProperties } from '@models/datasource-properties';

@Component({
  selector: 'app-data-source-properties',
  templateUrl: './data-source-properties.component.html',
  styleUrls: ['./data-source-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSourcePropertiesComponent implements OnInit {

  @Input()
  datasourceProperties: DatasourceProperties;

  constructor() { }

  ngOnInit(): void {
  }

}
