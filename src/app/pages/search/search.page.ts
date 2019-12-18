import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  switchMap,
  tap,
  map
} from 'rxjs/operators';
import { MusickitService } from '../../providers/musickit-service/musickit-service.service';
import { PlayerService } from '../../providers/player/player.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  public hasSearch = false;
  public isError = false;
  public isLoading = false;
  public searchForm: FormGroup;
  public songResults: any;
  public albumResults: any;
  public artistResults: any;
  public playlistResults: any;
  public numOfResults: any;

  constructor(
    private api: MusickitService,
    private player: PlayerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ''
    });
  }

  closeKeyboard() {
    console.log('close');
  }
  searchCanceled(e: any) {
    e.target.blur();
  }
  searchCleared() {
    this.hasSearch = false;
    this.isError = false;
    this.songResults = null;
    this.albumResults = null;
    this.artistResults = null;
    this.playlistResults = null;
    this.router.navigate([]);
  }
  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        map(form => form.search),
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
            this.songResults = null;
            this.albumResults = null;
            this.artistResults = null;
            this.playlistResults = null;
          }
        }),
        debounceTime(500),
        tap(term => {
          this.router.navigate([], { queryParams: { query: term } });
          return term;
        }),
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
          this.isLoading = false;
        })
      )
      .subscribe((results: any) => {
        this.songResults = results.songs ? results.songs.data : null;
        this.albumResults = results.albums ? results.albums.data : null;
        this.artistResults = results.artists ? results.artists.data : null;
        this.playlistResults = results.playlists
          ? results.playlists.data
          : null;
      });
    const qp = this.route.snapshot.queryParams.query;
    console.log(qp)
    this.searchForm.setValue({ search: (qp ? qp : '')  });
  }
  playSong(index: number) {
    console.log(this.songResults[index]);
    this.player.setQueueFromItems(this.songResults, index).subscribe();
  }
}

