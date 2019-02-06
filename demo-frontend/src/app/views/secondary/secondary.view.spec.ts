import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';
import { ValidationResponse } from '@models/validation-response';

import { SecondaryModule } from './secondary.module';
import { SecondaryView } from './secondary.view';
import { SecondaryService } from './secondary.service';
import { SecondaryEntity } from './secondary-entity';

describe('SecondaryView', () => {
  let component: SecondaryView;
  let fixture: ComponentFixture<SecondaryView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SecondaryModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([SecondaryService], (secondaryService: SecondaryService) => {
    fixture = TestBed.createComponent(SecondaryView);
    component = fixture.componentInstance;

    spyOn(secondaryService, 'getSecondaryDataSourceEnv');

    fixture.detectChanges();
  }));

  it('should get the datasource properties', inject([SecondaryService], (secondaryService: SecondaryService) => {
    expect(fixture.debugElement.query(By.directive(DataSourcePropertiesComponent))).toBeTruthy('datasource props component');
    expect(secondaryService.getSecondaryDataSourceEnv).toHaveBeenCalled();
  }));

  describe('save new secondary', () => {

    describe('with invalid form', () => {

      it('from initial state', () => {
        expect(component.newSecondaryForm.valid).toBe(false);
      });

      it('from empty name', () => {
        const name = component.newSecondaryForm.get('name');
        name.markAsTouched();

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#invalid-name-feedback'))).toBeTruthy();
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
        expect(secondaryService.saveSecondary).toHaveBeenCalledWith({ name: name.value })
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

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#name-validation-feedback'))).toBeFalsy();
        expect(secondaryService.saveSecondary).toHaveBeenCalledWith({ name: name.value })
      }));

    });

  });
});
