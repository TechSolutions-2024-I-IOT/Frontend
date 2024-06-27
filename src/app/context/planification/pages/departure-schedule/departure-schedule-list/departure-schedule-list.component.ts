import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';


import { Bus } from '../../../models/bus';
import { Schedule } from '../../../models/schedule';  
import { ScheduleService } from '../../../service/schedule.service';
import { RouterLink, RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-departure-schedule-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './departure-schedule-list.component.html',
  styleUrls: ['./departure-schedule-list.component.scss'],
})
export class DepartureScheduleListComponent implements OnInit {


  buses: Bus[] = [];
  dataSource: Schedule[] = [];
  displayedColumns: string[] = ['description', 'date', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit() {
    this.loadSchedules();

  }

  loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe((schedules) => {
      this.dataSource = schedules;
    });
  }

  goToCreateNewDepartureSchedule(): void{
    this.router.navigate(['create-new-schedule'])
  }

  goToDetails(element: any) {
    throw new Error('Method not implemented.');
  }

  deleteBus(element: any) {
    throw new Error('Method not implemented.');
  }
    
}
