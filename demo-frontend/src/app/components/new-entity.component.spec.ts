import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationErrors } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NewEntityModule } from '@components/new-entity.module';
import { NewEntityComponent } from '@components/new-entity.component';

describe('NewEntityComponent', () => {
  let component: NewEntityComponent;
  let fixture: ComponentFixture<NewEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NewEntityModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntityComponent);
    component = fixture.componentInstance;

    spyOn(component.newEntityEvent, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with invalid form', () => {

    it('from initial state', () => {
      expect(component.newEntityForm.valid).toBe(false);
    });

    it('from empty name', () => {
      const name = component.newEntityForm.get('name');
      name.markAsTouched();

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#invalid-name-feedback'))).toBeTruthy('invalid name feedback');
      expect(component.newEntityForm.valid).toBe(false);
    });

    it('from server validated name', () => {
      const name = component.newEntityForm.get('name');
      name.setValue('Hello World!');
      name.markAsTouched();

      fixture.detectChanges();

      component.submitNewEntity();

      const validationResponse: ValidationErrors = {
        "name": {
          "message": "Name already exists"
        }
      };

      component.errors = validationResponse;

      fixture.detectChanges();

      const validationFeedback = fixture.debugElement.query(By.css('#name-validation-feedback'));
      expect(validationFeedback.nativeElement.textContent.trim()).toBe('Name already exists');
      expect(component.newEntityForm.valid).toBe(false);
      expect(component.newEntityEvent.emit).toHaveBeenCalledWith({ name: 'Hello World!' })
    });

  });

  describe('with valid form', () => {

  });
});
