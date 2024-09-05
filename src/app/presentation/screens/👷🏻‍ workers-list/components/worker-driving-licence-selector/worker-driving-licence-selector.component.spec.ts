import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDrivingLicenceSelectorComponent } from './worker-driving-licence-selector.component';

describe('WorkerDrivingLicenceSelectorComponent', () => {
  let component: WorkerDrivingLicenceSelectorComponent;
  let fixture: ComponentFixture<WorkerDrivingLicenceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerDrivingLicenceSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDrivingLicenceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
