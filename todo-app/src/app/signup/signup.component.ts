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

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      // fullName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', Validators.required, Validators.email],
      email: this.email,
      password: ['', Validators.required]
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

  // Проверка пароля (15 символов)



  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    console.log(this.email);
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // Email required ^


}
