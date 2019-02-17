import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';

import { NewEntityForm } from '@models/new-entity-form';

import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrls: ['./new-entity.component.scss']
})
export class NewEntityComponent implements OnInit {

  private _errors: ValidationErrors;

  @Input()
  set errors(errors: ValidationErrors) {
    this._errors = errors;
    this.newEntityForm.setErrors(errors);
  }

  get errors(): ValidationErrors {
    return this._errors;
  }

  @Output()
  newEntityEvent = new EventEmitter<NewEntityForm>();

  newEntityForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  errorStateMatcher = new NewEntityErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

  submitNewEntity(): void {
    if (this.newEntityForm.valid) {
      this.newEntityEvent.emit({
        name: this.newEntityForm.get('name').value
      })
    }
  }

}

class NewEntityErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const hasGlobalErrors = form.errors != null;
    return !!(control && (control.invalid || hasGlobalErrors) && (control.dirty || control.touched || isSubmitted));
  }
}
