import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatAnalyticsComponent } from './heartbeat-analytics.component';

describe('HeartbeatAnalyticsComponent', () => {
  let component: HeartbeatAnalyticsComponent;
  let fixture: ComponentFixture<HeartbeatAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartbeatAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartbeatAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
