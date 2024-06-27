import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureTimeDialogComponent } from './departure-time-dialog.component';

describe('DepartureTimeDialogComponent', () => {
  let component: DepartureTimeDialogComponent;
  let fixture: ComponentFixture<DepartureTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureTimeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartureTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
