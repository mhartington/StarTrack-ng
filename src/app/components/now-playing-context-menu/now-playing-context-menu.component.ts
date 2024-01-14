import { Component, inject } from '@angular/core';
import {
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonList,
  ModalController,
  PopoverController,
} from '@ionic/angular/standalone';
import { PlayerService } from '../../providers/player/player.service2';
import { Router } from '@angular/router';

@Component({
  template: `
    <ion-list>
      <ion-item>View Credits</ion-item>

      <ion-item-group>
        <ion-item-divider></ion-item-divider>
        <ion-item> Remove </ion-item>
        <ion-item>Add to a Playlist</ion-item>
      </ion-item-group>

      <ion-item-group>
        <ion-item-divider></ion-item-divider>
        <ion-item>Share Song...</ion-item>
        <ion-item (click)="gotoCollection()">Go to Album</ion-item>
      </ion-item-group>
      
    </ion-list>
  `,
  standalone: true,
  imports: [IonList, IonItem, IonItemGroup,IonItemDivider],
})
export class NowPlayingContextMenuComponent {
  private popoverCtrl = inject(PopoverController);
  private modalCtrl = inject(ModalController);
  private router = inject(Router);
  public nowPlaying = inject(PlayerService).nowPlaying;


  async addToLibrary() {
    await this.popoverCtrl.dismiss();
  }
  async playNext() {
    await this.popoverCtrl.dismiss();
  }
  async gotoCollection(){
    console.log(this.nowPlaying());
    const albumId = new URL(this.nowPlaying().attributes.url).pathname.split('/').pop()
    await this.popoverCtrl.dismiss();
    await this.modalCtrl.dismiss();
    this.router.navigate(['/', 'us', 'album', albumId], {queryParams: {i: this.nowPlaying().id}})
  }
}
