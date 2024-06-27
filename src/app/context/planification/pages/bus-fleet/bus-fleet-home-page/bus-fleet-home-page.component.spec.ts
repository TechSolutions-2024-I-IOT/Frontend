import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusFleetHomePageComponent } from './bus-fleet-home-page.component';

describe('BusFleetHomePageComponent', () => {
  let component: BusFleetHomePageComponent;
  let fixture: ComponentFixture<BusFleetHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusFleetHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusFleetHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
