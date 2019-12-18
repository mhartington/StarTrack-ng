import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { IonicModule } from '@ionic/angular';
import { IonicServerModule } from '@ionic/angular-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    IonicModule,
    IonicServerModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent]
})
export class AppServerModule {}
