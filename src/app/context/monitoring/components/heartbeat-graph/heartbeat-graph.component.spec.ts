import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatGraphComponent } from './heartbeat-graph.component';

describe('HeartbeatGraphComponent', () => {
  let component: HeartbeatGraphComponent;
  let fixture: ComponentFixture<HeartbeatGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartbeatGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartbeatGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
