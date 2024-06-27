import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {UserProfileCardComponent} from "../../../../shared/components/user-profile-card/user-profile-card.component";
import {AccountService} from "../../../../account/service/account.service";
import {Router, RouterOutlet} from "@angular/router";
import {DriversService} from "../../../service/drivers.service";
import {Driver} from "../../../models/driver";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf, Location} from "@angular/common";
import {DriverCardComponent} from "../../../components/driver-card/driver-card.component";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatDividerModule} from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-driver-administration',
  standalone: true,
  imports: [
    MatTableModule,
    RouterOutlet,
    MatButton,
    HttpClientModule,
    UserProfileCardComponent,
    NgForOf,
    DriverCardComponent,
    MatPaginatorModule,
    NgIf,
    MatDividerModule,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './driver-administration.component.html',
  styleUrl: './driver-administration.component.scss'
})
export class DriverAdministrationComponent implements OnInit{

  defaultImage=''

  drivers: Driver[] = [];
  paginatedDrivers:Driver[]=[];
  pageSize=6;

  constructor(
    private router:Router,
    private accountService:AccountService, 
    private driversService:DriversService,
    private location: Location
  ) {
  }

  ngOnInit(){
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driversService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        console.log(this.drivers);
        if (data.length > 0) {
          this.updatePaginatedDrivers(0);
        }
      },
      error: (err) => console.error('Error fetching drivers:', err)
    });
  }

  handlePageEvent(event: PageEvent):void{
    this.updatePaginatedDrivers(event.pageIndex*event.pageSize);
  }

  updatePaginatedDrivers(startIndex: number): void {
    this.paginatedDrivers = this.drivers.slice(startIndex, startIndex + this.pageSize);
  }

  navigateToAddNewDriver(): void {
    this.router.navigate(['/bus-fleet/drivers/add-new-driver']);
  }

  goBack(): void {
    this.location.back();
  }

}
