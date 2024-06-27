import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../public/services/auth.service';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  constructor(private authService: AuthService) { }
  logout(): void {
    this.authService.logout();
  }
}
