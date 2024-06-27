import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAdministrationComponent } from './driver-administration.component';

describe('DriverAdministrationComponent', () => {
  let component: DriverAdministrationComponent;
  let fixture: ComponentFixture<DriverAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
