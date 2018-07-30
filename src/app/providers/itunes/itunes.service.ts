import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout, retryWhen, delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {
  constructor(public http: HttpClient) {}
  public load(query): Observable<any> {
    return this.http
      .get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music`)
      .pipe(
        retryWhen(error => error.pipe(delay(500))),
        timeout(5000),
        map((res: any) => res.results)
      );
  }

  public loadSong(songId): Observable<any> {
    return this.http
      .get(`https://itunes.apple.com/lookup?id=${songId}`)
      .pipe(
        retryWhen(error => error.pipe(delay(500))),
        timeout(5000),
        map((res: any) => res.results[0])
      );
  }
}
