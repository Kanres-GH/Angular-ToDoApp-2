import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  // Проверка пароля
  // 1 uppercase 
  // 1 lowercase 
  // A number
  // A minimum length of 8
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]);

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      // fullName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', Validators.required, Validators.email],
      email: this.email,
      password: this.password
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe(res=>{
      alert("SignUp successful");
      console.log(this.signupForm.value);
      this.signupForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert('Welp');
    })
  }




  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    // console.log(this.email);
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMessage() {
    if (this.password.hasError('pattern')) {
      return 'Get creative with your password!'
    }
    // return this.password.hasError('password') ? 'Input new password' : '';
    return 'Create new password';
  }
  // Email required ^


}
