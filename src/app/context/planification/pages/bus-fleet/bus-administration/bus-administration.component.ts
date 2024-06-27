import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {Router, RouterOutlet} from "@angular/router";
import {MatButtonModule } from "@angular/material/button";
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { Bus } from '../../../models/bus';

import { ModalBusComponent } from '../../../components/modal-bus/modal-bus.component';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';

import { BusService } from '../../../service/bus.service';

@Component({
  selector: 'app-bus-administration',
  standalone: true,
  imports: [
    MatTableModule,
    RouterOutlet,
    MatButtonModule,
    BackButtonComponent,
    MatDividerModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './bus-administration.component.html',
  styleUrl: './bus-administration.component.scss'
})

export class BusAdministrationComponent implements OnInit{
  
  displayedColumns: string[] = ['licensePlate', 'year','totalCapacity', 'actions'];
  dataSource = [] as Bus[];
  isEdit = false;

  constructor(
    public dialog: MatDialog,
    private busService: BusService,
  ) {

  }
  ngOnInit(): void {
    this.loadBuses();
  }

  openDialog(element?: Bus): void {
    this.isEdit = !!element;
    const dialogRef = this.dialog.open(ModalBusComponent, {
      data: {
        isEdit: this.isEdit,
        bus: element || {}
      }
    });

    dialogRef.componentInstance.busUpdated.subscribe(() => {
      this.loadBuses();
    });
  }

  loadBuses() {
    this.busService.getAllBuses().subscribe((buses) => {
      this.dataSource = buses;
    });
  }

  deleteBus(element: Bus) {
    const busId={
      busId: element.id
    }
    this.busService.deleteBus(busId).subscribe(() => {
      this.loadBuses();
    });
  }
}