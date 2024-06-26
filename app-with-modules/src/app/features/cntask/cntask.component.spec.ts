import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CntaskComponent } from './cntask.component';

describe('CntaskComponent', () => {
  let component: CntaskComponent;
  let fixture: ComponentFixture<CntaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CntaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CntaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
