import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAdministrationComponent } from './bus-administration.component';

describe('BusAdministrationComponent', () => {
  let component: BusAdministrationComponent;
  let fixture: ComponentFixture<BusAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
