var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("chunk-b8cd7a4d.js", ["exports"], function (e) { window.Ionic.h; var n = 500, o = "cubic-bezier(0.36,0.66,0.04,1)", t = "opacity", r = "transform", a = "translateX", i = "0%", l = .8; function c(e, c, d) { var s = "rtl" === document.dir, u = s ? "-99.5%" : "99.5%", m = s ? "33%" : "-33%", f = d.enteringEl, b = d.leavingEl, E = new e; if (E.addElement(f).duration(d.duration || n).easing(d.easing || o).beforeRemoveClass("hide-page"), b && c) {
    var n_1 = new e;
    n_1.addElement(c).duringAddClass("show-decor"), E.add(n_1);
} var w = "back" === d.direction; if (f) {
    var n_2 = f.querySelector(":scope > ion-content"), o_1 = f.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), r_1 = f.querySelector(":scope > ion-header > ion-toolbar"), c_1 = new e;
    if (n_2 || r_1 || 0 !== o_1.length ? (c_1.addElement(n_2), c_1.addElement(o_1)) : c_1.addElement(f.querySelector(":scope > ion-page, :scope > ion-nav, :scope > ion-tabs")), E.add(c_1), w ? c_1.beforeClearStyles([t]).fromTo(a, m, i, !0).fromTo(t, l, 1, !0) : c_1.beforeClearStyles([t]).fromTo(a, u, i, !0), r_1) {
        var n_3 = new e;
        n_3.addElement(r_1), E.add(n_3);
        var o_2 = new e;
        o_2.addElement(r_1.querySelector("ion-title"));
        var l_1 = new e;
        l_1.addElement(r_1.querySelectorAll("ion-buttons,[menuToggle]"));
        var c_2 = new e;
        c_2.addElement(r_1.querySelector(".toolbar-background"));
        var d_1 = new e;
        if (d_1.addElement(r_1.querySelector("ion-back-button")), n_3.add(o_2).add(l_1).add(c_2).add(d_1), o_2.fromTo(t, .01, 1, !0), l_1.fromTo(t, .01, 1, !0), w)
            o_2.fromTo(a, m, i, !0), d_1.fromTo(t, .01, 1, !0);
        else {
            o_2.fromTo(a, u, i, !0), c_2.beforeClearStyles([t]).fromTo(t, .01, 1, !0), d_1.fromTo(t, .01, 1, !0);
            var l_2 = new e;
            l_2.addElement(r_1.querySelector("ion-back-button .button-text")).fromTo(a, s ? "-100px" : "100px", "0px"), n_3.add(l_2);
        }
    }
} if (b) {
    var n_4 = new e;
    n_4.addElement(b.querySelector(":scope > ion-content")), n_4.addElement(b.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")), E.add(n_4), w ? n_4.beforeClearStyles([t]).fromTo(a, i, s ? "-100%" : "100%") : n_4.fromTo(a, i, m, !0).fromTo(t, 1, l, !0);
    var o_3 = b.querySelector(":scope > ion-header > ion-toolbar");
    if (o_3) {
        var n_5 = new e;
        n_5.addElement(o_3);
        var l_3 = new e;
        l_3.addElement(o_3.querySelector("ion-title"));
        var c_3 = new e;
        c_3.addElement(o_3.querySelectorAll("ion-buttons,[menuToggle]"));
        var d_2 = new e;
        d_2.addElement(o_3.querySelector(".toolbar-background"));
        var u_1 = new e;
        if (u_1.addElement(o_3.querySelector("ion-back-button")), n_5.add(l_3).add(c_3).add(u_1).add(d_2), E.add(n_5), u_1.fromTo(t, .99, 0, !0), l_3.fromTo(t, .99, 0, !0), c_3.fromTo(t, .99, 0, !0), w) {
            l_3.fromTo(a, i, s ? "-100%" : "100%"), d_2.beforeClearStyles([t]).fromTo(t, 1, .01, !0);
            var r_2 = new e;
            r_2.addElement(o_3.querySelector("ion-back-button .button-text")), r_2.fromTo(a, i, (s ? -124 : 124) + "px"), n_5.add(r_2);
        }
        else
            l_3.fromTo(a, i, m).afterClearStyles([r]), u_1.afterClearStyles([t]), l_3.afterClearStyles([t]), c_3.afterClearStyles([t]);
    }
} return Promise.resolve(E); } var d = "translateY", s = "40px", u = "0px"; function m(e, n, o) { var t = o.enteringEl, r = o.leavingEl, a = f(t), i = new e; i.addElement(a).beforeRemoveClass("hide-page"); var l = "back" === o.direction; if (t) {
    l ? i.duration(o.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : i.duration(o.duration || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo(d, s, u, !0).fromTo("opacity", .01, 1, !0);
    var n_6 = a.querySelector("ion-toolbar");
    if (n_6) {
        var o_4 = new e;
        o_4.addElement(n_6), i.add(o_4);
    }
} if (r && l) {
    i.duration(o.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    var n_7 = new e;
    n_7.addElement(f(r)).fromTo(d, u, s).fromTo("opacity", 1, 0), i.add(n_7);
} return Promise.resolve(i); } function f(e) { if (e.classList.contains("ion-page"))
    return e; return e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || e; } function b(e, n) {
    return __awaiter(this, void 0, void 0, function () { var o; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                o = (null != e.deepWait ? e.deepWait : n) ? [p(e.enteringEl), p(e.leavingEl)] : [g(e.enteringEl), g(e.leavingEl)];
                return [4 /*yield*/, Promise.all(o)];
            case 1:
                _a.sent();
                return [4 /*yield*/, function (e, n) {
                        return __awaiter(this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = e;
                                    if (!_a) return [3 /*break*/, 2];
                                    return [4 /*yield*/, e(n)];
                                case 1:
                                    _a = (_b.sent());
                                    _b.label = 2;
                                case 2:
                                    _a;
                                    return [2 /*return*/];
                            }
                        }); });
                    }(e.viewIsReady, e.enteringEl)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} function E(e, n, o) { y(e, o, "ionViewWillLeave"), y(e, n, "ionViewWillEnter"); } function w(e, n, o) { y(e, n, "ionViewDidEnter"), y(e, o, "ionViewDidLeave"); } function y(e, n, o) { if (n) {
    var t_1 = new (0, e.CustomEvent)(o, { bubbles: !1, cancelable: !1 });
    n.dispatchEvent(t_1);
} } function g(e) { return e && e.componentOnReady ? e.componentOnReady() : Promise.resolve(); } function p(e) { return e ? customElements.get ? customElements.get(e.tagName.toLowerCase()) ? S(e) : Promise.all(Array.from(e.children).map(p)) : S(e) : Promise.resolve(); } function S(e) { return e.componentOnReady ? e.componentOnReady() : Promise.all(Array.from(e.children).map(p)); } e.lifecycle = y, e.transition = function (e) { !function (e) { var n = e.enteringEl, o = e.leavingEl; (function (e, n, o) { e && (e.style.zIndex = "back" === o ? "99" : "101"), n && (n.style.zIndex = "100"); })(n, o, e.direction), e.showGoBack ? n.classList.add("can-go-back") : n.classList.remove("can-go-back"), n.hidden = !1, o && (o.hidden = !1); }(e); var n = function (e) { if (e.leavingEl && !1 !== e.animated && 0 !== e.duration)
    return e.animationBuilder ? e.animationBuilder : "ios" === e.mode ? c : m; }(e); return n ? function (e, n) {
    return __awaiter(this, void 0, void 0, function () { var o; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, b(n, !0)];
            case 1:
                _a.sent();
                return [4 /*yield*/, n.animationCtrl.create(e, n.baseEl, n)];
            case 2:
                o = _a.sent();
                E(n.window, n.enteringEl, n.leavingEl);
                return [4 /*yield*/, function (e, n) { var o = n.progressCallback, t = new Promise(function (n) { return e.onFinish(n); }); return o ? (e.progressStart(), o(e)) : e.play(), t; }(o, n)];
            case 3: return [2 /*return*/, (_a.sent(), o.hasCompleted && w(n.window, n.enteringEl, n.leavingEl), o)];
        }
    }); });
}(n, e) : function (e) {
    return __awaiter(this, void 0, void 0, function () { var n, o; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                n = e.enteringEl, o = e.leavingEl;
                n && n.classList.remove("hide-page"), o && o.classList.remove("hide-page");
                return [4 /*yield*/, b(e, !1)];
            case 1: return [2 /*return*/, (_a.sent(), E(e.window, n, o), w(e.window, n, o), null)];
        }
    }); });
}(e); }; });
