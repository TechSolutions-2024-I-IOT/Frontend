import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss'
})
export class UserProfileCardComponent {
  @Input()
  public user: {
    name: string,
    email: string,
    imageUrl: string } | undefined;
}
