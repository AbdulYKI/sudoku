import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueModalComponent } from './value-modal.component';

describe('ValueModalComponent', () => {
  let component: ValueModalComponent;
  let fixture: ComponentFixture<ValueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
