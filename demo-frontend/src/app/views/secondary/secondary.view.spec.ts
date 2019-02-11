import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';
import { DatatableComponent } from '@components/datatable.component';
import { ValidationResponse } from '@models/validation-response';
import { PaginatedResponse } from '@models/paginated-response';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, SecondaryModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([SecondaryService], (secondaryService: SecondaryService) => {
    fixture = TestBed.createComponent(SecondaryView);
    component = fixture.componentInstance;

    spyOn(secondaryService, 'getSecondaryDataSourceEnv');
    spyOn(secondaryService, 'getSecondary').and.returnValue(of(paginatedResponse));

    fixture.detectChanges();
  }));

  it('should get the datasource properties', inject([SecondaryService], (secondaryService: SecondaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(secondaryService.getSecondaryDataSourceEnv).toHaveBeenCalled();
  }));

  it('should get the paginated secondary', () => {
    expect(fixture.debugElement.query(By.directive(DatatableComponent))).toBeTruthy('datatable component');
  });

  describe('save new secondary', () => {

    describe('with invalid form', () => {

      it('from initial state', () => {
        expect(component.newSecondaryForm.valid).toBe(false);
      });

      it('from empty name', () => {
        const name = component.newSecondaryForm.get('name');
        name.markAsTouched();

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#invalid-name-feedback'))).toBeTruthy('invalid name feedback');
        expect(component.newSecondaryForm.valid).toBe(false);
      });

      it('from server validated name', inject([SecondaryService], (secondaryService: SecondaryService) => {
        const validationResponse: ValidationResponse<SecondaryEntity> = {
          "errors": {
            "name": {
              "message": "Name already exists"
            }
          }
        };

        spyOn(secondaryService, 'saveSecondary').and.returnValue(of(validationResponse));

        const name = component.newSecondaryForm.get('name');
        name.setValue('Hello World!');
        name.markAsTouched();

        fixture.detectChanges();

        component.submitNewSecondary();

        fixture.detectChanges();

        const validationFeedback = fixture.debugElement.query(By.css('#name-validation-feedback'));
        expect(validationFeedback.nativeElement.textContent.trim()).toBe('Name already exists');
        expect(component.newSecondaryForm.valid).toBe(false);
        expect(secondaryService.saveSecondary).toHaveBeenCalledWith({ name: 'Hello World!' });
      }));

    });

    describe('with valid form', () => {

      it('from server validated name', inject([SecondaryService], (secondaryService: SecondaryService) => {
        const validationResponse: ValidationResponse<SecondaryEntity> = {
          "data": {
            "id": 32,
            "name": "Hello World!"
          }
        };

        spyOn(secondaryService, 'saveSecondary').and.returnValue(of(validationResponse));

        const name = component.newSecondaryForm.get('name');
        name.setValue('Hello World!');
        name.markAsTouched();

        fixture.detectChanges();

        component.submitNewSecondary();

        // fixture.detectChanges(); // calling this oddly causes ExpressionChangedAfterItHasBeenCheckedError

        expect(fixture.debugElement.query(By.css('#name-validation-feedback'))).toBeFalsy('name validation feedback');
        expect(secondaryService.saveSecondary).toHaveBeenCalledWith({ name: 'Hello World!' });
        expect(secondaryService.getSecondary).toHaveBeenCalledWith({
          page: 0,
          size: 10,
          sorts: ['name,asc']
        });
        expect(name.value).toBeNull();
      }));

    });

  });
});
