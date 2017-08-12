import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CersComponent } from './cers.component';

describe('CersComponent', () => {
  let component: CersComponent;
  let fixture: ComponentFixture<CersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
