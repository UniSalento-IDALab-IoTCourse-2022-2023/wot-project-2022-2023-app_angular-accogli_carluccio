import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMachineryFormComponent } from './register-machinery-form.component';

describe('RegisterVehicleFormComponent', () => {
  let component: RegisterMachineryFormComponent;
  let fixture: ComponentFixture<RegisterMachineryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterMachineryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMachineryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
