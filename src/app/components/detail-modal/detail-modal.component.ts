import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
