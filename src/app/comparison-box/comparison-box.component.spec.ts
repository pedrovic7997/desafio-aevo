import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonBoxComponent } from './comparison-box.component';

describe('ComparisonBoxComponent', () => {
  let component: ComparisonBoxComponent;
  let fixture: ComponentFixture<ComparisonBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
