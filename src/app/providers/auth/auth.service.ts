import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  private musicKitInstance = (window as any).MusicKit.getInstance();
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.musicKitInstance.isAuthorized) {
      return true;
    }

    this.router.navigate(['/browse']);
  }
  canLoad(): boolean {
    return this.canActivate();
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
