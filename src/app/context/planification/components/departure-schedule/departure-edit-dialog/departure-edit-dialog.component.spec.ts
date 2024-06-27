import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureEditDialogComponent } from './departure-edit-dialog.component';

describe('DepartureEditDialogComponent', () => {
  let component: DepartureEditDialogComponent;
  let fixture: ComponentFixture<DepartureEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartureEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
