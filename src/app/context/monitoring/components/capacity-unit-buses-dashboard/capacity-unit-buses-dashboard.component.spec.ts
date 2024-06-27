import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityUnitBusesDashboardComponent } from './capacity-unit-buses-dashboard.component';

describe('CapacityUnitBusesDashboardComponent', () => {
  let component: CapacityUnitBusesDashboardComponent;
  let fixture: ComponentFixture<CapacityUnitBusesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacityUnitBusesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacityUnitBusesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
