import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlywayDatatableModule } from '@components/flyway-datatable.module';
import { FlywayDatatableComponent } from '@components/flyway-datatable.component';
import { FlywayMigration } from '@models/flyway-response';

describe('FlywayDatatableComponent', () => {
  let component: FlywayDatatableComponent;
  let fixture: ComponentFixture<FlywayDatatableComponent>;

  const migrations: FlywayMigration[] = [
    {
      script: 'V1__SOME_SCRIPT.sql',
      state: 'SUCCESS',
      executionTime: 3
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlywayDatatableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlywayDatatableComponent);
    component = fixture.componentInstance;
  });

  it('should show the flyway migration properties as loading', () => {
    fixture.detectChanges();

    const flywayMigrationsTable = getFlywayMigrationsTable();

    const flywayMigrationsTableLoadingDatas = flywayMigrationsTable.queryAll(By.css('td'));
    expect(flywayMigrationsTableLoadingDatas.length).toBe(3, 'number of table data');
    for (const flywayMigrationsTableLoadingData of flywayMigrationsTableLoadingDatas) {
      expect(flywayMigrationsTableLoadingData.nativeElement.textContent.trim()).toBe('...');
    }
  });

  it('should show the flyway migration properties', () => {
    component.migrations = migrations;
    fixture.detectChanges();

    const flywayMigrationsTable = getFlywayMigrationsTable();

    const flywayMigrationsTableDatas = flywayMigrationsTable.queryAll(By.css('td'));
    expect(flywayMigrationsTableDatas.length).toBe(3, 'number of table data');

    let i = 0;
    expect(flywayMigrationsTableDatas[i++].nativeElement.textContent.trim()).toBe(migrations[0].script);
    expect(flywayMigrationsTableDatas[i++].nativeElement.textContent.trim()).toBe(migrations[0].state);
    expect(flywayMigrationsTableDatas[i++].nativeElement.textContent.trim()).toBe(`${migrations[0].executionTime} ms`);
  });

  function getFlywayMigrationsTable(): DebugElement {
    const flywayMigrationsTable = fixture.debugElement.query(By.css('#flyway-migrations-table'));
    expect(flywayMigrationsTable).toBeTruthy('flyway migrations table');

    const flywayMigrationsTableHeaders = flywayMigrationsTable.queryAll(By.css('th'));
    expect(flywayMigrationsTableHeaders.length).toBe(3, 'number of headers');

    let i = 0;
    expect(flywayMigrationsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Script');
    expect(flywayMigrationsTableHeaders[i++].nativeElement.textContent.trim()).toBe('State');
    expect(flywayMigrationsTableHeaders[i++].nativeElement.textContent.trim()).toBe('Execution Time');

    return flywayMigrationsTable;
  }
});
