import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleCreateComponent } from './job-title-create.component';

describe('JobTitleCreateComponent', () => {
  let component: JobTitleCreateComponent;
  let fixture: ComponentFixture<JobTitleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTitleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
