import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AccountService } from '../../service/account.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  profileForm: FormGroup;
  isSubmitted=false;
  userId: number;
  currentUser: UserProfile;
  defaultImage: string = 'assets/images/shared/avatar.png';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.currentUser = new UserProfile();
    this.userId = 0;
    this.profileForm = this.fb.group({
      photoUrl: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      role: ['']
    });
  }
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!
    this.getCurrentUser();
  }

  shouldShowError(controlName: string): boolean {
    const control = this.profileForm.get(controlName);
    return <boolean>control?.invalid && (control?.touched || this.isSubmitted);
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

  getCurrentUser() {
    this.accountService.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
        this.profileForm.patchValue(this.currentUser);
      },
      error: (err) => console.error('Error fetching current user:', err)
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      this.accountService.updateCurrentUser(this.profileForm.value).subscribe({
        next: () => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (err) => console.error('Error updating profile:', err)
      });
    }
  }
}
