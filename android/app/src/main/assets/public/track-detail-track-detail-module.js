(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["track-detail-track-detail-module"],{

/***/ "./src/app/components/music-card/music-card.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/music-card/music-card.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-card>\n  <ion-grid no-padding>\n    <ion-row align-items-center>\n      <ion-col col-12 col-md-5>\n        <div [ngClass]=\"{\n            'playing': ifPlaying ,\n            'is-seeking': isSeeking\n          }\" class=\"track-img\">\n          <img [src]=\"fullImage\" #img alt=\"\">\n          <div class=\"background-shadow\" [colorFromImage]=\"img\"></div>\n        </div>\n      </ion-col>\n      <ion-col>\n        <ion-card-content>\n          <ion-card-title>\n            <h2>{{track.trackName}}</h2>\n          </ion-card-title>\n          <h3>by {{track.artistName}}</h3>\n          <em>{{track.collectionName}}</em>\n\n          <ion-grid>\n            <ion-row>\n              <ion-col col-3>\n                <ion-fab-button mini (click)=\"toggleSong()\" color=\"light\">\n                  <ion-icon color=\"success\"  [name]=\"ifPlaying ? 'square' : 'play'\" ></ion-icon>\n                </ion-fab-button>\n              </ion-col>\n              <ion-col col-9>\n                <ion-range [(ngModel)]=\"progressValue\"  max=\"100\" (ionFocus)=\"handleDrag()\" (ionBlur)=\"seek($event.target.value)\"></ion-range>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-content>\n        <ion-item>\n          <p>Track Duration</p>\n          <ion-badge slot=\"end\" color=\"light\">\n            {{track.trackTimeMillis | msToMins}}\n          </ion-badge>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-card>\n"

/***/ }),

/***/ "./src/app/components/music-card/music-card.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/music-card/music-card.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "music-card .track-img {\n  transition: all 500ms cubic-bezier(0.42, 0, 0, 1.93);\n  -webkit-transform: scale3d(0.8, 0.8, 0.8);\n          transform: scale3d(0.8, 0.8, 0.8);\n  max-width: 400px;\n  margin: auto;\n  border-radius: 15px; }\n  music-card .track-img.playing {\n    -webkit-transform: scale3d(0.89, 0.89, 0.89);\n            transform: scale3d(0.89, 0.89, 0.89); }\n  music-card .track-img.is-seeking {\n    transition: all 100ms linear;\n    -webkit-transform: scale3d(0.8, 0.8, 0.8) translateY(-35px);\n            transform: scale3d(0.8, 0.8, 0.8) translateY(-35px); }\n  music-card .track-img img {\n    border-radius: 15px; }\n  music-card .track-img .background-shadow {\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  transition: all 300ms cubic-bezier(0.42, 0, 0.36, 1.46);\n  z-index: -1;\n  opacity: 0;\n  background-color: black;\n  -webkit-filter: blur(20px);\n          filter: blur(20px);\n  border-radius: 15px;\n  -webkit-transform: scale3d(0.84, 0.84, 0.84);\n          transform: scale3d(0.84, 0.84, 0.84); }\n  music-card .track-img.playing .background-shadow {\n  -webkit-transform: scale3d(0.9, 0.9, 0.9) translate3d(0, 35px, 0);\n          transform: scale3d(0.9, 0.9, 0.9) translate3d(0, 35px, 0); }\n  music-card .item-md,\nmusic-card .item-ios {\n  background-color: transparent; }\n  .ios music-card .range-ios .range-knob {\n  transition: -webkit-transform 100ms linear;\n  transition: transform 100ms linear;\n  transition: transform 100ms linear, -webkit-transform 100ms linear;\n  -webkit-transform: scale3d(0.5, 0.5, 0.5);\n          transform: scale3d(0.5, 0.5, 0.5); }\n  .ios music-card .range-knob-handle.range-knob-pressed .range-knob {\n  -webkit-transform: scale3d(0.8, 0.8, 0.8);\n          transform: scale3d(0.8, 0.8, 0.8); }\n"

/***/ }),

/***/ "./src/app/components/music-card/music-card.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/music-card/music-card.component.ts ***!
  \***************************************************************/
