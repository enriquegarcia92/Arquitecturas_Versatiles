import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpassComponent } from './npass.component';

describe('NpassComponent', () => {
  let component: NpassComponent;
  let fixture: ComponentFixture<NpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NpassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
