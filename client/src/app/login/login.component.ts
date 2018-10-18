import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  confirmed: {[key:string]: string};
  message: string;
  clicked: boolean;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router) {

    this.clicked = false;

    this.form = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    this.clicked = true;

    if (val.studentId && val.password) {
      this.authService.login(val.studentId, val.password)
        .subscribe(
          (res) => {
            if (res.idToken) {
              this.router.navigate([''])
                .then(() => {
                  console.log("User is logged in");
                });
            } else {
              if (res.unauthorized) this.message = "The user name or password you entered is incorrect.";
              if (res.unconfirmed) this.message = "Please confirm your email";
              // console.log("Please confirm your email");
            }
          }
        )
    }
  }

  ngOnInit() {
  }

}
