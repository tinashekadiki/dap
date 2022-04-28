import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FinalPageComponent } from './final-page.component';

describe('FinalPageComponent', () => {
  let component: FinalPageComponent;
  let fixture: ComponentFixture<FinalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FinalPageComponent]
    });
    fixture = TestBed.createComponent(FinalPageComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
