import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePWComponent } from './user-change-pw.component';

describe('UserChangePWComponent', () => {
  let component: UserChangePWComponent;
  let fixture: ComponentFixture<UserChangePWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChangePWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
