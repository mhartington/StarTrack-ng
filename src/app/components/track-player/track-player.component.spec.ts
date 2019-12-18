import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPlayerComponent } from './track-player.component';

describe('TrackPlayerComponent', () => {
  let component: TrackPlayerComponent;
  let fixture: ComponentFixture<TrackPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
