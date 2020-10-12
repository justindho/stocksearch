import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBannerComponent } from './stock-banner.component';

describe('StockBannerComponent', () => {
  let component: StockBannerComponent;
  let fixture: ComponentFixture<StockBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
