import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Stop } from '../../../models/stop.dto';

const ELEMENT_DATA: Stop[] = [
  {id: '1', name: 'Stop 1', distritic: 'Distrito 1', latitude: '1.000', longitude: '1.000'},
  {id: '2', name: 'Stop 2', distritic: 'Distrito 2', latitude: '2.000', longitude: '2.000'},
  {id: '3', name: 'Stop 3', distritic: 'Distrito 3', latitude: '3.000', longitude: '3.000'},
  {id: '4', name: 'Stop 4', distritic: 'Distrito 4', latitude: '4.000', longitude: '4.000'},
  {id: '5', name: 'Stop 5', distritic: 'Distrito 5', latitude: '5.000', longitude: '5.000'},
];

@Component({
  selector: 'app-itinerary-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './itinerary-detail.component.html',
  styleUrl: './itinerary-detail.component.scss'
})
export default class ItineraryDetailComponent implements OnInit {

  ShowSection: boolean = false;

  displayedColumns: string[] = ['Stops'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ItineraryDetailComponent initialized');
  }

  goToCreateItinerary() {
    this.router.navigate(['create-new-itinerary']);

  }

  goToEditItinerary() {
    this.router.navigate(['edit-itinerary']);

  }

}
