
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout, retryWhen, delay, map } from 'rxjs/operators';
// import { timeout } from 'rxjs/operators/timeout';
// import { retryWhen } from 'rxjs/operators/retryWhen';
// import { delay } from 'rxjs/operators/delay';
// import { map  } from 'rxjs/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class ItunesService {
  constructor(public http: HttpClient) { }
  public load(query): Observable<any> {
    return this.http
      .get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&media=music`
      )
      .pipe(retryWhen(error => error.pipe(delay(500))), timeout(5000));
  }

  public loadSong(songId): Observable<any> {
    return this.http
      .get(`https://itunes.apple.com/lookup?id=${songId}`)
      .pipe(retryWhen(error => error.pipe(delay(500))), timeout(5000), map((res: any) => res.results[0]));
  }
}
