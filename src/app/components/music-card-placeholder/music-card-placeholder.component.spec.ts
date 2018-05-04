import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCardPlaceholderComponent } from './music-card-placeholder.component';

describe('MusicCardPlaceholderComponent', () => {
  let component: MusicCardPlaceholderComponent;
  let fixture: ComponentFixture<MusicCardPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicCardPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
