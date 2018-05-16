import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItunesService } from '../../providers/itunes/itunes.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  tap,
  switchMap,
  filter,
  catchError
} from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  hasSearch = false;
  public listing = [];
  public isError = false;
  public showSpinner = false;
  public searchInput = new FormControl('');
  public showOverlay = false;
  constructor(
    public itunes: ItunesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  searchCanceled(e: Event) {
    (e.target as HTMLIonSearchbarElement).blur();
  }
  searchCleared(e: Event) {
    this.hasSearch = false;
    this.isError = false;
    this.listing = [];
  }
  setSearch(val: string) {
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
            this.hasSearch = true;
            return term;
          } else {
            this.isError = false;
            this.listing = [];
            this.showSpinner = false;
            this.hasSearch = false;
          }
        }),
        debounceTime(500),
        switchMap(term => this.itunes.load(term)),
        tap(() => {
          this.showOverlay = false;
          this.showSpinner = false;
        }),
        catchError(e => {
          this.showOverlay = false;
          this.showSpinner = false;
          this.isError = true;
          return [];
        })
      )
      .subscribe(results => (this.listing = results));
  }
  detail(track) {
    this.router.navigate(['detail', track.trackId], { relativeTo: this.route });
  }
}