/*! exports provided: MusicCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MusicCardComponent", function() { return MusicCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! howler */ "./node_modules/howler/dist/howler.js");
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(howler__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { NativeMedia } from '../../providers/native-media/native-media';

var MusicCardComponent = /** @class */ (function () {
    // public nativeMedia: NativeMedia
    function MusicCardComponent() {
        this.progressValue = 0;
        this.ifPlaying = false;
        this.isFavorite = false;
        this.isSeeking = false;
    }
    Object.defineProperty(MusicCardComponent.prototype, "fullImage", {
        get: function () {
            return this.track.artworkUrl100.replace(/100x100bb/, '400x400bb');
        },
        enumerable: true,
        configurable: true
    });
    MusicCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.player = new howler__WEBPACK_IMPORTED_MODULE_1__["Howl"]({
            src: [this.track.previewUrl],
            onplay: function () {
                _this.animationQ = requestAnimationFrame(_this.setProgress.bind(_this));
            },
            onend: function () {
                _this.playerEnded();
            }
        });
    };
    MusicCardComponent.prototype.toggleSong = function () {
        if (this.ifPlaying) {
            this.stopSong();
        }
        else {
            this.playSong();
        }
    };
    MusicCardComponent.prototype.playSong = function () {
        // this.nativeMedia.createMediaControls(this.track;
        this.player.play();
        this.ifPlaying = true;
    };
    MusicCardComponent.prototype.stopSong = function () {
        this.ifPlaying = false;
        this.player.stop();
        this.progressValue = 0;
        window.cancelAnimationFrame(this.animationQ);
    };
    MusicCardComponent.prototype.setProgress = function () {
        if (!this.isSeeking) {
            var seek = this.player.seek();
            this.progressValue = seek / this.player.duration() * 100 || 0;
            this.animationQ = requestAnimationFrame(this.setProgress.bind(this));
        }
    };
    MusicCardComponent.prototype.seek = function (val) {
        this.isSeeking = false;
        var duration = this.player.duration();
        this.player.seek(duration * (val / 100));
        this.animationQ = requestAnimationFrame(this.setProgress.bind(this));
    };
    MusicCardComponent.prototype.handleDrag = function () {
        this.isSeeking = true;
    };
    MusicCardComponent.prototype.playerEnded = function () {
        this.ifPlaying = false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MusicCardComponent.prototype, "track", void 0);
    MusicCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'music-card',
            template: __webpack_require__(/*! ./music-card.component.html */ "./src/app/components/music-card/music-card.component.html"),
            styles: [__webpack_require__(/*! ./music-card.component.scss */ "./src/app/components/music-card/music-card.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [])
    ], MusicCardComponent);
    return MusicCardComponent;
}());



/***/ }),

/***/ "./src/app/components/music-card/music-card.module.ts":
/*!************************************************************!*\
  !*** ./src/app/components/music-card/music-card.module.ts ***!
  \************************************************************/
/*! exports provided: MusicCardComponentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MusicCardComponentModule", function() { return MusicCardComponentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _music_card_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./music-card.component */ "./src/app/components/music-card/music-card.component.ts");
/* harmony import */ var _pipes_ms_to_mins_ms_to_mins_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pipes/ms-to-mins/ms-to-mins.module */ "./src/app/pipes/ms-to-mins/ms-to-mins.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _directives_directives_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../directives/directives.module */ "./src/app/directives/directives.module.ts");
/* harmony import */ var _providers_color_thief_color_thief_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../providers/color-thief/color-thief.service */ "./src/app/providers/color-thief/color-thief.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var MusicCardComponentModule = /** @class */ (function () {
    function MusicCardComponentModule() {
    }
    MusicCardComponentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_music_card_component__WEBPACK_IMPORTED_MODULE_3__["MusicCardComponent"]],
            imports: [_pipes_ms_to_mins_ms_to_mins_module__WEBPACK_IMPORTED_MODULE_4__["TimePipeModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _directives_directives_module__WEBPACK_IMPORTED_MODULE_6__["DirectivesModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]],
            providers: [_providers_color_thief_color_thief_service__WEBPACK_IMPORTED_MODULE_7__["ColorThiefService"]],
            exports: [_music_card_component__WEBPACK_IMPORTED_MODULE_3__["MusicCardComponent"]]
        })
    ], MusicCardComponentModule);
    return MusicCardComponentModule;
}());



/***/ }),

/***/ "./src/app/directives/color-from-image/color-from-image.directive.ts":
/*!***************************************************************************!*\
  !*** ./src/app/directives/color-from-image/color-from-image.directive.ts ***!
  \***************************************************************************/
