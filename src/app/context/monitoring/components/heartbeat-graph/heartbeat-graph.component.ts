import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heartbeat-graph',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './heartbeat-graph.component.html',
  styleUrl: './heartbeat-graph.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class HeartbeatGraphComponent {

  ShowSection: boolean = true;

}
