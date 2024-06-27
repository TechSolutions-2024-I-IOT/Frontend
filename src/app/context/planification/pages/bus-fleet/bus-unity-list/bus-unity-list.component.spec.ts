import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusUnityListComponent } from './bus-unity-list.component';

describe('BusUnityListComponent', () => {
  let component: BusUnityListComponent;
  let fixture: ComponentFixture<BusUnityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusUnityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusUnityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