/*! exports provided: ColorFromImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorFromImage", function() { return ColorFromImage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _providers_color_thief_color_thief_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/color-thief/color-thief.service */ "./src/app/providers/color-thief/color-thief.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ColorFromImage = /** @class */ (function () {
    function ColorFromImage(colorThief, el) {
        this.colorThief = colorThief;
        this.el = el;
    }
    ColorFromImage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.colorThief
            .getColorFromUrl(this.colorFromImage.src)
            .then(function (res) {
            var colorMap = res.dominantColor;
            _this.el.nativeElement.style.opacity = 1;
            _this.el.nativeElement.style.backgroundColor = "rgb(" + colorMap[0] + "," + colorMap[1] + "," + colorMap[2] + ")";
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ColorFromImage.prototype, "colorFromImage", void 0);
    ColorFromImage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[colorFromImage]' // Attribute selector
        }),
        __metadata("design:paramtypes", [_providers_color_thief_color_thief_service__WEBPACK_IMPORTED_MODULE_1__["ColorThiefService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], ColorFromImage);
    return ColorFromImage;
}());



/***/ }),

/***/ "./src/app/directives/directives.module.ts":
/*!*************************************************!*\
  !*** ./src/app/directives/directives.module.ts ***!
  \*************************************************/
/*! exports provided: DirectivesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectivesModule", function() { return DirectivesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _color_from_image_color_from_image_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-from-image/color-from-image.directive */ "./src/app/directives/color-from-image/color-from-image.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_color_from_image_color_from_image_directive__WEBPACK_IMPORTED_MODULE_1__["ColorFromImage"]],
            imports: [],
            exports: [_color_from_image_color_from_image_directive__WEBPACK_IMPORTED_MODULE_1__["ColorFromImage"]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());



/***/ }),

/***/ "./src/app/pages/track-detail/track-detail.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/track-detail/track-detail.module.ts ***!
  \***********************************************************/
/*! exports provided: TrackDetailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackDetailModule", function() { return TrackDetailModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_music_card_music_card_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/music-card/music-card.module */ "./src/app/components/music-card/music-card.module.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/itunes/itunes.service */ "./src/app/providers/itunes/itunes.service.ts");
/* harmony import */ var _track_detail_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./track-detail.page */ "./src/app/pages/track-detail/track-detail.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _resolver_track_detail_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resolver/track-detail-resolver */ "./src/app/resolver/track-detail-resolver.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var TrackDetailModule = /** @class */ (function () {
    function TrackDetailModule() {
    }
    TrackDetailModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _components_music_card_music_card_module__WEBPACK_IMPORTED_MODULE_1__["MusicCardComponentModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _track_detail_page__WEBPACK_IMPORTED_MODULE_4__["TrackDetailPage"],
                        resolve: { track: _resolver_track_detail_resolver__WEBPACK_IMPORTED_MODULE_7__["TrackResolver"] }
                    }
                ])
            ],
            declarations: [_track_detail_page__WEBPACK_IMPORTED_MODULE_4__["TrackDetailPage"]],
            providers: [_providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_3__["ItunesService"], _resolver_track_detail_resolver__WEBPACK_IMPORTED_MODULE_7__["TrackResolver"]]
        })
    ], TrackDetailModule);
    return TrackDetailModule;
}());



/***/ }),

/***/ "./src/app/pages/track-detail/track-detail.page.html":
/*!***********************************************************!*\
  !*** ./src/app/pages/track-detail/track-detail.page.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"success\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"app/search\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{track?.trackName}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"toggleFavorites()\">\n        <ion-icon slot=\"icon-only\" [name]=\"favoriteIcon\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-sm-10 offset-sm-1>\n          <music-card *ngIf=\"track\" #musicCard [track]=\"track\"></music-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/track-detail/track-detail.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/track-detail/track-detail.page.ts ***!
  \*********************************************************/
