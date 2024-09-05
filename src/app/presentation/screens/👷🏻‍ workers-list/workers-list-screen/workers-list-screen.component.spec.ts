import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersListScreenComponent } from './workers-list-screen.component';

describe('WorkersListPageComponent', () => {
  let component: WorkersListScreenComponent;
  let fixture: ComponentFixture<WorkersListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersListScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
