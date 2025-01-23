import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndpagePage } from './endpage.page';

describe('EndpagePage', () => {
  let component: EndpagePage;
  let fixture: ComponentFixture<EndpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
