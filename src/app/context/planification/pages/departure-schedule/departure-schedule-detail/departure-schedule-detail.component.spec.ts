import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureScheduleDetailComponent } from './departure-schedule-detail.component';

describe('DepartureScheduleDetailComponent', () => {
  let component: DepartureScheduleDetailComponent;
  let fixture: ComponentFixture<DepartureScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureScheduleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartureScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
