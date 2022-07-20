import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RxState } from '@rx-angular/state';
import { LetModule, PushModule } from '@rx-angular/template';
import { map } from 'rxjs';
import { MusickitService } from '../../../providers/musickit-service/musickit-service.service';

type RecentlyAddedPageState = {
  collection: any[];
};
@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.page.html',
  styleUrls: ['./recently-added.page.scss'],
  providers: [RxState],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LetModule,
    PushModule,
    RouterModule
  ],
})
export class RecentlyAddedPage implements OnInit {
  public state$ = this.stateService.select();
  private fetchRecent$ = this.api
    .fetchRecentlyAdded()
    .pipe(map((res: any) => ({ collection: res })));

  constructor(
    private stateService: RxState<RecentlyAddedPageState>,
    private api: MusickitService
  ) {
    this.stateService.set({ collection: [] });
  }

  ngOnInit() {
    this.stateService.connect(this.fetchRecent$);
  }
}
