import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';
import { DatatableComponent } from '@components/datatable.component';
import { PageHeaderComponent } from '@components/page-header.component';
import { ValidationResponse } from '@models/validation-response';
import { PaginatedResponse } from '@models/paginated-response';

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
    expect(primaryService.getPrimaryDataSourceEnv).toHaveBeenCalled();
  }));

  it('should get the paginated primary', () => {
    expect(fixture.debugElement.query(By.directive(DatatableComponent))).toBeTruthy('datatable component');
  });

  describe('save new primary', () => {

    describe('with invalid form', () => {

      it('from initial state', () => {
        expect(component.newPrimaryForm.valid).toBe(false);
      });

      it('from empty name', () => {
        const name = component.newPrimaryForm.get('name');
        name.markAsTouched();

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#invalid-name-feedback'))).toBeTruthy('invalid name feedback');
        expect(component.newPrimaryForm.valid).toBe(false);
      });

      it('from server validated name', inject([PrimaryService, MatSnackBar], (primaryService: PrimaryService, snackBar: MatSnackBar) => {
        const validationResponse: ValidationResponse<PrimaryEntity> = {
          "errors": {
            "name": {
              "message": "Name already exists"
            }
          }
        };

        spyOn(primaryService, 'savePrimary').and.returnValue(of(validationResponse));
        spyOn(snackBar, 'open');

        const name = component.newPrimaryForm.get('name');
        name.setValue('Hello World!');
        name.markAsTouched();

        fixture.detectChanges();

        component.submitNewPrimary();

        fixture.detectChanges();

        const validationFeedback = fixture.debugElement.query(By.css('#name-validation-feedback'));
        expect(validationFeedback.nativeElement.textContent.trim()).toBe('Name already exists');
        expect(component.newPrimaryForm.valid).toBe(false);
        expect(primaryService.savePrimary).toHaveBeenCalledWith({ name: 'Hello World!' });
        expect(snackBar.open).not.toHaveBeenCalled();
      }));

    });

    describe('with valid form', () => {

      it('from server validated name', inject([PrimaryService, MatSnackBar], (primaryService: PrimaryService, snackBar: MatSnackBar) => {
        const validationResponse: ValidationResponse<PrimaryEntity> = {
          "data": {
            "id": 32,
            "name": "Hello World!"
          }
        };

        spyOn(primaryService, 'savePrimary').and.returnValue(of(validationResponse));
        spyOn(snackBar, 'open');

        const name = component.newPrimaryForm.get('name');
        name.setValue('Hello World!');
        name.markAsTouched();

        fixture.detectChanges();

        component.submitNewPrimary();

        // fixture.detectChanges(); // calling this oddly causes ExpressionChangedAfterItHasBeenCheckedError

        expect(fixture.debugElement.query(By.css('#name-validation-feedback'))).toBeFalsy('name validation feedback');
        expect(primaryService.savePrimary).toHaveBeenCalledWith({ name: 'Hello World!' });
        expect(snackBar.open).toHaveBeenCalled();
        expect(primaryService.getPrimary).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sorts: ['name,asc']
        });
        expect(name.value).toBeNull();
      }));

    });

  });
});
