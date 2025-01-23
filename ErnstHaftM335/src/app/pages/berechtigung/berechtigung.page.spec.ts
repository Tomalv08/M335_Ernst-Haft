import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BerechtigungPage } from './berechtigung.page';

describe('BerechtigungPage', () => {
  let component: BerechtigungPage;
  let fixture: ComponentFixture<BerechtigungPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BerechtigungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