/*! exports provided: TrackDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackDetailPage", function() { return TrackDetailPage; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/itunes/itunes.service */ "./src/app/providers/itunes/itunes.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TrackDetailPage = /** @class */ (function () {
    function TrackDetailPage(events, storage, toastCtrl, service, route) {
        this.events = events;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.route = route;
        this.isFavorite = false;
        this.favoriteIcon = 'star-outline';
    }
    TrackDetailPage.prototype.ionViewDidEnter = function () {
        this.track = this.route.snapshot.data['track'];
        this.checkStorage();
    };
    TrackDetailPage.prototype.checkStorage = function () {
        var _this = this;
        this.storage.get(this.track.trackId).then(function (res) {
            if (!res) {
                _this.isFavorite = false;
                _this.favoriteIcon = 'star-outline';
            }
            else {
                _this.isFavorite = true;
                _this.favoriteIcon = 'star';
            }
        });
    };
    TrackDetailPage.prototype.toggleFavorites = function () {
        var addedToast = {
            message: 'Song added to Favorites',
            duration: 3000,
            position: 'bottom'
        };
        var removedToast = {
            message: 'Song remove to Favorites',
            duration: 3000,
            position: 'bottom'
        };
        if (!this.isFavorite) {
            this.toastCtrl.create(addedToast).then(function (toast) { return toast.present(); });
            this.isFavorite = true;
            this.favoriteIcon = 'star';
            this.storage.set(this.track.trackId, this.track);
            this.events.publish('songAdded', this.track);
        }
        else {
            this.toastCtrl.create(removedToast).then(function (toast) { return toast.present(); });
            this.storage.remove(this.track.trackId);
            this.isFavorite = false;
            this.favoriteIcon = 'star-outline';
            this.events.publish('songRemoved', this.track);
        }
    };
    TrackDetailPage.prototype.ionViewWillLeave = function () {
        this.musicCard.stopSong();
        // this.nativeMedia.destroy();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('musicCard'),
        __metadata("design:type", Object)
    ], TrackDetailPage.prototype, "musicCard", void 0);
    TrackDetailPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'track-detail-page',
            template: __webpack_require__(/*! ./track-detail.page.html */ "./src/app/pages/track-detail/track-detail.page.html")
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_2__["ItunesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"]])
    ], TrackDetailPage);
    return TrackDetailPage;
}());



/***/ }),

/***/ "./src/app/pipes/ms-to-mins/ms-to-mins.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pipes/ms-to-mins/ms-to-mins.module.ts ***!
  \*******************************************************/
/*! exports provided: TimePipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimePipeModule", function() { return TimePipeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ms_to_mins_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ms-to-mins.pipe */ "./src/app/pipes/ms-to-mins/ms-to-mins.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TimePipeModule = /** @class */ (function () {
    function TimePipeModule() {
    }
    TimePipeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_ms_to_mins_pipe__WEBPACK_IMPORTED_MODULE_1__["MsToMinsPipe"]],
            exports: [_ms_to_mins_pipe__WEBPACK_IMPORTED_MODULE_1__["MsToMinsPipe"]]
        })
    ], TimePipeModule);
    return TimePipeModule;
}());



/***/ }),

/***/ "./src/app/pipes/ms-to-mins/ms-to-mins.pipe.ts":
/*!*****************************************************!*\
  !*** ./src/app/pipes/ms-to-mins/ms-to-mins.pipe.ts ***!
  \*****************************************************/
/*! exports provided: MsToMinsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsToMinsPipe", function() { return MsToMinsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MsToMinsPipe = /** @class */ (function () {
    function MsToMinsPipe() {
    }
    MsToMinsPipe.prototype.transform = function (value) {
        return this.durationFromMsHelper(value);
    };
    MsToMinsPipe.prototype.pad2 = function (num) {
        if (num <= 99) {
            num = ('0' + num).slice(-2);
        }
        return num;
    };
    MsToMinsPipe.prototype.durationFromMsHelper = function (ms) {
        var x = ms / 1000;
        var seconds = this.pad2(Math.floor(x % 60));
        x /= 60;
        var minutes = this.pad2(Math.floor(x % 60));
        x /= 60;
        var hours = Math.floor(x % 24);
        var newHours = hours ? this.pad2(hours) + ':' : '';
        return newHours + minutes + ':' + seconds;
    };
    MsToMinsPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'msToMins'
        })
    ], MsToMinsPipe);
    return MsToMinsPipe;
}());



/***/ }),

/***/ "./src/app/providers/color-thief/color-thief.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/providers/color-thief/color-thief.service.ts ***!
  \**************************************************************/
