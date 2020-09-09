import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
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

import { SecondaryModule } from './secondary.module';
import { SecondaryView } from './secondary.view';
import { SecondaryService } from './secondary.service';
import { SecondaryEntity } from './secondary-entity';

describe('SecondaryView', () => {
  let component: SecondaryView;
  let fixture: ComponentFixture<SecondaryView>;

  const paginatedResponse: PaginatedResponse<SecondaryEntity> = {
    content: [
      {
        id: 1,
        name: 'Hello World!'
      }
    ],
    totalElements: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, SecondaryModule]
    })
    .compileComponents();
  });

  beforeEach(inject([SecondaryService], (secondaryService: SecondaryService) => {
    fixture = TestBed.createComponent(SecondaryView);
    component = fixture.componentInstance;

    spyOn(secondaryService, 'getSecondaryDataSourceEnv');
    spyOn(secondaryService, 'getSecondaryFlyway');
    spyOn(secondaryService, 'getSecondary').and.returnValue(of(paginatedResponse));

    fixture.detectChanges();
  }));

  it('should show the page header', () => {
    const secondaryOverview = fixture.debugElement.query(By.directive(PageHeaderComponent));
    const secondaryOverviewHeader = secondaryOverview.injector.get(PageHeaderComponent);
    expect(secondaryOverviewHeader.pageHeader)
      .toBe('Secondary DataSource', 'secondary overview text');
  });

  it('should get the datasource properties', inject([SecondaryService], (secondaryService: SecondaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(fixture.debugElement.query(By.directive(FlywayDatatableComponent))).toBeTruthy('flyway migrations component');
    expect(secondaryService.getSecondaryDataSourceEnv).toHaveBeenCalled();
    expect(secondaryService.getSecondaryFlyway).toHaveBeenCalled();
  }));

  it('should get the paginated secondary', () => {
    expect(fixture.debugElement.query(By.directive(DatatableComponent))).toBeTruthy('datatable component');
  });

  describe('save new secondary', () => {

    const form: NewEntityForm = {
      name: 'Hello World!'
    };

    beforeEach(inject([MatSnackBar], (snackBar: MatSnackBar) => {
      spyOn(snackBar, 'open');
    }));

    afterEach(inject([SecondaryService], (secondaryService: SecondaryService) => {
      expect(secondaryService.saveSecondary).toHaveBeenCalledWith(form);
    }));

    describe('with invalid secondary', () => {

      it('from server validated name', inject([SecondaryService, MatSnackBar], (secondaryService: SecondaryService, snackBar: MatSnackBar) => {
        const validationResponse: ValidationResponse<SecondaryEntity> = {
          "errors": {
            "name": {
              "message": "Name already exists"
            }
          }
        };

        spyOn(secondaryService, 'saveSecondary').and.returnValue(of(validationResponse));

        component.submitNewSecondary(form);

        expect(snackBar.open).not.toHaveBeenCalled();
        expect(component.errors).toEqual(validationResponse.errors);
      }));

    });

    describe('with valid secondary', () => {

      it('from server validated name', inject([SecondaryService, MatSnackBar], (secondaryService: SecondaryService, snackBar: MatSnackBar) => {
        const validationResponse: ValidationResponse<SecondaryEntity> = {
          "data": {
            "id": 32,
            "name": "Hello World!"
          }
        };

        spyOn(secondaryService, 'saveSecondary').and.returnValue(of(validationResponse));

        component.submitNewSecondary(form);

        expect(snackBar.open).toHaveBeenCalled();
        expect(secondaryService.getSecondary).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sorts: ['name,asc']
        });
        expect(component.errors).toBeUndefined();
      }));

    });

  });
});
