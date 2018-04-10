/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("./chunk1.js", ["exports"], function (n) { function t(n) { return n ? Array.isArray(n) ? n : n.split(" ").filter(function (n) { return "" !== n.trim(); }) : []; } window.Ionic.h, n.createThemedClasses = function (n, t, e) { var r = {}; return e.split(" ").forEach(function (e) { return r[e] = !0, n && (r[e + "-" + n] = !0, t && (r[e + "-" + t] = !0, r[e + "-" + n + "-" + t] = !0)), r; }), r; }, n.getClassMap = function (n) { var e = {}; return t(n).forEach(function (n) { return e[n] = !0; }), e; }, n.openURL = function (n, t, e) {
    if (e === void 0) { e = !1; }
    if (n && "#" !== n[0] && -1 === n.indexOf("://")) {
        var r_1 = document.querySelector("ion-router");
        if (r_1)
            return t && t.preventDefault(), r_1.componentOnReady().then(function () { return r_1.push(n, e ? -1 : 1); });
    }
    return Promise.resolve();
}, n.getButtonClassMap = function (n, t) { return n ? (_a = {}, _a[n] = !0, _a[n + "-" + t] = !0, _a) : {}; var _a; }, n.getElementClassMap = function (n) { var t = {}; for (var e = 0; e < n.length; e++)
    t[n[e]] = !0; return t; }, n.getClassList = t; });
