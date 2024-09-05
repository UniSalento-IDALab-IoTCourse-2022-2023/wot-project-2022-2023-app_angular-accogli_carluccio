import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconFormComponent } from './beacon-form.component';

describe('BeaconFormComponent', () => {
  let component: BeaconFormComponent;
  let fixture: ComponentFixture<BeaconFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeaconFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeaconFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
