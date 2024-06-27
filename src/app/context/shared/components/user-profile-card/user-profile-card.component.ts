import {Component, Input} from '@angular/core';
import { UserProfile } from '../../../account/models/user-profile';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss'
})
export class UserProfileCardComponent {
  defaultImage: string = 'assets/images/shared/avatar.png';
  
  @Input()
  public user: UserProfile | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  goToProfile() {
    this.router.navigate(['profile'], {
      relativeTo: this.route,
      queryParams: { id: this.user?.id }
    });
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}

