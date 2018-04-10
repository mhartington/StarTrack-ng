(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search-search-module"],{

/***/ "./src/app/pages/search/search.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/search/search.module.ts ***!
  \***********************************************/
/*! exports provided: SearchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchModule", function() { return SearchModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _pipes_ms_to_mins_ms_to_mins_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pipes/ms-to-mins/ms-to-mins.module */ "./src/app/pipes/ms-to-mins/ms-to-mins.module.ts");
/* harmony import */ var _providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/itunes/itunes.service */ "./src/app/providers/itunes/itunes.service.ts");
/* harmony import */ var _search_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search.page */ "./src/app/pages/search/search.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var SearchModule = /** @class */ (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild([{ path: '', component: _search_page__WEBPACK_IMPORTED_MODULE_5__["SearchPage"] }]),
                _pipes_ms_to_mins_ms_to_mins_module__WEBPACK_IMPORTED_MODULE_3__["TimePipeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ],
            declarations: [_search_page__WEBPACK_IMPORTED_MODULE_5__["SearchPage"]],
            providers: [_providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_4__["ItunesService"]],
        })
    ], SearchModule);
    return SearchModule;
}());



/***/ }),

/***/ "./src/app/pages/search/search.page.html":
/*!***********************************************!*\
  !*** ./src/app/pages/search/search.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"success\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Search</ion-title>\n  </ion-toolbar>\n  <ion-toolbar color=\"success\">\n    <ion-searchbar placeholder=\"\" [formControl]=\"searchInput\"  (ionCancel)=\"searchCleared($event)\" showCancelButton=\"true\">\n    </ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n<!--  -->\n<ion-content>\n    <ion-grid fixed no-padding>\n      <!-- No Search term? -->\n      <div *ngIf=\"!searchInput.value\" padding>\n        <h1>Trending Bands</h1>\n        <ion-item *ngFor=\" let trending of ['Pink Floyd', 'August Burns Red', 'Alkaline Trio']\" (click)=\"setSearch(trending)\">\n          {{trending}}\n        </ion-item>\n      </div>\n      <!-- Welp there's an error -->\n      <div *ngIf=\"isError\" text-center padding>\n        <ion-icon color=\"success\" name=\"warning\" size=\"large\"></ion-icon>\n        <h1>Uh-oh...</h1>\n        <h2>It's not me, it's you!</h2>\n        <h2>It appears there is a connection problem</h2>\n      </div>\n      <!-- Alright, we're searching -->\n      <div padding text-center class=\"stauts-spinner\" *ngIf=\"showSpinner\">\n        <ion-spinner></ion-spinner>\n      </div>\n      <!-- We got some songs! -->\n      <ion-item *ngFor=\"let track of listing\" detail-none [href]=\"'/app/detail/' + track.trackId\">\n        <ion-thumbnail slot=\"start\">\n          <img [src]=\"track.artworkUrl100\" alt=\"\">\n        </ion-thumbnail>\n        <ion-label>\n          <h2>{{track.trackName}}</h2>\n          <h3>{{track.artistName}}</h3>\n          <p>{{track.collectionName}}</p>\n        </ion-label>\n        <ion-note slot=\"end\">\n          {{track.trackTimeMillis | msToMins}}\n        </ion-note>\n      </ion-item>\n    </ion-grid>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/search/search.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/search/search.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/search/search.page.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/search/search.page.ts ***!
  \*********************************************/
/*! exports provided: SearchPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPage", function() { return SearchPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/itunes/itunes.service */ "./src/app/providers/itunes/itunes.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { SplashScreen } from '@ionic-native/splash-screen';


var SearchPage = /** @class */ (function () {
    function SearchPage(itunes, router) {
        this.itunes = itunes;
        this.router = router;
        this.hasSearch = false;
        this.listing = [];
        this.items = Array.from(Array(50).keys());
        this.isError = false;
        this.showSpinner = false;
        this.searchInput = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('');
        this.showOverlay = false;
    }
    SearchPage.prototype.searchFocused = function (e) {
        this.hasSearch = true;
        if (!this.searchInput.value) {
            this.isError = false;
        }
    };
    SearchPage.prototype.searchCleared = function (e) {
        this.hasSearch = false;
        this.isError = false;
        this.listing = [];
    };
    SearchPage.prototype.searchBlured = function (e) {
        this.isError = false;
    };
    SearchPage.prototype.setSearch = function (val) {
        this.isError = false;
        this.hasSearch = true;
        this.searchInput.setValue(val);
    };
    SearchPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log('search loaded');
        this.searchInput.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (term) {
            if (term) {
                _this.showSpinner = true;
                _this.isError = false;
                return term;
            }
            else {
                _this.isError = false;
                _this.listing = [];
                _this.showSpinner = false;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (term) { return _this.itunes.load(term); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
            _this.showOverlay = false;
            _this.showSpinner = false;
        }))
            .subscribe(function (results) { return _this.listing = results; }, function (err) {
            _this.showOverlay = false;
            _this.showSpinner = false;
            _this.isError = true;
        });
    };
    SearchPage.prototype.detail = function (track) {
        this.router.navigate(["/app/detail", track.trackId]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('list'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SearchPage.prototype, "list", void 0);
    SearchPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'search-page',
            template: __webpack_require__(/*! ./search.page.html */ "./src/app/pages/search/search.page.html"),
            styles: [__webpack_require__(/*! ./search.page.scss */ "./src/app/pages/search/search.page.scss")]
        }),
        __metadata("design:paramtypes", [_providers_itunes_itunes_service__WEBPACK_IMPORTED_MODULE_2__["ItunesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SearchPage);
    return SearchPage;
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



/***/ })

}]);
//# sourceMappingURL=search-search-module.js.map