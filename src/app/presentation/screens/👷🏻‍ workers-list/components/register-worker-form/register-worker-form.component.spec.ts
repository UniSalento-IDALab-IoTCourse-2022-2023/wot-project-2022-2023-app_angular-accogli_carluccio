import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWorkerFormComponent } from './register-worker-form.component';

describe('RegisterWorkerFormComponent', () => {
  let component: RegisterWorkerFormComponent;
  let fixture: ComponentFixture<RegisterWorkerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterWorkerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterWorkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
