import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(plt: Platform, statusBar: StatusBar){
    plt.ready().then(()=>{
      statusBar.styleLightContent();
    })
  }
}
