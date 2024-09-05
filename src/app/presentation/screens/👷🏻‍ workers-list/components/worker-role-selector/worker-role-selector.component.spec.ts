import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRoleSelectorComponent } from './worker-role-selector.component';

describe('WorkerRoleSelectorComponent', () => {
  let component: WorkerRoleSelectorComponent;
  let fixture: ComponentFixture<WorkerRoleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerRoleSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerRoleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
