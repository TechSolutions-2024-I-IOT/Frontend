import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileCardComponent } from '../../components/user-profile-card/user-profile-card.component';
import { AccountService } from '../../../account/service/account.service';
import { UserProfile } from '../../../account/models/user-profile';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../public/services/auth.service';
import { TransportCompany } from '../../../planification/models/transport-company';
import { TransportCompanyService } from '../../../planification/service/transport-company.service';

interface MenuItem {
  label: string;
  link?: string;
  icon: string;
  active: boolean;
  action?: () => void;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    UserProfileCardComponent,
    MatIconModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export default class MainLayoutComponent implements OnInit {
  currentUser: UserProfile;
  transportCompany: TransportCompany;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', link: '/home', icon: 'dashboard', active: false },
    { label: 'Departure schedule', link: '/departure-schedule', icon: 'calendar_today', active: false },
    { label: 'My fleet', link: '/bus-fleet', icon: 'directions_bus', active: false },
    { label: 'My itinerary', link: '/itinerary', icon: 'event_note', active: false },
    { label: 'Notifications', link: '/notifications', icon: 'notifications', active: false },
    { label: 'Settings', link: '/settings', icon: 'settings', active: false },
    { label: 'Sign off', icon: 'exit_to_app', active: false, action: () => this.logout() },
  ];
  
  constructor(
    private router: Router, 
    private accountService: AccountService,
    private authService: AuthService,
    private transportCompanyService: TransportCompanyService
  ) {
    this.currentUser = {} as UserProfile;
    this.transportCompany = {} as TransportCompany;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuItems.forEach(item => {
          if (item.link) {
            item.active = this.router.isActive(item.link, true);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTransportCompany();
  }

  isLinkActive(link: string | undefined): boolean {
    return link ? this.router.isActive(link, true) : false;
  }

  getCurrentUser() {
    this.accountService.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log('User fetched:', this.currentUser);
      },
      error: (err) => console.error('Error fetching user:', err)
    });
  }

  getTransportCompany() {
    this.transportCompanyService.getTransportCompanyByUserId().subscribe({
      next: (data) => {
        this.transportCompany = data;
        console.log('Transport company fetched:', this.transportCompany);
      },
      error: (err) => console.error('Error fetching transport company:', err)
    });
  }

  logout() {
    this.authService.logout();
  }
}