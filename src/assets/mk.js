!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? n(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], n)
    : n(
        ((e =
          'undefined' != typeof globalThis ? globalThis : e || self).MusicKit =
          {})
      );
})(this, function (e) {
  'use strict';
  var n = void 0 !== typeof self ? self : this;
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ function __decorate$1(
    e,
    n,
    d,
    h
  ) {
    var p,
      y = arguments.length,
      m =
        y < 3
          ? n
          : null === h
          ? (h = Object.getOwnPropertyDescriptor(n, d))
          : h;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      m = Reflect.decorate(e, n, d, h);
    else
      for (var g = e.length - 1; g >= 0; g--)
        (p = e[g]) && (m = (y < 3 ? p(m) : y > 3 ? p(n, d, m) : p(n, d)) || m);
    return y > 3 && m && Object.defineProperty(n, d, m), m;
  }
  function __metadata$1(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  function __awaiter$1(e, n, d, h) {
    return new (d || (d = Promise))(function (p, y) {
      function fulfilled(e) {
        try {
          step(h.next(e));
        } catch (Vt) {
          y(Vt);
        }
      }
      function rejected(e) {
        try {
          step(h.throw(e));
        } catch (Vt) {
          y(Vt);
        }
      }
      function step(e) {
        var n;
        e.done
          ? p(e.value)
          : ((n = e.value),
            n instanceof d
              ? n
              : new d(function (e) {
                  e(n);
                })).then(fulfilled, rejected);
      }
      step((h = h.apply(e, n || [])).next());
    });
  }
  function formatArtworkURL(e, n, d) {
    return (
      (n = n || e.height || 100),
      (d = d || e.width || 100),
      window.devicePixelRatio >= 1.5 && ((d *= 2), (n *= 2)),
      e.url
        .replace('{h}', '' + n)
        .replace('{w}', '' + d)
        .replace('{f}', 'jpeg')
    );
  }
  const K = () => {},
    asAsync = (e) => {
      e.then(K, K);
    },
    d = K;
  function deprecationWarning(e, n = {}) {
    var d;
    const h =
        null !== (d = n.message) && void 0 !== d
          ? d
          : e + ' has been deprecated',
      p = [];
    n.since && p.push('since: ' + n.since),
      n.until && p.push('until: ' + n.until),
      console.warn(
        'Deprecation Warning: ' + h + (p.length > 0 ? ` (${p.join(', ')})` : '')
      );
  }
  function isLive(e) {
    var n;
    return !!(null === (n = null == e ? void 0 : e.attributes) || void 0 === n
      ? void 0
      : n.isLive);
  }
  function isStream$1(e) {
    var n, d;
    return (
      'stream' ===
      (null ===
        (d =
          null === (n = null == e ? void 0 : e.attributes) || void 0 === n
            ? void 0
            : n.playParams) || void 0 === d
        ? void 0
        : d.format)
    );
  }
  function isLiveRadioStation(e) {
    return isLive(e) && isStream$1(e);
  }
  function isLiveRadioKind(e, n) {
    var d;
    return (
      isLiveRadioStation(e) &&
      (null === (d = e.attributes) || void 0 === d ? void 0 : d.mediaKind) === n
    );
  }
  function isBroadcastRadio(e) {
    return (
      isLive(e) &&
      isStream$1(e) &&
      void 0 !== e.attributes.stationProviderName &&
      'Shoutcast' === e.attributes.streamingRadioSubType
    );
  }
  function getFilterFromFlags(e) {
    const n = e.includes('radio-live'),
      d = e.includes('radio-aod'),
      h = e.includes('radio-broadcast');
    return (e) =>
      (!n || (n && !isLiveRadioStation(e))) &&
      (!d ||
        (d &&
          !(function (e) {
            return (
              !isLive(e) &&
              isStream$1(e) &&
              'Episode' === e.attributes.streamingRadioSubType
            );
          })(e))) &&
      (!h || (h && !isBroadcastRadio(e)));
  }
  const h = {
    album: 'albums',
    albums: 'albums',
    artist: 'artists',
    artists: 'artists',
    song: 'songs',
    songs: 'songs',
  };
  function normalizeContentType(e) {
    let n = h[e];
    return (
      n ||
      ((n = e.replace(/_|[A-Z]/g, (e, n) =>
        '_' === e ? '-' : ((e = e.toLowerCase()), 0 === n ? e : '-' + e)
      )),
      e.endsWith('y')
        ? (n = n.substring(0, n.length - 1) + 'ies')
        : n.endsWith('s') || (n += 's'),
      (h[e] = n),
      n)
    );
  }
  const p = {
      400: 'REQUEST_ERROR',
      401: 'UNAUTHORIZED_ERROR',
      403: 'ACCESS_DENIED',
      404: 'NOT_FOUND',
      405: 'NOT_FOUND',
      413: 'REQUEST_ERROR',
      414: 'REQUEST_ERROR',
      429: 'QUOTA_EXCEEDED',
      500: 'SERVER_ERROR',
      501: 'NOT_FOUND',
      503: 'SERVICE_UNAVAILABLE',
    },
    y = {
      '-1004': 'DEVICE_LIMIT',
      '-1017': 'GEO_BLOCK',
      1010: p[404],
      2002: 'AUTHORIZATION_ERROR',
      2034: 'TOKEN_EXPIRED',
      3059: 'DEVICE_LIMIT',
      3063: 'SUBSCRIPTION_ERROR',
      3076: 'CONTENT_UNAVAILABLE',
      3082: 'CONTENT_RESTRICTED',
      3084: 'STREAM_UPSELL',
      5002: p[500],
      180202: 'PLAYREADY_CBC_ENCRYPTION_ERROR',
      190121: 'WIDEVINE_CDM_EXPIRED',
    },
    m = [],
    g = new Set([
      'CONTENT_EQUIVALENT',
      'CONTENT_UNAVAILABLE',
      'CONTENT_UNSUPPORTED',
      'SERVER_ERROR',
      'SUBSCRIPTION_ERROR',
      'UNSUPPORTED_ERROR',
      'USER_INTERACTION_REQUIRED',
    ]);
  class MKError extends Error {
    constructor(e, n) {
      super(),
        (this.errorCode = 'UNKNOWN_ERROR'),
        e && g.has(e)
          ? ((this.name = this.errorCode = e),
            (this.message = this.description = n || e))
          : n || 'string' != typeof e
          ? ((this.name = this.errorCode = e || 'UNKNOWN_ERROR'),
            n && (this.message = this.description = n))
          : ((this.name = this.errorCode = 'UNKNOWN_ERROR'),
            (this.message = this.description = e)),
        m.push(this),
        Error.captureStackTrace && Error.captureStackTrace(this, MKError);
    }
    static get errors() {
      return m;
    }
    static playActivityError(e) {
      return new this('PLAY_ACTIVITY', e);
    }
    static parseError(e) {
      return new this('PARSE_ERROR', e);
    }
    static responseError(e) {
      const { status: n, statusText: d } = e,
        h = new this(p[n] || 'NETWORK_ERROR', d || '' + n);
      return (h.data = e), h;
    }
    static serverError(e, n = 'UNKNOWN_ERROR') {
      let {
        status: d,
        dialog: h,
        failureType: p,
        customerMessage: m,
        errorMessage: g,
        message: _,
      } = e;
      h &&
        ((_ = h.message || h.customerMessage || h.errorMessage),
        (h.message = _));
      const b = y[p] || y[d] || n,
        T = new this(b, _ || m || g);
      return (
        'STREAM_UPSELL' === b &&
          h &&
          h.okButtonAction &&
          h.okButtonAction.url &&
          (h.okButtonAction.url = h.okButtonAction.url.replace(
            /\&(?:challenge|key-system|uri|user-initiated)=[^\&]+/gim,
            ''
          )),
        (T.dialog = h),
        T
      );
    }
    static internalError(e) {
      return new this(MKError.INTERNAL_ERROR, e);
    }
  }
  (MKError.ACCESS_DENIED = p[403]),
    (MKError.AGE_VERIFICATION = 'AGE_VERIFICATION'),
    (MKError.AUTHORIZATION_ERROR = y[2002]),
    (MKError.CONFIGURATION_ERROR = 'CONFIGURATION_ERROR'),
    (MKError.CONTENT_EQUIVALENT = 'CONTENT_EQUIVALENT'),
    (MKError.CONTENT_RESTRICTED = y[3082]),
    (MKError.CONTENT_UNAVAILABLE = y[3076]),
    (MKError.CONTENT_UNSUPPORTED = 'CONTENT_UNSUPPORTED'),
    (MKError.DEVICE_LIMIT = y[3059]),
    (MKError.GEO_BLOCK = y[-1017]),
    (MKError.INVALID_ARGUMENTS = 'INVALID_ARGUMENTS'),
    (MKError.PLAYREADY_CBC_ENCRYPTION_ERROR = 'PLAYREADY_CBC_ENCRYPTION_ERROR'),
    (MKError.MEDIA_CERTIFICATE = 'MEDIA_CERTIFICATE'),
    (MKError.MEDIA_DESCRIPTOR = 'MEDIA_DESCRIPTOR'),
    (MKError.MEDIA_LICENSE = 'MEDIA_LICENSE'),
    (MKError.MEDIA_KEY = 'MEDIA_KEY'),
    (MKError.MEDIA_PLAYBACK = 'MEDIA_PLAYBACK'),
    (MKError.MEDIA_SESSION = 'MEDIA_SESSION'),
    (MKError.NETWORK_ERROR = 'NETWORK_ERROR'),
    (MKError.NOT_FOUND = y[1010]),
    (MKError.PARSE_ERROR = 'PARSE_ERROR'),
    (MKError.PLAY_ACTIVITY = 'PLAY_ACTIVITY'),
    (MKError.QUOTA_EXCEEDED = p[429]),
    (MKError.REQUEST_ERROR = p[400]),
    (MKError.SERVER_ERROR = y[5002]),
    (MKError.SERVICE_UNAVAILABLE = p[503]),
    (MKError.STREAM_UPSELL = y[3084]),
    (MKError.SUBSCRIPTION_ERROR = y[3063]),
    (MKError.TOKEN_EXPIRED = y[2034]),
    (MKError.UNAUTHORIZED_ERROR = p[401]),
    (MKError.UNKNOWN_ERROR = 'UNKNOWN_ERROR'),
    (MKError.UNSUPPORTED_ERROR = 'UNSUPPORTED_ERROR'),
    (MKError.USER_INTERACTION_REQUIRED = 'USER_INTERACTION_REQUIRED'),
    (MKError.INTERNAL_ERROR = 'INTERNAL_ERROR'),
    (MKError.OUTPUT_RESTRICTED = 'OUTPUT_RESTRICTED'),
    (MKError.WIDEVINE_CDM_EXPIRED = 'WIDEVINE_CDM_EXPIRED');
  class GenericStorage {
    constructor(e = {}) {
      this.data = e;
    }
    get data() {
      return this._data;
    }
    set data(e) {
      this._data = e;
    }
    get length() {
      return this.keys.length;
    }
    get keys() {
      return Object.keys(this.data);
    }
    getItem(e) {
      return this.data[e] || null;
    }
    setItem(e, n) {
      this.data[e] = n;
    }
    removeItem(e) {
      delete this.data[e];
    }
    clear() {
      this.keys.forEach((e) => this.removeItem(e));
    }
    key(e) {
      return this.keys[e] || null;
    }
  }
  function getCookie(e = '', n = document.cookie) {
    const d = n.match(new RegExp(`(?:^|;\\s*)${e}=([^;]*)`));
    if (d) return d[1];
  }
  function setCookie(e, n, d = '', h = 14, p, y) {
    const m = new Date();
    p = null != p ? p : window;
    const g =
      (y =
        null != y
          ? y
          : /\./.test(p.location.hostname)
          ? p.location.hostname
          : '').length > 0
        ? `domain=${y}; `
        : '';
    m.setTime(m.getTime() + 24 * h * 60 * 60 * 1e3);
    let _ = '';
    'https:' === p.location.protocol && (_ = '; secure'),
      (p.document.cookie = `${e}=${n}; expires=${m.toUTCString()}; ${g}path=${d}${_}`);
  }
  function removeCookie(e, n, d) {
    setCookie(e, '', '/', 0, n, d);
  }
  function hasSessionStorage() {
    let e = !1;
    try {
      e = 'undefined' != typeof sessionStorage;
    } catch (Vt) {}
    return e;
  }
  function getSessionStorage() {
    let e;
    return hasSessionStorage() && (e = sessionStorage), e;
  }
  function hasLocalStorage() {
    let e = !1;
    try {
      e = 'undefined' != typeof localStorage;
    } catch (Vt) {}
    return e;
  }
  function getLocalStorage() {
    let e;
    return hasLocalStorage() && (e = localStorage), e;
  }
  class Notifications {
    constructor(e = [], n) {
      (this._eventRegistry = {}),
        e.forEach((e) => {
          this._eventRegistry[e] = [];
        }),
        n &&
          n.namespace &&
          (this.dispatchNamespace = 'com.apple.' + n.namespace),
        this.shouldStorageDispatch &&
          ((this._handleGlobalStorageEvent =
            this._handleGlobalStorageEvent.bind(this)),
          window.addEventListener('storage', this._handleGlobalStorageEvent));
    }
    get shouldStorageDispatch() {
      return (
        'undefined' != typeof window &&
        hasSessionStorage() &&
        this.dispatchNamespace
      );
    }
    addEventListener(e, n) {
      Array.isArray(this._eventRegistry[e]) && this._eventRegistry[e].push(n);
    }
    dispatchEvent(e, n) {
      Array.isArray(this._eventRegistry[e]) &&
        this._eventRegistry[e].forEach((e) => e(n));
    }
    dispatchDistributedEvent(e, n) {
      var d;
      if ((this.dispatchEvent(e, n), this.shouldStorageDispatch)) {
        const h = `${this.dispatchNamespace}:${e}`;
        null === (d = getSessionStorage()) ||
          void 0 === d ||
          d.setItem(h, JSON.stringify(n));
      }
    }
    removeEventListener(e, n) {
      if (Array.isArray(this._eventRegistry[e])) {
        const d = this._eventRegistry[e].indexOf(n);
        this._eventRegistry[e].splice(d, 1);
      }
    }
    _handleGlobalStorageEvent(e) {
      var n;
      if (
        this.dispatchNamespace &&
        (null === (n = e.key) || void 0 === n
          ? void 0
          : n.startsWith(this.dispatchNamespace + ':'))
      ) {
        const n = e.key.substring(this.dispatchNamespace.length + 1);
        this.dispatchEvent(n, JSON.parse(e.newValue));
      }
    }
  }
  var _ =
    'undefined' != typeof FastBoot
      ? FastBoot.require('buffer').Buffer
      : 'undefined' != typeof process &&
        null !== process.versions &&
        null !== process.versions.node
      ? Buffer
      : window.Buffer;
  function memoize(e) {
    return function (...n) {
      let d = '',
        h = n.length;
      for (e._memoized = e._memoized || {}; h--; ) {
        const e = n[h];
        d += e === Object(e) ? JSON.stringify(e) : e;
      }
      return d in e._memoized ? e._memoized[d] : (e._memoized[d] = e(...n));
    };
  }
  function generateUUID() {
    let e = strRandomizer() + strRandomizer();
    for (; e.length < 16; ) e += strRandomizer();
    return e.slice(0, 16);
  }
  function strRandomizer() {
    return Math.random().toString(16).substring(2);
  }
  const b = memoize((e) => /^[a|i|l|p]{1}\.[a-zA-Z0-9]+$/.test(e));
  function isNodeEnvironment$1(e) {
    const isDefined = (e) => null != e;
    return (
      0 === arguments.length && 'undefined' != typeof process && (e = process),
      (isDefined(e) && isDefined(e.versions) && isDefined(e.versions.node)) ||
        'undefined' != typeof FastBoot
    );
  }
  const T = memoize(
    isNodeEnvironment$1()
      ? (e) => _.from(e, 'base64').toString('binary')
      : (e) => window.atob(e)
  );
  memoize(
    isNodeEnvironment$1()
      ? (e) => _.from(e).toString('base64')
      : (e) => window.btoa(e)
  );
  const debounce = (e, n = 250, d = { isImmediate: !1 }) => {
      let h;
      return function (...p) {
        const y = this,
          m = d.isImmediate && void 0 === h;
        void 0 !== h && clearTimeout(h),
          (h = setTimeout(function () {
            (h = void 0), d.isImmediate || e.apply(y, p);
          }, n)),
          m && e.apply(y, p);
      };
    },
    exceptFields = (e, ...n) => {
      const d = {};
      return (
        Object.keys(e).forEach((h) => {
          n.includes(h) || (d[h] = e[h]);
        }),
        d
      );
    },
    arrayEquals = (e, n) =>
      !!e && !!n && [].every.call(e, (e, d) => e === n[d]);
  function hasOwn(e, n) {
    return Object.prototype.hasOwnProperty.call(Object(e), n);
  }
  function deepClone(e) {
    if ('object' != typeof e || null === e)
      throw new TypeError('Source is not an Object');
    const n = Array.isArray(e) ? [] : {};
    for (const d in e)
      hasOwn(e, d) &&
        ('object' == typeof e[d] && null !== e[d]
          ? (n[d] = deepClone(e[d]))
          : (n[d] = e[d]));
    return n;
  }
  function isEmpty(e) {
    if ('object' != typeof e) throw new TypeError('Source is not an Object');
    for (const n in e) if (hasOwn(e, n)) return !1;
    return !0;
  }
  function transform$8(e, n, d = !1) {
    return (
      d && (e = Object.keys(e).reduce((n, d) => ((n[e[d]] = d), n), {})),
      Object.keys(e).reduce((d, h) => {
        const p = e[h],
          y =
            'function' == typeof p
              ? p()
              : (function (e, n) {
                  return n.split('.').reduce((e, n) => {
                    if (void 0 !== e) return e[n];
                  }, e);
                })(n, p);
        return (
          y &&
            (function (e, n, d) {
              n.split('.').reduce((n, h, p, y) => {
                const m = p === y.length - 1,
                  g = hasOwn(n, h),
                  _ = n[h] instanceof Object,
                  b = null === n[h];
                if (!m && g && (!_ || b))
                  throw new TypeError(
                    `Value at ${y
                      .slice(0, p + 1)
                      .join('.')} in keypath is not an Object.`
                  );
                return m ? ((n[h] = d), e) : g ? n[h] : (n[h] = {});
              }, e);
            })(d, h, y),
          d
        );
      }, {})
    );
  }
  const E = [
      'contributors',
      'modalities',
      'musicVideo',
      'podcast-episodes',
      'radioStation',
      'song',
      'uploaded-audios',
      'uploadedAudio',
      'uploaded-videos',
      'uploadedVideo',
      'workouts',
      'workout-programs',
    ],
    S = {
      'uploaded-videos': !0,
      uploadedVideo: !0,
      'uploaded-audios': !0,
      uploadedAudio: !0,
      'podcast-episodes': !0,
    },
    k = [],
    P = {
      mediaItemStateDidChange: 'mediaItemStateDidChange',
      mediaItemStateWillChange: 'mediaItemStateWillChange',
    },
    I = ['trace', 'debug', 'info', 'warn', 'error'];
  class Nonsole {}
  I.forEach((e) => {
    Nonsole.prototype[e] = () => {};
  });
  const A = new Nonsole(),
    getConsole = () => ('undefined' == typeof console ? A : console),
    w = {};
  function findOrCreate(e, n) {
    const d = e
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (e, n) => n.toUpperCase());
    if (hasOwn(w, d)) {
      const h = w[d];
      if (n !== h.constructor)
        throw new Error(
          `DevFlag ${e} was already registered with a different type (${h.constructor.name})`
        );
      return h;
    }
    const h = new n(e);
    return (
      Object.defineProperty(w, d, {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return h;
        },
        set(e) {
          h.set(e);
        },
      }),
      h
    );
  }
  class LocalStorageDevFlag {
    constructor(e) {
      if ('string' != typeof e || '' === e.trim())
        throw new Error('DevFlag requires a non-empty string key');
      this.key = e;
    }
    get value() {
      return this.get();
    }
    get configured() {
      return void 0 !== this.value;
    }
    read() {
      var e, n;
      const d =
        null !==
          (n =
            null === (e = getLocalStorage()) || void 0 === e
              ? void 0
              : e.getItem(this.key)) && void 0 !== n
          ? n
          : null;
      return null !== d ? d : void 0;
    }
    write(e) {
      var n;
      null === (n = getLocalStorage()) ||
        void 0 === n ||
        n.setItem(this.key, e);
    }
    clear() {
      var e;
      null === (e = getLocalStorage()) ||
        void 0 === e ||
        e.removeItem(this.key);
    }
  }
  class StringDevFlag extends LocalStorageDevFlag {
    static register(e) {
      return findOrCreate(e, this);
    }
    static get(e) {
      return this.register(e).get();
    }
    static set(e, n) {
      this.register(e).set(n);
    }
    get() {
      return this.read();
    }
    set(e) {
      'string' != typeof e &&
        console.warn('Value for StringDevFlag should be a string'),
        this.write(e);
    }
  }
  class BooleanDevFlag extends LocalStorageDevFlag {
    static register(e) {
      return findOrCreate(e, this);
    }
    static get(e) {
      return this.register(e).get();
    }
    static set(e, n) {
      this.register(e).set(n);
    }
    get() {
      const e = this.read();
      if (void 0 !== e) return '1' === e || 'true' === e;
    }
    set(e) {
      'boolean' == typeof e
        ? this.write(!0 === e ? '1' : '0')
        : console.warn('Value for BooleanDevFlag should be a boolean');
    }
    get enabled() {
      return !0 === this.get();
    }
    toggle() {
      this.set(!this.get());
    }
  }
  class JsonDevFlag extends LocalStorageDevFlag {
    static register(e) {
      return findOrCreate(e, this);
    }
    static get(e) {
      return this.register(e).get();
    }
    static set(e, n) {
      this.register(e).set(n);
    }
    get() {
      const e = this.read();
      if (void 0 !== e)
        try {
          return JSON.parse(e);
        } catch (H) {
          return;
        }
    }
    set(e) {
      this.write(JSON.stringify(e));
    }
    prop(e) {
      if (void 0 !== this.value) return this.value[e];
    }
  }
  StringDevFlag.register('mk-debug'), StringDevFlag.register('mk-debug-topic');
  const R = getLocalStorage(),
    getConfiguredLevel = (e = 'mk-debug', n = I.length) =>
      parseInt(O(e, n), 10),
    O = memoize((e, n) => {
      var d, h;
      return null !==
        (h =
          null === (d = null == R ? void 0 : R.getItem) || void 0 === d
            ? void 0
            : d.call(R, e)) && void 0 !== h
        ? h
        : '' + n;
    }),
    getAllowedLevels = (e) => (isNaN(e) || e < 0 ? [] : I.slice(e)),
    canLogTopic = (e, n) => {
      const d = ((e = 'mk-debug-topic', n = '*') => O(e, n))(n);
      return C(d).some((n) => n.test(e));
    },
    C = memoize((e) =>
      e.split(/[\s,]+/).map((e) => {
        const n = e.replace(/\*/g, '.*?');
        return new RegExp('^' + n + '$');
      })
    ),
    trace = (e, ...n) => logMessage(Object.assign({ level: 'trace' }, e), ...n),
    debug = (e, ...n) => logMessage(Object.assign({ level: 'debug' }, e), ...n),
    info = (e, ...n) => logMessage(Object.assign({ level: 'info' }, e), ...n),
    warn = (e, ...n) => logMessage(Object.assign({ level: 'warn' }, e), ...n),
    error$1 = (e, ...n) =>
      logMessage(Object.assign({ level: 'error' }, e), ...n),
    log = (e, ...n) => logMessage(e, ...n),
    logMessage = (e, ...n) => {
      let { level: d, levelKey: h, topic: p, topicKey: y } = e;
      if (
        ((d = null != d ? d : 'debug'),
        !((e, n) => -1 !== getAllowedLevels(getConfiguredLevel(n)).indexOf(e))(
          d,
          h
        ))
      )
        return;
      if (!canLogTopic(p, y)) return;
      const m = getConsole();
      if ('function' != typeof m[d]) return;
      let [g, ..._] = n;
      void 0 !== p && (g = `${p}: ${g}`), m[d](g, ..._);
    };
  class Logger {
    constructor(e) {
      var n, d, h, p;
      (this._levelFilterKey = 'mk-debug'),
        'string' == typeof e
          ? ((this._levelFilterKey = e),
            (this.level = getConfiguredLevel(this._levelFilterKey, 5)))
          : 'object' == typeof e
          ? ((this._levelFilterKey =
              null !== (n = e.levelFilterStorageKey) && void 0 !== n
                ? n
                : this._levelFilterKey),
            (this._topicFilterKey =
              null !== (d = e.topicFilterStorageKey) && void 0 !== d
                ? d
                : this.generateDefaultTopicFilterStorageKey(
                    this._levelFilterKey
                  )),
            (this.topic = e.topic),
            (this.level =
              null !== (h = e.level) && void 0 !== h
                ? h
                : getConfiguredLevel(this._levelFilterKey, 5)))
          : (this.level =
              null != e ? e : getConfiguredLevel(this._levelFilterKey, 5)),
        (this._topicFilterKey =
          null !== (p = this._topicFilterKey) && void 0 !== p
            ? p
            : this.generateDefaultTopicFilterStorageKey(this._levelFilterKey));
    }
    get enabled() {
      return this.level < 5;
    }
    set enabled(e) {
      this.level = e ? 1 : 5;
    }
    debug(e, ...n) {
      this.callLogMethod(debug, e, ...n);
    }
    error(e, ...n) {
      this.callLogMethod(error$1, e, ...n);
    }
    log(e, ...n) {
      this.callLogMethod(log, e, ...n);
    }
    info(e, ...n) {
      this.callLogMethod(info, e, ...n);
    }
    trace(e, ...n) {
      this.callLogMethod(trace, e, ...n);
    }
    warn(e, ...n) {
      this.callLogMethod(warn, e, ...n);
    }
    callLogMethod(e, n, ...d) {
      var h, p;
      const y = {
        levelKey: this._levelFilterKey,
        topicKey: this._topicFilterKey,
        topic: this.topic,
      };
      let m = n;
      var g;
      'object' == typeof (g = n) &&
        null !== g &&
        'string' == typeof g.topic &&
        ((y.topic = null !== (h = n.topic) && void 0 !== h ? h : y.topic),
        (m = null !== (p = n.message) && void 0 !== p ? p : d.shift())),
        e(y, m, ...d);
    }
    generateDefaultTopicFilterStorageKey(e) {
      return e + '-topic';
    }
  }
  const M = new Logger(),
    D = new Logger();
  var L, N;
  (e.PlaybackType = void 0),
    ((L = e.PlaybackType || (e.PlaybackType = {}))[(L.none = 0)] = 'none'),
    (L[(L.preview = 1)] = 'preview'),
    (L[(L.unencryptedFull = 2)] = 'unencryptedFull'),
    (L[(L.encryptedFull = 3)] = 'encryptedFull'),
    (function (e) {
      (e[(e.none = 0)] = 'none'),
        (e[(e.loading = 1)] = 'loading'),
        (e[(e.ready = 2)] = 'ready'),
        (e[(e.playing = 3)] = 'playing'),
        (e[(e.ended = 4)] = 'ended'),
        (e[(e.unavailable = 5)] = 'unavailable'),
        (e[(e.restricted = 6)] = 'restricted'),
        (e[(e.error = 7)] = 'error'),
        (e[(e.unsupported = 8)] = 'unsupported');
    })(N || (N = {}));
  const {
      none: x,
      loading: U,
      ready: B,
      playing: F,
      ended: j,
      unavailable: $,
      restricted: V,
      error: H,
      unsupported: W,
    } = N,
    Y = {
      [x]: { allowed: [U], unknown: [j, $, V, H, W] },
      [U]: { allowed: [B, V, H, W], unknown: [] },
      [B]: { allowed: [F], unknown: [H] },
      [F]: { allowed: [j, H], unknown: [$, V, W] },
      [j]: { allowed: [], unknown: [] },
      [$]: { allowed: [], unknown: [] },
      [V]: { allowed: [], unknown: [] },
      [H]: { allowed: [], unknown: [] },
      [W]: { allowed: [], unknown: [] },
    },
    toName = (e) => N[e],
    createMediaItemStateGuard = (e = x) => {
      const n = {
        current: e,
        set(e) {
          const { current: d } = n;
          if (!((e, n) => Y[e].allowed.includes(n))(d, e)) {
            const n = ((e, n) => Y[e].unknown.includes(n))(d, e);
            D.debug(
              `MediaItem.state was changed from ${toName(d)} to ${toName(e)}`,
              n
                ? 'but it is unknown whether it should be allowed or not.'
                : 'and it should not be happening'
            );
          }
          n.current = e;
        },
      };
      return n;
    };
  function isStringNotEmpty(e) {
    return !(function (e) {
      return void 0 === e || '' === e.trim();
    })(e);
  }
  function transform$7(e) {
    return transform$8(
      {
        'attributes.albumName': 'metadata.playlistName',
        'attributes.artistName': 'metadata.artistName',
        'attributes.artwork'() {
          const n = null == e ? void 0 : e.artworkURL;
          if (n)
            return (function (e) {
              const n = e.split('/').pop(),
                [d, h] = (!!n && n.match(/\d+/g)) || ['100', '100'];
              return {
                width: parseInt(d, 10),
                height: parseInt(h, 10),
                url: e.replace(`${d}x${h}`, '{w}x{h}'),
              };
            })(n);
        },
        'attributes.composerName': 'metadata.composerName',
        'attributes.contentRating'() {
          var n;
          if (
            1 ===
            (null === (n = null == e ? void 0 : e.metadata) || void 0 === n
              ? void 0
              : n.explicit)
          )
            return 'explicit';
        },
        'attributes.discNumber'() {
          var n;
          return (
            (null === (n = null == e ? void 0 : e.metadata) || void 0 === n
              ? void 0
              : n.discNumber) || 1
          );
        },
        'attributes.durationInMillis': 'metadata.duration',
        'attributes.genreNames'() {
          var n;
          return [
            null === (n = null == e ? void 0 : e.metadata) || void 0 === n
              ? void 0
              : n.genre,
          ];
        },
        'attributes.isrc'() {
          var n;
          const d =
            null === (n = null == e ? void 0 : e.metadata) || void 0 === n
              ? void 0
              : n.xid;
          if (d) return d.replace(/^([^:]+):isrc:/, '$1');
        },
        'attributes.name': 'metadata.itemName',
        'attributes.playParams.id': 'metadata.itemId',
        'attributes.playParams.kind': 'metadata.kind',
        'attributes.previews': () => [
          { url: null == e ? void 0 : e.previewURL },
        ],
        'attributes.releaseDate': 'metadata.releaseDate',
        'attributes.trackNumber': 'metadata.trackNumber',
        assetURL: 'URL',
        cloudId: 'metadata.cloud-id',
        id() {
          var n;
          return (
            '' +
            (null === (n = null == e ? void 0 : e.metadata) || void 0 === n
              ? void 0
              : n.itemId)
          );
        },
        flavor: 'flavor',
        type: 'metadata.kind',
      },
      e
    );
  }
  const { mediaItemStateDidChange: q, mediaItemStateWillChange: z } = P,
    G = { isEntitledToPlay: !0 };
  class MediaItem extends Notifications {
    constructor(n = {}) {
      super([q, z]),
        (this.bingeWatching = !1),
        (this.hlsMetadata = {}),
        (this.playbackType = e.PlaybackType.none),
        (this._assets = []),
        (this._state = createMediaItemStateGuard()),
        D.debug('media-item: creating Media Item with options:', n);
      n.id && n.attributes
        ? (Object.keys(n).forEach((e) => {
            hasOwn(G, e) || (this[e] = n[e]);
          }),
          (this.type =
            this.playParams && this.playParams.kind
              ? this.playParams.kind
              : this.type || 'song'))
        : ((this.id = n.id || generateUUID()),
          (this.type = n.type || 'song'),
          (this.attributes = { playParams: { id: this.id, kind: this.type } })),
        (this._context = n.context || {}),
        n.container
          ? (this._container = n.container)
          : n.containerId &&
            n.containerType &&
            (this._container = { id: n.containerId, type: n.containerType });
    }
    get ageGatePolicy() {
      var e;
      return null === (e = this.defaultPlayable) || void 0 === e
        ? void 0
        : e.ageGatePolicy;
    }
    get albumInfo() {
      const { albumName: e, artistName: n } = this,
        d = [];
      return n && d.push(n), e && d.push(e), d.join(' - ');
    }
    get albumName() {
      return this.attributes.albumName;
    }
    get artistName() {
      return this.attributes.genreNames &&
        this.attributes.genreNames.indexOf('Classical') > -1 &&
        this.attributes.composerName
        ? this.attributes.composerName
        : this.attributes.artistName;
    }
    get artwork() {
      var e, n;
      return null !== (e = this.attributes.artwork) && void 0 !== e
        ? e
        : null === (n = this.attributes.images) || void 0 === n
        ? void 0
        : n.coverArt16X9;
    }
    get artworkURL() {
      if (this.artwork && this.artwork.url) return this.artwork.url;
    }
    get assets() {
      return this._assets;
    }
    get canPlay() {
      return this.isPlayable && this.isReady;
    }
    get container() {
      return this._container;
    }
    set container(e) {
      this._container = e;
    }
    get contentRating() {
      return this.attributes.contentRating;
    }
    get context() {
      return this._context;
    }
    set context(e) {
      this._context = e;
    }
    get defaultPlayable() {
      var e;
      return null === (e = this.playables) || void 0 === e ? void 0 : e[0];
    }
    get discNumber() {
      return this.attributes.discNumber;
    }
    get hasContainerArtwork() {
      return (
        this.container &&
        this.container.attributes &&
        this.container.attributes.artwork &&
        this.container.attributes.artwork.url
      );
    }
    get hasPlaylistContainer() {
      return (
        this.container &&
        'playlists' === this.container.type &&
        this.container.attributes
      );
    }
    get isEntitledToPlay() {
      var e;
      const { attributes: n, defaultPlayable: d } = this;
      return (
        null !==
          (e =
            n.isEntitledToPlay || (null == d ? void 0 : d.isEntitledToPlay)) &&
        void 0 !== e &&
        e
      );
    }
    get supportsLinearScrubbing() {
      var e, n, d;
      return (
        this.isLinearStream &&
        !0 ===
          (null ===
            (d =
              null ===
                (n =
                  null === (e = this.defaultPlayable) || void 0 === e
                    ? void 0
                    : e.assets) || void 0 === n
                ? void 0
                : n.streamCapability) || void 0 === d
            ? void 0
            : d.supportsLinearScrubbing)
      );
    }
    get isAssetScrubbingDisabled() {
      return !!this.isLinearStream && !this.supportsLinearScrubbing;
    }
    get isLinearStream() {
      return (
        'LiveService' === (null == (e = this) ? void 0 : e.type) ||
        'Event' ===
          (null === (n = null == e ? void 0 : e.defaultPlayable) || void 0 === n
            ? void 0
            : n.type) ||
        'EbsEvent' ===
          (null === (d = null == e ? void 0 : e.defaultPlayable) || void 0 === d
            ? void 0
            : d.type)
      );
      var e, n, d;
    }
    get isLiveRadioStation() {
      return isLiveRadioStation(this);
    }
    get isLiveAudioStation() {
      return isLiveRadioKind(this, 'audio');
    }
    get isLiveVideoStation() {
      return isLiveRadioKind(this, 'video');
    }
    get isSong() {
      return 'song' === this.type;
    }
    get info() {
      return `${this.title} - ${this.albumInfo}`;
    }
    get isCloudItem() {
      return (this.playParams && this.playParams.isLibrary) || b(this.id);
    }
    get isCloudUpload() {
      return -1 === this._songId;
    }
    get isExplicitItem() {
      return 'explicit' === this.contentRating;
    }
    get isLoading() {
      return this.state === N.loading;
    }
    get isPlayableMediaType() {
      return this.isUTS || -1 !== E.indexOf(this.type);
    }
    get isPlayable() {
      var e;
      return (
        !!this.isPlayableMediaType &&
        (!(!this.isLiveRadioStation && !this.hasOffersHlsUrl) ||
          (this.needsPlayParams
            ? !!this.playParams
            : this.isUTS
            ? this.isEntitledToPlay
            : !!this.attributes.assetUrl ||
              !!(null === (e = this.attributes.previews) || void 0 === e
                ? void 0
                : e.length)))
      );
    }
    get isPlaying() {
      return this.state === N.playing;
    }
    get isPreparedToPlay() {
      if ('song' === this.type)
        return !!this._assets && !!this.keyURLs && !!this._songId;
      if (this.isUTS) {
        const e = isStringNotEmpty(this.assetURL),
          n = !!(
            this.keyURLs &&
            isStringNotEmpty(this.keyURLs['hls-key-cert-url']) &&
            isStringNotEmpty(this.keyURLs['hls-key-server-url']) &&
            isStringNotEmpty(this.keyURLs['widevine-cert-url'])
          );
        return e && n;
      }
      return (
        !!isStringNotEmpty(this.assetURL) ||
        (this.playRawAssetURL && !!isStringNotEmpty(this.attributes.assetUrl))
      );
    }
    get isrc() {
      return this.attributes.isrc;
    }
    get isReady() {
      return this.state === N.ready;
    }
    get isRestricted() {
      return this.state === N.restricted;
    }
    get isUTS() {
      var e;
      return !(
        !(null === (e = this.defaultPlayable) || void 0 === e
          ? void 0
          : e.type) || !k.includes(this.defaultPlayable.type)
      );
    }
    get isUnavailable() {
      return this.state === N.unavailable;
    }
    get needsPlayParams() {
      return ['musicVideo', 'song'].includes(this.type);
    }
    get normalizedType() {
      return normalizeContentType(this.type);
    }
    get offers() {
      return this.attributes.offers;
    }
    get offersHlsUrl() {
      const { offers: e } = this,
        n =
          null == e
            ? void 0
            : e.find((e) => {
                var n;
                return !!(null === (n = e.hlsUrl) || void 0 === n
                  ? void 0
                  : n.length);
              });
      return null == n ? void 0 : n.hlsUrl;
    }
    get hasOffersHlsUrl() {
      return isStringNotEmpty(this.offersHlsUrl);
    }
    set playbackData(e) {
      if (void 0 === e) return;
      this.previewURL && (e.previewURL = this.previewURL);
      const n = transform$7(e);
      this.artwork && n.artwork && delete n.artwork,
        n.id !== this.id && delete n.id,
        this.playParams &&
          n.attributes.playParams &&
          (n.attributes.playParams = this.playParams),
        Object.assign(this, n),
        D.debug('media-item: item merged with playbackData', this),
        (this.state = N.ready);
    }
    get playbackDuration() {
      return (
        this.attributes.durationInMillis ||
        this.attributes.durationInMilliseconds
      );
    }
    get playEvent() {
      var e;
      return null === (e = this.defaultPlayable) || void 0 === e
        ? void 0
        : e.playEvent;
    }
    get playlistArtworkURL() {
      var e, n, d;
      return this.hasPlaylistContainer && this.hasContainerArtwork
        ? null ===
            (d =
              null ===
                (n =
                  null === (e = this.container) || void 0 === e
                    ? void 0
                    : e.attributes) || void 0 === n
                ? void 0
                : n.artwork) || void 0 === d
          ? void 0
          : d.url
        : this.artworkURL;
    }
    get playlistName() {
      var e, n;
      return this.hasPlaylistContainer
        ? null ===
            (n =
              null === (e = this.container) || void 0 === e
                ? void 0
                : e.attributes) || void 0 === n
          ? void 0
          : n.name
        : this.albumName;
    }
    get playParams() {
      return this.attributes.playParams;
    }
    get playRawAssetURL() {
      return this.offers
        ? this.offers.some((e) => 'STDQ' === e.type)
        : !(!this.isCloudUpload && !S[this.type]);
    }
    get previewURL() {
      var e, n, d, h, p, y, m, g, _, b, T, E, S, k, P;
      return (
        (null ===
          (d =
            null ===
              (n =
                null === (e = this.attributes) || void 0 === e
                  ? void 0
                  : e.previews) || void 0 === n
              ? void 0
              : n[0]) || void 0 === d
          ? void 0
          : d.url) ||
        (null ===
          (y =
            null ===
              (p =
                null === (h = this.attributes) || void 0 === h
                  ? void 0
                  : h.previews) || void 0 === p
              ? void 0
              : p[0]) || void 0 === y
          ? void 0
          : y.hlsUrl) ||
        (null ===
          (b =
            null ===
              (_ =
                null ===
                  (g =
                    null === (m = this.attributes) || void 0 === m
                      ? void 0
                      : m.trailers) || void 0 === g
                  ? void 0
                  : g[0]) || void 0 === _
              ? void 0
              : _.assets) || void 0 === b
          ? void 0
          : b.hlsUrl) ||
        (null ===
          (S =
            null ===
              (E =
                null === (T = this.attributes) || void 0 === T
                  ? void 0
                  : T.movieClips) || void 0 === E
              ? void 0
              : E[0]) || void 0 === S
          ? void 0
          : S.hlsUrl) ||
        (null ===
          (P =
            null === (k = this.attributes) || void 0 === k
              ? void 0
              : k.video) || void 0 === P
          ? void 0
          : P.hlsUrl)
      );
    }
    get rating() {
      return this.attributes.rating;
    }
    get releaseDate() {
      if (this._releaseDate) return this._releaseDate;
      if (
        this.attributes &&
        (this.attributes.releaseDate || this.attributes.releaseDateTime)
      ) {
        const e =
          this.attributes.releaseDate || this.attributes.releaseDateTime;
        return (
          (this._releaseDate = /^\d{4}-\d{1,2}-\d{1,2}/.test(e)
            ? new Date(e)
            : void 0),
          this._releaseDate
        );
      }
    }
    set releaseDate(e) {
      this._releaseDate =
        'string' == typeof e
          ? /^\d{4}-\d{1,2}-\d{1,2}/.test(e)
            ? new Date(e)
            : void 0
          : 'number' == typeof e
          ? new Date(e)
          : e;
    }
    get songId() {
      return this._songId && -1 !== this._songId ? this._songId : this.id;
    }
    get state() {
      return this._state.current;
    }
    set state(e) {
      const n = { oldState: this._state.current, state: e };
      this._stateWillChange && this._stateWillChange(this),
        this.dispatchEvent(z, n),
        this._state.set(e),
        this._stateDidChange && this._stateDidChange(this),
        this.dispatchEvent(q, n);
    }
    get title() {
      return this.attributes.name || this.attributes.title;
    }
    get trackNumber() {
      return this.attributes.trackNumber;
    }
    beginMonitoringStateDidChange(e) {
      this._stateDidChange = e;
    }
    beginMonitoringStateWillChange(e) {
      this._stateWillChange = e;
    }
    endMonitoringStateDidChange() {
      this._stateDidChange = void 0;
    }
    endMonitoringStateWillChange() {
      this._stateWillChange = void 0;
    }
    isEqual(e) {
      return (
        this.id === e.id &&
        this.type === e.type &&
        this.attributes === e.attributes
      );
    }
    resetState() {
      this.endMonitoringStateWillChange(),
        this.endMonitoringStateDidChange(),
        (this.state = N.none);
    }
    restrict() {
      this.isExplicitItem &&
        ((this.state = N.restricted), this._removePlayableData());
    }
    notSupported() {
      (this.state = N.unsupported), this._removePlayableData();
    }
    updateFromLoadError(e) {
      switch (e.errorCode) {
        case MKError.CONTENT_RESTRICTED:
          this.state = N.restricted;
          break;
        case MKError.CONTENT_UNAVAILABLE:
          this.state = N.unavailable;
          break;
        default:
          this.state = N.error;
      }
    }
    updateFromSongList(e) {
      'musicVideo' === this.type
        ? this.updateWithLoadedAssets(void 0, e['hls-playlist-url'])
        : this.updateWithLoadedAssets(e.assets),
        (this._songId = e.songId),
        this.updateWithLoadedKeys({
          'hls-key-cert-url': e['hls-key-cert-url'],
          'hls-key-server-url': e['hls-key-server-url'],
          'widevine-cert-url': e['widevine-cert-url'],
        });
    }
    updateWithLoadedKeys(e, n) {
      (this.keyURLs = e), n && (this.keyServerQueryParameters = n);
    }
    updateWithLoadedAssets(e, n) {
      e && (this._assets = e), n && (this.assetURL = n);
    }
    _removePlayableData() {
      var e, n, d;
      null === (e = this.attributes) || void 0 === e || delete e.playParams,
        null === (n = this.attributes) || void 0 === n || delete n.previews,
        null === (d = this.attributes) || void 0 === d || delete d.trailers;
    }
  }
  const Q = [
    'contributors',
    'modalities',
    'movie',
    'musicVideo',
    'musicMovie',
    'trailer',
    'tvEpisode',
    'uploadedVideo',
    'uploaded-videos',
    'music-videos',
    'music-movies',
    'tv-episodes',
    'workouts',
  ];
  function getPlayerType(e) {
    var n, d;
    return (null == e ? void 0 : e.isUTS) ||
      Q.includes(null == e ? void 0 : e.type)
      ? 'video'
      : 'podcast-episodes' === (null == e ? void 0 : e.type)
      ? 'audio'
      : null !==
          (d =
            null === (n = null == e ? void 0 : e.attributes) || void 0 === n
              ? void 0
              : n.mediaKind) && void 0 !== d
      ? d
      : 'audio';
  }
  var J, X;
  (e.PlaybackStates = void 0),
    ((J = e.PlaybackStates || (e.PlaybackStates = {}))[(J.none = 0)] = 'none'),
    (J[(J.loading = 1)] = 'loading'),
    (J[(J.playing = 2)] = 'playing'),
    (J[(J.paused = 3)] = 'paused'),
    (J[(J.stopped = 4)] = 'stopped'),
    (J[(J.ended = 5)] = 'ended'),
    (J[(J.seeking = 6)] = 'seeking'),
    (J[(J.waiting = 8)] = 'waiting'),
    (J[(J.stalled = 9)] = 'stalled'),
    (J[(J.completed = 10)] = 'completed'),
    (e.PresentationMode = void 0),
    ((X = e.PresentationMode || (e.PresentationMode = {}))[
      (X.pictureinpicture = 0)
    ] = 'pictureinpicture'),
    (X[(X.inline = 1)] = 'inline');
  var Z =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : void 0 !== n
      ? n
      : 'undefined' != typeof self
      ? self
      : {};
  function unwrapExports(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, 'default')
      ? e.default
      : e;
  }
  function createCommonjsModule(e, n) {
    return e((n = { exports: {} }), n.exports), n.exports;
  }
  var ee = createCommonjsModule(function (e) {
      var n = (e.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')());
      'number' == typeof __g && (__g = n);
    }),
    te = createCommonjsModule(function (e) {
      var n = (e.exports = { version: '2.6.12' });
      'number' == typeof __e && (__e = n);
    });
  te.version;
  var _isObject = function (e) {
      return 'object' == typeof e ? null !== e : 'function' == typeof e;
    },
    _anObject = function (e) {
      if (!_isObject(e)) throw TypeError(e + ' is not an object!');
      return e;
    },
    _fails = function (e) {
      try {
        return !!e();
      } catch (Vt) {
        return !0;
      }
    },
    ie = !_fails(function () {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
    re = ee.document,
    se = _isObject(re) && _isObject(re.createElement),
    ne =
      !ie &&
      !_fails(function () {
        return (
          7 !=
          Object.defineProperty(
            ((e = 'div'), se ? re.createElement(e) : {}),
            'a',
            {
              get: function () {
                return 7;
              },
            }
          ).a
        );
        var e;
      }),
    ae = Object.defineProperty,
    oe = {
      f: ie
        ? Object.defineProperty
        : function (e, n, d) {
            if (
              (_anObject(e),
              (n = (function (e, n) {
                if (!_isObject(e)) return e;
                var d, h;
                if (
                  n &&
                  'function' == typeof (d = e.toString) &&
                  !_isObject((h = d.call(e)))
                )
                  return h;
                if (
                  'function' == typeof (d = e.valueOf) &&
                  !_isObject((h = d.call(e)))
                )
                  return h;
                if (
                  !n &&
                  'function' == typeof (d = e.toString) &&
                  !_isObject((h = d.call(e)))
                )
                  return h;
                throw TypeError("Can't convert object to primitive value");
              })(n, !0)),
              _anObject(d),
              ne)
            )
              try {
                return ae(e, n, d);
              } catch (Vt) {}
            if ('get' in d || 'set' in d)
              throw TypeError('Accessors not supported!');
            return 'value' in d && (e[n] = d.value), e;
          },
    },
    de = ie
      ? function (e, n, d) {
          return oe.f(
            e,
            n,
            (function (e, n) {
              return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: n,
              };
            })(1, d)
          );
        }
      : function (e, n, d) {
          return (e[n] = d), e;
        },
    le = {}.hasOwnProperty,
    _has = function (e, n) {
      return le.call(e, n);
    },
    ce = 0,
    ue = Math.random(),
    _uid = function (e) {
      return 'Symbol('.concat(
        void 0 === e ? '' : e,
        ')_',
        (++ce + ue).toString(36)
      );
    },
    he = createCommonjsModule(function (e) {
      var n = ee['__core-js_shared__'] || (ee['__core-js_shared__'] = {});
      (e.exports = function (e, d) {
        return n[e] || (n[e] = void 0 !== d ? d : {});
      })('versions', []).push({
        version: te.version,
        mode: 'global',
        copyright: 'Â© 2020 Denis Pushkarev (zloirock.ru)',
      });
    }),
    pe = he('native-function-to-string', Function.toString),
    ye = createCommonjsModule(function (e) {
      var n = _uid('src'),
        d = ('' + pe).split('toString');
      (te.inspectSource = function (e) {
        return pe.call(e);
      }),
        (e.exports = function (e, h, p, y) {
          var m = 'function' == typeof p;
          m && (_has(p, 'name') || de(p, 'name', h)),
            e[h] !== p &&
              (m &&
                (_has(p, n) || de(p, n, e[h] ? '' + e[h] : d.join(String(h)))),
              e === ee
                ? (e[h] = p)
                : y
                ? e[h]
                  ? (e[h] = p)
                  : de(e, h, p)
                : (delete e[h], de(e, h, p)));
        })(Function.prototype, 'toString', function () {
          return ('function' == typeof this && this[n]) || pe.call(this);
        });
    }),
    _ctx = function (e, n, d) {
      if (
        ((function (e) {
          if ('function' != typeof e)
            throw TypeError(e + ' is not a function!');
        })(e),
        void 0 === n)
      )
        return e;
      switch (d) {
        case 1:
          return function (d) {
            return e.call(n, d);
          };
        case 2:
          return function (d, h) {
            return e.call(n, d, h);
          };
        case 3:
          return function (d, h, p) {
            return e.call(n, d, h, p);
          };
      }
      return function () {
        return e.apply(n, arguments);
      };
    },
    $export = function (e, n, d) {
      var h,
        p,
        y,
        m,
        g = e & $export.F,
        _ = e & $export.G,
        b = e & $export.S,
        T = e & $export.P,
        E = e & $export.B,
        S = _ ? ee : b ? ee[n] || (ee[n] = {}) : (ee[n] || {}).prototype,
        k = _ ? te : te[n] || (te[n] = {}),
        P = k.prototype || (k.prototype = {});
      for (h in (_ && (d = n), d))
        (y = ((p = !g && S && void 0 !== S[h]) ? S : d)[h]),
          (m =
            E && p
              ? _ctx(y, ee)
              : T && 'function' == typeof y
              ? _ctx(Function.call, y)
              : y),
          S && ye(S, h, y, e & $export.U),
          k[h] != y && de(k, h, m),
          T && P[h] != y && (P[h] = y);
    };
  (ee.core = te),
    ($export.F = 1),
    ($export.G = 2),
    ($export.S = 4),
    ($export.P = 8),
    ($export.B = 16),
    ($export.W = 32),
    ($export.U = 64),
    ($export.R = 128);
  var me,
    ge,
    fe = $export,
    ve = {}.toString,
    _e = Object('z').propertyIsEnumerable(0)
      ? Object
      : function (e) {
          return 'String' ==
            (function (e) {
              return ve.call(e).slice(8, -1);
            })(e)
            ? e.split('')
            : Object(e);
        },
    _defined = function (e) {
      if (null == e) throw TypeError("Can't call method on  " + e);
      return e;
    },
    _toIobject = function (e) {
      return _e(_defined(e));
    },
    be = Math.ceil,
    Te = Math.floor,
    _toInteger = function (e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? Te : be)(e);
    },
    Ee = Math.min,
    Se = Math.max,
    ke = Math.min,
    Pe = he('keys'),
    Ie =
      ((me = !1),
      function (e, n, d) {
        var h,
          p,
          y = _toIobject(e),
          m = (h = y.length) > 0 ? Ee(_toInteger(h), 9007199254740991) : 0,
          g = (function (e, n) {
            return (e = _toInteger(e)) < 0 ? Se(e + n, 0) : ke(e, n);
          })(d, m);
        if (me && n != n) {
          for (; m > g; ) if ((p = y[g++]) != p) return !0;
        } else
          for (; m > g; g++)
            if ((me || g in y) && y[g] === n) return me || g || 0;
        return !me && -1;
      }),
    Ae = Pe[(ge = 'IE_PROTO')] || (Pe[ge] = _uid(ge)),
    we =
      'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ','
      ),
    Re =
      Object.keys ||
      function (e) {
        return (function (e, n) {
          var d,
            h = _toIobject(e),
            p = 0,
            y = [];
          for (d in h) d != Ae && _has(h, d) && y.push(d);
          for (; n.length > p; )
            _has(h, (d = n[p++])) && (~Ie(y, d) || y.push(d));
          return y;
        })(e, we);
      },
    Oe = { f: Object.getOwnPropertySymbols },
    Ce = { f: {}.propertyIsEnumerable },
    _toObject = function (e) {
      return Object(_defined(e));
    },
    Me = Object.assign,
    De =
      !Me ||
      _fails(function () {
        var e = {},
          n = {},
          d = Symbol(),
          h = 'abcdefghijklmnopqrst';
        return (
          (e[d] = 7),
          h.split('').forEach(function (e) {
            n[e] = e;
          }),
          7 != Me({}, e)[d] || Object.keys(Me({}, n)).join('') != h
        );
      })
        ? function (e, n) {
            for (
              var d = _toObject(e),
                h = arguments.length,
                p = 1,
                y = Oe.f,
                m = Ce.f;
              h > p;

            )
              for (
                var g,
                  _ = _e(arguments[p++]),
                  b = y ? Re(_).concat(y(_)) : Re(_),
                  T = b.length,
                  E = 0;
                T > E;

              )
                (g = b[E++]), (ie && !m.call(_, g)) || (d[g] = _[g]);
            return d;
          }
        : Me;
  fe(fe.S + fe.F, 'Object', { assign: De }), te.Object.assign;
  var Le =
      ('undefined' != typeof globalThis && globalThis) ||
      ('undefined' != typeof self && self) ||
      (void 0 !== Le && Le),
    Ne = 'URLSearchParams' in Le,
    xe = 'Symbol' in Le && 'iterator' in Symbol,
    Ue =
      'FileReader' in Le &&
      'Blob' in Le &&
      (function () {
        try {
          return new Blob(), !0;
        } catch (Vt) {
          return !1;
        }
      })(),
    Be = 'FormData' in Le,
    Fe = 'ArrayBuffer' in Le;
  if (Fe)
    var Ke = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]',
      ],
      je =
        ArrayBuffer.isView ||
        function (e) {
          return e && Ke.indexOf(Object.prototype.toString.call(e)) > -1;
        };
  function normalizeName(e) {
    if (
      ('string' != typeof e && (e = String(e)),
      /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || '' === e)
    )
      throw new TypeError(
        'Invalid character in header field name: "' + e + '"'
      );
    return e.toLowerCase();
  }
  function normalizeValue(e) {
    return 'string' != typeof e && (e = String(e)), e;
  }
  function iteratorFor(e) {
    var n = {
      next: function () {
        var n = e.shift();
        return { done: void 0 === n, value: n };
      },
    };
    return (
      xe &&
        (n[Symbol.iterator] = function () {
          return n;
        }),
      n
    );
  }
  function Headers$1(e) {
    (this.map = {}),
      e instanceof Headers$1
        ? e.forEach(function (e, n) {
            this.append(n, e);
          }, this)
        : Array.isArray(e)
        ? e.forEach(function (e) {
            this.append(e[0], e[1]);
          }, this)
        : e &&
          Object.getOwnPropertyNames(e).forEach(function (n) {
            this.append(n, e[n]);
          }, this);
  }
  function consumed(e) {
    if (e.bodyUsed) return Promise.reject(new TypeError('Already read'));
    e.bodyUsed = !0;
  }
  function fileReaderReady(e) {
    return new Promise(function (n, d) {
      (e.onload = function () {
        n(e.result);
      }),
        (e.onerror = function () {
          d(e.error);
        });
    });
  }
  function readBlobAsArrayBuffer(e) {
    var n = new FileReader(),
      d = fileReaderReady(n);
    return n.readAsArrayBuffer(e), d;
  }
  function bufferClone(e) {
    if (e.slice) return e.slice(0);
    var n = new Uint8Array(e.byteLength);
    return n.set(new Uint8Array(e)), n.buffer;
  }
  function Body() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function (e) {
        var n;
        (this.bodyUsed = this.bodyUsed),
          (this._bodyInit = e),
          e
            ? 'string' == typeof e
              ? (this._bodyText = e)
              : Ue && Blob.prototype.isPrototypeOf(e)
              ? (this._bodyBlob = e)
              : Be && FormData.prototype.isPrototypeOf(e)
              ? (this._bodyFormData = e)
              : Ne && URLSearchParams.prototype.isPrototypeOf(e)
              ? (this._bodyText = e.toString())
              : Fe && Ue && (n = e) && DataView.prototype.isPrototypeOf(n)
              ? ((this._bodyArrayBuffer = bufferClone(e.buffer)),
                (this._bodyInit = new Blob([this._bodyArrayBuffer])))
              : Fe && (ArrayBuffer.prototype.isPrototypeOf(e) || je(e))
              ? (this._bodyArrayBuffer = bufferClone(e))
              : (this._bodyText = e = Object.prototype.toString.call(e))
            : (this._bodyText = ''),
          this.headers.get('content-type') ||
            ('string' == typeof e
              ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set('content-type', this._bodyBlob.type)
              : Ne &&
                URLSearchParams.prototype.isPrototypeOf(e) &&
                this.headers.set(
                  'content-type',
                  'application/x-www-form-urlencoded;charset=UTF-8'
                ));
      }),
      Ue &&
        ((this.blob = function () {
          var e = consumed(this);
          if (e) return e;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error('could not read FormData body as blob');
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            var e = consumed(this);
            return (
              e ||
              (ArrayBuffer.isView(this._bodyArrayBuffer)
                ? Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset +
                        this._bodyArrayBuffer.byteLength
                    )
                  )
                : Promise.resolve(this._bodyArrayBuffer))
            );
          }
          return this.blob().then(readBlobAsArrayBuffer);
        })),
      (this.text = function () {
        var e,
          n,
          d,
          h = consumed(this);
        if (h) return h;
        if (this._bodyBlob)
          return (
            (e = this._bodyBlob),
            (n = new FileReader()),
            (d = fileReaderReady(n)),
            n.readAsText(e),
            d
          );
        if (this._bodyArrayBuffer)
          return Promise.resolve(
            (function (e) {
              for (
                var n = new Uint8Array(e), d = new Array(n.length), h = 0;
                h < n.length;
                h++
              )
                d[h] = String.fromCharCode(n[h]);
              return d.join('');
            })(this._bodyArrayBuffer)
          );
        if (this._bodyFormData)
          throw new Error('could not read FormData body as text');
        return Promise.resolve(this._bodyText);
      }),
      Be &&
        (this.formData = function () {
          return this.text().then(decode);
        }),
      (this.json = function () {
        return this.text().then(JSON.parse);
      }),
      this
    );
  }
  (Headers$1.prototype.append = function (e, n) {
    (e = normalizeName(e)), (n = normalizeValue(n));
    var d = this.map[e];
    this.map[e] = d ? d + ', ' + n : n;
  }),
    (Headers$1.prototype.delete = function (e) {
      delete this.map[normalizeName(e)];
    }),
    (Headers$1.prototype.get = function (e) {
      return (e = normalizeName(e)), this.has(e) ? this.map[e] : null;
    }),
    (Headers$1.prototype.has = function (e) {
      return this.map.hasOwnProperty(normalizeName(e));
    }),
    (Headers$1.prototype.set = function (e, n) {
      this.map[normalizeName(e)] = normalizeValue(n);
    }),
    (Headers$1.prototype.forEach = function (e, n) {
      for (var d in this.map)
        this.map.hasOwnProperty(d) && e.call(n, this.map[d], d, this);
    }),
    (Headers$1.prototype.keys = function () {
      var e = [];
      return (
        this.forEach(function (n, d) {
          e.push(d);
        }),
        iteratorFor(e)
      );
    }),
    (Headers$1.prototype.values = function () {
      var e = [];
      return (
        this.forEach(function (n) {
          e.push(n);
        }),
        iteratorFor(e)
      );
    }),
    (Headers$1.prototype.entries = function () {
      var e = [];
      return (
        this.forEach(function (n, d) {
          e.push([d, n]);
        }),
        iteratorFor(e)
      );
    }),
    xe && (Headers$1.prototype[Symbol.iterator] = Headers$1.prototype.entries);
  var $e = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
  function Request(e, n) {
    if (!(this instanceof Request))
      throw new TypeError(
        'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
      );
    var d,
      h,
      p = (n = n || {}).body;
    if (e instanceof Request) {
      if (e.bodyUsed) throw new TypeError('Already read');
      (this.url = e.url),
        (this.credentials = e.credentials),
        n.headers || (this.headers = new Headers$1(e.headers)),
        (this.method = e.method),
        (this.mode = e.mode),
        (this.signal = e.signal),
        p || null == e._bodyInit || ((p = e._bodyInit), (e.bodyUsed = !0));
    } else this.url = String(e);
    if (
      ((this.credentials = n.credentials || this.credentials || 'same-origin'),
      (!n.headers && this.headers) || (this.headers = new Headers$1(n.headers)),
      (this.method =
        ((d = n.method || this.method || 'GET'),
        (h = d.toUpperCase()),
        $e.indexOf(h) > -1 ? h : d)),
      (this.mode = n.mode || this.mode || null),
      (this.signal = n.signal || this.signal),
      (this.referrer = null),
      ('GET' === this.method || 'HEAD' === this.method) && p)
    )
      throw new TypeError('Body not allowed for GET or HEAD requests');
    if (
      (this._initBody(p),
      !(
        ('GET' !== this.method && 'HEAD' !== this.method) ||
        ('no-store' !== n.cache && 'no-cache' !== n.cache)
      ))
    ) {
      var y = /([?&])_=[^&]*/;
      if (y.test(this.url))
        this.url = this.url.replace(y, '$1_=' + new Date().getTime());
      else {
        this.url +=
          (/\?/.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
      }
    }
  }
  function decode(e) {
    var n = new FormData();
    return (
      e
        .trim()
        .split('&')
        .forEach(function (e) {
          if (e) {
            var d = e.split('='),
              h = d.shift().replace(/\+/g, ' '),
              p = d.join('=').replace(/\+/g, ' ');
            n.append(decodeURIComponent(h), decodeURIComponent(p));
          }
        }),
      n
    );
  }
  function Response(e, n) {
    if (!(this instanceof Response))
      throw new TypeError(
        'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
      );
    n || (n = {}),
      (this.type = 'default'),
      (this.status = void 0 === n.status ? 200 : n.status),
      (this.ok = this.status >= 200 && this.status < 300),
      (this.statusText = void 0 === n.statusText ? '' : '' + n.statusText),
      (this.headers = new Headers$1(n.headers)),
      (this.url = n.url || ''),
      this._initBody(e);
  }
  (Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  }),
    Body.call(Request.prototype),
    Body.call(Response.prototype),
    (Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers$1(this.headers),
        url: this.url,
      });
    }),
    (Response.error = function () {
      var e = new Response(null, { status: 0, statusText: '' });
      return (e.type = 'error'), e;
    });
  var Ve = [301, 302, 303, 307, 308];
  Response.redirect = function (e, n) {
    if (-1 === Ve.indexOf(n)) throw new RangeError('Invalid status code');
    return new Response(null, { status: n, headers: { location: e } });
  };
  var He = Le.DOMException;
  try {
    new He();
  } catch (Wa) {
    ((He = function (e, n) {
      (this.message = e), (this.name = n);
      var d = Error(e);
      this.stack = d.stack;
    }).prototype = Object.create(Error.prototype)),
      (He.prototype.constructor = He);
  }
  function fetch$1(e, n) {
    return new Promise(function (d, h) {
      var p = new Request(e, n);
      if (p.signal && p.signal.aborted)
        return h(new He('Aborted', 'AbortError'));
      var y = new XMLHttpRequest();
      function abortXhr() {
        y.abort();
      }
      (y.onload = function () {
        var e,
          n,
          h = {
            status: y.status,
            statusText: y.statusText,
            headers:
              ((e = y.getAllResponseHeaders() || ''),
              (n = new Headers$1()),
              e
                .replace(/\r?\n[\t ]+/g, ' ')
                .split('\r')
                .map(function (e) {
                  return 0 === e.indexOf('\n') ? e.substr(1, e.length) : e;
                })
                .forEach(function (e) {
                  var d = e.split(':'),
                    h = d.shift().trim();
                  if (h) {
                    var p = d.join(':').trim();
                    n.append(h, p);
                  }
                }),
              n),
          };
        h.url =
          'responseURL' in y ? y.responseURL : h.headers.get('X-Request-URL');
        var p = 'response' in y ? y.response : y.responseText;
        setTimeout(function () {
          d(new Response(p, h));
        }, 0);
      }),
        (y.onerror = function () {
          setTimeout(function () {
            h(new TypeError('Network request failed'));
          }, 0);
        }),
        (y.ontimeout = function () {
          setTimeout(function () {
            h(new TypeError('Network request failed'));
          }, 0);
        }),
        (y.onabort = function () {
          setTimeout(function () {
            h(new He('Aborted', 'AbortError'));
          }, 0);
        }),
        y.open(
          p.method,
          (function (e) {
            try {
              return '' === e && Le.location.href ? Le.location.href : e;
            } catch (Vt) {
              return e;
            }
          })(p.url),
          !0
        ),
        'include' === p.credentials
          ? (y.withCredentials = !0)
          : 'omit' === p.credentials && (y.withCredentials = !1),
        'responseType' in y &&
          (Ue
            ? (y.responseType = 'blob')
            : Fe &&
              p.headers.get('Content-Type') &&
              -1 !==
                p.headers
                  .get('Content-Type')
                  .indexOf('application/octet-stream') &&
              (y.responseType = 'arraybuffer')),
        !n || 'object' != typeof n.headers || n.headers instanceof Headers$1
          ? p.headers.forEach(function (e, n) {
              y.setRequestHeader(n, e);
            })
          : Object.getOwnPropertyNames(n.headers).forEach(function (e) {
              y.setRequestHeader(e, normalizeValue(n.headers[e]));
            }),
        p.signal &&
          (p.signal.addEventListener('abort', abortXhr),
          (y.onreadystatechange = function () {
            4 === y.readyState &&
              p.signal.removeEventListener('abort', abortXhr);
          })),
        y.send(void 0 === p._bodyInit ? null : p._bodyInit);
    });
  }
  (fetch$1.polyfill = !0),
    Le.fetch ||
      ((Le.fetch = fetch$1),
      (Le.Headers = Headers$1),
      (Le.Request = Request),
      (Le.Response = Response));
  const We = new Logger(),
    addPathToURL = (e, n) =>
      void 0 === e || '' === e
        ? n || ''
        : void 0 === n
        ? e
        : (e.endsWith('/') && (e = e.slice(0, -1)),
          n.startsWith('/') && (n = n.slice(1)),
          `${e}/${n}`),
    addQueryParamsToURL = (e, n) => {
      const d = urlEncodeParameters(n);
      return '' === d
        ? e
        : e.endsWith('&') || e.endsWith('?')
        ? `${e}${d}`
        : e.includes('?')
        ? `${e}&${d}`
        : `${e}?${d}`;
    },
    Ye = 'undefined' != typeof Headers,
    headersToDict = (e) => {
      let n = {};
      var d;
      return (
        (d = e),
        Ye && d instanceof Headers
          ? e.forEach((e, d) => (n[d] = e))
          : Array.isArray(e)
          ? e.forEach(([e, d]) => (n[e] = d))
          : (n = e),
        n
      );
    },
    mergeFetchHeaders = (e = {}, n = {}) =>
      Object.assign(Object.assign({}, headersToDict(e)), headersToDict(n)),
    mergeFetchOptions = (e, n) => {
      if (e || n)
        return (null == e ? void 0 : e.headers) &&
          (null == n ? void 0 : n.headers)
          ? Object.assign(Object.assign(Object.assign({}, e), n), {
              headers: mergeFetchHeaders(e.headers, n.headers),
            })
          : Object.assign(Object.assign({}, e), n);
    };
  function parseQueryParams(e) {
    var n;
    if (!e || (e.startsWith('http') && !e.includes('?'))) return {};
    try {
      return parseParams(
        null !== (n = e.split('?')[1]) && void 0 !== n ? n : e,
        '&',
        decodeURIComponent
      );
    } catch (d) {
      return {};
    }
  }
  function parseParams(e, n = '&', d = (e) => e) {
    return 'string' != typeof e
      ? {}
      : e
          .split(n)
          .map((e) => e.trim().split('=', 2))
          .reduce((e, n) => {
            const [h, p] = n;
            return (
              ('' === h && void 0 === p) ||
                ((e[d(h)] = d(p)), void 0 === p && (e[d(h)] = void 0)),
              e
            );
          }, {});
  }
  function getMaxAgeFromHeaders(e) {
    const n = (function (e, n) {
      if (void 0 !== n) return Ye && n instanceof Headers ? n.get(e) : n[e];
    })('cache-control', e);
    if (n) {
      return ((e) => {
        const n = Number(e);
        if (Number.isFinite(n)) return n;
      })(parseParams(n, ',')['max-age']);
    }
  }
  function rewriteLastUrlPath(e, n) {
    const d = e.split('/');
    return d.pop(), d.push(n), d.join('/');
  }
  const recursiveEncodeParameters = (e, n) =>
    Object.keys(e).reduce((d, h) => {
      const p = e[h],
        y = n ? `${n}[${encodeURIComponent(h)}]` : encodeURIComponent(h);
      return `${d}${d ? '&' : ''}${
        (function (e) {
          return !!e && 'object' == typeof e && !Array.isArray(e);
        })(p)
          ? recursiveEncodeParameters(p, y)
          : `${y}=${encodeURIComponent('' + p)}`
      }`;
    }, '');
  function urlEncodeParameters(e) {
    return e ? recursiveEncodeParameters(e) : '';
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ function __rest(
    e,
    n
  ) {
    var d = {};
    for (var h in e)
      Object.prototype.hasOwnProperty.call(e, h) &&
        n.indexOf(h) < 0 &&
        (d[h] = e[h]);
    if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
      var p = 0;
      for (h = Object.getOwnPropertySymbols(e); p < h.length; p++)
        n.indexOf(h[p]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, h[p]) &&
          (d[h[p]] = e[h[p]]);
    }
    return d;
  }
  function __decorate(e, n, d, h) {
    var p,
      y = arguments.length,
      m =
        y < 3
          ? n
          : null === h
          ? (h = Object.getOwnPropertyDescriptor(n, d))
          : h;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      m = Reflect.decorate(e, n, d, h);
    else
      for (var g = e.length - 1; g >= 0; g--)
        (p = e[g]) && (m = (y < 3 ? p(m) : y > 3 ? p(n, d, m) : p(n, d)) || m);
    return y > 3 && m && Object.defineProperty(n, d, m), m;
  }
  function __metadata(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  function __awaiter(e, n, d, h) {
    return new (d || (d = Promise))(function (p, y) {
      function fulfilled(e) {
        try {
          step(h.next(e));
        } catch (Vt) {
          y(Vt);
        }
      }
      function rejected(e) {
        try {
          step(h.throw(e));
        } catch (Vt) {
          y(Vt);
        }
      }
      function step(e) {
        var n;
        e.done
          ? p(e.value)
          : ((n = e.value),
            n instanceof d
              ? n
              : new d(function (e) {
                  e(n);
                })).then(fulfilled, rejected);
      }
      step((h = h.apply(e, n || [])).next());
    });
  }
  const qe = isNodeEnvironment$1();
  class Browser {
    constructor(e) {
      var n;
      e ||
        (e =
          'undefined' != typeof window &&
          (null ===
            (n =
              null === window || void 0 === window
                ? void 0
                : window.navigator) || void 0 === n
            ? void 0
            : n.userAgent)
            ? window.navigator.userAgent
            : '');
      const d = e.toLowerCase();
      (this.isEdge = /\sedge\//.test(d)),
        (this.isChrome = !this.isEdge && /chrome/.test(d)),
        (this.isSafari = !this.isEdge && !this.isChrome && /safari/.test(d)),
        (this.isFirefox =
          !this.isEdge &&
          !this.isChrome &&
          !this.isSafari &&
          /firefox/.test(d)),
        (this.isIE =
          !this.isEdge &&
          !this.isChrome &&
          !this.isSafari &&
          !this.isFirefox &&
          /trident|msie/.test(d)),
        (this.isMobile = /mobile/.test(d)),
        (this.isAndroid = /android/.test(d)),
        (this.isiOS = this.isMobile && /iphone|ipad|ipod/.test(d)),
        (this.isMacOs = !this.isMobile && /macintosh/.test(d)),
        (this.isWebView =
          /(webview|(iphone|ipod|ipad)(?!.*safari\/)|android.*(wv|\.0\.0\.0)|\bfb[\w_]+\/(?:messenger)?|\binstagram|\btwitter)/.test(
            d
          )),
        this.isEdge
          ? (this.engineVersion = d.match(/(?:edge).(\d+)/))
          : ((this.version = d.match(
              /(?:chrome|version|firefox|msie|rv).(\d+)\.(\d+)/
            )),
            (this.engineVersion = d.match(
              /(?:applewebkit|gecko|trident).(\d+)/
            ))),
        this.version &&
          ((this.majorVersion = parseInt(this.version[1], 10)),
          (this.minorVersion = parseInt(this.version[2], 10))),
        this.engineVersion &&
          (this.engineMajorVersion = parseInt(this.engineVersion[1], 10));
    }
    static supportsEs6() {
      if ('undefined' == typeof Symbol) return !1;
      try {
        new Function('"use strict";class Foo {}')(),
          new Function('"use strict";var bar = (x) => x+1')();
      } catch (Vt) {
        return !1;
      }
      return !0;
    }
  }
  const ze = new Browser();
  var Ge;
  !(function (e) {
    (e.NONE = 'none'),
      (e.FAIRPLAY = 'com.apple.fps'),
      (e.PLAYREADY = 'com.microsoft.playready'),
      (e.WIDEVINE = 'com.widevine.alpha');
  })(Ge || (Ge = {}));
  const Qe = { app: {}, features: {}, urls: {} },
    Je = 'mk-player-tsid',
    Xe = document.createElement('video'),
    Ze = [],
    et = [];
  function deferPlayback() {
    fillAvailableElements('audio', et),
      fillAvailableElements('video', Ze),
      M.debug(
        `dom-helpers: defer playback called.  There are ${Ze.length} available video elements and ${et.length} available audio elements.`
      );
  }
  function fillAvailableElements(e, n) {
    let d = 100 - n.length;
    for (; d > 0; ) {
      const h = document.createElement(e);
      h.load(), n.push(h), d--;
    }
  }
  var tt, it, rt;
  function findMediaKeySystemAccess(e, n) {
    return __awaiter(this, void 0, void 0, function* () {
      for (let h = 0; h < e.length; h++)
        try {
          const d = e[h];
          return [d, yield navigator.requestMediaKeySystemAccess(d, n)];
        } catch (d) {}
      return [];
    });
  }
  !(function (e) {
    (e.playbackLicenseError = 'playbackLicenseError'),
      (e.playbackSessionError = 'playbackSessionError'),
      (e.manifestParsed = 'manifestParsed'),
      (e.audioCodecIdentified = 'audioCodecIdentified'),
      (e.audioTracksSwitched = 'audioTracksSwitched'),
      (e.audioTracksUpdated = 'audioTracksUpdated'),
      (e.textTracksSwitched = 'textTracksSwitched'),
      (e.textTracksUpdated = 'textTracksUpdated'),
      (e.inlineStylesParsed = 'inlineStylesParsed'),
      (e.levelUpdated = 'levelUpdated');
  })(tt || (tt = {})),
    (function (e) {
      (e.MP4 = 'audio/mp4'), (e.AVC1 = 'video/mp4');
    })(it || (it = {})),
    (function (e) {
      (e.WIDEVINE = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'),
        (e.PLAYREADY = 'com.microsoft.playready'),
        (e.FAIRPLAY = 'com.apple.streamingkeydelivery');
    })(rt || (rt = {}));
  let st;
  const { NONE: nt, FAIRPLAY: at, WIDEVINE: ot, PLAYREADY: dt } = Ge;
  function supportsDrm() {
    if (!st) throw new Error('findKeySystemPreference has not been invoked');
    return st !== nt;
  }
  function potentialKeySystemsForAccess() {
    return (function () {
      const e = getSessionStorage();
      return !!e && 'true' === e.getItem('mk-playready-cbcs-unsupported');
    })()
      ? [ot]
      : Qe.features['prefer-playready']
      ? [dt, ot]
      : [ot, dt];
  }
  function findKeySystemPreference() {
    var e, n;
    return __awaiter(this, void 0, void 0, function* () {
      if (!qe) {
        if (
          null === (e = window.WebKitMediaKeys) || void 0 === e
            ? void 0
            : e.isTypeSupported(at + '.1_0', it.AVC1)
        )
          st = at;
        else if (
          null === (n = window.MSMediaKeys) || void 0 === n
            ? void 0
            : n.isTypeSupported(dt, it.AVC1)
        )
          st = dt;
        else {
          const e = Xe;
          if (
            hasMediaKeySupport() &&
            e.canPlayType('video/mp4;codecs="avc1.42E01E"') &&
            e.canPlayType('audio/mp4;codecs="mp4a.40.2"')
          ) {
            const e = [
                {
                  initDataTypes: ['keyids', 'cenc'],
                  distinctiveIdentifier: 'optional',
                  persistentState: 'required',
                  videoCapabilities: [
                    {
                      contentType: 'video/mp4;codecs="avc1.42E01E"',
                      robustness: 'SW_SECURE_CRYPTO',
                    },
                  ],
                  audioCapabilities: [
                    { contentType: 'audio/mp4;codecs="mp4a.40.2"' },
                  ],
                },
              ],
              n = potentialKeySystemsForAccess(),
              [d] = yield findMediaKeySystemAccess(n, e);
            st = d;
          }
        }
        return (st = null != st ? st : nt), st;
      }
      st = nt;
    });
  }
  function hasMediaKeySupport() {
    return !!(
      navigator &&
      navigator.requestMediaKeySystemAccess &&
      window.MediaKeys &&
      window.MediaKeySystemAccess
    );
  }
  const AsyncDebounce =
      (e = 100, n) =>
      (d, h, p) => {
        const y = p.value,
          m = asyncDebounce(y, e, n);
        p.value = m;
      },
    asyncDebounce = (e, n = 250, d = { isImmediate: !1 }) => {
      let h, p;
      function fulfill(e) {
        return hasOwn(d, 'cancelledValue')
          ? null == e
            ? void 0
            : e.resolve(d.cancelledValue)
          : null == e
          ? void 0
          : e.reject(new Error('cancelled'));
      }
      const clearLastPromise = () => {
          h &&
            (h.resolved ||
              (fulfill(h), h.timeoutId && clearTimeout(h.timeoutId)),
            (h = void 0));
        },
        invokeFn = (n, d, p, y) => {
          e.apply(n, y)
            .then((e) => {
              d(e), h && (h.resolved = !0);
            })
            .catch(p);
        };
      return d.isImmediate
        ? function (...e) {
            const d = Date.now(),
              y = this;
            return (
              p && d >= p && clearLastPromise(),
              (p = Date.now() + n),
              h
                ? fulfill(Promise)
                : new Promise((n, d) => {
                    (h = { resolve: n, reject: d }), invokeFn(y, n, d, e);
                  })
            );
          }
        : function (...e) {
            const d = this;
            return (
              h && clearLastPromise(),
              new Promise(function (p, y) {
                const m = setTimeout(invokeFn.bind(void 0, d, p, y, e), n);
                h = { resolve: p, reject: y, timeoutId: m };
              })
            );
          };
    },
    lt = {
      AFG: '143610',
      AGO: '143564',
      AIA: '143538',
      ALB: '143575',
      AND: '143611',
      ARE: '143481',
      ARG: '143505',
      ARM: '143524',
      ATG: '143540',
      AUS: '143460',
      AUT: '143445',
      AZE: '143568',
      BEL: '143446',
      BEN: '143576',
      BFA: '143578',
      BGD: '143490',
      BGR: '143526',
      BHR: '143559',
      BHS: '143539',
      BIH: '143612',
      BLR: '143565',
      BLZ: '143555',
      BMU: '143542',
      BOL: '143556',
      BRA: '143503',
      BRB: '143541',
      BRN: '143560',
      BTN: '143577',
      BWA: '143525',
      CAF: '143623',
      CAN: '143455',
      CHE: '143459',
      CHL: '143483',
      CHN: '143465',
      CIV: '143527',
      CMR: '143574',
      COD: '143613',
      COG: '143582',
      COL: '143501',
      CPV: '143580',
      CRI: '143495',
      CYM: '143544',
      CYP: '143557',
      CZE: '143489',
      DEU: '143443',
      DMA: '143545',
      DNK: '143458',
      DOM: '143508',
      DZA: '143563',
      ECU: '143509',
      EGY: '143516',
      ESP: '143454',
      EST: '143518',
      ETH: '143569',
      FIN: '143447',
      FJI: '143583',
      FRA: '143442',
      FSM: '143591',
      GAB: '143614',
      GBR: '143444',
      GEO: '143615',
      GHA: '143573',
      GIN: '143616',
      GMB: '143584',
      GNB: '143585',
      GRC: '143448',
      GRD: '143546',
      GTM: '143504',
      GUY: '143553',
      HKG: '143463',
      HND: '143510',
      HRV: '143494',
      HUN: '143482',
      IDN: '143476',
      IND: '143467',
      IRL: '143449',
      IRQ: '143617',
      ISL: '143558',
      ISR: '143491',
      ITA: '143450',
      JAM: '143511',
      JOR: '143528',
      JPN: '143462',
      KAZ: '143517',
      KEN: '143529',
      KGZ: '143586',
      KHM: '143579',
      KNA: '143548',
      KOR: '143466',
      KWT: '143493',
      LAO: '143587',
      LBN: '143497',
      LBR: '143588',
      LBY: '143567',
      LCA: '143549',
      LIE: '143522',
      LKA: '143486',
      LTU: '143520',
      LUX: '143451',
      LVA: '143519',
      MAC: '143515',
      MAR: '143620',
      MCO: '143618',
      MDA: '143523',
      MDG: '143531',
      MDV: '143488',
      MEX: '143468',
      MKD: '143530',
      MLI: '143532',
      MLT: '143521',
      MMR: '143570',
      MNE: '143619',
      MNG: '143592',
      MOZ: '143593',
      MRT: '143590',
      MSR: '143547',
      MUS: '143533',
      MWI: '143589',
      MYS: '143473',
      NAM: '143594',
      NER: '143534',
      NGA: '143561',
      NIC: '143512',
      NLD: '143452',
      NOR: '143457',
      NPL: '143484',
      NRU: '143606',
      NZL: '143461',
      OMN: '143562',
      PAK: '143477',
      PAN: '143485',
      PER: '143507',
      PHL: '143474',
      PLW: '143595',
      PNG: '143597',
      POL: '143478',
      PRT: '143453',
      PRY: '143513',
      PSE: '143596',
      QAT: '143498',
      ROU: '143487',
      RUS: '143469',
      RWA: '143621',
      SAU: '143479',
      SEN: '143535',
      SGP: '143464',
      SLB: '143601',
      SLE: '143600',
      SLV: '143506',
      SRB: '143500',
      STP: '143598',
      SUR: '143554',
      SVK: '143496',
      SVN: '143499',
      SWE: '143456',
      SWZ: '143602',
      SYC: '143599',
      TCA: '143552',
      TCD: '143581',
      THA: '143475',
      TJK: '143603',
      TKM: '143604',
      TON: '143608',
      TTO: '143551',
      TUN: '143536',
      TUR: '143480',
      TWN: '143470',
      TZA: '143572',
      UGA: '143537',
      UKR: '143492',
      URY: '143514',
      USA: '143441',
      UZB: '143566',
      VCT: '143550',
      VEN: '143502',
      VGB: '143543',
      VNM: '143471',
      VUT: '143609',
      WSM: '143607',
      XKX: '143624',
      YEM: '143571',
      ZAF: '143472',
      ZMB: '143622',
      ZWE: '143605',
    },
    ct = memoize((e) => {
      const n = new Uint16Array(e),
        d = n.length;
      let h = '';
      for (let p = 0; p < d; p++) h += String.fromCharCode(n[p]);
      return h;
    }),
    ut = memoize((e) => {
      const n = T(e);
      return ht(n);
    });
  function ensureArray(e = []) {
    return Array.isArray(e) ? e : [e];
  }
  const ht = memoize((e) => {
      const n = e.length,
        d = new ArrayBuffer(n),
        h = new Uint8Array(d);
      for (let p = 0; p < n; p++) h[p] = e.charCodeAt(p);
      return h;
    }),
    pt = memoize((e) => {
      const n = e.length,
        d = new ArrayBuffer(2 * n),
        h = new Uint16Array(d);
      for (let p = 0; p < n; p++) h[p] = e.charCodeAt(p);
      return h;
    }),
    yt = memoize((e) => {
      let n,
        d,
        h,
        p,
        y,
        m,
        g,
        _ = 0;
      const b =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let T = '';
      for (; _ < e.length; )
        (n = e[_++]),
          (d = _ < e.length ? e[_++] : Number.NaN),
          (h = _ < e.length ? e[_++] : Number.NaN),
          (p = n >> 2),
          (y = ((3 & n) << 4) | (d >> 4)),
          (m = ((15 & d) << 2) | (h >> 6)),
          (g = 63 & h),
          isNaN(d) ? (m = g = 64) : isNaN(h) && (g = 64),
          (T += b.charAt(p) + b.charAt(y) + b.charAt(m) + b.charAt(g));
      return T;
    });
  let isMergeableObject = function (e) {
    return (
      (function (e) {
        return !!e && 'object' == typeof e;
      })(e) &&
      !(function (e) {
        let n = Object.prototype.toString.call(e);
        return (
          '[object RegExp]' === n ||
          '[object Date]' === n ||
          (function (e) {
            return e.$$typeof === mt;
          })(e)
        );
      })(e)
    );
  };
  let mt =
    'function' == typeof Symbol && Symbol.for
      ? Symbol.for('react.element')
      : 60103;
  function cloneUnlessOtherwiseSpecified(e, n) {
    return !1 !== n.clone && n.isMergeableObject(e)
      ? deepmerge(((d = e), Array.isArray(d) ? [] : {}), e, n)
      : e;
    var d;
  }
  function defaultArrayMerge(e, n, d) {
    return e.concat(n).map(function (e) {
      return cloneUnlessOtherwiseSpecified(e, d);
    });
  }
  function getKeys(e) {
    return Object.keys(e).concat(
      (function (e) {
        return Object.getOwnPropertySymbols
          ? Object.getOwnPropertySymbols(e).filter(function (n) {
              return e.propertyIsEnumerable(n);
            })
          : [];
      })(e)
    );
  }
  function mergeObject(e, n, d) {
    let h = {};
    return (
      d.isMergeableObject(e) &&
        getKeys(e).forEach(function (n) {
          h[n] = cloneUnlessOtherwiseSpecified(e[n], d);
        }),
      getKeys(n).forEach(function (p) {
        d.isMergeableObject(n[p]) && e[p]
          ? (h[p] = (function (e, n) {
              if (!n.customMerge) return deepmerge;
              let d = n.customMerge(e);
              return 'function' == typeof d ? d : deepmerge;
            })(p, d)(e[p], n[p], d))
          : (h[p] = cloneUnlessOtherwiseSpecified(n[p], d));
      }),
      h
    );
  }
  function deepmerge(e, n, d) {
    ((d = d || {}).arrayMerge = d.arrayMerge || defaultArrayMerge),
      (d.isMergeableObject = d.isMergeableObject || isMergeableObject);
    let h = Array.isArray(n);
    return h === Array.isArray(e)
      ? h
        ? d.arrayMerge(e, n, d)
        : mergeObject(e, n, d)
      : cloneUnlessOtherwiseSpecified(n, d);
  }
  var gt;
  (deepmerge.all = function (e, n) {
    if (!Array.isArray(e)) throw new Error('first argument should be an array');
    return e.reduce(function (e, d) {
      return deepmerge(e, d, n);
    }, {});
  }),
    (function (e) {
      (e.dataRecordDidDelete = 'dataRecordDidDelete'),
        (e.dataRecordWillDelete = 'dataRecordWillDelete'),
        (e.dataRecordDidMaterialize = 'dataRecordDidMaterialize'),
        (e.dataRecordDidPopulate = 'dataRecordDidPopulate'),
        (e.dataRecordWillPopulate = 'dataRecordWillPopulate');
    })(gt || (gt = {}));
  const isDataRecord = (e) =>
    !(
      !e ||
      'function' != typeof e.hasAttributes ||
      'function' != typeof e.hasRelationships ||
      'function' != typeof e.hasViews ||
      'function' != typeof e.serialize
    );
  class DataRecord {
    constructor(e, n, d = {}) {
      (this.type = e),
        (this.id = n),
        (this._mjs = { attributes: [], relationships: [], views: [] }),
        (this._meta = {}),
        (this._mjs = Object.assign(Object.assign({}, this._mjs), d));
    }
    hasProperties(e) {
      return (
        !e ||
        (e.attributes || e.relationships || e.views
          ? !(e.attributes && !this.hasAttributes(e.attributes)) &&
            !(e.relationships && !this.hasRelationships(e.relationships)) &&
            !(e.views && !this.hasViews(e.views))
          : this.hasAttributes() || this.hasRelationships() || this.hasViews())
      );
    }
    hasAttributes(e) {
      return this._hasProperties(this._mjs.attributes, e);
    }
    hasRelationships(e) {
      return this._hasProperties(this._mjs.relationships, e);
    }
    hasViews(e) {
      return this._hasProperties(this._mjs.views, e);
    }
    meta(e) {
      return e ? this._meta[e] : this._meta;
    }
    serialize(e = !0, n = {}, d = {}) {
      const h = { id: this.id, type: this.type };
      return n[`${this.type}-${this.id}`] && !d.allowFullDuplicateSerializations
        ? h
        : ((n[`${this.type}-${this.id}`] = !0),
          this.hasAttributes() &&
            (h.attributes = this._mjs.attributes.reduce(
              (e, n) => ((e[n] = this[n]), e),
              {}
            )),
          this._mjs.relationships.length > 0 &&
            (h.relationships = this._serializeRelatedData(
              this._mjs.relationships,
              n,
              d
            )),
          this._mjs.views.length > 0 &&
            (h.views = this._serializeRelatedData(this._mjs.views, n, d)),
          e ? { data: h } : h);
    }
    setProperty(e, n, d = 'attributes', h = {}) {
      function isMergeableObject(e) {
        return !(!e || 'object' != typeof e || e instanceof DataRecord);
      }
      hasOwn(this, e) ||
        (this._mjs[d] || (this._mjs[d] = []), this._mjs[d].push(e));
      const setDescriptor = (e) => ({
        value: e,
        writable: !0,
        configurable: !0,
        enumerable: !0,
      });
      this[e] && n && 'object' == typeof this[e] && 'object' == typeof n
        ? 'attributes' === d
          ? Object.defineProperty(
              this,
              e,
              setDescriptor(
                deepmerge(this[e], n, {
                  arrayMerge: function (e, n, d) {
                    return n;
                  },
                  isMergeableObject: isMergeableObject,
                })
              )
            )
          : 'relationships' === d &&
            Array.isArray(this[e]) &&
            h.extendRelationships
          ? Object.defineProperty(
              this,
              e,
              setDescriptor(
                deepmerge(this[e], n, { isMergeableObject: isMergeableObject })
              )
            )
          : Object.defineProperty(this, e, setDescriptor(n))
        : Object.defineProperty(this, e, setDescriptor(n));
    }
    removeRelative(e, n) {
      this[e] &&
        (Array.isArray(this[e])
          ? (this[e] = this[e].filter((e) => e.id !== n))
          : delete this[e]);
    }
    setParent(e) {
      const n = this._mjs.parents,
        d = n && n.length > 0;
      this._mjs.parents = d ? n.concat(e) : e;
    }
    _hasProperties(e, n) {
      return (
        !!e && (n ? ensureArray(n).every((n) => e.includes(n)) : e.length > 0)
      );
    }
    _serializeRelatedData(e, n = {}, d = {}) {
      return e.reduce((e, h) => {
        if (d.excludeRelationships && d.excludeRelationships.has(h)) return e;
        if (d.includeRelationships && !d.includeRelationships.has(h)) return e;
        const p = this[h];
        return (
          Array.isArray(p)
            ? (e[h] = {
                data: p.map((e) =>
                  'function' == typeof e.serialize ? e.serialize(!1, n, d) : e
                ),
              })
            : (e[h] =
                p && 'function' == typeof p.serialize
                  ? p.serialize(!1, n, d)
                  : p),
          e
        );
      }, {});
    }
  }
  class DataStore extends Notifications {
    constructor(e = {}) {
      super([
        gt.dataRecordDidDelete,
        gt.dataRecordWillDelete,
        gt.dataRecordDidMaterialize,
        gt.dataRecordWillPopulate,
        gt.dataRecordDidPopulate,
      ]),
        (this._removeOnExpiration = !1),
        (this._shouldDisableRecordReuse = !0),
        (this._records = {}),
        (this._expiryRecords = new Set()),
        (this._removeOnExpiration = !!e.removeOnExpiration),
        (this._mapping = e.mapping),
        (this._shouldDisableRecordReuse = !!e.shouldDisableRecordReuse),
        (this.filter = e.filter);
    }
    get mapping() {
      return this._mapping;
    }
    set mapping(e) {
      this._mapping = e;
    }
    clear() {
      (this._records = {}), (this._expiryRecords = new Set());
    }
    peek(e, n, d) {
      if ((this._checkForExpiredRecords(), !this._records[e]))
        return n ? null : [];
      if (!n) return Object.values(this._records[e]);
      if (Array.isArray(n))
        return n.map((n) => {
          const h = this._records[e][n];
          if (h && h.hasProperties(d)) return h;
        });
      const h = this._records[e][n];
      return h && h.hasProperties(d) ? h : null;
    }
    populateDataRecords(e, n = {}, d = {}) {
      if (!e.data) return [];
      if (!Array.isArray(e.data)) return this.populateDataRecord(e.data, n, d);
      const h = [];
      return (
        e.data.forEach((e, p) => {
          const y = Object.assign(Object.assign({}, d), {
            parents: d.parents
              ? [
                  Object.assign(Object.assign({}, d.parents[0]), {
                    position: p,
                  }),
                ]
              : [],
          });
          d.parents && (d.parents[0].position = p);
          const m = this.populateDataRecord(e, n, y);
          h.push(m);
        }),
        h
      );
    }
    populateDataRecord(e, n = {}, d) {
      const h = d.filter || this.filter,
        p = d.mapping || this.mapping;
      if (h && !h(e)) return;
      if (p) {
        let n = 'function' == typeof p ? p(e) : transform$8(p, e);
        Object.assign(e, n);
      }
      this._shouldDisableRecordReuse && (n = {});
      const y = this._materializeRecord(
        n,
        Object.assign({ id: e.id, type: e.type }, d)
      );
      return (
        e.meta && (y._meta = e.meta),
        e.attributes &&
          e.attributes.cachingPolicy &&
          e.attributes.cachingPolicy.maxAge &&
          ((y._mjs.expiration =
            Date.now() + 1e3 * e.attributes.cachingPolicy.maxAge),
          this._removeOnExpiration && this._expiryRecords.add(y)),
        this._populateDataAttributes(e, y),
        'object' == typeof e.relationships &&
          Object.keys(e.relationships).forEach((h) => {
            let m = e.relationships[h];
            m &&
              'data' in m &&
              ((m = this.populateDataRecords(m, n, {
                mapping: p,
                parents: [
                  { relationshipName: h, parentType: y.type, parentId: y.id },
                ],
              })),
              y.setProperty(h, m, 'relationships', d));
          }),
        'object' == typeof e.views &&
          Object.keys(e.views).forEach((d) => {
            const h = e.views[d];
            if (h.attributes || h.data) {
              const e = new DataRecord('view', d);
              if ((this._populateDataAttributes(h, e), h.data)) {
                const d = this.populateDataRecords(h, n, p);
                e.setProperty('data', d, 'relationships');
              }
              y.setProperty(d, e, 'views');
            }
          }),
        y
      );
    }
    query(e, n) {
      this._checkForExpiredRecords();
      let includeRecord = (e) => !1;
      return (
        'string' == typeof e && n
          ? (includeRecord = (d) => (null == d ? void 0 : d[e]) === n)
          : 'function' == typeof e
          ? (includeRecord = (n) => {
              try {
                return e(n);
              } catch (Vt) {
                return !1;
              }
            })
          : 'object' == typeof e &&
            (includeRecord = (n) => {
              const d = Object.keys(e);
              let h = 0;
              return (
                d.forEach((d) => {
                  (null == n ? void 0 : n[d]) === e[d] && h++;
                }),
                d.length === h
              );
            }),
        Object.values(this._records).reduce(
          (e, n) => (
            Object.values(n).forEach((n) => {
              includeRecord(n) && e.push(n);
            }),
            e
          ),
          []
        )
      );
    }
    remove(e, n) {
      setTimeout(this._checkForExpiredRecords.bind(this), 0);
      if (!hasOwn(this._records, e)) return;
      const d = this.peek(e, n);
      d &&
        (this.dispatchEvent(gt.dataRecordWillDelete, [e, n]),
        d._mjs.parents &&
          d._mjs.parents.length > 0 &&
          d._mjs.parents.forEach(
            ({ relationshipName: e, parentType: n, parentId: h }) => {
              this.peek(n, h).removeRelative(e, d.id);
            }
          ),
        delete this._records[e][n],
        this.dispatchEvent(gt.dataRecordDidDelete, [e, n]));
    }
    save(e, n = {}) {
      return (
        setTimeout(this._checkForExpiredRecords.bind(this), 0),
        this.populateDataRecords(e, this._records, n)
      );
    }
    _populateDataAttributes(e, n) {
      'object' == typeof e.attributes &&
        (this.dispatchEvent(gt.dataRecordWillPopulate, [n.type, n.id]),
        Object.keys(e.attributes).forEach((d) => {
          n.setProperty(d, e.attributes[d], 'attributes');
        }),
        this.dispatchEvent(gt.dataRecordDidPopulate, [n.type, n.id]));
    }
    _materializeRecord(e, n) {
      const { type: d, id: h } = n,
        p = __rest(n, ['type', 'id']);
      return (
        (e[d] = e[d] || {}),
        e[d][h]
          ? e[d][h].setParent(p.parents || [])
          : (e[d][h] = new DataRecord(d, h, p)),
        this.dispatchEvent(gt.dataRecordDidMaterialize, [d, h]),
        e[d][h]
      );
    }
    _checkForExpiredRecords() {
      const e = [];
      this._expiryRecords.forEach((n) => {
        Date.now() > n._mjs.expiration &&
          (e.push([n.type, n.id]), this._expiryRecords.delete(n));
      }),
        e.forEach((e) => {
          this.remove(...e);
        });
    }
  }
  const ft = {
    AW: 'ABW',
    AF: 'AFG',
    AO: 'AGO',
    AI: 'AIA',
    AX: 'ALA',
    AL: 'ALB',
    AD: 'AND',
    AE: 'ARE',
    AR: 'ARG',
    AM: 'ARM',
    AS: 'ASM',
    AQ: 'ATA',
    TF: 'ATF',
    AG: 'ATG',
    AU: 'AUS',
    AT: 'AUT',
    AZ: 'AZE',
    BI: 'BDI',
    BE: 'BEL',
    BJ: 'BEN',
    BQ: 'BES',
    BF: 'BFA',
    BD: 'BGD',
    BG: 'BGR',
    BH: 'BHR',
    BS: 'BHS',
    BA: 'BIH',
    BL: 'BLM',
    BY: 'BLR',
    BZ: 'BLZ',
    BM: 'BMU',
    BO: 'BOL',
    BR: 'BRA',
    BB: 'BRB',
    BN: 'BRN',
    BT: 'BTN',
    BV: 'BVT',
    BW: 'BWA',
    CF: 'CAF',
    CA: 'CAN',
    CC: 'CCK',
    CH: 'CHE',
    CL: 'CHL',
    CN: 'CHN',
    CI: 'CIV',
    CM: 'CMR',
    CD: 'COD',
    CG: 'COG',
    CK: 'COK',
    CO: 'COL',
    KM: 'COM',
    CV: 'CPV',
    CR: 'CRI',
    CU: 'CUB',
    CW: 'CUW',
    CX: 'CXR',
    KY: 'CYM',
    CY: 'CYP',
    CZ: 'CZE',
    DE: 'DEU',
    DJ: 'DJI',
    DM: 'DMA',
    DK: 'DNK',
    DO: 'DOM',
    DZ: 'DZA',
    EC: 'ECU',
    EG: 'EGY',
    ER: 'ERI',
    EH: 'ESH',
    ES: 'ESP',
    EE: 'EST',
    ET: 'ETH',
    FI: 'FIN',
    FJ: 'FJI',
    FK: 'FLK',
    FR: 'FRA',
    FO: 'FRO',
    FM: 'FSM',
    GA: 'GAB',
    GB: 'GBR',
    GE: 'GEO',
    GG: 'GGY',
    GH: 'GHA',
    GI: 'GIB',
    GN: 'GIN',
    GP: 'GLP',
    GM: 'GMB',
    GW: 'GNB',
    GQ: 'GNQ',
    GR: 'GRC',
    GD: 'GRD',
    GL: 'GRL',
    GT: 'GTM',
    GF: 'GUF',
    GU: 'GUM',
    GY: 'GUY',
    HK: 'HKG',
    HM: 'HMD',
    HN: 'HND',
    HR: 'HRV',
    HT: 'HTI',
    HU: 'HUN',
    ID: 'IDN',
    IM: 'IMN',
    IN: 'IND',
    IO: 'IOT',
    IE: 'IRL',
    IR: 'IRN',
    IQ: 'IRQ',
    IS: 'ISL',
    IL: 'ISR',
    IT: 'ITA',
    JM: 'JAM',
    JE: 'JEY',
    JO: 'JOR',
    JP: 'JPN',
    KZ: 'KAZ',
    KE: 'KEN',
    KG: 'KGZ',
    KH: 'KHM',
    KI: 'KIR',
    KN: 'KNA',
    KR: 'KOR',
    KW: 'KWT',
    LA: 'LAO',
    LB: 'LBN',
    LR: 'LBR',
    LY: 'LBY',
    LC: 'LCA',
    LI: 'LIE',
    LK: 'LKA',
    LS: 'LSO',
    LT: 'LTU',
    LU: 'LUX',
    LV: 'LVA',
    MO: 'MAC',
    MF: 'MAF',
    MA: 'MAR',
    MC: 'MCO',
    MD: 'MDA',
    MG: 'MDG',
    MV: 'MDV',
    MX: 'MEX',
    MH: 'MHL',
    MK: 'MKD',
    ML: 'MLI',
    MT: 'MLT',
    MM: 'MMR',
    ME: 'MNE',
    MN: 'MNG',
    MP: 'MNP',
    MZ: 'MOZ',
    MR: 'MRT',
    MS: 'MSR',
    MQ: 'MTQ',
    MU: 'MUS',
    MW: 'MWI',
    MY: 'MYS',
    YT: 'MYT',
    NA: 'NAM',
    NC: 'NCL',
    NE: 'NER',
    NF: 'NFK',
    NG: 'NGA',
    NI: 'NIC',
    NU: 'NIU',
    NL: 'NLD',
    NO: 'NOR',
    NP: 'NPL',
    NR: 'NRU',
    NZ: 'NZL',
    OM: 'OMN',
    PK: 'PAK',
    PA: 'PAN',
    PN: 'PCN',
    PE: 'PER',
    PH: 'PHL',
    PW: 'PLW',
    PG: 'PNG',
    PL: 'POL',
    PR: 'PRI',
    KP: 'PRK',
    PT: 'PRT',
    PY: 'PRY',
    PS: 'PSE',
    PF: 'PYF',
    QA: 'QAT',
    RE: 'REU',
    RO: 'ROU',
    RU: 'RUS',
    RW: 'RWA',
    SA: 'SAU',
    SD: 'SDN',
    SN: 'SEN',
    SG: 'SGP',
    GS: 'SGS',
    SH: 'SHN',
    SJ: 'SJM',
    SB: 'SLB',
    SL: 'SLE',
    SV: 'SLV',
    SM: 'SMR',
    SO: 'SOM',
    PM: 'SPM',
    RS: 'SRB',
    SS: 'SSD',
    ST: 'STP',
    SR: 'SUR',
    SK: 'SVK',
    SI: 'SVN',
    SE: 'SWE',
    SZ: 'SWZ',
    SX: 'SXM',
    SC: 'SYC',
    SY: 'SYR',
    TC: 'TCA',
    TD: 'TCD',
    TG: 'TGO',
    TH: 'THA',
    TJ: 'TJK',
    TK: 'TKL',
    TM: 'TKM',
    TL: 'TLS',
    TO: 'TON',
    TT: 'TTO',
    TN: 'TUN',
    TR: 'TUR',
    TV: 'TUV',
    TW: 'TWN',
    TZ: 'TZA',
    UG: 'UGA',
    UA: 'UKR',
    UM: 'UMI',
    UY: 'URY',
    US: 'USA',
    UZ: 'UZB',
    VA: 'VAT',
    VC: 'VCT',
    VE: 'VEN',
    VG: 'VGB',
    VI: 'VIR',
    VN: 'VNM',
    VU: 'VUT',
    WF: 'WLF',
    WS: 'WSM',
    XK: 'XKX',
    YE: 'YEM',
    ZA: 'ZAF',
    ZM: 'ZMB',
    ZW: 'ZWE',
  };
  class PubSub {
    constructor() {
      this.events = {};
    }
    publish(e, n) {
      const d = this.getSubscribersForType(e);
      void 0 !== d &&
        d.forEach((d) => {
          d(e, n);
        });
    }
    subscribe(e, n) {
      this.getSubscribersForType(e, !0).push(n);
    }
    subscribeOnce(e, n) {
      const onceCallback = (e, d) => {
        this.unsubscribe(e, onceCallback), n(e, d);
      };
      this.subscribe(e, onceCallback);
    }
    unsubscribe(e, n) {
      const d = this.getSubscribersForType(e);
      if (void 0 !== d)
        for (const h in d)
          if (d[h] === n) {
            delete d[h];
            break;
          }
    }
    clear(e) {
      void 0 === e ? (this.events = {}) : delete this.events[e];
    }
    getSubscribersForType(e, n = !1) {
      return (
        !this.events.hasOwnProperty(e) && n && (this.events[e] = []),
        this.events[e]
      );
    }
  }
  const vt = {},
    SerialAsync = (e) => {
      let n = Promise.resolve();
      return (d, h, p) => {
        const y = p.value;
        return (
          (p.value = function (...d) {
            return __awaiter(this, void 0, void 0, function* () {
              return (
                e &&
                  (n = ((e) => {
                    let n = vt[e];
                    return n || ((n = Promise.resolve()), (vt[e] = n)), n;
                  })(e)),
                (n = n.catch(() => {}).then(() => y.apply(this, d))),
                e && (vt[e] = n),
                n
              );
            });
          }),
          p
        );
      };
    };
  var _t, bt, Tt;
  (e.PlaybackBitrate = void 0),
    ((_t = e.PlaybackBitrate || (e.PlaybackBitrate = {}))[(_t.STANDARD = 64)] =
      'STANDARD'),
    (_t[(_t.HIGH = 256)] = 'HIGH'),
    (function (e) {
      (e.apiStorefrontChanged = 'apiStorefrontChanged'),
        (e.hlsLevelUpdated = 'hlsLevelUpdated'),
        (e.mediaContentComplete = 'mediaContentComplete'),
        (e.playbackPause = 'playbackPause'),
        (e.playbackPlay = 'playbackPlay'),
        (e.playbackScrub = 'playbackScrub'),
        (e.playbackSeek = 'playbackSeek'),
        (e.playbackSkip = 'playbackSkip'),
        (e.playbackStop = 'playbackStop'),
        (e.lyricsPlay = 'lyricsPlay'),
        (e.lyricsStop = 'lyricsStop'),
        (e.playerActivate = 'playerActivate'),
        (e.playerExit = 'playerExit'),
        (e.queueModified = 'queueModified'),
        (e.userActivityIntent = 'userActivityIntent'),
        (e.applicationActivityIntent = 'applicationActivityIntent');
    })(bt || (bt = {})),
    (function (e) {
      (e[(e.ACCURATE = 0)] = 'ACCURATE'), (e[(e.ROUND = 1)] = 'ROUND');
    })(Tt || (Tt = {}));
  class TimingAccuracy {
    constructor(e = !1) {
      this.mode = e ? Tt.ACCURATE : Tt.ROUND;
    }
    time(e = 0) {
      return this.mode === Tt.ROUND ? Math.round(e) : e;
    }
  }
  StringDevFlag.register('mk-player-debug');
  const Et = new Logger({
      levelFilterStorageKey: 'mk-player-debug',
      topic: 'mk-player',
    }),
    St = {
      audioTrackAdded: 'audioTrackAdded',
      audioTrackChanged: 'audioTrackChanged',
      audioTrackRemoved: 'audioTrackRemoved',
      bufferedProgressDidChange: 'bufferedProgressDidChange',
      drmUnsupported: 'drmUnsupported',
      forcedTextTrackChanged: 'forcedTextTrackChanged',
      mediaCanPlay: 'mediaCanPlay',
      mediaElementCreated: 'mediaElementCreated',
      mediaPlaybackError: 'mediaPlaybackError',
      nowPlayingItemDidChange: 'nowPlayingItemDidChange',
      nowPlayingItemWillChange: 'nowPlayingItemWillChange',
      metadataDidChange: 'metadataDidChange',
      playbackBitrateDidChange: 'playbackBitrateDidChange',
      playbackDurationDidChange: 'playbackDurationDidChange',
      playbackProgressDidChange: 'playbackProgressDidChange',
      playbackRateDidChange: 'playbackRateDidChange',
      playbackStateDidChange: 'playbackStateDidChange',
      playbackStateWillChange: 'playbackStateWillChange',
      playbackTargetAvailableDidChange: 'playbackTargetAvailableDidChange',
      playbackTargetIsWirelessDidChange: 'playbackTargetIsWirelessDidChange',
      playbackTimeDidChange: 'playbackTimeDidChange',
      playbackVolumeDidChange: 'playbackVolumeDidChange',
      playerTypeDidChange: 'playerTypeDidChange',
      presentationModeDidChange: 'presentationModeDidChange',
      primaryPlayerDidChange: 'primaryPlayerDidChange',
      textTrackAdded: 'textTrackAdded',
      textTrackChanged: 'textTrackChanged',
      textTrackRemoved: 'textTrackRemoved',
      timedMetadataDidChange: 'timedMetadataDidChange',
    };
  class BitrateCalculator {
    constructor(n, d = e.PlaybackBitrate.STANDARD) {
      var h, p;
      (this._downlinkSamples = []),
        (this._bitrate = d),
        (this._dispatcher = n),
        void 0 !==
          (null ===
            (p =
              null ===
                (h =
                  null === window || void 0 === window
                    ? void 0
                    : window.navigator) || void 0 === h
                ? void 0
                : h.connection) || void 0 === p
            ? void 0
            : p.downlink) &&
          this._recalculateBitrate(
            100 * (window.navigator.connection.downlink || 0)
          );
    }
    get bitrate() {
      return this._bitrate;
    }
    set bitrate(e) {
      this._bitrate !== e &&
        ((this._bitrate = e),
        this._dispatcher.publish(St.playbackBitrateDidChange, { bitrate: e }));
    }
    _calculateAverageDownlink() {
      return 0 === this._downlinkSamples.length
        ? 0
        : this._downlinkSamples.reduce((e, n) => e + n, 0) /
            this._downlinkSamples.length || 0;
    }
    _recalculateBitrate(n) {
      Et.debug('_recalculateBitrate', n), this._downlinkSamples.push(n);
      this._calculateAverageDownlink() > e.PlaybackBitrate.STANDARD
        ? (Et.debug('setting bitrate to', e.PlaybackBitrate.HIGH),
          (this.bitrate = e.PlaybackBitrate.HIGH))
        : (Et.debug('setting bitrate to', e.PlaybackBitrate.STANDARD),
          (this.bitrate = e.PlaybackBitrate.STANDARD));
    }
  }
  var kt, Pt, It, At, wt, Rt, Ot;
  !(function (e) {
    (e.MUSICKIT = 'music_kit-integration'),
      (e.OTHER = 'other'),
      (e.MINI = 'mini'),
      (e.SONG = 'song'),
      (e.ALBUM = 'album'),
      (e.ALBUM_CLASSICAL = 'album-classical'),
      (e.ARTIST = 'artist'),
      (e.COMPILATION = 'compilation'),
      (e.COMPILATION_CLASSICAL = 'compilation-classical'),
      (e.PLAYLIST = 'playlist'),
      (e.PLAYLIST_CLASSICAL = 'playlist-classical'),
      (e.RADIO = 'radio'),
      (e.SEARCH = 'search'),
      (e.STATION = 'station');
  })(kt || (kt = {})),
    (function (e) {
      (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.RADIO = 1)] = 'RADIO'),
        (e[(e.PLAYLIST = 2)] = 'PLAYLIST'),
        (e[(e.ALBUM = 3)] = 'ALBUM'),
        (e[(e.ARTIST = 4)] = 'ARTIST');
    })(Pt || (Pt = {})),
    (e.PlayActivityEndReasonType = void 0),
    ((It = e.PlayActivityEndReasonType || (e.PlayActivityEndReasonType = {}))[
      (It.NOT_APPLICABLE = 0)
    ] = 'NOT_APPLICABLE'),
    (It[(It.OTHER = 1)] = 'OTHER'),
    (It[(It.TRACK_SKIPPED_FORWARDS = 2)] = 'TRACK_SKIPPED_FORWARDS'),
    (It[(It.PLAYBACK_MANUALLY_PAUSED = 3)] = 'PLAYBACK_MANUALLY_PAUSED'),
    (It[(It.PLAYBACK_SUSPENDED = 4)] = 'PLAYBACK_SUSPENDED'),
    (It[(It.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM = 5)] =
      'MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM'),
    (It[(It.PLAYBACK_PAUSED_DUE_TO_INACTIVITY = 6)] =
      'PLAYBACK_PAUSED_DUE_TO_INACTIVITY'),
    (It[(It.NATURAL_END_OF_TRACK = 7)] = 'NATURAL_END_OF_TRACK'),
    (It[(It.PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT = 8)] =
      'PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT'),
    (It[(It.TRACK_BANNED = 9)] = 'TRACK_BANNED'),
    (It[(It.FAILED_TO_LOAD = 10)] = 'FAILED_TO_LOAD'),
    (It[(It.PAUSED_ON_TIMEOUT = 11)] = 'PAUSED_ON_TIMEOUT'),
    (It[(It.SCRUB_BEGIN = 12)] = 'SCRUB_BEGIN'),
    (It[(It.SCRUB_END = 13)] = 'SCRUB_END'),
    (It[(It.TRACK_SKIPPED_BACKWARDS = 14)] = 'TRACK_SKIPPED_BACKWARDS'),
    (It[(It.NOT_SUPPORTED_BY_CLIENT = 15)] = 'NOT_SUPPORTED_BY_CLIENT'),
    (It[(It.QUICK_PLAY = 16)] = 'QUICK_PLAY'),
    (It[(It.EXITED_APPLICATION = 17)] = 'EXITED_APPLICATION'),
    (function (e) {
      (e[(e.Manual = 0)] = 'Manual'),
        (e[(e.Interval = 1)] = 'Interval'),
        (e[(e.SkipIntro = 2)] = 'SkipIntro');
    })(At || (At = {})),
    (function (e) {
      (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.NO_RIGHTS = 1)] = 'NO_RIGHTS'),
        (e[(e.PURCHASED = 2)] = 'PURCHASED'),
        (e[(e.UPLOADED = 3)] = 'UPLOADED'),
        (e[(e.MATCHED = 4)] = 'MATCHED'),
        (e[(e.ADDED = 5)] = 'ADDED'),
        (e[(e.SUBSCRIBED = 6)] = 'SUBSCRIBED'),
        (e[(e.NOT_SUPPORTED = 7)] = 'NOT_SUPPORTED');
    })(wt || (wt = {})),
    (function (e) {
      (e[(e.NO_SELECTION_PLAY = 0)] = 'NO_SELECTION_PLAY'),
        (e[(e.RESUME_LAST_PLAYED_SONG = 1)] = 'RESUME_LAST_PLAYED_SONG'),
        (e[(e.RESUME_CURRENT_DEVICE_POSITION = 2)] =
          'RESUME_CURRENT_DEVICE_POSITION');
    })(Rt || (Rt = {})),
    (function (e) {
      (e[(e.NOT_APPLICABLE = 0)] = 'NOT_APPLICABLE'),
        (e[(e.SIMILARITIES = 1)] = 'SIMILARITIES'),
        (e[(e.ESSENTIALS = 2)] = 'ESSENTIALS'),
        (e[(e.USER_LIBRARY = 3)] = 'USER_LIBRARY'),
        (e[(e.ALGO_HEATSEEKER = 4)] = 'ALGO_HEATSEEKER'),
        (e[(e.SEED_TRACK = 5)] = 'SEED_TRACK'),
        (e[(e.GN_1M_TEMPORARY = 6)] = 'GN_1M_TEMPORARY'),
        (e[(e.VECTOR = 8)] = 'VECTOR'),
        (e[(e.ARTIST_SIMILARITIES = 9)] = 'ARTIST_SIMILARITIES'),
        (e[(e.STORY_ALBUM_LISTENERS_ALSO_BOUGHT = 10)] =
          'STORY_ALBUM_LISTENERS_ALSO_BOUGHT'),
        (e[(e.STORY_ALBUM_SALES_LEADER = 11)] = 'STORY_ALBUM_SALES_LEADER'),
        (e[(e.STORY_BILLBOARD = 12)] = 'STORY_BILLBOARD'),
        (e[(e.STORY_COMPLETE_MY_ALBUM = 13)] = 'STORY_COMPLETE_MY_ALBUM'),
        (e[(e.STORY_CRITICAL_PICK = 14)] = 'STORY_CRITICAL_PICK'),
        (e[(e.STORY_ITUNES_ESSENTIAL = 15)] = 'STORY_ITUNES_ESSENTIAL'),
        (e[(e.STORY_HEATSEEKER = 16)] = 'STORY_HEATSEEKER'),
        (e[(e.STORY_IDENTITY = 17)] = 'STORY_IDENTITY'),
        (e[(e.STORY_POWER_SONG = 18)] = 'STORY_POWER_SONG'),
        (e[(e.STORY_SONG_SALES_LEADER = 20)] = 'STORY_SONG_SALES_LEADER'),
        (e[(e.GENRE_SIMILARITIES = 21)] = 'GENRE_SIMILARITIES'),
        (e[(e.STORY_IMIX = 22)] = 'STORY_IMIX'),
        (e[(e.STORY_OTHER_MIX = 23)] = 'STORY_OTHER_MIX'),
        (e[(e.EDITORIAL = 24)] = 'EDITORIAL'),
        (e[(e.TOP_SONGS = 25)] = 'TOP_SONGS'),
        (e[(e.SUBFORMAT_SONGS = 26)] = 'SUBFORMAT_SONGS'),
        (e[(e.CRITICAL_PICKS = 27)] = 'CRITICAL_PICKS'),
        (e[(e.US_ARTIST_SIMS = 28)] = 'US_ARTIST_SIMS'),
        (e[(e.HEAVY_ROTATION = 29)] = 'HEAVY_ROTATION'),
        (e[(e.STORY_FORMAT_STATION_HEAVY_ROTATION = 30)] =
          'STORY_FORMAT_STATION_HEAVY_ROTATION'),
        (e[(e.ARTIST_BASED_CORE_SIMILAR_ARTISTS = 31)] =
          'ARTIST_BASED_CORE_SIMILAR_ARTISTS'),
        (e[(e.ARTIST_BASED_FAMILIAR_SIMILAR_ARTISTS = 32)] =
          'ARTIST_BASED_FAMILIAR_SIMILAR_ARTISTS'),
        (e[(e.ARTIST_BASED_DISCOVERIES = 33)] = 'ARTIST_BASED_DISCOVERIES'),
        (e[(e.ARTIST_BASED_HOT_SONGS = 34)] = 'ARTIST_BASED_HOT_SONGS'),
        (e[(e.ARTIST_BASED_SEED_ARTIST = 35)] = 'ARTIST_BASED_SEED_ARTIST'),
        (e[(e.ARTIST_BASED_COMPOSER = 36)] = 'ARTIST_BASED_COMPOSER'),
        (e[(e.EDITORIAL_STATION_INTRO = 37)] = 'EDITORIAL_STATION_INTRO'),
        (e[(e.EDITORIAL_RELATIVE_REPEAT = 38)] = 'EDITORIAL_RELATIVE_REPEAT'),
        (e[(e.EDITORIAL_ABSOLUTE_REPEAT = 39)] = 'EDITORIAL_ABSOLUTE_REPEAT'),
        (e[(e.EDITORIAL_SCHEDULED = 40)] = 'EDITORIAL_SCHEDULED'),
        (e[(e.EDITORIAL_SUGGESTED_ARTIST = 41)] = 'EDITORIAL_SUGGESTED_ARTIST'),
        (e[(e.FOR_YOU_FAMILIAR = 42)] = 'FOR_YOU_FAMILIAR'),
        (e[(e.FOR_YOU_RECOMMENDED = 43)] = 'FOR_YOU_RECOMMENDED'),
        (e[(e.FOR_YOU_FAVORITE_ARTIST = 44)] = 'FOR_YOU_FAVORITE_ARTIST'),
        (e[(e.FOR_YOU_RECOMMENDED_ARTIST = 45)] = 'FOR_YOU_RECOMMENDED_ARTIST'),
        (e[(e.EDITORIAL_POSITIONAL = 46)] = 'EDITORIAL_POSITIONAL'),
        (e[(e.SIMILAR_SONGS = 47)] = 'SIMILAR_SONGS'),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST = 48)] =
          'SONG_ATTRIBUTE_FAVORITE_ARTIST'),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST_DERIVED = 49)] =
          'SONG_ATTRIBUTE_FAVORITE_ARTIST_DERIVED'),
        (e[(e.SONG_ATTRIBUTE_FAVORITE_ARTIST_EDITORIAL = 50)] =
          'SONG_ATTRIBUTE_FAVORITE_ARTIST_EDITORIAL'),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED = 51)] = 'SONG_ATTRIBUTE_RECOMMENDED'),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED_DERIVED = 52)] =
          'SONG_ATTRIBUTE_RECOMMENDED_DERIVED'),
        (e[(e.SONG_ATTRIBUTE_RECOMMENDED_EDITORIAL = 53)] =
          'SONG_ATTRIBUTE_RECOMMENDED_EDITORIAL'),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED = 54)] =
          'SONG_ATTRIBUTE_NON_PERSONALIZED'),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED_DERIVED = 55)] =
          'SONG_ATTRIBUTE_NON_PERSONALIZED_DERIVED'),
        (e[(e.SONG_ATTRIBUTE_NON_PERSONALIZED_EDITORIAL = 56)] =
          'SONG_ATTRIBUTE_NON_PERSONALIZED_EDITORIAL'),
        (e[(e.PERSONAL_STATION = 57)] = 'PERSONAL_STATION'),
        (e[(e.PERSONAL_STATION_FAVORITE_ARTIST = 58)] =
          'PERSONAL_STATION_FAVORITE_ARTIST'),
        (e[(e.PERSONAL_STATION_RECOMMENDED = 59)] =
          'PERSONAL_STATION_RECOMMENDED'),
        (e[(e.NEW_MUSIC_STATION = 60)] = 'NEW_MUSIC_STATION'),
        (e[(e.NEW_MUSIC_STATION_FAVORITE_ARTIST = 61)] =
          'NEW_MUSIC_STATION_FAVORITE_ARTIST'),
        (e[(e.NEW_MUSIC_STATION_RECOMMENDED = 62)] =
          'NEW_MUSIC_STATION_RECOMMENDED');
    })(Ot || (Ot = {}));
  var Ct, Mt, Dt, Lt, Nt, xt, Ut, Bt, Ft, Kt, jt, $t;
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  function t(e, n) {
    var d = 'function' == typeof Symbol && e[Symbol.iterator];
    if (!d) return e;
    var h,
      p,
      y = d.call(e),
      m = [];
    try {
      for (; (void 0 === n || n-- > 0) && !(h = y.next()).done; )
        m.push(h.value);
    } catch (e) {
      p = { error: e };
    } finally {
      try {
        h && !h.done && (d = y.return) && d.call(y);
      } finally {
        if (p) throw p.error;
      }
    }
    return m;
  }
  !(function (e) {
    (e[(e.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
      (e[(e.STATIC = 1)] = 'STATIC'),
      (e[(e.TIME_SYNCED = 2)] = 'TIME_SYNCED');
  })(Ct || (Ct = {})),
    (function (e) {
      (e[(e.REPEAT_UNKNOWN = 0)] = 'REPEAT_UNKNOWN'),
        (e[(e.REPEAT_OFF = 1)] = 'REPEAT_OFF'),
        (e[(e.REPEAT_ONE = 2)] = 'REPEAT_ONE'),
        (e[(e.REPEAT_ALL = 3)] = 'REPEAT_ALL');
    })(Mt || (Mt = {})),
    (function (e) {
      (e[(e.SHUFFLE_UNKNOWN = 0)] = 'SHUFFLE_UNKNOWN'),
        (e[(e.SHUFFLE_OFF = 1)] = 'SHUFFLE_OFF'),
        (e[(e.SHUFFLE_ON = 2)] = 'SHUFFLE_ON');
    })(Dt || (Dt = {})),
    (function (e) {
      (e[(e.AUTO_UNKNOWN = 0)] = 'AUTO_UNKNOWN'),
        (e[(e.AUTO_OFF = 1)] = 'AUTO_OFF'),
        (e[(e.AUTO_ON = 2)] = 'AUTO_ON'),
        (e[(e.AUTO_ON_CONTENT_UNSUPPORTED = 3)] =
          'AUTO_ON_CONTENT_UNSUPPORTED');
    })(Lt || (Lt = {})),
    (function (e) {
      (e[(e.NOT_SPECIFIED = 0)] = 'NOT_SPECIFIED'),
        (e[(e.CONTAINER_CHANGED = 1)] = 'CONTAINER_CHANGED');
    })(Nt || (Nt = {})),
    (function (e) {
      (e[(e.PLAY_END = 0)] = 'PLAY_END'),
        (e[(e.PLAY_START = 1)] = 'PLAY_START'),
        (e[(e.LYRIC_DISPLAY = 2)] = 'LYRIC_DISPLAY');
    })(xt || (xt = {})),
    (function (e) {
      (e[(e.INVALID = 0)] = 'INVALID'),
        (e[(e.ITUNES_STORE_CONTENT = 1)] = 'ITUNES_STORE_CONTENT'),
        (e[(e.NON_SONG_CLIP = 2)] = 'NON_SONG_CLIP'),
        (e[(e.AD = 3)] = 'AD'),
        (e[(e.STREAM = 4)] = 'STREAM'),
        (e[(e.AUDIO_AD = 5)] = 'AUDIO_AD'),
        (e[(e.VIDEO_AD = 6)] = 'VIDEO_AD'),
        (e[(e.TIMED_METADATA_PING = 7)] = 'TIMED_METADATA_PING'),
        (e[(e.ARTIST_UPLOADED_CONTENT = 8)] = 'ARTIST_UPLOADED_CONTENT'),
        (e[(e.AGGREGATE_NON_CATALOG_PLAY_TIME = 9)] =
          'AGGREGATE_NON_CATALOG_PLAY_TIME'),
        (e[(e.ORIGINAL_CONTENT_MOVIES = 10)] = 'ORIGINAL_CONTENT_MOVIES'),
        (e[(e.ORIGINAL_CONTENT_SHOWS = 11)] = 'ORIGINAL_CONTENT_SHOWS');
    })(Ut || (Ut = {})),
    (function (e) {
      (e[(e.AUDIO = 0)] = 'AUDIO'), (e[(e.VIDEO = 1)] = 'VIDEO');
    })(Bt || (Bt = {})),
    (function (e) {
      (e[(e.AUTO = 0)] = 'AUTO'), (e[(e.MANUAL = 1)] = 'MANUAL');
    })(Ft || (Ft = {})),
    (function (e) {
      (e[(e.ORIGINATING_DEVICE = 0)] = 'ORIGINATING_DEVICE'),
        (e[(e.PAIRED_WATCH = 1)] = 'PAIRED_WATCH'),
        (e[(e.SONOS = 2)] = 'SONOS'),
        (e[(e.CAR_PLAY = 3)] = 'CAR_PLAY'),
        (e[(e.WEB_AUC = 4)] = 'WEB_AUC'),
        (e[(e.TWITTER_AUC = 5)] = 'TWITTER_AUC'),
        (e[(e.MUSIC_SDK = 6)] = 'MUSIC_SDK'),
        (e[(e.ATV_REMOTE = 7)] = 'ATV_REMOTE'),
        (e[(e.WEBPLAYER = 8)] = 'WEBPLAYER'),
        (e[(e.WHOLE_HOUSE_AUDIO = 9)] = 'WHOLE_HOUSE_AUDIO'),
        (e[(e.MUSICKIT = 10)] = 'MUSICKIT'),
        (e[(e.VW = 11)] = 'VW'),
        (e[(e.UNKNOWN_SOURCE_TYPE = 12)] = 'UNKNOWN_SOURCE_TYPE'),
        (e[(e.AMAZON = 13)] = 'AMAZON'),
        (e[(e.PORSCHE = 14)] = 'PORSCHE'),
        (e[(e.CHROMECAST = 15)] = 'CHROMECAST'),
        (e[(e.WEB_APP = 16)] = 'WEB_APP'),
        (e[(e.MERCEDES_BENZ = 17)] = 'MERCEDES_BENZ'),
        (e[(e.THIRD_PARTY_TV = 18)] = 'THIRD_PARTY_TV'),
        (e[(e.SAMSUNG = 18)] = 'SAMSUNG'),
        (e[(e.SEAT = 19)] = 'SEAT'),
        (e[(e.CUPRA = 20)] = 'CUPRA');
    })(Kt || (Kt = {})),
    (function (e) {
      (e[(e.EPISODE = 1)] = 'EPISODE'), (e[(e.SHOUTCAST = 2)] = 'SHOUTCAST');
    })(jt || (jt = {})),
    (function (e) {
      (e[(e.NotStarted = 0)] = 'NotStarted'),
        (e[(e.Running = 1)] = 'Running'),
        (e[(e.Stopped = 2)] = 'Stopped');
    })($t || ($t = {}));
  var Vt = { type: 'xstate.init' };
  function r(e) {
    return void 0 === e ? [] : [].concat(e);
  }
  function o(e) {
    return { type: 'xstate.assign', assignment: e };
  }
  function i(e, n) {
    return 'string' == typeof (e = 'string' == typeof e && n && n[e] ? n[e] : e)
      ? { type: e }
      : 'function' == typeof e
      ? { type: e.name, exec: e }
      : e;
  }
  function a(e) {
    return function (n) {
      return e === n;
    };
  }
  function u(e) {
    return 'string' == typeof e ? { type: e } : e;
  }
  function c(e, n) {
    return { value: e, context: n, actions: [], changed: !1, matches: a(e) };
  }
  function f(e, n, d) {
    var h = n,
      p = !1;
    return [
      e.filter(function (e) {
        if ('xstate.assign' === e.type) {
          p = !0;
          var n = Object.assign({}, h);
          return (
            'function' == typeof e.assignment
              ? (n = e.assignment(h, d))
              : Object.keys(e.assignment).forEach(function (p) {
                  n[p] =
                    'function' == typeof e.assignment[p]
                      ? e.assignment[p](h, d)
                      : e.assignment[p];
                }),
            (h = n),
            !1
          );
        }
        return !0;
      }),
      h,
      p,
    ];
  }
  function s(e, n) {
    void 0 === n && (n = {});
    var d = t(
        f(
          r(e.states[e.initial].entry).map(function (e) {
            return i(e, n.actions);
          }),
          e.context,
          Vt
        ),
        2
      ),
      h = d[0],
      p = d[1],
      y = {
        config: e,
        _options: n,
        initialState: {
          value: e.initial,
          actions: h,
          context: p,
          matches: a(e.initial),
        },
        transition: function (n, d) {
          var h,
            p,
            m = 'string' == typeof n ? { value: n, context: e.context } : n,
            g = m.value,
            _ = m.context,
            b = u(d),
            T = e.states[g];
          if (T.on) {
            var E = r(T.on[b.type]);
            try {
              for (
                var S = (function (e) {
                    var n = 'function' == typeof Symbol && Symbol.iterator,
                      d = n && e[n],
                      h = 0;
                    if (d) return d.call(e);
                    if (e && 'number' == typeof e.length)
                      return {
                        next: function () {
                          return (
                            e && h >= e.length && (e = void 0),
                            { value: e && e[h++], done: !e }
                          );
                        },
                      };
                    throw new TypeError(
                      n
                        ? 'Object is not iterable.'
                        : 'Symbol.iterator is not defined.'
                    );
                  })(E),
                  k = S.next();
                !k.done;
                k = S.next()
              ) {
                var P = k.value;
                if (void 0 === P) return c(g, _);
                var I = 'string' == typeof P ? { target: P } : P,
                  A = I.target,
                  w = I.actions,
                  R = void 0 === w ? [] : w,
                  O = I.cond,
                  C =
                    void 0 === O
                      ? function () {
                          return !0;
                        }
                      : O,
                  M = void 0 === A,
                  D = null != A ? A : g,
                  L = e.states[D];
                if (C(_, b)) {
                  var N = t(
                      f(
                        (M
                          ? r(R)
                          : [].concat(T.exit, R, L.entry).filter(function (e) {
                              return e;
                            })
                        ).map(function (e) {
                          return i(e, y._options.actions);
                        }),
                        _,
                        b
                      ),
                      3
                    ),
                    x = N[0],
                    U = N[1],
                    B = N[2],
                    F = null != A ? A : g;
                  return {
                    value: F,
                    context: U,
                    actions: x,
                    changed: A !== g || x.length > 0 || B,
                    matches: a(F),
                  };
                }
              }
            } catch (t) {
              h = { error: t };
            } finally {
              try {
                k && !k.done && (p = S.return) && p.call(S);
              } finally {
                if (h) throw h.error;
              }
            }
          }
          return c(g, _);
        },
      };
    return y;
  }
  var l = function (e, n) {
    return e.actions.forEach(function (d) {
      var h = d.exec;
      return h && h(e.context, n);
    });
  };
  function v(e) {
    var n = e.initialState,
      d = $t.NotStarted,
      h = new Set(),
      p = {
        _machine: e,
        send: function (p) {
          d === $t.Running &&
            ((n = e.transition(n, p)),
            l(n, u(p)),
            h.forEach(function (e) {
              return e(n);
            }));
        },
        subscribe: function (e) {
          return (
            h.add(e),
            e(n),
            {
              unsubscribe: function () {
                return h.delete(e);
              },
            }
          );
        },
        start: function (h) {
          if (h) {
            var y =
              'object' == typeof h
                ? h
                : { context: e.config.context, value: h };
            n = {
              value: y.value,
              actions: [],
              context: y.context,
              matches: a(y.value),
            };
          }
          return (d = $t.Running), l(n, Vt), p;
        },
        stop: function () {
          return (d = $t.Stopped), h.clear(), p;
        },
        get state() {
          return n;
        },
        get status() {
          return d;
        },
      };
    return p;
  }
  function invoke(e) {
    return void 0 === e || ((e) => 'function' != typeof e)(e) ? e : e();
  }
  const Ht = /(?:st|ra)\.([0-9]+)/,
    Wt = /st\.([0-9]+)/,
    toTimeMeasuredData = (e) => {
      var { timestamp: n } = e,
        d = __rest(e, ['timestamp']);
      return Object.assign(Object.assign({}, d), {
        'milliseconds-since-play': Date.now() - n,
      });
    };
  class PlayActivitySender {
    constructor(e) {
      var n, d, h, p;
      (this.mode = Ft.AUTO),
        (this._isQA = !1),
        (this._logInfo = !1),
        (this._preferDSID = !1),
        (this._accessToken = e.accessToken),
        (this._clientId = e.clientId),
        (this._eventType = e.eventType),
        (this._fetch = null !== (n = e.fetch) && void 0 !== n ? n : fetch),
        (this._fetchOptions =
          null !== (d = e.fetchOptions) && void 0 !== d ? d : {}),
        (this._headersClass =
          null !== (h = e.headersClass) && void 0 !== h ? h : Headers),
        (this._isQA = null !== (p = e.isQA) && void 0 !== p && p),
        (this._logInfo = e.logInfo || this._isQA),
        (this._musicUserToken = e.musicUserToken),
        (this._preferDSID = e.preferDSID),
        (this._sourceType = e.sourceType),
        (this._traceTag = e.traceTag);
    }
    get accessToken() {
      return invoke(this._accessToken);
    }
    get musicUserToken() {
      return invoke(this._musicUserToken);
    }
    get url() {
      return this._isQA
        ? 'https://universal-activity-service.itunes.apple.com/qa/play'
        : 'https://universal-activity-service.itunes.apple.com/play';
    }
    send(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const n = {
          client_id: this._clientId,
          event_type: this._eventType,
          data: ensureArray(e).map(toTimeMeasuredData),
        };
        if (0 === n.data.length)
          throw new Error('send() called without any data');
        const d = this._generateFetchOptions({
          method: 'POST',
          body: JSON.stringify(n),
          headers: this.headers(),
        });
        return (
          yield this._fetch(this.url, d),
          this._logInfo &&
            console.info(
              'play activity:',
              this._sourceType === Kt.AMAZON ? JSON.stringify(n) : n
            ),
          n
        );
      });
    }
    baseHeaders() {
      var e, n;
      const d =
        null !==
          (n =
            null === (e = this._fetchOptions) || void 0 === e
              ? void 0
              : e.headers) && void 0 !== n
          ? n
          : {};
      return d instanceof this._headersClass
        ? new this._headersClass(Array.from(d.entries()))
        : new this._headersClass(d);
    }
    headers() {
      const e = this._preferDSID ? 'X-Dsid' : 'media-user-token',
        n = this.baseHeaders();
      return (
        n.set('Authorization', 'Bearer ' + this.accessToken),
        n.set('Content-Type', 'application/json'),
        n.set(e, '' + this.musicUserToken),
        this._isQA &&
          void 0 !== this._traceTag &&
          n.set('Data-Trace-Tag', this._traceTag),
        n
      );
    }
    _generateFetchOptions(e) {
      return Object.assign(Object.assign({}, this._fetchOptions), e);
    }
  }
  const fullAppId = (e, n) => {
      if (void 0 === (null == n ? void 0 : n.name)) return 'MusicKitApp/1.0';
      if (void 0 !== e) return e;
      return `${(function (e) {
        return e
          .toLowerCase()
          .replace(/[-_]+/g, ' ')
          .replace(/[^\w\s]/g, '')
          .replace(/\b./g, (e) => e.toUpperCase())
          .replace(/\s/g, '');
      })(n.name)}/${(null == n ? void 0 : n.version) || '1.0'}`;
    },
    os = (e) => {
      var n, d, h;
      const p = e.toLowerCase();
      let y,
        m = 'Unidentified OS';
      const g = /mobile/.test(p);
      g && /android|adr/.test(p)
        ? ((m = 'Android'), (y = p.match(/(?:android|adr)\ ((\d+[._])+\d+)/)))
        : g && /iphone|ipad|ipod/.test(p)
        ? ((m = 'iOS'), (y = p.match(/os\ ((\d+[._])+\d+)\ like\ mac\ os\ x/)))
        : /tizen/.test(p)
        ? ((m = 'Tizen'), (y = p.match(/tizen (.*)/)))
        : /web0s|webos/.test(p)
        ? ((m = 'WebOS'), (y = p.match(/[web0s|webos] (.*)/)))
        : !g && /cros/.test(p)
        ? (m = 'ChromeOS')
        : !g && /macintosh/.test(p)
        ? ((m = 'macOS'), (y = p.match(/os\ x\ ((\d+[._])+\d+)\b/)))
        : !g && /linux/.test(p)
        ? (m = 'Linux')
        : !g &&
          /windows/.test(p) &&
          ((m = 'Windows'), (y = p.match(/windows ([^\)]*)/)));
      return `${m}/${
        null !==
          (h =
            null ===
              (d =
                null === (n = null == y ? void 0 : y[1]) || void 0 === n
                  ? void 0
                  : n.replace) || void 0 === d
              ? void 0
              : d.call(n, /_/g, '.')) && void 0 !== h
          ? h
          : '0.0'
      }`;
    },
    model = (e) =>
      'model/' + ((null == e ? void 0 : e.platform) || 'Unavailable'),
    build = (e) => {
      const n = null == e ? void 0 : e.build;
      return void 0 === n || '' === n ? 'build/0.0.0' : 'build/' + n;
    },
    Yt = { platform: '', userAgent: '' };
  class PlayActivityBase {
    constructor(e, n, d, h) {
      var p, y, m, g;
      (this._accessToken = e),
        (this._musicUserToken = n),
        (this._storefrontId = d),
        (this.privateEnabled = !1),
        (this.siriInitiated = !1),
        (this.clientId = 'JSCLIENT'),
        (this.eventType = 'JSPLAY'),
        (this.internalBuild = !1),
        (this.preferDSID = !1),
        (this.sourceType = Kt.MUSICKIT),
        (this._utcOffset = new Date().getTimezoneOffset()),
        (this._userIsSubscribed = !0),
        (this._allowReportingId = !1),
        h &&
          ((this._appInfo = h.app),
          (this._navigator = h.navigator),
          (this._userAgent = h.userAgent),
          hasOwn(h, 'utcOffset') && isNaN(h.utcOffset)
            ? (this._utcOffsetInSeconds = -1)
            : hasOwn(h, 'utcOffset') && (this._utcOffset = h.utcOffset),
          (this.clientId = h.clientId || 'JSCLIENT'),
          (this._deviceName = h.deviceName),
          (this.guid = h.guid),
          (this.metricsClientId = h.metricsClientId),
          (this.preferDSID = null !== (p = h.preferDSID) && void 0 !== p && p),
          (this.sourceType =
            void 0 !== h.sourceType && 'number' == typeof h.sourceType
              ? h.sourceType
              : Kt.MUSICKIT),
          (this._userIsSubscribed =
            null === (y = h.userIsSubscribed) || void 0 === y || y),
          (this._allowReportingId =
            null !== (m = h.allowReportingId) && void 0 !== m && m)),
        (this.buildVersion = ((e, n, d, h) =>
          [fullAppId(e, n), os(h), model(d), build(n)].join(' '))(
          this._appId,
          this._appInfo,
          this.navigator,
          this.userAgent
        )),
        (this.sender = new PlayActivitySender({
          accessToken: this._accessToken,
          clientId: this.clientId,
          eventType: this.eventType,
          fetch: null == h ? void 0 : h.fetch,
          fetchOptions: null == h ? void 0 : h.fetchOptions,
          headersClass:
            null === (g = null == h ? void 0 : h.fetch) || void 0 === g
              ? void 0
              : g.Headers,
          isQA: null == h ? void 0 : h.isQA,
          logInfo: null == h ? void 0 : h.logInfo,
          musicUserToken: this._musicUserToken,
          preferDSID: this.preferDSID,
          sourceType: this.sourceType,
          traceTag: null == h ? void 0 : h.traceTag,
        }));
    }
    get accessToken() {
      return invoke(this._accessToken);
    }
    get appID() {
      return (
        void 0 === this._appId &&
          (this._appId = fullAppId(this._appId, this._appInfo)),
        this._appId
      );
    }
    get deviceName() {
      return this._deviceName;
    }
    get musicUserToken() {
      return invoke(this._musicUserToken);
    }
    get navigator() {
      var e;
      return null !== (e = this._navigator) && void 0 !== e
        ? e
        : 'undefined' == typeof navigator
        ? Yt
        : navigator;
    }
    get storefrontId() {
      return invoke(this._storefrontId);
    }
    get userAgent() {
      var e;
      return null !== (e = this._userAgent) && void 0 !== e
        ? e
        : this.navigator.userAgent;
    }
    get userIsSubscribed() {
      return invoke(this._userIsSubscribed);
    }
    get allowReportingId() {
      return invoke(this._allowReportingId);
    }
    get utcOffsetInSeconds() {
      if (
        void 0 === this._utcOffsetInSeconds &&
        void 0 !== this._utcOffset &&
        !isNaN(this._utcOffset)
      ) {
        const e = 60 * this._utcOffset;
        this._utcOffsetInSeconds = e <= 0 ? Math.abs(e) : -e;
      }
      return void 0 === this._utcOffsetInSeconds ||
        isNaN(this._utcOffsetInSeconds)
        ? -1
        : this._utcOffsetInSeconds;
    }
    send(e) {
      return __awaiter(this, void 0, void 0, function* () {
        return this.sender.send(e);
      });
    }
    buildDescriptorForPlayParams(e, n, d, h, p) {
      const y = 'stream' === e.format ? Ut.STREAM : Ut.ITUNES_STORE_CONTENT;
      return Object.assign(
        Object.assign(Object.assign({}, e), {
          container: d,
          duration: null != h ? h : 0,
          eventType: n,
          itemType: y,
        }),
        p
      );
    }
    buildForPlayParams(e, n, d, h = 0, p = {}, y = !1) {
      return this.build(this.buildDescriptorForPlayParams(e, n, d, h, p), y);
    }
  }
  class DeveloperToken {
    constructor(e) {
      if (
        ((this.token = e),
        !e ||
          !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e))
      )
        throw new Error('Invalid token.');
      const [n, d] = e.split('.'),
        { exp: h, iss: p } = this._decode(d);
      if (((this.expiration = 1e3 * h), this.isExpired))
        throw new Error('Initialized with an expired token.');
      this.teamId = p;
      const { kid: y } = this._decode(n);
      this.keyId = y;
    }
    get isExpired() {
      return this.expiration < Date.now();
    }
    _decode(e) {
      return JSON.parse(T(e));
    }
  }
  const DEFAULT_CACHE_KEY_FUNCTION = (e, n) => `${n}${e}`;
  class NetworkCache {
    constructor(e = {}) {
      (this.storage = e.storage || new GenericStorage()),
        (this.prefix = e.prefix || 'ï£¿'),
        (this.ttl = e.ttl || 3e5),
        (this.cacheKeyFunction =
          e.cacheKeyFunction || DEFAULT_CACHE_KEY_FUNCTION);
    }
    getItem(e) {
      const n = this.cacheKeyForPath(e),
        d = this.storage.getItem(n);
      if (null !== d) {
        const { x: e, d: h } = JSON.parse(d);
        if (e > Date.now()) return h;
        this.storage.removeItem(n);
      }
    }
    setItem(e, n, d = this.ttl) {
      const h = this.cacheKeyForPath(e);
      this.storage.setItem(h, JSON.stringify({ x: Date.now() + d, d: n }));
    }
    removeItem(e) {
      const n = this.cacheKeyForPath(e);
      this.storage.removeItem(n);
    }
    removeItemsMatching(e, n = !0) {
      const d = this.cacheKeyForPath(e);
      this.removeItemsMatchingCacheKey(d, n);
    }
    clear() {
      this.removeItemsMatchingCacheKey(this.prefix, !1);
    }
    removeItemsMatchingCacheKey(e, n) {
      const d = new RegExp(`^${e}${n ? '$' : ''}`);
      (this.storage instanceof GenericStorage
        ? this.storage.keys
        : Object.keys(this.storage)
      ).forEach((e) => {
        e && d.test(e) && this.storage.removeItem(e);
      });
    }
    cacheKeyForPath(e) {
      return this.cacheKeyFunction(e, this.prefix);
    }
  }
  var qt;
  !(function (e) {
    (e.JSON = 'application/json'),
      (e.FORM = 'application/x-www-form-urlencoded');
  })(qt || (qt = {}));
  const zt = Date.now(),
    Gt = isNodeEnvironment$1()
      ? () => {
          const [e, n] = process.hrtime();
          return Math.floor(1e3 * e + 1e-6 * n);
        }
      : () => {
          var e, n;
          return null !==
            (n =
              null ===
                (e =
                  null === performance || void 0 === performance
                    ? void 0
                    : performance.now) || void 0 === e
                ? void 0
                : e.call(performance)) && void 0 !== n
            ? n
            : Date.now() - zt;
        },
    formatByte = (e) => ('0' + (255 & e).toString(16)).slice(-2),
    Qt = new Map([
      ['play', xt.PLAY_START],
      ['playbackstarted', xt.PLAY_START],
      ['stop', xt.PLAY_END],
      ['playbackstopped', xt.PLAY_END],
    ]);
  function mapEventTypeString(e) {
    var n;
    return 'number' == typeof e
      ? e
      : null !== (n = Qt.get(e)) && void 0 !== n
      ? n
      : xt.PLAY_END;
  }
  const Jt = new Map([
    ['exit', e.PlayActivityEndReasonType.EXITED_APPLICATION],
    ['next', e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS],
    ['pause', e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED],
    ['playbackfinished', e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK],
    ['playbackstopped', e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED],
    ['previous', e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS],
    ['scrub_begin', e.PlayActivityEndReasonType.SCRUB_BEGIN],
    ['scrub_end', e.PlayActivityEndReasonType.SCRUB_END],
    ['stop', e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK],
  ]);
  function normalizePlayActivityDescriptor(e) {
    const n = deepClone(e),
      d = (function (e) {
        var n;
        const d =
          null !== (n = e.eventType) && void 0 !== n ? n : xt.PLAY_START;
        if ('number' == typeof d) return { eventType: d };
        return { eventTypeString: d, eventType: mapEventTypeString(d) };
      })(e);
    return (
      (n.eventType = d.eventType),
      (n.eventTypeString = d.eventTypeString),
      void 0 === n.endReasonType &&
        void 0 !== d.eventTypeString &&
        (n.endReasonType = (function (e) {
          if (void 0 !== e) return Jt.get(e);
        })(d.eventTypeString)),
      !1 !== n.reporting && (n.reporting = !0),
      n
    );
  }
  const createHelper = (e, n) => (d, h, p) => {
    const { helpers: y } = p.cache;
    return e in y || (y[e] = n(d, h, p)), y[e];
  };
  const returnAsField =
      (e, n) =>
      (...d) =>
        (function (e, n) {
          if (void 0 !== n) return { [e]: n };
        })(e, n(...d)),
    createFieldFn = (e, n) => (d, h, p) => {
      const { fields: y } = p.cache;
      var m;
      return (
        e in y ||
          (p.cache.fields = Object.assign(Object.assign({}, y), {
            [e]: ((m = n(d, h, p)), null == m ? void 0 : { [e]: m }),
          })),
        p.cache.fields[e]
      );
    },
    createClientFieldFn = (e, n) =>
      createFieldFn(e, (e, d, { client: h }) => h[n]),
    Xt = createFieldFn('event-type', (e, n, d) => {
      var h;
      return void 0 === e.eventType
        ? xt.PLAY_START
        : e.itemType === Ut.TIMED_METADATA_PING && void 0 !== e.timedMetadata
        ? xt.PLAY_END
        : null !== (h = e.eventType) && void 0 !== h
        ? h
        : xt.PLAY_START;
    }),
    Zt = createHelper('should-include-audio-quality', (e, n, d) => {
      var h, p;
      const y = e.userPreference;
      return (
        Xt(e, n, d)['event-type'] === xt.PLAY_END &&
        void 0 !==
          (null === (h = e.audioQuality) || void 0 === h
            ? void 0
            : h.provided) &&
        void 0 !==
          (null === (p = e.audioQuality) || void 0 === p
            ? void 0
            : p.targeted) &&
        void 0 !== (null == y ? void 0 : y.audioQuality) &&
        void 0 !== (null == y ? void 0 : y.playbackFormat)
      );
    }),
    ei = createFieldFn('audio-quality-provided', (e, n, d) => {
      var h, p, y;
      if (!Zt(e, n, d)) return;
      const m = e.audioQuality;
      if (void 0 === (null == m ? void 0 : m.provided)) return;
      const { provided: g } = m;
      return {
        'audio-sample-rate-in-hz':
          null !== (h = g.audioSampleRateHz) && void 0 !== h ? h : 0,
        'audio-bit-depth':
          null !== (p = g.audioBitDepth) && void 0 !== p ? p : 0,
        'bit-rate-in-bps': null !== (y = g.bitRateBps) && void 0 !== y ? y : 0,
        codec: g.codec,
        'audio-channel-type': g.audioChannelType,
        'playback-format': g.playbackFormat,
      };
    }),
    ti = createFieldFn('audio-quality-targeted', (e, n, d) => {
      var h, p, y;
      if (!Zt(e, n, d)) return;
      const m = e.audioQuality;
      if (void 0 === (null == m ? void 0 : m.targeted)) return;
      const { targeted: g } = m;
      return {
        'audio-sample-rate-in-hz':
          null !== (h = g.audioSampleRateHz) && void 0 !== h ? h : 0,
        'audio-bit-depth':
          null !== (p = g.audioBitDepth) && void 0 !== p ? p : 0,
        'bit-rate-in-bps': null !== (y = g.bitRateBps) && void 0 !== y ? y : 0,
        codec: g.codec,
        'audio-channel-type': g.audioChannelType,
        'playback-format': g.playbackFormat,
      };
    }),
    ii = createClientFieldFn('build-version', 'buildVersion'),
    ri = [
      'uploadedVideo',
      'uploadedAudio',
      'uploaded-videos',
      'uploaded-audios',
    ],
    si = createHelper(
      'is-auc',
      ({ kind: e }) => void 0 !== e && ri.includes(e)
    ),
    ni = createHelper(
      'should-send-timed-metadata',
      ({ endReasonType: n, eventType: d, itemType: h, timedMetadata: p }) =>
        void 0 !== p &&
        (h === Ut.TIMED_METADATA_PING ||
          d === xt.PLAY_START ||
          n === e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED)
    ),
    ai = createFieldFn('type', (e, n, d) => {
      var h;
      const { id: p, reporting: y } = e;
      if ('-1' === p || !y)
        switch (
          null === (h = Xt(e, n, d)) || void 0 === h ? void 0 : h['event-type']
        ) {
          case xt.PLAY_END:
            return Ut.AGGREGATE_NON_CATALOG_PLAY_TIME;
          case xt.PLAY_START:
            if ('-1' === p) return Ut.INVALID;
        }
      const { format: m, itemType: g } = e;
      return ni(e, n, d)
        ? g === Ut.TIMED_METADATA_PING
          ? g
          : Ut.STREAM
        : 'stream' === m
        ? Ut.STREAM
        : si(e, n, d)
        ? Ut.ARTIST_UPLOADED_CONTENT
        : null != g
        ? g
        : Ut.ITUNES_STORE_CONTENT;
    }),
    oi = createFieldFn('container-type', (e, n, d) => {
      var h, p;
      if (
        (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
        Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const { container: y } = e;
      if (void 0 === y) return Pt.UNKNOWN;
      const m = null !== (p = y.type) && void 0 !== p ? p : y.kind;
      if ('number' == typeof m) return m;
      switch (m) {
        case 'album':
        case 'albums':
        case 'library-albums':
          return Pt.ALBUM;
        case 'artist':
        case 'artists':
        case 'library-artists':
          return Pt.ARTIST;
        case 'playlist':
        case 'playlists':
        case 'library-playlists':
          return Pt.PLAYLIST;
        case 'radio':
        case 'radioStation':
        case 'station':
        case 'stations':
          return Pt.RADIO;
        default:
          return Pt.UNKNOWN;
      }
    }),
    di = [
      returnAsField('album-adam-id', (e, n, d) => {
        var h;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.ALBUM
        )
          return;
        const { container: p } = e,
          y = null == p ? void 0 : p.id;
        return void 0 === y || b(y) ? void 0 : y;
      }),
      returnAsField('cloud-album-id', (e, n, d) => {
        var h;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.ALBUM
        )
          return;
        const { container: p } = e,
          y = null == p ? void 0 : p.id;
        return void 0 !== y && b(y) ? y : void 0;
      }),
      returnAsField('global-playlist-id', (e, n, d) => {
        var h, p;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.PLAYLIST
        )
          return;
        const { container: y } = e,
          m =
            null !== (p = null == y ? void 0 : y.catalogId) && void 0 !== p
              ? p
              : null == y
              ? void 0
              : y.globalId;
        return (null == y ? void 0 : y.isLibrary) && m
          ? m
          : b(null == y ? void 0 : y.id) || null == y
          ? void 0
          : y.id;
      }),
      returnAsField('playlist-version-hash', (e, n, d) => {
        var h;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.PLAYLIST
        )
          return;
        const { container: p } = e,
          y = null == p ? void 0 : p.versionHash;
        return void 0 !== y && '' !== y ? y : void 0;
      }),
      returnAsField('station-hash', (e, n, d) => {
        var h, p;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.RADIO
        )
          return;
        const y =
          null === (p = e.container) || void 0 === p ? void 0 : p.stationHash;
        return void 0 !== y && '' !== y ? y : void 0;
      }),
      returnAsField('station-id', (e, n, d) => {
        var h, p;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) === Pt.RADIO
        )
          return null === (p = e.container) || void 0 === p ? void 0 : p.id;
      }),
      returnAsField('station-personalized-id', (e, n, d) => {
        var h, p;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.RADIO
        )
          return;
        const y = null === (p = e.container) || void 0 === p ? void 0 : p.id;
        return void 0 !== y && Wt.test(y)
          ? parseInt(y.replace(Wt, '$1'), 10)
          : void 0;
      }),
      returnAsField('universal-library-id', (e, n, d) => {
        var h, p;
        if (
          (null === (h = oi(e, n, d)) || void 0 === h
            ? void 0
            : h['container-type']) !== Pt.PLAYLIST
        )
          return;
        const { container: y } = e,
          m =
            null !== (p = null == y ? void 0 : y.catalogId) && void 0 !== p
              ? p
              : null == y
              ? void 0
              : y.globalId,
          g = null == y ? void 0 : y.id;
        if (void 0 !== g)
          if ((null == y ? void 0 : y.isLibrary) && m) {
            if ('' !== g) return g;
          } else if (b(g)) return g;
      }),
    ],
    li = createFieldFn('container-ids', (e, n, d) => {
      var h;
      if (
        (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
        Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const p = di.reduce(
        (h, p) => Object.assign(Object.assign({}, h), p(e, n, d)),
        Object.create(null)
      );
      return isEmpty(p) ? void 0 : p;
    }),
    ci = createClientFieldFn('developer-token', 'accessToken'),
    ui = createClientFieldFn('device-name', 'deviceName'),
    hi = createHelper(
      'initial-start-position-in-milliseconds',
      ({ position: e = 0, startPositionInMilliseconds: n }) =>
        n || Math.round(1e3 * e)
    ),
    pi = createFieldFn('end-position-in-milliseconds', (e, n, d) => {
      var h;
      switch (
        null === (h = Xt(e, n, d)) || void 0 === h ? void 0 : h['event-type']
      ) {
        case xt.LYRIC_DISPLAY:
          return e.duration;
        case xt.PLAY_START:
          return;
        default:
          if (n && void 0 === n.position) return;
          return e.endPositionInMilliseconds || hi(e, n, d);
      }
    }),
    yi = createHelper(
      'is-private',
      ({ id: e, reporting: n }) => '-1' === e || !n
    ),
    mi = createFieldFn('end-reason-type', (n, d, h) => {
      var p;
      if (!d || void 0 !== (null == d ? void 0 : d.position))
        return ((null === (p = ai(n, d, h)) || void 0 === p
          ? void 0
          : p.type) === Ut.TIMED_METADATA_PING &&
          void 0 !== n.timedMetadata) ||
          (yi(n, d, h) && n.eventType === xt.PLAY_END)
          ? e.PlayActivityEndReasonType.NOT_APPLICABLE
          : n.endReasonType;
    }),
    { CONTAINER_CHANGED: gi, NOT_SPECIFIED: fi } = Nt,
    vi = createFieldFn('event-reason-hint-type', (e, n, d) => {
      var h, p;
      if (
        (null === (h = Xt(e, n, d)) || void 0 === h
          ? void 0
          : h['event-type']) !== xt.PLAY_START
      )
        return;
      const y = e.container;
      return void 0 === y
        ? fi
        : !1 === n
        ? d.isAlexa
          ? fi
          : gi
        : (null === (p = null == n ? void 0 : n.container) || void 0 === p
            ? void 0
            : p.id) !== y.id
        ? gi
        : fi;
    }),
    _i = createFieldFn('feature-name', (e, n, d) => {
      var h, p, y, m;
      if (
        (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
        Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      if (
        (null === (p = Xt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) === xt.LYRIC_DISPLAY
      )
        return 'now_playing';
      const g =
        null !==
          (m = null === (y = e.container) || void 0 === y ? void 0 : y.name) &&
        void 0 !== m
          ? m
          : kt.MUSICKIT;
      return 'string' == typeof g ? g : '' + g;
    }),
    bi = createClientFieldFn('guid', 'guid'),
    Ti = createHelper('should-have-auc-adam-id', si),
    Ei = createHelper(
      'should-have-radio-adam-id',
      ({ id: e, container: n }) =>
        Ht.test(e) || 'radioStation' === (null == n ? void 0 : n.kind)
    ),
    Si = createHelper(
      'is-library-item-or-library-type',
      ({ id: e, isLibrary: n }, d, h) => n || b(e)
    ),
    ki = createHelper('catalog-id', ({ catalogId: e, container: n }) =>
      null != e ? e : null == n ? void 0 : n.catalogId
    ),
    Pi = createHelper(
      'is-library-item-with-catalog-id',
      (e, n, d) => e.isLibrary && !!ki(e, n, d)
    ),
    Ii = [
      returnAsField('auc-adam-id', (e, n, d) => {
        var h;
        if (
          (null === (h = Xt(e, n, d)) || void 0 === h
            ? void 0
            : h['event-type']) !== xt.LYRIC_DISPLAY &&
          !yi(e, n, d) &&
          !Ei(e, n, d)
        )
          return Ti(e, n, d) ? e.id : void 0;
      }),
      returnAsField('cloud-id', (e, n, d) => {
        var h, p;
        if (
          (null === (h = Xt(e, n, d)) || void 0 === h
            ? void 0
            : h['event-type']) === xt.LYRIC_DISPLAY
        )
          return e.cloudId;
        const { id: y } = e,
          m = void 0 !== y && '' !== y;
        return yi(e, n, d) &&
          (null === (p = Xt(e, n, d)) || void 0 === p
            ? void 0
            : p['event-type']) === xt.PLAY_START &&
          m &&
          '-1' !== y
          ? y
          : Ei(e, n, d) || Ti(e, n, d)
          ? e.cloudId
          : (Pi(e, n, d) && m) || Si(e, n, d)
          ? y
          : e.cloudId;
      }),
      returnAsField('lyric-id', (e, n, d) => {
        var h, p;
        if (
          (null === (h = Xt(e, n, d)) || void 0 === h
            ? void 0
            : h['event-type']) === xt.LYRIC_DISPLAY
        )
          return null === (p = e.lyricDescriptor) || void 0 === p
            ? void 0
            : p.id;
      }),
      returnAsField('purchased-adam-id', (e, n, d) => {
        var h;
        if (
          (null === (h = Xt(e, n, d)) || void 0 === h
            ? void 0
            : h['event-type']) !== xt.LYRIC_DISPLAY
        )
          return e.purchasedId;
      }),
      returnAsField('reporting-adam-id', (e, n, d) => {
        var h;
        if (!0 !== d.client.allowReportingId) return;
        return (null !== (h = Xt(e, n, d)) && void 0 !== h ? h : {})[
          'event-type'
        ] !== xt.LYRIC_DISPLAY && Si(e, n, d)
          ? e.reportingId
          : void 0;
      }),
      returnAsField('radio-adam-id', (e, n, d) => {
        var h;
        if (
          (null === (h = Xt(e, n, d)) || void 0 === h
            ? void 0
            : h['event-type']) === xt.LYRIC_DISPLAY ||
          yi(e, n, d)
        )
          return;
        const { container: p, id: y } = e;
        return Ht.test(y) || 'radioStation' === (null == p ? void 0 : p.kind)
          ? parseInt(('' + y).replace(Ht, '$1'), 10)
          : void 0;
      }),
      returnAsField('subscription-adam-id', (e, n, d) => {
        var h;
        if (
          !(
            (null === (h = Xt(e, n, d)) || void 0 === h
              ? void 0
              : h['event-type']) === xt.LYRIC_DISPLAY ||
            yi(e, n, d) ||
            Ei(e, n, d) ||
            Ti(e, n, d)
          )
        ) {
          if (Pi(e, n, d)) return ki(e, n, d);
          if (!Si(e, n, d)) return e.id;
        }
      }),
    ],
    Ai = createFieldFn('ids', (e, n, d) => {
      var h;
      if (
        (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
        Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const p = Ii.reduce(
        (h, p) => Object.assign(Object.assign({}, h), p(e, n, d)),
        Object.create(null)
      );
      return isEmpty(p) ? void 0 : p;
    }),
    wi = createClientFieldFn('internal-build', 'internalBuild'),
    Ri = createHelper(
      'has-episode-streaming-kind',
      ({ streamingKind: e }, n, d) => e === jt.EPISODE
    ),
    Oi = createHelper('is-stream', (e, n, d) => {
      var h;
      return (
        (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
        Ut.STREAM
      );
    }),
    Ci = createHelper(
      'is-live-stream',
      (e, n, d) => Oi(e, n, d) && !Ri(e, n, d)
    ),
    Mi = createFieldFn('media-duration-in-milliseconds', (e, n, d) => {
      var h, p, y;
      const m =
        null === (h = Xt(e, n, d)) || void 0 === h ? void 0 : h['event-type'];
      if (m === xt.LYRIC_DISPLAY) return 0;
      if (Ci(e, n, d)) return 0;
      const g = Math.round(1e3 * e.duration);
      if (m === xt.PLAY_START) return g;
      const _ =
        null !== (p = e.startPositionInMilliseconds) && void 0 !== p
          ? p
          : Math.round(
              1e3 * (null !== (y = e.position) && void 0 !== y ? y : 0)
            );
      return _ > 1e3 * e.duration ? _ : g;
    }),
    { AUDIO: Di, VIDEO: Li } = Bt,
    Ni = createFieldFn('media-type', (e, n, d) => {
      var h;
      if (
        (null === (h = Xt(e, n, d)) || void 0 === h
          ? void 0
          : h['event-type']) === xt.LYRIC_DISPLAY
      )
        return Di;
      const { kind: p, mediaType: y } = e;
      if ('number' == typeof y) return y;
      const m = 'string' == typeof y ? y : p;
      return m && /video/i.test(m) ? Li : Di;
    }),
    xi = createClientFieldFn('metrics-client-id', 'metricsClientId'),
    Ui = createFieldFn('offline', () => !1),
    Bi = createFieldFn('persistent-id', () => generateUUID()),
    Fi = createFieldFn('play-mode', (e, n, d) => {
      var h, p, y, m, g, _, b, T;
      if (
        (null === (h = Xt(e, n, d)) || void 0 === h
          ? void 0
          : h['event-type']) === xt.LYRIC_DISPLAY ||
        (null === (p = ai(e, n, d)) || void 0 === p ? void 0 : p.type) ===
          Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return {
          'auto-play-mode':
            null !== (y = Fi.autoplayMode) && void 0 !== y ? y : 0,
          'repeat-play-mode':
            null !== (m = Fi.repeatPlayMode) && void 0 !== m ? m : 0,
          'shuffle-play-mode':
            null !== (g = Fi.shufflePlayMode) && void 0 !== g ? g : 0,
        };
      const E = invoke(e.playMode);
      return void 0 !== E
        ? {
            'auto-play-mode':
              null !== (_ = E.autoplayMode) && void 0 !== _ ? _ : 0,
            'repeat-play-mode':
              null !== (b = E.repeatPlayMode) && void 0 !== b ? b : 0,
            'shuffle-play-mode':
              null !== (T = E.shufflePlayMode) && void 0 !== T ? T : 0,
          }
        : void 0;
    }),
    Ki = createClientFieldFn('private-enabled', 'privateEnabled'),
    ji = createFieldFn('reco-data', (e, n, d) => {
      var h, p;
      if (
        (null === (h = Xt(e, n, d)) || void 0 === h
          ? void 0
          : h['event-type']) !== xt.LYRIC_DISPLAY &&
        (null === (p = ai(e, n, d)) || void 0 === p ? void 0 : p.type) !==
          Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return e.recoData;
    }),
    $i = createClientFieldFn('sb-enabled', 'userIsSubscribed'),
    Vi = createClientFieldFn('siri-initiated', 'siriInitiated'),
    Hi = createClientFieldFn('source-type', 'sourceType'),
    Wi = createFieldFn('start-position-in-milliseconds', (e, n, d) => {
      var h, p, y, m;
      const g =
        null === (h = Xt(e, n, d)) || void 0 === h ? void 0 : h['event-type'];
      return g === xt.LYRIC_DISPLAY ||
        (null === (p = ai(e, n, d)) || void 0 === p ? void 0 : p.type) ===
          Ut.AGGREGATE_NON_CATALOG_PLAY_TIME ||
        Ci(e, n, d)
        ? 0
        : g === xt.PLAY_START
        ? hi(e, n, d)
        : null !==
            (m =
              null !== (y = e.startPositionInMilliseconds) && void 0 !== y
                ? y
                : previousPosition(n)) && void 0 !== m
        ? m
        : 0;
    }),
    previousPosition = (e) =>
      e && void 0 !== e.position ? Math.round(1e3 * e.position) : 0,
    Yi = createClientFieldFn('store-front', 'storefrontId'),
    qi = createFieldFn('timed-metadata', (e, n, d) => {
      const h = e.timedMetadata;
      if (void 0 !== h && shouldSendTimedMetadata(e, n, d))
        return ((e, n = 8) => {
          if (!(e instanceof Uint8Array)) return '';
          const d = Array.prototype.map.call(e, formatByte).join('');
          return 0 === n
            ? d
            : d.replace(new RegExp(`(.{1,${n}})`, 'g'), '$1 ').trim();
        })(h, 0);
    }),
    shouldSendTimedMetadata = (e, n, d) => {
      var h, p;
      return (
        (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
          Ut.TIMED_METADATA_PING ||
        (null === (p = Xt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) !== xt.LYRIC_DISPLAY
      );
    },
    zi = createFieldFn('timestamp', ({ timestamp: e }, n, d) =>
      null != e ? e : Date.now()
    ),
    Gi = createClientFieldFn('user-agent', 'userAgent'),
    Qi = createFieldFn('user-preference-audio-quality', (e, n, d) => {
      var h;
      if (Zt(e, n, d))
        return null === (h = e.userPreference) || void 0 === h
          ? void 0
          : h.audioQuality;
    }),
    Ji = createFieldFn('user-preference-playback-format', (e, n, d) => {
      var h;
      if (Zt(e, n, d))
        return null === (h = e.userPreference) || void 0 === h
          ? void 0
          : h.playbackFormat;
    }),
    Xi = createFieldFn('user-token', (e, n, { client: d }) => {
      if (!d.preferDSID) return d.musicUserToken;
    }),
    Zi = createFieldFn('utc-offset-in-seconds', (e, n, d) => {
      var h;
      return (null === (h = ai(e, n, d)) || void 0 === h ? void 0 : h.type) ===
        Ut.AGGREGATE_NON_CATALOG_PLAY_TIME
        ? 0
        : d.client.utcOffsetInSeconds;
    }),
    er = {
      'audio-quality-provided': ei,
      'audio-quality-targeted': ti,
      'build-version': ii,
      'container-ids': li,
      'container-type': oi,
      'developer-token': ci,
      'device-name': ui,
      'end-position-in-milliseconds': pi,
      'end-reason-type': mi,
      'event-reason-hint-type': vi,
      'event-type': Xt,
      'feature-name': _i,
      guid: bi,
      ids: Ai,
      'internal-build': wi,
      'media-duration-in-milliseconds': Mi,
      'media-type': Ni,
      'metrics-client-id': xi,
      offline: Ui,
      'persistent-id': Bi,
      'play-mode': Fi,
      'private-enabled': Ki,
      'reco-data': ji,
      'sb-enabled': $i,
      'siri-initiated': Vi,
      'source-type': Hi,
      'start-position-in-milliseconds': Wi,
      'store-front': Yi,
      'timed-metadata': qi,
      timestamp: zi,
      type: ai,
      'user-agent': Gi,
      'user-preference-audio-quality': Qi,
      'user-preference-playback-format': Ji,
      'user-token': Xi,
      'utc-offset-in-seconds': Zi,
    };
  let tr = 0;
  const buildPlayActivityData$1 = (e, n, d, h = !1) => {
    const p = ((e, ...n) =>
      Object.assign(
        Object.assign(Object.assign({}, e), Object.assign({}, ...n)),
        {
          cache: {
            fields: Object.assign(
              {},
              ...n.map((e) => {
                var n;
                return null === (n = null == e ? void 0 : e.cache) ||
                  void 0 === n
                  ? void 0
                  : n.fields;
              })
            ),
            helpers: Object.assign(
              {},
              ...n.map((e) => {
                var n;
                return null === (n = null == e ? void 0 : e.cache) ||
                  void 0 === n
                  ? void 0
                  : n.helpers;
              })
            ),
          },
        }
      ))(
      'boolean' == typeof h
        ? ((e = {}, n) =>
            Object.assign(
              { id: (tr++).toFixed(0), client: n, isAlexa: !1 },
              e
            ))({ isAlexa: h }, e)
        : Object.assign(Object.assign({}, h), { client: e })
    );
    return (
      (n = normalizePlayActivityDescriptor(n)),
      d && (d = normalizePlayActivityDescriptor(d)),
      Object.assign(
        Object.create(null),
        ...Object.values(er).map((e) => (null == e ? void 0 : e(n, d, p)))
      )
    );
  };
  const buildPlayActivityData = (e, n, d) => {
    if (void 0 === n)
      throw new Error('called without a play activity descriptor');
    return ((e, ...n) => n.reduce((e, n) => n(e), e))(
      Object.assign(Object.assign({}, buildPlayActivityData$1(e, n, d, !1)), {
        'event-type': xt.LYRIC_DISPLAY,
        'feature-name': 'now_playing',
        'media-duration-in-milliseconds': 0,
        'media-type': Bt.AUDIO,
        'start-position-in-milliseconds': 0,
        'play-mode': {
          'auto-play-mode': 0,
          'repeat-play-mode': 0,
          'shuffle-play-mode': 0,
        },
      }),
      (e) =>
        exceptFields(
          e,
          'character-display-count',
          'event-reason-hint-type',
          'reco-data'
        ),
      (function ({ lyricDescriptor: e }) {
        return function (n) {
          return void 0 === e
            ? n
            : Object.assign(
                Object.assign(
                  Object.assign(Object.assign({}, n), {
                    'display-type': e.displayType,
                    'end-position-in-milliseconds': e.duration,
                  }),
                  ((e, n) =>
                    ((e, n, d) => (e ? { [n]: d } : {}))(void 0 !== n, e, n))(
                    'lyric-language',
                    e.language
                  )
                ),
                {
                  ids: Object.assign(Object.assign({}, n.ids), {
                    'lyric-id': e.id,
                  }),
                }
              );
        };
      })(n)
    );
  };
  class LyricsPlayActivity extends PlayActivityBase {
    constructor(e, n, d, h) {
      super(e, n, d, h),
        (this._machine = v(
          s({
            id: 'lpaf',
            initial: 'idle',
            context: { initialShowTime: -1, duration: -1 },
            states: {
              idle: {
                entry: o((e) =>
                  Object.assign(Object.assign({}, e), {
                    initialShowTime: void 0,
                    duration: Gt() - e.initialShowTime,
                  })
                ),
                on: { play: 'playing' },
              },
              playing: {
                entry: o((e) =>
                  Object.assign(Object.assign({}, e), { initialShowTime: Gt() })
                ),
                on: { stop: 'idle' },
              },
            },
          })
        ).start());
    }
    exit() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    play(e) {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.stateMatches('playing'))
          throw Error(
            'lyrics are already being displayed. Did you forget to stop them?'
          );
        (this._previousDescriptor = e), this._machine.send({ type: 'play' });
      });
    }
    stop() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.stateMatches('idle'))
          throw Error(
            'lyrics are not being displayed. Did you forget to display them?'
          );
        if (void 0 === this._previousDescriptor)
          throw Error(
            'something went wrong: client can send a stop but there is no previous descriptor'
          );
        this._machine.send({ type: 'stop' });
        const e = JSON.parse(JSON.stringify(this._previousDescriptor));
        e.lyricDescriptor = Object.assign(
          Object.assign({}, e.lyricDescriptor),
          { duration: this._machine.state.context.duration }
        );
        const n = this.build(e, this._previousDescriptor);
        try {
          yield this.send(n);
        } finally {
          this._previousDescriptor = e;
        }
      });
    }
    stateMatches(e) {
      return this._machine.state.matches(e);
    }
    build(e, n) {
      return buildPlayActivityData(this, e, n);
    }
  }
  var ir;
  !(function (e) {
    e[(e.ALEXA = 13)] = 'ALEXA';
  })(ir || (ir = {}));
  const createCookieJar = (e) => {
      switch ((void 0 === e && (e = 'browser'), e)) {
        case 'browser':
          return { get: getCookie, set: setCookie };
        case 'memory':
          return ((e = {}) => ({
            get(n) {
              if (void 0 !== n) return e[n];
            },
            set(n, d) {
              e[n] = d;
            },
          }))();
        default:
          return e;
      }
    },
    empty = (e, n) => write(e, n, [], '/', 0),
    read = (e, n) => {
      const d = e.get(n);
      if (void 0 === d || '' === d) return [];
      return ensureArray(JSON.parse(atob(d)));
    },
    write = (e, n, d, h, p, y) => e.set(n, btoa(JSON.stringify(d)), h, p, y),
    { AUTO: rr } = Ft;
  class PlayActivityBatchableSender {
    constructor(e, n) {
      (this.sender = e), (this.jar = n), (this.mode = rr);
    }
    flush() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = read(this.jar, 'amupaee');
        if (void 0 !== e && 0 !== e.length)
          try {
            yield this.sender.send(e), empty(this.jar, 'amupaee');
          } catch ({ message: n }) {
            throw new Error('flush: ' + n);
          }
      });
    }
    send(n) {
      return __awaiter(this, void 0, void 0, function* () {
        if (
          this.mode === rr &&
          (Array.isArray(n) ||
            n['end-reason-type'] !==
              e.PlayActivityEndReasonType.EXITED_APPLICATION)
        )
          return this.sender.send(n);
        var d, h, p, y, m, g;
        (d = this.jar),
          (p = n),
          (y = '/'),
          write(d, (h = 'amupaee'), [...read(d, h), p], y, m, g);
      });
    }
  }
  class Timeline {
    constructor() {
      (this._events = {}), (this._keys = []);
    }
    get events() {
      return this._events;
    }
    get first() {
      return this.at(0);
    }
    get keys() {
      return this._keys;
    }
    get last() {
      return this.at(this.length - 1);
    }
    get length() {
      return this._keys.length;
    }
    get second() {
      return this.at(1);
    }
    at(e) {
      if (e > this.length - 1) throw new Error('Invalid timeline index');
      const n = this._keys[e];
      return this._events[n];
    }
    before(e) {
      if ('number' != typeof e) {
        const n = [];
        for (const e in this._events)
          hasOwn(this._events, e) && n.push(this._events[e]);
        e = this._keys[n.indexOf(e)];
      }
      const n = this._keys.indexOf(e);
      if (-1 === n) throw new Error('Key not found');
      if (n > 0) return this._events[this._keys[n - 1]];
    }
    drain() {
      const e = this._keys.map((e) => this._events[e]);
      return this.reset(), e;
    }
    reset() {
      (this._events = {}), (this._keys = []);
    }
    pop() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = this._keys.pop();
        if (void 0 === e) return Promise.reject('TIMELINE IS EMPTY');
        const n = this._events[e];
        return delete this._events[e], Promise.resolve(n);
      });
    }
    add(e, n) {
      return __awaiter(this, void 0, void 0, function* () {
        return this.push(e, n);
      });
    }
    push(e, n = Date.now()) {
      return __awaiter(this, void 0, void 0, function* () {
        for (; -1 !== this._keys.indexOf(n); ) n++;
        return (this._events[n] = e), this._keys.push(n), Promise.resolve(n);
      });
    }
    shift() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = this._keys.shift();
        if (void 0 === e) return Promise.reject('TIMELINE IS EMPTY');
        const n = this._events[e];
        return delete this._events[e], Promise.resolve(n);
      });
    }
    unshift(e, n = Date.now()) {
      return __awaiter(this, void 0, void 0, function* () {
        for (; -1 !== this._keys.indexOf(n); ) n++;
        return (this._events[n] = e), this._keys.unshift(n), Promise.resolve(n);
      });
    }
  }
  const sr = new Logger();
  class TimedMetadataTracker {
    constructor(e, n) {
      (this.client = e), (this._currentValue = n);
    }
    get currentValue() {
      return this._currentValue;
    }
    clear() {
      this._currentValue = void 0;
    }
    ping(e, n) {
      return __awaiter(this, void 0, void 0, function* () {
        this.timedMetadataChanged(e) &&
          (void 0 !== this._currentValue &&
            (yield this.client.pingTimedMetadata(n, this._currentValue)),
          (this._currentValue = void 0 === e ? void 0 : e.slice(0)));
      });
    }
    timedMetadataChanged(e) {
      const { _currentValue: n } = this;
      return void 0 === n
        ? void 0 !== e
        : void 0 === e || e.length !== n.length || n.some((n, d) => n !== e[d]);
    }
  }
  const transitionEvent = (e) => ({ type: e });
  function deriveTransitionEvent(n) {
    if (n.itemType === Ut.TIMED_METADATA_PING) return !1;
    if (
      (function (e) {
        return e.eventType === xt.PLAY_START;
      })(n)
    )
      return transitionEvent('play');
    if (
      (function (e) {
        if (e.eventType !== xt.PLAY_END) return !1;
        if (void 0 === e.endReasonType)
          throw new Error(
            'PLAY_END activity descriptor requires an endReasonType value'
          );
        return !0;
      })(n)
    ) {
      const d = n.endReasonType;
      if (d === e.PlayActivityEndReasonType.SCRUB_BEGIN)
        return transitionEvent('scrubBegin');
      if (d === e.PlayActivityEndReasonType.SCRUB_END)
        return transitionEvent('scrubEnd');
      if (d === e.PlayActivityEndReasonType.EXITED_APPLICATION) return !1;
    }
    return transitionEvent('stop');
  }
  class MPAFStateMachine {
    constructor() {
      (this.machine = s(
        {
          id: 'mpaf',
          initial: 'idle',
          context: {},
          states: {
            error: {},
            idle: {
              on: {
                play: 'playing',
                stop: 'idle',
                scrubBegin: {
                  target: 'scrubbing',
                  actions: o((e) =>
                    Object.assign(Object.assign({}, e), {
                      stateBeforeScrub: 'idle',
                    })
                  ),
                },
                scrubEnd: {
                  target: 'error',
                  actions: ['clearStateBeforeScrub', 'setScrubEndError'],
                },
              },
            },
            playing: {
              on: {
                scrubBegin: {
                  target: 'scrubbing',
                  actions: o((e) =>
                    Object.assign(Object.assign({}, e), {
                      stateBeforeScrub: 'playing',
                    })
                  ),
                },
                stop: 'idle',
                scrubEnd: {
                  target: 'error',
                  actions: ['clearStateBeforeScrub', 'setScrubEndError'],
                },
              },
            },
            scrubbing: {
              on: {
                scrubEnd: [
                  {
                    target: 'idle',
                    cond: ({ stateBeforeScrub: e }) => 'idle' === e,
                    actions: ['clearStateBeforeScrub'],
                  },
                  { target: 'playing', actions: ['clearStateBeforeScrub'] },
                ],
              },
            },
          },
        },
        {
          actions: {
            clearStateBeforeScrub: o((e) => __rest(e, ['stateBeforeScrub'])),
            setScrubEndError: o((e) =>
              Object.assign(Object.assign({}, e), {
                errorMessage:
                  'The scrub() method was called with the SCRUB_END action without a previous SCRUB_START descriptor',
              })
            ),
          },
        }
      )),
        (this.machineService = v(this.machine).start());
    }
    get currentState() {
      return this.machineService.state;
    }
    get currentStateName() {
      return this.currentState.value;
    }
    matches(e) {
      return this.machineService.state.matches(e);
    }
    transition(e, n) {
      const d = deriveTransitionEvent(e);
      if (!1 === d) return this.currentStateName;
      if ((this.machineService.send(d), this.matches('error')))
        throw new Error(this.machineService.state.context.errorMessage);
      return this.currentStateName;
    }
  }
  class StatelessPlayActivity extends PlayActivityBase {
    constructor(e, n, d, h) {
      super(e, n, d, h);
    }
    build(e, n) {
      return buildPlayActivityData$1(this, e, n, 'JSCLIENT' !== this.clientId);
    }
  }
  class PlayActivity {
    constructor(e, n, d, h) {
      (this.timeline = new Timeline()),
        (this._paf = new StatelessPlayActivity(e, n, d, h)),
        (this._cookieJar = createCookieJar(null == h ? void 0 : h.cookieJar)),
        (this.sender = new PlayActivityBatchableSender(
          this._paf.sender,
          this._cookieJar
        )),
        (this._machine = new MPAFStateMachine()),
        (this._timedMetadataTracker = new TimedMetadataTracker(this));
    }
    get mode() {
      return this.sender.mode;
    }
    set mode(e) {
      this.sender.mode = e;
    }
    get privateEnabled() {
      return this._paf.privateEnabled;
    }
    set privateEnabled(e) {
      this._paf.privateEnabled = e;
    }
    get timedMetadata() {
      return this._timedMetadataTracker.currentValue;
    }
    clearTimedMetadata() {
      return this._timedMetadataTracker.clear();
    }
    setTimedMetadata(e, n) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._timedMetadataTracker.ping(e, n);
      });
    }
    activate(n = !1) {
      return __awaiter(this, void 0, void 0, function* () {
        if (n)
          try {
            yield this.flush();
          } catch (h) {
            if (
              !((e) =>
                ((e) => {
                  switch (typeof e) {
                    case 'string':
                      return e;
                    case 'object':
                      return e.message
                        ? 'string' != typeof e.message
                          ? ''
                          : e.message
                        : '';
                    default:
                      return '';
                  }
                })(e).includes('send() called without any data'))(h)
            )
              throw h;
          }
        const d = this.timeline.last;
        if (
          d &&
          d.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION
        )
          return this.timeline.pop();
      });
    }
    exit(n = 0) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.stop(n, e.PlayActivityEndReasonType.EXITED_APPLICATION);
      });
    }
    pause(n = 0) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.stop(
          n,
          e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED
        );
      });
    }
    pingTimedMetadata(n, d, h = this.previousDescriptor) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._addToTimeline(
          Object.assign(Object.assign({}, h), {
            position: n,
            endReasonType: e.PlayActivityEndReasonType.NOT_APPLICABLE,
            eventType: xt.PLAY_END,
            itemType: Ut.TIMED_METADATA_PING,
            timedMetadata: d,
          })
        );
      });
    }
    play(e, n = 0) {
      return __awaiter(this, void 0, void 0, function* () {
        const d = this.timeline.length > 0;
        if (void 0 === e) {
          if (!d) return;
          const e = this.previousDescriptor;
          return (
            e.eventType === xt.PLAY_END && delete e.endReasonType,
            void (yield this._addToTimeline(
              Object.assign(
                Object.assign({}, this.sanitizePreviousDescriptor(e)),
                { eventType: xt.PLAY_START }
              )
            ))
          );
        }
        if (d) {
          const e = this.previousDescriptor;
          if (
            this._machine.matches('playing') &&
            !(({ id: e, reporting: n = !0, eventType: d }) =>
              ('-1' === e || !n) && d === xt.PLAY_END)(e)
          )
            return Promise.reject(
              new Error(
                'The play() method was called without a previous stop() or pause() call.'
              )
            );
        }
        yield this._addToTimeline(
          Object.assign(Object.assign({}, e), {
            eventType: xt.PLAY_START,
            position: n,
          })
        );
      });
    }
    scrub(n = 0, d = e.PlayActivityEndReasonType.SCRUB_BEGIN) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._addToTimeline(
          Object.assign(
            Object.assign(
              {},
              this.sanitizePreviousDescriptor(this.previousDescriptor)
            ),
            { eventType: xt.PLAY_END, endReasonType: d, position: n }
          )
        );
      });
    }
    skip(n, d = e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS, h = 0) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.stop(h, d), yield this.play(n);
      });
    }
    stop(n = 0, d = e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK) {
      return __awaiter(this, void 0, void 0, function* () {
        let h = this.previousDescriptor;
        if (
          (h.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION &&
            (yield this.timeline.pop(),
            empty(this._cookieJar, 'amupaee'),
            (h = this.previousDescriptor)),
          this._machine.matches('playing'))
        ) {
          const e = Object.assign(
            Object.assign({}, this.sanitizePreviousDescriptor(h)),
            {
              eventType: xt.PLAY_END,
              endReasonType: d,
              position: n,
              timedMetadata: this._timedMetadataTracker.currentValue,
            }
          );
          yield this._addToTimeline(e);
        }
      });
    }
    build(e, n) {
      if (
        (void 0 === e &&
          void 0 === n &&
          sr.warn(
            'You are calling build() from a stateful PAF client. Please, use a stateless client or exit(), pause(), play(), scrub(), skip() or stop() instead.'
          ),
        void 0 === e)
      ) {
        if (0 === this.timeline.length)
          throw new Error('build() called without a play activity descriptor');
        e = this.timeline.last;
      }
      if (void 0 === n) {
        if (
          void 0 === (n = this.timeline.before(e)) &&
          e.eventType === xt.PLAY_END
        )
          throw new Error(
            'Cannot build() for PLAY_END descriptors without previous descriptors'
          );
        n = null != n && n;
      }
      return this._paf.build(
        Object.assign(Object.assign({}, e), {
          timedMetadata: this.timedMetadata,
        }),
        n
      );
    }
    addForPlayParams(e, n, d, h = 0, p = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._addToTimeline(
          this.buildDescriptorForPlayParams(e, n, d, h, p)
        );
      });
    }
    buildDescriptorForPlayParams(e, n, d, h = 0, p = {}) {
      const y = 'stream' === e.format ? Ut.STREAM : Ut.ITUNES_STORE_CONTENT;
      return normalizePlayActivityDescriptor(
        Object.assign(
          Object.assign(Object.assign({}, e), {
            container: d,
            duration: h,
            eventType: n,
            itemType: y,
          }),
          p
        )
      );
    }
    flush() {
      return this.sender.flush();
    }
    _addToTimeline(e) {
      return __awaiter(this, void 0, void 0, function* () {
        e = Object.assign(Object.assign({}, e), { timestamp: Date.now() });
        const n = this.timeline.length > 0 && this.timeline.last;
        yield this.timeline.add(e);
        const d = this.build(e, n);
        yield this.send(d, e);
      });
    }
    get previousDescriptor() {
      const e = this.timeline.last;
      if (void 0 === e)
        throw new Error('A method was called without a previous descriptor');
      return exceptFields(e, 'timestamp');
    }
    buildForPlayParams(e, n, d, h = 0, p = {}, y = !1) {
      return (
        sr.warn(
          'You are using buildsForPlayParams from a stateful PlayActivity. Please, use StatelessPlayActivity instead'
        ),
        this._paf.buildForPlayParams(e, n, d, h, p, y)
      );
    }
    send(e, n) {
      e = ensureArray(e);
      const d = normalizePlayActivityDescriptor(n);
      return (
        e.forEach((e) => this._machine.transition(d, e)), this.sender.send(e)
      );
    }
    sanitizePreviousDescriptor(e) {
      let n = deepClone(e);
      return (
        n.itemType === Ut.TIMED_METADATA_PING &&
          (n = exceptFields(n, 'itemType')),
        n
      );
    }
  }
  const nr = [
      'exitFullscreen',
      'webkitExitFullscreen',
      'mozCancelFullScreen',
      'msExitFullscreen',
    ],
    ar = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement',
    ],
    or = [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'mozRequestFullScreen',
      'msRequestFullscreen',
    ],
    noop = () => Promise.resolve(),
    dr = ((e) => {
      if (void 0 === e) return noop;
      const n = nr.find((n) => 'function' == typeof e.prototype[n]);
      return 'string' != typeof n
        ? noop
        : (e = self.document) => {
            var d;
            return null === (d = null == e ? void 0 : e[n]) || void 0 === d
              ? void 0
              : d.call(e);
          };
    })(HTMLDocument),
    lr = ((e) => {
      if (void 0 === e) return () => !1;
      const n = ar.find((n) => n in e.prototype);
      return 'string' != typeof n ? () => !1 : (e = self.document) => !!e[n];
    })(HTMLDocument),
    cr = ((e) => {
      if (void 0 === e) return noop;
      const n = or.find((n) => 'function' == typeof e.prototype[n]);
      return 'string' != typeof n ? noop : (e) => (null == e ? void 0 : e[n]());
    })(HTMLElement);
  class Fullscreen {
    constructor(e) {
      this.player = e;
    }
    exit() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.isInFullscreen())
          return this.stopDispatchingEvents(() => this.exitFullscreen());
      });
    }
    request(e) {
      return __awaiter(this, void 0, void 0, function* () {
        if (void 0 !== e)
          return this.stopDispatchingEvents(() =>
            this.requestFullscreenForElement(e)
          );
      });
    }
    stopDispatchingEvents(e) {
      return __awaiter(this, void 0, void 0, function* () {
        return this.player.windowHandlers.stopListeningToVisibilityChanges(e);
      });
    }
    exitFullscreen() {
      return dr();
    }
    isInFullscreen() {
      return lr();
    }
    requestFullscreenForElement(e) {
      return cr(e);
    }
  }
  class UnsupportedSeeker {
    constructor() {
      this.ended = !1;
    }
    start() {
      M.warn('seeker.start is not supported in this playback method');
    }
    end() {
      M.warn('seeker.end is not supported in this playback method');
    }
    seekToTime(e) {
      return (
        M.warn('seekToTime is not supported in this playback method'),
        Promise.resolve()
      );
    }
  }
  class PlayerSeeker {
    constructor(e) {
      (this._ended = !1),
        (this._lastSeekedTime = -1),
        (this._startTime = -1),
        M.debug('seeker: new'),
        (this._player = e);
    }
    get ended() {
      return this._ended;
    }
    get isEngagedInPlayback() {
      return this._player.isEngagedInPlayback;
    }
    get stillPlayingSameItem() {
      return this._currentItem === this._player.nowPlayingItem;
    }
    end() {
      M.debug('seeker: end'),
        -1 !== this._startTime
          ? this._ended
            ? M.warn('seeker: Cannot end the same seeker twice.')
            : (this.dispatchStartEvent(), this.dispatchEndEvent())
          : M.warn('seeker: Cannot end a seeker before starting it.');
    }
    seekToTime(e) {
      return __awaiter(this, void 0, void 0, function* () {
        var n;
        if ((M.debug('seeker: seekToTime', e), !this.ended))
          return (
            this.stillPlayingSameItem ||
              ((this._currentItem = this._player.nowPlayingItem),
              (this._startTime = 0)),
            (this._lastSeekedTime = e),
            (n = this._player.seekToTime(e)),
            __awaiter(void 0, void 0, void 0, function* () {
              try {
                return yield n;
              } catch (Vt) {
                if ('cancelled' !== Vt.message) throw Vt;
              }
            })
          );
        M.warn('seeker: Cannot seek once the seeker has ended');
      });
    }
    start() {
      M.debug('seeker: start'),
        -1 === this._startTime
          ? ((this._currentItem = this._player.nowPlayingItem),
            (this._startTime = this._player.currentPlaybackTime),
            (this._lastSeekedTime = this._startTime))
          : M.warn('seeker: Cannot start same seeker twice');
    }
    dispatch(e, n) {
      this.isEngagedInPlayback
        ? (M.debug('seeker: dispatch', e), this._player.dispatch(e, n))
        : M.debug(
            'seeker: do not dispatch because isEngagedInPlayback',
            this.isEngagedInPlayback
          );
    }
    dispatchStartEvent() {
      this.stillPlayingSameItem ||
        ((this._startTime = 0), (this._lastSeekedTime = 0)),
        this.dispatch(bt.playbackScrub, { position: this._startTime });
    }
    dispatchEndEvent() {
      (this._ended = !0),
        this.dispatch(bt.playbackScrub, {
          position: this._lastSeekedTime,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
        });
    }
  }
  const Bind = () => (e, n, d) => {
      if (void 0 === d || 'function' != typeof d.value)
        throw new TypeError(
          `Only methods can be decorated with @Bind, but ${n} is not a method.`
        );
      return {
        configurable: !0,
        get() {
          const e = d.value.bind(this);
          return (
            Object.defineProperty(this, n, {
              value: e,
              configurable: !0,
              writable: !0,
            }),
            e
          );
        },
      };
    },
    {
      visibilityChangeEvent: ur,
      visibilityState: hr,
      unloadEventName: pr,
    } = (() => {
      let e = 'visibilitychange',
        n = 'visibilityState';
      void 0 !== document.mozHidden
        ? ((e = 'mozvisibilitychange'), (n = 'mozVisibilityState'))
        : void 0 !== document.msHidden
        ? ((e = 'msvisibilitychange'), (n = 'msVisibilityState'))
        : document.webkitHidden &&
          ((e = 'webkitvisibilitychange'), (n = 'webkitVisibilityState'));
      return {
        visibilityChangeEvent: e,
        visibilityState: n,
        unloadEventName: 'onpagehide' in window ? 'pagehide' : 'unload',
      };
    })();
  class WindowHandlers {
    constructor(e, n = ze) {
      (this.browser = n),
        (this.dispatchVisibilityChanges = !0),
        (this.player = e);
    }
    activate(e = self, n = self.document) {
      n.addEventListener(ur, this.visibilityChanged),
        e.addEventListener('storage', this.storage, !1),
        e.addEventListener(pr, this.windowUnloaded);
    }
    deactivate() {
      document.removeEventListener(ur, this.visibilityChanged),
        window.removeEventListener('storage', this.storage),
        window.addEventListener(pr, this.windowUnloaded);
    }
    stopListeningToVisibilityChanges(e) {
      return __awaiter(this, void 0, void 0, function* () {
        this.dispatchVisibilityChanges = !1;
        const n = yield e();
        return (this.dispatchVisibilityChanges = !0), n;
      });
    }
    dispatch(e, n = {}) {
      this.player.dispatch(e, n);
    }
    storage({ key: e, newValue: n }) {
      e === Je && this.player.tsidChanged(n);
    }
    visibilityChanged(e) {
      const n = e.target[hr];
      M.log('dc visibilityState', n, e, lr()),
        this.browser.isiOS &&
          this.dispatchVisibilityChanges &&
          ('hidden' === n
            ? this.dispatch(bt.playerExit, {
                position: this.player.currentPlaybackTime,
              })
            : 'visible' === n && this.dispatch(bt.playerActivate));
    }
    windowUnloaded() {
      this.player.isPlaying &&
        this.dispatch(bt.playerExit, {
          position: this.player.currentPlaybackTime,
        });
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0),
    ],
    WindowHandlers.prototype,
    'storage',
    null
  ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Event]),
        __metadata('design:returntype', void 0),
      ],
      WindowHandlers.prototype,
      'visibilityChanged',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0),
      ],
      WindowHandlers.prototype,
      'windowUnloaded',
      null
    );
  const {
      bufferedProgressDidChange: yr,
      mediaCanPlay: mr,
      mediaElementCreated: gr,
      mediaPlaybackError: fr,
      nowPlayingItemDidChange: vr,
      nowPlayingItemWillChange: _r,
      metadataDidChange: br,
      primaryPlayerDidChange: Tr,
      playbackDurationDidChange: Er,
      playbackProgressDidChange: Sr,
      playbackStateDidChange: kr,
      playbackRateDidChange: Pr,
      playbackStateWillChange: Ir,
      playbackTargetAvailableDidChange: Ar,
      playbackTargetIsWirelessDidChange: wr,
      playbackTimeDidChange: Rr,
      playbackVolumeDidChange: Or,
    } = St,
    Cr = [
      'canplay',
      'durationchange',
      'ended',
      'error',
      'loadedmetadata',
      'loadstart',
      'pause',
      'play',
      'playing',
      'progress',
      'ratechange',
      'seeked',
      'seeking',
      'timeupdate',
      'volumechange',
      'waiting',
    ],
    Mr = ['NotAllowedError', 'NotSupportedError'],
    {
      ended: Dr,
      loading: Lr,
      paused: Nr,
      playing: xr,
      seeking: Ur,
      stopped: Br,
      waiting: Fr,
    } = e.PlaybackStates;
  class BasePlayer {
    constructor(n) {
      var d;
      (this.privateEnabled = !1),
        (this.siriInitiated = !1),
        (this.previewOnly = !1),
        (this._currentBufferedProgress = 0),
        (this._paused = !1),
        (this._playbackState = e.PlaybackStates.none),
        (this._stopped = !1),
        (this._playbackDidStart = !1),
        (this._currentPlaybackProgress = 0),
        (this._isPrimaryPlayer = !0),
        (this._playbackTargetAvailable = !1),
        (this._playbackTargetIsWireless = !1),
        (this._serial = Date.now().toString()),
        (this._isDestroyed = !1),
        (this._dispatcher = n.services.dispatcher),
        (this._timing = n.services.timing),
        (this._context = n.context || {}),
        (this.privateEnabled = n.privateEnabled || !1),
        (this.siriInitiated = n.siriInitiated || !1),
        (this._bitrateCalculator = n.services.bitrateCalculator),
        (this.windowHandlers = new WindowHandlers(this)),
        (this.fullscreen = new Fullscreen(this)),
        null === (d = getLocalStorage()) ||
          void 0 === d ||
          d.setItem(Je, this._serial);
    }
    get bitrate() {
      return this._bitrateCalculator.bitrate;
    }
    get currentBufferedProgress() {
      return this._currentBufferedProgress;
    }
    get _currentDuration() {
      return this._targetElement.duration;
    }
    get _currentTime() {
      var e;
      const n = this._targetElement.currentTime,
        d = this._buffer;
      return (
        n -
        (null !== (e = null == d ? void 0 : d.currentTimestampOffset) &&
        void 0 !== e
          ? e
          : 0)
      );
    }
    get currentPlaybackDuration() {
      const n = this.nowPlayingItem;
      if (!n) return 0;
      const d =
          (null == n ? void 0 : n.playbackType) ===
            e.PlaybackType.encryptedFull ||
          (null == n ? void 0 : n.playbackType) ===
            e.PlaybackType.unencryptedFull,
        h = null == n ? void 0 : n.playbackDuration;
      return d && h
        ? this.calculateTime(h / 1e3)
        : this.calculateTime(this._currentDuration);
    }
    get currentPlaybackTime() {
      return this.calculateTime(this._currentTime);
    }
    calculateTime(e) {
      return this._timing.time(e);
    }
    get currentPlaybackTimeRemaining() {
      return this.currentPlaybackDuration - this.currentPlaybackTime;
    }
    get currentPlaybackProgress() {
      return this._currentPlaybackProgress || 0;
    }
    get hasMediaElement() {
      return (
        this._targetElement instanceof HTMLElement &&
        null !== this._targetElement.parentNode
      );
    }
    get isEngagedInPlayback() {
      return !this._stopped && !this.isPaused();
    }
    get isPlaying() {
      return this.playbackState === xr;
    }
    get isPrimaryPlayer() {
      return this._isPrimaryPlayer;
    }
    set isPrimaryPlayer(e) {
      var n;
      e !== this._isPrimaryPlayer &&
        ((this._isPrimaryPlayer = e),
        this._isPrimaryPlayer
          ? null === (n = getLocalStorage()) ||
            void 0 === n ||
            n.setItem(Je, this._serial)
          : (this._dispatcher.publish(Tr, { target: this }),
            this.pause({ userInitiated: !1 })));
    }
    get isReady() {
      return 0 !== this._targetElement.readyState;
    }
    get nowPlayingItem() {
      return this._nowPlayingItem;
    }
    set nowPlayingItem(e) {
      const n = this._dispatcher;
      if (void 0 === e)
        return (
          n.publish(_r, { item: e }),
          (this._nowPlayingItem = e),
          void n.publish(vr, { item: e })
        );
      const d = this._nowPlayingItem,
        h = this._buffer;
      (null == d ? void 0 : d.isEqual(e)) ||
        (n.publish(_r, { item: e }),
        this.isPlaying &&
          (null == h ? void 0 : h.currentItem) !== e &&
          this._pauseMedia(),
        d &&
          (M.debug('setting state to ended on ', d.title),
          (d.state = N.ended),
          d.endMonitoringStateDidChange(),
          d.endMonitoringStateWillChange()),
        (this._nowPlayingItem = e),
        M.debug('setting state to playing on ', e.title),
        (e.state = N.playing),
        e && e.info && this._setTargetElementTitle(e.info),
        n.publish(vr, { item: e }),
        n.publish(Er, {
          currentTarget: this._targetElement,
          duration: this.currentPlaybackDuration,
          target: this._targetElement,
          type: 'durationchange',
        }));
    }
    get playbackRate() {
      return this._targetElement.playbackRate;
    }
    set playbackRate(e) {
      this._targetElement.playbackRate = e;
    }
    get playbackState() {
      return this._playbackState;
    }
    setPlaybackState(e, n) {
      const d = this._playbackState;
      if (e === d) return;
      const h = { oldState: d, state: e, nowPlayingItem: n };
      M.debug('BasePlayer.playbackState is changing', h),
        this._dispatcher.publish(Ir, h),
        (this._playbackState = e),
        this._dispatcher.publish(kr, h);
    }
    get playbackTargetAvailable() {
      return (
        void 0 !== window.WebKitPlaybackTargetAvailabilityEvent &&
        this._playbackTargetAvailable
      );
    }
    set playbackTargetAvailable(e) {
      e !== this._playbackTargetAvailable &&
        ((this._playbackTargetAvailable = e),
        this._dispatcher.publish(Ar, { available: e }));
    }
    get playbackTargetIsWireless() {
      return (
        void 0 !== window.WebKitPlaybackTargetAvailabilityEvent &&
        this._playbackTargetIsWireless
      );
    }
    set playbackTargetIsWireless(e) {
      e !== this._playbackTargetIsWireless &&
        ((this._playbackTargetIsWireless = e),
        this._dispatcher.publish(wr, { playing: e }));
    }
    get volume() {
      return this._targetElement.volume;
    }
    set volume(e) {
      this._targetElement.volume = e;
    }
    get isDestroyed() {
      return this._isDestroyed;
    }
    clearNextManifest() {
      var e;
      null === (e = this._buffer) || void 0 === e || e.clearNextManifest();
    }
    initialize() {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('BasePlayer.initialize'),
          this.isPlayerSupported()
            ? (yield this.initializeMediaElement(),
              yield this.initializeExtension(),
              this.initializeEventHandlers(),
              this._dispatcher.publish(gr, this._targetElement))
            : M.warn('{this.constructor.name} not supported');
      });
    }
    initializeEventHandlers() {
      if ((this.windowHandlers.activate(), !this.hasMediaElement)) return;
      const e = this._targetElement;
      window.WebKitPlaybackTargetAvailabilityEvent &&
        (e.addEventListener('webkitplaybacktargetavailabilitychanged', (e) => {
          this.playbackTargetAvailable = 'available' === e.availability;
        }),
        e.addEventListener(
          'webkitcurrentplaybacktargetiswirelesschanged',
          (e) => {
            this.playbackTargetIsWireless =
              e.target === this._targetElement &&
              !this.playbackTargetIsWireless;
          }
        )),
        Cr.forEach((n) => e.addEventListener(n, this)),
        this._dispatcher.publish(bt.playerActivate);
    }
    removeEventHandlers() {
      Cr.forEach((e) => this._targetElement.removeEventListener(e, this)),
        this.windowHandlers.deactivate();
    }
    isPaused() {
      return this._paused;
    }
    exitFullscreen() {
      return this.fullscreen.exit();
    }
    requestFullscreen(e) {
      return this.fullscreen.request(e);
    }
    newSeeker() {
      var e;
      return (
        null === (e = this._seeker) || void 0 === e || e.end(),
        (this._seeker = new PlayerSeeker(this)),
        this._seeker
      );
    }
    stop(e) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('BasePlayer.stop', e),
          yield this._waitForPendingPlay(),
          this.isPlaying &&
            this.dispatch(
              bt.playbackStop,
              Object.assign(
                {
                  position: this.currentPlaybackTime,
                  startPosition: this.initialBufferPosition,
                  playingDate: this.currentPlayingDate,
                  startPlayingDate: this.initialPlayingDate,
                },
                e
              )
            ),
          yield this.stopMediaAndCleanup();
      });
    }
    stopMediaAndCleanup(e = Br) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('stopMediaAndCleanup'),
          yield this._stopMediaElement(),
          (this._stopped = !0),
          (this._paused = !1);
        const n = this.nowPlayingItem;
        (this.nowPlayingItem = void 0),
          (this.initialBufferPosition = void 0),
          (this.initialPlayingDate = void 0),
          this.setPlaybackState(e, n);
      });
    }
    calculatePlaybackProgress() {
      const e =
        Math.round(
          100 * (this.currentPlaybackTime / this.currentPlaybackDuration || 0)
        ) / 100;
      this._currentPlaybackProgress !== e &&
        ((this._currentPlaybackProgress = e),
        this._dispatcher.publish(Sr, {
          progress: this._currentPlaybackProgress,
        }));
    }
    calculateBufferedProgress(e) {
      const n = Math.round((e / this.currentPlaybackDuration) * 100);
      this._currentBufferedProgress !== n &&
        ((this._currentBufferedProgress = n),
        this._dispatcher.publish(yr, { progress: n }));
    }
    destroy() {
      var e, n;
      if (
        (M.debug('BasePlayer.destroy'),
        (this._isDestroyed = !0),
        !this.hasMediaElement)
      )
        return;
      const d = this._targetElement;
      null === (e = this.extension) || void 0 === e || e.destroy(d),
        this.removeEventHandlers(),
        this.cleanupElement(),
        null === (n = d.parentNode) || void 0 === n || n.removeChild(d);
    }
    handleEvent(n) {
      var d;
      return __awaiter(this, void 0, void 0, function* () {
        'timeupdate' !== n.type &&
          M.debug(
            'BasePlayer.handleEvent: ',
            n.type,
            n,
            this.isPaused(),
            this._stopped
          );
        const { nowPlayingItem: h } = this;
        switch (n.type) {
          case 'canplay':
            this._dispatcher.publish(mr, n),
              this._playbackState !== Fr ||
                this._targetElement.paused ||
                this.setPlaybackState(xr, h);
            break;
          case 'durationchange':
            this._targetElement.duration !== 1 / 0 &&
              ((n.duration = this.currentPlaybackDuration),
              this._dispatcher.publish(Er, n),
              this.calculatePlaybackProgress());
            break;
          case 'ended': {
            if (
              (M.debug('media element "ended" event'),
              null === (d = this.nowPlayingItem) || void 0 === d
                ? void 0
                : d.isLinearStream)
            )
              return void M.warn('ignoring ended event for linear stream', n);
            if (this.isElementCleaned()) {
              M.debug('media element already cleaned, ignoring "ended" event');
              break;
            }
            const h = this.currentPlaybackTime,
              p = this.currentPlayingDate;
            yield this.stopMediaAndCleanup(Dr),
              this.dispatch(bt.playbackStop, {
                position: h,
                playingDate: p,
                endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
              });
            break;
          }
          case 'error':
            M.error('Playback Error', n, this._targetElement.error),
              this._dispatcher.publish(
                fr,
                new MKError(MKError.MEDIA_PLAYBACK, 'Playback Error')
              );
            break;
          case 'loadedmetadata':
            this._dispatcher.publish(br, n);
            break;
          case 'loadstart':
            this.setPlaybackState(Lr, h);
            break;
          case 'pause':
            this.setPlaybackState(this._stopped ? Br : Nr, h);
            break;
          case 'play':
          case 'playing':
            (this._paused = !1),
              (this._stopped = !1),
              (this.isPrimaryPlayer = !0),
              this.setPlaybackState(xr, h);
            break;
          case 'progress': {
            const e = this._targetElement.buffered;
            this.handleBufferStart(),
              1 === e.length &&
                0 === e.start(0) &&
                this.calculateBufferedProgress(e.end(0));
            break;
          }
          case 'ratechange':
            this._dispatcher.publish(Pr, n);
            break;
          case 'seeked':
            this._stopped
              ? this.setPlaybackState(Br, h)
              : this._paused
              ? this.setPlaybackState(Nr, h)
              : this.playbackState !== Dr && this.setPlaybackState(xr, h);
            break;
          case 'seeking':
            this.playbackState === Nr
              ? (this._paused = !0)
              : this.playbackState === Br && (this._stopped = !0),
              this.playbackState !== Dr && this.setPlaybackState(Ur, h);
            break;
          case 'timeupdate': {
            this._dispatcher.publish(Rr, {
              currentPlaybackDuration: this.currentPlaybackDuration,
              currentPlaybackTime: this.currentPlaybackTime,
              currentPlaybackTimeRemaining: this.currentPlaybackTimeRemaining,
            }),
              this.calculatePlaybackProgress();
            const e = this._buffer;
            e && (e.currentTime = this.currentPlaybackTime);
            break;
          }
          case 'volumechange':
            this._dispatcher.publish(Or, n);
            break;
          case 'waiting':
            this.setPlaybackState(Fr, h);
        }
      });
    }
    handleBufferStart() {
      const { _targetElement: e } = this;
      void 0 !== this.initialBufferPosition ||
        e.paused ||
        0 === e.buffered.length ||
        ((this.initialBufferPosition = e.buffered.start(0)),
        (this.initialPlayingDate = this.currentPlayingDate),
        M.debug(
          'BasePlayer.handleBufferStart: setting initial buffer position ',
          this.initialBufferPosition
        ));
    }
    pause(e = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._waitForPendingPlay(),
          this.isPlaying &&
            (yield this._pauseMedia(),
            (this._paused = !0),
            this.dispatch(
              bt.playbackPause,
              Object.assign(
                {
                  position: this.currentPlaybackTime,
                  playingDate: this.currentPlayingDate,
                },
                e
              )
            ));
      });
    }
    play(e = !0) {
      return __awaiter(this, void 0, void 0, function* () {
        if ((M.debug('BasePlayer.play()'), this.nowPlayingItem))
          try {
            const afterPlay = () => {
              M.debug('BasePlayer.play dispatching playbackPlay'),
                this.dispatch(bt.playbackPlay, {
                  userInitiated: e,
                  position: this.currentPlaybackTime,
                  playingDate: this.currentPlayingDate,
                });
            };
            yield this._playMedia(afterPlay);
          } catch (Vt) {
            if (
              (Mr.includes(Vt.name) &&
                M.error('BasePlayer.play() rejected due to', Vt),
              'NotAllowedError' === Vt.name)
            )
              throw new MKError(
                MKError.USER_INTERACTION_REQUIRED,
                'Playback of media content requires user interaction first and cannot be automatically started on page load.'
              );
            return;
          }
      });
    }
    preload() {
      return this._loadMedia();
    }
    showPlaybackTargetPicker() {
      this.playbackTargetAvailable &&
        this._targetElement.webkitShowPlaybackTargetPicker();
    }
    dispatch(e, n) {
      void 0 === n.item && (n.item = this.nowPlayingItem),
        hasOwn(n, 'isPlaying') || (n.isPlaying = this.isPlaying),
        this._dispatcher.publish(e, n);
    }
    tsidChanged(e) {
      void 0 !== e && '' !== e && (this.isPrimaryPlayer = e === this._serial);
    }
    _waitForPendingPlay() {
      return __awaiter(this, void 0, void 0, function* () {
        this._playPromise &&
          (yield this._playPromise, (this._playPromise = void 0));
      });
    }
    _loadMedia() {
      return (
        M.debug('BasePlayer._loadMedia', this._targetElement),
        this._targetElement.load(),
        Promise.resolve()
      );
    }
    _pauseMedia() {
      return this._targetElement.pause(), Promise.resolve();
    }
    _playAssetURL(e, n) {
      var d;
      M.debug('BasePlayer._playAssetURL', e), (this._targetElement.src = e);
      const h = this._loadMedia();
      return n
        ? (M.debug('BasePlayer.loadOnly'), h)
        : (
            null === (d = this.nowPlayingItem) || void 0 === d
              ? void 0
              : d.isLinearStream
          )
        ? this.play()
        : this._playMedia();
    }
    playItemFromUnencryptedSource(e, n, d) {
      return (
        (null == d ? void 0 : d.startTime) && (e += '#t=' + d.startTime),
        this._playAssetURL(e, n)
      );
    }
    _playMedia(e = d) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('BasePlayer._playMedia', this._targetElement, this.extension);
        const n = this._targetElement
          .play()
          .then((e) => ((this._playbackDidStart = !0), e));
        (this._playPromise = n.then(e).catch((e) => {
          M.error('BasePlayer._playMedia playPromise rejected', e);
        })),
          yield n;
      });
    }
    _setTargetElementTitle(e) {
      this.hasMediaElement && (this._targetElement.title = e);
    }
    _licenseError() {
      this._playPromise = void 0;
    }
    _stopMediaElement() {
      return __awaiter(this, void 0, void 0, function* () {
        this.hasMediaElement &&
          (this._targetElement.pause(), this.cleanupElement());
      });
    }
    cleanupElement() {
      const e = this._targetElement;
      e &&
        !this.isElementCleaned() &&
        ((e.currentTime = 0),
        e.removeAttribute('src'),
        e.removeAttribute('title'));
    }
    isElementCleaned() {
      const e = this._targetElement;
      return !e || (0 === e.currentTime && '' === e.src && '' === e.title);
    }
  }
  function generateAssetUrl(e, n) {
    let d = e.assetURL;
    if (!d) throw new Error('Cannot generate asset URL');
    return (
      n &&
        (n.startOver && (d = addQueryParamsToURL(d, { startOver: !0 })),
        n.bingeWatching && (d = addQueryParamsToURL(d, { bingeWatching: !0 }))),
      e.supportsLinearScrubbing &&
        (d = addQueryParamsToURL(d, { linearScrubbingSupported: !0 })),
      (d = addQueryParamsToURL(d, { xapsub: 'accepts-css' })),
      d
    );
  }
  function restoreSelectedTrack(e, n) {
    M.debug('MEDIA_TRACKS restoreSelectedTrack');
    const d = e.getPersistedTrack(),
      h = e.fields,
      p = n.currentTrack;
    if (!d) return void M.debug('MEDIA_TRACKS no persisted track');
    if (p && trackEquals(p, d, h))
      return void M.debug(
        'MEDIA_TRACKS persisted track is equal to current track, not setting'
      );
    const y = n.tracks;
    if (y && y.length)
      for (let m = 0; m < y.length; m++) {
        const e = y[m];
        if (
          (M.debug(
            `MEDIA_TRACKS testing track ${
              e.label
            } against persisted track ${JSON.stringify(d)}`
          ),
          trackEquals(e, d, h))
        ) {
          M.debug('MEDIA_TRACKS found matching track ' + e.label),
            (n.currentTrack = e);
          break;
        }
      }
  }
  function trackEquals(e, n, d) {
    let h = !0;
    for (let p = 0; p < d.length; p++) {
      const y = d[p];
      if (e[y] !== n[y]) {
        h = !1;
        break;
      }
    }
    return h;
  }
  class TrackPersistence {
    constructor(e, n) {
      (this.storageKey = e), (this.fields = n);
    }
    getPersistedTrack() {
      var e;
      if (!hasLocalStorage()) return !1;
      const n =
        (null === (e = getLocalStorage()) || void 0 === e
          ? void 0
          : e.getItem(this.storageKey)) || '';
      try {
        return JSON.parse(n);
      } catch (Vt) {
        return M.warn('MEDIA_TRACK could not parse persisted value ' + n), !1;
      }
    }
    setPersistedTrack(e) {
      var n, d;
      if (!hasLocalStorage()) return;
      if (
        (M.debug(
          `MEDIA_TRACK setPersistedTrack ${e.language},${e.label},${e.kind} with keys ${this.fields}`
        ),
        !e)
      )
        return void (
          null === (n = getLocalStorage()) ||
          void 0 === n ||
          n.setItem(this.storageKey, '')
        );
      const h = JSON.stringify(this.extractFieldValuesFromTrack(e));
      M.debug('MEDIA_TRACK Extracted values ' + h),
        null === (d = getLocalStorage()) ||
          void 0 === d ||
          d.setItem(this.storageKey, h);
    }
    extractFieldValuesFromTrack(e) {
      const n = {};
      return (
        this.fields.forEach((d) => {
          const h = e[d];
          null == h &&
            M.warn(
              `MEDIA_TRACK No value for field ${d} on track ${JSON.stringify(
                e
              )}`
            ),
            (n[d] = h);
        }),
        n
      );
    }
  }
  const {
      audioTrackAdded: Kr,
      audioTrackChanged: jr,
      audioTrackRemoved: $r,
    } = St,
    { audioTracksSwitched: Vr, audioTracksUpdated: Hr } = tt;
  class AudioTrackManager {
    constructor(e, n, d) {
      if (
        ((this.mediaElement = e),
        (this.dispatcher = n),
        (this.extensionTracks = d),
        (this._extensionTracks = []),
        (this.trackPersistence = new TrackPersistence('mk-audio-track', [
          'label',
          'language',
          'kind',
        ])),
        this.extensionTracks)
      ) {
        M.debug(
          'MEDIA_TRACK Initializing audio track manager for hls track events'
        ),
          (this.onExtensionAudioTracksUpdated =
            this.onExtensionAudioTracksUpdated.bind(this)),
          (this.onExtensionAudioTrackSwitched =
            this.onExtensionAudioTrackSwitched.bind(this));
        const e = this.extensionTracks;
        e.addEventListener(Hr, this.onExtensionAudioTracksUpdated),
          e.addEventListener(Vr, this.onExtensionAudioTrackSwitched);
      } else {
        if (!e.audioTracks) return;
        M.debug(
          'MEDIA_TRACK Initializing audio track manager for native track events'
        ),
          (this.onAudioTrackAdded = this.onAudioTrackAdded.bind(this)),
          (this.onAudioTrackChanged = this.onAudioTrackChanged.bind(this)),
          (this.onAudioTrackRemoved = this.onAudioTrackRemoved.bind(this)),
          e.audioTracks.addEventListener('addtrack', this.onAudioTrackAdded),
          e.audioTracks.addEventListener('change', this.onAudioTrackChanged),
          e.audioTracks.addEventListener(
            'removetrack',
            this.onAudioTrackRemoved
          );
      }
    }
    get currentTrack() {
      return this.tracks.find((e) => e.enabled);
    }
    set currentTrack(e) {
      e &&
        (M.debug('MEDIA_TRACK Setting audio track ' + e.label),
        this.extensionTracks
          ? (M.debug(
              `MEDIA_TRACK Setting track on extension ${e.id}-${e.label}`
            ),
            (this.extensionTracks.audioTrack = e))
          : (M.debug('MEDIA_TRACK disabling all audio tracks'),
            Array.from(this.mediaElement.audioTracks).forEach((n) => {
              n !== e && (n.enabled = !1);
            }),
            M.debug('MEDIA_TRACK enabling', e),
            (e.enabled = !0)),
        this.trackPersistence.setPersistedTrack(e));
    }
    get tracks() {
      return this.extensionTracks
        ? this._extensionTracks || this.extensionTracks.audioTracks || []
        : Array.from(this.mediaElement.audioTracks);
    }
    destroy() {
      if (this.extensionTracks) {
        const e = this.extensionTracks;
        e.removeEventListener(Hr, this.onExtensionAudioTracksUpdated),
          e.removeEventListener(Vr, this.onExtensionAudioTrackSwitched);
      } else {
        if (!this.mediaElement.audioTracks) return;
        this.mediaElement.audioTracks.removeEventListener(
          'addtrack',
          this.onAudioTrackAdded
        ),
          this.mediaElement.audioTracks.removeEventListener(
            'change',
            this.onAudioTrackChanged
          ),
          this.mediaElement.audioTracks.removeEventListener(
            'removetrack',
            this.onAudioTrackRemoved
          );
      }
    }
    restoreSelectedTrack() {
      return restoreSelectedTrack(this.trackPersistence, this);
    }
    onExtensionAudioTracksUpdated(e) {
      M.debug(
        'MEDIA_TRACK Extension audio tracks updated ' + JSON.stringify(e)
      ),
        (this._extensionTracks = e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(Kr, e);
    }
    onExtensionAudioTrackSwitched(e) {
      if (
        (M.debug(
          'MEDIA_TRACK Extension audio track switched ' + JSON.stringify(e)
        ),
        this._extensionTracks)
      ) {
        const preserveSelectedTrack = (n) => {
          n.enabled = e.selectedId === n.id;
        };
        this._extensionTracks.forEach(preserveSelectedTrack);
      }
      this.dispatcher.publish(jr, e);
    }
    onAudioTrackAdded(e) {
      !(function (e, n, d) {
        const h = n.getPersistedTrack();
        h &&
          trackEquals(e, h, n.fields) &&
          (M.debug(
            'MEDIA_TRACK onTrackAdded with track that matches persisted track ' +
              e.label
          ),
          (d.currentTrack = e));
      })(e.track, this.trackPersistence, this),
        this.dispatcher.publish(Kr, e);
    }
    onAudioTrackChanged(e) {
      this.dispatcher.publish(jr, e);
    }
    onAudioTrackRemoved(e) {
      this.dispatcher.publish($r, e);
    }
  }
  const Wr = BooleanDevFlag.register('mk-load-manifest-once'),
    shouldLoadManifestOnce = () => Wr.enabled;
  var Yr = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.isValidPercentValue = function (e) {
        return 'number' == typeof e && e >= 0 && e <= 100;
      }),
      (n.isValidAlignSetting = function (e) {
        return (
          'string' == typeof e &&
          ['start', 'center', 'end', 'left', 'right', 'middle'].includes(e)
        );
      }),
      (n.isValidDirectionSetting = function (e) {
        return 'string' == typeof e && ['', 'rl', 'lr'].includes(e);
      }),
      (n.isValidLineAndPositionSetting = function (e) {
        return 'number' == typeof e || 'auto' === e;
      }),
      (n.isValidLineAlignSetting = function (e) {
        return 'string' == typeof e && ['start', 'center', 'end'].includes(e);
      }),
      (n.isValidPositionAlignSetting = function (e) {
        return (
          'string' == typeof e &&
          [
            'line-left',
            'center',
            'line-right',
            'auto',
            'left',
            'start',
            'middle',
            'end',
            'right',
          ].includes(e)
        );
      }),
      (n.isValidScrollSetting = function (e) {
        return ['', 'up'].includes(e);
      });
  });
  unwrapExports(Yr),
    Yr.isValidPercentValue,
    Yr.isValidAlignSetting,
    Yr.isValidDirectionSetting,
    Yr.isValidLineAndPositionSetting,
    Yr.isValidLineAlignSetting,
    Yr.isValidPositionAlignSetting,
    Yr.isValidScrollSetting;
  var qr = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 });
    const d = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&lrm;': 'â€Ž',
        '&rlm;': 'â€',
        '&nbsp;': 'Â ',
      },
      h = {
        c: 'span',
        i: 'i',
        b: 'b',
        u: 'u',
        ruby: 'ruby',
        rt: 'rt',
        v: 'span',
        lang: 'span',
      },
      p = { v: 'title', lang: 'lang' },
      y = { rt: 'ruby' },
      m = {
        'text-combine-upright':
          '-webkit-text-combine:horizontal; text-orientation: mixed;',
      };
    class ParserUtility {
      static parseTimeStamp(e) {
        function computeSeconds(e) {
          const [n, d, h, p] = e.map((e) => (e ? parseInt('' + e) : 0));
          return 3600 * n + 60 * d + h + p / 1e3;
        }
        const n = /^(\d+):(\d{2})(:\d{2})?\.(\d{3})/.exec(e);
        return n
          ? n[3]
            ? computeSeconds([n[1], n[2], n[3].substring(1), n[4]])
            : parseInt(n[1]) > 59
            ? computeSeconds([n[1], n[2], null, n[4]])
            : computeSeconds([null, n[1], n[2], n[4]])
          : null;
      }
      static parseContent(e, n, g) {
        let _ = n.text;
        function nextToken() {
          if (!_) return null;
          const e = /^([^<]*)(<[^>]+>?)?/.exec(_);
          return (n = e[1] ? e[1] : e[2]), (_ = _.substr(n.length)), n;
          var n;
        }
        function unescape1(e) {
          return d[e];
        }
        function unescape(e) {
          return e.replace(/&(amp|lt|gt|lrm|rlm|nbsp);/g, unescape1);
        }
        function shouldAdd(e, n) {
          return (
            !y[n.dataset.localName] ||
            y[n.dataset.localName] === e.dataset.localName
          );
        }
        function createElement(n, d, y) {
          const _ = h[n];
          if (!_) return null;
          const b = e.document.createElement(_);
          b.dataset.localName = _;
          const T = p[n];
          if ((T && y && (b[T] = y.trim()), d))
            if (g[d]) {
              const e = (function (e) {
                let n = '';
                for (const d in e) n += m[d] ? m[d] : d + ':' + e[d] + ';';
                return n;
              })(g[d]);
              b.setAttribute('style', e);
            } else
              console.info(
                `WebVTT: parseContent: Style referenced, but no style defined for '${d}'!`
              );
          return b;
        }
        const b = e.document.createElement('div'),
          T = [];
        let E,
          S,
          k = b;
        for (; null !== (E = nextToken()); )
          if ('<' !== E[0])
            k.appendChild(e.document.createTextNode(unescape(E)));
          else {
            if ('/' === E[1]) {
              T.length &&
                T[T.length - 1] === E.substr(2).replace('>', '') &&
                (T.pop(), (k = k.parentNode));
              continue;
            }
            const n = ParserUtility.parseTimeStamp(E.substr(1, E.length - 2));
            let d;
            if (n) {
              (d = e.document.createProcessingInstruction(
                'timestamp',
                n.toString()
              )),
                k.appendChild(d);
              continue;
            }
            if (
              ((S = /^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/.exec(E)),
              !S)
            )
              continue;
            if (((d = createElement(S[1], S[2], S[3])), !d)) continue;
            if (!shouldAdd(k, d)) continue;
            S[2], T.push(S[1]), k.appendChild(d), (k = d);
          }
        return b;
      }
    }
    n.default = ParserUtility;
  });
  unwrapExports(qr);
  var zr = createCommonjsModule(function (e, n) {
    var d =
      (Z && Z.__decorate) ||
      function (e, n, d, h) {
        var p,
          y = arguments.length,
          m =
            y < 3
              ? n
              : null === h
              ? (h = Object.getOwnPropertyDescriptor(n, d))
              : h;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          m = Reflect.decorate(e, n, d, h);
        else
          for (var g = e.length - 1; g >= 0; g--)
            (p = e[g]) &&
              (m = (y < 3 ? p(m) : y > 3 ? p(n, d, m) : p(n, d)) || m);
        return y > 3 && m && Object.defineProperty(n, d, m), m;
      };
    Object.defineProperty(n, '__esModule', { value: !0 });
    let h = class {
      constructor(e, n, d) {
        (this._id = ''),
          (this._pauseOnExit = !1),
          (this._region = null),
          (this._vertical = ''),
          (this._snapToLines = !0),
          (this._line = 'auto'),
          (this._lineAlign = 'start'),
          (this._position = 'auto'),
          (this._positionAlign = 'auto'),
          (this._size = 100),
          (this._align = 'center'),
          (this.hasBeenReset = !1),
          (this._startTime = e),
          (this._endTime = n),
          (this._text = d);
      }
      get id() {
        return this._id;
      }
      set id(e) {
        this._id = '' + e;
      }
      get pauseOnExit() {
        return this._pauseOnExit;
      }
      set pauseOnExit(e) {
        this._pauseOnExit = !!e;
      }
      get startTime() {
        return this._startTime;
      }
      set startTime(e) {
        if ('number' != typeof e)
          throw new TypeError('Start time must be set to a number: ' + e);
        (this._startTime = e), (this.hasBeenReset = !0);
      }
      get endTime() {
        return this._endTime;
      }
      set endTime(e) {
        if ('number' != typeof e)
          throw new TypeError('End time must be set to a number: ' + e);
        (this._endTime = e), (this.hasBeenReset = !0);
      }
      get text() {
        return this._text;
      }
      set text(e) {
        (this._text = '' + e), (this.hasBeenReset = !0);
      }
      get region() {
        return this._region;
      }
      set region(e) {
        (this._region = e), (this.hasBeenReset = !0);
      }
      get vertical() {
        return this._vertical;
      }
      set vertical(e) {
        if (!Yr.isValidDirectionSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for vertical: ' + e
          );
        (this._vertical = e), (this.hasBeenReset = !0);
      }
      get snapToLines() {
        return this._snapToLines;
      }
      set snapToLines(e) {
        (this._snapToLines = !!e), (this.hasBeenReset = !0);
      }
      get line() {
        return this._line;
      }
      set line(e) {
        if (!Yr.isValidLineAndPositionSetting(e))
          throw new SyntaxError(
            'An invalid number or illegal string was specified for line: ' + e
          );
        (this._line = e), (this.hasBeenReset = !0);
      }
      get lineAlign() {
        return this._lineAlign;
      }
      set lineAlign(e) {
        if (!Yr.isValidLineAlignSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for lineAlign: ' + e
          );
        (this._lineAlign = e), (this.hasBeenReset = !0);
      }
      get position() {
        return this._position;
      }
      set position(e) {
        if (!Yr.isValidLineAndPositionSetting(e))
          throw new Error('Position must be between 0 and 100 or auto: ' + e);
        (this._position = e), (this.hasBeenReset = !0);
      }
      get positionAlign() {
        return this._positionAlign;
      }
      set positionAlign(e) {
        if (!Yr.isValidPositionAlignSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for positionAlign: ' + e
          );
        (this._positionAlign = e), (this.hasBeenReset = !0);
      }
      get size() {
        return this._size;
      }
      set size(e) {
        if (e < 0 || e > 100)
          throw new Error('Size must be between 0 and 100: ' + e);
        (this._size = e), (this.hasBeenReset = !0);
      }
      get align() {
        return this._align;
      }
      set align(e) {
        if (!Yr.isValidAlignSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for align: ' + e
          );
        (this._align = e), (this.hasBeenReset = !0);
      }
      getCueAsHTML() {
        return qr.default.parseContent(window, this, {});
      }
      static create(e) {
        if (
          !e.hasOwnProperty('startTime') ||
          !e.hasOwnProperty('endTime') ||
          !e.hasOwnProperty('text')
        )
          throw new Error(
            'You must at least have start time, end time, and text.'
          );
        const n = new this(e.startTime, e.endTime, e.text);
        return (
          Object.keys(e).forEach((d) => {
            n.hasOwnProperty(d) && (n[d] = e[d]);
          }),
          n
        );
      }
      static fromJSON(e) {
        return this.create(JSON.parse(e));
      }
      toJSON() {
        const e = {};
        return (
          Object.keys(this).forEach((n) => {
            this.hasOwnProperty(n) &&
              'getCueAsHTML' !== n &&
              'hasBeenReset' !== n &&
              'displayState' !== n &&
              (e[n] = this[n]);
          }),
          e
        );
      }
    };
    (h = d(
      [
        function (e) {
          let n = e;
          'undefined' != typeof window &&
            null != window.VTTCue &&
            ((n = window.VTTCue),
            (n.create = e.create),
            (n.fromJSON = e.fromJSON),
            (n.prototype.toJSON = e.prototype.toJSON));
          return n;
        },
      ],
      h
    )),
      (n.VTTCue = h);
  });
  unwrapExports(zr), zr.VTTCue;
  var Gr = createCommonjsModule(function (e, n) {
    var d =
      (Z && Z.__decorate) ||
      function (e, n, d, h) {
        var p,
          y = arguments.length,
          m =
            y < 3
              ? n
              : null === h
              ? (h = Object.getOwnPropertyDescriptor(n, d))
              : h;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          m = Reflect.decorate(e, n, d, h);
        else
          for (var g = e.length - 1; g >= 0; g--)
            (p = e[g]) &&
              (m = (y < 3 ? p(m) : y > 3 ? p(n, d, m) : p(n, d)) || m);
        return y > 3 && m && Object.defineProperty(n, d, m), m;
      };
    Object.defineProperty(n, '__esModule', { value: !0 });
    let h = class {
      constructor() {
        (this._id = ''),
          (this._lines = 3),
          (this._regionAnchorX = 0),
          (this._regionAnchorY = 100),
          (this._scroll = ''),
          (this._viewportAnchorX = 0),
          (this._viewportAnchorY = 100),
          (this._width = 100);
      }
      get id() {
        return this._id;
      }
      set id(e) {
        if ('string' != typeof e) throw new Error('ID must be a string.');
        this._id = e;
      }
      get lines() {
        return this._lines;
      }
      set lines(e) {
        if ('number' != typeof e)
          throw new TypeError('Lines must be set to a number.');
        this._lines = e;
      }
      get regionAnchorX() {
        return this._regionAnchorX;
      }
      set regionAnchorX(e) {
        if (!Yr.isValidPercentValue(e))
          throw new TypeError('RegionAnchorX must be between 0 and 100.');
        this._regionAnchorX = e;
      }
      get regionAnchorY() {
        return this._regionAnchorY;
      }
      set regionAnchorY(e) {
        if (!Yr.isValidPercentValue(e))
          throw new TypeError('RegionAnchorY must be between 0 and 100.');
        this._regionAnchorY = e;
      }
      get scroll() {
        return this._scroll;
      }
      set scroll(e) {
        if ('string' == typeof e) {
          const n = e.toLowerCase();
          if (Yr.isValidScrollSetting(n)) return void (this._scroll = n);
        }
        throw new SyntaxError('An invalid or illegal string was specified.');
      }
      get viewportAnchorX() {
        return this._viewportAnchorX;
      }
      set viewportAnchorX(e) {
        if (!Yr.isValidPercentValue(e))
          throw new TypeError('ViewportAnchorX must be between 0 and 100.');
        this._viewportAnchorX = e;
      }
      get viewportAnchorY() {
        return this._viewportAnchorY;
      }
      set viewportAnchorY(e) {
        if (!Yr.isValidPercentValue(e))
          throw new TypeError('ViewportAnchorY must be between 0 and 100.');
        this._viewportAnchorY = e;
      }
      get width() {
        return this._width;
      }
      set width(e) {
        if (!Yr.isValidPercentValue(e))
          throw new TypeError('Width must be between 0 and 100.');
        this._lines = e;
      }
      toJSON() {
        const e = {};
        return (
          Object.keys(this).forEach((n) => {
            this.hasOwnProperty(n) && (e[n] = this[n]);
          }),
          e
        );
      }
      static create(e) {
        const n = new this();
        return (
          Object.keys(e).forEach((d) => {
            n.hasOwnProperty(d) && (n[d] = e[d]);
          }),
          n
        );
      }
      static fromJSON(e) {
        return this.create(JSON.parse(e));
      }
    };
    (h = d(
      [
        function (e) {
          let n = e;
          'undefined' != typeof window &&
            null != window.VTTRegion &&
            ((n = window.VTTRegion),
            (n.create = e.create),
            (n.fromJSON = e.fromJSON),
            (n.prototype.toJSON = e.prototype.toJSON));
          return n;
        },
      ],
      h
    )),
      (n.VTTRegion = h);
  });
  unwrapExports(Gr), Gr.VTTRegion;
  var Qr = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.VTTCue = zr.VTTCue),
      (n.VTTRegion = Gr.VTTRegion);
    class ParsingError extends Error {
      constructor(e, n) {
        super(),
          (this.name = 'ParsingError'),
          (this.code = 'number' == typeof e ? e : e.code),
          n
            ? (this.message = n)
            : e instanceof ParsingError && (this.message = e.message);
      }
    }
    (n.ParsingError = ParsingError),
      (ParsingError.Errors = {
        BadSignature: new ParsingError(0, 'Malformed WebVTT signature.'),
        BadTimeStamp: new ParsingError(1, 'Malformed time stamp.'),
      });
    class Settings {
      constructor() {
        this.values = {};
      }
      set(e, n) {
        this.get(e) || '' === n || (this.values[e] = n);
      }
      get(e, n, d) {
        return 'object' == typeof n && 'string' == typeof d
          ? this.has(e)
            ? this.values[e]
            : n[d]
          : this.has(e)
          ? this.values[e]
          : n;
      }
      has(e) {
        return e in this.values;
      }
      alt(e, n, d) {
        for (let h = 0; h < d.length; ++h)
          if (n === d[h]) {
            this.set(e, n);
            break;
          }
      }
      integer(e, n) {
        /^-?\d+$/.test(n) && this.set(e, parseInt(n, 10));
      }
      percent(e, n) {
        if (n.match(/^([\d]{1,3})(\.[\d]*)?%$/))
          try {
            const d = parseFloat(n);
            if (d >= 0 && d <= 100) return this.set(e, d), !0;
          } catch (Wa) {
            return !1;
          }
        return !1;
      }
    }
    class WebVTTParser {
      constructor(e, n, d) {
        (this.window = e),
          (this.state = 'INITIAL'),
          (this.styleCollector = ''),
          (this.buffer = ''),
          (this.decoder = n || new TextDecoder('utf8')),
          (this.regionList = []),
          (this.onStylesParsedCallback = d),
          (this._styles = {});
      }
      static StringDecoder() {
        return {
          decode: (e) => {
            if (!e) return '';
            if ('string' != typeof e)
              throw new Error('Error - expected string data.');
            return decodeURIComponent(encodeURIComponent(e));
          },
        };
      }
      reportOrThrowError(e) {
        if (
          !(
            e instanceof ParsingError &&
            'function' == typeof this.onparsingerror
          )
        )
          throw e;
        this.onparsingerror(e);
      }
      parseOptions(e, n, d, h) {
        const p = h ? e.split(h) : [e];
        for (const y of p) {
          if ('string' != typeof y) continue;
          const e = y.split(d);
          if (2 !== e.length) continue;
          n(e[0], e[1]);
        }
      }
      parseCue(e, n, d) {
        const h = e,
          consumeTimeStamp = () => {
            const n = qr.default.parseTimeStamp(e);
            if (null === n)
              throw new ParsingError(
                ParsingError.Errors.BadTimeStamp,
                'Malformed timestamp: ' + h
              );
            return (e = e.replace(/^[^\sa-zA-Z-]+/, '')), n;
          },
          skipWhitespace = () => {
            e = e.replace(/^\s+/, '');
          };
        if (
          (skipWhitespace(),
          (n.startTime = consumeTimeStamp()),
          skipWhitespace(),
          '--\x3e' !== e.substr(0, 3))
        )
          throw new ParsingError(
            ParsingError.Errors.BadTimeStamp,
            "Malformed time stamp (time stamps must be separated by '--\x3e'): " +
              h
          );
        (e = e.substr(3)),
          skipWhitespace(),
          (n.endTime = consumeTimeStamp()),
          skipWhitespace(),
          ((e, n) => {
            const h = new Settings();
            this.parseOptions(
              e,
              (e, n) => {
                let p, y;
                switch (e) {
                  case 'region':
                    for (let p = d.length - 1; p >= 0; p--)
                      if (d[p].id === n) {
                        h.set(e, d[p].region);
                        break;
                      }
                    break;
                  case 'vertical':
                    h.alt(e, n, ['rl', 'lr']);
                    break;
                  case 'line':
                    (p = n.split(',')),
                      (y = p[0]),
                      h.integer(e, y),
                      h.percent(e, y) && h.set('snapToLines', !1),
                      h.alt(e, y, ['auto']),
                      2 === p.length &&
                        h.alt('lineAlign', p[1], ['start', 'center', 'end']);
                    break;
                  case 'position':
                    if (
                      ((p = n.split(',')), h.percent(e, p[0]), 2 === p.length)
                    ) {
                      let e = [
                        'line-left',
                        'line-right',
                        'center',
                        'auto',
                        'left',
                        'start',
                        'middle',
                        'end',
                        'right',
                      ];
                      h.alt('positionAlign', p[1], e);
                    }
                    break;
                  case 'size':
                    h.percent(e, n);
                    break;
                  case 'align':
                    let m = [
                      'start',
                      'center',
                      'end',
                      'left',
                      'right',
                      'middle',
                    ];
                    h.alt(e, n, m);
                }
              },
              /:/,
              /\s/
            ),
              (n.region = h.get('region', null)),
              (n.vertical = h.get('vertical', '')),
              (n.line = h.get('line', void 0 === n.line ? 'auto' : n.line)),
              (n.lineAlign = h.get('lineAlign', 'start')),
              (n.snapToLines = h.get('snapToLines', !0)),
              (n.size = h.get('size', 100));
            let p = h.get('align', 'center');
            (n.align = 'middle' === p ? 'center' : p),
              (n.position = h.get('position', 'auto'));
            let y = h.get(
              'positionAlign',
              {
                start: 'start',
                left: 'start',
                center: 'center',
                right: 'end',
                end: 'end',
              },
              n.align
            );
            n.positionAlign = {
              start: 'start',
              'line-left': 'start',
              left: 'start',
              center: 'center',
              middle: 'center',
              'line-right': 'end',
              right: 'end',
              end: 'end',
            }[y];
          })(e, n);
      }
      parseRegion(e) {
        const n = new Settings();
        if (
          (this.parseOptions(
            e,
            (e, d) => {
              switch (e) {
                case 'id':
                  n.set(e, d);
                  break;
                case 'width':
                  n.percent(e, d);
                  break;
                case 'lines':
                  n.integer(e, d);
                  break;
                case 'regionanchor':
                case 'viewportanchor': {
                  const h = d.split(',');
                  if (2 !== h.length) break;
                  const p = new Settings();
                  if (
                    (p.percent('x', h[0]),
                    p.percent('y', h[1]),
                    !p.has('x') || !p.has('y'))
                  )
                    break;
                  n.set(e + 'X', p.get('x')), n.set(e + 'Y', p.get('y'));
                  break;
                }
                case 'scroll':
                  n.alt(e, d, ['up']);
              }
            },
            /=/,
            /\s/
          ),
          n.has('id'))
        ) {
          const e = new Gr.VTTRegion();
          (e.width = n.get('width', 100)),
            (e.lines = n.get('lines', 3)),
            (e.regionAnchorX = n.get('regionanchorX', 0)),
            (e.regionAnchorY = n.get('regionanchorY', 100)),
            (e.viewportAnchorX = n.get('viewportanchorX', 0)),
            (e.viewportAnchorY = n.get('viewportanchorY', 100)),
            (e.scroll = n.get('scroll', '')),
            this.onregion && this.onregion(e),
            this.regionList.push({ id: n.get('id'), region: e });
        }
      }
      parseStyle(e) {
        const parseStyles = (e) => {
            const n = {},
              d = e.split(';');
            for (let h = 0; h < d.length; h++)
              if (d[h].includes(':')) {
                const e = d[h].split(':', 2),
                  p = e[0].trim(),
                  y = e[1].trim();
                '' !== p && '' !== y && (n[p] = y);
              }
            return n;
          },
          n = e.split('}');
        n.pop();
        for (const d of n) {
          let e = null,
            n = null;
          const h = d.split('{');
          h[0] && (e = h[0].trim()),
            h[1] && (n = parseStyles(h[1])),
            e && n && (this._styles[e] = n);
        }
        this.onStylesParsedCallback &&
          this.onStylesParsedCallback(this._styles);
      }
      parseHeader(e) {
        this.parseOptions(
          e,
          function (e, n) {
            switch (e) {
              case 'Region':
                this.parseRegion(n);
            }
          },
          /:/
        );
      }
      parse(e) {
        e && (this.buffer += this.decoder.decode(e, { stream: !0 }));
        const collectNextLine = () => {
          const e = this.buffer;
          let n = 0;
          const calculateBreakPosition = (e, n) => {
            const d = { start: -1, length: -1 };
            if ('\r' === e[n]) (d.start = n), (d.length = 1);
            else if ('\n' === e[n]) (d.start = n), (d.length = 1);
            else if (
              '<' === e[n] &&
              n + 1 < e.length &&
              'b' === e[n + 1] &&
              n + 2 < e.length &&
              'r' === e[n + 2]
            ) {
              let h = n + 2;
              for (; h < e.length && '>' !== e[h++]; );
              (d.start = n), (d.length = h - n);
            }
            return d;
          };
          let d = { start: e.length, length: 0 };
          for (; n < e.length; ) {
            const h = calculateBreakPosition(e, n);
            if (h.length > 0) {
              d = h;
              break;
            }
            ++n;
          }
          const h = e.substr(0, d.start);
          return (this.buffer = e.substr(d.start + d.length)), h;
        };
        try {
          let e;
          if ('INITIAL' === this.state) {
            if (!/\r\n|\n/.test(this.buffer)) return this;
            e = collectNextLine();
            const n = /^(Ã¯Â»Â¿)?WEBVTT([ \t].*)?$/.exec(e);
            if (!n || !n[0])
              throw new ParsingError(ParsingError.Errors.BadSignature);
            this.state = 'HEADER';
          }
          let n = !1;
          for (; this.buffer; ) {
            if (!/\r\n|\n/.test(this.buffer)) return this;
            switch ((n ? (n = !1) : (e = collectNextLine()), this.state)) {
              case 'HEADER':
                e.includes(':')
                  ? this.parseHeader(e)
                  : e || (this.state = 'ID');
                continue;
              case 'NOTE':
                e || (this.state = 'ID');
                continue;
              case 'STYLE':
                e
                  ? (this.styleCollector += e)
                  : (this.parseStyle(this.styleCollector),
                    (this.state = 'ID'),
                    (this.styleCollector = ''));
                continue;
              case 'ID':
                if (/^NOTE($|[ \t])/.test(e)) {
                  this.state = 'NOTE';
                  break;
                }
                if (/^STYLE($|[ \t])/.test(e)) {
                  this.state = 'STYLE';
                  break;
                }
                if (!e) continue;
                if (
                  ((this.cue = new zr.VTTCue(0, 0, '')),
                  (this.state = 'CUE'),
                  !e.includes('--\x3e'))
                ) {
                  this.cue.id = e;
                  continue;
                }
              case 'CUE':
                try {
                  this.parseCue(e, this.cue, this.regionList);
                } catch (Vt) {
                  this.reportOrThrowError(Vt),
                    (this.cue = null),
                    (this.state = 'BADCUE');
                  continue;
                }
                this.state = 'CUETEXT';
                continue;
              case 'CUETEXT': {
                const d = e.includes('--\x3e');
                if (!e || d) {
                  (n = !0),
                    this.oncue && this.oncue(this.cue),
                    (this.cue = null),
                    (this.state = 'ID');
                  continue;
                }
                this.cue.text && (this.cue.text += '\n'), (this.cue.text += e);
                continue;
              }
              case 'BADCUE':
                e || (this.state = 'ID');
                continue;
            }
          }
        } catch (Vt) {
          this.reportOrThrowError(Vt),
            'CUETEXT' === this.state &&
              this.cue &&
              this.oncue &&
              this.oncue(this.cue),
            (this.cue = null),
            (this.state = 'INITIAL' === this.state ? 'BADWEBVTT' : 'BADCUE');
        }
        return this;
      }
      flush() {
        try {
          if (
            ((this.buffer += this.decoder.decode()),
            (this.cue || 'HEADER' === this.state) &&
              ((this.buffer += '\n\n'), this.parse()),
            'INITIAL' === this.state)
          )
            throw new ParsingError(ParsingError.Errors.BadSignature);
        } catch (Vt) {
          this.reportOrThrowError(Vt);
        }
        return this.onflush && this.onflush(), this;
      }
      styles() {
        return this._styles;
      }
    }
    (n.default = WebVTTParser), (n.WebVTTParser = WebVTTParser);
  });
  unwrapExports(Qr), Qr.VTTCue, Qr.VTTRegion, Qr.ParsingError, Qr.WebVTTParser;
  var Jr = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.VTTCue = zr.VTTCue);
    const d = [
        /^(::cue\()(\..*)(\))/,
        /^(::cue\()(#.*)(\))/,
        /^(::cue\()(c|i|b|u|ruby|rt|v|lang)(\))/,
      ],
      h = [
        [1470, 1470],
        [1472, 1472],
        [1475, 1475],
        [1478, 1478],
        [1488, 1514],
        [1520, 1524],
        [1544, 1544],
        [1547, 1547],
        [1549, 1549],
        [1563, 1563],
        [1566, 1610],
        [1645, 1647],
        [1649, 1749],
        [1765, 1766],
        [1774, 1775],
        [1786, 1805],
        [1807, 1808],
        [1810, 1839],
        [1869, 1957],
        [1969, 1969],
        [1984, 2026],
        [2036, 2037],
        [2042, 2042],
        [2048, 2069],
        [2074, 2074],
        [2084, 2084],
        [2088, 2088],
        [2096, 2110],
        [2112, 2136],
        [2142, 2142],
        [2208, 2208],
        [2210, 2220],
        [8207, 8207],
        [64285, 64285],
        [64287, 64296],
        [64298, 64310],
        [64312, 64316],
        [64318, 64318],
        [64320, 64321],
        [64323, 64324],
        [64326, 64449],
        [64467, 64829],
        [64848, 64911],
        [64914, 64967],
        [65008, 65020],
        [65136, 65140],
        [65142, 65276],
        [67584, 67589],
        [67592, 67592],
        [67594, 67637],
        [67639, 67640],
        [67644, 67644],
        [67647, 67669],
        [67671, 67679],
        [67840, 67867],
        [67872, 67897],
        [67903, 67903],
        [67968, 68023],
        [68030, 68031],
        [68096, 68096],
        [68112, 68115],
        [68117, 68119],
        [68121, 68147],
        [68160, 68167],
        [68176, 68184],
        [68192, 68223],
        [68352, 68405],
        [68416, 68437],
        [68440, 68466],
        [68472, 68479],
        [68608, 68680],
        [126464, 126467],
        [126469, 126495],
        [126497, 126498],
        [126500, 126500],
        [126503, 126503],
        [126505, 126514],
        [126516, 126519],
        [126521, 126521],
        [126523, 126523],
        [126530, 126530],
        [126535, 126535],
        [126537, 126537],
        [126539, 126539],
        [126541, 126543],
        [126545, 126546],
        [126548, 126548],
        [126551, 126551],
        [126553, 126553],
        [126555, 126555],
        [126557, 126557],
        [126559, 126559],
        [126561, 126562],
        [126564, 126564],
        [126567, 126570],
        [126572, 126578],
        [126580, 126583],
        [126585, 126588],
        [126590, 126590],
        [126592, 126601],
        [126603, 126619],
        [126625, 126627],
        [126629, 126633],
        [126635, 126651],
        [1114109, 1114109],
      ];
    class StyleBox {
      applyStyles(e, n) {
        n = n || this.div;
        for (const d in e) e.hasOwnProperty(d) && (n.style[d] = e[d]);
      }
      formatStyle(e, n) {
        return 0 === e ? '0' : e + n;
      }
    }
    n.StyleBox = StyleBox;
    class CueStyleBox extends StyleBox {
      constructor(e, n, d, h, p) {
        super(), (this.cue = n);
        let y = {
          textAlign:
            {
              start: 'left',
              'line-left': 'left',
              left: 'left',
              center: 'center',
              middle: 'center',
              'line-right': 'right',
              right: 'right',
              end: 'right',
            }[n.positionAlign] || n.align,
          whiteSpace: 'pre-line',
          position: 'absolute',
        };
        (y.direction = this.determineBidi(this.cueDiv)),
          (y.writingMode = this.directionSettingToWritingMode(n.vertical)),
          (y.unicodeBidi = 'plaintext'),
          (this.div = e.document.createElement('div')),
          this.applyStyles(y),
          (y = { backgroundColor: h.backgroundColor, display: 'inline-block' }),
          this.parseOpacity(y.backgroundColor) &&
            ((y.padding = '5px'), (y.borderRadius = '5px')),
          (this.backgroundDiv = e.document.createElement('div')),
          this.applyStyles(y, this.backgroundDiv),
          (y = {
            color: d.color,
            backgroundColor: d.backgroundColor,
            textShadow: d.textShadow,
            fontSize: d.fontSize,
            fontFamily: d.fontFamily,
            position: 'relative',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            display: 'inline-block',
            textOrientation: 'upright',
          }),
          (y.writingMode = this.directionSettingToWritingMode(n.vertical)),
          (y.unicodeBidi = 'plaintext'),
          (this.cueDiv = qr.default.parseContent(e, n, p)),
          this.applyStyles(y, this.cueDiv),
          this.backgroundDiv.appendChild(this.cueDiv),
          this.div.appendChild(this.backgroundDiv);
        let m = 0;
        if ('number' == typeof n.position) {
          let e = n.positionAlign || n.align;
          if (e)
            switch (e) {
              case 'start':
              case 'left':
                m = n.position;
                break;
              case 'center':
              case 'middle':
                m = n.position - n.size / 2;
                break;
              case 'end':
              case 'right':
                m = n.position - n.size;
            }
        }
        '' === n.vertical
          ? this.applyStyles({
              left: this.formatStyle(m, '%'),
              width: this.formatStyle(n.size, '%'),
            })
          : this.applyStyles({
              top: this.formatStyle(m, '%'),
              height: this.formatStyle(n.size, '%'),
            });
      }
      determineBidi(e) {
        let n,
          d = [],
          p = '';
        if (!e || !e.childNodes) return 'ltr';
        function pushNodes(e, n) {
          for (let d = n.childNodes.length - 1; d >= 0; d--)
            e.push(n.childNodes[d]);
        }
        function nextTextNode(e) {
          if (!e || !e.length) return null;
          let n = e.pop(),
            d = n.textContent || n.innerText;
          if (d) {
            const n = /^.*(\n|\r)/.exec(d);
            return n ? ((e.length = 0), n[0]) : d;
          }
          return 'ruby' === n.tagName
            ? nextTextNode(e)
            : n.childNodes
            ? (pushNodes(e, n), nextTextNode(e))
            : void 0;
        }
        function isContainedInCharacterList(e, n) {
          for (const d of n) if (e >= d[0] && e <= d[1]) return !0;
          return !1;
        }
        for (pushNodes(d, e); (p = nextTextNode(d)); )
          for (let e = 0; e < p.length; e++)
            if (((n = p.charCodeAt(e)), isContainedInCharacterList(n, h)))
              return 'rtl';
        return 'ltr';
      }
      parseOpacity(e) {
        if (!e || 'string' != typeof e) return null;
        const n = (e = e
          .replace(/ /g, '')
          .replace('rgba(', '')
          .replace(')', '')).split(',');
        return n && n.length >= 4 ? n[3] : null;
      }
      directionSettingToWritingMode(e) {
        return '' === e
          ? 'horizontal-tb'
          : 'lr' === e
          ? 'vertical-lr'
          : 'vertical-rl';
      }
      move(e) {
        this.applyStyles({
          top: this.formatStyle(e.top, 'px'),
          bottom: this.formatStyle(e.bottom, 'px'),
          left: this.formatStyle(e.left, 'px'),
          right: this.formatStyle(e.right, 'px'),
          height: this.formatStyle(e.height, 'px'),
          width: this.formatStyle(e.width, 'px'),
        });
      }
    }
    n.CueStyleBox = CueStyleBox;
    class BoxPosition {
      constructor(e) {
        var n;
        let d, h, p, y, m, g;
        if (
          (e instanceof CueStyleBox && e.cue
            ? (n = e.cue) && '' !== n.vertical
              ? (this.property = 'width')
              : (this.property = 'height')
            : e instanceof BoxPosition &&
              (this.property = e.property || 'height'),
          e instanceof CueStyleBox && e.div)
        ) {
          (p = e.div.offsetHeight),
            (y = e.div.offsetWidth),
            (m = e.div.offsetTop);
          const n = e.div.firstChild;
          if (
            ((g = n
              ? n.getBoundingClientRect()
              : e.div.getBoundingClientRect()),
            (d = (g && g[this.property]) || null),
            n && n.firstChild)
          ) {
            const e = n.firstChild;
            if (e && 'string' == typeof e.textContent) {
              h = d / this.calculateNewLines(e.textContent);
            }
          }
        } else e instanceof BoxPosition && (g = e);
        (this.left = g.left),
          (this.right = g.right),
          (this.top = g.top || m),
          (this.height = g.height || p),
          (this.bottom = g.bottom || m + (g.height || p)),
          (this.width = g.width || y),
          (this.lineHeight = null !== d ? d : g.lineHeight),
          (this.singleLineHeight = null !== h ? h : g.singleLineHeight),
          this.singleLineHeight || (this.singleLineHeight = 41);
      }
      calculateNewLines(e) {
        let n = 1;
        for (let d = 0; d < e.length; d++) '\n' === e[d] && n++;
        return n;
      }
      move(e, n) {
        switch (((n = void 0 !== n ? n : this.singleLineHeight), e)) {
          case '+x':
            (this.left += n), (this.right += n);
            break;
          case '-x':
            (this.left -= n), (this.right -= n);
            break;
          case '+y':
            (this.top += n), (this.bottom += n);
            break;
          case '-y':
            (this.top -= n), (this.bottom -= n);
        }
      }
      overlaps(e) {
        return (
          this.left < e.right &&
          this.right > e.left &&
          this.top < e.bottom &&
          this.bottom > e.top
        );
      }
      overlapsAny(e) {
        for (const n of e) if (this.overlaps(n)) return !0;
        return !1;
      }
      within(e) {
        return (
          this.top >= e.top &&
          this.bottom <= e.bottom &&
          this.left >= e.left &&
          this.right <= e.right
        );
      }
      moveIfOutOfBounds(e, n) {
        switch (n) {
          case '+x':
            this.left < e.left &&
              ((this.left = e.left), (this.right = this.left + this.width));
            break;
          case '-x':
            this.right > e.right &&
              ((this.right = e.right), (this.left = this.right - this.width));
            break;
          case '+y':
            this.top < e.top &&
              ((this.top = e.top), (this.bottom = this.top + this.height));
            break;
          case '-y':
            this.bottom > e.bottom &&
              ((this.bottom = e.bottom),
              (this.top = this.bottom - this.height));
        }
      }
      toCSSCompatValues(e) {
        return {
          top: this.top - e.top,
          bottom: e.bottom - this.bottom,
          left: this.left - e.left,
          right: e.right - this.right,
          height: this.height,
          width: this.width,
        };
      }
      static getSimpleBoxPosition(e) {
        let n = null;
        e instanceof StyleBox && e.div
          ? (n = e.div)
          : e instanceof HTMLElement && (n = e);
        let d = n.offsetHeight || 0,
          h = n.offsetWidth || 0,
          p = n.offsetTop || 0,
          y = p + d,
          m = n.getBoundingClientRect();
        const { left: g, right: _ } = m;
        return (
          m.top && (p = m.top),
          m.height && (d = m.height),
          m.width && (h = m.width),
          m.bottom && (y = m.bottom),
          { left: g, right: _, top: p, height: d, bottom: y, width: h }
        );
      }
      static getBoxPosition(e, n) {
        if (e && e.length > 0) {
          let d = 0,
            h = e[0][n];
          for (let p = 0; p < e.length; p++)
            n in ['top', 'right']
              ? e[p][n] > h && ((d = p), (h = e[p][n]))
              : n in ['bottom', 'left'] &&
                e[p][n] < h &&
                ((d = p), (h = e[p][n]));
          return e[d];
        }
        return null;
      }
      static moveToMinimumDistancePlacement(e, n, d) {
        'height' === e.property
          ? '+y' === n
            ? ((e.top = d.topMostBoxPosition.bottom + 0),
              (e.bottom = e.top + e.height))
            : '-y' === n &&
              ((e.bottom = d.bottomMostBoxPosition.top - 0),
              (e.top = e.bottom - e.height))
          : 'width' === e.property &&
            ('+x' === n
              ? ((e.left = d.rightMostBoxPosition.right + 0),
                (e.right = e.left + e.width))
              : '-x' === n &&
                ((e.right = d.leftMostBoxPosition.left - 0),
                (e.left = e.right - e.width)));
      }
      static moveBoxToLinePosition(e, n, d) {
        const h = e.cue;
        let p,
          y = new BoxPosition(e),
          m = (function (e) {
            if (
              'number' == typeof e.line &&
              (e.snapToLines || (e.line >= 0 && e.line <= 100))
            )
              return e.line;
            if (
              !e.track ||
              !e.track.textTrackList ||
              !e.track.textTrackList.mediaElement
            )
              return -1;
            let n = 0;
            const d = e.track,
              h = d.textTrackList;
            for (let p = 0; p < h.length && h[p] !== d; p++)
              'showing' === h[p].mode && n++;
            return -1 * ++n;
          })(h),
          g = [];
        if (h.snapToLines) {
          let e = 0;
          switch (h.vertical) {
            case '':
              (g = ['+y', '-y']), (p = 'height');
              break;
            case 'rl':
              (g = ['+x', '-x']), (p = 'width');
              break;
            case 'lr':
              (g = ['-x', '+x']), (p = 'width');
          }
          const d = y.lineHeight,
            _ = n[p] + d,
            b = g[0];
          if (m < 0) {
            let p = 0;
            switch (h.vertical) {
              case '':
                p = n.height - d - 0.05 * n.height;
                break;
              case 'rl':
              case 'lr':
                p = -n.width + d + 0.05 * n.width;
            }
            (e = p), (g = g.reverse());
          } else {
            switch (h.vertical) {
              case '':
                e = d * Math.round(m);
                break;
              case 'rl':
                e = n.width - d * Math.round(m);
                break;
              case 'lr':
                e = d * Math.round(m);
            }
            Math.abs(e) > _ &&
              ((e = e < 0 ? -1 : 1), (e *= Math.ceil(_ / d) * d));
          }
          y.move(b, e);
        } else {
          const d = '' === h.vertical ? n.height : n.width,
            p = (y.lineHeight / d) * 100;
          switch (h.lineAlign) {
            case 'center':
              m -= p / 2;
              break;
            case 'end':
              m -= p;
          }
          switch (h.vertical) {
            case '':
              e.applyStyles({ top: e.formatStyle(m, '%') });
              break;
            case 'rl':
              e.applyStyles({ right: e.formatStyle(m, '%') });
              break;
            case 'lr':
              e.applyStyles({ left: e.formatStyle(m, '%') });
          }
          (g = ['+y', '-y', '+x', '-x']),
            '+y' === h.axis
              ? (g = ['+y', '-y', '+x', '-x'])
              : '-y' === h.axis && (g = ['-y', '+y', '+x', '-x']),
            (y = new BoxPosition(e));
        }
        const _ = (function (e, h) {
          let p;
          for (let y = 0; y < h.length; y++) {
            e.moveIfOutOfBounds(n, h[y]);
            let m = 0,
              g = !1;
            for (; e.overlapsAny(d) && !(m > 9); )
              g
                ? e.move(h[y])
                : (d &&
                    d.length > 0 &&
                    (p ||
                      (p = {
                        topMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'top'
                        ),
                        bottomMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'bottom'
                        ),
                        leftMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'left'
                        ),
                        rightMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'right'
                        ),
                      }),
                    BoxPosition.moveToMinimumDistancePlacement(e, h[y], p)),
                  (g = !0)),
                m++;
          }
          return e;
        })(y, g);
        e.move(_.toCSSCompatValues(n));
      }
    }
    n.BoxPosition = BoxPosition;
    class WebVTTRenderer {
      constructor(e, n, d = !0) {
        if (!e) return null;
        (this.window = e),
          (this.overlay = n),
          (this.loggingEnabled = d),
          (this.foregroundStyleOptions = {
            fontFamily: 'Helvetica',
            fontSize: '36px',
            color: 'rgba(255, 255, 255, 1)',
            textShadow: '',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }),
          (this.backgroundStyleOptions = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }),
          (this.globalStyleCollection = {});
        const h = e.document.createElement('div');
        (h.style.position = 'absolute'),
          (h.style.left = '0'),
          (h.style.right = '0'),
          (h.style.top = '0'),
          (h.style.bottom = '0'),
          (h.style.margin = '1.5%'),
          (this.paddedOverlay = h),
          n.appendChild(this.paddedOverlay),
          this.initSubtitleCSS();
      }
      initSubtitleCSS() {
        const e = [
          new zr.VTTCue(0, 0, "String to init CSS - Won't be visible to user"),
        ];
        (this.paddedOverlay.style.opacity = '0'),
          this.processCues(e),
          this.processCues([]),
          (this.paddedOverlay.style.opacity = '1');
      }
      convertCueToDOMTree(e) {
        return e
          ? qr.default.parseContent(this.window, e, this.globalStyleCollection)
          : null;
      }
      setStyles(e) {
        function applyStyles(e, n, d) {
          for (const h in n)
            n.hasOwnProperty(h) &&
              ((!0 === d && void 0 !== e[h]) || !1 === d) &&
              (e[h] = n[h]);
        }
        for (const n in e) {
          let h = !1,
            p = null;
          '::cue' === n
            ? ((p = this.foregroundStyleOptions), (h = !0))
            : '::-webkit-media-text-track-display' === n &&
              ((p = this.backgroundStyleOptions), (h = !0));
          const y = e[n];
          if (!0 === h) applyStyles(p, y, h);
          else
            for (let e = 0; e < d.length; e++) {
              const p = d[e].exec(n);
              if (p && 4 === p.length) {
                const e = p[2],
                  n = {};
                applyStyles(n, y, h), (this.globalStyleCollection[e] = n);
              }
            }
        }
        this.initSubtitleCSS(),
          this.loggingEnabled &&
            (console.log(
              'WebVTTRenderer setStyles foregroundStyleOptions: ' +
                JSON.stringify(this.foregroundStyleOptions)
            ),
            console.log(
              'WebVTTRenderer setStyles backgroundStyleOptions: ' +
                JSON.stringify(this.backgroundStyleOptions)
            ),
            console.log(
              'WebVTTRenderer setStyles globalStyleCollection: ' +
                JSON.stringify(this.globalStyleCollection)
            ));
      }
      processCues(e) {
        if (!e) return;
        for (; this.paddedOverlay.firstChild; )
          this.paddedOverlay.removeChild(this.paddedOverlay.firstChild);
        if (
          !(function (e) {
            for (let n = 0; n < e.length; n++)
              if (e[n].hasBeenReset || !e[n].displayState) return !0;
            return !1;
          })(e)
        ) {
          for (let n = 0; n < e.length; n++)
            this.paddedOverlay.appendChild(e[n].displayState);
          return;
        }
        const n = [],
          d = BoxPosition.getSimpleBoxPosition(this.paddedOverlay);
        e.length > 1 &&
          (e = (function (e) {
            const n = [];
            let d = 0;
            for (let h = 0; h < e.length; h++) {
              let p = e[h];
              if ('number' != typeof p.line) return e;
              (d += p.line), n.push(p);
            }
            return (
              (d /= e.length),
              d > 50
                ? (n.forEach(function (e) {
                    e.axis = '-y';
                  }),
                  n.sort((e, n) => n.line - e.line))
                : (n.forEach(function (e) {
                    e.axis = '+y';
                  }),
                  n.sort((e, n) => e.line - n.line)),
              n
            );
          })(e));
        for (let h = 0; h < e.length; h++) {
          let p = e[h],
            y = new CueStyleBox(
              this.window,
              p,
              this.foregroundStyleOptions,
              this.backgroundStyleOptions,
              this.globalStyleCollection
            );
          this.paddedOverlay.appendChild(y.div),
            BoxPosition.moveBoxToLinePosition(y, d, n),
            (p.displayState = y.div),
            n.push(BoxPosition.getSimpleBoxPosition(y));
        }
      }
      setSize(e, n) {
        e && (this.overlay.style.width = e + 'px'),
          n && (this.overlay.style.height = n + 'px');
      }
      getOverlay() {
        return this.overlay;
      }
    }
    (n.default = WebVTTRenderer), (n.WebVTTRenderer = WebVTTRenderer);
  });
  unwrapExports(Jr),
    Jr.VTTCue,
    Jr.StyleBox,
    Jr.CueStyleBox,
    Jr.BoxPosition,
    Jr.WebVTTRenderer;
  var Xr = createCommonjsModule(function (e, n) {
    function __export(e) {
      for (var d in e) n.hasOwnProperty(d) || (n[d] = e[d]);
    }
    Object.defineProperty(n, '__esModule', { value: !0 }),
      __export(Qr),
      __export(Jr);
  });
  unwrapExports(Xr);
  var Zr = Xr.WebVTTRenderer;
  class TrackManagerStub {
    get currentTrack() {
      return {};
    }
    set currentTrack(e) {}
    get tracks() {
      return [];
    }
    destroy() {}
    restoreSelectedTrack() {}
  }
  const {
      audioTrackAdded: es,
      audioTrackChanged: ts,
      forcedTextTrackChanged: is,
      textTrackAdded: rs,
      textTrackChanged: ss,
      textTrackRemoved: ns,
    } = St,
    {
      textTracksSwitched: as,
      textTracksUpdated: ds,
      inlineStylesParsed: ls,
    } = tt;
  class TextTrackManager {
    constructor(e, n, d) {
      (this.mediaElement = e),
        (this.dispatcher = n),
        (this.extensionTracks = d),
        (this._tracks = []),
        (this.trackPersistence = new TrackPersistence('mk-text-track', [
          'label',
          'language',
          'kind',
        ]));
      const h = this.trackPersistence.getPersistedTrack();
      if (
        (this._tracks.push({
          id: -2,
          label: 'Off',
          language: '',
          kind: 'subtitles',
          mode: !h || this.isTrackOff(h) ? 'showing' : 'disabled',
        }),
        this.extensionTracks)
      ) {
        M.debug(
          'MEDIA_TRACK Initializing text track manager for HLS.js track events'
        );
        const n = e.parentElement;
        (this.renderer = new Zr(window, n, !1)),
          this.renderer.setStyles({ '::cue': { fontSize: 'calc(1vw + 1em)' } }),
          (this.onExtensionTextTracksAdded =
            this.onExtensionTextTracksAdded.bind(this)),
          (this.onExtensionTextTrackSwitched =
            this.onExtensionTextTrackSwitched.bind(this)),
          (this.onExtensionInlineStylesParsed =
            this.onExtensionInlineStylesParsed.bind(this)),
          (this.onCueChange = this.onCueChange.bind(this));
        const d = this.extensionTracks;
        d.addEventListener(ds, this.onExtensionTextTracksAdded),
          d.addEventListener(as, this.onExtensionTextTrackSwitched),
          d.addEventListener(ls, this.onExtensionInlineStylesParsed);
      } else M.debug('MEDIA_TRACK Initializing text track manager for native track events'), (this.onTextTrackAdded = this.onTextTrackAdded.bind(this)), (this.onTextTrackChanged = this.onTextTrackChanged.bind(this)), (this.onTextTrackRemoved = this.onTextTrackRemoved.bind(this)), (this.onPlayStart = this.onPlayStart.bind(this)), e.textTracks.addEventListener('addtrack', this.onTextTrackAdded), e.textTracks.addEventListener('change', this.onTextTrackChanged), e.textTracks.addEventListener('removetrack', this.onTextTrackRemoved), e.addEventListener('playing', this.onPlayStart);
      (this.onAudioTrackAddedOrChanged = debounce(
        this.onAudioTrackAddedOrChanged.bind(this)
      )),
        n.subscribe(ts, this.onAudioTrackAddedOrChanged),
        n.subscribe(es, this.onAudioTrackAddedOrChanged);
    }
    get currentTrack() {
      return this.tracks.find((e) => 'showing' === e.mode);
    }
    set currentTrack(e) {
      if (!e) return;
      let n;
      this.trackPersistence.setPersistedTrack(e),
        this.extensionTracks
          ? (M.debug('MEDIA_TRACK Setting track on extension ' + e.label),
            'Off' === e.label
              ? (this.clearCurrentlyPlayingTrack(),
                (n = this.extensionTracks.selectForcedTrack()),
                void 0 === n && this.onExtensionTextTrackSwitched({ track: e }))
              : (this.extensionTracks.textTrack = e))
          : (M.debug('MEDIA_TRACK Setting track on element ' + e.label),
            this._tracks.forEach((n) => {
              n !== e && 'showing' === n.mode && (n.mode = 'disabled');
            }),
            e &&
              (M.debug(
                'MEDIA_TRACK setting track mode to showing for ' + e.label
              ),
              this.isTrackOff(e)
                ? ((this._tracks[0].mode = 'showing'),
                  (n = this.selectNativeForcedTrack(
                    this.mediaElement.audioTracks
                  )))
                : (e.mode = 'showing'))),
        this.dispatcher.publish(St.forcedTextTrackChanged, n);
    }
    get tracks() {
      return this._tracks;
    }
    destroy() {
      if ((this.clearCurrentlyPlayingTrack(), this.extensionTracks)) {
        const e = this.extensionTracks;
        e.removeEventListener(ds, this.onExtensionTextTracksAdded),
          e.removeEventListener(as, this.onExtensionTextTrackSwitched),
          e.removeEventListener(ls, this.onExtensionInlineStylesParsed);
      } else this.mediaElement.textTracks.removeEventListener('addtrack', this.onTextTrackAdded), this.mediaElement.textTracks.removeEventListener('change', this.onTextTrackChanged), this.mediaElement.textTracks.removeEventListener('removetrack', this.onTextTrackRemoved), this.mediaElement.removeEventListener('playing', this.onPlayStart);
      this.dispatcher.unsubscribe(ts, this.onAudioTrackAddedOrChanged),
        this.dispatcher.unsubscribe(es, this.onAudioTrackAddedOrChanged);
    }
    restoreSelectedTrack() {
      return restoreSelectedTrack(this.trackPersistence, this);
    }
    onExtensionInlineStylesParsed(e) {
      M.debug('MEDIA_TRACK Extension inline styles parsed', e),
        this.renderer.setStyles(e.styles);
    }
    onExtensionTextTracksAdded(e) {
      M.debug('MEDIA_TRACK Extension text tracks updated ' + JSON.stringify(e)),
        this._tracks.push(...e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(rs, e);
    }
    onExtensionTextTrackSwitched(e) {
      M.debug('MEDIA_TRACKS Extension text track switched ' + e),
        this.handleVTT(e);
      const n = e.track;
      if (this._tracks) {
        const preserveSelectedTrack = (d) => {
          e.track
            ? (n.forced && 'Off' === d.label) ||
              ('Off' === n.label && 'Off' === d.label)
              ? (d.mode = 'showing')
              : (d.mode =
                  e.track.persistentID === d.id ? 'showing' : 'disabled')
            : (d.mode = 'Off' === d.label ? 'showing' : 'disabled');
        };
        this._tracks.forEach(preserveSelectedTrack);
      }
      this.dispatcher.publish(ss, e);
    }
    handleVTT(e) {
      const n = e && e.track && e.track.id;
      if (void 0 !== n && n >= 0) {
        const e = this.filterSelectableTextTracks(this.mediaElement.textTracks)[
          n
        ];
        this.onNativeTrackChange(e);
      } else this.clearCurrentlyPlayingTrack();
    }
    onAudioTrackAddedOrChanged(e, n) {
      if (
        (M.debug('MEDIA_TRACKS text track manager detects audio track change'),
        this.shouldForceSubtitle())
      )
        if (this.extensionTracks) {
          M.debug('MEDIA_TRACKS selecting forced text track via extension');
          const e = this.extensionTracks.selectForcedTrack();
          e
            ? this.dispatcher.publish(is, e)
            : this.clearCurrentlyPlayingTrack();
        } else
          M.debug('MEDIA_TRACKS selecting forced text track natively'),
            (this.currentTrack = this._tracks[0]);
    }
    onTextTrackAdded(e) {
      this._tracks.push(e.track), this.dispatcher.publish(rs, e);
    }
    onPlayStart() {
      this.restoreSelectedTrack();
    }
    onTextTrackRemoved(e) {
      this.dispatcher.publish(ns, e);
    }
    onTextTrackChanged(e) {
      const n = this.findNativeSelectedTextTrack();
      let d = this.trackPersistence.getPersistedTrack();
      if (
        (d || (d = this._tracks[0]),
        n && !trackEquals(n, d, this.trackPersistence.fields))
      )
        if (this.isTrackOff(d) && 'forced' !== n.kind) this.currentTrack = d;
        else {
          const e = this.findNativeTrack(d);
          e && (this.currentTrack = e);
        }
      else this.dispatcher.publish(ss, e);
    }
    findNativeSelectedTextTrack() {
      for (let e = 0; e < this.mediaElement.textTracks.length; e++) {
        const n = this.mediaElement.textTracks[e];
        if ('showing' === n.mode) return n;
      }
    }
    findNativeTrack(e) {
      for (let n = 0; n < this.mediaElement.textTracks.length; n++) {
        const d = this.mediaElement.textTracks[n];
        if (trackEquals(d, e, this.trackPersistence.fields)) return d;
      }
    }
    selectNativeForcedTrack(e) {
      for (let n = 0; n < e.length; n++) {
        const d = e[n];
        if (d.enabled) {
          const e = this.findNativeForcedTrack(d);
          return e && 'showing' !== e.mode && (e.mode = 'showing'), e;
        }
      }
    }
    findNativeForcedTrack(e) {
      const n = this.mediaElement.textTracks;
      for (let d = 0; d < n.length; d++) {
        const h = n[d];
        if ('forced' === h.kind && h.language === e.language) return h;
      }
    }
    onNativeTrackChange(e) {
      this.clearCurrentlyPlayingTrack(),
        (this._currentlyPlayingTrack = e),
        e.addEventListener('cuechange', this.onCueChange);
    }
    clearCurrentlyPlayingTrack() {
      var e;
      void 0 !== this._currentlyPlayingTrack &&
        'string' == typeof (e = this._currentlyPlayingTrack).id &&
        'removeEventListener' in e &&
        (this._currentlyPlayingTrack.removeEventListener(
          'cuechange',
          this.onCueChange
        ),
        this.renderer.processCues({}),
        delete this._currentlyPlayingTrack);
    }
    onCueChange(e) {
      const n = e && e.target && e.target.activeCues;
      n && this.renderer.processCues(n);
    }
    filterSelectableTextTracks(e) {
      const n = [];
      for (let d = 0; d < e.length; d++) {
        const h = e[d];
        ('captions' === h.kind ||
          'subtitles' === h.kind ||
          ('metadata' === h.kind && h.customTextTrackCueRenderer)) &&
          n.push(h);
      }
      return n;
    }
    shouldForceSubtitle() {
      M.debug('MEDIA_TRACKS Determining whether to select forced text track');
      const e = this.trackPersistence.getPersistedTrack();
      return !e || this.isTrackOff(e);
    }
    isTrackOff(e) {
      return 'Off' === e.label || 'Auto' === e.label;
    }
  }
  const cs = {
      'picture-in-picture': e.PresentationMode.pictureinpicture,
      inline: e.PresentationMode.inline,
    },
    us = {};
  (us[e.PresentationMode.pictureinpicture] = 'picture-in-picture'),
    (us[e.PresentationMode.inline] = 'inline');
  const { presentationModeDidChange: hs } = St,
    { playbackLicenseError: ps } = tt,
    { stopped: ys } = e.PlaybackStates;
  class VideoPlayer extends BasePlayer {
    constructor(e) {
      super(e),
        (this.mediaPlayerType = 'video'),
        (this._textTrackManager = new TrackManagerStub()),
        (this._audioTrackManager = new TrackManagerStub()),
        (this._shouldLoadManifestsOnce = !1),
        (this.userInitiated = !1),
        (this.restrictPlatforms =
          !('restrict-platforms' in Qe.features) ||
          Qe.features['restrict-platforms']),
        (this.pipEventHandler = this.pipEventHandler.bind(this)),
        (this._shouldLoadManifestsOnce = shouldLoadManifestOnce());
    }
    get audioTracks() {
      return this._audioTrackManager.tracks;
    }
    get containerElement() {
      return this._context.videoContainerElement
        ? this._context.videoContainerElement
        : document.getElementById('apple-music-video-container');
    }
    get currentAudioTrack() {
      return this._audioTrackManager.currentTrack;
    }
    set currentAudioTrack(e) {
      this._audioTrackManager.currentTrack = e;
    }
    get currentTextTrack() {
      return this._textTrackManager.currentTrack;
    }
    set currentTextTrack(e) {
      this._textTrackManager.currentTrack = e;
    }
    get _targetElement() {
      return this.video || Object.assign({}, document.createElement('video'));
    }
    get textTracks() {
      return this._textTrackManager.tracks;
    }
    initializeExtension() {
      return __awaiter(this, void 0, void 0, function* () {
        this.restrictPlatforms && ze.isAndroid
          ? M.warn(
              'videoPlayer.initializeExtension Not supported on the current platform'
            )
          : this.video ||
            M.warn(
              'videoPlayer.initializeExtension No video element, not initializing extension'
            );
      });
    }
    onPlaybackLicenseError(e) {
      this._licenseError(), this._dispatcher.publish(ps, e);
    }
    setupTrackManagers(e) {
      var n, d, h, p;
      null ===
        (d =
          null === (n = this._textTrackManager) || void 0 === n
            ? void 0
            : n.destroy) ||
        void 0 === d ||
        d.call(n),
        (this._textTrackManager = new TextTrackManager(
          this._targetElement,
          this._dispatcher,
          e
        )),
        null ===
          (p =
            null === (h = this._audioTrackManager) || void 0 === h
              ? void 0
              : h.destroy) ||
          void 0 === p ||
          p.call(h),
        (this._audioTrackManager = new AudioTrackManager(
          this._targetElement,
          this._dispatcher,
          e
        ));
    }
    destroy() {
      this._textTrackManager.destroy(),
        this._audioTrackManager.destroy(),
        super.destroy();
    }
    initializeEventHandlers() {
      const e = Object.create(null, {
        initializeEventHandlers: { get: () => super.initializeEventHandlers },
      });
      return __awaiter(this, void 0, void 0, function* () {
        e.initializeEventHandlers.call(this),
          this.hasMediaElement &&
            (this._targetElement.addEventListener(
              'webkitpresentationmodechanged',
              this.pipEventHandler
            ),
            this._targetElement.addEventListener(
              'enterpictureinpicture',
              this.pipEventHandler
            ),
            this._targetElement.addEventListener(
              'leavepictureinpicture',
              this.pipEventHandler
            ));
      });
    }
    removeEventHandlers() {
      if ((super.removeEventHandlers(), !this.hasMediaElement)) return;
      const { _targetElement: e } = this;
      e.removeEventListener(
        'webkitpresentationmodechanged',
        this.pipEventHandler
      ),
        e.removeEventListener('enterpictureinpicture', this.pipEventHandler),
        e.removeEventListener('leavepictureinpicture', this.pipEventHandler);
    }
    initializeMediaElement() {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug(
          'videoPlayer.initializeMediaElement Initializing media element'
        );
        const e = this.containerElement;
        e
          ? ((this.video = (function () {
              let e = Ze.pop();
              return (
                e
                  ? M.debug(
                      `dom-helpers: retrieving video tag, ${Ze.length} remain`
                    )
                  : (M.debug(
                      'dom-helpers: no available video tags, creating one'
                    ),
                    (e = document.createElement('video'))),
                e
              );
            })()),
            (this.video.autoplay = !1),
            (this.video.controls = !1),
            (this.video.playsInline = !0),
            (this.video.id = 'apple-music-video-player'),
            e.appendChild(this.video))
          : M.warn(
              'videoPlayer.initializeMediaElement No video element; no container defined'
            );
      });
    }
    isPlayerSupported() {
      return Browser.supportsEs6();
    }
    _stopMediaElement() {
      const e = Object.create(null, {
        _stopMediaElement: { get: () => super._stopMediaElement },
      });
      return __awaiter(this, void 0, void 0, function* () {
        yield e._stopMediaElement.call(this), this.destroy();
      });
    }
    pipEventHandler(n) {
      switch (n.type) {
        case 'enterpictureinpicture':
          this._dispatcher.publish(hs, {
            mode: e.PresentationMode.pictureinpicture,
          });
          break;
        case 'leavepictureinpicture':
          this._dispatcher.publish(hs, { mode: e.PresentationMode.inline });
          break;
        case 'webkitpresentationmodechanged': {
          const e = this._targetElement;
          this._dispatcher.publish(hs, {
            mode: this._translateStringToPresentationMode(
              e.webkitPresentationMode
            ),
          });
          break;
        }
      }
    }
    playItemFromEncryptedSource(n, d = !1, h) {
      return __awaiter(this, void 0, void 0, function* () {
        if (
          (M.debug('videoPlayer.playItemFromEncryptedSource', n, d),
          this.playbackState === ys)
        )
          return void M.debug(
            'video-player.playItemFromEncryptedSource aborting playback because player is stopped'
          );
        (n.playbackType = e.PlaybackType.encryptedFull),
          (this.nowPlayingItem = n),
          (n.state = N.loading),
          (this.userInitiated = d);
        const p = generateAssetUrl(n, h);
        this.playHlsStream(p, n);
      });
    }
    playItemFromUnencryptedSource(e, n, d) {
      return __awaiter(this, void 0, void 0, function* () {
        if (
          (M.debug('videoPlayer.playItemFromUnencryptedSource', e, n),
          this.playbackState === ys)
        )
          return void M.debug(
            'videoPlayer.playItemFromUnencryptedSource aborting playback because player is stopped'
          );
        const [d] = e.split('?');
        return d.endsWith('m3u') || d.endsWith('m3u8')
          ? void this.playHlsStream(e)
          : this._playAssetURL(e, n);
      });
    }
    setPresentationMode(n) {
      return __awaiter(this, void 0, void 0, function* () {
        const d = this._targetElement;
        if (
          d.webkitSupportsPresentationMode &&
          'function' == typeof d.webkitSetPresentationMode
        )
          return d.webkitSetPresentationMode(
            this._translatePresentationModeToString(n)
          );
        if (d.requestPictureInPicture && document.exitPictureInPicture) {
          if (n === e.PresentationMode.pictureinpicture)
            return d.requestPictureInPicture();
          if (n === e.PresentationMode.inline)
            return document.exitPictureInPicture();
        }
      });
    }
    _translateStringToPresentationMode(n) {
      let d = cs[n];
      return (
        void 0 === d &&
          (M.warn(
            `videoPlayer._translateStringToPresentationMode ${n} is not a valid presentation mode, setting to inline`
          ),
          (d = e.PresentationMode.inline)),
        d
      );
    }
    _translatePresentationModeToString(e) {
      let n = us[e];
      return (
        void 0 === n &&
          (M.warn(
            `videoPlayer._translatePresentationModeToString ${e} is not a valid presentation mode, setting to inline`
          ),
          (n = 'inline')),
        n
      );
    }
    setNextSeamlessItem(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0),
    ],
    VideoPlayer.prototype,
    'onPlaybackLicenseError',
    null
  );
  const decayingOperation = (e, n, d, h = 0) =>
    e().catch((p) => {
      const y = h + 1;
      function possiblyRetry(h) {
        if (h && y < 3) {
          const h = 1e3 * y;
          return (
            M.debug(`trying again in ${h}ms for ${d}`),
            new Promise((p, m) => {
              setTimeout(() => {
                decayingOperation(e, n, d, y).then(p, m);
              }, h);
            })
          );
        }
        throw p;
      }
      const m = n(p);
      return 'boolean' == typeof m ? possiblyRetry(m) : m.then(possiblyRetry);
    });
  let ms = {
    developerToken: 'developerTokenNotSet',
    musicUserToken: 'musicUserTokenNotSet',
    cid: 'cidNotSet',
  };
  function createHlsOffersLicenseChallengeBody(e) {
    return { 'adam-id': e.id, id: 1 };
  }
  function createStreamingKeysLicenseChallengeBody(e, n, d = 0) {
    var h;
    const p =
      null !== (h = e.keyServerQueryParameters) && void 0 !== h ? h : {};
    return Object.assign({ id: d, 'lease-action': n }, p);
  }
  function createLicenseChallengeBody(e, n, d, h, p, y) {
    let m;
    const g = {
      challenge: h.challenge || yt(h.licenseChallenge),
      'key-system': p,
      uri: h.keyuri,
    };
    return (
      (m = d.isUTS
        ? e.startsWith(
            'https://play.itunes.apple.com/WebObjects/MZPlay.woa/web/video/subscription/license'
          )
          ? Object.assign(
              Object.assign({}, g),
              (function (e, n = 'start') {
                return {
                  'extra-server-parameters': e.keyServerQueryParameters,
                  'license-action': n,
                };
              })(d, n)
            )
          : {
              'streaming-request': {
                version: 1,
                'streaming-keys': [
                  Object.assign(
                    Object.assign({}, g),
                    createStreamingKeysLicenseChallengeBody(d, n)
                  ),
                ],
              },
            }
        : d.isLiveRadioStation
        ? Object.assign(
            Object.assign({}, g),
            (function (e) {
              return { event: e.isLiveAudioStation ? 'beats1' : 'amtv' };
            })(d)
          )
        : d.hasOffersHlsUrl
        ? {
            'license-requests': [
              Object.assign(
                Object.assign({}, g),
                createHlsOffersLicenseChallengeBody(d)
              ),
            ],
          }
        : Object.assign(
            Object.assign({}, g),
            (function (e, n = !1) {
              return {
                adamId: e.songId,
                isLibrary: e.isCloudItem,
                'user-initiated': n,
              };
            })(d, y)
          )),
      m
    );
  }
  class License {
    fetch(e) {
      const n = {
        Authorization: 'Bearer ' + ms.developerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Apple-Music-User-Token': '' + ms.musicUserToken,
      };
      this.keySystem === Ge.WIDEVINE && (n['X-Apple-Renewal'] = !0);
      const d = new Headers(n);
      return decayingOperation(
        () =>
          fetch(this.licenseUrl, {
            method: 'POST',
            body: JSON.stringify(e),
            headers: d,
          }),
        (e) => e instanceof TypeError,
        'license fetch'
      );
    }
    reset() {
      (this.licenseUrl = void 0),
        (this.playableItem = void 0),
        (this.data = void 0),
        (this.initiated = void 0),
        (this.keySystem = void 0),
        (this.startResponse = void 0);
    }
    start(e, n, d, h, p = !1) {
      var y, m, g, _;
      return __awaiter(this, void 0, void 0, function* () {
        (this.licenseUrl = e),
          (this.playableItem = n),
          (this.data = d),
          (this.keySystem = h),
          (this.initiated = p);
        const b = d.isRenewalRequest ? 'renew' : 'start',
          T = createLicenseChallengeBody(e, b, n, d, h, p);
        n.hasOffersHlsUrl && (this.licenseUrl += '/' + b),
          (this.startResponse = this.fetch(T));
        try {
          const e = yield this.startResponse;
          if (!e.ok) {
            let n;
            try {
              n = yield e.json();
            } catch (Vt) {}
            this.processJsonError(n);
          }
          const n = yield e.json();
          let d = n;
          return (
            (
              null ===
                (m =
                  null === (y = null == n ? void 0 : n['streaming-response']) ||
                  void 0 === y
                    ? void 0
                    : y['streaming-keys']) || void 0 === m
                ? void 0
                : m.length
            )
              ? (d = n['streaming-response']['streaming-keys'][0])
              : (null === (g = null == n ? void 0 : n['license-responses']) ||
                void 0 === g
                  ? void 0
                  : g.length) && (d = n['license-responses'][0]),
            (d.status =
              null !== (_ = d.status) && void 0 !== _ ? _ : d.errorCode),
            0 !== d.status && this.processJsonError(d),
            d
          );
        } catch (H) {
          throw ((this.startResponse = void 0), H);
        }
      });
    }
    processJsonError(e) {
      let n = new MKError(MKError.MEDIA_LICENSE, 'Error acquiring license');
      if (
        ((null == e ? void 0 : e.errorCode) && (e.status = e.errorCode),
        e && 0 !== e.status)
      ) {
        if (!e.message)
          switch (e.status) {
            case -1004:
              e.message = MKError.DEVICE_LIMIT;
              break;
            case -1017:
              e.message = MKError.GEO_BLOCK;
              break;
            default:
              e.message = MKError.MEDIA_LICENSE;
          }
        (n = MKError.serverError(e)),
          (n.data = e),
          n.errorCode === MKError.PLAYREADY_CBC_ENCRYPTION_ERROR &&
            (function () {
              const e = getSessionStorage();
              e && e.setItem('mk-playready-cbcs-unsupported', 'true');
            })();
      }
      throw n;
    }
    stop() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.startResponse)
          try {
            yield this.startResponse;
          } catch (H) {}
        if (!this.playableItem || !this.data || !this.licenseUrl) return;
        if (!this.playableItem.isUTS) return;
        const e = createLicenseChallengeBody(
            this.licenseUrl,
            'stop',
            this.playableItem,
            this.data,
            this.keySystem,
            this.initiated
          ),
          n = this.fetch(e);
        this.reset();
        try {
          yield n;
        } catch (H) {
          M.warn('license.stop request error', H);
        }
      });
    }
  }
  class KeySession extends Notifications {
    constructor() {
      super([tt.playbackLicenseError, tt.playbackSessionError]),
        (this.initiated = !0),
        (this.isLibrary = !1),
        (this.keySystem = Ge.FAIRPLAY),
        (this.mediaKeySessions = {}),
        (this.boundDispatchKeyError = this.dispatchKeyError.bind(this)),
        (this.boundDispatchSessionError = this.dispatchSessionError.bind(this)),
        (this.boundHandleSessionCreation =
          this.handleSessionCreation.bind(this)),
        (this.boundStartLicenseSession = this.startLicenseSession.bind(this)),
        (this.license = new License());
    }
    get extID() {
      if (this.extURI) return this.extURI.replace('data:;base64,', '');
    }
    get isFairplay() {
      return this.keySystem === Ge.FAIRPLAY;
    }
    get isPlayReady() {
      return this.keySystem === Ge.PLAYREADY;
    }
    get isWidevine() {
      return this.keySystem === Ge.WIDEVINE;
    }
    acquirePlaybackLicense(e, n, d, h) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this.keyServerURL || !this.developerToken || !this.userToken)
          return;
        const { keyServerURL: d, keySystem: p } = this;
        try {
          return yield this.license.start(
            d,
            h.item,
            { challenge: n, keyuri: e },
            p,
            this.initiated
          );
        } catch (Vt) {
          this.dispatchEvent(tt.playbackLicenseError, Vt);
        }
      });
    }
    startLicenseSession(e) {
      let n;
      M.debug('Starting License Session', e);
      const { message: d, target: h, messageType: p } = e;
      if (this.keySystem !== Ge.FAIRPLAY && 'license-request' !== p)
        return void M.debug('not making license request for', p);
      if (this.isPlayReady) {
        const e = String.fromCharCode.apply(
          null,
          new Uint16Array(d.buffer || d)
        );
        n = new DOMParser()
          .parseFromString(e, 'application/xml')
          .getElementsByTagName('Challenge')[0].childNodes[0].nodeValue;
      } else n = yt(new Uint8Array(d));
      const y = h.extURI || this.extURI,
        m = this.mediaKeySessions[y];
      if (m)
        return this.acquirePlaybackLicense(y, n, this.initiated, m).then((e) =>
          this.handleLicenseJson(e, h, y)
        );
      M.debug('no key session info, aborting license request');
    }
    setKeyURLs(e) {
      (this.keyCertURL =
        e[this.isFairplay ? 'hls-key-cert-url' : 'widevine-cert-url']),
        (this.keyServerURL = e['hls-key-server-url']);
    }
    dispatchKeyError(e) {
      var n, d;
      this.isFairplay &&
      4294955417 ===
        (null ===
          (d =
            null === (n = null == e ? void 0 : e.target) || void 0 === n
              ? void 0
              : n.error) || void 0 === d
          ? void 0
          : d.systemCode)
        ? M.error('Ignoring error', e)
        : (console.error(MKError.MEDIA_KEY + ' error in dispatchKeyError:', e),
          this.dispatchEvent(
            tt.playbackSessionError,
            new MKError(MKError.MEDIA_KEY, e)
          ));
    }
    dispatchSessionError(e) {
      this.dispatchEvent(
        tt.playbackSessionError,
        new MKError(MKError.MEDIA_SESSION, e)
      );
    }
    loadCertificateBuffer() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this.keyCertURL)
          return Promise.reject(
            new MKError(MKError.MEDIA_SESSION, 'No certificate URL')
          );
        const e = yield fetch(`${this.keyCertURL}?t=${Date.now()}`),
          n = yield e.arrayBuffer(),
          d = String.fromCharCode.apply(String, new Uint8Array(n));
        return /^\<\?xml/.test(d)
          ? Promise.reject(
              new MKError(MKError.MEDIA_CERTIFICATE, 'Invalid certificate.')
            )
          : n;
      });
    }
    handleSessionCreation(e) {
      return __awaiter(this, void 0, void 0, function* () {
        return this.createSession(e).catch((e) => {
          this.dispatchSessionError(e);
        });
      });
    }
    handleLicenseJson(e, n, d) {
      return __awaiter(this, void 0, void 0, function* () {
        if (
          (M.debug(`updating session ${d} with license response`, e),
          null == e ? void 0 : e.license)
        ) {
          const d = ut(e.license);
          try {
            yield n.update(d);
          } catch (Vt) {
            M.error('Failed to updated media keys', Vt),
              this.dispatchKeyError(Vt);
          }
        }
      });
    }
    addMediaKeySessionInfo(e, n, d) {
      const h = this.mediaKeySessions[e];
      h
        ? (M.debug(
            `keySession info exists for ${d.title}, making existing session ${h.session.sessionId} the old session`
          ),
          (h.oldSession = h.session),
          (h.session = n))
        : (M.debug('creating key session info for ' + d.title),
          (this.mediaKeySessions[e] = { session: n, item: d }));
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0),
    ],
    KeySession.prototype,
    'startLicenseSession',
    null
  );
  class FairplayEncryptedSession extends KeySession {
    constructor() {
      super(...arguments),
        (this._mediaKeySessions = {}),
        (this._mediaKeySessionRenewals = {});
    }
    attachMedia(e, n) {
      return __awaiter(this, void 0, void 0, function* () {
        (this.keySystem = n.keySystem),
          (this._keySystemAccess = n),
          e.addEventListener('encrypted', this.boundHandleSessionCreation, !1);
      });
    }
    detachMedia(e) {
      e.removeEventListener('encrypted', this.boundHandleSessionCreation);
      const n = this._mediaKeySessions,
        d = this._mediaKeySessionRenewals;
      Object.values(n).forEach((e) => {
        e.removeEventListener('message', this.boundStartLicenseSession),
          asAsync(e.close());
      }),
        (this._mediaKeySessions = {}),
        Object.values(d).forEach((e) => clearTimeout(e)),
        (this._mediaKeySessionRenewals = {});
    }
    createSession(e) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('fairplay eme:  createSession', e);
        const n = this._keySystemAccess;
        if (!n) return;
        const { initData: d, target: h, initDataType: p } = e;
        this._mediaKeysPromise ||
          (this._mediaKeysPromise = new Promise((e, d) =>
            __awaiter(this, void 0, void 0, function* () {
              const p = yield n.createMediaKeys();
              try {
                yield h.setMediaKeys(p), (this._mediaKeys = p);
                const e = yield this.loadCertificateBuffer();
                yield p.setServerCertificate(e);
              } catch (H) {
                this.dispatchKeyError(H), d(H);
              }
              e(p);
            })
          ));
        const y = yield this._mediaKeysPromise,
          m = new Uint8Array(d),
          g = String.fromCharCode.apply(void 0, Array.from(m));
        if (this.mediaKeySessions[g])
          return void M.error(
            'fairplay eme: not creating new session for extURI',
            g
          );
        const _ = y.createSession();
        M.debug('fairplay eme: creating new key session for', g),
          this.addMediaKeySessionInfo(g, _, this.item),
          _.addEventListener('message', this.startFairplayLicenseSession),
          (_.extURI = g),
          yield _.generateRequest(p, d),
          (this._mediaKeySessions[_.sessionId] = _),
          M.debug('fairplay eme: created session', _);
      });
    }
    startFairplayLicenseSession(e) {
      const { message: n, target: d } = e,
        h = yt(new Uint8Array(n)),
        p = d.extURI || this.extURI,
        y = this.mediaKeySessions[p];
      if (y)
        return this.acquirePlaybackLicense(p, h, this.initiated, y).then((e) =>
          this.handleLicenseJson(e, d, p)
        );
      M.debug('fairplay eme: no key session info, aborting license request', p);
    }
    handleLicenseJson(e, n, d) {
      const h = Object.create(null, {
        handleLicenseJson: { get: () => super.handleLicenseJson },
      });
      return __awaiter(this, void 0, void 0, function* () {
        if (!e) return;
        const p = this.mediaKeySessions[d];
        if (!p)
          return void M.debug(
            'fairplay eme: media key session does not exist, not updating'
          );
        const y = e['renew-after'];
        if (e.license && y) {
          M.debug('fairplay eme: got renew after value', y, d);
          const e = this._mediaKeySessionRenewals,
            h = e[n.sessionId];
          h && clearTimeout(h),
            (e[n.sessionId] = setTimeout(
              () => this._renewMediaKeySession(p, d),
              1e3 * y
            ));
        }
        yield h.handleLicenseJson.call(this, e, n, d);
      });
    }
    _renewMediaKeySession(e, n) {
      delete this._mediaKeySessionRenewals[e.session.sessionId],
        M.debug('fairplay eme: renewing session', e),
        e.session.update(ht('renew'));
    }
    loadKeys(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    clearSessions() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0),
    ],
    FairplayEncryptedSession.prototype,
    'startFairplayLicenseSession',
    null
  );
  const gs = /^(?:.*)(skd:\/\/.+)$/i;
  class WebKitSession extends KeySession {
    attachMedia(e, n) {
      return (
        (this.target = e),
        e.addEventListener(
          'webkitneedkey',
          this.boundHandleSessionCreation,
          !1
        ),
        e.addEventListener('webkitkeyerror', this.boundDispatchKeyError),
        e
      );
    }
    detachMedia(e) {
      e &&
        (e.removeEventListener(
          'webkitneedkey',
          this.boundHandleSessionCreation,
          !1
        ),
        e.removeEventListener('webkitkeyerror', this.boundDispatchKeyError));
    }
    destroy() {
      M.debug('FPS destroy'),
        this.detachMedia(this.target),
        this.session &&
          (this.session.removeEventListener(
            'webkitkeyerror',
            this.boundDispatchKeyError
          ),
          this.session.removeEventListener(
            'webkitkeymessage',
            this.boundStartLicenseSession
          ));
    }
    createSession(e) {
      M.debug('FPS createSession', e);
      const { initData: n, target: d } = e,
        { item: h } = this;
      if (!h)
        return M.error('Cannot createSession without item'), Promise.resolve();
      const p = this._extractAssetId(n);
      if ((M.debug('extURI', p), !d.webkitKeys && window.WebKitMediaKeys)) {
        const e = new window.WebKitMediaKeys(this.keySystem);
        d.webkitSetMediaKeys(e);
      }
      return this.loadCertificateBuffer().then((e) => {
        const y = this._concatInitDataIdAndCertificate(n, p, e),
          m = 'VIDEO' === d.tagName ? it.AVC1 : it.MP4,
          g = d.webkitKeys.createSession(m, y);
        this.addMediaKeySessionInfo(p, g, h),
          (this.session = g),
          (g.extURI = p),
          g.addEventListener('webkitkeyerror', this.boundDispatchKeyError),
          g.addEventListener('webkitkeymessage', this.boundStartLicenseSession);
      });
    }
    _extractAssetId(e) {
      let n = String.fromCharCode.apply(null, new Uint16Array(e.buffer || e));
      const d = n.match(gs);
      return (
        d && d.length >= 2 && (n = d[1]),
        M.debug('Extracted assetId from EXT-X-KEY URI', n),
        n
      );
    }
    _concatInitDataIdAndCertificate(e, n, d) {
      'string' == typeof n && (n = pt(n)), (d = new Uint8Array(d));
      let h = 0;
      const p = new ArrayBuffer(
          e.byteLength + 4 + n.byteLength + 4 + d.byteLength
        ),
        y = new DataView(p);
      new Uint8Array(p, h, e.byteLength).set(e),
        (h += e.byteLength),
        y.setUint32(h, n.byteLength, !0),
        (h += 4);
      const m = new Uint8Array(p, h, n.byteLength);
      m.set(n), (h += m.byteLength), y.setUint32(h, d.byteLength, !0), (h += 4);
      return (
        new Uint8Array(p, h, d.byteLength).set(d),
        new Uint8Array(p, 0, p.byteLength)
      );
    }
    loadKeys(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    clearSessions() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  class MSSession extends KeySession {
    attachMedia(e, n) {
      return (
        (this.keySystem = n.keySystem),
        e.addEventListener('msneedkey', this.boundHandleSessionCreation, !1),
        e.addEventListener('mskeyerror', this.boundDispatchKeyError),
        e
      );
    }
    detachMedia(e) {
      e.removeEventListener('msneedkey', this.boundHandleSessionCreation, !1),
        e.removeEventListener('mskeyerror', this.boundDispatchKeyError);
    }
    createSession(e) {
      const { initData: n, target: d } = e;
      if (!d.msKeys) {
        const e = new MSMediaKeys(this.keySystem);
        d.msSetMediaKeys(e);
      }
      const h = d.msKeys.createSession(it.MP4, n);
      return (
        h.addEventListener('mskeyerror', this.dispatchKeyError),
        h.addEventListener('mskeymessage', this.startLicenseSession.bind(this)),
        h
      );
    }
    loadKeys(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    clearSessions() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  const fs = {
      [Ge.WIDEVINE]: rt.WIDEVINE,
      [Ge.FAIRPLAY]: rt.FAIRPLAY,
      [Ge.PLAYREADY]: rt.PLAYREADY,
    },
    vs = [
      0, 0, 1, 222, 112, 115, 115, 104, 0, 0, 0, 0, 154, 4, 240, 121, 152, 64,
      66, 134, 171, 146, 230, 91, 224, 136, 95, 149, 0, 0, 1, 190,
    ],
    _s = [190, 1, 0, 0, 1, 0, 1, 0, 180, 1];
  function concatenate(e, ...n) {
    let d = 0;
    for (const y of n) d += y.length;
    const h = new e(d);
    let p = 0;
    for (const y of n) h.set(y, p), (p += y.length);
    return h;
  }
  const { WIDEVINE: bs, PLAYREADY: Ts } = Ge,
    Es = {};
  (Es[bs] = (e) => {
    Et.debug('generating Widevine pssh for keyId');
    const n = new Uint8Array([
      0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214,
      74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1, 18, 16,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    for (let d = 0; d < e.length; d++) n[n.length - 16 + d] = e[d];
    return Et.debug('generatePSSH', n), n;
  }),
    (Es[Ts] = (e) => {
      Et.debug('generating Playready pssh for keyId'),
        ((e) => {
          const swap = (e, n, d) => {
            const h = e[n];
            (e[n] = e[d]), (e[d] = h);
          };
          swap(e, 0, 3), swap(e, 1, 2), swap(e, 4, 5), swap(e, 6, 7);
        })(e);
      const n = yt(e),
        d =
          '<WRMHEADER xmlns="http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.3.0.0"><DATA><PROTECTINFO><KIDS><KID ALGID="AESCTR" VALUE="[KEYID]"></KID></KIDS></PROTECTINFO></DATA></WRMHEADER>'.replace(
            '[KEYID]',
            n
          ),
        h = pt(d),
        p = new Uint8Array(h.buffer, h.byteOffset, h.byteLength);
      return concatenate(Uint8Array, vs, _s, p);
    });
  class PreloadingEncryptedSession extends KeySession {
    constructor() {
      super(...arguments),
        (this._sessionRemovalTimeouts = {}),
        (this._mediaKeySessionRenewals = {});
    }
    attachMedia(e, n) {
      (this.keySystem = n.keySystem),
        (this._keySystemAccess = n),
        (this._target = e);
    }
    detachMedia() {
      asAsync(this.clearSessions());
    }
    createSession(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    _mediaKeysSetup() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = this._keySystemAccess;
        e &&
          (this._mediaKeysPromise ||
            (this._mediaKeysPromise = new Promise((n, d) =>
              __awaiter(this, void 0, void 0, function* () {
                var h;
                const p = yield e.createMediaKeys();
                try {
                  yield null === (h = this._target) || void 0 === h
                    ? void 0
                    : h.setMediaKeys(p),
                    (this._mediaKeys = p);
                } catch (H) {
                  this.dispatchKeyError(H), d(H);
                }
                if (this.isWidevine) {
                  const e = yield this.loadCertificateBuffer();
                  yield p.setServerCertificate(e);
                }
                n(p);
              })
            )),
          yield this._mediaKeysPromise);
      });
    }
    createSessionAndGenerateRequest(e, n, d = !1) {
      var h;
      return __awaiter(this, void 0, void 0, function* () {
        if (!d && this.mediaKeySessions[e]) return;
        Et.debug(
          `createSessionAndGenerateRequest for item ${n.title}, isRenewal ${d}`
        );
        const p =
            null === (h = this._mediaKeys) || void 0 === h
              ? void 0
              : h.createSession(),
          { keySystem: y } = this;
        if (!p) return;
        this.addMediaKeySessionInfo(e, p, n);
        const m = ((e) => {
            if (e.includes('data')) {
              const [n, d] = e.split(',');
              return d;
            }
            return e;
          })(e),
          g = ut(m),
          _ = (this.isWidevine && n.isSong) || 16 === g.length;
        let b;
        var T;
        return (
          Et.debug('extracted uri', e),
          this.isPlayReady && !_
            ? (Et.debug('handling Playready object'),
              (p.extURI = e),
              (T = g),
              (b = concatenate(Uint8Array, new Uint8Array(vs), T)))
            : _
            ? (Et.debug('handling keyId only initData'),
              (p.extURI = 'data:;base64,' + yt(g)),
              (b = ((e, n) => {
                const d = Es[n];
                if (!d) return Et.warn('No pssh generator for ', n), e;
                return d(Uint8Array.from(e));
              })(g, y)))
            : (Et.debug('handling pssh initData'), (p.extURI = e), (b = g)),
          p.addEventListener('message', this.startLicenseSession),
          p.generateRequest('cenc', b).catch((e) => {
            if (e.message.match(/generateRequest.*\(75\)/))
              return p.generateRequest('cenc', b);
            throw e;
          })
        );
      });
    }
    handleLicenseJson(e, n, d) {
      const h = Object.create(null, {
        handleLicenseJson: { get: () => super.handleLicenseJson },
      });
      var p;
      return __awaiter(this, void 0, void 0, function* () {
        if (!e) return;
        const y = this.mediaKeySessions[d];
        if (!y)
          return void Et.debug(
            'media key session does not exist, not updating'
          );
        const m = e['renew-after'];
        if (e.license && m) {
          Et.debug('Got renew after value', m, d);
          const e = this._mediaKeySessionRenewals,
            h = e[n.sessionId];
          h && clearTimeout(h),
            (e[n.sessionId] = setTimeout(
              () => this._renewMediaKeySession(y, d),
              1e3 * m
            ));
        }
        yield h.handleLicenseJson.call(this, e, n, d);
        const g =
          null === (p = this.mediaKeySessions[d]) || void 0 === p
            ? void 0
            : p.oldSession;
        g &&
          (Et.debug('removing old key session after updating', d),
          yield this._removeAndCloseSession(g),
          delete this.mediaKeySessions[d].oldSession,
          delete this._mediaKeySessionRenewals[g.sessionId]);
      });
    }
    _renewMediaKeySession(e, n) {
      delete this._mediaKeySessionRenewals[e.session.sessionId],
        asAsync(this.createSessionAndGenerateRequest(n, e.item, !0));
    }
    loadKeys(e, n) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._mediaKeysSetup();
        const d = this.filterKeyValues(e);
        for (const e of d) {
          const { dataUri: d } = e;
          yield this.createSessionAndGenerateRequest(d, n);
        }
        if (null == n ? void 0 : n.isLiveAudioStation) {
          const e = Object.keys(this.mediaKeySessions),
            n = d.reduce((e, n) => ((e[n.dataUri] = !0), e), {});
          for (const d of e) n[d] || (yield this._scheduleRemoveSession(d));
        }
      });
    }
    filterKeyValues(e) {
      let n;
      if (1 === e.length) n = e;
      else {
        const d = fs[this.keySystem];
        n = e.filter((e) => e.keyFormat === d);
      }
      return n;
    }
    clearSessions(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const n = this.mediaKeySessions;
        if (null == e ? void 0 : e.length) {
          const n = this.filterKeyValues(e);
          for (const e of n) {
            const n = e.dataUri;
            clearTimeout(this._sessionRemovalTimeouts[n]),
              yield this._removeSessionImmediately(n);
          }
        } else {
          Object.values(this._sessionRemovalTimeouts).forEach((e) =>
            clearTimeout(e)
          ),
            Et.debug('clearing key sessions', n);
          for (const e of Object.keys(n))
            yield this._removeSessionImmediately(e);
        }
      });
    }
    _scheduleRemoveSession(e) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this.mediaKeySessions[e])
          return void Et.warn(
            'no session for dataUri, not scheduling remove',
            e
          );
        if (this._sessionRemovalTimeouts[e]) return;
        const n = setTimeout(() => {
          asAsync(this._removeSessionImmediately(e));
        }, 6e4);
        Et.debug('deferring removal of keysession for dataUri', e),
          (this._sessionRemovalTimeouts[e] = n);
      });
    }
    _removeSessionImmediately(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const n = this.mediaKeySessions[e];
        if (!n) return void Et.warn('no session for dataUri, not removing', e);
        Et.debug('removing keysession for', e);
        const { session: d, oldSession: h } = n;
        this._clearSessionRenewal(d),
          delete this.mediaKeySessions[e],
          yield this._removeAndCloseSession(d),
          h && (yield this._removeAndCloseSession(h));
      });
    }
    _removeAndCloseSession(e) {
      return __awaiter(this, void 0, void 0, function* () {
        e.removeEventListener('message', this.startLicenseSession),
          Et.debug('tearing down session', e.sessionId);
        try {
          yield e.remove();
        } catch (Vt) {
          Et.warn('Error invoking session.remove()', Vt);
        } finally {
          try {
            yield e.close();
          } catch (Vt) {
            Et.warn('Error invoking session.close()', Vt);
          }
        }
      });
    }
    _clearSessionRenewal(e) {
      const n = this._mediaKeySessionRenewals[e.sessionId];
      n &&
        (Et.debug(
          'clearing scheduled license renewal for session',
          e.sessionId
        ),
        clearTimeout(n),
        delete this._mediaKeySessionRenewals[e.sessionId]);
    }
  }
  const Ss = BooleanDevFlag.register('mk-safari-modern-eme');
  class MediaExtension extends Notifications {
    constructor(e, n) {
      super([tt.playbackLicenseError, tt.playbackSessionError]),
        (this.mediaElement = e),
        (this.contentType = n);
    }
    get hasMediaKeySupport() {
      return hasMediaKeySupport();
    }
    get hasMediaSession() {
      return void 0 !== this._session;
    }
    get isFairplay() {
      return this._session.isFairplay;
    }
    set extURI(e) {
      this._session.extURI = e;
    }
    set initiated(e) {
      this._session.initiated = e;
    }
    get session() {
      return this._session;
    }
    clearSessions(e) {
      var n;
      return __awaiter(this, void 0, void 0, function* () {
        return null === (n = this.session) || void 0 === n
          ? void 0
          : n.clearSessions(e);
      });
    }
    initializeKeySystem() {
      return __awaiter(this, void 0, void 0, function* () {
        yield this._attachSession();
        const { _session: e } = this;
        e &&
          [tt.playbackLicenseError, tt.playbackSessionError].forEach((n) => {
            e.addEventListener(n, (e) => {
              this.dispatchEvent(n, e);
            });
          });
      });
    }
    _requestModernFairplayAccess() {
      return __awaiter(this, void 0, void 0, function* () {
        const { contentType: e } = this,
          n = [
            {
              initDataTypes: ['skd'],
              audioCapabilities: [{ contentType: e, robustness: '' }],
              videoCapabilities: [{ contentType: e, robustness: '' }],
              distinctiveIdentifier: 'not-allowed',
              persistentState: 'not-allowed',
              sessionTypes: ['temporary'],
            },
          ],
          [, d] = yield findMediaKeySystemAccess([Ge.FAIRPLAY], n);
        return d;
      });
    }
    _attachSession() {
      var e, n, d;
      return __awaiter(this, void 0, void 0, function* () {
        const { mediaElement: h, contentType: p } = this;
        if (
          null === (e = window.WebKitMediaKeys) || void 0 === e
            ? void 0
            : e.isTypeSupported(Ge.FAIRPLAY + '.1_0', it.MP4)
        ) {
          let e;
          Ss.enabled &&
            this.hasMediaKeySupport &&
            (e = yield this._requestModernFairplayAccess()),
            e
              ? (M.warn('media-extension: Using Fairplay modern EME'),
                (this._session = new FairplayEncryptedSession()),
                this._session.attachMedia(h, e))
              : (M.warn('media-extension: Using Fairplay legacy EME'),
                (this._session = new WebKitSession()),
                this._session.attachMedia(h, { keySystem: Ge.FAIRPLAY }));
        } else if (
          null === (n = window.MSMediaKeys) || void 0 === n
            ? void 0
            : n.isTypeSupported(Ge.PLAYREADY, it.MP4)
        )
          (this._session = new MSSession()),
            this._session.attachMedia(h, { keySystem: Ge.PLAYREADY });
        else if (this.hasMediaKeySupport && h.canPlayType(p)) {
          this._session = new PreloadingEncryptedSession();
          const e = [
              {
                initDataTypes: ['cenc', 'keyids'],
                audioCapabilities: [{ contentType: p }],
                distinctiveIdentifier: 'optional',
                persistentState: 'required',
              },
            ],
            n = potentialKeySystemsForAccess(),
            [, y] = yield findMediaKeySystemAccess(n, e);
          y
            ? null === (d = this._session) ||
              void 0 === d ||
              d.attachMedia(h, y)
            : M.warn('media-extension: No keysystem detected!');
        }
      });
    }
    setMediaItem(e) {
      !(function (e, n) {
        n.keyURLs &&
          ((e.developerToken = ms.developerToken),
          (e.userToken = ms.musicUserToken),
          (e.item = n),
          (e.adamId = n.songId),
          (e.isLibrary = n.isCloudItem),
          e.setKeyURLs(n.keyURLs));
      })(this._session, e);
    }
    destroy(e) {
      this._session && this._session.detachMedia(e);
    }
  }
  const ks = BooleanDevFlag.register('mk-force-audio-mse'),
    shouldForceAudioMse = () => ks.enabled;
  class ByteRangeSegment {
    constructor({ url: e, startByte: n, length: d, isInitSegment: h = !1 }) {
      (this.url = e),
        (this.isInitSegment = h),
        (this.startByte = parseInt(n, 10)),
        (this.length = parseInt(d, 10)),
        (this.endByte = this.startByte + this.length - 1),
        (this.range = `bytes=${this.startByte}-${this.endByte}`);
    }
    load() {
      return __awaiter(this, void 0, void 0, function* () {
        const { url: e, range: n } = this;
        if (!e) return new Uint8Array();
        const d = new Headers();
        d.append('Range', n);
        const h = yield fetch(e, { headers: d }),
          p = yield h.arrayBuffer();
        return new Uint8Array(p);
      });
    }
  }
  class ContinuousSegment {
    constructor(e, n = !1) {
      (this.url = e), (this.isInitSegment = n);
    }
    load() {
      return __awaiter(this, void 0, void 0, function* () {
        const { url: e } = this;
        if (!e) return new Uint8Array();
        M.debug('radio-segment: loading', e);
        const n = yield fetch(e),
          d = yield n.arrayBuffer();
        return new Uint8Array(d);
      });
    }
  }
  const Ps = /^#EXT-X-BYTERANGE:([^\n]+)\n/gim,
    Is = /^#EXT-X-MAP:([^\n]+)\n/im,
    As = /#EXTINF:\d*\.\d*\,[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim,
    ws =
      /#EXTINF:\d*\.\d*,\s*#EXT-X-BITRATE:\d{1,3}[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim;
  class SegmentList {
    constructor() {
      (this._segments = []), (this._addedSegments = {});
    }
    get segments() {
      return this._segments;
    }
    addSegment(e, n) {
      this._addedSegments[n] ||
        (M.debug('Adding segment', n),
        this._segments.push(e),
        (this._addedSegments[n] = !0));
    }
    extractLiveRadioSegments(e, n) {
      this._extractContinuousSegments(As, e, n);
    }
    extractHlsOffersSegments(e, n) {
      this._extractContinuousSegments(ws, e, n);
    }
    _extractContinuousSegments(e, n, d) {
      if (!n || !e.test(n)) return;
      let h;
      for (e.lastIndex = 0; (h = e.exec(n)); ) {
        const e = h[0].startsWith('#EXT-X-MAP') ? h[2] : h[1],
          n = rewriteLastUrlPath(d, e),
          p = h[0].startsWith('#EXT-X-MAP');
        this.addSegment(new ContinuousSegment(n, p), e);
      }
    }
    extractByteRangeSegments(e, n) {
      var d, h;
      if (!e || !Ps.test(e)) return;
      const p = (function (e) {
          if (!e || !Is.test(e)) return;
          const [, n] = e.match(Is);
          return n.split(',').reduce((e, n) => {
            const [d, h] = n.split('=');
            return (e[d.toLowerCase()] = h.replace(/\"/gi, '')), e;
          }, {});
        })(e),
        y = null !== (d = n.split('/').pop()) && void 0 !== d ? d : '',
        m = n.replace(y, p.uri),
        [g, _] = p.byterange.split('@'),
        b = new ByteRangeSegment({ url: m, startByte: _, length: g });
      this.addSegment(b, b.range),
        (null !== (h = e.match(Ps)) && void 0 !== h ? h : []).forEach((e) => {
          const [, n, d] = e.match(/^#EXT-X-BYTERANGE:(\d+)@(\d+)\n/),
            h = new ByteRangeSegment({ url: m, startByte: d, length: n });
          this.addSegment(h, h.range);
        });
    }
  }
  var Rs;
  !(function (e) {
    e.keysParsed = 'keysParsed';
  })(Rs || (Rs = {}));
  const Os = /^#EXT-X-TARGETDURATION:(\d+)/im,
    Cs = /^#EXT-X-KEY:[^\n]+URI="([^"]+)"/im,
    Ms = /^#EXT-X-KEY:[^\n]+URI="([^"]+)",KEYFORMAT="([^"]+)"/gim;
  function loadManifestData(e) {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield fetch(e)).text();
    });
  }
  class Manifest extends Notifications {
    constructor(e, n) {
      super([tt.manifestParsed, Rs.keysParsed]),
        (this._downlink = 0),
        (this._segmentList = new SegmentList()),
        (this._data = e),
        (this._item = n),
        (this._url = n.assetURL);
    }
    parse() {
      const e = this._item,
        n = this._data;
      if (st !== Ge.FAIRPLAY || shouldForceAudioMse())
        if ((this._detectKeyTags(), e.hasOffersHlsUrl))
          this._segmentList.extractHlsOffersSegments(n, e.assetURL);
        else if (e.isLiveRadioStation) {
          this._segmentList.extractLiveRadioSegments(n, e.assetURL);
          const [, d] = this._data.match(Os);
          M.debug(
            `manifest: setting up manifest refresh interval at ${d} seconds`
          );
          const h = 1e3 * parseInt(d, 10);
          this._manifestRefreshInterval = setInterval(this.liveRadioRefresh, h);
        } else this._segmentList.extractByteRangeSegments(n, e.assetURL);
    }
    static load(e, n = !0) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('loading manifest for item', e.title);
        const d = e.assetURL;
        let h;
        const p = getSessionStorage(),
          y = !!p && n;
        if (y && ((h = null == p ? void 0 : p.getItem(d)), h))
          return new this(h, e);
        const m = new Date().getTime();
        h = yield loadManifestData(d);
        const g = new this(h, e);
        return (
          (g.downlink = (function (e, n) {
            return (8 * n.length) / ((new Date().getTime() - e) / 1e3) / 1024;
          })(m, h)),
          y && (null == p || p.setItem(d, h)),
          Promise.resolve(g)
        );
      });
    }
    get downlink() {
      return this._downlink;
    }
    set downlink(e) {
      this._downlink = e;
    }
    get mediaItem() {
      return this._item;
    }
    liveRadioRefresh() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = yield loadManifestData(this._url);
        (this._data = e),
          this._detectKeyTags(),
          this._segmentList.extractLiveRadioSegments(e, this._url),
          this.dispatchEvent(tt.manifestParsed);
      });
    }
    segmentsForTimeRange(e) {
      const n = Math.floor(e.start / 10) + 1,
        d = Math.floor(e.end / 10) + 1,
        { segments: h } = this;
      return [h[0], ...h.slice(n, d + 1)];
    }
    get segments() {
      return this._segmentList.segments;
    }
    get extURI() {
      if (!this._extURI) {
        const e = this._data.match(Cs);
        M.debug('manifest: EXT_X_KEY_URI matches', e),
          (this._extURI = (e && e[1]) || void 0);
      }
      return this._extURI;
    }
    get keyValues() {
      let e = this._modernKeys;
      return e.length || (e = this._legacyKeys), e;
    }
    _detectKeyTags() {
      const e = this.keyValues;
      e.length &&
        this.dispatchEvent(Rs.keysParsed, { item: this.mediaItem, keys: e });
    }
    get _legacyKeys() {
      const e = this._data.match(Cs);
      M.debug('manifest: EXT_X_KEY_URI matches', e);
      const n = (e && e[1]) || void 0;
      this._extURI = n;
      const d = [];
      return n && d.push({ keyFormat: rt.WIDEVINE, dataUri: n }), d;
    }
    get _modernKeys() {
      let e;
      Ms.lastIndex = 0;
      const n = [];
      for (; (e = Ms.exec(this._data)); ) {
        const [d, h, p] = e;
        n.push({ keyFormat: p, dataUri: h });
      }
      return n;
    }
    stop() {
      this._manifestRefreshInterval &&
        clearInterval(this._manifestRefreshInterval);
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', Promise),
    ],
    Manifest.prototype,
    'liveRadioRefresh',
    null
  );
  const Ds = 'seamlessAudioTransition',
    Ls = 'bufferTimedMetadataDidChange',
    Ns = isNodeEnvironment$1() ? require('util').TextDecoder : self.TextDecoder;
  function encodedArrayToString(e, n = 'utf-8') {
    if ('iso-8859-1' === n) return String.fromCharCode(...e);
    return new Ns(n).decode(e);
  }
  function readNullTerminatedString(e, n = 0, d) {
    const h = [];
    d = null != d ? d : e.length;
    for (let p = n; p < d; p++) {
      const n = e[p];
      if ('\0' === String.fromCharCode(n)) break;
      h.push(String.fromCharCode(n));
    }
    return [h.join(''), h.length];
  }
  function isBitAtPositionOn(e, n) {
    return 0 != (e & (1 << n));
  }
  class BaseMp4Box {
    constructor(e, n, d, h) {
      (this.id = e), (this.data = n), (this.start = d), (this.end = h);
    }
    get size() {
      return this.end - this.start;
    }
    get rawBytes() {
      return this.data.slice(this.start, this.end);
    }
  }
  const xs = [
    237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237,
  ];
  class PsshBox extends BaseMp4Box {
    constructor(e, n, d) {
      super('pssh', e, n, d), (this.view = new DataView(e.buffer, n));
    }
    get systemId() {
      const { data: e, start: n } = this,
        d = n + 12;
      return e.slice(d, d + 16);
    }
    get dataSize() {
      return this.view.getUint32(28);
    }
    get psshData() {
      const { data: e, start: n, dataSize: d } = this,
        h = n + 32;
      return e.slice(h, h + d);
    }
    get keyBytes() {
      const { psshData: e } = this;
      return e.slice(2, 18);
    }
    get isWidevine() {
      return arrayEquals(this.systemId, xs);
    }
  }
  class TencBox extends BaseMp4Box {
    constructor(e, n, d) {
      super('tenc', e, n, d), (this.data = e), (this.start = n), (this.end = d);
    }
    get isProtected() {
      const { data: e, start: n } = this;
      return e[n + 14];
    }
    get defaultKeyId() {
      const { data: e, start: n } = this;
      return e.slice(n + 16, n + 32);
    }
    set defaultKeyId(e) {
      const { data: n, start: d } = this;
      for (let h = 0; h < e.length; h++) n[h + d + 16] = e[h];
    }
  }
  function findBox(e, n, d = []) {
    for (let h = n; h < e.length; ) {
      if (0 === d.length) return;
      const n = new DataView(e.buffer, h).getUint32(0),
        p = encodedArrayToString(e.subarray(h + 4, h + 8)),
        y = h + n;
      if (1 === d.length && p === d[0]) return new BaseMp4Box(p, e, h, y);
      if (p === d[0]) return findBox(e, h + 8, d.slice(1));
      h += n;
    }
  }
  const rewriteDefaultKid = (e) => {
    const [n] = (function (e) {
      const n = findBox(e, 0, ['moov', 'trak', 'mdia', 'minf', 'stbl', 'stsd']),
        d = [];
      if (!n) return d;
      for (let h = n.start + 16; h < n.end; ) {
        let p = findBox(e, h, ['enca']),
          y = 36;
        if ((p || ((p = findBox(e, h, ['encv'])), (y = 86)), !p)) return d;
        const m = findBox(e, p.start + y, ['sinf', 'schi', 'tenc']);
        m
          ? (d.push(new TencBox(m.data, m.start, m.end)), (h = m.end))
          : (h = n.end);
      }
      return d;
    })(e);
    if (!n) return;
    const d = (function (e) {
      const n = findBox(e, 0, ['moov']),
        d = [];
      if (!n) return d;
      const h = new DataView(e.buffer, 0);
      for (let p = n.start + 8; p < n.size; ) {
        const n = h.getUint32(p);
        'pssh' === encodedArrayToString(e.subarray(p + 4, p + 8)) &&
          d.push(new PsshBox(e, p, p + n)),
          (p += n);
      }
      return d;
    })(e).find((e) => e.isWidevine);
    d && (n.defaultKeyId = d.keyBytes);
  };
  function readSynchSafeUint32(e) {
    return (
      2097152 * (127 & e[0]) +
      16384 * (127 & e[1]) +
      128 * (127 & e[2]) +
      (127 & e[3])
    );
  }
  const Us = { 0: 'iso-8859-1', 1: 'utf-16', 2: 'utf-16be', 3: 'utf-8' },
    Bs = { TPE1: !0, TIT2: !0, WXXX: !0, PRIV: !0, TALB: !0, CHAP: !0 };
  class ID3 {
    constructor(e) {
      (this.frames = []),
        (this.unsynchronized = !1),
        (this.hasExtendedHeader = !1),
        (this.hasFooter = !1),
        (this.isExperimental = !1);
      let n = 0;
      const d = ct(e.subarray(n, n + 3));
      if (((n += 3), 'ID3' !== d)) return;
      (this.minor = e[n++]), (this.revision = e[n++]);
      const h = e[n++];
      this._parseID3Flags(h);
      const p = readSynchSafeUint32(e.subarray(n, n + 4));
      (n += 4), (this.frameLength = p);
      const y = n + p;
      if (((this.endPos = y), this.hasExtendedHeader)) {
        n += readSynchSafeUint32(e.subarray(n, n + 4));
      }
      this.minor > 2 && this._parseID3Frames(this, e, n, y);
    }
    _parseID3Flags(e) {
      (this.unsynchronized = isBitAtPositionOn(e, 7)),
        (this.hasExtendedHeader = isBitAtPositionOn(e, 6)),
        (this.isExperimental = isBitAtPositionOn(e, 5)),
        (this.hasFooter = isBitAtPositionOn(e, 4));
    }
    _parseID3Frames(e, n, d, h) {
      const p = new DataView(n.buffer, 0, h),
        { minor: y } = this;
      for (; d + 8 <= h; ) {
        const m = ct(n.subarray(d, d + 4));
        d += 4;
        const g =
          4 === y ? readSynchSafeUint32(n.subarray(d, d + 4)) : p.getUint32(d);
        if (((d += 4), n[d++], n[d++], Bs[m])) {
          const p = d,
            y = this._extractID3FramePayload(n, m, g, p, h);
          if (y) {
            const n = this.decodeID3Frame(y);
            n && e.frames.push(n);
          }
          d += g;
        } else d += g;
      }
    }
    _extractID3FramePayload(e, n, d, h, p) {
      const y = h + d;
      let m;
      return y <= p && (m = { type: n, size: d, data: e.slice(h, y) }), m;
    }
    decodeID3Frame(e) {
      if ('TXXX' !== e.type)
        return 'WXXX' === e.type
          ? this.decodeWxxxFrame(e)
          : 'PRIV' === e.type
          ? this.decodePrivFrame(e)
          : 'CHAP' === e.type
          ? this.decodeChapFrame(e)
          : 'T' === e.type[0]
          ? this.decodeTextFrame(e)
          : { key: e.type, data: e.data };
    }
    decodeChapFrame(e) {
      const { data: n } = e,
        d = new DataView(n.buffer),
        h = { key: 'CHAP', frames: [] };
      let [p, y] = readNullTerminatedString(n, 0, n.length);
      return (
        (h.id = p),
        y++,
        (h.startTime = d.getUint32(y)),
        (y += 4),
        (h.endTime = d.getUint32(y)),
        (y += 4),
        (y += 4),
        (y += 4),
        this._parseID3Frames(h, n, y, n.length),
        h
      );
    }
    decodeTextFrame(e) {
      const { data: n } = e,
        d = Us[n[0]],
        h = encodedArrayToString(n.subarray(1), d);
      return { key: e.type, text: h };
    }
    decodeWxxxFrame(e) {
      const { data: n } = e,
        d = Us[n[0]];
      let h = 1;
      const p = encodedArrayToString(n.subarray(h), d);
      h += p.length + 1;
      return {
        key: 'WXXX',
        description: p,
        text: encodedArrayToString(n.subarray(h)),
      };
    }
    decodePrivFrame(e) {
      const n = encodedArrayToString(e.data);
      if (!n) return;
      return { key: 'PRIV', info: n, data: e.data.slice(n.length + 1) };
    }
  }
  function checkBoxName(e, n, d) {
    return (
      !(n + 4 > e.length) &&
      e[n] === d[0] &&
      e[n + 1] === d[1] &&
      e[n + 2] === d[2] &&
      e[n + 3] === d[3]
    );
  }
  function findEmsgs(e) {
    const n = e.length,
      d = [];
    if (
      (function (e) {
        return (
          (null == e ? void 0 : e.length) >= 8 &&
          checkBoxName(e, 4, [102, 116, 121, 112])
        );
      })(e)
    )
      return d;
    for (let h = 0; h < n; h++) {
      if (checkBoxName(e, h, [109, 111, 111, 102])) return d;
      if (checkBoxName(e, h, [101, 109, 115, 103])) {
        const n = h - 4,
          p = new DataView(e.buffer, n).getUint32(0),
          y = e.subarray(n, n + p);
        (h = h + p - 1), d.push(y);
      }
    }
    return d;
  }
  const Fs = { TALB: 'album', TIT2: 'title', TPE1: 'performer' },
    Ks = ['performer', 'title', 'album'];
  class TimedMetadata {
    constructor(e) {
      (this.links = []),
        (this.storefrontToIds = {}),
        e.forEach((e) => {
          var n, d;
          const { key: h } = e,
            p = Fs[h];
          if (p)
            this[p] =
              null === (n = e.text) || void 0 === n
                ? void 0
                : n.replace(/\0/g, '');
          else if ('WXXX' === e.key) {
            if (e.description) {
              const [n, d] = e.description.split('\0');
              this.links.push({ description: n, url: d });
            }
          } else if ('PRIV' === e.key) {
            const n =
              null === (d = e.info) || void 0 === d ? void 0 : d.split('\0');
            if (n && n.length && n[0].startsWith('com.apple.radio.adamid')) {
              n[1].split(',').forEach((e) => {
                const [n, d] = e.split(':');
                n &&
                  d &&
                  '0' !== d &&
                  !hasOwn(this.storefrontToIds, n) &&
                  (this.storefrontToIds[n] = d);
              });
            }
          }
        });
    }
    resolveAdamIdFromStorefront(e) {
      const n = this.storefrontToIds[e];
      this._adamId = n;
    }
    get adamId() {
      return this._adamId;
    }
    equals(e) {
      if (!Ks.every((n) => this[n] === e[n])) return !1;
      const { links: n } = this,
        d = e.links;
      if (n.length !== d.length) return !1;
      for (let h = 0; h < n.length; h++) {
        const e = n[h].description === d[h].description,
          p = n[h].url === d[h].url;
        if (!e || !p) return !1;
      }
      return !0;
    }
  }
  class Emsg {
    constructor(e) {
      this.data = e;
      const n = new DataView(e.buffer);
      let d = 8;
      if (1 !== e[d]) return;
      (d += 4), (this.timeScale = n.getUint32(d)), (d += 4);
      const h = n.getUint32(d);
      d += 4;
      const p = n.getUint32(d);
      if (
        ((d += 4),
        (this.presentationTime = Math.pow(2, 32) * h + p),
        !Number.isSafeInteger(this.presentationTime))
      )
        throw (
          ((this.presentationTime = Number.MAX_SAFE_INTEGER),
          new Error('Failed to create 64 bit integer'))
        );
      (this.eventDuration = n.getUint32(d)),
        (d += 4),
        (this.id = n.getUint32(d)),
        (d += 4);
      const [y, m] = readNullTerminatedString(e, d);
      (d += m + 1), (this.schemeIdUri = y);
      const [g, _] = readNullTerminatedString(e, d);
      (d += _ + 1),
        (this.payload = e.subarray(d, e.byteLength)),
        (this.id3 = new ID3(this.payload));
    }
    get length() {
      return this.data.length;
    }
    get elementPresentationTime() {
      const { presentationTime: e, timeScale: n } = this;
      return e && n ? Math.round(e / n) : NaN;
    }
    get timedMetadata() {
      var e;
      if (this._timedMetadata) return this._timedMetadata;
      const n = null === (e = this.id3) || void 0 === e ? void 0 : e.frames;
      return n
        ? ((this._timedMetadata = new TimedMetadata(n)), this._timedMetadata)
        : void 0;
    }
  }
  class TimedMetadataManager {
    constructor(e, n) {
      (this._currentTime = e),
        (this._onDidChange = n),
        (this._emsgLookup = {}),
        (this._getCurrentEmsg = this._getCurrentEmsg.bind(this));
    }
    processEmsgs(e) {
      const n = findEmsgs(e);
      n.length &&
        (this._currentEmsgInterval ||
          (this._currentEmsgInterval = setInterval(this._getCurrentEmsg, 1e3)),
        n.forEach((e) => {
          const n = new Emsg(e);
          this._emsgLookup[n.elementPresentationTime] = n;
        }));
    }
    stop() {
      const { _currentEmsgInterval: e } = this;
      e && clearInterval(e);
    }
    _getCurrentEmsg() {
      const { _currentTime: e, _emsgLookup: n } = this,
        d = Math.round(e()),
        h = [],
        p = Object.keys(n);
      for (let m = 0; m < p.length; m++) {
        const e = parseInt(p[m], 10);
        if (!(e < d)) break;
        h.push(e);
      }
      const y = h.pop();
      if (y) {
        const e = n[y];
        if (!e) return;
        const { _currentEmsg: d, _onDidChange: h } = this,
          p = null == d ? void 0 : d.payload,
          m = e.payload;
        (p && arrayEquals(p, m)) || ((this._currentEmsg = e), h(e)),
          this._cleanupEmsgs(y);
      }
    }
    _cleanupEmsgs(e) {
      const { _emsgLookup: n } = this;
      Object.keys(n).forEach((d) => {
        parseInt(d, 10) < e && delete n[d];
      });
    }
  }
  class SegmentProcessor {
    constructor(e, n, d) {
      (this._item = e),
        (this._timedMetadataManager = new TimedMetadataManager(
          () => n.currentTime,
          (e) => {
            d.publish(Ls, e.timedMetadata);
          }
        ));
    }
    process(e, n) {
      const { _item: d } = this;
      try {
        d.isLiveRadioStation
          ? this._processLiveRadioSegment(n)
          : d.hasOffersHlsUrl && this._processHlsOffersSegment(e, n);
      } catch (Vt) {
        M.error('Error processing segment', Vt);
      }
    }
    stop() {
      this._timedMetadataManager.stop();
    }
    _processHlsOffersSegment(e, n) {
      e.isInitSegment && rewriteDefaultKid(n);
    }
    _processLiveRadioSegment(e) {
      this._timedMetadataManager.processEmsgs(e);
    }
  }
  const js = new Logger({
      levelFilterStorageKey: 'mk-mse-buffer',
      topic: 'mse-buffer',
    }),
    $s = BooleanDevFlag.get('mk-mse-buffer'),
    { manifestParsed: Vs } = tt;
  class MseBuffer {
    constructor({
      dispatcher: e,
      element: n,
      manifest: d,
      currentTime: h,
      duration: p,
      clip: y,
    }) {
      (this.firstSegmentLoadPromise = Promise.resolve()),
        (this.hasKickstarted = !1),
        (this.segmentIndexToFetch = -1),
        (this.timeToTrim = 10),
        (this.isAtEndOfStream = !1),
        (this.isFullyBuffered = !1),
        (this.deferredRemoves = []),
        (this.currentTimestampOffset = 0),
        (this.dispatcher = e),
        (this.clip = y),
        (this.element = n),
        (this.mediaSource = new MediaSource()),
        this.mediaSource.addEventListener('sourceopen', this.onSourceOpen),
        (this.segmentProcessor = new SegmentProcessor(d.mediaItem, n, e)),
        (this.playbackTimeline = { current: { manifest: d } }),
        d.addEventListener(Vs, this.onManifestParsed),
        (this._currentTime = h || 0),
        (this.duration = p),
        (window.mseBuffer = this);
    }
    onSourceOpen() {
      js.debug('mediaSource open handler');
      const { mediaSource: e } = this;
      if (e.activeSourceBuffers.length > 0)
        return void js.debug('not adding new source buffer');
      js.debug('adding new source buffer');
      const n = e.addSourceBuffer('audio/mp4;codecs="mp4a.40.2"');
      (this.sourceBuffer = n),
        n.addEventListener('updateend', this.updateEndHandler);
      const { clip: d, hasAppendWindowSupport: h } = this;
      d &&
        (h
          ? (js.debug('appendWindowStart/End', d.start, d.end),
            (n.appendWindowStart = d.start),
            (n.appendWindowEnd = d.end))
          : (js.debug('seeking for clip', d.start),
            asAsync(this.seek(d.start)))),
        this.updateSegmentToFetch(0, !0);
    }
    setNextManifest(e) {
      js.debug('setting next manifest for ', e.mediaItem.title),
        this.nextSeamlessTransition
          ? (js.debug(
              'abandoning transition scheduled for ' +
                this.nextSeamlessTransition
            ),
            this.revertSeamlessTransition(!0),
            (this.playbackTimeline.next = { manifest: e }))
          : ((this.playbackTimeline.next = { manifest: e }),
            this.isFullyBuffered &&
              (js.debug(
                'current song is fully buffered, beginning transition to next'
              ),
              this.transitionToNextManifest()));
    }
    isItemPlaying(e) {
      var n, d;
      const { playbackTimeline: h } = this,
        p = this.nextSeamlessTransition
          ? null === (n = h.previous) || void 0 === n
            ? void 0
            : n.manifest.mediaItem
          : null === (d = h.current) || void 0 === d
          ? void 0
          : d.manifest.mediaItem;
      return (
        !!p &&
        (js.debug(`isItemPlaying ${e.title}, ${p.title}, ${e.id === p.id}`),
        e.id === p.id)
      );
    }
    get currentItem() {
      return this.manifest.mediaItem;
    }
    get playableUrl() {
      let e = this._playableUrl;
      return (
        e ||
        ((e = window.URL.createObjectURL(this.mediaSource)),
        js.debug('created url', e),
        (this._playableUrl = e),
        e)
      );
    }
    get segments() {
      const { manifest: e, clip: n } = this;
      return n ? e.segmentsForTimeRange(n) : e.segments || [];
    }
    get currentTime() {
      return this._currentTime;
    }
    set currentTime(e) {
      var n, d;
      if (((e += this.currentTimestampOffset), this._currentTime === e)) return;
      const { nextSeamlessTransition: h } = this;
      if (h && e >= h) {
        js.debug('setting offset to', h),
          (this.currentTimestampOffset = h || 0),
          (this.nextSeamlessTransition = void 0),
          (this.duration = this.manifest.mediaItem.playbackDuration / 1e3),
          js.debug('buffer setting duration to', this.duration);
        const e = {
          previous:
            null ===
              (d =
                null === (n = this.playbackTimeline.previous) || void 0 === n
                  ? void 0
                  : n.manifest) || void 0 === d
              ? void 0
              : d.mediaItem,
          current: this.manifest.mediaItem,
        };
        js.debug('dispatching seamless audio transition', e),
          this.dispatcher.publish(Ds, e);
      }
      this._currentTime = e;
      const { isOverBufferLimit: p, timeToTrim: y } = this,
        m = e > this.timeToTrim;
      p &&
        m &&
        (js.debug('buffer over limit, trimming to ', y),
        this.removeToTime(y),
        (this.timeToTrim += 10));
    }
    get hasAppendWindowSupport() {
      var e;
      return (
        void 0 !==
        (null === (e = this.sourceBuffer) || void 0 === e
          ? void 0
          : e.appendWindowStart)
      );
    }
    seek(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const { duration: n, seekWhenUpdated: d, sourceBuffer: h } = this;
        if (
          (this.resolveSeekPromise(!1),
          js.debug('seek to ', e),
          (e = +e) > n &&
            (js.debug('rounding seek time to duration', e, n), (e = n)),
          !h)
        )
          return !1;
        if ((this.revertSeamlessTransition(), h.updating))
          return (
            js.debug('sourcebuffer updating, deferring seek'),
            new Promise((n) => {
              d && d.resolve(!1),
                (this.seekWhenUpdated = {
                  seek: this.seek.bind(this, e),
                  resolve: n,
                });
            })
          );
        (this.currentlyLoadingSegmentIndex = void 0),
          this.updateSegmentToFetch(0, !0),
          this.removeToTime(e),
          (this.timeToTrim = 10 * Math.floor(e / 10));
        const p = this.getSegmentForTime(e);
        0 !== p && (yield this.firstSegmentLoadPromise),
          js.debug('seeking to', e, 'segment', p),
          this.updateSegmentToFetch(p, !0);
        const y = new Promise((n) => {
          this.seekResolver = { time: e, resolve: n };
        });
        return this.checkSeekBuffered(), y;
      });
    }
    clearNextManifest() {
      this.revertSeamlessTransition(!0), (this.playbackTimeline.next = void 0);
    }
    revertSeamlessTransition(e = !1) {
      const { playbackTimeline: n, nextSeamlessTransition: d } = this;
      if (!d || !n.previous)
        return void js.debug('no need to revert, no transition');
      (this.isAtEndOfStream = e),
        js.debug('reverting seamless transition with discardNextManifest', e),
        e ? this.clearBufferToEnd(d) : this.clearBuffer(),
        js.debug('abandoning transition to ' + this.manifest.mediaItem.title),
        (n.next = e ? void 0 : n.current),
        (n.current = n.previous),
        (n.previous = void 0);
      const h = this.manifest.mediaItem;
      js.debug('current item reverted to ' + h.title),
        (this.nextSeamlessTransition = void 0),
        (this.duration = h.playbackDuration / 1e3),
        js.debug('reverted duration to ' + this.duration),
        e ||
          ((this.currentTimestampOffset = 0),
          (this.timestampOffsetAdjustment = 0),
          js.debug(
            'reverted currentTimestampOffset and timestampOffsetAdjustment to 0'
          )),
        this.printInfo(),
        (this.segmentIndexToFetch = -1);
    }
    get streamHasEnding() {
      return !this.manifest.mediaItem.isLiveRadioStation;
    }
    stop() {
      this.segmentProcessor.stop(), this.setEndOfStream(), this.remove();
    }
    remove() {
      var e;
      js.debug('removing sourceBuffer and mediaSource');
      const { sourceBuffer: n, mediaSource: d } = this;
      null === (e = this.seekResolver) || void 0 === e || e.resolve(!1),
        this.manifest.removeEventListener(Vs, this.onManifestParsed);
      const h = this._playableUrl;
      h && (js.debug('revoking url', h), window.URL.revokeObjectURL(h)),
        d.removeEventListener('sourceopen', this.onSourceOpen),
        n &&
          (n.removeEventListener('updateend', this.updateEndHandler),
          (this.sourceBuffer = void 0));
    }
    onManifestParsed() {
      const e = this.segmentIndexToFetch + 1;
      js.debug('manifestParsed, loading segment', e),
        this.updateSegmentToFetch(e, !0);
    }
    updateEndHandler() {
      if ((this.kickstartBuffer(), this.clearDeferredRemove())) return;
      if (
        (js.debug('update end', this.seekWhenUpdated), this.seekWhenUpdated)
      ) {
        js.debug('updateEndHandler resolving seekWhenUpdated');
        const { seekWhenUpdated: e } = this;
        return (
          asAsync(e.seek().then(e.resolve)),
          void (this.seekWhenUpdated = void 0)
        );
      }
      this.checkSeekBuffered();
      const { clip: e, sourceBuffer: n, hasAppendWindowSupport: d } = this;
      if (e && n && !d) {
        const { buffered: d } = n;
        if (this.isTimeBuffered(e.end + 1)) {
          const h = d.end(d.length - 1);
          return (
            js.debug('clipping sourcebuffer to', e.end, h),
            void n.remove(e.end, h)
          );
        }
      }
      if (this.isAtEndOfStream)
        return (
          js.debug('buffer is at end of stream'),
          this.streamHasEnding &&
            (js.debug('isAtEndOfStream, not fetching any more segments'),
            this.playbackTimeline.next || this.setEndOfStream(),
            this.transitionToNextManifest()),
          void (this.isAtEndOfStream = !1)
        );
      js.debug('updateEndHandler invoking loadSegment'),
        asAsync(this.loadSegment());
    }
    clearDeferredRemove() {
      var e;
      if (0 === this.deferredRemoves.length) return !1;
      const n = this.deferredRemoves.shift();
      return (
        null === (e = this.sourceBuffer) ||
          void 0 === e ||
          e.remove(n.start, n.end),
        !0
      );
    }
    transitionToNextManifest() {
      var e;
      js.debug('beginning transition to next manifest');
      const { playbackTimeline: n, sourceBuffer: d } = this;
      if (!n.next || !d) return void js.debug('no next manifest');
      const h = this.endOfBufferTime || this.currentTimestampOffset;
      js.debug('setting seamless transition at', h),
        (this.nextSeamlessTransition = h),
        (this.timestampOffsetAdjustment = h),
        (this.playbackTimeline.current.endTime = h),
        (n.previous = n.current),
        js.debug(
          'previous manifest set to',
          null === (e = n.previous) || void 0 === e
            ? void 0
            : e.manifest.mediaItem.title
        ),
        (n.current = n.next),
        js.debug('current manifest set to', n.current.manifest.mediaItem.title),
        (n.next = void 0),
        this.updateSegmentToFetch(0, !0),
        this.printInfo();
    }
    updateSegmentToFetch(e, n = !1) {
      this.segments.length &&
        e < this.segments.length &&
        e !== this.segmentIndexToFetch &&
        ((this.segmentIndexToFetch = e),
        n &&
          (js.debug('updateSegmentToFetch invoking loadSegment'),
          asAsync(this.loadSegment())));
    }
    loadSegment() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = this.segmentIndexToFetch,
          n = this.segments[e];
        if (e !== this.currentlyLoadingSegmentIndex) {
          if (n)
            try {
              js.debug('begin loadSegment ' + e),
                (this.currentlyLoadingSegmentIndex = e);
              const h = n.load();
              0 === e && (this.firstSegmentLoadPromise = h);
              const p = yield h;
              if (0 !== e && e !== this.segmentIndexToFetch)
                return void js.debug(
                  'load segment index to fetch changed, not processing bytes for segment',
                  e
                );
              this.segmentProcessor.process(n, p),
                js.debug('loadSegment processed: ' + e);
              const { sourceBuffer: y, timestampOffsetAdjustment: m } = this;
              if (!y) return;
              try {
                'number' == typeof m &&
                  (js.debug('adjusting timestampOffset of sourcebuffer to', m),
                  (y.timestampOffset = m),
                  (this.timestampOffsetAdjustment = void 0)),
                  y.appendBuffer(p),
                  (this.isFullyBuffered = !1),
                  (this.isOverBufferLimit = !1),
                  js.debug('appended to buffer', p.length),
                  this.printBufferTimes(),
                  e === this.segments.length - 1
                    ? (this.isAtEndOfStream = !0)
                    : e === this.segmentIndexToFetch &&
                      (js.debug(
                        'loadSegment bumping segment index to fetch to ',
                        e + 1
                      ),
                      this.updateSegmentToFetch(e + 1));
              } catch (d) {
                'QuotaExceededError' === d.name
                  ? ((this.isOverBufferLimit = !0),
                    js.debug('reached buffer limit'))
                  : js.warn('Error appending to source buffer', d);
              }
            } catch (Vt) {
              js.error('Error loading segment', Vt);
            } finally {
              this.currentlyLoadingSegmentIndex = void 0;
            }
        } else js.debug(`segment ${e} is currently loading, not loading it again`);
      });
    }
    setEndOfStream() {
      const { sourceBuffer: e, mediaSource: n } = this;
      e &&
        'ended' !== n.readyState &&
        (e.updating || 'open' !== n.readyState
          ? js.error(
              'Could not end of stream (updating, readyState)',
              e.updating,
              n.readyState
            )
          : (js.debug('mediaSource.endOfStream'),
            n.endOfStream(),
            (this.isFullyBuffered = !0)));
    }
    removeToTime(e) {
      js.debug('removing to time', e),
        e > 0 &&
          (this.isTimeBuffered(e) || this.isOverBufferLimit) &&
          this.safeSourceBufferRemove(0, e);
    }
    safeSourceBufferRemove(e, n) {
      const { sourceBuffer: d } = this;
      d &&
        (d.updating
          ? this.deferredRemoves.push({ start: e, end: n })
          : d.remove(e, n));
    }
    get previousOffset() {
      var e, n;
      return (
        (null ===
          (n =
            null === (e = this.playbackTimeline) || void 0 === e
              ? void 0
              : e.previous) || void 0 === n
          ? void 0
          : n.endTime) || 0
      );
    }
    get manifest() {
      var e;
      return null === (e = this.playbackTimeline.current) || void 0 === e
        ? void 0
        : e.manifest;
    }
    checkSeekBuffered() {
      const { seekResolver: e, currentTimestampOffset: n } = this;
      if (!e) return;
      const { time: d } = e,
        h = d + n,
        p = this.isTimeBuffered(h);
      js.debug('resolving seek for time, adjustedTime, isBuffered', d, h, p),
        this.printBufferTimes(),
        p &&
          (js.debug('resolving seek to true for time:', h),
          (this.element.currentTime = h),
          this.resolveSeekPromise(!0));
    }
    resolveSeekPromise(e) {
      this.seekResolver &&
        (this.seekResolver.resolve(e), (this.seekResolver = void 0));
    }
    get endOfBufferTime() {
      var e;
      const n =
        null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.buffered;
      return !(!n || !n.length) && n.end(n.length - 1);
    }
    isTimeBuffered(e) {
      var n;
      const d =
        null === (n = this.sourceBuffer) || void 0 === n ? void 0 : n.buffered;
      if (!d) return !1;
      for (let h = 0; h < d.length; h++)
        if (
          (js.debug('isTimeBuffered', d.start(h), e, d.end(h)),
          e >= d.start(h) && e <= d.end(h))
        )
          return !0;
      return !1;
    }
    clearBufferToEnd(e) {
      const { sourceBuffer: n } = this;
      if (!n || !n.buffered) return;
      const d = n.buffered.end(n.buffered.length - 1);
      this.safeSourceBufferRemove(e, d);
    }
    clearBuffer() {
      const { sourceBuffer: e } = this;
      if (!e || !e.buffered) return;
      const n = e.buffered;
      for (let d = 0; d < n.length; d++)
        this.safeSourceBufferRemove(n.start(d), n.end(d));
    }
    get bufferTimesString() {
      var e;
      const n =
        null === (e = this.sourceBuffer) || void 0 === e ? void 0 : e.buffered;
      if (!n) return '';
      const d = [];
      for (let h = 0; h < n.length; h++)
        d.push(`start ${n.start(h)} end: ${n.end(h)}`);
      return d.join(',');
    }
    printBufferTimes() {
      $s && js.debug('buffer times', this.bufferTimesString);
    }
    getSegmentForTime(e) {
      return Math.floor(e / 10) + 1;
    }
    kickstartBuffer() {
      const { hasKickstarted: e, element: n, clip: d } = this,
        { buffered: h } = n;
      e ||
        (this.manifest.mediaItem.isSong
          ? d &&
            this.isTimeBuffered(d.start) &&
            ((n.currentTime = d.start), (this.hasKickstarted = !0))
          : h.length &&
            ((n.currentTime = h.start(0)), (this.hasKickstarted = !0)));
    }
    printInfo() {
      var e, n;
      const { playbackTimeline: d } = this;
      js.info('---- Buffer Info ----'),
        js.info('currently buffering item', d.current.manifest.mediaItem.title),
        js.info(
          'next item to buffer',
          null === (e = d.next) || void 0 === e
            ? void 0
            : e.manifest.mediaItem.title
        ),
        js.info(
          'previously buffered item',
          null === (n = d.previous) || void 0 === n
            ? void 0
            : n.manifest.mediaItem.title
        ),
        js.info('currentTimestampOffset', this.currentTimestampOffset),
        js.info('currentTime', this.currentTime),
        js.info('duration', this.duration),
        js.info('nextSeamlessTransition', this.nextSeamlessTransition),
        js.info('timestampOffsetAdjustment', this.timestampOffsetAdjustment),
        js.info('buffered times', this.bufferTimesString),
        js.info('isAtEndOfStream', this.isAtEndOfStream),
        js.info('isFullyBuffered', this.isFullyBuffered),
        js.info('segmentIndexToFetch', this.segmentIndexToFetch),
        js.info('segments.length', this.segments.length),
        js.info('---- End Buffer Info ----');
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0),
    ],
    MseBuffer.prototype,
    'onSourceOpen',
    null
  ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0),
      ],
      MseBuffer.prototype,
      'onManifestParsed',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0),
      ],
      MseBuffer.prototype,
      'updateEndHandler',
      null
    );
  const { mediaPlaybackError: Hs } = St;
  class AudioPlayer extends BasePlayer {
    constructor(e) {
      var n;
      super(e),
        (this.currentAudioTrack = void 0),
        (this.currentTextTrack = void 0),
        (this.textTracks = []),
        (this.audioTracks = []),
        (this.isSeamlessAudioTransitionsEnabled = !1),
        (this.mediaPlayerType = 'audio'),
        (this.isSeamlessAudioTransitionsEnabled = !!(null ===
          (n = null == e ? void 0 : e.bag) || void 0 === n
          ? void 0
          : n.features['seamless-audio-transitions'])),
        (window.audioPlayer = this);
    }
    get currentPlayingDate() {}
    get isPlayingAtLiveEdge() {
      return !1;
    }
    get seekableTimeRanges() {
      return this.currentPlaybackDuration
        ? [{ start: 0, end: this.currentPlaybackDuration }]
        : void 0;
    }
    get _targetElement() {
      return this.audio;
    }
    initializeExtension() {
      return __awaiter(this, void 0, void 0, function* () {
        (this.extension = new MediaExtension(
          this.audio,
          'audio/mp4;codecs="mp4a.40.2"'
        )),
          yield this.extension.initializeKeySystem(),
          this.extension.addEventListener(tt.playbackLicenseError, (e) => {
            this._licenseError(), this._dispatcher.publish(Hs, e);
          }),
          this.extension.addEventListener(tt.playbackSessionError, (e) => {
            this._dispatcher.publish(Hs, new MKError(MKError.MEDIA_SESSION, e));
          });
      });
    }
    initializeMediaElement() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = (function () {
          let e = et.pop();
          return (
            e
              ? M.debug(
                  `dom-helpers: retrieving audio tag, ${et.length} remain`
                )
              : (M.debug('dom-helpers: no available audio tags, creating one'),
                (e = document.createElement('audio'))),
            e
          );
        })();
        (e.autoplay = !1),
          (e.id = 'apple-music-player'),
          (e.controls = !1),
          (e.muted = !1),
          (e.playbackRate = 1),
          (e.preload = 'metadata'),
          (e.volume = 1),
          (this.audio = e),
          document.body.appendChild(e),
          M.debug('initializedMediaElement', e);
      });
    }
    removeEventHandlers() {
      this._targetElement.removeEventListener('timeupdate', this.onTimeUpdate),
        super.removeEventHandlers();
    }
    isPlayerSupported() {
      return !0;
    }
    _stopMediaElement() {
      const e = Object.create(null, {
        _stopMediaElement: { get: () => super._stopMediaElement },
      });
      var n;
      return __awaiter(this, void 0, void 0, function* () {
        yield e._stopMediaElement.call(this),
          yield this.tearDownManifests(),
          null === (n = this._buffer) || void 0 === n || n.stop(),
          (this._buffer = void 0);
      });
    }
    setNextSeamlessItem(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const { extension: n, nextManifest: d } = this,
          h = this._buffer;
        if (!h || !n) return;
        if ((null == d ? void 0 : d.mediaItem.id) === e.id)
          return void M.debug('already have next manifest for ', e.title);
        this._targetElement.removeEventListener(
          'timeupdate',
          this.onTimeUpdate
        ),
          this._targetElement.addEventListener('timeupdate', this.onTimeUpdate),
          M.debug('player preparing next manifest for', e.title);
        const p = yield this.loadAndParseManifest(e, !1);
        h.setNextManifest(p),
          n.setMediaItem(e),
          (n.extURI = p.extURI),
          (this.nextManifest = p);
      });
    }
    playItemFromEncryptedSource(n, d = !1, h) {
      return __awaiter(this, void 0, void 0, function* () {
        const p = this._paused && !d;
        if (
          (M.debug('playItemFromEncryptedSource', n.title), n.playRawAssetURL)
        )
          return (
            (n.playbackType = e.PlaybackType.unencryptedFull),
            (this.nowPlayingItem = n),
            this._playAssetURL(n.assetURL, p)
          );
        const { extension: y } = this;
        if (!y) return;
        (y.initiated = d),
          y.setMediaItem(n),
          (n.playbackType = e.PlaybackType.encryptedFull),
          (this.nowPlayingItem = n),
          (n.state = N.loading);
        const m = yield this.getManifestForItem(n);
        this.manifest = m;
        const g = shouldForceAudioMse();
        if (
          ((n.isSong || (y.isFairplay && g)) && (y.extURI = m.extURI),
          (n.state = N.ready),
          y.isFairplay && !g)
        ) {
          let e = n.assetURL;
          return (
            (null == h ? void 0 : h.startTime) && (e += '#t=' + h.startTime),
            this._playAssetURL(e, p)
          );
        }
        {
          const e = this._buffer;
          if (
            !(
              e &&
              this.isSeamlessAudioTransitionsEnabled &&
              e.isItemPlaying(m.mediaItem)
            )
          )
            return this.beginNewBufferForItem(p, m, h);
          M.debug('already have buffer, continuing playback');
        }
      });
    }
    getManifestForItem(e) {
      var n, d;
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('reconciling item to play against playing item');
        const {
            nextManifest: h,
            manifest: p,
            isSeamlessAudioTransitionsEnabled: y,
          } = this,
          m = this._buffer;
        if (!m || !p)
          return (
            M.debug(
              'no buffer or manifest, creating manifest [title, buffer, manifest]',
              e.title,
              !!m,
              !!p
            ),
            this.loadAndParseManifest(e)
          );
        if (!y)
          return (
            M.debug(
              'seamless transitions disabled, stopping and creating manifest for',
              e.title
            ),
            yield this.tearDownManifests(),
            this.loadAndParseManifest(e)
          );
        const g = !m.isItemPlaying(e);
        let _;
        return (
          M.debug('itemMismatch', g),
          h && !g
            ? (M.debug(
                `replacing manifest for ${p.mediaItem.title} with next manifest ${h.mediaItem.title}`
              ),
              (_ = h),
              (this.nextManifest = void 0),
              M.debug(
                'cease listening for keys on manifest for',
                p.mediaItem.title
              ),
              yield this.tearDownManifest(p))
            : g
            ? (null == h ? void 0 : h.mediaItem.id) !== e.id
              ? (M.debug(
                  `item to play ${e.title} does not match playing or next items, tearing down all manifests`
                ),
                yield this.tearDownManifests(),
                (_ = yield this.loadAndParseManifest(e)))
              : (M.debug(
                  `item to play ${e.title} matches next item, tearing down current manifest`
                ),
                yield this.tearDownManifest(p),
                (_ = h))
            : (M.debug('item is already playing, returning existing manifest'),
              (_ = p)),
          M.debug('getManifestForItem loading keys for', p.mediaItem.title),
          null ===
            (d =
              null === (n = this.extension) || void 0 === n
                ? void 0
                : n.session) ||
            void 0 === d ||
            d.loadKeys(_.keyValues, _.mediaItem),
          _
        );
      });
    }
    seekToTime(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const n = this._buffer;
        if (n) {
          M.debug('audio-player: buffer seek to', e);
          if (!(yield n.seek(e))) return;
          this.isSeamlessAudioTransitionsEnabled && this.onTimeUpdate();
        } else M.debug('audio-player: media element seek to', e), (this._targetElement.currentTime = e);
      });
    }
    tearDownManifests() {
      return __awaiter(this, void 0, void 0, function* () {
        (this.manifest = yield this.tearDownManifest(this.manifest)),
          (this.nextManifest = yield this.tearDownManifest(this.nextManifest));
      });
    }
    tearDownManifest(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const { extension: n } = this;
        e &&
          (M.debug('tearing down manifest for', e.mediaItem.title),
          e.stop(),
          n && (yield n.clearSessions(e.keyValues)),
          e.removeEventListener(Rs.keysParsed, this.loadKeysHandler));
      });
    }
    loadAndParseManifest(e, n = !0) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug(`will load and parse manifest for ${e.title}, loadKeys ${n}`);
        const d = yield Manifest.load(e, !1);
        return (
          n && d.addEventListener(Rs.keysParsed, this.loadKeysHandler),
          d.parse(),
          d
        );
      });
    }
    onTimeUpdate() {
      var e, n;
      if (!this._buffer) return;
      const { currentPlaybackTimeRemaining: d, nextManifest: h } = this;
      h &&
        d < 15 &&
        (M.debug('player loading keys for', h.mediaItem.title),
        null ===
          (n =
            null === (e = this.extension) || void 0 === e
              ? void 0
              : e.session) ||
          void 0 === n ||
          n.loadKeys(h.keyValues, h.mediaItem),
        this._targetElement.removeEventListener(
          'timeupdate',
          this.onTimeUpdate
        ));
    }
    loadKeysHandler(e) {
      var n, d;
      null ===
        (d =
          null === (n = this.extension) || void 0 === n ? void 0 : n.session) ||
        void 0 === d ||
        d.loadKeys(e.keys, e.item);
    }
    beginNewBufferForItem(e, n, d) {
      return __awaiter(this, void 0, void 0, function* () {
        if (
          (M.debug('creating new MseBuffer for item', n.mediaItem.title, e),
          this._buffer && (M.debug('stopping old buffer'), this._buffer.stop()),
          (this._buffer = new MseBuffer({
            dispatcher: this._dispatcher,
            element: this._targetElement,
            duration: n.mediaItem.playbackDuration / 1e3,
            manifest: n,
          })),
          yield this._playAssetURL(this._buffer.playableUrl, !0),
          !e)
        ) {
          let e = Promise.resolve();
          return (
            (null == d ? void 0 : d.startTime) &&
              (e = this.seekToTime(d.startTime)),
            e.then(() => this._playMedia())
          );
        }
      });
    }
    setPresentationMode(e) {
      return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve();
      });
    }
  }
  __decorate(
    [
      AsyncDebounce(250),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Number]),
      __metadata('design:returntype', Promise),
    ],
    AudioPlayer.prototype,
    'seekToTime',
    null
  ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0),
      ],
      AudioPlayer.prototype,
      'onTimeUpdate',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0),
      ],
      AudioPlayer.prototype,
      'loadKeysHandler',
      null
    );
  class EncryptedSession extends KeySession {
    attachMedia(e, n) {
      return __awaiter(this, void 0, void 0, function* () {
        (this.keySystem = n.keySystem),
          (this._keySystemAccess = n),
          e.addEventListener('encrypted', this.boundHandleSessionCreation, !1);
      });
    }
    detachMedia(e) {
      e.removeEventListener('encrypted', this.boundHandleSessionCreation);
    }
    createSession(e) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('Encrypted createSession', e);
        const n = this._keySystemAccess;
        if (!n) return;
        const { initData: d, initDataType: h, target: p } = e;
        return (
          this._mediaKeysPromise ||
            (this._mediaKeysPromise = new Promise((e, d) =>
              __awaiter(this, void 0, void 0, function* () {
                const h = yield n.createMediaKeys();
                try {
                  yield p.setMediaKeys(h);
                } catch (H) {
                  this.dispatchKeyError(H), d(H);
                }
                const y = yield this.loadCertificateBuffer();
                yield h.setServerCertificate(y),
                  (this._mediaKeysServerCertificate = y),
                  e(h);
              })
            )),
          yield this._mediaKeysPromise,
          this._mediaKeysServerCertificate
            ? this._createSession(p, d, h)
            : void 0
        );
      });
    }
    generatePSSH(e) {
      const n = new Uint8Array([
          0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121,
          214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1,
          18, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]),
        d = ut(e);
      for (let h = 0; h < d.length; h++) n[n.length - 16 + h] = d[h];
      return M.debug('generatePSSH', n), n;
    }
    _createSession(e, n, d) {
      const h = e.mediaKeys.createSession(),
        { item: p } = this;
      if (!p) return;
      this._teardownCurrentSession(), M.debug('creating media key session', h);
      let y;
      if (this.isWidevine && p.isSong) y = this.generatePSSH(this.extID);
      else {
        const e = (function (e) {
            const n = [],
              d = new DataView(e.buffer);
            for (let h = 0; h < e.length; ) {
              const p = d.getUint32(h);
              n.push(new PsshBox(e, h, h + p)), (h += p);
            }
            return n;
          })(new Uint8Array(n)).find((e) => e.isWidevine),
          d = null == e ? void 0 : e.rawBytes,
          p = yt(d);
        M.debug('extracted uri', p), (h.extURI = p), (y = n);
      }
      return (
        h.addEventListener('message', this.startLicenseSession),
        (this._currentSession = h),
        h.generateRequest(d, y).catch((e) => {
          if (e.message.match(/generateRequest.*\(75\)/))
            return h.generateRequest(d, y);
          throw e;
        })
      );
    }
    _teardownCurrentSession() {
      this._currentSession &&
        (M.debug('tearing down media key session', this._currentSession),
        this._currentSession.removeEventListener(
          'message',
          this.startLicenseSession
        ),
        (this._currentSession = void 0));
    }
    loadKeys(e, n) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    clearSessions() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  class MediaExtensionStub extends Notifications {
    constructor(e) {
      super(e),
        (this.audioTracks = []),
        (this.textTracks = []),
        (this.extURI = ''),
        (this.hasMediaKeySupport = !0),
        (this.initiated = !0),
        (this.isFairplay = !0),
        (this.hasMediaKeySupport = !0),
        (this.hasMediaSession = !0);
    }
    destroy(e) {}
    setMediaItem(e) {}
    initializeKeySystem() {
      return __awaiter(this, void 0, void 0, function* () {
        this.session = new EncryptedSession();
      });
    }
    clearSessions() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  class PlayerStub {
    constructor(n) {
      (this.bitrate = e.PlaybackBitrate.STANDARD),
        (this.audioTracks = []),
        (this.currentBufferedProgress = 0),
        (this.currentPlaybackDuration = 0),
        (this.currentPlaybackProgress = 0),
        (this.currentPlaybackTime = 0),
        (this.currentPlaybackTimeRemaining = 0),
        (this.currentPlayingDate = void 0),
        (this.isPlayingAtLiveEdge = !1),
        (this.isPlaying = !1),
        (this.isPrimaryPlayer = !0),
        (this.isReady = !1),
        (this.paused = !1),
        (this.playbackState = e.PlaybackStates.none),
        (this.playbackTargetAvailable = !1),
        (this.playbackTargetIsWireless = !1),
        (this.previewOnly = !1),
        (this.textTracks = []),
        (this.extension = new MediaExtensionStub([])),
        (this.hasAuthorization = !0),
        (this.isDestroyed = !1),
        (this._volume = 1),
        (this._playbackRate = 1),
        (this._dispatcher = n.services.dispatcher),
        (this.windowHandlers = new WindowHandlers(this));
    }
    get hasMediaElement() {
      return !0;
    }
    get isEngagedInPlayback() {
      return !this.paused;
    }
    get playbackRate() {
      return this._playbackRate;
    }
    set playbackRate(e) {
      (this._playbackRate = e),
        this._dispatcher.publish(
          St.playbackRateDidChange,
          new Event('ratechange')
        );
    }
    get volume() {
      return this._volume;
    }
    set volume(e) {
      (this._volume = e),
        this._dispatcher.publish(
          St.playbackVolumeDidChange,
          new Event('volumeChange')
        );
    }
    destroy() {}
    dispatch() {}
    exitFullscreen() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    initialize() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    isPaused() {
      return this.paused;
    }
    calculateTime(e) {
      return e;
    }
    clearNextManifest() {}
    mute() {}
    newSeeker() {
      return new PlayerSeeker(this);
    }
    pause(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    play() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    playItemFromEncryptedSource(e, n, d) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    playItemFromUnencryptedSource(e, n, d) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    preload() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    prepareToPlay(e, n, d) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    seekToTime(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    requestFullscreen() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    setPlaybackState(e, n) {}
    setPresentationMode(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    showPlaybackTargetPicker() {}
    stop(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    stopMediaAndCleanup() {
      return __awaiter(this, void 0, void 0, function* () {});
    }
    supportsPictureInPicture() {
      return !1;
    }
    tsidChanged() {}
    setNextSeamlessItem(e) {
      return __awaiter(this, void 0, void 0, function* () {});
    }
  }
  e.version = '2.2240.3';
  const Ws = e.version.split('.');
  Ws[0];
  const Ys = Ws[Ws.length - 1];
  var qs;
  (Ws[0] = '3'),
    (Ws[Ws.length - 1] = Ys + '-prerelease'),
    (e.version = Ws.join('.')),
    (e.PlaybackActions = void 0),
    ((qs = e.PlaybackActions || (e.PlaybackActions = {})).REPEAT = 'REPEAT'),
    (qs.SHUFFLE = 'SHUFFLE'),
    (qs.AUTOPLAY = 'AUTOPLAY');
  const zs = JsonDevFlag.register('mk-hlsjs-automation-config'),
    Gs = new RegExp(
      '^https://([a-z0-9]+-)?' +
        (
          'js-cdn.music.apple.com' + '/musickit/v3/'.replace(/v3/, '(v2|v3)')
        ).replace(/[\.\/]/g, '\\$&'),
      'i'
    ),
    Qs = /^https:\/\/(.*\/includes\/js-cdn)\//i,
    Js = /^([a-z]+:)?\/\//;
  function findScript(e) {
    return isNodeEnvironment$1() || !e
      ? null
      : document.querySelector(`script[src*="${e}"]`);
  }
  function getScriptSrcElements() {
    if ('undefined' == typeof document || !document.querySelectorAll) return [];
    return Array.from(document.querySelectorAll('script[src]'));
  }
  function determineCdnBasePrefix() {
    for (const e of getScriptSrcElements()) {
      const n = Gs.exec(e.src);
      if (n) return n[1] || '';
    }
    return '';
  }
  function determineCdnPathPrefix() {
    for (const e of getScriptSrcElements()) {
      const n = Qs.exec(e.src);
      if (n) return n[1] || '';
    }
    return '';
  }
  function determineCdnBaseHost() {
    if (isNodeEnvironment$1()) return '';
    return `//${determineCdnBasePrefix()}js-cdn.music.apple.com`;
  }
  function determineCdnPathHost() {
    const e = determineCdnPathPrefix();
    return e ? '//' + e : e;
  }
  const Xs = StringDevFlag.register('mk-hlsjs-log-level'),
    Zs = StringDevFlag.register('mk-hlsjs-version');
  function getHlsJsCdnConfig() {
    const e = { hls: '', rtc: '' };
    if (isNodeEnvironment$1()) return e;
    const n = determineCdnPathHost() || determineCdnBaseHost(),
      d = Zs.get() || '2.220.4',
      h = (function () {
        const e = Xs.value;
        switch (e) {
          case 'info':
          case 'error':
          case 'warn':
            return 'hls.production.verbose.min.js';
          case 'trace':
          case 'debug':
            return (
              console.warn(
                `HLS log level ${e} is not supported, loading production build.`
              ),
              'hls.js'
            );
          default:
            return 'hls.js';
        }
      })();
    return (
      (e.hls = `https:${n}/hls.js/${d}/hls.js/${h}`),
      (e.rtc = `https:${n}/hls.js/${d}/rtc.js/rtc.min.js`),
      (function (e) {
        const n = zs.get();
        if (!(null == n ? void 0 : n.url)) return;
        const { url: d } = n;
        isAppleHostname(d) &&
          'carry-' === determineCdnBasePrefix() &&
          (e.hls = d);
      })(e),
      e
    );
  }
  function isAppleHostname(e) {
    try {
      return new URL(e).hostname.endsWith('.apple.com');
    } catch (Vt) {}
    return !1;
  }
  function cdnBaseURL(e, n = window) {
    var d;
    if (isNodeEnvironment$1()) return '';
    const h =
      null === (d = getLocalStorage()) || void 0 === d
        ? void 0
        : d.getItem('mkCDNBaseURLOverride');
    if (h) return h;
    const p = findScript(e);
    return p
      ? p.getAttribute('src').replace(new RegExp(e + '$'), '')
      : (determineCdnPathHost() || determineCdnBaseHost()) + '/musickit/v3/';
  }
  const en = new Map();
  function loadScript(e, n) {
    const d = en.get(e);
    if (d) return d;
    const h = new Promise((d, h) => {
      isNodeEnvironment$1() &&
        h('Dynamic script loading is unsupported in Node environments.');
      if (findScript(e)) return d();
      const p = document.createElement('script');
      let y;
      if (
        (n &&
          Object.keys(n).forEach((e) => {
            p.setAttribute(e, n[e]);
          }),
        (p.onload = () => {
          d();
        }),
        (p.onerror = (e) => {
          h(e);
        }),
        Js.test(e))
      )
        y = e;
      else {
        y = `${cdnBaseURL(e)}${e}`;
      }
      (p.src = y), document.head.appendChild(p);
    });
    return en.set(e, h), h;
  }
  const tn = new Logger('sk-debug');
  class AuthBridgeApp extends class {
    constructor() {
      this._targetOrigin = '*';
    }
    init(e, n) {
      var d;
      (this._receiveWindow = e),
        (this._sendWindow = n),
        (this.handleMessage = this.handleMessage.bind(this)),
        null === (d = this._receiveWindow) ||
          void 0 === d ||
          d.addEventListener('message', this.handleMessage);
    }
    sendMessage(e, n) {
      const d = { action: 'mediakit:' + e, data: n };
      this._sendWindow &&
        this._sendWindow.postMessage(JSON.stringify(d), this._targetOrigin);
    }
    handleMessage(e) {
      if (!this._isOriginAllowed(e.origin)) return;
      let n;
      try {
        n = JSON.parse(e.data);
      } catch (Vt) {}
      if (!n || !this._isNamespacedData(n)) return;
      '*' === this._targetOrigin && (this._targetOrigin = e.origin),
        tn.debug('auth-bridge: handleMessage', n);
      const d = n.action.replace('mediakit:', '');
      this[d]
        ? this[d](n.data)
        : tn.debug('auth-bridge: unsupported method', d);
    }
    _isOriginAllowed(e) {
      if (!e) return !1;
      const [n, d] = e.split('://');
      let h = '';
      return (
        d && (h = d.split(':')[0]),
        'https' === n && !!h && h.endsWith('.apple.com')
      );
    }
    _isNamespacedData(e) {
      return e.action && -1 !== e.action.indexOf('mediakit:');
    }
  } {
    constructor() {
      super(),
        (this.whenFrameInited = new Promise(
          (e) => (this._frameInitResolve = e)
        )),
        (this.whenAuthCompleted = new Promise(
          (e) => (this._authUpdateResolve = e)
        )),
        (this.frame = document.createElement('iframe')),
        (this.frame.src = this._getIframeSrc()),
        (this.frame.style.display = 'none'),
        document.body.appendChild(this.frame),
        this.init(window, this.frame.contentWindow);
    }
    requestAuthUpdate() {
      this.whenFrameInited.then(() => this.sendMessage('requestAuthUpdate'));
    }
    setCookieItem(e, n) {
      this.whenFrameInited.then(() =>
        this.sendMessage('setCookieItem', { name: e, value: n })
      );
    }
    clearAuth() {
      this.whenFrameInited.then(() => this.sendMessage('clearAuth'));
    }
    frameInit() {
      var e;
      null === (e = this._frameInitResolve) || void 0 === e || e.call(this),
        this.requestAuthUpdate();
    }
    updateAuth(e) {
      if (
        (null == e ? void 0 : e.enabled) &&
        (null == e ? void 0 : e.cookies)
      ) {
        const n = e.cookies;
        Object.keys(n).forEach((e) => {
          var d;
          const h = null !== (d = n[e]) && void 0 !== d ? d : '';
          h ? setCookie(e, h, '/', 7) : removeCookie(e);
        });
      }
      this._authUpdateResolve &&
        (this._authUpdateResolve(), (this._authUpdateResolve = void 0));
    }
    authClearedFromOtherFrame() {
      tn.warn(
        "Override auth-bridge/app's authClearedFromOtherFrame to trigger app-specific sign out behavior"
      );
    }
    _getIframeSrc() {
      let e = '',
        n = determineCdnPathPrefix();
      if (n) (n += '/musickit/v3/'), (e = '?inc=' + encodeURIComponent(n));
      else {
        const n = determineCdnBasePrefix();
        n && (e = '?env=' + n.substring(0, n.length - 1));
      }
      return 'https://mediaauth.apple.com/auth-bridge/' + e;
    }
  }
  const rn = new Set([]),
    sn = /\.apple\.com$/;
  function getCommerceHostname(e, n) {
    !n && 'undefined' != typeof location && location.hostname && (n = location);
    let d = e + '.itunes.apple.com';
    if (!n) return d;
    const h = (function (e) {
      if (!e || !sn.test(e)) return;
      const n = e.split('.');
      let d = n[n.length - 3];
      const h = d;
      if (d && d.includes('-')) {
        const e = d.split('-');
        d = e[e.length - 1];
      }
      return rn.has(d) ? h : void 0;
    })(n.hostname);
    return h && (d = `${e}.${h}.apple.com`), d;
  }
  var nn;
  function buildQueryParams(e = { app: nn.APP, p: nn.P }) {
    return (
      void 0 === e.app && (e.app = nn.APP),
      void 0 === e.p && (e.p = nn.P),
      Object.keys(e)
        .map((n) => `${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`)
        .join('&')
    );
  }
  !(function (e) {
    (e.APP = 'music'), (e.P = 'subscribe');
  })(nn || (nn = {}));
  const an = {
      2: 'com.apple.onboarding.tvapp',
      0: 'com.apple.onboarding.applemusic',
    },
    on = { 2: 'pltvcid', 0: 'pldfltcid' };
  var dn;
  !(function (e) {
    (e[(e.ParseError = -32700)] = 'ParseError'),
      (e[(e.InvalidRequest = -32600)] = 'InvalidRequest'),
      (e[(e.MethodNotFound = -32601)] = 'MethodNotFound'),
      (e[(e.InvalidParams = -32602)] = 'InvalidParams'),
      (e[(e.InternalError = -32603)] = 'InternalError');
  })(dn || (dn = {}));
  class Dispatch {
    constructor(e = {}) {
      (this._registry = {}),
        (this._sequence = 0),
        (this.handle = (e) => {
          e.data &&
            '2.0' === e.data.jsonrpc &&
            (('*' !== this.origin && this.origin !== e.origin) ||
              (e.data.method && this.destination
                ? this.handleRequest(e.data).then((e) => {
                    this.send(this.destination, e);
                  })
                : (hasOwn(e.data, 'result') || e.data.error) &&
                  this.handleResponse(e.data)));
        }),
        (this.destination = e.destination),
        (this.methods = e.methods || {}),
        (this.origin = e.origin || '*'),
        e.source && (this.source = e.source);
    }
    get source() {
      return this._source;
    }
    set source(e) {
      if (!e && this._source)
        return (
          this._source.removeEventListener('message', this.handle),
          void (this._source = void 0)
        );
      e.addEventListener('message', this.handle), (this._source = e);
    }
    apply(e, n) {
      if (!this.destination) throw new Error('No destination');
      const d = this._sequence++,
        h = new Promise((e, n) => {
          this._registry[d] = { resolve: e, reject: n };
        });
      return (
        this.send(this.destination, {
          jsonrpc: '2.0',
          id: d,
          method: e,
          params: n,
        }),
        h
      );
    }
    call(e, ...n) {
      return this.apply(e, n);
    }
    handleRequest(e) {
      return __awaiter(this, void 0, void 0, function* () {
        const n = { jsonrpc: '2.0', id: e.id },
          d = this.methods[e.method];
        if (!d)
          return Object.assign(n, {
            error: { code: dn.MethodNotFound, message: 'Method not found' },
          });
        try {
          const h = yield d.apply(void 0, ensureArray(e.params));
          return Object.assign(n, { result: h });
        } catch (H) {
          return Object.assign(n, {
            error: { code: H.code || dn.InternalError, message: H.message },
          });
        }
      });
    }
    handleResponse(e) {
      const n = this._registry[e.id];
      delete this._registry[e.id],
        n &&
          (e.error
            ? n.reject(Object.assign(Error(), e.error))
            : n.resolve(e.result));
    }
    send(e, n) {
      e.postMessage(n, e.window === e ? this.origin : void 0);
    }
  }
  var ln;
  function validateToken(e) {
    var n;
    if ('string' != typeof e) return !1;
    const d = e.match(/[a-zA-Z0-9=\/+]{32,}==$/);
    return null !== (n = d && d.length > 0) && void 0 !== n && n;
  }
  !(function (e) {
    (e[(e.UNAVAILABLE = -1)] = 'UNAVAILABLE'),
      (e[(e.NOT_DETERMINED = 0)] = 'NOT_DETERMINED'),
      (e[(e.DENIED = 1)] = 'DENIED'),
      (e[(e.RESTRICTED = 2)] = 'RESTRICTED'),
      (e[(e.AUTHORIZED = 3)] = 'AUTHORIZED');
  })(ln || (ln = {}));
  const cn = `https://${getCommerceHostname(
      'buy'
    )}/commerce/account/authenticateMusicKitRequest`,
    un = 'https://authorize.music.apple.com',
    hn = /^https?:\/\/(.+\.)*(apple\.com|apps\.mzstatic\.com)(\/[\w\d]+)*$/;
  var pn, yn, mn, gn;
  !(function (e) {
    (e[(e.AUTHORIZE = 0)] = 'AUTHORIZE'), (e[(e.SUBSCRIBE = 1)] = 'SUBSCRIBE');
  })(pn || (pn = {}));
  class ServiceSetupView {
    constructor(e, n = {}) {
      var d, h;
      if (
        ((this.developerToken = e),
        (this.authenticateMethod = 'GET'),
        (this.target = 'apple-music-service-view'),
        (this.deeplinkParameters = (n && n.deeplinkParameters) || {}),
        (this.iconURL = n && n.iconURL),
        (this.authenticateMethod = (n && n.authenticateMethod) || 'GET'),
        this.isServiceView && window.opener !== window)
      ) {
        const e =
            null === (d = getSessionStorage()) || void 0 === d
              ? void 0
              : d.getItem('ac'),
          n = null != e ? new URL(e).origin : void 0;
        n &&
          (this.dispatch = new Dispatch({
            destination:
              null !== (h = window.opener) && void 0 !== h ? h : void 0,
            origin: n,
            source: window,
          }));
      }
    }
    get isServiceView() {
      return (
        /(authorize\.(.+\.)*apple\.com)/i.test(window.location.hostname) ||
        (window && window.name === this.target) ||
        !1
      );
    }
    focus() {
      this._window && window.focus && this._window.focus();
    }
    load(e = { action: pn.AUTHORIZE }) {
      return __awaiter(this, void 0, void 0, function* () {
        return e.action === pn.SUBSCRIBE
          ? this._subscribeAction(e.parameters)
          : this._authorizeAction(e.parameters);
      });
    }
    present(e = '', n) {
      const {
          height: d,
          left: h,
          top: p,
          width: y,
        } = this._calculateClientDimensions(),
        m = {
          height: 650,
          menubar: 'no',
          resizable: 'no',
          scrollbars: 'no',
          status: 'no',
          toolbar: 'no',
          width: 650,
        },
        g = Object.assign(
          Object.assign(Object.assign({}, m), {
            left: y / 2 - m.width / 2 + h,
            top: d / 2 - m.height / 2 + p,
          }),
          n
        ),
        _ = Object.keys(g)
          .map((e) => `${e}=${g[e]}`)
          .join(',');
      return (
        /trident|msie/i.test(navigator.userAgent)
          ? ((this._window =
              window.open(window.location.href, this.target, _) || void 0),
            (this._window.location.href = e))
          : (this._window = window.open(e, this.target, _) || void 0),
        /\bedge\b/i.test(navigator.userAgent) && (this._window.opener = self),
        this.focus(),
        this._window
      );
    }
    _startPollingForWindowClosed(e) {
      this._window &&
        void 0 === this._windowClosedInterval &&
        (this._windowClosedInterval = setInterval(() => {
          var n;
          (null === (n = this._window) || void 0 === n ? void 0 : n.closed) &&
            (this._stopPollingForWindowClosed(), e());
        }, 500));
    }
    _stopPollingForWindowClosed() {
      void 0 !== this._windowClosedInterval &&
        (clearInterval(this._windowClosedInterval),
        (this._windowClosedInterval = void 0));
    }
    _authorizeAction(e = {}) {
      var n;
      return __awaiter(this, void 0, void 0, function* () {
        let d, h;
        const p =
          (null === (n = window.location) || void 0 === n ? void 0 : n.href) ||
          '';
        return (
          'GET' === this.authenticateMethod
            ? (h = `${un}/woa?${buildQueryParams(
                Object.assign(Object.assign({}, this.deeplinkParameters), {
                  a: btoa(this._thirdPartyInfo()),
                  referrer: p,
                })
              )}`)
            : ((d = this._buildFormElement(cn)), document.body.appendChild(d)),
          new Promise((n, p) => {
            const y = this.present(h);
            this._startPollingForWindowClosed(() => {
              p(ln.NOT_DETERMINED);
            }),
              (this.dispatch = new Dispatch({
                methods: {
                  authorize(e, d, h) {
                    validateToken(e)
                      ? n({ restricted: d && '1' === d, userToken: e, cid: h })
                      : p(ln.NOT_DETERMINED);
                  },
                  close() {},
                  decline() {
                    p(ln.DENIED);
                  },
                  switchUserId() {
                    p(ln.NOT_DETERMINED);
                  },
                  thirdPartyInfo: () =>
                    this._thirdPartyInfo(
                      this.developerToken,
                      Object.assign(
                        Object.assign({}, this.deeplinkParameters),
                        e
                      )
                    ),
                  unavailable() {
                    p(ln.UNAVAILABLE);
                  },
                },
                origin: un,
                source: window,
                destination: y,
              })),
              d && d.submit();
          })
        );
      });
    }
    _buildFormElement(e, n = this.target, d = this.developerToken) {
      const h = document.createElement('form');
      h.setAttribute('method', 'post'),
        h.setAttribute('action', e),
        h.setAttribute('target', n),
        (h.style.display = 'none');
      const p = document.createElement('input');
      p.setAttribute('name', 'jwtToken'),
        p.setAttribute('value', d),
        h.appendChild(p);
      const y = document.createElement('input');
      y.setAttribute('name', 'isWebPlayer'),
        y.setAttribute('value', 'true'),
        h.appendChild(y);
      const m = document.createElement('input');
      return (
        m.setAttribute('name', 'LogoURL'),
        m.setAttribute('value', ''),
        h.appendChild(m),
        h
      );
    }
    _calculateClientDimensions(e = window) {
      return {
        height: e.innerHeight
          ? e.innerHeight
          : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height,
        left: e.screenLeft ? e.screenLeft : screen.availLeft || screen.left,
        top: e.screenTop ? e.screenTop : screen.availTop || screen.top,
        width: e.innerWidth
          ? e.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width,
      };
    }
    _subscribeAction(e = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        return (
          Object.assign(e, this.deeplinkParameters),
          new Promise((n, d) => {
            const h =
              'https://authorize.music.apple.com/upsell?' + buildQueryParams(e);
            this.present(h),
              window.addEventListener(
                'message',
                ({ data: e, origin: h, source: p }) => {
                  const { closeWindow: y, launchClient: m } =
                    'string' == typeof e ? JSON.parse(e) : e;
                  (h && !hn.test(h)) ||
                    (m
                      ? 0 === m.supported
                        ? d('Unable to subscribe on this platform.')
                        : n(m)
                      : d('Subscribe action error.'));
                }
              );
          })
        );
      });
    }
    _thirdPartyInfo(e = this.developerToken, n) {
      var d;
      let h = this.iconURL;
      const p = window.location.host || document.referrer,
        y = [
          ...[].slice.call(
            document.querySelectorAll('link[rel="apple-music-app-icon"]')
          ),
          ...[].slice.call(
            document.querySelectorAll(
              'link[rel="apple-touch-icon-precomposed"]'
            )
          ),
          ...[].slice.call(
            document.querySelectorAll('link[rel="apple-touch-icon"]')
          ),
        ];
      if (y && y[0] && y[0].href) {
        const e = y.find((e) => !!e.sizes && '120x120' === e.sizes.value);
        console.log(y)
        h =
          null !== (d = null == e ? void 0 : e.href) && void 0 !== d
            ? d
            : y[0].href;
      }
      return JSON.stringify({
        thirdPartyIconURL: h,
        thirdPartyName: p,
        thirdPartyParameters: n,
        thirdPartyToken: e,
      });
    }
  }
  !(function (e) {
    (e.ID = 'us'), (e.LANGUAGE_TAG = 'en-gb');
  })(yn || (yn = {}));
  !(function (e) {
    (e.DEFAULT_CID = 'pldfltcid'),
      (e.TV_CID = 'pltvcid'),
      (e.RESTRICTIONS_ENABLED = 'itre'),
      (e.STOREFRONT_COUNTRY_CODE = 'itua'),
      (e.USER_TOKEN = 'media-user-token');
  })(mn || (mn = {})),
    (function (e) {
      (e.authorizationStatusDidChange = 'authorizationStatusDidChange'),
        (e.authorizationStatusWillChange = 'authorizationStatusWillChange'),
        (e.eligibleForSubscribeView = 'eligibleForSubscribeView'),
        (e.storefrontCountryCodeDidChange = 'storefrontCountryCodeDidChange'),
        (e.storefrontIdentifierDidChange = 'storefrontIdentifierDidChange'),
        (e.userTokenDidChange = 'userTokenDidChange');
    })(gn || (gn = {})),
    mn.DEFAULT_CID;
  const fn = 'https://' + getCommerceHostname('buy'),
    vn = `https://${getCommerceHostname('play')}/WebObjects/MZPlay.woa/wa`;
  class StoreKit extends Notifications {
    constructor(e, n) {
      super([
        gn.authorizationStatusDidChange,
        gn.authorizationStatusWillChange,
        gn.eligibleForSubscribeView,
        gn.storefrontCountryCodeDidChange,
        gn.userTokenDidChange,
        gn.storefrontIdentifierDidChange,
      ]),
        (this.developerToken = e),
        (this.apiBase = 'https://api.music.apple.com/v1'),
        (this.iTunesBuyBase = fn),
        (this.meParameters = {}),
        (this.persist = 'localstorage'),
        (this.playBase = vn),
        (this.prefix = 'music'),
        (this.realm = 0),
        (this.storage = getLocalStorage()),
        (this._authorizationStatus = ln.NOT_DETERMINED),
        (this._disableLogoutURL = !1),
        (this._dispatchedSubscribeView = !1),
        (this._me = null),
        (this._cids = {}),
        (this._restrictedEnabledOverridden = !1),
        (this._dynamicUserToken = getCookie(mn.USER_TOKEN)),
        n &&
          (n.apiBase && (this.apiBase = n.apiBase),
          n.deeplink && (this.deeplinkParameters = n.deeplink),
          n.meParameters && (this.meParameters = n.meParameters),
          n.persist && (this.persist = n.persist),
          n.prefix && (this.prefix = n.prefix),
          void 0 !== n.realm && (this.realm = n.realm),
          (this.bundleId = an[this.realm])),
        (this.cidNamespace = on[this.realm]),
        (this._developerToken = new DeveloperToken(e)),
        (this._serviceSetupView = new ServiceSetupView(e, {
          authenticateMethod: n && n.authenticateMethod,
          iconURL: n && n.iconURL,
          deeplinkParameters: this.deeplinkParameters,
        })),
        (this.storagePrefix =
          `${this.prefix}.${this._developerToken.teamId}`.toLocaleLowerCase()),
        this.updateUserTokenFromStorage(),
        this.developerToken &&
          this.userTokenIsValid &&
          (this._restrictedEnabled = this.restrictedEnabled),
        (this._storefrontCountryCode = this.storefrontCountryCode),
        (this.whenAuthCompleted = Promise.resolve()),
        isNodeEnvironment$1() ||
          (this._processLocationHash(window.location.hash),
          'cookie' !== this.persist ||
            (null == n ? void 0 : n.disableAuthBridge) ||
            ((this.authBridgeApp = new AuthBridgeApp()),
            (this.authBridgeApp.authClearedFromOtherFrame =
              this.revokeUserToken.bind(this)),
            (this.whenAuthCompleted = this.authBridgeApp.whenAuthCompleted.then(
              () => {
                this.updateUserTokenFromStorage();
              }
            ))));
    }
    updateUserTokenFromStorage() {
      const e = this._getStorageItem(mn.USER_TOKEN);
      this.userToken = e || void 0;
    }
    get authorizationStatus() {
      return this._authorizationStatus;
    }
    set authorizationStatus(e) {
      this._authorizationStatus !== e &&
        (this._getIsActiveSubscription.updateCache(void 0),
        this.dispatchEvent(gn.authorizationStatusWillChange, {
          authorizationStatus: this._authorizationStatus,
          newAuthorizationStatus: e,
        }),
        (this._authorizationStatus = e),
        this.dispatchEvent(gn.authorizationStatusDidChange, {
          authorizationStatus: e,
        }));
    }
    get cid() {
      if (!this._cids[this.cidNamespace]) {
        const e = this._getStorageItem(this.cidNamespace);
        this._cids[this.cidNamespace] = e || void 0;
      }
      return this._cids[this.cidNamespace];
    }
    set cid(e) {
      e
        ? this._setStorageItem(this.cidNamespace, e)
        : this._removeStorageItem(this.cidNamespace),
        (this._cids[this.cidNamespace] = e);
    }
    eligibleForSubscribeView() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = yield this.hasMusicSubscription();
        return (
          (!this.hasAuthorized || (this.hasAuthorized && !e)) &&
          !this._dispatchedSubscribeView
        );
      });
    }
    get hasAuthorized() {
      return this.authorizationStatus > ln.DENIED;
    }
    get logoutURL() {
      if (!this._disableLogoutURL) return this.playBase + '/webPlayerLogout';
    }
    get _pldfltcid() {
      return this._cids[mn.DEFAULT_CID];
    }
    set _pldfltcid(e) {
      this._cids[mn.DEFAULT_CID] = e;
    }
    get restrictedEnabled() {
      if (this.userToken && 'boolean' != typeof this._restrictedEnabled) {
        const e = this._getStorageItem(mn.RESTRICTIONS_ENABLED);
        if (e) this._restrictedEnabled = '0' !== e;
        else if (this._storefrontCountryCode) {
          const e = [
            'br',
            'ch',
            'gt',
            'hu',
            'id',
            'in',
            'it',
            'kr',
            'la',
            'lt',
            'my',
            'ru',
            'sg',
            'tr',
          ];
          this._restrictedEnabled =
            -1 !== e.indexOf(this._storefrontCountryCode) || void 0;
        }
      }
      return this._restrictedEnabled;
    }
    set restrictedEnabled(e) {
      this._restrictedEnabledOverridden ||
        (this.userToken &&
          void 0 !== e &&
          this._setStorageItem(mn.RESTRICTIONS_ENABLED, e ? '1' : '0'),
        (this._restrictedEnabled = e),
        e && (this.authorizationStatus = ln.RESTRICTED));
    }
    overrideRestrictEnabled(e) {
      (this._restrictedEnabledOverridden = !1),
        (this.restrictedEnabled = e),
        (this._restrictedEnabledOverridden = !0);
    }
    get storefrontCountryCode() {
      if (!this._storefrontCountryCode) {
        const e = this._getStorageItem(mn.STOREFRONT_COUNTRY_CODE);
        this._storefrontCountryCode =
          (null == e ? void 0 : e.toLowerCase()) || yn.ID;
      }
      return this._storefrontCountryCode;
    }
    set storefrontCountryCode(e) {
      e && this.userToken
        ? this._setStorageItem(mn.STOREFRONT_COUNTRY_CODE, e)
        : this._removeStorageItem(mn.STOREFRONT_COUNTRY_CODE),
        e !== this._storefrontCountryCode &&
          ((this._storefrontCountryCode = e),
          this.dispatchEvent(gn.storefrontCountryCodeDidChange, {
            storefrontCountryCode: e,
          }));
    }
    get storefrontIdentifier() {
      return this._storefrontIdentifier;
    }
    set storefrontIdentifier(e) {
      (this._storefrontIdentifier = e),
        this.dispatchEvent(gn.storefrontIdentifierDidChange, {
          storefrontIdentifier: e,
        });
    }
    runTokenValidations(e, n = !0) {
      e && validateToken(e)
        ? (n && this._setStorageItem(mn.USER_TOKEN, e),
          (this.authorizationStatus = this.restrictedEnabled
            ? ln.RESTRICTED
            : ln.AUTHORIZED))
        : (this._removeStorageItem(mn.USER_TOKEN),
          (this.authorizationStatus = ln.NOT_DETERMINED));
    }
    wrapDynamicUserTokenForChanges(e, n = invoke(e)) {
      if ('function' != typeof e) return e;
      let d = n;
      return () => {
        const n = invoke(e);
        return (
          d !== n &&
            ((d = n),
            this.runTokenValidations(n, !1),
            this.dispatchEvent(gn.userTokenDidChange, { userToken: n })),
          n || ''
        );
      };
    }
    get dynamicUserToken() {
      return this._dynamicUserToken;
    }
    set dynamicUserToken(e) {
      const n = invoke(e);
      (this._dynamicUserToken = this.wrapDynamicUserTokenForChanges(e, n)),
        this.runTokenValidations(n, 'function' != typeof e),
        this.dispatchEvent(gn.userTokenDidChange, { userToken: n });
    }
    get userToken() {
      return invoke(this.dynamicUserToken);
    }
    set userToken(e) {
      this.dynamicUserToken = e;
    }
    get userTokenIsValid() {
      return validateToken(this.userToken);
    }
    deeplinkURL(e = {}) {
      return (
        'https://finance-app.itunes.apple.com/deeplink?' +
        buildQueryParams(
          (e = Object.assign(
            Object.assign({}, this.deeplinkParameters || {}),
            e
          ))
        )
      );
    }
    itunesDeeplinkURL(e = { p: 'browse' }) {
      return (
        'https://itunes.apple.com/deeplink?' +
        buildQueryParams(
          (e = Object.assign(
            Object.assign({}, this.deeplinkParameters || {}),
            e
          ))
        )
      );
    }
    pldfltcid() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this._cids[mn.DEFAULT_CID])
          try {
            yield this.infoRefresh();
          } catch (e) {
            return;
          }
        return this._cids[mn.DEFAULT_CID];
      });
    }
    renewUserToken() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this.userToken) return this.requestUserToken();
        const e = new Headers({
            Authorization: 'Bearer ' + this.developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + this.userToken,
          }),
          n = yield fetch(this.playBase + '/renewMusicToken', {
            method: 'POST',
            headers: e,
          });
        if (401 === n.status)
          return (
            yield this.revokeUserToken(),
            Promise.reject(new Error('Renew token'))
          );
        const d = yield n.json();
        return (
          d['music-token'] && (this.userToken = d['music-token']),
          this.userToken
        );
      });
    }
    requestStorefrontCountryCode() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.authorizationStatus <= ln.DENIED)
          return Promise.reject('Not authorized: ' + this.authorizationStatus);
        const e = new Headers({
            Authorization: 'Bearer ' + this.developerToken,
            'Music-User-Token': this.userToken || '',
          }),
          n = yield fetch(this.apiBase + '/me/storefront', { headers: e });
        if (n && !n.ok)
          return (
            this._reset(), Promise.reject('Storefront Country Code error.')
          );
        const d = yield n.json();
        if (d.errors) return Promise.reject(d.errors);
        const [h] = d.data;
        return h && h.id
          ? ((this.storefrontCountryCode = h.id), this.storefrontCountryCode)
          : Promise.reject('Storefront Country Code error.');
      });
    }
    requestStorefrontIdentifier() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this.storefrontIdentifier) {
          const e = yield class {
            constructor(e, n, d) {
              (this.id = e),
                (this.attributes = n),
                (this.type = 'storefronts'),
                (this.href = d || `/v1/${this.type}/${e}`);
            }
            static inferFromLanguages(
              e,
              n = (function () {
                if ('undefined' == typeof navigator) return [];
                if (navigator.languages) return navigator.languages;
                const e = navigator.language || navigator.userLanguage;
                return e ? [e] : [];
              })()
            ) {
              return __awaiter(this, void 0, void 0, function* () {
                const d = yield (function (
                    e,
                    n = 'https://api.music.apple.com/v1'
                  ) {
                    return __awaiter(this, void 0, void 0, function* () {
                      const d = new Headers({ Authorization: 'Bearer ' + e }),
                        h = yield fetch(n + '/storefronts', { headers: d }),
                        p = yield h.json();
                      return p.errors ? Promise.reject(p.errors) : p.data;
                    });
                  })(e),
                  h = d.map((e) => e.id),
                  p = n[0] || 'en-US',
                  [y, m] = p.toLowerCase().split(/-|_/),
                  g = h.includes(m) ? m : 'us';
                return d.find((e) => e.id === g);
              });
            }
          }.inferFromLanguages(this.developerToken);
          this.storefrontIdentifier = e.id;
        }
        return this.storefrontIdentifier;
      });
    }
    requestUserToken() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this._serviceSetupView.isServiceView) return this.userToken || '';
        try {
          const e = yield this._serviceSetupView.load({ action: pn.AUTHORIZE });
          (this.cid = e.cid),
            (this.userToken = e.userToken),
            (this.restrictedEnabled = e.restricted);
        } catch (e) {
          return (
            this._reset(), (this.authorizationStatus = e), Promise.reject(e)
          );
        }
        return this.userToken;
      });
    }
    revokeUserToken() {
      var e;
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield this._webPlayerLogout();
        } catch (n) {}
        null === (e = this.authBridgeApp) || void 0 === e || e.clearAuth(),
          this.dispatchEvent(gn.authorizationStatusWillChange, {
            authorizationStatus: this.authorizationStatus,
            newAuthorizationStatus: ln.NOT_DETERMINED,
          }),
          this._reset(),
          this.dispatchEvent(gn.authorizationStatusDidChange, {
            authorizationStatus: this.authorizationStatus,
          }),
          this.dispatchEvent(gn.userTokenDidChange, {
            userToken: this.userToken,
          });
      });
    }
    setCids(e) {
      (this._cids = Object.assign(Object.assign({}, this._cids), e)),
        Object.keys(this._cids).forEach((e) => {
          this._setStorageItem(e, this._cids[e]);
        });
    }
    hasMusicSubscription() {
      return __awaiter(this, void 0, void 0, function* () {
        return !!this.hasAuthorized && this._getIsActiveSubscription();
      });
    }
    _getIsActiveSubscription() {
      var e;
      return __awaiter(this, void 0, void 0, function* () {
        const n = yield this.me();
        return !!(null === (e = n.subscription) || void 0 === e
          ? void 0
          : e.active);
      });
    }
    resetSubscribeViewEligibility() {
      this._dispatchedSubscribeView = !1;
    }
    presentSubscribeViewForEligibleUsers(e = {}, n = !0) {
      return __awaiter(this, void 0, void 0, function* () {
        const d = yield this.eligibleForSubscribeView();
        if (!this._serviceSetupView.isServiceView && d) {
          if (!n)
            return (
              this.dispatchEvent(gn.eligibleForSubscribeView, e),
              void (this._dispatchedSubscribeView = !0)
            );
          try {
            const e = yield this._serviceSetupView.load({
              action: pn.SUBSCRIBE,
            });
            return (this._dispatchedSubscribeView = !0), e;
          } catch (h) {
            return this.revokeUserToken();
          }
        }
      });
    }
    infoRefresh() {
      return __awaiter(this, void 0, void 0, function* () {
        if (this.authorizationStatus <= ln.DENIED)
          return Promise.reject('Not authorized: ' + this.authorizationStatus);
        const e = new Headers({
          Authorization: 'Bearer ' + this.developerToken,
          'Music-User-Token': this.userToken || '',
        });
        try {
          const n = yield fetch(
              this.iTunesBuyBase + '/account/web/infoRefresh',
              { credentials: 'include', headers: e }
            ),
            d = yield n.json();
          this.setCids(d);
        } catch (n) {}
      });
    }
    me() {
      return this.authorizationStatus <= ln.DENIED
        ? Promise.reject('Not authorized: ' + this.authorizationStatus)
        : (this._me ||
            (this._me = new Promise((e, n) =>
              __awaiter(this, void 0, void 0, function* () {
                const d = new Headers({
                    Authorization: 'Bearer ' + this.developerToken,
                    'Music-User-Token': this.userToken || '',
                  }),
                  h = addQueryParamsToURL(
                    this.apiBase + '/me/account',
                    Object.assign({ meta: 'subscription' }, this.meParameters)
                  ),
                  p = yield fetch(h, { headers: d });
                if (p && !p.ok)
                  return 2 !== this.realm && this._reset(), n('Account error.');
                let y = yield p.json();
                if (y.errors) return n(y.errors);
                const { data: m, meta: g } = y;
                if (!g || !g.subscription) return n('Account error.');
                this.storefrontCountryCode = g.subscription.storefront;
                const _ = { meta: g, subscription: g.subscription };
                return m && m.length && (_.attributes = m[0].attributes), e(_);
              })
            )
              .then((e) => {
                var n;
                return (
                  this._getIsActiveSubscription.updateCache(
                    (null === (n = e.subscription) || void 0 === n
                      ? void 0
                      : n.active) || !1
                  ),
                  (this._me = null),
                  e
                );
              })
              .catch((e) => ((this._me = null), Promise.reject(e)))),
          this._me);
    }
    _getStorageItem(e) {
      var n;
      if (e)
        return 'cookie' === this.persist
          ? getCookie(e)
          : 'localstorage' === this.persist
          ? null === (n = this.storage) || void 0 === n
            ? void 0
            : n.getItem(`${this.storagePrefix}.${e}`)
          : void 0;
    }
    _processLocationHash(e) {
      const n = /^\#([a-zA-Z0-9+\/]{200,}={0,2})$/;
      if (n.test(e)) {
        const h = e.replace(n, '$1');
        try {
          const { itre: e, musicUserToken: n, cid: d } = JSON.parse(atob(h));
          (this.restrictedEnabled = e && '1' === e),
            (this.userToken = n),
            (this.cid = d);
        } catch (d) {}
        history.replaceState(null, document.title, ' ');
      }
    }
    _removeStorageItem(e) {
      var n;
      if ('cookie' === this.persist) this._removeCookieFromDomains(e);
      else if ('localstorage' === this.persist)
        return null === (n = this.storage) || void 0 === n
          ? void 0
          : n.removeItem(`${this.storagePrefix}.${e}`);
    }
    _removeCookieFromDomains(e, n = window) {
      removeCookie(e);
      const { hostname: d } = n.location,
        h = d.split('.');
      if (h.length && (h.shift(), h.length > 2))
        for (let p = h.length; p > 2; p--) {
          const d = h.join('.');
          h.shift(), removeCookie(e, n, d);
        }
    }
    _reset(e = ln.NOT_DETERMINED) {
      (this._authorizationStatus = e),
        (this._cids = {}),
        (this._dispatchedSubscribeView = !1),
        (this._restrictedEnabled = void 0),
        (this._storefrontCountryCode = void 0),
        this._getIsActiveSubscription.updateCache(void 0),
        Object.keys(on).forEach((e) => {
          this._removeStorageItem(on[e]);
        }),
        this._removeStorageItem(mn.RESTRICTIONS_ENABLED),
        this._removeStorageItem(mn.USER_TOKEN),
        this._removeStorageItem(mn.STOREFRONT_COUNTRY_CODE),
        (this._dynamicUserToken = void 0),
        (this._me = null);
    }
    _setStorageItem(e, n) {
      var d, h;
      return 'cookie' === this.persist
        ? (null === (d = this.authBridgeApp) ||
            void 0 === d ||
            d.setCookieItem(e, n),
          setCookie(e, n, '/', 180))
        : 'localstorage' === this.persist
        ? null === (h = this.storage) || void 0 === h
          ? void 0
          : h.setItem(`${this.storagePrefix}.${e}`, n)
        : void 0;
    }
    _webPlayerLogout() {
      return __awaiter(this, void 0, void 0, function* () {
        const e = this.logoutURL;
        if (!e) return;
        const n = new Headers({
            Authorization: 'Bearer ' + this.developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + this.userToken,
          }),
          d = yield fetch(e, {
            method: 'POST',
            headers: n,
            credentials: 'same-origin',
          });
        return d && !d.ok ? Promise.reject(d.status) : d.json();
      });
    }
  }
  __decorate(
    [
      (
        (e = 300) =>
        (n, d, h) => {
          if (void 0 === h || 'function' != typeof h.value)
            throw new TypeError(
              `Only methods can be decorated with @CachedResult, but ${d} is not a method.`
            );
          return {
            configurable: !0,
            get() {
              const n = h.value,
                p = 1e3 * e;
              let y,
                m = -1;
              function cachedResultMethod(...e) {
                return __awaiter(this, void 0, void 0, function* () {
                  const d = Date.now();
                  return (
                    (void 0 === y || -1 === m || (m > 0 && d > m + p)) &&
                      ((m = d), (y = yield n.apply(this, e))),
                    y
                  );
                });
              }
              return (
                (cachedResultMethod.updateCache = function (e) {
                  (m = Date.now()), (y = e);
                }),
                (cachedResultMethod.getCachedValue = () => y),
                Object.defineProperty(this, d, {
                  value: cachedResultMethod,
                  configurable: !0,
                  writable: !0,
                }),
                cachedResultMethod
              );
            },
          };
        }
      )(900),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', Promise),
    ],
    StoreKit.prototype,
    '_getIsActiveSubscription',
    null
  );
  const _n = {
    configured: 'musickitconfigured',
    loaded: 'musickitloaded',
    audioTrackAdded: St.audioTrackAdded,
    audioTrackChanged: St.audioTrackChanged,
    audioTrackRemoved: St.audioTrackRemoved,
    authorizationStatusDidChange: gn.authorizationStatusDidChange,
    authorizationStatusWillChange: gn.authorizationStatusWillChange,
    bufferedProgressDidChange: St.bufferedProgressDidChange,
    capabilitiesChanged: 'capabilitiesChanged',
    autoplayEnabledDidChange: 'autoplayEnabledDidChange',
    drmUnsupported: St.drmUnsupported,
    eligibleForSubscribeView: gn.eligibleForSubscribeView,
    forcedTextTrackChanged: St.forcedTextTrackChanged,
    mediaCanPlay: St.mediaCanPlay,
    mediaElementCreated: St.mediaElementCreated,
    mediaItemStateDidChange: P.mediaItemStateDidChange,
    mediaItemStateWillChange: P.mediaItemStateWillChange,
    mediaPlaybackError: St.mediaPlaybackError,
    mediaSkipAvailable: 'mediaSkipAvailable',
    mediaRollEntered: 'mediaRollEntered',
    mediaUpNext: 'mediaUpNext',
    metadataDidChange: St.metadataDidChange,
    nowPlayingItemDidChange: St.nowPlayingItemDidChange,
    nowPlayingItemWillChange: St.nowPlayingItemWillChange,
    playbackBitrateDidChange: St.playbackBitrateDidChange,
    playbackDurationDidChange: St.playbackDurationDidChange,
    playbackProgressDidChange: St.playbackProgressDidChange,
    playbackRateDidChange: St.playbackRateDidChange,
    playbackStateDidChange: St.playbackStateDidChange,
    playbackStateWillChange: St.playbackStateWillChange,
    playbackTargetAvailableDidChange: St.playbackTargetAvailableDidChange,
    playbackTargetIsWirelessDidChange: St.playbackTargetIsWirelessDidChange,
    playbackTimeDidChange: St.playbackTimeDidChange,
    playbackVolumeDidChange: St.playbackVolumeDidChange,
    playerTypeDidChange: St.playerTypeDidChange,
    presentationModeDidChange: St.presentationModeDidChange,
    primaryPlayerDidChange: St.primaryPlayerDidChange,
    queueIsReady: 'queueIsReady',
    queueItemsDidChange: 'queueItemsDidChange',
    queueItemForStartPosition: 'queueItemForStartPosition',
    queuePositionDidChange: 'queuePositionDidChange',
    shuffleModeDidChange: 'shuffleModeDidChange',
    repeatModeDidChange: 'repeatModeDidChange',
    storefrontCountryCodeDidChange: gn.storefrontCountryCodeDidChange,
    storefrontIdentifierDidChange: gn.storefrontIdentifierDidChange,
    textTrackAdded: St.textTrackAdded,
    textTrackChanged: St.textTrackChanged,
    textTrackRemoved: St.textTrackRemoved,
    timedMetadataDidChange: St.timedMetadataDidChange,
    userTokenDidChange: gn.userTokenDidChange,
    webComponentsLoaded: 'musickitwebcomponentsloaded',
  };
  class SpanWatcher {
    constructor(e, n, d, h, p = !1) {
      (this.dispatcher = e),
        (this.callback = n),
        (this.start = d),
        (this.stop = h),
        (this.allowMultiple = p),
        (this.inWatchSpan = !1);
    }
    startMonitor() {
      this.dispatcher.unsubscribe(
        _n.playbackTimeDidChange,
        this.handleTimeChange
      ),
        this.dispatcher.subscribe(
          _n.playbackTimeDidChange,
          this.handleTimeChange
        );
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(
        _n.playbackTimeDidChange,
        this.handleTimeChange
      );
    }
    handleTimeChange(e, { currentPlaybackTime: n }) {
      return __awaiter$1(this, void 0, void 0, function* () {
        !Number.isFinite(n) || n < this.start || n > this.stop
          ? (this.inWatchSpan = !1)
          : this.inWatchSpan ||
            (this.allowMultiple || this.stopMonitor(),
            (this.inWatchSpan = !0),
            yield this.callback(n, this));
      });
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [Object, Object]),
      __metadata$1('design:returntype', Promise),
    ],
    SpanWatcher.prototype,
    'handleTimeChange',
    null
  );
  class PlaybackMonitor {
    constructor(e) {
      (this.isActive = !1),
        (this.isMonitoring = !1),
        (this.watchers = []),
        (this.handlePlaybackThreshold =
          this.handlePlaybackThreshold.bind(this)),
        (this.playbackController = e.controller),
        (this.dispatcher = e.services.dispatcher),
        this.dispatcher.subscribe(
          _n.nowPlayingItemDidChange,
          this.handleMediaItemChange
        ),
        (this.apiManager = e.services.apiManager);
    }
    activate() {
      (this.isActive = !0), this.startMonitor();
    }
    deactivate() {
      (this.isActive = !1), this.clearMonitor();
    }
    clearMonitor() {
      this.isMonitoring &&
        (this.watchers.forEach((e) => e.stopMonitor()),
        (this.isMonitoring = !1));
    }
    shouldMonitor() {
      return this.isActive;
    }
    startMonitor() {
      this.shouldMonitor() &&
        (this.watchers.forEach((e) => e.startMonitor()),
        (this.isMonitoring = !0));
    }
    handleMediaItemChange() {
      this.isActive &&
        (this.clearMonitor(), this.shouldMonitor() && this.startMonitor());
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', []),
      __metadata$1('design:returntype', void 0),
    ],
    PlaybackMonitor.prototype,
    'handleMediaItemChange',
    null
  );
  class RollMonitor extends PlaybackMonitor {
    constructor(e) {
      super(e), (this.rollMap = new Map());
    }
    handlePlaybackThreshold(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.rollMap.has(n)) return;
        const e = this.rollMap.get(n);
        this.dispatcher.publish(_n.mediaRollEntered, e), this.rollMap.delete(n);
      });
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1;
      return this.getRollMetadata().length > 0;
    }
    startMonitor() {
      this.setupWatchers(this.getRollMetadata()), super.startMonitor();
    }
    getRollMetadata() {
      const e = this.playbackController.nowPlayingItem;
      return void 0 === e
        ? []
        : ((e, n = ['pre-roll', 'mid-roll', 'post-roll']) => {
            if (void 0 === e.hlsMetadata) return [];
            const d = [];
            return (
              n.forEach((n) => {
                const h = parseInt(e.hlsMetadata[n + '.count'], 10);
                if (!isNaN(h))
                  for (let p = 0; p < h; p++) {
                    const h = `${n}.${p}`;
                    d.push({
                      index: p,
                      type: n,
                      skippable: 'true' === e.hlsMetadata[h + '.skippable'],
                      'adam-id': e.hlsMetadata[h + '.adam-id'],
                      start: Math.round(
                        parseFloat(e.hlsMetadata[h + '.start'])
                      ),
                      duration: Math.round(
                        parseFloat(e.hlsMetadata[h + '.duration'])
                      ),
                    });
                  }
              }),
              d
            );
          })(e, ['pre-roll', 'post-roll']);
    }
    setupWatchers(e) {
      const n = [];
      e.forEach((e) => {
        const { start: d, duration: h } = e,
          p = new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            d,
            d + h
          );
        n.push(p), this.rollMap.set(p, e);
      }),
        (this.watchers = n);
    }
  }
  class SkipAvailable extends PlaybackMonitor {
    constructor(e) {
      super(e), (this.skipMap = new Map());
    }
    handlePlaybackThreshold(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.skipMap.has(n)) return;
        const e = this.skipMap.get(n);
        this.dispatcher.publish(_n.mediaSkipAvailable, e),
          this.skipMap.delete(n);
      });
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1;
      return this.getNowPlayingMetadata().length > 0;
    }
    startMonitor() {
      this.setupWatchers(this.getNowPlayingMetadata()), super.startMonitor();
    }
    getNowPlayingMetadata() {
      const e = this.playbackController.nowPlayingItem;
      return void 0 === e
        ? []
        : ((e) => {
            const n = parseInt(e.hlsMetadata['skip.count'], 10),
              d = [];
            if (isNaN(n) || 0 === n) return d;
            for (let h = 0; h < n; h++)
              d.push({
                start: parseFloat(e.hlsMetadata[`skip.${h}.start`]),
                duration: parseFloat(e.hlsMetadata[`skip.${h}.duration`]),
                target: parseFloat(e.hlsMetadata[`skip.${h}.target`]),
                label: e.hlsMetadata[`skip.${h}.label`],
              });
            return d;
          })(e);
    }
    setupWatchers(e) {
      const n = [];
      e.forEach((e) => {
        const { start: d, duration: h } = e,
          p = new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            d,
            d + h
          );
        n.push(p), this.skipMap.set(p, e);
      }),
        (this.watchers = n);
    }
  }
  const bn = new (class {
      constructor(e = {}) {
        var n, d;
        (this.fetch =
          null !== (n = e.fetch) && void 0 !== n ? n : fetch.bind(globalThis)),
          (this.cache = null !== (d = e.cache) && void 0 !== d ? d : new Map());
      }
      fetchManifest(e) {
        return __awaiter(this, void 0, void 0, function* () {
          return (
            Et.info('fetching manifest at', e),
            shouldLoadManifestOnce() ? this.fetchForCache(e) : this.fetchOnly(e)
          );
        });
      }
      getManifest(e) {
        return this.cache.get(e);
      }
      clear(e) {
        e ? this.cache.delete(e) : this.cache.clear();
      }
      fetchForCache(e) {
        var n;
        return __awaiter(this, void 0, void 0, function* () {
          const d = { 'media-user-token': ms.musicUserToken };
          ms.cid && (d['x-apple-pltvcid'] = ms.cid);
          const h = yield this.fetch(e, { headers: new Headers(d) });
          let p = yield h.text();
          p = ((e, n) => {
            Et.info('converting manifest URIs to absolute paths');
            const d = e.replace(/playlist\.m3u8.*$/, 'stream/playlist.m3u8');
            return n.replace(/stream\/playlist\.m3u8/g, d);
          })(e, p);
          const y = {
            url: e,
            content: p,
            contentType:
              null !== (n = h.headers.get('content-type')) && void 0 !== n
                ? n
                : void 0,
          };
          return this.cache.set(e, y), y;
        });
      }
      fetchOnly(e) {
        var n;
        return __awaiter(this, void 0, void 0, function* () {
          const d = yield this.fetch(e),
            h = yield d.text();
          return {
            url: e,
            content: h,
            contentType:
              null !== (n = d.headers.get('content-type')) && void 0 !== n
                ? n
                : void 0,
          };
        });
      }
    })(),
    getUpNextStart = (e) => parseFloat(e.hlsMetadata['up-next.start']),
    getWatchedTime = (e) => parseFloat(e.hlsMetadata['watched.time']);
  class UpNextMonitor extends PlaybackMonitor {
    constructor(e) {
      super(e);
      const n = this.handlePlaybackThreshold;
      this.watchers = [
        {
          startMonitor: () => {
            this.dispatcher.unsubscribe(bt.mediaContentComplete, n),
              this.dispatcher.subscribe(bt.mediaContentComplete, n);
          },
          stopMonitor: () => {
            this.dispatcher.unsubscribe(bt.mediaContentComplete, n);
          },
        },
      ];
    }
    handlePlaybackThreshold() {
      var e, n, d, h, p, y, m, g;
      return __awaiter$1(this, void 0, void 0, function* () {
        const _ = this.playbackController.nowPlayingItem;
        let b;
        if (
          null === (e = null == _ ? void 0 : _.attributes) || void 0 === e
            ? void 0
            : e.showId
        ) {
          try {
            if (
              ((b = yield null === (n = this.apiManager.utsClient) ||
              void 0 === n
                ? void 0
                : n.refresh('getNextEpisode', {
                    showId:
                      null === (d = null == _ ? void 0 : _.attributes) ||
                      void 0 === d
                        ? void 0
                        : d.showId,
                    episodeId:
                      null === (h = null == _ ? void 0 : _.defaultPlayable) ||
                      void 0 === h
                        ? void 0
                        : h.canonicalId,
                  })),
              null == b ? void 0 : b.content)
            ) {
              const e =
                null ===
                  (y =
                    null === (p = Object.entries(b.playables)) || void 0 === p
                      ? void 0
                      : p[0]) || void 0 === y
                  ? void 0
                  : y[1];
              b = Object.assign(Object.assign({}, b.content), { playable: e });
            }
          } catch (S) {}
          if (b && this.isAppleOriginal(b) && this.isEntitledToPlay(b))
            return void this.dispatcher.publish(_n.mediaUpNext, {
              item: b,
              isNextEpisode: !0,
            });
        }
        let T = yield null === (m = this.apiManager.utsClient) || void 0 === m
          ? void 0
          : m.refresh('getPostPlayShelf', {
              contentId: null == _ ? void 0 : _.id,
            });
        if (
          ((null == T ? void 0 : T.shelf) && (T = T.shelf),
          (null == T ? void 0 : T.items) ||
            (T = yield null === (g = this.apiManager.utsClient) || void 0 === g
              ? void 0
              : g.refresh('watchlistContinueWatching')),
          !(null == T ? void 0 : T.items) || !Array.isArray(T.items))
        )
          return;
        let E = T.items.find(
          (e) =>
            this.isAppleOriginal(e) &&
            'Show' !== e.type &&
            this.isEntitledToPlay(e)
        );
        E &&
          (E.content &&
            (E = Object.assign(Object.assign({}, E.content), {
              playable: E.playable,
            })),
          this.dispatcher.publish(_n.mediaUpNext, { item: E }));
      });
    }
    shouldMonitor() {
      return (
        !!super.shouldMonitor() &&
        void 0 !== this.playbackController.nowPlayingItem &&
        ((e = this.playbackController.nowPlayingItem),
        !isNaN(getUpNextStart(e)) && !isNaN(getWatchedTime(e)))
      );
      var e;
    }
    isAppleOriginal(e) {
      var n;
      return (
        e.isAppleOriginal ||
        (null === (n = e.content) || void 0 === n ? void 0 : n.isAppleOriginal)
      );
    }
    isEntitledToPlay(e) {
      var n, d;
      return (
        e.isEntitledToPlay ||
        (null === (n = e.content) || void 0 === n
          ? void 0
          : n.isEntitledToPlay) ||
        (null === (d = e.playable) || void 0 === d
          ? void 0
          : d.isEntitledToPlay)
      );
    }
  }
  const Tn = getHlsJsCdnConfig(),
    En = {
      app: {},
      autoplay: {
        maxQueueSizeForAutoplay: 50,
        maxQueueSizeInRequest: 10,
        maxUpcomingTracksToMaintain: 10,
      },
      features: {
        xtrick: !0,
        isWeb: !0,
        bookmarking: !1,
        'seamless-audio-transitions': !0,
        'enhanced-hls': !1,
      },
      urls: {
        hls: Tn.hls,
        rtc: Tn.rtc,
        mediaApi: 'https://api.music.apple.com/v1',
        webPlayback: `https://${getCommerceHostname(
          'play'
        )}/WebObjects/MZPlay.woa/wa/webPlayback`,
      },
    },
    Sn = JsonDevFlag.register('mk-offers-key-urls').get();
  let kn;
  Sn && (En.urls.hlsOffersKeyUrls = Sn);
  class Store {
    constructor(e, n = {}) {
      (this._hasAuthorized = !1),
        (this._providedRequestUserToken = !1),
        (this._ageVerificationRequired = (e, n) => !0),
        (this._dispatcher = n.services.dispatcher),
        n.precache && (this.precache = n.precache),
        n.storefrontId && (this.storefrontId = n.storefrontId),
        (this._defaultStorefrontCountryCode = n.storefrontCountryCode),
        (n.affiliateToken || n.campaignToken) &&
          (n.linkParameters = Object.assign(
            Object.assign({}, n.linkParameters || {}),
            { at: n.affiliateToken, ct: n.campaignToken }
          )),
        (this.storekit = new StoreKit(e, {
          apiBase: En.urls.mediaApi,
          authenticateMethod: En.features['legacy-authenticate-method']
            ? 'POST'
            : 'GET',
          deeplink: n.linkParameters,
          disableAuthBridge: n.disableAuthBridge,
          iconURL: En.app.icon,
          meParameters: n.meParameters,
          persist: n.persist,
          realm: n.realm || 0,
        })),
        this.storekit.addEventListener(_n.authorizationStatusDidChange, (e) => {
          const { authorizationStatus: n } = e;
          this._hasAuthorized = [ln.AUTHORIZED, ln.RESTRICTED].includes(n);
        });
    }
    get authorizationStatus() {
      return this.storekit.authorizationStatus;
    }
    get cid() {
      return this.storekit.cid;
    }
    get developerToken() {
      return this.storekit.developerToken;
    }
    get hasAuthorized() {
      return this._hasAuthorized;
    }
    get isAuthorized() {
      return this.storekit.hasAuthorized;
    }
    get isRestricted() {
      return this.storekit.authorizationStatus === ln.RESTRICTED;
    }
    get metricsClientId() {
      return this._metricsClientId;
    }
    set metricsClientId(e) {
      this._metricsClientId = e;
    }
    get musicUserToken() {
      return this.storekit.userToken;
    }
    set musicUserToken(e) {
      this.storekit.userToken = e;
    }
    set dynamicMusicUserToken(e) {
      this.storekit.dynamicUserToken = e;
    }
    get realm() {
      return this.storekit.realm;
    }
    set requestUserToken(e) {
      (this._providedRequestUserToken = !0),
        (this.storekit.requestUserToken = e);
    }
    get restrictedEnabled() {
      return this.storekit.restrictedEnabled;
    }
    set restrictedEnabled(e) {
      this.storekit.overrideRestrictEnabled(e);
    }
    get storefrontCountryCode() {
      var e;
      return this.isAuthorized
        ? this.storekit.storefrontCountryCode
        : null !== (e = this._defaultStorefrontCountryCode) && void 0 !== e
        ? e
        : this.storekit.storefrontCountryCode;
    }
    get storefrontId() {
      return this._apiStorefrontId || this.storekit.storefrontCountryCode;
    }
    set storefrontId(e) {
      e && (e = e.toLowerCase()),
        e !== this._apiStorefrontId &&
          ((this._apiStorefrontId = e),
          this._dispatcher.publish(bt.apiStorefrontChanged, {
            storefrontId: e,
          }));
    }
    get subscribeURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe' });
    }
    get subscribeFamilyURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe-family' });
    }
    get subscribeIndividualURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe-individual' });
    }
    get subscribeStudentURL() {
      return this.storekit.deeplinkURL({ p: 'subscribe-student' });
    }
    get userToken() {
      return this.musicUserToken;
    }
    authorize() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.storekit.userTokenIsValid) return this.storekit.userToken;
        let e;
        try {
          e = yield this.storekit.requestUserToken();
        } catch (H) {
          try {
            yield this.unauthorize();
          } catch (Vt) {}
          throw new MKError(MKError.AUTHORIZATION_ERROR, 'Unauthorized');
        }
        return (
          this._providedRequestUserToken && (this.storekit.userToken = e),
          this.storekit.userTokenIsValid
            ? (yield this.storekit.requestStorefrontCountryCode().catch((e) =>
                __awaiter$1(this, void 0, void 0, function* () {
                  return yield this.unauthorize(), Promise.reject(e);
                })
              ),
              e)
            : void 0
        );
      });
    }
    unauthorize() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this.storekit.revokeUserToken();
      });
    }
  }
  function formattedSeconds(e) {
    return {
      hours: Math.floor(e / 3600),
      minutes: Math.floor((e % 3600) / 60),
    };
  }
  const Pn =
    /\/([a-z]{2})\/(album|artist|episode|movie|music-video|playlist|podcast|post|season|show|song|station)\/(?:[^\/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9\-]+|umc.cmc.[a-zA-Z0-9]+)(?:.*(?:[\?|\&]i=(\d+)).*)?.*$/i;
  function formattedMediaURL(e) {
    if (!Pn.test(e)) throw new TypeError('Invalid Media URL: ' + e);
    let [, n, d, h, p] = e.match(Pn);
    return (
      'music-video' === d && (d = 'musicVideo'),
      -1 !== ['album', 'playlist'].indexOf(d) && p
        ? ((d = 'song'), (h = p))
        : 'podcast' === d && p && ((d = 'episode'), (h = p)),
      {
        storefrontId: n,
        kind: d,
        contentId: h,
        isUTS: !!h && h.startsWith('umc.'),
      }
    );
  }
  function hasAuthorization(e) {
    return (
      void 0 === e && (e = kn && kn.storekit),
      void 0 !== e && e.hasAuthorized && e.userTokenIsValid
    );
  }
  function hasMusicSubscription(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return void 0 === e && (e = kn && kn.storekit), e.hasMusicSubscription();
    });
  }
  class MediaSessionManager {
    constructor(e, n) {
      (this.capabilities = e),
        (this.dispatcher = n),
        (this.session = navigator.mediaSession),
        this.session &&
          (this.dispatcher.subscribe(
            _n.nowPlayingItemDidChange,
            this.onNowPlayingItemDidChange
          ),
          this.dispatcher.subscribe(
            _n.capabilitiesChanged,
            this.onCapabilitiesChanged
          ),
          this._setMediaSessionHandlers());
    }
    onCapabilitiesChanged() {
      this._resetHandlers(), this._setMediaSessionHandlers();
    }
    onNowPlayingItemDidChange(e, { item: n }) {
      this._setMediaSessionMetadata(n);
    }
    _setMediaSessionMetadata(e) {
      var n, d;
      this.session &&
        'MediaMetadata' in window &&
        e &&
        (this.session.metadata = new window.MediaMetadata({
          title: e.title,
          artist:
            null !== (n = e.artistName) && void 0 !== n
              ? n
              : null === (d = e.attributes) || void 0 === d
              ? void 0
              : d.showTitle,
          album: e.albumName,
          artwork: e.artwork
            ? [96, 128, 192, 256, 384, 512].map((n) => ({
                src: formatArtworkURL(e.artwork, n, n),
                sizes: `${n}x${n}`,
                type: 'image/jpeg',
              }))
            : [],
        }));
    }
    _setMediaSessionHandlers() {
      this.session &&
        (this._resetHandlers(),
        this.session.setActionHandler('play', () => {
          var e;
          return null === (e = this.controller) || void 0 === e
            ? void 0
            : e.play();
        }),
        this.capabilities.canPause
          ? this.session.setActionHandler('pause', () => {
              var e;
              return null === (e = this.controller) || void 0 === e
                ? void 0
                : e.pause();
            })
          : this.session.setActionHandler('pause', () => {
              var e;
              return null === (e = this.controller) || void 0 === e
                ? void 0
                : e.stop();
            }),
        this.capabilities.canSeek &&
          (this.session.setActionHandler('seekforward', () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.seekForward();
          }),
          this.session.setActionHandler('seekbackward', () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.seekBackward();
          })),
        this.capabilities.canSkipToNextItem &&
          this.session.setActionHandler('nexttrack', () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.skipToNextItem();
          }),
        this.capabilities.canSkipToPreviousItem &&
          this.session.setActionHandler('previoustrack', () => {
            var e;
            return null === (e = this.controller) || void 0 === e
              ? void 0
              : e.skipToPreviousItem();
          }));
    }
    _resetHandlers() {
      this.session &&
        (this.session.setActionHandler('play', void 0),
        this.session.setActionHandler('pause', void 0),
        this.session.setActionHandler('seekforward', void 0),
        this.session.setActionHandler('seekbackward', void 0),
        this.session.setActionHandler('nexttrack', void 0),
        this.session.setActionHandler('previoustrack', void 0));
    }
  }
  var In;
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', []),
      __metadata$1('design:returntype', void 0),
    ],
    MediaSessionManager.prototype,
    'onCapabilitiesChanged',
    null
  ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', void 0),
      ],
      MediaSessionManager.prototype,
      'onNowPlayingItemDidChange',
      null
    ),
    (function (e) {
      (e[(e.PAUSE = 0)] = 'PAUSE'),
        (e[(e.EDIT_QUEUE = 1)] = 'EDIT_QUEUE'),
        (e[(e.SEEK = 2)] = 'SEEK'),
        (e[(e.REPEAT = 3)] = 'REPEAT'),
        (e[(e.SHUFFLE = 4)] = 'SHUFFLE'),
        (e[(e.SKIP_NEXT = 5)] = 'SKIP_NEXT'),
        (e[(e.SKIP_PREVIOUS = 6)] = 'SKIP_PREVIOUS'),
        (e[(e.SKIP_TO_ITEM = 7)] = 'SKIP_TO_ITEM');
    })(In || (In = {}));
  class Capabilities {
    constructor(e) {
      (this._dispatcher = e),
        (this._checkCapability = (e) => !1),
        (this._mediaSession = new MediaSessionManager(this, e));
    }
    set controller(e) {
      this._mediaSession.controller = e;
    }
    updateChecker(e) {
      this._checkCapability !== e &&
        ((this._checkCapability = e),
        this._dispatcher.publish(_n.capabilitiesChanged));
    }
    get canEditPlaybackQueue() {
      return this._checkCapability(In.EDIT_QUEUE);
    }
    get canPause() {
      return this._checkCapability(In.PAUSE);
    }
    get canSeek() {
      return this._checkCapability(In.SEEK);
    }
    get canSetRepeatMode() {
      return this._checkCapability(In.REPEAT);
    }
    get canSetShuffleMode() {
      return this._checkCapability(In.SHUFFLE);
    }
    get canSkipToNextItem() {
      return this._checkCapability(In.SKIP_NEXT);
    }
    get canSkipToMediaItem() {
      return this._checkCapability(In.SKIP_TO_ITEM);
    }
    get canSkipToPreviousItem() {
      return this._checkCapability(In.SKIP_PREVIOUS);
    }
  }
  const An = {
      condition: () => !0,
      toOptions: (e, n, d) => [
        Object.assign(Object.assign({}, e), { context: d }),
      ],
    },
    wn = {
      condition: (e) => {
        var n;
        return (
          'stations' === e.type &&
          (null === (n = e.attributes) || void 0 === n ? void 0 : n.isLive)
        );
      },
      toOptions: (e, n, d) => [
        Object.assign(Object.assign({}, e), {
          context: d,
          container: {
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            name: null == d ? void 0 : d.featureName,
          },
        }),
      ],
    },
    typeIs =
      (...e) =>
      ({ type: n }) =>
        e.includes(n),
    withBagPrefix = (e) => {
      if (void 0 === e || '' === e) return;
      const { prefix: n } = En;
      return n ? `${n}:${e}` : e;
    },
    getContainerName$1 = (e, n) => {
      var d, h;
      return null !==
        (h =
          null != n
            ? n
            : null === (d = null == e ? void 0 : e.container) || void 0 === d
            ? void 0
            : d.name) && void 0 !== h
        ? h
        : kt.SONG;
    },
    Rn = {
      toOptions: (e, n, d) => {
        const h = Object.assign(Object.assign({ id: e.id }, n), {
          name: withBagPrefix(
            getContainerName$1(e, null == d ? void 0 : d.featureName)
          ),
        });
        return [
          {
            relationships: e.relationships,
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            container: h,
            context: d,
          },
        ];
      },
      condition: typeIs('songs', 'library-songs', 'music-videos'),
    },
    parseAssets = ({ type: e, attributes: { assetTokens: n } }) =>
      e.includes('udio')
        ? ((e) => {
            if (void 0 === e) return;
            const [n] = Object.keys(e);
            return e[n];
          })(n)
        : ((e) => {
            if (void 0 === e) return;
            const n = Object.keys(e);
            return e[n[n.length - 1]];
          })(n),
    On = {
      condition: typeIs(
        'uploaded-audios',
        'uploadedAudio',
        'uploaded-videos',
        'uploadedVideo'
      ),
      toOptions: (e, n, d) => {
        var h, p;
        const y = Object.assign(Object.assign({}, e), {
          context: d,
          attributes: Object.assign(Object.assign({}, e.attributes), {
            assetUrl: parseAssets(e),
            playParams:
              null !==
                (p =
                  null === (h = null == e ? void 0 : e.attributes) ||
                  void 0 === h
                    ? void 0
                    : h.playParams) && void 0 !== p
                ? p
                : { id: e.id, kind: e.type },
          }),
        });
        return (
          void 0 !== n && (y.container = n),
          void 0 !== (null == d ? void 0 : d.featureName) &&
            (y.container = Object.assign(Object.assign({}, y.container), {
              name: null == d ? void 0 : d.featureName,
            })),
          [y]
        );
      },
    };
  const getFeatureName = (e, n) => {
    if (n) return n;
    const d = (function (e = []) {
      return (
        0 !== e.length &&
        e.filter(
          ({ attributes: e }) =>
            !!e &&
            (e.workName ||
              e.movementName ||
              e.movementCount ||
              e.movementNumber)
        ).length > 0
      );
    })(e.relationships.tracks.data);
    return 'albums' === e.type || 'library-albums' === e.type
      ? d
        ? kt.ALBUM_CLASSICAL
        : kt.ALBUM
      : 'playlists' === e.type || 'library-playlists' === e.type
      ? d
        ? kt.PLAYLIST_CLASSICAL
        : kt.PLAYLIST
      : void 0;
  };
  var Cn;
  const Mn = [
      {
        toOptions: (e, n, d) => {
          const h = {
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            name: withBagPrefix(
              getFeatureName(e, null == d ? void 0 : d.featureName)
            ),
          };
          return e.relationships.tracks.data.map((e) => ({
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            container: h,
            context: d,
          }));
        },
        condition:
          ((Cn = 'tracks'),
          (e) => {
            var n, d;
            return !!(null ===
              (d =
                null === (n = e.relationships) || void 0 === n
                  ? void 0
                  : n[Cn]) || void 0 === d
              ? void 0
              : d.data);
          }),
        requiredRelationships: ['tracks'],
      },
      Rn,
      wn,
      On,
    ],
    Dn = Mn.reduce((e, n) => {
      const d = n.requiredRelationships;
      return d && e.push(...d), e;
    }, []),
    Ln = new Set(Dn),
    isArrayOf = (e, n) => Array.isArray(e) && (0 === e.length || n(e[0])),
    isMediaAPIResource = (e) => e && void 0 !== e.id && void 0 !== e.type,
    isMediaItem = (e) => e && void 0 !== e.id,
    isMPMediaItem = (e) =>
      e &&
      void 0 !== e.contentId &&
      void 0 !== e.metadata &&
      void 0 !== e.metadata.itemId &&
      void 0 !== e.metadata.itemType,
    isQueueItems = (e) => e && e.items && Array.isArray(e.items),
    isQueueLoaded = (e) => e && e.loaded,
    isQueueURLOption = (e) => e && e.url,
    descriptorToMediaItems = (e) => {
      if (!isQueueItems(e) && !isQueueLoaded(e)) return [];
      const n = isQueueLoaded(e)
        ? loadedDescriptorToMediaItem(e)
        : unloadedDescriptorToMediaItem(e);
      return (
        n.forEach(
          (n) =>
            (n.context = Object.assign(Object.assign({}, e.context), n.context))
        ),
        n
      );
    },
    unloadedDescriptorToMediaItem = ({ items: e }) =>
      isArrayOf(e, isMPMediaItem)
        ? e.map(
            (e) =>
              new MediaItem(
                (function (e) {
                  const n = transform$8(
                    {
                      id: 'metadata.itemId',
                      type: 'metadata.itemType',
                      'attributes.contentRating'() {
                        var n;
                        if (
                          1 ===
                          (null === (n = null == e ? void 0 : e.metadata) ||
                          void 0 === n
                            ? void 0
                            : n.isExplicit)
                        )
                          return 'explicit';
                      },
                      'attributes.playParams'() {
                        var n, d, h;
                        return (
                          0 !==
                            (null === (n = null == e ? void 0 : e.metadata) ||
                            void 0 === n
                              ? void 0
                              : n.isPlayable) && {
                            id:
                              null === (d = null == e ? void 0 : e.metadata) ||
                              void 0 === d
                                ? void 0
                                : d.itemId,
                            kind:
                              null === (h = null == e ? void 0 : e.metadata) ||
                              void 0 === h
                                ? void 0
                                : h.itemType,
                          }
                        );
                      },
                      'container.id': 'metadata.containerId',
                      'container.name': 'metadata.containerName',
                      'container.type': 'metadata.containerType',
                    },
                    e
                  );
                  return Object.assign({ attributes: {} }, n);
                })(e)
              )
          )
        : isArrayOf(e, isMediaItem)
        ? e.map((e) => new MediaItem(e))
        : [],
    loadedDescriptorToMediaItem = (e) => {
      const n = [],
        { loaded: d, container: h, context: p } = e;
      return void 0 === d
        ? []
        : isArrayOf(d, isDataRecord)
        ? (d.forEach((e) => {
            n.push(...dataRecordToMediaItems(e, h, p));
          }),
          n)
        : isArrayOf(d, isMediaAPIResource)
        ? (d.forEach((e) => {
            n.push(...resourceToMediaItem(e, h, p));
          }),
          n)
        : isDataRecord(d)
        ? dataRecordToMediaItems(d, h, p)
        : isMediaAPIResource(d)
        ? resourceToMediaItem(d, h, p)
        : [];
    },
    dataRecordToMediaItems = (e, n, d = {}) => {
      const { data: h } = e.serialize(!0, void 0, {
        includeRelationships: Ln,
        allowFullDuplicateSerializations: !0,
      });
      return resourceToMediaItem(h, n, d);
    },
    resourceToMediaItem = (e, n, d = {}) => (
      M.debug('_resourceToMediaItem', e),
      ((e, n, d = {}) => {
        var h, p, y, m;
        n =
          null !==
            (y =
              null ===
                (p = null === (h = n) || void 0 === h ? void 0 : h.serialize) ||
              void 0 === p
                ? void 0
                : p.call(h).data) && void 0 !== y
            ? y
            : n;
        return (
          null !== (m = Mn.find((h) => h.condition(e, n, d))) && void 0 !== m
            ? m
            : An
        )
          .toOptions(e, n, d)
          .map((e) => new MediaItem(e));
      })(e, n, d)
    );
  class BaseModifiableQueue {
    constructor() {
      this.canModifyQueue = !1;
    }
    append(e) {
      We.warn('Append is not supported for this type of playback');
    }
    clear() {
      We.warn('Clear is not supported for this type of playback');
    }
    insertAt(e, n) {
      We.warn('InsertAt is not supported for this type of playback');
    }
    prepend(e, n = !1) {
      We.warn('Prepend is not supported for this type of playback');
    }
  }
  class ModifiableQueue {
    constructor(e, n) {
      (this.canModifyQueue = !0),
        (this.queue = e),
        (this._mediaItemPlayback = n);
    }
    append(e) {
      const n = descriptorToMediaItems(e);
      this.queue.splice(this.queue.appendTargetIndex, 0, n);
    }
    clear() {
      this.queue.length &&
        (this.queue.splice(0, this.queue.length), this.queue.reset());
    }
    insertAt(e, n) {
      const d = descriptorToMediaItems(n);
      this.queue.splice(e, 0, d);
    }
    prepend(e, n = !1) {
      const d = descriptorToMediaItems(e),
        h = this.prependIndex();
      n && this.queue.splice(h, this.queue.length), this.queue.splice(h, 0, d);
    }
    prependIndex() {
      const { _mediaItemPlayback: e } = this,
        { position: n } = this.queue;
      return (void 0 === e.nowPlayingItem && 0 === n) || n < 0 ? 0 : n + 1;
    }
  }
  var Nn;
  (e.PlayerRepeatMode = void 0),
    ((Nn = e.PlayerRepeatMode || (e.PlayerRepeatMode = {}))[(Nn.none = 0)] =
      'none'),
    (Nn[(Nn.one = 1)] = 'one'),
    (Nn[(Nn.all = 2)] = 'all');
  class BaseRepeatable {
    constructor() {
      this.canSetRepeatMode = !1;
    }
    get repeatMode() {
      return e.PlayerRepeatMode.none;
    }
    set repeatMode(e) {
      e !== this.repeatMode &&
        We.warn('setting repeatMode is not supported in this playback method');
    }
  }
  class Repeatable {
    constructor(n) {
      (this.dispatcher = n),
        (this.canSetRepeatMode = !0),
        (this._mode = e.PlayerRepeatMode.none);
    }
    get repeatMode() {
      return this._mode;
    }
    set repeatMode(n) {
      n in e.PlayerRepeatMode &&
        n !== this._mode &&
        ((this._mode = n),
        this.dispatcher.publish(_n.repeatModeDidChange, this._mode));
    }
  }
  Object.assign(
    Object.assign({}, { NEXT_ITEM: 'NEXT' }),
    e.PlayActivityEndReasonType
  );
  const xn = ['musicVideo'],
    asyncNoop = () => __awaiter$1(void 0, void 0, void 0, function* () {});
  class BaseSeekable {
    constructor(e) {
      (this.mediaItemPlayback = e), (this.canSeek = !1);
    }
    getSeekSeconds(e) {
      return (
        We.warn(
          'Seeking by predetermined amounts are not supported in this playback method'
        ),
        { BACK: 0, FORWARD: 0 }
      );
    }
    seekBackward(e = asyncNoop) {
      We.warn('seekBackward is not supported in this playback method');
    }
    seekForward(e = asyncNoop) {
      We.warn('seekForward is not supported in this playback method');
    }
    seekToTime(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        We.warn('seekToTime is not supported in this playback method');
      });
    }
  }
  class Seekable {
    constructor(e, n) {
      (this._dispatcher = e), (this.mediaItemPlayback = n), (this.canSeek = !0);
    }
    getSeekSeconds(e) {
      return ((e) =>
        (null == e ? void 0 : e.isUTS) ||
        xn.includes(null == e ? void 0 : e.type)
          ? { FORWARD: 10, BACK: 10 }
          : { FORWARD: 30, BACK: 15 })(e);
    }
    seekBackward(e = this._seekToBeginning) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (void 0 === this.mediaItemPlayback.nowPlayingItem)
          return void We.warn(
            'Cannot seekBackward when nowPlayingItem is not yet set.'
          );
        const n =
          this.mediaItemPlayback.currentPlaybackTime -
          this.getSeekSeconds(this.mediaItemPlayback.nowPlayingItem).BACK;
        n < 0 ? yield e.call(this) : yield this.seekToTime(n, At.Interval);
      });
    }
    seekForward(e = this._seekToEnd) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (void 0 === this.mediaItemPlayback.nowPlayingItem)
          return void We.warn(
            'Cannot seekForward when nowPlayingItem is not yet set.'
          );
        const n =
          this.mediaItemPlayback.currentPlaybackTime +
          this.getSeekSeconds(this.mediaItemPlayback.nowPlayingItem).FORWARD;
        n > this.mediaItemPlayback.currentPlaybackDuration
          ? yield e.call(this)
          : yield this.seekToTime(n, At.Interval);
      });
    }
    seekToTime(e, n = At.Manual) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (void 0 === this.mediaItemPlayback.nowPlayingItem)
          return void We.warn(
            'Cannot seekToTime when nowPlayingItem is not yet set.'
          );
        const d = this.mediaItemPlayback.nowPlayingItem,
          h = this.mediaItemPlayback.currentPlaybackTime,
          p = this.mediaItemPlayback.currentPlayingDate,
          y = Math.min(
            Math.max(0, e),
            this.mediaItemPlayback.currentPlaybackDuration - 1
          );
        let m;
        if (d.isLinearStream && void 0 !== p) {
          const e = 1e3 * (y - h);
          m = new Date(p.getTime() + e);
        }
        yield this.mediaItemPlayback.seekToTime(y, n),
          this._dispatcher.publish(bt.playbackSeek, {
            startPosition: h,
            position: y,
            playingDate: m,
            startPlayingDate: p,
            seekReasonType: n,
          });
      });
    }
    _seekToBeginning() {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.seekToTime(0, At.Interval);
      });
    }
    _seekToEnd() {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.seekToTime(
          this.mediaItemPlayback.currentPlaybackDuration,
          At.Interval
        );
      });
    }
  }
  const shuffleCollection = (e) => {
    const n = [...e],
      { length: d } = n;
    for (let h = 0; h < d; ++h) {
      const e = h + Math.floor(Math.random() * (d - h)),
        p = n[e];
      (n[e] = n[h]), (n[h] = p);
    }
    return n;
  };
  class QueueItem {
    constructor(e, n) {
      var d;
      (this.isAutoplay = !1),
        (this.item = e),
        (this.isAutoplay =
          null !== (d = null == n ? void 0 : n.isAutoplay) &&
          void 0 !== d &&
          d);
    }
    restrict() {
      return this.item.restrict();
    }
  }
  function toQueueItems(e, n) {
    return e.map((e) => new QueueItem(e, n));
  }
  function toMediaItems(e) {
    return e.map((e) => e.item);
  }
  const parseQueueURLOption = (e) => {
      if (!isQueueURLOption(e)) return e;
      const { url: n } = e,
        d = (function (e, n) {
          var d = {};
          for (var h in e)
            Object.prototype.hasOwnProperty.call(e, h) &&
              n.indexOf(h) < 0 &&
              (d[h] = e[h]);
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var p = 0;
            for (h = Object.getOwnPropertySymbols(e); p < h.length; p++)
              n.indexOf(h[p]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, h[p]) &&
                (d[h[p]] = e[h[p]]);
          }
          return d;
        })(e, ['url']),
        { contentId: h, kind: p, storefrontId: y } = formattedMediaURL(n);
      return (
        (d[p] = h), (kn.storefrontId = y), M.debug('parseQueueURLOption', d), d
      );
    },
    { queueItemsDidChange: Un, queuePositionDidChange: Bn } = _n;
  class Queue {
    constructor(e) {
      if (
        ((this.hasAutoplayStation = !1),
        (this._itemIDs = []),
        (this._queueItems = []),
        (this._isRestricted = !1),
        (this._nextPlayableItemIndex = -1),
        (this._position = -1),
        (this._dispatcher = e.services.dispatcher),
        !e.descriptor)
      )
        return;
      const n = descriptorToMediaItems(e.descriptor).filter((e) =>
        this._isItemPlayable(e)
      );
      (this._queueItems = toQueueItems(n)),
        this._reindex(),
        (this.position = this._getStartItemPosition(e.descriptor.startWith));
    }
    get isEmpty() {
      return 0 === this.length;
    }
    set isRestricted(e) {
      (this._isRestricted = e),
        this._isRestricted &&
          this._queueItems &&
          this._queueItems.forEach((e) => {
            e.restrict();
          });
    }
    get isRestricted() {
      return this._isRestricted;
    }
    get appendTargetIndex() {
      let e = this.length;
      const n = this._queueItems.findIndex((e) => e.isAutoplay);
      return -1 !== n && this.position < n && (e = n), e;
    }
    get items() {
      return toMediaItems(this._queueItems);
    }
    get autoplayItems() {
      return toMediaItems(this._queueItems.filter((e) => e.isAutoplay));
    }
    get unplayedAutoplayItems() {
      return toMediaItems(this._unplayedQueueItems.filter((e) => e.isAutoplay));
    }
    get userAddedItems() {
      return toMediaItems(this._queueItems.filter((e) => !e.isAutoplay));
    }
    get unplayedUserItems() {
      return toMediaItems(
        this._unplayedQueueItems.filter((e) => !e.isAutoplay)
      );
    }
    get length() {
      return this._queueItems.length;
    }
    get nextPlayableItem() {
      if (-1 !== this.nextPlayableItemIndex)
        return this.item(this.nextPlayableItemIndex);
    }
    get nextPlayableItemIndex() {
      return (
        (this._nextPlayableItemIndex = this._getNextPlayableItemIndex()),
        this._nextPlayableItemIndex
      );
    }
    get position() {
      return this._position;
    }
    set position(e) {
      this._updatePosition(e);
    }
    get previousPlayableItem() {
      if (void 0 !== this.previousPlayableItemIndex)
        return this.item(this.previousPlayableItemIndex);
    }
    get previousPlayableItemIndex() {
      if (void 0 === this._previousPlayableItemIndex) {
        let e = this.position - 1;
        for (; e > -1; ) {
          const n = this.item(e);
          if (this._isItemPlayable(n)) {
            this._previousPlayableItemIndex = e;
            break;
          }
          e--;
        }
      }
      return this._previousPlayableItemIndex;
    }
    removeQueueItems(e) {
      for (let n = this.length - 1; n >= 0; n--)
        e(this.queueItem(n), n) && this.spliceQueueItems(n, 1);
    }
    indexForItem(e) {
      return ('string' == typeof e ? this._itemIDs : this.items).indexOf(e);
    }
    item(e) {
      var n;
      return null === (n = this.queueItem(e)) || void 0 === n ? void 0 : n.item;
    }
    get currentItem() {
      return this.item(this.position);
    }
    queueItem(e) {
      var n;
      return null === (n = this._queueItems) || void 0 === n ? void 0 : n[e];
    }
    get currentQueueItem() {
      return this.queueItem(this.position);
    }
    remove(e) {
      if (
        (deprecationWarning('remove', {
          message: 'The queue remove function has been deprecated',
        }),
        e === this.position)
      )
        throw new MKError(MKError.INVALID_ARGUMENTS);
      this.splice(e, 1);
    }
    append(e = []) {
      return this.appendQueueItems(toQueueItems(e));
    }
    appendQueueItems(e = []) {
      return this.spliceQueueItems(this.appendTargetIndex, 0, e);
    }
    splice(e, n, d = []) {
      return toMediaItems(this.spliceQueueItems(e, n, toQueueItems(d)));
    }
    spliceQueueItems(e, n, d = [], h = !0) {
      d = d.filter((e) => this._isItemPlayable(null == e ? void 0 : e.item));
      const p = this._queueItems.splice(e, n, ...d);
      return (
        this._itemIDs.splice(e, n, ...d.map((e) => e.item.id)),
        h &&
          (this._dispatcher.publish(bt.queueModified, {
            start: e,
            added: toMediaItems(d),
            removed: toMediaItems(p),
          }),
          this._dispatcher.publish(Un, this.items)),
        p
      );
    }
    reset() {
      const e = this.position;
      (this._position = -1),
        this._dispatcher.publish(Bn, {
          oldPosition: e,
          position: this.position,
        });
    }
    _isSameItems(e) {
      if (e.length !== this.length) return !1;
      const n = e.map((e) => e.id).sort(),
        d = [...this._itemIDs].sort();
      let h, p;
      try {
        (h = JSON.stringify(n)), (p = JSON.stringify(d));
      } catch (Vt) {
        return !1;
      }
      return h === p;
    }
    _reindex() {
      this._queueItems &&
        (this._itemIDs = this._queueItems.map((e) => e.item.id));
    }
    _updatePosition(e) {
      if (e === this._position) return;
      const n = this._position;
      (this._position = this._getNextPlayableItemIndex(e)),
        (this._previousPlayableItemIndex = void 0),
        this._dispatcher.publish(Bn, {
          oldPosition: n,
          position: this._position,
        });
    }
    _getNextPlayableItemIndex(n = this.position + 1) {
      var d, h;
      let p = n;
      if (
        (null === (d = this.repeatable) || void 0 === d
          ? void 0
          : d.repeatMode) === e.PlayerRepeatMode.one &&
        this.position >= 0
      )
        return this.position;
      for (; p < this.length; ) {
        const e = this.item(p);
        if (this._isItemPlayable(e)) return p;
        p++;
      }
      if (
        (null === (h = this.repeatable) || void 0 === h
          ? void 0
          : h.repeatMode) === e.PlayerRepeatMode.all
      )
        for (p = 0; p <= n; ) {
          const e = this.item(p);
          if (this._isItemPlayable(e)) return p;
          p++;
        }
      return -1;
    }
    get _unplayedQueueItems() {
      const e = this.position < 0 ? 0 : this.position;
      return this._queueItems.slice(e);
    }
    _getStartItemPosition(e) {
      if (void 0 === e) return -1;
      if (
        ('object' == typeof e && 'id' in e && (e = e.id), 'string' == typeof e)
      )
        return this.indexForItem(e);
      const n = parseInt('' + e, 10);
      return n >= 0 && n < this.length ? n : -1;
    }
    _isItemPlayable(e) {
      return (
        (null == e ? void 0 : e.isPlayable) ||
        (null == e ? void 0 : e.previewURL)
      );
    }
  }
  var Fn;
  (e.PlayerShuffleMode = void 0),
    ((Fn = e.PlayerShuffleMode || (e.PlayerShuffleMode = {}))[(Fn.off = 0)] =
      'off'),
    (Fn[(Fn.songs = 1)] = 'songs');
  const Kn = 'Shuffling is not supported in this playback method.';
  class BaseShuffler {
    constructor() {
      this.canSetShuffleMode = !1;
    }
    set shuffle(e) {
      We.warn(Kn);
    }
    get shuffleMode() {
      return e.PlayerShuffleMode.off;
    }
    set shuffleMode(e) {
      We.warn(Kn);
    }
    checkAndReshuffle(e) {
      We.warn(Kn);
    }
  }
  class Shuffler {
    constructor(n, { dispatcher: d }) {
      (this.controller = n),
        (this.canSetShuffleMode = !0),
        (this.mode = e.PlayerShuffleMode.off),
        (this._unshuffledIDs = []),
        (this._isSpliceFromShuffle = !1),
        (this.dispatcher = d),
        this.dispatcher.subscribe(bt.queueModified, this.queueModifiedHandler),
        (this._queue = n.queue);
    }
    get queue() {
      return this._queue;
    }
    set queue(e) {
      (this._queue = e),
        (this._unshuffledIDs = e.userAddedItems.map((e) => e.id)),
        this.checkAndReshuffle(!1);
    }
    queueModifiedHandler(e, n) {
      if (this._isSpliceFromShuffle)
        return void (this._isSpliceFromShuffle = !1);
      const { start: d, added: h, removed: p } = n;
      if (p.length > 0) {
        const e = p.map((e) => e.id);
        this._unshuffledIDs = this._unshuffledIDs.filter((n) => !e.includes(n));
      }
      h.length > 0 && this._unshuffledIDs.splice(d, 0, ...h.map((e) => e.id));
    }
    set shuffle(n) {
      this.shuffleMode = n
        ? e.PlayerShuffleMode.songs
        : e.PlayerShuffleMode.off;
    }
    get shuffleMode() {
      return this.mode;
    }
    set shuffleMode(n) {
      n !== this.shuffleMode &&
        n in e.PlayerShuffleMode &&
        (We.debug(`mk: set shuffleMode from ${this.shuffleMode} to ${n}`),
        (this.mode = n),
        this.mode === e.PlayerShuffleMode.songs
          ? this.shuffleQueue()
          : this.unshuffleQueue(),
        this.controller.nowPlayingItem &&
          (this._queue.position = this._queue.indexForItem(
            this.controller.nowPlayingItem.id
          )),
        this.dispatcher.publish(_n.shuffleModeDidChange, this.shuffleMode));
    }
    checkAndReshuffle(n = !1) {
      this.shuffleMode === e.PlayerShuffleMode.songs && this.shuffleQueue(n);
    }
    shuffleQueue(e = !0) {
      const { userAddedItems: n } = this._queue;
      if (n.length <= 1) return n;
      const d = n.slice(0),
        h = this._queue.position > -1 ? d.splice(this._queue.position, 1) : [];
      let p = [];
      do {
        p = shuffleCollection(d);
      } while (d.length > 1 && arrayEquals(p, d));
      const y = [...h, ...p];
      (this._isSpliceFromShuffle = !0),
        this._queue.spliceQueueItems(0, y.length, toQueueItems(y), e);
    }
    unshuffleQueue(e = !0) {
      let n = [];
      const d = this._unshuffledIDs.reduce((e, n, d) => ((e[n] = d), e), {}),
        h = [];
      let p = 0;
      const y = this._queue.item(this._queue.position);
      this._queue.userAddedItems.forEach((e) => {
        const m = d[e.id];
        void 0 === m && h.push(e),
          (n[m] = e),
          e.id === (null == y ? void 0 : y.id) && (p = m);
      }),
        (n = n.filter(Boolean));
      const m = n.concat(h);
      (this._isSpliceFromShuffle = !0),
        this._queue.spliceQueueItems(0, m.length, toQueueItems(m), e),
        (this._queue.position = p);
    }
  }
  var jn;
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [String, Object]),
      __metadata$1('design:returntype', void 0),
    ],
    Shuffler.prototype,
    'queueModifiedHandler',
    null
  ),
    (function (e) {
      (e.continuous = 'continuous'), (e.serial = 'serial');
    })(jn || (jn = {}));
  const { queueItemsDidChange: $n } = _n;
  class PlaybackController {
    constructor(e) {
      var n;
      (this._context = {}),
        (this.onPlaybackStateDidChange =
          this.onPlaybackStateDidChange.bind(this)),
        (this._autoplayEnabled =
          null !== (n = null == e ? void 0 : e.autoplayEnabled) &&
          void 0 !== n &&
          n),
        (this._services = e.services),
        (this._playerOptions = e),
        (this.storekit = e.storekit),
        (this._skipIntro = new SkipAvailable({
          controller: this,
          services: e.services,
        })),
        (this._upNext = new UpNextMonitor({
          controller: this,
          services: e.services,
        })),
        (this._rollMonitor = new RollMonitor({
          controller: this,
          services: e.services,
        })),
        (this._queueModifier = new BaseModifiableQueue()),
        (this._shuffler = new BaseShuffler()),
        (this._seekable = new BaseSeekable(this._mediaItemPlayback)),
        (this._repeatable = new BaseRepeatable()),
        this._dispatcher.subscribe(
          _n.autoplayEnabledDidChange,
          this.updateAutoplay
        );
    }
    updateAutoplay(e, n) {
      this.autoplayEnabled = n;
    }
    constructContext(e, n) {
      var d;
      let h = e.context;
      return (
        void 0 !== e.featureName &&
          void 0 === (null == h ? void 0 : h.featureName) &&
          (We.warn('featureName is deprecated, pass it inside context'),
          h || (h = {}),
          (h.featureName = e.featureName)),
        null !== (d = null != h ? h : n) && void 0 !== d ? d : {}
      );
    }
    get context() {
      return this._context;
    }
    get continuous() {
      return this._continuous || this.hasAuthorization;
    }
    set continuous(e) {
      this._continuous = e;
    }
    get autoplayEnabled() {
      return this._autoplayEnabled;
    }
    set autoplayEnabled(e) {
      this._autoplayEnabled = e;
    }
    get previewOnly() {
      return this._mediaItemPlayback.previewOnly;
    }
    get _dispatcher() {
      return this._services.dispatcher;
    }
    get hasAuthorization() {
      return hasAuthorization(this.storekit);
    }
    get isPlaying() {
      return this._mediaItemPlayback.isPlaying;
    }
    get isPrimaryPlayer() {
      return this._mediaItemPlayback.isPrimaryPlayer;
    }
    set isPrimaryPlayer(e) {
      this._mediaItemPlayback.isPrimaryPlayer = e;
    }
    get isReady() {
      return this._mediaItemPlayback.isReady;
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback;
    }
    get nowPlayingItem() {
      return this._mediaItemPlayback.nowPlayingItem;
    }
    get nowPlayingItemIndex() {
      return this.queue ? this.queue.position : -1;
    }
    get queue() {
      return this._queue;
    }
    set queue(e) {
      this._prepareQueue(e),
        (this._queue = e),
        (this._shuffler.queue = this._queue),
        (this._queueModifier.queue = this._queue),
        this._dispatcher.publish($n, e.items);
    }
    get repeatMode() {
      return this._repeatable.repeatMode;
    }
    set repeatMode(e) {
      this._repeatable.repeatMode = e;
    }
    get seekSeconds() {
      const { nowPlayingItem: e } = this;
      if (void 0 !== e) return this._seekable.getSeekSeconds(e);
    }
    set shuffle(e) {
      this._shuffler.shuffle = e;
    }
    get shuffleMode() {
      return this._shuffler.shuffleMode;
    }
    set shuffleMode(e) {
      this._shuffler.shuffleMode = e;
    }
    get storekit() {
      return this._storekit;
    }
    set storekit(n) {
      n &&
        (n.addEventListener(
          gn.authorizationStatusWillChange,
          ({ authorizationStatus: n, newAuthorizationStatus: d }) =>
            __awaiter$1(this, void 0, void 0, function* () {
              this.isPlaying &&
                (n > ln.DENIED && d < ln.RESTRICTED
                  ? yield this.stop({
                      endReasonType:
                        e.PlayActivityEndReasonType.PLAYBACK_SUSPENDED,
                      userInitiated: !1,
                    })
                  : yield this.stop({ userInitiated: !1 }));
            })
        ),
        (this._storekit = n));
    }
    append(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const n = yield this._dataForQueueOptions(e);
        return this._queueModifier.append(n), this.queue;
      });
    }
    insertAt(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = yield this._dataForQueueOptions(n);
        return this._queueModifier.insertAt(e, d), this.queue;
      });
    }
    _dataForQueueOptions(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const n = this.constructContext(e, this.context);
        return Object.assign(Object.assign({}, e), { context: n });
      });
    }
    clear() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._queueModifier.clear(), this.queue;
      });
    }
    changeToMediaAtIndex(e = 0) {
      var n, d, h;
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.stop();
        const p =
            null === (n = this.queue.item(e)) || void 0 === n ? void 0 : n.id,
          y =
            null ===
              (h =
                null === (d = this._mediaItemPlayback) || void 0 === d
                  ? void 0
                  : d.playOptions) || void 0 === h
              ? void 0
              : h.get(p);
        let m = (null == y ? void 0 : y.startTime) || 0;
        const g = yield this._changeToMediaAtIndex(e, !0);
        g &&
          (g.id !== p && (m = 0),
          this._dispatcher.publish(bt.playbackPlay, { item: g, position: m }));
      });
    }
    changeToMediaItem(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const n = this.queue.indexForItem(e);
        return -1 === n
          ? Promise.reject(new MKError(MKError.MEDIA_DESCRIPTOR))
          : this.changeToMediaAtIndex(n);
      });
    }
    activate() {
      We.debug('mk: base controller - activate'),
        this._dispatcher.unsubscribe(
          _n.playbackStateDidChange,
          this.onPlaybackStateDidChange
        ),
        this._dispatcher.subscribe(
          _n.playbackStateDidChange,
          this.onPlaybackStateDidChange
        ),
        this._skipIntro.activate(),
        this._upNext.activate(),
        this._rollMonitor.activate();
    }
    deactivate() {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.stop(),
          this._dispatcher.unsubscribe(
            _n.playbackStateDidChange,
            this.onPlaybackStateDidChange
          ),
          this._skipIntro.deactivate(),
          this._upNext.deactivate(),
          this._rollMonitor.deactivate();
      });
    }
    destroy() {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.deactivate(),
          this._dispatcher.unsubscribe(
            _n.autoplayEnabledDidChange,
            this.updateAutoplay
          );
      });
    }
    hasCapabilities(e) {
      switch (e) {
        case In.SEEK:
          return this._seekable.canSeek;
        case In.REPEAT:
          return this._repeatable.canSetRepeatMode;
        case In.SHUFFLE:
          return this._shuffler.canSetShuffleMode;
        case In.EDIT_QUEUE:
          return this._queueModifier.canModifyQueue;
        case In.PAUSE:
        case In.SKIP_NEXT:
        case In.SKIP_TO_ITEM:
          return !0;
        case In.SKIP_PREVIOUS:
        default:
          return !1;
      }
    }
    pause(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.pause(e);
      });
    }
    play() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.nowPlayingItem) return this._mediaItemPlayback.play();
        if (!this._queue || this._queue.isEmpty) return;
        if (this.nowPlayingItemIndex >= 0)
          return this.changeToMediaAtIndex(this.nowPlayingItemIndex);
        const { queue: e } = this;
        if (-1 !== e.nextPlayableItemIndex)
          return this.changeToMediaAtIndex(e.nextPlayableItemIndex);
        e.isRestricted &&
          e.items.every((e) => e.isRestricted) &&
          this._dispatcher.publish(
            _n.mediaPlaybackError,
            new MKError(MKError.CONTENT_RESTRICTED, 'Content restricted')
          );
      });
    }
    playSingleMediaItem(e, n) {
      var d;
      return __awaiter$1(this, void 0, void 0, function* () {
        yield ((e, n) =>
          __awaiter$1(void 0, void 0, void 0, function* () {
            if (e.isUTS && e.assetURL)
              try {
                const d = generateAssetUrl(e, n),
                  h = (yield bn.fetchManifest(d)).content.match(
                    /^(?:#EXT-X-SESSION-DATA:?)DATA\-ID="([^"]+)".+VALUE="([^"]+)".*$/gm
                  );
                h &&
                  h.forEach((n) => {
                    const d = n
                        .split(',')[0]
                        .split('com.apple.hls.')[1]
                        .replace(/"/g, ''),
                      h = n.split(',')[1].split('VALUE=')[1].replace(/"/g, '');
                    e.hlsMetadata[d] = h;
                  });
              } catch (Wa) {
                We.log(Wa);
              }
          }))(e, n),
          this._dispatcher.publish(_n.queueItemsDidChange, [e]);
        const h = yield this._mediaItemPlayback.startMediaItemPlayback(e, !0);
        h &&
          !h.isLinearStream &&
          this._dispatcher.publish(bt.playbackPlay, {
            item: h,
            position:
              null !== (d = this._mediaItemPlayback.currentPlaybackTime) &&
              void 0 !== d
                ? d
                : 0,
            userInitiated: !0,
          });
      });
    }
    onPlaybackStateDidChange(n, d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        d.state === e.PlaybackStates.ended &&
          (this.continuous || this.repeatMode === e.PlayerRepeatMode.one) &&
          (We.debug(
            'controller detected track ended event, moving to next item.'
          ),
          this._dispatcher.publish(bt.applicationActivityIntent, {
            endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            userInitiated: !1,
          }),
          yield this._next());
      });
    }
    preload() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.preload();
      });
    }
    prepend(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = yield this._dataForQueueOptions(e);
        return this._queueModifier.prepend(d, n), this.queue;
      });
    }
    prepareToPlay(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.prepareToPlay(e);
      });
    }
    showPlaybackTargetPicker() {
      this._mediaItemPlayback.showPlaybackTargetPicker();
    }
    seekBackward() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._seekable.seekBackward();
      });
    }
    seekForward() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._seekable.seekForward(this.skipToNextItem.bind(this));
      });
    }
    skipToNextItem() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._next(!0);
      });
    }
    getNewSeeker() {
      return this._mediaItemPlayback.getNewSeeker();
    }
    seekToTime(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this._seekable.seekToTime(e, n);
      });
    }
    setQueue(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (
          yield this.extractGlobalValues(e),
          yield this._mediaItemPlayback.stop(),
          this.returnQueueForOptions(e)
        );
      });
    }
    extractGlobalValues(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        (this._context = this.constructContext(e)),
          void 0 !== e.featureName &&
            e.context &&
            (We.warn('featureName is deprecated, pass it inside context'),
            (e.context.featureName = e.featureName));
      });
    }
    stop(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this._mediaItemPlayback.stop(e);
      });
    }
    _changeToMediaAtIndex(e = 0, n = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.queue.isEmpty) return;
        this.queue.position = e;
        const d = this.queue.item(this.queue.position);
        if (!d) return;
        const h = yield this._mediaItemPlayback.startMediaItemPlayback(d, n);
        if (h || d.state !== N.unsupported) return h;
        yield this.skipToNextItem();
      });
    }
    _next(e = !1, n = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._nextAtIndex(this.queue.nextPlayableItemIndex, e, n);
      });
    }
    _nextAtIndex(n, d = !1, h = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.queue.isEmpty) return;
        const { _mediaItemPlayback: p } = this;
        if (n < 0)
          return (
            We.debug(
              'controller/index._next no next item available, stopping playback'
            ),
            yield this.stop({ userInitiated: d }),
            void (p.playbackState = e.PlaybackStates.completed)
          );
        const y = this.isPlaying,
          m = p.currentPlaybackTime,
          g = yield this._changeToMediaAtIndex(n, d);
        return (
          this._notifySkip(y, g, h, {
            userInitiated: d,
            position: m,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
          }),
          g
        );
      });
    }
    _notifySkip(n, d, h, p) {
      const { userInitiated: y, direction: m, position: g } = p,
        _ = this._dispatcher;
      h
        ? (We.debug('seamlessAudioTransition transition, PAF play'),
          _.publish(bt.playbackPlay, {
            item: d,
            position: 0,
            endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          }))
        : n
        ? d
          ? _.publish(bt.playbackSkip, {
              item: d,
              userInitiated: y,
              direction: m,
              position: g,
            })
          : _.publish(bt.playbackStop, { userInitiated: y, position: g })
        : d &&
          _.publish(
            bt.playbackPlay,
            Object.assign(
              { item: d, position: 0 },
              y
                ? {
                    endReasonType:
                      e.PlayActivityEndReasonType
                        .MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
                  }
                : {}
            )
          );
    }
    _prepareQueue(e) {
      We.debug('mk: _prepareQueue'),
        this.hasAuthorization &&
          (e.isRestricted = this.storekit.restrictedEnabled || !1),
        (e.repeatable = this._repeatable);
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [String, Boolean]),
      __metadata$1('design:returntype', void 0),
    ],
    PlaybackController.prototype,
    'updateAutoplay',
    null
  );
  function rejectOnLast() {
    return Promise.reject(
      'The last middleware in the stack should not call next'
    );
  }
  function processMiddleware(e, ...n) {
    return e.length
      ? (function createNextFunction([e, ...n]) {
          return (...d) => e(createNextFunction(n), ...d);
        })([...e, rejectOnLast])(...n)
      : Promise.reject(
          'processMiddleware requires at mimimum one middleware function'
        );
  }
  function parameterizeString(e, n) {
    return (function (e) {
      try {
        return (function recursiveTokenizeParameterizedString(e, n = []) {
          if (e.startsWith('{{')) {
            const d = e.indexOf('}}');
            if (-1 === d) throw new Error('UNCLOSED_PARAMETER');
            const h = { type: Vn.Parameter, value: e.slice(2, d) };
            return d + 2 < e.length
              ? recursiveTokenizeParameterizedString(e.slice(d + 2), [...n, h])
              : [...n, h];
          }
          {
            const d = e.indexOf('{{');
            return -1 === d
              ? [...n, { type: Vn.Static, value: e }]
              : recursiveTokenizeParameterizedString(e.slice(d), [
                  ...n,
                  { type: Vn.Static, value: e.slice(0, d) },
                ]);
          }
        })(e);
      } catch (H) {
        if ('UNCLOSED_PARAMETER' === H.message)
          throw new Error(`Unclosed parameter in path: "${e}"`);
        throw H;
      }
    })(e)
      .map((e) => {
        switch (e.type) {
          case Vn.Parameter:
            return e.value in n
              ? encodeURIComponent('' + n[e.value])
              : `{{${e.value}}}`;
          case Vn.Static:
          default:
            return e.value;
        }
      })
      .join('');
  }
  var Vn;
  function constructUrlMiddleware(e, n) {
    let d = n.url;
    return (
      d || (d = addPathToURL(n.baseUrl, n.path)),
      n.urlParameters && (d = parameterizeString(d, n.urlParameters)),
      n.queryParameters && (d = addQueryParamsToURL(d, n.queryParameters)),
      e(Object.assign(Object.assign({}, n), { url: d }))
    );
  }
  function unwrapJSONFromResponse(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield e.json();
      } catch (H) {
        return;
      }
    });
  }
  function fetchMiddlewareFactory(e) {
    return function (n, d) {
      return __awaiter(this, void 0, void 0, function* () {
        const n = yield e(d.url, d.fetchOptions),
          h = {
            request: d,
            response: n,
            data: yield unwrapJSONFromResponse(n),
          };
        if (!n.ok) throw MKError.responseError(n);
        return h;
      });
    };
  }
  !(function (e) {
    (e[(e.Static = 0)] = 'Static'), (e[(e.Parameter = 1)] = 'Parameter');
  })(Vn || (Vn = {}));
  const Hn = fetchMiddlewareFactory(
    'undefined' != typeof fetch
      ? fetch
      : () => {
          throw new Error('window.fetch is not defined');
        }
  );
  var Wn;
  !(function (e) {
    (e.Replace = 'REPLACE'), (e.Merge = 'MERGE');
  })(Wn || (Wn = {}));
  const Yn = ['url'];
  class APISession {
    constructor(e) {
      this.reconfigure(e);
    }
    get config() {
      return this._config;
    }
    request(e, n = {}, d = {}) {
      var h;
      return processMiddleware(
        this.middlewareStack,
        Object.assign(
          Object.assign(Object.assign({}, this.config.defaultOptions), d),
          {
            baseUrl: this.config.url,
            path: e,
            fetchOptions: mergeFetchOptions(
              null === (h = this.config.defaultOptions) || void 0 === h
                ? void 0
                : h.fetchOptions,
              d.fetchOptions
            ),
            queryParameters: Object.assign(
              Object.assign({}, this.config.defaultQueryParameters),
              n
            ),
            urlParameters: Object.assign(
              Object.assign({}, this.config.defaultUrlParameters),
              d.urlParameters
            ),
          }
        )
      );
    }
    reconfigure(e, n = Wn.Replace) {
      n === Wn.Merge && (e = deepmerge(this.config, e)),
        Yn.forEach((n) => {
          if (void 0 === e[n])
            throw new Error(
              `Session requires a valid SessionConfig, missing "${n}"`
            );
        }),
        (this._config = e),
        (this.middlewareStack = this.createMiddlewareStack());
    }
    createMiddlewareStack() {
      return Array.isArray(this.config.middleware)
        ? [
            constructUrlMiddleware,
            ...this.config.middleware,
            this.makeFetchMiddleware(),
          ]
        : [constructUrlMiddleware, this.makeFetchMiddleware()];
    }
    makeFetchMiddleware() {
      return 'function' == typeof this.config.fetchFunction
        ? fetchMiddlewareFactory(this.config.fetchFunction)
        : Hn;
    }
  }
  const qn = { music: { url: 'https://api.music.apple.com' } };
  class MediaAPIV3 {
    constructor(e) {
      const { realmConfig: n } = e,
        d = __rest(e, ['realmConfig']);
      for (const h in qn) {
        let e = deepmerge(qn[h], d);
        const p = null == n ? void 0 : n[h];
        p && (e = deepmerge(e, p)), this.configure(h, e);
      }
    }
    configure(e, n, d = Wn.Merge) {
      var h;
      this.storefrontId = n.storefrontId;
      const p = (function (e) {
        let n = {};
        e.url && (n.url = e.url);
        e.storefrontId &&
          (n.defaultUrlParameters = { storefrontId: e.storefrontId });
        e.mediaUserToken &&
          (n.defaultOptions = {
            fetchOptions: { headers: { 'Media-User-Token': e.mediaUserToken } },
          });
        e.developerToken &&
          (n = deepmerge(n, {
            defaultOptions: {
              fetchOptions: {
                headers: { Authorization: 'Bearer ' + e.developerToken },
              },
            },
          }));
        e.options && (n = deepmerge(n, e.options));
        return n;
      })(n);
      if (this[e]) this[e].session.reconfigure(p, d);
      else {
        const n = new APISession(p),
          d = n.request.bind(n);
        d.session = n;
        const y =
          'undefined' != typeof process &&
          'test' ===
            (null === (h = process.env) || void 0 === h ? void 0 : h.NODE_ENV);
        Object.defineProperty(this, e, {
          value: d,
          writable: y,
          enumerable: !0,
        });
      }
    }
  }
  class StationTrackLoader {
    constructor(e, n, { dispatcher: d, logger: h, apiManager: p }, y = {}) {
      (this.queue = e),
        (this.station = n),
        (this.context = y),
        (this.isActive = !1),
        (this.dispatcher = d),
        (this.logger = h),
        (this.apiManager = p);
    }
    activate() {
      this.dispatcher.unsubscribe(
        _n.queuePositionDidChange,
        this.checkLoadMore
      ),
        this.dispatcher.subscribe(
          _n.queuePositionDidChange,
          this.checkLoadMore
        ),
        (this.isActive = !0);
    }
    deactivate() {
      this.dispatcher.unsubscribe(
        _n.queuePositionDidChange,
        this.checkLoadMore
      ),
        (this.isActive = !1);
    }
    start() {
      return this.isActive || this.activate(), this.loadNextTracks();
    }
    checkLoadMore() {
      if (!(this.queue.isEmpty || this.queue.nextPlayableItemIndex >= 0))
        return this.loadNextTracks();
    }
    loadNextTracks() {
      var e, n, d;
      return __awaiter$1(this, void 0, void 0, function* () {
        let h = [];
        const { apiManager: p } = this;
        if ((null == p ? void 0 : p.api) instanceof MediaAPIV3) {
          const n = yield p.api.music(
            'v1/me/stations/next-tracks/' + this.station.id,
            void 0,
            { fetchOptions: { method: 'POST' } }
          );
          h =
            null === (e = null == n ? void 0 : n.data) || void 0 === e
              ? void 0
              : e.data;
        } else {
          const e = {};
          En.features['enhanced-hls'] &&
            (e.extend = { songs: ['extendedAssetUrls'] }),
            (h =
              null !==
                (d = yield null === (n = p.mediaAPI) || void 0 === n
                  ? void 0
                  : n.nextStationTracks(this.station.id, null, {
                      queryParameters: e,
                    })) && void 0 !== d
                ? d
                : []);
        }
        if (0 === h.length)
          throw (
            (this.logger.warn(
              'No track data is available for the current station',
              { stationId: this.station.id }
            ),
            new MKError(
              MKError.CONTENT_UNAVAILABLE,
              'No track data is available for the current station.'
            ))
          );
        const y = descriptorToMediaItems({
          context: this.context,
          loaded: h,
          container: this.station,
        });
        this.queue.splice(this.queue.length, 0, y);
      });
    }
  }
  var zn;
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', []),
      __metadata$1('design:returntype', void 0),
    ],
    StationTrackLoader.prototype,
    'checkLoadMore',
    null
  ),
    (function (e) {
      (e.artist = 'artist'),
        (e.song = 'song'),
        (e.station = 'station'),
        (e.radioStation = 'radioStation');
    })(zn || (zn = {}));
  const isIdentityQueue = (e) => e && void 0 !== e.identity,
    { queueIsReady: Gn } = _n;
  class ContinuousPlaybackController extends PlaybackController {
    constructor(e) {
      super(e),
        (this.type = jn.continuous),
        (this._isLive = !1),
        (this._continuous = !0);
    }
    get continuous() {
      return !0;
    }
    set continuous(e) {
      if (!0 !== e)
        throw new MKError(
          MKError.UNSUPPORTED_ERROR,
          'Continuous playback cannot be disabled for station queues.'
        );
    }
    get context() {
      return Object.assign({ featureName: kt.STATION }, this._context);
    }
    get isLive() {
      return this._isLive;
    }
    set isLive(e) {
      e !== this._isLive &&
        ((this._isLive = e), this._dispatcher.publish(_n.capabilitiesChanged));
    }
    changeToMediaItem(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.generateMethodNotAvailable('changeToMediaItem');
      });
    }
    hasCapabilities(e) {
      switch (e) {
        case In.PAUSE:
        case In.SKIP_NEXT:
          return !this.isLive;
        case In.SKIP_PREVIOUS:
        case In.SKIP_TO_ITEM:
          return !1;
        default:
          return super.hasCapabilities(e);
      }
    }
    pause(e) {
      const n = Object.create(null, { pause: { get: () => super.pause } });
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.isLive) return n.pause.call(this, e);
        this.generateMethodNotAvailable('pause');
      });
    }
    skipToPreviousItem() {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.generateMethodNotAvailable('skipToPreviousItem');
      });
    }
    _dataForQueueOptions(e) {
      const n = Object.create(null, {
        _dataForQueueOptions: { get: () => super._dataForQueueOptions },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = yield n._dataForQueueOptions.call(this, e);
        return this.isLive && (d.loaded = this.station), d;
      });
    }
    returnQueueForOptions(e) {
      var n;
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = isIdentityQueue(e)
          ? yield this.loadStationByIdentity(e.identity)
          : yield this.loadStationByStationId(this.generateStationId(e));
        if (void 0 === d)
          return Promise.reject(
            new MKError(
              MKError.UNSUPPORTED_ERROR,
              'Cannot load requested station'
            )
          );
        (this.station = d),
          (this.isLive =
            isIdentityQueue(e) ||
            !!(null == d ? void 0 : d.isLive) ||
            !!(null === (n = null == d ? void 0 : d.attributes) || void 0 === n
              ? void 0
              : n.isLive));
        const h = {
          services: { dispatcher: this._dispatcher },
          descriptor: yield this._dataForQueueOptions(e),
        };
        return (
          (this.queue = new Queue(h)),
          this.isLive ||
            ((this.trackLoader = new StationTrackLoader(
              this.queue,
              d,
              {
                dispatcher: this._dispatcher,
                logger: We,
                apiManager: this._services.apiManager,
              },
              this.context
            )),
            yield this.trackLoader.start()),
          (this._seekable = this.isLive
            ? new BaseSeekable(this._mediaItemPlayback)
            : new Seekable(this._dispatcher, this._mediaItemPlayback)),
          this._dispatcher.publish(Gn, this.queue.items),
          this.queue
        );
      });
    }
    getNewSeeker() {
      return this.hasCapabilities(In.SEEK)
        ? super.getNewSeeker()
        : new UnsupportedSeeker();
    }
    skipToNextItem() {
      const e = Object.create(null, {
        skipToNextItem: { get: () => super.skipToNextItem },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.isLive) return e.skipToNextItem.call(this);
        this.generateMethodNotAvailable('skipToNextItem');
      });
    }
    generateMethodNotAvailable(e) {
      We.warn(e + ' is not supported for this type of playback');
    }
    generateStationId(e) {
      let n;
      if (isQueueURLOption(e)) {
        const {
          contentId: d,
          kind: h,
          storefrontId: p,
        } = formattedMediaURL(e.url);
        (e[h] = d), (kn.storefrontId = p), (n = h);
      }
      const d = e;
      if (d.artist) return 'ra.' + d.artist;
      if (d.song) return 'ra.' + d.song;
      if (d.station) return d.station;
      if (d.radioStation) return d.radioStation;
      throw new MKError(
        MKError.UNSUPPORTED_ERROR,
        n
          ? n + ' is not a supported option. Use setQueue instead.'
          : 'Unsupported options specified for setStationQueue. You may want setQueue instead.'
      );
    }
    loadStationByIdentity(e) {
      var n, d, h;
      return __awaiter$1(this, void 0, void 0, function* () {
        const { apiManager: p } = this._services;
        if ((null == p ? void 0 : p.api) instanceof MediaAPIV3) {
          const h = yield p.api.music('v1/catalog/{{storefrontId}}/stations', {
            filter: { identity: e },
          });
          return null ===
            (d =
              null === (n = null == h ? void 0 : h.data) || void 0 === n
                ? void 0
                : n.data) || void 0 === d
            ? void 0
            : d[0];
        }
        const y = yield null === (h = null == p ? void 0 : p.mediaAPI) ||
        void 0 === h
          ? void 0
          : h.stations(void 0, { filter: { identity: e } });
        return y && y[0];
      });
    }
    loadStationByStationId(e) {
      var n, d, h;
      return __awaiter$1(this, void 0, void 0, function* () {
        const { apiManager: p } = this._services;
        if ((null == p ? void 0 : p.api) instanceof MediaAPIV3) {
          const h = yield p.api.music(
            'v1/catalog/{{storefrontId}}/stations/' + e
          );
          return null ===
            (d =
              null === (n = null == h ? void 0 : h.data) || void 0 === n
                ? void 0
                : n.data) || void 0 === d
            ? void 0
            : d[0];
        }
        return null === (h = null == p ? void 0 : p.mediaAPI) || void 0 === h
          ? void 0
          : h.station(e);
      });
    }
    activate() {
      super.activate(), this.trackLoader && this.trackLoader.activate();
    }
    deactivate() {
      const e = Object.create(null, {
        deactivate: { get: () => super.deactivate },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        yield e.deactivate.call(this),
          this.trackLoader && this.trackLoader.deactivate();
      });
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [Number]),
      __metadata$1('design:returntype', Boolean),
    ],
    ContinuousPlaybackController.prototype,
    'hasCapabilities',
    null
  );
  class PercentageWatcher {
    constructor(e, n, d) {
      (this.dispatcher = e),
        (this.callback = n),
        (this.percentage = d),
        (this.threshold = -1);
    }
    startMonitor() {
      this.dispatcher.unsubscribe(
        _n.playbackDurationDidChange,
        this.updateThreshold
      ),
        this.dispatcher.unsubscribe(
          _n.playbackTimeDidChange,
          this.handleTimeChange
        ),
        this.dispatcher.subscribe(
          _n.playbackDurationDidChange,
          this.updateThreshold
        ),
        this.dispatcher.subscribe(
          _n.playbackTimeDidChange,
          this.handleTimeChange
        );
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(
        _n.playbackDurationDidChange,
        this.updateThreshold
      ),
        this.dispatcher.unsubscribe(
          _n.playbackTimeDidChange,
          this.handleTimeChange
        ),
        (this.threshold = -1);
    }
    handleTimeChange(
      e,
      { currentPlaybackDuration: n, currentPlaybackTime: d }
    ) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.threshold < 0 && this.updateThreshold(e, { duration: n }),
          d < this.threshold ||
            (this.stopMonitor(), yield this.callback(d, this));
      });
    }
    updateThreshold(e, { duration: n }) {
      this.threshold = n * this.percentage;
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [Object, Object]),
      __metadata$1('design:returntype', Promise),
    ],
    PercentageWatcher.prototype,
    'handleTimeChange',
    null
  ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', void 0),
      ],
      PercentageWatcher.prototype,
      'updateThreshold',
      null
    );
  class Preloader extends PlaybackMonitor {
    constructor(e) {
      super(e),
        (this.isSeamlessAudioTransitionsEnabled = !1),
        (this.watchers = [
          new PercentageWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            0.3
          ),
        ]),
        (this.isSeamlessAudioTransitionsEnabled =
          En.features['seamless-audio-transitions']);
    }
    handlePlaybackThreshold() {
      return __awaiter$1(this, void 0, void 0, function* () {
        const e = this.getNextPlayableItem();
        e && (yield this.playbackController.prepareToPlay(e, !0));
      });
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1;
      if (
        !this.playbackController.hasAuthorization ||
        this.playbackController.previewOnly
      )
        return !1;
      const e = this.getNextPlayableItem(),
        n = void 0 !== e;
      return this.isSeamlessAudioTransitionsEnabled
        ? n
        : n && !(null == e ? void 0 : e.isPreparedToPlay);
    }
    getNextPlayableItem() {
      return this.playbackController.queue.nextPlayableItem;
    }
  }
  const recursiveRelationshipLoad = (e, n, d) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        const [h, p, y] = n,
          m = d.length;
        if (m > 0 && m < y.limit + y.offset) return d;
        const g = Object.assign({}, y);
        let _;
        g.offset = m;
        try {
          _ = yield e(h, p, g);
        } catch (Vt) {
          return d;
        }
        return (
          d.push(..._),
          _.length < g.limit ? d : recursiveRelationshipLoad(e, n, d)
        );
      }),
    getNamedQueueOptions = (e, n) => {
      const d = [],
        h = e.namedQueueOptions;
      for (const p in n) Object.keys(h).includes(p) && d.push([p, h[p]]);
      return d;
    },
    loadSelectedQueueValue = (e, n, d, h) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        const [p, y] = d,
          m = Array.isArray(h),
          g = m ? '' + h[0] : '' + h,
          _ = yield e.getAPIForItem(g);
        if (_ instanceof MediaAPIV3) {
          let e = p
            .replace(/([A-Z])/g, '-$1')
            .replace(/[-_\s]+/g, '-')
            .toLowerCase();
          e.endsWith('s') || (e += 's');
          const n =
              (b(g) ? 'v1/me/library/' : 'v1/catalog/{{storefrontId}}/') +
              e +
              (m ? '' : '/{{id}}'),
            d = {};
          m && (d.ids = h);
          const y = yield _.music(n, d, { urlParameters: { id: h } });
          return m ? y.data.data : y.data.data[0];
        }
        let T = n.parameters;
        En.features['enhanced-hls'] &&
          (T = Object.assign(Object.assign({}, T), {
            extend: { songs: ['extendedAssetUrls'] },
          }));
        let E = yield _[y.apiMethod](h, T);
        return (
          y.loadedQueueTransform && (E = y.loadedQueueTransform(E)),
          m ||
            (yield (function (e, n, d, h = {}) {
              return __awaiter$1(this, void 0, void 0, function* () {
                if (void 0 === n) return d;
                void 0 === h.limit && (h.limit = 100),
                  void 0 === h.offset && (h.offset = 0);
                const { relationship: p, method: y } = n,
                  m = e[y].bind(e);
                let g;
                return (
                  isDataRecord(d)
                    ? (void 0 === d[p] && d.setProperty(p, [], 'relationships'),
                      (g = d[p]))
                    : ((d.relationships = d.relationships || {}),
                      void 0 === d.relationships[p] &&
                        Object.defineProperty(d.relationships, p, {
                          value: { data: [] },
                          enumerable: !0,
                        }),
                      (g = d.relationships[p].data)),
                  yield recursiveRelationshipLoad(m, [d.id, p, h], g),
                  d
                );
              });
            })(_, y.relationshipMethod, E)),
          E
        );
      }),
    Qn = ['library-songs', 'songs'],
    isAutoplaySupportedForType = (e) => Qn.includes(e),
    normalizeTypeForAutoplay = (e, n) =>
      (b(e) && !(null != n ? n : '').startsWith('library-') ? 'library-' : '') +
      normalizeContentType(n);
  class AutoplayTrackLoader {
    constructor(e, n, { dispatcher: d, logger: h, apiManager: p }, y = {}) {
      (this.queue = e),
        (this.repeatable = n),
        (this.context = y),
        (this.isActive = !1),
        (this.errorIds = new Set()),
        (this.dispatcher = d),
        (this.logger = h),
        (this.apiManager = p);
    }
    activate() {
      this.isActive ||
        (this.dispatcher.unsubscribe(
          _n.queuePositionDidChange,
          this.onQueueChanged
        ),
        this.dispatcher.subscribe(
          _n.queuePositionDidChange,
          this.onQueueChanged
        ),
        this.dispatcher.unsubscribe(
          _n.repeatModeDidChange,
          this.onRepeatableChanged
        ),
        this.dispatcher.subscribe(
          _n.repeatModeDidChange,
          this.onRepeatableChanged
        ),
        (this.isActive = !0));
    }
    deactivate() {
      this.isActive &&
        (this.dispatcher.unsubscribe(
          _n.queuePositionDidChange,
          this.onQueueChanged
        ),
        this.dispatcher.unsubscribe(
          _n.repeatModeDidChange,
          this.onRepeatableChanged
        ),
        (this.isActive = !1),
        (this.station = void 0),
        (this.queue.hasAutoplayStation = !1));
    }
    start() {
      if (!this.isActive) return this.activate(), this.loadNextTracks();
    }
    stop() {
      this.isActive && (this.deactivate(), this.cleanupQueue());
    }
    onRepeatableChanged() {
      this.repeatable.repeatMode === e.PlayerRepeatMode.none
        ? this.checkLoadMore()
        : this.cleanupQueue();
    }
    onQueueChanged() {
      if (!(this.queue.nextPlayableItemIndex >= 0)) return this.checkLoadMore();
    }
    get api() {
      var e;
      const n = this.apiManager.mediaAPI;
      return null !== (e = null == n ? void 0 : n.v3) && void 0 !== e ? e : n;
    }
    checkLoadMore() {
      var e;
      const n =
          null !== (e = this.queue.unplayedAutoplayItems.length) && void 0 !== e
            ? e
            : 0,
        d = En.autoplay.maxUpcomingTracksToMaintain;
      if (
        !(
          this.queue.isEmpty ||
          this.queue.unplayedUserItems.length >
            En.autoplay.maxQueueSizeForAutoplay
        )
      )
        return n < d ? this.loadNextTracks(d - n) : this.loadNextTracks();
    }
    cleanupQueue() {
      this.queue.removeQueueItems(
        (e, n) => !(n <= this.queue.position) && !!e.isAutoplay
      );
    }
    loadNextTracks(n = En.autoplay.maxUpcomingTracksToMaintain) {
      var d, h, p;
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.repeatable.repeatMode !== e.PlayerRepeatMode.none) return;
        let y,
          { station: m } = this;
        if (this.station) {
          try {
            (y = yield this.api.music(
              'v1/me/stations/next-tracks/' + this.station.id,
              { limit: n },
              { fetchOptions: { method: 'POST' } }
            )),
              (y =
                null === (d = null == y ? void 0 : y.data) || void 0 === d
                  ? void 0
                  : d.data);
          } catch (Vt) {
            return;
          }
          if (!this.isActive) return;
        } else {
          const e = yield this.startStation(n);
          if (!e || !this.isActive)
            return void (this.queue.hasAutoplayStation = !1);
          (m = this.station = e.station),
            (this.queue.hasAutoplayStation = !0),
            (y = e.tracks),
            (null === (h = null == e ? void 0 : e.tracks) || void 0 === h
              ? void 0
              : h.length) ||
              this.logger.warn(
                'No track data is available for the current station',
                { stationId: null == m ? void 0 : m.id }
              );
        }
        const g = descriptorToMediaItems({
          context: Object.assign(Object.assign({}, this.context), {
            featureName: 'now_playing',
            reco_id: (
              null === (p = this.context.featureName) || void 0 === p
                ? void 0
                : p.startsWith('listen-now')
            )
              ? void 0
              : this.context.reco_id,
          }),
          loaded: y,
          container: m,
        });
        this.queue.appendQueueItems(toQueueItems(g, { isAutoplay: !0 }));
      });
    }
    startStation(e) {
      var n, d;
      return __awaiter$1(this, void 0, void 0, function* () {
        const { userAddedItems: h } = this.queue,
          p =
            null !== (n = h[h.length - 2]) && void 0 !== n
              ? n
              : h[h.length - 1],
          y = null == p ? void 0 : p.container,
          m = y ? { container: { id: y.id, type: y.type } } : void 0,
          g = this.queue.items
            .slice(-1 * En.autoplay.maxQueueSizeInRequest)
            .reduce((e, { id: n, type: d }) => {
              const h = normalizeTypeForAutoplay(n, d);
              return (
                isAutoplaySupportedForType(h) &&
                  !this.errorIds.has(n) &&
                  e.push({ id: n, type: h, meta: m }),
                e
              );
            }, []);
        if (0 === g.length) return;
        const _ = { data: g };
        let b;
        try {
          (b = yield this.api.music(
            'v1/me/stations/continuous',
            { 'limit[results:tracks]': e, with: ['tracks'] },
            {
              fetchOptions: {
                method: 'POST',
                body: JSON.stringify(_, void 0, 2),
              },
            }
          )),
            (b =
              null === (d = null == b ? void 0 : b.data) || void 0 === d
                ? void 0
                : d.results);
        } catch (Vt) {
          g.forEach((e) => this.errorIds.add(e.id));
        }
        return b;
      });
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', []),
      __metadata$1('design:returntype', void 0),
    ],
    AutoplayTrackLoader.prototype,
    'onRepeatableChanged',
    null
  ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', void 0),
      ],
      AutoplayTrackLoader.prototype,
      'onQueueChanged',
      null
    ),
    __decorate$1(
      [
        (e, n, d) => {
          const h = d.value,
            p = '_singlePromise_' + n,
            y = 'undefined' != typeof Symbol ? Symbol(p) : p;
          return (
            (d.value = function (...e) {
              if (this[y]) return this[y];
              const n = (this[y] = h.apply(this, e)),
                reset = () => {
                  this[y] = void 0;
                };
              return n.then(reset, reset), n;
            }),
            d
          );
        },
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Number]),
        __metadata$1('design:returntype', Promise),
      ],
      AutoplayTrackLoader.prototype,
      'loadNextTracks',
      null
    );
  const { queueIsReady: Jn } = _n;
  var Xn, Zn;
  !(function (e) {
    (e.album = 'album'),
      (e.musicVideo = 'musicVideo'),
      (e.playlist = 'playlist'),
      (e.song = 'song');
  })(Xn || (Xn = {})),
    (function (e) {
      (e.albums = 'albums'),
        (e.musicVideos = 'musicVideos'),
        (e.playlists = 'playlists'),
        (e.songs = 'songs');
    })(Zn || (Zn = {}));
  class SerialPlaybackController extends PlaybackController {
    constructor(e) {
      var n;
      super(e),
        (this.type = jn.serial),
        (this._queue = new Queue(e)),
        (this._repeatable = new Repeatable(this._dispatcher)),
        (this._seekable = new Seekable(
          this._dispatcher,
          this._mediaItemPlayback
        )),
        (this._shuffler = new Shuffler(this, { dispatcher: this._dispatcher })),
        (this._queueModifier = new ModifiableQueue(
          this._queue,
          this._mediaItemPlayback
        )),
        (this._isSeamlessAudioTransitionsEnabled = !!(null ===
          (n = null == e ? void 0 : e.bag) || void 0 === n
          ? void 0
          : n.features['seamless-audio-transitions']));
      const d = { controller: this, services: e.services };
      this._preloader = new Preloader(d);
    }
    get autoplayEnabled() {
      return this._autoplayEnabled;
    }
    set autoplayEnabled(e) {
      var n;
      this._autoplayEnabled = e;
      const d = e ? 'start' : 'stop';
      null === (n = this._autoplayTrackLoader) || void 0 === n || n[d]();
    }
    activate() {
      super.activate(),
        this._preloader.activate(),
        this._dispatcher.subscribe(Ds, this.onSeamlessAudioTransition),
        this._dispatcher.subscribe(
          _n.repeatModeDidChange,
          this.onRepeatModeChange
        );
    }
    deactivate() {
      const e = Object.create(null, {
        deactivate: { get: () => super.deactivate },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        yield e.deactivate.call(this),
          this._preloader.deactivate(),
          this._dispatcher.unsubscribe(Ds, this.onSeamlessAudioTransition),
          this._dispatcher.unsubscribe(
            _n.repeatModeDidChange,
            this.onRepeatModeChange
          );
      });
    }
    onSeamlessAudioTransition(n, d) {
      We.debug('controller handling seamless audio transition, PAF stop', d),
        this._dispatcher.publish(bt.playbackStop, {
          endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          position: d.previous.playbackDuration / 1e3,
          isPlaying: !1,
        }),
        asAsync(this._next(!1, !0));
    }
    hasCapabilities(e) {
      var n, d, h;
      return (
        e === In.SKIP_PREVIOUS ||
        (((e !== In.REPEAT && e !== In.SHUFFLE) ||
          !(null ===
            (d =
              null === (n = this.queue) || void 0 === n
                ? void 0
                : n.currentQueueItem) || void 0 === d
            ? void 0
            : d.isAutoplay)) &&
          ((e !== In.SEEK && e !== In.PAUSE) ||
            !(null === (h = this.nowPlayingItem) || void 0 === h
              ? void 0
              : h.isAssetScrubbingDisabled)) &&
          super.hasCapabilities(e))
      );
    }
    onRepeatModeChange() {
      var e;
      this.queue.nextPlayableItem &&
        (We.info(
          'SerialPlaybackController: preparing new item after RepeatMode change',
          null === (e = this.queue.nextPlayableItem) || void 0 === e
            ? void 0
            : e.title
        ),
        this.prepareToPlay(this.queue.nextPlayableItem, !0));
    }
    prepareToPlay(n, d = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (
          (We.debug('mk: SerialController - prepareToPlay - ', {
            item: n,
            preload: d,
          }),
          n.isPlayable)
        )
          return this._mediaItemPlayback.prepareToPlay(n).catch((n) => {
            const h =
              !d &&
              -1 ===
                [MKError.DEVICE_LIMIT, MKError.STREAM_UPSELL].indexOf(
                  n.errorCode
                );
            if (this.continuous && h)
              return (
                this._dispatcher.publish(bt.applicationActivityIntent, {
                  endReasonType:
                    e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
                  userInitiated: !1,
                }),
                this._next()
              );
            throw n;
          });
      });
    }
    prepend(e, n) {
      const d = Object.create(null, { prepend: { get: () => super.prepend } });
      return __awaiter$1(this, void 0, void 0, function* () {
        const h = yield d.prepend.call(this, e, n);
        if (this.shouldTransitionSeamlessly) {
          const e = this.queue,
            n = e.position,
            d = e.item(n + 1);
          We.debug('prepend preparing ', d.title),
            yield this._mediaItemPlayback.prepareToPlay(d);
        }
        return h;
      });
    }
    returnQueueForOptions(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        void 0 !== (e = parseQueueURLOption(e)).startPosition &&
          (deprecationWarning('startPosition', {
            message: 'startPosition has been deprecated in favor of startWith',
          }),
          void 0 === e.startWith && (e.startWith = e.startPosition));
        const n = yield this._dataForQueueOptions(e),
          d = {
            services: {
              dispatcher: this._dispatcher,
              mediaItemPlayback: this._mediaItemPlayback,
            },
            descriptor: n,
          };
        if (
          (void 0 !== e.shuffleMode && (this.shuffleMode = e.shuffleMode),
          (this.queue = new Queue(d)),
          'number' == typeof e.startTime)
        ) {
          const n = this.queue.nextPlayableItem;
          n &&
            this._mediaItemPlayback.playOptions.set(n.id, {
              startTime: e.startTime,
            });
        }
        if (0 === this.queue.length)
          throw (
            (We.warn(
              'No item data is available for the current media queue',
              e
            ),
            new MKError(
              MKError.CONTENT_UNAVAILABLE,
              'No item data is available for the current media queue.'
            ))
          );
        return (
          this._autoplayTrackLoader && this._autoplayTrackLoader.deactivate(),
          (this._autoplayTrackLoader = new AutoplayTrackLoader(
            this.queue,
            this._repeatable,
            {
              dispatcher: this._dispatcher,
              logger: We,
              apiManager: this._services.apiManager,
            },
            this._context
          )),
          this.autoplayEnabled && this._autoplayTrackLoader.start(),
          this._dispatcher.publish(Jn, this.queue.items),
          this.queue
        );
      });
    }
    skipToPreviousItem() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._previous(!0);
      });
    }
    _dataForQueueOptions(e) {
      const n = Object.create(null, {
        _dataForQueueOptions: { get: () => super._dataForQueueOptions },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = e,
          h = ((e, n) => {
            const d = getNamedQueueOptions(e, n);
            if (d.length > 1)
              throw new MKError(
                MKError.UNSUPPORTED_ERROR,
                'Queues with multiple media types are not supported.'
              );
            if (0 === d.length) return;
            const [h] = d,
              [p, y] = h;
            if (Array.isArray(n[p]) !== y.isPlural)
              throw new MKError(
                MKError.UNSUPPORTED_ERROR,
                y.isPlural
                  ? `Queue option ${p} must be an array of id values`
                  : `Queue option ${p} must be a single id value`
              );
            return h;
          })(this._services.apiManager.apiService, e);
        return (
          void 0 === h ||
            (d.loaded = yield ((e, n, d) =>
              __awaiter$1(void 0, void 0, void 0, function* () {
                const [h] = d,
                  p = n[h];
                if (Array.isArray(p)) {
                  const h = new Map();
                  p.forEach((e) => {
                    const n = e.indexOf('.'),
                      d = -1 === n ? '' : e.substring(0, n);
                    h.has(d) || h.set(d, []);
                    const p = h.get(d);
                    p && p.push(e);
                  });
                  const y = (yield Promise.all(
                      [...h.values()].map((h) =>
                        loadSelectedQueueValue(e, n, d, h)
                      )
                    )).reduce((e, n) => {
                      var d;
                      return (
                        (n =
                          null !== (d = n.data) && void 0 !== d
                            ? d
                            : n).forEach((n) => {
                          e.set(n.id, n);
                        }),
                        e
                      );
                    }, new Map()),
                    m = [];
                  return (
                    p.forEach((e) => {
                      const n = y.get(e);
                      n && m.push(n);
                    }),
                    m
                  );
                }
                return loadSelectedQueueValue(e, n, d, p);
              }))(this._services.apiManager.apiService, e, h)),
          Object.assign(
            Object.assign({}, yield n._dataForQueueOptions.call(this, e)),
            d
          )
        );
      });
    }
    _changeToMediaAtIndex(e = 0, n = !1) {
      const d = Object.create(null, {
        _changeToMediaAtIndex: { get: () => super._changeToMediaAtIndex },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        const h = yield d._changeToMediaAtIndex.call(this, e, n),
          p = this.queue.nextPlayableItem;
        return (
          p && this.shouldTransitionSeamlessly && (yield this.prepareToPlay(p)),
          h
        );
      });
    }
    _next(n = !1, d = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this.queue.isEmpty)
          return this.repeatMode === e.PlayerRepeatMode.one &&
            n &&
            void 0 !== this.nowPlayingItem
            ? (yield this.stop({
                endReasonType:
                  e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
                userInitiated: !0,
              }),
              void (yield this.play()))
            : this._nextAtIndex(this.queue.nextPlayableItemIndex, n, d);
      });
    }
    _previous(n = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this.queue.isEmpty) return;
        if (
          this.repeatMode === e.PlayerRepeatMode.one &&
          n &&
          void 0 !== this.nowPlayingItem
        )
          return (
            yield this.stop({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              userInitiated: !0,
            }),
            void (yield this.play())
          );
        const d = this.queue;
        if (-1 === d.previousPlayableItemIndex) return;
        const h = this.isPlaying,
          p = this._mediaItemPlayback.currentPlaybackTime,
          y = yield this._changeToMediaAtIndex(d.previousPlayableItemIndex, n);
        return (
          this._notifySkip(h, y, !1, {
            userInitiated: n,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            position: p,
          }),
          y
        );
      });
    }
    _prepareQueue(e) {
      super._prepareQueue(e), this._shuffler.checkAndReshuffle();
    }
    get shouldTransitionSeamlessly() {
      return (
        this._isSeamlessAudioTransitionsEnabled &&
        this.hasAuthorization &&
        !this.previewOnly
      );
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [Object, Object]),
      __metadata$1('design:returntype', void 0),
    ],
    SerialPlaybackController.prototype,
    'onSeamlessAudioTransition',
    null
  ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Number]),
        __metadata$1('design:returntype', Boolean),
      ],
      SerialPlaybackController.prototype,
      'hasCapabilities',
      null
    ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', void 0),
      ],
      SerialPlaybackController.prototype,
      'onRepeatModeChange',
      null
    );
  class MKDialog {
    constructor(e, n = '') {
      (this._message = e),
        (this._explanation = n),
        (this.id = 'musickit-dialog'),
        (this.scrimId = this.id + '-scrim'),
        (this.styleId = this.id + '-style'),
        (this._okButtonString = 'OK'),
        [this.id, this.scrimId, this.styleId].forEach((e) => {
          try {
            const n = document.getElementById(e);
            n.parentElement.removeChild(n);
          } catch (n) {}
        }),
        this._appendStyle(
          '\n#musickit-dialog {\n  --mk-dialog-background: rgba(255, 255, 255, 1);\n  --mk-dialog-text: rgba(0, 0, 0, 0.95);\n  --mk-dialog-border: rgba(0, 0, 0, 0.07);\n  --mk-dialog-scrim: rgba(255, 255, 255, 0.8);\n  --mk-dialog-primary: rgba(0, 122, 255, 1);\n}\n\n@media (prefers-color-scheme: dark) {\n  #musickit-dialog {\n      --mk-dialog-background: rgba(30, 30, 30, 1);\n      --mk-dialog-text: rgba(255, 255, 255, 0.85);\n      --mk-dialog-border: rgba(255, 255, 255, 0.1);\n      --mk-dialog-scrim: rgba(38, 38, 38, 0.8);\n      --mk-dialog-primary: rgba(8, 132, 255, 1);\n  }\n}\n\n#musickit-dialog-scrim {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.35);\n}\n\n#musickit-dialog * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -ms-touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, sans-serif;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n#musickit-dialog *:focus { outline: 0; }\n\n#musickit-dialog {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  -webkit-justify-content: space-between;\n  -moz-justify-content: space-between;\n  justify-content: space-between;\n  min-width: 277px;\n  max-width: 290px;\n  min-height: 109px;\n  background: var(--mk-dialog-background);\n  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.18);\n  border-radius: 10px;\n  color: var(--mk-dialog-text);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -142px;\n  margin-top: -67px;\n  z-index: 9999999999999999999999999;\n}\n\n#musickit-dialog #mk-dialog-body {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  flex-grow: 1;\n  -webkit-justify-content: space-evenly;\n  -moz-justify-content: space-evenly;\n  justify-content: space-evenly;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  padding: 10px 20px;\n  min-height: 74px;\n  text-align: center;\n}\n\n#musickit-dialog .mk-dialog h5 {\n  font-weight: 500;\n  line-height: 20px;\n  margin: 7px 0 0 0;\n  padding: 0;\n}\n\n#musickit-dialog .mk-dialog p {\n  margin: 0 0 7px 0;\n  padding: 0;\n  paddin-top: 3px;\n  line-height: 18px;\n  font-size: 13px;\n  font-weight: 300;\n}\n\n#musickit-dialog #mk-dialog-actions {\n  border-top: 1px solid var(--mk-dialog-border);\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: colrowumn;\n  flex-direction: row;\n  max-height: 41px;\n  min-height: 34px;\n  -webkit-justify-self: flex-end;\n  -moz-justify-self: flex-end;\n  justify-self: flex-end;\n}\n\n#musickit-dialog #mk-dialog-actions button {\n  flex-grow: 1;\n  border: 0;\n  background: none;\n  color: var(--mk-dialog-primary);\n  padding: 0;\n  margin: 0;\n  min-height: 34px;\n  height: 41px;\n  text-align: center;\n}\n\n#musickit-dialog #mk-dialog-actions *:nth-child(2) {\n  border-left: 1px solid var(--mk-dialog-border);\n  font-weight: 500;\n}\n'
        );
    }
    static presentError(e) {
      const n = e.dialog;
      void 0 !== n
        ? MKDialog.serverDialog(n).present()
        : new MKDialog(e.message).present();
    }
    static serverDialog(e) {
      const n = new this(e.message, e.explanation);
      return (
        e.okButtonAction &&
          e.okButtonAction.url &&
          (n._okButtonActionURL = e.okButtonAction.url),
        e.okButtonString && (n._okButtonString = e.okButtonString),
        e.cancelButtonString && (n._cancelButtonString = e.cancelButtonString),
        n
      );
    }
    static clientDialog(e) {
      const n = new this(e.message, e.explanation);
      return (
        e.okButtonAction && (n._okButtonAction = e.okButtonAction),
        e.cancelButtonAction && (n._cancelButtonAction = e.cancelButtonAction),
        e.okButtonString && (n._okButtonString = e.okButtonString),
        e.cancelButtonString && (n._cancelButtonString = e.cancelButtonString),
        n
      );
    }
    get actions() {
      return this.cancelButton
        ? `<div id="mk-dialog-actions">${this.cancelButton}${this.okButton}</div>`
        : `<div id="mk-dialog-actions">${this.okButton}</div>`;
    }
    get cancelButton() {
      if ('string' == typeof this._cancelButtonString)
        return `<button type="button">${this._cancelButtonString}</button>`;
    }
    set cancelButton(e) {
      this._cancelButtonString = e;
    }
    get explanation() {
      return `<p id="mk-dialog-explanation">${this._explanation}</p>`;
    }
    get hasOKButtonAction() {
      return !!this._okButtonActionURL || !!this._okButtonAction;
    }
    get message() {
      return `<h5 id="mk-dialog-title">${this._message}</h5>`;
    }
    get okButton() {
      return this.hasOKButtonAction && this._okButtonActionURL
        ? `<button type="button" data-ok-action-url='${this._okButtonActionURL}'>${this._okButtonString}</button>`
        : `<button type="button">${this._okButtonString}</button>`;
    }
    present() {
      const e = document.createDocumentFragment(),
        n = document.createElement('div');
      (n.id = this.scrimId), e.appendChild(n);
      const d = document.createElement('div');
      (d.id = this.id),
        d.classList.add('mk-dialog'),
        d.setAttribute('role', 'alertDialog'),
        d.setAttribute('aria-modal', 'true'),
        d.setAttribute('aria-labeledby', 'mk-dialog-title'),
        d.setAttribute('aria-describedby', 'mk-dialog-explanation');
      let h = `\n      <div id="mk-dialog-body">\n        ${this.message}\n        ${this.explanation}\n      </div>`;
      (h = `\n      ${h}\n      ${this.actions}\n    `),
        (d.innerHTML = h),
        e.appendChild(d),
        document.body.appendChild(e),
        document
          .querySelector(`#${d.id} #mk-dialog-actions *:first-child`)
          .focus(),
        setTimeout(() => {
          document
            .querySelector(`#${d.id} #mk-dialog-actions *:first-child`)
            .addEventListener('click', () => {
              this._cancelButtonAction && this._cancelButtonAction(),
                d.parentElement.removeChild(d),
                n.parentElement.removeChild(n);
            }),
            this.hasOKButtonAction &&
              (this._okButtonActionURL
                ? document
                    .querySelector(`#${d.id} #mk-dialog-actions *:last-child`)
                    .addEventListener('click', (e) => {
                      window.open(e.target.dataset.okActionUrl, '_blank'),
                        d.parentElement.removeChild(d),
                        n.parentElement.removeChild(n);
                    })
                : this._okButtonAction &&
                  document
                    .querySelector(`#${d.id} #mk-dialog-actions *:last-child`)
                    .addEventListener('click', (e) => {
                      this._okButtonAction(),
                        d.parentElement.removeChild(d),
                        n.parentElement.removeChild(n);
                    }));
        });
    }
    _appendStyle(e) {
      const n = document.createElement('style');
      (n.id = this.styleId),
        n.styleSheet ? (n.styleSheet.cssText = e) : (n.innerHTML = e),
        document.body.appendChild(n);
    }
  }
  var ea;
  !(function (e) {
    (e.UTS_API = 'uts-api'),
      (e.MEDIA_API = 'media-api'),
      (e.UTS_CLIENT = 'uts-client');
  })(ea || (ea = {}));
  class APIServiceManager {
    constructor(e, n) {
      (this.store = e), (this._dispatcher = n), (this._apisByType = {});
    }
    get api() {
      return this.getApiByType(this._defaultAPI);
    }
    get apiService() {
      if (void 0 !== this._defaultAPI)
        return this._apisByType[this._defaultAPI];
      We.error('There is no API instance configured');
    }
    get mediaAPI() {
      return this.getApiByType(ea.MEDIA_API);
    }
    get utsAPI() {
      return this.getApiByType(ea.UTS_API);
    }
    get utsClient() {
      return this.getApiByType(ea.UTS_CLIENT);
    }
    getApiByType(e) {
      let n;
      if (
        (void 0 !== e && (n = this._apisByType[e]),
        void 0 === n || void 0 === n.api)
      )
        throw new MKError(
          MKError.CONFIGURATION_ERROR,
          'There is no API instance configured for the requested type: ' + e
        );
      return n.api;
    }
    set defaultApiType(e) {
      this._defaultAPI = e;
    }
    registerAPIService(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const { apiType: n, configureFn: d, options: h } = e,
          p = h.apiOptions || {};
        void 0 === this._defaultAPI && (this._defaultAPI = n),
          (this._apisByType[n] = yield d.call(this, {
            apiOptions: p,
            store: this.store,
            dispatcher: this._dispatcher,
          }));
      });
    }
  }
  const ta = {};
  function adaptAddEventListener(e, n, d, h = {}) {
    const { once: p } = h,
      y = (function (e, n) {
        const d = getCallbacksForName(e),
          wrappedCallback = (e, d) => {
            n(d);
          };
        return d.push([n, wrappedCallback]), wrappedCallback;
      })(n, d);
    !0 === p ? e.subscribeOnce(n, y) : e.subscribe(n, y);
  }
  function getCallbacksForName(e) {
    let n = ta[e];
    return n || ((n = []), (ta[e] = n)), n;
  }
  class RTCStreamingTracker {
    constructor(e) {
      this.options = e;
    }
    configure(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (this.instance = e), this;
      });
    }
    loadScript() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!En.urls.rtc) throw new Error('bag.urls.rtc is not configured');
        yield loadScript(En.urls.rtc);
      });
    }
    prepareReportingAgent(e) {
      var n;
      this.clearReportingAgent();
      const d = e || this.instance.nowPlayingItem,
        h = d ? d.defaultPlayable : void 0,
        {
          Sender: p,
          ClientName: y,
          ServiceName: m,
          ApplicationName: g,
          ReportingStoreBag: _,
          DeviceName: b,
        } = window.rtc.RTCReportingAgentConfigKeys,
        T = {
          firmwareVersion: this.generateBrowserVersion(),
          model: this.options.browserName,
        };
      h
        ? ((null === (n = h.mediaMetrics) || void 0 === n
            ? void 0
            : n.MediaIdentifier) &&
            (T.MediaIdentifier = h.mediaMetrics.MediaIdentifier),
          h.channelId && (T.ContentProvider = h.channelId))
        : 'musicVideo' === (null == e ? void 0 : e.type)
        ? (T.MediaIdentifier = 'adamid=' + e.id)
        : (null == e ? void 0 : e.isLiveVideoStation) &&
          (T.MediaIdentifier = 'raid=' + e.id),
        void 0 === this._storeBag && (this._storeBag = this.generateStoreBag());
      const E = {
        [p]: 'HLSJS',
        [y]: this.options.clientName,
        [m]: this.options.serviceName,
        [g]: this.options.applicationName,
        [_]: this._storeBag,
        [b]: this.options.osVersion,
        userInfoDict: T,
      };
      return (
        We.debug('RTC: creating reporting agent with config', E),
        (this.reportingAgent = new window.rtc.RTCReportingAgent(E)),
        We.debug('RTC: created reporting agent', this.reportingAgent),
        this.reportingAgent
      );
    }
    shouldConfigure(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return !0;
      });
    }
    shouldTrackPlayActivity(e, n) {
      return !0;
    }
    cleanup() {
      this.clearReportingAgent();
    }
    clearReportingAgent() {
      void 0 !== this.reportingAgent &&
        (this.reportingAgent.destroy(),
        We.debug('RTC: called destroy on reporting agent', this.reportingAgent),
        (this.reportingAgent = void 0));
    }
    generateBrowserVersion() {
      return this.options.browserMajorVersion
        ? `${this.options.browserMajorVersion}.${
            this.options.browserMinorVersion || 0
          }`
        : 'unknown';
    }
    generateStoreBag() {
      var e;
      const {
          storeBagURL: n,
          clientName: d,
          applicationName: h,
          serviceName: p,
          browserName: y,
        } = this.options,
        m = {
          iTunesAppVersion: `${`${En.app.name}-${En.app.build}`}/${
            null === (e = this.instance) || void 0 === e ? void 0 : e.version
          }`,
        },
        g = new window.rtc.RTCStorebag.RTCReportingStoreBag(n, d, p, h, y, m);
      return We.debug('RTC: created store bag', g), g;
    }
  }
  const ia = [
      bt.playbackPause,
      bt.playbackPlay,
      bt.playbackScrub,
      bt.playbackSeek,
      bt.playbackSkip,
      bt.playbackStop,
      bt.playerActivate,
      bt.playerExit,
      bt.lyricsPlay,
      bt.lyricsStop,
      _n.nowPlayingItemWillChange,
    ],
    ra = {
      [bt.playbackPause]: 'pause',
      [bt.playbackPlay]: 'play',
      [bt.playbackScrub]: 'scrub',
      [bt.playbackSeek]: 'seek',
      [bt.playbackSkip]: 'skip',
      [bt.playbackStop]: 'stop',
      [bt.playerActivate]: 'activate',
      [bt.playerExit]: 'exit',
      [bt.lyricsPlay]: 'lyricsPlay',
      [bt.lyricsStop]: 'lyricsStop',
    };
  class PlayActivityService {
    constructor(e, n) {
      (this.isBuffering = !1), (this.apis = e), (this.dispatcher = n);
    }
    cleanup() {
      (this.currentItem = void 0),
        this.teardownWatchers(),
        this.apis.forEach((e) => e.cleanup());
    }
    configure(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = yield Promise.all(this.apis.map((n) => n.shouldConfigure(e))),
          h = this.apis.filter((e, n) => d[n]);
        if (0 === h.length) return;
        this.cleanup(), (this.instance = e);
        const p = h.map((d) => d.configure(e, n));
        try {
          yield Promise.all(p);
        } catch (Vt) {
          We.error('Error configuring a play activity service', Vt);
        } finally {
          this.setupWatchers(), this.clearIntention();
        }
      });
    }
    getTrackerByType(e) {
      return this.apis.find((n) => n instanceof e);
    }
    handleEvent(e, n = {}) {
      const { item: d } = n;
      void 0 !== d && (this.currentItem = d), We.debug(e, n);
      const h = ra[e];
      if (void 0 === h) return;
      const p = this.addIntention(e, n);
      switch ((delete p.item, e)) {
        case bt.playbackPause:
        case bt.playbackPlay:
        case bt.playbackScrub:
        case bt.playbackSeek:
        case bt.playbackSkip:
        case bt.playbackStop:
        case bt.lyricsPlay:
        case bt.lyricsStop:
          return this.callApis(e, h, this.currentItem, p);
        case bt.playerActivate:
          p.flush = 'boolean' == typeof n.isPlaying ? !n.isPlaying : void 0;
        case bt.playerExit:
          return this.callApis(e, h, p);
        case _n.nowPlayingItemWillChange:
          this.currentItem = d;
      }
    }
    addIntention(e, n) {
      let d = Object.assign({}, n);
      return this.shouldAddIntention(e)
        ? ((d = Object.assign(
            Object.assign(
              Object.assign({}, this.lastUserIntent),
              this.lastApplicationIntent
            ),
            d
          )),
          this.clearIntention(),
          d)
        : d;
    }
    callApis(e, n, ...d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const h = this.apis.map((h) => {
          if (
            'function' == typeof h[n] &&
            h.shouldTrackPlayActivity(e, this.currentItem)
          )
            return h[n](...d);
        });
        return Promise.all(h);
      });
    }
    clearIntention() {
      (this.lastUserIntent = void 0), (this.lastApplicationIntent = void 0);
    }
    onPlaybackStateChange(n, d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const { state: n } = d,
          h = {
            position: this.instance.currentPlaybackTime,
            playingDate: void 0,
          };
        return n === e.PlaybackStates.waiting
          ? ((this.isBuffering = !0),
            this.callApis('bufferStart', 'bufferStart', this.currentItem, h))
          : n === e.PlaybackStates.playing && this.isBuffering
          ? ((this.isBuffering = !1),
            this.callApis('bufferEnd', 'bufferEnd', this.currentItem, h))
          : void 0;
      });
    }
    recordApplicationIntent(e, n) {
      this.lastApplicationIntent = n;
    }
    recordUserIntent(e, n) {
      this.lastUserIntent = n;
    }
    shouldAddIntention(e) {
      return [bt.playbackPause, bt.playbackStop].includes(e);
    }
    setupWatchers() {
      ia.forEach((e) => {
        this.dispatcher.subscribe(e, this.handleEvent);
      }),
        this.dispatcher.subscribe(bt.userActivityIntent, this.recordUserIntent),
        this.dispatcher.subscribe(
          bt.applicationActivityIntent,
          this.recordApplicationIntent
        ),
        this.dispatcher.subscribe(
          _n.playbackStateDidChange,
          this.onPlaybackStateChange
        );
    }
    teardownWatchers() {
      ia.forEach((e) => {
        this.dispatcher.unsubscribe(e, this.handleEvent);
      }),
        this.dispatcher.unsubscribe(
          bt.userActivityIntent,
          this.recordUserIntent
        ),
        this.dispatcher.unsubscribe(
          bt.applicationActivityIntent,
          this.recordApplicationIntent
        ),
        this.dispatcher.unsubscribe(
          _n.playbackStateDidChange,
          this.onPlaybackStateChange
        );
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [String, Object]),
      __metadata$1('design:returntype', void 0),
    ],
    PlayActivityService.prototype,
    'handleEvent',
    null
  ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      PlayActivityService.prototype,
      'onPlaybackStateChange',
      null
    ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', void 0),
      ],
      PlayActivityService.prototype,
      'recordApplicationIntent',
      null
    ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', void 0),
      ],
      PlayActivityService.prototype,
      'recordUserIntent',
      null
    );
  const sa = BooleanDevFlag.register('mk-force-safari-hlsjs');
  function requiresHlsJs(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = null != e ? e : yield findKeySystemPreference(),
        d = !(!sa.enabled || 0 === kn.realm);
      return n !== Ge.FAIRPLAY || d;
    });
  }
  const loadLiveRadioAssets = (e, n, d) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        var h, p;
        const y = new Headers({
            Authorization: 'Bearer ' + n,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + d,
          }),
          m = urlEncodeParameters(
            Object.assign(Object.assign({}, e.playParams), { keyFormat: 'web' })
          ),
          g = `${En.urls.mediaApi}/play/assets?${m}`,
          _ = yield fetch(g, { method: 'GET', headers: y });
        if (500 === _.status) {
          const n = new MKError(MKError.SERVER_ERROR);
          throw ((n.data = e), n);
        }
        if (403 === _.status) {
          let n;
          try {
            (n = yield _.json()),
              (n =
                null === (h = null == n ? void 0 : n.errors) || void 0 === h
                  ? void 0
                  : h[0]);
          } catch (Vt) {}
          const d =
              '40303' === (null == n ? void 0 : n.code)
                ? MKError.SUBSCRIPTION_ERROR
                : MKError.ACCESS_DENIED,
            y = new MKError(
              d,
              null !== (p = null == n ? void 0 : n.title) && void 0 !== p
                ? p
                : null == n
                ? void 0
                : n.detail
            );
          throw ((y.data = e), y);
        }
        if (!_.ok) {
          const n = new MKError(MKError.CONTENT_UNAVAILABLE);
          throw ((n.data = e), n);
        }
        const b = (yield _.json()).results;
        return (
          We.debug(`media-item: loaded data from ${g}: ${JSON.stringify(b)}`), b
        );
      }),
    prepareOffersHlsUrlForEncryptedPlayback = (e) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        const n = En.urls.hlsOffersKeyUrls;
        if (!n) throw new MKError(MKError.CONTENT_UNSUPPORTED, 'HLS OFFERS');
        e.updateWithLoadedKeys(n),
          yield fetchMasterManifestUrl(e, e.offersHlsUrl);
      }),
    prepareLiveRadioForEncryptedPlayback = (e, n, d) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        if (
          !En.features['playready-live-radio'] &&
          st === Ge.PLAYREADY &&
          'video' !== e.attributes.mediaKind &&
          !En.features['mse-live-radio']
        )
          throw new MKError(MKError.CONTENT_UNSUPPORTED, 'LIVE_RADIO');
        const h = (yield loadLiveRadioAssets(e, n, d)).assets[0];
        e.updateWithLoadedKeys({
          'hls-key-cert-url': h.fairPlayKeyCertificateUrl,
          'hls-key-server-url': h.keyServerUrl,
          'widevine-cert-url': h.widevineKeyCertificateUrl,
        }),
          filterUnavailableLiveRadioUrls(h, e),
          e.isLiveVideoStation
            ? (e.assetURL = h.url)
            : yield fetchMasterManifestUrl(e, h.url);
      }),
    fetchMasterManifestUrl = (e, n) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        let d;
        try {
          d = yield fetch(n);
        } catch (Vt) {
          throw makeContentUnavailableError(e);
        }
        const h = yield d.text();
        extractAssetsFromMasterManifest(h, n, e);
      }),
    extractAssetsFromMasterManifest = (e, n, d) => {
      const h =
        /^#EXT-X-STREAM-INF:.*BANDWIDTH=(\d+),CODECS="(.*)"\s*\n(.*$)/gim;
      let p;
      for (; (p = h.exec(e)); ) {
        let [e, h, y, m] = p;
        /^http(s)?:\/\//.test(m) || (m = rewriteLastUrlPath(n, m)),
          d.assets.push({ bandwidth: Number(h), codec: y, URL: m });
      }
    },
    filterUnavailableLiveRadioUrls = (e, n) => {
      const d = new URL(e.url);
      if (!d.host.endsWith('.apple.com') && !d.host.endsWith('.applemusic.com'))
        throw makeContentUnavailableError(n);
    },
    makeContentUnavailableError = (e) => {
      const n = new MKError(MKError.CONTENT_UNAVAILABLE);
      return (n.data = e), n;
    },
    prepareItemWithMZPlay = (e, n, d) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        if (
          (We.debug('mk: loadWithMZPlay', e.playParams),
          'podcast-episodes' === e.type)
        )
          return void (e.assetURL = e.attributes.assetUrl);
        if (!(yield hasMusicSubscription())) return;
        const h = e.playParams.id,
          p = new Headers({
            Authorization: 'Bearer ' + n,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + d,
          });
        let y = { salableAdamId: h };
        if (e.isCloudItem) {
          (y = {}),
            e.playParams.purchasedId &&
              (y.purchaseAdamId = e.playParams.purchasedId),
            e.playParams.catalogId &&
              (y.subscriptionAdamId = e.playParams.catalogId);
          const n = /^a\.(\d+)$/;
          n.test(h)
            ? (y.subscriptionAdamId = h.replace(n, '$1'))
            : b(h) && (y.universalLibraryId = h);
        }
        if (!En.urls.webPlayback)
          throw new Error('bag.urls.webPlayback is not configured');
        const m = yield fetch(En.urls.webPlayback, {
            method: 'POST',
            body: JSON.stringify(y),
            headers: p,
          }),
          g = yield m.text(),
          _ = JSON.parse(g);
        if (!_ || !_.songList) {
          const n = MKError.serverError(_, MKError.UNSUPPORTED_ERROR);
          return (
            e.updateFromLoadError(n),
            We.debug('mk: prepareItemWithMZPlay - rejecting with error', n),
            Promise.reject(n)
          );
        }
        const [T] = _.songList;
        e.updateFromSongList(T);
      });
  function prepareToPlayMediaItem(e, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const { developerToken: d, userToken: h } = e.store;
      if (void 0 === d || void 0 === h)
        return Promise.reject(
          new MKError(
            MKError.AUTHORIZATION_ERROR,
            'Unable to prepare media item for play.'
          )
        );
      if (n.isPreparedToPlay) We.warn('media-item: item is prepared to play');
      else {
        if (
          (We.debug('media-item: item.prepareToPlay playParams', n.playParams),
          (n.state = N.loading),
          n.isUTS)
        )
          return Promise.reject(
            new MKError(
              MKError.UNSUPPORTED_ERROR,
              'Item was not prepared to play'
            )
          );
        yield ((e, n, d) =>
          __awaiter$1(void 0, void 0, void 0, function* () {
            e.hasOffersHlsUrl
              ? yield prepareOffersHlsUrlForEncryptedPlayback(e)
              : e.isLiveRadioStation
              ? yield prepareLiveRadioForEncryptedPlayback(e, n, d)
              : yield prepareItemWithMZPlay(e, n, d);
          }))(n, d, h);
      }
    });
  }
  function _playbackDataForItem(n, d) {
    if ((We.debug('mk: _playbackDataForItem', n), n.isCloudUpload))
      return n.assets[0];
    if ('musicVideo' !== n.type && !n.isLiveVideoStation) {
      if (!n.isLiveRadioStation && !n.hasOffersHlsUrl) {
        const [e] = n.assets.filter((e) => {
          var n;
          if (!('flavor' in e)) return !1;
          const h = new RegExp(
              `\\d{1,2}\\:(c${
                (function () {
                  var e;
                  return null === (e = window.WebKitMediaKeys) || void 0 === e
                    ? void 0
                    : e.isTypeSupported(at + '.1_0', it.AVC1);
                })()
                  ? 'bc'
                  : 'tr'
              }p)(\\d{2,3})`,
              'i'
            ),
            p = h.test(e.flavor),
            y = null !== (n = e.flavor.match(h)) && void 0 !== n ? n : [];
          return p && parseInt(y[2], 10) <= d.bitrate;
        });
        return e;
      }
      {
        const h = n.assets.reduce((e, n) => {
            const d = n.bandwidth;
            return e[d] || (e[d] = []), e[d].push(n), e;
          }, {}),
          p = Object.keys(h).sort((e, n) => parseInt(e, 10) - parseInt(n, 10)),
          y = d.bitrate === e.PlaybackBitrate.STANDARD ? p[0] : p[p.length - 1];
        n.assetURL = h[y][0].URL;
      }
    }
  }
  const {
    audioTracksSwitched: na,
    audioTracksUpdated: aa,
    inlineStylesParsed: oa,
    textTracksSwitched: da,
    textTracksUpdated: la,
  } = tt;
  class HlsJsTracks extends Notifications {
    constructor(e) {
      super([na, aa, oa, da, la]),
        (this.session = e),
        (this._audioTracks = []),
        (this._textTracks = []);
      const {
        MANIFEST_LOADED: n,
        AUDIO_TRACK_SWITCHED: d,
        SUBTITLE_TRACK_SWITCH: h,
        INLINE_STYLES_PARSED: p,
      } = window.Hls.Events;
      this.session.on(n, this.handleManifestLoaded),
        this.session.on(d, this.handleAudioTrackSwitched),
        this.session.on(h, this.handleSubtitleTrackSwitch),
        this.session.on(p, this.handleInlineStylesParsed);
    }
    get audioTracks() {
      return this._audioTracks;
    }
    get textTracks() {
      return this._textTracks;
    }
    set audioTrack(e) {
      this.session &&
        e &&
        e.id &&
        (this.session.audioSelectedPersistentID = e.id);
    }
    set textTrack(e) {
      var n;
      this.session.subtitleSelectedPersistentID =
        null !== (n = null == e ? void 0 : e.id) && void 0 !== n ? n : -1;
    }
    selectForcedTrack() {
      const { session: e } = this;
      if (!(null == e ? void 0 : e.audioTracks)) return;
      const n = e.audioTracks.filter(
          (n) => n.persistentID === e.audioSelectedPersistentID
        ),
        d = n && n.length && n[0];
      if (!d) return;
      const h = e.subtitleMediaOptions.filter(
          (e) =>
            0 === e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
            e.MediaSelectionOptionsExtendedLanguageTag === d.lang
        ),
        p = null == h ? void 0 : h[0];
      let y;
      return (
        p
          ? (M.debug(
              'hlsjsTracks: found forced track for ' +
                p.MediaSelectionOptionsExtendedLanguageTag
            ),
            (e.subtitleSelectedPersistentID =
              p.MediaSelectionOptionsPersistentID),
            (y = this.normalizeTextTrack(p)))
          : (e.subtitleSelectedPersistentID = -1),
        y
      );
    }
    audioTracksUpdated(e, n) {
      const d =
        (n &&
          n.audioMediaSelectionGroup &&
          n.audioMediaSelectionGroup.MediaSelectionGroupOptions) ||
        [];
      window.hlsSession = this.session;
      const h = d.map(this.normalizeAudioTrack, this);
      (this._audioTracks = h), this.dispatchEvent(aa, h);
    }
    handleAudioTrackSwitched() {
      this.dispatchEvent(na, {
        selectedId: this.session.audioSelectedPersistentID,
      });
    }
    handleInlineStylesParsed(e, n) {
      this.dispatchEvent(oa, n);
    }
    handleManifestLoaded(e, n) {
      this.audioTracksUpdated(e, n), this.subtitleTracksUpdated(e, n);
    }
    handleSubtitleTrackSwitch(e, n) {
      this.dispatchEvent(da, n);
    }
    subtitleTracksUpdated(e, n) {
      const d =
          (n &&
            n.subtitleMediaSelectionGroup &&
            n.subtitleMediaSelectionGroup.MediaSelectionGroupOptions) ||
          [],
        h = [];
      d.forEach((e) => {
        0 !== e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
          h.push(this.normalizeTextTrack(e));
      }),
        (this._textTracks = h),
        this.dispatchEvent(la, h);
    }
    normalizeAudioTrack(e) {
      var n;
      const d =
        'public.accessibility.describes-video' ===
        (null === (n = e.MediaSelectionOptionsTaggedMediaCharacteristics) ||
        void 0 === n
          ? void 0
          : n[0])
          ? 'description'
          : 'main';
      return Object.assign(
        Object.assign({}, this.normalizeSelectionOption(e)),
        { enabled: !1, kind: d }
      );
    }
    normalizeTextTrack(e) {
      var n;
      let d;
      return (
        (d =
          (null === (n = e.MediaSelectionOptionsTaggedMediaCharacteristics) ||
          void 0 === n
            ? void 0
            : n.includes('public.accessibility.describes-music-and-sound')) ||
          'clcp' === e.MediaSelectionOptionsMediaType
            ? 'captions'
            : 'subtitles'),
        Object.assign(Object.assign({}, this.normalizeSelectionOption(e)), {
          mode: 'disabled',
          kind: d,
        })
      );
    }
    normalizeSelectionOption(e) {
      return {
        id: e.MediaSelectionOptionsPersistentID,
        label: e.MediaSelectionOptionsName,
        language: e.MediaSelectionOptionsExtendedLanguageTag,
      };
    }
    destroy() {
      const {
        MANIFEST_LOADED: e,
        AUDIO_TRACK_SWITCHED: n,
        SUBTITLE_TRACK_SWITCH: d,
        INLINE_STYLES_PARSED: h,
      } = window.Hls.Events;
      this.session.off(e, this.handleManifestLoaded),
        this.session.off(n, this.handleAudioTrackSwitched),
        this.session.off(d, this.handleSubtitleTrackSwitch),
        this.session.off(h, this.handleInlineStylesParsed);
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0),
    ],
    HlsJsTracks.prototype,
    'handleAudioTrackSwitched',
    null
  ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsTracks.prototype,
      'handleInlineStylesParsed',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsTracks.prototype,
      'handleManifestLoaded',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsTracks.prototype,
      'handleSubtitleTrackSwitch',
      null
    );
  const ca = { keySystemGenericError: 'keySystemGenericError' },
    ua = new Set([MKError.DEVICE_LIMIT, MKError.GEO_BLOCK]),
    ha = {};
  (ha[Ge.FAIRPLAY] = 'fairplaystreaming'),
    (ha[Ge.PLAYREADY] = 'playready'),
    (ha[Ge.WIDEVINE] = 'widevine');
  const pa = BooleanDevFlag.get('mk-block-report-cdn-server'),
    ya = JsonDevFlag.register('mk-hlsjs-config-overrides');
  class HlsJsVideoPlayer extends VideoPlayer {
    constructor(e) {
      var n;
      super(e),
        (this._channelsByGroup = {}),
        (this._rtcTracker =
          null === (n = null == e ? void 0 : e.playbackServices) || void 0 === n
            ? void 0
            : n.getRTCStreamingTracker()),
        (this._license = new License());
    }
    get shouldDispatchErrors() {
      return !this.userInitiated || this._playbackDidStart;
    }
    get currentPlayingDate() {
      var e;
      return null === (e = this._hls) || void 0 === e ? void 0 : e.playingDate;
    }
    get isPlayingAtLiveEdge() {
      var e;
      const n = this._hls;
      return (
        !(
          !n ||
          !(null === (e = this.nowPlayingItem) || void 0 === e
            ? void 0
            : e.isLinearStream)
        ) && !!n.isPlayingAtLive
      );
    }
    get seekableTimeRanges() {
      const e = this._hls;
      return e
        ? e.seekableTimeRanges
        : this.currentPlaybackDuration
        ? [{ start: 0, end: this.currentPlaybackDuration }]
        : void 0;
    }
    initializeExtension() {
      var e;
      return __awaiter(this, void 0, void 0, function* () {
        this._keySystem = yield findKeySystemPreference();
        try {
          if (!Qe.urls.hls) throw new Error('bag.urls.hls is not configured');
          yield Promise.all([
            loadScript(Qe.urls.hls),
            null === (e = this._rtcTracker) || void 0 === e
              ? void 0
              : e.loadScript(),
          ]);
        } catch (Vt) {
          throw (
            (M.error(
              'hlsjs-video-player failed to load script ' + Qe.urls.hls,
              Vt
            ),
            Vt)
          );
        }
      });
    }
    destroy() {
      var e;
      if (
        (M.debug('hlsjs-video-player.destroy'),
        null === (e = this._hlsJsTracks) || void 0 === e || e.destroy(),
        this._hls)
      ) {
        const {
            ERROR: e,
            INTERNAL_ERROR: n,
            MANIFEST_PARSED: d,
            KEY_REQUEST_STARTED: h,
            LICENSE_CHALLENGE_CREATED: p,
            LEVEL_SWITCHED: y,
            UNRESOLVED_URI_LOADING: m,
          } = window.Hls.Events,
          g = this._hls;
        g.stopLoad(),
          g.detachMedia(),
          g.off(e, this.handleHlsError),
          g.off(n, this.handleHlsError),
          g.off(d, this.handleManifestParsed),
          g.off(h, this.handleKeyRequestStarted),
          g.off(p, this.handleLicenseChallengeCreated),
          g.off(y, this.handleLevelSwitched),
          this._shouldLoadManifestsOnce &&
            g.off(m, this.handleUnresolvedUriLoading),
          g.destroy();
      }
      super.destroy(), asAsync(this._license.stop());
    }
    playHlsStream(e, n) {
      M.debug('hlsjs-video-player.playHlsStream', e, n);
      const { _keySystem: d } = this;
      if (!d) return;
      let h, p;
      (this._unrecoverableError = void 0),
        this.createHlsPlayer(),
        d === Ge.WIDEVINE &&
          ((h = 'WIDEVINE_SOFTWARE'),
          (p = {
            initDataTypes: ['cenc', 'keyids'],
            distinctiveIdentifier: 'optional',
            persistentState: 'required',
          }));
      const y = {
          subs: 'accepts-css',
          platformInfo: {
            requiresCDMAttachOnStart: d !== Ge.NONE,
            maxSecurityLevel: h,
            keySystemConfig: p,
          },
          appData: { serviceName: Qe.app.name },
        },
        { _rtcTracker: m, _hls: g } = this;
      if (m) {
        const e = m.prepareReportingAgent(n);
        void 0 !== e && (y.appData.reportingAgent = e);
      }
      M.debug('RTC: loadSource with load options', y),
        this._shouldLoadManifestsOnce &&
          ((e = e.replace('https://', 'manifest://')),
          M.info('Manifest already loaded, passing url to HLSJS', e)),
        g.loadSource(e, y),
        g.attachMedia(this.video),
        n &&
          ((this._licenseServerUrl = n.keyURLs['hls-key-server-url']),
          d === Ge.FAIRPLAY
            ? g.setProtectionData({
                fairplaystreaming: {
                  serverCertUrl: n.keyURLs['hls-key-cert-url'],
                },
              })
            : g.setProtectionData({
                widevine: { serverCertUrl: n.keyURLs['widevine-cert-url'] },
              }));
    }
    createHlsPlayer() {
      const { _keySystem: e } = this,
        { Hls: n } = window,
        d = Xs.get(),
        h = {
          clearMediaKeysOnPromise: !1,
          customTextTrackCueRenderer: !0,
          debug: !!d,
          debugLevel: d,
          enablePerformanceLogging: !!d,
          enablePlayReadyKeySystem: !0,
          enableQueryParamsForITunes: !this._shouldLoadManifestsOnce,
          enableRtcReporting: void 0 !== this._rtcTracker,
          keySystemPreference: ha[e],
          useMediaKeySystemAccessFilter: !0,
          nativeControlsEnabled: ze.isAndroid,
        };
      ((e) => {
        const { Hls: n } = window;
        if (n && pa) {
          const d = deepClone(n.DefaultConfig.fragLoadPolicy);
          (d.default.reportCDNServer = !1),
            (d.customURL.reportCDNServer = !1),
            (e.fragLoadPolicy = d);
        }
      })(h),
        ((e) => {
          const n = zs.value;
          n &&
            n.socketurl &&
            isAppleHostname(n.socketurl) &&
            'carry-' === determineCdnBasePrefix() &&
            ((e.socketurl = n.socketurl),
            (e.socketid = n.socketid),
            (e.log = n.log));
        })(h),
        ((e) => {
          const n = ya.value;
          n && 'object' == typeof n && Object.assign(e, n);
        })(h);
      const p = new n(h),
        {
          ERROR: y,
          INTERNAL_ERROR: m,
          MANIFEST_PARSED: g,
          KEY_REQUEST_STARTED: _,
          LICENSE_CHALLENGE_CREATED: b,
          LEVEL_SWITCHED: T,
          UNRESOLVED_URI_LOADING: E,
        } = n.Events;
      p.on(y, this.handleHlsError),
        p.on(m, this.handleHlsError),
        p.on(g, this.handleManifestParsed),
        p.on(_, this.handleKeyRequestStarted),
        p.on(b, this.handleLicenseChallengeCreated),
        p.on(T, this.handleLevelSwitched),
        this._shouldLoadManifestsOnce &&
          p.on(E, this.handleUnresolvedUriLoading),
        (this._hls = p),
        (this._hlsJsTracks = new HlsJsTracks(this._hls)),
        this.setupTrackManagers(this._hlsJsTracks);
    }
    handleUnresolvedUriLoading(e, n) {
      var d;
      return __awaiter(this, void 0, void 0, function* () {
        const e = this._hls,
          h = n.uri,
          p = h.replace('manifest://', 'https://');
        M.debug('handleUnresolvedUriLoading for uri ', h);
        const y =
          null !== (d = bn.getManifest(p)) && void 0 !== d
            ? d
            : yield bn.fetchManifest(p);
        y
          ? (bn.clear(p),
            e.handleResolvedUri(h, { url: p, status: 200, data: y.content }))
          : M.error('No cached manifest for ' + p);
      });
    }
    handleLevelSwitched(e, n) {
      var d, h;
      const { level: p } = n;
      if (!p) return;
      const y =
        null === (d = this._levels) || void 0 === d
          ? void 0
          : d.find((e) => e.persistentId === p);
      if (
        !y ||
        (null === (h = this._currentLevel) || void 0 === h
          ? void 0
          : h.persistentId) === (null == y ? void 0 : y.persistentId)
      )
        return;
      this._currentLevel = y;
      const m =
        void 0 !== y.audioGroupId
          ? this._channelsByGroup[y.audioGroupId]
          : void 0;
      this._dispatcher.publish(bt.hlsLevelUpdated, { level: y, channels: m });
    }
    handleHlsError(e, n) {
      if ((M.warn('HLS.js error', JSON.stringify(n)), this._unrecoverableError))
        return;
      let d = new MKError(MKError.UNSUPPORTED_ERROR, n.reason);
      d.data = n;
      const { keySystemGenericError: h } = ca;
      if (n.details !== h) {
        if (
          ('output-restricted' === n.reason &&
            (d = new MKError(MKError.OUTPUT_RESTRICTED, n.reason)),
          n.fatal)
        ) {
          if ((this._hls.destroy(), !this.shouldDispatchErrors)) throw d;
          this._dispatcher.publish(St.mediaPlaybackError, d);
        }
      } else this._dispatcher.publish(h, d);
    }
    handleManifestParsed(e, n) {
      var d, h, p;
      (this._levels = null !== (d = n.levels) && void 0 !== d ? d : []),
        (this.nowPlayingItem.state = N.ready),
        (this._channelsByGroup = (
          null !== (h = n.audioTracks) && void 0 !== h ? h : []
        ).reduce((e, n) => ((e[n.groupId] = n.channels), e), {})),
        (
          null === (p = this.nowPlayingItem) || void 0 === p
            ? void 0
            : p.isLinearStream
        )
          ? asAsync(this.play())
          : asAsync(this._playMedia());
    }
    handleKeyRequestStarted(e, n) {
      M.debug('hlsjs-video.handleKeyRequestStarted'),
        this._hls.generateKeyRequest(n.keyuri, {});
    }
    handleLicenseChallengeCreated(n, d) {
      var h;
      return __awaiter(this, void 0, void 0, function* () {
        const {
          _licenseServerUrl: n,
          nowPlayingItem: p,
          _keySystem: y,
          userInitiated: m,
        } = this;
        try {
          const e = yield null === (h = this._license) || void 0 === h
              ? void 0
              : h.start(n, p, d, y, m),
            g = { statusCode: e.status };
          (null == e ? void 0 : e.license) &&
            (y === Ge.FAIRPLAY
              ? (g.ckc = ut(e.license))
              : (g.license = ut(e.license)));
          const _ = e['renew-after'];
          _ && (g.renewalDate = new Date(Date.now() + 1e3 * _)),
            this._hls.setLicenseResponse(d.keyuri, g);
        } catch (Vt) {
          if (this._unrecoverableError) return;
          const h = Vt.data,
            p = {};
          void 0 !== (null == h ? void 0 : h.status) &&
            (p.statusCode = +h.status),
            M.warn('Passing license response error to Hls.js', p),
            this._hls.setLicenseResponse(d.keyuri, p),
            ua.has(Vt.name) &&
              ((this._unrecoverableError = Vt),
              this._licenseError(),
              yield this.stop({
                endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
                userInitiated: m,
              })),
            this.onPlaybackLicenseError(Vt);
        }
      });
    }
    seekToTime(e) {
      return __awaiter(this, void 0, void 0, function* () {
        this._hls
          ? (M.debug('hlsjs-video: hls seekTo', e), (this._hls.seekTo = e))
          : (M.debug('hlsjs-video: media element seek to', e),
            (this._targetElement.currentTime = e));
      });
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [String, Object]),
      __metadata('design:returntype', Promise),
    ],
    HlsJsVideoPlayer.prototype,
    'handleUnresolvedUriLoading',
    null
  ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleLevelSwitched',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleHlsError',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleManifestParsed',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', void 0),
      ],
      HlsJsVideoPlayer.prototype,
      'handleKeyRequestStarted',
      null
    ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', Promise),
      ],
      HlsJsVideoPlayer.prototype,
      'handleLicenseChallengeCreated',
      null
    ),
    __decorate(
      [
        AsyncDebounce(250),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Number]),
        __metadata('design:returntype', Promise),
      ],
      HlsJsVideoPlayer.prototype,
      'seekToTime',
      null
    );
  const { mediaPlaybackError: ma } = St,
    { playbackLicenseError: ga, playbackSessionError: fa } = tt;
  class NativeSafariVideoPlayer extends VideoPlayer {
    get currentPlayingDate() {}
    get isPlayingAtLiveEdge() {
      return !1;
    }
    get seekableTimeRanges() {
      return this.currentPlaybackDuration
        ? [{ start: 0, end: this.currentPlaybackDuration }]
        : void 0;
    }
    initializeExtension() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!this.video)
          return void M.warn(
            'NativeSafariVideoPlayer.initializeExtension No video element, not initializing extension'
          );
        const e = new MediaExtension(
          this.video,
          'video/mp4;codecs="avc1.42E01E"'
        );
        (this.extension = e),
          yield e.initializeKeySystem(),
          e.addEventListener(ga, this.onPlaybackLicenseError),
          e.addEventListener(fa, this.onPlaybackSessionError);
      });
    }
    destroy() {
      M.debug('native-safari-video-player.destroy');
      const { extension: e, video: n } = this;
      this._blobUrl &&
        (URL.revokeObjectURL(this._blobUrl), (this._blobUrl = void 0)),
        e &&
          n &&
          (e.removeEventListener(ga, this.onPlaybackLicenseError),
          e.removeEventListener(fa, this.onPlaybackSessionError),
          n.removeEventListener('loadedmetadata', this.onMetadataLoaded),
          super.destroy());
    }
    playHlsStream(e) {
      var n;
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('native-safari-video-player.playHlsStream', e);
        const { video: d } = this;
        if (!d)
          return void M.error(
            'NativeSafariVideoPlayer.playHlsStream No video element'
          );
        this.setupTrackManagers(),
          this._shouldLoadManifestsOnce
            ? yield this.playByBlob(e, d)
            : this.playBySource(e, d);
        const { nowPlayingItem: h } = this;
        h &&
          (null === (n = this.extension) || void 0 === n || n.setMediaItem(h)),
          d.addEventListener('loadedmetadata', this.onMetadataLoaded);
      });
    }
    onPlaybackSessionError(e) {
      this._dispatcher.publish(ma, new MKError(MKError.MEDIA_SESSION, e));
    }
    onMetadataLoaded() {
      M.debug('native-safari-video-player.onMetadataLoaded');
      const { nowPlayingItem: e } = this;
      e && (e.state = N.ready), asAsync(this._playMedia());
    }
    seekToTime(e) {
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('native-safari-video-player: media element seek to', e),
          (this._targetElement.currentTime = e);
      });
    }
    playByBlob(e, n) {
      var d;
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('native-safari-video-player: playing video by blob');
        const h =
          null !== (d = bn.getManifest(e)) && void 0 !== d
            ? d
            : yield bn.fetchManifest(e);
        if (!h)
          throw (
            (M.error('No manifest for ' + e),
            new MKError(MKError.CONTENT_UNAVAILABLE, 'Failed to load manifest'))
          );
        bn.clear(e);
        const p = h.contentType,
          y = h.content.replace(/^#EXT-X-SESSION-DATA-ITUNES:.*$/gm, ''),
          m = new Blob([y], { type: p });
        (e = URL.createObjectURL(m)), (this._blobUrl = e);
        const g = document.createElement('source');
        g.setAttribute('src', e),
          p && g.setAttribute('type', p),
          M.debug('native-safari-video-player: blob url', e),
          n.appendChild(g);
      });
    }
    playBySource(e, n) {
      M.debug('native-safari-video-player: playing video by source'),
        (n.src = e);
    }
  }
  __decorate(
    [
      Bind(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', void 0),
    ],
    NativeSafariVideoPlayer.prototype,
    'onPlaybackSessionError',
    null
  ),
    __decorate(
      [
        Bind(),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0),
      ],
      NativeSafariVideoPlayer.prototype,
      'onMetadataLoaded',
      null
    ),
    __decorate(
      [
        AsyncDebounce(250),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Number]),
        __metadata('design:returntype', Promise),
      ],
      NativeSafariVideoPlayer.prototype,
      'seekToTime',
      null
    );
  const va = BooleanDevFlag.register('mk-safari-force-native-live-stream');
  class Factory {
    constructor(e) {
      (this._playersByType = {}), (this._playerOptions = e);
    }
    getPlayerForMediaItem(e, n, d) {
      var h;
      return __awaiter(this, void 0, void 0, function* () {
        M.debug('mk: getPlayerForMediaItem', e, n);
        const p = getPlayerType(e);
        let y = this._playersByType[p];
        if (
          ((null == y ? void 0 : y.isDestroyed) &&
            (M.debug(
              'mk: existingPlayer was previously destroyed. Removing from factory.'
            ),
            (y = void 0),
            delete this._playersByType[p]),
          y && y === d)
        )
          return d;
        if (y) return this._applyPlayerState(y, n), y;
        const { _playerOptions: m } = this;
        let g;
        switch (p) {
          case 'audio':
            (g = new AudioPlayer(m)), (this._playersByType[p] = g);
            break;
          case 'video': {
            const n = yield null ===
                (h = this._playerOptions.playbackServices) || void 0 === h
                ? void 0
                : h.requiresHlsJs(),
              d = this._shouldForceHlsJsPlayer(e);
            g =
              n || d ? new HlsJsVideoPlayer(m) : new NativeSafariVideoPlayer(m);
            break;
          }
          default:
            throw new Error('Invalid player type requested: ' + p);
        }
        return yield g.initialize(), this._applyPlayerState(g, n), g;
      });
    }
    _shouldForceHlsJsPlayer(e) {
      var n, d, h;
      return (
        !va.enabled &&
        (e.isLiveVideoStation ||
          e.isLinearStream ||
          (null ===
            (h =
              null ===
                (d =
                  null === (n = e.defaultPlayable) || void 0 === n
                    ? void 0
                    : n.assets) || void 0 === d
                ? void 0
                : d.fpsKeyServerUrl) || void 0 === h
            ? void 0
            : h.startsWith('https://linear.tv.apple.com')))
      );
    }
    _applyPlayerState(e, n) {
      return n
        ? (M.debug('_applyPlayerState', n),
          Object.keys(n).forEach((d) => {
            void 0 !== e[d] && (e[d] = n[d]);
          }),
          e)
        : e;
    }
    destroy() {
      Object.values(this._playersByType).forEach((e) => e.destroy());
    }
  }
  const {
      mediaCanPlay: _a,
      mediaPlaybackError: ba,
      playerTypeDidChange: Ta,
    } = St,
    { playbackLicenseError: Ea } = tt,
    { keySystemGenericError: Sa } = ca,
    ka = { preview: !0 };
  let Pa = !1;
  class MediaItemPlayback {
    constructor(e) {
      (this.playerState = { playbackRate: 1, volume: 1 }),
        (this.playOptions = new Map()),
        (this._hasSmartPlayed = !1),
        (this._previewOnly = !1);
      const { playbackServices: n } = e;
      var d, h;
      (this.hasMusicSubscription = n.hasMusicSubscription),
        (this.prepareForEncryptedPlayback = n.prepareForEncryptedPlayback),
        (d = e.tokens),
        (ms = d),
        e.bag && ((h = e.bag), Object.assign(Qe, h)),
        (this._dispatcher = e.services.dispatcher),
        (this._playerFactory = new Factory(e)),
        (this._currentPlayer = new PlayerStub(e)),
        this._dispatcher.subscribe(_a, this.handleSmartPlay),
        this._dispatcher.subscribe(Ea, this.onPlaybackLicenseError),
        this._dispatcher.subscribe(Sa, this.onKeySystemGenericError);
    }
    get currentPlaybackTime() {
      var e, n;
      if (!this._hasSmartPlayed) {
        const d =
          null ===
            (n =
              null === (e = this.nowPlayingItem) || void 0 === e
                ? void 0
                : e.playEvent) || void 0 === n
            ? void 0
            : n.playCursorInSeconds;
        if (d) return this._currentPlayer.calculateTime(d);
      }
      return this._currentPlayer.currentPlaybackTime;
    }
    get currentPlaybackTimeRemaining() {
      return this._currentPlayer.currentPlaybackTimeRemaining;
    }
    get currentPlayingDate() {
      return this._currentPlayer.currentPlayingDate;
    }
    get isPlayingAtLiveEdge() {
      return this._currentPlayer.isPlayingAtLiveEdge;
    }
    get seekableTimeRanges() {
      return this._currentPlayer.seekableTimeRanges;
    }
    get audioTracks() {
      return this._currentPlayer.audioTracks;
    }
    get currentAudioTrack() {
      return this._currentPlayer.currentAudioTrack;
    }
    set currentAudioTrack(e) {
      this._currentPlayer.currentAudioTrack = e;
    }
    get currentPlaybackDuration() {
      return this._currentPlayer.currentPlaybackDuration;
    }
    get currentBufferedProgress() {
      return this._currentPlayer.currentBufferedProgress;
    }
    get currentPlaybackProgress() {
      return this._currentPlayer.currentPlaybackProgress;
    }
    get currentTextTrack() {
      return this._currentPlayer.currentTextTrack;
    }
    set currentTextTrack(e) {
      this._currentPlayer.currentTextTrack = e;
    }
    get previewOnly() {
      return this._previewOnly;
    }
    set previewOnly(e) {
      (this._previewOnly = e),
        this._currentPlayer && (this._currentPlayer.previewOnly = e);
    }
    get isPlaying() {
      return this._currentPlayer.isPlaying;
    }
    get isPrimaryPlayer() {
      return this._currentPlayer.isPrimaryPlayer;
    }
    set isPrimaryPlayer(e) {
      this._currentPlayer.isPrimaryPlayer = e;
    }
    get isReady() {
      return this._currentPlayer.isReady;
    }
    get nowPlayingItem() {
      return this._currentPlayer.nowPlayingItem;
    }
    get playbackRate() {
      return this._currentPlayer.playbackRate;
    }
    set playbackRate(e) {
      this._updatePlayerState('playbackRate', e);
    }
    get playbackState() {
      return this._currentPlayer.playbackState;
    }
    set playbackState(e) {
      this._currentPlayer.setPlaybackState(e, this.nowPlayingItem);
    }
    get playbackTargetAvailable() {
      return this._currentPlayer.playbackTargetAvailable;
    }
    get playbackTargetIsWireless() {
      return this._currentPlayer.playbackTargetIsWireless;
    }
    get textTracks() {
      return this._currentPlayer.textTracks;
    }
    get volume() {
      return this._currentPlayer.volume;
    }
    set volume(e) {
      var n;
      this._currentPlayer.isDestroyed &&
        (null === (n = this._dispatcher) ||
          void 0 === n ||
          n.publish(St.playbackVolumeDidChange, {})),
        this._updatePlayerState('volume', e);
    }
    clearNextManifest() {
      this._currentPlayer.clearNextManifest();
    }
    destroy() {
      var e, n, d;
      this._playerFactory.destroy(),
        null === (e = this._dispatcher) ||
          void 0 === e ||
          e.unsubscribe(_a, this.handleSmartPlay),
        null === (n = this._dispatcher) ||
          void 0 === n ||
          n.unsubscribe(Ea, this.onPlaybackLicenseError),
        null === (d = this._dispatcher) ||
          void 0 === d ||
          d.unsubscribe(Sa, this.onKeySystemGenericError);
    }
    exitFullscreen() {
      return this._currentPlayer.exitFullscreen();
    }
    getNewSeeker() {
      return this._currentPlayer.newSeeker();
    }
    mute() {
      (this._volumeAtMute = this.volume), (this.volume = 0);
    }
    pause(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._currentPlayer.pause(e);
      });
    }
    play() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._currentPlayer.play();
      });
    }
    preload() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._currentPlayer.preload();
      });
    }
    prepareToPlay(e) {
      var n;
      return __awaiter$1(this, void 0, void 0, function* () {
        M.debug('invoking prepareToPlay for ', e.title);
        const d = yield this.prepareForEncryptedPlayback(
            e,
            this._currentPlayer
          ),
          h =
            null === (n = this._currentPlayback) || void 0 === n
              ? void 0
              : n.item,
          p = Qe.features['seamless-audio-transitions'],
          y = 'song' === (null == h ? void 0 : h.type) && 'song' === e.type;
        return (
          p &&
            y &&
            (M.debug(`setting ${e.title} for seamless audio transition`),
            yield this._currentPlayer.setNextSeamlessItem(e)),
          d
        );
      });
    }
    requestFullscreen(e) {
      return this._currentPlayer.requestFullscreen(e);
    }
    showPlaybackTargetPicker() {
      this._currentPlayer.showPlaybackTargetPicker();
    }
    seekToTime(e, n = At.Manual) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this._currentPlayer.seekToTime(e, n);
      });
    }
    setPresentationMode(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._currentPlayer.setPresentationMode(e);
      });
    }
    startMediaItemPlayback(e, n = !1) {
      var d;
      return __awaiter$1(this, void 0, void 0, function* () {
        M.debug('MediaItemPlayback: startMediaItemPlayback', e),
          e.resetState(),
          ((e) => {
            if (
              e.isLinearStream &&
              (ze.isiOS || (ze.isMacOs && navigator.maxTouchPoints > 2))
            ) {
              M.warn('Cannot play linear stream on iOS or iPad');
              const n = new MKError(MKError.CONTENT_UNSUPPORTED, 'IOS LINEAR');
              throw ((n.data = { item: e }), n);
            }
          })(e),
          ((e) => {
            if (!supportsDrm() && !ka[e.type.toLowerCase()]) {
              const n = new MKError(MKError.CONTENT_UNSUPPORTED, 'NO DRM');
              throw ((n.data = { item: e }), M.warn('No DRM detected'), n);
            }
          })(e),
          yield ((e, n) =>
            __awaiter$1(void 0, void 0, void 0, function* () {
              var d, h;
              if (
                null ===
                  (h =
                    null === (d = e.container) || void 0 === d
                      ? void 0
                      : d.attributes) || void 0 === h
                  ? void 0
                  : h.requiresSubscription
              ) {
                if (!(yield n())) {
                  const n = new MKError(MKError.SUBSCRIPTION_ERROR);
                  throw ((n.data = e), n);
                }
              }
            }))(e, this.hasMusicSubscription);
        const h = yield this._getPlayerForMediaItem(e);
        if (
          (yield this.setCurrentPlayer(h),
          !(null === (d = this._currentPlayer) || void 0 === d
            ? void 0
            : d.hasMediaElement))
        )
          return (
            M.warn(
              `MediaItemPlayback: Could not play media of type ${e.type}, marking item as unsupported and skipping.`
            ),
            void e.notSupported()
          );
        try {
          e.beginMonitoringStateDidChange((e) => {
            var n;
            return null === (n = this._dispatcher) || void 0 === n
              ? void 0
              : n.publish(P.mediaItemStateDidChange, e);
          }),
            e.beginMonitoringStateWillChange((e) => {
              var n;
              return null === (n = this._dispatcher) || void 0 === n
                ? void 0
                : n.publish(P.mediaItemStateWillChange, e);
            });
          const d = this.playOptions.get(e.id);
          d && this.playOptions.delete(e.id);
          const h = yield this._playAccordingToPlaybackType(e, n, d);
          return (this._currentPlayback = { item: e, userInitiated: n }), h;
        } catch (H) {
          throw (M.error(H), H);
        }
      });
    }
    _playAccordingToPlaybackType(e, n, d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (yield (function (e, n) {
          return __awaiter$1(this, void 0, void 0, function* () {
            return (
              !!e.previewURL &&
              (!!n ||
                (!e.playRawAssetURL &&
                  ((!e.isUTS && !(yield hasMusicSubscription())) ||
                    !(!e.isUTS || 'Preview' !== e.type) ||
                    !hasAuthorization() ||
                    !supportsDrm() ||
                    !e.isPlayable)))
            );
          });
        })(e, this._previewOnly))
          ? this._playPreview(e, n)
          : (function (e) {
              return !(!e.playRawAssetURL || !e.attributes.assetUrl);
            })(e)
          ? this._playRawAsset(e, n, d)
          : isBroadcastRadio(e)
          ? this._playBroadcastRadio(e, n)
          : this._playEncryptedFull(e, n, d);
      });
    }
    _playEncryptedFull(e, n, d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (
          (M.debug('MediaItemPlayback: play encrypted full', e),
          !e || !e.isPlayable)
        )
          return Promise.reject(
            new MKError(MKError.MEDIA_PLAYBACK, 'Not Playable')
          );
        const h = this._currentPlayer;
        try {
          yield this.prepareForEncryptedPlayback(e, h);
        } catch (H) {
          return (
            M.error('prepareForEncryptedPlayback Error: userInitiated ' + n),
            h.destroy(),
            n ? Promise.reject(H) : void h.dispatch(St.mediaPlaybackError, H)
          );
        }
        return (
          yield (function (e) {
            return new Promise((n, d) => {
              const { ageGatePolicy: h } = e;
              if (!h || !h.age || !h.frequencyInMinutes)
                return (
                  We.debug('No ageGatePolicy. Resolving handleAgeGate()'),
                  n(void 0)
                );
              const p = getLocalStorage(),
                y = null == p ? void 0 : p.ageGatePolicyAge,
                m = null == p ? void 0 : p.ageGatePolicyExpiration;
              if (
                y &&
                m &&
                parseInt(m, 10) > Date.now() &&
                parseInt(y, 10) >= h.age
              )
                return n(void 0);
              MKDialog.clientDialog({
                okButtonString: 'Yes',
                okButtonAction: () => (
                  null == p || p.setItem('ageGatePolicyAge', h.age.toString()),
                  null == p ||
                    p.setItem(
                      'ageGatePolicyExpiration',
                      (Date.now() + 60 * h.frequencyInMinutes * 1e3).toString()
                    ),
                  n(void 0)
                ),
                cancelButtonString: 'No',
                cancelButtonAction: () =>
                  d(new MKError('AGE_GATE', 'Age Gate Declined')),
                explanation: `This content may not be appropriate for ages younger than ${h.age}.`,
                message: `Are you ${h.age} or older?`,
              }).present();
            });
          })(e),
          M.debug('About to play item as encrypted', e),
          yield h.playItemFromEncryptedSource(e, n, d),
          e
        );
      });
    }
    _playBroadcastRadio(n, d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (
          (M.debug('MediaItemPlayback: play broadcast radio', n),
          !Qe.features['broadcast-radio'])
        ) {
          const e = new MKError(MKError.CONTENT_UNAVAILABLE);
          throw ((e.data = n), e);
        }
        const h = this._currentPlayer,
          p = h.isPaused() && !d,
          y = yield loadLiveRadioAssets(
            n,
            ms.developerToken,
            ms.musicUserToken
          ),
          m = y.assets[0];
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (n.trackInfo = y['track-info']),
          (h.nowPlayingItem = n),
          yield h.playItemFromUnencryptedSource(m.url, p),
          n
        );
      });
    }
    _playRawAsset(n, d, h) {
      return __awaiter$1(this, void 0, void 0, function* () {
        M.debug('MediaItemPlayback: play raw asset', n);
        const p = this._currentPlayer,
          y = p.isPaused() && !d;
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (p.nowPlayingItem = n),
          yield p.playItemFromUnencryptedSource(n.attributes.assetUrl, y, h),
          n
        );
      });
    }
    _playPreview(n, d) {
      return __awaiter$1(this, void 0, void 0, function* () {
        M.debug('MediaItemPlayback: play preview', n);
        const h = this._currentPlayer,
          p = h.isPaused() && !d;
        return (
          supportsDrm() || h.dispatch(St.drmUnsupported, { item: n }),
          (n.playbackType = e.PlaybackType.preview),
          (h.nowPlayingItem = n),
          yield h.playItemFromUnencryptedSource(n.previewURL, p),
          n
        );
      });
    }
    stop(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this._currentPlayer.stop(e);
      });
    }
    unmute() {
      this.volume > 0 ||
        ((this.volume = this._volumeAtMute || 1),
        (this._volumeAtMute = void 0));
    }
    _getPlayerForMediaItem(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        M.debug('MediaItemPlayback:  _getPlayerForMediaItem', e.id);
        const n = yield this._playerFactory.getPlayerForMediaItem(
          e,
          this.playerState,
          this._currentPlayer
        );
        return (n.previewOnly = this._previewOnly), n;
      });
    }
    setCurrentPlayer(e) {
      var n;
      return __awaiter$1(this, void 0, void 0, function* () {
        this._currentPlayer !== e &&
          (M.debug('MediaItemPlayback: setting currentPlayer', e),
          yield this._currentPlayer.stop(),
          (this._hasSmartPlayed = !1),
          (this._currentPlayer = e),
          null === (n = this._dispatcher) ||
            void 0 === n ||
            n.publish(Ta, { player: e }));
      });
    }
    handleSmartPlay() {
      var e, n;
      const d = this.nowPlayingItem;
      if (this._hasSmartPlayed || !d) return;
      if (
        !(null === (e = null == d ? void 0 : d.playEvent) || void 0 === e
          ? void 0
          : e.isDone) ||
        !1
      ) {
        M.debug('BasePlayer.handleSmartPlay is resuming playCursor');
        const e =
          null === (n = d.playEvent) || void 0 === n
            ? void 0
            : n.playCursorInSeconds;
        e && this._currentPlayer.seekToTime(e);
      }
      this._hasSmartPlayed = !0;
    }
    onKeySystemGenericError(e, n) {
      var d;
      return __awaiter$1(this, void 0, void 0, function* () {
        Pa
          ? null === (d = this._dispatcher) || void 0 === d || d.publish(ba, n)
          : ((Pa = !0),
            M.warn('Retrying playback after keysystemGenericError'),
            yield this.restartPlayback());
      });
    }
    onPlaybackLicenseError(e, n) {
      var d;
      return __awaiter$1(this, void 0, void 0, function* () {
        n.errorCode === MKError.PLAYREADY_CBC_ENCRYPTION_ERROR
          ? (M.warn(
              'MediaItemPlayback: PLAYREADY_CBC_ENCRYPTION_ERROR...retrying with different key system'
            ),
            yield this.restartPlayback())
          : null === (d = this._dispatcher) || void 0 === d || d.publish(ba, n);
      });
    }
    restartPlayback() {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.stop();
        const { _currentPlayback: e } = this;
        if (e) {
          const { item: n, userInitiated: d } = e;
          n.resetState(), yield this.startMediaItemPlayback(n, d);
        }
      });
    }
    _updatePlayerState(e, n) {
      (this.playerState[e] = n), (this._currentPlayer[e] = n);
    }
  }
  __decorate$1(
    [
      Bind(),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', []),
      __metadata$1('design:returntype', void 0),
    ],
    MediaItemPlayback.prototype,
    'handleSmartPlay',
    null
  ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      MediaItemPlayback.prototype,
      'onKeySystemGenericError',
      null
    ),
    __decorate$1(
      [
        Bind(),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', [Object, Object]),
        __metadata$1('design:returntype', Promise),
      ],
      MediaItemPlayback.prototype,
      'onPlaybackLicenseError',
      null
    );
  const Ia = [
    MKError.AGE_VERIFICATION,
    MKError.CONTENT_EQUIVALENT,
    MKError.CONTENT_RESTRICTED,
    MKError.CONTENT_UNAVAILABLE,
    MKError.CONTENT_UNSUPPORTED,
    MKError.SERVER_ERROR,
    MKError.SUBSCRIPTION_ERROR,
    MKError.UNSUPPORTED_ERROR,
    MKError.USER_INTERACTION_REQUIRED,
  ];
  var Aa;
  (e.PlaybackMode = void 0),
    ((Aa = e.PlaybackMode || (e.PlaybackMode = {}))[(Aa.PREVIEW_ONLY = 0)] =
      'PREVIEW_ONLY'),
    (Aa[(Aa.MIXED_CONTENT = 1)] = 'MIXED_CONTENT'),
    (Aa[(Aa.FULL_PLAYBACK_ONLY = 2)] = 'FULL_PLAYBACK_ONLY');
  const wa = JsonDevFlag.register('mk-bag-features-overrides');
  class MKInstance {
    constructor(n, d = {}) {
      if (
        ((this._autoplayEnabled = !1),
        (this.privateEnabled = !1),
        (this.siriInitiated = !1),
        (this.sourceType = Kt.MUSICKIT),
        (this.version = e.version),
        (this._bag = En),
        (this._playbackControllers = {}),
        (this._playbackErrorDialog = !0),
        (this._playbackMode = e.PlaybackMode.MIXED_CONTENT),
        (this._whenConfigured = void 0),
        'string' != typeof n)
      )
        throw new Error('MusicKit was initialized without an developerToken.');
      Object.assign(
        En.features,
        (function (e = []) {
          const n = {};
          return (
            e.forEach((e) => {
              '-' === e.charAt(0)
                ? ((e = e.substr(1)), (n[e] = !1))
                : (n[e] = !0);
            }),
            n
          );
        })(d.features)
      );
      const h = wa.get();
      h &&
        (We.warn('Overriding bag.features with', h),
        (En.features = Object.assign(Object.assign({}, En.features), h))),
        Object.assign(En.autoplay, d.autoplay),
        (this.context = {});
      const p = new PubSub();
      (this.capabilities = new Capabilities(p)),
        d.playbackActions && (this.playbackActions = d.playbackActions);
      const y = new TimingAccuracy(!!En.features['player-accurate-timing']),
        m = new BitrateCalculator(p, d.bitrate);
      (this._services = { dispatcher: p, timing: y, bitrateCalculator: m }),
        void 0 !== d.playActivityAPI &&
          (this._services.playActivity = new PlayActivityService(
            d.playActivityAPI,
            p
          )),
        (d.services = this._services),
        this._configureLogger(d),
        (En.app = d.app || {}),
        (En.store = new DataStore({
          filter: getFilterFromFlags(d.storeFilterTypes || []),
          shouldDisableRecordReuse:
            !!En.features['disable-data-store-record-reuse'],
        })),
        Object.assign(En.urls, d.urls || {});
      const g = (function (e, n) {
        return (kn = new Store(e, n)), kn;
      })(n, d);
      this._services.apiManager = new APIServiceManager(g, p);
      const _ = new MediaItemPlayback(this._createPlayerControllerOptions());
      (this._services.mediaItemPlayback = _),
        d.sourceType && (this.sourceType = d.sourceType),
        this._initializeInternalEventHandling(),
        d.bitrate && (this.bitrate = d.bitrate),
        d.prefix &&
          /^(?:web|preview)$/.test(d.prefix) &&
          (this.prefix = En.prefix = d.prefix),
        d.suppressErrorDialog &&
          (this._playbackErrorDialog = !d.suppressErrorDialog),
        void 0 !== d.playbackMode && (this.playbackMode = d.playbackMode),
        (this.privateEnabled = d.privateEnabled || !1),
        (this.siriInitiated = d.siriInitiated || !1),
        (this.id = generateUUID()),
        We.log('MusicKit JS Version: ' + this.version),
        We.debug('Link Parameters', d.linkParameters),
        We.log('InstanceId', this.id),
        En.app && We.debug('App', En.app);
    }
    get developerToken() {
      return kn.developerToken;
    }
    get api() {
      return this._services.apiManager.api;
    }
    get audioTracks() {
      return this._mediaItemPlayback.audioTracks;
    }
    get authorizationStatus() {
      return kn.authorizationStatus;
    }
    get bitrate() {
      return this._services.bitrateCalculator.bitrate;
    }
    set bitrate(e) {
      this._services.bitrateCalculator.bitrate = e;
    }
    get browserSupportsPictureInPicture() {
      return (function () {
        if (qe)
          return (
            M.warn(
              'dom-helpers: Browser checks are not supported in Node environments'
            ),
            !1
          );
        const e = Xe,
          n =
            e &&
            e.webkitSupportsPresentationMode &&
            'function' == typeof e.webkitSetPresentationMode,
          d = document.pictureInPictureEnabled;
        return !(!n && !d);
      })();
    }
    get browserSupportsVideoDrm() {
      return supportsDrm();
    }
    get cid() {
      return (2 === this.realm || this.sourceType !== Kt.MUSICKIT) && kn.cid;
    }
    get continuous() {
      return this._playbackController.continuous;
    }
    set continuous(e) {
      this._playbackController.continuous = e;
    }
    get autoplayEnabled() {
      return this._autoplayEnabled;
    }
    set autoplayEnabled(e) {
      0 !== this.realm && (e = !1),
        e !== this.autoplayEnabled &&
          ((this._autoplayEnabled = e),
          this._services.dispatcher.publish(
            _n.autoplayEnabledDidChange,
            this.autoplayEnabled
          ));
    }
    get currentAudioTrack() {
      return this._mediaItemPlayback.currentAudioTrack;
    }
    set currentAudioTrack(e) {
      this._mediaItemPlayback.currentAudioTrack = e;
    }
    get currentPlaybackDuration() {
      return this._mediaItemPlayback.currentPlaybackDuration;
    }
    get currentPlaybackProgress() {
      return this._mediaItemPlayback.currentPlaybackProgress;
    }
    get currentPlaybackTime() {
      return this._mediaItemPlayback.currentPlaybackTime;
    }
    get currentPlaybackTimeRemaining() {
      return this._mediaItemPlayback.currentPlaybackTimeRemaining;
    }
    get currentTextTrack() {
      return this._mediaItemPlayback.currentTextTrack;
    }
    set currentTextTrack(e) {
      this._mediaItemPlayback.currentTextTrack = e;
    }
    get isAuthorized() {
      return kn.isAuthorized;
    }
    get isPlaying() {
      return this._playbackController.isPlaying;
    }
    get isRestricted() {
      return kn.isRestricted;
    }
    get metricsClientId() {
      return kn.metricsClientId;
    }
    set metricsClientId(e) {
      kn.metricsClientId = e;
    }
    get musicUserToken() {
      return kn.musicUserToken;
    }
    set musicUserToken(e) {
      (e && kn.musicUserToken === e) || (kn.musicUserToken = e);
    }
    get nowPlayingItem() {
      return this._mediaItemPlayback.nowPlayingItem;
    }
    get nowPlayingItemIndex() {
      return this._playbackController.nowPlayingItemIndex;
    }
    get playbackMode() {
      return this._playbackMode;
    }
    set playbackMode(n) {
      if (-1 === Object.values(e.PlaybackMode).indexOf(n)) return;
      this._playbackMode = n;
      const d = n === e.PlaybackMode.PREVIEW_ONLY,
        h = this._services.mediaItemPlayback;
      h && (h.previewOnly = d);
    }
    get playbackRate() {
      return this._mediaItemPlayback.playbackRate;
    }
    set playbackRate(e) {
      this._mediaItemPlayback.playbackRate = e;
    }
    get playbackState() {
      return this._mediaItemPlayback.playbackState;
    }
    get playbackTargetAvailable() {
      return this._mediaItemPlayback.playbackTargetAvailable;
    }
    get playbackTargetIsWireless() {
      return this._mediaItemPlayback.playbackTargetIsWireless;
    }
    get previewOnly() {
      return this.playbackMode === e.PlaybackMode.PREVIEW_ONLY;
    }
    set previewOnly(n) {
      this.playbackMode = n
        ? e.PlaybackMode.PREVIEW_ONLY
        : e.PlaybackMode.MIXED_CONTENT;
    }
    get queue() {
      return this._playbackController.queue;
    }
    get queueIsEmpty() {
      return this._playbackController.queue.isEmpty;
    }
    get realm() {
      return kn.realm;
    }
    get repeatMode() {
      return this._playbackController.repeatMode;
    }
    set repeatMode(e) {
      this._playbackController.repeatMode = e;
    }
    set requestUserToken(e) {
      kn.requestUserToken = e;
    }
    get restrictedEnabled() {
      return kn.restrictedEnabled;
    }
    set restrictedEnabled(e) {
      kn.restrictedEnabled = e;
    }
    get seekSeconds() {
      return this._playbackController.seekSeconds;
    }
    get services() {
      return this._services;
    }
    set shuffle(e) {
      this._playbackController.shuffle = e;
    }
    get shuffleMode() {
      return this._playbackController.shuffleMode;
    }
    set shuffleMode(e) {
      this._playbackController.shuffleMode = e;
    }
    get storefrontCountryCode() {
      return kn.storefrontCountryCode;
    }
    get subscribeURL() {
      return kn.subscribeURL;
    }
    get subscribeFamilyURL() {
      return kn.subscribeFamilyURL;
    }
    get subscribeIndividualURL() {
      return kn.subscribeIndividualURL;
    }
    get subscribeStudentURL() {
      return kn.subscribeStudentURL;
    }
    get textTracks() {
      return this._mediaItemPlayback.textTracks;
    }
    get videoContainerElement() {
      return this.context.videoContainerElement;
    }
    set videoContainerElement(e) {
      this.context.videoContainerElement = e;
    }
    get volume() {
      return this._mediaItemPlayback.volume;
    }
    set volume(e) {
      this._mediaItemPlayback.volume = e;
    }
    get storefrontId() {
      return kn.storefrontId;
    }
    set storefrontId(e) {
      kn.storefrontId = e;
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback;
    }
    get _playbackController() {
      if (void 0 !== this._playbackControllerInternal)
        return this._playbackControllerInternal;
      We.debug('setting _playbackController');
      const e = this._getPlaybackControllerByType(jn.serial);
      return (this._playbackController = e), e;
    }
    set _playbackController(e) {
      (this._playbackControllerInternal = e),
        (this._playbackControllerInternal.autoplayEnabled =
          this._autoplayEnabled),
        this._playbackControllerInternal.activate(),
        this.capabilities.updateChecker(
          this._playbackControllerInternal.hasCapabilities
        ),
        (this.capabilities.controller = this._playbackControllerInternal);
    }
    addEventListener(e, n, d = {}) {
      adaptAddEventListener(this._services.dispatcher, e, n, d);
    }
    authorize() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this.deferPlayback(), kn.authorize();
      });
    }
    canAuthorize() {
      return supportsDrm() && !this.isAuthorized;
    }
    canUnauthorize() {
      return supportsDrm() && this.isAuthorized;
    }
    changeToMediaAtIndex(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this._isPlaybackSupported() &&
          (yield this._validateAuthorization(),
          this._signalChangeItemIntent(),
          yield this._playbackController.changeToMediaAtIndex(e));
      });
    }
    changeToMediaItem(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        We.debug('instance.changeToMediaItem', e),
          this._isPlaybackSupported() &&
            (yield this._validateAuthorization(),
            this._signalChangeItemIntent(),
            yield this._playbackController.changeToMediaItem(e));
      });
    }
    changeUserStorefront(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.storefrontId = e;
      });
    }
    cleanup() {
      var n;
      return __awaiter$1(this, void 0, void 0, function* () {
        null === (n = this._services.mediaItemPlayback) ||
          void 0 === n ||
          n.destroy(),
          this._signalIntent({
            endReasonType: e.PlayActivityEndReasonType.EXITED_APPLICATION,
          });
        const d = Object.keys(this._playbackControllers).map((e) =>
          this._playbackControllers[e].destroy()
        );
        try {
          yield Promise.all(d);
        } catch (Vt) {
          We.error('Error cleaning up controller', Vt);
        }
        this._services.dispatcher.clear();
      });
    }
    configure(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (
          (this._whenConfigured = this._configure(e)), this._whenConfigured
        );
      });
    }
    _configure(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield kn.storekit.whenAuthCompleted;
        const n = e.map(
          this._services.apiManager.registerAPIService,
          this._services.apiManager
        );
        yield Promise.all(n),
          yield this._configurePlayActivity(),
          this._initializeExternalEventPublishing();
      });
    }
    deferPlayback() {
      We.debug('deferPlayback', this._playbackControllerInternal),
        deferPlayback();
    }
    me() {
      return __awaiter$1(this, void 0, void 0, function* () {
        try {
          return yield kn.storekit.me();
        } catch (Vt) {
          return Promise.reject(
            new MKError(MKError.AUTHORIZATION_ERROR, 'Unauthorized')
          );
        }
      });
    }
    hasMusicSubscription() {
      return hasMusicSubscription(kn.storekit);
    }
    mute() {
      return this._mediaItemPlayback.mute();
    }
    pause(n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          try {
            this._signalIntent({
              endReasonType:
                e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED,
            }),
              yield this._playbackController.pause(n);
          } catch (H) {
            this._handlePlaybackError(H);
          }
          return Promise.resolve();
        }
      });
    }
    play() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if ((We.debug('instance.play()'), this._isPlaybackSupported())) {
          yield this._validateAuthorization();
          try {
            yield this._playbackController.play();
          } catch (H) {
            this._handlePlaybackError(H);
          }
          return Promise.resolve();
        }
      });
    }
    playMediaItem(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        We.debug('mk: playMediaItem', e),
          this.deferPlayback(),
          e.bingeWatching &&
            (((n = null != n ? n : {}).bingeWatching = !0),
            (e.bingeWatching = !1));
        try {
          n && this._mediaItemPlayback.playOptions.set(e.id, n);
          const d = yield this._playbackController.playSingleMediaItem(e, n);
          return this.services.dispatcher.publish(_n.capabilitiesChanged), d;
        } catch (H) {
          We.error('mk:playMediaItem error', H), this._handlePlaybackError(H);
        }
      });
    }
    removeEventListener(e, n) {
      !(function (e, n, d) {
        const h = getCallbacksForName(n);
        let p;
        for (let y = h.length - 1; y >= 0; y--) {
          const [e, n] = h[y];
          if (e === d) {
            (p = n), h.splice(y, 1);
            break;
          }
        }
        p && e.unsubscribe(n, p);
      })(this._services.dispatcher, e, n);
    }
    exitFullscreen() {
      return this._mediaItemPlayback.exitFullscreen();
    }
    requestFullscreen(e) {
      return this._mediaItemPlayback.requestFullscreen(e);
    }
    getNewSeeker() {
      return this._playbackController.getNewSeeker();
    }
    seekToTime(e, n = At.Manual) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization();
          try {
            yield this._playbackController.seekToTime(e, n);
          } catch (H) {
            this._handlePlaybackError(H);
          }
          return Promise.resolve();
        }
      });
    }
    setPresentationMode(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._mediaItemPlayback.setPresentationMode(e);
      });
    }
    skipToNextItem() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization(),
            this._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            });
          try {
            yield this._playbackController.skipToNextItem();
          } catch (H) {
            this._handlePlaybackError(H);
          }
        }
      });
    }
    skipToPreviousItem() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization(),
            this._signalIntent({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            });
          try {
            yield this._playbackController.skipToPreviousItem();
          } catch (H) {
            this._handlePlaybackError(H);
          }
        }
      });
    }
    seekForward() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization();
          try {
            this._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            }),
              yield this._playbackController.seekForward();
          } catch (H) {
            this._handlePlaybackError(H);
          }
        }
      });
    }
    seekBackward() {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          yield this._validateAuthorization();
          try {
            yield this._playbackController.seekBackward();
          } catch (H) {
            this._handlePlaybackError(H);
          }
        }
      });
    }
    showPlaybackTargetPicker() {
      this._playbackController.showPlaybackTargetPicker();
    }
    stop(e) {
      var n;
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported()) {
          this._signalIntent({
            endReasonType: null == e ? void 0 : e.endReasonType,
            userInitiated:
              null === (n = null == e ? void 0 : e.userInitiated) ||
              void 0 === n ||
              n,
          });
          try {
            yield this._playbackController.stop(e);
          } catch (H) {
            this._handlePlaybackError(H);
          }
        }
      });
    }
    unauthorize() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return kn.unauthorize();
      });
    }
    unmute() {
      return this._mediaItemPlayback.unmute();
    }
    _createPlayerControllerOptions() {
      return {
        tokens: kn,
        bag: En,
        playbackServices: {
          getRTCStreamingTracker: () => {
            var e;
            return null === (e = this._services.playActivity) || void 0 === e
              ? void 0
              : e.getTrackerByType(RTCStreamingTracker);
          },
          hasMusicSubscription: hasMusicSubscription,
          prepareForEncryptedPlayback: (e, n) =>
            (function (e, n, d) {
              return __awaiter$1(this, void 0, void 0, function* () {
                if (
                  (We.debug('prepareForEncryptedPlayback'), !hasAuthorization())
                )
                  return Promise.reject(
                    new MKError(
                      MKError.AUTHORIZATION_ERROR,
                      'Unable to prepare for playback.'
                    )
                  );
                try {
                  yield prepareToPlayMediaItem(e, n);
                } catch (H) {
                  if ([MKError.AUTHORIZATION_ERROR].includes(H.errorCode))
                    yield e.store.storekit.revokeUserToken();
                  else if (H.errorCode === MKError.TOKEN_EXPIRED)
                    try {
                      return (
                        yield e.store.storekit.renewUserToken(),
                        yield prepareToPlayMediaItem(e, n),
                        (n.playbackData = _playbackDataForItem(n, d)),
                        n
                      );
                    } catch (h) {}
                  if (H) return Promise.reject(H);
                }
                return (n.playbackData = _playbackDataForItem(n, d)), n;
              });
            })(this._services.apiManager, e, n),
          requiresHlsJs: requiresHlsJs,
        },
        services: this._services,
        context: this.context,
        autoplayEnabled: this.autoplayEnabled,
        privateEnabled: this.privateEnabled,
        siriInitiated: this.siriInitiated,
        storekit: null == kn ? void 0 : kn.storekit,
      };
    }
    _getPlaybackControllerByType(e) {
      const n = this._playbackControllers[e];
      if (n) return n;
      let d;
      switch (e) {
        case jn.serial:
          d = new SerialPlaybackController(
            this._createPlayerControllerOptions()
          );
          break;
        case jn.continuous:
          d = new ContinuousPlaybackController(
            this._createPlayerControllerOptions()
          );
          break;
        default:
          throw new MKError(
            MKError.UNSUPPORTED_ERROR,
            'Unsupported controller requested: ' + e
          );
      }
      return (this._playbackControllers[e] = d), d;
    }
    _handlePlaybackError(e) {
      if ((We.error('mediaPlaybackError', e), Ia.includes(e.name))) throw e;
      this._playbackErrorDialog && !qe && MKDialog.presentError(e);
    }
    _initializeInternalEventHandling() {
      kn.storekit.addEventListener(_n.userTokenDidChange, () => {
        this._whenConfigured &&
          this._whenConfigured
            .then(() => this._configurePlayActivity().catch())
            .catch();
      });
      const n = this._services.dispatcher;
      n.subscribe(_n.mediaPlaybackError, (e, n) =>
        this._handlePlaybackError(n)
      ),
        n.subscribe(_n.playbackStateDidChange, (n, d) => {
          d.state === e.PlaybackStates.paused &&
            (We.debug(
              'mk: playbackStateDidChange callback - calling storekit.presentSubscribeViewForEligibleUsers'
            ),
            kn.storekit.presentSubscribeViewForEligibleUsers(
              { state: d.state, item: this.nowPlayingItem },
              !1
            ));
        });
    }
    _initializeExternalEventPublishing() {
      [
        _n.authorizationStatusDidChange,
        _n.storefrontCountryCodeDidChange,
        _n.storefrontIdentifierDidChange,
        _n.userTokenDidChange,
        _n.eligibleForSubscribeView,
      ].forEach((e) => {
        kn.storekit.addEventListener(e, (n) =>
          this._services.dispatcher.publish(e, n)
        );
      });
      const e = ft[this.storefrontId.toUpperCase()],
        n = lt[e];
      this._services.dispatcher.subscribe(Ls, (e, d) => {
        d.resolveAdamIdFromStorefront(n),
          this._services.dispatcher.publish(_n.timedMetadataDidChange, d);
      });
    }
    _configureLogger(e) {
      e.debug &&
        ((We.enabled = !0), (We.level = parseInt(e.logLevel, 10) || 1));
    }
    _configurePlayActivity() {
      return __awaiter$1(this, void 0, void 0, function* () {
        void 0 !== this._services.playActivity &&
          (yield this._services.playActivity.configure(this, {
            services: this._services,
          }));
      });
    }
    _isPlaybackSupported() {
      return (
        !qe ||
        (We.warn('Media playback is not supported in Node environments.'), !1)
      );
    }
    _updatePlaybackController(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        We.debug('mk: _updatePlaybackController', e),
          this._playbackControllerInternal !== e &&
            (this._playbackControllerInternal &&
              (yield this._playbackControllerInternal.deactivate()),
            (this._playbackController = e));
      });
    }
    _signalChangeItemIntent() {
      this._signalIntent({
        endReasonType:
          e.PlayActivityEndReasonType.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
      });
    }
    _signalIntent(e) {
      this.services.dispatcher.publish(
        bt.userActivityIntent,
        Object.assign({ userInitiated: !0 }, e)
      );
    }
    _validateAuthorization(n = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        (n || this.playbackMode === e.PlaybackMode.FULL_PLAYBACK_ONLY) &&
          ((void 0 !== this._playbackControllerInternal &&
            this._playbackControllerInternal.isReady &&
            this._playbackControllerInternal.isPlaying) ||
            (yield this.authorize()));
      });
    }
  }
  function dispatchDocumentEvent(e) {
    if (qe) return;
    const n = new Event(e, { bubbles: !0, cancelable: !0 });
    setTimeout(() => document.dispatchEvent(n));
  }
  __decorate$1(
    [
      AsyncDebounce(250, { isImmediate: !0, cancelledValue: void 0 }),
      __metadata$1('design:type', Function),
      __metadata$1('design:paramtypes', [Object]),
      __metadata$1('design:returntype', Promise),
    ],
    MKInstance.prototype,
    'pause',
    null
  ),
    __decorate$1(
      [
        AsyncDebounce(250, { isImmediate: !0, cancelledValue: void 0 }),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'play',
      null
    ),
    __decorate$1(
      [
        SerialAsync('skip'),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'skipToNextItem',
      null
    ),
    __decorate$1(
      [
        SerialAsync('skip'),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'skipToPreviousItem',
      null
    ),
    __decorate$1(
      [
        SerialAsync('seek'),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'seekForward',
      null
    ),
    __decorate$1(
      [
        SerialAsync('seek'),
        __metadata$1('design:type', Function),
        __metadata$1('design:paramtypes', []),
        __metadata$1('design:returntype', Promise),
      ],
      MKInstance.prototype,
      'seekBackward',
      null
    );
  const Ra = 'undefined' != typeof window && 'undefined' != typeof document;
  let Oa = !1;
  const Ca = [];
  function configure$2(e, n = MKInstance, d) {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (!e)
        throw new MKError(MKError.INVALID_ARGUMENTS, 'configuration required');
      const h = {},
        { developerToken: p, mergeQueryParams: y } = e;
      if (!p)
        throw new MKError(
          MKError.CONFIGURATION_ERROR,
          'Missing developer token'
        );
      y &&
        Ra &&
        window.location &&
        (h.linkParameters = Object.assign(
          Object.assign({}, e.linkParameters || {}),
          parseQueryParams(window.location.href)
        )),
        yield findKeySystemPreference();
      const m = new n(p, Object.assign(Object.assign({}, e), h));
      return (
        Oa ||
          (yield (function () {
            return __awaiter$1(this, void 0, void 0, function* () {
              const e = Ca.map((e) => e.cleanup());
              yield Promise.all(e), Ca.splice(0, Ca.length);
            });
          })()),
        d && (yield d(m)),
        Ca.push(m),
        dispatchDocumentEvent(_n.configured),
        m
      );
    });
  }
  function getInstances() {
    return Ca;
  }
  function transformStoreData(e) {
    const n = Object.assign({}, e),
      { href: d } = n;
    return (
      void 0 !== d &&
        (delete n.href,
        (n.attributes = Object.assign(Object.assign({}, n.attributes), {
          href: d,
        }))),
      n
    );
  }
  Ra &&
    (asAsync(
      (function () {
        var e;
        return __awaiter$1(this, void 0, void 0, function* () {
          if (qe) return;
          const n = findScript('musickit.js');
          if (
            '' !==
            (null === (e = null == n ? void 0 : n.dataset) || void 0 === e
              ? void 0
              : e.webComponents)
          )
            return;
          const d = 'noModule' in n,
            h = `components/musickit-components/musickit-components${
              d ? '.esm' : ''
            }.js`,
            p = 'https:' + cdnBaseURL(h) + h,
            y = {};
          d && (y.type = 'module'),
            n.hasAttribute('async') && (y.async = ''),
            n.hasAttribute('defer') && (y.defer = ''),
            yield loadScript(p, y),
            dispatchDocumentEvent(_n.webComponentsLoaded);
        });
      })()
    ),
    dispatchDocumentEvent(_n.loaded));
  const Ma = ['extend', 'include', 'l', 'platform', 'views'];
  class LocalDataStore {
    constructor(e = {}) {
      this.enableDataStore = !1;
      let n = !1;
      e.features &&
        hasOwn(e.features, 'api-data-store') &&
        (this.enableDataStore = !!e.features['api-data-store']),
        e.features &&
          hasOwn(e.features, 'disable-data-store-record-reuse') &&
          (n = !!e.features['disable-data-store-record-reuse']),
        this.enableDataStore &&
          ((this._store =
            e.store || new DataStore({ shouldDisableRecordReuse: n })),
          (this._store.mapping = transformStoreData));
    }
    get hasDataStore() {
      return this.enableDataStore && void 0 !== this._store;
    }
    delete(e, n) {
      this.hasDataStore && this._store.remove(e, n);
    }
    read(e, n, d, h) {
      h || 'function' != typeof d || ((h = d), (d = void 0));
      const p = {};
      let y = !1;
      if (
        (d &&
          ((y = Object.keys(d).some((e) => /^(fields|extend)/.test(e))),
          d.views && (p.views = d.views),
          d.include && (p.relationships = d.include)),
        this.hasDataStore && !y)
      ) {
        let h,
          y = [];
        if (
          (d &&
            (y = Object.keys(d).reduce(
              (e, n) => (-1 === Ma.indexOf(n) && e.push([n, d[n]]), e),
              y
            )),
          (h =
            y && 1 === y.length
              ? this._store.query(y[0][0], y[0][1])
              : this._store.peek(e, n, p)),
          Array.isArray(h))
        ) {
          if (!d && h.length) return h;
        } else if (h) return h;
      }
      if ('function' == typeof h) return h();
    }
    write(e) {
      return this._prepareDataForDataStore(e, (e) => this._store.save(e));
    }
    parse(e) {
      return this._prepareDataForDataStore(e, (e) =>
        this._store.populateDataRecords(e, {})
      );
    }
    _prepareDataForDataStore(e, n) {
      return this.hasDataStore
        ? Array.isArray(e)
          ? n({ data: e })
          : Object.keys(e).reduce((d, h) => {
              const p = e[h];
              return (
                hasOwn(p, 'data') && (d[h] = n({ data: p.data })),
                'meta' === h && (d[h] = e[h]),
                d
              );
            }, {})
        : e;
    }
  }
  var Da, La;
  !(function (e) {
    (e[(e.Global = 0)] = 'Global'),
      (e.Catalog = 'catalog'),
      (e.Personalized = 'me'),
      (e.Editorial = 'editorial'),
      (e.Engagement = 'engagement'),
      (e.Social = 'social');
  })(Da || (Da = {})),
    (function (e) {
      (e.songs = 'songs'),
        (e.albums = 'albums'),
        (e.playlists = 'playlists'),
        (e.stations = 'stations'),
        (e['music-videos'] = 'music-videos'),
        (e['library-music-videos'] = 'library-music-videos'),
        (e['library-playlists'] = 'library-playlists'),
        (e['library-songs'] = 'library-songs');
    })(La || (La = {}));
  class API extends class extends class {
    constructor(e, n) {
      var d;
      if (
        ((this.prefix = 'ï£¿'),
        (this.method = 'GET'),
        (this.url = e),
        (n = n || {}).storage && n.underlyingStorage)
      )
        throw new Error(
          'only pass storage OR underlyingStorage in sessionOptions to URLSession'
        );
      const h = n.underlyingStorage || {};
      if (
        ((this.storage = n.storage || new GenericStorage(h)),
        (this.networkCache = new NetworkCache({
          storage: this.storage,
          prefix: this.prefix,
          cacheKeyFunction: this._key.bind(this),
        })),
        (this.ttl = n.ttl || 3e5),
        (this._fetchOptions = Object.assign({}, n.fetchOptions)),
        'function' != typeof n.fetch && 'function' != typeof fetch)
      )
        throw new Error('window.fetch is not defined');
      (this._fetchFunction =
        null !== (d = n.fetch) && void 0 !== d ? d : fetch.bind(window)),
        (this.headers = this._fetchOptions.headers || new Headers()),
        delete this._fetchOptions.headers;
    }
    clearCacheForRequest(e, n) {
      'object' == typeof e && ((n = e), (e = void 0));
      const d = this.constructURL(e, n);
      this.networkCache.removeItemsMatching(d);
    }
    request(e, n, d) {
      var h;
      return __awaiter(this, void 0, void 0, function* () {
        d || 'object' != typeof e || ((d = n || {}), (n = e), (e = void 0));
        let p = {};
        'object' ==
        typeof (d = Object.assign(
          Object.assign(
            { method: this.method, headers: this.headers, reload: !1 },
            this._fetchOptions
          ),
          d
        )).queryParameters
          ? ((p = d.queryParameters), delete d.queryParameters)
          : ('GET' !== d.method && 'DELETE' !== d.method) || (p = n);
        const y = this.constructURL(e, p),
          { method: m, reload: g = !1, useRawResponse: _ } = d;
        if (
          ((d.headers = this.buildHeaders(d)),
          delete d.reload,
          delete d.useRawResponse,
          'GET' === m && !g)
        ) {
          const e = this.getCacheItem(y);
          if (e) return Promise.resolve(e);
        }
        n &&
          Object.keys(n).length &&
          ('POST' === m || 'PUT' === m) &&
          ((d.body = d.body || n),
          d.contentType === qt.FORM
            ? ((d.body = urlEncodeParameters(d.body)),
              d.headers.set('Content-Type', qt.FORM))
            : ((d.body = JSON.stringify(d.body)),
              d.headers.set('Content-Type', qt.JSON)));
        const b = yield this._fetchFunction(y, d);
        if (!b.ok) return Promise.reject(b);
        let T;
        try {
          T = yield b.json();
        } catch (S) {
          T = {};
        }
        if (T.errors) return Promise.reject(T.errors);
        const E = _ ? T : T.results || T.data || T;
        if ('GET' === m) {
          const e =
            null !== (h = getMaxAgeFromHeaders(b.headers)) && void 0 !== h
              ? h
              : this.ttl;
          this.setCacheItem(y, E, e);
        }
        return E;
      });
    }
    buildHeaders({ headers: e, reload: n = !1 } = {}) {
      void 0 === e && (e = this.headers);
      const d = ((e) => new e.constructor(e))(e);
      return n && d.set('Cache-Control', 'no-cache'), d;
    }
    constructURL(e, n) {
      return (
        (d = this.url), (h = n), addQueryParamsToURL(addPathToURL(d, e), h)
      );
      var d, h;
    }
    getCacheItem(e) {
      const n = this.networkCache.storage,
        d = `${this.prefix}${this.prefix}cache-mut`,
        h = n.getItem(d) || null,
        p =
          this.headers.get('Music-User-Token') ||
          this.headers.get('Media-User-Token') ||
          null;
      return (
        p !== h &&
          (this.networkCache.clear(),
          null === p ? n.removeItem(d) : n.setItem(d, p)),
        this.networkCache.getItem(e)
      );
    }
    setCacheItem(e, n, d = this.ttl) {
      this.networkCache.setItem(e, n, d);
    }
    clearNetworkCache() {
      this.networkCache.clear();
    }
    _key(e, n) {
      const d = (function (e) {
        try {
          const [n, d] = e.split('?', 2);
          if (void 0 === d) return n;
          const h = d.split('&').map((e) => e.split('=', 2)),
            p = [...Array(h.length).keys()];
          p.sort((e, n) => {
            const d = h[e],
              p = h[n];
            return d < p ? -1 : d > p ? 1 : e - n;
          });
          const y = p.map((e) => h[e]);
          return `${n}?${y
            .map(([e, n]) => (void 0 !== n ? `${e}=${n}` : e))
            .join('&')}`;
        } catch (n) {
          return e;
        }
      })(e)
        .toLowerCase()
        .replace(this.url, '');
      return `${this.prefix}${d.replace(/[^-_0-9a-z]{1,}/g, '.')}`;
    }
  } {
    constructor(e, n, d) {
      super(e, d),
        (this._developerToken = new DeveloperToken(n)),
        this.headers.set('Authorization', 'Bearer ' + this.developerToken),
        (d = d || {}),
        (this.userToken = d.userToken),
        this.userToken && this.headers.set('Media-User-Token', this.userToken);
    }
    get developerToken() {
      return this._developerToken.token;
    }
  } {
    constructor(e, n, d, h, p, y, m = {}, g) {
      super(
        e,
        n,
        Object.assign(Object.assign({}, g), { userToken: h, storage: y })
      ),
        (this.storefrontId = yn.ID),
        (this.resourceRelatives = {
          artists: {
            albums: { include: 'tracks' },
            playlists: { include: 'tracks' },
            songs: null,
          },
        }),
        (this.defaultIncludePaginationMetadata =
          m.features && hasOwn(m.features, 'api-pagination-metadata')),
        (this._store = new LocalDataStore(m)),
        d && (this.storefrontId = d.toLowerCase()),
        h && p && (this.userStorefrontId = p.toLowerCase()),
        (this.v3 = new MediaAPIV3({
          developerToken: n,
          mediaUserToken: h,
          storefrontId: d,
          realmConfig: { music: { url: e.replace(/\/v[0-9]+(\/)?$/, '') } },
        }));
    }
    get needsEquivalents() {
      const { userStorefrontId: e } = this;
      return void 0 !== e && '' !== e && e !== this.storefrontId;
    }
  }
  let Na;
  const configure$1 = (e, n = !1) =>
      __awaiter$1(void 0, void 0, void 0, function* () {
        if (Na && !n) {
          if (void 0 === e.storefrontId || e.storefrontId === Na.storefrontId)
            return Na;
          Na.clear();
        }
        return (Na = new MediaAPIService(e.dispatcher)), Na.configure(e);
      }),
    xa = {
      album: {
        isPlural: !1,
        apiMethod: 'album',
        relationshipMethod: {
          method: 'albumRelationship',
          relationship: 'tracks',
        },
      },
      albums: { isPlural: !0, apiMethod: 'albums' },
      musicVideo: { isPlural: !1, apiMethod: 'musicVideo' },
      musicVideos: { isPlural: !0, apiMethod: 'musicVideos' },
      musicMovie: { isPlural: !1, apiMethod: 'musicMovie' },
      musicMovies: { isPlural: !0, apiMethod: 'musicMovies' },
      playlist: {
        isPlural: !1,
        apiMethod: 'playlist',
        relationshipMethod: {
          method: 'playlistRelationship',
          relationship: 'tracks',
        },
      },
      playlists: { isPlural: !0, apiMethod: 'playlists' },
      song: { isPlural: !1, apiMethod: 'song' },
      songs: { isPlural: !0, apiMethod: 'songs' },
    };
  class MediaAPIService {
    constructor(e) {
      if (((this._dispatcher = e), !En.urls.mediaApi))
        throw new Error('bag.urls.mediaApi is not configured');
      (this.url = En.urls.mediaApi),
        (this.namedQueueOptions = xa),
        this._dispatcher.subscribe(
          bt.apiStorefrontChanged,
          (e, { storefrontId: n }) =>
            __awaiter$1(this, void 0, void 0, function* () {
              yield this._updateStorefrontId(n);
            })
        );
    }
    get api() {
      if (void 0 === this._api)
        throw new MKError(
          MKError.CONFIGURATION_ERROR,
          'The API cannot be accessed before it is configured.'
        );
      return this._api;
    }
    get storefrontId() {
      return this.store && this.store.storefrontId;
    }
    configure(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (void 0 !== e.store)
          return (
            (this.store = e.store),
            [
              _n.authorizationStatusDidChange,
              _n.userTokenDidChange,
              _n.storefrontIdentifierDidChange,
              _n.storefrontCountryCodeDidChange,
            ].forEach((e) => {
              this.store.storekit.addEventListener(e, () => this.resetAPI());
            }),
            this._initializeAPI(e),
            this
          );
      });
    }
    clear() {
      this.api && this.api.clearNetworkCache && this.api.clearNetworkCache();
    }
    getAPIForItem(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return b(e)
          ? (yield this.store.authorize(), this.api.library || this.api)
          : this.api;
      });
    }
    resetAPI() {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.clear(), this._initializeAPI();
      });
    }
    _initializeAPI(e) {
      if (void 0 !== (null == e ? void 0 : e.api))
        return void (this._api = e.api);
      const n = (e && e.store) || this.store;
      if (void 0 === n) return;
      const d = En.features['api-session-storage']
          ? getSessionStorage()
          : void 0,
        h = (e && e.storefrontId) || n.storefrontId,
        p = new API(
          this.url,
          n.developerToken,
          h,
          n.storekit.userToken,
          n.storekit.storefrontCountryCode,
          d,
          En,
          e && e.apiOptions && e.apiOptions.sessionOptions
        );
      this._api = p.v3;
    }
    _updateStorefrontId(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        (this.api && e === this.api.storefrontId) ||
          (yield this.configure({
            dispatcher: this._dispatcher,
            store: this.store,
            storefrontId: e,
          }));
      });
    }
  }
  const Ua = [
      'uploadedVideo',
      'uploadedAudio',
      'uploaded-videos',
      'uploaded-audios',
    ],
    asCode = (n) => {
      switch (typeof n) {
        case 'string':
          return n;
        case 'undefined':
          return 'undefined';
        default:
          return 'PlayActivityEndReasonType.' + e.PlayActivityEndReasonType[n];
      }
    };
  class PAFTrackerAPI {
    constructor() {
      this.musicLiveVideoStartTime = 0;
    }
    get activityTracker() {
      if (void 0 === this._activityTracker)
        throw new MKError(
          MKError.CONFIGURATION_ERROR,
          'Play Activity service was called before configuration.'
        );
      return this._activityTracker;
    }
    configure(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (
          (this.instance = e),
          (this._activityTracker = (function (e) {
            var n;
            return new PlayActivity(
              e.developerToken,
              e.musicUserToken,
              e.storefrontCountryCode,
              {
                app: {
                  build: En.app.build,
                  name: null !== (n = En.app.name) && void 0 !== n ? n : '',
                  version: En.app.version,
                },
                fetch: !qe && fetch.bind(globalThis),
                isQA: Ba.enabled,
                logInfo: We.enabled,
                sourceType: e.sourceType,
                userIsSubscribed: () =>
                  !(
                    !e.isAuthorized ||
                    !kn.storekit._getIsActiveSubscription.getCachedValue()
                  ),
              }
            );
          })(e)),
          this
        );
      });
    }
    cleanup() {}
    shouldConfigure(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return void 0 !== e.musicUserToken;
      });
    }
    activate(e = {}) {
      return this.activityTracker.activate(e.flush);
    }
    exit(e = {}) {
      return (
        We.debug('PAF debug', `client.exit(${e.position})`),
        this.activityTracker.exit(e.position)
      );
    }
    pause(e, n = {}) {
      return 'number' == typeof n.endReasonType
        ? (We.debug(
            'PAF debug',
            `client.stop(${n.position}, ${n.endReasonType})`
          ),
          this.activityTracker.stop(n.position, n.endReasonType))
        : (We.debug('PAF debug', `client.pause(${n.position})`),
          this.activityTracker.pause(n.position));
    }
    play(e, n = {}) {
      const d = generateItemDescriptorForPAF(bt.playbackPlay, this.instance, e);
      return (
        isLiveRadioKind(e, 'video') &&
          (this.musicLiveVideoStartTime = Date.now()),
        We.debug(
          'PAF debug',
          `client.play(${JSON.stringify(d)}, ${n.position})`
        ),
        this.activityTracker.play(d, n.position)
      );
    }
    scrub(e, n = {}) {
      return (
        We.debug(
          'PAF debug',
          `client.scrub(${n.position}, ${asCode(n.endReasonType)})`
        ),
        this.activityTracker.scrub(n.position, n.endReasonType)
      );
    }
    seek(n, d = {}) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.scrub(n, {
          position: d.startPosition,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_BEGIN,
        }),
          yield this.scrub(n, {
            position: d.position,
            endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
          });
      });
    }
    skip(e, n = {}) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = generateItemDescriptorForPAF(
          bt.playbackSkip,
          this.instance,
          e
        );
        We.debug(
          'PAF debug',
          `client.skip(${JSON.stringify(d)}, ${asCode(n.direction)}, ${
            n.position
          })`
        );
        try {
          yield this.activityTracker.skip(d, n.direction, n.position);
        } catch (Vt) {
          if (
            'A play stop() method was called without a previous play() descriptor' !==
            Vt.message
          )
            return Promise.reject(Vt);
          yield this.play(e, n);
        }
      });
    }
    stop(n, d = {}) {
      var h;
      return (
        isLiveRadioKind(n, 'video')
          ? ((d.position = (Date.now() - this.musicLiveVideoStartTime) / 1e3),
            (this.musicLiveVideoStartTime = 0))
          : (null == n ? void 0 : n.isLiveRadioStation) &&
            d.position &&
            (d.position = d.position - (d.startPosition || 0)),
        (null == n ? void 0 : n.isLiveRadioStation) &&
          (d.endReasonType =
            null !== (h = d.endReasonType) && void 0 !== h
              ? h
              : e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED),
        We.debug(
          'PAF debug',
          `client.stop(${d.position}, ${asCode(d.endReasonType)})`
        ),
        this.activityTracker.stop(d.position, d.endReasonType)
      );
    }
    lyricsPlay(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    lyricsStop(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    shouldTrackPlayActivity(n, d) {
      const h = hasAuthorization(),
        p = !d || d.playbackType !== e.PlaybackType.preview,
        y = this.alwaysSendForActivityType(n),
        m = !d || (d && this.mediaRequiresPlayActivity(d));
      return !(!h || !p || (!y && !m));
    }
    alwaysSendForActivityType(e) {
      return e === bt.playerActivate || e === bt.playerExit;
    }
    mediaRequiresPlayActivity(e) {
      return (
        (void 0 !== (n = e.type) && Ua.includes(n)) ||
        -1 !== ['musicVideo', 'song', 'radioStation'].indexOf(e.type)
      );
      var n;
    }
  }
  function generateItemDescriptorForPAF(n, d, h) {
    const p = Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                {},
                (function (n, d, h) {
                  if (
                    void 0 === (null == h ? void 0 : h.playbackActions) ||
                    void 0 === d
                  )
                    return {};
                  const p = {
                      [e.PlayerRepeatMode.all]: Mt.REPEAT_ALL,
                      [e.PlayerRepeatMode.none]: Mt.REPEAT_OFF,
                      [e.PlayerRepeatMode.one]: Mt.REPEAT_ONE,
                    },
                    y = {
                      [e.PlayerShuffleMode.off]: Dt.SHUFFLE_OFF,
                      [e.PlayerShuffleMode.songs]: Dt.SHUFFLE_ON,
                    };
                  return {
                    playMode() {
                      let n = Mt.REPEAT_UNKNOWN,
                        d = Dt.SHUFFLE_UNKNOWN,
                        m = Lt.AUTO_UNKNOWN;
                      const { playbackActions: g } = h;
                      var _;
                      return (
                        g &&
                          (g.includes(e.PlaybackActions.REPEAT) &&
                            (n = p[h.repeatMode]),
                          g.includes(e.PlaybackActions.SHUFFLE) &&
                            (d = y[h.shuffleMode]),
                          g.includes(e.PlaybackActions.AUTOPLAY) &&
                            (m = h.autoplayEnabled
                              ? (_ = h.queue).hasAutoplayStation &&
                                _.items.some((e) => {
                                  const { id: n, type: d, container: h } = e;
                                  if (
                                    h &&
                                    'stations' === h.type &&
                                    h.name === kt.RADIO
                                  )
                                    return !1;
                                  const p = normalizeTypeForAutoplay(n, d);
                                  return isAutoplaySupportedForType(p);
                                })
                                ? Lt.AUTO_ON
                                : Lt.AUTO_ON_CONTENT_UNSUPPORTED
                              : Lt.AUTO_OFF)),
                        {
                          repeatPlayMode: n,
                          shufflePlayMode: d,
                          autoplayMode: m,
                        }
                      );
                    },
                  };
                })(0, h, d)
              ),
              (function (e, n) {
                var d;
                if (!typeRequiresItem(e)) return {};
                if (void 0 === n) return {};
                const h =
                  null === (d = n.attributes) || void 0 === d
                    ? void 0
                    : d.mediaKind;
                return Object.assign(
                  Object.assign({}, void 0 !== h ? { mediaType: h } : {}),
                  n.playParams
                );
              })(n, h)
            ),
            (function (e, n) {
              if (!typeRequiresItem(e) || void 0 === n) return {};
              const { context: d = {} } = n;
              return { recoData: d.reco_id };
            })(n, h)
          ),
          (function (e, n) {
            if (!typeRequiresItem(e) || void 0 === n) return {};
            const d = n.playbackDuration;
            if (!d) return {};
            return { duration: d / 1e3 };
          })(n, h)
        ),
        (function (e, n) {
          var d, h;
          const p = (function (e, n) {
              var d;
              if (itemIsRequired(e, n))
                return (
                  (null === (d = null == n ? void 0 : n.container) ||
                  void 0 === d
                    ? void 0
                    : d.name) || null
                );
              return null;
            })(e, n),
            y = itemIsRequired(e, n)
              ? Object.assign(
                  Object.assign({}, null == n ? void 0 : n.container),
                  null ===
                    (h =
                      null === (d = null == n ? void 0 : n.container) ||
                      void 0 === d
                        ? void 0
                        : d.attributes) || void 0 === h
                    ? void 0
                    : h.playParams
                )
              : null;
          if (null === p && null === y) return;
          return {
            container: cleanContainer(
              Object.assign(Object.assign({}, y), null !== p ? { name: p } : {})
            ),
          };
        })(n, h)
      ),
      { trackInfo: null == h ? void 0 : h.trackInfo }
    );
    return We.trace('PAF descriptor', p), p;
  }
  const Ba = BooleanDevFlag.register('mk-use-paf-qa-endpoint');
  const typeRequiresItem = (e) =>
      [bt.playbackPlay, bt.playbackSkip].includes(e),
    itemIsRequired = (e, n) => void 0 !== n && typeRequiresItem(e);
  function cleanContainer(e) {
    const n = Object.assign({}, e);
    return delete n.attributes, n;
  }
  class LyricsTrackerAPI {
    get activityTracker() {
      if (void 0 === this.instance)
        throw new MKError(
          MKError.CONFIGURATION_ERROR,
          'Lyrics Play Activity service was called before configuration.'
        );
      var e, n;
      return (
        void 0 === this._activityTracker &&
          (this._activityTracker =
            ((e = this.instance),
            new LyricsPlayActivity(
              e.developerToken,
              e.musicUserToken,
              e.storefrontCountryCode,
              {
                app: {
                  build: En.app.build,
                  name: null !== (n = En.app.name) && void 0 !== n ? n : '',
                  version: En.app.version,
                },
                fetch: !qe && fetch.bind(globalThis),
                logInfo: We.enabled,
                sourceType: e.sourceType,
                isQA: Fa.enabled,
                userIsSubscribed: () =>
                  e.isAuthorized &&
                  kn.storekit._getIsActiveSubscription.getCachedValue(),
              }
            ))),
        this._activityTracker
      );
    }
    static configure(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return new this().configure(e, n);
      });
    }
    configure(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (this.instance = e), this;
      });
    }
    shouldTrackPlayActivity(e) {
      return e === bt.lyricsPlay || e === bt.lyricsStop;
    }
    shouldConfigure(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return void 0 !== e.musicUserToken;
      });
    }
    lyricsPlay(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        const d = null == n ? void 0 : n.lyrics;
        if (void 0 === d)
          throw new MKError(
            MKError.MEDIA_DESCRIPTOR,
            'Key lyrics is missing from descriptor provided to lyricsPlay'
          );
        const h = (function (e, n, d) {
          var h, p, y, m;
          return {
            id: n.id,
            duration: 0,
            lyricDescriptor: {
              id: n.id,
              catalogId:
                null !==
                  (m =
                    null !== (h = d.catalogId) && void 0 !== h
                      ? h
                      : null ===
                          (y =
                            null === (p = n.attributes) || void 0 === p
                              ? void 0
                              : p.playParams) || void 0 === y
                      ? void 0
                      : y.catalogId) && void 0 !== m
                  ? m
                  : n.id,
              displayType: d.displayType,
            },
          };
        })(bt.lyricsPlay, e, {
          catalogId: d.catalogId,
          displayType: d.displayType,
        });
        this.activityTracker.play(h);
      });
    }
    lyricsStop(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.activityTracker.stop();
      });
    }
    exit(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        this.activityTracker.exit();
      });
    }
    cleanup() {}
    activate(e) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    pause(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    play(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    scrub(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    seek(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    skip(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
    stop(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {});
    }
  }
  const Fa = BooleanDevFlag.register('mk-use-paf-qa-endpoint');
  function filterLinks(e) {
    return __awaiter(this, void 0, void 0, function* () {
      const n = yield (function () {
          return __awaiter(this, void 0, void 0, function* () {
            const e = [
              {
                feature: 'album-song',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/albums?/(?:[^/]+/)?(?<album>\\d+)$',
                requiredQueryParams: { i: '(?<identifier>\\d+)' },
                mediaAPI: { resources: ['songs'] },
              },
              {
                feature: 'albums',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/albums?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: { resources: ['albums'] },
              },
              {
                feature: 'algo-stations',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/stations?/(?:[^/]+/)?(?<identifier>(?:ra|st).\\d+)',
                mediaAPI: { resources: ['stations'] },
              },
              {
                feature: 'artist-default-playable-content',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/artists?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: {
                  resources: ['artists', 'default-playable-content'],
                },
              },
              {
                feature: 'genre-stations',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/genre-stations?',
                mediaAPI: {
                  resources: ['stations'],
                  parameterMapping: {
                    genres: 'filter[genres]',
                    eras: 'filter[eras]',
                    tags: 'filter[tags]',
                    moods: 'filter[moods]',
                  },
                },
              },
              {
                feature: 'library-albums',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/library/albums?/(?:[^/]+/)?(?<identifier>(?:l).[a-zA-Z0-9-]+)$',
                mediaAPI: { resources: ['albums'] },
              },
              {
                feature: 'library-album-song',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/library/albums?/(?:[^/]+/)?(?<album>(?:l).[a-zA-Z0-9-]+)$',
                requiredQueryParams: { i: '(?<identifier>i\\.[a-zA-Z0-9-]+)' },
                mediaAPI: { resources: ['songs'] },
              },
              {
                feature: 'library-playlists',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/library/playlists?/(?:[^/]+/)?(?<identifier>(?:p).[a-zA-Z0-9-]+)$',
                mediaAPI: { resources: ['playlists'] },
              },
              {
                feature: 'music-videos',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/music-videos?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: { resources: ['musicVideos'] },
              },
              {
                feature: 'personal-general-radio',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/stations?/me$',
                mediaAPI: {
                  resources: ['stations'],
                  parameters: { 'filter[identity]': 'personal' },
                },
              },
              {
                feature: 'personal-mixes',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/(?:personal-)?mix/(?:[^/]+/)?(?<identifier>mx.(?:\\d{1,2}|rp-\\d{4}))$',
                mediaAPI: { resources: ['playlists'] },
              },
              {
                feature: 'playlists',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/playlists?/(?:[^/]+/)?(?<identifier>(?:pl).[a-zA-Z0-9-]+)$',
                mediaAPI: { resources: ['playlists'] },
              },
              {
                feature: 'song',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/(?<storefront>\\w{2})/songs?/(?:[^/]+/)?(?<identifier>\\d+)$',
                mediaAPI: { resources: ['songs'] },
              },
              {
                feature: 'steering-request',
                regex:
                  'http(?:s)?://(?<realm>itunes|music).apple.com/me/stations?/change-station/?$',
                mediaAPI: { resources: ['stations'] },
              },
            ].map(
              (e) => (
                (e.regex = new RegExp(e.regex)),
                e.requiredQueryParams &&
                  (e.requiredQueryParams = Object.keys(
                    e.requiredQueryParams
                  ).reduce(
                    (n, d) => (
                      (n[d] = new RegExp(e.requiredQueryParams[d])), n
                    ),
                    {}
                  )),
                e
              )
            );
            return Promise.resolve(e);
          });
        })(),
        d = parseQueryParams(e);
      return n.reduce((n, h) => {
        if (
          (function (e, n, d = {}) {
            const [h] = e.split(/\?|\#|\&/),
              p = n.regex.test(h);
            return p && n.requiredQueryParams
              ? Object.keys(n.requiredQueryParams).every((e) => {
                  const h = d[e];
                  return n.requiredQueryParams[e].test(h);
                })
              : p;
          })(e, h, d)
        ) {
          if (n.length > 0)
            if (h.requiredQueryParams)
              n = n.filter((e) => e.requiredQueryParams);
            else if (n.some((e) => e.requiredQueryParams)) return n;
          h.requiredQueryParams
            ? (h.mediaAPI.parameters = Object.keys(
                h.requiredQueryParams
              ).reduce((e, n) => ((e[n] = d[n]), e), {}))
            : h.mediaAPI.parameterMapping &&
              (h.mediaAPI.parameters = transform$8(
                h.mediaAPI.parameterMapping,
                d,
                !0
              )),
            n.push(h);
        }
        return n;
      }, []);
    });
  }
  const Ka =
      /^http(?:s)?\:\/\/(?:itunes|(embed\.)?(music|podcasts|tv))\.apple\.com/i,
    ja = [
      'allow-forms',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-storage-access-by-user-activation',
      'allow-top-navigation-by-user-activation',
    ],
    $a = ['autoplay *', 'encrypted-media *', 'fullscreen *', 'clipboard-write'],
    Va = StringDevFlag.register('mk-generate-swizzle');
  const Ha = MKError.errors;
  class MusicKitInstance extends MKInstance {
    addToLibrary(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        yield this.authorize(),
          n || (n = /[a-z]{2}\.[a-z0-9\-]+/i.test(e) ? 'playlists' : 'albums');
        let d;
        return (
          this.api.music &&
            (d = this.api.music(
              '/v1/me/library',
              { [`ids[${n}]`]: e },
              { fetchOptions: { method: 'POST' } }
            )),
          d
        );
      });
    }
    changeToMediaItem(e) {
      const n = Object.create(null, {
        changeToMediaItem: { get: () => super.changeToMediaItem },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), n.changeToMediaItem.call(this, e);
      });
    }
    play() {
      const e = Object.create(null, { play: { get: () => super.play } });
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), e.play.call(this);
      });
    }
    playMediaItem(e, n) {
      const d = Object.create(null, {
        playMediaItem: { get: () => super.playMediaItem },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        return this._checkNeedsEquivalent(), d.playMediaItem.call(this, e, n);
      });
    }
    _isStationQueueOptions(e) {
      return !(
        !((e) =>
          !!e &&
          (!!isIdentityQueue(e) ||
            !!isQueueURLOption(e) ||
            Object.keys(zn).some((n) => void 0 !== e[n])))(
          (e = parseQueueURLOption(e))
        ) ||
        ((e) => {
          if (!e) return !1;
          if (isQueueURLOption(e)) return !0;
          if (isQueueItems(e)) return !0;
          return Object.keys(Xn)
            .concat(Object.keys(Zn))
            .some((n) => void 0 !== e[n]);
        })(e)
      );
    }
    setStationQueue(e) {
      const n = Object.create(null, {
        _validateAuthorization: { get: () => super._validateAuthorization },
      });
      return __awaiter$1(this, void 0, void 0, function* () {
        if (!this._isPlaybackSupported()) return;
        this._signalChangeItemIntent(),
          this.deferPlayback(),
          yield this._updatePlaybackController(
            this._getPlaybackControllerByType(jn.continuous)
          ),
          yield n._validateAuthorization.call(this, !0),
          (e = parseQueueURLOption(e));
        const d = this._playbackController.setQueue(e);
        return (
          void 0 !== e.autoplay &&
            (deprecationWarning('autoplay', {
              message: 'autoplay has been deprecated, use startPlaying instead',
            }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield this.play()),
          d
        );
      });
    }
    setQueue(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (
          (We.debug('instance.setQueue()', e),
          this._checkNeedsEquivalent(),
          !this._isPlaybackSupported())
        )
          return void We.warn('Playback is not supported');
        if (this._isStationQueueOptions(e))
          return (
            We.warn(
              'setQueue options contained a station queue request. Changing to setStationQueue mode.'
            ),
            this.setStationQueue(e)
          );
        this._signalChangeItemIntent(),
          this.deferPlayback(),
          yield this._updatePlaybackController(
            this._getPlaybackControllerByType(jn.serial)
          );
        const n = yield this._playbackController.setQueue(e);
        return (
          void 0 !== e.repeatMode &&
            (this._playbackController.repeatMode = e.repeatMode),
          void 0 !== e.autoplay &&
            (deprecationWarning('autoplay', {
              message: 'autoplay has been deprecated, use startPlaying instead',
            }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield this.play()),
          n
        );
      });
    }
    _checkNeedsEquivalent() {
      var e;
      if (
        0 === this.realm &&
        !this.previewOnly &&
        (null === (e = this.api) || void 0 === e ? void 0 : e.needsEquivalents)
      )
        throw new MKError(MKError.CONTENT_EQUIVALENT);
    }
    playNext(e, n = !1) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported())
          return this._playbackController.queue
            ? (this.deferPlayback(), this._playbackController.prepend(e, n))
            : this.setQueue(e);
      });
    }
    playLater(e) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported())
          return this._playbackController.queue
            ? (this.deferPlayback(), this._playbackController.append(e))
            : this.setQueue(e);
      });
    }
    playAt(e, n) {
      return __awaiter$1(this, void 0, void 0, function* () {
        if (this._isPlaybackSupported())
          return this._playbackController.queue
            ? (this.deferPlayback(), this._playbackController.insertAt(e, n))
            : this.setQueue(n);
      });
    }
    clearQueue() {
      return __awaiter$1(this, void 0, void 0, function* () {
        return (
          this._mediaItemPlayback.clearNextManifest(),
          this._playbackController.clear()
        );
      });
    }
  }
  function configure(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      e.playActivityAPI = [new PAFTrackerAPI(), new LyricsTrackerAPI()];
      return yield configure$2(e, MusicKitInstance, (n) =>
        __awaiter$1(this, void 0, void 0, function* () {
          const d = {
            apiType: ea.MEDIA_API,
            configureFn: configure$1,
            options: {},
          };
          yield n.configure([d]),
            e.declarativeMarkup &&
              'undefined' != typeof console &&
              console.warn &&
              console.warn(
                'The declarativeMarkup configuration option has been removed in MusicKit JS V3'
              );
        })
      );
    });
  }
  if (Ra) {
    const e = (function () {
        function meta(e) {
          if (qe) return;
          const n = document.head.querySelector(`meta[name=${e}]`);
          return (null == n ? void 0 : n.content) || void 0;
        }
        const e = meta('apple-music-developer-token') || meta('JWT'),
          n = meta('apple-music-app-build') || meta('version'),
          d = meta('apple-music-app-name'),
          h = meta('apple-music-app-version');
        let p;
        return (
          (e || n || d || h) &&
            ((p = {}),
            e && (p.developerToken = e),
            (n || d || h) &&
              ((p.app = {}),
              n && (p.app.build = n),
              d && (p.app.name = d),
              h && (p.app.version = h))),
          p
        );
      })(),
      n = /interactive|complete|loaded/.test(document.readyState);
    e &&
      e.developerToken &&
      0 === getInstances().length &&
      (n
        ? asAsync(configure(e))
        : document.addEventListener('DOMContentLoaded', () => configure(e)));
  }
  (e.Events = _n),
    (e.MKError = MKError),
    (e.MediaItem = MediaItem),
    (e.MusicKitInstance = MusicKitInstance),
    (e.VideoTypes = {
      movie: !0,
      musicVideo: !0,
      musicMovie: !0,
      trailer: !0,
      tvEpisode: !0,
      uploadedVideo: !0,
      'uploaded-videos': !0,
      'music-videos': !0,
      'music-movies': !0,
      'tv-episodes': !0,
      Bonus: !0,
      Extra: !0,
      Episode: !0,
      Movie: !0,
      Preview: !0,
      Promotional: !0,
      Season: !0,
      Show: !0,
      Vod: !0,
      EditorialVideoClip: !0,
      RealityVideo: !0,
      SportingEvent: !0,
      LiveService: !0,
    }),
    (e.configure = configure),
    (e.enableMultipleInstances = function () {
      Oa = !0;
    }),
    (e.errors = Ha),
    (e.formatArtworkURL = formatArtworkURL),
    (e.formatMediaTime = function (e, n = ':') {
      const { hours: d, minutes: h } = formattedSeconds(e);
      e = Math.floor((e % 3600) % 60);
      const p = [];
      return (
        d
          ? (p.push('' + d), p.push(h < 10 ? '0' + h : '' + h))
          : p.push('' + h),
        p.push(e < 10 ? '0' + e : '' + e),
        p.join(n)
      );
    }),
    (e.formattedMediaURL = formattedMediaURL),
    (e.formattedMilliseconds = function (e) {
      return formattedSeconds(e / 1e3);
    }),
    (e.formattedSeconds = formattedSeconds),
    (e.generateEmbedCode = function (e, n = { height: '450', width: '660' }) {
      var d, h;
      if (!Ka.test(e)) throw new Error('Invalid content url');
      let p = null !== (d = n.height) && void 0 !== d ? d : '450',
        y = null !== (h = n.width) && void 0 !== h ? h : '660';
      const { kind: m, isUTS: g } = formattedMediaURL(e),
        _ = 'post' === m || 'musicVideo' === m || g;
      'song' === m || 'episode' === m
        ? (p = '175')
        : _ && (p = '' + Math.round(0.5625 * parseInt(y, 10))),
        (p = ('' + p).replace(/(\d+)px/i, '$1')),
        (y = ('' + y).replace(/^(\d+)(?!px)%?$/i, '$1px'));
      const b =
          (_ ? 'width:' + y : 'width:100%;' + (y ? 'max-width:' + y : '')) +
          ';overflow:hidden;background:transparent;',
        T = Va.get() || 'https://embed.music.apple.com';
      return `<iframe ${[
        `allow="${$a.join('; ')}"`,
        'frameborder="0"',
        p ? `height="${p}"` : '',
        `style="${b}"`,
        `sandbox="${ja.join(' ')}"`,
        `src="${e.replace(Ka, T)}"`,
      ].join(' ')}></iframe>`;
    }),
    (e.getHlsJsCdnConfig = getHlsJsCdnConfig),
    (e.getInstance = function (e) {
      if (0 !== Ca.length)
        return void 0 === e ? Ca[Ca.length - 1] : Ca.find((n) => n.id === e);
    }),
    (e.getInstances = getInstances),
    (e.getPlayerType = getPlayerType),
    (e.resolveCanonical = function (e) {
      return __awaiter(this, void 0, void 0, function* () {
        return {
          results: { links: yield filterLinks(e) },
          meta: { originalUrl: e, originalQueryParams: parseQueryParams(e) },
        };
      });
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
