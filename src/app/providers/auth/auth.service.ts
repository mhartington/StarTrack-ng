import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MusickitConfig } from '../musickit-config/musickit-config';

@Injectable({})
export class AuthGuard implements CanActivate {
  constructor(
    private musicKitService: MusickitConfig,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.musicKitService.isAuthorized) {
      return true;
    }

    this.router.navigate(['/browse']);
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}

