import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LazyImgComponent } from './lazy-img.component';

describe('LazyImgComponent', () => {
  let component: LazyImgComponent;
  let fixture: ComponentFixture<LazyImgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
