import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryCardComponent } from './machinery-card.component';

describe('MachineryCardComponent', () => {
  let component: MachineryCardComponent;
  let fixture: ComponentFixture<MachineryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
