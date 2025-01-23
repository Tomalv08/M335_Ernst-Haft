import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NameEingebenPage } from './name-eingeben.page';

describe('NameEingebenPage', () => {
  let component: NameEingebenPage;
  let fixture: ComponentFixture<NameEingebenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NameEingebenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
