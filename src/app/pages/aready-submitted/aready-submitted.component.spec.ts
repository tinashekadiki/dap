import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreadySubmittedComponent } from './aready-submitted.component';

describe('AreadySubmittedComponent', () => {
  let component: AreadySubmittedComponent;
  let fixture: ComponentFixture<AreadySubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreadySubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreadySubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
