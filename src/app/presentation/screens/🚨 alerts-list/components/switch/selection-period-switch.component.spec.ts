import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPeriodSwitchComponent } from './selection-period-switch.component';

describe('SwitchComponent', () => {
  let component: SelectionPeriodSwitchComponent;
  let fixture: ComponentFixture<SelectionPeriodSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionPeriodSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionPeriodSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
