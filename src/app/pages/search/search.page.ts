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
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
@Component({
  selector: 'app-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(
          ':enter',
          style({ opacity: 0, transform: `translate3d(0,10px,0)` }),
          { optional: true }
        ),
        query(
          ':enter',
          stagger('100ms', [
            animate(
              '300ms',
              style({ opacity: 1, transform: `translate3d(0,0,0)` })
            )
          ]),
          { optional: true, limit: 15 }
        )
      ])
    ])
  ]
})
export class SearchPage implements OnInit {
  hasSearch = false;
  public listing: any[] = null;
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
    this.listing = null;
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