/*! exports provided: ColorThiefService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorThiefService", function() { return ColorThiefService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ColorThiefService = /** @class */ (function () {
    function ColorThiefService() {
    }
    // Adaptation of ColorThief : http://lokeshdhakar.com/projects/color-thief/
    ColorThiefService.prototype.getPalette = function (sourceImage, colorCount, quality) {
        if (typeof colorCount === 'undefined' ||
            colorCount < 2 ||
            colorCount > 256) {
            colorCount = 10;
        }
        if (typeof quality === 'undefined' || quality < 1) {
            quality = 10;
        }
        // Create custom CanvasImage object
        var image = new CanvasImage(sourceImage);
        var imageData = image.getImageData();
        var pixels = imageData.data;
        var pixelCount = image.getPixelCount();
        // Store the RGB values in an array format suitable for quantize function
        var pixelArray = [];
        for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
            offset = i * 4;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];
            // If pixel is mostly opaque and not white
            if (a >= 125) {
                if (!(r > 250 && g > 250 && b > 250)) {
                    pixelArray.push([r, g, b]);
                }
            }
        }
        // Send array to quantize function which clusters values
        // using median cut algorithm
        var cmap = MMCQ.quantize(pixelArray, colorCount);
        var palette = cmap ? cmap.palette() : null;
        // Clean up
        image.removeCanvas();
        return palette;
    };
    ColorThiefService.prototype.getColor = function (sourceImage, quality) {
        if (quality === void 0) { quality = 10; }
        var palette = this.getPalette(sourceImage, 5, quality);
        var dominantColor = palette[0];
        return dominantColor;
    };
    ColorThiefService.prototype.getColorFromUrl = function (imageUrl, quality) {
        var _this = this;
        if (quality === void 0) { quality = 10; }
        return new Promise(function (resolve, reject) {
            var sourceImage = new Image();
            sourceImage.crossOrigin = "Anonymous";
            var dominantColor, palette;
            sourceImage.addEventListener('load', function () {
                palette = _this.getPalette(sourceImage, 5, quality);
                dominantColor = palette[0];
                resolve({ dominantColor: dominantColor, imageUrl: imageUrl });
            });
            sourceImage.src = imageUrl;
            sourceImage.addEventListener('error', reject.bind(_this));
        });
    };
    ;
    ColorThiefService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ColorThiefService);
    return ColorThiefService;
}());

