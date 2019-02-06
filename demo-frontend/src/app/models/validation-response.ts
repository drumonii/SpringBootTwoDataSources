import { ValidationErrors } from '@angular/forms';

export interface ValidationResponse<T> {
  errors?: ValidationErrors;
  data?: T;
}
