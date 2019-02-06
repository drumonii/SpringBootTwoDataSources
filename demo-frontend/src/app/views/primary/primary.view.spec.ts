import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';
import { ValidationResponse } from '@models/validation-response';

import { PrimaryModule } from './primary.module';
import { PrimaryView } from './primary.view';
import { PrimaryService } from './primary.service';
import { PrimaryEntity } from './primary-entity';

describe('PrimaryView', () => {
  let component: PrimaryView;
  let fixture: ComponentFixture<PrimaryView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrimaryModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([PrimaryService], (primaryService: PrimaryService) => {
    fixture = TestBed.createComponent(PrimaryView);
    component = fixture.componentInstance;

    spyOn(primaryService, 'getPrimaryDataSourceEnv');

    fixture.detectChanges();
  }));

  it('should get the datasource properties', inject([PrimaryService], (primaryService: PrimaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(primaryService.getPrimaryDataSourceEnv).toHaveBeenCalled();
  }));

  describe('save new primary', () => {

    describe('with invalid form', () => {

      it('from initial state', () => {
        expect(component.newPrimaryForm.valid).toBe(false);
      });

      it('from empty name', () => {
        const name = component.newPrimaryForm.get('name');
        name.markAsTouched();

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#invalid-name-feedback'))).toBeTruthy();
        expect(component.newPrimaryForm.valid).toBe(false);
      });

      it('from server validated name', inject([PrimaryService], (primaryService: PrimaryService) => {
        const validationResponse: ValidationResponse<PrimaryEntity> = {
          "errors": {
            "name": {
              "message": "Name already exists"
            }
          }
        };

        spyOn(primaryService, 'savePrimary').and.returnValue(of(validationResponse));

        const name = component.newPrimaryForm.get('name');
        name.setValue('Hello World!');
        name.markAsTouched();

        fixture.detectChanges();

        component.submitNewPrimary();

        fixture.detectChanges();

        const validationFeedback = fixture.debugElement.query(By.css('#name-validation-feedback'));
        expect(validationFeedback.nativeElement.textContent.trim()).toBe('Name already exists');
        expect(component.newPrimaryForm.valid).toBe(false);
        expect(primaryService.savePrimary).toHaveBeenCalledWith({ name: name.value })
      }));

    });

    describe('with valid form', () => {

      it('from server validated name', inject([PrimaryService], (primaryService: PrimaryService) => {
        const validationResponse: ValidationResponse<PrimaryEntity> = {
          "data": {
            "id": 32,
            "name": "Hello World!"
          }
        };

        spyOn(primaryService, 'savePrimary').and.returnValue(of(validationResponse));

        const name = component.newPrimaryForm.get('name');
        name.setValue('Hello World!');
        name.markAsTouched();

        fixture.detectChanges();

        component.submitNewPrimary();

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#name-validation-feedback'))).toBeFalsy();
        expect(primaryService.savePrimary).toHaveBeenCalledWith({ name: name.value })
      }));

    });

  });
});
