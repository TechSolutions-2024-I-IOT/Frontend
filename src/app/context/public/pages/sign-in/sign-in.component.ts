import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink  } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule,
     MatInputModule, 
     MatSelectModule, 
     ReactiveFormsModule, 
     MatToolbarModule,
     MatCardModule,
     MatButtonModule,
     RouterOutlet,
     RouterLink 
    ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  signInForm: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router:Router
  ) { 
    this.signInForm = this.fb.group({
      userEmail: ['',[Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
    });
  }

  signIn() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe(
        (response) => {
          this.tokenService.setToken(response.access_token);
          this.tokenService.setUserId(response.user_id);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
