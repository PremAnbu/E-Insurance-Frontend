import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCreationComponent } from './policy-creation.component';

describe('PolicyCreationComponent', () => {
  let component: PolicyCreationComponent;
  let fixture: ComponentFixture<PolicyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
