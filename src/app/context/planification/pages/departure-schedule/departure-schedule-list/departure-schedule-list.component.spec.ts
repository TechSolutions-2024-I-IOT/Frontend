import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureScheduleListComponent } from './departure-schedule-list.component';

describe('DepartureScheduleListComponent', () => {
  let component: DepartureScheduleListComponent;
  let fixture: ComponentFixture<DepartureScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureScheduleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartureScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
