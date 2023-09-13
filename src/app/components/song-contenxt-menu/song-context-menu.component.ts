import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IonItem, IonList, PopoverController } from '@ionic/angular/standalone';
import { Song } from 'src/@types/song';
import { MusickitService } from 'src/app/providers/musickit-service/musickit-service.service';
import { PlayerService } from 'src/app/providers/player/player.service2';

@Component({
  template: `
    <ion-list>
      <ion-item *ngIf="!song.attributes.inLibrary" (click)="addToLibrary()"
        >Add to library</ion-item
      >
      <ion-item>Add to a playlist</ion-item>
      <ng-container
        *ngIf="!!queue().length && nowPlaying().attributes.name !== ''"
      >
        <ion-item (click)="playNext()">Play Next</ion-item>
        <ion-item>Play Last</ion-item>
      </ng-container>
      <ion-item>Share Song</ion-item>
    </ion-list>
  `,
  standalone: true,
  imports: [IonList, IonItem, NgIf],
})
export class SongContextMenuComponent {
  @Input() song: Song;

  #popoverCtrl = inject(PopoverController);
  #api = inject(MusickitService);

  public queue = inject(PlayerService).queue;
  public nowPlaying = inject(PlayerService).nowPlaying;
  constructor(){
  }
  async addToLibrary() {
    this.song.attributes.inLibrary = true;
    await this.#popoverCtrl.dismiss();
    await this.#api.addToLibrary(this.song.id, 'songs');
  }
  // async removeFromLibrary() {
  //   this.song.attributes.inLibrary = true;
  //   await this.#popoverCtrl.dismiss();
  //   await this.#api.addToLibrary(this.song.id, 'songs');
  // }

  async playNext() {
    await this.#popoverCtrl.dismiss();
    await this.#api.playNext(this.song.type, [this.song.id]);
  }
}
