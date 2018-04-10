import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TrackDetailPage } from '../track-detail/track-detail.page';
import { ItunesService } from '../../providers/itunes/itunes.service';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPage implements OnInit {
  @ViewChild('list') list: ElementRef;
  hasSearch: boolean = false;
  public listing = [];
  public items = Array.from(Array(50).keys());
  public isError: boolean = false;
  public showSpinner: boolean = false;
  public searchInput = new FormControl('');
  public showOverlay: boolean = false;
  constructor(
    public itunes: ItunesService,
    private router: Router
  ) {}

  searchCleared(e) {
    console.log('cleard?')
    this.hasSearch = false;
    this.isError = false;
    this.listing = []
  }
  setSearch(val) {
    this.isError = false;
    this.hasSearch = true;
    this.searchInput.setValue(val);
  }
  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        filter(term => {
          if (term) {
            this.showSpinner = true;
            this.isError = false;
            return term;
          } else {
            this.isError = false;
            this.listing = [];
            this.showSpinner = false;
          }
        }),
        debounceTime(500),
        switchMap(term => this.itunes.load(term)),
        tap(() => {
          this.showOverlay = false;
          this.showSpinner = false;
        })
      )
      .subscribe(
        results => this.listing = results,
        err => {
          this.showOverlay = false;
          this.showSpinner = false;
          this.isError = true;
        }
      );
  }
  detail(track) {
    this.router.navigate([`/app/detail`, track.trackId])
  }
}
