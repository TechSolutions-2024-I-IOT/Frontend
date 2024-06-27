import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusComponent } from './modal-bus.component';

describe('ModalBusComponent', () => {
  let component: ModalBusComponent;
  let fixture: ComponentFixture<ModalBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
