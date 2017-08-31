import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculationComponent } from './matriculation.component';

describe('MatriculationComponent', () => {
  let component: MatriculationComponent;
  let fixture: ComponentFixture<MatriculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
