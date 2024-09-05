import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsListScreenComponent } from './alerts-list-screen.component';

describe('AlertsListScreenComponent', () => {
  let component: AlertsListScreenComponent;
  let fixture: ComponentFixture<AlertsListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsListScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
