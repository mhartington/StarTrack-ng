import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPreviewItemsComponent } from './album-preview-items.component';

describe('AlbumPreviewItemsComponent', () => {
  let component: AlbumPreviewItemsComponent;
  let fixture: ComponentFixture<AlbumPreviewItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPreviewItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPreviewItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
