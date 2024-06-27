import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import { MatIcon } from '@angular/material/icon'; 
import {MatCardModule} from '@angular/material/card';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Location } from '@angular/common';

import { Stop } from '../../../models/stop.dto';
import {SubscriptionPlanComponent} from "../../../../subscription/components/subscription-plan/subscription-plan.component";
import { PaymentDetailComponent } from '../../../../subscription/components/payment-detail/payment-detail.component';

const ELEMENT_DATA: Stop[] = [
  {id: '1', name: 'Stop 1', distritic: 'Distrito 1', latitude: '1.000', longitude: '1.000'},
  {id: '2', name: 'Stop 2', distritic: 'Distrito 2', latitude: '2.000', longitude: '2.000'},
  {id: '3', name: 'Stop 3', distritic: 'Distrito 3', latitude: '3.000', longitude: '3.000'},
  {id: '4', name: 'Stop 4', distritic: 'Distrito 4', latitude: '4.000', longitude: '4.000'},
  {id: '5', name: 'Stop 5', distritic: 'Distrito 5', latitude: '5.000', longitude: '5.000'},
];

@Component({
  selector: 'app-create-new-itinerary',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    AsyncPipe,
    MatIcon,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SubscriptionPlanComponent,
    PaymentDetailComponent
  ],
  templateUrl: './create-new-itinerary.component.html',
  styleUrl: './create-new-itinerary.component.scss'
})
export default class CreateNewItineraryComponent implements AfterViewInit  {

  displayedColumns: string[] = ['Alias', 'Distrito', 'Latitud', 'Longitud', 'Acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _liveAnnouncer: LiveAnnouncer,
    private location: Location
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }


  ngAfterViewInit() {

  }

  goBack(): void {
    this.location.back();
  }

}
