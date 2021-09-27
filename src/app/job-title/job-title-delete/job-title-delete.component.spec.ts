import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleDeleteComponent } from './job-title-delete.component';

describe('JobTitleDeleteComponent', () => {
  let component: JobTitleDeleteComponent;
  let fixture: ComponentFixture<JobTitleDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTitleDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
