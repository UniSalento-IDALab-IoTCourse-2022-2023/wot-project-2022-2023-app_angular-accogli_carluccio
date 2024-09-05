import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryInfoScreenComponent } from './machinery-info-screen.component';

describe('MachineryInfoScreenComponent', () => {
  let component: MachineryInfoScreenComponent;
  let fixture: ComponentFixture<MachineryInfoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineryInfoScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineryInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
