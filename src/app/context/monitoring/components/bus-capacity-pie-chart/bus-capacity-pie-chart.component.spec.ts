import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusCapacityPieChartComponent } from './bus-capacity-pie-chart.component';

describe('BusCapacityPieChartComponent', () => {
  let component: BusCapacityPieChartComponent;
  let fixture: ComponentFixture<BusCapacityPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusCapacityPieChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusCapacityPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
