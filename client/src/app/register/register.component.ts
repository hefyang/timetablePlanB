import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidationService} from "../_validators/form-validation.service";
import {RegistrationService} from "../_services/registration.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  submitted: boolean;
  clicked: boolean;
  formModel: FormGroup;

  constructor(
    private fb:FormBuilder,
    private validator:FormValidationService,
    private registration:RegistrationService) {

    this.submitted = false;
    this.clicked = false;

    // set up the form model for the registration form
    this.formModel = fb.group({
      'studentId': ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{8}')]),
        validator.asyncStudentIdValidator(this.registration)
      ],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')])
      ],
      'passwordsGroup': fb.group({
        'password': ['', Validators.compose([
          Validators.required,
          Validators.minLength(8)])
        ],
        'confirmPW': ['',
          Validators.required,]
      }, {validator: validator.passwordEqualValidation})
    });
  }

  // define the function for submit button
  onSubmit() {
    this.clicked = true;

    if (this.formModel.valid) {
      this.registration.register({
        id:       this.formModel.get('studentId').value,
        email:    this.formModel.get('email').value,
        password: this.formModel.get('passwordsGroup.password').value
      }).subscribe(() => {
        this.submitted = true;
      });
    }
  }
}
