import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDepartureHoursComponent } from './modal-departure-hours.component';

describe('ModalDepartureHoursComponent', () => {
  let component: ModalDepartureHoursComponent;
  let fixture: ComponentFixture<ModalDepartureHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDepartureHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDepartureHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
