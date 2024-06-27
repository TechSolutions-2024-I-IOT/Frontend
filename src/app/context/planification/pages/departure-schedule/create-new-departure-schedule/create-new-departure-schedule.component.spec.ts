import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDepartureScheduleComponent } from './create-new-departure-schedule.component';

describe('CreateNewDepartureScheduleComponent', () => {
  let component: CreateNewDepartureScheduleComponent;
  let fixture: ComponentFixture<CreateNewDepartureScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewDepartureScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewDepartureScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
