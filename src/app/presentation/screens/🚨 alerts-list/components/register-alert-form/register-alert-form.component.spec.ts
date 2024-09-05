import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAlertFormComponent } from './register-alert-form.component';

describe('RegisterAlertFormComponent', () => {
  let component: RegisterAlertFormComponent;
  let fixture: ComponentFixture<RegisterAlertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterAlertFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAlertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
