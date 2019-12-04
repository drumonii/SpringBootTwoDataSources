import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';
import { DatatableComponent } from '@components/datatable.component';
import { FlywayDatatableComponent } from '@components/flyway-datatable.component';
import { PageHeaderComponent } from '@components/page-header.component';
import { ValidationResponse } from '@models/validation-response';
import { PaginatedResponse } from '@models/paginated-response';
import { NewEntityForm } from '@models/new-entity-form';

import { PrimaryModule } from './primary.module';
import { PrimaryView } from './primary.view';
import { PrimaryService } from './primary.service';
import { PrimaryEntity } from './primary-entity';

describe('PrimaryView', () => {
  let component: PrimaryView;
  let fixture: ComponentFixture<PrimaryView>;

  const paginatedResponse: PaginatedResponse<PrimaryEntity> = {
    content: [
      {
        id: 1,
        name: 'Hello World!'
      }
    ],
    totalElements: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, PrimaryModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([PrimaryService], (primaryService: PrimaryService) => {
    fixture = TestBed.createComponent(PrimaryView);
    component = fixture.componentInstance;

    spyOn(primaryService, 'getPrimaryDataSourceEnv');
    spyOn(primaryService, 'getPrimaryFlyway');
    spyOn(primaryService, 'getPrimary').and.returnValue(of(paginatedResponse));

    fixture.detectChanges();
  }));

  it('should show the page header', () => {
    const primaryOverview = fixture.debugElement.query(By.directive(PageHeaderComponent));
    const primaryOverviewHeader = primaryOverview.injector.get(PageHeaderComponent);
    expect(primaryOverviewHeader.pageHeader)
      .toBe('Primary DataSource', 'primary overview text');
  });

  it('should get the datasource properties', inject([PrimaryService], (primaryService: PrimaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(fixture.debugElement.query(By.directive(FlywayDatatableComponent))).toBeTruthy('flyway migrations component');
    expect(primaryService.getPrimaryDataSourceEnv).toHaveBeenCalled();
    expect(primaryService.getPrimaryFlyway).toHaveBeenCalled();
  }));

  it('should get the paginated primary', () => {
    expect(fixture.debugElement.query(By.directive(DatatableComponent))).toBeTruthy('datatable component');
  });

  describe('save new secondary', () => {

    const form: NewEntityForm = {
      name: 'Hello World!'
    };

    beforeEach(inject([MatSnackBar], (snackBar: MatSnackBar) => {
      spyOn(snackBar, 'open');
    }));

    afterEach(inject([PrimaryService], (primaryService: PrimaryService) => {
      expect(primaryService.savePrimary).toHaveBeenCalledWith(form);
    }));

    describe('with invalid secondary', () => {

      it('from server validated name', inject([PrimaryService, MatSnackBar], (primaryService: PrimaryService, snackBar: MatSnackBar) => {
        const validationResponse: ValidationResponse<PrimaryEntity> = {
          "errors": {
            "name": {
              "message": "Name already exists"
            }
          }
        };

        spyOn(primaryService, 'savePrimary').and.returnValue(of(validationResponse));

        component.submitNewPrimary(form);

        expect(snackBar.open).not.toHaveBeenCalled();
        expect(component.errors).toEqual(validationResponse.errors);
      }));

    });

    describe('with valid secondary', () => {

      it('from server validated name', inject([PrimaryService, MatSnackBar], (primaryService: PrimaryService, snackBar: MatSnackBar) => {
        const validationResponse: ValidationResponse<PrimaryEntity> = {
          "data": {
            "id": 32,
            "name": "Hello World!"
          }
        };

        spyOn(primaryService, 'savePrimary').and.returnValue(of(validationResponse));

        component.submitNewPrimary(form);

        expect(snackBar.open).toHaveBeenCalled();
        expect(primaryService.getPrimary).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sorts: ['name,asc']
        });
        expect(component.errors).toBeUndefined();
      }));

    });

  });
});
