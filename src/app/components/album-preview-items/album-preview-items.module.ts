import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { FormatArtworkUrlModule } from "../../pipes/formatArtworkUrl/format-artwork-url.module";
import { AlbumPreviewItemsComponent } from "./album-preview-items.component";
import { LazyImgModule } from "../lazy-img/lazy-img.module";

@NgModule({
  imports: [CommonModule, IonicModule, FormatArtworkUrlModule,  RouterModule, LazyImgModule],
  declarations: [AlbumPreviewItemsComponent],
  exports: [AlbumPreviewItemsComponent]
})
export class AlbumPreviewItemsModule{}
