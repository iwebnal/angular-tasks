import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { User } from '../../shared/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted:boolean = false;
  message: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = "Enter data";
      }else if(params['authFailed']) {
        this.message = "Session has expired";
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if(this.form.invalid) return;

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    } 

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
