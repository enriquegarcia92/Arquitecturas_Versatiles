import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtaskComponent } from './etask.component';

describe('EtaskComponent', () => {
  let component: EtaskComponent;
  let fixture: ComponentFixture<EtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
