import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteConfigurationScreenComponent } from './site-configuration-screen.component';

describe('SiteConfigurationScreenComponent', () => {
  let component: SiteConfigurationScreenComponent;
  let fixture: ComponentFixture<SiteConfigurationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteConfigurationScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteConfigurationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
