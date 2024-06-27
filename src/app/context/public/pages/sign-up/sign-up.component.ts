import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {AuthService} from "../../services/auth.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../shared/services/token.service';
import { RouterOutlet, RouterLink, Router  } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router:Router
  ) { 
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.signUpForm.value.role = 'ROLE_TRANSPORT_COMPANY';
    this.authService.newuser(this.signUpForm.value).subscribe(
      (response) => {

        this.tokenService.setToken(response.access_token);
        this.tokenService.setUserId(response.user_id);
        this.router.navigate(['/create-transport-company']);

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
