import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerInfoScreenComponent } from './worker-info-screen.component';

describe('WorkerInfoScreenComponent', () => {
  let component: WorkerInfoScreenComponent;
  let fixture: ComponentFixture<WorkerInfoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerInfoScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
