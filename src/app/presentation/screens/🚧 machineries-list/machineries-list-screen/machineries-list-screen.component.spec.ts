import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineriesListScreenComponent } from './machineries-list-screen.component';

describe('MachineriesPageComponent', () => {
  let component: MachineriesListScreenComponent;
  let fixture: ComponentFixture<MachineriesListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineriesListScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineriesListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
