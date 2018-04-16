/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("./chunk3.js", ["exports"], function (n) { function t(n, t) { var e = n._original || n; return { _original: n, emit: function (n, t) {
        if (t === void 0) { t = 0; }
        var e;
        return function () {
            var r = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                r[_i] = arguments[_i];
            }
            clearTimeout(e), e = setTimeout.apply(void 0, [n, t].concat(r));
        };
    }(e.emit.bind(e), t) }; } window.Ionic.h, n.now = function (n) { return n.timeStamp || Date.now(); }, n.pointerCoord = function (n) { if (n) {
    var t_1 = n.changedTouches;
    if (t_1 && t_1.length > 0) {
        var n_1 = t_1[0];
        return { x: n_1.clientX, y: n_1.clientY };
    }
    if (void 0 !== n.pageX)
        return { x: n.pageX, y: n.pageY };
} return { x: 0, y: 0 }; }, n.deferEvent = function (n) { return t(n, 0); }, n.clamp = function (n, t, e) { return Math.max(n, Math.min(t, e)); }, n.assert = function (n, t) { if (!n) {
    var n_2 = "ASSERT: " + t;
    throw console.error(n_2), new Error(n_2);
} }, n.debounceEvent = t, n.isRightSide = function (n) { var t = "rtl" === document.dir; switch (n) {
    case "start": return t;
    case "end": return !t;
    default: throw new Error("\"" + n + "\" is not a valid value for [side]. Use \"start\" or \"end\" instead.");
} }; });