var pv = {
    map: function (array, f) {
        var o = {};
        return f
            ? array.map(function (d, i) {
                o['index'] = i;
                return f.call(o, d);
            })
            : array.slice();
    },
    naturalOrder: function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    },
    sum: function (array, f) {
        var o = {};
        return array.reduce(f
            ? function (p, d, i) {
                o['index'] = i;
                return p + f.call(o, d);
            }
            : function (p, d) { return p + d; }, 0);
    },
    max: function (array, f) {
        return Math.max.apply(null, f ? pv.map(array, f) : array);
    }
};
var MMCQ = (function () {
    // private constants
    var sigbits = 5;
    var rshift = 8 - sigbits;
    var maxIterations = 1000;
    var fractByPopulations = 0.75;
    // get reduced-space color index for a pixel
    function getColorIndex(r, g, b) {
        return (r << (2 * sigbits)) + (g << sigbits) + b;
    }
    // Simple priority queue
    var PQueue = /** @class */ (function () {
        function PQueue(comparator) {
            this.comparator = comparator;
            this.contents = [];
            this.sorted = false;
        }
        PQueue.prototype.sort = function () {
            this.contents.sort(this.comparator);
            this.sorted = true;
        };
        PQueue.prototype.push = function (o) {
            this.contents.push(o);
            this.sorted = false;
        };
        PQueue.prototype.peek = function (index) {
            if (!this.sorted)
                this.sort();
            if (index === undefined)
                index = this.contents.length - 1;
            return this.contents[index];
        };
        PQueue.prototype.pop = function () {
            if (!this.sorted)
                this.sort();
            return this.contents.pop();
        };
        PQueue.prototype.size = function () {
            return this.contents.length;
        };
        PQueue.prototype.map = function (f) {
            return this.contents.map(f);
        };
        PQueue.prototype.debug = function () {
            if (!this.sorted)
                this.sort();
            return this.contents;
        };
        return PQueue;
    }());
    // 3d color space box
    var VBox = /** @class */ (function () {
        function VBox(r1, r2, g1, g2, b1, b2, histo) {
            this.r1 = r1;
            this.r2 = r2;
            this.g1 = g1;
            this.g2 = g2;
            this.b1 = b1;
            this.b2 = b2;
            this.histo = histo;
        }
        VBox.prototype.volume = function (force) {
            if (!this._volume || force) {
                this._volume =
                    (this.r2 - this.r1 + 1) *
                        (this.g2 - this.g1 + 1) *
                        (this.b2 - this.b1 + 1);
            }
            return this._volume;
        };
        VBox.prototype.count = function (force) {
            if (!this._count_set || force) {
                var npix = 0;
                var i = void 0;
                var j = void 0;
                var k = void 0;
                for (i = this.r1; i <= this.r2; i++) {
                    for (j = this.g1; j <= this.g2; j++) {
                        for (k = this.b1; k <= this.b2; k++) {
                            var index = getColorIndex(i, j, k);
                            npix += this.histo[index] || 0;
                        }
                    }
                }
                this._count = npix;
                this._count_set = true;
            }
            return this._count;
        };
        VBox.prototype.copy = function () {
            return new VBox(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo);
        };
        VBox.prototype.avg = function (force) {
            if (!this._avg || force) {
                var ntot = 0;
                var mult = 1 << (8 - sigbits);
                var rsum = 0;
                var gsum = 0;
                var bsum = 0;
                var hval = void 0;
                var i = void 0;
                var j = void 0;
                var k = void 0;
                var histoindex = void 0;
                for (i = this.r1; i <= this.r2; i++) {
                    for (j = this.g1; j <= this.g2; j++) {
                        for (k = this.b1; k <= this.b2; k++) {
                            histoindex = getColorIndex(i, j, k);
                            hval = this.histo[histoindex] || 0;
                            ntot += hval;
                            rsum += hval * (i + 0.5) * mult;
                            gsum += hval * (j + 0.5) * mult;
                            bsum += hval * (k + 0.5) * mult;
                        }
                    }
                }
                if (ntot) {
                    this._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)];
                }
                else {
                    console.log('empty box');
                    this._avg = [
                        ~~(mult * (this.r1 + this.r2 + 1) / 2),
                        ~~(mult * (this.g1 + this.g2 + 1) / 2),
                        ~~(mult * (this.b1 + this.b2 + 1) / 2)
                    ];
                }
            }
            return this._avg;
        };
        VBox.prototype.contains = function (pixel) {
            var rval = pixel[0] >> rshift;
            var gval = pixel[1] >> rshift;
            var bval = pixel[2] >> rshift;
            return (rval >= this.r1 &&
                rval <= this.r2 &&
                gval >= this.g1 &&
                rval <= this.g2 &&
                bval >= this.b1 &&
                rval <= this.b2);
        };
        return VBox;
    }());
    // Color map
    var CMap = /** @class */ (function () {
        function CMap() {
            this.vboxes = new PQueue(function (a, b) {
                return pv.naturalOrder(a.vbox.count() * a.vbox.volume(), b.vbox.count() * b.vbox.volume());
            });
        }
        CMap.prototype.push = function (vbox) {
            this.vboxes.push({
                vbox: vbox,
                color: vbox.avg()
            });
        };
        CMap.prototype.palette = function () {
            return this.vboxes.map(function (vb) { return vb.color; });
        };
        CMap.prototype.size = function () {
            return this.vboxes.size();
        };
        CMap.prototype.map = function (color) {
            var vboxes = this.vboxes;
            for (var i = 0; i < vboxes.size(); i++) {
                if (vboxes.peek(i).vbox.contains(color)) {
                    return vboxes.peek(i).color;
                }
            }
            return this.nearest(color);
        };
        CMap.prototype.nearest = function (color) {
            var vboxes = this.vboxes;
            var d1;
            var d2;
            var pColor;
            for (var i = 0; i < vboxes.size(); i++) {
                d2 = Math.sqrt(Math.pow((color[0] - vboxes.peek(i).color[0]), 2) +
                    Math.pow((color[1] - vboxes.peek(i).color[1]), 2) +
                    Math.pow((color[1] - vboxes.peek(i).color[1]), 2));
                if (d2 < d1 || d1 === undefined) {
                    d1 = d2;
                    pColor = vboxes.peek(i).color;
                }
            }
            return pColor;
        };
        CMap.prototype.forcebw = function () {
            // XXX: won't  work yet
            var vboxes = this.vboxes;
            vboxes.sort(function (a, b) { return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color)); });
            // force darkest color to black if everything < 5
            var lowest = vboxes[0].color;
            if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
                vboxes[0].color = [0, 0, 0];
            // force lightest color to white if everything > 251
            var idx = vboxes.length - 1;
            var highest = vboxes[idx].color;
            if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
                vboxes[idx].color = [255, 255, 255];
        };
        return CMap;
    }());
    // histo (1-d array, giving the number of pixels in
    // each quantized region of color space), or null on error
    function getHisto(pixels) {
        var histosize = 1 << (3 * sigbits);
        var histo = new Array(histosize);
        var index;
        var rval;
        var gval;
        var bval;
        pixels.forEach(function (pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            index = getColorIndex(rval, gval, bval);
            histo[index] = (histo[index] || 0) + 1;
        });
        return histo;
    }
    function vboxFromPixels(pixels, histo) {
        var rmin = 1000000;
        var rmax = 0;
        var gmin = 1000000;
        var gmax = 0;
        var bmin = 1000000;
        var bmax = 0;
        var rval;
        var gval;
        var bval;
        // find min/max
        pixels.forEach(function (pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            if (rval < rmin)
                rmin = rval;
            else if (rval > rmax)
                rmax = rval;
            if (gval < gmin)
                gmin = gval;
            else if (gval > gmax)
                gmax = gval;
            if (bval < bmin)
                bmin = bval;
            else if (bval > bmax)
                bmax = bval;
        });
        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
    }
    function medianCutApply(histo, vbox) {
        if (!vbox.count())
            return;
        var rw = vbox.r2 - vbox.r1 + 1;
        var gw = vbox.g2 - vbox.g1 + 1;
        var bw = vbox.b2 - vbox.b1 + 1;
        var maxw = pv.max([rw, gw, bw]);
        // only one pixel, no split
        if (vbox.count() == 1) {
            return [vbox.copy()];
        }
        /* Find the partial sum arrays along the selected axis. */
        var total = 0;
        var partialsum = [];
        var lookaheadsum = [];
        var i;
        var j;
        var k;
        var sum;
        var index;
        if (maxw == rw) {
            for (i = vbox.r1; i <= vbox.r2; i++) {
                sum = 0;
                for (j = vbox.g1; j <= vbox.g2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(i, j, k);
                        sum += histo[index] || 0;
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else if (maxw == gw) {
            for (i = vbox.g1; i <= vbox.g2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(j, i, k);
                        sum += histo[index] || 0;
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else {
            /* maxw == bw */
            for (i = vbox.b1; i <= vbox.b2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.g1; k <= vbox.g2; k++) {
                        index = getColorIndex(j, k, i);
                        sum += histo[index] || 0;
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        partialsum.forEach(function (d, i) {
            lookaheadsum[i] = total - d;
        });
        function doCut(color) {
            var dim1 = color + "1";
            var dim2 = color + "2";
            var left;
            var right;
            var vbox1;
            var vbox2;
            var d2;
            var count2 = 0;
            for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
                if (partialsum[i] > total / 2) {
                    vbox1 = vbox.copy();
                    vbox2 = vbox.copy();
                    left = i - vbox[dim1];
                    right = vbox[dim2] - i;
                    if (left <= right)
                        d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
                    else
                        d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
                    // avoid 0-count boxes
                    while (!partialsum[d2])
                        d2++;
                    count2 = lookaheadsum[d2];
                    while (!count2 && partialsum[d2 - 1])
                        count2 = lookaheadsum[--d2];
                    // set dimensions
                    vbox1[dim2] = d2;
                    vbox2[dim1] = vbox1[dim2] + 1;
                    return [vbox1, vbox2];
                }
            }
        }
        // determine the cut planes
        return maxw == rw ? doCut('r') : maxw == gw ? doCut('g') : doCut('b');
    }
    function quantize(pixels, maxcolors) {
        // short-circuit
        if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
            console.log('wrong number of maxcolors');
            return false;
        }
        // XXX: check color content and convert to grayscale if insufficient
        var histo = getHisto(pixels);
        // const histosize = 1 << (3 * sigbits);
        // check that we aren't below maxcolors already
        var nColors = 0;
        histo.forEach(function () {
            nColors++;
        });
        if (nColors <= maxcolors) {
            // XXX: generate the new colors from the histo and return
        }
        // get the beginning vbox from the colors
        var vbox = vboxFromPixels(pixels, histo);
        var pq = new PQueue(function (a, b) { return pv.naturalOrder(a.count(), b.count()); });
        pq.push(vbox);
        // inner function to do the iteration
        function iter(lh, target) {
            var ncolors = 1;
            var niters = 0;
            var vbox;
            while (niters < maxIterations) {
                vbox = lh.pop();
                if (!vbox.count()) {
                    /* just put it back */
                    lh.push(vbox);
                    niters++;
                    continue;
                }
                // do the cut
                var vboxes = medianCutApply(histo, vbox);
                var vbox1 = vboxes[0];
                var vbox2 = vboxes[1];
                if (!vbox1) {
                    console.log("vbox1 not defined; shouldn't happen!");
                    return;
                }
                lh.push(vbox1);
                if (vbox2) {
                    /* vbox2 can be null */
                    lh.push(vbox2);
                    ncolors++;
                }
                if (ncolors >= target)
                    return;
                if (niters++ > maxIterations) {
                    console.log('infinite loop; perhaps too few pixels!');
                    return;
                }
            }
        }
        // first set of colors, sorted by population
        iter(pq, fractByPopulations * maxcolors);
        // console.log(pq.size(), pq.debug().length, pq.debug().slice());
        // Re-sort by the product of pixel occupancy times the size in color space.
        var pq2 = new PQueue(function (a, b) {
            return pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume());
        });
        while (pq.size()) {
            pq2.push(pq.pop());
        }
        // next set - generate the median cuts using the (npix * vol) sorting.
        iter(pq2, maxcolors - pq2.size());
        // calculate the actual colors
        var cmap = new CMap();
        while (pq2.size()) {
            cmap.push(pq2.pop());
        }
        return cmap;
    }
    return {
        quantize: quantize
    };
})();
var CanvasImage = /** @class */ (function () {
    function CanvasImage(image) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.width = this.canvas.width = image.width;
        this.height = this.canvas.height = image.height;
        this.context.drawImage(image, 0, 0, this.width, this.height);
    }
    CanvasImage.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    CanvasImage.prototype.update = function (imageData) {
        this.context.putImageData(imageData, 0, 0);
    };
    CanvasImage.prototype.getPixelCount = function () {
        return this.width * this.height;
    };
    CanvasImage.prototype.getImageData = function () {
        return this.context.getImageData(0, 0, this.width, this.height);
    };
    CanvasImage.prototype.removeCanvas = function () {
        this.canvas.parentNode.removeChild(this.canvas);
    };
    return CanvasImage;
}());


/***/ }),

