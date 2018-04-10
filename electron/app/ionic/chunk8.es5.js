/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("./chunk8.js", ["exports"], function (e) { window.Ionic.h; var o = "opacity"; function t(e) { if (e.classList.contains("ion-page"))
    return e; return e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || e; } e.default = function (e, t, n) { var r = "rtl" === document.dir, a = r ? "-99.5%" : "99.5%", l = r ? "33%" : "-33%", d = n.enteringEl, c = n.leavingEl, i = new e; if (i.addElement(d).duration(n.duration || 500).easing(n.easing || "cubic-bezier(0.36,0.66,0.04,1)").beforeRemoveClass("hide-page"), c && t) {
    var o_1 = new e;
    o_1.addElement(t).duringAddClass("show-decor"), i.add(o_1);
} var s = "back" === n.direction; if (d) {
    var t_1 = d.querySelector(":scope > ion-content"), n_1 = d.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), c_1 = d.querySelector(":scope > ion-header > ion-toolbar"), u = new e;
    if (t_1 || c_1 || 0 !== n_1.length ? (u.addElement(t_1), u.addElement(n_1)) : u.addElement(d.querySelector(":scope > ion-page, :scope > ion-nav, :scope > ion-tabs")), i.add(u), s ? u.beforeClearStyles([o]).fromTo("translateX", l, "0%", !0).fromTo(o, .8, 1, !0) : u.beforeClearStyles([o]).fromTo("translateX", a, "0%", !0), c_1) {
        var t_2 = new e;
        t_2.addElement(c_1), i.add(t_2);
        var n_2 = new e;
        n_2.addElement(c_1.querySelector("ion-title"));
        var d_1 = new e;
        d_1.addElement(c_1.querySelectorAll("ion-buttons,[menuToggle]"));
        var u_1 = new e;
        u_1.addElement(c_1.querySelector(".toolbar-background"));
        var f = new e;
        if (f.addElement(c_1.querySelector("ion-back-button")), t_2.add(n_2).add(d_1).add(u_1).add(f), n_2.fromTo(o, .01, 1, !0), d_1.fromTo(o, .01, 1, !0), s)
            n_2.fromTo("translateX", l, "0%", !0), f.fromTo(o, .01, 1, !0);
        else {
            n_2.fromTo("translateX", a, "0%", !0), u_1.beforeClearStyles([o]).fromTo(o, .01, 1, !0), f.fromTo(o, .01, 1, !0);
            var l_1 = new e;
            l_1.addElement(c_1.querySelector("ion-back-button .button-text")).fromTo("translateX", r ? "-100px" : "100px", "0px"), t_2.add(l_1);
        }
    }
} if (c) {
    var t_3 = new e;
    t_3.addElement(c.querySelector(":scope > ion-content")), t_3.addElement(c.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")), i.add(t_3), s ? t_3.beforeClearStyles([o]).fromTo("translateX", "0%", r ? "-100%" : "100%") : t_3.fromTo("translateX", "0%", l, !0).fromTo(o, 1, .8, !0);
    var n_3 = c.querySelector(":scope > ion-header > ion-toolbar");
    if (n_3) {
        var t_4 = new e;
        t_4.addElement(n_3);
        var a_1 = new e;
        a_1.addElement(n_3.querySelector("ion-title"));
        var d_2 = new e;
        d_2.addElement(n_3.querySelectorAll("ion-buttons,[menuToggle]"));
        var c_2 = new e;
        c_2.addElement(n_3.querySelector(".toolbar-background"));
        var u = new e;
        if (u.addElement(n_3.querySelector("ion-back-button")), t_4.add(a_1).add(d_2).add(u).add(c_2), i.add(t_4), u.fromTo(o, .99, 0, !0), a_1.fromTo(o, .99, 0, !0), d_2.fromTo(o, .99, 0, !0), s) {
            a_1.fromTo("translateX", "0%", r ? "-100%" : "100%"), c_2.beforeClearStyles([o]).fromTo(o, 1, .01, !0);
            var l_2 = new e;
            l_2.addElement(n_3.querySelector("ion-back-button .button-text")), l_2.fromTo("translateX", "0%", (r ? -124 : 124) + "px"), t_4.add(l_2);
        }
        else
            a_1.fromTo("translateX", "0%", l).afterClearStyles(["transform"]), u.afterClearStyles([o]), a_1.afterClearStyles([o]), d_2.afterClearStyles([o]);
    }
} return Promise.resolve(i); }, e.default$1 = function (e, o, n) { var r = n.enteringEl, a = n.leavingEl, l = t(r), d = new e; d.addElement(l).beforeRemoveClass("hide-page"); var c = "back" === n.direction; if (r) {
    c ? d.duration(n.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : d.duration(n.duration || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("translateY", "40px", "0px", !0).fromTo("opacity", .01, 1, !0);
    var o_2 = l.querySelector("ion-toolbar");
    if (o_2) {
        var t_5 = new e;
        t_5.addElement(o_2), d.add(t_5);
    }
} if (a && c) {
    d.duration(n.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    var o_3 = new e;
    o_3.addElement(t(a)).fromTo("translateY", "0px", "40px").fromTo("opacity", 1, 0), d.add(o_3);
} return Promise.resolve(d); }; });
