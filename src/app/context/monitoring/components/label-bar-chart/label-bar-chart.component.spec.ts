import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelBarChartComponent } from './label-bar-chart.component';

describe('LabelBarChartComponent', () => {
  let component: LabelBarChartComponent;
  let fixture: ComponentFixture<LabelBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
