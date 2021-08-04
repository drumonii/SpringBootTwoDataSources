import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatasourceProperties } from '@models/datasource-properties';

import { DataSourcePropertiesComponent } from './data-source-properties.component';

describe('DataSourcePropertiesComponent', () => {
  let component: DataSourcePropertiesComponent;
  let fixture: ComponentFixture<DataSourcePropertiesComponent>;

  const datasourceProperties: DatasourceProperties = {
    jdbcUrl: 'jdbc:h2',
    username: 'jdbc_username',
    flywayPath: 'db/migration/primary',
    showSql: true,
    showStats: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSourcePropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourcePropertiesComponent);
    component = fixture.componentInstance;
  });

  it('should show the datasource properties as loading', () => {
    fixture.detectChanges();

    const configPropsTable = getConfigPropsTable();

    const configPropTableLoadingDatas = configPropsTable.queryAll(By.css('td'));
    expect(configPropTableLoadingDatas.length).withContext('number of table data').toBe(5);
    for (const configPropTableLoadingData of configPropTableLoadingDatas) {
      expect(configPropTableLoadingData.nativeElement.textContent.trim()).toBe('...');
    }
  });

  it('should show the datasource properties', () => {
    component.datasourceProperties = datasourceProperties;
    fixture.detectChanges();

    const configPropsTable = getConfigPropsTable();

    const configPropTableDatas = configPropsTable.queryAll(By.css('td'));
    expect(configPropTableDatas.length).withContext('number of table data').toBe(5);

    let i = 0;
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.jdbcUrl);
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.username);
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.flywayPath);
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.showSql + '');
    expect(configPropTableDatas[i++].nativeElement.textContent.trim()).toBe(datasourceProperties.showStats + '');
  });

  function getConfigPropsTable(): DebugElement {
    const configPropsTable = fixture.debugElement.query(By.css('#config-props-table'));
    expect(configPropsTable).withContext('config props table').toBeTruthy();

    const configPropsTableHeaders = configPropsTable.queryAll(By.css('th'));
    expect(configPropsTableHeaders.length).withContext('number of headers').toBe(5);

    let i = 0;
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('URL');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Username');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Flyway');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Show SQL');
    expect(configPropsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Statistics');

    return configPropsTable;
  }
});
