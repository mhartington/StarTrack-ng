import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ItunesService } from '../providers/itunes/itunes.service';

@Injectable()
export class TrackResolver implements Resolve<any> {
  constructor(private itunes: ItunesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.itunes.loadSong(route.params.id);
  }
}
