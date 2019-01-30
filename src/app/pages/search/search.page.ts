import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import {
  tap,
  switchMap,
  filter,
  catchError,
  debounceTime
} from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage {
  public hasSearch = false;
  public isError = false;
  public isLoading = false;
  public searchInput = new FormControl('');
  public showOverlay = false;
  songResults: any;
  albumResults: any;
  artistResults: any;
  playlistResults: any;
  numOfResults: any;

  constructor(private api: MusickitService, private player: PlayerService) {}
  searchCanceled(e: Event) {
    (e.target as any).blur();
  }
  searchCleared() {
    this.hasSearch = false;
    this.isError = false;

    this.songResults = null;
    this.albumResults = null;
    this.artistResults = null;
    this.playlistResults = null;
  }
  ionViewDidEnter() {
    this.searchInput.valueChanges
      .pipe(
        filter(term => {
          if (term) {
            this.isLoading = true;
            this.isError = false;
            this.hasSearch = true;
            return term;
          } else {
            this.isError = false;
            this.isLoading = false;
            this.hasSearch = false;
          }
        }),
        debounceTime(500),
        switchMap(term =>
          this.api.search(term).pipe(
            catchError(() => {
              this.isLoading = false;
              this.isError = true;
              return EMPTY;
            })
          )
        ),
        tap(() => {
          this.showOverlay = false;
          this.isLoading = false;
        })
      )
      .subscribe(results => {
        this.songResults = results['songs'] ? results['songs']['data'] : null;
        this.albumResults = results['albums']
          ? results['albums']['data']
          : null;
        this.artistResults = results['artists']
          ? results['artists']['data']
          : null;
        this.playlistResults = results['playlists']
          ? results['playlists']['data']
          : null;
      });
  }
  playSong(index: any) {
    this.player.setQueueFromItems(this.songResults, index).subscribe();
  }
}
