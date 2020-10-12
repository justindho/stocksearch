import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDescriptionComponent } from './summary-description.component';

describe('SummaryDescriptionComponent', () => {
  let component: SummaryDescriptionComponent;
  let fixture: ComponentFixture<SummaryDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
