import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SvgBarsComponent } from './svg-bars.component';

describe('SvgBarsComponent', () => {
  let component: SvgBarsComponent;
  let fixture: ComponentFixture<SvgBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBarsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SvgBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
