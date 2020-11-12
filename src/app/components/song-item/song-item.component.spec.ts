import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SongItemComponent } from './song-item.component';

describe('SongItemComponent', () => {
  let component: SongItemComponent;
  let fixture: ComponentFixture<SongItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SongItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
