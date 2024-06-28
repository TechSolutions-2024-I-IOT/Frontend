import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {catchError, Observable, of} from 'rxjs';
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

import { Stop } from '../../../../../../../../../Documents/Frontend/src/app/context/planification/models/stop';
import {SubscriptionPlanComponent} from "../../../../subscription/components/subscription-plan/subscription-plan.component";
import { PaymentDetailComponent } from '../../../../subscription/components/payment-detail/payment-detail.component';
import {MapComponent} from "../../../../../../../../../Documents/Frontend/src/app/context/planification/components/map/map.component";
import {ItineraryService} from "../../../../../../../../../Documents/Frontend/src/app/context/planification/service/itinerary.service";
import {TokenService} from "../../../../shared/services/token.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {SnackBarComponent} from "../../../../shared/components/snack-bar/snack-bar.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
    MatSnackBarModule,
    AsyncPipe,
    MatIcon,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SubscriptionPlanComponent,
    PaymentDetailComponent,
    MapComponent
  ],
  templateUrl: './create-new-itinerary.component.html',
  styleUrl: './create-new-itinerary.component.scss'
})
export default class CreateNewItineraryComponent implements AfterViewInit {
  displayedColumns: string[] = ['Alias', 'Latitud', 'Longitud', 'Acciones'];
  dataSource = new MatTableDataSource<Stop>([]);
  stops: Stop[] = [];

  firstFormGroup = this._formBuilder.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;


  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _liveAnnouncer: LiveAnnouncer,
    private location: Location,
    private itineraryService: ItineraryService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngAfterViewInit() {

  }

  addStop() {
    const address = this.secondFormGroup.get('secondCtrl')?.value;
    if (address) {
      this.geocodeAddress(address).subscribe(
        (coordinates) => {
          if (coordinates) {
            const newStop: Stop = {
              id: (this.stops.length + 1).toString(),
              name: address,
              latitude: coordinates[1].toString(),
              longitude: coordinates[0].toString()
            };
            this.stops.push(newStop);
            this.dataSource = new MatTableDataSource(this.stops);
            this.mapComponent.addMarker(coordinates[0], coordinates[1]);
            this.mapComponent.updateRoute();
          } else {
            console.error('Error al geocodificar la dirección');
            this.showError('Error al geocodificar la dirección. Por favor, inténtalo de nuevo.');
          }
        },
        (error) => {
          console.error('Error al geocodificar la dirección:', error);
          this.showError('Error al geocodificar la dirección. Por favor, intente de nuevo');
        }
      );
    }
  }



  removeStop(index: number) {
    this.stops.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.stops);
    this.mapComponent.clearMarkers();
    this.stops.forEach(stop => {
      this.mapComponent.addMarker(parseFloat(stop.longitude), parseFloat(stop.latitude));
    });
  }

  createItinerary() {
    const startTime = this.firstFormGroup.get('firstCtrl')?.value;
    const endTime = this.firstFormGroup.get('firstCtrl')?.value;
    const userId = this.tokenService.getUserId();

    if (startTime && endTime && userId && this.stops.length > 0) {
      const itineraryData = {
        startTime: startTime,
        endTime: endTime,
        stops: this.stops,
        user: parseInt(userId, 10)
      };

      this.itineraryService.createNewItineraryWithStops(itineraryData).subscribe(
        (response) => {
          console.log('Itinerario creado:', response);
          this.showSuccess('¡Itinerario creado exitosamente!');
        },
        (error) => {
          console.error('Error al crear el itinerario:', error);
          this.showError('Error al crear el itinerario. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      console.error('Faltan datos para crear el itinerario');
      this.showError('Faltan datos para crear el itinerario.');
    }
  }

  clearStops() {
    this.stops = [];
    this.dataSource = new MatTableDataSource(this.stops);
    this.mapComponent.clearMarkers();
  }

  clearItinerary() {

    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stops = [];
    this.dataSource = new MatTableDataSource(this.stops);
    this.mapComponent.clearMarkers();
  }

  goBack(): void {
    this.location.back();
  }

  private geocodeAddress(address: string): Observable<[number, number] | null> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${environment.mapBoxKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.features && response.features.length > 0) {
          const coordinates = response.features[0].center;
          return coordinates;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error en la geocodificación:', error);
        return of(null);
      })
    );
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
