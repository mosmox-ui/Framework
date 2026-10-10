import Nr, { forwardRef as Us, useId as He, useState as q, useRef as ke, useMemo as mt, useEffect as Me, useContext as vt, createContext as gt, memo as Wt, Children as Na, isValidElement as nn, cloneElement as ln, useCallback as at, createElement as Fs, useLayoutEffect as ka, useImperativeHandle as $a, Fragment as Ma } from "react";
import { Icon as on } from "@mosmox-ui/icons";
import { createPortal as vs } from "react-dom";
var js = { exports: {} }, ts = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pa;
function cn() {
  if (Pa) return ts;
  Pa = 1;
  var t = Nr, s = Symbol.for("react.element"), a = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(i, c, p) {
    var l, d = {}, y = null, b = null;
    p !== void 0 && (y = "" + p), c.key !== void 0 && (y = "" + c.key), c.ref !== void 0 && (b = c.ref);
    for (l in c) r.call(c, l) && !m.hasOwnProperty(l) && (d[l] = c[l]);
    if (i && i.defaultProps) for (l in c = i.defaultProps, c) d[l] === void 0 && (d[l] = c[l]);
    return { $$typeof: s, type: i, key: y, ref: b, props: d, _owner: n.current };
  }
  return ts.Fragment = a, ts.jsx = o, ts.jsxs = o, ts;
}
var ss = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var La;
function mn() {
  return La || (La = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = Nr, s = Symbol.for("react.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), i = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), h = Symbol.iterator, j = "@@iterator";
    function w($) {
      if ($ === null || typeof $ != "object")
        return null;
      var ne = h && $[h] || $[j];
      return typeof ne == "function" ? ne : null;
    }
    var z = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v($) {
      {
        for (var ne = arguments.length, be = new Array(ne > 1 ? ne - 1 : 0), we = 1; we < ne; we++)
          be[we - 1] = arguments[we];
        D("error", $, be);
      }
    }
    function D($, ne, be) {
      {
        var we = z.ReactDebugCurrentFrame, Ie = we.getStackAddendum();
        Ie !== "" && (ne += "%s", be = be.concat([Ie]));
        var Be = be.map(function(J) {
          return String(J);
        });
        Be.unshift("Warning: " + ne), Function.prototype.apply.call(console[$], console, Be);
      }
    }
    var x = !1, _ = !1, u = !1, S = !1, M = !1, g;
    g = Symbol.for("react.module.reference");
    function N($) {
      return !!(typeof $ == "string" || typeof $ == "function" || $ === r || $ === m || M || $ === n || $ === p || $ === l || S || $ === b || x || _ || u || typeof $ == "object" && $ !== null && ($.$$typeof === y || $.$$typeof === d || $.$$typeof === o || $.$$typeof === i || $.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      $.$$typeof === g || $.getModuleId !== void 0));
    }
    function f($, ne, be) {
      var we = $.displayName;
      if (we)
        return we;
      var Ie = ne.displayName || ne.name || "";
      return Ie !== "" ? be + "(" + Ie + ")" : be;
    }
    function T($) {
      return $.displayName || "Context";
    }
    function B($) {
      if ($ == null)
        return null;
      if (typeof $.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof $ == "function")
        return $.displayName || $.name || null;
      if (typeof $ == "string")
        return $;
      switch ($) {
        case r:
          return "Fragment";
        case a:
          return "Portal";
        case m:
          return "Profiler";
        case n:
          return "StrictMode";
        case p:
          return "Suspense";
        case l:
          return "SuspenseList";
      }
      if (typeof $ == "object")
        switch ($.$$typeof) {
          case i:
            var ne = $;
            return T(ne) + ".Consumer";
          case o:
            var be = $;
            return T(be._context) + ".Provider";
          case c:
            return f($, $.render, "ForwardRef");
          case d:
            var we = $.displayName || null;
            return we !== null ? we : B($.type) || "Memo";
          case y: {
            var Ie = $, Be = Ie._payload, J = Ie._init;
            try {
              return B(J(Be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var R = Object.assign, A = 0, F, E, L, K, I, W, k;
    function Y() {
    }
    Y.__reactDisabledLog = !0;
    function P() {
      {
        if (A === 0) {
          F = console.log, E = console.info, L = console.warn, K = console.error, I = console.group, W = console.groupCollapsed, k = console.groupEnd;
          var $ = {
            configurable: !0,
            enumerable: !0,
            value: Y,
            writable: !0
          };
          Object.defineProperties(console, {
            info: $,
            log: $,
            warn: $,
            error: $,
            group: $,
            groupCollapsed: $,
            groupEnd: $
          });
        }
        A++;
      }
    }
    function C() {
      {
        if (A--, A === 0) {
          var $ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: R({}, $, {
              value: F
            }),
            info: R({}, $, {
              value: E
            }),
            warn: R({}, $, {
              value: L
            }),
            error: R({}, $, {
              value: K
            }),
            group: R({}, $, {
              value: I
            }),
            groupCollapsed: R({}, $, {
              value: W
            }),
            groupEnd: R({}, $, {
              value: k
            })
          });
        }
        A < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var V = z.ReactCurrentDispatcher, Q;
    function H($, ne, be) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (Ie) {
            var we = Ie.stack.trim().match(/\n( *(at )?)/);
            Q = we && we[1] || "";
          }
        return `
` + Q + $;
      }
    }
    var X = !1, ce;
    {
      var se = typeof WeakMap == "function" ? WeakMap : Map;
      ce = new se();
    }
    function te($, ne) {
      if (!$ || X)
        return "";
      {
        var be = ce.get($);
        if (be !== void 0)
          return be;
      }
      var we;
      X = !0;
      var Ie = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Be;
      Be = V.current, V.current = null, P();
      try {
        if (ne) {
          var J = function() {
            throw Error();
          };
          if (Object.defineProperty(J.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(J, []);
            } catch (Je) {
              we = Je;
            }
            Reflect.construct($, [], J);
          } else {
            try {
              J.call();
            } catch (Je) {
              we = Je;
            }
            $.call(J.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Je) {
            we = Je;
          }
          $();
        }
      } catch (Je) {
        if (Je && we && typeof Je.stack == "string") {
          for (var le = Je.stack.split(`
`), Te = we.stack.split(`
`), $e = le.length - 1, Ae = Te.length - 1; $e >= 1 && Ae >= 0 && le[$e] !== Te[Ae]; )
            Ae--;
          for (; $e >= 1 && Ae >= 0; $e--, Ae--)
            if (le[$e] !== Te[Ae]) {
              if ($e !== 1 || Ae !== 1)
                do
                  if ($e--, Ae--, Ae < 0 || le[$e] !== Te[Ae]) {
                    var Se = `
` + le[$e].replace(" at new ", " at ");
                    return $.displayName && Se.includes("<anonymous>") && (Se = Se.replace("<anonymous>", $.displayName)), typeof $ == "function" && ce.set($, Se), Se;
                  }
                while ($e >= 1 && Ae >= 0);
              break;
            }
        }
      } finally {
        X = !1, V.current = Be, C(), Error.prepareStackTrace = Ie;
      }
      var Qe = $ ? $.displayName || $.name : "", nt = Qe ? H(Qe) : "";
      return typeof $ == "function" && ce.set($, nt), nt;
    }
    function ve($, ne, be) {
      return te($, !1);
    }
    function ge($) {
      var ne = $.prototype;
      return !!(ne && ne.isReactComponent);
    }
    function ae($, ne, be) {
      if ($ == null)
        return "";
      if (typeof $ == "function")
        return te($, ge($));
      if (typeof $ == "string")
        return H($);
      switch ($) {
        case p:
          return H("Suspense");
        case l:
          return H("SuspenseList");
      }
      if (typeof $ == "object")
        switch ($.$$typeof) {
          case c:
            return ve($.render);
          case d:
            return ae($.type, ne, be);
          case y: {
            var we = $, Ie = we._payload, Be = we._init;
            try {
              return ae(Be(Ie), ne, be);
            } catch {
            }
          }
        }
      return "";
    }
    var fe = Object.prototype.hasOwnProperty, de = {}, oe = z.ReactDebugCurrentFrame;
    function xe($) {
      if ($) {
        var ne = $._owner, be = ae($.type, $._source, ne ? ne.type : null);
        oe.setExtraStackFrame(be);
      } else
        oe.setExtraStackFrame(null);
    }
    function ie($, ne, be, we, Ie) {
      {
        var Be = Function.call.bind(fe);
        for (var J in $)
          if (Be($, J)) {
            var le = void 0;
            try {
              if (typeof $[J] != "function") {
                var Te = Error((we || "React class") + ": " + be + " type `" + J + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof $[J] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Te.name = "Invariant Violation", Te;
              }
              le = $[J](ne, J, we, be, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch ($e) {
              le = $e;
            }
            le && !(le instanceof Error) && (xe(Ie), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", we || "React class", be, J, typeof le), xe(null)), le instanceof Error && !(le.message in de) && (de[le.message] = !0, xe(Ie), v("Failed %s type: %s", be, le.message), xe(null));
          }
      }
    }
    var re = Array.isArray;
    function U($) {
      return re($);
    }
    function Z($) {
      {
        var ne = typeof Symbol == "function" && Symbol.toStringTag, be = ne && $[Symbol.toStringTag] || $.constructor.name || "Object";
        return be;
      }
    }
    function G($) {
      try {
        return me($), !1;
      } catch {
        return !0;
      }
    }
    function me($) {
      return "" + $;
    }
    function he($) {
      if (G($))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Z($)), me($);
    }
    var ze = z.ReactCurrentOwner, je = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ne, Re;
    function _e($) {
      if (fe.call($, "ref")) {
        var ne = Object.getOwnPropertyDescriptor($, "ref").get;
        if (ne && ne.isReactWarning)
          return !1;
      }
      return $.ref !== void 0;
    }
    function Le($) {
      if (fe.call($, "key")) {
        var ne = Object.getOwnPropertyDescriptor($, "key").get;
        if (ne && ne.isReactWarning)
          return !1;
      }
      return $.key !== void 0;
    }
    function Xe($, ne) {
      typeof $.ref == "string" && ze.current;
    }
    function Ze($, ne) {
      {
        var be = function() {
          Ne || (Ne = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ne));
        };
        be.isReactWarning = !0, Object.defineProperty($, "key", {
          get: be,
          configurable: !0
        });
      }
    }
    function lt($, ne) {
      {
        var be = function() {
          Re || (Re = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ne));
        };
        be.isReactWarning = !0, Object.defineProperty($, "ref", {
          get: be,
          configurable: !0
        });
      }
    }
    var ot = function($, ne, be, we, Ie, Be, J) {
      var le = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: $,
        key: ne,
        ref: be,
        props: J,
        // Record the component responsible for creating this element.
        _owner: Be
      };
      return le._store = {}, Object.defineProperty(le._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(le, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: we
      }), Object.defineProperty(le, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ie
      }), Object.freeze && (Object.freeze(le.props), Object.freeze(le)), le;
    };
    function dt($, ne, be, we, Ie) {
      {
        var Be, J = {}, le = null, Te = null;
        be !== void 0 && (he(be), le = "" + be), Le(ne) && (he(ne.key), le = "" + ne.key), _e(ne) && (Te = ne.ref, Xe(ne, Ie));
        for (Be in ne)
          fe.call(ne, Be) && !je.hasOwnProperty(Be) && (J[Be] = ne[Be]);
        if ($ && $.defaultProps) {
          var $e = $.defaultProps;
          for (Be in $e)
            J[Be] === void 0 && (J[Be] = $e[Be]);
        }
        if (le || Te) {
          var Ae = typeof $ == "function" ? $.displayName || $.name || "Unknown" : $;
          le && Ze(J, Ae), Te && lt(J, Ae);
        }
        return ot($, le, Te, Ie, we, ze.current, J);
      }
    }
    var ue = z.ReactCurrentOwner, pe = z.ReactDebugCurrentFrame;
    function O($) {
      if ($) {
        var ne = $._owner, be = ae($.type, $._source, ne ? ne.type : null);
        pe.setExtraStackFrame(be);
      } else
        pe.setExtraStackFrame(null);
    }
    var ye;
    ye = !1;
    function De($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === s;
    }
    function We() {
      {
        if (ue.current) {
          var $ = B(ue.current.type);
          if ($)
            return `

Check the render method of \`` + $ + "`.";
        }
        return "";
      }
    }
    function et($) {
      return "";
    }
    var Ce = {};
    function Ye($) {
      {
        var ne = We();
        if (!ne) {
          var be = typeof $ == "string" ? $ : $.displayName || $.name;
          be && (ne = `

Check the top-level render call using <` + be + ">.");
        }
        return ne;
      }
    }
    function yt($, ne) {
      {
        if (!$._store || $._store.validated || $.key != null)
          return;
        $._store.validated = !0;
        var be = Ye(ne);
        if (Ce[be])
          return;
        Ce[be] = !0;
        var we = "";
        $ && $._owner && $._owner !== ue.current && (we = " It was passed a child from " + B($._owner.type) + "."), O($), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', be, we), O(null);
      }
    }
    function Nt($, ne) {
      {
        if (typeof $ != "object")
          return;
        if (U($))
          for (var be = 0; be < $.length; be++) {
            var we = $[be];
            De(we) && yt(we, ne);
          }
        else if (De($))
          $._store && ($._store.validated = !0);
        else if ($) {
          var Ie = w($);
          if (typeof Ie == "function" && Ie !== $.entries)
            for (var Be = Ie.call($), J; !(J = Be.next()).done; )
              De(J.value) && yt(J.value, ne);
        }
      }
    }
    function zt($) {
      {
        var ne = $.type;
        if (ne == null || typeof ne == "string")
          return;
        var be;
        if (typeof ne == "function")
          be = ne.propTypes;
        else if (typeof ne == "object" && (ne.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ne.$$typeof === d))
          be = ne.propTypes;
        else
          return;
        if (be) {
          var we = B(ne);
          ie(be, $.props, "prop", we, $);
        } else if (ne.PropTypes !== void 0 && !ye) {
          ye = !0;
          var Ie = B(ne);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ie || "Unknown");
        }
        typeof ne.getDefaultProps == "function" && !ne.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function St($) {
      {
        for (var ne = Object.keys($.props), be = 0; be < ne.length; be++) {
          var we = ne[be];
          if (we !== "children" && we !== "key") {
            O($), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", we), O(null);
            break;
          }
        }
        $.ref !== null && (O($), v("Invalid attribute `ref` supplied to `React.Fragment`."), O(null));
      }
    }
    var jt = {};
    function Fe($, ne, be, we, Ie, Be) {
      {
        var J = N($);
        if (!J) {
          var le = "";
          ($ === void 0 || typeof $ == "object" && $ !== null && Object.keys($).length === 0) && (le += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Te = et();
          Te ? le += Te : le += We();
          var $e;
          $ === null ? $e = "null" : U($) ? $e = "array" : $ !== void 0 && $.$$typeof === s ? ($e = "<" + (B($.type) || "Unknown") + " />", le = " Did you accidentally export a JSX literal instead of a component?") : $e = typeof $, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", $e, le);
        }
        var Ae = dt($, ne, be, Ie, Be);
        if (Ae == null)
          return Ae;
        if (J) {
          var Se = ne.children;
          if (Se !== void 0)
            if (we)
              if (U(Se)) {
                for (var Qe = 0; Qe < Se.length; Qe++)
                  Nt(Se[Qe], $);
                Object.freeze && Object.freeze(Se);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Nt(Se, $);
        }
        if (fe.call(ne, "key")) {
          var nt = B($), Je = Object.keys(ne).filter(function(Ke) {
            return Ke !== "key";
          }), ut = Je.length > 0 ? "{key: someKey, " + Je.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!jt[nt + ut]) {
            var $t = Je.length > 0 ? "{" + Je.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ut, nt, $t, nt), jt[nt + ut] = !0;
          }
        }
        return $ === r ? St(Ae) : zt(Ae), Ae;
      }
    }
    function kt($, ne, be) {
      return Fe($, ne, be, !0);
    }
    function Tt($, ne, be) {
      return Fe($, ne, be, !1);
    }
    var Et = Tt, ee = kt;
    ss.Fragment = r, ss.jsx = Et, ss.jsxs = ee;
  })()), ss;
}
var Ia;
function dn() {
  return Ia || (Ia = 1, process.env.NODE_ENV === "production" ? js.exports = cn() : js.exports = mn()), js.exports;
}
var e = dn();
const Ee = (t) => Us((s, a) => /* @__PURE__ */ e.jsx(on, { ref: a, name: t, ...s })), kr = Ee("arrow-clockwise"), $r = Ee("arrow-counter-clockwise"), Mr = Ee("arrow-down");
Ee("arrow-right");
const un = Ee("arrow-square-out"), zr = Ee("arrow-up"), fn = Ee("arrows-clockwise"), hn = Ee("arrows-in"), Sr = Ee("arrows-out");
Ee("bell");
const pn = Ee("calendar-dots"), Rs = Ee("caret-double-left"), Cs = Ee("caret-double-right"), xt = Ee("caret-down"), Kt = Ee("caret-left"), pt = Ee("caret-right"), Vs = Ee("caret-up");
Ee("chart-bar");
const Ct = Ee("check"), Os = Ee("check-circle"), Tr = Ee("circle"), za = Ee("clock"), xn = Ee("closed-captioning"), Gs = Ee("cloud-arrow-up");
Ee("credit-card");
const bn = Ee("crop"), _n = Ee("dice-six"), Er = Ee("dots-six-vertical"), Dr = Ee("dots-three"), Ar = Ee("download");
Ee("envelope");
const vn = Ee("eye"), gn = Ee("eye-slash"), yn = Ee("fast-forward"), jn = Ee("file"), wn = Ee("file-image");
Ee("file-text");
const Nn = Ee("flip-horizontal"), kn = Ee("flip-vertical");
Ee("folder");
const Br = Ee("gear"), $n = Ee("git-branch");
Ee("heart");
const Mn = Ee("house"), bs = Ee("info"), zn = Ee("lock-key"), Sn = Ee("magnifying-glass"), Pr = Ee("magnifying-glass-minus"), Lr = Ee("magnifying-glass-plus");
Ee("minus");
const Ws = Ee("pause");
Ee("phone");
const Ks = Ee("play");
Ee("plus");
Ee("question");
const Tn = Ee("rewind"), Ir = Ee("speaker-high"), Fr = Ee("speaker-x"), Mt = Ee("spinner-gap");
Ee("sparkle");
const En = Ee("tag"), Dn = Ee("trash"), An = Ee("user-circle"), es = Ee("warning"), qs = Ee("warning-circle"), rt = Ee("x"), Js = (...t) => t.filter(Boolean).join(" ");
function Xl({
  "aria-describedby": t,
  "aria-label": s,
  allowCustomValue: a = !1,
  className: r,
  clearable: n = !0,
  defaultValue: m = "",
  description: o,
  disabled: i = !1,
  emptyText: c = "Start typing to search",
  error: p,
  filterOption: l,
  fullWidth: d = !1,
  id: y,
  label: b,
  leadingIcon: h,
  loadOptions: j,
  loading: w = !1,
  loadingText: z = "Loading…",
  minChars: v = 1,
  name: D,
  noResultsText: x = "No results found",
  onChange: _,
  onEnter: u,
  onInputChange: S,
  onOpenChange: M,
  openOnFocus: g = !1,
  open: N,
  options: f = [],
  placeholder: T = "MagnifyingGlass",
  readOnly: B = !1,
  renderOption: R,
  searchDebounceMs: A = 300,
  size: F = "default",
  trailingIcon: E,
  value: L,
  variant: K = "outline"
}) {
  const I = He(), W = y ?? `mm-auto-complete-${I}`, k = `${W}-listbox`, Y = L !== void 0, [P, C] = q(m), V = Y ? L : P, [Q, H] = q(!1), X = N ?? Q, [ce, se] = q([]), [te, ve] = q(!1), [ge, ae] = q(0), [fe, de] = q(!1), oe = ke(null), xe = ke(null), ie = ke(null), re = ke(null), U = w || te, Z = o ? `${W}-description` : void 0, G = p ? `${W}-error` : void 0, me = [t, Z, G].filter(Boolean).join(" ") || void 0, he = j ? ce : f, ze = mt(() => {
    const pe = V.trim().toLowerCase();
    return V.trim().length < v && !(g && !j && he.length > 0) ? [] : j ? he : he.filter((O) => l ? l(O, V) : `${O.label} ${O.description ?? ""} ${(O.keywords ?? []).join(" ")}`.toLowerCase().includes(pe));
  }, [V, l, j, v, g, he]), je = V.length > 0, Ne = n && je && !i && !B && !U, Re = ze[ge], _e = V.trim().length >= v || g && !j && f.length > 0;
  Me(() => {
    const pe = (O) => {
      oe.current && !oe.current.contains(O.target) && Le(!1);
    };
    return document.addEventListener("mousedown", pe), () => document.removeEventListener("mousedown", pe);
  }, []), Me(() => {
    if (!X) return;
    ae(0);
    const pe = re.current;
    if (pe) {
      const O = () => window.scrollTo(pe.left, pe.top);
      O();
      const ye = requestAnimationFrame(() => requestAnimationFrame(O));
      return () => cancelAnimationFrame(ye);
    }
  }, [X]), Me(() => {
    ae((pe) => Math.max(0, Math.min(pe, Math.max(0, ze.length - 1))));
  }, [ze.length]), Me(() => {
    var ye;
    if (!j || !X || V.length < v) {
      j || se([]), ve(!1);
      return;
    }
    const pe = new AbortController();
    (ye = ie.current) == null || ye.abort(), ie.current = pe, ve(!0);
    const O = window.setTimeout(() => {
      j(V, pe.signal).then((De) => {
        pe.signal.aborted || se(De);
      }).catch(() => {
        pe.signal.aborted || se([]);
      }).finally(() => {
        pe.signal.aborted || ve(!1);
      });
    }, A);
    return () => {
      window.clearTimeout(O), pe.abort();
    };
  }, [V, X, j, v, A]);
  const Le = (pe) => {
    if (i || B) return;
    const O = g && !j && f.length > 0;
    pe && V.trim().length < v && !O || (pe && !X && (re.current = { left: window.scrollX, top: window.scrollY }), N === void 0 && H(pe), M == null || M(pe));
  }, Xe = (pe) => {
    Y || C(pe), S == null || S(pe);
  }, Ze = (pe) => {
    pe.disabled || (Xe(typeof pe.label == "string" ? pe.label : pe.value), _ == null || _(pe.value, pe), Le(!1), requestAnimationFrame(() => {
      var O;
      return (O = xe.current) == null ? void 0 : O.focus();
    }));
  }, lt = () => {
    Xe(""), _ == null || _("", void 0), requestAnimationFrame(() => {
      var pe;
      return (pe = xe.current) == null ? void 0 : pe.focus();
    });
  }, ot = (pe) => {
    de(!0), Xe(pe.target.value), pe.target.value.trim().length >= v || g && !j && f.length > 0 ? Le(!0) : Le(!1);
  }, dt = (pe) => {
    if (pe.key === "ArrowDown" || pe.key === "ArrowUp")
      pe.preventDefault(), !X && V.trim().length >= v ? Le(!0) : ae((O) => Math.max(0, Math.min(ze.length - 1, O + (pe.key === "ArrowDown" ? 1 : -1))));
    else if (pe.key === "Enter") {
      const O = X ? Re : void 0;
      X && Re ? (pe.preventDefault(), Ze(Re)) : a && V && (_ == null || _(V, void 0)), u == null || u(V, O, pe);
    } else pe.key === "Escape" ? X && (pe.preventDefault(), Le(!1)) : pe.key === "House" && X ? (pe.preventDefault(), ae(0)) : pe.key === "End" && X && (pe.preventDefault(), ae(Math.max(0, ze.length - 1)));
  }, ue = fe && V.length >= v && !U && ze.length === 0;
  return /* @__PURE__ */ e.jsxs("div", { className: Js("mm-auto-complete-field", d && "mm-auto-complete-field--full-width", r), ref: oe, children: [
    b && /* @__PURE__ */ e.jsx("label", { className: "mm-auto-complete-field__label", htmlFor: W, children: b }),
    o && /* @__PURE__ */ e.jsx("p", { className: "mm-auto-complete-field__description", id: Z, children: o }),
    /* @__PURE__ */ e.jsxs("div", { className: Js("mm-auto-complete", `mm-auto-complete--${F}`, `mm-auto-complete--${K}`, p && "mm-auto-complete--error", i && "mm-auto-complete--disabled", X && "mm-auto-complete--open"), children: [
      h && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-auto-complete__leading-icon", children: h }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          "aria-activedescendant": X && Re ? `${W}-option-${ge}` : void 0,
          "aria-autocomplete": "list",
          "aria-controls": X ? k : void 0,
          "aria-describedby": me,
          "aria-expanded": X,
          "aria-haspopup": "listbox",
          "aria-invalid": !!p,
          "aria-label": s,
          className: "mm-auto-complete__input",
          disabled: i,
          id: W,
          onChange: ot,
          onFocus: () => {
            !B && (V.trim().length >= v || g && !j && f.length > 0) && Le(!0);
          },
          onKeyDown: dt,
          placeholder: T,
          readOnly: B,
          ref: xe,
          role: "combobox",
          value: V
        }
      ),
      /* @__PURE__ */ e.jsxs("span", { className: "mm-auto-complete__actions", children: [
        U && /* @__PURE__ */ e.jsx(Mt, { "aria-label": "Loading", className: "mm-auto-complete__loader", role: "status", size: 16 }),
        Ne && /* @__PURE__ */ e.jsx("button", { "aria-label": "Clear input", className: "mm-auto-complete__clear", onClick: lt, type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 16 }) }),
        E
      ] }),
      X && /* @__PURE__ */ e.jsx("div", { className: "mm-auto-complete__popover", children: /* @__PURE__ */ e.jsxs("div", { "aria-label": s ?? (typeof b == "string" ? b : "Suggestions"), className: "mm-auto-complete__list", id: k, role: "listbox", children: [
        U && /* @__PURE__ */ e.jsx("div", { className: "mm-auto-complete__status", children: z }),
        !U && !_e && /* @__PURE__ */ e.jsx("div", { className: "mm-auto-complete__status", children: c }),
        ue && /* @__PURE__ */ e.jsx("div", { className: "mm-auto-complete__status", children: x }),
        !U && _e && ze.map((pe, O) => {
          var De;
          const ye = O === ge;
          return /* @__PURE__ */ e.jsxs("div", { className: "mm-auto-complete__option-wrap", children: [
            pe.group && pe.group !== ((De = ze[O - 1]) == null ? void 0 : De.group) && /* @__PURE__ */ e.jsx("div", { className: "mm-auto-complete__group", children: pe.group }),
            /* @__PURE__ */ e.jsx("button", { "aria-selected": ye, className: Js("mm-auto-complete__option", ye && "mm-auto-complete__option--active", pe.disabled && "mm-auto-complete__option--disabled"), disabled: pe.disabled, id: `${W}-option-${O}`, onClick: () => Ze(pe), onMouseEnter: () => ae(O), role: "option", type: "button", children: R ? R(pe, { active: ye, selected: !1 }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              pe.image ? /* @__PURE__ */ e.jsx("img", { alt: "", className: "mm-auto-complete__option-image", src: pe.image }) : pe.icon && /* @__PURE__ */ e.jsx("span", { className: "mm-auto-complete__option-icon", children: pe.icon }),
              /* @__PURE__ */ e.jsxs("span", { className: "mm-auto-complete__option-copy", children: [
                /* @__PURE__ */ e.jsx("span", { className: "mm-auto-complete__option-label", children: pe.label }),
                pe.description && /* @__PURE__ */ e.jsx("span", { className: "mm-auto-complete__option-description", children: pe.description })
              ] })
            ] }) })
          ] }, pe.value);
        })
      ] }) })
    ] }),
    D && /* @__PURE__ */ e.jsx("input", { name: D, type: "hidden", value: V }),
    p && /* @__PURE__ */ e.jsx("p", { className: "mm-auto-complete-field__error", id: G, children: p })
  ] });
}
const Fa = (...t) => t.filter(Boolean).join(" "), Rr = 26, Bn = 4, ws = Rr + Bn * 2, hs = (t, s, a) => Math.min(a, Math.max(s, t));
function Ns(t, s) {
  if (s) {
    const r = Math.max(0, t.collapsedSize ?? 0);
    return { min: r, max: r };
  }
  const a = Math.max(0, t.minSize ?? 5);
  return { min: a, max: Math.max(a, t.maxSize ?? 95) };
}
function Yt(t, s, a) {
  const r = t.map((l, d) => {
    const y = Math.max(0, l.collapsedSize ?? 0), b = a != null && a[d] ? y : Math.max(0, l.minSize ?? 5), h = a != null && a[d] ? y : Math.max(b, l.maxSize ?? 95);
    return hs((s == null ? void 0 : s[d]) ?? (a != null && a[d] ? y : l.defaultSize ?? 100 / Math.max(1, t.length)), b, h);
  }), m = (r.reduce((l, d) => l + d, 0) || 100) > 0 ? [...r] : t.map((l) => l.defaultSize ?? 100 / Math.max(1, t.length)), o = t.map((l, d) => a != null && a[d] ? Math.max(0, l.collapsedSize ?? 0) : Math.max(0, l.minSize ?? 5)), i = t.map((l, d) => a != null && a[d] ? o[d] : Math.max(o[d], l.maxSize ?? 95));
  let c = 100 - m.reduce((l, d) => l + d, 0);
  return ((l) => {
    for (let d = 0; d < t.length && Math.abs(c) > 1e-3; d += 1) {
      const y = m.reduce((b, h, j) => b + (l ? Math.max(0, i[j] - h) : Math.max(0, h - o[j])), 0);
      if (y <= 0) break;
      m.forEach((b, h) => {
        const j = l ? Math.max(0, i[h] - b) : Math.max(0, b - o[h]), w = Math.min(j, Math.abs(c) * (j / y));
        m[h] += l ? w : -w, c += l ? -w : w;
      });
    }
  })(c > 0), m;
}
function Gl({ "aria-label": t = "Resizable panels", panels: s, direction: a = "horizontal", sizes: r, defaultSizes: n, onResize: m, step: o = 5, handleSize: i = 12, handleContent: c, showHandle: p = !0, showCollapseButtons: l = !1, keyboardResize: d = !0, resetOnDoubleClick: y = !0, storageKey: b, variant: h = "default", className: j, style: w }) {
  const z = He().replace(/:/g, ""), v = ke(null), D = ke(null), [x, _] = q(() => s.map(() => !1)), u = Yt(s, n, x), [S, M] = q(u), g = r ? Yt(s, r, x) : Yt(s, S, x), N = (A, F = -1, E = x) => {
    const L = Yt(s, A, E);
    r === void 0 && M(L), m == null || m(L, F), b && typeof window < "u" && window.localStorage.setItem(b, JSON.stringify(L));
  };
  Me(() => {
    if (!(!b || r !== void 0 || typeof window > "u"))
      try {
        const A = JSON.parse(window.localStorage.getItem(b) || "null");
        Array.isArray(A) && M(Yt(s, A));
      } catch {
      }
  }, [b]), Me(() => {
    const A = (E) => {
      const L = D.current, K = v.current;
      if (!L || !K) return;
      const I = K.getBoundingClientRect(), k = ((a === "horizontal" ? E.clientX - I.left : E.clientY - I.top) - L.start) / (a === "horizontal" ? I.width : I.height) * 100, Y = Ns(s[L.handle], x[L.handle]), P = Ns(s[L.handle + 1], x[L.handle + 1]), C = hs(L.first + k, Y.min, Math.min(Y.max, 100 - P.min)), V = hs(L.second - k, P.min, Math.min(P.max, 100 - C)), Q = [...g];
      Q[L.handle] = C, Q[L.handle + 1] = V, N(Q, L.handle);
    }, F = () => {
      D.current = null, document.body.style.removeProperty("user-select");
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", F), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", F);
    };
  });
  const f = (A, F) => {
    if (!v.current) return;
    A.preventDefault();
    const E = v.current.getBoundingClientRect();
    D.current = { handle: F, start: a === "horizontal" ? A.clientX - E.left : A.clientY - E.top, first: g[F], second: g[F + 1] }, document.body.style.userSelect = "none";
  }, T = (A) => {
    const F = Yt(s, n);
    N(F, A);
  }, B = (A) => {
    const F = s[A];
    if (!F.collapsible) return;
    const E = [...x], L = [...g];
    E[A] ? (E[A] = !1, L[A] = F.defaultSize ?? 100 / s.length) : (E[A] = !0, L[A] = F.collapsedSize ?? 0), _(E), N(L, A, E);
  }, R = (A, F) => {
    if (!d) return;
    const E = a === "horizontal" ? A.key === "ArrowRight" : A.key === "ArrowDown", L = a === "horizontal" ? A.key === "ArrowLeft" : A.key === "ArrowUp";
    if (A.key === "House" || A.key === "End") {
      A.preventDefault(), T(F);
      return;
    }
    if (!E && !L) return;
    A.preventDefault();
    const K = E ? o : -o, I = Ns(s[F], x[F]), W = Ns(s[F + 1], x[F + 1]), k = [...g];
    k[F] = hs(k[F] + K, I.min, Math.min(I.max, 100 - W.min)), k[F + 1] = hs(k[F + 1] - K, W.min, Math.min(W.max, 100 - k[F])), N(k, F);
  };
  return /* @__PURE__ */ e.jsx("div", { "aria-label": t, className: Fa("mm-resizable-panels", `mm-resizable-panels--${a}`, `mm-resizable-panels--${h}`, j), ref: v, style: { ...w, "--mm-resizable-handle-size": `${i}px`, "--mm-resizable-collapse-button-size": `${Rr}px` }, children: s.map((A, F) => /* @__PURE__ */ e.jsxs("span", { className: "mm-resizable-panels__slot", style: { flexBasis: `${g[F]}%`, minWidth: a === "horizontal" ? x[F] ? `${Math.max(A.collapsedMinSize ?? ws, ws) + (F < s.length - 1 && p ? i : 0)}px` : `${A.minSize ?? 5}%` : void 0, minHeight: a === "vertical" ? x[F] ? `${Math.max(A.collapsedMinSize ?? ws, ws) + (F < s.length - 1 && p ? i : 0)}px` : `${A.minSize ?? 5}%` : void 0 }, children: [
    /* @__PURE__ */ e.jsxs("section", { "aria-label": A.ariaLabel, className: Fa("mm-resizable-panels__panel", x[F] && "mm-resizable-panels__panel--collapsed"), children: [
      /* @__PURE__ */ e.jsx("div", { className: "mm-resizable-panels__content", children: A.content }),
      l && A.collapsible && /* @__PURE__ */ e.jsx("button", { "aria-label": `${x[F] ? "Expand" : "Collapse"} ${A.key} panel`, className: "mm-resizable-panels__collapse", onClick: () => B(F), type: "button", children: x[F] ? A.expandIcon ?? (a === "vertical" ? /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", size: 15 }) : /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 15 })) : A.collapseIcon ?? (a === "vertical" ? /* @__PURE__ */ e.jsx(Vs, { "aria-hidden": "true", size: 15 }) : /* @__PURE__ */ e.jsx(Kt, { "aria-hidden": "true", size: 15 })) })
    ] }),
    F < s.length - 1 && p && /* @__PURE__ */ e.jsx("button", { "aria-label": `Resize ${A.key} panel`, "aria-orientation": a, "aria-valuemax": A.maxSize ?? 95, "aria-valuemin": A.minSize ?? 5, "aria-valuenow": Math.round(g[F]), className: "mm-resizable-panels__handle", id: `${z}-handle-${F}`, onDoubleClick: () => y && T(F), onKeyDown: (E) => R(E, F), onPointerDown: (E) => f(E, F), type: "button", children: c ?? /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-resizable-panels__grip", children: "⋮" }) })
  ] }, A.key)) });
}
const Zs = (...t) => t.filter(Boolean).join(" ");
function Jl({ "aria-label": t = "Accordion", items: s, value: a, defaultValue: r, onChange: n, multiple: m = !1, collapsible: o = !0, size: i = "default", variant: c = "default", iconPosition: p = "end", lazy: l = !1, className: d, style: y }) {
  const b = He().replace(/:/g, ""), h = ke([]), j = (u) => {
    const S = u === void 0 ? [] : Array.isArray(u) ? u : [u];
    return m ? S : S.slice(0, 1);
  }, [w, z] = q(j(r)), v = j(a === void 0 ? w : a), D = (u) => v.includes(u), x = (u) => {
    if (u.disabled) return;
    const S = D(u.key) ? o ? v.filter((M) => M !== u.key) : v : m ? [...v, u.key] : [u.key];
    a === void 0 && z(S), n == null || n(m ? S : S[0] ?? "", u);
  }, _ = (u, S) => {
    var N;
    const M = s.map((f, T) => ({ item: f, itemIndex: T })).filter(({ item: f }) => !f.disabled);
    if (!M.length) return;
    let g = -1;
    u.key === "House" && (g = M[0].itemIndex), u.key === "End" && (g = M[M.length - 1].itemIndex), (u.key === "ArrowDown" || u.key === "ArrowRight") && (g = M[(M.findIndex(({ itemIndex: f }) => f === S) + 1) % M.length].itemIndex), (u.key === "ArrowUp" || u.key === "ArrowLeft") && (g = M[(M.findIndex(({ itemIndex: f }) => f === S) - 1 + M.length) % M.length].itemIndex), g >= 0 && (u.preventDefault(), (N = h.current[g]) == null || N.focus());
  };
  return /* @__PURE__ */ e.jsx("div", { "aria-label": t, className: Zs("mm-accordion", `mm-accordion--${i}`, `mm-accordion--${c}`, `mm-accordion--icon-${p}`, d), style: y, children: s.map((u, S) => {
    const M = D(u.key), g = `${b}-trigger-${u.key}`, N = `${b}-panel-${u.key}`;
    return /* @__PURE__ */ e.jsxs("div", { className: Zs("mm-accordion__item", M && "mm-accordion__item--open", u.disabled && "mm-accordion__item--disabled"), children: [
      /* @__PURE__ */ e.jsx("h3", { className: "mm-accordion__heading", children: /* @__PURE__ */ e.jsxs("button", { "aria-controls": N, "aria-expanded": M, className: "mm-accordion__trigger", disabled: u.disabled, id: g, ref: (f) => {
        h.current[S] = f;
      }, onClick: () => x(u), onKeyDown: (f) => _(f, S), type: "button", children: [
        u.icon && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-accordion__icon", children: u.icon }),
        /* @__PURE__ */ e.jsxs("span", { className: "mm-accordion__label", children: [
          /* @__PURE__ */ e.jsx("span", { children: u.label }),
          u.description && /* @__PURE__ */ e.jsx("span", { className: "mm-accordion__description", children: u.description })
        ] }),
        u.badge && /* @__PURE__ */ e.jsx("span", { className: "mm-accordion__badge", children: u.badge }),
        /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-accordion__chevron", children: /* @__PURE__ */ e.jsx(xt, { size: 16, strokeWidth: 2 }) })
      ] }) }),
      /* @__PURE__ */ e.jsx("div", { "aria-hidden": !M, "aria-labelledby": g, className: Zs("mm-accordion__panel", M && "mm-accordion__panel--open"), id: N, role: "region", children: /* @__PURE__ */ e.jsx("div", { className: "mm-accordion__panel-inner", children: (!l || M || v.includes(u.key)) && u.content }) })
    ] }, u.key);
  }) });
}
const Cr = gt({ components: {}, locale: "en" }), Pn = (t) => {
  var s, a, r, n, m, o, i, c, p, l, d, y, b, h, j, w, z, v, D, x, _, u, S, M, g, N, f, T, B, R, A;
  return {
    ...((s = t.colors) == null ? void 0 : s.dangerBackground) && { "--mm-color-danger-background": t.colors.dangerBackground },
    ...((a = t.colors) == null ? void 0 : a.danger) && { "--mm-color-danger": t.colors.danger },
    ...((r = t.colors) == null ? void 0 : r.dangerHover) && { "--mm-color-danger-hover": t.colors.dangerHover },
    ...((n = t.colors) == null ? void 0 : n.dangerText) && { "--mm-color-danger-text": t.colors.dangerText },
    ...((m = t.colors) == null ? void 0 : m.controlBorder) && { "--mm-color-control-border": t.colors.controlBorder },
    ...((o = t.colors) == null ? void 0 : o.controlFilled) && { "--mm-color-control-filled": t.colors.controlFilled },
    ...((i = t.colors) == null ? void 0 : i.controlSelected) && { "--mm-color-control-selected": t.colors.controlSelected },
    ...((c = t.colors) == null ? void 0 : c.controlIcon) && { "--mm-color-control-icon": t.colors.controlIcon },
    ...((p = t.colors) == null ? void 0 : p.focus) && { "--mm-color-focus": t.colors.focus },
    ...((l = t.colors) == null ? void 0 : l.link) && { "--mm-color-link": t.colors.link },
    ...((d = t.colors) == null ? void 0 : d.lightBackground) && { "--mm-color-light-background": t.colors.lightBackground },
    ...((y = t.colors) == null ? void 0 : y.lightHover) && { "--mm-color-light-hover": t.colors.lightHover },
    ...((b = t.colors) == null ? void 0 : b.mutedText) && { "--mm-color-muted-text": t.colors.mutedText },
    ...((h = t.colors) == null ? void 0 : h.overlay) && { "--mm-color-overlay": t.colors.overlay },
    ...((j = t.colors) == null ? void 0 : j.placeholder) && { "--mm-color-placeholder": t.colors.placeholder },
    ...((w = t.colors) == null ? void 0 : w.primary) && { "--mm-color-primary": t.colors.primary },
    ...((z = t.colors) == null ? void 0 : z.primaryHover) && { "--mm-color-primary-hover": t.colors.primaryHover },
    ...((v = t.colors) == null ? void 0 : v.secondary) && { "--mm-color-secondary": t.colors.secondary },
    ...((D = t.colors) == null ? void 0 : D.secondaryHover) && { "--mm-color-secondary-hover": t.colors.secondaryHover },
    ...((x = t.colors) == null ? void 0 : x.success) && { "--mm-color-success": t.colors.success },
    ...((_ = t.colors) == null ? void 0 : _.successHover) && { "--mm-color-success-hover": t.colors.successHover },
    ...((u = t.colors) == null ? void 0 : u.surface) && { "--mm-color-surface": t.colors.surface },
    ...((S = t.colors) == null ? void 0 : S.surfaceHover) && { "--mm-color-surface-hover": t.colors.surfaceHover },
    ...((M = t.colors) == null ? void 0 : M.text) && { "--mm-color-text": t.colors.text },
    ...((g = t.colors) == null ? void 0 : g.warning) && { "--mm-color-warning": t.colors.warning },
    ...((N = t.colors) == null ? void 0 : N.warningHover) && { "--mm-color-warning-hover": t.colors.warningHover },
    ...((f = t.colors) == null ? void 0 : f.warningText) && { "--mm-color-warning-text": t.colors.warningText },
    ...t.radius && { "--mm-radius-control": t.radius },
    ...((T = t.typography) == null ? void 0 : T.fontFamily) && { "--mm-font-family-sans": t.typography.fontFamily },
    ...((B = t.typography) == null ? void 0 : B.fontWeightMedium) && { "--mm-font-weight-medium": t.typography.fontWeightMedium },
    ...((R = t.typography) == null ? void 0 : R.fontWeightLight) && { "--mm-font-weight-light": t.typography.fontWeightLight },
    ...((A = t.typography) == null ? void 0 : A.fontWeightNormal) && { "--mm-font-weight-normal": t.typography.fontWeightNormal }
  };
};
function Zl({ children: t, components: s = {}, locale: a = "en", theme: r = {} }) {
  return /* @__PURE__ */ e.jsx(Cr.Provider, { value: { components: s, locale: a }, children: /* @__PURE__ */ e.jsx("div", { className: "mm-config-provider", style: Pn(r), children: t }) });
}
function Ge() {
  return vt(Cr);
}
const Wr = (...t) => t.filter(Boolean).join(" "), Ln = typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(`${navigator.platform} ${navigator.userAgent}`), In = Wt(function({
  children: s,
  className: a,
  circle: r = !1,
  disableHover: n = !1,
  fullWidth: m = !1,
  hoverScale: o,
  iconLeft: i,
  iconOnly: c,
  iconRight: p,
  loading: l,
  loadingLabel: d,
  loadingMode: y,
  mac: b,
  progress: h,
  size: j = "default",
  variant: w = "primary",
  win: z,
  ...v
}) {
  const { components: D } = Ge(), x = D.button, _ = {
    ...(x == null ? void 0 : x.gap) && { "--mm-button-gap": x.gap },
    ...(x == null ? void 0 : x.iconSize) && { "--mm-button-icon-size": x.iconSize },
    ...(x == null ? void 0 : x.radius) && { "--mm-button-radius": x.radius }
  }, u = Wr(
    "mm-button",
    `mm-button--${w}`,
    `mm-button--${j}`,
    r && "mm-button--circle",
    m && "mm-button--full-width",
    n && "mm-button--disable-hover",
    a
  );
  return /* @__PURE__ */ e.jsx("button", { ...v, style: { ..._, ...v.style }, type: v.type ?? "button", className: u, children: s });
}), Fn = (t) => !("href" in t && t.href) && !t.iconLeft && !t.iconRight && !t.iconOnly && !t.loading && t.progress === void 0 && !t.win && !t.mac && !t.hoverScale, Rn = Wt(function({
  children: s,
  className: a,
  circle: r = !1,
  disableHover: n = !1,
  fullWidth: m = !1,
  hoverScale: o = !1,
  iconOnly: i = !1,
  iconLeft: c,
  iconRight: p,
  loading: l = !1,
  loadingMode: d = "inline",
  loadingLabel: y = "Loading",
  progress: b,
  win: h,
  mac: j,
  size: w = "default",
  variant: z = "primary",
  ...v
}) {
  const { components: D } = Ge(), x = D.button, _ = "href" in v && !!v.href, u = b === void 0 ? void 0 : Math.min(100, Math.max(0, b)), S = u !== void 0, M = l || S, g = Ln ? j ?? h : h ?? j, N = l && d === "replace", f = Wr(
    "mm-button",
    `mm-button--${z}`,
    `mm-button--${w}`,
    r && "mm-button--circle",
    i && "mm-button--icon-only",
    m && "mm-button--full-width",
    n && "mm-button--disable-hover",
    o && "mm-button--hover-scale",
    l && "mm-button--loading",
    N && "mm-button--loading-replace",
    S && "mm-button--with-progress",
    a
  ), T = {
    ...(x == null ? void 0 : x.gap) && { "--mm-button-gap": x.gap },
    ...(x == null ? void 0 : x.iconSize) && { "--mm-button-icon-size": x.iconSize },
    ...(x == null ? void 0 : x.radius) && { "--mm-button-radius": x.radius }
  }, B = S && /* @__PURE__ */ e.jsxs("span", { className: "mm-button__progress-label", children: [
    " (",
    u,
    "%)"
  ] }), R = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    c,
    i ? /* @__PURE__ */ e.jsx("span", { className: "mm-button__sr-only", children: s }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      s,
      B
    ] }),
    !i && p
  ] }), A = (I) => /* @__PURE__ */ e.jsxs("span", { className: "mm-button__icon-transition", "aria-hidden": "true", children: [
    /* @__PURE__ */ e.jsx("span", { className: "mm-button__icon-transition-old", children: I }),
    /* @__PURE__ */ e.jsx("span", { className: "mm-button__icon-transition-loader", children: /* @__PURE__ */ e.jsx(Mt, { className: "mm-button__spinner" }) })
  ] }), F = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    l && c ? A(c) : l && !p ? /* @__PURE__ */ e.jsx(Mt, { className: "mm-button__spinner", "aria-hidden": "true" }) : c,
    i ? /* @__PURE__ */ e.jsx("span", { className: "mm-button__sr-only", children: l ? y : s }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      s,
      B
    ] }),
    l && p ? A(p) : !l && !i && p
  ] }), E = N ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("span", { className: "mm-button__content mm-button__content--default", children: R }),
    /* @__PURE__ */ e.jsx("span", { className: "mm-button__content mm-button__content--loading", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx(Mt, { className: "mm-button__spinner" }) })
  ] }) : /* @__PURE__ */ e.jsx("span", { className: "mm-button__content", children: F }), L = S ? /* @__PURE__ */ e.jsx("span", { className: "mm-button__progress-track", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("span", { className: "mm-button__progress-value", style: { width: `${u}%` } }) }) : null;
  if (_) {
    const I = v;
    return /* @__PURE__ */ e.jsxs(
      "a",
      {
        ...I,
        className: f,
        style: { ...T, ...I.style },
        "aria-label": N ? y : I["aria-label"],
        "aria-busy": M || void 0,
        "aria-keyshortcuts": g || void 0,
        "aria-disabled": M || void 0,
        onClick: M ? (W) => W.preventDefault() : I.onClick,
        children: [
          E,
          !N && g && /* @__PURE__ */ e.jsx("kbd", { className: "mm-button__shortcut", children: g }),
          L
        ]
      }
    );
  }
  const K = v;
  return /* @__PURE__ */ e.jsxs(
    "button",
    {
      ...K,
      style: { ...T, ...K.style },
      type: K.type ?? "button",
      className: f,
      "aria-label": N ? y : K["aria-label"],
      disabled: K.disabled || M,
      "aria-busy": M || void 0,
      "aria-keyshortcuts": g || void 0,
      children: [
        E,
        !N && g && /* @__PURE__ */ e.jsx("kbd", { className: "mm-button__shortcut", children: g }),
        L
      ]
    }
  );
}), Pe = Wt(function(s) {
  return Fn(s) ? /* @__PURE__ */ e.jsx(In, { ...s }) : /* @__PURE__ */ e.jsx(Rn, { ...s });
}), as = (...t) => t.filter(Boolean).join(" ");
function Sa({
  "aria-label": t,
  children: s,
  className: a,
  closeButton: r = !0,
  closeOnEscape: n = !0,
  closeOnOverlayClick: m = !0,
  defaultOpen: o = !1,
  description: i,
  actions: c,
  actionsAlign: p = "end",
  animation: l = "none",
  footerAside: d,
  footer: y,
  header: b,
  titleIcon: h,
  id: j,
  modal: w = !1,
  onClose: z,
  onOpenChange: v,
  open: D,
  placement: x = "center",
  size: _ = "default",
  showActions: u = !1,
  style: S,
  title: M
}) {
  const g = He(), N = j ?? `mm-dialog-${g}`, f = `${N}-title`, T = `${N}-description`, B = _ !== "xs", R = D !== void 0, [A, F] = q(o), E = R ? D : A, L = ke(null), K = ke(null), I = (Q) => {
    R || F(Q), v == null || v(Q), z == null || z();
  }, W = () => I(!1), k = c ?? (u ? {} : void 0), Y = (k == null ? void 0 : k.order) ?? ["cancel", "confirm"], P = (k == null ? void 0 : k.align) ?? p, C = () => {
    if (!k) return null;
    const Q = k.cancel === !1 ? void 0 : k.cancel ?? {}, H = k.confirm === !1 ? void 0 : k.confirm ?? {}, X = { cancel: Q, confirm: H };
    return /* @__PURE__ */ e.jsx("div", { className: as("mm-dialog__actions", `mm-dialog__actions--${P}`), children: Y.map((ce) => {
      const se = X[ce];
      if (!se) return null;
      const te = ce === "cancel", ve = te ? "Cancel" : "OK", ge = te ? "outline" : "primary";
      return /* @__PURE__ */ e.jsx(
        Pe,
        {
          "aria-label": se["aria-label"],
          disabled: se.disabled,
          iconLeft: se.icon,
          loading: se.loading,
          loadingLabel: se.loadingLabel,
          onClick: (ae) => se.onClick ? se.onClick(ae) : W(),
          size: se.size ?? (_ === "xs" || _ === "sm" ? _ : void 0),
          type: se.type ?? "button",
          variant: se.variant ?? ge,
          children: se.label ?? ve
        },
        ce
      );
    }) });
  };
  if (Me(() => {
    if (!E) return;
    K.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const Q = requestAnimationFrame(() => {
      var X;
      return (X = L.current) == null ? void 0 : X.focus({ preventScroll: !0 });
    }), H = document.body.style.overflow;
    return w && (document.body.style.overflow = "hidden"), () => {
      cancelAnimationFrame(Q), w && (document.body.style.overflow = H), requestAnimationFrame(() => {
        var X;
        return (X = K.current) == null ? void 0 : X.focus({ preventScroll: !0 });
      });
    };
  }, [E, w]), Me(() => {
    if (!E || !w) return;
    const Q = (H) => {
      if (H.key === "Escape" && n) {
        H.preventDefault(), W();
        return;
      }
      if (H.key !== "Tab" || !L.current) return;
      const X = Array.from(L.current.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (X.length === 0) {
        H.preventDefault(), L.current.focus();
        return;
      }
      const ce = X[0], se = X[X.length - 1];
      H.shiftKey && document.activeElement === ce ? (H.preventDefault(), se.focus()) : !H.shiftKey && document.activeElement === se && (H.preventDefault(), ce.focus());
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [n, E, w]), !E || typeof document > "u") return null;
  const V = (Q) => {
    Q.key === "Escape" && n && !w && (Q.preventDefault(), W());
  };
  return vs(
    /* @__PURE__ */ e.jsxs("div", { className: as("mm-dialog-layer", w && "mm-dialog-layer--modal", `mm-dialog-layer--${x}`), children: [
      w && /* @__PURE__ */ e.jsx("button", { "aria-label": "Close dialog", className: "mm-dialog-backdrop", onClick: m ? W : void 0, tabIndex: -1, type: "button" }),
      /* @__PURE__ */ e.jsxs(
        "div",
        {
          "aria-describedby": B && i ? T : void 0,
          "aria-label": t,
          "aria-labelledby": b === void 0 && M ? f : void 0,
          "aria-modal": w || void 0,
          className: as("mm-dialog", `mm-dialog--${_}`, `mm-dialog--animation-${l}`, a),
          onKeyDown: V,
          ref: L,
          role: "dialog",
          style: S,
          tabIndex: -1,
          children: [
            b !== void 0 ? /* @__PURE__ */ e.jsx("div", { className: "mm-dialog__header mm-dialog__header--custom", children: b }) : (M || B && i || r) && /* @__PURE__ */ e.jsxs("div", { className: "mm-dialog__header", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "mm-dialog__heading", children: [
                M && /* @__PURE__ */ e.jsxs("div", { className: "mm-dialog__title-row", children: [
                  h && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-dialog__title-icon", children: h }),
                  /* @__PURE__ */ e.jsx("h2", { className: "mm-dialog__title", id: f, children: M })
                ] }),
                B && i && /* @__PURE__ */ e.jsx("p", { className: "mm-dialog__description", id: T, children: i })
              ] }),
              r && /* @__PURE__ */ e.jsx("button", { "aria-label": "Close dialog", className: "mm-dialog__close", onClick: W, type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 18 }) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "mm-dialog__content", children: s }),
            (y || k) && /* @__PURE__ */ e.jsx("div", { className: as("mm-dialog__footer", y ? "mm-dialog__footer--custom" : !1), children: y ?? /* @__PURE__ */ e.jsx("div", { className: as("mm-dialog__footer-layout", P === "start" && "mm-dialog__footer-layout--actions-start"), children: P === "start" ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              C(),
              d && /* @__PURE__ */ e.jsx("div", { className: "mm-dialog__footer-aside", children: d })
            ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              d && /* @__PURE__ */ e.jsx("div", { className: "mm-dialog__footer-aside", children: d }),
              C()
            ] }) }) })
          ]
        }
      )
    ] }),
    document.body
  );
}
const Cn = (...t) => t.filter(Boolean).join(" "), Kr = (t) => Na.map(t, (s) => {
  if (!nn(s)) return s;
  const a = s, r = a.props.children === void 0 ? void 0 : Kr(a.props.children), n = {};
  return r !== void 0 && (n.children = r), a.type === "a" && (n.rel = "noopener noreferrer", n.target = "_blank"), ln(a, n);
}), Wn = {
  neutral: null,
  success: /* @__PURE__ */ e.jsx(Os, { "aria-hidden": "true", size: 20 }),
  warning: /* @__PURE__ */ e.jsx(es, { "aria-hidden": "true", size: 20 }),
  danger: /* @__PURE__ */ e.jsx(qs, { "aria-hidden": "true", size: 20 })
};
function Kn({
  "aria-label": t,
  children: s,
  className: a,
  confirmIcon: r,
  confirmLabel: n = "OK and Close",
  defaultOpen: m = !1,
  exitAnimation: o = "none",
  icon: i,
  id: c,
  onClose: p,
  onConfirm: l,
  onOpenChange: d,
  open: y,
  placement: b = "top",
  size: h = "default",
  title: j,
  variant: w = "neutral"
}) {
  const [z, v] = q(y ?? m), [D, x] = q(!1), _ = ke(), u = y !== void 0, S = (g) => {
    if (!D) {
      if (o === "none") {
        v(!1), g == null || g(), d == null || d(!1), p == null || p();
        return;
      }
      x(!0), _.current = window.setTimeout(() => {
        v(!1), x(!1), g == null || g(), d == null || d(!1), p == null || p();
      }, 180);
    }
  };
  Me(() => () => {
    _.current !== void 0 && window.clearTimeout(_.current);
  }, []), Me(() => {
    y ? (_.current !== void 0 && window.clearTimeout(_.current), z || v(!0), D && x(!1)) : u && y === !1 && z && !D && S();
  }, [u, D, y, z]);
  const M = () => {
    S(l);
  };
  return /* @__PURE__ */ e.jsx(
    Sa,
    {
      "aria-label": t,
      actions: { align: "center", cancel: !1, confirm: { icon: r, label: n, onClick: M, size: h === "sm" ? "sm" : void 0, variant: "dashed" } },
      className: Cn("mm-alert", `mm-alert--${w}`, `mm-alert--${h}`, D && `mm-alert--exit-${o}`, a),
      closeButton: !1,
      closeOnEscape: !1,
      closeOnOverlayClick: !1,
      defaultOpen: m,
      id: c,
      modal: !0,
      onClose: p,
      onOpenChange: (g) => {
        g ? d == null || d(!0) : S();
      },
      open: z,
      placement: b,
      size: h === "sm" ? "sm" : "default",
      title: j,
      titleIcon: i !== void 0 ? i : Wn[w],
      children: Kr(s)
    }
  );
}
const Yr = gt(null);
function Ql({ children: t }) {
  const [s, a] = q([]), r = ke(0), n = ke(null), m = at((d, y) => a((b) => {
    const h = b[0];
    return !h || h.id !== d ? b : (h.resolve(y), b.slice(1));
  }), []), o = at((d) => new Promise((y) => {
    const b = ++r.current;
    a((h) => [...h, { id: b, options: d, resolve: y }]);
  }), []), i = s[0], c = (d) => {
    if (!i || d) return;
    const y = n.current === i.id;
    n.current = null, m(i.id, y);
  }, p = () => {
    i && (n.current = i.id);
  }, l = { show: o };
  return /* @__PURE__ */ e.jsxs(Yr.Provider, { value: l, children: [
    t,
    i && /* @__PURE__ */ e.jsx(Kn, { ...i.options, onClose: i.options.onClose, onConfirm: p, onOpenChange: c, open: !0 })
  ] });
}
function eo() {
  const t = vt(Yr);
  if (!t) throw new Error("useAlert must be used within AlertProvider");
  return t;
}
const Ra = (...t) => t.filter(Boolean).join(" "), Yn = {
  neutral: null,
  info: /* @__PURE__ */ e.jsx(bs, { "aria-hidden": "true", size: 20 }),
  success: /* @__PURE__ */ e.jsx(Os, { "aria-hidden": "true", size: 20 }),
  warning: /* @__PURE__ */ e.jsx(es, { "aria-hidden": "true", size: 20 }),
  danger: /* @__PURE__ */ e.jsx(qs, { "aria-hidden": "true", size: 20 })
};
function Hn({
  "aria-label": t,
  actions: s,
  actionsLabel: a,
  avatar: r,
  badge: n,
  children: m,
  className: o,
  closeLabel: i = "Close notification",
  closable: c = !0,
  defaultOpen: p = !0,
  duration: l = 5e3,
  href: d,
  icon: y,
  id: b,
  layout: h = "inline",
  loading: j = !1,
  maxWidth: w,
  onClick: z,
  onClose: v,
  onOpenChange: D,
  onRead: x,
  open: _,
  pauseOnFocus: u = !0,
  pauseOnHover: S = !0,
  position: M = "bottom-right",
  progress: g = !0,
  read: N = !1,
  role: f,
  size: T = "default",
  style: B,
  theme: R = "light",
  timestamp: A,
  title: F,
  unread: E = !1,
  variant: L = "neutral"
}) {
  const K = _ !== void 0, [I, W] = q(_ ?? p), [k, Y] = q(!1), [P, C] = q(!1), [V, Q] = q(typeof l == "number" ? l : 0), H = ke(), X = ke(), ce = ke(), se = at(() => {
    !I || !k || (W(!1), Y(!1), D == null || D(!1), v == null || v());
  }, [k, v, D, I]), te = at(() => {
    !I || k || j || (X.current !== void 0 && window.clearTimeout(X.current), Y(!0));
  }, [k, j, I]);
  if (Me(() => {
    K && (_ ? (ce.current !== void 0 && window.clearTimeout(ce.current), W(!0), Y(!1)) : I && Y(!0));
  }, [K, _, I]), Me(() => {
    _ && typeof l == "number" && Q(l);
  }, [l, _]), Me(() => {
    if (!(typeof l != "number" || l <= 0 || !I || k || P)) {
      if (V <= 0) {
        te();
        return;
      }
      return H.current = Date.now(), X.current = window.setTimeout(te, V), () => {
        X.current !== void 0 && window.clearTimeout(X.current), H.current !== void 0 && Q((U) => Math.max(0, U - (Date.now() - H.current)));
      };
    }
  }, [te, k, l, P, V, I]), Me(() => () => {
    X.current !== void 0 && window.clearTimeout(X.current), ce.current !== void 0 && window.clearTimeout(ce.current);
  }, []), Me(() => {
    if (k)
      return ce.current = window.setTimeout(se, 700), () => {
        ce.current !== void 0 && window.clearTimeout(ce.current);
      };
  }, [k, se]), !I) return null;
  const ve = f ?? (L === "danger" || L === "warning" ? "alert" : "status"), ge = typeof l == "number" && l > 0 && g, ae = !!((z || x || d) && !j), fe = () => {
    E && !N && (x == null || x()), z == null || z();
  }, de = (U) => {
    (U.key === "Enter" || U.key === " ") && (U.preventDefault(), fe());
  }, oe = w === void 0 ? B : { ...B, "--mm-toast-max-width": typeof w == "number" ? `${w}px` : w }, xe = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: Ra("mm-toast__icon", !!r && "mm-toast__icon--avatar"), children: r ?? (y !== void 0 ? y : Yn[L]) }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-toast__body", children: [
      (F || n || E && !N) && /* @__PURE__ */ e.jsxs("div", { className: "mm-toast__heading", children: [
        /* @__PURE__ */ e.jsx("strong", { className: "mm-toast__title", children: F }),
        n,
        E && !N && /* @__PURE__ */ e.jsx("span", { "aria-label": "Unread", className: "mm-toast__unread" })
      ] }),
      m && /* @__PURE__ */ e.jsx("div", { className: "mm-toast__content", children: m }),
      A && /* @__PURE__ */ e.jsx("time", { className: "mm-toast__timestamp", children: A }),
      s && /* @__PURE__ */ e.jsx("div", { "aria-label": a, className: "mm-toast__actions", onClick: (U) => U.stopPropagation(), children: s })
    ] }),
    j && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-toast__spinner", role: "status" }),
    c && /* @__PURE__ */ e.jsx(Pe, { "aria-label": i, className: "mm-toast__close", disabled: j, iconOnly: !0, iconLeft: /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: T === "sm" ? 12 : 16 }), onClick: (U) => {
      U.stopPropagation(), te();
    }, size: "xs", variant: "text" }),
    ge && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-toast__progress", style: { animationDuration: `${l}ms` } })
  ] }), ie = Ra("mm-toast", `mm-toast--${L}`, `mm-toast--${T}`, `mm-toast--${h}`, `mm-toast--${M}`, `mm-toast--${R}`, `mm-toast--${ge ? "progress" : "static"}`, `mm-toast--${P ? "paused" : ""}`, E && !N && "mm-toast--unread", ae && "mm-toast--interactive", j && "mm-toast--loading", k && "mm-toast--closing", o), re = {
    "aria-atomic": !0,
    "aria-label": t,
    className: ie,
    id: b,
    onBlur: u ? () => C(!1) : void 0,
    onFocus: u ? () => C(!0) : void 0,
    onMouseEnter: S ? () => C(!0) : void 0,
    onMouseLeave: S ? () => C(!1) : void 0,
    onAnimationEnd: (U) => {
      k && U.animationName.startsWith("mm-toast-exit-") && se();
    },
    style: oe
  };
  return d ? /* @__PURE__ */ e.jsx("a", { ...re, href: d, onClick: ae ? fe : void 0, children: xe }) : /* @__PURE__ */ e.jsx("article", { ...re, onClick: ae ? fe : void 0, onKeyDown: ae ? de : void 0, role: ae ? "button" : ve, tabIndex: ae ? 0 : void 0, children: xe });
}
const Un = (...t) => t.filter(Boolean).join(" ");
function Vn({ children: t, className: s, maxWidth: a, position: r = "bottom-right" }) {
  const n = a === void 0 ? void 0 : { "--mm-toast-stack-width": typeof a == "number" ? `${a}px` : a };
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", className: Un("mm-toast-stack", `mm-toast-stack--${r}`, s), style: n, children: t });
}
const Hr = gt(null);
function to({ children: t }) {
  const [s, a] = q([]), r = at((p) => {
    const l = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return a((d) => [...d, { id: l, options: p, open: !0 }]), l;
  }, []), n = at((p) => a((l) => l.map((d) => d.id === p ? { ...d, open: !1 } : d)), []), m = at(() => a((p) => p.map((l) => ({ ...l, open: !1 }))), []), o = (p) => (l, d = {}) => r({ ...d, children: l, variant: p }), i = { show: r, success: o("success"), info: o("info"), warning: o("warning"), danger: o("danger"), close: n, closeAll: m }, c = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];
  return /* @__PURE__ */ e.jsxs(Hr.Provider, { value: i, children: [
    t,
    c.map((p) => {
      const l = s.filter((d) => (d.options.position ?? "bottom-right") === p);
      return l.length ? /* @__PURE__ */ e.jsx(Vn, { position: p, children: l.map((d) => /* @__PURE__ */ Fs(Hn, { ...d.options, id: d.id, key: d.id, onClose: () => a((y) => y.filter((b) => b.id !== d.id)), onOpenChange: (y) => {
        y || a((b) => b.filter((h) => h.id !== d.id));
      }, open: d.open })) }, p) : null;
    })
  ] });
}
function so() {
  const t = vt(Hr);
  if (!t) throw new Error("useToastNotification must be used within ToastNotificationProvider");
  return t;
}
const pa = (...t) => t.filter(Boolean).join(" ");
function On({
  actionIcon: t,
  actionLabel: s = "Cancel",
  ariaLabel: a,
  children: r,
  className: n,
  defaultOpen: m = !0,
  duration: o = !1,
  icon: i,
  onAction: c,
  onClose: p,
  onOpenChange: l,
  open: d,
  position: y = "bottom-right",
  showAction: b = !0,
  size: h = "default",
  style: j,
  width: w = 350
}) {
  const z = d !== void 0, v = b || typeof o == "number" && o > 0 ? o : 1e4, [D, x] = q(d ?? m), [_, u] = q(!1), [S, M] = q(typeof v == "number" ? v : 0), g = ke(), N = at(() => {
    !D || !_ || (x(!1), u(!1), l == null || l(!1), p == null || p());
  }, [_, p, l, D]), f = at(() => {
    !D || _ || u(!0);
  }, [_, D]);
  if (Me(() => {
    z && (d ? (g.current !== void 0 && window.clearTimeout(g.current), x(!0), u(!1)) : D && u(!0));
  }, [z, d, D]), Me(() => {
    typeof v == "number" && M(v);
  }, [v, d]), Me(() => {
    if (!D || typeof v != "number" || v <= 0) return;
    const F = Date.now(), E = window.setInterval(() => {
      const L = Math.max(0, v - (Date.now() - F));
      M(L), L <= 0 && (window.clearInterval(E), f());
    }, 100);
    return () => window.clearInterval(E);
  }, [f, v, D]), Me(() => () => {
    g.current !== void 0 && window.clearTimeout(g.current);
  }, []), Me(() => {
    if (_)
      return g.current = window.setTimeout(N, 700), () => {
        g.current !== void 0 && window.clearTimeout(g.current);
      };
  }, [_, N]), !D) return null;
  const T = typeof v == "number" && v > 0, B = Math.ceil(S / 1e3), A = { "--mm-mini-toast-progress": T ? `${Math.max(0, Math.min(1, S / v)) * 360}deg` : "360deg", "--mm-mini-toast-width": typeof w == "number" ? `${w}px` : w };
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": a, className: pa("mm-mini-toast", `mm-mini-toast--${y}`, `mm-mini-toast--${h}`, T && "mm-mini-toast--countdown", !b && "mm-mini-toast--countdown-only", _ && "mm-mini-toast--closing", n), onAnimationEnd: (F) => {
    _ && F.animationName.startsWith("mm-mini-toast-exit-") && N();
  }, style: { ...j, ...A }, children: [
    /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-mini-toast__icon", children: i }),
    /* @__PURE__ */ e.jsx("span", { className: "mm-mini-toast__message", children: r }),
    T && /* @__PURE__ */ e.jsx("span", { "aria-label": `${B} seconds remaining`, className: "mm-mini-toast__countdown", role: "timer", children: /* @__PURE__ */ e.jsx("span", { children: B }) }),
    b && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-mini-toast__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ e.jsxs("button", { "aria-label": typeof s == "string" ? s : "Cancel", className: pa("mm-mini-toast__action", !s && "mm-mini-toast__action--icon-only"), onClick: () => {
        c == null || c(), f();
      }, type: "button", children: [
        t,
        s && /* @__PURE__ */ e.jsx("span", { children: s })
      ] })
    ] })
  ] });
}
function qn({ children: t, className: s, position: a = "bottom-right" }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", className: pa("mm-mini-toast-stack", `mm-mini-toast-stack--${a}`, s), children: t });
}
const Ur = gt(null);
function ao({ children: t }) {
  const [s, a] = q([]), r = at((c) => {
    const p = `mini-toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return a((l) => [...l, { id: p, options: c, open: !0 }]), p;
  }, []), n = at((c) => a((p) => p.map((l) => l.id === c ? { ...l, open: !1 } : l)), []), m = at(() => a((c) => c.map((p) => ({ ...p, open: !1 }))), []), o = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"], i = { show: r, close: n, closeAll: m };
  return /* @__PURE__ */ e.jsxs(Ur.Provider, { value: i, children: [
    t,
    o.map((c) => {
      const p = s.filter((l) => (l.options.position ?? "bottom-right") === c);
      return p.length ? /* @__PURE__ */ e.jsx(qn, { position: c, children: p.map((l) => /* @__PURE__ */ Fs(On, { ...l.options, key: l.id, onClose: () => a((d) => d.filter((y) => y.id !== l.id)), onOpenChange: (d) => {
        d || a((y) => y.filter((b) => b.id !== l.id));
      }, open: l.open })) }, c) : null;
    })
  ] });
}
function ro() {
  const t = vt(Ur);
  if (!t) throw new Error("useMiniToast must be used within MiniToastProvider");
  return t;
}
const Xn = (...t) => t.filter(Boolean).join(" "), Gn = {
  neutral: /* @__PURE__ */ e.jsx(bs, { "aria-hidden": "true", size: 18 }),
  success: /* @__PURE__ */ e.jsx(Os, { "aria-hidden": "true", size: 18 }),
  warning: /* @__PURE__ */ e.jsx(es, { "aria-hidden": "true", size: 18 }),
  danger: /* @__PURE__ */ e.jsx(qs, { "aria-hidden": "true", size: 18 })
};
function no({
  "aria-label": t,
  children: s,
  className: a,
  closeLabel: r = "Close alert",
  defaultOpen: n = !0,
  dismissIcon: m,
  dismissLabel: o = "OK and Close",
  dismissMode: i = "icon",
  exitAnimation: c = "none",
  fullWidth: p = !1,
  icon: l,
  onClose: d,
  onOpenChange: y,
  open: b,
  size: h = "default",
  title: j,
  variant: w = "neutral"
}) {
  const z = b !== void 0, [v, D] = q(b ?? n), [x, _] = q(!1), u = ke();
  Me(() => () => {
    u.current !== void 0 && window.clearTimeout(u.current);
  }, []);
  const S = () => {
    D(!1), _(!1), y == null || y(!1), d == null || d();
  }, M = () => {
    if (!x) {
      if (c === "none") {
        S();
        return;
      }
      _(!0), u.current = window.setTimeout(S, 180);
    }
  };
  return Me(() => {
    b ? (u.current !== void 0 && window.clearTimeout(u.current), v || D(!0), x && _(!1)) : z && b === !1 && v && !x && M();
  }, [b, x, z, v]), v ? /* @__PURE__ */ e.jsxs("div", { "aria-atomic": "true", "aria-label": t, className: Xn("mm-alert-inline", `mm-alert-inline--${w}`, `mm-alert-inline--${h}`, p && "mm-alert-inline--full-width", `mm-alert-inline--dismiss-${i}`, x && `mm-alert-inline--exit-${c}`, a), role: "alert", children: [
    /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-alert-inline__icon", children: l !== void 0 ? l : Gn[w] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-alert-inline__body", children: [
      j && /* @__PURE__ */ e.jsx("div", { className: "mm-alert-inline__title", children: j }),
      s && /* @__PURE__ */ e.jsx("div", { className: "mm-alert-inline__content", children: s }),
      i === "button" && /* @__PURE__ */ e.jsx(Pe, { className: "mm-alert-inline__action", iconLeft: m, onClick: M, size: "sm", variant: "dashed", children: o })
    ] }),
    i === "icon" && /* @__PURE__ */ e.jsx(Pe, { "aria-label": r, className: "mm-alert-inline__close", iconOnly: !0, iconLeft: /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: h === "sm" ? 14 : 16 }), onClick: M, size: "xs", variant: "text" })
  ] }) : null;
}
const Qs = (...t) => t.filter(Boolean).join(" "), Jn = (t) => t === "success" ? /* @__PURE__ */ e.jsx(Ct, { "aria-hidden": "true", size: 14 }) : t === "pending" ? /* @__PURE__ */ e.jsx(za, { "aria-hidden": "true", size: 14 }) : t === "warning" ? /* @__PURE__ */ e.jsx(es, { "aria-hidden": "true", size: 14 }) : t === "danger" ? /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: 14 }) : /* @__PURE__ */ e.jsx(Tr, { "aria-hidden": "true", size: 9 });
function io({
  items: t = [],
  children: s,
  size: a,
  variant: r,
  reverse: n = !1,
  showConnector: m,
  showGroups: o = !1,
  collapsible: i = !1,
  activeKey: c,
  defaultActiveKey: p,
  onActiveChange: l,
  expandedKeys: d,
  defaultExpandedKeys: y = [],
  onExpandedChange: b,
  onItemClick: h,
  loading: j = !1,
  emptyState: w = "No activity yet.",
  maxHeight: z,
  className: v,
  style: D,
  "aria-label": x = "Activity feed"
}) {
  const { components: _ } = Ge(), u = _.activityFeed, S = a ?? (u == null ? void 0 : u.size) ?? "default", M = r ?? (u == null ? void 0 : u.variant) ?? "default", g = m ?? (u == null ? void 0 : u.showConnector) ?? !0, [N, f] = q(p), [T, B] = q(y), R = d ?? T, A = n ? [...t].reverse() : t, F = (P, C) => {
    P.disabled || (c === void 0 && f(P.key), l == null || l(P.key, P), h == null || h(P, C));
  }, E = (P) => {
    const C = R.includes(P.key) ? R.filter((V) => V !== P.key) : [...R, P.key];
    d === void 0 && B(C), b == null || b(C, P);
  }, L = (P, C, V) => {
    (P.key === "Enter" || P.key === " ") && h && (P.preventDefault(), F(C, V));
  }, K = (P, C) => {
    const V = (c ?? N) === P.key, Q = R.includes(P.key), H = !!h && !P.disabled, X = P.avatar ?? P.icon ?? Jn(P.status), ce = P.href ? /* @__PURE__ */ e.jsx("a", { href: P.href, children: P.title }) : P.title;
    return /* @__PURE__ */ e.jsxs("article", { "aria-current": V ? "true" : void 0, className: Qs("mm-activity-feed__item", V && "mm-activity-feed__item--active", P.unread && "mm-activity-feed__item--unread", P.disabled && "mm-activity-feed__item--disabled", P.status && `mm-activity-feed__item--${P.status}`), onClick: H ? () => F(P, C) : void 0, onKeyDown: H ? (se) => L(se, P, C) : void 0, role: H ? "button" : void 0, tabIndex: H ? 0 : void 0, children: [
      /* @__PURE__ */ e.jsx("div", { className: "mm-activity-feed__rail", children: /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: Qs("mm-activity-feed__marker", !!P.avatar && "mm-activity-feed__marker--avatar"), children: X }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-activity-feed__body", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-activity-feed__header", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "mm-activity-feed__heading", children: [
            P.actor && /* @__PURE__ */ e.jsx("span", { className: "mm-activity-feed__actor", children: P.actor }),
            /* @__PURE__ */ e.jsx("h3", { children: ce }),
            P.unread && /* @__PURE__ */ e.jsx("span", { "aria-label": "Unread", className: "mm-activity-feed__unread" })
          ] }),
          P.timestamp && /* @__PURE__ */ e.jsx("time", { className: "mm-activity-feed__time", children: P.timestamp })
        ] }),
        P.description && /* @__PURE__ */ e.jsx("p", { className: "mm-activity-feed__description", children: P.description }),
        P.metadata && /* @__PURE__ */ e.jsx("div", { className: "mm-activity-feed__metadata", children: P.metadata }),
        P.content && /* @__PURE__ */ e.jsx("div", { className: "mm-activity-feed__content", children: P.content }),
        P.actions && /* @__PURE__ */ e.jsx("div", { className: "mm-activity-feed__actions", onClick: (se) => se.stopPropagation(), children: P.actions }),
        i && P.details && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("button", { "aria-expanded": Q, className: "mm-activity-feed__details-trigger", onClick: (se) => {
            se.stopPropagation(), E(P);
          }, type: "button", children: [
            Q ? /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", size: 15 }) : /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 15 }),
            " ",
            Q ? "Hide details" : "View details"
          ] }),
          Q && /* @__PURE__ */ e.jsx("div", { className: "mm-activity-feed__details", children: P.details })
        ] })
      ] })
    ] }, P.key);
  }, I = s ?? (j ? /* @__PURE__ */ e.jsx(e.Fragment, { children: [1, 2, 3].map((P) => /* @__PURE__ */ e.jsxs("div", { "aria-hidden": "true", className: "mm-activity-feed__skeleton", children: [
    /* @__PURE__ */ e.jsx("span", {}),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("b", {}),
      /* @__PURE__ */ e.jsx("i", {}),
      /* @__PURE__ */ e.jsx("i", {})
    ] })
  ] }, P)) }) : A.length ? A.map(K) : /* @__PURE__ */ e.jsxs("div", { className: "mm-activity-feed__empty", children: [
    /* @__PURE__ */ e.jsx(bs, { "aria-hidden": "true", size: 18 }),
    /* @__PURE__ */ e.jsx("span", { children: w })
  ] })), W = !s && o && !j ? A.reduce((P, C, V) => {
    const Q = A[V - 1];
    return C.group && C.group !== (Q == null ? void 0 : Q.group) && P.push(/* @__PURE__ */ e.jsx("div", { className: "mm-activity-feed__group", children: C.group }, `group-${C.key}`)), P.push(K(C, V)), P;
  }, []) : I, k = (u == null ? void 0 : u.horizontalPadding) ?? (S === "sm" ? 10 : 14), Y = (u == null ? void 0 : u.verticalPadding) ?? (S === "sm" ? 6 : 8);
  return /* @__PURE__ */ e.jsx("section", { "aria-label": x, className: Qs("mm-activity-feed", `mm-activity-feed--${S}`, `mm-activity-feed--${M}`, g && "mm-activity-feed--connector", v), style: { ...D, "--mm-activity-feed-max-height": typeof z == "number" ? `${z}px` : z, "--mm-activity-feed-horizontal-padding": typeof k == "number" ? `${k}px` : k, "--mm-activity-feed-vertical-padding": typeof Y == "number" ? `${Y}px` : Y }, children: W });
}
const Zn = (...t) => t.filter(Boolean).join(" "), Qn = {
  neutral: /* @__PURE__ */ e.jsx(bs, { "aria-hidden": "true", size: 20 }),
  info: /* @__PURE__ */ e.jsx(bs, { "aria-hidden": "true", size: 20 }),
  success: /* @__PURE__ */ e.jsx(Os, { "aria-hidden": "true", size: 20 }),
  warning: /* @__PURE__ */ e.jsx(es, { "aria-hidden": "true", size: 20 }),
  danger: /* @__PURE__ */ e.jsx(qs, { "aria-hidden": "true", size: 20 })
};
function lo({
  "aria-label": t,
  actions: s,
  children: a,
  className: r,
  closeLabel: n = "Close banner",
  defaultOpen: m = !0,
  dismissible: o = !0,
  dismissIcon: i,
  dismissLabel: c = "Dismiss",
  dismissMode: p = "icon",
  fullWidth: l = !1,
  icon: d,
  id: y,
  layout: b,
  loading: h = !1,
  onClose: j,
  onOpenChange: w,
  open: z,
  position: v,
  size: D,
  style: x,
  title: _,
  variant: u
}) {
  const { components: S } = Ge(), M = S.banner, g = b ?? (M == null ? void 0 : M.layout) ?? "inline", N = v ?? (M == null ? void 0 : M.position) ?? "static", f = D ?? (M == null ? void 0 : M.size) ?? "default", T = u ?? (M == null ? void 0 : M.variant) ?? "neutral", B = z !== void 0, [R, A] = q(z ?? m);
  Me(() => {
    B && A(!!z);
  }, [B, z]);
  const F = () => {
    B ? w == null || w(!1) : A(!1), j == null || j();
  };
  return R ? /* @__PURE__ */ e.jsxs("aside", { "aria-atomic": "true", "aria-label": t, className: Zn("mm-banner", `mm-banner--${T}`, `mm-banner--${f}`, `mm-banner--${g}`, `mm-banner--${N}`, !_ && "mm-banner--message", l && "mm-banner--full-width", h && "mm-banner--loading", r), id: y, role: T === "danger" || T === "warning" ? "alert" : "status", style: x, children: [
    /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-banner__icon", children: d !== void 0 ? d : Qn[T] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-banner__body", children: [
      _ && /* @__PURE__ */ e.jsx("div", { className: "mm-banner__title", children: _ }),
      a && /* @__PURE__ */ e.jsx("div", { className: "mm-banner__content", children: a })
    ] }),
    (s || h) && /* @__PURE__ */ e.jsx("div", { className: "mm-banner__actions", children: h ? /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-banner__spinner", role: "status" }) : s }),
    o && (p === "button" ? /* @__PURE__ */ e.jsx(Pe, { className: "mm-banner__dismiss-button", disabled: h, iconLeft: i, onClick: F, size: f === "lg" ? "default" : "sm", variant: "outline", children: c }) : /* @__PURE__ */ e.jsx(Pe, { "aria-label": n, className: "mm-banner__close", disabled: h, iconOnly: !0, iconLeft: i ?? /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: f === "sm" ? 14 : 16 }), onClick: F, size: "xs", variant: "text" }))
  ] }) : null;
}
const ei = (...t) => t.filter(Boolean).join(" ");
function ti(t, s) {
  return typeof t != "number" || s === void 0 || t <= s ? String(t) : `${s}+`;
}
function si({
  "aria-label": t,
  className: s,
  count: a,
  dot: r = !1,
  disabled: n = !1,
  icon: m,
  loading: o = !1,
  max: i,
  onClick: c,
  onRemove: p,
  removable: l = !1,
  showZero: d = !1,
  shape: y = "pill",
  size: b = "default",
  tone: h = "neutral",
  variant: j = "soft"
}) {
  const v = a !== void 0 && (d || !(a === 0 || typeof a == "string" && a === "0")), D = !!c && !n && !o, x = o, _ = (S) => {
    !D || !c || (S.key === "Enter" || S.key === " ") && (S.preventDefault(), c(S));
  }, u = (S) => {
    n || x || p == null || p(S);
  };
  return !v && !r ? null : /* @__PURE__ */ e.jsxs(
    "span",
    {
      "aria-busy": x || void 0,
      "aria-label": t,
      className: ei(
        "mm-badge",
        `mm-badge--${b}`,
        `mm-badge--${h}`,
        `mm-badge--${j}`,
        `mm-badge--${y}`,
        r && "mm-badge--dot",
        D && "mm-badge--interactive",
        (n || x) && "mm-badge--disabled",
        s
      ),
      onClick: D ? c : void 0,
      onKeyDown: _,
      role: D ? "button" : void 0,
      tabIndex: D ? 0 : void 0,
      children: [
        x && /* @__PURE__ */ e.jsx("span", { "aria-label": o ? "Loading" : "Removing", className: "mm-badge__spinner", role: "status" }),
        !x && m && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-badge__icon", children: m }),
        !x && r && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-badge__dot" }),
        !x && v && /* @__PURE__ */ e.jsx("span", { className: "mm-badge__content", children: ti(a, i) }),
        l && /* @__PURE__ */ e.jsx("button", { "aria-label": "Remove badge", className: "mm-badge__remove", disabled: n || x, onClick: u, type: "button", children: /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true" }) })
      ]
    }
  );
}
const Ca = (...t) => t.filter(Boolean).join(" ");
function oo({
  badge: t,
  children: s,
  className: a,
  hidden: r = !1,
  pulse: n = !1,
  position: m = "top-right",
  ...o
}) {
  const i = t !== void 0 || o.dot || o.count !== void 0;
  return /* @__PURE__ */ e.jsxs("span", { className: Ca("mm-badge-indicator", a), children: [
    s,
    !r && i && /* @__PURE__ */ e.jsx("span", { className: Ca("mm-badge-indicator__badge", `mm-badge-indicator__badge--${m}`, n && "mm-badge-indicator__badge--pulse"), children: t ?? /* @__PURE__ */ e.jsx(si, { ...o }) })
  ] });
}
const Wa = (...t) => t.filter(Boolean).join(" ");
function co({
  "aria-label": t,
  avatar: s,
  children: a,
  className: r,
  closeIcon: n,
  defaultSelected: m = !1,
  disabled: o = !1,
  href: i,
  icon: c,
  id: p,
  loading: l = !1,
  onClick: d,
  onRemove: y,
  onSelectedChange: b,
  removable: h = !1,
  removeLabel: j = "Remove tag",
  selectable: w = !1,
  selected: z,
  shape: v = "pill",
  size: D = "default",
  style: x,
  title: _,
  tone: u = "neutral",
  truncate: S = !1,
  variant: M = "soft"
}) {
  const g = z !== void 0, [N, f] = q(m), T = z ?? N, B = l, R = !!(d || w || i) && !o && !B, A = (I) => {
    if (R) {
      if (w) {
        const W = !T;
        g || f(W), b == null || b(W);
      }
      d == null || d(I);
    }
  }, F = (I) => {
    !R || i || (I.key === "Enter" || I.key === " ") && (I.preventDefault(), A(I));
  }, E = (I) => {
    I.stopPropagation(), !o && !B && (y == null || y(I));
  }, L = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    B && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-tag__spinner", role: "status" }),
    !B && s && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-tag__avatar", children: s }),
    !B && !s && c && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-tag__icon", children: c }),
    /* @__PURE__ */ e.jsx("span", { className: Wa("mm-tag__content", S && "mm-tag__content--truncate"), children: a }),
    h && /* @__PURE__ */ e.jsx("button", { "aria-label": j, className: "mm-tag__remove", disabled: o || B, onClick: E, type: "button", children: n ?? /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true" }) })
  ] }), K = Wa("mm-tag", `mm-tag--${D}`, `mm-tag--${u}`, `mm-tag--${M}`, `mm-tag--${v}`, T && "mm-tag--selected", R && "mm-tag--interactive", (o || B) && "mm-tag--disabled", r);
  return i ? /* @__PURE__ */ e.jsx("a", { "aria-label": t, className: K, href: i, id: p, onClick: A, style: x, title: _, children: L }) : /* @__PURE__ */ e.jsx("span", { "aria-label": t, "aria-pressed": w ? T : void 0, className: K, id: p, onClick: R ? A : void 0, onKeyDown: F, role: R ? "button" : void 0, style: x, tabIndex: R ? 0 : void 0, title: _, children: L });
}
const ea = (...t) => t.filter(Boolean).join(" "), ks = (t) => !("type" in t);
function Ta({
  "aria-label": t = "Menu",
  className: s,
  closeSubmenusOnMouseLeave: a = !1,
  defaultSelectedKeys: r = [],
  entries: n,
  footer: m,
  maxHeight: o,
  onSelect: i,
  role: c = "menu",
  selectable: p = !1,
  selectedKeys: l,
  size: d = "default",
  submenuCloseDelay: y = 1e4,
  variant: b = "default",
  width: h = 280,
  defaultOpenKeys: j = [],
  openKeys: w,
  onOpenChange: z
}) {
  const v = He(), D = ke(null), x = ke(null), [_, u] = q(r), [S, M] = q(-1), [g, N] = q(j), f = mt(() => n.map((k, Y) => ks(k) && !k.disabled ? Y : -1).filter((k) => k >= 0), [n]), T = l ?? _, B = w ?? g, R = n.some((k) => {
    var Y;
    return ks(k) && !!((Y = k.submenu) != null && Y.length);
  }), A = () => {
    x.current !== null && (clearTimeout(x.current), x.current = null);
  }, F = () => {
    A(), !(!a || !R || !B.length) && (x.current = setTimeout(() => {
      w === void 0 && N([]), z == null || z([]), x.current = null;
    }, Math.max(0, y)));
  };
  Me(() => () => A(), []), Me(() => {
    if (!B.length) return;
    const k = (Y) => {
      var P;
      (P = D.current) != null && P.contains(Y.target) || (w === void 0 && N([]), z == null || z([]));
    };
    return document.addEventListener("pointerdown", k), () => document.removeEventListener("pointerdown", k);
  }, [w, B.length, z]), Me(() => {
    S >= 0 && !f.includes(S) && M(-1);
  }, [S, f]);
  const E = (k) => {
    var P;
    const Y = n[k];
    if (!(!Y || !ks(Y) || Y.disabled)) {
      if (M(k), p) {
        const C = T.includes(Y.key) ? T.filter((V) => V !== Y.key) : [...T, Y.key];
        l === void 0 && u(C);
      }
      (P = Y.onClick) == null || P.call(Y), i == null || i(Y.key, Y);
    }
  }, L = (k) => {
    const Y = B.includes(k) ? B.filter((P) => P !== k) : [...B, k];
    w === void 0 && N(Y), z == null || z(Y);
  }, K = (k, Y = 0) => k.map((P, C) => {
    var se;
    if ("type" in P && P.type === "divider") return /* @__PURE__ */ e.jsx("div", { "aria-hidden": "true", className: "mm-menu__divider" }, P.key ?? `${v}-divider-${Y}-${C}`);
    if ("type" in P && P.type === "label") return /* @__PURE__ */ e.jsx("div", { className: "mm-menu__label", children: P.label }, P.key ?? `${v}-label-${Y}-${C}`);
    if ("type" in P && P.type === "content") return /* @__PURE__ */ e.jsx("div", { className: "mm-menu__content-entry", children: P.content }, P.key ?? `${v}-content-${Y}-${C}`);
    if (!ks(P)) return null;
    const Q = T.includes(P.key) || P.checked === !0, H = !!((se = P.submenu) != null && se.length), X = B.includes(P.key), ce = /* @__PURE__ */ e.jsxs("button", { "aria-checked": p ? Q : void 0, "aria-disabled": P.disabled || void 0, "aria-expanded": H ? X : void 0, "aria-haspopup": H ? "menu" : void 0, className: ea("mm-menu__item", S === C && Y === 0 && "mm-menu__item--active", Q && "mm-menu__item--selected", P.danger && "mm-menu__item--danger", P.disabled && "mm-menu__item--disabled"), disabled: P.disabled, onClick: () => {
      var te;
      return H ? L(P.key) : Y === 0 ? E(C) : ((te = P.onClick) == null || te.call(P), i == null ? void 0 : i(P.key, P));
    }, onMouseEnter: () => {
      H && !P.disabled && !X && L(P.key);
    }, role: c === "listbox" ? "option" : "menuitem", type: "button", children: [
      P.image ? /* @__PURE__ */ e.jsx("img", { alt: "", className: "mm-menu__image", src: P.image }) : P.icon ? /* @__PURE__ */ e.jsx("span", { className: "mm-menu__icon", children: P.icon }) : null,
      /* @__PURE__ */ e.jsxs("span", { className: "mm-menu__content", children: [
        /* @__PURE__ */ e.jsx("span", { className: "mm-menu__label-text", children: P.label }),
        P.description ? /* @__PURE__ */ e.jsx("span", { className: "mm-menu__description", children: P.description }) : null
      ] }),
      P.shortcut ? /* @__PURE__ */ e.jsx("span", { className: "mm-menu__shortcut", children: P.shortcut }) : null,
      H ? /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-menu__submenu-arrow", children: "›" }) : Q ? /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-menu__check", children: "✓" }) : null
    ] }, P.key);
    return H ? /* @__PURE__ */ e.jsxs("div", { className: ea("mm-menu__submenu-group", X && "mm-menu__submenu-group--open"), children: [
      ce,
      X ? /* @__PURE__ */ e.jsx("div", { className: "mm-menu__submenu", role: "menu", children: K(P.submenu ?? [], Y + 1) }) : null
    ] }, P.key) : ce;
  }), I = (k) => {
    if (!f.length) return;
    const Y = f.indexOf(S), P = Y < 0 ? k === 1 ? 0 : f.length - 1 : (Y + k + f.length) % f.length;
    M(f[P]);
  }, W = (k) => {
    k.target.closest(".mm-menu__content-entry") || (k.key === "ArrowDown" ? (k.preventDefault(), I(1)) : k.key === "ArrowUp" ? (k.preventDefault(), I(-1)) : k.key === "Home" ? (k.preventDefault(), M(f[0] ?? -1)) : k.key === "End" ? (k.preventDefault(), M(f[f.length - 1] ?? -1)) : (k.key === "Enter" || k.key === " ") && S >= 0 && (k.preventDefault(), E(S)));
  };
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: ea("mm-menu", `mm-menu--${d}`, `mm-menu--${b}`, s), onKeyDown: W, onPointerEnter: A, onPointerLeave: F, ref: D, role: c, style: { "--mm-menu-width": typeof h == "number" ? `${h}px` : h, "--mm-menu-max-height": typeof o == "number" ? `${o}px` : o }, tabIndex: 0, children: [
    /* @__PURE__ */ e.jsx("div", { className: "mm-menu__list", children: K(n) }),
    m ? /* @__PURE__ */ e.jsx("div", { className: "mm-menu__footer", children: m }) : null
  ] });
}
const ai = (...t) => t.filter(Boolean).join(" ");
function ri({
  "aria-label": t = "Open menu",
  children: s = "Options",
  className: a,
  closeOnEscape: r,
  closeOnOutsideClick: n,
  closeOnSelect: m,
  defaultOpen: o = !1,
  disabled: i = !1,
  entries: c,
  id: p,
  matchTriggerWidth: l,
  menuProps: d,
  menuWidth: y,
  onOpenChange: b,
  open: h,
  placement: j,
  triggerProps: w
}) {
  const { components: z } = Ge(), v = z.buttonMenu, D = r ?? (v == null ? void 0 : v.closeOnEscape) ?? !0, x = n ?? (v == null ? void 0 : v.closeOnOutsideClick) ?? !0, _ = m ?? (v == null ? void 0 : v.closeOnSelect) ?? !0, u = l ?? (v == null ? void 0 : v.matchTriggerWidth) ?? !1, S = y ?? (v == null ? void 0 : v.menuWidth) ?? 280, M = j ?? (v == null ? void 0 : v.placement) ?? "bottom-start", g = He(), N = p ?? `mm-button-menu-${g}`, f = ke(null), T = ke(null), [B, R] = q(o), A = h ?? B, F = () => {
    var W, k;
    return (k = (W = f.current) == null ? void 0 : W.querySelector(".mm-button")) == null ? void 0 : k.focus();
  }, E = (W, k = !1) => {
    h === void 0 && R(W), b == null || b(W), !W && k && requestAnimationFrame(F);
  };
  Me(() => {
    if (!A) return;
    const W = (Y) => {
      x && f.current && !f.current.contains(Y.target) && E(!1);
    }, k = (Y) => {
      D && Y.key === "Escape" && (Y.preventDefault(), E(!1, !0));
    };
    return document.addEventListener("mousedown", W), document.addEventListener("keydown", k), requestAnimationFrame(() => {
      var Y;
      return (Y = T.current) == null ? void 0 : Y.focus();
    }), () => {
      document.removeEventListener("mousedown", W), document.removeEventListener("keydown", k);
    };
  }, [D, x, A]);
  const L = () => {
    i || w != null && w.disabled || E(!A);
  }, K = (W, k) => {
    var Y;
    (Y = d == null ? void 0 : d.onSelect) == null || Y.call(d, W, k), _ && E(!1, !0);
  }, I = {
    "--mm-button-menu-width": typeof S == "number" ? `${S}px` : S
  };
  return /* @__PURE__ */ e.jsxs("div", { className: ai("mm-button-menu", `mm-button-menu--${M}`, u && "mm-button-menu--match-trigger", a), ref: f, style: I, children: [
    /* @__PURE__ */ e.jsx(
      Pe,
      {
        ...w,
        "aria-controls": A ? N : void 0,
        "aria-expanded": A,
        "aria-haspopup": "menu",
        "aria-label": (w == null ? void 0 : w["aria-label"]) ?? t,
        disabled: i || (w == null ? void 0 : w.disabled),
        iconRight: A ? /* @__PURE__ */ e.jsx(Vs, { "aria-hidden": "true" }) : /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true" }),
        onClick: (W) => {
          var k;
          (k = w == null ? void 0 : w.onClick) == null || k.call(w, W), W.defaultPrevented || L();
        },
        children: s
      }
    ),
    A ? /* @__PURE__ */ e.jsx("div", { className: "mm-button-menu__popover", id: N, ref: T, children: /* @__PURE__ */ e.jsx(
      Ta,
      {
        ...d,
        "aria-label": t,
        entries: c,
        onSelect: K,
        width: u ? "100%" : S
      }
    ) }) : null
  ] });
}
const ni = (...t) => t.filter(Boolean).join(" ");
function mo({
  "aria-label": t = "Context menu",
  children: s,
  className: a,
  closeOnEscape: r = !0,
  closeOnOutsideClick: n = !0,
  closeOnSelect: m = !0,
  defaultOpen: o = !1,
  disabled: i = !1,
  entries: c,
  id: p,
  menuProps: l,
  menuWidth: d = 280,
  offset: y = 4,
  onOpenChange: b,
  onSelect: h,
  open: j,
  position: w,
  preventDefault: z = !0
}) {
  const v = He(), D = p ?? `mm-context-menu-${v}`, x = ke(null), _ = ke(null), [u, S] = q(o), [M, g] = q({ x: 0, y: 0 }), [N, f] = q({ x: 0, y: 0 }), T = j ?? u, B = w ?? M, R = (I, W = B) => {
    j === void 0 && S(I), b == null || b(I, W);
  }, A = (I) => {
    i || (g(I), R(!0, I));
  }, F = (I) => {
    i || (z && I.preventDefault(), A({ x: I.clientX, y: I.clientY }));
  }, E = (I) => {
    var k;
    if (i || (I.key !== "F10" || !I.shiftKey) && I.key !== "ContextMenu") return;
    I.preventDefault();
    const W = (k = x.current) == null ? void 0 : k.getBoundingClientRect();
    A({ x: (W == null ? void 0 : W.left) ?? 0, y: W ? W.bottom : 0 });
  };
  ka(() => {
    if (!T || !_.current) return;
    const I = _.current.getBoundingClientRect(), W = Math.max(8, Math.min(B.x + y, window.innerWidth - I.width - 8)), k = Math.max(8, Math.min(B.y + y, window.innerHeight - I.height - 8));
    f({ x: W, y: k });
  }, [T, d, y, B, c.length]), Me(() => {
    if (!T) return;
    const I = (k) => {
      n && _.current && !_.current.contains(k.target) && R(!1);
    }, W = (k) => {
      var Y;
      r && k.key === "Escape" && (k.preventDefault(), R(!1), (Y = x.current) == null || Y.focus());
    };
    return document.addEventListener("mousedown", I), document.addEventListener("keydown", W), requestAnimationFrame(() => {
      var k, Y;
      return (Y = (k = _.current) == null ? void 0 : k.querySelector(".mm-menu")) == null ? void 0 : Y.focus();
    }), () => {
      document.removeEventListener("mousedown", I), document.removeEventListener("keydown", W);
    };
  }, [r, n, T]), Me(() => {
    if (!T) return;
    const I = () => R(!1);
    return window.addEventListener("scroll", I, !0), () => window.removeEventListener("scroll", I, !0);
  }, [T]);
  const L = (I, W) => {
    h == null || h(I, W), m && R(!1);
  }, K = {
    left: `${N.x}px`,
    top: `${N.y}px`,
    "--mm-context-menu-width": typeof d == "number" ? `${d}px` : d
  };
  return /* @__PURE__ */ e.jsxs("div", { "aria-expanded": T, "aria-haspopup": "menu", className: ni("mm-context-menu", i && "mm-context-menu--disabled", a), onContextMenu: F, onKeyDown: E, ref: x, tabIndex: i ? -1 : 0, children: [
    s,
    T && vs(/* @__PURE__ */ e.jsx("div", { className: "mm-context-menu__popover", id: D, ref: _, style: K, children: /* @__PURE__ */ e.jsx(Ta, { ...l, "aria-label": t, entries: c, onSelect: L, width: d }) }), document.body)
  ] });
}
const ii = {
  en: { cancel: "Cancel", close: "Close dialog", confirm: "OK", question: "Are you sure?" },
  uk: { cancel: "Скасувати", close: "Закрити діалог", confirm: "Підтвердити", question: "Ви впевнені?" },
  fr: { cancel: "Annuler", close: "Fermer la boîte de dialogue", confirm: "OK", question: "Êtes-vous sûr ?" },
  de: { cancel: "Abbrechen", close: "Dialog schließen", confirm: "OK", question: "Sind Sie sicher?" }
};
function li({
  "aria-label": t,
  cancelIcon: s = /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: 16 }),
  cancelLabel: a,
  cancelDisabled: r = !1,
  children: n,
  closeButton: m,
  closeOnOverlayClick: o,
  closeOnConfirm: i = !0,
  confirmIcon: c = /* @__PURE__ */ e.jsx(Ct, { "aria-hidden": "true", size: 16 }),
  confirmLabel: p,
  confirmDisabled: l = !1,
  confirmLoading: d = !1,
  defaultOpen: y = !1,
  description: b,
  footerAside: h,
  id: j,
  intent: w,
  locale: z,
  onCancel: v,
  onConfirm: D,
  onOpenChange: x,
  open: _,
  size: u,
  width: S,
  title: M
}) {
  const { locale: g, components: N } = Ge(), f = ii[z ?? g], T = N.confirmationDialog, B = u ?? (T == null ? void 0 : T.size) ?? "sm", R = m ?? (T == null ? void 0 : T.closeButton) ?? !0, A = o ?? (T == null ? void 0 : T.closeOnOverlayClick) ?? !1, F = w ?? (T == null ? void 0 : T.intent) ?? "default", [E, L] = q(y), [K, I] = q(!1), W = ke(!1), k = _ ?? E, Y = d || K, P = p ?? (T == null ? void 0 : T.confirmLabel) ?? f.confirm, C = a ?? (T == null ? void 0 : T.cancelLabel) ?? f.cancel, V = S === void 0 ? void 0 : { "--mm-confirmation-dialog-width": typeof S == "number" ? `${S}px` : S }, Q = (te) => {
    _ === void 0 && L(te), x == null || x(te);
  }, H = () => {
    v == null || v(), Q(!1);
  }, X = (te) => {
    !te && !W.current && (v == null || v()), W.current = !1, Q(te);
  }, ce = async () => {
    if (!D) {
      i && (W.current = !0, Q(!1));
      return;
    }
    I(!0);
    try {
      await D(), i && (W.current = !0, Q(!1));
    } finally {
      I(!1);
    }
  }, se = /* @__PURE__ */ e.jsxs("div", { className: "mm-confirmation-dialog__header", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-confirmation-dialog__heading", children: [
      /* @__PURE__ */ e.jsx("span", { className: `mm-confirmation-dialog__icon mm-confirmation-dialog__icon--${F}`, children: /* @__PURE__ */ e.jsx(es, { "aria-hidden": "true", size: 18 }) }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h2", { children: M ?? f.question }),
        b && /* @__PURE__ */ e.jsx("p", { children: b })
      ] })
    ] }),
    R && /* @__PURE__ */ e.jsx(Pe, { "aria-label": f.close, iconOnly: !0, variant: "text", onClick: H, children: /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: 18 }) })
  ] });
  return /* @__PURE__ */ e.jsx(Sa, { "aria-label": t ?? String(M ?? f.question), className: "mm-confirmation-dialog", closeButton: !1, closeOnOverlayClick: A, id: j, modal: !0, onOpenChange: X, open: k, size: B, style: V, header: se, footerAside: h, actions: { cancel: { label: C, icon: s, disabled: r || Y, onClick: H }, confirm: { label: P, icon: c, disabled: l || Y, loading: Y, variant: F === "danger" ? "danger" : F === "warning" ? "secondary" : "primary", onClick: ce } }, children: n });
}
const Vr = gt(null);
function uo({ children: t }) {
  const [s, a] = q([]), r = ke(0), n = ke(null), m = ke(null), o = at((b, h) => {
    a((j) => {
      const w = j[0];
      return !w || w.id !== b ? j : (w.resolve(h), j.slice(1));
    });
  }, []), i = at((b) => new Promise((h, j) => {
    const w = ++r.current;
    a((z) => [...z, { id: w, options: b, reject: j, resolve: h }]);
  }), []), c = s[0], p = { confirm: i }, l = (b) => {
    if (!c || b) return;
    const h = n.current === c.id, j = m.current === c.id;
    n.current = null, m.current = null, o(c.id, h && !j);
  }, d = async () => {
    var b, h;
    if (c)
      try {
        await ((h = (b = c.options).onConfirm) == null ? void 0 : h.call(b)), c.options.closeOnConfirm === !1 ? o(c.id, !0) : n.current = c.id;
      } catch (j) {
        c.reject(j), a((w) => w.filter((z) => z.id !== c.id));
      }
  }, y = () => {
    var b, h;
    c && ((h = (b = c.options).onCancel) == null || h.call(b), m.current = c.id);
  };
  return /* @__PURE__ */ e.jsxs(Vr.Provider, { value: p, children: [
    t,
    c && /* @__PURE__ */ e.jsx(li, { ...c.options, onCancel: y, onConfirm: d, onOpenChange: l, open: !0 })
  ] });
}
function fo() {
  const t = vt(Vr);
  if (!t) throw new Error("useConfirmationDialog must be used within ConfirmationDialogProvider");
  return t;
}
const oi = (...t) => t.filter(Boolean).join(" "), ci = () => typeof navigator < "u" && /Mac|iPhone|iPad|iPod/.test(`${navigator.platform} ${navigator.userAgent}`);
function Or(t) {
  if (Array.isArray(t)) return t.flatMap((a) => Or(a));
  const s = t.trim();
  return s ? s.includes("+") ? s.split("+").map((a) => a.trim()).filter(Boolean) : s.match(/⌘|⌥|⇧|⌃|Ctrl|Control|Cmd|Command|Alt|Option|Shift|Meta|Enter|Return|Escape|Esc|Space|Tab|Backspace|Delete|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown|F\d{1,2}|[\w]/gi) ?? [s] : [];
}
function mi(t) {
  const s = t.trim(), a = s.toLowerCase();
  return s === "⌘" || a === "cmd" || a === "command" || a === "meta" ? { display: "⌘", value: "meta", modifier: "meta" } : s === "⌥" || a === "alt" || a === "option" ? { display: "⌥", value: "alt", modifier: "alt" } : s === "⇧" || a === "shift" ? { display: "⇧", value: "shift", modifier: "shift" } : s === "⌃" || a === "ctrl" || a === "control" ? { display: "Ctrl", value: "ctrl", modifier: "ctrl" } : { display: a === "escape" ? "Esc" : a === "return" ? "Enter" : s, value: a };
}
function di(t, s) {
  const a = s.key.toLowerCase();
  return ({
    esc: ["esc", "escape"],
    enter: ["enter", "return"],
    space: [" ", "spacebar", "space"],
    backspace: ["backspace"],
    delete: ["delete", "del"],
    arrowup: ["arrowup", "up"],
    arrowdown: ["arrowdown", "down"],
    arrowleft: ["arrowleft", "left"],
    arrowright: ["arrowright", "right"]
  }[t.value] ?? [t.value]).includes(a);
}
function ui(t) {
  return t.map((s) => s.modifier === "meta" ? "Meta" : s.modifier === "ctrl" ? "Control" : s.modifier === "alt" ? "Alt" : s.modifier === "shift" ? "Shift" : s.display === " " ? "Space" : s.display).join("+");
}
function ho({
  keys: t,
  mac: s,
  win: a,
  platform: r = "auto",
  onTrigger: n,
  preventDefault: m = !0,
  stopPropagation: o = !1,
  ignoreEditable: i = !0,
  disabled: c = !1,
  size: p = "default",
  variant: l = "subtle",
  separator: d = "+",
  label: y,
  className: b,
  ...h
}) {
  const [j, w] = q("win");
  Me(() => {
    w(ci() ? "mac" : "win");
  }, []);
  const v = (r === "auto" ? j : r) === "mac" ? s ?? t : a ?? t, D = mt(() => Or(v).map(mi), [v]), x = y ?? D.map((u) => u.display).join(" "), _ = ui(D);
  return Me(() => {
    if (!n || c || D.length === 0) return;
    const u = {
      alt: D.some((g) => g.modifier === "alt"),
      ctrl: D.some((g) => g.modifier === "ctrl"),
      meta: D.some((g) => g.modifier === "meta"),
      shift: D.some((g) => g.modifier === "shift")
    }, S = [...D].reverse().find((g) => !g.modifier);
    if (!S) return;
    const M = (g) => {
      const N = g.target, f = !!(N != null && N.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes((N == null ? void 0 : N.tagName) ?? ""));
      i && f || g.altKey !== u.alt || g.ctrlKey !== u.ctrl || g.metaKey !== u.meta || g.shiftKey !== u.shift || di(S, g) && (m && g.preventDefault(), o && g.stopPropagation(), n());
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [c, i, n, m, o, D]), /* @__PURE__ */ e.jsx("span", { ...h, "aria-label": x, "aria-keyshortcuts": _, className: oi("mm-keyboard-shortcut", `mm-keyboard-shortcut--${p}`, `mm-keyboard-shortcut--${l}`, c && "mm-keyboard-shortcut--disabled", b), role: "img", children: D.map((u, S) => /* @__PURE__ */ e.jsxs("span", { className: "mm-keyboard-shortcut__part", children: [
    S > 0 && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-keyboard-shortcut__separator", children: d }),
    /* @__PURE__ */ e.jsx("kbd", { children: u.display })
  ] }, `${u.value}-${S}`)) });
}
const Ka = (...t) => t.filter(Boolean).join(" "), Ya = ["light", "dark", "system"], fi = {
  controlBorder: "--mm-color-control-border",
  controlFilled: "--mm-color-control-filled",
  controlIcon: "--mm-color-control-icon",
  controlSelected: "--mm-color-control-selected",
  focus: "--mm-color-focus",
  lightBackground: "--mm-color-light-background",
  lightHover: "--mm-color-light-hover",
  mutedText: "--mm-color-muted-text",
  overlay: "--mm-color-overlay",
  placeholder: "--mm-color-placeholder",
  primary: "--mm-color-primary",
  primaryHover: "--mm-color-primary-hover",
  secondary: "--mm-color-secondary",
  secondaryHover: "--mm-color-secondary-hover",
  surface: "--mm-color-surface",
  surfaceHover: "--mm-color-surface-hover",
  text: "--mm-color-text"
}, hi = {
  controlBorder: "#d0d5dd",
  controlFilled: "#eef1f2",
  controlIcon: "#667085",
  controlSelected: "#f6f6f7",
  focus: "#6366f1",
  lightBackground: "#f6f6f7",
  lightHover: "#e8dfd1",
  mutedText: "#667085",
  overlay: "rgb(12 21 24 / 14%)",
  placeholder: "#98a2b3",
  primary: "#003c3a",
  primaryHover: "#003331",
  secondary: "#47634c",
  secondaryHover: "#58775d",
  surface: "#ffffff",
  surfaceHover: "#f8fafc",
  text: "#0c1518"
}, pi = {
  controlBorder: "#3a4b46",
  controlFilled: "#1d2a26",
  controlIcon: "#b0c0ba",
  controlSelected: "#24443a",
  focus: "#8eb8ff",
  lightBackground: "#1b2925",
  lightHover: "#263b34",
  mutedText: "#a6b5b0",
  overlay: "rgb(0 0 0 / 48%)",
  placeholder: "#70817b",
  primary: "#86d8c2",
  primaryHover: "#a6e5d3",
  secondary: "#9cc6a9",
  secondaryHover: "#b2d8bb",
  surface: "#101816",
  surfaceHover: "#18221f",
  text: "#f4f7f6"
}, xi = {
  en: { label: "Theme", light: "Light", dark: "Dark", system: "System" },
  uk: { label: "Тема", light: "Світла", dark: "Темна", system: "Системна" },
  de: { label: "Design", light: "Hell", dark: "Dunkel", system: "System" },
  fr: { label: "Thème", light: "Clair", dark: "Sombre", system: "Système" }
}, Ha = (t) => t === "light" ? /* @__PURE__ */ e.jsxs("svg", { "aria-hidden": "true", fill: "none", height: "16", viewBox: "0 0 16 16", width: "16", children: [
  /* @__PURE__ */ e.jsx("circle", { cx: "8", cy: "8", r: "2.8", stroke: "currentColor", strokeWidth: "1.4" }),
  /* @__PURE__ */ e.jsx("path", { d: "M8 1.4v1.3M8 13.3v1.3M1.4 8h1.3M13.3 8h1.3M3.3 3.3l.9.9M11.8 11.8l.9.9M12.7 3.3l-.9.9M4.2 11.8l-.9.9", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.2" })
] }) : t === "dark" ? /* @__PURE__ */ e.jsx("svg", { "aria-hidden": "true", fill: "none", height: "16", viewBox: "0 0 16 16", width: "16", children: /* @__PURE__ */ e.jsx("path", { d: "M13.1 10.7A5.7 5.7 0 0 1 5.3 2.9 5.8 5.8 0 1 0 13.1 10.7Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.4" }) }) : /* @__PURE__ */ e.jsxs("svg", { "aria-hidden": "true", fill: "none", height: "16", viewBox: "0 0 16 16", width: "16", children: [
  /* @__PURE__ */ e.jsx("rect", { height: "9.2", rx: "1.5", stroke: "currentColor", strokeWidth: "1.3", width: "13", x: "1.5", y: "1.5" }),
  /* @__PURE__ */ e.jsx("path", { d: "M5.3 14.2h5.4M8 10.7v3.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.3" })
] });
function bi(t, s) {
  if (typeof window > "u") return s;
  const a = window.localStorage.getItem(t);
  return a === "light" || a === "dark" || a === "system" ? a : s;
}
function po({
  value: t,
  defaultValue: s = "system",
  onChange: a,
  storageKey: r = "mosmox-theme",
  persist: n = !0,
  applyTheme: m = !0,
  options: o = Ya,
  labels: i,
  locale: c,
  lightTokens: p,
  darkTokens: l,
  showLabel: d,
  size: y,
  variant: b,
  disabled: h = !1,
  className: j,
  style: w,
  ...z
}) {
  const { components: v, locale: D } = Ge(), x = v.themeSwitcher, _ = xi[c ?? D], u = y ?? (x == null ? void 0 : x.size) ?? "default", S = b ?? (x == null ? void 0 : x.variant) ?? "segmented", M = d ?? (x == null ? void 0 : x.showLabel) ?? !0, g = o.length > 0 ? o : Ya, [N, f] = q(() => n ? bi(r, s) : s), [T, B] = q("light"), R = ke(null), A = ke({}), F = t ?? N, E = { ..._, ...i }, L = E[F], K = F === "system" ? T : F, I = mt(() => ({
    ...K === "dark" ? pi : hi,
    ...K === "dark" ? l : p
  }), [l, p, K]);
  Me(() => {
    const P = window.matchMedia("(prefers-color-scheme: dark)"), C = () => B(P.matches ? "dark" : "light");
    return C(), P.addEventListener("change", C), () => P.removeEventListener("change", C);
  }, []), Me(() => {
    n && window.localStorage.setItem(r, F);
  }, [F, n, r]), Me(() => {
    if (!n) return;
    const P = (C) => {
      C.key !== r || C.newValue !== "light" && C.newValue !== "dark" && C.newValue !== "system" || (t === void 0 && f(C.newValue), a == null || a(C.newValue));
    };
    return window.addEventListener("storage", P), () => window.removeEventListener("storage", P);
  }, [a, n, r, t]), Me(() => {
    if (!n) return;
    const P = (C) => {
      const V = C.detail;
      (V == null ? void 0 : V.storageKey) !== r || !V.mode || V.source === A.current || (t === void 0 && f(V.mode), a == null || a(V.mode));
    };
    return window.addEventListener("mosmox-theme-change", P), () => window.removeEventListener("mosmox-theme-change", P);
  }, [a, n, r, t]), Me(() => {
    var H;
    if (!m || typeof document > "u") return;
    const P = ((H = R.current) == null ? void 0 : H.closest(".mm-config-provider")) ?? document.documentElement, C = /* @__PURE__ */ new Map();
    Object.entries(I).forEach(([X, ce]) => {
      const se = fi[X];
      C.set(se, P.style.getPropertyValue(se)), P.style.setProperty(se, ce);
    });
    const V = P.getAttribute("data-mm-theme"), Q = P.style.getPropertyValue("color-scheme");
    return P.setAttribute("data-mm-theme", K), P.style.setProperty("color-scheme", K), () => {
      C.forEach((X, ce) => {
        X ? P.style.setProperty(ce, X) : P.style.removeProperty(ce);
      }), V ? P.setAttribute("data-mm-theme", V) : P.removeAttribute("data-mm-theme"), Q ? P.style.setProperty("color-scheme", Q) : P.style.removeProperty("color-scheme");
    };
  }, [m, K, I]);
  const W = (P) => {
    h || !g.includes(P) || (t === void 0 && f(P), a == null || a(P), n && window.dispatchEvent(new CustomEvent("mosmox-theme-change", { detail: { mode: P, source: A.current, storageKey: r } })));
  }, k = () => {
    const P = g.indexOf(F);
    W(g[(P + 1) % g.length]);
  }, Y = {
    ...(x == null ? void 0 : x.radius) && { "--mm-theme-switcher-radius": x.radius },
    ...w
  };
  return /* @__PURE__ */ e.jsx("div", { ...z, ref: R, "aria-label": z["aria-label"] ?? E.label, className: Ka("mm-theme-switcher", `mm-theme-switcher--${u}`, `mm-theme-switcher--${S}`, h && "mm-theme-switcher--disabled", j), style: Y, children: S === "button" ? /* @__PURE__ */ e.jsxs("button", { "aria-label": `${E.label}: ${L}`, "aria-pressed": "true", className: "mm-theme-switcher__button", disabled: h, type: "button", onClick: k, children: [
    Ha(F),
    M && /* @__PURE__ */ e.jsx("span", { children: L })
  ] }) : /* @__PURE__ */ e.jsx("div", { "aria-label": E.label, className: "mm-theme-switcher__segments", role: "group", children: g.map((P) => /* @__PURE__ */ e.jsxs("button", { "aria-pressed": F === P, className: Ka("mm-theme-switcher__segment", F === P && "is-active"), disabled: h, type: "button", onClick: () => W(P), children: [
    Ha(P),
    M && /* @__PURE__ */ e.jsx("span", { children: E[P] })
  ] }, P)) }) });
}
const _i = (...t) => t.filter(Boolean).join(" ");
function vi(t, s) {
  typeof t == "function" ? t(s) : t && (t.current = s);
}
const gi = Us(function({
  orientation: s,
  scrollbar: a,
  size: r,
  variant: n,
  height: m,
  maxHeight: o,
  width: i,
  maxWidth: c,
  fadeEdges: p,
  viewportRef: l,
  onScroll: d,
  onReachStart: y,
  onReachEnd: b,
  scrollThreshold: h = 2,
  className: j,
  style: w,
  children: z,
  ...v
}, D) {
  var F, E, L, K, I;
  const { components: x } = Ge(), _ = s ?? ((F = x.scrollArea) == null ? void 0 : F.orientation) ?? "vertical", u = a ?? ((E = x.scrollArea) == null ? void 0 : E.scrollbar) ?? "auto", S = r ?? ((L = x.scrollArea) == null ? void 0 : L.size) ?? "default", M = n ?? ((K = x.scrollArea) == null ? void 0 : K.variant) ?? "plain", g = p ?? ((I = x.scrollArea) == null ? void 0 : I.fadeEdges) ?? !1, N = ke(null), f = ke(null), T = ke(null), B = (W) => {
    N.current = W, vi(l, W);
  };
  $a(D, () => ({
    get element() {
      return N.current;
    },
    scrollTo: (W) => {
      var k;
      return (k = N.current) == null ? void 0 : k.scrollTo(W);
    },
    scrollToTop: (W = "smooth") => {
      var k;
      return (k = N.current) == null ? void 0 : k.scrollTo({ top: 0, behavior: W });
    },
    scrollToBottom: (W = "smooth") => {
      const k = N.current;
      k == null || k.scrollTo({ top: k.scrollHeight, behavior: W });
    },
    scrollToStart: (W = "smooth") => {
      var k;
      return (k = N.current) == null ? void 0 : k.scrollTo({ left: 0, behavior: W });
    },
    scrollToEnd: (W = "smooth") => {
      const k = N.current;
      k == null || k.scrollTo({ left: k.scrollWidth, behavior: W });
    }
  }), []);
  const R = (W) => {
    const k = W.currentTarget, Y = _ === "horizontal" ? k.scrollLeft <= h : _ === "both" ? k.scrollTop <= h && k.scrollLeft <= h : k.scrollTop <= h, P = _ === "horizontal" ? k.scrollLeft + k.clientWidth >= k.scrollWidth - h : _ === "both" ? k.scrollTop + k.clientHeight >= k.scrollHeight - h && k.scrollLeft + k.clientWidth >= k.scrollWidth - h : k.scrollTop + k.clientHeight >= k.scrollHeight - h;
    Y && f.current !== !0 && (y == null || y()), P && T.current !== !0 && (b == null || b()), f.current = Y, T.current = P, d == null || d(W);
  }, A = {
    ...w,
    ...m !== void 0 && { "--mm-scroll-area-height": typeof m == "number" ? `${m}px` : m },
    ...o !== void 0 && { "--mm-scroll-area-max-height": typeof o == "number" ? `${o}px` : o },
    ...i !== void 0 && { "--mm-scroll-area-width": typeof i == "number" ? `${i}px` : i },
    ...c !== void 0 && { "--mm-scroll-area-max-width": typeof c == "number" ? `${c}px` : c }
  };
  return /* @__PURE__ */ e.jsx("div", { ...v, className: _i("mm-scroll-area", `mm-scroll-area--${_}`, `mm-scroll-area--scrollbar-${u}`, `mm-scroll-area--${S}`, `mm-scroll-area--${M}`, g && "mm-scroll-area--fade-edges", j), style: A, children: /* @__PURE__ */ e.jsx("div", { className: "mm-scroll-area__viewport", ref: B, onScroll: R, tabIndex: v.tabIndex ?? 0, children: /* @__PURE__ */ e.jsx("div", { className: "mm-scroll-area__content", children: z }) }) });
});
gi.displayName = "ScrollArea";
const Ua = (...t) => t.filter(Boolean).join(" ");
function wt({
  "aria-label": t,
  arrow: s = !0,
  children: a,
  className: r,
  closeDelay: n = 80,
  closeOnEscape: m = !0,
  content: o,
  defaultOpen: i = !1,
  disabled: c = !1,
  interactive: p = !1,
  maxWidth: l = 280,
  offset: d = 8,
  onOpenChange: y,
  open: b,
  openDelay: h = 160,
  placement: j = "top",
  size: w = "default",
  variant: z = "dark"
}) {
  const D = `mm-tooltip-${He()}`, x = ke(null), _ = ke(), u = ke(), S = b !== void 0, [M, g] = q(i), N = !c && (S ? b : M), f = (L) => {
    S || g(L), y == null || y(L);
  }, T = () => {
    _.current !== void 0 && window.clearTimeout(_.current), u.current !== void 0 && window.clearTimeout(u.current), _.current = void 0, u.current = void 0;
  }, B = () => {
    c || (T(), h === 0 ? f(!0) : _.current = window.setTimeout(() => f(!0), h));
  }, R = () => {
    T(), n === 0 ? f(!1) : u.current = window.setTimeout(() => f(!1), n);
  }, A = (L) => {
    c || L.detail !== 0 && (b === void 0 || b) && f(!N);
  }, F = (L) => {
    L.key === "Escape" && m && N && (L.preventDefault(), R()), (L.key === "Enter" || L.key === " ") && !c && (L.preventDefault(), f(!N));
  };
  Me(() => () => T(), []), Me(() => {
    if (!N || !m) return;
    const L = (K) => {
      K.key === "Escape" && (K.preventDefault(), f(!1));
    };
    return document.addEventListener("keydown", L), () => document.removeEventListener("keydown", L);
  }, [m, N]), Me(() => {
    if (!N) return;
    const L = (K) => {
      var I;
      (I = x.current) != null && I.contains(K.target) || f(!1);
    };
    return document.addEventListener("mousedown", L), () => document.removeEventListener("mousedown", L);
  }, [N]);
  const E = { "--mm-tooltip-offset": `${d}px`, "--mm-tooltip-max-width": typeof l == "number" ? `${l}px` : l };
  return /* @__PURE__ */ e.jsxs(
    "span",
    {
      "aria-describedby": N ? D : void 0,
      className: Ua("mm-tooltip", N && "mm-tooltip--open", c && "mm-tooltip--disabled", p && "mm-tooltip--interactive", r),
      "data-mm-tooltip": typeof o == "string" ? o : void 0,
      "data-mm-tooltip-placement": j,
      onClick: A,
      onFocus: B,
      onKeyDown: F,
      onMouseEnter: B,
      onMouseLeave: R,
      onPointerEnter: B,
      onPointerLeave: R,
      ref: x,
      children: [
        a,
        N && /* @__PURE__ */ e.jsxs(
          "span",
          {
            "aria-label": t,
            className: Ua("mm-tooltip__content", `mm-tooltip__content--${j}`, `mm-tooltip__content--${w}`, `mm-tooltip__content--${z}`),
            id: D,
            onMouseEnter: p ? B : void 0,
            onMouseLeave: p ? R : void 0,
            role: "tooltip",
            style: E,
            children: [
              o,
              s && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-tooltip__arrow" })
            ]
          }
        )
      ]
    }
  );
}
const Ea = gt({ disabled: !1, iconOnly: !1, openMenuKey: null, orientation: "horizontal", setOpenMenuKey: () => {
}, size: "default" }), gs = (...t) => t.filter(Boolean).join(" ");
function yi({ className: t, disabled: s, hoverScale: a, size: r, variant: n, ...m }) {
  const o = vt(Ea), c = r ?? o.size, { tooltip: p, tooltipCloseDelay: l, tooltipOpenDelay: d, tooltipPlacement: y, tooltipSize: b, tooltipVariant: h, ...j } = m, w = /* @__PURE__ */ e.jsx(Pe, { ...j, "data-mm-toolbar-item": "true", className: gs("mm-toolbar__item", t), disabled: o.disabled || s, hoverScale: a ?? !0, iconOnly: o.iconOnly || m.iconOnly, size: c, title: typeof p == "string" ? p : j.title, variant: n ?? "text" });
  return p === void 0 ? w : /* @__PURE__ */ e.jsx(wt, { closeDelay: l, content: p, openDelay: d ?? 0, placement: y, size: b, variant: h, children: w });
}
function ji({ children: t, "aria-label": s, className: a }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-label": s, className: gs("mm-toolbar__group", a), role: "group", children: t });
}
function wi({ orientation: t = "horizontal", className: s }) {
  return /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: gs("mm-toolbar__separator", `mm-toolbar__separator--${t}`, s) });
}
function Ni({ className: t, disabled: s, entries: a, label: r, menuAriaLabel: n, menuMaxHeight: m, menuSize: o = "default", menuVariant: i = "default", menuWidth: c = 240, onClick: p, onMenuSelect: l, size: d, tooltip: y, tooltipCloseDelay: b, tooltipOpenDelay: h, tooltipPlacement: j, tooltipSize: w, tooltipVariant: z, variant: v, ...D }) {
  const x = vt(Ea), _ = He(), u = x.openMenuKey === _, S = d ?? x.size, M = /* @__PURE__ */ e.jsx(Pe, { ...D, "aria-expanded": u, "aria-haspopup": "menu", className: gs("mm-toolbar__item", t), disabled: x.disabled || s, hoverScale: !1, iconRight: /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", size: 14 }), onClick: (g) => {
    p == null || p(g), x.setOpenMenuKey(u ? null : _);
  }, size: S, title: typeof y == "string" ? y : D.title, variant: v ?? "text", children: r });
  return /* @__PURE__ */ e.jsxs("div", { className: "mm-toolbar__menu", children: [
    y === void 0 ? M : /* @__PURE__ */ e.jsx(wt, { closeDelay: b, content: y, openDelay: h ?? 0, placement: j, size: w, variant: z, children: M }),
    u ? /* @__PURE__ */ e.jsx("div", { className: "mm-toolbar__menu-popover", children: /* @__PURE__ */ e.jsx(Ta, { "aria-label": n ?? `${String(r)} menu`, entries: a, maxHeight: m, onSelect: (g) => {
      l == null || l(g), x.setOpenMenuKey(null);
    }, size: o, variant: i, width: c }) }) : null
  ] });
}
function ki() {
  return /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-toolbar__spacer" });
}
const $i = Us(function({ children: s, "aria-label": a = "Toolbar", className: r, collapsed: n, collapsible: m = !1, columns: o, defaultCollapsed: i = !1, density: c, disabled: p = !1, draggable: l = !1, floating: d = !1, fullWidth: y = !1, iconOnly: b = !1, initialPosition: h, onCollapsedChange: j, orientation: w, rovingFocus: z = !0, rows: v, size: D, sticky: x = !1, title: _, variant: u, wrap: S = !1, style: M, ...g }, N) {
  var ae, fe, de, oe;
  const { components: f } = Ge(), T = ke(null), [B, R] = q(h ?? { top: 24, left: 24 }), [A, F] = q(i), [E, L] = q(null), K = ke(null), I = w ?? ((ae = f.toolbar) == null ? void 0 : ae.orientation) ?? "horizontal", W = D ?? ((fe = f.toolbar) == null ? void 0 : fe.size) ?? "default", k = u ?? ((de = f.toolbar) == null ? void 0 : de.variant) ?? "surface", Y = c ?? ((oe = f.toolbar) == null ? void 0 : oe.density) ?? "comfortable", P = o && Math.max(1, Math.floor(o)), C = v && Math.max(1, Math.floor(v)), V = d && l, Q = n ?? A, H = d && (_ !== void 0 || l || m);
  $a(N, () => T.current, []), Me(() => {
    if (!E) return;
    const xe = (ie) => {
      var re;
      (re = T.current) != null && re.contains(ie.target) || L(null);
    };
    return document.addEventListener("pointerdown", xe), () => document.removeEventListener("pointerdown", xe);
  }, [E]);
  const X = (xe) => {
    var me, he;
    if (!z) return;
    const ie = Array.from(((me = T.current) == null ? void 0 : me.querySelectorAll("[data-mm-toolbar-item]:not([disabled])")) ?? []), re = ie.indexOf(document.activeElement);
    if (re < 0 || ie.length < 2) return;
    const U = I === "vertical" ? "ArrowDown" : "ArrowRight";
    if (![U, I === "vertical" ? "ArrowUp" : "ArrowLeft", "House", "End"].includes(xe.key)) return;
    xe.preventDefault();
    const G = xe.key === "House" ? 0 : xe.key === "End" ? ie.length - 1 : (re + (xe.key === U ? 1 : -1) + ie.length) % ie.length;
    (he = ie[G]) == null || he.focus();
  }, ce = (xe) => {
    var re;
    if (!V || xe.button !== 0 || xe.target.closest("button, a, input, select, textarea, [data-mm-toolbar-item]")) return;
    const ie = (re = T.current) == null ? void 0 : re.getBoundingClientRect();
    ie && (K.current = { pointerId: xe.pointerId, startX: xe.clientX, startY: xe.clientY, startLeft: ie.left, startTop: ie.top }, xe.currentTarget.setPointerCapture(xe.pointerId));
  }, se = (xe) => {
    var re;
    if (!K.current || K.current.pointerId !== xe.pointerId) return;
    const ie = (re = T.current) == null ? void 0 : re.getBoundingClientRect();
    ie && R({ left: Math.max(0, Math.min(window.innerWidth - ie.width, K.current.startLeft + xe.clientX - K.current.startX)), top: Math.max(0, Math.min(window.innerHeight - ie.height, K.current.startTop + xe.clientY - K.current.startY)) });
  }, te = (xe) => {
    var ie;
    ((ie = K.current) == null ? void 0 : ie.pointerId) === xe.pointerId && (K.current = null);
  }, ve = () => {
    const xe = !Q;
    n === void 0 && F(xe), j == null || j(xe);
  }, ge = {
    ...M,
    ...d ? { left: B.left, top: B.top } : {},
    ...P ? { "--mm-toolbar-columns": P } : {},
    ...C ? { "--mm-toolbar-rows": C } : {}
  };
  return /* @__PURE__ */ e.jsx(Ea.Provider, { value: { disabled: p, iconOnly: b, openMenuKey: E, orientation: I, setOpenMenuKey: L, size: W }, children: /* @__PURE__ */ e.jsxs("div", { ...g, ref: T, "aria-disabled": p || void 0, "aria-label": a, "aria-orientation": I, className: gs("mm-toolbar", `mm-toolbar--${I}`, `mm-toolbar--${W}`, `mm-toolbar--${k}`, `mm-toolbar--${Y}`, !!(P || C) && "mm-toolbar--grid", H && "mm-toolbar--has-header", d && "mm-toolbar--fixed", V && "mm-toolbar--draggable", Q && "mm-toolbar--collapsed", S && "mm-toolbar--wrap", y && "mm-toolbar--full-width", x && "mm-toolbar--sticky", p && "mm-toolbar--disabled", r), onKeyDown: X, onPointerDown: ce, onPointerMove: se, onPointerUp: te, role: "toolbar", style: ge, children: [
    H && /* @__PURE__ */ e.jsxs("div", { className: "mm-toolbar__header", "data-mm-toolbar-drag-handle": "true", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "mm-toolbar__title", children: [
        l && /* @__PURE__ */ e.jsx(Er, { "aria-hidden": "true", size: 16 }),
        _ ?? a
      ] }),
      m && /* @__PURE__ */ e.jsx("button", { "aria-expanded": !Q, "aria-label": Q ? "Expand toolbar" : "Collapse toolbar", className: "mm-toolbar__collapse", onClick: ve, type: "button", children: Q ? /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", size: 16 }) : /* @__PURE__ */ e.jsx(Vs, { "aria-hidden": "true", size: 16 }) })
    ] }),
    !Q && s
  ] }) });
}), xo = Object.assign($i, { Item: yi, Menu: Ni, Group: ji, Separator: wi, Spacer: ki }), rs = (...t) => t.filter(Boolean).join(" "), ta = (t, s) => Math.max(0, Math.min(t, Math.max(0, s - 1))), Mi = {
  en: { cover: "Cover", fit: "Fit", fitMode: "Image fit mode", actual: "100%" },
  uk: { cover: "Заповнити", fit: "Вписати", fitMode: "Режим відображення зображення", actual: "100%" },
  de: { cover: "Ausfüllen", fit: "Einpassen", fitMode: "Anzeigemodus des Bildes", actual: "100%" },
  fr: { cover: "Couvrir", fit: "Ajuster", fitMode: "Mode d'affichage de l'image", actual: "100%" }
};
function bo({ items: t, "aria-label": s = "Image gallery", className: a, closeOnBackdrop: r = !0, defaultIndex: n = 0, downloadable: m = !0, fit: o, loop: i = !0, onChange: c, onOpenChange: p, open: l, showCaptions: d, showCounter: y = !0, showGallery: b = !0, showThumbnails: h, showToolbar: j, thumbSize: w = 64, variant: z, zoom: v = !0 }) {
  const { components: D, locale: x } = Ge(), _ = D.lightbox, u = Mi[x], S = o ?? (_ == null ? void 0 : _.fit) ?? "contain", M = z ?? (_ == null ? void 0 : _.variant) ?? "dark", g = d ?? (_ == null ? void 0 : _.showCaptions) ?? !0, N = h ?? (_ == null ? void 0 : _.showThumbnails) ?? !0, f = j ?? (_ == null ? void 0 : _.showToolbar) ?? !0, [T, B] = q(!1), [R, A] = q(ta(n, t.length)), [F, E] = q(1), [L, K] = q(0), [I, W] = q(S), [k, Y] = q(!1), P = ke(null), C = t[R], V = l ?? T, Q = mt(() => ({ "--mm-lightbox-scale": F, "--mm-lightbox-rotation": `${L}deg` }), [L, F]), H = (ae) => {
    const fe = ta(ae, t.length);
    A(fe), E(1), K(0), c == null || c(fe, t[fe]);
  }, X = (ae, fe = R) => {
    l === void 0 && B(ae), ae && (A(ta(fe, t.length)), E(1), K(0)), p == null || p(ae);
  }, ce = (ae) => {
    if (!t.length) return;
    const fe = R + ae;
    i ? H((fe + t.length) % t.length) : fe >= 0 && fe < t.length && H(fe);
  }, se = () => {
    var ae;
    X(!1), k && document.fullscreenElement && ((ae = document.exitFullscreen) == null || ae.call(document));
  }, te = () => {
    var fe;
    if (!C) return;
    const ae = document.createElement("a");
    ae.href = C.src, ae.download = C.download ?? ((fe = C.src.split("/").pop()) == null ? void 0 : fe.split("?")[0]) ?? "image", ae.target = "_blank", ae.rel = "noreferrer", ae.click();
  }, ve = () => {
    var ae, fe;
    P.current && (document.fullscreenElement ? document.exitFullscreen() : (fe = (ae = P.current).requestFullscreen) == null || fe.call(ae));
  };
  Me(() => {
    const ae = () => Y(!!document.fullscreenElement);
    return document.addEventListener("fullscreenchange", ae), () => document.removeEventListener("fullscreenchange", ae);
  }, []), Me(() => {
    if (!V) return;
    const ae = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = ae;
    };
  }, [V]), Me(() => {
    if (!V) return;
    const ae = (fe) => {
      fe.key === "Escape" ? se() : fe.key === "ArrowRight" ? ce(1) : fe.key === "ArrowLeft" ? ce(-1) : fe.key === "+" || fe.key === "=" ? E((de) => v ? Math.min(4, de + 0.25) : de) : fe.key === "-" ? E((de) => v ? Math.max(0.5, de - 0.25) : de) : fe.key === "0" && (E(1), K(0), W(S));
    };
    return window.addEventListener("keydown", ae), () => window.removeEventListener("keydown", ae);
  });
  const ge = (ae, fe) => {
    (ae.key === "Enter" || ae.key === " ") && (ae.preventDefault(), X(!0, fe));
  };
  return t.length ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    b && /* @__PURE__ */ e.jsx("div", { "aria-label": s, className: rs("mm-lightbox-gallery", a), children: t.map((ae, fe) => /* @__PURE__ */ e.jsx("button", { "aria-label": `Open image ${fe + 1}${ae.title ? `: ${String(ae.title)}` : ""}`, className: "mm-lightbox-gallery__thumbnail", onClick: () => X(!0, fe), onKeyDown: (de) => ge(de, fe), type: "button", children: /* @__PURE__ */ e.jsx("img", { alt: ae.alt ?? "", src: ae.thumbnailSrc ?? ae.src }) }, ae.id ?? ae.src)) }),
    V && vs(
      /* @__PURE__ */ e.jsx("div", { "aria-label": s, "aria-modal": "true", className: rs("mm-lightbox", `mm-lightbox--${M}`, k && "mm-lightbox--fullscreen"), onClick: (ae) => {
        r && ae.target === ae.currentTarget && se();
      }, role: "dialog", children: /* @__PURE__ */ e.jsxs("div", { className: "mm-lightbox__stage", ref: P, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-lightbox__header", children: [
          /* @__PURE__ */ e.jsx("span", { className: "mm-lightbox__title", children: (C == null ? void 0 : C.title) ?? (C == null ? void 0 : C.alt) }),
          y && /* @__PURE__ */ e.jsxs("span", { "aria-live": "polite", className: "mm-lightbox__counter", children: [
            "Image ",
            R + 1,
            " of ",
            t.length
          ] }),
          /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Close lightbox", className: "mm-lightbox__close", iconLeft: /* @__PURE__ */ e.jsx(rt, { size: 20 }), iconOnly: !0, variant: "text", onClick: se, children: "Close" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-lightbox__viewport", onClick: (ae) => {
          r && ae.target === ae.currentTarget && se();
        }, children: [
          /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Previous image", className: "mm-lightbox__nav mm-lightbox__nav--previous", disabled: !i && R === 0, iconLeft: /* @__PURE__ */ e.jsx(Kt, { size: 28 }), iconOnly: !0, variant: "text", onClick: () => ce(-1), children: "Previous image" }),
          /* @__PURE__ */ e.jsxs("div", { className: rs("mm-lightbox__canvas", `mm-lightbox__canvas--${I}`), children: [
            /* @__PURE__ */ e.jsx("img", { alt: (C == null ? void 0 : C.alt) ?? "", className: rs("mm-lightbox__image", `mm-lightbox__image--${I}`), src: C == null ? void 0 : C.src, style: Q }),
            f && /* @__PURE__ */ e.jsxs("div", { className: "mm-lightbox__overlay-controls", children: [
              /* @__PURE__ */ e.jsxs("div", { "aria-label": u.fitMode, className: "mm-lightbox__fit-switch", role: "group", children: [
                /* @__PURE__ */ e.jsx("button", { "aria-pressed": I === "contain", className: "mm-lightbox__fit-option", onClick: () => W("contain"), type: "button", children: u.fit }),
                /* @__PURE__ */ e.jsx("button", { "aria-pressed": I === "cover", className: "mm-lightbox__fit-option", onClick: () => W("cover"), type: "button", children: u.cover }),
                /* @__PURE__ */ e.jsx("button", { "aria-pressed": I === "actual", className: "mm-lightbox__fit-option", onClick: () => W("actual"), type: "button", children: u.actual })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "mm-lightbox__toolbar", "aria-label": "Image controls", children: [
                /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Zoom out", disabled: !v || F <= 0.5, iconLeft: /* @__PURE__ */ e.jsx(Pr, { size: 18 }), iconOnly: !0, variant: "text", onClick: () => E((ae) => Math.max(0.5, ae - 0.25)), children: "Zoom out" }),
                /* @__PURE__ */ e.jsxs("span", { "aria-live": "polite", className: "mm-lightbox__zoom-label", children: [
                  Math.round(F * 100),
                  "%"
                ] }),
                /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Zoom in", disabled: !v || F >= 4, iconLeft: /* @__PURE__ */ e.jsx(Lr, { size: 18 }), iconOnly: !0, variant: "text", onClick: () => E((ae) => Math.min(4, ae + 0.25)), children: "Zoom in" }),
                /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Rotate left", iconLeft: /* @__PURE__ */ e.jsx($r, { size: 18 }), iconOnly: !0, variant: "text", onClick: () => K((ae) => ae - 90), children: "Rotate left" }),
                /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Rotate right", iconLeft: /* @__PURE__ */ e.jsx(kr, { size: 18 }), iconOnly: !0, variant: "text", onClick: () => K((ae) => ae + 90), children: "Rotate right" }),
                /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Toggle fullscreen", iconLeft: /* @__PURE__ */ e.jsx(Sr, { size: 18 }), iconOnly: !0, variant: "text", onClick: ve, children: "Toggle fullscreen" }),
                m && /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Download image", iconLeft: /* @__PURE__ */ e.jsx(Ar, { size: 18 }), iconOnly: !0, variant: "text", onClick: te, children: "Download image" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Next image", className: "mm-lightbox__nav mm-lightbox__nav--next", disabled: !i && R === t.length - 1, iconLeft: /* @__PURE__ */ e.jsx(pt, { size: 28 }), iconOnly: !0, variant: "text", onClick: () => ce(1), children: "Next image" })
        ] }),
        g && ((C == null ? void 0 : C.caption) || (C == null ? void 0 : C.alt)) && /* @__PURE__ */ e.jsx("div", { className: "mm-lightbox__caption", children: C.caption ?? C.alt }),
        N && /* @__PURE__ */ e.jsx("div", { "aria-label": "Image thumbnails", className: "mm-lightbox__thumbnails", style: { "--mm-lightbox-thumb-size": `${w}px` }, children: t.map((ae, fe) => /* @__PURE__ */ e.jsx("button", { "aria-label": `Show image ${fe + 1}`, "aria-current": fe === R ? "true" : void 0, className: rs("mm-lightbox__thumbnail", fe === R && "mm-lightbox__thumbnail--active"), onClick: () => H(fe), type: "button", children: /* @__PURE__ */ e.jsx("img", { alt: "", src: ae.thumbnailSrc ?? ae.src }) }, ae.id ?? ae.src)) })
      ] }) }),
      document.body
    )
  ] }) : null;
}
const sa = (...t) => t.filter(Boolean).join(" ");
function Qt({
  "aria-describedby": t,
  className: s,
  checkedIcon: a,
  description: r,
  error: n,
  id: m,
  indeterminate: o = !1,
  label: i,
  indeterminateIcon: c,
  loading: p = !1,
  size: l = "default",
  ...d
}) {
  const y = He(), b = m ?? `mm-checkbox-${y}`, h = ke(null), j = r ? `${b}-description` : void 0, w = n ? `${b}-error` : void 0, z = [t, j, w].filter(Boolean).join(" ") || void 0;
  return Me(() => {
    h.current && (h.current.indeterminate = o);
  }, [o]), /* @__PURE__ */ e.jsxs("div", { className: sa("mm-checkbox-field", s), children: [
    /* @__PURE__ */ e.jsxs("label", { className: sa("mm-checkbox", `mm-checkbox--${l}`, n && "mm-checkbox--error", (d.disabled || p) && "mm-checkbox--disabled", p && "mm-checkbox--loading"), children: [
      /* @__PURE__ */ e.jsx("input", { ...d, "aria-describedby": z, "aria-invalid": d["aria-invalid"] ?? !!n, disabled: d.disabled || p, id: b, ref: h, type: "checkbox" }),
      /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: sa("mm-checkbox__control", o && "mm-checkbox__control--indeterminate", !!(a || c) && "mm-checkbox__control--custom"), children: p ? /* @__PURE__ */ e.jsx("span", { className: "mm-checkbox__loader" }) : o ? c : a }),
      i && /* @__PURE__ */ e.jsxs("span", { className: "mm-checkbox__label", children: [
        i,
        d.required && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: " *" })
      ] })
    ] }),
    r && /* @__PURE__ */ e.jsx("p", { className: "mm-checkbox-field__description", id: j, children: r }),
    n && /* @__PURE__ */ e.jsx("p", { className: "mm-checkbox-field__error", id: w, children: n })
  ] });
}
const aa = (...t) => t.filter(Boolean).join(" "), Ps = Wt(function({
  "aria-describedby": s,
  "aria-invalid": a,
  className: r,
  clearable: n = !1,
  defaultValue: m,
  description: o,
  disabled: i = !1,
  error: c,
  fullWidth: p = !1,
  id: l,
  inputClassName: d,
  label: y,
  leadingIcon: b,
  loading: h = !1,
  maxLength: j,
  onChange: w,
  onClear: z,
  placeholder: v,
  prefix: D,
  required: x = !1,
  readOnly: _ = !1,
  size: u = "default",
  suffix: S,
  trailingActions: M,
  trailingIcon: g,
  value: N,
  variant: f = "outline",
  ...T
}) {
  const B = He(), R = l ?? `mm-input-${B}`, [A, F] = q(m === void 0 ? "" : String(m)), E = N === void 0 ? A : String(N), L = !!c, K = o ? `${R}-description` : void 0, I = c ? `${R}-error` : void 0, W = [s, K, I].filter(Boolean).join(" ") || void 0, k = n && E.length > 0 && !i && !h && !_, Y = !!(b || D), P = !!(_ || S || k || M || !k && g), C = (Q) => {
    N === void 0 && F(Q.target.value), w == null || w(Q);
  }, V = () => {
    z == null || z(), N === void 0 && F("");
  };
  return /* @__PURE__ */ e.jsxs("div", { className: aa("mm-input-field", p && "mm-input-field--full-width", r), children: [
    y && /* @__PURE__ */ e.jsxs("label", { className: "mm-input-field__label", htmlFor: R, children: [
      y,
      x && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: " *" })
    ] }),
    o && /* @__PURE__ */ e.jsx("p", { className: "mm-input-field__description", id: K, children: o }),
    /* @__PURE__ */ e.jsxs("span", { className: aa("mm-input", `mm-input--${u}`, `mm-input--${f}`, L && "mm-input--error", h && "mm-input--loading", i && "mm-input--disabled", _ && "mm-input--readonly", Y && "mm-input--has-leading-icon", P && "mm-input--has-trailing-icon"), children: [
      b && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__icon mm-input__icon--leading", children: b }),
      D && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__adornment mm-input__adornment--prefix", children: D }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          ...T,
          "aria-describedby": W,
          "aria-invalid": a ?? L,
          className: aa("mm-input__control", d),
          defaultValue: m,
          disabled: i || h,
          id: R,
          onChange: C,
          placeholder: v,
          readOnly: _,
          maxLength: j,
          required: x,
          value: N
        }
      ),
      h && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-input__loader", role: "status" }),
      S && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__adornment mm-input__adornment--suffix", children: S }),
      M && /* @__PURE__ */ e.jsx("span", { className: "mm-input__actions", children: M }),
      k && /* @__PURE__ */ e.jsx("button", { "aria-label": "Clear input", className: "mm-input__action", onClick: V, type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 16 }) }),
      _ && /* @__PURE__ */ e.jsx("span", { "aria-label": "Read-only", className: "mm-input__icon mm-input__icon--trailing", role: "img", children: /* @__PURE__ */ e.jsx(zn, { size: 16 }) }),
      !k && !_ && g && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__icon mm-input__icon--trailing mm-input__icon--interactive", children: g })
    ] }),
    j !== void 0 && /* @__PURE__ */ e.jsxs("p", { "aria-live": "polite", className: "mm-input-field__counter", children: [
      E.length,
      " / ",
      j
    ] }),
    c && /* @__PURE__ */ e.jsx("p", { className: "mm-input-field__error", id: I, children: c })
  ] });
}), Va = (...t) => t.filter(Boolean).join(" "), zi = /^-?(?:\d+(?:\.\d*)?|\.\d*)?$/;
function ns(t, s) {
  const a = s === void 0 ? t : Number(t.toFixed(Math.max(0, s)));
  return String(a);
}
function xa({
  "aria-describedby": t,
  "aria-invalid": s,
  clampOnBlur: a = !0,
  className: r,
  controls: n = !0,
  defaultValue: m,
  description: o,
  disabled: i = !1,
  error: c,
  fullWidth: p = !1,
  id: l,
  label: d,
  leadingIcon: y,
  loading: b = !1,
  max: h,
  maxWidth: j,
  min: w,
  minWidth: z,
  onBlur: v,
  onChange: D,
  onKeyDown: x,
  onStep: _,
  placeholder: u,
  precision: S,
  prefix: M,
  readOnly: g = !1,
  resettable: N = !1,
  size: f = "default",
  step: T = 1,
  suffix: B,
  trailingIcon: R,
  value: A,
  variant: F = "outline",
  width: E,
  ...L
}) {
  const K = He(), I = l ?? `mm-input-number-${K}`, W = o ? `${I}-description` : void 0, k = c ? `${I}-error` : void 0, Y = [t, W, k].filter(Boolean).join(" ") || void 0, P = A !== void 0, C = ke(A ?? m), V = m === void 0 ? "" : ns(m, S), [Q, H] = q(V);
  Me(() => {
    P && H(A === null || A === void 0 ? "" : ns(A, S)), C.current === void 0 && A !== void 0 && A !== null && (C.current = A);
  }, [P, S, A]);
  const X = (ie) => {
    if (ie.trim() === "" || ie === "-") return;
    const re = Number(ie);
    return Number.isFinite(re) ? re : void 0;
  }, ce = (ie) => Math.min(h ?? ie, Math.max(w ?? ie, ie)), se = (ie, re) => {
    D == null || D(ie, re);
  }, te = (ie, re, U) => {
    const Z = ce(ie), G = ns(Z, S);
    H(G), se(Z, re), _ == null || _(Z, U ?? (Z >= ie ? "increment" : "decrement"));
  }, ve = (ie) => {
    const re = ie.target.value.replace(",", ".");
    zi.test(re) && (H(re), se(X(re), ie));
  }, ge = (ie) => {
    const re = X(Q);
    re === void 0 ? Q !== "" && H("") : a && H(ns(ce(re), S)), v == null || v(ie);
  }, ae = (ie) => {
    const U = (X(Q) ?? w ?? 0) + (ie === "increment" ? T : -T);
    te(U, void 0, ie);
  }, fe = (ie) => {
    (ie.key === "ArrowUp" || ie.key === "ArrowDown") && (ie.preventDefault(), ae(ie.key === "ArrowUp" ? "increment" : "decrement")), x == null || x(ie);
  }, de = i || b || g || w !== void 0 && (X(Q) ?? w) <= w, oe = i || b || g || h !== void 0 && (X(Q) ?? h) >= h, xe = p ? { maxWidth: "none", minWidth: 0, width: "100%" } : { maxWidth: j, minWidth: z, width: E };
  return /* @__PURE__ */ e.jsxs("div", { className: Va("mm-input-number-field", p && "mm-input-number-field--full-width", r), style: xe, children: [
    d && /* @__PURE__ */ e.jsxs("div", { className: "mm-input-number-field__label-row", children: [
      /* @__PURE__ */ e.jsx("label", { className: "mm-input-number-field__label", htmlFor: I, children: d }),
      N && /* @__PURE__ */ e.jsx("button", { "aria-label": `Reset ${d}`, className: "mm-input-number-field__reset", disabled: i || b, onClick: () => {
        const ie = C.current ?? 0;
        H(ns(ie, S)), D == null || D(ie, void 0);
      }, type: "button", children: "Reset" })
    ] }),
    o && /* @__PURE__ */ e.jsx("p", { className: "mm-input-number-field__description", id: W, children: o }),
    /* @__PURE__ */ e.jsxs("span", { "aria-busy": b || void 0, className: Va("mm-input-number", `mm-input-number--${f}`, `mm-input-number--${F}`, c && "mm-input-number--error", i && "mm-input-number--disabled", b && "mm-input-number--loading", g && "mm-input-number--readonly"), children: [
      y && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-number__icon", children: y }),
      M && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-number__adornment", children: M }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          ...L,
          ...w !== void 0 ? { min: w } : {},
          ...h !== void 0 ? { max: h } : {},
          "aria-describedby": Y,
          "aria-invalid": s ?? !!c,
          "aria-valuemax": h,
          "aria-valuemin": w,
          "aria-valuenow": X(Q),
          className: "mm-input-number__control",
          disabled: i || b,
          id: I,
          inputMode: S === 0 ? "numeric" : "decimal",
          onBlur: ge,
          onChange: ve,
          onKeyDown: fe,
          placeholder: u,
          readOnly: g,
          role: "spinbutton",
          value: Q
        }
      ),
      B && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-number__adornment", children: B }),
      R && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-number__icon", children: R }),
      b && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-input-number__loading", role: "status" }),
      n && /* @__PURE__ */ e.jsxs("span", { "aria-label": "Number controls", className: "mm-input-number__controls", children: [
        /* @__PURE__ */ e.jsx("button", { "aria-label": "Decrease value", disabled: de, onClick: () => ae("decrement"), type: "button", children: /* @__PURE__ */ e.jsx(Mr, { "aria-hidden": "true", strokeWidth: 1.7 }) }),
        /* @__PURE__ */ e.jsx("button", { "aria-label": "Increase value", disabled: oe, onClick: () => ae("increment"), type: "button", children: /* @__PURE__ */ e.jsx(zr, { "aria-hidden": "true", strokeWidth: 1.7 }) })
      ] })
    ] }),
    c && /* @__PURE__ */ e.jsx("p", { className: "mm-input-number-field__error", id: k, children: c })
  ] });
}
const is = (...t) => t.filter(Boolean).join(" "), _t = (t, s = 0, a = 1) => Math.min(a, Math.max(s, t)), It = (t) => Math.round(t).toString(16).padStart(2, "0"), ls = (t) => typeof t == "number" ? `${t}px` : t, ra = (t) => typeof t == "string" ? t : t.value, Oa = (t) => typeof t == "string" ? t : t.label ?? t.value;
function Si(t, s, a, r = 1) {
  const n = _t(t / 255), m = _t(s / 255), o = _t(a / 255), i = Math.max(n, m, o), c = Math.min(n, m, o), p = i - c;
  let l = 0;
  return p && (i === n ? l = (m - o) / p % 6 : i === m ? l = (o - n) / p + 2 : l = (n - m) / p + 4, l *= 60, l < 0 && (l += 360)), { h: l, s: i ? p / i : 0, v: i, a: _t(r) };
}
function At(t, s) {
  const a = t.trim();
  return a.endsWith("%") ? Number.parseFloat(a) * s / 100 : Number.parseFloat(a);
}
function Ft(t) {
  const s = t.trim().toLowerCase(), a = s.match(/^#([0-9a-f]{3,8})$/);
  let r = 0, n = 50, m = 49, o = 1;
  if (a) {
    const i = a[1], c = i.length <= 4 ? i.split("").map((p) => p + p).join("") : i;
    r = parseInt(c.slice(0, 2), 16), n = parseInt(c.slice(2, 4), 16), m = parseInt(c.slice(4, 6), 16), c.length === 8 && (o = parseInt(c.slice(6, 8), 16) / 255);
  } else {
    const i = s.match(/^rgba?\(([^)]+)\)/), c = s.match(/^hsla?\(([^)]+)\)/), p = s.match(/^hs(?:b|v)a?\(([^)]+)\)/);
    if (i) {
      const l = i[1].split(/[,\s/]+/).filter(Boolean);
      [r, n, m] = l.slice(0, 3).map((d) => At(d, 255)), o = l[3] ? At(l[3], 1) : 1;
    } else if (c) {
      const l = c[1].split(/[,\s/]+/).filter(Boolean), d = (Number.parseFloat(l[0]) % 360 + 360) % 360, y = _t(At(l[1], 1)), b = _t(At(l[2], 1));
      o = l[3] ? At(l[3], 1) : 1;
      const h = (1 - Math.abs(2 * b - 1)) * y, j = h * (1 - Math.abs(d / 60 % 2 - 1)), w = b - h / 2;
      [r, n, m] = (d < 60 ? [h, j, 0] : d < 120 ? [j, h, 0] : d < 180 ? [0, h, j] : d < 240 ? [0, j, h] : d < 300 ? [j, 0, h] : [h, 0, j]).map((v) => (v + w) * 255);
    } else if (p) {
      const l = p[1].split(/[,\s/]+/).filter(Boolean), d = (Number.parseFloat(l[0]) % 360 + 360) % 360, y = _t(At(l[1], 1)), b = _t(At(l[2], 1));
      o = l[3] ? At(l[3], 1) : 1;
      const h = b * y, j = h * (1 - Math.abs(d / 60 % 2 - 1)), w = b - h;
      [r, n, m] = (d < 60 ? [h, j, 0] : d < 120 ? [j, h, 0] : d < 180 ? [0, h, j] : d < 240 ? [0, j, h] : d < 300 ? [j, 0, h] : [h, 0, j]).map((v) => (v + w) * 255);
    }
  }
  return Si(r, n, m, o);
}
function Ti(t, s) {
  return s && t.trim().toLowerCase() === "transparent" || /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t.trim()) || /^(?:rgba?|hsla?|hsba?|hsva?)\([^)]{3,}\)$/i.test(t.trim());
}
function qr(t) {
  const s = t.v * t.s, a = s * (1 - Math.abs(t.h / 60 % 2 - 1)), r = t.v - s;
  return (t.h < 60 ? [s, a, 0] : t.h < 120 ? [a, s, 0] : t.h < 180 ? [0, s, a] : t.h < 240 ? [0, a, s] : t.h < 300 ? [a, 0, s] : [s, 0, a]).map((m) => (m + r) * 255);
}
function Ei(t) {
  const s = t.v * (1 - t.s / 2), a = s === 0 || s === 1 ? 0 : (t.v - s) / Math.min(s, 1 - s);
  return [Math.round(t.h), Math.round(a * 100), Math.round(s * 100)];
}
function Di(t) {
  return [Math.round(t.h), Math.round(t.s * 100), Math.round(t.v * 100)];
}
function os(t, s, a) {
  const [r, n, m] = qr(t).map(Math.round), o = a === "percentage" ? `${Math.round(t.a * 100)}%` : Number(t.a.toFixed(2)), [i, c, p] = Ei(t), [l, d, y] = Di(t);
  return s === "hex8" ? `#${It(r)}${It(n)}${It(m)}${It(t.a * 255)}` : s === "rgb" ? `rgb(${r}, ${n}, ${m})` : s === "rgba" ? `rgba(${r}, ${n}, ${m}, ${o})` : s === "hsl" ? `hsl(${i}, ${c}%, ${p}%)` : s === "hsla" ? `hsla(${i}, ${c}%, ${p}%, ${o})` : s === "hsb" || s === "hsv" ? `${s}(${l}, ${d}%, ${y}%)` : s === "hsba" || s === "hsva" ? `${s}(${l}, ${d}%, ${y}%, ${o})` : `#${It(r)}${It(n)}${It(m)}`;
}
function qa(t) {
  const s = qr(t).map((a) => a / 255).map((a) => a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4);
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}
function Ai(t, s) {
  const a = qa(t), r = qa(s);
  return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
}
function Bi({ "aria-label": t = "Color picker", value: s, defaultValue: a = "#003231", onChange: r, onCommit: n, onCancel: m, onInvalid: o, invalidMessage: i = "Enter a valid color value.", onOpenChange: c, label: p, size: l = "default", format: d = "hex", disabled: y = !1, readOnly: b = !1, inline: h = !1, showAlpha: j = !0, alphaFormat: w = "decimal", showInput: z = !0, showSwatches: v = !0, swatches: D = ["#003231", "#12b76a", "#f79009", "#f04438", "#7f56d9", "#2e90fa", "#101828", "#ffffff"], presets: x = [], recentColors: _ = [], showRecent: u = !1, onSwatchAdd: S, onSwatchRemove: M, swatchShape: g = "circle", swatchSize: N = 22, showSwatchLabels: f = !1, allowCustomSwatch: T = !1, allowTransparent: B = !1, confirmActions: R = !1, okLabel: A = "OK", cancelLabel: F = "Cancel", showEyeDropper: E = !1, showContrast: L = !1, contrastAgainst: K = "#ffffff", tokenOptions: I = [], placement: W = "bottom", closeOnEscape: k = !0, closeOnOutsideClick: Y = !0, portal: P = !1, popoverWidth: C = 248, className: V, style: Q }) {
  const H = ke(null), [X, ce] = q(a), se = s ?? X, [te, ve] = q(() => Ft(se)), [ge, ae] = q(se.trim().toLowerCase() === "transparent"), [fe, de] = q(se), [oe, xe] = q(h), [ie, re] = q(!1), [U, Z] = q(_), [G, me] = q({}), he = ke(se), ze = ge ? "transparent" : os(te, d, w), je = () => {
    if (!P || !H.current) return;
    const O = H.current.getBoundingClientRect(), ye = 8, De = W === "top" ? { left: O.left, top: O.top - ye, transform: "translateY(-100%)" } : W === "left" ? { left: O.left - ye, top: O.top, transform: "translateX(-100%)" } : W === "right" ? { left: O.right + ye, top: O.top } : { left: O.left, top: O.bottom + ye };
    me({ ...De, width: ls(C), position: "fixed", zIndex: 1e3 });
  };
  Me(() => {
    ve(Ft(se)), ae(se.trim().toLowerCase() === "transparent"), de(se);
  }, [se]), Me(() => {
    oe && (he.current = se, je());
  }, [oe]), Me(() => {
    if (!(!oe || !P))
      return window.addEventListener("resize", je), window.addEventListener("scroll", je, !0), () => {
        window.removeEventListener("resize", je), window.removeEventListener("scroll", je, !0);
      };
  }, [oe, P, W, C]), Me(() => {
    const O = (ye) => {
      const De = ye.target;
      Y && !h && H.current && !H.current.contains(ye.target) && !(De != null && De.closest(".mm-color-picker__popover")) && (xe(!1), c == null || c(!1));
    };
    return document.addEventListener("mousedown", O), () => document.removeEventListener("mousedown", O);
  }, [Y, h, c]), Me(() => {
    if (!oe || !k) return;
    const O = (ye) => {
      if (ye.key === "Escape") {
        const De = he.current;
        s === void 0 && ce(De), xe(!1), de(De), ve(Ft(De)), ae(De.trim().toLowerCase() === "transparent"), r == null || r(De), m == null || m(), c == null || c(!1);
      }
    };
    return window.addEventListener("keydown", O), () => window.removeEventListener("keydown", O);
  }, [k, m, r, c, oe, s]);
  const Ne = (O, ye = !1) => {
    ve(O), ae(ye);
    const De = ye ? "transparent" : os(O, d, w);
    de(De), s === void 0 && ce(De), r == null || r(De), re(!1);
  }, Re = (O = ze) => {
    Z((ye) => [O, ...ye.filter((De) => De !== O)].slice(0, 8)), n == null || n(O);
  }, _e = (O) => {
    if (y || b) return;
    const ye = O.currentTarget.getBoundingClientRect();
    Ne({ ...te, s: _t((O.clientX - ye.left) / ye.width), v: _t(1 - (O.clientY - ye.top) / ye.height) });
  }, Le = (O) => {
    if (O.trim().toLowerCase() === "transparent" && B) {
      Ne({ ...te, a: 0 }, !0), R || Re("transparent");
      return;
    }
    if (!Ti(O, B)) {
      re(!0), o == null || o(O);
      return;
    }
    Ne(Ft(O)), R || Re(os(Ft(O), d, w));
  }, Xe = () => {
    const O = he.current;
    s === void 0 && ce(O), ve(Ft(O)), ae(O.trim().toLowerCase() === "transparent"), de(O), re(!1), r == null || r(O), m == null || m(), xe(!1), c == null || c(!1);
  }, Ze = () => {
    Re(ze), xe(!1), c == null || c(!1);
  }, lt = () => {
    if (y || b || h) return;
    const O = !oe;
    O && (he.current = se), xe(O), c == null || c(O);
  }, ot = (O) => {
    const ye = typeof O == "string" ? O : O.token, De = typeof O == "string" ? void 0 : O.value;
    if (De) return De;
    if (typeof window > "u" || !H.current) return "";
    const We = ye.startsWith("--") ? ye : `--mm-color-${ye}`;
    return getComputedStyle(H.current).getPropertyValue(We).trim();
  }, dt = I.map((O) => ({ value: ot(O), label: typeof O == "string" ? O : O.label ?? O.token })).filter((O) => O.value), ue = /* @__PURE__ */ e.jsxs("div", { className: "mm-color-picker__panel", children: [
    /* @__PURE__ */ e.jsx("div", { "aria-label": "Saturation and brightness", className: "mm-color-picker__area", onClick: _e, onKeyDown: (O) => {
      if (O.key === "ArrowLeft" || O.key === "ArrowRight" || O.key === "ArrowUp" || O.key === "ArrowDown") {
        O.preventDefault();
        const ye = O.shiftKey ? 0.1 : 0.01;
        Ne({ ...te, s: _t(te.s + (O.key === "ArrowRight" ? ye : O.key === "ArrowLeft" ? -ye : 0)), v: _t(te.v + (O.key === "ArrowUp" ? ye : O.key === "ArrowDown" ? -ye : 0)) });
      }
    }, onMouseDown: (O) => O.preventDefault(), role: "slider", tabIndex: 0, style: { "--mm-color-hue": `${te.h}deg` }, children: /* @__PURE__ */ e.jsx("span", { className: "mm-color-picker__area-pointer", style: { left: `${te.s * 100}%`, top: `${(1 - te.v) * 100}%` } }) }),
    /* @__PURE__ */ e.jsxs("label", { className: "mm-color-picker__range-label", children: [
      "Hue",
      /* @__PURE__ */ e.jsx("input", { "aria-label": "Hue", className: "mm-color-picker__hue", max: "360", min: "0", onChange: (O) => Ne({ ...te, h: Number(O.target.value) }), type: "range", value: te.h })
    ] }),
    j && /* @__PURE__ */ e.jsxs("label", { className: "mm-color-picker__range-label", children: [
      "Opacity",
      /* @__PURE__ */ e.jsx("input", { "aria-label": "Opacity", className: "mm-color-picker__alpha", max: "1", min: "0", onChange: (O) => Ne({ ...te, a: Number(O.target.value) }), step: "0.01", type: "range", value: te.a })
    ] }),
    z && /* @__PURE__ */ e.jsxs("div", { className: "mm-color-picker__input-row", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-color-picker__preview", style: { background: os(te, "rgba", "decimal") } }),
      /* @__PURE__ */ e.jsx("input", { "aria-invalid": ie, "aria-label": "Color value", className: is("mm-color-picker__input", ie && "mm-color-picker__input--invalid"), onChange: (O) => {
        de(O.target.value), re(!1);
      }, onKeyDown: (O) => {
        O.key === "Enter" && (Le(fe), R || Re());
      }, onBlur: () => Le(fe), type: "text", value: fe })
    ] }),
    ie && /* @__PURE__ */ e.jsx("small", { className: "mm-color-picker__error", children: i }),
    E && /* @__PURE__ */ e.jsx("button", { className: "mm-color-picker__utility", disabled: !("EyeDropper" in (typeof window > "u" ? {} : window)), onClick: async () => {
      const O = window.EyeDropper;
      if (!O) return;
      const ye = await new O().open();
      Le(ye.sRGBHex);
    }, type: "button", children: "Pick from screen" }),
    B && /* @__PURE__ */ e.jsx("button", { className: "mm-color-picker__utility", onClick: () => Le("transparent"), type: "button", children: "Transparent" }),
    dt.length > 0 && /* @__PURE__ */ e.jsx("div", { "aria-label": "Theme color tokens", className: "mm-color-picker__swatches", children: dt.map((O) => /* @__PURE__ */ e.jsx("button", { "aria-label": `Choose ${O.label}`, className: "mm-color-picker__swatch", onClick: () => Le(O.value), style: { background: O.value, "--mm-swatch-size": ls(N) }, title: String(O.label), type: "button" }, `${O.label}-${O.value}`)) }),
    u && U.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "mm-color-picker__swatch-group", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-color-picker__swatch-heading", children: "Recent colors" }),
      /* @__PURE__ */ e.jsx("div", { className: "mm-color-picker__swatches", children: U.map((O) => /* @__PURE__ */ e.jsx("button", { "aria-label": `Choose recent ${O}`, className: "mm-color-picker__swatch", onClick: () => Le(O), onDoubleClick: () => M == null ? void 0 : M(O), style: { background: O, "--mm-swatch-size": ls(N) }, title: O, type: "button" }, O)) })
    ] }),
    v && /* @__PURE__ */ e.jsxs("div", { className: "mm-color-picker__swatch-group", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-color-picker__swatch-heading", children: f ? "Palette" : "" }),
      /* @__PURE__ */ e.jsx("div", { "aria-label": "Color swatches", className: "mm-color-picker__swatches", children: [...x, ...D].map((O, ye) => /* @__PURE__ */ e.jsx("button", { "aria-label": `Choose ${Oa(O)}`, className: is("mm-color-picker__swatch", `mm-color-picker__swatch--${g}`), onClick: () => Le(ra(O)), style: { background: ra(O), "--mm-swatch-size": ls(N) }, title: f ? String(Oa(O)) : void 0, type: "button" }, `${ra(O)}-${ye}`)) })
    ] }),
    T && /* @__PURE__ */ e.jsx("button", { className: "mm-color-picker__utility", onClick: () => S == null ? void 0 : S(ze), type: "button", children: "Add current color" }),
    L && /* @__PURE__ */ e.jsxs("div", { className: "mm-color-picker__contrast", children: [
      "Contrast against ",
      K,
      ": ",
      /* @__PURE__ */ e.jsxs("strong", { children: [
        Ai(te, Ft(K)).toFixed(2),
        ":1"
      ] })
    ] }),
    R && /* @__PURE__ */ e.jsxs("div", { className: "mm-color-picker__actions", children: [
      /* @__PURE__ */ e.jsx(Pe, { size: "sm", variant: "outline", onClick: Xe, children: F }),
      /* @__PURE__ */ e.jsx(Pe, { size: "sm", onClick: Ze, children: A })
    ] })
  ] }), pe = /* @__PURE__ */ e.jsx("div", { className: is("mm-color-picker__popover", P && "mm-color-picker__popover--portal", `mm-color-picker__popover--${W}`), role: "dialog", style: P ? G : { width: ls(C) }, children: ue });
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: is("mm-color-picker", `mm-color-picker--${l}`, h && "mm-color-picker--inline", V), ref: H, style: Q, children: [
    p && /* @__PURE__ */ e.jsx("span", { className: "mm-color-picker__label", children: p }),
    /* @__PURE__ */ e.jsxs("button", { "aria-expanded": oe, "aria-haspopup": "dialog", className: "mm-color-picker__trigger", disabled: y, onClick: lt, type: "button", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-color-picker__trigger-swatch", style: { background: os(te, "rgba", "decimal") } }),
      /* @__PURE__ */ e.jsx("span", { children: fe }),
      /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", className: is("mm-color-picker__chevron", oe && "mm-color-picker__chevron--open"), size: 16 })
    ] }),
    oe && (P && typeof document < "u" ? vs(pe, document.body) : pe)
  ] });
}
const Xr = gt(null), ba = (...t) => t.filter(Boolean).join(" ");
function Gr({ className: t, description: s, error: a, id: r, label: n, onChange: m, size: o = "default", ...i }) {
  const c = vt(Xr), p = He(), l = r ?? `mm-radio-${p}`, d = s ? `${l}-description` : void 0, y = a ? `${l}-error` : void 0, b = [i["aria-describedby"], d, y].filter(Boolean).join(" ") || void 0, h = (c == null ? void 0 : c.value) === void 0 ? i.checked : c.value === i.value, j = (w) => {
    var z;
    m == null || m(w), (z = c == null ? void 0 : c.onChange) == null || z.call(c, String(w.target.value), w);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: ba("mm-radio-field", a && "mm-radio-field--error"), children: [
    /* @__PURE__ */ e.jsxs("label", { className: ba("mm-radio", `mm-radio--${o}`, i.disabled && "mm-radio--disabled", t), children: [
      /* @__PURE__ */ e.jsx("input", { ...i, "aria-describedby": b, "aria-invalid": i["aria-invalid"] ?? !!a, checked: h, id: l, name: (c == null ? void 0 : c.name) ?? i.name, onChange: j, type: "radio" }),
      /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-radio__control" }),
      n && /* @__PURE__ */ e.jsx("span", { className: "mm-radio__label", children: n })
    ] }),
    s && /* @__PURE__ */ e.jsx("p", { className: "mm-radio-field__description", id: d, children: s }),
    a && /* @__PURE__ */ e.jsx("p", { className: "mm-radio-field__error", id: y, children: a })
  ] });
}
function Pi({ children: t, defaultValue: s, direction: a = "vertical", error: r, label: n, name: m, onChange: o, value: i }) {
  const c = He(), p = m ?? `mm-radio-group-${c}`, [l, d] = q(s), y = i === void 0 ? l : i, b = (h, j) => {
    i === void 0 && d(h), o == null || o(h, j);
  };
  return /* @__PURE__ */ e.jsxs("fieldset", { className: "mm-radio-group", children: [
    n && /* @__PURE__ */ e.jsx("legend", { className: "mm-radio-group__label", children: n }),
    /* @__PURE__ */ e.jsx(Xr.Provider, { value: { name: p, value: y, onChange: b }, children: /* @__PURE__ */ e.jsx("div", { className: ba("mm-radio-group__options", `mm-radio-group__options--${a}`), children: t }) }),
    r && /* @__PURE__ */ e.jsx("p", { className: "mm-radio-group__error", children: r })
  ] });
}
const $s = (...t) => t.filter(Boolean).join(" ");
function Li(t, s) {
  return s ? Array.isArray(t) ? t : t ? [t] : [] : Array.isArray(t) ? t.slice(0, 1) : t ? [t] : [];
}
function Gt({
  "aria-describedby": t,
  "aria-label": s,
  className: a,
  clearable: r = !1,
  defaultValue: n,
  description: m,
  disabled: o = !1,
  error: i,
  fullWidth: c = !1,
  id: p,
  label: l,
  loading: d = !1,
  maxSelected: y,
  multiple: b = !1,
  name: h,
  onChange: j,
  onOpenChange: w,
  open: z,
  options: v,
  placeholder: D = "Select an option",
  readOnly: x = !1,
  renderValue: _,
  searchPlaceholder: u = "MagnifyingGlass options",
  searchable: S = !1,
  size: M = "default",
  value: g,
  variant: N = "outline"
}) {
  const f = He(), T = p ?? `mm-select-${f}`, B = `${T}-listbox`, R = g !== void 0, [A, F] = q(n), E = Li(R ? g : A, b), [L, K] = q(!1), I = z ?? L, [W, k] = q(""), [Y, P] = q(0), C = ke(null), V = ke(null), Q = ke(null), H = ke(null), X = m ? `${T}-description` : void 0, ce = i ? `${T}-error` : void 0, se = [t, X, ce].filter(Boolean).join(" ") || void 0, te = mt(() => {
    const G = W.trim().toLowerCase();
    return G ? v.filter((me) => `${me.label} ${me.description ?? ""}`.toLowerCase().includes(G)) : v;
  }, [v, W]), ve = E.map((G) => v.find((me) => me.value === G)).filter(Boolean), ge = new Set(E), ae = E.length > 0, fe = r && ae && !o && !x && !d, de = te[Y];
  Me(() => {
    const G = (me) => {
      C.current && !C.current.contains(me.target) && oe(!1);
    };
    return document.addEventListener("mousedown", G), () => document.removeEventListener("mousedown", G);
  }, []), Me(() => {
    if (!I) return;
    P(0), requestAnimationFrame(() => {
      var ze, je;
      S ? (ze = V.current) == null || ze.focus({ preventScroll: !0 }) : (je = Q.current) == null || je.focus({ preventScroll: !0 });
    });
    const G = H.current;
    if (!G) return;
    const me = () => window.scrollTo(G.left, G.top);
    me();
    const he = requestAnimationFrame(() => requestAnimationFrame(me));
    return () => cancelAnimationFrame(he);
  }, [I, S]);
  const oe = (G) => {
    o || x || d || (G && !I && (H.current = { left: window.scrollX, top: window.scrollY }), z === void 0 && K(G), w == null || w(G), G || k(""));
  }, xe = (G) => {
    const me = b ? G : G[0];
    R || F(me);
    const he = G.map((ze) => v.find((je) => je.value === ze)).filter(Boolean);
    j == null || j(me, b ? he : he[0]);
  }, ie = (G) => {
    if (!G.disabled) {
      if (b) {
        ge.has(G.value) ? xe(E.filter((me) => me !== G.value)) : (y === void 0 || E.length < y) && xe([...E, G.value]);
        return;
      }
      xe([G.value]), oe(!1);
    }
  }, re = () => xe([]), U = (G) => {
    G.key === "ArrowDown" || G.key === "ArrowUp" ? (G.preventDefault(), I ? P((me) => Math.max(0, Math.min(te.length - 1, me + (G.key === "ArrowDown" ? 1 : -1)))) : oe(!0)) : G.key === "Enter" || G.key === " " ? (G.preventDefault(), I ? de && ie(de) : oe(!0)) : G.key === "Escape" ? (G.preventDefault(), oe(!1)) : G.key === "House" && I ? (G.preventDefault(), P(0)) : G.key === "End" && I && (G.preventDefault(), P(Math.max(0, te.length - 1)));
  }, Z = _ ? _(ve, b) : b ? /* @__PURE__ */ e.jsx("span", { className: "mm-select__chips", children: ve.map((G) => /* @__PURE__ */ e.jsxs("span", { className: "mm-select__chip", children: [
    G.label,
    /* @__PURE__ */ e.jsx("button", { "aria-label": `Remove ${G.label}`, className: "mm-select__chip-remove", onClick: (me) => {
      me.stopPropagation(), ie(G);
    }, type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 12 }) })
  ] }, G.value)) }) : ve[0] ? /* @__PURE__ */ e.jsx("span", { className: "mm-select__selected", children: ve[0].label }) : null;
  return /* @__PURE__ */ e.jsxs("div", { className: $s("mm-select-field", c && "mm-select-field--full-width", a), ref: C, children: [
    l && /* @__PURE__ */ e.jsx("label", { className: "mm-select-field__label", htmlFor: T, children: l }),
    /* @__PURE__ */ e.jsxs("div", { className: $s("mm-select", `mm-select--${M}`, `mm-select--${N}`, i && "mm-select--error", o && "mm-select--disabled", d && "mm-select--loading", I && "mm-select--open"), children: [
      /* @__PURE__ */ e.jsxs(
        "button",
        {
          "aria-describedby": se,
          "aria-expanded": I,
          "aria-haspopup": "listbox",
          "aria-invalid": !!i,
          "aria-label": s,
          className: "mm-select__trigger",
          disabled: o,
          id: T,
          onClick: (G) => {
            G.detail === 0 && oe(!I);
          },
          onMouseDown: (G) => {
            G.preventDefault(), oe(!I);
          },
          onKeyDown: U,
          ref: Q,
          type: "button",
          children: [
            /* @__PURE__ */ e.jsx("span", { className: $s("mm-select__value", !ae && "mm-select__placeholder"), children: Z ?? D }),
            /* @__PURE__ */ e.jsxs("span", { className: "mm-select__actions", children: [
              d && /* @__PURE__ */ e.jsx(Mt, { "aria-hidden": "true", className: "mm-select__loader", size: 16 }),
              fe && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-select__clear", onClick: (G) => {
                G.stopPropagation(), re();
              }, children: /* @__PURE__ */ e.jsx(rt, { size: 16 }) }),
              /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", className: "mm-select__chevron", size: 16 })
            ] })
          ]
        }
      ),
      I && /* @__PURE__ */ e.jsxs("div", { className: "mm-select__popover", children: [
        S && /* @__PURE__ */ e.jsxs("div", { className: "mm-select__search-wrap", children: [
          /* @__PURE__ */ e.jsx(Sn, { "aria-hidden": "true", className: "mm-select__search-icon", size: 16 }),
          /* @__PURE__ */ e.jsx("input", { "aria-label": u, className: "mm-select__search", onChange: (G) => k(G.target.value), onKeyDown: U, placeholder: u, ref: V, value: W })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { "aria-label": s ?? (typeof l == "string" ? l : "Options"), className: "mm-select__list", id: B, role: "listbox", "aria-multiselectable": b || void 0, children: [
          te.length === 0 && /* @__PURE__ */ e.jsx("div", { className: "mm-select__empty", children: "No options found" }),
          te.map((G, me) => {
            const he = ge.has(G.value), ze = te[me - 1], je = G.group && G.group !== (ze == null ? void 0 : ze.group);
            return /* @__PURE__ */ e.jsxs("span", { className: "mm-select__option-wrap", children: [
              je && /* @__PURE__ */ e.jsx("span", { className: "mm-select__group", children: G.group }),
              /* @__PURE__ */ e.jsxs("button", { "aria-selected": he, className: $s("mm-select__option", he && "mm-select__option--selected", G.disabled && "mm-select__option--disabled", Y === me && "mm-select__option--active"), disabled: G.disabled, onClick: () => ie(G), onMouseEnter: () => P(me), role: "option", type: "button", children: [
                G.image ? /* @__PURE__ */ e.jsx("img", { alt: "", className: "mm-select__option-image", src: G.image }) : G.icon && /* @__PURE__ */ e.jsx("span", { className: "mm-select__option-icon", children: G.icon }),
                /* @__PURE__ */ e.jsxs("span", { className: "mm-select__option-copy", children: [
                  /* @__PURE__ */ e.jsx("span", { className: "mm-select__option-label", children: G.label }),
                  G.description && /* @__PURE__ */ e.jsx("span", { className: "mm-select__option-description", children: G.description })
                ] }),
                he && /* @__PURE__ */ e.jsx(Ct, { "aria-hidden": "true", className: "mm-select__check", size: 16 })
              ] })
            ] }, G.value);
          })
        ] }),
        b && /* @__PURE__ */ e.jsxs("div", { className: "mm-select__footer", children: [
          E.length,
          " selected",
          y !== void 0 ? ` of ${y}` : ""
        ] })
      ] })
    ] }),
    h && /* @__PURE__ */ e.jsx("input", { name: h, type: "hidden", value: b ? E.join(",") : E[0] ?? "" }),
    m && /* @__PURE__ */ e.jsx("p", { className: "mm-select-field__description", id: X, children: m }),
    i && /* @__PURE__ */ e.jsx("p", { className: "mm-select-field__error", id: ce, children: i })
  ] });
}
const Xa = (...t) => t.filter(Boolean).join(" "), Ii = (t) => typeof t == "object" ? t : { value: t, label: t }, Fi = (t, s, a) => {
  const r = (o) => {
    const i = o.replace("#", "");
    if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(i)) return null;
    const c = i.length === 3 ? i.split("").map((p) => p + p).join("") : i;
    return [0, 2, 4].map((p) => Number.parseInt(c.slice(p, p + 2), 16));
  }, n = r(t), m = r(s);
  return !n || !m ? `color-mix(in srgb, ${t} ${100 - a}%, ${s} ${a}%)` : `rgb(${n.map((o, i) => Math.round(o + (m[i] - o) * a / 100)).join(" ")})`;
};
function st({ "aria-label": t, className: s, colorRange: a, defaultValue: r = 0, disabled: n = !1, id: m, label: o, max: i = 100, min: c = 0, mode: p = "linear", onChange: l, onChangeEnd: d, onOptionChange: y, options: b, optionFormatter: h, resettable: j = !1, showColorSwatch: w = !0, showDelta: z = !1, showInitialValue: v = !1, showValue: D = !0, size: x = "default", step: _ = 1, value: u, valueFormatter: S = (M) => M }) {
  const M = He(), g = m ?? `mm-slider-${M}`, N = ke(u ?? r), f = ke(null), T = ke(null), [B, R] = q(r), A = p === "options" && !!(b != null && b.length), F = A ? b.map(Ii) : [], E = A ? 0 : c, L = A ? F.length - 1 : i, K = A ? 1 : _, I = Math.min(L, Math.max(E, u ?? B)), W = A ? F[I] : void 0, k = L === E ? 0 : (I - E) / (L - E) * 100, Y = p === "centered" && E < 0 && L > 0 ? (0 - E) / (L - E) * 100 : 0, P = Math.min(100, Math.max(0, k)), C = p === "centered" && E < 0 && L > 0 ? Math.min(Y, P) : 0, V = p === "centered" && E < 0 && L > 0 ? Math.max(Y, P) : P, Q = a ? Fi(a.from, a.to, P) : W == null ? void 0 : W.color, H = { "--mm-slider-progress-start": `${C}%`, "--mm-slider-progress-end": `${V}%`, "--mm-slider-zero": `${Y}%`, "--mm-slider-color-from": a == null ? void 0 : a.from, "--mm-slider-color-to": a == null ? void 0 : a.to, "--mm-slider-current-color": Q }, X = (ae) => {
    f.current = ae;
    const fe = Number(ae.target.value);
    u === void 0 && R(fe), l == null || l(fe, ae), A && (y == null || y(F[fe], fe, ae));
  }, ce = () => {
    const ae = f.current;
    if (!ae || !d) return;
    const fe = Number(ae.target.value);
    ae !== T.current && (T.current = ae, d(fe, ae));
  }, se = I - N.current, te = w && !!Q, ve = o || D || v || z || te, ge = W ? (h == null ? void 0 : h(W, I)) ?? W.label ?? W.value : S(I);
  return /* @__PURE__ */ e.jsxs("div", { className: Xa("mm-slider", `mm-slider--${x}`, A && "mm-slider--options", a && "mm-slider--color-range", n && "mm-slider--disabled", s), style: H, children: [
    ve && /* @__PURE__ */ e.jsxs("div", { className: "mm-slider__header", children: [
      o && /* @__PURE__ */ e.jsx("label", { htmlFor: g, children: o }),
      (D || v || z || te) && /* @__PURE__ */ e.jsxs("span", { className: "mm-slider__values", children: [
        te && /* @__PURE__ */ e.jsx("span", { "aria-label": "Selected color", className: "mm-slider__color-swatch", style: { backgroundColor: Q }, role: "img" }),
        D && /* @__PURE__ */ e.jsx("output", { htmlFor: g, children: ge }),
        v && /* @__PURE__ */ e.jsxs("span", { className: "mm-slider__initial", children: [
          "Initial: ",
          S(N.current)
        ] }),
        z && /* @__PURE__ */ e.jsxs("span", { className: Xa("mm-slider__delta", se > 0 && "mm-slider__delta--positive", se < 0 && "mm-slider__delta--negative"), children: [
          "Change: ",
          se > 0 ? "+" : "",
          S(se)
        ] }),
        j && /* @__PURE__ */ e.jsx("button", { "aria-label": `Reset ${typeof o == "string" ? o : "value"}`, className: "mm-slider__reset", disabled: n, onClick: () => {
          const ae = N.current;
          u === void 0 && R(ae), l == null || l(ae, f.current);
        }, type: "button", children: "Reset" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("input", { "aria-label": t ?? (typeof o == "string" ? o : void 0), className: "mm-slider__input", disabled: n, id: g, max: L, min: E, onBlur: ce, onChange: X, onKeyUp: ce, onPointerUp: ce, step: K, type: "range", value: I })
  ] });
}
const Ri = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ci = { browse: "Drop files here or browse", cancel: "Cancel", cancelUpload: "Cancel upload", edit: "Edit", remove: "Remove", retry: "Retry", saveCrop: "Save cropped image", uploading: "Uploading" }, Ys = (...t) => t.filter(Boolean).join(" "), cs = (t) => t === "free" ? void 0 : Number(t.split(":")[0]) / Number(t.split(":")[1]), Wi = (t) => {
  if (!t) return;
  const [s, a] = t.split("/").map(Number), r = Math.min(24 / s, 18 / a);
  return { height: a * r, width: s * r };
}, ps = (t) => t.type.startsWith("image/"), na = (t) => t < 1024 * 1024 ? `${Math.max(1, Math.round(t / 1024))} KB` : `${(t / (1024 * 1024)).toFixed(1)} MB`, Ki = (t) => `${t.name}-${t.size}-${t.lastModified}-${Math.random().toString(36).slice(2, 8)}`, _a = (t) => ps(t) ? URL.createObjectURL(t) : void 0, Yi = ["aspectRatio", "background", "brightness", "contrast", "cropSize", "exposure", "flipX", "flipY", "format", "grayscale", "height", "hue", "invert", "pixelate", "posterize", "preset", "quality", "redEye", "removeBackground", "rotate", "saturation", "sepia", "sharpness", "text", "textColor", "textOpacity", "textPosition", "textSize", "temperature", "tint", "vibrance", "vignette", "watermark", "watermarkOpacity", "watermarkPosition", "watermarkSize", "width", "zoom", "blur", "noiseReduction"], Hi = { blur: 0, brightness: 100, contrast: 100, exposure: 0, grayscale: 0, hue: 0, noiseReduction: 0, pixelate: 0, posterize: 0, saturation: 100, sepia: 0, sharpness: 0, temperature: 0, tint: 0, vibrance: 0, vignette: 0 };
function Ui({ aspect: t, aspectRatios: s, controls: a, entry: r, labels: n, onCancel: m, onSave: o, outputFormat: i, quality: c, shape: p, sizePresets: l }) {
  var kt, Tt, Et;
  const d = ke(null), y = ke(null), [b] = q(() => r.preview ?? _a(r.file)), h = cs(t), j = h ? Math.min(0.9, 0.9 * h) : 0.72, [w, z] = q({ aspect: t, flipX: !1, flipY: !1, freeHeight: Math.min(0.72, j), freeWidth: Math.min(0.72, j), rotation: 0, scale: Math.min(0.72, j), x: 0.14, y: 0.14 }), [v, D] = q(1), [x, _] = q({ height: 1, width: 1 }), [u, S] = q(Hi), [M, g] = q(""), [N, f] = q(""), [T, B] = q("#ffffff"), [R, A] = q(28), [F, E] = q(100), [L, K] = q("bottom-left"), [I, W] = q(18), [k, Y] = q(55), [P, C] = q("top-left"), [V, Q] = q({ height: ((kt = l[0]) == null ? void 0 : kt.height) ?? 0, width: ((Tt = l[0]) == null ? void 0 : Tt.width) ?? 0 }), [H, X] = q(i), [ce, se] = q(Math.round(c * 100)), [te, ve] = q("transparent"), [ge, ae] = q(((Et = l[0]) == null ? void 0 : Et.value) ?? ""), fe = ke(te), [de, oe] = q(!1), [xe, ie] = q("original"), [re, U] = q(!1), [Z, G] = q(!1), me = x.width / Math.max(1, x.height), he = l.find((ee) => ee.value === ge), ze = !!he, je = he ? he.width / he.height : cs(w.aspect), Ne = je ? Math.min(1, je / Math.max(me, 0.01)) : 1, Re = Ne > 0 ? w.scale / Ne : 0, _e = je ? w.scale : w.freeWidth ?? w.scale, Le = je ? _e * me / je : w.freeHeight ?? w.scale, Xe = Math.max(0, 1 - _e), Ze = Math.max(0, 1 - Le);
  Me(() => () => {
    !r.preview && b && URL.revokeObjectURL(b);
  }, [b, r.preview]), Me(() => {
    if (!y.current) return;
    const $ = document.querySelector(".mm-file-upload__editor-stage");
    if ($)
      return $.style.backgroundColor = te === "transparent" ? "#101718" : te, () => {
        $.style.backgroundColor = "";
      };
  }, [te]), Me(() => {
    const ee = y.current;
    if (!ee) return;
    const $ = [], ne = (be, we, Ie, Be, J) => {
      if (!be) return;
      const le = document.createElement("span");
      le.className = "mm-file-upload__editor-live-overlay", le.textContent = be, le.style.color = Be, le.style.fontSize = `${Math.max(10, we)}px`, le.style.opacity = `${Ie / 100}`, le.style[J.startsWith("top") ? "top" : "bottom"] = "24px", le.style[J.endsWith("right") ? "right" : "left"] = "24px", ee.appendChild(le), $.push(le);
    };
    return ne(M, R, F, T, L), ne(N, I, k, "#ffffff", P), () => {
      $.forEach((be) => be.remove());
    };
  }, [M, T, F, L, R, N, k, P, I]);
  const lt = (ee) => {
    const $ = y.current;
    if (!$) return;
    const ne = ee.clientX, be = ee.clientY, we = w.x, Ie = w.y;
    $.setPointerCapture(ee.pointerId);
    const Be = (le) => {
      var $e;
      const Te = ($e = $.parentElement) == null ? void 0 : $e.getBoundingClientRect();
      Te && z((Ae) => ({ ...Ae, x: Math.min(Xe, Math.max(0, we + (le.clientX - ne) / Te.width)), y: Math.min(Ze, Math.max(0, Ie + (le.clientY - be) / Te.height)) }));
    }, J = () => {
      $.releasePointerCapture(ee.pointerId), $.removeEventListener("pointermove", Be), $.removeEventListener("pointerup", J);
    };
    $.addEventListener("pointermove", Be), $.addEventListener("pointerup", J);
  }, ot = (ee, $) => {
    if (ze) return;
    ee.preventDefault(), ee.stopPropagation();
    const ne = y.current, be = ne == null ? void 0 : ne.parentElement;
    if (!ne || !be) return;
    const we = be.getBoundingClientRect(), Ie = ee.clientX, Be = ee.clientY, J = _e, le = Le, Te = w.x, $e = w.y, Ae = je ? le / Math.max(0.01, J) : void 0;
    ne.setPointerCapture(ee.pointerId);
    const Se = (nt) => {
      const Je = (nt.clientX - Ie) / we.width, ut = (nt.clientY - Be) / we.height, $t = $.includes("e") || $.includes("w"), Ke = $.includes("n") || $.includes("s"), tt = $.includes("w") ? -Je : Je, ft = $.includes("n") ? -ut : ut;
      let Ve = J + ($t ? tt : 0), qe = le + (Ke ? ft : 0);
      if (je && Ae) {
        const ht = qe / Ae;
        Ve = $t && Ke ? Math.abs(Je) >= Math.abs(ut) ? Ve : ht : $t ? Ve : ht, qe = Ve * Ae;
      }
      if (Ve = Math.max(0.1, Math.min(Ve, $.includes("w") ? Te + J : 1 - Te)), qe = Math.max(0.1, Math.min(qe, $.includes("n") ? $e + le : 1 - $e)), je && Ae) {
        const ht = Math.min(Ve, qe / Ae);
        Ve = Math.max(0.1, ht), qe = Ve * Ae;
      }
      const Dt = $.includes("w") ? Te + J - Ve : Te, Pt = $.includes("n") ? $e + le - qe : $e;
      z((ht) => ({ ...ht, freeHeight: qe, freeWidth: Ve, scale: Ve, x: Math.max(0, Math.min(1 - Ve, Dt)), y: Math.max(0, Math.min(1 - qe, Pt)) })), Q({ height: Math.max(1, Math.round(qe * x.height)), width: Math.max(1, Math.round(Ve * x.width)) });
    }, Qe = () => {
      ne.releasePointerCapture(ee.pointerId), ne.removeEventListener("pointermove", Se), ne.removeEventListener("pointerup", Qe);
    };
    ne.addEventListener("pointermove", Se), ne.addEventListener("pointerup", Qe);
  }, dt = `brightness(${Math.max(0, u.brightness + u.exposure)}%) contrast(${u.contrast}%) saturate(${Math.max(0, u.saturation + u.vibrance)}%) hue-rotate(${u.hue + u.tint + u.temperature / 2}deg) sepia(${u.sepia}%) grayscale(${u.grayscale}%) invert(${de ? 100 : 0}%) blur(${u.blur}px)`, ue = (ee) => {
    const $ = {
      bw: { brightness: 105, contrast: 110, grayscale: 100, saturation: 0 },
      cool: { temperature: -18, tint: 4 },
      dramatic: { brightness: 96, contrast: 135, saturation: 115, vignette: 32 },
      vintage: { brightness: 104, contrast: 92, sepia: 38, saturation: 82, vignette: 22 },
      warm: { temperature: 18, tint: -3, saturation: 112 },
      original: { blur: 0, brightness: 100, contrast: 100, exposure: 0, grayscale: 0, hue: 0, noiseReduction: 0, pixelate: 0, posterize: 0, saturation: 100, sepia: 0, sharpness: 0, temperature: 0, tint: 0, vibrance: 0, vignette: 0 }
    };
    S((ne) => ({ ...ne, ...$[ee] ?? {} }));
  }, pe = () => {
    const ee = d.current;
    if (!ee) return;
    const $ = x.width, ne = x.height, be = Math.round(w.x * $), we = Math.round(w.y * ne), Ie = Math.max(1, Math.round(_e * $)), Be = Math.max(1, Math.round(Le * ne)), J = document.createElement("canvas"), le = V.width > 0 ? V.width : Ie, Te = V.height > 0 ? V.height : Be;
    J.width = le, J.height = Te;
    const $e = J.getContext("2d");
    if (!$e) return;
    te !== "transparent" && ($e.fillStyle = te, $e.fillRect(0, 0, le, Te)), $e.filter = `brightness(${Math.max(0, u.brightness + u.exposure)}%) contrast(${u.contrast}%) saturate(${Math.max(0, u.saturation + u.vibrance)}%) hue-rotate(${u.hue + u.tint + u.temperature / 2}deg) sepia(${u.sepia}%) grayscale(${u.grayscale}%) invert(${de ? 100 : 0}%) blur(${u.blur}px)`, $e.translate(le / 2, Te / 2), $e.rotate(w.rotation * Math.PI / 180), $e.scale(w.flipX ? -1 : 1, w.flipY ? -1 : 1), $e.drawImage(ee, be, we, Ie, Be, -le / 2, -Te / 2, le, Te), $e.setTransform(1, 0, 0, 1, 0, 0), $e.filter = "none";
    const Ae = $e.getImageData(0, 0, le, Te), Se = Ae.data, Qe = [Se[0], Se[1], Se[2]];
    for (let Ke = 0; Ke < Se.length; Ke += 4) {
      let tt = Se[Ke], ft = Se[Ke + 1], Ve = Se[Ke + 2];
      if (re && Math.abs(tt - Qe[0]) + Math.abs(ft - Qe[1]) + Math.abs(Ve - Qe[2]) < 72 && (Se[Ke + 3] = 0), Z && tt > ft * 1.35 && tt > Ve * 1.35 && ft < 130 && (Se[Ke] = Math.round((ft + Ve) / 2)), u.posterize > 0) {
        const qe = Math.max(2, Math.round(12 - u.posterize / 12));
        tt = Math.round(tt / 255 * (qe - 1)) * 255 / (qe - 1), ft = Math.round(ft / 255 * (qe - 1)) * 255 / (qe - 1), Ve = Math.round(Ve / 255 * (qe - 1)) * 255 / (qe - 1);
      }
      if (u.pixelate > 0) {
        const qe = Math.max(1, Math.round(u.pixelate / 8)), Dt = Ke / 4 % le, Pt = Math.floor(Ke / 4 / le), ht = (Math.floor(Pt / qe) * qe * le + Math.floor(Dt / qe) * qe) * 4;
        tt = Se[ht], ft = Se[ht + 1], Ve = Se[ht + 2];
      }
      Se[Ke] = tt, Se[Ke + 1] = ft, Se[Ke + 2] = Ve;
    }
    if (u.sharpness > 0 || u.noiseReduction > 0) {
      const Ke = new Uint8ClampedArray(Se), tt = u.sharpness / 100, ft = u.noiseReduction / 100;
      for (let Ve = 0; Ve < Se.length; Ve += 4) {
        const qe = Ve / 4 % le, Dt = Math.floor(Ve / 4 / le), Pt = (Dt * le + Math.max(0, qe - 1)) * 4, ht = (Dt * le + Math.min(le - 1, qe + 1)) * 4;
        for (let Lt = 0; Lt < 3; Lt += 1) {
          const Ba = (Ke[Pt + Lt] + Ke[ht + Lt]) / 2;
          Se[Ve + Lt] = Math.max(0, Math.min(255, Ke[Ve + Lt] * (1 + tt) - Ba * tt * 0.5 + (Ba - Ke[Ve + Lt]) * ft));
        }
      }
    }
    if ($e.putImageData(Ae, 0, 0), u.vignette > 0) {
      const Ke = $e.createRadialGradient(le / 2, Te / 2, Math.min(le, Te) * 0.2, le / 2, Te / 2, Math.max(le, Te) * 0.7);
      Ke.addColorStop(0, "rgba(0,0,0,0)"), Ke.addColorStop(1, `rgba(0,0,0,${u.vignette / 140})`), $e.fillStyle = Ke, $e.fillRect(0, 0, le, Te);
    }
    const nt = (Ke, tt, ft, Ve, qe) => {
      if (!Ke) return;
      $e.globalAlpha = ft / 100, $e.fillStyle = Ve, $e.font = `${Math.max(10, tt)}px sans-serif`;
      const Dt = $e.measureText(Ke), Pt = qe.endsWith("right") ? le - Dt.width - 24 : 24, ht = qe.startsWith("top") ? tt + 24 : Te - 24;
      $e.fillText(Ke, Pt, ht), $e.globalAlpha = 1;
    };
    nt(M, R, F, T, L), nt(N, I, k, "#ffffff", P);
    const Je = r.file.type === "image/jpeg" || r.file.type === "image/webp" ? r.file.type : "image/png", ut = H === "original" ? Je : `image/${H}`, $t = ut === "image/jpeg" ? "jpg" : ut.split("/")[1];
    J.toBlob((Ke) => {
      Ke && o(new globalThis.File([Ke], `${r.file.name.replace(/\.[^.]+$/, "")}-edited.${$t}`, { lastModified: Date.now(), type: ut }));
    }, ut, ce / 100);
  }, O = (ee) => {
    if (ze) return;
    const $ = ee, ne = cs($);
    z((be) => {
      const we = je ? be.scale : be.freeWidth ?? be.scale, Ie = je ? Le : be.freeHeight ?? be.scale, Be = Math.min(we, ne ? Math.min(1, ne / Math.max(me, 0.01)) : 1), J = ne ? Be * me / ne : Ie;
      return { ...be, aspect: $, freeHeight: J, freeWidth: Be, scale: Be, x: Math.min(Math.max(0, 1 - Be), be.x), y: Math.min(Math.max(0, 1 - J), be.y) };
    }), ne && Q((be) => ({ height: Math.max(1, Math.round(be.width / ne)), width: be.width }));
  }, ye = (ee) => {
    const $ = l.find((ne) => ne.value === ee);
    $ && (ae(ee), Q({ height: $.height, width: $.width }), z((ne) => {
      const be = $.width / $.height, we = Math.min($.width / Math.max(1, x.width), Math.min(1, be / Math.max(me, 0.01))), Ie = we * me / be;
      return { ...ne, freeHeight: Ie, freeWidth: we, scale: we, x: Math.min(Math.max(0, 1 - we), ne.x), y: Math.min(Math.max(0, 1 - Ie), ne.y) };
    }));
  }, De = (ee, $) => {
    var we, Ie;
    if (ze || !$ || $ <= 0) return;
    const ne = ((we = d.current) == null ? void 0 : we.naturalWidth) || x.width, be = ((Ie = d.current) == null ? void 0 : Ie.naturalHeight) || x.height;
    Q((Be) => {
      const J = cs(w.aspect), le = ee === "width" ? $ : J ? Math.round($ * J) : Be.width;
      return { height: ee === "height" ? $ : J ? Math.round($ / J) : Be.height, width: le };
    }), z((Be) => {
      const J = cs(Be.aspect), le = ee === "width" ? $ : J ? $ * J : $, Te = ee === "height" ? $ : J ? $ / J : $, $e = Math.max(0.05, Math.min(0.95, le / Math.max(1, ne))), Ae = Math.max(0.05, Math.min(0.95, Te / Math.max(1, be)));
      return { ...Be, freeHeight: Ae, freeWidth: $e, scale: $e, x: Math.min(Math.max(0, 1 - $e), Be.x), y: Math.min(Math.max(0, 1 - Ae), Be.y) };
    });
  }, We = (ee) => {
    const $ = { height: ee.currentTarget.naturalHeight, width: ee.currentTarget.naturalWidth }, ne = $.width / Math.max(1, $.height), be = je ? Math.min(1, je / Math.max(ne, 0.01)) : 1;
    _($), z((we) => {
      const Ie = (he == null ? void 0 : he.width) ?? 0, Be = Ie > 0 ? Math.min(Ie / $.width, be) : Math.min(we.scale, be), J = je ? Be : we.freeWidth ?? Be, le = je ? J * ne / je : we.freeHeight ?? Be;
      return Q(he ? { height: he.height, width: he.width } : { height: Math.max(1, Math.round(le * $.height)), width: Math.max(1, Math.round(J * $.width)) }), { ...we, freeHeight: le, freeWidth: J, scale: Be, x: Math.min(Math.max(0, 1 - J), we.x), y: Math.min(Math.max(0, 1 - le), we.y) };
    });
  }, Ce = [{ label: "Free", value: "free" }, { label: "1:1", ratio: "1 / 1", value: "1:1" }, { label: "3:4", ratio: "3 / 4", value: "3:4" }, { label: "4:3", ratio: "4 / 3", value: "4:3" }, { label: "16:9", ratio: "16 / 9", value: "16:9" }, { label: "9:16", ratio: "9 / 16", value: "9:16" }, { label: "4:5", ratio: "4 / 5", value: "4:5" }, { label: "5:4", ratio: "5 / 4", value: "5:4" }].filter((ee) => s.includes(ee.value)), Ye = (ee, $) => S((ne) => ({ ...ne, [ee]: $ })), yt = () => S((ee) => ({ ...ee, brightness: 100, contrast: 100, exposure: 0, hue: 0, saturation: 100, temperature: 0, tint: 0, vibrance: 0 })), Nt = () => S((ee) => ({ ...ee, blur: 0, grayscale: 0, noiseReduction: 0, pixelate: 0, posterize: 0, sepia: 0, sharpness: 0, vignette: 0 })), zt = () => {
    g(""), f(""), B("#ffffff"), A(28), E(100), K("bottom-left"), W(18), Y(55), C("top-left");
  }, St = () => {
    X(i), se(Math.round(c * 100)), Q(he ? { height: he.height, width: he.width } : { height: Math.max(1, Math.round(Le * x.height)), width: Math.max(1, Math.round(_e * x.width)) });
  }, jt = () => {
    yt(), Nt(), zt(), St(), ie("original"), oe(!1), U(!1), G(!1), ve("transparent"), D(1), z({ aspect: t, flipX: !1, flipY: !1, freeHeight: Math.min(0.72, Ne), freeWidth: Math.min(0.72, Ne), rotation: 0, scale: Math.min(0.72, Ne), x: 0.14, y: 0.14 });
  }, Fe = (ee, $) => a.includes(ee) ? $ : null;
  return /* @__PURE__ */ e.jsx(Sa, { className: "mm-file-upload__editor-dialog", modal: !0, open: !0, onOpenChange: (ee) => {
    ee || m();
  }, size: "lg", title: "Edit image", description: "Crop, correct colors, apply effects, add overlays, and export the result.", actions: { align: "end", cancel: { label: n.cancel, onClick: m }, confirm: { label: n.saveCrop, onClick: pe } }, children: /* @__PURE__ */ e.jsx("div", { className: "mm-file-upload__editor", children: /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-layout", children: [
    /* @__PURE__ */ e.jsx("div", { className: "mm-file-upload__editor-stage", style: { backgroundColor: te === "transparent" ? "#101718" : te }, children: /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-image-wrap", children: [
      /* @__PURE__ */ e.jsx("img", { alt: r.file.name, ref: d, src: b, onLoad: We, style: { filter: dt, transform: `scale(${v}) rotate(${w.rotation}deg) scaleX(${w.flipX ? -1 : 1}) scaleY(${w.flipY ? -1 : 1})` } }),
      /* @__PURE__ */ e.jsx("div", { "aria-label": "Crop selection. Drag to move.", className: Ys("mm-file-upload__crop-frame", p === "circle" && "mm-file-upload__crop-frame--circle"), onPointerDown: lt, ref: y, style: { height: `${Le * 100}%`, left: `${w.x * 100}%`, top: `${w.y * 100}%`, width: `${_e * 100}%` }, children: !ze && Ri.map((ee) => /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: `mm-file-upload__crop-handle mm-file-upload__crop-handle--${ee}`, onPointerDown: ($) => ot($, ee) }, ee)) })
    ] }) }),
    /* @__PURE__ */ e.jsx("aside", { className: "mm-file-upload__editor-panel", children: /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-controls", children: [
      Fe("aspectRatio", ze ? /* @__PURE__ */ e.jsx(Gt, { label: "Image size", size: "xs", value: ge, options: l.map((ee) => ({ label: [ee.label, String(ee.width) + " × " + String(ee.height)].filter(Boolean).join(" — "), value: ee.value })), onChange: (ee) => {
        typeof ee == "string" && ye(ee);
      } }) : /* @__PURE__ */ e.jsx(Pi, { label: "Aspect ratio", direction: "vertical", name: "file-upload-aspect", value: w.aspect, onChange: O, children: /* @__PURE__ */ e.jsx("div", { className: "mm-file-upload__aspect-options", children: Ce.map((ee) => /* @__PURE__ */ e.jsx(Gr, { size: "xs", value: ee.value, label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: Ys("mm-file-upload__aspect-icon", ee.value === "free" && "mm-file-upload__aspect-icon--free"), style: Wi(ee.ratio) }),
        ee.label
      ] }) }, ee.value)) }) })),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section-header", children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Color" }),
          /* @__PURE__ */ e.jsx(Pe, { size: "xs", variant: "light", onClick: yt, children: "Reset" })
        ] }),
        Fe("preset", /* @__PURE__ */ e.jsx(Gt, { label: "Preset", size: "xs", value: xe, options: [{ label: "Original", value: "original" }, { label: "Black & white", value: "bw" }, { label: "Warm", value: "warm" }, { label: "Cool", value: "cool" }, { label: "Vintage", value: "vintage" }, { label: "Dramatic", value: "dramatic" }], onChange: (ee) => {
          typeof ee == "string" && (ie(ee), ue(ee));
        } })),
        Fe("brightness", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Brightness", size: "xs", min: 40, max: 180, value: u.brightness, onChange: (ee) => Ye("brightness", ee) })),
        Fe("exposure", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Exposure", size: "xs", min: -60, max: 60, value: u.exposure, onChange: (ee) => Ye("exposure", ee) })),
        Fe("contrast", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Contrast", size: "xs", min: 40, max: 180, value: u.contrast, onChange: (ee) => Ye("contrast", ee) })),
        Fe("saturation", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Saturation", size: "xs", min: 0, max: 180, value: u.saturation, onChange: (ee) => Ye("saturation", ee) })),
        Fe("hue", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Hue", size: "xs", min: -180, max: 180, value: u.hue, valueFormatter: (ee) => `${ee}°`, onChange: (ee) => Ye("hue", ee) })),
        Fe("temperature", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Temperature", size: "xs", min: -50, max: 50, value: u.temperature, onChange: (ee) => Ye("temperature", ee) })),
        Fe("tint", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Tint", size: "xs", min: -50, max: 50, value: u.tint, onChange: (ee) => Ye("tint", ee) })),
        Fe("vibrance", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Vibrance", size: "xs", min: 0, max: 80, value: u.vibrance, onChange: (ee) => Ye("vibrance", ee) }))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section-header", children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Effects" }),
          /* @__PURE__ */ e.jsx(Pe, { size: "xs", variant: "light", onClick: Nt, children: "Reset" })
        ] }),
        Fe("blur", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Blur", size: "xs", min: 0, max: 12, value: u.blur, valueFormatter: (ee) => `${ee}px`, onChange: (ee) => Ye("blur", ee) })),
        Fe("sharpness", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Sharpness", size: "xs", min: 0, max: 100, value: u.sharpness, onChange: (ee) => Ye("sharpness", ee) })),
        Fe("noiseReduction", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Noise reduction", size: "xs", min: 0, max: 100, value: u.noiseReduction, onChange: (ee) => Ye("noiseReduction", ee) })),
        Fe("grayscale", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Grayscale", size: "xs", min: 0, max: 100, value: u.grayscale, onChange: (ee) => Ye("grayscale", ee) })),
        Fe("sepia", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Sepia", size: "xs", min: 0, max: 100, value: u.sepia, onChange: (ee) => Ye("sepia", ee) })),
        Fe("vignette", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Vignette", size: "xs", min: 0, max: 100, value: u.vignette, onChange: (ee) => Ye("vignette", ee) })),
        Fe("pixelate", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Pixelate", size: "xs", min: 0, max: 100, value: u.pixelate, onChange: (ee) => Ye("pixelate", ee) })),
        Fe("posterize", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Posterize", size: "xs", min: 0, max: 100, value: u.posterize, onChange: (ee) => Ye("posterize", ee) })),
        Fe("invert", /* @__PURE__ */ e.jsx(Qt, { label: "Invert colors", size: "xs", checked: de, onChange: (ee) => oe(ee.target.checked) })),
        Fe("removeBackground", /* @__PURE__ */ e.jsx(Qt, { label: "Remove background", size: "xs", checked: re, onChange: (ee) => U(ee.target.checked) })),
        Fe("redEye", /* @__PURE__ */ e.jsx(Qt, { label: "Red-eye correction", size: "xs", checked: Z, onChange: (ee) => G(ee.target.checked) }))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section-header", children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Text and watermark" }),
          /* @__PURE__ */ e.jsx(Pe, { size: "xs", variant: "light", onClick: zt, children: "Reset" })
        ] }),
        Fe("text", /* @__PURE__ */ e.jsx(Ps, { label: "Text", size: "xs", placeholder: "Add text", value: M, onChange: (ee) => g(ee.target.value) })),
        Fe("textColor", /* @__PURE__ */ e.jsx(Ps, { label: "Text color", size: "xs", type: "color", value: T, onChange: (ee) => B(ee.target.value) })),
        Fe("textSize", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Text size", size: "xs", min: 10, max: 96, value: R, onChange: A })),
        Fe("textOpacity", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Text opacity", size: "xs", min: 0, max: 100, value: F, onChange: E })),
        Fe("textPosition", /* @__PURE__ */ e.jsx(Gt, { label: "Text position", size: "xs", value: L, options: [{ label: "Bottom left", value: "bottom-left" }, { label: "Bottom right", value: "bottom-right" }, { label: "Top left", value: "top-left" }, { label: "Top right", value: "top-right" }], onChange: (ee) => {
          typeof ee == "string" && K(ee);
        } })),
        Fe("watermark", /* @__PURE__ */ e.jsx(Ps, { label: "Watermark", size: "xs", placeholder: "Add watermark", value: N, onChange: (ee) => f(ee.target.value) })),
        Fe("watermarkSize", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Watermark size", size: "xs", min: 10, max: 72, value: I, onChange: W })),
        Fe("watermarkOpacity", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Watermark opacity", size: "xs", min: 0, max: 100, value: k, onChange: Y })),
        Fe("watermarkPosition", /* @__PURE__ */ e.jsx(Gt, { label: "Watermark position", size: "xs", value: P, options: [{ label: "Top left", value: "top-left" }, { label: "Top right", value: "top-right" }, { label: "Bottom left", value: "bottom-left" }, { label: "Bottom right", value: "bottom-right" }], onChange: (ee) => {
          typeof ee == "string" && C(ee);
        } }))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-section-header", children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Export" }),
          /* @__PURE__ */ e.jsx(Pe, { size: "xs", variant: "light", onClick: St, children: "Reset" })
        ] }),
        Fe("format", /* @__PURE__ */ e.jsx(Gt, { label: "Format", size: "xs", value: H, options: [{ label: "Original", value: "original" }, { label: "PNG", value: "png" }, { label: "JPEG", value: "jpeg" }, { label: "WebP", value: "webp" }], onChange: (ee) => {
          typeof ee == "string" && X(ee);
        } })),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-size", children: [
          Fe("width", /* @__PURE__ */ e.jsx(xa, { disabled: ze, resettable: !0, label: "Width", size: "xs", min: 1, value: V.width || void 0, onChange: (ee) => De("width", ee) })),
          Fe("height", /* @__PURE__ */ e.jsx(xa, { disabled: ze, resettable: !0, label: "Height", size: "xs", min: 1, value: V.height || void 0, onChange: (ee) => De("height", ee) }))
        ] }),
        Fe("cropSize", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Crop size", disabled: ze, min: 0.1, max: 1, size: "xs", step: 0.01, value: Re, valueFormatter: (ee) => `${Math.round(ee * 100)}%`, onChange: (ee) => {
          const $ = ee * Ne, ne = Math.max(1, Math.round($ * x.width)), be = Math.max(1, Math.round(je ? ne / je : $ * x.width / Math.max(me, 0.01)));
          Q({ width: ne, height: be }), z((we) => {
            const Ie = $ / Math.max(0.01, we.scale);
            return { ...we, freeHeight: je ? we.freeHeight : Math.min(1, (we.freeHeight ?? we.scale) * Ie), freeWidth: je ? we.freeWidth : Math.min(1, (we.freeWidth ?? we.scale) * Ie), scale: $ };
          });
        } })),
        Fe("quality", /* @__PURE__ */ e.jsx(st, { resettable: !0, label: "Quality", size: "xs", min: 10, max: 100, value: ce, valueFormatter: (ee) => `${ee}%`, onChange: se })),
        Fe("background", /* @__PURE__ */ e.jsx(Bi, { label: "Background", size: "sm", value: te, onChange: ve, onCommit: ve, onCancel: () => ve(fe.current), onOpenChange: (ee) => {
          ee && (fe.current = te);
        }, confirmActions: !0, allowTransparent: !0, showAlpha: !1, showSwatches: !1 }))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__editor-buttons", children: [
        Fe("zoom", /* @__PURE__ */ e.jsx(wt, { content: "Make the crop area smaller", maxWidth: 180, size: "sm", placement: "top-start", children: /* @__PURE__ */ e.jsx(Pe, { iconLeft: /* @__PURE__ */ e.jsx(Pr, { size: 16 }), title: "Make the crop area smaller", size: "sm", iconOnly: !0, variant: "light", onClick: () => D((ee) => Math.max(0.5, ee - 0.05)), children: "Smaller" }) })),
        Fe("zoom", /* @__PURE__ */ e.jsx(wt, { content: "Make the crop area larger", maxWidth: 120, size: "sm", placement: "top-start", children: /* @__PURE__ */ e.jsx(Pe, { iconLeft: /* @__PURE__ */ e.jsx(Lr, { size: 16 }), title: "Make the crop area larger", size: "sm", iconOnly: !0, variant: "light", onClick: () => D((ee) => Math.min(3, ee + 0.05)), children: "Larger" }) })),
        Fe("rotate", /* @__PURE__ */ e.jsx(wt, { content: "Rotate the image 90 degrees counterclockwise", maxWidth: 120, size: "sm", placement: "top-start", children: /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Rotate left", title: "Rotate the image 90 degrees counterclockwise", iconLeft: /* @__PURE__ */ e.jsx($r, { size: 16 }), size: "sm", iconOnly: !0, variant: "light", onClick: () => z((ee) => ({ ...ee, rotation: ee.rotation - 90 })), children: "Rotate left" }) })),
        Fe("rotate", /* @__PURE__ */ e.jsx(wt, { content: "Rotate the image 90 degrees clockwise", maxWidth: 120, size: "sm", placement: "top-end", children: /* @__PURE__ */ e.jsx(Pe, { "aria-label": "Rotate right", title: "Rotate the image 90 degrees clockwise", iconLeft: /* @__PURE__ */ e.jsx(kr, { size: 16 }), size: "sm", iconOnly: !0, variant: "light", onClick: () => z((ee) => ({ ...ee, rotation: ee.rotation + 90 })), children: "Rotate right" }) })),
        Fe("flipX", /* @__PURE__ */ e.jsx(wt, { content: "Flip the image horizontally from left to right", maxWidth: 120, size: "sm", placement: "top-end", children: /* @__PURE__ */ e.jsx(Pe, { className: "mm-file-upload__flip-button", title: "Flip the image horizontally from left to right", iconLeft: /* @__PURE__ */ e.jsx(Nn, { size: 16 }), iconOnly: !0, size: "sm", variant: "light", onClick: () => z((ee) => ({ ...ee, flipX: !ee.flipX })), children: "Flip X" }) })),
        Fe("flipY", /* @__PURE__ */ e.jsx(wt, { content: "Flip the image vertically from top to bottom", maxWidth: 180, size: "sm", placement: "top-end", children: /* @__PURE__ */ e.jsx(Pe, { className: "mm-file-upload__flip-button", title: "Flip the image vertically from top to bottom", iconLeft: /* @__PURE__ */ e.jsx(kn, { size: 16 }), iconOnly: !0, size: "sm", variant: "light", onClick: () => z((ee) => ({ ...ee, flipY: !ee.flipY })), children: "Flip Y" }) })),
        /* @__PURE__ */ e.jsx(wt, { content: "Reset all editor settings to their initial values", maxWidth: 200, size: "sm", placement: "top-end", children: /* @__PURE__ */ e.jsx(Pe, { className: "mm-file-upload__reset-all", title: "Reset all editor settings to their initial values", size: "sm", variant: "outline", onClick: jt, children: "Reset all" }) })
      ] })
    ] }) })
  ] }) }) });
}
function _o({ accept: t, "aria-label": s = "File upload", autoUpload: a = !1, beforeUpload: r, className: n, concurrency: m = 1 / 0, cropAspect: o = "free", cropEnabled: i = !0, cropShape: c = "rectangle", defaultValue: p = [], disabled: l = !1, editOnSelect: d = !0, editorAspectRatios: y, editorControls: b, editorSizePresets: h = [], dropzone: j = !0, locale: w, maxFiles: z = 10, maxSize: v, multiple: D = !0, onCancelUpload: x, onChange: _, onEditCancel: u, onEditSave: S, onEditStart: M, onError: g, onUpload: N, outputFormat: f = "original", preview: T = "auto", quality: B = 0.92, renderFile: R, retryCount: A = 0, retryDelay: F = 500, upload: E, value: L, variant: K }) {
  const { components: I } = Ge(), W = I.fileUpload, k = { ...Ci, ...w }, Y = K ?? (W == null ? void 0 : W.variant) ?? (j ? "dropzone" : "compact"), P = (W == null ? void 0 : W.cropAspect) ?? o, C = (W == null ? void 0 : W.cropEnabled) ?? i, V = (W == null ? void 0 : W.cropShape) ?? c, Q = (W == null ? void 0 : W.editorControls) ?? b ?? Yi, H = (W == null ? void 0 : W.editorAspectRatios) ?? y ?? ["free", "1:1", "3:4", "4:3", "16:9", "9:16", "4:5", "5:4"], X = (W == null ? void 0 : W.preview) ?? T, ce = D && z !== 1, [se, te] = q(p), ve = L ?? se, ge = ke(ve);
  ge.current = ve;
  const [ae, fe] = q(!1), [de, oe] = q(null), [xe, ie] = q([]), re = ke(null), U = ke([]), Z = ke(0), G = ke(/* @__PURE__ */ new Map()), me = (ue) => {
    ge.current = ue, L === void 0 && te(ue), _ == null || _(ue);
  }, he = (ue) => {
    if (v && ue.size > v) return `File is larger than ${na(v)}.`;
    if (t && !t.split(",").map((ye) => ye.trim().toLowerCase()).some((ye) => ye.startsWith(".") ? ue.name.toLowerCase().endsWith(ye) : ye.endsWith("/*") ? ue.type.startsWith(ye.slice(0, -1)) : ue.type.toLowerCase() === ye))
      return "This file type is not supported.";
  }, ze = async (ue, pe = 0) => {
    const O = ge.current.find((We) => We.id === ue);
    if (!O) return;
    if (!E) {
      const We = { ...O, progress: 100, status: "success" };
      me(ge.current.map((et) => et.id === ue ? We : et)), N == null || N(We);
      return;
    }
    const ye = new AbortController();
    G.current.set(ue, ye);
    const De = { ...O, progress: 0, status: "uploading" };
    me(ge.current.map((We) => We.id === ue ? De : We));
    try {
      const We = await E(O.file, ye.signal, (Ce) => me(ge.current.map((Ye) => Ye.id === ue ? { ...Ye, progress: Ce, status: "uploading" } : Ye))), et = { ...De, metadata: We && "metadata" in We ? We.metadata : void 0, progress: 100, serverId: We && "id" in We ? We.id : void 0, serverName: We && "name" in We ? We.name : void 0, status: "success", url: We && "url" in We ? We.url : void 0 };
      me(ge.current.map((Ce) => Ce.id === ue ? et : Ce)), N == null || N(et);
    } catch (We) {
      if (ye.signal.aborted) {
        me(ge.current.map((Ce) => Ce.id === ue ? { ...Ce, progress: 0, status: "queued" } : Ce));
        return;
      }
      if (pe < Math.max(0, A))
        return await new Promise((Ce) => window.setTimeout(Ce, Math.max(0, F))), ye.signal.aborted ? void 0 : ze(ue, pe + 1);
      const et = { ...De, error: We instanceof Error ? We.message : "Upload failed.", status: "error" };
      me(ge.current.map((Ce) => Ce.id === ue ? et : Ce)), g == null || g(et.error, O.file);
    } finally {
      G.current.delete(ue);
    }
  }, je = async () => {
    const ue = Math.max(1, Number.isFinite(m) ? m : Number.MAX_SAFE_INTEGER);
    for (; Z.current < ue && U.current.length > 0; ) {
      const pe = U.current.shift();
      pe && (Z.current += 1, ze(pe).finally(() => {
        Z.current -= 1, je();
      }));
    }
  }, Ne = (ue) => {
    !U.current.includes(ue) && !G.current.has(ue) && U.current.push(ue), je();
  }, Re = (ue, pe = !0) => {
    var O;
    U.current = U.current.filter((ye) => ye !== ue.id), (O = G.current.get(ue.id)) == null || O.abort(), pe && (x == null || x(ue));
  }, _e = (ue) => {
    M == null || M(ue), oe(ue);
  }, Le = () => {
    de && (u == null || u(de)), ie([]), oe(null);
  }, Xe = (ue) => {
    if (!de) return;
    S == null || S(de, ue), de.preview && URL.revokeObjectURL(de.preview);
    const pe = ge.current.map((De) => De.id === de.id ? { ...De, file: ue, preview: _a(ue), status: "queued", progress: 0, error: void 0 } : De);
    me(pe);
    const O = xe[0], ye = O ? pe.find((De) => De.id === O) : void 0;
    if (ie((De) => De.slice(1)), oe(ye ?? null), a) {
      const De = pe.find((We) => We.id === de.id);
      De && Ne(De.id);
    }
  }, Ze = async (ue) => {
    const pe = ce ? ue.slice(0, Math.max(0, z - ge.current.length)) : ue.slice(0, 1), O = (await Promise.all(pe.map(async (Ce) => {
      const Ye = he(Ce);
      if (Ye)
        return g == null || g(Ye, Ce), { file: Ce, accepted: !1 };
      try {
        return { file: Ce, accepted: await (r == null ? void 0 : r(Ce)) ?? !0 };
      } catch (yt) {
        return g == null || g(yt instanceof Error ? yt.message : "File was rejected.", Ce), { file: Ce, accepted: !1 };
      }
    }))).filter((Ce) => Ce.accepted), ye = [...ge.current];
    O.forEach(({ file: Ce }) => {
      ye.push({ file: Ce, id: Ki(Ce), preview: _a(Ce), progress: 0, status: "queued" });
    });
    const De = ce ? ye : ye.slice(-O.length || 1), We = O.length > 0 ? De.slice(-O.length) : [];
    me(De);
    const et = We.filter((Ce) => ps(Ce.file) && C && d);
    et.length > 0 && (ie(et.slice(1).map((Ce) => Ce.id)), _e(et[0])), a && We.filter((Ce) => !et.some((Ye) => Ye.id === Ce.id)).forEach((Ce) => Ne(Ce.id));
  }, lt = (ue) => {
    const pe = ge.current.find((O) => O.id === ue);
    Re(pe ?? { id: ue }, !1), pe != null && pe.preview && URL.revokeObjectURL(pe.preview), me(ge.current.filter((O) => O.id !== ue));
  };
  Me(() => () => {
    ge.current.forEach((ue) => {
      ue.preview && URL.revokeObjectURL(ue.preview);
    }), G.current.forEach((ue) => ue.abort());
  }, []);
  const ot = (ue, pe) => /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__file", children: [
    /* @__PURE__ */ e.jsx("div", { className: Ys("mm-file-upload__preview", ps(ue.file) && "mm-file-upload__preview--image"), children: ue.preview && X !== "none" ? /* @__PURE__ */ e.jsx("img", { alt: "", src: ue.preview }) : ps(ue.file) ? /* @__PURE__ */ e.jsx(wn, { size: 22 }) : /* @__PURE__ */ e.jsx(jn, { size: 22 }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__details", children: [
      /* @__PURE__ */ e.jsx("strong", { children: ue.file.name }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        na(ue.file.size),
        " · ",
        ue.status === "uploading" ? k.uploading : ue.status === "error" ? ue.error : ue.status
      ] }),
      (ue.status === "uploading" || ue.status === "success") && /* @__PURE__ */ e.jsx("progress", { max: "100", value: ue.progress })
    ] }),
    ps(ue.file) && C && /* @__PURE__ */ e.jsxs(Pe, { "aria-label": `${k.edit} ${ue.file.name}`, title: k.edit, size: "sm", variant: "light", onClick: pe.edit, children: [
      /* @__PURE__ */ e.jsx(bn, { size: 16 }),
      " ",
      k.edit
    ] }),
    ue.status === "uploading" && /* @__PURE__ */ e.jsx(Pe, { "aria-label": `${k.cancelUpload} ${ue.file.name}`, title: k.cancelUpload, iconOnly: !0, variant: "light", onClick: pe.cancelUpload, children: /* @__PURE__ */ e.jsx(rt, { size: 16 }) }),
    ue.status === "queued" && E && /* @__PURE__ */ e.jsx(Pe, { "aria-label": `Upload ${ue.file.name}`, iconOnly: !0, variant: "light", onClick: pe.upload, children: /* @__PURE__ */ e.jsx(Gs, { size: 16 }) }),
    ue.status === "success" && /* @__PURE__ */ e.jsx(Ct, { "aria-label": "Uploaded", size: 18 }),
    ue.status === "error" && /* @__PURE__ */ e.jsx(Pe, { "aria-label": `${k.retry} ${ue.file.name}`, title: k.retry, iconOnly: !0, variant: "light", onClick: pe.retry, children: /* @__PURE__ */ e.jsx(Mt, { size: 16 }) }),
    /* @__PURE__ */ e.jsx(Pe, { "aria-label": `${k.remove} ${ue.file.name}`, title: k.remove, iconOnly: !0, variant: "light", onClick: pe.remove, children: /* @__PURE__ */ e.jsx(Dn, { size: 16 }) })
  ] }), dt = /* @__PURE__ */ e.jsx("input", { accept: t, "aria-hidden": "true", className: "mm-file-upload__input", disabled: l, multiple: ce, onChange: (ue) => {
    Ze(Array.from(ue.target.files ?? [])), ue.target.value = "";
  }, ref: re, type: "file" });
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": s, className: Ys("mm-file-upload", `mm-file-upload--${Y}`, ae && "mm-file-upload--dragging", l && "mm-file-upload--disabled", n), children: [
    j && /* @__PURE__ */ e.jsxs("div", { className: "mm-file-upload__dropzone", onDragEnter: (ue) => {
      ue.preventDefault(), fe(!0);
    }, onDragLeave: (ue) => {
      ue.currentTarget === ue.target && fe(!1);
    }, onDragOver: (ue) => ue.preventDefault(), onDrop: (ue) => {
      ue.preventDefault(), fe(!1), Ze(Array.from(ue.dataTransfer.files));
    }, onClick: () => {
      var ue;
      return (ue = re.current) == null ? void 0 : ue.click();
    }, role: "button", tabIndex: l ? -1 : 0, onKeyDown: (ue) => {
      var pe;
      (ue.key === "Enter" || ue.key === " ") && (ue.preventDefault(), (pe = re.current) == null || pe.click());
    }, children: [
      /* @__PURE__ */ e.jsx(Gs, { "aria-hidden": "true", size: 30 }),
      /* @__PURE__ */ e.jsx("strong", { children: k.browse }),
      /* @__PURE__ */ e.jsxs("span", { children: [
        t ? `Accepted: ${t}` : "Choose files from your device",
        v ? ` · Up to ${na(v)}` : ""
      ] })
    ] }),
    !j && /* @__PURE__ */ e.jsx(Pe, { disabled: l, iconLeft: /* @__PURE__ */ e.jsx(Gs, { size: 16 }), onClick: () => {
      var ue;
      return (ue = re.current) == null ? void 0 : ue.click();
    }, children: ce ? "Choose files" : "Choose file" }),
    dt,
    ve.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "mm-file-upload__list", "aria-live": "polite", children: ve.map((ue) => {
      const pe = { cancelUpload: () => Re(ue), edit: () => _e(ue), remove: () => lt(ue.id), retry: () => {
        me(ge.current.map((O) => O.id === ue.id ? { ...O, error: void 0, progress: 0, status: "queued" } : O)), Ne(ue.id);
      }, upload: () => Ne(ue.id) };
      return /* @__PURE__ */ e.jsx("div", { children: R ? R(ue, pe) : ot(ue, pe) }, ue.id);
    }) }),
    de && /* @__PURE__ */ e.jsx(Ui, { aspect: V === "circle" ? "1:1" : P, aspectRatios: H, controls: Q, entry: de, labels: k, onCancel: Le, onSave: Xe, outputFormat: f, quality: B, shape: V, sizePresets: h })
  ] });
}
const Ga = gt(null), Vi = (...t) => t.filter(Boolean).join(" "), Oi = (t) => {
  if (t && typeof t == "object" && "target" in t) {
    const s = t.target;
    return s.type === "checkbox" ? !!s.checked : s.value;
  }
  return t;
};
async function qi(t, s, a) {
  for (const r of a) {
    const n = t == null || t === "" || Array.isArray(t) && t.length === 0;
    if (r.required && n) return r.message ?? "This field is required.";
    if (!n) {
      if (r.minLength !== void 0 && String(t).length < r.minLength) return r.message ?? `Use at least ${r.minLength} characters.`;
      if (r.maxLength !== void 0 && String(t).length > r.maxLength) return r.message ?? `Use no more than ${r.maxLength} characters.`;
      if (r.pattern && !r.pattern.test(String(t))) return r.message ?? "Enter a valid value.";
      if (r.validator) {
        const m = await r.validator(t, s);
        if (m) return m;
      }
    }
  }
}
const Xi = Object.assign(Us(function({ children: s, initialValues: a = {}, values: r, layout: n, size: m, validateOn: o, disabled: i = !1, onValuesChange: c, onSubmit: p, onInvalid: l, onReset: d, className: y, ...b }, h) {
  var V, Q, H;
  const { components: j } = Ge(), w = n ?? ((V = j.form) == null ? void 0 : V.layout) ?? "vertical", z = m ?? ((Q = j.form) == null ? void 0 : Q.size) ?? "default", v = o ?? ((H = j.form) == null ? void 0 : H.validateOn) ?? "submit", D = ke(a), x = ke(r ?? a), _ = ke({}), u = ke({}), [S, M] = q(a), [g, N] = q({}), [f, T] = q({}), [B, R] = q({}), [A, F] = q(0), E = r ?? S;
  x.current = E, _.current = g;
  const L = () => F((X) => X + 1), K = at((X) => {
    T((ce) => ({ ...ce, [X]: !0 })), L();
  }, []), I = at((X, ce) => {
    r === void 0 && M(X), x.current = X, c == null || c(X, ce), L();
  }, [r, c]), W = at(async (X) => {
    const ce = u.current[X] ?? [];
    if (!ce.length) return !0;
    R((te) => ({ ...te, [X]: !0 }));
    const se = await qi(x.current[X], x.current, ce);
    return N((te) => {
      const ve = { ...te };
      return se ? ve[X] = se : delete ve[X], _.current = ve, ve;
    }), R((te) => ({ ...te, [X]: !1 })), L(), !se;
  }, []), k = mt(() => ({
    getValues: () => ({ ...x.current }),
    getFieldValue: (X) => x.current[X],
    getFieldError: (X) => _.current[X],
    setFieldValue: (X, ce) => I({ ...x.current, [X]: ce }, X),
    setValues: (X) => I({ ...X }),
    setFieldError: (X, ce) => {
      N((se) => {
        const te = { ...se };
        return ce ? te[X] = ce : delete te[X], _.current = te, te;
      }), L();
    },
    reset: (X = D.current) => {
      I({ ...X }), N({}), T({});
    },
    validate: async (X) => {
      const ce = X ?? Object.keys(u.current);
      return (await Promise.all(ce.map(W))).every(Boolean);
    },
    submit: async () => {
      const X = await Promise.all(Object.keys(u.current).map(W)).then((ce) => ce.every(Boolean));
      return X && await (p == null ? void 0 : p(x.current, new Event("submit"))), X;
    }
  }), [p, I, W]);
  $a(h, () => k, [k]);
  const Y = mt(() => ({ form: k, values: E, errors: g, touched: f, validating: B, rules: u, validateOn: v, disabled: i, version: A, markTouched: K }), [k, E, g, f, B, v, i, A, K]), P = async (X) => {
    X.preventDefault(), await k.validate() ? await (p == null ? void 0 : p(x.current, X)) : l == null || l(_.current);
  }, C = () => {
    k.reset(), d == null || d(x.current);
  };
  return /* @__PURE__ */ e.jsx(Ga.Provider, { value: Y, children: /* @__PURE__ */ e.jsx("form", { ...b, "aria-busy": Object.values(B).some(Boolean) ? !0 : void 0, className: Vi("mm-form", `mm-form--${w}`, `mm-form--${z}`, i && "mm-form--disabled", y), onReset: C, onSubmit: P, children: s }) });
}), {
  Field: function({ name: s, rules: a = [], children: r }) {
    const n = vt(Ga);
    if (!n) throw new Error("Form.Field must be used inside Form.");
    n.rules.current[s] = a;
    const m = n.values[s], o = n.errors[s], i = !!n.touched[s], c = !!n.validating[s], p = a.some((b) => b.required), l = (b) => {
      n.form.setFieldValue(s, Oi(b)), n.markTouched(s), (n.validateOn === "change" || n.validateOn === "change-and-blur") && n.form.validate([s]);
    }, d = () => {
      n.markTouched(s), (n.validateOn === "blur" || n.validateOn === "change-and-blur") && n.form.validate([s]);
    }, y = { name: s, value: m, error: o, touched: i, validating: c, required: p, onChange: l, onBlur: d, controlProps: { name: s, value: m, error: o, required: p, "aria-invalid": !!o, onChange: l, onBlur: d } };
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: r(y) });
  },
  Actions: function({ children: s, align: a = "end" }) {
    return /* @__PURE__ */ e.jsx("div", { className: `mm-form__actions mm-form__actions--${a}`, children: s });
  }
});
Xi.displayName = "Form";
const Ht = (...t) => t.filter(Boolean).join(" ");
function vo({
  "aria-label": t = "Breadcrumbs",
  className: s,
  currentLabel: a,
  ellipsisLabel: r = /* @__PURE__ */ e.jsx(Dr, { "aria-hidden": "true", size: 16 }),
  expandLabel: n = "Show all breadcrumbs",
  homeIcon: m = /* @__PURE__ */ e.jsx(Mn, { "aria-hidden": "true", size: 16 }),
  hoverBackground: o = !0,
  hoverLift: i = !1,
  hoverUnderline: c = !1,
  id: p,
  items: l,
  maxItems: d,
  onItemClick: y,
  renderItem: b,
  separator: h = /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 16 }),
  showHouse: j = !1,
  size: w = "default",
  variant: z = "default"
}) {
  const [v, D] = q(!1), x = l.some((N) => N.current), _ = l.length - 1, u = a !== void 0 && l.length > 0 ? [...l.slice(0, -1), { ...l[_], label: a, current: !0 }] : l, S = !!(d && d > 2 && u.length > d && !v), M = S ? [u[0], { label: r, disabled: !0 }, u[u.length - 1]] : u, g = Ht(
    o && "mm-breadcrumbs--hover-background",
    i && "mm-breadcrumbs--hover-lift",
    c && "mm-breadcrumbs--hover-underline"
  );
  return u.length === 0 ? null : /* @__PURE__ */ e.jsx("nav", { "aria-label": t, className: Ht("mm-breadcrumbs", `mm-breadcrumbs--${w}`, `mm-breadcrumbs--${z}`, s), id: p, children: /* @__PURE__ */ e.jsxs("ol", { className: "mm-breadcrumbs__list", children: [
    j && /* @__PURE__ */ e.jsxs("li", { className: "mm-breadcrumbs__item", children: [
      /* @__PURE__ */ e.jsx("a", { "aria-label": "House", className: Ht("mm-breadcrumbs__link", "mm-breadcrumbs__home", g), href: "/", children: m }),
      h && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-breadcrumbs__separator", children: h })
    ] }),
    M.map((N, f) => {
      const T = u.indexOf(N), B = N.current ?? (!x && T === _), R = S && f === 1, A = f === M.length - 1, F = (E) => {
        var L;
        if (R) {
          E.preventDefault(), D(!0);
          return;
        }
        (L = N.onClick) == null || L.call(N, E), y == null || y(N, T, E);
      };
      return /* @__PURE__ */ e.jsxs("li", { className: Ht("mm-breadcrumbs__item", B && "mm-breadcrumbs__item--current"), children: [
        b ? b(N, T, B) : R ? /* @__PURE__ */ e.jsx("button", { "aria-label": n, className: Ht("mm-breadcrumbs__ellipsis", g), onClick: F, type: "button", children: r }) : N.disabled ? /* @__PURE__ */ e.jsxs("span", { "aria-disabled": "true", className: "mm-breadcrumbs__link mm-breadcrumbs__link--disabled", children: [
          N.icon,
          N.label
        ] }) : B ? /* @__PURE__ */ e.jsxs("span", { "aria-current": "page", className: "mm-breadcrumbs__link mm-breadcrumbs__link--current", children: [
          N.icon,
          N.label
        ] }) : /* @__PURE__ */ e.jsxs("a", { className: Ht("mm-breadcrumbs__link", g), href: N.href ?? "#", onClick: F, children: [
          N.icon,
          N.label
        ] }),
        !A && h && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-breadcrumbs__separator", children: h })
      ] }, `${f}-${String(N.label)}`);
    })
  ] }) });
}
const Gi = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 60 days", days: 60 },
  { label: "Last 90 days", days: 90 },
  { label: "Last 180 days", days: 180 }
], ys = { en: "en-US", uk: "uk-UA", de: "de-DE", fr: "fr-FR" }, bt = {
  en: { today: "Today", clear: "Clear", close: "Close", ok: "OK", previousMonth: "Previous month", previousYear: "Previous year", nextMonth: "Next month", nextYear: "Next year", quickRanges: "Quick date ranges", selectMonth: "Select month", selectYear: "Select year", endDateHint: "Select an end date", presets: Gi },
  uk: { today: "Сьогодні", clear: "Очистити", close: "Закрити", ok: "OK", previousMonth: "Попередній місяць", previousYear: "Попередній рік", nextMonth: "Наступний місяць", nextYear: "Наступний рік", quickRanges: "Швидкі діапазони дат", selectMonth: "Вибрати місяць", selectYear: "Вибрати рік", endDateHint: "Виберіть кінцеву дату", presets: [{ label: "Останні 7 днів", days: 7 }, { label: "Останні 30 днів", days: 30 }, { label: "Останні 60 днів", days: 60 }, { label: "Останні 90 днів", days: 90 }, { label: "Останні 180 днів", days: 180 }] },
  de: { today: "Heute", clear: "Löschen", close: "Schließen", ok: "OK", previousMonth: "Vorheriger Monat", previousYear: "Vorheriges Jahr", nextMonth: "Nächster Monat", nextYear: "Nächstes Jahr", quickRanges: "Schnelle Zeiträume", selectMonth: "Monat auswählen", selectYear: "Jahr auswählen", endDateHint: "Enddatum auswählen", presets: [{ label: "Letzte 7 Tage", days: 7 }, { label: "Letzte 30 Tage", days: 30 }, { label: "Letzte 60 Tage", days: 60 }, { label: "Letzte 90 Tage", days: 90 }, { label: "Letzte 180 Tage", days: 180 }] },
  fr: { today: "Aujourd’hui", clear: "Effacer", close: "Fermer", ok: "OK", previousMonth: "Mois précédent", previousYear: "Année précédente", nextMonth: "Mois suivant", nextYear: "Année suivante", quickRanges: "Périodes rapides", selectMonth: "Sélectionner le mois", selectYear: "Sélectionner l’année", endDateHint: "Sélectionnez une date de fin", presets: [{ label: "7 derniers jours", days: 7 }, { label: "30 derniers jours", days: 30 }, { label: "60 derniers jours", days: 60 }, { label: "90 derniers jours", days: 90 }, { label: "180 derniers jours", days: 180 }] }
}, it = (...t) => t.filter(Boolean).join(" ");
function Ue(t) {
  const s = new Date(t);
  return s.setHours(0, 0, 0, 0), s;
}
function va(t) {
  const s = Ue(t);
  return s.setDate(1), s;
}
function Rt(t, s) {
  const a = new Date(t);
  return a.setMonth(a.getMonth() + s, 1), a;
}
function ga(t, s) {
  const a = Ue(t);
  return a.setDate(a.getDate() + s), a;
}
function Oe(t, s) {
  return !!(t && s && Ue(t).getTime() === Ue(s).getTime());
}
function ct(t) {
  return !!(t && !Array.isArray(t) && !(t instanceof Date) && "from" in t);
}
function _s(t) {
  return t instanceof Date ? [t] : Array.isArray(t) ? t : ct(t) ? [t.from, t.to].filter((s) => !!s) : [];
}
function Hs(t, s) {
  return new Intl.DateTimeFormat(s, { day: "2-digit", month: "2-digit", year: "numeric" }).format(t);
}
function Ms(t, s, a, r) {
  return s === "iso" ? t.toISOString() : s === "timestamp" ? t.getTime() : s === "locale" ? new Intl.DateTimeFormat(a, r).format(t) : t;
}
function Ji(t, s, a, r) {
  return s === "date" ? t : t instanceof Date ? Ms(t, s, a, r) : Array.isArray(t) ? t.map((n) => Ms(n, s, a, r)) : ct(t) ? { from: t.from ? Ms(t.from, s, a, r) : null, to: t.to ? Ms(t.to, s, a, r) : null } : t;
}
function ms(t, s, a) {
  return a === "year" ? new Intl.DateTimeFormat(s, { year: "numeric" }).format(t) : a === "month" ? new Intl.DateTimeFormat(s, { month: "short", year: "numeric" }).format(t) : Hs(t, s);
}
function Zi(t, s, a) {
  if (t instanceof Date) return ms(t, s, a);
  if (Array.isArray(t)) return t.map((r) => ms(r, s, a)).join(", ");
  if (ct(t)) {
    if (t.from && t.to) return `${ms(t.from, s, a)} – ${ms(t.to, s, a)}`;
    if (t.from) return `${ms(t.from, s, a)} – …`;
  }
  return "";
}
function Jr(t, s) {
  const a = va(t), r = (a.getDay() - s + 7) % 7;
  return Array.from({ length: 42 }, (n, m) => {
    const o = new Date(a);
    return o.setDate(1 - r + m), o;
  });
}
function Bt(t, s, a, r, n, m = "any") {
  const o = Ue(t).getTime();
  return s && o < Ue(s).getTime() || a && o > Ue(a).getTime() || n && m === "past" && o > Ue(n).getTime() || n && m === "future" && o < Ue(n).getTime() || n && m === "current" && o !== Ue(n).getTime() ? !0 : typeof r == "function" ? r(t) : (r == null ? void 0 : r.some((i) => typeof i == "function" ? i(t) : Oe(i, t))) ?? !1;
}
const Zr = (t, s) => Array.from({ length: 7 }, (a, r) => {
  const n = new Date(2024, 0, 7 + (r + s) % 7);
  return new Intl.DateTimeFormat(t, { weekday: "short" }).format(n);
});
function Qi({
  "aria-label": t,
  currentValue: s,
  disabled: a = !1,
  disabledDates: r,
  locale: n,
  maxDate: m,
  minDate: o,
  miniDaysAfter: i,
  miniDaysBefore: c,
  miniReferenceDate: p,
  readOnly: l = !1,
  referenceDate: d,
  relativeDateMode: y = "any",
  selectValue: b,
  selectionMode: h,
  showToday: j,
  size: w,
  weekStartsOn: z
}) {
  const v = bt[n], D = ys[n], x = Ue(p), _ = Math.max(0, Math.floor(c)), u = Math.max(0, Math.floor(i)), [S, M] = q(x), g = mt(() => Array.from({ length: _ + u + 1 }, (k, Y) => ga(S, Y - _)), [_, u, S]), N = Math.min(7, g.length), f = Math.max(0, g.length - N), T = Math.max(0, Math.min(f, _ - Math.floor(N / 2))), [B, R] = q(T);
  Me(() => R(T), [T]);
  const A = g.slice(B, B + N), F = _s(s)[0], E = Ue(/* @__PURE__ */ new Date()), L = F ?? x, K = (k) => s instanceof Date ? Oe(s, k) : Array.isArray(s) ? s.some((Y) => Oe(Y, k)) : ct(s) && (Oe(s.from, k) || Oe(s.to, k)), I = (k) => ct(s) && s.from && s.to && Ue(k) >= Ue(s.from) && Ue(k) <= Ue(s.to), W = (k) => {
    if (!(a || l || Bt(k, o, m, r, d, y)))
      if (h === "multiple") {
        const Y = Array.isArray(s) ? s : [];
        b(Y.some((P) => Oe(P, k)) ? Y.filter((P) => !Oe(P, k)) : [...Y, k]);
      } else h === "range" ? !ct(s) || s.from && s.to ? b({ from: k, to: null }) : s.from && k < s.from ? b({ from: k, to: s.from }) : b({ from: s.from, to: k }) : b(k);
  };
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: it("mm-calendar-mini", `mm-calendar-mini--${w}`, a && "mm-calendar--disabled"), children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar-mini__toolbar", children: [
      /* @__PURE__ */ e.jsx("button", { "aria-label": v.previousMonth, className: "mm-calendar-mini__nav", disabled: a || B === 0, onClick: () => R((k) => Math.max(0, k - 1)), type: "button", children: /* @__PURE__ */ e.jsx(Kt, { "aria-hidden": "true", size: 15 }) }),
      /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-mini__range-label", children: new Intl.DateTimeFormat(D, { month: "long", year: "numeric" }).format(x) }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": v.nextMonth, className: "mm-calendar-mini__nav", disabled: a || B === f, onClick: () => R((k) => Math.min(f, k + 1)), type: "button", children: /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 15 }) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-mini__days", role: "list", children: A.map((k) => /* @__PURE__ */ e.jsxs("button", { "aria-current": Oe(k, E) ? "date" : void 0, "aria-selected": K(k), className: it("mm-calendar-mini__day", K(k) && "mm-calendar-mini__day--selected", !!I(k) && "mm-calendar-mini__day--range", Oe(k, x) && "mm-calendar-mini__day--anchor"), disabled: a || l || Bt(k, o, m, r, d, y), onClick: () => W(k), role: "listitem", type: "button", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-calendar-mini__weekday", children: new Intl.DateTimeFormat(D, { weekday: "short" }).format(k) }),
      /* @__PURE__ */ e.jsx("span", { className: "mm-calendar-mini__date", children: k.getDate() })
    ] }, k.toISOString())) }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar-mini__footer", children: [
      j && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: a || l || Bt(L, o, m, r, d, y), onClick: () => {
        M(L), R(T);
      }, size: "sm", variant: "dashed", children: v.today }),
      F && h === "single" && /* @__PURE__ */ e.jsx("span", { className: "mm-calendar__value", children: Hs(F, D) })
    ] })
  ] });
}
function el({ "aria-label": t, currentValue: s, disabled: a = !1, disabledDates: r, displayDate: n, granularity: m, locale: o, maxDate: i, minDate: c, onNavigate: p, rangeActions: l, readOnly: d = !1, referenceDate: y, relativeDateMode: b = "any", selectValue: h, selectionMode: j, showClear: w, showToday: z, size: v }) {
  const D = bt[o], x = ys[o], _ = Ue(/* @__PURE__ */ new Date()), u = (A) => m === "year" ? new Date(A.getFullYear(), 0, 1) : new Date(A.getFullYear(), A.getMonth(), 1), S = (A) => m === "year" ? new Date(A.getFullYear(), 11, 31, 23, 59, 59, 999) : new Date(A.getFullYear(), A.getMonth() + 1, 0, 23, 59, 59, 999), M = m === "year" ? Array.from({ length: 16 }, (A, F) => new Date(n.getFullYear() - 7 + F, 0, 1)) : Array.from({ length: 12 }, (A, F) => new Date(n.getFullYear(), F, 1)), g = (A) => {
    const F = u(A), E = S(A);
    return c && E < Ue(c) || i && F > Ue(i) || y && b === "past" && F > Ue(y) || y && b === "future" && E < Ue(y) || y && b === "current" && (F > Ue(y) || E < Ue(y)) ? !0 : typeof r == "function" ? r(F) : (r == null ? void 0 : r.some((L) => typeof L == "function" ? L(F) : Oe(L, F))) ?? !1;
  }, N = (A) => s instanceof Date ? Oe(u(s), u(A)) : Array.isArray(s) ? s.some((F) => Oe(u(F), u(A))) : ct(s) && !!(s.from && Oe(u(s.from), u(A)) || s.to && Oe(u(s.to), u(A))), f = (A) => {
    if (!ct(s) || !s.from || !s.to) return !1;
    const F = u(A).getTime();
    return F >= u(s.from).getTime() && F <= u(s.to).getTime();
  }, T = (A) => {
    if (a || d || g(A)) return;
    const F = u(A);
    if (j === "multiple") {
      const E = Array.isArray(s) ? s : [];
      h(E.some((L) => Oe(u(L), F)) ? E.filter((L) => !Oe(u(L), F)) : [...E, F]);
    } else j === "range" ? !ct(s) || s.from && s.to ? h({ from: F, to: null }) : s.from && F < u(s.from) ? h({ from: F, to: u(s.from) }) : h({ from: u(s.from ?? F), to: F }) : h(F);
  }, B = 12, R = m === "year" ? String(n.getFullYear()) : new Intl.DateTimeFormat(x, { year: "numeric" }).format(n);
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: it("mm-calendar-period", `mm-calendar-period--${v}`, `mm-calendar-period--${m}`, a && "mm-calendar--disabled"), children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar-period__toolbar", children: [
      /* @__PURE__ */ e.jsx("button", { "aria-label": D.previousYear, className: "mm-calendar-period__nav", disabled: a, onClick: () => p(Rt(n, -B)), type: "button", children: /* @__PURE__ */ e.jsx(Kt, { "aria-hidden": "true", size: 16 }) }),
      /* @__PURE__ */ e.jsx("strong", { children: R }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": D.nextYear, className: "mm-calendar-period__nav", disabled: a, onClick: () => p(Rt(n, B)), type: "button", children: /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 16 }) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-period__grid", children: M.map((A) => /* @__PURE__ */ e.jsx("button", { "aria-selected": N(A), className: it("mm-calendar-period__tile", N(A) && "mm-calendar-period__tile--selected", f(A) && "mm-calendar-period__tile--range"), disabled: a || d || g(A), onClick: () => T(A), type: "button", children: m === "year" ? A.getFullYear() : new Intl.DateTimeFormat(x, { month: "short" }).format(A) }, A.toISOString())) }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar-period__footer", children: [
      z && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: a || d || g(_), onClick: () => T(_), size: "sm", variant: "dashed", children: D.today }),
      w && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: a || d, onClick: () => h(null), size: "sm", variant: "dashed", children: D.clear }),
      l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", onClick: l.onClose, size: "sm", variant: "outline", children: l.close }),
        /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", onClick: l.onConfirm, size: "sm", variant: "primary", children: l.ok })
      ] })
    ] })
  ] });
}
function tl({ ariaLabel: t, currentValue: s, disabled: a, disabledDates: r, displayDate: n, locale: m, maxDate: o, minDate: i, nextYearContent: c, onNavigate: p, previousYearContent: l, readOnly: d, referenceDate: y, relativeDateMode: b = "any", renderDay: h, selectValue: j, selectionMode: w, showToday: z, size: v, weekStartsOn: D, yearNavigation: x, yearRange: _ }) {
  const u = ys[m], S = n.getFullYear(), M = Ue(/* @__PURE__ */ new Date()), g = mt(() => {
    const T = Math.min((_ == null ? void 0 : _.start) ?? S - 10, (_ == null ? void 0 : _.end) ?? S + 10), B = Math.max((_ == null ? void 0 : _.start) ?? S - 10, (_ == null ? void 0 : _.end) ?? S + 10);
    return Array.from({ length: Math.max(0, B - T + 1) }, (R, A) => T + A);
  }, [S, _ == null ? void 0 : _.end, _ == null ? void 0 : _.start]), N = (T) => {
    const B = new Date(T, 0, 1), R = new Date(T, 11, 31);
    return !!(i && R < Ue(i) || o && B > Ue(o) || b === "past" && B > Ue(y ?? M) || b === "future" && R < Ue(y ?? M) || b === "current" && T !== (y ?? M).getFullYear());
  }, f = (T) => {
    if (!(a || d || Bt(T, i, o, r, y, b)))
      if (w === "multiple") {
        const B = Array.isArray(s) ? s : [];
        j(B.some((R) => Oe(R, T)) ? B.filter((R) => !Oe(R, T)) : [...B, T]);
      } else w === "range" ? !ct(s) || s.from && s.to ? j({ from: T, to: null }) : s.from && T < s.from ? j({ from: T, to: s.from }) : j({ from: s.from, to: T }) : j(T);
  };
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: it("mm-calendar-year", `mm-calendar-year--${v}`), children: [
    /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-year__toolbar", children: x === "select" ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsxs("button", { "aria-label": bt[m].previousYear, className: "mm-calendar__nav", disabled: a || (_ ? S <= Math.min(_.start, _.end) : !1), onClick: () => p(new Date(S - 1, 0, 1)), type: "button", children: [
        /* @__PURE__ */ e.jsx(Rs, { "aria-hidden": "true", size: 16 }),
        l
      ] }),
      /* @__PURE__ */ e.jsx(Gt, { "aria-label": bt[m].selectYear, className: "mm-calendar-year__select", disabled: a, options: g.map((T) => ({ value: String(T), label: String(T), disabled: N(T) })), onChange: (T) => {
        const B = Number(T);
        Number.isFinite(B) && p(new Date(B, 0, 1));
      }, size: "sm", value: String(S) }),
      /* @__PURE__ */ e.jsxs("button", { "aria-label": bt[m].nextYear, className: "mm-calendar__nav", disabled: a || (_ ? S >= Math.max(_.start, _.end) : !1), onClick: () => p(new Date(S + 1, 0, 1)), type: "button", children: [
        c,
        /* @__PURE__ */ e.jsx(Cs, { "aria-hidden": "true", size: 16 })
      ] })
    ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsxs("button", { "aria-label": bt[m].previousYear, className: "mm-calendar__nav", disabled: a, onClick: () => p(new Date(S - 1, 0, 1)), type: "button", children: [
        /* @__PURE__ */ e.jsx(Rs, { "aria-hidden": "true", size: 16 }),
        l
      ] }),
      /* @__PURE__ */ e.jsx("strong", { children: S }),
      /* @__PURE__ */ e.jsxs("button", { "aria-label": bt[m].nextYear, className: "mm-calendar__nav", disabled: a, onClick: () => p(new Date(S + 1, 0, 1)), type: "button", children: [
        c,
        /* @__PURE__ */ e.jsx(Cs, { "aria-hidden": "true", size: 16 })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-year__grid", children: Array.from({ length: 12 }, (T, B) => {
      const R = new Date(S, B, 1), A = Jr(R, D), F = Zr(u, D);
      return /* @__PURE__ */ e.jsxs("section", { className: "mm-calendar-year__month", children: [
        /* @__PURE__ */ e.jsx("h3", { children: new Intl.DateTimeFormat(u, { month: "long" }).format(R) }),
        /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-year__weekdays", children: F.map((E) => /* @__PURE__ */ e.jsx("span", { children: E.slice(0, 2) }, E)) }),
        /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-year__days", children: A.map((E) => {
          const L = E.getMonth() !== B, K = _s(s).some((W) => Oe(W, E)), I = Bt(E, i, o, r, y, b);
          return /* @__PURE__ */ e.jsx("button", { "aria-hidden": L || void 0, "aria-selected": K, className: it("mm-calendar-year__day", L && "mm-calendar-year__day--outside", K && "mm-calendar-year__day--selected", Oe(E, M) && "mm-calendar-year__day--today"), disabled: L || I || a || d, onClick: () => f(E), role: "gridcell", type: "button", children: h ? h(E, { disabled: I, outside: L, selected: K }) : E.getDate() }, E.toISOString());
        }) })
      ] }, B);
    }) }),
    z && /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-year__footer", children: /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: a || d || Bt(M, i, o, r, y, b), onClick: () => {
      p(M), f(M);
    }, size: "sm", variant: "dashed", children: bt[m].today }) })
  ] });
}
function sl(t) {
  const { displayDate: s, onNavigate: a, currentValue: r, selectValue: n, months: m, locale: o, monthFormat: i, orientation: c, selectionMode: p, showOutsideDays: l, showWeekNumbers: d, size: y, weekStartsOn: b, disabled: h, readOnly: j, minDate: w, maxDate: z, disabledDates: v, holidays: D = [], holidayInteraction: x = "both", referenceDate: _, relativeDateMode: u = "any", renderDay: S, showToday: M, showClear: g, footerButtonAlign: N = "start", footerButtonOrder: f = "today-clear", footerOppositeContent: T, rangePresets: B = [], showRangePresets: R = !1, showHolidays: A = !1, "aria-label": F, rangeActions: E } = t, L = bt[o], K = ys[o], I = Array.from({ length: m }, (oe, xe) => Rt(s, xe)), W = Zr(K, b), k = _s(r)[0], Y = Ue(/* @__PURE__ */ new Date()), [P, C] = q("days"), [V, Q] = q(null), H = new Intl.DateTimeFormat(K, { month: "long" }).format(s), X = new Intl.DateTimeFormat(K, { year: "numeric" }).format(s), ce = Array.from({ length: 16 }, (oe, xe) => s.getFullYear() - 7 + xe), se = Array.from({ length: 12 }, (oe, xe) => new Date(s.getFullYear(), xe, 1)), te = (oe) => ct(r) && !!(r.from && r.to) && Oe(r.to, Y) && Oe(r.from, ga(Y, -(Math.max(1, oe.days) - 1))), ve = (oe) => {
    if (h || j || !Number.isFinite(oe.days) || oe.days < 1) return;
    const xe = Math.max(1, Math.floor(oe.days));
    n({ from: ga(Y, -(xe - 1)), to: Y });
  }, ge = (oe) => r instanceof Date ? Oe(r, oe) : Array.isArray(r) ? r.some((xe) => Oe(xe, oe)) : ct(r) && (Oe(r.from, oe) || Oe(r.to, oe)), ae = (oe) => ct(r) && r.from && r.to && Ue(oe) >= Ue(r.from) && Ue(oe) <= Ue(r.to), fe = (oe) => {
    if (!(h || j || Bt(oe, w, z, v, _, u))) {
      if (p === "multiple") {
        const xe = Array.isArray(r) ? r : [];
        n(xe.some((ie) => Oe(ie, oe)) ? xe.filter((ie) => !Oe(ie, oe)) : [...xe, oe]);
        return;
      }
      if (p === "range") {
        !ct(r) || r.from && r.to ? n({ from: oe, to: null }) : r.from && oe < r.from ? n({ from: oe, to: r.from }) : n({ from: r.from, to: oe });
        return;
      }
      n(oe);
    }
  }, de = (oe) => A ? D.filter((xe) => Oe(xe.date, oe)) : [];
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": F, className: it("mm-calendar", `mm-calendar--${y}`, `mm-calendar--${c}`, d && "mm-calendar--week-numbers", h && "mm-calendar--disabled"), children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar__toolbar", children: [
      /* @__PURE__ */ e.jsx("button", { "aria-label": L.previousMonth, className: "mm-calendar__nav", disabled: h, onClick: () => a(Rt(s, -1)), type: "button", children: /* @__PURE__ */ e.jsx(Kt, { "aria-hidden": "true", size: 16 }) }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": L.previousYear, className: "mm-calendar__nav", disabled: h, onClick: () => a(Rt(s, -12)), type: "button", children: /* @__PURE__ */ e.jsx(Rs, { "aria-hidden": "true", size: 16 }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar__toolbar-title", children: [
        /* @__PURE__ */ e.jsx("button", { "aria-label": L.selectMonth, className: it("mm-calendar__picker-trigger", P === "months" && "mm-calendar__picker-trigger--active"), disabled: h, onClick: () => C(P === "months" ? "days" : "months"), type: "button", children: H }),
        /* @__PURE__ */ e.jsx("button", { "aria-label": L.selectYear, className: it("mm-calendar__picker-trigger", P === "years" && "mm-calendar__picker-trigger--active"), disabled: h, onClick: () => C(P === "years" ? "days" : "years"), type: "button", children: X }),
        m > 1 && /* @__PURE__ */ e.jsxs("span", { "aria-hidden": "true", children: [
          " + ",
          m - 1
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": L.nextYear, className: "mm-calendar__nav", disabled: h, onClick: () => a(Rt(s, 12)), type: "button", children: /* @__PURE__ */ e.jsx(Cs, { "aria-hidden": "true", size: 16 }) }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": L.nextMonth, className: "mm-calendar__nav", disabled: h, onClick: () => a(Rt(s, 1)), type: "button", children: /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 16 }) })
    ] }),
    P !== "days" && /* @__PURE__ */ e.jsx("div", { "aria-label": P === "months" ? L.selectMonth : L.selectYear, className: "mm-calendar__picker-grid", children: P === "months" ? se.map((oe) => /* @__PURE__ */ e.jsx("button", { "aria-current": oe.getMonth() === s.getMonth() ? "date" : void 0, className: it("mm-calendar__picker-tile", oe.getMonth() === s.getMonth() && "mm-calendar__picker-tile--active"), disabled: h, onClick: () => {
      a(oe), C("days");
    }, type: "button", children: new Intl.DateTimeFormat(K, { month: "short" }).format(oe) }, oe.toISOString())) : ce.map((oe) => /* @__PURE__ */ e.jsx("button", { "aria-current": oe === s.getFullYear() ? "date" : void 0, className: it("mm-calendar__picker-tile", oe === s.getFullYear() && "mm-calendar__picker-tile--active"), disabled: h, onClick: () => {
      a(new Date(oe, s.getMonth(), 1)), C("days");
    }, type: "button", children: oe }, oe)) }),
    P === "days" && /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar__body", children: [
      R && /* @__PURE__ */ e.jsx("aside", { "aria-label": L.quickRanges, className: "mm-calendar__presets", children: B.map((oe) => /* @__PURE__ */ e.jsx("button", { "aria-pressed": te(oe), className: it("mm-calendar__preset", te(oe) && "mm-calendar__preset--active"), disabled: h || j || oe.days < 1, onClick: () => ve(oe), type: "button", children: oe.label }, `${oe.label}-${oe.days}`)) }),
      /* @__PURE__ */ e.jsx("div", { className: "mm-calendar__months", children: I.map((oe) => /* @__PURE__ */ e.jsxs("section", { className: "mm-calendar__month", children: [
        /* @__PURE__ */ e.jsx("h3", { children: new Intl.DateTimeFormat(K, i).format(oe) }),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar__weekdays", children: [
          d && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true" }),
          W.map((xe) => /* @__PURE__ */ e.jsx("span", { children: xe }, xe))
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "mm-calendar__grid", role: "grid", children: Jr(oe, b).map((xe, ie) => {
          const re = xe.getMonth() !== oe.getMonth(), U = Bt(xe, w, z, v, _, u), Z = ge(xe), G = ae(xe), me = de(xe), he = xe.toISOString(), ze = x === "hover" || x === "both", je = x === "click" || x === "both";
          return /* @__PURE__ */ e.jsxs(Ma, { children: [
            d && ie % 7 === 0 && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-calendar__week-number", children: Math.ceil((ie + 1) / 7) }),
            /* @__PURE__ */ e.jsxs("div", { className: it("mm-calendar__cell", re && "mm-calendar__cell--outside", !!G && "mm-calendar__cell--range"), children: [
              /* @__PURE__ */ e.jsx("button", { "aria-current": Oe(xe, Y) ? "date" : void 0, "aria-label": `${Hs(xe, K)}${me.length ? `: ${me.map((Ne) => Ne.label).join(", ")}` : ""}`, "aria-selected": Z, className: it("mm-calendar__day", Z && "mm-calendar__day--selected", Oe(xe, Y) && "mm-calendar__day--today"), disabled: U || !l && re || h, onClick: () => {
                fe(xe), je && me.length && Q(V === he ? null : he);
              }, onMouseEnter: () => {
                ze && me.length && Q(he);
              }, onMouseLeave: () => {
                ze && x === "hover" && Q(null);
              }, role: "gridcell", type: "button", children: S ? S(xe, { disabled: U, outside: re, selected: Z }) : xe.getDate() }),
              me.length > 0 && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-calendar__holiday-dot" }),
              V === he && me.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "mm-calendar__holiday-popover", role: "status", children: me.map((Ne) => /* @__PURE__ */ e.jsx("span", { children: Ne.label }, Ne.label)) })
            ] })
          ] }, he);
        }) })
      ] }, oe.toISOString())) })
    ] }),
    (M || g || E || T) && /* @__PURE__ */ e.jsxs("div", { className: it("mm-calendar__footer", `mm-calendar__footer--${N}`), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar__footer-group", children: [
        f === "today-clear" ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          M && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: h || j, onClick: () => fe(Y), size: "sm", variant: "dashed", children: L.today }),
          g && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: h || j, onClick: () => n(null), size: "sm", variant: "dashed", children: L.clear })
        ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          g && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: h || j, onClick: () => n(null), size: "sm", variant: "dashed", children: L.clear }),
          M && /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", disabled: h || j, onClick: () => fe(Y), size: "sm", variant: "dashed", children: L.today })
        ] }),
        E && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", onClick: E.onClose, size: "sm", variant: "outline", children: E.close }),
          /* @__PURE__ */ e.jsx(Pe, { className: "mm-calendar__footer-button", onClick: E.onConfirm, size: "sm", variant: "primary", children: E.ok })
        ] })
      ] }),
      T && /* @__PURE__ */ e.jsx("div", { className: "mm-calendar__footer-opposite", children: T }),
      p === "range" && ct(r) && r.from && !r.to && /* @__PURE__ */ e.jsx("span", { className: "mm-calendar__hint", children: L.endDateHint }),
      k && p === "single" && /* @__PURE__ */ e.jsx("span", { className: "mm-calendar__value", children: Hs(k, K) })
    ] })
  ] });
}
function go({
  "aria-label": t = "Calendar",
  className: s,
  closeOnRangeSelection: a = !0,
  defaultDisplayDate: r,
  defaultValue: n = null,
  disabled: m = !1,
  disabledDates: o,
  displayDate: i,
  footerButtonAlign: c = "start",
  footerButtonOrder: p = "today-clear",
  footerOppositeContent: l,
  fullWidth: d = !1,
  granularity: y = "day",
  holidays: b,
  holidayInteraction: h = "both",
  locale: j,
  maxDate: w,
  minDate: z,
  miniDaysAfter: v = 3,
  miniDaysBefore: D = 3,
  miniReferenceDate: x,
  monthFormat: _ = { month: "long", year: "numeric" },
  months: u = 1,
  nextYearContent: S,
  onChange: M,
  onDisplayDateChange: g,
  orientation: N = "horizontal",
  outputDateFormat: f = { day: "2-digit", month: "2-digit", year: "numeric" },
  placeholder: T = "Select a date",
  previousYearContent: B,
  rangePresets: R,
  readOnly: A = !1,
  referenceDate: F = /* @__PURE__ */ new Date(),
  relativeDateMode: E = "any",
  renderDay: L,
  selectionMode: K = "single",
  showClear: I = !1,
  showOutsideDays: W = !0,
  showHolidays: k = !1,
  showRangePresets: Y = !1,
  showToday: P = !0,
  showWeekNumbers: C = !1,
  size: V = "default",
  value: Q,
  valueFormat: H = "date",
  variant: X = "standard",
  view: ce = "widget",
  weekStartsOn: se = 0,
  yearNavigation: te = "arrows",
  yearRange: ve,
  yearOverview: ge = !1
}) {
  const { locale: ae } = Ge(), fe = j ?? ae, [de, oe] = q(n), [xe, ie] = q(va(r ?? _s(n)[0] ?? /* @__PURE__ */ new Date())), [re, U] = q(!1), [Z, G] = q(n), me = ke(null), he = Q === void 0 ? de : Q, ze = R ?? bt[fe].presets, je = ys[fe], Ne = va(i ?? xe), Re = x ?? _s(n)[0] ?? /* @__PURE__ */ new Date(), _e = mt(() => Zi(he, je, y), [he, y, je]), Le = ce === "input" && K === "range" && !a;
  Me(() => {
    if (!re) return;
    const O = (ye) => {
      ye.key === "Escape" && U(!1);
    };
    return document.addEventListener("keydown", O), () => document.removeEventListener("keydown", O);
  }, [re]), Me(() => {
    if (!re) return;
    const O = (ye) => {
      var De;
      (De = me.current) != null && De.contains(ye.target) || U(!1);
    };
    return document.addEventListener("pointerdown", O), () => document.removeEventListener("pointerdown", O);
  }, [re]);
  const Xe = (O) => {
    Q === void 0 && oe(O), M == null || M(Ji(O, H, je, f));
  }, Ze = (O) => {
    if (Le) {
      G(O);
      return;
    }
    Xe(O);
    const ye = K === "range" && ct(O) && !!(O.from && O.to);
    ce === "input" && (K === "single" || ye && a) && U(!1);
  }, lt = () => {
    G(he), U((O) => !O);
  }, ot = Le && re ? Z : he, dt = Le ? { close: bt[fe].close, ok: bt[fe].ok, onClose: () => U(!1), onConfirm: () => {
    Xe(Z), U(!1);
  } } : void 0, ue = (O) => {
    i !== void 0 ? g == null || g(O) : ie(O);
  };
  if (ge && ce === "widget")
    return /* @__PURE__ */ e.jsx("div", { className: it("mm-calendar-year-overview", d && "mm-calendar-year-overview--full-width", s), children: /* @__PURE__ */ e.jsx(tl, { ariaLabel: t, currentValue: he, disabled: m, disabledDates: o, displayDate: Ne, locale: fe, maxDate: w, minDate: z, nextYearContent: S, onNavigate: ue, previousYearContent: B, readOnly: A, referenceDate: F, relativeDateMode: E, renderDay: L, selectValue: Ze, selectionMode: K, showToday: P, size: V, weekStartsOn: se, yearNavigation: te, yearRange: ve }) });
  const pe = y !== "day" ? /* @__PURE__ */ e.jsx(el, { "aria-label": t, currentValue: ot, disabled: m, disabledDates: o, displayDate: Ne, granularity: y, locale: fe, maxDate: w, minDate: z, onNavigate: ue, rangeActions: dt, readOnly: A, referenceDate: F, relativeDateMode: E, selectValue: Ze, selectionMode: K, showClear: I, showToday: P, size: V }) : X === "mini" ? /* @__PURE__ */ e.jsx(Qi, { "aria-label": t, currentValue: he, disabled: m, disabledDates: o, locale: fe, maxDate: w, minDate: z, miniDaysAfter: v, miniDaysBefore: D, miniReferenceDate: Re, readOnly: A, referenceDate: F, relativeDateMode: E, selectValue: Ze, selectionMode: K, showToday: P, size: V, weekStartsOn: se }) : /* @__PURE__ */ e.jsx(sl, { "aria-label": t, currentValue: ot, defaultDisplayDate: r, disabled: m, disabledDates: o, displayDate: Ne, footerButtonAlign: c, footerButtonOrder: p, footerOppositeContent: l, fullWidth: d, holidays: b, holidayInteraction: h, locale: fe, maxDate: w, minDate: z, monthFormat: _, months: Math.max(1, Math.min(3, u)), onNavigate: ue, onDisplayDateChange: g, orientation: N, placeholder: T, rangeActions: dt, rangePresets: ze, readOnly: A, referenceDate: F, relativeDateMode: E, renderDay: L, selectValue: Ze, selectionMode: K, showClear: I, showHolidays: k, showOutsideDays: W, showRangePresets: Y, showToday: P, showWeekNumbers: C, size: V, value: Q, view: ce, weekStartsOn: se });
  return ce === "input" ? /* @__PURE__ */ e.jsxs("div", { className: it("mm-calendar-input", `mm-calendar-input--${V}`, d && "mm-calendar-input--full-width", s), ref: me, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-calendar-input__control", children: [
      /* @__PURE__ */ e.jsx("input", { "aria-expanded": re, "aria-haspopup": "dialog", "aria-label": t, className: "mm-calendar-input__field", disabled: m, onClick: lt, onKeyDown: (O) => {
        (O.key === "Enter" || O.key === " ") && (O.preventDefault(), lt());
      }, readOnly: !0, value: _e, placeholder: T }),
      /* @__PURE__ */ e.jsx(pn, { "aria-hidden": "true", className: "mm-calendar-input__icon", size: 16 })
    ] }),
    re && /* @__PURE__ */ e.jsx("div", { className: "mm-calendar-input__popover", role: "dialog", children: pe })
  ] }) : /* @__PURE__ */ e.jsx("div", { className: it(d && "mm-calendar--full-width", s), children: pe });
}
const ia = (...t) => t.filter(Boolean).join(" ");
function Qr({
  "aria-label": t,
  actions: s,
  as: a = "article",
  badge: r,
  backgroundContentPosition: n = "top",
  backgroundContentWidth: m = "100%",
  children: o,
  className: i,
  description: c,
  disabled: p = !1,
  footer: l,
  fullWidth: d = !1,
  header: y,
  href: b,
  interactive: h,
  layout: j = "stacked",
  loading: w = !1,
  media: z,
  mediaPosition: v,
  columns: D,
  columnHeaders: x = !1,
  columnSizing: _ = "flex",
  columnWidths: u,
  onClick: S,
  onKeyDown: M,
  orientation: g = "vertical",
  selected: N = !1,
  size: f = "default",
  title: T,
  titleIcon: B,
  variant: R = "default"
}, A, F) {
  const E = !!b && !p, L = v ?? (g === "horizontal" ? "start" : "top"), K = g === "vertical" && L === "background", I = (h ?? !!(S || b)) || E, W = (H) => {
    M == null || M(H), !(H.defaultPrevented || p || E || !I || !S) && (H.key === "Enter" || H.key === " ") && (H.preventDefault(), S(H));
  }, k = y ?? (T || c || B || s || r ? /* @__PURE__ */ e.jsxs("div", { className: "mm-card__header", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-card__heading", children: [
      (T || B) && /* @__PURE__ */ e.jsxs("div", { className: "mm-card__title-row", children: [
        B && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-card__title-icon", children: B }),
        T && /* @__PURE__ */ e.jsx("h3", { className: "mm-card__title", id: A, children: T })
      ] }),
      c && /* @__PURE__ */ e.jsx("p", { className: "mm-card__description", id: F, children: c })
    ] }),
    (r || s) && /* @__PURE__ */ e.jsxs("div", { className: "mm-card__header-actions", children: [
      r && /* @__PURE__ */ e.jsx("span", { className: "mm-card__badge", children: r }),
      s && /* @__PURE__ */ e.jsx("div", { className: "mm-card__actions", children: s })
    ] })
  ] }) : null), Y = u != null && u.length ? u.map((H) => typeof H == "number" ? `${H}px` : H).join(" ") : D == null ? void 0 : D.map((H) => H.width ? typeof H.width == "number" ? `${H.width}px` : H.width : "minmax(0, 1fr)").join(" "), P = j === "row" && (D != null && D.length) ? /* @__PURE__ */ e.jsx("div", { className: "mm-card__columns", role: "row", style: { "--mm-card-columns": Y ?? (_ === "equal" ? `repeat(${D.length}, minmax(0, 1fr))` : _ === "content" ? `repeat(${D.length}, auto)` : _ === "between" && D.length >= 3 ? "auto minmax(0, 1fr) auto" : `repeat(${D.length}, minmax(0, 1fr))`) }, children: D.map((H, X) => /* @__PURE__ */ e.jsxs("div", { className: ia("mm-card__column", `mm-card__column--${H.align ?? "start"}`), role: "cell", children: [
    x && H.label && /* @__PURE__ */ e.jsx("span", { className: "mm-card__column-label", children: H.label }),
    /* @__PURE__ */ e.jsx("span", { className: "mm-card__column-content", children: H.content })
  ] }, H.key ?? X)) }) : null, C = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    j === "row" ? P : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      k,
      o !== void 0 && /* @__PURE__ */ e.jsx("div", { className: "mm-card__body", children: o })
    ] }),
    l && /* @__PURE__ */ e.jsx("div", { className: "mm-card__footer", children: l })
  ] }), V = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    z && /* @__PURE__ */ e.jsx("div", { className: "mm-card__media", children: z }),
    K ? /* @__PURE__ */ e.jsx("div", { className: ia("mm-card__background-content", `mm-card__background-content--${n}`), style: { "--mm-card-background-content-width": m === "full" ? "100%" : typeof m == "number" ? `${m}px` : m }, children: C }) : C,
    w && /* @__PURE__ */ e.jsx("div", { "aria-label": "Loading", className: "mm-card__loading", role: "status", children: /* @__PURE__ */ e.jsx(Mt, { "aria-hidden": "true", size: 18 }) })
  ] }), Q = {
    "aria-describedby": F,
    "aria-disabled": p || void 0,
    "aria-label": t,
    "aria-labelledby": A,
    className: ia("mm-card", `mm-card--${R}`, `mm-card--${f}`, `mm-card--${g}`, `mm-card--media-${L}`, j === "row" && "mm-card--row", !!z && "mm-card--with-media", d && "mm-card--full-width", I && "mm-card--interactive", N && "mm-card--selected", p && "mm-card--disabled", w && "mm-card--loading", i),
    onClick: p ? void 0 : S,
    onKeyDown: W
  };
  return E ? /* @__PURE__ */ e.jsx("a", { ...Q, href: b, children: V }) : /* @__PURE__ */ e.jsx(a, { ...Q, role: I ? "button" : void 0, tabIndex: I && !p ? 0 : void 0, children: V });
}
const al = Wt(function(s) {
  const a = He();
  return Qr(s, s.title ? `mm-card-${a}-title` : void 0, s.description ? `mm-card-${a}-description` : void 0);
}), yo = Wt(function(s) {
  return s.title || s.description ? /* @__PURE__ */ e.jsx(al, { ...s }) : Qr(s);
}), rl = {
  en: { accept: "Accept all", close: "Close cookie banner", closePreferences: "Close preferences", description: "We use cookies to improve the experience, measure usage, and remember your preferences.", manage: "Manage preferences", reject: "Reject optional", save: "Save preferences", title: "Your privacy matters" },
  uk: { accept: "Прийняти всі", close: "Закрити банер cookies", closePreferences: "Закрити налаштування", description: "Ми використовуємо cookies, щоб покращувати роботу сайту, вимірювати використання та зберігати ваші налаштування.", manage: "Керувати налаштуваннями", reject: "Відхилити необов’язкові", save: "Зберегти налаштування", title: "Ваша приватність важлива" },
  de: { accept: "Alle akzeptieren", close: "Cookie-Banner schließen", closePreferences: "Einstellungen schließen", description: "Wir verwenden Cookies, um die Nutzung zu verbessern und Ihre Einstellungen zu speichern.", manage: "Einstellungen verwalten", reject: "Optionale ablehnen", save: "Einstellungen speichern", title: "Ihre Privatsphäre ist wichtig" },
  fr: { accept: "Tout accepter", close: "Fermer la bannière de cookies", closePreferences: "Fermer les préférences", description: "Nous utilisons des cookies pour améliorer votre expérience et mémoriser vos préférences.", manage: "Gérer les préférences", reject: "Refuser les optionnels", save: "Enregistrer les préférences", title: "Votre confidentialité compte" }
}, nl = [
  { key: "necessary", label: "Necessary", description: "Required for core site functionality.", required: !0, defaultChecked: !0 },
  { key: "analytics", label: "Analytics", description: "Helps us understand how the site is used." },
  { key: "marketing", label: "Marketing", description: "Used to personalize relevant messages." }
], il = (...t) => t.filter(Boolean).join(" "), Ja = (t) => typeof t == "number" ? `${t}px` : t;
function ll({
  "aria-label": t,
  acceptLabel: s,
  allowNecessaryOnly: a = !0,
  className: r,
  categories: n = nl,
  children: m,
  actions: o,
  closeLabel: i,
  defaultOpen: c = !0,
  description: p,
  fullWidth: l = !0,
  icon: d,
  layout: y,
  locale: b,
  maxWidth: h,
  onAcceptAll: j,
  onClose: w,
  onConsentChange: z,
  onOpenChange: v,
  onRejectAll: D,
  onSavePreferences: x,
  open: _,
  placement: u,
  policyHref: S,
  policyLabel: M,
  preferencesLabel: g,
  position: N,
  presentation: f,
  rejectLabel: T,
  radius: B,
  surfaceColor: R,
  textColor: A,
  borderColor: F,
  showClose: E = !1,
  showPreferences: L,
  size: K,
  style: I,
  title: W,
  variant: k
}) {
  const { components: Y, locale: P } = Ge(), C = Y.cookieBanner, V = rl[b ?? P], Q = y ?? (C == null ? void 0 : C.layout) ?? "inline", H = N ?? (C == null ? void 0 : C.position) ?? "fixed", X = u ?? (C == null ? void 0 : C.placement) ?? "bottom", ce = f ?? (C == null ? void 0 : C.presentation) ?? "bar", se = K ?? (C == null ? void 0 : C.size) ?? "default", te = k ?? (C == null ? void 0 : C.variant) ?? "default", ve = L ?? (C == null ? void 0 : C.showPreferences) ?? !0, [ge, ae] = q(_ ?? c), [fe, de] = q(!1), [oe, xe] = q(() => n.filter((Ne) => Ne.defaultChecked || Ne.required).map((Ne) => Ne.key)), ie = _ !== void 0, re = _ ?? ge;
  Me(() => {
    _ !== void 0 && ae(_);
  }, [_]);
  const U = () => {
    ie || ae(!1), v == null || v(!1), w == null || w();
  }, Z = (Ne, Re) => {
    xe(Ne), z == null || z(Ne), Re == null || Re(Ne), U();
  }, G = (Ne) => {
    if (Ne.required) return;
    const Re = oe.includes(Ne.key) ? oe.filter((_e) => _e !== Ne.key) : [...oe, Ne.key];
    xe(Re), z == null || z(Re);
  };
  if (!re) return null;
  const me = n.map((Ne) => Ne.key), he = n.filter((Ne) => Ne.required).map((Ne) => Ne.key), ze = B ?? (C == null ? void 0 : C.radius), je = { ...h !== void 0 && { "--mm-cookie-banner-max-width": Ja(h) }, ...ze !== void 0 && { "--mm-cookie-banner-radius": Ja(ze) }, ...R ?? (C == null ? void 0 : C.surfaceColor) ? { "--mm-cookie-banner-surface": R ?? (C == null ? void 0 : C.surfaceColor) } : {}, ...A ?? (C == null ? void 0 : C.textColor) ? { "--mm-cookie-banner-text": A ?? (C == null ? void 0 : C.textColor) } : {}, ...F ?? (C == null ? void 0 : C.borderColor) ? { "--mm-cookie-banner-border": F ?? (C == null ? void 0 : C.borderColor) } : {}, ...I };
  return /* @__PURE__ */ e.jsx("aside", { "aria-label": t ?? String(W ?? V.title), className: il("mm-cookie-banner", `mm-cookie-banner--${H}`, `mm-cookie-banner--${X}`, `mm-cookie-banner--${ce}`, `mm-cookie-banner--${se}`, `mm-cookie-banner--${te}`, `mm-cookie-banner--${Q}`, l && "mm-cookie-banner--full-width", r), style: je, role: "region", children: /* @__PURE__ */ e.jsxs("div", { className: "mm-cookie-banner__inner", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-cookie-banner__copy", children: [
      d && /* @__PURE__ */ e.jsx("div", { className: "mm-cookie-banner__icon", "aria-hidden": "true", children: d }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h2", { className: "mm-cookie-banner__title", children: W ?? V.title }),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-cookie-banner__description", children: [
          p ?? V.description,
          " ",
          S && /* @__PURE__ */ e.jsx("a", { href: S, children: M ?? "Privacy policy" })
        ] }),
        m && /* @__PURE__ */ e.jsx("div", { className: "mm-cookie-banner__content", children: m })
      ] })
    ] }),
    fe && /* @__PURE__ */ e.jsx("div", { className: "mm-cookie-banner__preferences", "aria-label": "Cookie preferences", children: n.map((Ne) => /* @__PURE__ */ e.jsx(Qt, { checked: oe.includes(Ne.key), className: "mm-cookie-banner__category", disabled: Ne.required, label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("strong", { children: Ne.label }),
      Ne.description && /* @__PURE__ */ e.jsx("small", { children: Ne.description })
    ] }), onChange: () => G(Ne), size: "sm" }, Ne.key)) }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-cookie-banner__actions", children: o ?? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "mm-cookie-banner__default-actions", children: [
      E && /* @__PURE__ */ e.jsx(Pe, { "aria-label": i ?? V.close, className: "mm-cookie-banner__close", iconOnly: !0, onClick: U, size: "xs", variant: "text", children: "×" }),
      ve && /* @__PURE__ */ e.jsx(Pe, { className: "mm-cookie-banner__button--subtle", onClick: () => de((Ne) => !Ne), size: "sm", variant: "outline", children: fe ? V.closePreferences : g ?? V.manage }),
      fe ? /* @__PURE__ */ e.jsx(Pe, { onClick: () => x ? Z(oe, x) : Z(oe), size: "sm", children: V.save }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(Pe, { className: "mm-cookie-banner__button--subtle", onClick: () => Z(a ? he : [], D), size: "sm", variant: "outline", children: T ?? V.reject }),
        /* @__PURE__ */ e.jsx(Pe, { onClick: () => Z(me, j), size: "sm", children: s ?? V.accept })
      ] })
    ] }) }) })
  ] }) });
}
const en = gt(null);
function jo({ children: t }) {
  const [s, a] = q(null), r = at((i = {}) => new Promise((c) => a({ options: i, resolve: c })), []), n = at(() => a((i) => (i == null || i.resolve({ action: "close", categoryKeys: [] }), null)), []), m = (i, c) => a((p) => (p == null || p.resolve({ action: i, categoryKeys: c }), null)), o = { open: r, close: n };
  return /* @__PURE__ */ e.jsxs(en.Provider, { value: o, children: [
    t,
    s && /* @__PURE__ */ e.jsx(ll, { ...s.options, onAcceptAll: (i) => {
      var c, p;
      (p = (c = s.options).onAcceptAll) == null || p.call(c, i), m("accept", i);
    }, onClose: () => m("close", []), onConsentChange: s.options.onConsentChange, onOpenChange: (i) => {
      i || m("close", []);
    }, onRejectAll: (i) => {
      var c, p;
      (p = (c = s.options).onRejectAll) == null || p.call(c, i), m("reject", i);
    }, onSavePreferences: (i) => {
      var c, p;
      (p = (c = s.options).onSavePreferences) == null || p.call(c, i), m("preferences", i);
    }, open: !0 })
  ] });
}
function wo() {
  const t = vt(en);
  if (!t) throw new Error("useCookieBanner must be used within CookieBannerProvider");
  return t;
}
const la = (...t) => t.filter(Boolean).join(" ");
function No({
  "aria-label": t,
  className: s,
  columns: a,
  currency: r,
  defaultSelectedKey: n,
  fullWidth: m = !0,
  heading: o,
  onSelect: i,
  plans: c,
  renderFeature: p,
  renderPlanAction: l,
  selectedKey: d,
  showFeatureStates: y = !0,
  size: b,
  style: h,
  variant: j
}) {
  const { components: w } = Ge(), z = w.pricingTable, v = a ?? (z == null ? void 0 : z.columns) ?? Math.min(Math.max(c.length, 1), 4), D = b ?? (z == null ? void 0 : z.size) ?? "default", x = j ?? (z == null ? void 0 : z.variant) ?? "cards", _ = d ?? n, u = { "--mm-pricing-columns": Math.max(1, Math.min(v, 6)), ...h }, S = (M) => typeof M == "number" && r ? new Intl.NumberFormat(void 0, { style: "currency", currency: r }).format(M) : M;
  return /* @__PURE__ */ e.jsxs("section", { "aria-label": t, className: la("mm-pricing-table", `mm-pricing-table--${x}`, `mm-pricing-table--${D}`, m && "mm-pricing-table--full-width", s), style: u, children: [
    o && /* @__PURE__ */ e.jsx("div", { className: "mm-pricing-table__heading", children: o }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-pricing-table__grid", children: c.map((M) => /* @__PURE__ */ e.jsxs("article", { "aria-label": typeof M.name == "string" ? M.name : void 0, className: la("mm-pricing-table__plan", M.popular && "mm-pricing-table__plan--popular", _ === M.key && "mm-pricing-table__plan--selected", M.disabled && "mm-pricing-table__plan--disabled"), style: M.accent ? { "--mm-pricing-accent": M.accent } : void 0, children: [
      M.badge && /* @__PURE__ */ e.jsx("div", { className: "mm-pricing-table__badge", children: M.badge }),
      M.icon && /* @__PURE__ */ e.jsx("div", { className: "mm-pricing-table__icon", "aria-hidden": "true", children: M.icon }),
      /* @__PURE__ */ e.jsx("h3", { className: "mm-pricing-table__name", children: M.name }),
      M.description && /* @__PURE__ */ e.jsx("p", { className: "mm-pricing-table__description", children: M.description }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-pricing-table__price", children: [
        S(M.price),
        M.billing && /* @__PURE__ */ e.jsx("span", { className: "mm-pricing-table__billing", children: M.billing })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "mm-pricing-table__action", children: l ? l(M) : M.action ?? /* @__PURE__ */ e.jsx("button", { className: "mm-pricing-table__button", disabled: M.disabled, onClick: () => i == null ? void 0 : i(M), type: "button", children: M.actionLabel ?? "Choose plan" }) }),
      M.features && /* @__PURE__ */ e.jsx("ul", { className: "mm-pricing-table__features", children: M.features.map((g, N) => /* @__PURE__ */ e.jsxs("li", { className: la(!g.included && y && "mm-pricing-table__feature--excluded", g.highlight && "mm-pricing-table__feature--highlight"), title: typeof g.tooltip == "string" ? g.tooltip : void 0, children: [
        y && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-pricing-table__feature-mark", children: g.included === !1 ? "–" : "✓" }),
        /* @__PURE__ */ e.jsx("span", { children: p ? p(g, M) : g.value ?? g.label })
      ] }, g.key ?? `${M.key}-${N}`)) })
    ] }, M.key)) })
  ] });
}
const Ut = (...t) => t.filter(Boolean).join(" "), oa = (t) => typeof t == "number" ? `${t}px` : t, ya = (t) => t == null ? "" : String(t);
function ds(t, s) {
  return typeof s.accessor == "function" ? s.accessor(t) : s.accessor ? t[s.accessor] : t[s.key];
}
function ol(t, s) {
  return t === s ? 0 : t == null ? 1 : s == null ? -1 : typeof t == "number" && typeof s == "number" ? t - s : typeof t == "boolean" && typeof s == "boolean" ? Number(t) - Number(s) : ya(t).localeCompare(ya(s), void 0, { numeric: !0, sensitivity: "base" });
}
function ko({
  data: t,
  columns: s,
  rowKey: a,
  caption: r,
  captionSide: n = "top",
  ariaLabel: m,
  size: o,
  variant: i,
  density: c,
  stickyHeader: p = !1,
  maxHeight: l,
  bordered: d = !1,
  hoverable: y = !0,
  sortable: b = !0,
  multiSort: h = !0,
  defaultSort: j = [],
  sort: w,
  onSortChange: z,
  showToolbar: v = !0,
  toolbar: D,
  selectionMode: x = "none",
  selectedRowKeys: _,
  defaultSelectedRowKeys: u = [],
  onSelectionChange: S,
  onRowClick: M,
  isRowDisabled: g,
  editable: N = !1,
  onCellEdit: f,
  columnOrder: T,
  defaultColumnOrder: B,
  onColumnOrderChange: R,
  resizableColumns: A = !0,
  onColumnResize: F,
  pinning: E,
  defaultPinning: L = {},
  onPinningChange: K,
  pinnedRows: I = {},
  rowClassName: W,
  rowHeight: k = 48,
  virtualize: Y = !1,
  loading: P = !1,
  loadingContent: C = "Loading…",
  emptyContent: V = "No data to display.",
  footer: Q,
  stickyFooter: H = !1,
  renderCell: X,
  className: ce,
  style: se,
  ...te
}) {
  const { components: ve } = Ge(), ge = ve.table, ae = o ?? (ge == null ? void 0 : ge.size) ?? "default", fe = i ?? (ge == null ? void 0 : ge.variant) ?? "plain", de = c ?? (ge == null ? void 0 : ge.density) ?? "comfortable", oe = p || !!(ge != null && ge.stickyHeader), [xe, ie] = q(j), re = w ?? xe, [U, Z] = q(u), G = _ ?? U, me = B ?? s.map((J) => J.key), [he, ze] = q(me), je = T ?? he, [Ne, Re] = q(L), _e = E ?? Ne, [Le, Xe] = q({}), [Ze, lt] = q(null), [ot, dt] = q(0), ue = ke(null), O = mt(() => je.map((J) => s.find((le) => le.key === J)).filter(Boolean), [je, s]), ye = O.filter((J) => (_e.left ?? []).includes(J.key) || J.pin === "left"), De = O.filter((J) => (_e.right ?? []).includes(J.key) || J.pin === "right"), We = O.filter((J) => !ye.includes(J) && !De.includes(J)), et = [...ye, ...We, ...De], Ce = (J, le) => typeof a == "function" ? a(J, le) : a ? J[a] : J.id ?? le, Ye = new Set(G), yt = (J) => !0, Nt = mt(() => {
    const J = t.map((le, Te) => ({ row: le, index: Te, key: Ce(le, Te) })).filter(({ row: le }) => yt());
    return re.length ? [...J].sort((le, Te) => {
      for (const $e of re) {
        const Ae = s.find((Qe) => Qe.key === $e.key);
        if (!Ae) continue;
        const Se = Ae.sort ? Ae.sort(ds(le.row, Ae), ds(Te.row, Ae), le.row, Te.row) : ol(ds(le.row, Ae), ds(Te.row, Ae));
        if (Se) return $e.direction === "asc" ? Se : -Se;
      }
      return le.index - Te.index;
    }) : J;
  }, [t, s, re, O]), zt = Nt.filter(({ key: J }) => (I.top ?? []).includes(J)), St = Nt.filter(({ key: J }) => (I.bottom ?? []).includes(J)), jt = Nt.filter(({ key: J }) => !(I.top ?? []).includes(J) && !(I.bottom ?? []).includes(J)), Fe = [...zt, ...jt, ...St], kt = Fe.filter(({ row: J, index: le }) => !(g != null && g(J, le))), Tt = kt.length > 0 && kt.every(({ key: J }) => Ye.has(J)), Et = Y && l ? jt.slice(Math.max(0, Math.floor(ot / k) - 4), Math.ceil((ot + Number.parseInt(String(l), 10)) / k) + 4) : jt, ee = Y && l ? Math.max(0, Math.floor(ot / k) - 4) : 0, $ = { "--mm-table-max-height": oa(l), "--mm-table-row-height": `${k}px`, ...se }, ne = (J) => {
    var Ae;
    if (!b || ((Ae = s.find((Se) => Se.key === J)) == null ? void 0 : Ae.sortable) === !1) return;
    const le = re.find((Se) => Se.key === J), Te = (le == null ? void 0 : le.direction) === "asc" ? "desc" : (le == null ? void 0 : le.direction) === "desc" ? void 0 : "asc", $e = h ? re.filter((Se) => Se.key !== J) : [];
    Te && $e.push({ key: J, direction: Te }), w || ie($e), z == null || z($e);
  }, be = (J) => {
    const le = [...new Set(J)];
    _ || Z(le), S == null || S(le, Fe.filter(({ key: Te }) => le.includes(Te)).map(({ row: Te }) => Te));
  }, we = (J, le, Te) => {
    if (x === "none" || g != null && g(le, Te)) {
      M == null || M(le, Te);
      return;
    }
    const $e = x === "single" ? Ye.has(J) ? [] : [J] : Ye.has(J) ? G.filter((Ae) => Ae !== J) : [...G, J];
    be($e), M == null || M(le, Te);
  }, Ie = (J, le) => {
    const Te = Le[J.key] ?? (typeof J.width == "number" ? J.width : 160), $e = (Se) => {
      const Qe = Math.max(J.minWidth ?? 72, Math.min(J.maxWidth ?? 640, Te + Se.clientX - le));
      Xe((nt) => ({ ...nt, [J.key]: Qe })), F == null || F(J, Qe);
    }, Ae = () => {
      window.removeEventListener("pointermove", $e), window.removeEventListener("pointerup", Ae);
    };
    window.addEventListener("pointermove", $e), window.addEventListener("pointerup", Ae);
  }, Be = ({ row: J, index: le, key: Te }, $e) => {
    const Ae = !!(g != null && g(J, le));
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("tr", { "aria-selected": x !== "none" ? Ye.has(Te) : void 0, className: Ut("mm-table__row", Ye.has(Te) && "mm-table__row--selected", Ae && "mm-table__row--disabled", y && "mm-table__row--hoverable", W == null ? void 0 : W(J, le)), onClick: () => we(Te, J, le), children: [
      x !== "none" && /* @__PURE__ */ e.jsx("td", { className: "mm-table__selection-cell", onClick: (Se) => Se.stopPropagation(), children: /* @__PURE__ */ e.jsx(Qt, { "aria-label": `Select row ${$e + 1}`, checked: Ye.has(Te), disabled: Ae, onChange: () => we(Te, J, le), onClick: (Se) => Se.stopPropagation() }) }),
      et.map((Se) => {
        const Qe = ds(J, Se), nt = `${String(Te)}:${Se.key}`, Je = { row: J, rowKey: Te, column: Se, value: Qe, rowIndex: le, selected: Ye.has(Te), editing: Ze === nt }, ut = { width: Le[Se.key] ?? oa(Se.width), minWidth: Se.minWidth, maxWidth: Se.maxWidth, textAlign: Se.align, "--mm-table-pin-offset": ye.includes(Se) ? `${ye.slice(0, ye.indexOf(Se)).reduce((Ke, tt) => Ke + (Le[tt.key] ?? (typeof tt.width == "number" ? tt.width : 160)), 0)}px` : De.includes(Se) ? `${De.slice(De.indexOf(Se) + 1).reduce((Ke, tt) => Ke + (Le[tt.key] ?? (typeof tt.width == "number" ? tt.width : 160)), 0)}px` : void 0 }, $t = Je.editing && (N || Se.editable) && Se.editor ? Se.editor(Qe, J, Je) : X ? X(Qe, J, Se, Je) : Se.render ? Se.render(Qe, J, Je) : ya(Qe);
        return /* @__PURE__ */ e.jsx("td", { className: Ut("mm-table__cell", ye.includes(Se) && "mm-table__cell--pinned-left", De.includes(Se) && "mm-table__cell--pinned-right", Se.className), style: ut, onDoubleClick: () => (N || Se.editable) && Se.editor && lt(nt), children: $t }, Se.key);
      })
    ] }, `row-${String(Te)}`) });
  };
  return /* @__PURE__ */ e.jsxs("section", { "aria-label": m, className: Ut("mm-table", `mm-table--${ae}`, `mm-table--${fe}`, `mm-table--${de}`, d && "mm-table--bordered", ce), style: $, ...te, children: [
    r && /* @__PURE__ */ e.jsx("div", { className: Ut("mm-table__caption", `mm-table__caption--${n}`), children: r }),
    v && D && /* @__PURE__ */ e.jsx("div", { className: "mm-table__toolbar", children: D }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-table__scroll", onScroll: (J) => dt(J.currentTarget.scrollTop), ref: ue, children: /* @__PURE__ */ e.jsxs("table", { "aria-label": m, className: "mm-table__native", children: [
      /* @__PURE__ */ e.jsx("thead", { className: oe ? "mm-table__head--sticky" : void 0, children: /* @__PURE__ */ e.jsxs("tr", { children: [
        x !== "none" && /* @__PURE__ */ e.jsx("th", { className: "mm-table__selection-cell", children: /* @__PURE__ */ e.jsx(Qt, { "aria-label": "Select all rows", checked: Tt, indeterminate: !Tt && kt.some(({ key: J }) => Ye.has(J)), onChange: () => be(Tt ? [] : kt.map(({ key: J }) => J)), onClick: (J) => J.stopPropagation() }) }),
        et.map((J) => {
          const le = re.find(($e) => $e.key === J.key), Te = { width: Le[J.key] ?? oa(J.width), minWidth: J.minWidth, maxWidth: J.maxWidth, textAlign: J.align, "--mm-table-pin-offset": ye.includes(J) ? `${ye.slice(0, ye.indexOf(J)).reduce(($e, Ae) => $e + (Le[Ae.key] ?? (typeof Ae.width == "number" ? Ae.width : 160)), 0)}px` : De.includes(J) ? `${De.slice(De.indexOf(J) + 1).reduce(($e, Ae) => $e + (Le[Ae.key] ?? (typeof Ae.width == "number" ? Ae.width : 160)), 0)}px` : void 0 };
          return /* @__PURE__ */ e.jsxs("th", { "aria-sort": le ? le.direction === "asc" ? "ascending" : "descending" : "none", className: Ut("mm-table__header-cell", ye.includes(J) && "mm-table__cell--pinned-left", De.includes(J) && "mm-table__cell--pinned-right", J.headerClassName), style: Te, children: [
            /* @__PURE__ */ e.jsxs("button", { className: "mm-table__sort-button", disabled: !b || J.sortable === !1, onClick: () => ne(J.key), type: "button", children: [
              /* @__PURE__ */ e.jsx("span", { children: J.header }),
              le ? le.direction === "asc" ? /* @__PURE__ */ e.jsx(Vs, { size: 14 }) : /* @__PURE__ */ e.jsx(xt, { size: 14 }) : /* @__PURE__ */ e.jsx("span", { className: "mm-table__sort-placeholder", children: "↕" }),
              h && le && re.length > 1 && /* @__PURE__ */ e.jsx("sup", { children: re.findIndex(($e) => $e.key === J.key) + 1 })
            ] }),
            A && J.resizable !== !1 && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-table__resize-handle", onPointerDown: ($e) => {
              $e.preventDefault(), Ie(J, $e.clientX);
            } })
          ] }, J.key);
        })
      ] }) }),
      /* @__PURE__ */ e.jsx("tbody", { children: P ? /* @__PURE__ */ e.jsx("tr", { children: /* @__PURE__ */ e.jsx("td", { className: "mm-table__state", colSpan: et.length + (x !== "none" ? 1 : 0), children: C }) }) : Fe.length ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        Y && ee > 0 && /* @__PURE__ */ e.jsx("tr", { "aria-hidden": "true", className: "mm-table__spacer", children: /* @__PURE__ */ e.jsx("td", { colSpan: et.length + (x !== "none" ? 1 : 0), style: { height: ee * k } }) }),
        zt.map((J, le) => Be(J, le)),
        Et.map((J, le) => Be(J, ee + le + zt.length)),
        Y && ee + Et.length < jt.length && /* @__PURE__ */ e.jsx("tr", { "aria-hidden": "true", className: "mm-table__spacer", children: /* @__PURE__ */ e.jsx("td", { colSpan: et.length + (x !== "none" ? 1 : 0), style: { height: (jt.length - ee - Et.length) * k } }) }),
        St.map((J, le) => Be(J, Fe.length - St.length + le))
      ] }) : /* @__PURE__ */ e.jsx("tr", { children: /* @__PURE__ */ e.jsx("td", { className: "mm-table__state", colSpan: et.length + (x !== "none" ? 1 : 0), children: V }) }) })
    ] }) }),
    Q && /* @__PURE__ */ e.jsx("div", { className: Ut("mm-table__footer", H && "mm-table__footer--sticky"), children: Q })
  ] });
}
const cl = {
  en: { description: "There is no information to display here yet.", title: "Nothing here yet" },
  uk: { description: "Тут поки що немає інформації для відображення.", title: "Тут поки що нічого немає" },
  de: { description: "Hier gibt es noch keine Informationen anzuzeigen.", title: "Noch nichts vorhanden" },
  fr: { description: "Aucune information à afficher pour le moment.", title: "Rien ici pour le moment" }
}, ml = (...t) => t.filter(Boolean).join(" ");
function $o({
  "aria-label": t,
  actions: s,
  bordered: a,
  children: r,
  className: n,
  content: m,
  description: o,
  fullWidth: i = !1,
  image: c,
  imageContent: p,
  imageAlt: l = "",
  imageSrc: d = "/empty/empty-state-illustration.png",
  locale: y,
  size: b,
  subtitle: h,
  title: j
}) {
  const { components: w, locale: z } = Ge(), v = w.empty, D = a ?? (v == null ? void 0 : v.bordered) ?? !0, x = b ?? (v == null ? void 0 : v.size) ?? "default", _ = cl[y ?? z], u = m ?? r;
  return /* @__PURE__ */ e.jsx("section", { "aria-label": t, className: ml("mm-empty", `mm-empty--${x}`, D && "mm-empty--bordered", i && "mm-empty--full-width", n), children: /* @__PURE__ */ e.jsxs("div", { className: "mm-empty__inner", children: [
    p ?? c ?? /* @__PURE__ */ e.jsx("img", { alt: l, className: "mm-empty__image", src: d }),
    h && /* @__PURE__ */ e.jsx("div", { className: "mm-empty__subtitle", children: h }),
    /* @__PURE__ */ e.jsx("h2", { className: "mm-empty__title", children: j ?? _.title }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-empty__description", children: o ?? _.description }),
    u && /* @__PURE__ */ e.jsx("div", { className: "mm-empty__content", children: u }),
    s && /* @__PURE__ */ e.jsx("div", { className: "mm-empty__actions", children: s })
  ] }) });
}
const us = (...t) => t.filter(Boolean).join(" ");
function Mo({
  "aria-label": t,
  actions: s,
  actionsAlign: a = "end",
  animation: r = "slide",
  children: n,
  className: m,
  closeButton: o = !0,
  closeOnEscape: i = !0,
  closeOnOverlayClick: c = !0,
  defaultOpen: p = !1,
  description: l,
  footer: d,
  footerAside: y,
  header: b,
  id: h,
  modal: j = !0,
  onClose: w,
  onOpenChange: z,
  open: v,
  placement: D = "right",
  showActions: x = !1,
  size: _ = "default",
  title: u,
  titleIcon: S
}) {
  const M = He(), g = h ?? `mm-drawer-${M}`, N = `${g}-title`, f = `${g}-description`, T = v !== void 0, [B, R] = q(p), A = T ? v : B, F = ke(null), E = ke(null), L = (C) => {
    T || R(C), z == null || z(C), w == null || w();
  }, K = () => L(!1), I = s ?? (x ? {} : void 0), W = (I == null ? void 0 : I.order) ?? ["cancel", "confirm"], k = (I == null ? void 0 : I.align) ?? a, Y = () => {
    if (!I) return null;
    const C = I.cancel === !1 ? void 0 : I.cancel ?? {}, V = I.confirm === !1 ? void 0 : I.confirm ?? {}, Q = { cancel: C, confirm: V };
    return /* @__PURE__ */ e.jsx("div", { className: us("mm-drawer__actions", `mm-drawer__actions--${k}`), children: W.map((H) => {
      const X = Q[H];
      if (!X) return null;
      const ce = H === "cancel";
      return /* @__PURE__ */ e.jsx(
        Pe,
        {
          "aria-label": X["aria-label"],
          disabled: X.disabled,
          iconLeft: X.icon,
          loading: X.loading,
          loadingLabel: X.loadingLabel,
          onClick: (se) => X.onClick ? X.onClick(se) : K(),
          size: X.size ?? (_ === "sm" ? "sm" : void 0),
          type: X.type ?? "button",
          variant: X.variant ?? (ce ? "outline" : "primary"),
          children: X.label ?? (ce ? "Cancel" : "OK")
        },
        H
      );
    }) });
  };
  if (Me(() => {
    if (!A) return;
    E.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const C = requestAnimationFrame(() => {
      var Q;
      return (Q = F.current) == null ? void 0 : Q.focus({ preventScroll: !0 });
    }), V = document.body.style.overflow;
    return j && (document.body.style.overflow = "hidden"), () => {
      cancelAnimationFrame(C), j && (document.body.style.overflow = V), requestAnimationFrame(() => {
        var Q;
        return (Q = E.current) == null ? void 0 : Q.focus({ preventScroll: !0 });
      });
    };
  }, [A, j]), Me(() => {
    if (!A || !j) return;
    const C = (V) => {
      if (V.key === "Escape" && i) {
        V.preventDefault(), K();
        return;
      }
      if (V.key !== "Tab" || !F.current) return;
      const Q = Array.from(F.current.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (Q.length === 0) {
        V.preventDefault(), F.current.focus();
        return;
      }
      const H = Q[0], X = Q[Q.length - 1];
      V.shiftKey && document.activeElement === H ? (V.preventDefault(), X.focus()) : !V.shiftKey && document.activeElement === X && (V.preventDefault(), H.focus());
    };
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, [i, A, j]), !A || typeof document > "u") return null;
  const P = (C) => {
    C.key === "Escape" && i && !j && (C.preventDefault(), K());
  };
  return vs(
    /* @__PURE__ */ e.jsxs("div", { className: us("mm-drawer-layer", j && "mm-drawer-layer--modal", `mm-drawer-layer--${D}`), children: [
      j && /* @__PURE__ */ e.jsx("button", { "aria-label": "Close drawer", className: "mm-drawer-backdrop", onClick: c ? K : void 0, tabIndex: -1, type: "button" }),
      /* @__PURE__ */ e.jsxs(
        "div",
        {
          "aria-describedby": l ? f : void 0,
          "aria-label": t,
          "aria-labelledby": b === void 0 && u ? N : void 0,
          "aria-modal": j || void 0,
          className: us("mm-drawer", `mm-drawer--${D}`, `mm-drawer--${_}`, `mm-drawer--animation-${r}`, m),
          onKeyDown: P,
          ref: F,
          role: "dialog",
          tabIndex: -1,
          children: [
            b !== void 0 ? /* @__PURE__ */ e.jsx("div", { className: "mm-drawer__header mm-drawer__header--custom", children: b }) : (u || l || o) && /* @__PURE__ */ e.jsxs("div", { className: "mm-drawer__header", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "mm-drawer__heading", children: [
                u && /* @__PURE__ */ e.jsxs("div", { className: "mm-drawer__title-row", children: [
                  S && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-drawer__title-icon", children: S }),
                  /* @__PURE__ */ e.jsx("h2", { className: "mm-drawer__title", id: N, children: u })
                ] }),
                l && /* @__PURE__ */ e.jsx("p", { className: "mm-drawer__description", id: f, children: l })
              ] }),
              o && /* @__PURE__ */ e.jsx("button", { "aria-label": "Close drawer", className: "mm-drawer__close", onClick: K, type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 18 }) })
            ] }),
            /* @__PURE__ */ e.jsx("div", { className: "mm-drawer__content", children: n }),
            (d || I) && /* @__PURE__ */ e.jsx("div", { className: us("mm-drawer__footer", d ? "mm-drawer__footer--custom" : !1), children: d ?? /* @__PURE__ */ e.jsx("div", { className: us("mm-drawer__footer-layout", k === "start" && "mm-drawer__footer-layout--actions-start"), children: k === "start" ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              Y(),
              y && /* @__PURE__ */ e.jsx("div", { className: "mm-drawer__footer-aside", children: y })
            ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              y && /* @__PURE__ */ e.jsx("div", { className: "mm-drawer__footer-aside", children: y }),
              Y()
            ] }) }) })
          ]
        }
      )
    ] }),
    document.body
  );
}
const dl = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=", ca = (...t) => t.filter(Boolean).join(" ");
function Za(t) {
  var s;
  if ((s = globalThis.crypto) != null && s.getRandomValues) {
    const a = Math.floor(4294967295 / t) * t, r = new Uint32Array(1);
    try {
      do
        globalThis.crypto.getRandomValues(r);
      while (r[0] >= a);
      return r[0] % t;
    } catch {
    }
  }
  return Math.floor(Math.random() * t);
}
function ul(t = {}) {
  var m;
  const s = (m = t.charset) != null && m.length ? t.charset : dl, a = Math.max(1, Math.floor(Number.isFinite(t.minLength) ? t.minLength : 16)), r = Math.max(a, Math.floor(Number.isFinite(t.maxLength) ? t.maxLength : 24)), n = a + Za(r - a + 1);
  return Array.from({ length: n }, () => s[Za(s.length)]).join("");
}
function fl(t) {
  if (!t) return { label: "empty", score: 0 };
  let s = 0;
  return t.length >= 8 && (s += 1), t.length >= 12 && (s += 1), /[a-z]/.test(t) && /[A-Z]/.test(t) && (s += 1), /\d/.test(t) && (s += 1), /[^A-Za-z0-9]/.test(t) && (s += 1), { label: s <= 1 ? "weak" : s === 2 ? "fair" : s === 3 ? "good" : "strong", score: s };
}
function zo({
  "aria-describedby": t,
  className: s,
  defaultValue: a,
  disabled: r = !1,
  generateButton: n = !1,
  generatorOptions: m,
  id: o,
  loading: i = !1,
  onChange: c,
  onClear: p,
  onGenerate: l,
  readOnly: d = !1,
  requirements: y,
  showStrength: b = !1,
  value: h,
  ...j
}) {
  const w = He(), z = o ?? `mm-input-password-${w}`, [v, D] = q(a === void 0 ? "" : String(a)), [x, _] = q(!1), u = h === void 0 ? v : String(h), S = j.minLength, M = [
    ...S !== void 0 && !(y != null && y.some((E) => E.id === "minLength")) ? [{ id: "minLength", label: `At least ${S} characters`, test: (E) => E.length >= S }] : [],
    ...y ?? []
  ], g = b ? `${z}-strength` : void 0, N = M.length > 0 ? `${z}-requirements` : void 0, f = [t, g, N].filter(Boolean).join(" ") || void 0, T = fl(u), B = n && !r && !i && !d, R = (E) => {
    h === void 0 && D(E.target.value), c == null || c(E);
  }, A = () => {
    h === void 0 && D(""), p == null || p();
  }, F = () => {
    if (!B) return;
    const E = ul(m);
    h === void 0 && D(E), l == null || l(E);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: ca("mm-input-password-field", j.fullWidth && "mm-input-password-field--full-width", s), children: [
    /* @__PURE__ */ e.jsx(
      Ps,
      {
        ...j,
        "aria-describedby": f,
        clearable: j.clearable,
        defaultValue: void 0,
        disabled: r,
        fullWidth: j.fullWidth,
        id: z,
        loading: i,
        onChange: R,
        onClear: A,
        readOnly: d,
        type: x ? "text" : "password",
        trailingActions: /* @__PURE__ */ e.jsxs("span", { className: "mm-input-password__actions", children: [
          n && /* @__PURE__ */ e.jsx("button", { "aria-label": "Generate password", className: "mm-input-password__action", disabled: !B, onClick: F, title: "Generate password", type: "button", children: /* @__PURE__ */ e.jsx(_n, { "aria-hidden": "true", size: 16 }) }),
          /* @__PURE__ */ e.jsx("button", { "aria-label": x ? "Hide password" : "Show password", "aria-pressed": x, className: "mm-input-password__action", disabled: r || i, onClick: () => _((E) => !E), title: x ? "Hide password" : "Show password", type: "button", children: x ? /* @__PURE__ */ e.jsx(gn, { "aria-hidden": "true", size: 16 }) : /* @__PURE__ */ e.jsx(vn, { "aria-hidden": "true", size: 16 }) })
        ] }),
        value: u
      }
    ),
    b && /* @__PURE__ */ e.jsxs("div", { "aria-live": "polite", className: "mm-input-password__strength", id: g, children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        "Password strength: ",
        T.label
      ] }),
      /* @__PURE__ */ e.jsx("span", { "aria-label": `Password strength: ${T.label}`, "aria-valuemax": 5, "aria-valuemin": 0, "aria-valuenow": T.score, className: "mm-input-password__strength-meter", role: "progressbar", children: Array.from({ length: 5 }, (E, L) => /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: ca("mm-input-password__strength-bar", L < T.score && `mm-input-password__strength-bar--${T.label}`) }, L)) })
    ] }),
    M.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "mm-input-password__requirements", id: N, children: M.map((E, L) => {
      const K = E.test(u);
      return /* @__PURE__ */ e.jsxs("li", { className: ca(K && "mm-input-password__requirement--met"), children: [
        /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-password__requirement-mark", children: K ? "✓" : "○" }),
        /* @__PURE__ */ e.jsx("span", { children: E.label })
      ] }, E.id ?? L);
    }) })
  ] });
}
const ma = (...t) => t.filter(Boolean).join(" ");
function So({
  children: t,
  className: s,
  description: a,
  disabled: r = !1,
  error: n,
  leadingIcon: m,
  optional: o = !1,
  optionalLabel: i = "(optional)",
  required: c = !1,
  requiredIndicator: p = "*",
  size: l = "default",
  tone: d = "default",
  truncate: y = !1,
  visuallyHidden: b = !1,
  weight: h = "medium",
  ...j
}) {
  const w = n ?? a;
  return /* @__PURE__ */ e.jsxs(
    "label",
    {
      ...j,
      className: ma(
        "mm-label-field",
        `mm-label-field--${l}`,
        `mm-label-field--${d}`,
        `mm-label-field--${h}`,
        r && "mm-label-field--disabled",
        b && "mm-label-field--visually-hidden",
        s
      ),
      children: [
        /* @__PURE__ */ e.jsxs("span", { className: ma("mm-label-field__content", y && "mm-label-field__content--truncate"), children: [
          m && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-label-field__icon", children: m }),
          /* @__PURE__ */ e.jsx("span", { className: "mm-label-field__text", children: t }),
          c && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-label-field__required", children: p }),
          !c && o && /* @__PURE__ */ e.jsx("span", { className: "mm-label-field__optional", children: i })
        ] }),
        w && /* @__PURE__ */ e.jsx("span", { className: ma("mm-label-field__detail", !!n && "mm-label-field__detail--error"), children: w })
      ]
    }
  );
}
const Qa = (...t) => t.filter(Boolean).join(" ");
function hl(t) {
  return Math.min(12, Math.max(1, Math.floor(t) || 6));
}
function To({
  "aria-describedby": t,
  "aria-label": s,
  autoFocus: a = !1,
  className: r,
  defaultValue: n = "",
  description: m,
  disabled: o = !1,
  error: i,
  fullWidth: c = !1,
  id: p,
  inputMode: l = "numeric",
  label: d,
  length: y = 6,
  mask: b,
  name: h,
  onChange: j,
  onComplete: w,
  onPaste: z,
  pattern: v,
  placeholder: D,
  readOnly: x = !1,
  selectOnFocus: _ = !0,
  separator: u,
  size: S = "default",
  validateChar: M,
  value: g,
  variant: N = "outline"
}) {
  const f = hl(y), T = He(), B = p ?? `mm-input-otp-${T}`, R = ke([]), A = g !== void 0, [F, E] = q(n), L = A ? g : F, K = Array.from({ length: f }, (se, te) => L[te] ?? ""), I = m ? `${B}-description` : void 0, W = i ? `${B}-error` : void 0, k = [t, I, W].filter(Boolean).join(" ") || void 0;
  Me(() => {
    R.current = R.current.slice(0, f);
  }, [f]);
  const Y = (se) => !(M && !M(se) || l === "numeric" && !/^\d$/.test(se) || v && !new RegExp(`^(?:${v})$`).test(se)), P = (se) => Array.from(se).filter(Y).slice(0, f), C = (se, te) => {
    const ve = se.join("").slice(0, f);
    A || E(ve), j == null || j(ve), ve.length === f && ve !== L && (w == null || w(ve)), te !== void 0 && !o && !x && requestAnimationFrame(() => {
      var ge;
      return (ge = R.current[te]) == null ? void 0 : ge.focus();
    });
  }, V = (se, te) => {
    const ve = P(te);
    if (ve.length === 0) {
      const fe = [...K];
      fe[se] = "", C(fe);
      return;
    }
    const ge = [...K];
    ve.forEach((fe, de) => {
      se + de < f && (ge[se + de] = fe);
    });
    const ae = Math.min(se + ve.length, f - 1);
    C(ge, ae);
  }, Q = (se, te) => V(se, te.slice(-1)), H = (se, te) => {
    var ve, ge;
    if (te.key === "Backspace" && !K[se] && se > 0) {
      te.preventDefault();
      const ae = [...K];
      ae[se - 1] = "", C(ae, se - 1);
    } else te.key === "ArrowLeft" && se > 0 ? (te.preventDefault(), (ve = R.current[se - 1]) == null || ve.focus()) : te.key === "ArrowRight" && se < f - 1 && (te.preventDefault(), (ge = R.current[se + 1]) == null || ge.focus());
  }, X = (se, te) => {
    if (o || x) return;
    te.preventDefault();
    const ve = te.clipboardData.getData("text"), ge = P(ve);
    z == null || z(ge.join("")), V(se, ve);
  }, ce = (se) => {
    _ && se.select();
  };
  return /* @__PURE__ */ e.jsxs("div", { className: Qa("mm-input-otp-field", c && "mm-input-otp-field--full-width", r), children: [
    d && /* @__PURE__ */ e.jsx("label", { className: "mm-input-otp-field__label", htmlFor: `${B}-0`, children: d }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        "aria-describedby": k,
        "aria-label": s ?? (typeof d == "string" ? d : "One-time password"),
        className: Qa("mm-input-otp", `mm-input-otp--${S}`, `mm-input-otp--${N}`, i && "mm-input-otp--error", o && "mm-input-otp--disabled", x && "mm-input-otp--readonly"),
        role: "group",
        children: K.map((se, te) => /* @__PURE__ */ e.jsxs(Ma, { children: [
          /* @__PURE__ */ e.jsx("span", { className: "mm-input-otp__unit", children: /* @__PURE__ */ e.jsx(
            "input",
            {
              "aria-invalid": !!i,
              "aria-label": `Character ${te + 1} of ${f}`,
              autoComplete: te === 0 ? "one-time-code" : "off",
              autoFocus: a && te === 0,
              className: "mm-input-otp__control",
              disabled: o,
              id: `${B}-${te}`,
              inputMode: l,
              maxLength: 1,
              onChange: (ve) => Q(te, ve.target.value),
              onFocus: (ve) => ce(ve.currentTarget),
              onKeyDown: (ve) => H(te, ve),
              onPaste: (ve) => X(te, ve),
              placeholder: D,
              readOnly: x,
              ref: (ve) => {
                R.current[te] = ve;
              },
              type: b ? "password" : "text",
              value: b && se ? b : se
            }
          ) }),
          u && te === Math.ceil(f / 2) - 1 && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-otp__separator", children: u })
        ] }, te))
      }
    ),
    h && /* @__PURE__ */ e.jsx("input", { name: h, type: "hidden", value: L }),
    m && /* @__PURE__ */ e.jsx("p", { className: "mm-input-otp-field__description", id: I, children: m }),
    i && /* @__PURE__ */ e.jsx("p", { className: "mm-input-otp-field__error", id: W, children: i })
  ] });
}
const pl = {
  phone: { mask: "(999) 999-9999", inputMode: "tel", placeholder: "(555) 123-4567" },
  internationalPhone: { mask: "+99 999 999 9999", inputMode: "tel", placeholder: "+38 067 123 4567" },
  date: { mask: "99/99/9999", inputMode: "numeric", placeholder: "DD/MM/YYYY" },
  time: { mask: "99:99", inputMode: "numeric", placeholder: "HH:MM" },
  dateTime: { mask: "99/99/9999 99:99", inputMode: "numeric", placeholder: "DD/MM/YYYY HH:MM" },
  creditCard: { mask: "9999 9999 9999 9999", inputMode: "numeric", placeholder: "0000 0000 0000 0000" },
  expiry: { mask: "99/99", inputMode: "numeric", placeholder: "MM/YY" },
  cvv: { mask: "999", inputMode: "numeric", placeholder: "CVV" },
  postalCode: { mask: "AA9 9AA", inputMode: "text", placeholder: "SW1A 1AA" },
  zipCode: { mask: "99999-9999", inputMode: "numeric", placeholder: "12345-6789" },
  iban: { mask: "AA99 9999 9999 9999 9999 9999", inputMode: "text", placeholder: "UA00 0000 0000 0000 0000 0000" },
  sortCode: { mask: "99-99-99", inputMode: "numeric", placeholder: "20-00-00" },
  routingNumber: { mask: "999999999", inputMode: "numeric", placeholder: "021000021" },
  otp: { mask: "999999", inputMode: "numeric", placeholder: "000000" },
  hexColor: { mask: "HAAAAAA", inputMode: "text", placeholder: "#FFFFFF", formatChars: { H: /#/ } },
  ipv4: { mask: "999.999.999.999", inputMode: "numeric", placeholder: "192.168.001.001" },
  slug: { mask: "********************", inputMode: "text", placeholder: "my-project-slug" },
  licensePlate: { mask: "AA-9999-AA", inputMode: "text", placeholder: "AA-1234-AA" }
}, xl = { 9: /[0-9]/, A: /[a-zA-Z]/, "*": /[a-zA-Z0-9]/, "#": /[0-9a-fA-F]/ }, er = (...t) => t.filter(Boolean).join(" ");
function Xs(t, s) {
  return !!s[t];
}
function Ls(t, s, a, r, n) {
  const m = t.split("");
  let o = 0, i = "";
  for (let c = 0; c < s.length; c += 1) {
    const p = s[c];
    if (!Xs(p, a)) {
      o < m.length && m[o] === p && (o += 1), (n || o < m.length) && (i += p);
      continue;
    }
    const l = m.slice(o).findIndex((d) => a[p].test(d));
    if (l < 0) {
      n && (i += r);
      continue;
    }
    i += m[o + l], o += l + 1;
  }
  return i;
}
function Jt(t, s, a) {
  var m;
  let r = "", n = 0;
  for (const o of t) {
    for (; n < s.length && !Xs(s[n], a); ) {
      if (s[n] === o) {
        n += 1;
        break;
      }
      n += 1;
    }
    if (n >= s.length) break;
    (m = a[s[n]]) != null && m.test(o) && (r += o, n += 1);
  }
  return r;
}
function bl(t, s, a) {
  return s.split("").filter((r) => Xs(r, a)).length === Jt(t, s, a).length;
}
function _l(t, s, a, r) {
  let n = 0, m = 0;
  for (const o of s) {
    if (!Xs(o, a)) {
      m < Ls(t, s, a, "_", !1).length && (m += 1);
      continue;
    }
    if (n >= r) return m;
    n < t.length && (n += 1, m += 1);
  }
  return m;
}
function Eo({ "aria-label": t, label: s, mask: a, preset: r, value: n, defaultValue: m = "", onChange: o, onComplete: i, onValidityChange: c, formatChars: p, maskPlaceholder: l, showMask: d = !1, guide: y, placeholder: b, description: h, helperText: j, error: w, disabled: z = !1, readOnly: v = !1, required: D = !1, clearable: x = !1, size: _ = "default", variant: u = "outline", fullWidth: S = !1, leadingIcon: M, onTrailingIconClick: g, prefix: N, suffix: f, trailingIconLabel: T = "Input action", trailingIcon: B, loading: R = !1, inputMode: A, autoComplete: F, name: E, id: L, className: K, style: I, onFocus: W, onBlur: k, ...Y }) {
  const P = He().replace(/:/g, ""), C = L ?? `mm-input-mask-${P}`, V = typeof r == "string" ? pl[r] : r, Q = (V == null ? void 0 : V.mask) ?? a ?? "", H = { ...xl, ...V == null ? void 0 : V.formatChars, ...p }, X = l ?? (V == null ? void 0 : V.maskPlaceholder) ?? "_", ce = y ?? (V == null ? void 0 : V.guide) ?? !1, se = A ?? (V == null ? void 0 : V.inputMode), te = b ?? (V == null ? void 0 : V.placeholder), [ve, ge] = q(() => Ls(m, Q, H, X, ce || d)), fe = Ls(n === void 0 ? ve : n, Q, H, X, ce || d), de = ke(null), [oe, xe] = q(!1), ie = w || (oe && D && !Jt(fe, Q, H) ? "This field is required." : void 0), re = [h ? `${C}-description` : void 0, ie ? `${C}-error` : void 0].filter(Boolean).join(" ") || void 0, U = (je, Ne) => {
    const Re = Ls(je, Q, H, X, ce || d), _e = bl(Re, Q, H);
    n === void 0 && ge(Re), o == null || o(Re, je), c == null || c(_e), _e && (i == null || i(Re, je)), Ne !== void 0 && window.requestAnimationFrame(() => {
      var Xe;
      const Le = _l(je, Q, H, Ne);
      (Xe = de.current) == null || Xe.setSelectionRange(Le, Le);
    });
  }, Z = (je) => {
    const Ne = je.target.selectionStart ?? je.target.value.length, Re = Jt(je.target.value, Q, H), _e = Jt(je.target.value.slice(0, Ne), Q, H);
    U(Re, _e.length);
  }, G = (je) => {
    var lt;
    if ((lt = Y.onKeyDown) == null || lt.call(Y, je), je.defaultPrevented || je.key !== "Backspace" && je.key !== "Delete") return;
    const Ne = je.currentTarget, Re = Ne.selectionStart ?? 0, _e = Ne.selectionEnd ?? Re;
    if (Re !== _e) return;
    const Le = Jt(Ne.value, Q, H), Xe = Jt(Ne.value.slice(0, Re), Q, H), Ze = je.key === "Backspace" ? Xe.length - 1 : Xe.length;
    Ze < 0 || Ze >= Le.length || (je.preventDefault(), U(`${Le.slice(0, Ze)}${Le.slice(Ze + 1)}`, Ze));
  }, me = x && fe.length > 0 && !z && !R && !v, he = !!(M || N), ze = !!(f || B || me || R || v);
  return /* @__PURE__ */ e.jsxs("div", { className: er("mm-input-field", "mm-input-mask-field", S && "mm-input-field--full-width", K), style: I, children: [
    s && /* @__PURE__ */ e.jsxs("label", { className: "mm-input-field__label", htmlFor: C, children: [
      s,
      D && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: " *" })
    ] }),
    h && /* @__PURE__ */ e.jsx("p", { className: "mm-input-field__description", id: `${C}-description`, children: h }),
    /* @__PURE__ */ e.jsxs("span", { className: er("mm-input", `mm-input--${_}`, `mm-input--${u}`, !!ie && "mm-input--error", he && "mm-input--has-leading-icon", ze && "mm-input--has-trailing-icon", R && "mm-input--loading", z && "mm-input--disabled", v && "mm-input--readonly"), children: [
      M && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__icon mm-input__icon--leading", children: M }),
      N && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__adornment mm-input__adornment--prefix", children: N }),
      /* @__PURE__ */ e.jsx("input", { ...Y, "aria-describedby": re, "aria-invalid": !!ie, "aria-label": s ? void 0 : t, "aria-required": D || void 0, autoComplete: F, className: "mm-input__control", disabled: z || R, id: C, inputMode: se, name: E, onBlur: (je) => {
        xe(!0), k == null || k(je);
      }, onChange: Z, onFocus: W, onKeyDown: G, placeholder: te ?? (d ? void 0 : Q), readOnly: v, ref: de, required: D, type: "text", value: fe }),
      R && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-input__loader", role: "status" }),
      f && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__adornment mm-input__adornment--suffix", children: f }),
      me && /* @__PURE__ */ e.jsx("button", { "aria-label": "Clear input", className: "mm-input__action", onClick: () => {
        n === void 0 && ge(""), o == null || o("", ""), c == null || c(!1);
      }, type: "button", children: "×" }),
      v && /* @__PURE__ */ e.jsx("span", { "aria-label": "Read-only", className: "mm-input__icon mm-input__icon--trailing", role: "img", children: "⌁" }),
      !me && !v && B && (g ? /* @__PURE__ */ e.jsx("button", { "aria-label": T, className: "mm-input__icon mm-input__icon--trailing mm-input__icon--interactive", onClick: g, type: "button", children: B }) : /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input__icon mm-input__icon--trailing mm-input__icon--interactive", children: B }))
    ] }),
    ie ? /* @__PURE__ */ e.jsx("div", { className: "mm-input-field__error", id: `${C}-error`, role: "alert", children: ie }) : j && /* @__PURE__ */ e.jsx("div", { className: "mm-input-field__description", children: j })
  ] });
}
const vl = {
  en: { pagination: "Pagination", page: "Page", pageNumber: "Page number", firstPage: "First page", previousPage: "Previous page", nextPage: "Next page", lastPage: "Last page", showPreviousPages: "Show previous pages", showNextPages: "Show next pages", goTo: "Go to", go: "Go" },
  uk: { pagination: "Пагінація", page: "Сторінка", pageNumber: "Номер сторінки", firstPage: "Перша сторінка", previousPage: "Попередня сторінка", nextPage: "Наступна сторінка", lastPage: "Остання сторінка", showPreviousPages: "Показати попередні сторінки", showNextPages: "Показати наступні сторінки", goTo: "Перейти до", go: "Перейти" },
  de: { pagination: "Seitennavigation", page: "Seite", pageNumber: "Seitennummer", firstPage: "Erste Seite", previousPage: "Vorherige Seite", nextPage: "Nächste Seite", lastPage: "Letzte Seite", showPreviousPages: "Vorherige Seiten anzeigen", showNextPages: "Nächste Seiten anzeigen", goTo: "Gehe zu", go: "Los" },
  fr: { pagination: "Pagination", page: "Page", pageNumber: "Numéro de page", firstPage: "Première page", previousPage: "Page précédente", nextPage: "Page suivante", lastPage: "Dernière page", showPreviousPages: "Afficher les pages précédentes", showNextPages: "Afficher les pages suivantes", goTo: "Aller à", go: "Aller" }
}, tr = (...t) => t.filter(Boolean).join(" ");
function gl(t, s, a, r) {
  const n = r * 2 + a * 2 + 3;
  if (t <= n) return Array.from({ length: t }, (l, d) => d + 1);
  const m = Array.from({ length: r }, (l, d) => d + 1), o = Array.from({ length: r }, (l, d) => t - r + d + 1), i = Math.max(r + 2, s - a), c = Math.min(t - r - 1, s + a), p = [...m];
  i > r + 2 ? p.push("ellipsis-start") : r + 1 < i && p.push(r + 1);
  for (let l = i; l <= c; l += 1) p.push(l);
  return c < t - r - 1 ? p.push("ellipsis-end") : c < t - r && p.push(t - r), p.push(...o), p;
}
function Do({
  "aria-label": t,
  boundaryCount: s = 1,
  className: a,
  compact: r = !1,
  current: n,
  defaultCurrent: m = 1,
  disabled: o = !1,
  fullWidth: i = !1,
  firstLabel: c = /* @__PURE__ */ e.jsx(Rs, { "aria-hidden": "true", size: 16 }),
  firstLast: p = !0,
  hideOnSinglePage: l = !1,
  loading: d = !1,
  lastLabel: y = /* @__PURE__ */ e.jsx(Cs, { "aria-hidden": "true", size: 16 }),
  mode: b = "pages",
  locale: h,
  nextLabel: j = /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 16 }),
  onChange: w,
  pageInfo: z,
  pageSize: v,
  previousLabel: D = /* @__PURE__ */ e.jsx(Kt, { "aria-hidden": "true", size: 16 }),
  renderItem: x,
  showPageInfo: _ = !1,
  showQuickJumper: u = !1,
  siblingCount: S = 1,
  size: M = "default",
  totalItems: g,
  totalPages: N,
  variant: f = "default"
}) {
  const { locale: T } = Ge(), R = vl[h ?? T], [A, F] = q(m), [E, L] = q(n), K = He().replace(/:/g, ""), I = Math.max(1, n ?? A), k = Math.max(1, N ?? Math.ceil((g ?? 0) / (v ?? 10))), Y = Math.min(I, k), P = mt(() => gl(k, Y, Math.max(0, S), Math.max(1, s)), [s, Y, S, k]);
  if (Me(() => {
    n !== void 0 && L(Y);
  }, [n, Y]), l && k <= 1) return null;
  const C = (H) => {
    o || d || H < 1 || H > k || H === Y || n === void 0 && F(H);
  }, V = () => {
    E !== void 0 && C(E), L(void 0);
  }, Q = (H) => {
    if (typeof H != "number") return /* @__PURE__ */ e.jsx("button", { "aria-label": H === "ellipsis-start" ? R.showPreviousPages : R.showNextPages, className: "mm-pagination__ellipsis", onClick: () => C(H === "ellipsis-start" ? Math.max(1, Y - S * 2 - 1) : Math.min(k, Y + S * 2 + 1)), type: "button", children: /* @__PURE__ */ e.jsx(Dr, { "aria-hidden": "true", size: 16 }) });
    const X = H === Y;
    return x ? x(H, X) : /* @__PURE__ */ e.jsx("button", { "aria-current": X ? "page" : void 0, "aria-label": `${R.page} ${H}`, className: tr("mm-pagination__page", X && "mm-pagination__page--active"), onClick: () => C(H), type: "button", children: H });
  };
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t ?? R.pagination, className: tr("mm-pagination", `mm-pagination--${M}`, `mm-pagination--${f}`, r && "mm-pagination--compact", i && "mm-pagination--full-width", i && _ && u && "mm-pagination--full-width-three", (o || d) && "mm-pagination--disabled", a), children: [
    _ && /* @__PURE__ */ e.jsx("span", { className: "mm-pagination__info", children: z ?? `Page ${Y} of ${k}` }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-pagination__controls", children: [
      p && /* @__PURE__ */ e.jsx("button", { "aria-label": R.firstPage, className: "mm-pagination__control", disabled: o || d || Y === 1, onClick: () => C(1), type: "button", children: c }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": R.previousPage, className: "mm-pagination__control", disabled: o || d || Y === 1, onClick: () => C(Y - 1), type: "button", children: D }),
      b === "pages" && /* @__PURE__ */ e.jsx("div", { className: "mm-pagination__pages", children: P.map((H, X) => /* @__PURE__ */ e.jsx("span", { className: "mm-pagination__item", children: Q(H) }, `${H}-${X}`)) }),
      /* @__PURE__ */ e.jsx("button", { "aria-label": R.nextPage, className: "mm-pagination__control", disabled: o || d || Y === k, onClick: () => C(Y + 1), type: "button", children: j }),
      p && /* @__PURE__ */ e.jsx("button", { "aria-label": R.lastPage, className: "mm-pagination__control", disabled: o || d || Y === k, onClick: () => C(k), type: "button", children: y })
    ] }),
    u && /* @__PURE__ */ e.jsxs("form", { className: "mm-pagination__jumper", onSubmit: (H) => {
      H.preventDefault(), V();
    }, children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-pagination__jumper-label", children: R.goTo }),
      /* @__PURE__ */ e.jsx(xa, { "aria-label": R.pageNumber, clampOnBlur: !0, controls: !0, id: `mm-pagination-jump-${K}`, max: k, min: 1, minWidth: 120, onChange: (H) => L(H), size: "sm", step: 1, value: E, width: 120 }),
      /* @__PURE__ */ e.jsx(Pe, { iconRight: /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 14 }), size: "sm", type: "submit", children: R.go })
    ] }),
    d && /* @__PURE__ */ e.jsx(Mt, { "aria-label": "Loading", className: "mm-pagination__loader", role: "status", size: 16 })
  ] });
}
const yl = (...t) => t.filter(Boolean).join(" ");
function Ao({ "aria-label": t = "Progress", animated: s = !1, className: a, indeterminate: r = !1, label: n, labelAlign: m = "start", labelPosition: o = "above", max: i = 100, min: c = 0, showValue: p = !1, size: l = "default", striped: d = !1, thickness: y = 8, tone: b = "primary", value: h = c, valueFormatter: j, variant: w = "bar" }) {
  const v = `mm-progress-label-${He().replace(/:/g, "")}`, D = Math.max(1, i - c), x = Math.min(i, Math.max(c, h)), _ = Math.round((x - c) / D * 100), u = j ? j(x, _) : `${_}%`, S = { "--mm-progress-value": `${_}%`, "--mm-progress-thickness": `${Math.max(2, y)}px`, "--mm-progress-dashoffset": `${264 - 264 * _ / 100}` }, M = n ?? (p ? u : null), g = { "aria-busy": r || _ < 100, "aria-describedby": M ? v : void 0, "aria-label": M ? void 0 : t, "aria-valuemax": r ? void 0 : i, "aria-valuemin": r ? void 0 : c, "aria-valuenow": r ? void 0 : x, className: yl("mm-progress", `mm-progress--${w}`, `mm-progress--${l}`, `mm-progress--${b}`, !!M && `mm-progress--label-${o}`, !!M && `mm-progress--label-align-${m}`, d && "mm-progress--striped", s && "mm-progress--animated", r && "mm-progress--indeterminate", a), role: "progressbar", style: S };
  return w === "circle" ? /* @__PURE__ */ e.jsxs("div", { ...g, children: [
    /* @__PURE__ */ e.jsxs("div", { "aria-hidden": "true", className: "mm-progress__circle", children: [
      /* @__PURE__ */ e.jsxs("svg", { className: "mm-progress__svg", viewBox: "0 0 100 100", children: [
        /* @__PURE__ */ e.jsx("circle", { className: "mm-progress__circle-track", cx: "50", cy: "50", r: "42" }),
        /* @__PURE__ */ e.jsx("circle", { className: "mm-progress__circle-value", cx: "50", cy: "50", r: "42" })
      ] }),
      M && /* @__PURE__ */ e.jsx("span", { className: "mm-progress__circle-label", children: M })
    ] }),
    n && o !== "inside" && /* @__PURE__ */ e.jsx("span", { className: "mm-progress__label", id: v, children: n })
  ] }) : /* @__PURE__ */ e.jsxs("div", { ...g, children: [
    o === "above" && M && /* @__PURE__ */ e.jsxs("div", { className: "mm-progress__header", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-progress__label", id: v, children: n ?? "Progress" }),
      p && /* @__PURE__ */ e.jsx("span", { className: "mm-progress__value", children: u })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-progress__track", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("span", { className: "mm-progress__fill", children: o === "inside" && M && /* @__PURE__ */ e.jsx("span", { className: "mm-progress__inside-label", children: M }) }) }),
    o === "below" && M && /* @__PURE__ */ e.jsxs("div", { className: "mm-progress__footer", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-progress__label", id: v, children: n }),
      p && /* @__PURE__ */ e.jsx("span", { className: "mm-progress__value", children: u })
    ] })
  ] });
}
const sr = (...t) => t.filter(Boolean).join(" "), zs = (t, s, a) => Math.min(a, Math.max(s, t));
function Bo({ "aria-label": t = "Rating", max: s = 5, value: a, defaultValue: r = 0, onChange: n, onHover: m, allowHalf: o = !1, allowClear: i = !0, readOnly: c = !1, disabled: p = !1, loading: l = !1, size: d = "default", tone: y = "warning", icon: b = "★", emptyIcon: h = "☆", label: j, showValue: w = !1, valueFormatter: z = (x, _) => `${x} / ${_}`, className: v, style: D }) {
  const x = He().replace(/:/g, ""), [_, u] = q(r), [S, M] = q(null), g = zs(a === void 0 ? _ : a ?? 0, 0, s), N = S ?? g, f = o ? 0.5 : 1, T = !p && !c && !l, B = (E) => {
    const L = i && E === g ? null : E;
    a === void 0 && u(L ?? 0), n == null || n(L);
  }, R = (E, L) => {
    if (!T || !o || !E) return L + 1;
    const K = E.currentTarget.getBoundingClientRect();
    return L + (E.clientX - K.left < K.width / 2 ? 0.5 : 1);
  }, A = (E, L) => {
    if (!T) return;
    let K;
    (E.key === "ArrowRight" || E.key === "ArrowUp") && (K = zs(g + f, 0, s)), (E.key === "ArrowLeft" || E.key === "ArrowDown") && (K = zs(g - f, 0, s)), E.key === "Home" && (K = 0), E.key === "End" && (K = s), K !== void 0 && (E.preventDefault(), B(K)), E.key === " " && (E.preventDefault(), B(L + 1));
  }, F = (E) => {
    const L = zs(N - E, 0, 1) * 100;
    return /* @__PURE__ */ e.jsxs("span", { "aria-hidden": "true", className: "mm-rating__icon-wrap", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-rating__icon-empty", children: h }),
      /* @__PURE__ */ e.jsx("span", { className: "mm-rating__icon-fill", style: { width: `${L}%` }, children: b })
    ] });
  };
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: sr("mm-rating", `mm-rating--${d}`, `mm-rating--${y}`, (p || l) && "mm-rating--disabled", c && "mm-rating--readonly", v), style: D, children: [
    /* @__PURE__ */ e.jsx("div", { "aria-label": t, className: "mm-rating__control", onMouseLeave: () => {
      M(null), m == null || m(null);
    }, role: "radiogroup", children: Array.from({ length: s }, (E, L) => /* @__PURE__ */ e.jsx("button", { "aria-checked": g === L + 1, "aria-label": `${L + 1} of ${s}`, className: sr("mm-rating__star", N > L && "mm-rating__star--active"), disabled: !T, onClick: (K) => B(R(K, L)), onKeyDown: (K) => A(K, L), onMouseEnter: (K) => {
      if (!T) return;
      const I = R(K, L);
      M(I), m == null || m(I);
    }, onMouseMove: (K) => {
      if (!T) return;
      const I = R(K, L);
      M(I), m == null || m(I);
    }, role: "radio", type: "button", children: F(L) }, `${x}-${L}`)) }),
    (j || w) && /* @__PURE__ */ e.jsxs("span", { className: "mm-rating__label", id: `${x}-label`, children: [
      j,
      w && /* @__PURE__ */ e.jsx("span", { className: "mm-rating__value", children: z(g, s) })
    ] }),
    l && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-rating__loading", role: "status" })
  ] });
}
const jl = (...t) => t.filter(Boolean).join(" ");
function Po({ "aria-label": t, label: s, description: a, error: r, currency: n = "USD", locale: m = "en-US", currencyDisplay: o = "symbol", value: i, defaultValue: c, onChange: p, onBlur: l, min: d, max: y, step: b = 1, precision: h, minFractionDigits: j, maxFractionDigits: w, useGrouping: z = !0, signDisplay: v = "auto", controls: D = !0, clearable: x = !1, disabled: _ = !1, readOnly: u = !1, loading: S = !1, size: M = "default", prefix: g, suffix: N, placeholder: f, name: T, id: B, className: R, style: A }) {
  var ie, re;
  const F = He().replace(/:/g, ""), E = B ?? `mm-input-currency-${F}`, L = new Intl.NumberFormat(m, { style: "currency", currency: n, currencyDisplay: o, useGrouping: z, signDisplay: v, minimumFractionDigits: j ?? h ?? 0, maximumFractionDigits: w ?? h ?? 2 }), K = new Intl.NumberFormat(m).formatToParts(1234.5), I = ((ie = K.find((U) => U.type === "group")) == null ? void 0 : ie.value) ?? ",", W = ((re = K.find((U) => U.type === "decimal")) == null ? void 0 : re.value) ?? ".", k = i !== void 0, [Y, P] = q(c ?? null), C = k ? i ?? null : Y, V = (U) => U === null ? "" : L.format(U), [Q, H] = q(V(C)), [X, ce] = q(!1);
  Me(() => {
    X || H(V(C));
  }, [C, X]);
  const se = (U) => {
    const Z = U.replace(new RegExp(`[^0-9\\-\\${W}]`, "g"), "").replace(new RegExp(`\\${I}`, "g"), "").replace(W, ".");
    if (!Z || Z === "-") return null;
    const G = Number(Z);
    return Number.isFinite(G) ? G : null;
  }, te = (U) => Math.min(y ?? U, Math.max(d ?? U, U)), ve = (U, Z) => {
    const G = U === null ? null : te(U);
    k || P(G);
    const me = G === null ? "" : V(G);
    p == null || p(G, me), Z && !X && H(me);
  }, ge = (U) => {
    const Z = U.target.value;
    /^[0-9\-.,\s$€£]*$/.test(Z) && (H(Z), ve(se(Z), U));
  }, ae = () => {
    const U = se(Q), Z = U === null ? null : te(U);
    k || P(Z);
    const G = V(Z);
    H(G), l == null || l(Z);
  }, fe = (U) => {
    const Z = te((C ?? d ?? 0) + (U === "increment" ? b : -b));
    ve(Z), H(V(Z));
  }, de = (U) => {
    (U.key === "ArrowUp" || U.key === "ArrowDown") && (U.preventDefault(), fe(U.key === "ArrowUp" ? "increment" : "decrement"));
  }, oe = _ || S || u || d !== void 0 && (C ?? d) <= d, xe = _ || S || u || y !== void 0 && (C ?? y) >= y;
  return /* @__PURE__ */ e.jsxs("div", { className: jl("mm-input-currency-field", `mm-input-currency-field--${M}`, !!r && "mm-input-currency-field--error", _ && "mm-input-currency-field--disabled", R), style: A, children: [
    s && /* @__PURE__ */ e.jsx("label", { className: "mm-input-currency-field__label", htmlFor: E, children: s }),
    a && /* @__PURE__ */ e.jsx("p", { className: "mm-input-currency-field__description", children: a }),
    /* @__PURE__ */ e.jsxs("span", { "aria-busy": S || void 0, className: "mm-input-currency", "data-currency": n, children: [
      g && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-currency__adornment", children: g }),
      /* @__PURE__ */ e.jsx("input", { "aria-describedby": a ? `${E}-description` : void 0, "aria-invalid": !!r, "aria-label": s ? void 0 : t, "aria-valuemax": y, "aria-valuemin": d, "aria-valuenow": C ?? void 0, className: "mm-input-currency__control", disabled: _ || S, id: E, inputMode: "decimal", name: T, onBlur: () => {
        ce(!1), ae();
      }, onChange: ge, onFocus: () => {
        ce(!0), C !== null && H(String(C));
      }, onKeyDown: de, placeholder: f ?? V(0), readOnly: u, role: "spinbutton", value: X ? Q : V(C) }),
      N && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-input-currency__adornment", children: N }),
      S && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-input-currency__loading", role: "status" }),
      x && C !== null && !_ && !u && /* @__PURE__ */ e.jsx("button", { "aria-label": "Clear amount", className: "mm-input-currency__clear", onMouseDown: (U) => U.preventDefault(), onClick: () => {
        ve(null), H("");
      }, type: "button", children: /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: 14 }) }),
      D && /* @__PURE__ */ e.jsxs("span", { "aria-label": "Currency controls", className: "mm-input-currency__controls", children: [
        /* @__PURE__ */ e.jsx("button", { "aria-label": "Decrease amount", disabled: oe, onClick: () => fe("decrement"), type: "button", children: /* @__PURE__ */ e.jsx(Mr, { "aria-hidden": "true", size: 14 }) }),
        /* @__PURE__ */ e.jsx("button", { "aria-label": "Increase amount", disabled: xe, onClick: () => fe("increment"), type: "button", children: /* @__PURE__ */ e.jsx(zr, { "aria-hidden": "true", size: 14 }) })
      ] })
    ] }),
    r ? /* @__PURE__ */ e.jsx("p", { className: "mm-input-currency-field__error", role: "alert", children: r }) : a && /* @__PURE__ */ e.jsx("span", { id: `${E}-description`, hidden: !0, children: a })
  ] });
}
const ar = (...t) => t.filter(Boolean).join(" ");
function Lo({
  "aria-describedby": t,
  "aria-invalid": s,
  autoResize: a = !1,
  className: r,
  clearable: n = !1,
  defaultValue: m,
  description: o,
  disabled: i = !1,
  error: c,
  fullWidth: p = !1,
  id: l,
  label: d,
  maxLength: y,
  maxRows: b = 8,
  minRows: h = 3,
  onChange: j,
  onClear: w,
  readOnly: z = !1,
  resize: v = "vertical",
  value: D,
  variant: x = "outline",
  ..._
}) {
  const u = He(), S = l ?? `mm-textarea-${u}`, M = ke(null), [g, N] = q(m === void 0 ? "" : String(m)), f = D === void 0 ? g : String(D), T = Math.max(1, h), B = Math.max(T, b), R = !!c, A = o ? `${S}-description` : void 0, F = c ? `${S}-error` : void 0, E = [t, A, F].filter(Boolean).join(" ") || void 0, L = n && f.length > 0 && !i && !z;
  ka(() => {
    const W = M.current;
    if (!W || !a) return;
    const k = window.getComputedStyle(W), Y = Number.parseFloat(k.lineHeight) || 20, P = Number.parseFloat(k.paddingTop) + Number.parseFloat(k.paddingBottom) + Number.parseFloat(k.borderTopWidth) + Number.parseFloat(k.borderBottomWidth), C = Y * T + P, V = Y * B + P;
    W.style.height = "auto";
    const Q = Math.min(Math.max(W.scrollHeight, C), V);
    W.style.height = `${Q}px`, W.style.overflowY = W.scrollHeight > V ? "auto" : "hidden";
  }, [a, f, B, T]);
  const K = (W) => {
    D === void 0 && N(W.target.value), j == null || j(W);
  }, I = () => {
    w == null || w(), D === void 0 && N("");
  };
  return /* @__PURE__ */ e.jsxs("div", { className: ar("mm-textarea-field", p && "mm-textarea-field--full-width", r), children: [
    d && /* @__PURE__ */ e.jsxs("label", { className: "mm-textarea-field__label", htmlFor: S, children: [
      d,
      _.required && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: " *" })
    ] }),
    o && /* @__PURE__ */ e.jsx("p", { className: "mm-textarea-field__description", id: A, children: o }),
    /* @__PURE__ */ e.jsxs("span", { className: ar("mm-textarea", `mm-textarea--${x}`, `mm-textarea--resize-${v}`, a && "mm-textarea--auto-resize", R && "mm-textarea--error", i && "mm-textarea--disabled"), children: [
      /* @__PURE__ */ e.jsx(
        "textarea",
        {
          ..._,
          "aria-describedby": E,
          "aria-invalid": s ?? R,
          className: "mm-textarea__control",
          defaultValue: m,
          disabled: i,
          id: S,
          maxLength: y,
          onChange: K,
          readOnly: z,
          ref: M,
          rows: T,
          value: D
        }
      ),
      L && /* @__PURE__ */ e.jsx("button", { "aria-label": "Clear text", className: "mm-textarea__action", onClick: I, type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 16 }) })
    ] }),
    y !== void 0 && /* @__PURE__ */ e.jsxs("p", { "aria-live": "polite", className: "mm-textarea-field__counter", children: [
      f.length,
      " / ",
      y
    ] }),
    c && /* @__PURE__ */ e.jsx("p", { className: "mm-textarea-field__error", id: F, children: c })
  ] });
}
const Is = (...t) => t.filter(Boolean).join(" ");
function Da({ as: t, children: s, className: a, code: r, copyable: n, delete: m, disabled: o, editable: i, ellipsis: c, italic: p, mark: l, strong: d, tone: y = "default", underline: b, ...h }) {
  const j = typeof i == "object" ? i : {}, w = j.defaultValue ?? (typeof s == "string" ? s : ""), [z, v] = q(w), [D, x] = q(typeof i == "object" && i.editing === !0), [_, u] = q(!1), S = !!c, M = typeof c == "object" ? c : {}, g = typeof n == "object" ? n : {}, N = z || w, f = () => {
    var E;
    i && (D || (x(!0), (E = j.onStart) == null || E.call(j)));
  }, T = () => {
    var E, L;
    x(!1), (E = j.onChange) == null || E.call(j, N), (L = j.onEnd) == null || L.call(j, N);
  }, B = async () => {
    var L, K;
    const E = g.text ?? N;
    try {
      await ((L = navigator.clipboard) == null ? void 0 : L.writeText(E));
    } catch {
    }
    (K = g.onCopy) == null || K.call(g);
  }, R = () => {
    var L;
    const E = !_;
    u(E), (L = M.onExpand) == null || L.call(M, E);
  };
  if (D) return /* @__PURE__ */ e.jsxs("span", { className: Is("mm-text-editable", a), children: [
    /* @__PURE__ */ e.jsx("textarea", { "aria-label": "Edit text", autoFocus: !0, className: "mm-text__editor", onChange: (E) => v(E.target.value), onKeyDown: (E) => {
      E.key === "Enter" && !E.shiftKey && (E.preventDefault(), T()), E.key === "Escape" && x(!1);
    }, value: N }),
    /* @__PURE__ */ e.jsx("button", { className: "mm-text__action", onClick: T, type: "button", children: "Save" })
  ] });
  const A = z || s, F = !_ && M.rows ? { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: M.rows, whiteSpace: "normal" } : void 0;
  return /* @__PURE__ */ e.jsxs("span", { className: Is("mm-text-wrap", S && !_ && "mm-text-wrap--ellipsis", a), children: [
    /* @__PURE__ */ e.jsx(t, { ...h, style: { ...h.style, ...F }, className: Is("mm-text", `mm-text--${y}`, d && "mm-text--strong", p && "mm-text--italic", b && "mm-text--underline", m && "mm-text--delete", l && "mm-text--mark", r && "mm-text--code", o && "mm-text--disabled"), onClick: i ? f : h.onClick, children: A }),
    S && M.expandable && /* @__PURE__ */ e.jsx("button", { "aria-expanded": _, className: "mm-text__action", onClick: R, type: "button", children: _ ? "Collapse" : "Expand" }),
    n && /* @__PURE__ */ e.jsx("button", { "aria-label": g.label ?? "Copy text", className: "mm-text__action", onClick: B, type: "button", children: "Copy" })
  ] });
}
function wl(t) {
  return /* @__PURE__ */ e.jsx(Da, { as: "span", ...t });
}
function Nl(t) {
  const { fullWidth: s = !0, ...a } = t;
  return /* @__PURE__ */ e.jsx(Da, { as: "p", ...a, className: Is(s && "mm-text--full-width", t.className) });
}
function kl({ level: t = 1, ...s }) {
  return /* @__PURE__ */ e.jsx(Da, { as: `h${t}`, ...s });
}
const Io = Object.assign(wl, { P: Nl, H: kl }), Vt = (...t) => t.filter(Boolean).join(" "), $l = (t) => {
  var s;
  return !!((s = t.children) != null && s.length);
}, Ml = (t) => {
  var s;
  return !!((s = t.megaMenu) != null && s.length);
};
function Fo({
  "aria-label": t = "Primary navigation",
  className: s,
  closeSubmenusOnMouseLeave: a,
  collapsed: r,
  defaultCollapsed: n = !1,
  collapseBreakpoint: m,
  collapsedWidth: o = 32,
  onCollapsedChange: i,
  items: c,
  separator: p,
  gap: l,
  orientation: d,
  size: y,
  variant: b,
  activeKey: h,
  defaultActiveKey: j,
  openKeys: w,
  defaultOpenKeys: z = [],
  onActiveChange: v,
  onOpenChange: D,
  onItemClick: x,
  submenuBehavior: _,
  submenuCloseDelay: u,
  collapseSubmenus: S,
  wrap: M = !1,
  fullWidth: g = !1,
  maxHeight: N
}) {
  const f = He(), { components: T } = Ge(), B = T.navigationMenu, R = d ?? (B == null ? void 0 : B.orientation) ?? "horizontal", A = y ?? (B == null ? void 0 : B.size) ?? "default", F = b ?? (B == null ? void 0 : B.variant) ?? "plain", E = l ?? (B == null ? void 0 : B.gap), L = _ ?? (B == null ? void 0 : B.submenuBehavior) ?? "hover", K = a ?? (B == null ? void 0 : B.closeSubmenusOnMouseLeave) ?? !0, I = u ?? (B == null ? void 0 : B.submenuCloseDelay) ?? 10, W = S ?? (B == null ? void 0 : B.collapseSubmenus) ?? !1, [k, Y] = q(j), [P, C] = q(z), [V, Q] = q(n), H = ke(null), X = ke(null), ce = h ?? k, se = w ?? P, te = r ?? V;
  Me(() => {
    if (r !== void 0 || m === void 0 || !H.current) return;
    const ie = H.current.parentElement ?? H.current, re = new ResizeObserver(([U]) => {
      const Z = U.contentRect.width <= m;
      Q((G) => (G !== Z && (i == null || i(Z)), Z));
    });
    return re.observe(ie), () => re.disconnect();
  }, [m, r, i]);
  const ve = () => {
    X.current !== null && (clearTimeout(X.current), X.current = null);
  }, ge = () => {
    ve(), !(!K || !se.length) && (X.current = setTimeout(() => {
      w === void 0 && C([]), D == null || D([]), X.current = null;
    }, Math.max(0, I) * 1e3));
  };
  Me(() => () => ve(), []), Me(() => {
    ce && !tn(c, ce) && Y(void 0);
  }, [c, ce]), Me(() => {
    if (!se.length) return;
    const ie = (re) => {
      var U;
      (U = H.current) != null && U.contains(re.target) || (w === void 0 && C([]), D == null || D([]));
    };
    return document.addEventListener("pointerdown", ie), () => document.removeEventListener("pointerdown", ie);
  }, [w, se, D]);
  const ae = (ie, re) => {
    const U = re ? [...se.filter((Z) => Z !== ie), ie] : se.filter((Z) => Z !== ie);
    w === void 0 && C(U), D == null || D(U);
  }, fe = (ie) => {
    var re;
    ie.disabled || (h === void 0 && Y(ie.key), (re = ie.onClick) == null || re.call(ie, ie), x == null || x(ie.key, ie), v == null || v(ie.key, ie));
  }, de = (ie) => {
    var he, ze, je;
    const re = Array.from(ie.currentTarget.querySelectorAll('[data-navigation-key]:not([aria-disabled="true"])')), U = document.activeElement, Z = U ? re.indexOf(U) : -1, G = R === "horizontal" ? ie.key === "ArrowRight" : ie.key === "ArrowDown", me = R === "horizontal" ? ie.key === "ArrowLeft" : ie.key === "ArrowUp";
    G || me ? (ie.preventDefault(), (he = re[(Z + (G ? 1 : -1) + re.length) % re.length]) == null || he.focus()) : ie.key === "House" ? (ie.preventDefault(), (ze = re[0]) == null || ze.focus()) : ie.key === "End" ? (ie.preventDefault(), (je = re[re.length - 1]) == null || je.focus()) : ie.key === "Escape" && se.length && (ie.preventDefault(), se.forEach((Ne) => ae(Ne, !1)));
  }, oe = (ie, re = !1, U, Z) => /* @__PURE__ */ e.jsxs("div", { "aria-label": "Mega menu", className: Vt("mm-navigation-menu__mega-menu", re && "mm-navigation-menu__mega-menu--full-width"), role: "menu", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-navigation-menu__mega-body", children: [
      (U == null ? void 0 : U.side) === "left" ? /* @__PURE__ */ e.jsx("aside", { className: "mm-navigation-menu__mega-aside", style: { backgroundColor: U.backgroundColor ?? "var(--mm-color-control-filled)", width: typeof U.width == "number" ? `${U.width}px` : U.width }, children: U.content }) : null,
      /* @__PURE__ */ e.jsx("div", { className: "mm-navigation-menu__mega-content", children: ie.map((G, me) => /* @__PURE__ */ e.jsxs("div", { className: "mm-navigation-menu__mega-group", children: [
        G.label ? /* @__PURE__ */ e.jsx("div", { className: "mm-navigation-menu__mega-heading", children: G.label }) : null,
        G.items.map((he) => /* @__PURE__ */ e.jsxs("a", { "aria-disabled": he.disabled || void 0, className: Vt("mm-navigation-menu__item", "mm-navigation-menu__link", "mm-navigation-menu__mega-item", he.disabled && "mm-navigation-menu__item--disabled"), "data-navigation-key": he.key, href: he.href ?? "#", onClick: (ze) => {
          (he.disabled || !he.href) && ze.preventDefault(), he.disabled || fe(he);
        }, rel: he.external ? "noreferrer" : void 0, tabIndex: he.disabled ? -1 : void 0, target: he.external ? "_blank" : void 0, children: [
          he.image ? /* @__PURE__ */ e.jsx("img", { alt: "", className: Vt("mm-navigation-menu__image", he.imageShape === "circle" && "mm-navigation-menu__image--circle"), src: he.image, style: { aspectRatio: he.imageShape === "circle" ? "1" : he.imageAspectRatio } }) : he.icon ? /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__icon", style: { "--mm-navigation-menu-icon-size": typeof he.iconSize == "number" ? `${he.iconSize}px` : he.iconSize }, children: he.icon }) : null,
          /* @__PURE__ */ e.jsxs("span", { className: "mm-navigation-menu__content", children: [
            /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__label", children: he.label }),
            he.description ? /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__description", children: he.description }) : null
          ] }),
          he.badge ? /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__badge", children: he.badge }) : null
        ] }, he.key))
      ] }, G.key ?? `mega-group-${me}`)) }),
      (U == null ? void 0 : U.side) === "right" ? /* @__PURE__ */ e.jsx("aside", { className: "mm-navigation-menu__mega-aside", style: { backgroundColor: U.backgroundColor ?? "var(--mm-color-control-filled)", width: typeof U.width == "number" ? `${U.width}px` : U.width }, children: U.content }) : null
    ] }),
    Z ? /* @__PURE__ */ e.jsx("div", { className: "mm-navigation-menu__mega-footer", children: Z }) : null
  ] }), xe = (ie, re = 1) => ie.map((U, Z) => {
    var Le;
    const G = re === 1 && Ml(U), me = ($l(U) || G) && re < 3, he = se.includes(U.key), ze = ce === U.key || !!((Le = U.children) != null && Le.some((Xe) => sn(Xe, ce))), je = (Xe) => {
      (U.disabled || me || !U.href) && Xe.preventDefault(), !U.disabled && (me ? ae(U.key, !he) : fe(U));
    }, Ne = typeof U.label == "string" ? U.label : void 0, Re = /* @__PURE__ */ e.jsxs("a", { "aria-current": ze && !me ? "page" : void 0, "aria-disabled": U.disabled || void 0, "aria-expanded": me ? he : void 0, "aria-haspopup": me ? "menu" : void 0, "aria-label": te ? Ne : void 0, className: Vt("mm-navigation-menu__item", "mm-navigation-menu__link", ze && "mm-navigation-menu__item--active", U.disabled && "mm-navigation-menu__item--disabled"), "data-navigation-key": U.key, href: U.href ?? "#", onClick: je, onMouseEnter: () => {
      L === "hover" && me && ae(U.key, !0);
    }, rel: U.external ? "noreferrer" : void 0, tabIndex: U.disabled ? -1 : void 0, target: U.external ? "_blank" : void 0, children: [
      U.icon ? /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__icon", children: U.icon }) : null,
      /* @__PURE__ */ e.jsxs("span", { className: "mm-navigation-menu__content", children: [
        /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__label", children: U.label }),
        U.description ? /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__description", children: U.description }) : null
      ] }),
      U.badge ? /* @__PURE__ */ e.jsx("span", { className: "mm-navigation-menu__badge", children: U.badge }) : null,
      me ? /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-navigation-menu__arrow", children: R === "horizontal" || re > 1 ? /* @__PURE__ */ e.jsx(xt, { size: 14 }) : /* @__PURE__ */ e.jsx(pt, { size: 14 }) }) : null
    ] }), _e = te && Ne ? /* @__PURE__ */ e.jsx(wt, { "aria-label": Ne, content: Ne, placement: "right", variant: "dark", children: Re }) : Re;
    return /* @__PURE__ */ e.jsxs(Ma, { children: [
      p && Z > 0 ? /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-navigation-menu__separator", children: p }) : null,
      /* @__PURE__ */ e.jsxs("div", { className: Vt("mm-navigation-menu__group", he && "mm-navigation-menu__group--open", G && U.megaMenuFullWidth && "mm-navigation-menu__group--mega-full-width"), children: [
        _e,
        me && he ? G ? oe(U.megaMenu ?? [], U.megaMenuFullWidth, U.megaMenuAside, U.megaMenuFooter) : /* @__PURE__ */ e.jsx("div", { "aria-label": `${String(U.label)} submenu`, className: "mm-navigation-menu__submenu", role: "menu", children: xe(U.children ?? [], re + 1) }) : null
      ] })
    ] }, `${f}-${U.key}`);
  });
  return /* @__PURE__ */ e.jsx("nav", { ref: H, "aria-label": t, className: Vt("mm-navigation-menu", `mm-navigation-menu--${R}`, `mm-navigation-menu--${A}`, `mm-navigation-menu--${F}`, te && "mm-navigation-menu--collapsed", M && "mm-navigation-menu--wrap", g && "mm-navigation-menu--full-width", W && "mm-navigation-menu--collapse-submenus", N !== void 0 && "mm-navigation-menu--scrollable", s), onKeyDown: de, onMouseEnter: ve, onMouseLeave: ge, style: { "--mm-navigation-menu-collapsed-width": typeof o == "number" ? `${o}px` : o, "--mm-navigation-menu-max-height": typeof N == "number" ? `${N}px` : N, "--mm-navigation-menu-gap": typeof E == "number" ? `${E}px` : E }, children: /* @__PURE__ */ e.jsx("div", { className: "mm-navigation-menu__list", role: "menubar", children: xe(c) }) });
}
function tn(t, s) {
  for (const a of t) {
    if (a.key === s) return a;
    const r = a.children && tn(a.children, s);
    if (r) return r;
  }
}
function sn(t, s) {
  var a;
  return t.key === s || !!((a = t.children) != null && a.some((r) => sn(r, s)));
}
const zl = (...t) => t.filter(Boolean).join(" ");
function Sl(t) {
  return (t == null ? void 0 : t.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]).join("").toUpperCase()) || "";
}
function Tl({ "aria-label": t, alt: s, children: a, className: r, disableHover: n = !1, disabled: m = !1, hoverScale: o = !1, icon: i, image: c, initials: p, loading: l = !1, name: d, onClick: y, shape: b = "circle", size: h = "default", status: j, statusLabel: w, variant: z = "soft" }) {
  const [v, D] = q(!1), x = !!y && !m && !l, _ = t ?? d ?? s, u = p ?? Sl(d) ?? a ?? i, S = (M) => {
    x && y && (M.key === "Enter" || M.key === " ") && (M.preventDefault(), y(M));
  };
  return /* @__PURE__ */ e.jsxs("span", { "aria-busy": l || void 0, "aria-label": _, className: zl("mm-avatar", `mm-avatar--${h}`, `mm-avatar--${b}`, `mm-avatar--${z}`, x && "mm-avatar--interactive", n && "mm-avatar--disable-hover", o && "mm-avatar--hover-scale", m && "mm-avatar--disabled", l && "mm-avatar--loading", r), onClick: x ? y : void 0, onKeyDown: S, role: x ? "button" : void 0, tabIndex: x ? 0 : void 0, children: [
    c && !v ? /* @__PURE__ */ e.jsx("img", { alt: s ?? d ?? "", className: "mm-avatar__image", onError: () => D(!0), src: c }) : /* @__PURE__ */ e.jsx("span", { "aria-hidden": !_, className: "mm-avatar__fallback", children: l ? /* @__PURE__ */ e.jsx("span", { className: "mm-avatar__loader" }) : u || i }),
    j && /* @__PURE__ */ e.jsx("span", { "aria-label": w ?? j, className: `mm-avatar__status mm-avatar__status--${j}`, role: "status" })
  ] });
}
const rr = (...t) => t.filter(Boolean).join(" ");
function Ro({
  "aria-label": t = "Open profile menu",
  className: s,
  name: a,
  secondaryText: r,
  avatarProps: n,
  avatar: m,
  entries: o = [],
  display: i,
  size: c,
  fullWidth: p,
  menuProps: l,
  menuWidth: d,
  placement: y,
  showBackground: b = !0,
  defaultOpen: h,
  open: j,
  onOpenChange: w,
  onClick: z,
  disabled: v
}) {
  const { components: D } = Ge(), x = D.profileMenu, _ = c ?? (x == null ? void 0 : x.size) ?? "default", u = i ?? (x == null ? void 0 : x.display) ?? "full", S = p ?? !1, M = o.length > 0, g = _ === "xs" ? "sm" : _ === "sm" ? "default" : "lg", N = m ?? /* @__PURE__ */ e.jsx(Tl, { ...n, "aria-label": (n == null ? void 0 : n["aria-label"]) ?? String(a), name: (n == null ? void 0 : n.name) ?? (typeof a == "string" ? a : void 0), size: g }), f = u === "avatar" ? null : /* @__PURE__ */ e.jsxs("span", { className: "mm-profile-menu__copy", children: [
    /* @__PURE__ */ e.jsx("span", { className: "mm-profile-menu__name", children: a }),
    u === "full" && r ? /* @__PURE__ */ e.jsx("span", { className: "mm-profile-menu__secondary", children: r }) : null
  ] }), T = /* @__PURE__ */ e.jsxs("span", { className: "mm-profile-menu__trigger-content", children: [
    N,
    f
  ] });
  return M ? /* @__PURE__ */ e.jsx(ri, { "aria-label": t, className: rr("mm-profile-menu", `mm-profile-menu--${_}`, `mm-profile-menu--${u}`, S && "mm-profile-menu--full-width", !b && "mm-profile-menu--no-background", s), closeOnOutsideClick: !0, defaultOpen: h, disabled: v, entries: o, matchTriggerWidth: x == null ? void 0 : x.matchTriggerWidth, menuProps: l, menuWidth: d ?? (x == null ? void 0 : x.menuWidth), onOpenChange: w, open: j, placement: y ?? (x == null ? void 0 : x.placement), triggerProps: { "aria-label": t, className: "mm-profile-menu__button", disableHover: !0, fullWidth: S, onClick: z, variant: "light", size: _ === "xs" ? "xs" : _ === "sm" ? "sm" : "default" }, children: T }) : /* @__PURE__ */ e.jsx(Pe, { "aria-label": t, className: rr("mm-profile-menu", `mm-profile-menu--${_}`, `mm-profile-menu--${u}`, S && "mm-profile-menu--full-width", !b && "mm-profile-menu--no-background", s), disabled: v, disableHover: !0, fullWidth: S, onClick: z, variant: "light", size: _ === "xs" ? "xs" : _ === "sm" ? "sm" : "default", children: T });
}
const El = (...t) => t.filter(Boolean).join(" "), nr = (t) => typeof t == "number" ? `${t}px` : t;
function Co({
  children: t,
  header: s,
  footer: a,
  contentPosition: r = "top",
  size: n = "default",
  variant: m = "plain",
  width: o = "100%",
  minHeight: i = "100%",
  fullHeight: c = !0,
  className: p,
  style: l,
  ...d
}) {
  const y = {
    ...l,
    "--mm-sidebar-width": nr(o),
    "--mm-sidebar-min-height": nr(i)
  };
  return /* @__PURE__ */ e.jsxs("aside", { ...d, className: El("mm-sidebar", `mm-sidebar--${n}`, `mm-sidebar--${m}`, `mm-sidebar--content-${r}`, c && "mm-sidebar--full-height", p), style: y, children: [
    s !== void 0 ? /* @__PURE__ */ e.jsx("header", { className: "mm-sidebar__header", children: s }) : null,
    /* @__PURE__ */ e.jsx("div", { className: "mm-sidebar__content", children: t }),
    a !== void 0 ? /* @__PURE__ */ e.jsx("footer", { className: "mm-sidebar__footer", children: a }) : null
  ] });
}
const ja = {
  en: { am: "AM", chooseTime: "Choose a time", clearTime: "Clear time", hours: "Hours", minutes: "Minutes", pm: "PM", seconds: "Seconds", placeholder: "Select time" },
  uk: { am: "дп", chooseTime: "Виберіть час", clearTime: "Очистити час", hours: "Години", minutes: "Хвилини", pm: "пп", seconds: "Секунди", placeholder: "Виберіть час" },
  de: { am: "AM", chooseTime: "Uhrzeit auswählen", clearTime: "Zeit löschen", hours: "Stunden", minutes: "Minuten", pm: "PM", seconds: "Sekunden", placeholder: "Zeit auswählen" },
  fr: { am: "AM", chooseTime: "Choisir une heure", clearTime: "Effacer l’heure", hours: "Heures", minutes: "Minutes", pm: "PM", seconds: "Secondes", placeholder: "Sélectionner une heure" }
}, da = (...t) => t.filter(Boolean).join(" "), Dl = 1440;
function Zt(t) {
  if (!t) return null;
  const s = t.match(/^(\d{1,2}):(\d{2})/);
  if (!s) return null;
  const a = Number(s[1]), r = Number(s[2]);
  return a > 23 || r > 59 ? null : a * 60 + r;
}
function ir(t, s) {
  const a = Zt(t);
  if (a === null) return "";
  const r = t == null ? void 0 : t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  return `${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}${s ? `:${(r == null ? void 0 : r[3]) ?? "00"}` : ""}`;
}
function Ot(t, s, a, r = "en") {
  const n = Zt(t);
  if (n === null) return t;
  const m = Math.floor(n / 60), o = s === "12" ? m % 12 || 12 : m;
  return `${String(o).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}${a ? `:${t.slice(6, 8) || "00"}` : ""}${s === "12" ? ` ${m >= 12 ? ja[r].pm : ja[r].am}` : ""}`;
}
function Al(t, s, a) {
  var i;
  const r = t.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!r) return null;
  let n = Number(r[1]);
  const m = Number(r[2]), o = (i = r[4]) == null ? void 0 : i.toUpperCase();
  if (s === "12") {
    if (n < 1 || n > 12 || !o) return null;
    n = n % 12 + (o === "PM" ? 12 : 0);
  }
  return n > 23 || m > 59 || r[3] && Number(r[3]) > 59 ? null : `${String(n).padStart(2, "0")}:${String(m).padStart(2, "0")}${a ? `:${r[3] ?? "00"}` : ""}`;
}
function Wo({
  "aria-label": t = "Time",
  className: s,
  clearable: a = !1,
  defaultValue: r = null,
  description: n,
  disabled: m = !1,
  displayMode: o = "numeric",
  error: i,
  format: c = "24",
  fullWidth: p = !1,
  label: l,
  loading: d = !1,
  locale: y,
  maxTime: b,
  minTime: h,
  minuteStep: j,
  name: w,
  onChange: z,
  onComplete: v,
  placeholder: D,
  prefix: x,
  readOnly: _ = !1,
  seconds: u = !1,
  secondStep: S = 1,
  size: M = "default",
  step: g = 30,
  suffix: N,
  value: f,
  view: T = "input"
}) {
  const { locale: B } = Ge(), R = y ?? B, A = ja[R], F = D ?? A.placeholder, [E, L] = q(r), [K, I] = q(T === "picker"), [W, k] = q(f ? Ot(f, c, u, R) : r ? Ot(r, c, u, R) : ""), Y = ke(null), P = ke(/* @__PURE__ */ new Set()), C = He(), V = f === void 0 ? E : f, Q = Zt(h), H = Zt(b), X = Math.max(1, Math.round(g)), ce = Math.max(1, Math.round(j ?? g)), se = Math.max(1, Math.round(S)), te = w ?? `time-picker-${C.replace(/:/g, "")}`, ve = [n && `${te}-description`, i && `${te}-error`].filter(Boolean).join(" ") || void 0;
  Me(() => {
    k(V ? Ot(V, c, u, R) : "");
  }, [R, V, c, u]), Me(() => {
    if (!K || T === "picker") return;
    const re = (U) => {
      var Z;
      (Z = Y.current) != null && Z.contains(U.target) || I(!1);
    };
    return document.addEventListener("mousedown", re), () => document.removeEventListener("mousedown", re);
  }, [K, T]);
  const ge = mt(() => Array.from({ length: Math.ceil(Dl / X) }, (re, U) => U * X).filter((re) => (Q === null || re >= Q) && (H === null || re <= H)), [H, Q, X]), ae = (re, U = !1) => {
    const Z = re ? ir(re, u) : null;
    Z && (Q !== null && Zt(Z) < Q || H !== null && Zt(Z) > H) || (f === void 0 && L(Z), k(Z ? Ot(Z, c, u, R) : ""), z == null || z(Z), Z && U && (v == null || v(Z)), T === "input" && I(!1));
  }, fe = (re) => {
    k(re);
    const U = Al(re, c, u);
    U && ae(U, !0);
  }, de = (re, U) => {
    const G = (ir(V ?? "00:00:00", !0) || "00:00:00").split(":").map(Number), me = re === "hour" ? [U, G[1], G[2]] : re === "minute" ? [G[0], U, G[2]] : [G[0], G[1], U], he = `${String(me[0]).padStart(2, "0")}:${String(me[1]).padStart(2, "0")}:${String(me[2]).padStart(2, "0")}`;
    P.current.add(re);
    const ze = u ? P.current.size === 3 : P.current.has("hour") && P.current.has("minute");
    ae(he, ze), ze && P.current.clear();
  }, oe = (re, U, Z) => /* @__PURE__ */ e.jsxs("div", { className: "mm-time-picker__column", children: [
    /* @__PURE__ */ e.jsx("span", { className: "mm-time-picker__column-label", children: re }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-time-picker__column-options", role: "listbox", children: U.map((G) => {
      const me = (V == null ? void 0 : V.split(":").map(Number)) ?? [0, 0, 0], he = me[Z === "hour" ? 0 : Z === "minute" ? 1 : 2] === G, ze = Z === "hour" ? G * 60 + me[1] : me[0] * 60 + (Z === "minute" ? G : me[1]), je = Z !== "second" && (Q !== null && ze < Q || H !== null && ze > H);
      return /* @__PURE__ */ e.jsxs("button", { "aria-selected": he, className: da("mm-time-picker__option", he && "mm-time-picker__option--selected"), disabled: m || _ || je, onClick: () => de(Z, G), role: "option", type: "button", children: [
        String(G).padStart(2, "0"),
        he && /* @__PURE__ */ e.jsx(Ct, { "aria-hidden": "true", size: 14 })
      ] }, `${Z}-${G}`);
    }) })
  ] }), xe = /* @__PURE__ */ e.jsxs("div", { "aria-label": "Time options", className: "mm-time-picker__panel", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-time-picker__panel-header", children: [
      /* @__PURE__ */ e.jsx("span", { children: V ? Ot(V, c, u, R) : A.chooseTime }),
      a && V && /* @__PURE__ */ e.jsx("button", { "aria-label": A.clearTime, className: "mm-time-picker__clear", onClick: () => ae(null), type: "button", children: /* @__PURE__ */ e.jsx(rt, { size: 14 }) })
    ] }),
    o === "numeric" ? /* @__PURE__ */ e.jsxs("div", { className: "mm-time-picker__numeric", children: [
      oe(A.hours, c === "12" ? Array.from({ length: 12 }, (re, U) => U + 1) : Array.from({ length: 24 }, (re, U) => U), "hour"),
      oe(A.minutes, Array.from({ length: Math.ceil(60 / ce) }, (re, U) => U * ce).filter((re) => re < 60), "minute"),
      u && oe(A.seconds, Array.from({ length: Math.ceil(60 / se) }, (re, U) => U * se).filter((re) => re < 60), "second")
    ] }) : /* @__PURE__ */ e.jsx("div", { className: "mm-time-picker__options", role: "listbox", children: ge.map((re) => {
      const U = `${String(Math.floor(re / 60)).padStart(2, "0")}:${String(re % 60).padStart(2, "0")}${u ? ":00" : ""}`, Z = U.slice(0, 5) === (V == null ? void 0 : V.slice(0, 5));
      return /* @__PURE__ */ e.jsxs("button", { "aria-selected": Z, className: da("mm-time-picker__option", Z && "mm-time-picker__option--selected"), disabled: m || _, onClick: () => ae(U, !0), role: "option", type: "button", children: [
        Ot(U, c, u, R),
        Z && /* @__PURE__ */ e.jsx(Ct, { "aria-hidden": "true", size: 14 })
      ] }, U);
    }) })
  ] });
  return /* @__PURE__ */ e.jsxs("div", { className: da("mm-time-picker", `mm-time-picker--${M}`, `mm-time-picker--${T}`, m && "mm-time-picker--disabled", d && "mm-time-picker--loading", p && "mm-time-picker--full-width", i && "mm-time-picker--error", s), ref: Y, children: [
    l && /* @__PURE__ */ e.jsx("label", { className: "mm-time-picker__label", htmlFor: te, children: l }),
    n && /* @__PURE__ */ e.jsx("div", { className: "mm-time-picker__description", id: `${te}-description`, children: n }),
    T === "input" ? /* @__PURE__ */ e.jsxs("div", { className: "mm-time-picker__control", children: [
      /* @__PURE__ */ e.jsx("span", { className: "mm-time-picker__slot", children: x ?? /* @__PURE__ */ e.jsx(za, { "aria-hidden": "true", size: 16 }) }),
      /* @__PURE__ */ e.jsx("input", { "aria-describedby": ve, "aria-label": t, className: "mm-time-picker__input", disabled: m || d, id: te, name: w, onChange: (re) => fe(re.target.value), onFocus: () => !_ && I(!0), placeholder: F, readOnly: _, value: W }),
      N ?? /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", className: "mm-time-picker__chevron", size: 16 })
    ] }) : null,
    i && /* @__PURE__ */ e.jsx("div", { className: "mm-time-picker__error", id: `${te}-error`, role: "alert", children: i }),
    (K || T === "picker") && !m && xe
  ] });
}
const an = gt(null), xs = (...t) => t.filter(Boolean).join(" "), Bl = (t) => typeof t == "number" ? `${t}px` : t;
function Ko({ value: t, title: s, description: a, icon: r, badge: n, leading: m, trailing: o, rightContent: i, rightContentAlign: c = "center", content: p, footer: l, name: d, checked: y, defaultChecked: b = !1, disabled: h = !1, loading: j = !1, required: w, size: z = "default", variant: v = "outline", indicator: D = "start", cardDirection: x = "horizontal", error: _, onChange: u, className: S, style: M, "aria-label": g }) {
  const N = vt(an), T = `mm-radio-card-${He()}`, B = (N == null ? void 0 : N.value) === void 0 ? void 0 : N.value === t, [R, A] = q(b), F = y ?? B ?? R, E = (N == null ? void 0 : N.size) ?? z, L = (N == null ? void 0 : N.variant) ?? v, K = (N == null ? void 0 : N.indicator) ?? D, I = h || !!(N != null && N.disabled) || j, W = (Y) => {
    var P;
    !N && y === void 0 && A(Y.target.checked), u == null || u(Y.target.checked, t, Y), (P = N == null ? void 0 : N.onChange) == null || P.call(N, t, Y);
  }, k = i ?? o;
  return /* @__PURE__ */ e.jsxs("div", { className: xs("mm-radio-card-field", _ && "mm-radio-card-field--error", S), style: M, children: [
    /* @__PURE__ */ e.jsx(Gr, { "aria-describedby": a ? `${T}-description` : void 0, "aria-label": g, checked: F, className: xs("mm-radio-card", `mm-radio-card--${E}`, `mm-radio-card--${L}`, `mm-radio-card--indicator-${K}`, `mm-radio-card--${x}`, F && "mm-radio-card--checked", I && "mm-radio-card--disabled", j && "mm-radio-card--loading"), disabled: I, id: T, label: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("span", { className: "mm-radio-card__body", children: [
      r && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-radio-card__icon", children: r }),
      m && /* @__PURE__ */ e.jsx("span", { className: "mm-radio-card__leading", children: m }),
      /* @__PURE__ */ e.jsxs("span", { className: "mm-radio-card__main", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "mm-radio-card__heading", children: [
          /* @__PURE__ */ e.jsx("span", { className: "mm-radio-card__title", children: s }),
          n && /* @__PURE__ */ e.jsx("span", { className: "mm-radio-card__badge", children: n })
        ] }),
        a && /* @__PURE__ */ e.jsx("span", { className: "mm-radio-card__description", id: `${T}-description`, children: a }),
        p && /* @__PURE__ */ e.jsx("span", { className: "mm-radio-card__content", children: p }),
        l && /* @__PURE__ */ e.jsx("span", { className: "mm-radio-card__footer", children: l })
      ] }),
      k && /* @__PURE__ */ e.jsx("span", { className: xs("mm-radio-card__right-content", `mm-radio-card__right-content--${c}`), children: k }),
      j && /* @__PURE__ */ e.jsx("span", { "aria-label": "Loading", className: "mm-radio-card__spinner", role: "status" })
    ] }) }), name: (N == null ? void 0 : N.name) ?? d, onChange: W, required: w ?? (N == null ? void 0 : N.required), size: E, value: t }),
    _ && /* @__PURE__ */ e.jsx("p", { className: "mm-radio-card-field__error", role: "alert", children: _ })
  ] });
}
function Yo({ children: t, label: s, description: a, error: r, name: n, value: m, defaultValue: o, onChange: i, direction: c = "vertical", columns: p, gap: l = 12, size: d, variant: y, indicator: b, disabled: h = !1, required: j = !1, className: w, style: z, "aria-label": v }) {
  const { components: D } = Ge(), x = D.radioCard, _ = He(), u = n ?? `mm-radio-card-group-${_}`, [S, M] = q(o), g = m === void 0 ? S : m, N = (A, F) => {
    m === void 0 && M(A), i == null || i(A, F);
  }, f = { "--mm-radio-card-columns": p, "--mm-radio-card-gap": Bl(l), ...z }, T = d ?? (x == null ? void 0 : x.size), B = y ?? (x == null ? void 0 : x.variant), R = b ?? (x == null ? void 0 : x.indicator);
  return /* @__PURE__ */ e.jsxs("fieldset", { "aria-label": v, className: xs("mm-radio-card-group", w), style: f, children: [
    /* @__PURE__ */ e.jsx("legend", { className: "mm-radio-card-group__label", children: s }),
    a && /* @__PURE__ */ e.jsx("p", { className: "mm-radio-card-group__description", children: a }),
    /* @__PURE__ */ e.jsx(an.Provider, { value: { name: u, value: g, onChange: N, size: T, variant: B, indicator: R, disabled: h, required: j }, children: /* @__PURE__ */ e.jsx("div", { className: xs("mm-radio-card-group__options", `mm-radio-card-group__options--${c}`), children: t }) }),
    r && /* @__PURE__ */ e.jsx("p", { className: "mm-radio-card-group__error", role: "alert", children: r })
  ] });
}
const rn = gt(null);
function Ho({ children: t, className: s, defaultValue: a = [], description: r, disabled: n = !1, error: m, label: o, name: i, onChange: c, readOnly: p = !1, value: l }) {
  const d = He(), y = i ?? `mm-switch-group-${d}`, b = r ? `${y}-description` : void 0, h = m ? `${y}-error` : void 0, [j, w] = q(a), z = l ?? j, v = (D, x) => {
    const _ = z.includes(D) ? z.filter((u) => u !== D) : [...z, D];
    l === void 0 && w(_), c == null || c(_, x);
  };
  return /* @__PURE__ */ e.jsxs("fieldset", { "aria-describedby": [b, h].filter(Boolean).join(" ") || void 0, "aria-invalid": m ? !0 : void 0, className: s ? `mm-switch-group ${s}` : "mm-switch-group", children: [
    o && /* @__PURE__ */ e.jsx("legend", { className: "mm-switch-group__label", children: o }),
    /* @__PURE__ */ e.jsx(rn.Provider, { value: { descriptionId: b, disabled: n, errorId: h, name: y, onChange: v, readOnly: p, value: z }, children: /* @__PURE__ */ e.jsx("div", { className: "mm-switch-group__options", children: t }) }),
    r && /* @__PURE__ */ e.jsx("p", { className: "mm-switch-group__description", id: b, children: r }),
    m && /* @__PURE__ */ e.jsx("p", { className: "mm-switch-group__error", id: h, children: m })
  ] });
}
const lr = (...t) => t.filter(Boolean).join(" "), Pl = Wt(function({
  "aria-describedby": s,
  "aria-readonly": a,
  checked: r,
  checkedLabel: n,
  className: m,
  defaultChecked: o = !1,
  description: i,
  disabled: c = !1,
  error: p,
  id: l,
  label: d,
  labelPosition: y = "right",
  loading: b = !1,
  loadingLabel: h,
  offIcon: j,
  offLabel: w,
  onChange: z,
  onClick: v,
  onIcon: D,
  onKeyDown: x,
  onLabel: _,
  readOnly: u = !1,
  size: S = "default",
  status: M,
  tone: g = "primary",
  ...N
}) {
  const f = vt(rn), T = He(), B = l ?? `mm-switch-${T}`, [R, A] = q(o), F = f == null ? void 0 : f.value, E = F !== void 0 && N.value !== void 0, L = E ? F.includes(String(N.value)) : r === void 0 ? R : r, K = c || b || !!(f != null && f.disabled), I = u || !!(f != null && f.readOnly), W = i ? `${B}-description` : void 0, k = p ? `${B}-error` : void 0, Y = [s, f == null ? void 0 : f.descriptionId, f == null ? void 0 : f.errorId, W, k].filter(Boolean).join(" ") || void 0, P = p ? void 0 : M, C = (H) => {
    var X;
    if (I) {
      H.preventDefault(), H.currentTarget.checked = L;
      return;
    }
    E ? (X = f == null ? void 0 : f.onChange) == null || X.call(f, String(N.value), H) : r === void 0 && A(H.target.checked), z == null || z(H);
  }, V = (H) => {
    v == null || v(H), I && H.preventDefault();
  }, Q = (H) => {
    x == null || x(H), I && H.key === " " && H.preventDefault();
  };
  return /* @__PURE__ */ e.jsxs("div", { className: lr("mm-switch-field", m), children: [
    /* @__PURE__ */ e.jsxs("label", { className: lr("mm-switch", `mm-switch--${S}`, `mm-switch--tone-${g}`, `mm-switch--label-${y}`, P && `mm-switch--${P}`, p && "mm-switch--error", I && "mm-switch--readonly", K && "mm-switch--disabled"), children: [
      /* @__PURE__ */ e.jsx(
        "input",
        {
          ...N,
          "aria-describedby": Y,
          "aria-invalid": N["aria-invalid"] ?? !!p,
          "aria-readonly": a ?? (I ? !0 : void 0),
          checked: L,
          disabled: K,
          id: B,
          name: (f == null ? void 0 : f.name) ?? N.name,
          onChange: C,
          onClick: V,
          onKeyDown: Q,
          type: "checkbox"
        }
      ),
      d && /* @__PURE__ */ e.jsx("span", { className: "mm-switch__label", children: d }),
      /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-switch__control", children: /* @__PURE__ */ e.jsx("span", { className: "mm-switch__thumb", children: b ? /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-switch__loader" }) : (L ? D : j) && /* @__PURE__ */ e.jsx("span", { className: "mm-switch__icon", children: L ? D : j }) }) }),
      !b && L && _ !== void 0 && /* @__PURE__ */ e.jsx("span", { className: "mm-switch__state", children: _ }),
      !b && !L && w !== void 0 && /* @__PURE__ */ e.jsx("span", { className: "mm-switch__state", children: w }),
      !b && n !== void 0 && L && /* @__PURE__ */ e.jsx("span", { className: "mm-switch__state", children: n }),
      b && /* @__PURE__ */ e.jsx("span", { "aria-label": h === void 0 ? "Loading" : void 0, className: "mm-switch__loading", role: "status", children: h })
    ] }),
    i && /* @__PURE__ */ e.jsx("p", { className: "mm-switch-field__description", id: W, children: i }),
    p && /* @__PURE__ */ e.jsx("p", { className: "mm-switch-field__error", id: k, children: p })
  ] });
});
function Uo({ alwaysContent: t, checkedContent: s, checked: a, defaultChecked: r = !1, description: n, onChange: m, switchPosition: o = "left", title: i, uncheckedContent: c, ...p }) {
  const [l, d] = q(r), y = a === void 0 ? l : a, b = (h) => {
    a === void 0 && d(h.target.checked), m == null || m(h);
  };
  return /* @__PURE__ */ e.jsxs("section", { className: `mm-switch-card mm-switch-card--${o}`, children: [
    /* @__PURE__ */ e.jsx("div", { className: "mm-switch-card__switch", children: /* @__PURE__ */ e.jsx(Pl, { ...p, checked: y, onChange: b }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-switch-card__content", children: [
      /* @__PURE__ */ e.jsx("h3", { className: "mm-switch-card__title", children: i }),
      n && /* @__PURE__ */ e.jsx("p", { className: "mm-switch-card__description", children: n }),
      t && /* @__PURE__ */ e.jsx("div", { className: "mm-switch-card__always", children: t }),
      (y ? s : c) && /* @__PURE__ */ e.jsx("div", { className: "mm-switch-card__conditional", children: y ? s : c })
    ] })
  ] });
}
const or = (...t) => t.filter(Boolean).join(" ");
function Vo({ "aria-label": t = "Loading", className: s, label: a, labelPosition: r = "inline", max: n = 100, min: m = 0, overlay: o = !1, size: i = "default", speed: c = 1, thickness: p = 3, tone: l = "primary", track: d = !0, value: y, variant: b = "ring", fullscreen: h = !1 }) {
  const w = `mm-spinner-label-${He().replace(/:/g, "")}`, z = y !== void 0, v = Math.min(n, Math.max(m, y ?? m)), D = Math.max(1, n - m), x = (v - m) / D * 100, _ = { "--mm-spinner-speed": `${Math.max(0.1, c)}s`, "--mm-spinner-thickness": `${Math.max(1, p)}px`, "--mm-spinner-progress": `${x}%` };
  return /* @__PURE__ */ e.jsxs("span", { "aria-busy": !z || x < 100, "aria-describedby": a ? w : void 0, "aria-label": a ? void 0 : t, "aria-valuemax": z ? n : void 0, "aria-valuemin": z ? m : void 0, "aria-valuenow": z ? v : void 0, className: or("mm-spinner", `mm-spinner--${b}`, `mm-spinner--${i}`, `mm-spinner--${l}`, !!a && `mm-spinner--label-${r}`, o && "mm-spinner--overlay", h && "mm-spinner--fullscreen", s), role: z ? "progressbar" : "status", style: _, children: [
    /* @__PURE__ */ e.jsxs("span", { "aria-hidden": "true", className: or("mm-spinner__visual", !d && "mm-spinner__visual--no-track"), children: [
      b === "dots" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", {})
      ] }),
      b === "bars" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", {})
      ] }),
      b === "pulse" && /* @__PURE__ */ e.jsx("span", {})
    ] }),
    a && /* @__PURE__ */ e.jsx("span", { className: "mm-spinner__label", id: w, children: a })
  ] });
}
const Ll = (...t) => t.filter(Boolean).join(" "), Ss = (t) => typeof t == "number" ? `${t}px` : t;
function Oo({ animation: t, className: s, height: a, label: r = "Loading", lastLineWidth: n = "72%", lines: m = 1, radius: o, size: i = "default", style: c, tone: p = "default", variant: l = "rectangular", width: d, ...y }) {
  const { components: b } = Ge(), h = b.skeleton, j = t ?? (h == null ? void 0 : h.animation) ?? "pulse", w = Math.max(1, Math.floor(m)), z = {
    ...(h == null ? void 0 : h.baseColor) && { "--mm-skeleton-base": h.baseColor },
    ...(h == null ? void 0 : h.highlightColor) && { "--mm-skeleton-highlight": h.highlightColor },
    ...(h == null ? void 0 : h.radius) && { "--mm-skeleton-radius": h.radius },
    ...o !== void 0 && { "--mm-skeleton-radius": Ss(o) },
    ...d !== void 0 && { "--mm-skeleton-width": Ss(d) },
    ...a !== void 0 && { "--mm-skeleton-height": Ss(a) },
    ...c
  }, v = Ll("mm-skeleton", `mm-skeleton--${l}`, `mm-skeleton--${i}`, `mm-skeleton--${p}`, `mm-skeleton--${j}`, s), D = (x) => x === w - 1 && w > 1 ? { width: Ss(n) } : void 0;
  return /* @__PURE__ */ e.jsx("div", { "aria-busy": "true", "aria-label": r, className: v, role: "status", style: z, ...y, children: l === "text" ? Array.from({ length: w }, (x, _) => /* @__PURE__ */ e.jsx("span", { className: "mm-skeleton__line", style: D(_) }, _)) : /* @__PURE__ */ e.jsx("span", { className: "mm-skeleton__shape" }) });
}
const cr = (...t) => t.filter(Boolean).join(" "), mr = (t) => typeof t == "number" ? `${t}px` : t;
function dr(t, s) {
  if (!s) return t || " ";
  const a = /(\/\/.*|\/\*[\s\S]*?\*\/|#[a-fA-F0-9]{3,8}|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b(?:const|let|var|function|return|if|else|for|while|class|export|import|from|new|true|false|null|undefined|async|await|type|interface|extends)\b)/g, r = [];
  let n = 0, m;
  for (; m = a.exec(t); ) {
    m.index > n && r.push(t.slice(n, m.index));
    const o = m[0], i = o.startsWith("//") || o.startsWith("/*") ? "comment" : o.startsWith('"') || o.startsWith("'") || o.startsWith("`") ? "string" : /^\d/.test(o) ? "number" : /^(true|false|null|undefined)$/.test(o) ? "literal" : /^(const|let|var|function|return|if|else|for|while|class|export|import|from|new|async|await|type|interface|extends)$/.test(o) ? "keyword" : "value";
    r.push(/* @__PURE__ */ e.jsx("span", { className: `mm-code-block__token mm-code-block__token--${i}`, children: o }, `${m.index}-${o}`)), n = m.index + o.length;
  }
  return n < t.length && r.push(t.slice(n)), r.length ? r : " ";
}
function qo({ code: t, language: s, title: a, showHeader: r = !0, showLineNumbers: n, lineNumberStart: m = 1, onLineClick: o, highlightLines: i = [], wrap: c = !1, copyable: p, copyLabel: l, copiedLabel: d, onCopy: y, size: b = "default", theme: h, syntaxHighlight: j = !0, radius: w, maxHeight: z, tabSize: v = 2, className: D, style: x, ..._ }) {
  const { components: u } = Ge(), S = u.codeBlock, [M, g] = q(!1), N = p ?? (S == null ? void 0 : S.copyable) ?? !0, f = h ?? (S == null ? void 0 : S.theme) ?? "dark", T = t.replace(/\n$/, "").split(`
`), B = {
    ...(S == null ? void 0 : S.radius) && { "--mm-code-block-radius": S.radius },
    ...(S == null ? void 0 : S.fontSize) && { "--mm-code-block-font-size": S.fontSize },
    ...w !== void 0 && { "--mm-code-block-radius": mr(w) },
    ...z !== void 0 && { "--mm-code-block-max-height": mr(z) },
    "--mm-code-block-tab-size": v,
    ...x
  }, R = async () => {
    try {
      await navigator.clipboard.writeText(t), g(!0), y == null || y(t), window.setTimeout(() => g(!1), 1600);
    } catch {
      g(!1);
    }
  }, A = M ? d ?? "Copied" : l ?? "Copy code";
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": typeof a == "string" ? a : void 0, className: cr("mm-code-block", `mm-code-block--${f}`, `mm-code-block--${b}`, c && "mm-code-block--wrap", D), style: B, ..._, children: [
    r && (a || s || N) && /* @__PURE__ */ e.jsxs("div", { className: "mm-code-block__header", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mm-code-block__heading", children: [
        a && /* @__PURE__ */ e.jsx("span", { className: "mm-code-block__title", children: a }),
        s && /* @__PURE__ */ e.jsx("span", { className: "mm-code-block__language", children: s })
      ] }),
      N && /* @__PURE__ */ e.jsx("button", { "aria-label": A, className: "mm-code-block__copy", onClick: R, type: "button", children: A })
    ] }),
    /* @__PURE__ */ e.jsx("pre", { className: "mm-code-block__pre", children: /* @__PURE__ */ e.jsx("code", { className: "mm-code-block__code", children: T.map((F, E) => {
      const L = m + E, K = !!o;
      return /* @__PURE__ */ e.jsxs("span", { className: cr("mm-code-block__line", i.includes(L) && "mm-code-block__line--highlight"), children: [
        n && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-code-block__line-number", children: L }),
        K ? /* @__PURE__ */ e.jsx("span", { className: "mm-code-block__content mm-code-block__line-hit-area", onClick: () => o == null ? void 0 : o(L, F), onKeyDown: (I) => {
          (I.key === "Enter" || I.key === " ") && (I.preventDefault(), o == null || o(L, F));
        }, role: "button", tabIndex: 0, children: dr(F, j) }) : null,
        !K && /* @__PURE__ */ e.jsx("span", { className: "mm-code-block__content", children: dr(F, j) })
      ] }, `${L}-${F}`);
    }) }) })
  ] });
}
const ur = (...t) => t.filter(Boolean).join(" "), fr = (t) => typeof t == "number" ? `${t}px` : t;
function Il(t) {
  let s = 1, a = 1;
  return t.replace(/\n$/, "").split(`
`).filter((r) => !r.startsWith("@@") && !r.startsWith("---") && !r.startsWith("+++")).map((r) => r.startsWith("+") ? { content: r.slice(1), kind: "added", newNumber: a++ } : r.startsWith("-") ? { content: r.slice(1), kind: "removed", oldNumber: s++ } : { content: r.startsWith(" ") ? r.slice(1) : r, kind: "context", oldNumber: s++, newNumber: a++ });
}
function Fl(t, s) {
  const a = t.replace(/\n$/, "").split(`
`), r = s.replace(/\n$/, "").split(`
`), n = [], m = Math.max(a.length, r.length);
  for (let o = 0; o < m; o += 1) {
    const i = a[o], c = r[o];
    i === c ? n.push({ content: i ?? "", kind: "context", oldNumber: o + 1, newNumber: o + 1 }) : (i !== void 0 && n.push({ content: i, kind: "removed", oldNumber: o + 1 }), c !== void 0 && n.push({ content: c, kind: "added", newNumber: o + 1 }));
  }
  return n;
}
function Xo({ oldCode: t = "", newCode: s = "", diff: a, language: r, title: n, oldLabel: m = "Before", newLabel: o = "After", view: i = "unified", showHeader: c = !0, showLineNumbers: p = !0, copyable: l = !0, copyLabel: d = "Copy result", copiedLabel: y = "Copied", onCopy: b, size: h = "default", theme: j = "dark", wrap: w = !1, radius: z, maxHeight: v, onLineClick: D, className: x, style: _, ...u }) {
  const [S, M] = q(!1), g = a !== void 0 ? Il(a) : Fl(t, s), N = s || g.filter((B) => B.kind !== "removed").map((B) => B.content).join(`
`), f = { ...z !== void 0 && { "--mm-code-diff-radius": fr(z) }, ...v !== void 0 && { "--mm-code-diff-max-height": fr(v) }, ..._ }, T = async () => {
    try {
      await navigator.clipboard.writeText(N), M(!0), b == null || b(N), window.setTimeout(() => M(!1), 1600);
    } catch {
      M(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: ur("mm-code-diff", `mm-code-diff--${j}`, `mm-code-diff--${h}`, `mm-code-diff--${i}`, w && "mm-code-diff--wrap", x), style: f, ...u, children: [
    c && (n || r || l) && /* @__PURE__ */ e.jsxs("div", { className: "mm-code-diff__header", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mm-code-diff__heading", children: [
        n && /* @__PURE__ */ e.jsx("span", { className: "mm-code-diff__title", children: n }),
        r && /* @__PURE__ */ e.jsx("span", { className: "mm-code-diff__language", children: r })
      ] }),
      l && /* @__PURE__ */ e.jsx("button", { "aria-label": S ? y : d, className: "mm-code-diff__copy", onClick: T, type: "button", children: S ? y : d })
    ] }),
    i === "split" && /* @__PURE__ */ e.jsxs("div", { className: "mm-code-diff__split-labels", children: [
      /* @__PURE__ */ e.jsx("span", { children: m }),
      /* @__PURE__ */ e.jsx("span", { children: o })
    ] }),
    /* @__PURE__ */ e.jsx("pre", { className: "mm-code-diff__pre", children: /* @__PURE__ */ e.jsx("code", { children: g.map((B, R) => /* @__PURE__ */ e.jsxs("span", { className: ur("mm-code-diff__line", `mm-code-diff__line--${B.kind}`), onClick: () => D == null ? void 0 : D(B.newNumber ?? B.oldNumber ?? R + 1, B.content, B.kind), children: [
      p && /* @__PURE__ */ e.jsx("span", { className: "mm-code-diff__numbers", "aria-hidden": "true", children: i === "split" ? `${B.oldNumber ?? ""}	${B.newNumber ?? ""}` : B.newNumber ?? B.oldNumber ?? "" }),
      /* @__PURE__ */ e.jsx("span", { className: "mm-code-diff__marker", "aria-hidden": "true", children: B.kind === "added" ? "+" : B.kind === "removed" ? "-" : " " }),
      /* @__PURE__ */ e.jsx("span", { className: "mm-code-diff__content", children: B.content || " " })
    ] }, `${R}-${B.content}`)) }) })
  ] });
}
const hr = (...t) => t.filter(Boolean).join(" "), Rl = (t) => typeof t == "number" ? `${t}px` : t;
function Go({ items: t = [], children: s, renderItem: a, header: r, footer: n, size: m, variant: o, selectionMode: i = "none", selectedKeys: c, defaultSelectedKeys: p = [], onSelectionChange: l, onItemClick: d, gap: y, className: b, style: h, ...j }) {
  const { components: w } = Ge(), z = w.list, v = m ?? (z == null ? void 0 : z.size) ?? "default", D = o ?? (z == null ? void 0 : z.variant) ?? "plain", [x, _] = q(p), u = c ?? x, S = { ...(z == null ? void 0 : z.gap) && { "--mm-list-gap": z.gap }, ...y !== void 0 && { "--mm-list-gap": Rl(y) }, ...h }, M = (f, T) => {
    if (f.disabled || i === "none") {
      d == null || d(f, T);
      return;
    }
    const B = i === "single" ? [f.key] : u.includes(f.key) ? u.filter((R) => R !== f.key) : [...u, f.key];
    c || _(B), l == null || l(B, f), d == null || d(f, T);
  }, g = (f, T, B) => {
    (f.key === "Enter" || f.key === " ") && (f.preventDefault(), M(T, B));
  }, N = s ?? t.map((f, T) => {
    const B = u.includes(f.key), R = i !== "none" || !!f.href || !!d, A = a ? a(f, { selected: B, disabled: !!f.disabled, index: T }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      f.leading && /* @__PURE__ */ e.jsx("span", { className: "mm-list__leading", children: f.leading }),
      /* @__PURE__ */ e.jsxs("span", { className: "mm-list__body", children: [
        /* @__PURE__ */ e.jsx("span", { className: "mm-list__title", children: f.title }),
        f.description && /* @__PURE__ */ e.jsx("span", { className: "mm-list__description", children: f.description }),
        f.content && /* @__PURE__ */ e.jsx("span", { className: "mm-list__content", children: f.content })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "mm-list__aside", children: [
        f.meta && /* @__PURE__ */ e.jsx("span", { className: "mm-list__meta", children: f.meta }),
        f.trailing && /* @__PURE__ */ e.jsx("span", { className: "mm-list__trailing", children: f.trailing })
      ] })
    ] }), F = hr("mm-list__item", B && "mm-list__item--selected", f.disabled && "mm-list__item--disabled", R && "mm-list__item--interactive"), E = { "aria-disabled": f.disabled || void 0, "aria-selected": i !== "none" ? B : void 0, className: F, onClick: () => M(f, T), onKeyDown: (L) => g(L, f, T), role: i !== "none" ? "option" : void 0, tabIndex: R && !f.disabled ? 0 : void 0 };
    return f.href && !f.disabled ? /* @__PURE__ */ Fs("a", { ...E, href: f.href, key: f.key }, A) : /* @__PURE__ */ Fs("div", { ...E, key: f.key }, A);
  });
  return /* @__PURE__ */ e.jsxs("div", { className: hr("mm-list", `mm-list--${v}`, `mm-list--${D}`, b), style: S, ...j, children: [
    r && /* @__PURE__ */ e.jsx("div", { className: "mm-list__header", children: r }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-list__items", role: i !== "none" ? "listbox" : void 0, children: N }),
    n && /* @__PURE__ */ e.jsx("div", { className: "mm-list__footer", children: n })
  ] });
}
const pr = (...t) => t.filter(Boolean).join(" ");
function Jo({ items: t, renderItem: s, header: a, footer: r, size: n = "default", variant: m = "divided", fullWidth: o = !0, onReorder: i, dragHandleLabel: c = (b, h) => `Move item ${h + 1}`, emptyState: p = "No items", className: l, style: d, ...y }) {
  const [b, h] = q(t), [j, w] = q(null), [z, v] = q(null);
  Me(() => {
    h(t);
  }, [t]);
  const D = (g, N) => {
    if (g === N || g < 0 || N < 0 || g >= b.length || N >= b.length) return;
    const f = b[g], T = b[N];
    if (!f || !T || f.disabled || T.disabled) return;
    const B = [...b];
    B.splice(N, 0, ...B.splice(g, 1)), h(B), i == null || i(B, { activeKey: f.key, overKey: T.key, fromIndex: g, toIndex: N });
  }, x = (g, N) => {
    if (N.disabled) {
      g.preventDefault();
      return;
    }
    w(N.key), g.dataTransfer.effectAllowed = "move", g.dataTransfer.setData("text/plain", N.key);
  }, _ = () => {
    w(null), v(null);
  }, u = (g, N) => {
    g.preventDefault();
    const f = g.dataTransfer.getData("text/plain") || j, T = b.findIndex((B) => B.key === f);
    D(T, N), _();
  }, S = (g, N) => {
    var B;
    const f = b[N];
    if (!f || f.disabled) return;
    let T;
    g.key === "ArrowUp" && (T = N - 1), g.key === "ArrowDown" && (T = N + 1), g.key === "House" && (T = 0), g.key === "End" && (T = b.length - 1), !(T === void 0 || T < 0 || T >= b.length || (B = b[T]) != null && B.disabled) && (g.preventDefault(), D(N, T));
  }, M = { ...d, ...o ? { width: "100%" } : {} };
  return /* @__PURE__ */ e.jsxs("div", { ...y, className: pr("mm-sortable-list", `mm-sortable-list--${n}`, `mm-sortable-list--${m}`, o && "mm-sortable-list--full-width", l), style: M, children: [
    a && /* @__PURE__ */ e.jsx("div", { className: "mm-sortable-list__header", children: a }),
    /* @__PURE__ */ e.jsxs("div", { "aria-label": "Sortable list", className: "mm-sortable-list__items", role: "list", children: [
      b.length === 0 && /* @__PURE__ */ e.jsx("div", { className: "mm-sortable-list__empty", children: p }),
      b.map((g, N) => {
        const f = g.key === j, T = g.key === z && !f, B = s ? s(g, { index: N, dragging: f, over: T, disabled: !!g.disabled }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          g.leading && /* @__PURE__ */ e.jsx("span", { className: "mm-sortable-list__leading", children: g.leading }),
          /* @__PURE__ */ e.jsxs("span", { className: "mm-sortable-list__body", children: [
            /* @__PURE__ */ e.jsx("span", { className: "mm-sortable-list__title", children: g.title }),
            g.description && /* @__PURE__ */ e.jsx("span", { className: "mm-sortable-list__description", children: g.description }),
            g.content && /* @__PURE__ */ e.jsx("span", { className: "mm-sortable-list__content", children: g.content })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "mm-sortable-list__aside", children: [
            g.meta && /* @__PURE__ */ e.jsx("span", { className: "mm-sortable-list__meta", children: g.meta }),
            g.trailing && /* @__PURE__ */ e.jsx("span", { className: "mm-sortable-list__trailing", children: g.trailing })
          ] })
        ] });
        return /* @__PURE__ */ e.jsxs("div", { "aria-disabled": g.disabled || void 0, "aria-posinset": N + 1, "aria-setsize": b.length, className: pr("mm-sortable-list__item", f && "mm-sortable-list__item--dragging", T && "mm-sortable-list__item--over", g.disabled && "mm-sortable-list__item--disabled"), draggable: !g.disabled, onDragEnd: _, onDragOver: (R) => {
          R.preventDefault(), g.disabled || v(g.key);
        }, onDragStart: (R) => x(R, g), onDrop: (R) => u(R, N), onKeyDown: (R) => S(R, N), role: "listitem", tabIndex: g.disabled ? -1 : 0, children: [
          /* @__PURE__ */ e.jsx("button", { "aria-label": c(g, N), className: "mm-sortable-list__handle", disabled: g.disabled, onClick: (R) => R.preventDefault(), tabIndex: -1, type: "button", children: /* @__PURE__ */ e.jsx(Er, { "aria-hidden": "true", size: 18 }) }),
          /* @__PURE__ */ e.jsx("div", { className: "mm-sortable-list__content-area", children: B })
        ] }, g.key);
      })
    ] }),
    r && /* @__PURE__ */ e.jsx("div", { className: "mm-sortable-list__footer", children: r })
  ] });
}
const ua = (...t) => t.filter(Boolean).join(" ");
function Zo({ items: t, activeKey: s, defaultActiveKey: a, onChange: r, orientation: n, size: m, activationMode: o = "automatic", fullWidth: i = !1, fitted: c = !1, lazy: p = !1, keepMounted: l = !1, className: d, style: y }) {
  const { components: b } = Ge(), h = b.tabs, j = He().replace(/:/g, ""), w = t.find((f) => !f.disabled), [z, v] = q(a ?? (w == null ? void 0 : w.key) ?? ""), D = s ?? z, x = Math.max(0, t.findIndex((f) => f.key === D)), _ = t[x] ?? w, u = n ?? (h == null ? void 0 : h.orientation) ?? "horizontal", S = m ?? (h == null ? void 0 : h.size) ?? "default", M = i || !!(h != null && h.fullWidth), g = (f) => {
    f.disabled || (s === void 0 && v(f.key), r == null || r(f.key, f));
  }, N = (f, T) => {
    var A, F, E, L, K;
    const B = u === "vertical" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
    if (f.key === "Home") {
      f.preventDefault(), t.find((I) => !I.disabled) && ((F = document.getElementById(`${j}-tab-${(A = t.find((I) => !I.disabled)) == null ? void 0 : A.key}`)) == null || F.focus());
      return;
    }
    if (f.key === "End") {
      f.preventDefault(), [...t].reverse().find((I) => !I.disabled) && ((L = document.getElementById(`${j}-tab-${(E = [...t].reverse().find((I) => !I.disabled)) == null ? void 0 : E.key}`)) == null || L.focus());
      return;
    }
    const R = f.key === B[0] ? -1 : f.key === B[1] ? 1 : 0;
    if (R) {
      f.preventDefault();
      for (let I = 1; I <= t.length; I += 1) {
        const W = t[(T + R * I + t.length * 2) % t.length];
        if (!W.disabled) {
          (K = document.getElementById(`${j}-tab-${W.key}`)) == null || K.focus(), o === "automatic" && g(W);
          break;
        }
      }
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: ua("mm-tabs", `mm-tabs--${u}`, `mm-tabs--${S}`, M && "mm-tabs--full-width", c && "mm-tabs--fitted", d), style: y, children: [
    /* @__PURE__ */ e.jsx("div", { "aria-label": "Tabs", className: "mm-tabs__list", role: "tablist", children: t.map((f, T) => /* @__PURE__ */ e.jsxs("button", { "aria-controls": `${j}-panel-${f.key}`, "aria-selected": (_ == null ? void 0 : _.key) === f.key, className: ua("mm-tabs__tab", (_ == null ? void 0 : _.key) === f.key && "mm-tabs__tab--active", f.disabled && "mm-tabs__tab--disabled"), disabled: f.disabled, id: `${j}-tab-${f.key}`, onClick: () => g(f), onKeyDown: (B) => N(B, T), role: "tab", tabIndex: (_ == null ? void 0 : _.key) === f.key ? 0 : -1, type: "button", children: [
      f.icon && /* @__PURE__ */ e.jsx("span", { className: "mm-tabs__icon", children: f.icon }),
      /* @__PURE__ */ e.jsx("span", { children: f.label }),
      f.badge && /* @__PURE__ */ e.jsx("span", { className: "mm-tabs__badge", children: f.badge })
    ] }, f.key)) }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-tabs__panels", children: t.map((f) => {
      const T = (_ == null ? void 0 : _.key) === f.key;
      return p && !T && !l ? null : /* @__PURE__ */ e.jsx("div", { "aria-hidden": !T, "aria-labelledby": `${j}-tab-${f.key}`, className: ua("mm-tabs__panel", T && "mm-tabs__panel--active"), hidden: !T, id: `${j}-panel-${f.key}`, role: "tabpanel", tabIndex: 0, children: f.content }, f.key);
    }) })
  ] });
}
const Ts = (...t) => t.filter(Boolean).join(" ");
function Qo({
  items: t,
  activeIndex: s,
  defaultActiveIndex: a = 0,
  onChange: r,
  orientation: n = "horizontal",
  variant: m = "default",
  effect: o = "slide",
  slidesPerView: i = 1,
  gap: c = 16,
  loop: p = !0,
  autoplay: l = !1,
  interval: d = 5e3,
  pauseOnHover: y = !0,
  pauseOnFocus: b = !0,
  pauseOnInteraction: h = !0,
  draggable: j = !0,
  showArrows: w = !0,
  showDots: z = !0,
  showProgress: v = !1,
  showThumbnails: D = !1,
  thumbnailSize: x = 64,
  transitionDuration: _ = 320,
  previousLabel: u = "Previous slide",
  nextLabel: S = "Next slide",
  playLabel: M = "Start autoplay",
  pauseLabel: g = "Pause autoplay",
  dotLabel: N = (F) => `Go to slide ${F + 1}`,
  lazy: f = !1,
  renderItem: T,
  className: B,
  style: R,
  "aria-label": A = "Carousel"
}) {
  const F = He().replace(/:/g, ""), E = ke(null), L = ke(null), K = ke(null), I = t.length, W = Math.max(1, Math.min(Math.floor(i), I || 1)), k = m === "peek" && W === 1 ? 1.16 : W, Y = Math.max(1, I - W + 1), [P, C] = q(Math.min(Math.max(0, a), Y - 1)), [V, Q] = q(!1), [H, X] = q(l), [ce, se] = q(0), te = Math.min(Math.max(0, s ?? P), Y - 1), ve = (Z) => {
    var he, ze;
    if (!I) return;
    const G = Z >= te ? 1 : -1;
    let me = p ? (Z + Y) % Y : Math.min(Math.max(0, Z), Y - 1);
    for (let je = 0; je < Y && ((he = t[me]) != null && he.disabled); je += 1) me = p ? (me + G + Y) % Y : me + G;
    me < 0 || me >= Y || (ze = t[me]) != null && ze.disabled || (s === void 0 && C(me), r == null || r(me, t[me]));
  }, ge = () => ve(te + 1), ae = () => ve(te - 1);
  ka(() => {
    const Z = E.current, G = L.current, me = G == null ? void 0 : G.firstElementChild;
    if (!Z || !G || !me) return;
    const he = () => {
      const je = Number.parseFloat(getComputedStyle(G).gap) || 0;
      se((n === "horizontal" ? me.getBoundingClientRect().width : me.getBoundingClientRect().height) + je);
    };
    he();
    const ze = typeof ResizeObserver < "u" ? new ResizeObserver(he) : void 0;
    return ze == null || ze.observe(Z), ze == null || ze.observe(me), () => ze == null ? void 0 : ze.disconnect();
  }, [n, W, k, c, I]), Me(() => {
    if (!l || !H || V || I < 2 || d <= 0) return;
    const Z = window.setInterval(ge, d);
    return () => window.clearInterval(Z);
  }, [l, H, V, d, te, I]);
  const fe = (Z) => {
    var G, me;
    !j || o !== "slide" || Z.target instanceof Element && Z.target.closest("button, a, input, select, textarea") || (K.current = { x: Z.clientX, y: Z.clientY }, (me = (G = Z.currentTarget).setPointerCapture) == null || me.call(G, Z.pointerId), h && Q(!0));
  }, de = (Z) => {
    const G = K.current;
    if (K.current = null, !G || !j || o !== "slide") return;
    const me = n === "horizontal" ? Z.clientX - G.x : Z.clientY - G.y;
    Math.abs(me) > 40 && (me < 0 ? ge : ae)(), h && Q(!1);
  }, oe = (Z) => {
    const G = n === "horizontal" ? "ArrowLeft" : "ArrowUp", me = n === "horizontal" ? "ArrowRight" : "ArrowDown";
    Z.key === G && (Z.preventDefault(), ae()), Z.key === me && (Z.preventDefault(), ge()), Z.key === "House" && (Z.preventDefault(), ve(0)), Z.key === "End" && (Z.preventDefault(), ve(Y - 1));
  };
  if (!I) return null;
  const xe = typeof c == "number" ? `${c}px` : c, ie = { "--mm-carousel-visible": k, "--mm-carousel-gap": xe, "--mm-carousel-duration": `${_}ms`, transform: o === "slide" ? n === "horizontal" ? `translate3d(${-te * ce}px, 0, 0)` : `translate3d(0, ${-te * ce}px, 0)` : void 0 }, re = (Z) => {
    (y || b) && Q(Z);
  }, U = (Z) => o === "fade" ? Z === te : Z >= te && Z < te + W;
  return /* @__PURE__ */ e.jsxs("section", { "aria-label": A, "aria-roledescription": "carousel", className: Ts("mm-carousel", `mm-carousel--${n}`, `mm-carousel--variant-${m}`, `mm-carousel--effect-${o}`, B), style: R, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mm-carousel__header", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "mm-carousel__status", "aria-live": "polite", children: [
        te + 1,
        " / ",
        Y
      ] }),
      v && /* @__PURE__ */ e.jsx("div", { "aria-hidden": "true", className: "mm-carousel__progress", children: /* @__PURE__ */ e.jsx("span", { style: { width: `${(te + 1) / Y * 100}%` } }) }),
      l && I > 1 && /* @__PURE__ */ e.jsx("button", { "aria-label": H ? g : M, className: "mm-carousel__play", onClick: () => X((Z) => !Z), type: "button", children: H ? /* @__PURE__ */ e.jsx(Ws, { "aria-hidden": "true", size: 14 }) : /* @__PURE__ */ e.jsx(Ks, { "aria-hidden": "true", size: 14 }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-carousel__viewport", onBlur: () => re(!1), onFocus: () => b && re(!0), onKeyDown: oe, onMouseEnter: () => y && re(!0), onMouseLeave: () => re(!1), onPointerDown: fe, onPointerUp: de, ref: E, role: "group", tabIndex: 0, children: [
      /* @__PURE__ */ e.jsx("div", { className: "mm-carousel__track", ref: L, style: ie, children: t.map((Z, G) => {
        const me = te === G, he = U(G);
        return /* @__PURE__ */ e.jsx("article", { "aria-hidden": !he, "aria-label": typeof Z.label == "string" ? Z.label : void 0, className: Ts("mm-carousel__slide", me && "mm-carousel__slide--active", he && "mm-carousel__slide--visible", Z.disabled && "mm-carousel__slide--disabled"), id: `${F}-slide-${Z.key}`, role: "group", children: T ? T(Z, G, { active: me, index: G, visible: he }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          Z.image && /* @__PURE__ */ e.jsx("img", { alt: Z.alt ?? "", className: "mm-carousel__image", loading: f && !he ? "lazy" : "eager", src: Z.image }),
          (Z.eyebrow || Z.title || Z.description || Z.badge || Z.content) && /* @__PURE__ */ e.jsxs("div", { className: "mm-carousel__content", children: [
            Z.eyebrow && /* @__PURE__ */ e.jsx("span", { className: "mm-carousel__eyebrow", children: Z.eyebrow }),
            Z.badge && /* @__PURE__ */ e.jsx("span", { className: "mm-carousel__badge", children: Z.badge }),
            Z.title && /* @__PURE__ */ e.jsx("h3", { children: Z.title }),
            Z.description && /* @__PURE__ */ e.jsx("p", { children: Z.description }),
            Z.content
          ] })
        ] }) }, Z.key);
      }) }),
      w && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("button", { "aria-label": u, className: "mm-carousel__arrow mm-carousel__arrow--previous", disabled: !p && te === 0, onClick: ae, type: "button", children: /* @__PURE__ */ e.jsx(Kt, { "aria-hidden": "true", size: 20 }) }),
        /* @__PURE__ */ e.jsx("button", { "aria-label": S, className: "mm-carousel__arrow mm-carousel__arrow--next", disabled: !p && te === Y - 1, onClick: ge, type: "button", children: /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 20 }) })
      ] })
    ] }),
    D && /* @__PURE__ */ e.jsx("div", { "aria-label": "Choose slide thumbnail", className: "mm-carousel__thumbnails", role: "tablist", children: t.slice(0, Y).map((Z, G) => /* @__PURE__ */ e.jsx("button", { "aria-label": N(G, Z), "aria-selected": te === G, className: Ts("mm-carousel__thumbnail", te === G && "mm-carousel__thumbnail--active"), onClick: () => ve(G), role: "tab", style: { "--mm-carousel-thumbnail-size": `${x}px` }, type: "button", children: Z.image ? /* @__PURE__ */ e.jsx("img", { alt: "", src: Z.image }) : /* @__PURE__ */ e.jsx("span", { children: G + 1 }) }, Z.key)) }),
    z && Y > 1 && /* @__PURE__ */ e.jsx("div", { "aria-label": "Choose slide", className: "mm-carousel__dots", role: "tablist", children: t.slice(0, Y).map((Z, G) => /* @__PURE__ */ e.jsx("button", { "aria-label": N(G, Z), "aria-selected": te === G, className: Ts("mm-carousel__dot", te === G && "mm-carousel__dot--active"), onClick: () => ve(G), role: "tab", type: "button" }, Z.key)) })
  ] });
}
const Cl = (...t) => t.filter(Boolean).join(" ");
function ec({ children: t, className: s, contentPadding: a, decorative: r = !1, labelPosition: n = "center", orientation: m = "horizontal", size: o = "default", style: i, tone: c = "default", variant: p = "solid", ...l }) {
  const d = t !== void 0 && m === "horizontal", y = a ? { ...i, "--mm-divider-content-padding": a } : i;
  return /* @__PURE__ */ e.jsx("div", { "aria-hidden": r || void 0, "aria-orientation": r ? void 0 : m, className: Cl("mm-divider", `mm-divider--${m}`, `mm-divider--${o}`, `mm-divider--${c}`, `mm-divider--${p}`, d && `mm-divider--label-${n}`, s), role: r ? void 0 : "separator", style: y, ...l, children: d ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("span", { className: "mm-divider__line" }),
    /* @__PURE__ */ e.jsx("span", { className: "mm-divider__label", children: t }),
    /* @__PURE__ */ e.jsx("span", { className: "mm-divider__line" })
  ] }) : /* @__PURE__ */ e.jsx("span", { className: "mm-divider__line" }) });
}
const Wl = (...t) => t.filter(Boolean).join(" ");
function tc({ children: t, className: s, color: a, disabled: r = !1, external: n = !1, externalIcon: m = "auto", iconLeft: o, iconRight: i, loading: c = !1, newTab: p = !1, onClick: l, rel: d, size: y = "default", style: b, tabIndex: h, target: j, variant: w = "default", ...z }) {
  const v = m === "always" || m === "auto" && n, D = (_) => {
    if (r || c) {
      _.preventDefault();
      return;
    }
    l == null || l(_);
  }, x = a ? { ...b, "--mm-link-color": a } : b;
  return /* @__PURE__ */ e.jsxs("a", { "aria-busy": c || void 0, "aria-disabled": r || void 0, className: Wl("mm-link", `mm-link--${y}`, `mm-link--${w}`, r && "mm-link--disabled", c && "mm-link--loading", s), onClick: D, rel: n || p ? d ?? "noreferrer" : d, style: x, target: n || p ? j ?? "_blank" : j, tabIndex: r ? -1 : h, ...z, children: [
    c ? /* @__PURE__ */ e.jsx(Mt, { "aria-hidden": "true", className: "mm-link__loader", size: 15 }) : o,
    /* @__PURE__ */ e.jsx("span", { children: t }),
    i ?? (v && /* @__PURE__ */ e.jsx(un, { "aria-hidden": "true", size: 15 }))
  ] });
}
const xr = (...t) => t.filter(Boolean).join(" ");
function sc({ aspectRatio: t, bordered: s = !1, className: a, disableHover: r = !1, fallback: n, fit: m = "cover", hoverDuration: o = 220, hoverScale: i = 1.08, imageClassName: c, onClick: p, onError: l, onLoad: d, overlay: y, overlayPosition: b = "center", radius: h = "default", showLoader: j = !0, src: w, style: z, ...v }) {
  const [D, x] = q(!1), [_, u] = q(!1), S = !!p, M = { "--mm-image-hover-duration": typeof o == "number" ? `${o}ms` : o, "--mm-image-hover-scale": Math.max(1, i), ...z, ...t ? { aspectRatio: t } : {} }, g = (N) => {
    S && p && (N.key === "Enter" || N.key === " ") && (N.preventDefault(), p(N));
  };
  return /* @__PURE__ */ e.jsxs("span", { "aria-busy": !D && !_ || void 0, className: xr("mm-image", `mm-image--${h}`, s && "mm-image--bordered", S && "mm-image--interactive", r && "mm-image--disable-hover", a), onClick: S ? p : void 0, onKeyDown: g, role: S ? "button" : void 0, style: M, tabIndex: S ? 0 : void 0, children: [
    !_ && w ? /* @__PURE__ */ e.jsx("img", { ...v, className: xr("mm-image__element", `mm-image__element--${m}`, c), onError: (N) => {
      u(!0), l == null || l(N);
    }, onLoad: (N) => {
      x(!0), d == null || d(N);
    }, src: w }) : /* @__PURE__ */ e.jsx("span", { className: "mm-image__fallback", children: n ?? "Image unavailable" }),
    !D && !_ && j && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", className: "mm-image__loader" }),
    y && /* @__PURE__ */ e.jsx("span", { className: `mm-image__overlay mm-image__overlay--${b}`, children: y })
  ] });
}
const fs = (...t) => t.filter(Boolean).join(" "), br = (t) => {
  if (!Number.isFinite(t)) return "0:00";
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
function ac({ "aria-label": t = "Video player", aspectRatio: s = "16 / 9", autoHideControls: a = !1, autoPlay: r = !1, className: n, controls: m = !0, defaultPlaybackRate: o = 1, defaultVolume: i = 1, fallback: c = "Video is unavailable", fit: p = "contain", height: l, loop: d = !1, muted: y = !1, onEnded: b, onError: h, onPause: j, onPlay: w, onTimeUpdate: z, playsInline: v = !0, poster: D, preload: x = "metadata", rates: _ = [0.5, 1, 1.25, 1.5, 2], showClosedCaptioningControl: u = !0, showFullscreenControl: S = !0, showPlaybackRateControl: M = !0, showVolumeControl: g = !0, size: N = "default", sources: f, src: T, style: B, title: R, track: A, videoClassName: F, width: E }) {
  const L = ke(null), K = ke(null), [I, W] = q(!0), [k, Y] = q(0), [P, C] = q(0), [V, Q] = q(Math.min(1, Math.max(0, i))), [H, X] = q(y), [ce, se] = q(o), [te, ve] = q(!1), [ge, ae] = q(!!(A != null && A.default)), [fe, de] = q(!1), [oe, xe] = q(!1), [ie, re] = q(!1);
  Me(() => {
    const _e = L.current;
    _e && (_e.volume = V, _e.muted = H, _e.playbackRate = ce);
  }, [H, ce, V]), Me(() => {
    const _e = () => ve(document.fullscreenElement === K.current);
    return document.addEventListener("fullscreenchange", _e), () => document.removeEventListener("fullscreenchange", _e);
  }, []), Me(() => {
    var _e;
    !A || !((_e = L.current) != null && _e.textTracks[0]) || (L.current.textTracks[0].mode = ge ? "showing" : "hidden");
  }, [ge, A]);
  const U = async () => {
    const _e = L.current;
    if (_e)
      if (_e.paused)
        try {
          await _e.play();
        } catch {
        }
      else _e.pause();
  }, Z = (_e) => {
    const Le = L.current;
    Le && (Le.currentTime = _e, Y(_e));
  }, G = () => {
    const _e = !H;
    X(_e), Q(_e ? 0 : V || 1);
  }, me = (_e) => {
    Q(_e), X(_e === 0);
  }, he = async () => {
    var _e, Le;
    K.current && (document.fullscreenElement ? await document.exitFullscreen() : await ((Le = (_e = K.current).requestFullscreen) == null ? void 0 : Le.call(_e)));
  }, ze = (_e) => {
    _e.target === K.current && (_e.key === " " || _e.key.toLowerCase() === "k" ? (_e.preventDefault(), U()) : _e.key === "ArrowLeft" ? (_e.preventDefault(), Z(Math.max(0, k - 5))) : _e.key === "ArrowRight" ? (_e.preventDefault(), Z(Math.min(P, k + 5))) : _e.key.toLowerCase() === "m" ? (_e.preventDefault(), G()) : _e.key.toLowerCase() === "f" && (_e.preventDefault(), he()));
  }, je = { "--mm-video-aspect-ratio": s, ...E !== void 0 && { width: typeof E == "number" ? `${E}px` : E }, ...l !== void 0 && { height: typeof l == "number" ? `${l}px` : l }, ...B }, Ne = P > 0 ? k / P * 100 : 0, Re = !!(T || f != null && f.length);
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: fs("mm-video-player", `mm-video-player--${p}`, `mm-video-player--${N}`, !m && "mm-video-player--controls-hidden", a && !ie && "mm-video-player--controls-idle", te && "mm-video-player--fullscreen", n), onKeyDown: ze, onMouseEnter: () => re(!0), onMouseLeave: () => re(!1), ref: K, role: "region", style: je, tabIndex: 0, children: [
    Re && !oe ? /* @__PURE__ */ e.jsxs("video", { autoPlay: r, className: fs("mm-video-player__video", F), loop: d, muted: H, onClick: U, onDurationChange: (_e) => C(_e.currentTarget.duration), onEnded: () => {
      W(!0), b == null || b();
    }, onError: (_e) => {
      xe(!0), h == null || h(_e);
    }, onLoadedMetadata: (_e) => {
      C(_e.currentTarget.duration), _e.currentTarget.playbackRate = o;
    }, onPause: () => {
      W(!0), j == null || j();
    }, onPlay: () => {
      W(!1), w == null || w();
    }, onTimeUpdate: (_e) => {
      const Le = _e.currentTarget.currentTime;
      Y(Le), z == null || z(Le, _e.currentTarget.duration);
    }, playsInline: v, poster: D, preload: x, ref: L, title: R, children: [
      f == null ? void 0 : f.map((_e) => /* @__PURE__ */ e.jsx("source", { src: _e.src, type: _e.type }, `${_e.src}-${_e.type ?? ""}`)),
      !f && T ? /* @__PURE__ */ e.jsx("source", { src: T }) : null,
      A ? /* @__PURE__ */ e.jsx("track", { default: A.default, kind: A.kind ?? "captions", label: A.label, src: A.src, srcLang: A.srcLang }) : null
    ] }) : /* @__PURE__ */ e.jsx("div", { className: "mm-video-player__fallback", children: c }),
    Re && !oe && /* @__PURE__ */ e.jsx("button", { "aria-label": I ? "Play video" : "Pause video", className: fs("mm-video-player__center-button", !I && !ie && "mm-video-player__center-button--hidden"), onClick: U, type: "button", children: I ? /* @__PURE__ */ e.jsx(Ks, { fill: "currentColor", size: 28 }) : /* @__PURE__ */ e.jsx(Ws, { fill: "currentColor", size: 28 }) }),
    m && Re && !oe && /* @__PURE__ */ e.jsxs("div", { className: "mm-video-player__controls", children: [
      /* @__PURE__ */ e.jsx("input", { "aria-label": "Video progress", className: "mm-video-player__progress", max: P || 0, min: "0", onChange: (_e) => Z(Number(_e.target.value)), style: { "--mm-video-progress": `${Ne}%` }, type: "range", value: k }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-video-player__control-row", children: [
        /* @__PURE__ */ e.jsx("button", { "aria-label": I ? "Play video" : "Pause video", className: "mm-video-player__control", onClick: U, type: "button", children: I ? /* @__PURE__ */ e.jsx(Ks, { fill: "currentColor", size: 17 }) : /* @__PURE__ */ e.jsx(Ws, { fill: "currentColor", size: 17 }) }),
        g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("button", { "aria-label": H || V === 0 ? "Unmute video" : "Mute video", className: "mm-video-player__control", onClick: G, type: "button", children: H || V === 0 ? /* @__PURE__ */ e.jsx(Fr, { size: 17 }) : /* @__PURE__ */ e.jsx(Ir, { size: 17 }) }),
          /* @__PURE__ */ e.jsx("input", { "aria-label": "Volume", className: "mm-video-player__volume", max: "1", min: "0", onChange: (_e) => me(Number(_e.target.value)), step: "0.01", type: "range", value: H ? 0 : V })
        ] }),
        /* @__PURE__ */ e.jsxs("span", { className: "mm-video-player__time", children: [
          br(k),
          " / ",
          br(P)
        ] }),
        /* @__PURE__ */ e.jsx("span", { className: "mm-video-player__spacer" }),
        u && A && /* @__PURE__ */ e.jsx("button", { "aria-label": ge ? "Hide captions" : "Show captions", className: fs("mm-video-player__control", ge && "mm-video-player__control--active"), onClick: () => ae((_e) => !_e), type: "button", children: /* @__PURE__ */ e.jsx(xn, { size: 17 }) }),
        M && /* @__PURE__ */ e.jsxs("div", { className: "mm-video-player__settings", children: [
          /* @__PURE__ */ e.jsx("button", { "aria-expanded": fe, "aria-label": "Playback settings", className: "mm-video-player__control", onClick: () => de((_e) => !_e), type: "button", children: /* @__PURE__ */ e.jsx(Br, { size: 17 }) }),
          fe && /* @__PURE__ */ e.jsx("div", { className: "mm-video-player__rates", children: _.map((_e) => /* @__PURE__ */ e.jsxs("button", { className: fs(_e === ce && "mm-video-player__rate--active"), onClick: () => {
            se(_e), de(!1);
          }, type: "button", children: [
            _e,
            "×"
          ] }, _e)) })
        ] }),
        S && /* @__PURE__ */ e.jsx("button", { "aria-label": te ? "Exit fullscreen" : "Enter fullscreen", className: "mm-video-player__control", onClick: () => void he(), type: "button", children: te ? /* @__PURE__ */ e.jsx(hn, { size: 17 }) : /* @__PURE__ */ e.jsx(Sr, { size: 17 }) })
      ] })
    ] })
  ] });
}
const _r = (...t) => t.filter(Boolean).join(" "), vr = (t) => {
  if (!Number.isFinite(t)) return "0:00";
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
function rc({ "aria-label": t = "Audio player", artist: s, artwork: a, autoPlay: r = !1, className: n, compact: m = !1, defaultPlaybackRate: o = 1, defaultVolume: i = 1, download: c = !1, fallback: p = "Audio is unavailable", loop: l = !1, muted: d = !1, onEnded: y, onError: b, onPause: h, onPlay: j, onTimeUpdate: w, preload: z = "metadata", rates: v = [0.75, 1, 1.25, 1.5, 2], showPlaybackRateControl: D = !0, showVolumeControl: x = !0, skipSeconds: _ = 10, size: u = "default", sources: S, src: M, style: g, title: N, width: f }) {
  const T = ke(null), [B, R] = q(!0), [A, F] = q(0), [E, L] = q(0), [K, I] = q(Math.min(1, Math.max(0, i))), [W, k] = q(d), [Y, P] = q(o), [C, V] = q(!1), [Q, H] = q(!1);
  Me(() => {
    const de = T.current;
    de && (de.volume = K, de.muted = W, de.playbackRate = Y);
  }, [W, Y, K]);
  const X = async () => {
    const de = T.current;
    if (de)
      if (de.paused)
        try {
          await de.play();
        } catch {
        }
      else de.pause();
  }, ce = (de) => {
    const oe = T.current;
    oe && (oe.currentTime = Math.max(0, Math.min(E || 0, de)), F(oe.currentTime));
  }, se = () => {
    const de = !W;
    k(de), I(de ? 0 : K || 1);
  }, te = (de) => {
    I(de), k(de === 0);
  }, ve = (de) => {
    de.key === " " || de.key.toLowerCase() === "k" ? (de.preventDefault(), X()) : de.key === "ArrowLeft" ? (de.preventDefault(), ce(A - _)) : de.key === "ArrowRight" ? (de.preventDefault(), ce(A + _)) : de.key.toLowerCase() === "m" && (de.preventDefault(), se());
  }, ge = !!(M || S != null && S.length), ae = E > 0 ? A / E * 100 : 0, fe = { ...f !== void 0 && { width: typeof f == "number" ? `${f}px` : f }, ...g };
  return /* @__PURE__ */ e.jsxs("div", { "aria-label": t, className: _r("mm-audio-player", `mm-audio-player--${u}`, m && "mm-audio-player--compact", Q && "mm-audio-player--failed", n), onKeyDown: ve, role: "region", style: fe, tabIndex: 0, children: [
    ge && !Q ? /* @__PURE__ */ e.jsxs("audio", { autoPlay: r, loop: l, muted: W, onDurationChange: (de) => L(de.currentTarget.duration), onEnded: () => {
      R(!0), y == null || y();
    }, onError: (de) => {
      H(!0), b == null || b(de);
    }, onLoadedMetadata: (de) => {
      L(de.currentTarget.duration), de.currentTarget.playbackRate = o;
    }, onPause: () => {
      R(!0), h == null || h();
    }, onPlay: () => {
      R(!1), j == null || j();
    }, onTimeUpdate: (de) => {
      const oe = de.currentTarget.currentTime;
      F(oe), w == null || w(oe, de.currentTarget.duration);
    }, preload: z, ref: T, children: [
      S == null ? void 0 : S.map((de) => /* @__PURE__ */ e.jsx("source", { src: de.src, type: de.type }, `${de.src}-${de.type ?? ""}`)),
      !S && M ? /* @__PURE__ */ e.jsx("source", { src: M }) : null
    ] }) : null,
    Q || !ge ? /* @__PURE__ */ e.jsx("div", { className: "mm-audio-player__fallback", children: p }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mm-audio-player__main", children: [
        a ? /* @__PURE__ */ e.jsx("img", { alt: "", className: "mm-audio-player__artwork", src: a }) : /* @__PURE__ */ e.jsx("div", { "aria-hidden": "true", className: "mm-audio-player__artwork mm-audio-player__artwork--placeholder", children: /* @__PURE__ */ e.jsx("span", { children: "♪" }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-audio-player__info", children: [
          /* @__PURE__ */ e.jsx("div", { className: "mm-audio-player__title", children: N ?? "Audio track" }),
          s ? /* @__PURE__ */ e.jsx("div", { className: "mm-audio-player__artist", children: s }) : null
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-audio-player__controls", children: [
        /* @__PURE__ */ e.jsx("input", { "aria-label": "Audio progress", className: "mm-audio-player__progress", max: E || 0, min: "0", onChange: (de) => ce(Number(de.target.value)), style: { "--mm-audio-progress": `${ae}%` }, type: "range", value: A }),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-audio-player__row", children: [
          /* @__PURE__ */ e.jsx("button", { "aria-label": "Rewind", className: "mm-audio-player__button", onClick: () => ce(A - _), type: "button", children: /* @__PURE__ */ e.jsx(Tn, { size: 16 }) }),
          /* @__PURE__ */ e.jsx("button", { "aria-label": B ? "Play audio" : "Pause audio", className: "mm-audio-player__button mm-audio-player__button--primary", onClick: X, type: "button", children: B ? /* @__PURE__ */ e.jsx(Ks, { fill: "currentColor", size: 18 }) : /* @__PURE__ */ e.jsx(Ws, { fill: "currentColor", size: 18 }) }),
          /* @__PURE__ */ e.jsx("button", { "aria-label": "Fast forward", className: "mm-audio-player__button", onClick: () => ce(A + _), type: "button", children: /* @__PURE__ */ e.jsx(yn, { size: 16 }) }),
          x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx("button", { "aria-label": W || K === 0 ? "Unmute audio" : "Mute audio", className: "mm-audio-player__button", onClick: se, type: "button", children: W || K === 0 ? /* @__PURE__ */ e.jsx(Fr, { size: 17 }) : /* @__PURE__ */ e.jsx(Ir, { size: 17 }) }),
            /* @__PURE__ */ e.jsx("input", { "aria-label": "Volume", className: "mm-audio-player__volume", max: "1", min: "0", onChange: (de) => te(Number(de.target.value)), step: "0.01", type: "range", value: W ? 0 : K })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "mm-audio-player__time", children: [
            vr(A),
            " / ",
            vr(E)
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "mm-audio-player__spacer" }),
          D && /* @__PURE__ */ e.jsxs("div", { className: "mm-audio-player__settings", children: [
            /* @__PURE__ */ e.jsx("button", { "aria-expanded": C, "aria-label": "Playback settings", className: "mm-audio-player__button", onClick: () => V((de) => !de), type: "button", children: /* @__PURE__ */ e.jsx(Br, { size: 17 }) }),
            C && /* @__PURE__ */ e.jsx("div", { className: "mm-audio-player__rates", children: v.map((de) => /* @__PURE__ */ e.jsxs("button", { className: _r(de === Y && "mm-audio-player__rate--active"), onClick: () => {
              P(de), V(!1);
            }, type: "button", children: [
              de,
              "×"
            ] }, de)) })
          ] }),
          c && M ? /* @__PURE__ */ e.jsx("a", { "aria-label": "Download audio", className: "mm-audio-player__button", download: !0, href: M, children: /* @__PURE__ */ e.jsx(Ar, { size: 17 }) }) : null
        ] })
      ] })
    ] })
  ] });
}
const Es = (...t) => t.filter(Boolean).join(" "), Kl = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  removed: "Removed",
  deprecated: "Deprecated",
  security: "Security"
};
function nc({
  "aria-label": t = "Change log",
  className: s,
  entries: a,
  defaultExpandedIds: r = [],
  expandedIds: n,
  onExpandedChange: m,
  size: o = "default",
  variant: i = "default",
  groupBy: c = "none",
  reverse: p = !1,
  maxHeight: l
}) {
  const [d, y] = q(r), b = n ?? d, h = p ? [...a].reverse() : a, j = mt(() => {
    if (c === "none") return [{ key: "all", label: null, entries: h }];
    const z = /* @__PURE__ */ new Map();
    return h.forEach((v) => {
      const D = String(c === "date" ? v.date : c === "version" ? v.version ?? "Other" : v.category ?? "Other");
      z.set(D, [...z.get(D) ?? [], v]);
    }), Array.from(z, ([v, D]) => ({ key: v, label: v, entries: D }));
  }, [c, h]), w = (z) => {
    const v = b.includes(z.id) ? b.filter((D) => D !== z.id) : [...b, z.id];
    n === void 0 && y(v), m == null || m(v, z);
  };
  return /* @__PURE__ */ e.jsx("section", { "aria-label": t, className: Es("mm-change-log", `mm-change-log--${o}`, `mm-change-log--${i}`, s), style: { "--mm-change-log-max-height": typeof l == "number" ? `${l}px` : l }, children: /* @__PURE__ */ e.jsx("div", { className: "mm-change-log__body", children: j.map((z) => /* @__PURE__ */ e.jsxs("div", { className: "mm-change-log__group", children: [
    z.label ? /* @__PURE__ */ e.jsx("h3", { className: "mm-change-log__group-title", children: z.label }) : null,
    /* @__PURE__ */ e.jsx("div", { className: "mm-change-log__entries", children: z.entries.map((v) => {
      var x;
      const D = b.includes(v.id);
      return /* @__PURE__ */ e.jsxs("article", { className: Es("mm-change-log__entry", D && "mm-change-log__entry--expanded", v.breaking && "mm-change-log__entry--breaking"), children: [
        /* @__PURE__ */ e.jsx("div", { className: "mm-change-log__marker", "aria-hidden": "true", children: /* @__PURE__ */ e.jsx("span", { className: Es("mm-change-log__dot", `mm-change-log__dot--${v.status ?? "changed"}`) }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "mm-change-log__content", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "mm-change-log__meta", children: [
            /* @__PURE__ */ e.jsx("time", { children: v.date }),
            v.version ? /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(En, { "aria-hidden": "true", size: 13 }),
              v.version
            ] }) : null,
            v.category ? /* @__PURE__ */ e.jsx("span", { children: v.category }) : null
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "mm-change-log__title-row", children: [
            /* @__PURE__ */ e.jsx("h4", { children: v.href ? /* @__PURE__ */ e.jsx("a", { href: v.href, children: v.title }) : v.title }),
            v.status ? /* @__PURE__ */ e.jsx("span", { className: Es("mm-change-log__status", `mm-change-log__status--${v.status}`), children: Kl[v.status] }) : null,
            v.breaking ? /* @__PURE__ */ e.jsx("span", { className: "mm-change-log__breaking", children: "Breaking" }) : null
          ] }),
          v.description ? /* @__PURE__ */ e.jsx("p", { children: v.description }) : null,
          /* @__PURE__ */ e.jsxs("div", { className: "mm-change-log__byline", children: [
            v.author ? /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(An, { "aria-hidden": "true", size: 13 }),
              v.author
            ] }) : null,
            v.branch ? /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx($n, { "aria-hidden": "true", size: 13 }),
              v.branch
            ] }) : null,
            (x = v.tags) == null ? void 0 : x.map((_, u) => /* @__PURE__ */ e.jsx("span", { className: "mm-change-log__tag", children: _ }, `${v.id}-tag-${u}`))
          ] }),
          v.details ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsxs("button", { "aria-expanded": D, className: "mm-change-log__details-trigger", onClick: () => w(v), type: "button", children: [
              D ? /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", size: 15 }) : /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 15 }),
              " ",
              D ? "Hide details" : "View details"
            ] }),
            D ? /* @__PURE__ */ e.jsx("div", { className: "mm-change-log__details", children: v.details }) : null
          ] }) : null
        ] })
      ] }, v.id);
    }) })
  ] }, z.key)) }) });
}
const gr = (...t) => t.filter(Boolean).join(" ");
function ic({
  items: t,
  orientation: s = "vertical",
  align: a = "start",
  size: r = "default",
  variant: n = "default",
  lineStyle: m = "solid",
  reverse: o = !1,
  activeKey: i,
  defaultActiveKey: c,
  onActiveChange: p,
  expandedKeys: l,
  defaultExpandedKeys: d = [],
  onExpandedChange: y,
  collapsible: b = !1,
  maxHeight: h,
  className: j,
  style: w,
  "aria-label": z = "Timeline"
}) {
  const v = o ? [...t].reverse() : t, [D, x] = q(c), [_, u] = q(d), S = l ?? _, M = (f) => {
    f.disabled || (i === void 0 && x(f.key), p == null || p(f.key, f));
  }, g = (f) => {
    const T = S.includes(f.key) ? S.filter((B) => B !== f.key) : [...S, f.key];
    l === void 0 && u(T), y == null || y(T, f);
  }, N = (f) => f.icon ?? (f.status === "completed" || f.status === "success" ? /* @__PURE__ */ e.jsx(Ct, { "aria-hidden": "true", size: 14 }) : f.status === "current" ? /* @__PURE__ */ e.jsx(za, { "aria-hidden": "true", size: 14 }) : f.status === "error" ? /* @__PURE__ */ e.jsx(rt, { "aria-hidden": "true", size: 14 }) : /* @__PURE__ */ e.jsx(Tr, { "aria-hidden": "true", size: 10 }));
  return /* @__PURE__ */ e.jsx("section", { "aria-label": z, className: gr("mm-timeline", `mm-timeline--${s}`, `mm-timeline--align-${a}`, `mm-timeline--${r}`, `mm-timeline--${n}`, `mm-timeline--line-${m}`, j), style: { ...w, "--mm-timeline-max-height": typeof h == "number" ? `${h}px` : h }, children: /* @__PURE__ */ e.jsx("div", { className: "mm-timeline__list", children: v.map((f, T) => {
    const B = S.includes(f.key), R = (i ?? D) === f.key, A = !!f.details, F = f.href ? /* @__PURE__ */ e.jsx("a", { href: f.href, children: f.title }) : f.title;
    return /* @__PURE__ */ e.jsxs("article", { "aria-current": R ? "step" : void 0, className: gr("mm-timeline__item", R && "mm-timeline__item--active", f.disabled && "mm-timeline__item--disabled", f.status && `mm-timeline__item--${f.status}`), children: [
      /* @__PURE__ */ e.jsx("div", { className: "mm-timeline__rail", children: /* @__PURE__ */ e.jsx("button", { "aria-label": typeof f.title == "string" ? `Select ${f.title}` : `Select event ${T + 1}`, className: "mm-timeline__marker", disabled: f.disabled, onClick: () => M(f), type: "button", children: N(f) }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "mm-timeline__body", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "mm-timeline__meta", children: [
          f.date && /* @__PURE__ */ e.jsx("time", { children: f.date }),
          f.status && /* @__PURE__ */ e.jsx("span", { className: "mm-timeline__status", children: f.status })
        ] }),
        /* @__PURE__ */ e.jsx("h3", { children: F }),
        f.description && /* @__PURE__ */ e.jsx("p", { className: "mm-timeline__description", children: f.description }),
        f.content && /* @__PURE__ */ e.jsx("div", { className: "mm-timeline__content", children: f.content }),
        f.actions && /* @__PURE__ */ e.jsx("div", { className: "mm-timeline__actions", children: f.actions }),
        b && A && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("button", { "aria-expanded": B, className: "mm-timeline__details-trigger", onClick: () => g(f), type: "button", children: [
            B ? /* @__PURE__ */ e.jsx(xt, { "aria-hidden": "true", size: 15 }) : /* @__PURE__ */ e.jsx(pt, { "aria-hidden": "true", size: 15 }),
            " ",
            B ? "Hide details" : "View details"
          ] }),
          B && /* @__PURE__ */ e.jsx("div", { className: "mm-timeline__details", children: f.details })
        ] })
      ] })
    ] }, f.key);
  }) }) });
}
const Yl = (...t) => t.filter(Boolean).join(" ");
function lc({
  children: t,
  hasMore: s = !0,
  loading: a = !1,
  onLoadMore: r,
  threshold: n = 0.25,
  rootMargin: m = "160px",
  initialLoad: o = !1,
  disabled: i = !1,
  direction: c = "vertical",
  reverse: p = !1,
  height: l,
  endMessage: d = "All items have been loaded.",
  loadingContent: y,
  error: b,
  onRetry: h,
  retryLabel: j = "Try again",
  ariaLabel: w = "Infinite scroll",
  className: z,
  style: v
}) {
  const D = ke(null), x = ke(null), _ = ke(!1), u = ke(!1), [S, M] = q(!1), g = a || S, N = at(async () => {
    if (!(i || !s || g || b || _.current)) {
      _.current = !0, M(!0);
      try {
        await r();
      } finally {
        _.current = !1, M(!1);
      }
    }
  }, [i, b, s, g, r]);
  Me(() => {
    !o || u.current || i || !s || g || b || (u.current = !0, N().catch(() => {
    }));
  }, [i, b, s, o, g, N]), Me(() => {
    const B = x.current;
    if (!B || i || !s || b || typeof IntersectionObserver > "u") return;
    const R = D.current, A = new IntersectionObserver((F) => {
      var E;
      (E = F[0]) != null && E.isIntersecting && N().catch(() => {
      });
    }, { root: R, rootMargin: m, threshold: Math.min(Math.max(n, 0), 1) });
    return A.observe(B), () => A.disconnect();
  }, [i, c, b, s, N, m, n]);
  const f = async () => {
    h ? await h() : await N();
  }, T = g ? y ?? /* @__PURE__ */ e.jsxs("span", { className: "mm-infinite-scroll__loading", children: [
    /* @__PURE__ */ e.jsx(fn, { "aria-hidden": "true", className: "mm-infinite-scroll__spinner", size: 16 }),
    " Loading more"
  ] }) : b ? /* @__PURE__ */ e.jsxs("div", { className: "mm-infinite-scroll__error", children: [
    /* @__PURE__ */ e.jsx("span", { children: b }),
    h && /* @__PURE__ */ e.jsx("button", { className: "mm-infinite-scroll__retry", onClick: () => void f().catch(() => {
    }), type: "button", children: j })
  ] }) : s ? null : /* @__PURE__ */ e.jsx("span", { className: "mm-infinite-scroll__end", children: d });
  return /* @__PURE__ */ e.jsxs("section", { "aria-busy": g, "aria-label": w, className: Yl("mm-infinite-scroll", `mm-infinite-scroll--${c}`, p && "mm-infinite-scroll--reverse", z), ref: D, style: { ...v, "--mm-infinite-scroll-height": typeof l == "number" ? `${l}px` : l }, children: [
    /* @__PURE__ */ e.jsx("div", { className: "mm-infinite-scroll__content", children: t }),
    /* @__PURE__ */ e.jsx("div", { "aria-hidden": "true", className: "mm-infinite-scroll__sentinel", ref: x }),
    /* @__PURE__ */ e.jsx("div", { className: "mm-infinite-scroll__status", role: "status", children: T })
  ] });
}
const fa = (...t) => t.filter(Boolean).join(" "), qt = (t) => typeof t == "number" ? `${t}px` : t;
function oc({
  children: t,
  contentPosition: s = "center",
  contentAlign: a = "center",
  fullWidth: r = !0,
  widthMode: n,
  maxWidth: m,
  header: o,
  footer: i,
  stickyHeader: c = !1,
  sidebar: p,
  sidebarWidth: l,
  rightSidebar: d,
  rightSidebarWidth: y,
  dashboardMode: b,
  contentWidth: h = "full",
  contentMaxWidth: j,
  sidebarCollapsible: w = !0,
  sidebarToggleLabel: z = "Toggle sidebar",
  defaultSidebarOpen: v = !1,
  sidebarOpen: D,
  onSidebarOpenChange: x,
  height: _,
  minHeight: u,
  className: S,
  style: M,
  ...g
}) {
  const N = {
    ...M,
    ..._ !== void 0 ? { "--mm-layout-height": qt(_) } : {},
    ...u !== void 0 ? { "--mm-layout-min-height": qt(u) } : {},
    ..._ !== void 0 && u === void 0 ? { "--mm-layout-min-height": "0px" } : {},
    ...m !== void 0 ? { "--mm-layout-max-width": qt(m) } : {},
    ...l !== void 0 ? { "--mm-layout-sidebar-width": qt(l) } : {},
    ...y !== void 0 ? { "--mm-layout-right-sidebar-width": qt(y) } : {},
    ...j !== void 0 ? { "--mm-layout-content-max-width": qt(j) } : {}
  }, f = n ?? (r ? "full" : "constrained"), [T, B] = q(v), R = D ?? T, A = () => {
    const W = !R;
    D === void 0 && B(W), x == null || x(W);
  }, F = fa("mm-layout__content-inner", `mm-layout__content-inner--${h}`, `mm-layout__content-inner--${s}`, `mm-layout__content-inner--${a}`), E = /* @__PURE__ */ e.jsxs("main", { className: "mm-layout__content", children: [
    /* @__PURE__ */ e.jsx("button", { "aria-expanded": R, "aria-label": z, className: "mm-layout__sidebar-toggle", onClick: A, type: "button", children: "☰" }),
    /* @__PURE__ */ e.jsx("div", { className: F, children: t })
  ] }), L = p !== void 0 && /* @__PURE__ */ e.jsx("aside", { className: fa("mm-layout__sidebar", R && "mm-layout__sidebar--open"), children: p }), K = d !== void 0 && /* @__PURE__ */ e.jsx("aside", { className: "mm-layout__right-sidebar", children: d }), I = b !== void 0;
  return /* @__PURE__ */ e.jsx("div", { ...g, className: fa("mm-layout", `mm-layout--${s}`, `mm-layout--${a}`, `mm-layout--${f}`, I && "mm-layout--dashboard", I && `mm-layout--dashboard-${b}`, d !== void 0 && "mm-layout--has-right-sidebar", !w && "mm-layout--sidebar-always-open", c && "mm-layout--sticky-header", S), style: N, children: I ? b === "header-sidebar-footer" ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    o !== void 0 && /* @__PURE__ */ e.jsx("header", { className: "mm-layout__header", children: o }),
    /* @__PURE__ */ e.jsxs("div", { className: "mm-layout__dashboard-body", children: [
      L,
      /* @__PURE__ */ e.jsx("div", { className: "mm-layout__dashboard-main", children: E }),
      K
    ] }),
    i !== void 0 && /* @__PURE__ */ e.jsx("footer", { className: "mm-layout__footer", children: i })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "mm-layout__dashboard-body", children: [
    L,
    /* @__PURE__ */ e.jsxs("div", { className: "mm-layout__dashboard-main", children: [
      o !== void 0 && /* @__PURE__ */ e.jsx("header", { className: "mm-layout__header", children: o }),
      E,
      i !== void 0 && /* @__PURE__ */ e.jsx("footer", { className: "mm-layout__footer", children: i })
    ] }),
    K
  ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    o !== void 0 && /* @__PURE__ */ e.jsx("header", { className: "mm-layout__header", children: o }),
    E,
    i !== void 0 && /* @__PURE__ */ e.jsx("footer", { className: "mm-layout__footer", children: i })
  ] }) });
}
const Hl = (...t) => t.filter(Boolean).join(" "), Ds = (t) => typeof t == "number" ? `${t}px` : t;
function cc({ children: t, direction: s = "row", align: a = "center", justify: r = "flex-start", wrap: n = "nowrap", gap: m, rowGap: o, columnGap: i, inline: c = !1, fullWidth: p = !1, fullHeight: l = !1, flex: d, grow: y, shrink: b, basis: h, separator: j, separatorAriaHidden: w = !0, as: z = "div", className: v, style: D, ...x }) {
  const _ = Na.toArray(t), u = z, S = {
    ...m !== void 0 && { "--mm-space-gap": Ds(m) },
    ...o !== void 0 && { "--mm-space-row-gap": Ds(o) },
    ...i !== void 0 && { "--mm-space-column-gap": Ds(i) },
    ...d !== void 0 && { "--mm-space-flex": typeof d == "number" ? String(d) : d },
    ...y !== void 0 && { "--mm-space-grow": y },
    ...b !== void 0 && { "--mm-space-shrink": b },
    ...h !== void 0 && { "--mm-space-basis": Ds(h) },
    ...D
  };
  return /* @__PURE__ */ e.jsx(u, { className: Hl("mm-space", `mm-space--${s}`, `mm-space--align-${a}`, `mm-space--justify-${r}`, `mm-space--${n}`, c && "mm-space--inline", p && "mm-space--full-width", l && "mm-space--full-height", !!j && "mm-space--with-separator", v), style: S, ...x, children: _.map((M, g) => /* @__PURE__ */ e.jsxs("span", { className: "mm-space__item", children: [
    M,
    j && g < _.length - 1 ? /* @__PURE__ */ e.jsx("span", { "aria-hidden": w, className: "mm-space__separator", children: j }) : null
  ] }, `space-item-${g}`)) });
}
const Aa = (...t) => t.filter(Boolean).join(" "), wa = (t) => typeof t == "number" ? `${t}px` : t, As = (t = 24) => Math.min(24, Math.max(0, t)), yr = ["xs", "sm", "md", "lg", "xl", "xxl"];
function Xt(t) {
  return typeof t == "number" ? { span: t } : t;
}
function jr(t) {
  return t ? {
    ...t.span !== void 0 && { "--mm-grid-span": As(t.span) },
    ...t.offset !== void 0 && { "--mm-grid-offset": As(t.offset) },
    ...t.order !== void 0 && { "--mm-grid-order": t.order },
    ...t.pull !== void 0 && { "--mm-grid-pull": As(t.pull) },
    ...t.push !== void 0 && { "--mm-grid-push": As(t.push) },
    ...t.flex !== void 0 && { "--mm-grid-flex": typeof t.flex == "number" ? String(t.flex) : t.flex }
  } : {};
}
function mc({ children: t, fluid: s = !1, maxWidth: a = 1200, className: r, style: n, ...m }) {
  return /* @__PURE__ */ e.jsx("div", { className: Aa("mm-grid", s && "mm-grid--fluid", r), style: { "--mm-grid-max-width": wa(a), ...n }, ...m, children: t });
}
function dc({ children: t, gutter: s = 0, align: a = "stretch", justify: r = "flex-start", wrap: n = !0, className: m, style: o, ...i }) {
  const [c, p] = Array.isArray(s) ? s : [s, s];
  return /* @__PURE__ */ e.jsx("div", { className: Aa("mm-grid__row", `mm-grid__row--align-${a}`, `mm-grid__row--justify-${r}`, !n && "mm-grid__row--nowrap", m), style: { "--mm-grid-gutter-x": wa(c), "--mm-grid-gutter-y": wa(p), ...o }, ...i, children: t });
}
function uc({ children: t, span: s = 24, offset: a = 0, order: r = 0, pull: n = 0, push: m = 0, flex: o, xs: i, sm: c, md: p, lg: l, xl: d, xxl: y, className: b, style: h, ...j }) {
  const w = { span: s, offset: a, order: r, pull: n, push: m, flex: o }, z = { xs: Xt(i), sm: Xt(c), md: Xt(p), lg: Xt(l), xl: Xt(d), xxl: Xt(y) };
  let v = w;
  const D = yr.reduce((_, u) => {
    v = { ...v, ...z[u] ?? {} };
    const S = jr(v);
    return Object.entries(S).forEach(([M, g]) => {
      _[`--mm-grid-${u}${M.replace("--mm-grid", "")}`] = g;
    }), _;
  }, {}), x = yr.filter((_) => {
    var u;
    return (u = z[_]) == null ? void 0 : u.hidden;
  }).reduce((_, u) => ({ ..._, [u]: "true" }), {});
  return /* @__PURE__ */ e.jsx("div", { className: Aa("mm-grid__col", b), "data-mm-grid-hidden-lg": x.lg, "data-mm-grid-hidden-md": x.md, "data-mm-grid-hidden-sm": x.sm, "data-mm-grid-hidden-xl": x.xl, "data-mm-grid-hidden-xs": x.xs, "data-mm-grid-hidden-xxl": x.xxl, style: { ...jr(w), ...D, ...h }, ...j, children: t });
}
const wr = (...t) => t.filter(Boolean).join(" "), Bs = (t) => typeof t == "number" ? String(t) + "px" : t, Ul = ["xs", "sm", "md", "lg", "xl", "xxl"], ha = (t) => Math.max(1, Math.min(12, Math.round(t)));
function fc({
  children: t,
  columns: s = 3,
  gap: a = 16,
  rowGap: r,
  columnGap: n,
  minColumnWidth: m,
  as: o = "div",
  itemAs: i = "div",
  itemClassName: c,
  itemStyle: p,
  className: l,
  style: d,
  ...y
}) {
  const b = typeof s == "number" ? {} : s, h = typeof s == "number" ? s : b.xs ?? 1;
  let j = ha(h);
  const w = Ul.reduce((x, _) => (b[_] !== void 0 && (j = ha(b[_])), x["--mm-masonry-" + _ + "-columns"] = j, x), {}), z = {
    "--mm-masonry-columns": ha(h),
    "--mm-masonry-gap": Bs(a),
    "--mm-masonry-row-gap": Bs(r ?? a),
    "--mm-masonry-column-gap": Bs(n ?? a),
    ...m !== void 0 && { "--mm-masonry-column-width": Bs(m) },
    ...w,
    ...d
  }, v = o, D = i;
  return /* @__PURE__ */ e.jsx(v, { className: wr("mm-masonry", m !== void 0 && "mm-masonry--width-driven", l), style: z, ...y, children: Na.toArray(t).map((x, _) => /* @__PURE__ */ e.jsx(D, { className: wr("mm-masonry__item", c), style: p, children: x }, "masonry-item-" + _)) });
}
export {
  Jl as Accordion,
  io as ActivityFeed,
  Kn as Alert,
  no as AlertInline,
  Ql as AlertProvider,
  rc as AudioPlayer,
  Xl as AutoComplete,
  Tl as Avatar,
  si as Badge,
  oo as BadgeIndicator,
  lo as Banner,
  vo as Breadcrumbs,
  Pe as Button,
  ri as ButtonMenu,
  go as Calendar,
  yo as Card,
  Qo as Carousel,
  nc as ChangeLog,
  Qt as Checkbox,
  qo as CodeBlock,
  Xo as CodeDiff,
  uc as Col,
  Bi as ColorPicker,
  Zl as ConfigProvider,
  li as ConfirmationDialog,
  uo as ConfirmationDialogProvider,
  mo as ContextMenu,
  ll as CookieBanner,
  jo as CookieBannerProvider,
  Sa as Dialog,
  ec as Divider,
  Mo as Drawer,
  $o as Empty,
  _o as FileUpload,
  Xi as Form,
  mc as Grid,
  sc as Image,
  lc as InfiniteScroll,
  Ps as Input,
  Po as InputCurrency,
  Eo as InputMask,
  xa as InputNumber,
  To as InputOTP,
  zo as InputPassword,
  ho as KeyboardShortcut,
  So as Label,
  oc as Layout,
  bo as Lightbox,
  tc as Link,
  Go as List,
  fc as Masonry,
  Ta as Menu,
  On as MiniToast,
  ao as MiniToastProvider,
  qn as MiniToastStack,
  Fo as NavigationMenu,
  Do as Pagination,
  No as PriceTable,
  No as PricingTable,
  Ro as ProfileMenu,
  Ao as Progress,
  Gr as Radio,
  Ko as RadioCard,
  Yo as RadioCardGroup,
  Pi as RadioGroup,
  Bo as Rating,
  Gl as ResizablePanels,
  dc as Row,
  gi as ScrollArea,
  Gt as Select,
  Co as Sidebar,
  Oo as Skeleton,
  st as Slider,
  Jo as SortableList,
  cc as Space,
  Vo as Spinner,
  Pl as Switch,
  Uo as SwitchCard,
  Ho as SwitchGroup,
  ko as Table,
  Zo as Tabs,
  co as Tag,
  Io as Text,
  Lo as Textarea,
  po as ThemeSwitcher,
  Wo as TimePicker,
  ic as Timeline,
  Hn as ToastNotification,
  to as ToastNotificationProvider,
  Vn as ToastNotificationStack,
  xo as Toolbar,
  ji as ToolbarGroup,
  yi as ToolbarItem,
  Ni as ToolbarMenu,
  wi as ToolbarSeparator,
  ki as ToolbarSpacer,
  wt as Tooltip,
  ac as VideoPlayer,
  Gi as defaultCalendarRangePresets,
  pl as inputMaskPresets,
  eo as useAlert,
  Ge as useConfig,
  fo as useConfirmationDialog,
  wo as useCookieBanner,
  ro as useMiniToast,
  so as useToastNotification
};