/***/ "./src/app/providers/itunes/itunes.service.ts":
/*!****************************************************!*\
  !*** ./src/app/providers/itunes/itunes.service.ts ***!
  \****************************************************/
/*! exports provided: ItunesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItunesService", function() { return ItunesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItunesService = /** @class */ (function () {
    function ItunesService(http) {
        this.http = http;
    }
    ItunesService.prototype.load = function (query) {
        return this.http
            .get("https://itunes.apple.com/search?term=" + encodeURIComponent(query) + "&media=music")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.results; }));
    };
    ItunesService.prototype.loadSong = function (songId) {
        return this.http
            .get("https://itunes.apple.com/lookup?id=" + songId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (error) { return error.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(500)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(5000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.results[0]; }));
    };
    ItunesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ItunesService);
    return ItunesService;
}());



/***/ }),

/***/ "./src/app/resolver/track-detail-resolver.ts":
/*!***************************************************!*\
  !*** ./src/app/resolver/track-detail-resolver.ts ***!
  \***************************************************/
/*! exports provided: TrackResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackResolver", function() { return TrackResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../providers/itunes/itunes.service */ "./src/app/providers/itunes/itunes.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TrackResolver = /** @class */ (function () {
    function TrackResolver(itunes) {
        this.itunes = itunes;
    }
    TrackResolver.prototype.resolve = function (route) {
        return this.itunes.loadSong(route.params.id);
    };
    TrackResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_1__["ItunesService"]])
    ], TrackResolver);
    return TrackResolver;
}());



/***/ })

}]);
//# sourceMappingURL=track-detail-track-detail-module.js.map