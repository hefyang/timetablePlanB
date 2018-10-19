import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors} from "@angular/forms";
import "rxjs-compat/add/observable/of";
import {RegistrationService} from "../_services/registration.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() {}

  // define an asynchronous validator to check whether the entered student ID existed
  asyncStudentIdValidator(registerService: RegistrationService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return registerService.validateStudentId(control.value).pipe(
        map(res => (res ? {exist: true} : null))
      );
    }
  }

  // define a validator to check the whether the input from two password text box is identical
  passwordEqualValidation({value}: FormGroup): {[key: string]: any} {
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : {equal: true}
  }
}
