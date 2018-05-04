(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-menu-menu-module"],{

/***/ "./src/app/components/menulist/menulist.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/menulist/menulist.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <ion-list>\n    <ion-menu-toggle auto-hide=\"false\" *ngFor=\"let favorite of favorites\">\n      <ion-item (click)=\"goToDetail(favorite)\">\n        <ion-label>\n          <h2>{{favorite.trackName}}</h2>\n          <h3>by {{favorite.artistName}}</h3>\n        </ion-label>\n      </ion-item>\n    </ion-menu-toggle>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/menulist/menulist.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/components/menulist/menulist.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: relative;\n  display: flex;\n  flex: 1;\n  width: 100%;\n  contain: layout size style;\n  margin: 0;\n  padding: 0; }\n"

/***/ }),

/***/ "./src/app/components/menulist/menulist.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/menulist/menulist.component.ts ***!
  \***********************************************************/
/*! exports provided: MenulistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenulistComponent", function() { return MenulistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/dist/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenulistComponent = /** @class */ (function () {
    function MenulistComponent(router, event, storage, menuCtrl) {
        this.router = router;
        this.event = event;
        this.storage = storage;
        this.menuCtrl = menuCtrl;
        this.favorites = [];
    }
    MenulistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getKeys();
        this.event.subscribe('songAdded', function (e) {
            _this.favorites.push(e);
        });
        this.event.subscribe('songRemoved', function (e) {
            _this.favorites.splice(_this.favorites.indexOf(e), 1);
        });
    };
    MenulistComponent.prototype.getKeys = function () {
        var _this = this;
        this.storage.forEach(function (entry) {
            if (typeof (entry) !== 'boolean') {
                _this.favorites.push(entry);
            }
        });
    };
    MenulistComponent.prototype.goToDetail = function (favorite) {
        var _this = this;
        this.menuCtrl.close().then(function () {
            _this.router.navigateByUrl("/app/detail/" + favorite.trackId);
        });
    };
    MenulistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'menu-list',
            template: __webpack_require__(/*! ./menulist.component.html */ "./src/app/components/menulist/menulist.component.html"),
            styles: [__webpack_require__(/*! ./menulist.component.scss */ "./src/app/components/menulist/menulist.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"]])
    ], MenulistComponent);
    return MenulistComponent;
}());



/***/ }),

/***/ "./src/app/components/menulist/menulist.module.ts":
/*!********************************************************!*\
  !*** ./src/app/components/menulist/menulist.module.ts ***!
  \********************************************************/
/*! exports provided: MenulistModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenulistModule", function() { return MenulistModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _menulist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menulist.component */ "./src/app/components/menulist/menulist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MenulistModule = /** @class */ (function () {
    function MenulistModule() {
    }
    MenulistModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_menulist_component__WEBPACK_IMPORTED_MODULE_3__["MenulistComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"]],
            providers: [],
            exports: [_menulist_component__WEBPACK_IMPORTED_MODULE_3__["MenulistComponent"]]
        })
    ], MenulistModule);
    return MenulistModule;
}());



/***/ }),

/***/ "./src/app/pages/menu/menu.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/menu/menu.module.ts ***!
  \*******************************************/
/*! exports provided: MenuModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuModule", function() { return MenuModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _menu_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu.page */ "./src/app/pages/menu/menu.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _components_menulist_menulist_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/menulist/menulist.module */ "./src/app/components/menulist/menulist.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _components_menulist_menulist_module__WEBPACK_IMPORTED_MODULE_5__["MenulistModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _menu_page__WEBPACK_IMPORTED_MODULE_2__["MenuPage"],
                        children: [
                            {
                                path: 'search',
                                loadChildren: '../search/search.module#SearchModule'
                            },
                            {
                                path: 'detail/:id',
                                loadChildren: '../track-detail/track-detail.module#TrackDetailModule',
                            },
                            { path: '', redirectTo: 'search', pathMatch: 'full' }
                        ]
                    }
                ])
            ],
            declarations: [_menu_page__WEBPACK_IMPORTED_MODULE_2__["MenuPage"]],
        })
    ], MenuModule);
    return MenuModule;
}());



/***/ }),

/***/ "./src/app/pages/menu/menu.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/menu/menu.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-split-pane>\n  <ion-menu>\n    <ion-header>\n      <ion-toolbar color=\"success\">\n        <ion-title>Favorites</ion-title>\n      </ion-toolbar>\n    </ion-header>\n        <menu-list></menu-list>\n        \n        <ion-footer>\n          <ion-toolbar transparent>\n            <ion-buttons slot=\"start\">\n              <ion-button round=\"true\" (click)=\"toggleDark()\">\n                <ion-icon slot=\"icon-only\" name=\"moon\"></ion-icon>\n              </ion-button>\n            </ion-buttons>\n          </ion-toolbar>\n        </ion-footer>\n  </ion-menu>\n  <ion-router-outlet main stack></ion-router-outlet>\n</ion-split-pane>\n"

/***/ }),

/***/ "./src/app/pages/menu/menu.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/menu/menu.page.ts ***!
  \*****************************************/
/*! exports provided: MenuPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPage", function() { return MenuPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/dist/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuPage = /** @class */ (function () {
    function MenuPage(storage) {
        this.storage = storage;
    }
    MenuPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('is_dark')
            .then(function (isDark) {
            _this.localIsDark = isDark;
            if (!!isDark) {
                document.body.classList.toggle('dark');
            }
        });
    };
    MenuPage.prototype.toggleDark = function () {
        document.body.classList.toggle('dark');
        this.storage.set('is_dark', !this.localIsDark);
        this.localIsDark = !this.localIsDark;
    };
    MenuPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'menu-page',
            template: __webpack_require__(/*! ./menu.page.html */ "./src/app/pages/menu/menu.page.html")
        }),
        __metadata("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"]])
    ], MenuPage);
    return MenuPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-menu-menu-module.js.map