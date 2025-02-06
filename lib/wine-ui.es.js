import { defineComponent as _, computed as y, createElementBlock as d, openBlock as l, normalizeStyle as $, normalizeClass as h, renderSlot as b, createCommentVNode as f, Fragment as S, renderList as N, withModifiers as V, createTextVNode as I, toDisplayString as k, onMounted as E, onUnmounted as M, createElementVNode as p, createBlock as w, unref as g, ref as v, Teleport as B, createVNode as P, TransitionGroup as x, withCtx as z } from "vue";
function L(n) {
  const c = async () => {
    await Promise.resolve(n("before-open") !== !1) && (n("update:modelValue", !0), n("opened"));
  }, t = async (o) => {
    await Promise.resolve(
      n("before-close", o) !== !1
    ) && (n("update:modelValue", !1), n("closed", o));
  };
  return {
    handleOpen: c,
    handleClose: t,
    toggleMenu: async (o) => {
      o ? await t("menu") : await c();
    },
    handleItemClick: async (o) => {
      var a;
      await Promise.resolve(
        n("before-select", o) !== !1
      ) && (n("select", o), n("selected", o), (a = o.onClick) == null || a.call(o), window.innerWidth <= 768 && await t("menu"));
    }
  };
}
const O = ["href", "onClick"], A = /* @__PURE__ */ _({
  __name: "NavMenu",
  props: {
    items: { default: () => [] },
    position: { default: "center" },
    active: { type: Boolean, default: !1 },
    navGap: { default: "30px" },
    mobileNavGap: { default: "15px" }
  },
  emits: ["select"],
  setup(n, { emit: c }) {
    const t = n, i = c, r = y(() => ({
      "--w-nav-gap": typeof t.navGap == "number" ? `${t.navGap}px` : t.navGap,
      "--w-mobile-nav-gap": typeof t.mobileNavGap == "number" ? `${t.mobileNavGap}px` : t.mobileNavGap
    })), o = y(() => ({
      "w-nav-menu-active": t.active,
      [`w-nav-menu-${t.position}`]: !0
    })), u = (a) => {
      var m;
      i("select", a), (m = a.onClick) == null || m.call(a);
    };
    return (a, m) => (l(), d("nav", {
      class: h(["w-nav-menu", o.value]),
      style: $(r.value)
    }, [
      b(a.$slots, "menu", {}, () => {
        var e;
        return [
          (e = a.items) != null && e.length ? (l(!0), d(S, { key: 0 }, N(a.items, (s) => (l(), d("a", {
            key: s.key,
            href: s.link || "#",
            class: "nav-item",
            onClick: V((T) => u(s), ["prevent"])
          }, [
            s.icon ? (l(), d("i", {
              key: 0,
              class: h(s.icon)
            }, null, 2)) : f("", !0),
            I(" " + k(s.label), 1)
          ], 8, O))), 128)) : f("", !0)
        ];
      }, !0)
    ], 6));
  }
}), C = (n, c) => {
  const t = n.__vccOpts || n;
  for (const [i, r] of c)
    t[i] = r;
  return t;
}, G = /* @__PURE__ */ C(A, [["__scopeId", "data-v-9796b0b1"]]), F = { class: "w-topbar-content" }, q = { class: "w-topbar-left" }, D = { class: "w-logo" }, U = ["src", "alt"], W = { key: 1 }, j = { class: "w-topbar-center" }, H = { class: "w-topbar-right" }, J = /* @__PURE__ */ _({
  __name: "Topbar",
  props: {
    modelValue: { type: Boolean, default: !1 },
    logo: { default: "" },
    title: { default: "Logo" },
    fixed: { type: Boolean, default: !0 },
    zIndex: { default: 1e3 },
    height: { default: "60px" },
    shadow: { type: Boolean, default: !0 },
    navPosition: { default: "center" },
    navGap: { default: "30px" },
    mobileNavGap: { default: "15px" },
    items: { default: () => [] }
  },
  emits: ["update:modelValue", "close", "select", "before-open", "before-close", "opened", "closed", "before-select", "selected"],
  setup(n, { emit: c }) {
    const t = n, i = c, { handleClose: r, toggleMenu: o, handleItemClick: u } = L(i), a = y(() => ({
      "--w-topbar-height": typeof t.height == "number" ? `${t.height}px` : t.height,
      "--w-topbar-z-index": t.zIndex,
      "--w-topbar-shadow": t.shadow ? "var(--w-shadow)" : "none"
    })), m = y(() => t.navPosition ?? "center");
    return E(() => {
      const e = (s) => {
        s.key === "Escape" && t.modelValue && r("escape");
      };
      document.addEventListener("keydown", e), M(() => {
        document.removeEventListener("keydown", e);
      });
    }), (e, s) => (l(), d("div", {
      class: h(["w-topbar", { "w-topbar-fixed": e.fixed }]),
      style: $(a.value)
    }, [
      p("div", F, [
        p("div", q, [
          p("div", D, [
            e.logo ? (l(), d("img", {
              key: 0,
              src: e.logo,
              alt: e.title
            }, null, 8, U)) : (l(), d("span", W, k(e.title), 1))
          ]),
          m.value === "left" ? (l(), w(G, {
            key: 0,
            items: e.items,
            position: "left",
            active: e.modelValue,
            "nav-gap": e.navGap,
            "mobile-nav-gap": e.mobileNavGap,
            onSelect: g(u)
          }, null, 8, ["items", "active", "nav-gap", "mobile-nav-gap", "onSelect"])) : f("", !0),
          b(e.$slots, "left", {}, void 0, !0)
        ]),
        p("div", j, [
          b(e.$slots, "center", {}, void 0, !0),
          m.value === "center" ? (l(), w(G, {
            key: 0,
            items: e.items,
            position: "center",
            active: e.modelValue,
            "nav-gap": e.navGap,
            "mobile-nav-gap": e.mobileNavGap,
            onSelect: g(u)
          }, null, 8, ["items", "active", "nav-gap", "mobile-nav-gap", "onSelect"])) : f("", !0)
        ]),
        p("div", H, [
          b(e.$slots, "right", {}, void 0, !0),
          m.value === "right" ? (l(), w(G, {
            key: 0,
            items: e.items,
            position: "right",
            active: e.modelValue,
            "nav-gap": e.navGap,
            "mobile-nav-gap": e.mobileNavGap,
            onSelect: g(u)
          }, null, 8, ["items", "active", "nav-gap", "mobile-nav-gap", "onSelect"])) : f("", !0),
          p("div", {
            class: h(["w-menu-toggle", { "is-active": e.modelValue }]),
            onClick: s[0] || (s[0] = () => g(o)(e.modelValue))
          }, s[1] || (s[1] = [
            p("span", null, null, -1),
            p("span", null, null, -1),
            p("span", null, null, -1)
          ]), 2)
        ])
      ])
    ], 6));
  }
}), K = /* @__PURE__ */ C(J, [["__scopeId", "data-v-11389dcd"]]), Q = /* @__PURE__ */ _({
  __name: "ThemeTransition",
  emits: ["transitionComplete"],
  setup(n, { expose: c, emit: t }) {
    const i = v(!1), r = v(0), o = v(0), u = v(""), a = v(!1), m = t, e = () => {
      i.value = !1, u.value = "", a.value = !1, m("transitionComplete");
    };
    return c({
      trigger: (T) => a.value ? !1 : (a.value = !0, u.value = T, i.value = !1, requestAnimationFrame(() => {
        i.value = !0;
      }), !0),
      isAnimating: a
    }), (T, Z) => (l(), w(B, { to: "body" }, [
      p("div", {
        class: h(["theme-transition", { "theme-transition--active": i.value }]),
        style: $({
          "--origin-x": `${r.value}px`,
          "--origin-y": `${o.value}px`,
          "--next-theme-color": u.value
        }),
        onTransitionend: e
      }, null, 38)
    ]));
  }
}), R = /* @__PURE__ */ C(Q, [["__scopeId", "data-v-69098707"]]), X = { class: "theme-switch-container" }, Y = /* @__PURE__ */ _({
  __name: "ThemeSwitch",
  props: {
    theme: { default: "light" }
  },
  emits: ["toggleThemeEvent"],
  setup(n, { emit: c }) {
    const t = c, i = () => {
      t("toggleThemeEvent");
    };
    return (r, o) => (l(), d("button", {
      class: "theme-switch",
      onClick: i
    }, [
      p("div", X, [
        P(x, { name: "theme-transition" }, {
          default: z(() => [
            (l(), d("span", {
              class: "theme-switch-icon",
              key: "icon-" + r.theme
            }, k(r.theme === "light" ? "🌞" : "🌙"), 1)),
            (l(), d("span", {
              class: "theme-switch-text",
              key: "text-" + r.theme
            }, k(r.theme === "light" ? "暗色" : "亮色"), 1))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), te = /* @__PURE__ */ C(Y, [["__scopeId", "data-v-d3953f65"]]), ne = {
  install(n) {
    n.component("xTopbar", K), n.component("xThemeTransition", R);
  }
};
export {
  te as ThemeSwitch,
  R as ThemeTransition,
  K as Topbar,
  ne as default
};
