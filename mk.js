/**
 * IMPORTANT NOTE:
 *
 * This file is licensed only for the use of Apple developers in providing MusicKit Web Services,
 * and is subject to the Apple Media Services Terms and Conditions and the Apple Developer Program
 * License Agreement. You may not copy, modify, re-host, or create derivative works of this file or the
 * accompanying Documentation, or any part thereof, including any updates, without Apple's written consent.
 *
 * ACKNOWLEDGEMENTS:
 * https://js-cdn.music.apple.com/musickit/v1/acknowledgements.txt
 */

!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? n(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], n)
      : n(
          ((e =
            'undefined' != typeof globalThis
              ? globalThis
              : e || self).MusicKit = {}),
        );
})(this, function (e) {
  'use strict';
  var n = void 0 !== typeof self ? self : this;
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
    d =
      /\/(?:([a-z]{2})\/)?(album|artist|episode|movie|music-video|playlist|podcast|post|season|show|song|station)\/(?:[^/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9-]+|umc.cmc.[a-zA-Z0-9]+)(?:.*(?:[?|&]i=(\d+)).*)?.*$/i;
  function formattedMediaURL(e) {
    const n = (function (e) {
        const n = e.match(d) || [];
        let [, p, h, y, _] = n;
        return (
          'music-video' === h && (h = 'musicVideo'),
          -1 !== ['album', 'playlist'].indexOf(h) && _
            ? ((h = 'song'), (y = _))
            : 'podcast' === h && _ && ((h = 'episode'), (y = _)),
          { storefrontId: p, kind: h, contentId: y, itemId: _ }
        );
      })(e),
      { storefrontId: p, kind: h, contentId: y } = n;
    if ([p, h, y].some((e) => void 0 === e))
      throw new TypeError('Invalid Media URL: ' + e);
    return {
      storefrontId: p,
      kind: h,
      contentId: y,
      isUTS: !!y && y.startsWith('umc.'),
    };
  }
  const p =
      /^http(?:s)?\:\/\/(?:itunes|(embed\.)?(music|podcasts|tv))\.apple\.com/i,
    h = [
      'allow-forms',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-storage-access-by-user-activation',
      'allow-top-navigation-by-user-activation',
    ],
    y = ['autoplay *', 'encrypted-media *', 'fullscreen *', 'clipboard-write'];
  const _ = [
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
  function isVideo(e) {
    var n;
    return (
      null != e &&
      (!0 === e.isUTS ||
        _.includes(e.type) ||
        'video' ===
          (null === (n = e.attributes) || void 0 === n ? void 0 : n.mediaKind))
    );
  }
  function isLive(e) {
    var n, d;
    return !!(null === (d = e) ||
    void 0 === d ||
    null === (n = d.attributes) ||
    void 0 === n
      ? void 0
      : n.isLive);
  }
  function isStream$1(e) {
    var n, d, p;
    return (
      'stream' ===
      (null === (p = e) ||
      void 0 === p ||
      null === (d = p.attributes) ||
      void 0 === d ||
      null === (n = d.playParams) ||
      void 0 === n
        ? void 0
        : n.format)
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
  function isAOD(e) {
    var n, d;
    return (
      (!isLive(e) &&
        isStream$1(e) &&
        'Episode' === e.attributes.streamingRadioSubType) ||
      !!(null === (d = e) ||
      void 0 === d ||
      null === (n = d.attributes) ||
      void 0 === n
        ? void 0
        : n.isAOD)
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
      p = e.includes('radio-broadcast');
    return function (e) {
      return (
        (!n || (n && !isLiveRadioStation(e))) &&
        (!d || (d && !isAOD(e))) &&
        (!p || (p && !isBroadcastRadio(e)))
      );
    };
  }
  const m = {};
  function normalizeContentType(e) {
    if (void 0 !== m[e]) return m[e];
    let n = e
      .replace(/[A-Z]/g, function (e, n) {
        const d = e.toLowerCase();
        return 0 !== n ? '-' + d : d;
      })
      .replace(/_+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-*)|(-*$)/, '');
    return (
      e.endsWith('y')
        ? (n = n.substring(0, n.length - 1) + 'ies')
        : n.endsWith('s') || (n += 's'),
      (m[e] = n),
      n
    );
  }
  function _define_property$1X(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const g = {
      INVALID_ERROR_ID: 'INVALID_ERROR_ID',
      INVALID_ERROR_REASON: 'INVALID_ERROR_REASON',
      ACCESS_DENIED: 'ACCESS_DENIED',
      AGE_VERIFICATION: 'AGE_VERIFICATION',
      AGE_GATE: 'AGE_GATE',
      AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
      BUFFER_STALLED_ERROR: 'BUFFER_STALLED_ERROR',
      CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
      CONTENT_EQUIVALENT: 'CONTENT_EQUIVALENT',
      CONTENT_RESTRICTED: 'CONTENT_RESTRICTED',
      CONTENT_UNAVAILABLE: 'CONTENT_UNAVAILABLE',
      CONTENT_UNSUPPORTED: 'CONTENT_UNSUPPORTED',
      DEVICE_LIMIT: 'DEVICE_LIMIT',
      GEO_BLOCK: 'GEO_BLOCK',
      INVALID_ARGUMENTS: 'INVALID_ARGUMENTS',
      PLAYREADY_CBC_ENCRYPTION_ERROR: 'PLAYREADY_CBC_ENCRYPTION_ERROR',
      MEDIA_CERTIFICATE: 'MEDIA_CERTIFICATE',
      MEDIA_DESCRIPTOR: 'MEDIA_DESCRIPTOR',
      MEDIA_LICENSE: 'MEDIA_LICENSE',
      MEDIA_KEY: 'MEDIA_KEY',
      MEDIA_PLAYBACK: 'MEDIA_PLAYBACK',
      MEDIA_SESSION: 'MEDIA_SESSION',
      NETWORK_ERROR: 'NETWORK_ERROR',
      NOT_FOUND: 'NOT_FOUND',
      PARSE_ERROR: 'PARSE_ERROR',
      PLAY_ACTIVITY: 'PLAY_ACTIVITY',
      REQUEST_ERROR: 'REQUEST_ERROR',
      QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
      SERVER_ERROR: 'SERVER_ERROR',
      SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
      STREAM_UPSELL: 'STREAM_UPSELL',
      SUBSCRIPTION_ERROR: 'SUBSCRIPTION_ERROR',
      TOKEN_EXPIRED: 'TOKEN_EXPIRED',
      UNAUTHORIZED_ERROR: 'UNAUTHORIZED_ERROR',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR',
      UNSUPPORTED_ERROR: 'UNSUPPORTED_ERROR',
      USER_INTERACTION_REQUIRED: 'USER_INTERACTION_REQUIRED',
      INTERNAL_ERROR: 'INTERNAL_ERROR',
      OUTPUT_RESTRICTED: 'OUTPUT_RESTRICTED',
      WIDEVINE_CDM_EXPIRED: 'WIDEVINE_CDM_EXPIRED',
    },
    b = {
      400: g.REQUEST_ERROR,
      401: g.UNAUTHORIZED_ERROR,
      403: g.ACCESS_DENIED,
      404: g.NOT_FOUND,
      405: g.NOT_FOUND,
      413: g.REQUEST_ERROR,
      414: g.REQUEST_ERROR,
      429: g.QUOTA_EXCEEDED,
      500: g.SERVER_ERROR,
      501: g.NOT_FOUND,
      503: g.SERVICE_UNAVAILABLE,
    },
    S = {
      '-1004': g.DEVICE_LIMIT,
      '-1017': g.GEO_BLOCK,
      1010: g.NOT_FOUND,
      2002: g.AUTHORIZATION_ERROR,
      2034: g.TOKEN_EXPIRED,
      3059: g.DEVICE_LIMIT,
      3063: g.SUBSCRIPTION_ERROR,
      3076: g.CONTENT_UNAVAILABLE,
      3082: g.CONTENT_RESTRICTED,
      3084: g.STREAM_UPSELL,
      5002: g.SERVER_ERROR,
      180202: g.PLAYREADY_CBC_ENCRYPTION_ERROR,
      190121: g.WIDEVINE_CDM_EXPIRED,
    },
    P = new Set([
      g.CONTENT_EQUIVALENT,
      g.CONTENT_UNAVAILABLE,
      g.CONTENT_UNSUPPORTED,
      g.SERVER_ERROR,
      g.SUBSCRIPTION_ERROR,
      g.UNSUPPORTED_ERROR,
      g.USER_INTERACTION_REQUIRED,
    ]);
  class MKError extends Error {
    static isMKError(e) {
      return (function (e) {
        return void 0 !== e && e instanceof MKError;
      })(e);
    }
    get errorCode() {
      return this.reason;
    }
    static playActivityError(e) {
      return new this(g.PLAY_ACTIVITY, e);
    }
    static parseError(e) {
      return new this(g.PARSE_ERROR, e);
    }
    static responseError(e) {
      const { status: n, statusText: d } = e,
        p = new this(b[n] || g.NETWORK_ERROR, d || '' + n);
      return (p.data = e), p;
    }
    static serverError(e, n = g.UNKNOWN_ERROR) {
      let {
        status: d,
        dialog: p,
        failureType: h,
        customerMessage: y,
        errorMessage: _,
        message: m,
      } = e;
      p &&
        ((m = p.message || p.customerMessage || p.errorMessage),
        (p.message = m));
      const b = S[h] || S[d] || n,
        P = new this(b, m || y || _);
      return (
        b === g.STREAM_UPSELL &&
          p &&
          p.okButtonAction &&
          p.okButtonAction.url &&
          (p.okButtonAction.url = p.okButtonAction.url.replace(
            /\&(?:challenge|key-system|uri|user-initiated)=[^\&]+/gim,
            '',
          )),
        (P.dialog = p),
        P
      );
    }
    static internalError(e) {
      return new this(g.INTERNAL_ERROR, e);
    }
    constructor(e, n) {
      super(),
        _define_property$1X(this, 'isMKError', !0),
        _define_property$1X(this, 'reason', g.UNKNOWN_ERROR),
        _define_property$1X(this, 'description', void 0),
        _define_property$1X(this, 'dialog', void 0),
        _define_property$1X(this, 'data', void 0),
        e && P.has(e)
          ? ((this.name = this.reason = e),
            (this.message = this.description = n || e))
          : n || 'string' != typeof e
            ? ((this.name = this.reason = e || g.UNKNOWN_ERROR),
              n && (this.message = this.description = n))
            : ((this.name = this.reason = g.UNKNOWN_ERROR),
              (this.message = this.description = e)),
        Error.captureStackTrace && Error.captureStackTrace(this, MKError);
    }
  }
  _define_property$1X(MKError, 'Reason', g), Object.assign(MKError, g);
  class GenericStorage {
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
    constructor(e = {}) {
      var n, d, p;
      (p = void 0),
        (d = '_data') in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p),
        (this.data = e);
    }
  }
  function getCookie(e = '', n = document.cookie) {
    const d = n.match(new RegExp(`(?:^|;\\s*)${e}=([^;]*)`));
    if (d) return d[1];
  }
  function setCookie(e, n, d = '', p = 14, h, y) {
    const _ = new Date();
    h = null != h ? h : window;
    const m =
      (y =
        null != y
          ? y
          : /\./.test(h.location.hostname)
            ? h.location.hostname
            : '').length > 0
        ? `domain=${y}; `
        : '';
    _.setTime(_.getTime() + 24 * p * 60 * 60 * 1e3);
    let g = '';
    'https:' === h.location.protocol && (g = '; secure'),
      (h.document.cookie = `${e}=${n}; expires=${_.toUTCString()}; ${m}path=${d}${g}`);
  }
  function removeCookie(e, n, d) {
    setCookie(e, '', '/', 0, n, d);
  }
  function hasSessionStorage() {
    let e = !1;
    try {
      e = 'undefined' != typeof sessionStorage;
    } catch (Ut) {}
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
    } catch (Ut) {}
    return e;
  }
  function getLocalStorage() {
    let e;
    return hasLocalStorage() && (e = localStorage), e;
  }
  function _define_property$1V(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class Notifications {
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
      if ((this.dispatchEvent(e, n), this.shouldStorageDispatch)) {
        var d;
        const p = `${this.dispatchNamespace}:${e}`;
        null === (d = getSessionStorage()) ||
          void 0 === d ||
          d.setItem(p, JSON.stringify(n));
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
    constructor(e = [], n) {
      _define_property$1V(this, 'dispatchNamespace', void 0),
        _define_property$1V(this, '_eventRegistry', {}),
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
  }
  var E =
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
        p = n.length;
      for (e._memoized = e._memoized || {}; p--; ) {
        const e = n[p];
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
  const T = memoize((e) => /^[a|i|l|p]{1}\.[a-zA-Z0-9]+$/.test(e));
  function detectNodeEnvironment() {
    var e, n, d, p;
    return (
      void 0 !==
        (null === (d = globalThis) ||
        void 0 === d ||
        null === (n = d.process) ||
        void 0 === n ||
        null === (e = n.versions) ||
        void 0 === e
          ? void 0
          : e.node) ||
      void 0 !==
        (null === (p = globalThis) || void 0 === p ? void 0 : p.FastBoot)
    );
  }
  function isNodeEnvironment$1() {
    return detectNodeEnvironment();
  }
  const k = memoize(
    detectNodeEnvironment()
      ? (e) => E.from(e, 'base64').toString('binary')
      : (e) => window.atob(e),
  );
  memoize(
    detectNodeEnvironment()
      ? (e) => E.from(e).toString('base64')
      : (e) => window.btoa(e),
  );
  const debounce = (e, n = 250, d = { isImmediate: !1 }) => {
      let p;
      return function (...h) {
        const y = this,
          _ = d.isImmediate && void 0 === p;
        void 0 !== p && clearTimeout(p),
          (p = setTimeout(function () {
            (p = void 0), d.isImmediate || e.apply(y, h);
          }, n)),
          _ && e.apply(y, h);
      };
    },
    exceptFields = (e, ...n) => {
      const d = {};
      return (
        Object.keys(e).forEach((p) => {
          n.includes(p) || (d[p] = e[p]);
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
    const n = Object.prototype.toString.call(e).toLowerCase().slice(8, -1);
    switch (n) {
      case 'set':
        return new Set([...e].map((e) => deepClone(e)));
      case 'map':
        return new Map([...e].map(([e, n]) => [deepClone(e), deepClone(n)]));
      case 'date':
        return new Date(e.getTime());
      case 'regexp': {
        const n = e,
          d =
            'string' == typeof n.flags
              ? n.flags
              : [
                  n.global ? 'g' : void 0,
                  n.ignoreCase ? 'i' : void 0,
                  n.multiline ? 'm' : void 0,
                  n.sticky ? 'y' : void 0,
                  n.unicode ? 'u' : void 0,
                ]
                  .filter((e) => void 0 !== e)
                  .join('');
        return RegExp(e.source, d);
      }
      case 'arraybuffer': {
        const n = e;
        if ('function' == typeof n.slice) return n.slice(0);
        {
          const d = new e.constructor(n.byteLength);
          return new Uint8Array(d).set(new Uint8Array(n)), d;
        }
      }
      case 'dataview':
      case 'int8array':
      case 'uint8array':
      case 'uint8clampedarray':
      case 'int16array':
      case 'uint16array':
      case 'int32array':
      case 'uint32array':
      case 'float32array':
      case 'float64array':
      case 'bigint64array':
      case 'biguint64array': {
        const d = e;
        return new (0, d.constructor)(
          deepClone(d.buffer),
          d.byteOffset,
          'dataview' === n ? d.byteLength : d.length,
        );
      }
      case 'array':
      case 'object': {
        const n = Array.isArray(e) ? [] : {};
        for (const d in e) hasOwn(e, d) && (n[d] = deepClone(e[d]));
        return n;
      }
      default:
        return e;
    }
  }
  function isEmpty(e) {
    if ('object' != typeof e) throw new TypeError('Source is not an Object');
    for (const n in e) if (hasOwn(e, n)) return !1;
    return !0;
  }
  function transform$8(e, n, d = !1) {
    return (
      d && (e = Object.keys(e).reduce((n, d) => ((n[e[d]] = d), n), {})),
      Object.keys(e).reduce((d, p) => {
        const h = e[p],
          y =
            'function' == typeof h
              ? h()
              : (function (e, n) {
                  return n.split('.').reduce((e, n) => {
                    if (void 0 !== e) return e[n];
                  }, e);
                })(n, h);
        return (
          y &&
            (function (e, n, d) {
              n.split('.').reduce((n, p, h, y) => {
                const _ = h === y.length - 1,
                  m = hasOwn(n, p),
                  g = n[p] instanceof Object,
                  b = null === n[p];
                if (!_ && m && (!g || b))
                  throw new TypeError(
                    `Value at ${y
                      .slice(0, h + 1)
                      .join('.')} in keypath is not an Object.`,
                  );
                return _ ? ((n[p] = d), e) : m ? n[p] : (n[p] = {});
              }, e);
            })(d, p, y),
          d
        );
      }, {})
    );
  }
  const w = [
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
    I = {
      'uploaded-videos': !0,
      uploadedVideo: !0,
      'uploaded-audios': !0,
      uploadedAudio: !0,
      'podcast-episodes': !0,
    },
    O = [],
    A = {
      mediaItemStateDidChange: 'mediaItemStateDidChange',
      mediaItemStateWillChange: 'mediaItemStateWillChange',
    },
    R = {
      CRITICAL: 50,
      ERROR: 40,
      WARNING: 30,
      NOTICE: 20,
      INFO: 10,
      DEBUG: 2,
      TRACE: 1,
      NONE: 0,
    };
  const $ = {
    OFF: 'NONE',
    0: 'NONE',
    '+': 'INFO',
    '++': 'DEBUG',
    V: 'DEBUG',
    D: 'DEBUG',
    VERBOSE: 'DEBUG',
    VV: 'TRACE',
    SILLY: 'TRACE',
    '*': 'TRACE',
  };
  function getLoggingLevel(e, n = {}) {
    if ('number' == typeof e)
      return (function (e) {
        return 'number' == typeof e && Object.values(R).includes(e);
      })(e)
        ? e
        : void 0;
    let d = e.toUpperCase();
    return (
      n.allowShorthands && void 0 !== $[d] && (d = $[d]),
      (function (e) {
        return 'string' == typeof e && void 0 !== R[e.toUpperCase()];
      })(d)
        ? R[d]
        : void 0
    );
  }
  function getLoggingLevelName(e) {
    for (const [n, d] of Object.entries(R)) if (e === d) return n;
  }
  function walk(e, n) {
    const d = [e];
    for (; d.length > 0; ) {
      const e = d.shift();
      void 0 !== e && (d.push(...e.children), n(e));
    }
  }
  function _define_property$1U(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$N(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1U(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$v(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _define_property1(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const C = R.ERROR,
    DEFAULT_POLICY = (e, n) => e !== R.NONE && n >= e;
  class Logger {
    get parent() {
      return this._parent;
    }
    get children() {
      return Array.from(this._children.values());
    }
    get namespace() {
      return void 0 === this._parent
        ? this.name
        : this._parent.namespace + '/' + this.name;
    }
    get enabled() {
      return this.level !== R.NONE;
    }
    get level() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._level) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.level) && void 0 !== d
        ? d
        : C;
    }
    get levelName() {
      var e;
      return null !== (e = getLoggingLevelName(this.level)) && void 0 !== e
        ? e
        : 'UNKNOWN';
    }
    get levelPolicy() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._levelPolicy) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.levelPolicy) && void 0 !== d
        ? d
        : DEFAULT_POLICY;
    }
    get handlers() {
      var e, n, d;
      return null !==
        (d =
          null !== (n = this._handlers) && void 0 !== n
            ? n
            : null === (e = this.parent) || void 0 === e
              ? void 0
              : e.handlers) && void 0 !== d
        ? d
        : {};
    }
    isEnabledFor(e) {
      return this.levelPolicy(this.level, e);
    }
    setLevel(e) {
      const n = getLoggingLevel(e);
      void 0 !== n && (this._level = n);
    }
    clearLevel() {
      this._level = void 0;
    }
    setLevelPolicy(e) {
      this._levelPolicy = e;
    }
    clearLevelPolicy() {
      this._levelPolicy = void 0;
    }
    addHandler(e, n) {
      this._handlers || (this._handlers = {}), (this._handlers[e] = n);
    }
    hasHandler(e) {
      var n;
      return (
        void 0 !==
        (null === (n = this._handlers) || void 0 === n ? void 0 : n[e])
      );
    }
    removeHandler(e) {
      void 0 !== this._handlers &&
        (delete this._handlers[e],
        0 === Object.keys(this._handlers).length && this.clearHandlers());
    }
    clearHandlers() {
      this._handlers = void 0;
    }
    createChild(e, n) {
      const d = this._children.get(e);
      return void 0 !== d
        ? d
        : new Logger(
            e,
            _object_spread_props$v(_object_spread$N({}, n), { parent: this }),
          );
    }
    linkChild(e) {
      if (void 0 !== e.parent && e.parent !== this)
        throw new Error(
          `Logger '${e.name}' is already a child of a different parent ('${e.parent.name}')`,
        );
      const n = this._children.get(e.name);
      if (void 0 !== n && n !== e)
        throw new Error(`A child with name '${e.name}' is already registered`);
      return (
        void 0 === n && (this._children.set(e.name, e), e.linkParent(this)), e
      );
    }
    unlinkChild(e) {
      const n = this._children.get(e.name);
      return n === e && (this._children.delete(e.name), n.unlinkParent()), e;
    }
    getByName(e) {
      return this._children.get(e);
    }
    getByNamespace(e) {
      return (function (e, n, d = '/') {
        if ('' === (n = n.trim()) || '*' === n) return e;
        const p = n.split(d);
        p[0].trim() === e.name && p.shift();
        if (0 === p.length) return e;
        let h = e;
        for (; void 0 !== h && p.length > 0; ) {
          const e = p.shift();
          h = h.getByName(e.trim());
        }
        return h;
      })(this, e);
    }
    linkParent(e) {
      return (
        this.parent !== e &&
          (this.unlinkParent(), (this._parent = e), e.linkChild(this)),
        this
      );
    }
    unlinkParent() {
      return (
        void 0 !== this._parent &&
          (this._parent.unlinkChild(this), (this._parent = void 0)),
        this
      );
    }
    log(e, n, ...d) {
      const p = getLoggingLevel(e);
      void 0 !== p &&
        this.logRecord({
          time: Date.now(),
          namespace: this.namespace,
          level: p,
          message: n,
          args: d,
        });
    }
    logRecord(e) {
      if (!this.levelPolicy(this.level, e.level)) return;
      const n = _object_spread$N({ namespace: this.namespace }, e);
      for (const d of Object.values(this.handlers)) d.process(n);
    }
    error(e, ...n) {
      this.log(R.ERROR, e, ...n);
    }
    warning(e, ...n) {
      this.log(R.WARNING, e, ...n);
    }
    warn(e, ...n) {
      this.warning(e, ...n);
    }
    info(e, ...n) {
      this.log(R.INFO, e, ...n);
    }
    debug(e, ...n) {
      this.log(R.DEBUG, e, ...n);
    }
    trace(e, ...n) {
      this.log(R.TRACE, e, ...n);
    }
    constructor(e, n) {
      var d, p, h, y;
      _define_property1(this, 'name', void 0),
        _define_property1(this, '_parent', void 0),
        _define_property1(this, '_children', new Map()),
        _define_property1(this, '_level', void 0),
        _define_property1(this, '_levelPolicy', void 0),
        _define_property1(this, '_handlers', void 0),
        (this.name = e),
        (this._levelPolicy =
          null === (d = n) || void 0 === d ? void 0 : d.levelPolicy),
        (this._handlers =
          null === (p = n) || void 0 === p ? void 0 : p.handlers),
        void 0 !== (null === (h = n) || void 0 === h ? void 0 : h.parent) &&
          this.linkParent(n.parent),
        void 0 !== (null === (y = n) || void 0 === y ? void 0 : y.level) &&
          this.setLevel(n.level);
    }
  }
  function _define_property$1T(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class CallbackHandler {
    process(e) {
      this.enabled && void 0 !== this.callback && this.callback(e);
    }
    constructor(e, n = {}) {
      var d;
      _define_property$1T(this, 'enabled', void 0),
        _define_property$1T(this, 'callback', void 0),
        (this.callback = e),
        (this.enabled = null === (d = n.enabled) || void 0 === d || d);
    }
  }
  const M = /%{([^}]+)}/gi;
  var D;
  const x = {
    timestamp: (e) => String(e.time),
    time: (e) => String(e.time),
    datetime: (e) => new Date(e.time).toISOString(),
    date: (e) => new Date(e.time).toISOString(),
    level: (e) => String(e.level),
    levelname: (e) =>
      null !== (D = getLoggingLevelName(e.level)) && void 0 !== D
        ? D
        : 'UNKNOWN',
    message: (e) => e.message,
    name: (e) => e.namespace.split('/').pop(),
    namespace: (e) => e.namespace,
  };
  function _define_property$1S(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const L = new Map([
      [R.CRITICAL, 'error'],
      [R.ERROR, 'error'],
      [R.WARNING, 'warn'],
      [R.NOTICE, 'warn'],
      [R.INFO, 'log'],
      [R.DEBUG, 'debug'],
    ]),
    N =
      ((j = '%{datetime} %{levelname} - [%{namespace}] %{message}'),
      function (e) {
        return j.replace(M, function (n, d) {
          return (d = d.toLowerCase()), void 0 !== x[d] ? x[d](e) : n;
        });
      });
  var j;
  const U = new Logger('media-item');
  var B, F;
  (e.PlaybackType = void 0),
    ((B = e.PlaybackType || (e.PlaybackType = {}))[(B.none = 0)] = 'none'),
    (B[(B.preview = 1)] = 'preview'),
    (B[(B.unencryptedFull = 2)] = 'unencryptedFull'),
    (B[(B.encryptedFull = 3)] = 'encryptedFull'),
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
    })(F || (F = {}));
  const {
      none: G,
      loading: V,
      ready: H,
      playing: q,
      ended: W,
      unavailable: Y,
      restricted: z,
      error: Q,
      unsupported: J,
    } = F,
    X = {
      [G]: { allowed: [V], unknown: [W, Y, z, Q, J] },
      [V]: { allowed: [H, z, Q, J], unknown: [] },
      [H]: { allowed: [q], unknown: [Q] },
      [q]: { allowed: [W, Q], unknown: [Y, z, J] },
      [W]: { allowed: [], unknown: [] },
      [Y]: { allowed: [], unknown: [] },
      [z]: { allowed: [], unknown: [] },
      [Q]: { allowed: [], unknown: [] },
      [J]: { allowed: [], unknown: [] },
    },
    toName = (e) => F[e],
    createMediaItemStateGuard = (e = G) => {
      const n = {
        current: e,
        set(e) {
          const { current: d } = n;
          if (!((e, n) => X[e].allowed.includes(n))(d, e)) {
            const n = ((e, n) => X[e].unknown.includes(n))(d, e);
            U.debug(
              `MediaItem.state was changed from ${toName(d)} to ${toName(e)}`,
              n
                ? 'but it is unknown whether it should be allowed or not.'
                : 'and it should not be happening',
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
          var n;
          const d = null === (n = e) || void 0 === n ? void 0 : n.artworkURL;
          if (d)
            return (function (e) {
              const n = e.split('/').pop(),
                [d, p] = (!!n && n.match(/\d+/g)) || ['100', '100'];
              return {
                width: parseInt(d, 10),
                height: parseInt(p, 10),
                url: e.replace(`${d}x${p}`, '{w}x{h}'),
              };
            })(d);
        },
        'attributes.composerName': 'metadata.composerName',
        'attributes.contentRating'() {
          var n, d;
          if (
            1 ===
            (null === (d = e) ||
            void 0 === d ||
            null === (n = d.metadata) ||
            void 0 === n
              ? void 0
              : n.explicit)
          )
            return 'explicit';
        },
        'attributes.discNumber'() {
          var n, d;
          return (
            (null === (d = e) ||
            void 0 === d ||
            null === (n = d.metadata) ||
            void 0 === n
              ? void 0
              : n.discNumber) || 1
          );
        },
        'attributes.durationInMillis': 'metadata.duration',
        'attributes.genreNames'() {
          var n, d;
          return [
            null === (d = e) ||
            void 0 === d ||
            null === (n = d.metadata) ||
            void 0 === n
              ? void 0
              : n.genre,
          ];
        },
        'attributes.isrc'() {
          var n, d;
          const p =
            null === (d = e) ||
            void 0 === d ||
            null === (n = d.metadata) ||
            void 0 === n
              ? void 0
              : n.xid;
          if (p) return p.replace(/^([^:]+):isrc:/, '$1');
        },
        'attributes.name': 'metadata.itemName',
        'attributes.playParams.id': 'metadata.itemId',
        'attributes.playParams.kind': 'metadata.kind',
        'attributes.previews'() {
          var n;
          return [
            { url: null === (n = e) || void 0 === n ? void 0 : n.previewURL },
          ];
        },
        'attributes.releaseDate': 'metadata.releaseDate',
        'attributes.trackNumber': 'metadata.trackNumber',
        assetURL: 'URL',
        cloudId: 'metadata.cloud-id',
        id() {
          var n, d;
          return (
            '' +
            (null === (d = e) ||
            void 0 === d ||
            null === (n = d.metadata) ||
            void 0 === n
              ? void 0
              : n.itemId)
          );
        },
        flavor: 'flavor',
        type: 'metadata.kind',
      },
      e,
    );
  }
  function _define_property$1R(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const { mediaItemStateDidChange: Z, mediaItemStateWillChange: ee } = A,
    te = { isEntitledToPlay: !0 };
  class MediaItem extends Notifications {
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
      return null !== (n = this.attributes.artwork) && void 0 !== n
        ? n
        : null === (e = this.attributes.images) || void 0 === e
          ? void 0
          : e.coverArt16X9;
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
      var p;
      return (
        null !==
          (p =
            n.isEntitledToPlay ||
            (null === (e = d) || void 0 === e ? void 0 : e.isEntitledToPlay)) &&
        void 0 !== p &&
        p
      );
    }
    get supportsLinearScrubbing() {
      var e, n, d;
      return (
        this.isLinearStream &&
        !0 ===
          (null === (d = this.defaultPlayable) ||
          void 0 === d ||
          null === (n = d.assets) ||
          void 0 === n ||
          null === (e = n.streamCapability) ||
          void 0 === e
            ? void 0
            : e.supportsLinearScrubbing)
      );
    }
    get isAssetScrubbingDisabled() {
      return !!this.isLinearStream && !this.supportsLinearScrubbing;
    }
    get isLinearStream() {
      return (
        'LiveService' ===
          (null === (n = e = this) || void 0 === n ? void 0 : n.type) ||
        'Event' ===
          (null === (p = e) ||
          void 0 === p ||
          null === (d = p.defaultPlayable) ||
          void 0 === d
            ? void 0
            : d.type) ||
        'EbsEvent' ===
          (null === (y = e) ||
          void 0 === y ||
          null === (h = y.defaultPlayable) ||
          void 0 === h
            ? void 0
            : h.type)
      );
      var e, n, d, p, h, y;
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
    get isAOD() {
      return isAOD(this);
    }
    get isSong() {
      return 'song' === this.type;
    }
    get info() {
      return `${this.title} - ${this.albumInfo}`;
    }
    get isCloudItem() {
      return (this.playParams && this.playParams.isLibrary) || T(this.id);
    }
    get isCloudUpload() {
      return -1 === this._songId;
    }
    get isExplicitItem() {
      return 'explicit' === this.contentRating;
    }
    get isLoading() {
      return this.state === F.loading;
    }
    get isPlayableMediaType() {
      return this.isUTS || -1 !== w.indexOf(this.type);
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
      return this.state === F.playing;
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
      return this.state === F.ready;
    }
    get isRestricted() {
      return this.state === F.restricted;
    }
    get isUTS() {
      var e;
      return !(
        !(null === (e = this.defaultPlayable) || void 0 === e
          ? void 0
          : e.type) || !O.includes(this.defaultPlayable.type)
      );
    }
    get isUnavailable() {
      return this.state === F.unavailable;
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
      var e, n;
      const { offers: d } = this;
      return null ===
        (n =
          null === (e = d) || void 0 === e
            ? void 0
            : e.find((e) => {
                var n;
                return !!(null === (n = e.hlsUrl) || void 0 === n
                  ? void 0
                  : n.length);
              })) || void 0 === n
        ? void 0
        : n.hlsUrl;
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
        (n.attributes = (function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var d = null != arguments[n] ? arguments[n] : {},
              p = Object.keys(d);
            'function' == typeof Object.getOwnPropertySymbols &&
              (p = p.concat(
                Object.getOwnPropertySymbols(d).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(d, e).enumerable;
                }),
              )),
              p.forEach(function (n) {
                _define_property$1R(e, n, d[n]);
              });
          }
          return e;
        })({}, this.attributes, n.attributes)),
        Object.assign(this, n),
        U.debug('media-item: item merged with playbackData', this),
        (this.state = F.ready);
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
        ? null === (d = this.container) ||
          void 0 === d ||
          null === (n = d.attributes) ||
          void 0 === n ||
          null === (e = n.artwork) ||
          void 0 === e
          ? void 0
          : e.url
        : this.artworkURL;
    }
    get playlistName() {
      var e, n;
      return this.hasPlaylistContainer
        ? null === (n = this.container) ||
          void 0 === n ||
          null === (e = n.attributes) ||
          void 0 === e
          ? void 0
          : e.name
        : this.albumName;
    }
    get playParams() {
      return this.attributes.playParams;
    }
    get playRawAssetURL() {
      return !((!this.isCloudUpload && !I[this.type]) || this.hasOffersHlsUrl);
    }
    get previewURL() {
      var e, n, d, p, h, y, _, m, g, b, S, P, E, T, k;
      return (
        (null === (d = this.attributes) ||
        void 0 === d ||
        null === (n = d.previews) ||
        void 0 === n ||
        null === (e = n[0]) ||
        void 0 === e
          ? void 0
          : e.url) ||
        (null === (y = this.attributes) ||
        void 0 === y ||
        null === (h = y.previews) ||
        void 0 === h ||
        null === (p = h[0]) ||
        void 0 === p
          ? void 0
          : p.hlsUrl) ||
        (null === (b = this.attributes) ||
        void 0 === b ||
        null === (g = b.trailers) ||
        void 0 === g ||
        null === (m = g[0]) ||
        void 0 === m ||
        null === (_ = m.assets) ||
        void 0 === _
          ? void 0
          : _.hlsUrl) ||
        (null === (E = this.attributes) ||
        void 0 === E ||
        null === (P = E.movieClips) ||
        void 0 === P ||
        null === (S = P[0]) ||
        void 0 === S
          ? void 0
          : S.hlsUrl) ||
        (null === (k = this.attributes) ||
        void 0 === k ||
        null === (T = k.video) ||
        void 0 === T
          ? void 0
          : T.hlsUrl)
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
        this.dispatchEvent(ee, n),
        this._state.set(e),
        this._stateDidChange && this._stateDidChange(this),
        this.dispatchEvent(Z, n);
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
        (this.state = F.none);
    }
    restrict() {
      this.isExplicitItem &&
        ((this.state = F.restricted), this._removePlayableData());
    }
    notSupported() {
      (this.state = F.unsupported), this._removePlayableData();
    }
    updateFromLoadError(e) {
      switch (e.reason) {
        case MKError.Reason.CONTENT_RESTRICTED:
          this.state = F.restricted;
          break;
        case MKError.Reason.CONTENT_UNAVAILABLE:
          this.state = F.unavailable;
          break;
        default:
          this.state = F.error;
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
    constructor(n = {}) {
      super([Z, ee]),
        _define_property$1R(this, 'id', void 0),
        _define_property$1R(this, 'type', void 0),
        _define_property$1R(this, 'cloudId', void 0),
        _define_property$1R(this, 'playables', void 0),
        _define_property$1R(this, 'channels', void 0),
        _define_property$1R(this, 'assetURL', void 0),
        _define_property$1R(this, 'hlsMetadata', {}),
        _define_property$1R(this, 'flavor', void 0),
        _define_property$1R(this, 'keyURLs', void 0),
        _define_property$1R(this, 'keyServerQueryParameters', void 0),
        _define_property$1R(this, 'attributes', {}),
        _define_property$1R(this, 'playbackType', e.PlaybackType.none),
        _define_property$1R(this, 'trackInfo', void 0),
        _define_property$1R(this, 'relationships', void 0),
        _define_property$1R(this, '_assets', []),
        _define_property$1R(this, '_container', void 0),
        _define_property$1R(this, '_context', void 0),
        _define_property$1R(this, '_releaseDate', void 0),
        _define_property$1R(this, '_songId', void 0),
        _define_property$1R(this, '_state', createMediaItemStateGuard()),
        _define_property$1R(this, '_stateDidChange', void 0),
        _define_property$1R(this, '_stateWillChange', void 0),
        U.debug('media-item: creating Media Item with options:', n);
      n.id && n.attributes
        ? (Object.keys(n).forEach((e) => {
            hasOwn(te, e) || (this[e] = n[e]);
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
  }
  const re = [
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
  var ie, ne;
  function asyncGeneratorStep$1g(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1g(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1g(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1g(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  (e.PlaybackStates = void 0),
    ((ie = e.PlaybackStates || (e.PlaybackStates = {}))[(ie.none = 0)] =
      'none'),
    (ie[(ie.loading = 1)] = 'loading'),
    (ie[(ie.playing = 2)] = 'playing'),
    (ie[(ie.paused = 3)] = 'paused'),
    (ie[(ie.stopped = 4)] = 'stopped'),
    (ie[(ie.ended = 5)] = 'ended'),
    (ie[(ie.seeking = 6)] = 'seeking'),
    (ie[(ie.waiting = 8)] = 'waiting'),
    (ie[(ie.stalled = 9)] = 'stalled'),
    (ie[(ie.completed = 10)] = 'completed'),
    (e.PresentationMode = void 0),
    ((ne = e.PresentationMode || (e.PresentationMode = {}))[
      (ne.pictureinpicture = 0)
    ] = 'pictureinpicture'),
    (ne[(ne.inline = 1)] = 'inline');
  function _define_property$1Q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class DeveloperToken {
    get isExpired() {
      return this.expiration < Date.now();
    }
    _decode(e) {
      return JSON.parse(k(e));
    }
    constructor(e) {
      if (
        (_define_property$1Q(this, 'token', void 0),
        _define_property$1Q(this, 'expiration', void 0),
        _define_property$1Q(this, 'keyId', void 0),
        _define_property$1Q(this, 'teamId', void 0),
        (this.token = e),
        !e ||
          !/^[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}\.[a-z0-9\-\_]{16,}/i.test(e))
      )
        throw new Error('Invalid token.');
      const [n, d] = e.split('.'),
        { exp: p, iss: h } = this._decode(d);
      if (((this.expiration = 1e3 * p), this.isExpired))
        throw new Error('Initialized with an expired token.');
      this.teamId = h;
      const { kid: y } = this._decode(n);
      this.keyId = y;
    }
  }
  function invoke(e) {
    return void 0 === e || ((e) => 'function' != typeof e)(e) ? e : e();
  }
  function _define_property$1P(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$L(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1P(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$u(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const addPathToURL = (e, n) =>
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
    oe = 'undefined' != typeof Headers,
    headersToDict = (e) => {
      let n = {};
      var d;
      return (
        (d = e),
        oe && d instanceof Headers
          ? e.forEach((e, d) => (n[d] = e))
          : Array.isArray(e)
            ? e.forEach(([e, d]) => (n[e] = d))
            : (n = e),
        n
      );
    },
    mergeFetchHeaders = (e = {}, n = {}) =>
      _object_spread$L({}, headersToDict(e), headersToDict(n)),
    mergeFetchOptions = (e, n) => {
      var d, p;
      if (e || n)
        return (null === (d = e) || void 0 === d ? void 0 : d.headers) &&
          (null === (p = n) || void 0 === p ? void 0 : p.headers)
          ? _object_spread_props$u(_object_spread$L({}, e, n), {
              headers: mergeFetchHeaders(e.headers, n.headers),
            })
          : _object_spread$L({}, e, n);
    };
  function parseQueryParams(e) {
    if (!e || (e.startsWith('http') && !e.includes('?'))) return {};
    try {
      var n;
      return parseParams(
        null !== (n = e.split('?')[1]) && void 0 !== n ? n : e,
        '&',
        decodeURIComponent,
      );
    } catch (Ut) {
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
            const [p, h] = n;
            return (
              ('' === p && void 0 === h) ||
                ((e[d(p)] = d(h)), void 0 === h && (e[d(p)] = void 0)),
              e
            );
          }, {});
  }
  function getMaxAgeFromHeaders(e) {
    const n = (function (e, n) {
      if (void 0 !== n) return oe && n instanceof Headers ? n.get(e) : n[e];
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
    Object.keys(e).reduce((d, p) => {
      const h = e[p],
        y = n ? `${n}[${encodeURIComponent(p)}]` : encodeURIComponent(p);
      return `${d}${d ? '&' : ''}${
        (function (e) {
          return !!e && 'object' == typeof e && !Array.isArray(e);
        })(h)
          ? recursiveEncodeParameters(h, y)
          : `${y}=${encodeURIComponent('' + h)}`
      }`;
    }, '');
  function urlEncodeParameters(e) {
    return e ? recursiveEncodeParameters(e) : '';
  }
  const ae = {};
  function findOrCreate(e, n) {
    const d = e
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (e, n) => n.toUpperCase());
    if (hasOwn(ae, d)) {
      const p = ae[d];
      if (n !== p.constructor)
        throw new Error(
          `DevFlag ${e} was already registered with a different type (${p.constructor.name})`,
        );
      return p;
    }
    const p = new n(e);
    return (
      Object.defineProperty(ae, d, {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return p;
        },
        set(e) {
          p.set(e);
        },
      }),
      p
    );
  }
  class LocalStorageDevFlag {
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
    constructor(e) {
      if (
        ((function (e, n, d) {
          n in e
            ? Object.defineProperty(e, n, {
                value: d,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = d);
        })(this, 'key', void 0),
        'string' != typeof e || '' === e.trim())
      )
        throw new Error('DevFlag requires a non-empty string key');
      this.key = e;
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
      if (void 0 !== e) return '1' === e || 'true' === e.toLowerCase();
    }
    set(e) {
      'boolean' == typeof e
        ? this.write(!0 === e ? '1' : '0')
        : console.warn('Value for BooleanDevFlag should be a boolean');
    }
    get enabled() {
      return !0 === this.get();
    }
    enable() {
      this.set(!0);
    }
    disable() {
      this.set(!1);
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
        } catch (Q) {
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
  const se = JsonDevFlag.register('mk-hlsjs-automation-config'),
    ce = new RegExp(
      '^https://([a-z0-9]+-)?' +
        (
          'js-cdn.music.apple.com' + '/musickit/v3/'.replace(/v3/, '(v2|v3)')
        ).replace(/[\.\/]/g, '\\$&'),
      'i',
    ),
    de = /^https:\/\/(.*\/includes\/js-cdn)\//i,
    le = /^([a-z]+:)?\/\//;
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
      const n = ce.exec(e.src);
      if (n) return n[1] || '';
    }
    return '';
  }
  function determineCdnPathPrefix() {
    for (const e of getScriptSrcElements()) {
      const n = de.exec(e.src);
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
  const ue = StringDevFlag.register('mk-hlsjs-log-level'),
    pe = StringDevFlag.register('mk-hlsjs-version');
  function getHlsJsCdnConfig() {
    const e = { hls: '', rtc: '' };
    if (isNodeEnvironment$1()) return e;
    const n = determineCdnPathHost() || determineCdnBaseHost(),
      d = pe.get() || '2.510.3',
      p = (function () {
        const e = ue.value;
        switch (e) {
          case 'info':
          case 'error':
          case 'warn':
            return 'hls.production.verbose.min.js';
          case 'trace':
          case 'debug':
            return (
              console.warn(
                `HLS log level ${e} is not supported, loading production build.`,
              ),
              'hls.js'
            );
          default:
            return 'hls.js';
        }
      })();
    return (
      (e.hls = `https:${n}/hls.js/${d}/hls.js/${p}`),
      (e.rtc = `https:${n}/hls.js/${d}/rtc.js/rtc.min.js`),
      (function (e) {
        var n;
        const d = se.get();
        if (!(null === (n = d) || void 0 === n ? void 0 : n.url)) return;
        const { url: p } = d;
        isAppleHostname(p) &&
          'carry-' === determineCdnBasePrefix() &&
          (e.hls = p);
      })(e),
      e
    );
  }
  function isAppleHostname(e) {
    try {
      return new URL(e).hostname.endsWith('.apple.com');
    } catch (Ut) {}
    return !1;
  }
  function cdnBaseURL(e, n = window) {
    var d;
    if (isNodeEnvironment$1()) return '';
    const p =
      null === (d = getLocalStorage()) || void 0 === d
        ? void 0
        : d.getItem('mkCDNBaseURLOverride');
    if (p) return p;
    const h = findScript(e);
    return h
      ? h.getAttribute('src').replace(new RegExp(e + '$'), '')
      : (determineCdnPathHost() || determineCdnBaseHost()) + '/musickit/v3/';
  }
  const he = new Map();
  function loadScript(e, n) {
    const d = he.get(e);
    if (d) return d;
    const p = new Promise((d, p) => {
      isNodeEnvironment$1() &&
        p('Dynamic script loading is unsupported in Node environments.');
      if (findScript(e)) return d();
      const h = document.createElement('script');
      let y;
      if (
        (n &&
          Object.keys(n).forEach((e) => {
            h.setAttribute(e, n[e]);
          }),
        (h.onload = () => {
          d();
        }),
        (h.onerror = (e) => {
          p(e);
        }),
        le.test(e))
      )
        y = e;
      else {
        y = `${cdnBaseURL(e)}${e}`;
      }
      (h.src = y), document.head.appendChild(h);
    });
    return he.set(e, p), p;
  }
  const ye = new Logger('storekit');
  function _define_property$1N(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const _e = [
    'apps.apple.com',
    'books.apple.com',
    'fitness.apple.com',
    'mediaauth.apple.com',
    'multidev.apple.com',
    'music.apple.com',
    'one.apple.com',
    'podcasts.apple.com',
    'tv.apple.com',
    'itunes.apple.com',
  ];
  function _define_property$1M(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class AuthBridgeApp extends class {
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
      } catch (Ut) {}
      if (!n || !this._isNamespacedData(n)) return;
      '*' === this._targetOrigin && (this._targetOrigin = e.origin),
        ye.debug('auth-bridge: handleMessage', n);
      const d = n.action.replace('mediakit:', '');
      this[d]
        ? this[d](n.data)
        : ye.debug('auth-bridge: unsupported method', d);
    }
    _isOriginAllowed(e) {
      if (!e) return !1;
      const [n, d] = e.split('://');
      let p = '';
      return (
        d && ((p = d.split(':')[0]), p && (p = p.toLocaleLowerCase())),
        'https' === n && !!p && _e.some((e) => p === e || p.endsWith('.' + e))
      );
    }
    _isNamespacedData(e) {
      return e.action && -1 !== e.action.indexOf('mediakit:');
    }
    constructor() {
      _define_property$1N(this, '_receiveWindow', void 0),
        _define_property$1N(this, '_sendWindow', void 0),
        _define_property$1N(this, '_targetOrigin', '*');
    }
  } {
    requestAuthUpdate() {
      this.whenFrameInited.then(() => this.sendMessage('requestAuthUpdate'));
    }
    setCookieItem(e, n) {
      this.whenFrameInited.then(() =>
        this.sendMessage('setCookieItem', { name: e, value: n }),
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
      var n, d;
      if (
        (null === (n = e) || void 0 === n ? void 0 : n.enabled) &&
        (null === (d = e) || void 0 === d ? void 0 : d.cookies)
      ) {
        const n = e.cookies;
        Object.keys(n).forEach((e) => {
          var d;
          const p = null !== (d = n[e]) && void 0 !== d ? d : '';
          p ? setCookie(e, p, '/', 30) : removeCookie(e);
        });
      }
      this._authUpdateResolve &&
        (this._authUpdateResolve(), (this._authUpdateResolve = void 0));
    }
    authClearedFromOtherFrame() {
      ye.warn(
        "Override auth-bridge/app's authClearedFromOtherFrame to trigger app-specific sign out behavior",
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
    constructor() {
      super(),
        _define_property$1M(this, 'whenAuthCompleted', void 0),
        _define_property$1M(this, 'frame', void 0),
        _define_property$1M(this, 'whenFrameInited', void 0),
        _define_property$1M(this, '_frameInitResolve', void 0),
        _define_property$1M(this, '_authUpdateResolve', void 0),
        (this.whenFrameInited = new Promise(
          (e) => (this._frameInitResolve = e),
        )),
        (this.whenAuthCompleted = new Promise(
          (e) => (this._authUpdateResolve = e),
        )),
        (this.frame = document.createElement('iframe')),
        (this.frame.src = this._getIframeSrc()),
        (this.frame.style.display = 'none'),
        document.body.appendChild(this.frame),
        this.init(window, this.frame.contentWindow);
    }
  }
  const fe = new Set([]),
    ve = /\.apple\.com$/;
  function getCommerceHostname(e, n) {
    !n && 'undefined' != typeof location && location.hostname && (n = location);
    let d = e + '.itunes.apple.com';
    if (!n) return d;
    const p = (function (e) {
      if (!e || !ve.test(e)) return;
      const n = e.split('.');
      let d = n[n.length - 3];
      const p = d;
      if (d && d.includes('-')) {
        const e = d.split('-');
        d = e[e.length - 1];
      }
      return fe.has(d) ? p : void 0;
    })(n.hostname);
    return p && (d = `${e}.${p}.apple.com`), d;
  }
  var me, ge, be;
  function buildQueryParams(e = { app: me.APP, p: me.P }) {
    return (
      void 0 === e.app && (e.app = me.APP),
      void 0 === e.p && (e.p = me.P),
      Object.keys(e)
        .map((n) => `${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`)
        .join('&')
    );
  }
  !(function (e) {
    (e.APP = 'music'), (e.P = 'subscribe');
  })(me || (me = {})),
    (function (e) {
      (e.DEFAULT_CID = 'pldfltcid'),
        (e.TV_CID = 'pltvcid'),
        (e.RESTRICTIONS_ENABLED = 'itre'),
        (e.STOREFRONT_COUNTRY_CODE = 'itua'),
        (e.USER_TOKEN = 'media-user-token');
    })(ge || (ge = {})),
    (e.SKRealm = void 0),
    ((be = e.SKRealm || (e.SKRealm = {}))[(be.MUSIC = 0)] = 'MUSIC'),
    (be[(be.PODCAST = 1)] = 'PODCAST'),
    (be[(be.TV = 2)] = 'TV');
  const Se = {
      [e.SKRealm.TV]: 'com.apple.onboarding.tvapp',
      [e.SKRealm.MUSIC]: 'com.apple.onboarding.applemusic',
    },
    Pe = { [e.SKRealm.TV]: 'pltvcid', [e.SKRealm.MUSIC]: 'pldfltcid' },
    Ee = memoize((e) => {
      const n = new Uint16Array(e),
        d = n.length;
      let p = '';
      for (let h = 0; h < d; h++) p += String.fromCharCode(n[h]);
      return p;
    }),
    Te = memoize((e) => {
      const n = k(e);
      return ke(n);
    });
  function ensureArray(e = []) {
    return Array.isArray(e) ? e : [e];
  }
  const ke = memoize((e) => {
      const n = e.length,
        d = new ArrayBuffer(n),
        p = new Uint8Array(d);
      for (let h = 0; h < n; h++) p[h] = e.charCodeAt(h);
      return p;
    }),
    we = memoize((e) => {
      const n = e.length,
        d = new ArrayBuffer(2 * n),
        p = new Uint16Array(d);
      for (let h = 0; h < n; h++) p[h] = e.charCodeAt(h);
      return p;
    }),
    Ie = memoize((e) => {
      let n,
        d,
        p,
        h,
        y,
        _,
        m,
        g = 0;
      const b =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let S = '';
      for (; g < e.length; )
        (n = e[g++]),
          (d = g < e.length ? e[g++] : Number.NaN),
          (p = g < e.length ? e[g++] : Number.NaN),
          (h = n >> 2),
          (y = ((3 & n) << 4) | (d >> 4)),
          (_ = ((15 & d) << 2) | (p >> 6)),
          (m = 63 & p),
          isNaN(d) ? (_ = m = 64) : isNaN(p) && (m = 64),
          (S += b.charAt(h) + b.charAt(y) + b.charAt(_) + b.charAt(m));
      return S;
    });
  function asyncGeneratorStep$1f(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1L(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  var Oe;
  !(function (e) {
    (e[(e.ParseError = -32700)] = 'ParseError'),
      (e[(e.InvalidRequest = -32600)] = 'InvalidRequest'),
      (e[(e.MethodNotFound = -32601)] = 'MethodNotFound'),
      (e[(e.InvalidParams = -32602)] = 'InvalidParams'),
      (e[(e.InternalError = -32603)] = 'InternalError');
  })(Oe || (Oe = {}));
  class Dispatch {
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
        p = new Promise((e, n) => {
          this._registry[d] = { resolve: e, reject: n };
        });
      return (
        this.send(this.destination, {
          jsonrpc: '2.0',
          id: d,
          method: e,
          params: n,
        }),
        p
      );
    }
    call(e, ...n) {
      return this.apply(e, n);
    }
    handleRequest(e) {
      var n,
        d = this;
      return ((n = function* () {
        const n = { jsonrpc: '2.0', id: e.id },
          p = d.methods[e.method];
        if (!p)
          return Object.assign(n, {
            error: { code: Oe.MethodNotFound, message: 'Method not found' },
          });
        try {
          const d = yield p.apply(void 0, ensureArray(e.params));
          return Object.assign(n, { result: d });
        } catch (Q) {
          return Object.assign(n, {
            error: { code: Q.code || Oe.InternalError, message: Q.message },
          });
        }
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$1f(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$1f(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
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
    constructor(e = {}) {
      _define_property$1L(this, 'destination', void 0),
        _define_property$1L(this, 'origin', void 0),
        _define_property$1L(this, 'methods', void 0),
        _define_property$1L(this, '_registry', {}),
        _define_property$1L(this, '_sequence', 0),
        _define_property$1L(this, '_source', void 0),
        _define_property$1L(this, 'handle', (e) => {
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
  }
  function asyncGeneratorStep$1e(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1e(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1e(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1e(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1K(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$K(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1K(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$t(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Ae;
  function validateToken(e) {
    if ('string' != typeof e) return !1;
    const n = e.match(/[a-zA-Z0-9=\/+]{32,}==$/);
    var d;
    return null !== (d = n && n.length > 0) && void 0 !== d && d;
  }
  !(function (e) {
    (e[(e.UNAVAILABLE = -1)] = 'UNAVAILABLE'),
      (e[(e.NOT_DETERMINED = 0)] = 'NOT_DETERMINED'),
      (e[(e.DENIED = 1)] = 'DENIED'),
      (e[(e.RESTRICTED = 2)] = 'RESTRICTED'),
      (e[(e.AUTHORIZED = 3)] = 'AUTHORIZED');
  })(Ae || (Ae = {}));
  const Re = `https://${getCommerceHostname(
      'buy',
    )}/commerce/account/authenticateMusicKitRequest`,
    $e = 'https://authorize.music.apple.com',
    Ce = /^https?:\/\/(.+\.)*(apple\.com|apps\.mzstatic\.com)(\/[\w\d]+)*$/;
  var Me, De, xe;
  !(function (e) {
    (e[(e.AUTHORIZE = 0)] = 'AUTHORIZE'), (e[(e.SUBSCRIBE = 1)] = 'SUBSCRIBE');
  })(Me || (Me = {}));
  class ServiceSetupView {
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
    load(e = { action: Me.AUTHORIZE }) {
      var n = this;
      return _async_to_generator$1e(function* () {
        return e.action === Me.SUBSCRIBE
          ? n._subscribeAction(e.parameters)
          : n._authorizeAction(e.parameters);
      })();
    }
    present(e = '', n) {
      const {
          height: d,
          left: p,
          top: h,
          width: y,
        } = this._calculateClientDimensions(),
        _ = {
          height: 650,
          menubar: 'no',
          resizable: 'no',
          scrollbars: 'no',
          status: 'no',
          toolbar: 'no',
          width: 650,
        },
        m = _object_spread$K(
          _object_spread_props$t(_object_spread$K({}, _), {
            left: y / 2 - _.width / 2 + p,
            top: d / 2 - _.height / 2 + h,
          }),
          n,
        ),
        g = Object.keys(m)
          .map((e) => `${e}=${m[e]}`)
          .join(',');
      return (
        /trident|msie/i.test(navigator.userAgent)
          ? ((this._window =
              window.open(window.location.href, this.target, g) || void 0),
            (this._window.location.href = e))
          : (this._window = window.open(e, this.target, g) || void 0),
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
      var n = this;
      return _async_to_generator$1e(function* () {
        var d;
        let p, h;
        const y =
          (null === (d = window.location) || void 0 === d ? void 0 : d.href) ||
          '';
        return (
          'GET' === n.authenticateMethod
            ? (h = `${$e}/woa?${buildQueryParams(
                _object_spread_props$t(
                  _object_spread$K({}, n.deeplinkParameters),
                  { a: btoa(n._thirdPartyInfo()), referrer: y },
                ),
              )}`)
            : ((p = n._buildFormElement(Re)), document.body.appendChild(p)),
          new Promise((d, y) => {
            const _ = n.present(h);
            n._startPollingForWindowClosed(() => {
              y(Ae.NOT_DETERMINED);
            }),
              (n.dispatch = new Dispatch({
                methods: {
                  authorize(e, n, p) {
                    validateToken(e)
                      ? d({ restricted: n && '1' === n, userToken: e, cid: p })
                      : y(Ae.NOT_DETERMINED);
                  },
                  close() {},
                  decline() {
                    y(Ae.DENIED);
                  },
                  switchUserId() {
                    y(Ae.NOT_DETERMINED);
                  },
                  thirdPartyInfo: () =>
                    n._thirdPartyInfo(
                      n.developerToken,
                      _object_spread$K({}, n.deeplinkParameters, e),
                    ),
                  unavailable() {
                    y(Ae.UNAVAILABLE);
                  },
                },
                origin: $e,
                source: window,
                destination: _,
              })),
              p && p.submit();
          })
        );
      })();
    }
    _buildFormElement(e, n = this.target, d = this.developerToken) {
      const p = document.createElement('form');
      p.setAttribute('method', 'post'),
        p.setAttribute('action', e),
        p.setAttribute('target', n),
        (p.style.display = 'none');
      const h = document.createElement('input');
      h.setAttribute('name', 'jwtToken'),
        h.setAttribute('value', d),
        p.appendChild(h);
      const y = document.createElement('input');
      y.setAttribute('name', 'isWebPlayer'),
        y.setAttribute('value', 'true'),
        p.appendChild(y);
      const _ = document.createElement('input');
      return (
        _.setAttribute('name', 'LogoURL'),
        _.setAttribute('value', ''),
        p.appendChild(_),
        p
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
      var n = this;
      return _async_to_generator$1e(function* () {
        return (
          Object.assign(e, n.deeplinkParameters),
          new Promise((d, p) => {
            const h =
              'https://authorize.music.apple.com/upsell?' + buildQueryParams(e);
            n.present(h),
              window.addEventListener(
                'message',
                ({ data: e, origin: n, source: h }) => {
                  const { closeWindow: y, launchClient: _ } =
                    'string' == typeof e ? JSON.parse(e) : e;
                  (n && !Ce.test(n)) ||
                    (_
                      ? 0 === _.supported
                        ? p('Unable to subscribe on this platform.')
                        : d(_)
                      : p('Subscribe action error.'));
                },
              );
          })
        );
      })();
    }
    _thirdPartyInfo(e = this.developerToken, n) {
      let d = this.iconURL;
      const p = window.location.host || document.referrer,
        h = [
          ...[].slice.call(
            document.querySelectorAll('link[rel="apple-music-app-icon"]'),
          ),
          ...[].slice.call(
            document.querySelectorAll(
              'link[rel="apple-touch-icon-precomposed"]',
            ),
          ),
          ...[].slice.call(
            document.querySelectorAll('link[rel="apple-touch-icon"]'),
          ),
        ];
      if (h && h[0] && h[0].href) {
        var y;
        var _;
        d =
          null !==
            (_ =
              null ===
                (y = h.find((e) => !!e.sizes && '120x120' === e.sizes.value)) ||
              void 0 === y
                ? void 0
                : y.href) && void 0 !== _
            ? _
            : h[0].href;
      }
      return JSON.stringify({
        thirdPartyIconURL: d,
        thirdPartyName: p,
        thirdPartyParameters: n,
        thirdPartyToken: e,
      });
    }
    constructor(e, n = {}) {
      if (
        (_define_property$1K(this, 'developerToken', void 0),
        _define_property$1K(this, 'authenticateMethod', void 0),
        _define_property$1K(this, 'deeplinkParameters', void 0),
        _define_property$1K(this, 'iconURL', void 0),
        _define_property$1K(this, 'target', void 0),
        _define_property$1K(this, 'dispatch', void 0),
        _define_property$1K(this, '_window', void 0),
        _define_property$1K(this, '_windowClosedInterval', void 0),
        (this.developerToken = e),
        (this.authenticateMethod = 'GET'),
        (this.target = 'apple-music-service-view'),
        (this.deeplinkParameters = (n && n.deeplinkParameters) || {}),
        (this.iconURL = n && n.iconURL),
        (this.authenticateMethod = (n && n.authenticateMethod) || 'GET'),
        this.isServiceView && window.opener !== window)
      ) {
        var d;
        const e =
            null === (d = getSessionStorage()) || void 0 === d
              ? void 0
              : d.getItem('ac'),
          n = null != e ? new URL(e).origin : void 0;
        var p;
        if (n)
          this.dispatch = new Dispatch({
            destination:
              null !== (p = window.opener) && void 0 !== p ? p : void 0,
            origin: n,
            source: window,
          });
      }
    }
  }
  function asyncGeneratorStep$1d(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1d(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1d(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1d(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1J(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _fetchStorefronts() {
    return (_fetchStorefronts = _async_to_generator$1d(function* (
      e,
      n = 'https://api.music.apple.com/v1',
    ) {
      const d = new Headers({ Authorization: 'Bearer ' + e }),
        p = yield fetch(n + '/storefronts', { headers: d }),
        h = yield p.json();
      return h.errors ? Promise.reject(h.errors) : h.data;
    })).apply(this, arguments);
  }
  !(function (e) {
    (e.ID = 'us'), (e.LANGUAGE_TAG = 'en-gb');
  })(De || (De = {}));
  function asyncGeneratorStep$1c(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1c(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1c(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1c(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1I(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$J(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1I(e, n, d[n]);
        });
    }
    return e;
  }
  function _ts_metadata$r(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e) {
    (e.authorizationStatusDidChange = 'authorizationStatusDidChange'),
      (e.authorizationStatusWillChange = 'authorizationStatusWillChange'),
      (e.eligibleForSubscribeView = 'eligibleForSubscribeView'),
      (e.storefrontCountryCodeDidChange = 'storefrontCountryCodeDidChange'),
      (e.storefrontIdentifierDidChange = 'storefrontIdentifierDidChange'),
      (e.userTokenDidChange = 'userTokenDidChange');
  })(xe || (xe = {})),
    ge.DEFAULT_CID;
  const Le = 'https://' + getCommerceHostname('buy'),
    Ne = `https://${getCommerceHostname('play')}/WebObjects/MZPlay.woa/wa`;
  class StoreKit extends Notifications {
    updateUserTokenFromStorage() {
      const e = this._getStorageItem(ge.USER_TOKEN);
      this.userToken = e || void 0;
    }
    get authorizationStatus() {
      return this._authorizationStatus;
    }
    set authorizationStatus(e) {
      this._authorizationStatus !== e &&
        (this._getIsActiveSubscription.updateCache(void 0),
        this.dispatchEvent(xe.authorizationStatusWillChange, {
          authorizationStatus: this._authorizationStatus,
          newAuthorizationStatus: e,
        }),
        (this._authorizationStatus = e),
        this.dispatchEvent(xe.authorizationStatusDidChange, {
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
      var e = this;
      return _async_to_generator$1c(function* () {
        const n = yield e.hasMusicSubscription();
        return (
          (!e.hasAuthorized || (e.hasAuthorized && !n)) &&
          !e._dispatchedSubscribeView
        );
      })();
    }
    get hasAuthorized() {
      return this.authorizationStatus > Ae.DENIED;
    }
    get logoutURL() {
      if (!this._disableLogoutURL) return this.playBase + '/webPlayerLogout';
    }
    get _pldfltcid() {
      return this._cids[ge.DEFAULT_CID];
    }
    set _pldfltcid(e) {
      this._cids[ge.DEFAULT_CID] = e;
    }
    get restrictedEnabled() {
      if (this.userToken && 'boolean' != typeof this._restrictedEnabled) {
        const e = this._getStorageItem(ge.RESTRICTIONS_ENABLED);
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
          this._setStorageItem(ge.RESTRICTIONS_ENABLED, e ? '1' : '0'),
        (this._restrictedEnabled = e),
        e && (this.authorizationStatus = Ae.RESTRICTED));
    }
    overrideRestrictEnabled(e) {
      (this._restrictedEnabledOverridden = !1),
        (this.restrictedEnabled = e),
        (this._restrictedEnabledOverridden = !0);
    }
    get storefrontCountryCode() {
      if (!this._storefrontCountryCode) {
        var e;
        const n = this._getStorageItem(ge.STOREFRONT_COUNTRY_CODE);
        this._storefrontCountryCode =
          (null === (e = n) || void 0 === e ? void 0 : e.toLowerCase()) ||
          De.ID;
      }
      return this._storefrontCountryCode;
    }
    set storefrontCountryCode(e) {
      e && this.userToken
        ? this._setStorageItem(ge.STOREFRONT_COUNTRY_CODE, e)
        : this._removeStorageItem(ge.STOREFRONT_COUNTRY_CODE),
        e !== this._storefrontCountryCode &&
          ((this._storefrontCountryCode = e),
          this.dispatchEvent(xe.storefrontCountryCodeDidChange, {
            storefrontCountryCode: e,
          }));
    }
    get storefrontIdentifier() {
      return this._storefrontIdentifier;
    }
    set storefrontIdentifier(e) {
      (this._storefrontIdentifier = e),
        this.dispatchEvent(xe.storefrontIdentifierDidChange, {
          storefrontIdentifier: e,
        });
    }
    runTokenValidations(e, n = !0) {
      e && validateToken(e)
        ? (n && this._setStorageItem(ge.USER_TOKEN, e),
          (this.authorizationStatus = this.restrictedEnabled
            ? Ae.RESTRICTED
            : Ae.AUTHORIZED))
        : (this._removeStorageItem(ge.USER_TOKEN),
          (this.authorizationStatus = Ae.NOT_DETERMINED));
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
            this.dispatchEvent(xe.userTokenDidChange, { userToken: n })),
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
        this.dispatchEvent(xe.userTokenDidChange, { userToken: n });
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
          (e = _object_spread$J({}, this.deeplinkParameters || {}, e)),
        )
      );
    }
    itunesDeeplinkURL(e = { p: 'browse' }) {
      return (
        'https://itunes.apple.com/deeplink?' +
        buildQueryParams(
          (e = _object_spread$J({}, this.deeplinkParameters || {}, e)),
        )
      );
    }
    pldfltcid() {
      var e = this;
      return _async_to_generator$1c(function* () {
        if (!e._cids[ge.DEFAULT_CID])
          try {
            yield e.infoRefresh();
          } catch (Ut) {
            return;
          }
        return e._cids[ge.DEFAULT_CID];
      })();
    }
    renewUserToken() {
      var e = this;
      return _async_to_generator$1c(function* () {
        if (!e.userToken) return e.requestUserToken();
        const n = new Headers({
            Authorization: 'Bearer ' + e.developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + e.userToken,
          }),
          d = yield fetch(e.playBase + '/renewMusicToken', {
            method: 'POST',
            headers: n,
          });
        if (401 === d.status)
          return (
            yield e.revokeUserToken(), Promise.reject(new Error('Renew token'))
          );
        const p = yield d.json();
        return (
          p['music-token'] && (e.userToken = p['music-token']), e.userToken
        );
      })();
    }
    requestStorefrontCountryCode() {
      var e = this;
      return _async_to_generator$1c(function* () {
        if (e.authorizationStatus <= Ae.DENIED)
          return Promise.reject('Not authorized: ' + e.authorizationStatus);
        const n = new Headers({
            Authorization: 'Bearer ' + e.developerToken,
            'Music-User-Token': e.userToken || '',
          }),
          d = yield fetch(e.apiBase + '/me/storefront', { headers: n });
        if (d && !d.ok)
          return e._reset(), Promise.reject('Storefront Country Code error.');
        const p = yield d.json();
        if (p.errors) return Promise.reject(p.errors);
        const [h] = p.data;
        return h && h.id
          ? ((e.storefrontCountryCode = h.id), e.storefrontCountryCode)
          : Promise.reject('Storefront Country Code error.');
      })();
    }
    requestStorefrontIdentifier() {
      var e = this;
      return _async_to_generator$1c(function* () {
        if (!e.storefrontIdentifier) {
          const n = yield class {
            static inferFromLanguages(
              e,
              n = (function () {
                if ('undefined' == typeof navigator) return [];
                if (navigator.languages) return navigator.languages;
                const e = navigator.language || navigator.userLanguage;
                return e ? [e] : [];
              })(),
            ) {
              return _async_to_generator$1d(function* () {
                const d = yield (function (e) {
                    return _fetchStorefronts.apply(this, arguments);
                  })(e),
                  p = d.map((e) => e.id),
                  h = n[0] || 'en-US',
                  [y, _] = h.toLowerCase().split(/-|_/),
                  m = p.includes(_) ? _ : 'us';
                return d.find((e) => e.id === m);
              })();
            }
            constructor(e, n, d) {
              _define_property$1J(this, 'id', void 0),
                _define_property$1J(this, 'attributes', void 0),
                _define_property$1J(this, 'href', void 0),
                _define_property$1J(this, 'type', void 0),
                (this.id = e),
                (this.attributes = n),
                (this.type = 'storefronts'),
                (this.href = d || `/v1/${this.type}/${e}`);
            }
          }.inferFromLanguages(e.developerToken);
          e.storefrontIdentifier = n.id;
        }
        return e.storefrontIdentifier;
      })();
    }
    requestUserToken() {
      var e = this;
      return _async_to_generator$1c(function* () {
        if (e._serviceSetupView.isServiceView) return e.userToken || '';
        try {
          const n = yield e._serviceSetupView.load({ action: Me.AUTHORIZE });
          (e.cid = n.cid),
            (e.userToken = n.userToken),
            (e.restrictedEnabled = n.restricted);
        } catch (n) {
          return e._reset(), (e.authorizationStatus = n), Promise.reject(n);
        }
        return e.userToken;
      })();
    }
    revokeUserToken() {
      var e = this;
      return _async_to_generator$1c(function* () {
        var n;
        try {
          yield e._webPlayerLogout();
        } catch (Ut) {}
        null === (n = e.authBridgeApp) || void 0 === n || n.clearAuth(),
          e.dispatchEvent(xe.authorizationStatusWillChange, {
            authorizationStatus: e.authorizationStatus,
            newAuthorizationStatus: Ae.NOT_DETERMINED,
          }),
          e._reset(),
          e.dispatchEvent(xe.authorizationStatusDidChange, {
            authorizationStatus: e.authorizationStatus,
          }),
          e.dispatchEvent(xe.userTokenDidChange, { userToken: e.userToken });
      })();
    }
    setCids(e) {
      (this._cids = _object_spread$J({}, this._cids, e)),
        Object.keys(this._cids).forEach((e) => {
          this._setStorageItem(e, this._cids[e]);
        });
    }
    hasMusicSubscription() {
      var e = this;
      return _async_to_generator$1c(function* () {
        return !!e.hasAuthorized && e._getIsActiveSubscription();
      })();
    }
    _getIsActiveSubscription() {
      var e = this;
      return _async_to_generator$1c(function* () {
        var n;
        return !!(null === (n = (yield e.me()).subscription) || void 0 === n
          ? void 0
          : n.active);
      })();
    }
    resetSubscribeViewEligibility() {
      this._dispatchedSubscribeView = !1;
    }
    presentSubscribeViewForEligibleUsers(e = {}, n = !0) {
      var d = this;
      return _async_to_generator$1c(function* () {
        const p = yield d.eligibleForSubscribeView();
        if (!d._serviceSetupView.isServiceView && p) {
          if (!n)
            return (
              d.dispatchEvent(xe.eligibleForSubscribeView, e),
              void (d._dispatchedSubscribeView = !0)
            );
          try {
            const e = yield d._serviceSetupView.load({ action: Me.SUBSCRIBE });
            return (d._dispatchedSubscribeView = !0), e;
          } catch (h) {
            return d.revokeUserToken();
          }
        }
      })();
    }
    infoRefresh() {
      var e = this;
      return _async_to_generator$1c(function* () {
        if (e.authorizationStatus <= Ae.DENIED)
          return Promise.reject('Not authorized: ' + e.authorizationStatus);
        const n = new Headers({
          Authorization: 'Bearer ' + e.developerToken,
          'Music-User-Token': e.userToken || '',
        });
        try {
          const d = yield fetch(e.iTunesBuyBase + '/account/web/infoRefresh', {
              credentials: 'include',
              headers: n,
            }),
            p = yield d.json();
          e.setCids(p);
        } catch (Ut) {}
      })();
    }
    me() {
      if (this.authorizationStatus <= Ae.DENIED)
        return Promise.reject('Not authorized: ' + this.authorizationStatus);
      if (!this._me) {
        var n = this;
        this._me = new Promise(
          (function () {
            var d = _async_to_generator$1c(function* (d, p) {
              const h = new Headers({
                  Authorization: 'Bearer ' + n.developerToken,
                  'Music-User-Token': n.userToken || '',
                }),
                y = addQueryParamsToURL(
                  n.apiBase + '/me/account',
                  _object_spread$J({ meta: 'subscription' }, n.meParameters),
                );
              let _;
              try {
                _ = yield fetch(y, { headers: h });
              } catch (Ut) {
                return p(
                  new MKError(
                    MKError.Reason.NETWORK_ERROR,
                    'Failed to fetch /me/account',
                  ),
                );
              }
              if (_ && !_.ok)
                return (
                  n.realm !== e.SKRealm.TV && n._reset(), p('Account error.')
                );
              let m = yield _.json();
              if (m.errors) return p(m.errors);
              const { data: g, meta: b } = m;
              if (!b || !b.subscription) return p('Account error.');
              n.storefrontCountryCode = b.subscription.storefront;
              const S = { meta: b, subscription: b.subscription };
              return g && g.length && (S.attributes = g[0].attributes), d(S);
            });
            return function (e, n) {
              return d.apply(this, arguments);
            };
          })(),
        )
          .then((e) => {
            var n;
            return (
              this._getIsActiveSubscription.updateCache(
                (null === (n = e.subscription) || void 0 === n
                  ? void 0
                  : n.active) || !1,
              ),
              (this._me = null),
              e
            );
          })
          .catch((e) => ((this._me = null), Promise.reject(e)));
      }
      return this._me;
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
        const d = e.replace(n, '$1');
        try {
          const { itre: e, musicUserToken: n, cid: p } = JSON.parse(atob(d));
          (this.restrictedEnabled = e && '1' === e),
            (this.userToken = n),
            (this.cid = p);
        } catch (Ut) {}
        history.replaceState(null, document.title, ' ');
      }
    }
    _removeStorageItem(e) {
      if ('cookie' === this.persist) this._removeCookieFromDomains(e);
      else if ('localstorage' === this.persist) {
        var n;
        return null === (n = this.storage) || void 0 === n
          ? void 0
          : n.removeItem(`${this.storagePrefix}.${e}`);
      }
    }
    _removeCookieFromDomains(e, n = window) {
      removeCookie(e);
      const { hostname: d } = n.location,
        p = d.split('.');
      if (p.length && (p.shift(), p.length > 2))
        for (let h = p.length; h > 2; h--) {
          const d = p.join('.');
          p.shift(), removeCookie(e, n, d);
        }
    }
    _reset(e = Ae.NOT_DETERMINED) {
      (this._authorizationStatus = e),
        (this._cids = {}),
        (this._dispatchedSubscribeView = !1),
        (this._restrictedEnabled = void 0),
        (this._storefrontCountryCode = void 0),
        this._getIsActiveSubscription.updateCache(void 0),
        Object.keys(Pe).forEach((e) => {
          this._removeStorageItem(Pe[e]);
        }),
        this._removeStorageItem(ge.RESTRICTIONS_ENABLED),
        this._removeStorageItem(ge.USER_TOKEN),
        this._removeStorageItem(ge.STOREFRONT_COUNTRY_CODE),
        (this._dynamicUserToken = void 0),
        (this._me = null);
    }
    _setStorageItem(e, n) {
      var d, p;
      return 'cookie' === this.persist
        ? (null === (d = this.authBridgeApp) ||
            void 0 === d ||
            d.setCookieItem(e, n),
          setCookie(e, n, '/', 180))
        : 'localstorage' === this.persist
          ? null === (p = this.storage) || void 0 === p
            ? void 0
            : p.setItem(`${this.storagePrefix}.${e}`, n)
          : void 0;
    }
    _webPlayerLogout() {
      var e = this;
      return _async_to_generator$1c(function* () {
        const n = e.logoutURL;
        if (!n) return;
        const d = new Headers({
            Authorization: 'Bearer ' + e.developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + e.userToken,
          }),
          p = yield fetch(n, {
            method: 'POST',
            headers: d,
            credentials: 'same-origin',
          });
        return p && !p.ok ? Promise.reject(p.status) : p.json();
      })();
    }
    constructor(n, d) {
      var p;
      (super([
        xe.authorizationStatusDidChange,
        xe.authorizationStatusWillChange,
        xe.eligibleForSubscribeView,
        xe.storefrontCountryCodeDidChange,
        xe.userTokenDidChange,
        xe.storefrontIdentifierDidChange,
      ]),
      _define_property$1I(this, 'developerToken', void 0),
      _define_property$1I(this, 'apiBase', void 0),
      _define_property$1I(this, 'bundleId', void 0),
      _define_property$1I(this, 'cidNamespace', void 0),
      _define_property$1I(this, 'deeplinkParameters', void 0),
      _define_property$1I(this, 'iconURL', void 0),
      _define_property$1I(this, 'iTunesBuyBase', void 0),
      _define_property$1I(this, 'meParameters', void 0),
      _define_property$1I(this, 'persist', void 0),
      _define_property$1I(this, 'playBase', void 0),
      _define_property$1I(this, 'prefix', void 0),
      _define_property$1I(this, 'realm', void 0),
      _define_property$1I(this, 'storage', void 0),
      _define_property$1I(this, 'storagePrefix', void 0),
      _define_property$1I(this, 'whenAuthCompleted', void 0),
      _define_property$1I(this, '_authorizationStatus', void 0),
      _define_property$1I(this, '_developerToken', void 0),
      _define_property$1I(this, '_disableLogoutURL', void 0),
      _define_property$1I(this, '_dispatchedSubscribeView', void 0),
      _define_property$1I(this, '_me', void 0),
      _define_property$1I(this, '_cids', void 0),
      _define_property$1I(this, '_restrictedEnabled', void 0),
      _define_property$1I(this, '_restrictedEnabledOverridden', void 0),
      _define_property$1I(this, '_serviceSetupView', void 0),
      _define_property$1I(this, 'authBridgeApp', void 0),
      _define_property$1I(this, '_storefrontCountryCode', void 0),
      _define_property$1I(this, '_storefrontIdentifier', void 0),
      _define_property$1I(this, '_dynamicUserToken', void 0),
      (this.developerToken = n),
      (this.apiBase = 'https://api.music.apple.com/v1'),
      (this.iTunesBuyBase = Le),
      (this.meParameters = {}),
      (this.persist = 'localstorage'),
      (this.playBase = Ne),
      (this.prefix = 'music'),
      (this.realm = e.SKRealm.MUSIC),
      (this.storage = getLocalStorage()),
      (this._authorizationStatus = Ae.NOT_DETERMINED),
      (this._disableLogoutURL = !1),
      (this._dispatchedSubscribeView = !1),
      (this._me = null),
      (this._cids = {}),
      (this._restrictedEnabledOverridden = !1),
      (this._dynamicUserToken = getCookie(ge.USER_TOKEN)),
      ye.info('StoreKit initialized'),
      d &&
        (d.apiBase && (this.apiBase = d.apiBase),
        d.deeplink && (this.deeplinkParameters = d.deeplink),
        d.meParameters && (this.meParameters = d.meParameters),
        d.persist && (this.persist = d.persist),
        d.prefix && (this.prefix = d.prefix),
        void 0 !== d.realm && (this.realm = d.realm),
        (this.bundleId = Se[this.realm])),
      (this.cidNamespace = Pe[this.realm]),
      (this._developerToken = new DeveloperToken(n)),
      (this._serviceSetupView = new ServiceSetupView(n, {
        authenticateMethod: d && d.authenticateMethod,
        iconURL: d && d.iconURL,
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
      isNodeEnvironment$1()) ||
        (this._processLocationHash(window.location.hash),
        'cookie' !== this.persist ||
          (null === (p = d) || void 0 === p ? void 0 : p.disableAuthBridge) ||
          ((this.authBridgeApp = new AuthBridgeApp()),
          (this.authBridgeApp.authClearedFromOtherFrame =
            this.revokeUserToken.bind(this)),
          (this.whenAuthCompleted = this.authBridgeApp.whenAuthCompleted.then(
            () => {
              this.updateUserTokenFromStorage();
            },
          ))));
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      (
        (e = 300) =>
        (n, d, p) => {
          if (void 0 === p || 'function' != typeof p.value)
            throw new TypeError(
              `Only methods can be decorated with @CachedResult, but ${d} is not a method.`,
            );
          return {
            configurable: !0,
            get() {
              const n = p.value,
                h = 1e3 * e;
              let y,
                _ = -1;
              function cachedResultMethod() {
                return _cachedResultMethod.apply(this, arguments);
              }
              function _cachedResultMethod() {
                return (_cachedResultMethod = _async_to_generator$1g(function* (
                  ...e
                ) {
                  const d = Date.now();
                  return (
                    (void 0 === y || -1 === _ || (_ > 0 && d > _ + h)) &&
                      ((_ = d), (y = yield n.apply(this, e))),
                    y
                  );
                })).apply(this, arguments);
              }
              return (
                (cachedResultMethod.updateCache = function (e) {
                  (_ = Date.now()), (y = e);
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
      _ts_metadata$r('design:type', Function),
      _ts_metadata$r('design:paramtypes', []),
    ],
    StoreKit.prototype,
    '_getIsActiveSubscription',
    null,
  );
  const je = new Logger('player'),
    Ue = new Logger('paf'),
    Be = new Logger('services'),
    Fe = StringDevFlag.register('mk-logging-levels'),
    Ke = BooleanDevFlag.register('mk-console-logging'),
    Ge = R.ERROR;
  let Ve = Ge;
  const He = new Logger('mk', {
    level: Ve,
    handlers: {
      console: new (class {
        get hasConsole() {
          return 'undefined' != typeof console;
        }
        process(e) {
          if (!this.enabled || !this.hasConsole) return;
          let n = 'log';
          if (this.mapLevels) {
            const p = this.levelMapping.get(e.level);
            void 0 !== (d = p) && d in console && (n = p);
          }
          var d, p;
          const h = null !== (p = e.args) && void 0 !== p ? p : [],
            y = this.format(e);
          console[n](y, ...h);
        }
        constructor(e = {}) {
          var n, d, p, h;
          _define_property$1S(this, 'enabled', void 0),
            _define_property$1S(this, 'mapLevels', void 0),
            _define_property$1S(this, 'levelMapping', void 0),
            _define_property$1S(this, 'format', void 0),
            (this.enabled = null === (n = e.enabled) || void 0 === n || n),
            (this.mapLevels = null === (d = e.mapLevels) || void 0 === d || d),
            (this.levelMapping =
              null !== (p = e.levelMapping) && void 0 !== p ? p : L),
            (this.format = null !== (h = e.formatter) && void 0 !== h ? h : N);
        }
      })({ enabled: !1 }),
      external: new CallbackHandler(() => {}),
    },
  });
  function applyLoggingLevels(e) {
    !(function (e, n) {
      walk(e, function (e) {
        let d;
        const p = e.namespace;
        e.clearLevel(),
          void 0 === e.parent && void 0 !== n['*']
            ? (d = getLoggingLevel(n['*']))
            : void 0 !== n[p] && (d = getLoggingLevel(n[p])),
          void 0 !== d && e.setLevel(d);
      });
    })(
      He,
      (function (e) {
        const n = getLoggingLevel(e.trim(), { allowShorthands: !0 });
        if (void 0 !== n) return { '*': n };
        const d = {},
          p = e.split(',').filter((e) => '' !== e.trim());
        for (const g of p) {
          var h, y;
          const e = g.split('=', 2);
          if (2 !== e.length) continue;
          var _;
          const n =
            null !==
              (_ = null === (h = e[0]) || void 0 === h ? void 0 : h.trim()) &&
            void 0 !== _
              ? _
              : '';
          var m;
          const p = getLoggingLevel(
            null !==
              (m = null === (y = e[1]) || void 0 === y ? void 0 : y.trim()) &&
              void 0 !== m
              ? m
              : '',
            { allowShorthands: !0 },
          );
          '' !== n && void 0 !== p && (d[n] = p);
        }
        return d;
      })(e),
    );
  }
  function clearLoggingLevels() {
    He.setLevel(Ve),
      (function (e, n = { includeRoot: !0 }) {
        walk(e, function (e) {
          (void 0 !== e.parent || n.includeRoot) && e.clearLevel();
        });
      })(He, { includeRoot: !1 });
  }
  function setConsoleOutput(e) {
    He.handlers.console.enabled = null != e && e;
  }
  function setRootLoggingLevel(e) {
    var n;
    Ve = null !== (n = getLoggingLevel(e)) && void 0 !== n ? n : Ve;
  }
  const qe = {
    getLogger: (e = '*') => He.getByNamespace(null != e ? e : '*'),
    setConsoleOutput(e) {
      !0 === e
        ? (Ke.enable(),
          setConsoleOutput(!0),
          He.info('Console output is enabled with level ' + He.levelName))
        : (Ke.disable(), setConsoleOutput(!1));
    },
    setLoggingLevels(e, n) {
      '' !== e.trim()
        ? (Fe.set(e),
          applyLoggingLevels(e),
          qe.setConsoleOutput(null == n || n))
        : qe.clearLoggingLevels(null != n && n);
    },
    clearLoggingLevels(e = !1) {
      qe.setConsoleOutput(e), Fe.clear(), clearLoggingLevels();
    },
  };
  var We;
  Ke.enabled && qe.setConsoleOutput(Ke.enabled),
    void 0 !== Fe.value && qe.setLoggingLevels(Fe.value, Ke.enabled),
    (function (e) {
      (e.NONE = 'none'),
        (e.FAIRPLAY = 'com.apple.fps'),
        (e.PLAYREADY = 'com.microsoft.playready'),
        (e.WIDEVINE = 'com.widevine.alpha');
    })(We || (We = {}));
  const Ye = { app: {}, features: {}, urls: {} },
    ze = 'mk-player-tsid',
    Qe = 'audio/mp4;codecs="mp4a.40.2"';
  var Je, Xe, Ze;
  function asyncGeneratorStep$1b(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1b(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1b(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1b(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function findMediaKeySystemAccess(e, n) {
    return _findMediaKeySystemAccess.apply(this, arguments);
  }
  function _findMediaKeySystemAccess() {
    return (_findMediaKeySystemAccess = _async_to_generator$1b(
      function* (e, n) {
        for (let d = 0; d < e.length; d++)
          try {
            const p = e[d];
            return [p, yield navigator.requestMediaKeySystemAccess(p, n)];
          } catch (Ut) {}
        return [];
      },
    )).apply(this, arguments);
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
  })(Je || (Je = {})),
    (function (e) {
      (e.MP4 = 'audio/mp4'), (e.AVC1 = 'video/mp4');
    })(Xe || (Xe = {})),
    (function (e) {
      (e.WIDEVINE = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'),
        (e.PLAYREADY = 'com.microsoft.playready'),
        (e.FAIRPLAY = 'com.apple.streamingkeydelivery');
    })(Ze || (Ze = {}));
  let et;
  const { NONE: tt, FAIRPLAY: rt, WIDEVINE: it, PLAYREADY: nt } = We;
  function supportsDrm() {
    if (!et) throw new Error('findKeySystemPreference has not been invoked');
    return et !== tt;
  }
  function potentialKeySystemsForAccess() {
    return (function () {
      const e = getSessionStorage();
      return !!e && 'true' === e.getItem('mk-playready-cbcs-unsupported');
    })()
      ? [it]
      : Ye.features['prefer-playready']
        ? [nt, it]
        : [it, nt];
  }
  function findKeySystemPreference(e) {
    return _findKeySystemPreference.apply(this, arguments);
  }
  function _findKeySystemPreference() {
    return (_findKeySystemPreference = _async_to_generator$1b(function* (e) {
      var n, d, p, h;
      if (
        null ===
          (h =
            null === (n = e) || void 0 === n ? void 0 : n.isNodeEnvironment) ||
        void 0 === h ||
        !h
      ) {
        if (
          null === (d = window.WebKitMediaKeys) || void 0 === d
            ? void 0
            : d.isTypeSupported(rt + '.1_0', Xe.AVC1)
        )
          et = rt;
        else if (
          null === (p = window.MSMediaKeys) || void 0 === p
            ? void 0
            : p.isTypeSupported(nt, Xe.AVC1)
        )
          et = nt;
        else {
          const e = document.createElement('video');
          if (
            hasMediaKeySupport() &&
            e.canPlayType('video/mp4;codecs="avc1.42E01E"') &&
            e.canPlayType(Qe)
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
                  audioCapabilities: [{ contentType: Qe }],
                },
              ],
              n = potentialKeySystemsForAccess(),
              [d] = yield findMediaKeySystemAccess(n, e);
            et = d;
          }
        }
        return (et = null != et ? et : tt), et;
      }
      et = tt;
    })).apply(this, arguments);
  }
  function hasMediaKeySupport() {
    return !!(
      navigator &&
      navigator.requestMediaKeySystemAccess &&
      window.MediaKeys &&
      window.MediaKeySystemAccess
    );
  }
  function parseVersion(e) {
    const n = { version: e.toLowerCase() },
      d = e
        .toLowerCase()
        .split('.')
        .filter((e) => !!e);
    if (d.length <= 1 && !/^\d+$/.test(d[0])) return n;
    const p = parseInt(d[0], 10),
      h = parseInt(d[1], 10),
      y = parseInt(d[2], 10);
    return (
      Number.isNaN(p) ||
        ((n.major = p),
        Number.isNaN(h) || (n.minor = h),
        Number.isNaN(y) || (n.patch = y)),
      n
    );
  }
  function applyRules(e, n, d) {
    const { userAgent: p } = null != n ? n : {};
    if ('string' != typeof p || '' === p.trim()) return d;
    for (let h of e) {
      const e = h.slice(0, -1),
        y = h[h.length - 1];
      let _ = null;
      for (let h of e)
        if (((_ = p.match(h)), null !== _)) {
          Object.assign(d, y(_, n, d));
          break;
        }
      if (null !== _) break;
    }
    return d;
  }
  function _define_property$1H(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$I(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1H(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$s(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var ot, at;
  const st = {
    browser: [
      [
        /^(itunes|music|tv)\/([\w\.]+)\s/i,
        (e) =>
          _object_spread_props$s(
            _object_spread$I(
              {
                name: 'webview',
                variant: e[1]
                  .trim()
                  .toLowerCase()
                  .replace(/(music|tv)/i, '$1.app'),
              },
              parseVersion(e[2]),
            ),
            { mobile: !1 },
          ),
      ],
      [
        /(?:(?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
        (e) =>
          _object_spread$I(
            { name: 'webview', variant: 'facebook', mobile: !0 },
            parseVersion(e[1]),
          ),
      ],
      [
        /(instagram|snapchat)[\/ ]([-\w\.]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'webview', variant: e[1].trim().toLowerCase(), mobile: !0 },
            parseVersion(e[2]),
          ),
      ],
      [
        /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'webview', variant: 'tiktok', mobile: !0 },
            parseVersion(e[1]),
          ),
      ],
      [/twitter/i, () => ({ name: 'webview', variant: 'twitter', mobile: !0 })],
      [
        / wv\).+?(?:version|chrome)\/([\w\.]+)/i,
        (e) =>
          _object_spread$I({ name: 'webview', mobile: !0 }, parseVersion(e[1])),
      ],
      [
        /electron\/([\w\.]+) safari/i,
        (e) =>
          _object_spread$I(
            { name: 'electron', mobile: !1 },
            parseVersion(e[1]),
          ),
      ],
      [
        /tesla\/(.*?(20\d\d\.([-\w\.])+))/i,
        (e) =>
          _object_spread_props$s(
            _object_spread$I(
              { name: 'other', variant: 'tesla', mobile: !1 },
              parseVersion(e[2]),
            ),
            { version: e[1] },
          ),
      ],
      [
        /(samsung|huawei)browser\/([-\w\.]+)/i,
        (e) =>
          _object_spread$I(
            {
              name: 'other',
              variant: e[1]
                .trim()
                .toLowerCase()
                .replace(/browser/i, ''),
              mobile: !0,
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /yabrowser\/([-\w\.]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'other', variant: 'yandex', mobile: !1 },
            parseVersion(e[1]),
          ),
      ],
      [
        /(brave|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
        (e, { userAgent: n }) =>
          _object_spread$I(
            {
              name: 'other',
              variant: e[1].trim().toLowerCase(),
              mobile: /mobile/i.test(n),
            },
            parseVersion(e[2].replace(/\-/g, '.')),
          ),
      ],
      [
        /edg(e|ios|a)?\/([\w\.]+)/i,
        (e) =>
          _object_spread$I(
            {
              name: 'edge',
              mobile: /(edgios|edga)/i.test(
                null !== (ot = e[1]) && void 0 !== ot ? ot : '',
              ),
            },
            parseVersion(e[2]),
          ),
      ],
      [
        /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i,
        (e) => _object_spread$I({ name: 'ie', mobile: !1 }, parseVersion(e[1])),
      ],
      [
        /opr\/([\w\.]+)/i,
        /opera mini\/([-\w\.]+)/i,
        /opera [mobiletab]{3,6}\b.+version\/([-\w\.]+)/i,
        /opera(?:.+version\/|[\/ ]+)([\w\.]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'opera', mobile: /mobile/i.test(e[0]) },
            parseVersion(e[1]),
          ),
      ],
      [
        /headlesschrome(?:\/([\w\.]+)| )/i,
        (e) =>
          _object_spread$I(
            { name: 'chrome', variant: 'headless', mobile: !1 },
            parseVersion(e[1]),
          ),
      ],
      [
        /\b(?:crmo|crios)\/([\w\.]+)/i,
        (e) =>
          _object_spread$I({ name: 'chrome', mobile: !0 }, parseVersion(e[1])),
      ],
      [
        /chrome(?: browser)?\/v?([\w\.]+)( mobile)?/i,
        (e) =>
          _object_spread$I(
            {
              name: 'chrome',
              mobile: /mobile/i.test(
                null !== (at = e[2]) && void 0 !== at ? at : '',
              ),
            },
            parseVersion(e[1]),
          ),
      ],
      [
        /\bfocus\/([\w\.]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'firefox', variant: 'focus', mobile: !0 },
            parseVersion(e[1]),
          ),
      ],
      [
        /fxios\/([\w\.-]+)/i,
        /(?:mobile|tablet);.*(?:firefox)\/([\w\.-]+)/i,
        (e) =>
          _object_spread$I({ name: 'firefox', mobile: !0 }, parseVersion(e[1])),
      ],
      [
        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'firefox', variant: e[1].trim().toLowerCase(), mobile: !1 },
            parseVersion(e[2]),
          ),
      ],
      [
        /(?:firefox)\/([\w\.]+)/i,
        /(?:mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
        (e) =>
          _object_spread$I({ name: 'firefox', mobile: !1 }, parseVersion(e[1])),
      ],
      [
        /version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i,
        /version\/([\w\.\,]+) .*(safari)/i,
        /webkit.+?(?:mobile ?safari|safari)(?:\/([\w\.]+))/i,
        (e) =>
          _object_spread$I(
            { name: 'safari', mobile: /mobile/i.test(e[0]) },
            parseVersion(e[1]),
          ),
      ],
    ],
    engine: [
      [
        /webkit\/(?:537\.36).+chrome\/(?!27)([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'blink' }, parseVersion(e[1])),
      ],
      [
        /windows.+ edge\/([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'blink' }, parseVersion(e[1])),
      ],
      [
        /presto\/([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'presto' }, parseVersion(e[2])),
      ],
      [
        /trident\/([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'trident' }, parseVersion(e[1])),
      ],
      [
        /gecko\/([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'gecko' }, parseVersion(e[1])),
      ],
      [
        /(khtml|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'other' }, parseVersion(e[2])),
      ],
      [
        /webkit\/([\w\.]+)/i,
        (e) => _object_spread$I({ name: 'webkit' }, parseVersion(e[1])),
      ],
    ],
    os: [
      [
        /microsoft windows (vista|xp)/i,
        /windows nt 6\.2; (arm)/i,
        /windows (?:phone(?: os)?|mobile)[\/ ]?([\d\.\w ]*)/i,
        /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
        /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
        (e) => _object_spread$I({ name: 'windows' }, parseVersion(e[1])),
      ],
      [
        /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
        /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'ios' },
            parseVersion(e[1].replace(/_/g, '.')),
          ),
      ],
      [
        /mac(?:intosh;?)? os x ?([\d\._]+)/i,
        (e) =>
          _object_spread$I(
            { name: 'macos' },
            parseVersion(e[1].replace(/_/g, '.')),
          ),
      ],
      [
        /cros [\w]+(?:\)| ([\w\.]+)\b)/i,
        (e) => _object_spread$I({ name: 'chromeos' }, parseVersion(e[1])),
      ],
      [
        /(?:android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
        /droid ([\w\.]+|[\d+])\b.+(android[- ]x86|harmonyos)/i,
        (e) => _object_spread$I({ name: 'android' }, parseVersion(e[1])),
      ],
      [/linux/i, () => ({ name: 'linux' })],
    ],
  };
  function parseUserAgent(e, n) {
    var d, p, h;
    var y;
    return (function (e, n) {
      let d = e;
      for (let p of n) d = p(d);
      return d;
    })(
      {
        navigator: e,
        ua:
          null !==
            (h = null === (d = e) || void 0 === d ? void 0 : d.userAgent) &&
          void 0 !== h
            ? h
            : '',
        extensions: [],
        browser: applyRules(st.browser, e, { name: 'unknown', mobile: !1 }),
        engine: applyRules(st.engine, e, { name: 'unknown' }),
        os: applyRules(st.os, e, { name: 'unknown' }),
      },
      null !== (y = null === (p = n) || void 0 === p ? void 0 : p.extensions) &&
        void 0 !== y
        ? y
        : [],
    );
  }
  function _define_property$1G(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$H(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1G(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$r(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function flagsExtension(e) {
    let n = e.os.name;
    const d = 'android' === e.os.name;
    let p = 'macos' === e.os.name,
      h = 'ios' === e.os.name;
    var y;
    const _ =
      'ipados' === n ||
      (h && /ipad/i.test(e.ua)) ||
      (p &&
        (null !== (y = e.navigator.maxTouchPoints) && void 0 !== y ? y : 0) >=
          2);
    _ && ((n = 'ipados'), (h = !1), (p = !1));
    const m = _object_spread_props$r(_object_spread$H({}, e.browser), {
        isUnknown: 'unknown' === e.browser.name,
        isSafari: 'safari' === e.browser.name,
        isChrome: 'chrome' === e.browser.name,
        isFirefox: 'firefox' === e.browser.name,
        isEdge: 'edge' === e.browser.name,
        isWebView: 'webview' === e.browser.name,
        isOther: 'other' === e.browser.name,
        isMobile: e.browser.mobile || h || _ || d || !1,
      }),
      g = _object_spread_props$r(_object_spread$H({}, e.engine), {
        isUnknown: 'unknown' === e.engine.name,
        isWebKit: 'webkit' === e.engine.name,
        isBlink: 'blink' === e.engine.name,
        isGecko: 'gecko' === e.engine.name,
      }),
      b = _object_spread_props$r(_object_spread$H({}, e.os), {
        name: n,
        isUnknown: 'unknown' === e.os.name,
        isLinux: 'linux' === e.os.name,
        isWindows: 'windows' === e.os.name,
        isMacOS: p,
        isAndroid: d,
        isIOS: h,
        isIPadOS: _,
      });
    return _object_spread_props$r(_object_spread$H({}, e), {
      extensions: [...e.extensions, 'flags'],
      browser: m,
      os: b,
      engine: g,
    });
  }
  function asyncGeneratorStep$1a(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1a(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1a(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1a(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function isBrowserEnvironment() {
    return _isBrowserEnvironment.apply(this, arguments);
  }
  function _isBrowserEnvironment() {
    return (_isBrowserEnvironment = _async_to_generator$1a(function* () {
      var e;
      return (
        void 0 !==
        (null === (e = window) || void 0 === e ? void 0 : e.navigator)
      );
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$19(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$19(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$19(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$19(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function isNodeEnvironment() {
    return _isNodeEnvironment.apply(this, arguments);
  }
  function _isNodeEnvironment() {
    return (_isNodeEnvironment = _async_to_generator$19(function* () {
      var e;
      return (
        void 0 !==
        (null === (e = globalThis) || void 0 === e ? void 0 : e.process)
      );
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$18(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$18(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$18(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$18(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  const ct = {
    playready: ['com.microsoft.playready', 'com.youtube.playready'],
    widevine: ['com.widevine.alpha'],
    clearkey: ['org.w3.clearkey'],
    fairplay: ['com.apple.fps', 'com.apple.fairplay'],
  };
  function detectEMESupport() {
    return _detectEMESupport.apply(this, arguments);
  }
  function _detectEMESupport() {
    return (_detectEMESupport = _async_to_generator$18(function* () {
      var e, n, d, p;
      return (
        void 0 !==
          (null === (n = window) ||
          void 0 === n ||
          null === (e = n.navigator) ||
          void 0 === e
            ? void 0
            : e.requestMediaKeySystemAccess) &&
        void 0 !==
          (null === (d = window) || void 0 === d ? void 0 : d.MediaKeys) &&
        void 0 !==
          (null === (p = window) || void 0 === p
            ? void 0
            : p.MediaKeySystemAccess)
      );
    })).apply(this, arguments);
  }
  function detectEMEKeySystems() {
    return _detectEMEKeySystems.apply(this, arguments);
  }
  function _detectEMEKeySystems() {
    return (_detectEMEKeySystems = _async_to_generator$18(function* () {
      var e, n;
      if (yield isNodeEnvironment()) return [];
      const d = [],
        p = window;
      if (
        'function' ==
        typeof (null === (e = p.WebKitMediaKeys) || void 0 === e
          ? void 0
          : e.isTypeSupported)
      )
        for (let _ of ct.fairplay) {
          var h, y;
          if (
            (null === (h = p.WebKitMediaKeys) || void 0 === h
              ? void 0
              : h.isTypeSupported(_, 'video/mp4')) ||
            (null === (y = p.WebKitMediaKeys) || void 0 === y
              ? void 0
              : y.isTypeSupported(_ + '.1_0', 'video/mp4'))
          )
            return d.push('fairplay'), d;
        }
      if (
        'function' ==
        typeof (null === (n = p.MSMediaKeys) || void 0 === n
          ? void 0
          : n.isTypeSupported)
      )
        for (let _ of ct.playready)
          p.MSMediaKeys.isTypeSupported(_, 'video/mp4') && d.push('playready');
      if (yield detectEMESupport()) {
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
        ];
        for (let [n, p] of Object.entries(ct))
          for (let h of p)
            try {
              yield navigator.requestMediaKeySystemAccess(h, e), d.push(n);
              break;
            } catch (Ut) {}
      }
      return d;
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$17(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$17(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$17(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$17(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function detectES2015() {
    return _detectES2015.apply(this, arguments);
  }
  function _detectES2015() {
    return (_detectES2015 = _async_to_generator$17(function* () {
      try {
        new Function(
          '"use strict"; class Test {}; const identity = (x) => x;',
        )();
      } catch (Ut) {
        return !1;
      }
      return 'undefined' != typeof Symbol;
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$16(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$16(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$16(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$16(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function detectMSESupport() {
    return _detectMSESupport.apply(this, arguments);
  }
  function _detectMSESupport() {
    return (_detectMSESupport = _async_to_generator$16(function* () {
      var e, n;
      return (
        void 0 !==
          (null === (e = window) || void 0 === e ? void 0 : e.MediaSource) &&
        void 0 !==
          (null === (n = window) || void 0 === n ? void 0 : n.SourceBuffer)
      );
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$15(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$15(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$15(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$15(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function detectPictureInPictureSupport() {
    return _detectPictureInPictureSupport.apply(this, arguments);
  }
  function _detectPictureInPictureSupport() {
    return (_detectPictureInPictureSupport = _async_to_generator$15(
      function* () {
        var e, n, d;
        if (yield isNodeEnvironment()) return !1;
        const p = document.createElement('video');
        return (
          (void 0 !==
            (null === (e = p) || void 0 === e
              ? void 0
              : e.webkitSupportsPresentationMode) &&
            'function' ==
              typeof (null === (n = p) || void 0 === n
                ? void 0
                : n.webkitSetPresentationMode)) ||
          void 0 !==
            (null === (d = document) || void 0 === d
              ? void 0
              : d.pictureInPictureEnabled)
        );
      },
    )).apply(this, arguments);
  }
  function asyncGeneratorStep$14(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1F(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class RuntimeEnvironment {
    get isConfigured() {
      return this.configured;
    }
    get userAgent() {
      return this.config.userAgent;
    }
    get ua() {
      return this.userAgent.ua;
    }
    get isNodeEnvironment() {
      return this.config.isNodeEnvironment;
    }
    get isBrowserEnvironment() {
      return this.config.isBrowserEnvironment;
    }
    get isPictureInPictureSupported() {
      return this.config.isPictureInPictureSupported;
    }
    get isES2015Supported() {
      return this.config.isES2015Supported;
    }
    get isMSESupported() {
      return this.config.isMSESupported;
    }
    get isEMESupported() {
      return this.config.isEMESupported;
    }
    get availableKeySystems() {
      return this.config.availableKeySystems;
    }
    get browser() {
      return this.userAgent.browser;
    }
    get engine() {
      return this.userAgent.engine;
    }
    get os() {
      return this.userAgent.os;
    }
    get isMobile() {
      return this.browser.isMobile;
    }
    static detect() {
      var e,
        n = this;
      return ((e = function* () {
        var e, d;
        const p =
          null !==
            (d =
              null === (e = window) || void 0 === e ? void 0 : e.navigator) &&
          void 0 !== d
            ? d
            : { userAgent: '', maxTouchPoints: 0 };
        return new n({
          userAgent: yield parseUserAgent(p, { extensions: [flagsExtension] }),
          isNodeEnvironment: yield isNodeEnvironment(),
          isBrowserEnvironment: yield isBrowserEnvironment(),
          isPictureInPictureSupported: yield detectPictureInPictureSupport(),
          isES2015Supported: yield detectES2015(),
          isMSESupported: yield detectMSESupport(),
          isEMESupported: yield detectEMESupport(),
          availableKeySystems: yield detectEMEKeySystems(),
        });
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);
          function _next(e) {
            asyncGeneratorStep$14(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$14(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    configure(e) {
      for (const [n, d] of Object.entries(this.filterConfig(e)))
        this.config[n] = d;
      this.configured = !0;
    }
    filterConfig(e) {
      const n = [
          'userAgent',
          'isNodeEnvironment',
          'isBrowserEnvironment',
          'isES2015Supported',
          'isPictureInPictureSupported',
          'availableKeySystems',
        ],
        d = {};
      for (const [p, h] of Object.entries(e))
        void 0 !== h && n.includes(p) && (d[p] = h);
      return d;
    }
    constructor(e) {
      _define_property$1F(this, 'configured', !1),
        _define_property$1F(this, 'config', void 0),
        (this.config = this.filterConfig(e)),
        (this.configured = !0);
    }
  }
  const AsyncDebounce =
      (e = 100, n) =>
      (d, p, h) => {
        const y = h.value,
          _ = asyncDebounce(y, e, n);
        h.value = _;
      },
    asyncDebounce = (e, n = 250, d = { isImmediate: !1 }) => {
      let p, h;
      function fulfill(e) {
        var n;
        return null === (n = e) || void 0 === n
          ? void 0
          : n.resolve(d.cancelledValue);
      }
      const clearLastPromise = () => {
          p &&
            (p.resolved ||
              (fulfill(p), p.timeoutId && clearTimeout(p.timeoutId)),
            (p = void 0));
        },
        invokeFn = (n, d, h, y) => {
          e.apply(n, y)
            .then((e) => {
              d(e), p && (p.resolved = !0);
            })
            .catch(h);
        };
      return d.isImmediate
        ? function (...e) {
            const d = Date.now(),
              y = this;
            return (
              h && d >= h && clearLastPromise(),
              (h = Date.now() + n),
              p
                ? fulfill(Promise)
                : new Promise((n, d) => {
                    (p = { resolve: n, reject: d }), invokeFn(y, n, d, e);
                  })
            );
          }
        : function (...e) {
            const d = this;
            return (
              p && clearLastPromise(),
              new Promise(function (h, y) {
                const _ = setTimeout(invokeFn.bind(void 0, d, h, y, e), n);
                p = { resolve: h, reject: y, timeoutId: _ };
              })
            );
          };
    },
    dt = {
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
    };
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
            return e.$$typeof === lt;
          })(e)
        );
      })(e)
    );
  };
  let lt =
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
      })(e),
    );
  }
  function mergeObject(e, n, d) {
    let p = {};
    return (
      d.isMergeableObject(e) &&
        getKeys(e).forEach(function (n) {
          p[n] = cloneUnlessOtherwiseSpecified(e[n], d);
        }),
      getKeys(n).forEach(function (h) {
        d.isMergeableObject(n[h]) && e[h]
          ? (p[h] = (function (e, n) {
              if (!n.customMerge) return deepmerge;
              let d = n.customMerge(e);
              return 'function' == typeof d ? d : deepmerge;
            })(h, d)(e[h], n[h], d))
          : (p[h] = cloneUnlessOtherwiseSpecified(n[h], d));
      }),
      p
    );
  }
  function deepmerge(e, n, d) {
    ((d = d || {}).arrayMerge = d.arrayMerge || defaultArrayMerge),
      (d.isMergeableObject = d.isMergeableObject || isMergeableObject);
    let p = Array.isArray(n);
    return p === Array.isArray(e)
      ? p
        ? d.arrayMerge(e, n, d)
        : mergeObject(e, n, d)
      : cloneUnlessOtherwiseSpecified(n, d);
  }
  function _define_property$1E(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$G(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1E(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$q(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _object_without_properties$4(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  var ut;
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
    })(ut || (ut = {}));
  const isDataRecord = (e) =>
    !(
      !e ||
      'function' != typeof e.hasAttributes ||
      'function' != typeof e.hasRelationships ||
      'function' != typeof e.hasViews ||
      'function' != typeof e.serialize
    );
  class DataRecord {
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
      const p = { id: this.id, type: this.type };
      return n[`${this.type}-${this.id}`] && !d.allowFullDuplicateSerializations
        ? p
        : ((n[`${this.type}-${this.id}`] = !0),
          this.hasAttributes() &&
            (p.attributes = this._mjs.attributes.reduce(
              (e, n) => ((e[n] = this[n]), e),
              {},
            )),
          this._mjs.relationships.length > 0 &&
            (p.relationships = this._serializeRelatedData(
              this._mjs.relationships,
              n,
              d,
            )),
          this._mjs.views.length > 0 &&
            (p.views = this._serializeRelatedData(this._mjs.views, n, d)),
          e ? { data: p } : p);
    }
    setProperty(e, n, d = 'attributes', p = {}) {
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
                }),
              ),
            )
          : 'relationships' === d &&
              Array.isArray(this[e]) &&
              p.extendRelationships
            ? Object.defineProperty(
                this,
                e,
                setDescriptor(
                  deepmerge(this[e], n, {
                    isMergeableObject: isMergeableObject,
                  }),
                ),
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
      return e.reduce((e, p) => {
        if (d.excludeRelationships && d.excludeRelationships.has(p)) return e;
        if (d.includeRelationships && !d.includeRelationships.has(p)) return e;
        const h = this[p];
        return (
          Array.isArray(h)
            ? (e[p] = {
                data: h.map((e) =>
                  'function' == typeof e.serialize ? e.serialize(!1, n, d) : e,
                ),
              })
            : (e[p] =
                h && 'function' == typeof h.serialize
                  ? h.serialize(!1, n, d)
                  : h),
          e
        );
      }, {});
    }
    constructor(e, n, d = {}) {
      _define_property$1E(this, 'type', void 0),
        _define_property$1E(this, 'id', void 0),
        _define_property$1E(this, '_mjs', void 0),
        _define_property$1E(this, '_meta', void 0),
        (this.type = e),
        (this.id = n),
        (this._mjs = { attributes: [], relationships: [], views: [] }),
        (this._meta = {}),
        (this._mjs = _object_spread$G({}, this._mjs, d));
    }
  }
  class DataStore extends Notifications {
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
          const p = this._records[e][n];
          if (p && p.hasProperties(d)) return p;
        });
      const p = this._records[e][n];
      return p && p.hasProperties(d) ? p : null;
    }
    populateDataRecords(e, n = {}, d = {}) {
      if (!e.data) return [];
      if (!Array.isArray(e.data)) return this.populateDataRecord(e.data, n, d);
      const p = [];
      return (
        e.data.forEach((e, h) => {
          const y = _object_spread_props$q(_object_spread$G({}, d), {
            parents: d.parents
              ? [
                  _object_spread_props$q(_object_spread$G({}, d.parents[0]), {
                    position: h,
                  }),
                ]
              : [],
          });
          d.parents && (d.parents[0].position = h);
          const _ = this.populateDataRecord(e, n, y);
          p.push(_);
        }),
        p
      );
    }
    populateDataRecord(e, n = {}, d) {
      const p = d.filter || this.filter,
        h = d.mapping || this.mapping;
      if (p && !p(e)) return;
      if (h) {
        let n = 'function' == typeof h ? h(e) : transform$8(h, e);
        Object.assign(e, n);
      }
      this._shouldDisableRecordReuse && (n = {});
      const y = this._materializeRecord(
        n,
        _object_spread$G({ id: e.id, type: e.type }, d),
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
          Object.keys(e.relationships).forEach((p) => {
            let _ = e.relationships[p];
            _ &&
              'data' in _ &&
              ((_ = this.populateDataRecords(_, n, {
                mapping: h,
                parents: [
                  { relationshipName: p, parentType: y.type, parentId: y.id },
                ],
              })),
              y.setProperty(p, _, 'relationships', d));
          }),
        'object' == typeof e.views &&
          Object.keys(e.views).forEach((d) => {
            const p = e.views[d];
            if (p.attributes || p.data) {
              const e = new DataRecord('view', d);
              if ((this._populateDataAttributes(p, e), p.data)) {
                const d = this.populateDataRecords(p, n, h);
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
          ? (includeRecord = (d) => {
              var p;
              return (null === (p = d) || void 0 === p ? void 0 : p[e]) === n;
            })
          : 'function' == typeof e
            ? (includeRecord = (n) => {
                try {
                  return e(n);
                } catch (Ut) {
                  return !1;
                }
              })
            : 'object' == typeof e &&
              (includeRecord = (n) => {
                const d = Object.keys(e);
                let p = 0;
                return (
                  d.forEach((d) => {
                    var h;
                    (null === (h = n) || void 0 === h ? void 0 : h[d]) ===
                      e[d] && p++;
                  }),
                  d.length === p
                );
              }),
        Object.values(this._records).reduce(
          (e, n) => (
            Object.values(n).forEach((n) => {
              includeRecord(n) && e.push(n);
            }),
            e
          ),
          [],
        )
      );
    }
    remove(e, n) {
      setTimeout(this._checkForExpiredRecords.bind(this), 0);
      if (!hasOwn(this._records, e)) return;
      const d = this.peek(e, n);
      d &&
        (this.dispatchEvent(ut.dataRecordWillDelete, [e, n]),
        d._mjs.parents &&
          d._mjs.parents.length > 0 &&
          d._mjs.parents.forEach(
            ({ relationshipName: e, parentType: n, parentId: p }) => {
              this.peek(n, p).removeRelative(e, d.id);
            },
          ),
        delete this._records[e][n],
        this.dispatchEvent(ut.dataRecordDidDelete, [e, n]));
    }
    save(e, n = {}) {
      return (
        setTimeout(this._checkForExpiredRecords.bind(this), 0),
        this.populateDataRecords(e, this._records, n)
      );
    }
    _populateDataAttributes(e, n) {
      'object' == typeof e.attributes &&
        (this.dispatchEvent(ut.dataRecordWillPopulate, [n.type, n.id]),
        Object.keys(e.attributes).forEach((d) => {
          n.setProperty(d, e.attributes[d], 'attributes');
        }),
        this.dispatchEvent(ut.dataRecordDidPopulate, [n.type, n.id]));
    }
    _materializeRecord(e, n) {
      const { type: d, id: p } = n,
        h = _object_without_properties$4(n, ['type', 'id']);
      return (
        (e[d] = e[d] || {}),
        e[d][p]
          ? e[d][p].setParent(h.parents || [])
          : (e[d][p] = new DataRecord(d, p, h)),
        this.dispatchEvent(ut.dataRecordDidMaterialize, [d, p]),
        e[d][p]
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
    constructor(e = {}) {
      super([
        ut.dataRecordDidDelete,
        ut.dataRecordWillDelete,
        ut.dataRecordDidMaterialize,
        ut.dataRecordWillPopulate,
        ut.dataRecordDidPopulate,
      ]),
        _define_property$1E(this, '_records', void 0),
        _define_property$1E(this, '_expiryRecords', void 0),
        _define_property$1E(this, '_mapping', void 0),
        _define_property$1E(this, '_removeOnExpiration', !1),
        _define_property$1E(this, '_shouldDisableRecordReuse', !0),
        _define_property$1E(this, 'filter', void 0),
        (this._records = {}),
        (this._expiryRecords = new Set()),
        (this._removeOnExpiration = !!e.removeOnExpiration),
        (this._mapping = e.mapping),
        (this._shouldDisableRecordReuse = !!e.shouldDisableRecordReuse),
        (this.filter = e.filter);
    }
  }
  const pt = {
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
        for (const p in d)
          if (d[p] === n) {
            delete d[p];
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
    constructor() {
      var e, n, d;
      (d = {}),
        (n = 'events') in (e = this)
          ? Object.defineProperty(e, n, {
              value: d,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[n] = d);
    }
  }
  function asyncGeneratorStep$13(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$13(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$13(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$13(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  const ht = {},
    SerialAsync = (e) => {
      let n = Promise.resolve();
      return (d, p, h) => {
        const y = h.value;
        return (
          (h.value = _async_to_generator$13(function* (...d) {
            return (
              e &&
                (n = ((e) => {
                  let n = ht[e];
                  return n || ((n = Promise.resolve()), (ht[e] = n)), n;
                })(e)),
              (n = n.catch(() => {}).then(() => y.apply(this, d))),
              e && (ht[e] = n),
              n
            );
          })),
          h
        );
      };
    };
  var yt, _t, ft;
  (e.PlaybackBitrate = void 0),
    ((yt = e.PlaybackBitrate || (e.PlaybackBitrate = {}))[(yt.STANDARD = 64)] =
      'STANDARD'),
    (yt[(yt.HIGH = 256)] = 'HIGH'),
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
    })(_t || (_t = {})),
    (function (e) {
      (e[(e.ACCURATE = 0)] = 'ACCURATE'), (e[(e.ROUND = 1)] = 'ROUND');
    })(ft || (ft = {}));
  class TimingAccuracy {
    time(e = 0) {
      return this.mode === ft.ROUND ? Math.round(e) : e;
    }
    constructor(e = !1) {
      var n, d, p;
      (p = void 0),
        (d = 'mode') in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p),
        (this.mode = e ? ft.ACCURATE : ft.ROUND);
    }
  }
  const vt = {
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
  function _define_property$1B(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class BitrateCalculator {
    get bitrate() {
      return this._bitrate;
    }
    set bitrate(e) {
      this._bitrate !== e &&
        ((this._bitrate = e),
        this._dispatcher.publish(vt.playbackBitrateDidChange, { bitrate: e }));
    }
    _calculateAverageDownlink() {
      return 0 === this._downlinkSamples.length
        ? 0
        : this._downlinkSamples.reduce((e, n) => e + n, 0) /
            this._downlinkSamples.length || 0;
    }
    _recalculateBitrate(n) {
      je.debug('_recalculateBitrate', n), this._downlinkSamples.push(n);
      this._calculateAverageDownlink() > e.PlaybackBitrate.STANDARD
        ? (je.debug('setting bitrate to', e.PlaybackBitrate.HIGH),
          (this.bitrate = e.PlaybackBitrate.HIGH))
        : (je.debug('setting bitrate to', e.PlaybackBitrate.STANDARD),
          (this.bitrate = e.PlaybackBitrate.STANDARD));
    }
    constructor(n, d = e.PlaybackBitrate.STANDARD) {
      var p, h, y;
      _define_property$1B(this, '_bitrate', void 0),
        _define_property$1B(this, '_dispatcher', void 0),
        _define_property$1B(this, '_downlinkSamples', []),
        (this._bitrate = d),
        (this._dispatcher = n),
        void 0 !==
          (null === (y = window) ||
          void 0 === y ||
          null === (h = y.navigator) ||
          void 0 === h ||
          null === (p = h.connection) ||
          void 0 === p
            ? void 0
            : p.downlink) &&
          this._recalculateBitrate(
            100 * (window.navigator.connection.downlink || 0),
          );
    }
  }
  var mt, gt, bt, St, Pt, Et, Tt;
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
  })(mt || (mt = {})),
    (function (e) {
      (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.RADIO = 1)] = 'RADIO'),
        (e[(e.PLAYLIST = 2)] = 'PLAYLIST'),
        (e[(e.ALBUM = 3)] = 'ALBUM'),
        (e[(e.ARTIST = 4)] = 'ARTIST');
    })(gt || (gt = {})),
    (e.PlayActivityEndReasonType = void 0),
    ((bt = e.PlayActivityEndReasonType || (e.PlayActivityEndReasonType = {}))[
      (bt.NOT_APPLICABLE = 0)
    ] = 'NOT_APPLICABLE'),
    (bt[(bt.OTHER = 1)] = 'OTHER'),
    (bt[(bt.TRACK_SKIPPED_FORWARDS = 2)] = 'TRACK_SKIPPED_FORWARDS'),
    (bt[(bt.PLAYBACK_MANUALLY_PAUSED = 3)] = 'PLAYBACK_MANUALLY_PAUSED'),
    (bt[(bt.PLAYBACK_SUSPENDED = 4)] = 'PLAYBACK_SUSPENDED'),
    (bt[(bt.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM = 5)] =
      'MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM'),
    (bt[(bt.PLAYBACK_PAUSED_DUE_TO_INACTIVITY = 6)] =
      'PLAYBACK_PAUSED_DUE_TO_INACTIVITY'),
    (bt[(bt.NATURAL_END_OF_TRACK = 7)] = 'NATURAL_END_OF_TRACK'),
    (bt[(bt.PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT = 8)] =
      'PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT'),
    (bt[(bt.TRACK_BANNED = 9)] = 'TRACK_BANNED'),
    (bt[(bt.FAILED_TO_LOAD = 10)] = 'FAILED_TO_LOAD'),
    (bt[(bt.PAUSED_ON_TIMEOUT = 11)] = 'PAUSED_ON_TIMEOUT'),
    (bt[(bt.SCRUB_BEGIN = 12)] = 'SCRUB_BEGIN'),
    (bt[(bt.SCRUB_END = 13)] = 'SCRUB_END'),
    (bt[(bt.TRACK_SKIPPED_BACKWARDS = 14)] = 'TRACK_SKIPPED_BACKWARDS'),
    (bt[(bt.NOT_SUPPORTED_BY_CLIENT = 15)] = 'NOT_SUPPORTED_BY_CLIENT'),
    (bt[(bt.QUICK_PLAY = 16)] = 'QUICK_PLAY'),
    (bt[(bt.EXITED_APPLICATION = 17)] = 'EXITED_APPLICATION'),
    (function (e) {
      (e[(e.Manual = 0)] = 'Manual'),
        (e[(e.Interval = 1)] = 'Interval'),
        (e[(e.SkipIntro = 2)] = 'SkipIntro');
    })(St || (St = {})),
    (function (e) {
      (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.NO_RIGHTS = 1)] = 'NO_RIGHTS'),
        (e[(e.PURCHASED = 2)] = 'PURCHASED'),
        (e[(e.UPLOADED = 3)] = 'UPLOADED'),
        (e[(e.MATCHED = 4)] = 'MATCHED'),
        (e[(e.ADDED = 5)] = 'ADDED'),
        (e[(e.SUBSCRIBED = 6)] = 'SUBSCRIBED'),
        (e[(e.NOT_SUPPORTED = 7)] = 'NOT_SUPPORTED');
    })(Pt || (Pt = {})),
    (function (e) {
      (e[(e.NO_SELECTION_PLAY = 0)] = 'NO_SELECTION_PLAY'),
        (e[(e.RESUME_LAST_PLAYED_SONG = 1)] = 'RESUME_LAST_PLAYED_SONG'),
        (e[(e.RESUME_CURRENT_DEVICE_POSITION = 2)] =
          'RESUME_CURRENT_DEVICE_POSITION');
    })(Et || (Et = {})),
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
    })(Tt || (Tt = {}));
  var kt, wt, It, Ot, At, Rt, $t, Ct, Mt, Dt, xt, Lt, Nt, jt;
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
    var p,
      h,
      y = d.call(e),
      _ = [];
    try {
      for (; (void 0 === n || n-- > 0) && !(p = y.next()).done; )
        _.push(p.value);
    } catch (e) {
      h = { error: e };
    } finally {
      try {
        p && !p.done && (d = y.return) && d.call(y);
      } finally {
        if (h) throw h.error;
      }
    }
    return _;
  }
  !(function (e) {
    (e[(e.UNKNOWN_FORMAT = 0)] = 'UNKNOWN_FORMAT'),
      (e[(e.STEREO = 1)] = 'STEREO'),
      (e[(e.SPATIAL = 2)] = 'SPATIAL'),
      (e[(e.PREFERENCE_FORMAT_UNSUPPORTED = 3)] =
        'PREFERENCE_FORMAT_UNSUPPORTED');
  })(kt || (kt = {})),
    (function (e) {
      (e[(e.UNKNOWN_QUALITY = 0)] = 'UNKNOWN_QUALITY'),
        (e[(e.HIGH_EFFICIENCY = 1)] = 'HIGH_EFFICIENCY'),
        (e[(e.HIGH_QUALITY = 2)] = 'HIGH_QUALITY'),
        (e[(e.LOSSLESS = 3)] = 'LOSSLESS'),
        (e[(e.HIGH_RESOLUTION_LOSSLESS = 4)] = 'HIGH_RESOLUTION_LOSSLESS'),
        (e[(e.PREFERENCE_QUALITY_UNSUPPORTED = 5)] =
          'PREFERENCE_QUALITY_UNSUPPORTED');
    })(wt || (wt = {})),
    (function (e) {
      (e[(e.UNSPECIFIED = 0)] = 'UNSPECIFIED'),
        (e[(e.STATIC = 1)] = 'STATIC'),
        (e[(e.LINE_BY_LINE = 2)] = 'LINE_BY_LINE'),
        (e[(e.WORD_BY_WORD = 3)] = 'WORD_BY_WORD');
    })(It || (It = {})),
    (function (e) {
      (e[(e.REPEAT_UNKNOWN = 0)] = 'REPEAT_UNKNOWN'),
        (e[(e.REPEAT_OFF = 1)] = 'REPEAT_OFF'),
        (e[(e.REPEAT_ONE = 2)] = 'REPEAT_ONE'),
        (e[(e.REPEAT_ALL = 3)] = 'REPEAT_ALL');
    })(Ot || (Ot = {})),
    (function (e) {
      (e[(e.SHUFFLE_UNKNOWN = 0)] = 'SHUFFLE_UNKNOWN'),
        (e[(e.SHUFFLE_OFF = 1)] = 'SHUFFLE_OFF'),
        (e[(e.SHUFFLE_ON = 2)] = 'SHUFFLE_ON');
    })(At || (At = {})),
    (function (e) {
      (e[(e.AUTO_UNKNOWN = 0)] = 'AUTO_UNKNOWN'),
        (e[(e.AUTO_OFF = 1)] = 'AUTO_OFF'),
        (e[(e.AUTO_ON = 2)] = 'AUTO_ON'),
        (e[(e.AUTO_ON_CONTENT_UNSUPPORTED = 3)] =
          'AUTO_ON_CONTENT_UNSUPPORTED');
    })(Rt || (Rt = {})),
    (function (e) {
      (e[(e.NOT_SPECIFIED = 0)] = 'NOT_SPECIFIED'),
        (e[(e.CONTAINER_CHANGED = 1)] = 'CONTAINER_CHANGED');
    })($t || ($t = {})),
    (function (e) {
      (e[(e.PLAY_END = 0)] = 'PLAY_END'),
        (e[(e.PLAY_START = 1)] = 'PLAY_START'),
        (e[(e.LYRIC_DISPLAY = 2)] = 'LYRIC_DISPLAY');
    })(Ct || (Ct = {})),
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
    })(Mt || (Mt = {})),
    (function (e) {
      (e[(e.AUDIO = 0)] = 'AUDIO'), (e[(e.VIDEO = 1)] = 'VIDEO');
    })(Dt || (Dt = {})),
    (function (e) {
      (e[(e.AUTO = 0)] = 'AUTO'), (e[(e.MANUAL = 1)] = 'MANUAL');
    })(xt || (xt = {})),
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
        (e[(e.SEAT = 19)] = 'SEAT'),
        (e[(e.CUPRA = 20)] = 'CUPRA');
    })(Lt || (Lt = {})),
    (function (e) {
      (e[(e.EPISODE = 1)] = 'EPISODE'), (e[(e.SHOUTCAST = 2)] = 'SHOUTCAST');
    })(Nt || (Nt = {})),
    (function (e) {
      (e[(e.NotStarted = 0)] = 'NotStarted'),
        (e[(e.Running = 1)] = 'Running'),
        (e[(e.Stopped = 2)] = 'Stopped');
    })(jt || (jt = {}));
  var Ut = { type: 'xstate.init' };
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
    var p = n,
      h = !1;
    return [
      e.filter(function (e) {
        if ('xstate.assign' === e.type) {
          h = !0;
          var n = Object.assign({}, p);
          return (
            'function' == typeof e.assignment
              ? (n = e.assignment(p, d))
              : Object.keys(e.assignment).forEach(function (h) {
                  n[h] =
                    'function' == typeof e.assignment[h]
                      ? e.assignment[h](p, d)
                      : e.assignment[h];
                }),
            (p = n),
            !1
          );
        }
        return !0;
      }),
      p,
      h,
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
          Ut,
        ),
        2,
      ),
      p = d[0],
      h = d[1],
      y = {
        config: e,
        _options: n,
        initialState: {
          value: e.initial,
          actions: p,
          context: h,
          matches: a(e.initial),
        },
        transition: function (n, d) {
          var p,
            h,
            _ = 'string' == typeof n ? { value: n, context: e.context } : n,
            m = _.value,
            g = _.context,
            b = u(d),
            S = e.states[m];
          if (S.on) {
            var P = r(S.on[b.type]);
            try {
              for (
                var E = (function (e) {
                    var n = 'function' == typeof Symbol && Symbol.iterator,
                      d = n && e[n],
                      p = 0;
                    if (d) return d.call(e);
                    if (e && 'number' == typeof e.length)
                      return {
                        next: function () {
                          return (
                            e && p >= e.length && (e = void 0),
                            { value: e && e[p++], done: !e }
                          );
                        },
                      };
                    throw new TypeError(
                      n
                        ? 'Object is not iterable.'
                        : 'Symbol.iterator is not defined.',
                    );
                  })(P),
                  T = E.next();
                !T.done;
                T = E.next()
              ) {
                var k = T.value;
                if (void 0 === k) return c(m, g);
                var w = 'string' == typeof k ? { target: k } : k,
                  I = w.target,
                  O = w.actions,
                  A = void 0 === O ? [] : O,
                  R = w.cond,
                  $ =
                    void 0 === R
                      ? function () {
                          return !0;
                        }
                      : R,
                  C = void 0 === I,
                  M = null != I ? I : m,
                  D = e.states[M];
                if ($(g, b)) {
                  var x = t(
                      f(
                        (C
                          ? r(A)
                          : [].concat(S.exit, A, D.entry).filter(function (e) {
                              return e;
                            })
                        ).map(function (e) {
                          return i(e, y._options.actions);
                        }),
                        g,
                        b,
                      ),
                      3,
                    ),
                    L = x[0],
                    N = x[1],
                    j = x[2],
                    U = null != I ? I : m;
                  return {
                    value: U,
                    context: N,
                    actions: L,
                    changed: I !== m || L.length > 0 || j,
                    matches: a(U),
                  };
                }
              }
            } catch (t) {
              p = { error: t };
            } finally {
              try {
                T && !T.done && (h = E.return) && h.call(E);
              } finally {
                if (p) throw p.error;
              }
            }
          }
          return c(m, g);
        },
      };
    return y;
  }
  var l = function (e, n) {
    return e.actions.forEach(function (d) {
      var p = d.exec;
      return p && p(e.context, n);
    });
  };
  function v(e) {
    var n = e.initialState,
      d = jt.NotStarted,
      p = new Set(),
      h = {
        _machine: e,
        send: function (h) {
          d === jt.Running &&
            ((n = e.transition(n, h)),
            l(n, u(h)),
            p.forEach(function (e) {
              return e(n);
            }));
        },
        subscribe: function (e) {
          return (
            p.add(e),
            e(n),
            {
              unsubscribe: function () {
                return p.delete(e);
              },
            }
          );
        },
        start: function (p) {
          if (p) {
            var y =
              'object' == typeof p
                ? p
                : { context: e.config.context, value: p };
            n = {
              value: y.value,
              actions: [],
              context: y.context,
              matches: a(y.value),
            };
          }
          return (d = jt.Running), l(n, Ut), h;
        },
        stop: function () {
          return (d = jt.Stopped), p.clear(), h;
        },
        get state() {
          return n;
        },
        get status() {
          return d;
        },
      };
    return h;
  }
  const Bt = /(?:st|ra)\.([0-9]+)/,
    Ft = /st\.([0-9]+)/;
  function asyncGeneratorStep$12(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1A(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$F(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1A(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$p(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _object_without_properties$3(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  const toTimeMeasuredData = (e) => {
    var { timestamp: n } = e;
    return _object_spread_props$p(
      _object_spread$F({}, _object_without_properties$3(e, ['timestamp'])),
      { 'milliseconds-since-play': Date.now() - n },
    );
  };
  class PlayActivitySender {
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
      var n,
        d = this;
      return ((n = function* () {
        const n = {
          client_id: d._clientId,
          event_type: d._eventType,
          data: ensureArray(e).map(toTimeMeasuredData),
        };
        if (0 === n.data.length)
          throw new Error('send() called without any data');
        const p = d._generateFetchOptions({
          method: 'POST',
          body: JSON.stringify(n),
          headers: d.headers(),
        });
        return (
          yield d._fetch(d.url, p),
          d._logInfo &&
            console.info(
              'play activity:',
              d._sourceType === Lt.AMAZON ? JSON.stringify(n) : n,
            ),
          n
        );
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$12(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$12(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
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
      return _object_spread$F({}, this._fetchOptions, e);
    }
    constructor(e) {
      var n, d, p, h;
      _define_property$1A(this, 'mode', xt.AUTO),
        _define_property$1A(this, '_accessToken', void 0),
        _define_property$1A(this, '_musicUserToken', void 0),
        _define_property$1A(this, '_clientId', void 0),
        _define_property$1A(this, '_eventType', void 0),
        _define_property$1A(this, '_fetch', void 0),
        _define_property$1A(this, '_fetchOptions', void 0),
        _define_property$1A(this, '_headersClass', void 0),
        _define_property$1A(this, '_isQA', !1),
        _define_property$1A(this, '_logInfo', !1),
        _define_property$1A(this, '_preferDSID', !1),
        _define_property$1A(this, '_sourceType', void 0),
        _define_property$1A(this, '_traceTag', void 0),
        (this._accessToken = e.accessToken),
        (this._clientId = e.clientId),
        (this._eventType = e.eventType),
        (this._fetch = null !== (n = e.fetch) && void 0 !== n ? n : fetch),
        (this._fetchOptions =
          null !== (d = e.fetchOptions) && void 0 !== d ? d : {}),
        (this._headersClass =
          null !== (p = e.headersClass) && void 0 !== p ? p : Headers),
        (this._isQA = null !== (h = e.isQA) && void 0 !== h && h),
        (this._logInfo = e.logInfo || this._isQA),
        (this._musicUserToken = e.musicUserToken),
        (this._preferDSID = e.preferDSID),
        (this._sourceType = e.sourceType),
        (this._traceTag = e.traceTag);
    }
  }
  const fullAppId = (e, n) => {
      var d, p;
      if (void 0 === (null === (d = n) || void 0 === d ? void 0 : d.name))
        return 'MusicKitApp/1.0';
      if (void 0 !== e) return e;
      return `${(function (e) {
        return e
          .toLowerCase()
          .replace(/[-_]+/g, ' ')
          .replace(/[^\w\s]/g, '')
          .replace(/\b./g, (e) => e.toUpperCase())
          .replace(/\s/g, '');
      })(n.name)}/${
        (null === (p = n) || void 0 === p ? void 0 : p.version) || '1.0'
      }`;
    },
    os = (e) => {
      var n, d, p;
      const h = e.toLowerCase();
      let y,
        _ = 'Unidentified OS';
      const m = /mobile/.test(h);
      var g;
      m && /android|adr/.test(h)
        ? ((_ = 'Android'), (y = h.match(/(?:android|adr)\ ((\d+[._])+\d+)/)))
        : m && /iphone|ipad|ipod/.test(h)
          ? ((_ = 'iOS'),
            (y = h.match(/os\ ((\d+[._])+\d+)\ like\ mac\ os\ x/)))
          : /tizen/.test(h)
            ? ((_ = 'Tizen'), (y = h.match(/tizen (.*)/)))
            : /web0s|webos/.test(h)
              ? ((_ = 'WebOS'), (y = h.match(/[web0s|webos] (.*)/)))
              : !m && /cros/.test(h)
                ? (_ = 'ChromeOS')
                : !m && /macintosh/.test(h)
                  ? ((_ = 'macOS'), (y = h.match(/os\ x\ ((\d+[._])+\d+)\b/)))
                  : !m && /linux/.test(h)
                    ? (_ = 'Linux')
                    : !m &&
                      /windows/.test(h) &&
                      ((_ = 'Windows'), (y = h.match(/windows ([^\)]*)/)));
      return `${_}/${
        null !==
          (g =
            null === (p = y) ||
            void 0 === p ||
            null === (d = p[1]) ||
            void 0 === d ||
            null === (n = d.replace) ||
            void 0 === n
              ? void 0
              : n.call(d, /_/g, '.')) && void 0 !== g
          ? g
          : '0.0'
      }`;
    },
    model = (e) => {
      var n;
      return (
        'model/' +
        ((null === (n = e) || void 0 === n ? void 0 : n.platform) ||
          'Unavailable')
      );
    },
    build = (e) => {
      var n;
      const d = null === (n = e) || void 0 === n ? void 0 : n.build;
      return void 0 === d || '' === d ? 'build/0.0.0' : 'build/' + d;
    };
  function asyncGeneratorStep$11(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1z(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$E(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1z(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$o(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const Kt = { platform: '', userAgent: '' };
  class PlayActivityBase {
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
          ? Kt
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
      var n,
        d = this;
      return ((n = function* () {
        return d.sender.send(e);
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$11(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$11(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    buildDescriptorForPlayParams(e, n, d, p, h) {
      const y = 'stream' === e.format ? Mt.STREAM : Mt.ITUNES_STORE_CONTENT;
      return _object_spread$E(
        _object_spread_props$o(_object_spread$E({}, e), {
          container: d,
          duration: null != p ? p : 0,
          eventType: n,
          itemType: y,
        }),
        h,
      );
    }
    buildForPlayParams(e, n, d, p = 0, h = {}, y = !1) {
      return this.build(this.buildDescriptorForPlayParams(e, n, d, p, h), y);
    }
    constructor(e, n, d, p) {
      var h, y, _, m, g, b, S, P, E, T;
      (_define_property$1z(this, '_accessToken', void 0),
      _define_property$1z(this, '_musicUserToken', void 0),
      _define_property$1z(this, '_storefrontId', void 0),
      _define_property$1z(this, 'privateEnabled', void 0),
      _define_property$1z(this, 'siriInitiated', void 0),
      _define_property$1z(this, 'buildVersion', void 0),
      _define_property$1z(this, 'clientId', void 0),
      _define_property$1z(this, 'eventType', void 0),
      _define_property$1z(this, 'guid', void 0),
      _define_property$1z(this, 'internalBuild', void 0),
      _define_property$1z(this, 'metricsClientId', void 0),
      _define_property$1z(this, 'preferDSID', void 0),
      _define_property$1z(this, 'sender', void 0),
      _define_property$1z(this, 'sourceType', void 0),
      _define_property$1z(this, '_appId', void 0),
      _define_property$1z(this, '_appInfo', void 0),
      _define_property$1z(this, '_deviceName', void 0),
      _define_property$1z(this, '_navigator', void 0),
      _define_property$1z(this, '_utcOffset', void 0),
      _define_property$1z(this, '_utcOffsetInSeconds', void 0),
      _define_property$1z(this, '_userAgent', void 0),
      _define_property$1z(this, '_userIsSubscribed', void 0),
      _define_property$1z(this, '_allowReportingId', void 0),
      (this._accessToken = e),
      (this._musicUserToken = n),
      (this._storefrontId = d),
      (this.privateEnabled = !1),
      (this.siriInitiated = !1),
      (this.clientId = 'JSCLIENT'),
      (this.eventType = 'JSPLAY'),
      (this.internalBuild = !1),
      (this.preferDSID = !1),
      (this.sourceType = Lt.MUSICKIT),
      (this._utcOffset = new Date().getTimezoneOffset()),
      (this._userIsSubscribed = !0),
      (this._allowReportingId = !1),
      p) &&
        ((this._appInfo = p.app),
        (this._navigator = p.navigator),
        (this._userAgent = p.userAgent),
        hasOwn(p, 'utcOffset') && isNaN(p.utcOffset)
          ? (this._utcOffsetInSeconds = -1)
          : hasOwn(p, 'utcOffset') && (this._utcOffset = p.utcOffset),
        (this.clientId = p.clientId || 'JSCLIENT'),
        (this._deviceName = p.deviceName),
        (this.guid = p.guid),
        (this.metricsClientId = p.metricsClientId),
        (this.preferDSID = null !== (P = p.preferDSID) && void 0 !== P && P),
        (this.sourceType =
          void 0 !== p.sourceType && 'number' == typeof p.sourceType
            ? p.sourceType
            : Lt.MUSICKIT),
        (this._userIsSubscribed =
          null === (E = p.userIsSubscribed) || void 0 === E || E),
        (this._allowReportingId =
          null !== (T = p.allowReportingId) && void 0 !== T && T));
      (this.buildVersion = ((e, n, d, p) =>
        [fullAppId(e, n), os(p), model(d), build(n)].join(' '))(
        this._appId,
        this._appInfo,
        this.navigator,
        this.userAgent,
      )),
        (this.sender = new PlayActivitySender({
          accessToken: this._accessToken,
          clientId: this.clientId,
          eventType: this.eventType,
          fetch: null === (h = p) || void 0 === h ? void 0 : h.fetch,
          fetchOptions:
            null === (y = p) || void 0 === y ? void 0 : y.fetchOptions,
          headersClass:
            null === (m = p) ||
            void 0 === m ||
            null === (_ = m.fetch) ||
            void 0 === _
              ? void 0
              : _.Headers,
          isQA: null === (g = p) || void 0 === g ? void 0 : g.isQA,
          logInfo: null === (b = p) || void 0 === b ? void 0 : b.logInfo,
          musicUserToken: this._musicUserToken,
          preferDSID: this.preferDSID,
          sourceType: this.sourceType,
          traceTag: null === (S = p) || void 0 === S ? void 0 : S.traceTag,
        }));
    }
  }
  function _define_property$1y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const DEFAULT_CACHE_KEY_FUNCTION = (e, n) => `${n}${e}`;
  class NetworkCache {
    getItem(e) {
      const n = this.cacheKeyForPath(e),
        d = this.storage.getItem(n);
      if (null !== d) {
        const { x: e, d: p } = JSON.parse(d);
        if (e > Date.now()) return p;
        this.storage.removeItem(n);
      }
    }
    setItem(e, n, d = this.ttl) {
      const p = this.cacheKeyForPath(e);
      this.storage.setItem(p, JSON.stringify({ x: Date.now() + d, d: n }));
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
    constructor(e = {}) {
      _define_property$1y(this, 'storage', void 0),
        _define_property$1y(this, 'prefix', void 0),
        _define_property$1y(this, 'ttl', void 0),
        _define_property$1y(this, 'cacheKeyFunction', void 0),
        (this.storage = e.storage || new GenericStorage()),
        (this.prefix = e.prefix || 'ï£¿'),
        (this.ttl = e.ttl || 3e5),
        (this.cacheKeyFunction =
          e.cacheKeyFunction || DEFAULT_CACHE_KEY_FUNCTION);
    }
  }
  function asyncGeneratorStep$10(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1x(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$D(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1x(e, n, d[n]);
        });
    }
    return e;
  }
  var Gt;
  !(function (e) {
    (e.JSON = 'application/json'),
      (e.FORM = 'application/x-www-form-urlencoded');
  })(Gt || (Gt = {}));
  const Vt = Date.now();
  var Ht;
  const qt = isNodeEnvironment$1()
      ? () => {
          const [e, n] = process.hrtime();
          return Math.floor(1e3 * e + 1e-6 * n);
        }
      : () => {
          var e, n;
          return null !==
            (Ht =
              null === (n = performance) ||
              void 0 === n ||
              null === (e = n.now) ||
              void 0 === e
                ? void 0
                : e.call(n)) && void 0 !== Ht
            ? Ht
            : Date.now() - Vt;
        },
    formatByte = (e) => ('0' + (255 & e).toString(16)).slice(-2),
    Wt = new Map([
      ['play', Ct.PLAY_START],
      ['playbackstarted', Ct.PLAY_START],
      ['stop', Ct.PLAY_END],
      ['playbackstopped', Ct.PLAY_END],
    ]);
  function mapEventTypeString(e) {
    return 'number' == typeof e
      ? e
      : null !== (n = Wt.get(e)) && void 0 !== n
        ? n
        : Ct.PLAY_END;
    var n;
  }
  const Yt = new Map([
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
          null !== (n = e.eventType) && void 0 !== n ? n : Ct.PLAY_START;
        if ('number' == typeof d) return { eventType: d };
        return { eventTypeString: d, eventType: mapEventTypeString(d) };
      })(e);
    return (
      (n.eventType = d.eventType),
      (n.eventTypeString = d.eventTypeString),
      void 0 === n.endReasonType &&
        void 0 !== d.eventTypeString &&
        (n.endReasonType = (function (e) {
          if (void 0 !== e) return Yt.get(e);
        })(d.eventTypeString)),
      !1 !== n.reporting && (n.reporting = !0),
      n
    );
  }
  function _define_property$1w(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$n(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const createHelper = (e, n) => (d, p, h) => {
    const { helpers: y } = h.cache;
    return e in y || (y[e] = n(d, p, h)), y[e];
  };
  const returnAsField =
      (e, n) =>
      (...d) =>
        (function (e, n) {
          if (void 0 !== n) return { [e]: n };
        })(e, n(...d)),
    createFieldFn = (e, n) => (d, p, h) => {
      const { fields: y } = h.cache;
      var _;
      return (
        e in y ||
          (h.cache.fields = _object_spread_props$n(
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                'function' == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$1w(e, n, d[n]);
                  });
              }
              return e;
            })({}, y),
            { [e]: ((_ = n(d, p, h)), null == _ ? void 0 : { [e]: _ }) },
          )),
        h.cache.fields[e]
      );
    },
    createClientFieldFn = (e, n) =>
      createFieldFn(e, (e, d, { client: p }) => p[n]),
    zt = createFieldFn('event-type', (e, n, d) => {
      return void 0 === e.eventType
        ? Ct.PLAY_START
        : e.itemType === Mt.TIMED_METADATA_PING && void 0 !== e.timedMetadata
          ? Ct.PLAY_END
          : null !== (p = e.eventType) && void 0 !== p
            ? p
            : Ct.PLAY_START;
      var p;
    }),
    Qt = createHelper('should-include-audio-quality', (e, n, d) => {
      var p, h, y, _;
      const m = e.userPreference;
      return (
        zt(e, n, d)['event-type'] === Ct.PLAY_END &&
        void 0 !==
          (null === (p = e.audioQuality) || void 0 === p
            ? void 0
            : p.provided) &&
        void 0 !==
          (null === (h = e.audioQuality) || void 0 === h
            ? void 0
            : h.targeted) &&
        void 0 !==
          (null === (y = m) || void 0 === y ? void 0 : y.audioQuality) &&
        void 0 !==
          (null === (_ = m) || void 0 === _ ? void 0 : _.playbackFormat)
      );
    }),
    Jt = createFieldFn('audio-quality-provided', (e, n, d) => {
      var p;
      if (!Qt(e, n, d)) return;
      const h = e.audioQuality;
      if (void 0 === (null === (p = h) || void 0 === p ? void 0 : p.provided))
        return;
      const { provided: y } = h;
      var _, m, g;
      return {
        'audio-sample-rate-in-hz':
          null !== (_ = y.audioSampleRateHz) && void 0 !== _ ? _ : 0,
        'audio-bit-depth':
          null !== (m = y.audioBitDepth) && void 0 !== m ? m : 0,
        'bit-rate-in-bps': null !== (g = y.bitRateBps) && void 0 !== g ? g : 0,
        codec: y.codec,
        'audio-channel-type': y.audioChannelType,
        'playback-format': y.playbackFormat,
      };
    }),
    Xt = createFieldFn('audio-quality-targeted', (e, n, d) => {
      var p;
      if (!Qt(e, n, d)) return;
      const h = e.audioQuality;
      if (void 0 === (null === (p = h) || void 0 === p ? void 0 : p.targeted))
        return;
      const { targeted: y } = h;
      var _, m, g;
      return {
        'audio-sample-rate-in-hz':
          null !== (_ = y.audioSampleRateHz) && void 0 !== _ ? _ : 0,
        'audio-bit-depth':
          null !== (m = y.audioBitDepth) && void 0 !== m ? m : 0,
        'bit-rate-in-bps': null !== (g = y.bitRateBps) && void 0 !== g ? g : 0,
        codec: y.codec,
        'audio-channel-type': y.audioChannelType,
        'playback-format': y.playbackFormat,
      };
    }),
    Zt = createClientFieldFn('build-version', 'buildVersion'),
    er = [
      'uploadedVideo',
      'uploadedAudio',
      'uploaded-videos',
      'uploaded-audios',
    ],
    tr = createHelper(
      'is-auc',
      ({ kind: e }) => void 0 !== e && er.includes(e),
    ),
    rr = createHelper(
      'should-send-timed-metadata',
      ({ endReasonType: n, eventType: d, itemType: p, timedMetadata: h }) =>
        void 0 !== h &&
        (p === Mt.TIMED_METADATA_PING ||
          d === Ct.PLAY_START ||
          n === e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED),
    ),
    ir = createFieldFn('type', (e, n, d) => {
      const { id: p, reporting: h } = e;
      var y;
      if ('-1' === p || !h)
        switch (
          null === (y = zt(e, n, d)) || void 0 === y ? void 0 : y['event-type']
        ) {
          case Ct.PLAY_END:
            return Mt.AGGREGATE_NON_CATALOG_PLAY_TIME;
          case Ct.PLAY_START:
            if ('-1' === p) return Mt.INVALID;
        }
      const { format: _, itemType: m } = e;
      return rr(e, n, d)
        ? m === Mt.TIMED_METADATA_PING
          ? m
          : Mt.STREAM
        : 'stream' === _
          ? Mt.STREAM
          : tr(e, n, d)
            ? Mt.ARTIST_UPLOADED_CONTENT
            : null != m
              ? m
              : Mt.ITUNES_STORE_CONTENT;
    }),
    nr = createFieldFn('container-type', (e, n, d) => {
      var p;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const { container: h } = e;
      if (void 0 === h) return gt.UNKNOWN;
      var y;
      const _ = null !== (y = h.type) && void 0 !== y ? y : h.kind;
      if ('number' == typeof _) return _;
      switch (_) {
        case 'album':
        case 'albums':
        case 'library-albums':
          return gt.ALBUM;
        case 'artist':
        case 'artists':
        case 'library-artists':
          return gt.ARTIST;
        case 'playlist':
        case 'playlists':
        case 'library-playlists':
          return gt.PLAYLIST;
        case 'radio':
        case 'radioStation':
        case 'station':
        case 'stations':
          return gt.RADIO;
        default:
          return gt.UNKNOWN;
      }
    });
  function _define_property$1v(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const or = [
      returnAsField('album-adam-id', (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.ALBUM
        )
          return;
        const { container: y } = e,
          _ = null === (h = y) || void 0 === h ? void 0 : h.id;
        return void 0 === _ || T(_) ? void 0 : _;
      }),
      returnAsField('cloud-album-id', (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.ALBUM
        )
          return;
        const { container: y } = e,
          _ = null === (h = y) || void 0 === h ? void 0 : h.id;
        return void 0 !== _ && T(_) ? _ : void 0;
      }),
      returnAsField('global-playlist-id', (e, n, d) => {
        var p, h, y, _, m;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.PLAYLIST
        )
          return;
        const { container: g } = e;
        var b;
        const S =
          null !==
            (b = null === (h = g) || void 0 === h ? void 0 : h.catalogId) &&
          void 0 !== b
            ? b
            : null === (y = g) || void 0 === y
              ? void 0
              : y.globalId;
        return (null === (_ = g) || void 0 === _ ? void 0 : _.isLibrary) && S
          ? S
          : T(null === (m = g) || void 0 === m ? void 0 : m.id) ||
              null === (P = g) ||
              void 0 === P
            ? void 0
            : P.id;
        var P;
      }),
      returnAsField('playlist-version-hash', (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.PLAYLIST
        )
          return;
        const { container: y } = e,
          _ = null === (h = y) || void 0 === h ? void 0 : h.versionHash;
        return void 0 !== _ && '' !== _ ? _ : void 0;
      }),
      returnAsField('station-hash', (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.RADIO
        )
          return;
        const y =
          null === (h = e.container) || void 0 === h ? void 0 : h.stationHash;
        return void 0 !== y && '' !== y ? y : void 0;
      }),
      returnAsField('station-id', (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) === gt.RADIO
        )
          return null === (h = e.container) || void 0 === h ? void 0 : h.id;
      }),
      returnAsField('station-personalized-id', (e, n, d) => {
        var p, h;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.RADIO
        )
          return;
        const y = null === (h = e.container) || void 0 === h ? void 0 : h.id;
        return void 0 !== y && Ft.test(y)
          ? parseInt(y.replace(Ft, '$1'), 10)
          : void 0;
      }),
      returnAsField('universal-library-id', (e, n, d) => {
        var p, h, y, _, m;
        if (
          (null === (p = nr(e, n, d)) || void 0 === p
            ? void 0
            : p['container-type']) !== gt.PLAYLIST
        )
          return;
        const { container: g } = e;
        var b;
        const S =
            null !==
              (b = null === (h = g) || void 0 === h ? void 0 : h.catalogId) &&
            void 0 !== b
              ? b
              : null === (y = g) || void 0 === y
                ? void 0
                : y.globalId,
          P = null === (_ = g) || void 0 === _ ? void 0 : _.id;
        if (void 0 !== P)
          if ((null === (m = g) || void 0 === m ? void 0 : m.isLibrary) && S) {
            if ('' !== P) return P;
          } else if (T(P)) return P;
      }),
    ],
    ar = createFieldFn('container-ids', (e, n, d) => {
      var p;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const h = or.reduce(
        (p, h) =>
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              'function' == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$1v(e, n, d[n]);
                });
            }
            return e;
          })({}, p, h(e, n, d)),
        Object.create(null),
      );
      return isEmpty(h) ? void 0 : h;
    }),
    sr = createClientFieldFn('developer-token', 'accessToken'),
    cr = createClientFieldFn('device-name', 'deviceName'),
    dr = createFieldFn('display-type', (e, n, d) => {
      var p, h;
      if (
        (null === (p = zt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) === Ct.LYRIC_DISPLAY
      )
        return null === (h = e.lyricDescriptor) || void 0 === h
          ? void 0
          : h.displayType;
    }),
    lr = createHelper(
      'initial-start-position-in-milliseconds',
      ({ position: e = 0, startPositionInMilliseconds: n }) =>
        n || Math.round(1e3 * e),
    ),
    ur = createFieldFn('end-position-in-milliseconds', (e, n, d) => {
      var p;
      switch (
        null === (p = zt(e, n, d)) || void 0 === p ? void 0 : p['event-type']
      ) {
        case Ct.LYRIC_DISPLAY:
          var h;
          if (
            void 0 ===
            (null === (h = e.lyricDescriptor) || void 0 === h
              ? void 0
              : h.duration)
          )
            return;
          return Math.round(e.lyricDescriptor.duration);
        case Ct.PLAY_START:
          return;
        default:
          if (n && void 0 === n.position) return;
          return e.endPositionInMilliseconds || lr(e, n, d);
      }
    }),
    pr = createHelper(
      'is-private',
      ({ id: e, reporting: n }) => '-1' === e || !n,
    ),
    hr = createFieldFn('end-reason-type', (n, d, p) => {
      var h, y;
      if (
        !d ||
        void 0 !== (null === (h = d) || void 0 === h ? void 0 : h.position)
      )
        return ((null === (y = ir(n, d, p)) || void 0 === y
          ? void 0
          : y.type) === Mt.TIMED_METADATA_PING &&
          void 0 !== n.timedMetadata) ||
          (pr(n, d, p) && n.eventType === Ct.PLAY_END)
          ? e.PlayActivityEndReasonType.NOT_APPLICABLE
          : n.endReasonType;
    }),
    { CONTAINER_CHANGED: yr, NOT_SPECIFIED: _r } = $t,
    fr = createFieldFn('event-reason-hint-type', (e, n, d) => {
      var p, h, y;
      if (
        (null === (p = zt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) !== Ct.PLAY_START
      )
        return;
      const _ = e.container;
      return void 0 === _
        ? _r
        : !1 === n
          ? d.isAlexa
            ? _r
            : yr
          : (null === (y = n) ||
              void 0 === y ||
              null === (h = y.container) ||
              void 0 === h
                ? void 0
                : h.id) !== _.id
            ? yr
            : _r;
    }),
    vr = createFieldFn('feature-name', (e, n, d) => {
      var p, h, y;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      return (
        '' +
        (null !==
          (y = null === (h = e.container) || void 0 === h ? void 0 : h.name) &&
        void 0 !== y
          ? y
          : mt.MUSICKIT)
      );
    }),
    mr = createClientFieldFn('guid', 'guid'),
    gr = createHelper('should-have-auc-adam-id', tr),
    br = createHelper(
      'should-have-radio-adam-id',
      ({ id: e, container: n }) => {
        var d;
        return (
          Bt.test(e) ||
          'radioStation' ===
            (null === (d = n) || void 0 === d ? void 0 : d.kind)
        );
      },
    ),
    Sr = createHelper(
      'is-library-item-or-library-type',
      ({ id: e, isLibrary: n }, d, p) => n || T(e),
    ),
    Pr = createHelper('catalog-id', ({ catalogId: e, container: n }) => {
      var d;
      return null != e
        ? e
        : null === (d = n) || void 0 === d
          ? void 0
          : d.catalogId;
    }),
    Er = createHelper(
      'is-library-item-with-catalog-id',
      (e, n, d) => e.isLibrary && !!Pr(e, n, d),
    );
  function _define_property$1u(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const Tr = [
      returnAsField('auc-adam-id', (e, n, d) => {
        if (!pr(e, n, d) && !br(e, n, d)) return gr(e, n, d) ? e.id : void 0;
      }),
      returnAsField('cloud-id', (e, n, d) => {
        var p;
        const { id: h } = e,
          y = void 0 !== h && '' !== h;
        return pr(e, n, d) &&
          (null === (p = zt(e, n, d)) || void 0 === p
            ? void 0
            : p['event-type']) === Ct.PLAY_START &&
          y &&
          '-1' !== h
          ? h
          : br(e, n, d) || gr(e, n, d)
            ? e.cloudId
            : (Er(e, n, d) && y) || Sr(e, n, d)
              ? h
              : e.cloudId;
      }),
      returnAsField('lyric-id', (e, n, d) => {
        var p, h;
        if (
          (null === (p = zt(e, n, d)) || void 0 === p
            ? void 0
            : p['event-type']) === Ct.LYRIC_DISPLAY
        )
          return null === (h = e.lyricDescriptor) || void 0 === h
            ? void 0
            : h.id;
      }),
      returnAsField('purchased-adam-id', (e, n, d) => e.purchasedId),
      returnAsField('reporting-adam-id', (e, n, d) => {
        if (!0 !== d.client.allowReportingId) return;
        var p;
        return (
          (null !== (p = zt(e, n, d)) && void 0 !== p ? p : {})['event-type'],
          Sr(e, n, d) ? e.reportingId : void 0
        );
      }),
      returnAsField('radio-adam-id', (e, n, d) => {
        var p;
        if (pr(e, n, d)) return;
        const { container: h, id: y } = e;
        return Bt.test(y) ||
          'radioStation' ===
            (null === (p = h) || void 0 === p ? void 0 : p.kind)
          ? parseInt(('' + y).replace(Bt, '$1'), 10)
          : void 0;
      }),
      returnAsField('subscription-adam-id', (e, n, d) => {
        if (!(pr(e, n, d) || br(e, n, d) || gr(e, n, d))) {
          if (Er(e, n, d)) return Pr(e, n, d);
          if (!Sr(e, n, d)) return e.id;
        }
      }),
    ],
    kr = createFieldFn('ids', (e, n, d) => {
      var p;
      if (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return;
      const h = Tr.reduce(
        (p, h) =>
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              'function' == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$1u(e, n, d[n]);
                });
            }
            return e;
          })({}, p, h(e, n, d)),
        Object.create(null),
      );
      return isEmpty(h) ? void 0 : h;
    }),
    wr = createClientFieldFn('internal-build', 'internalBuild'),
    Ir = createFieldFn('is-collaborative', (e, n, d) => {
      var p;
      return (
        !0 ===
          (null === (p = e.container) || void 0 === p
            ? void 0
            : p.isCollaborative) || void 0
      );
    }),
    Or = createFieldFn('lyric-language', (e, n, d) => {
      var p, h;
      if (
        (null === (p = zt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) === Ct.LYRIC_DISPLAY
      )
        return null === (h = e.lyricDescriptor) || void 0 === h
          ? void 0
          : h.language;
    }),
    Ar = createHelper(
      'has-episode-streaming-kind',
      ({ streamingKind: e }, n, d) => e === Nt.EPISODE,
    ),
    Rr = createHelper('is-stream', (e, n, d) => {
      var p;
      return (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Mt.STREAM
      );
    }),
    $r = createHelper(
      'is-live-stream',
      (e, n, d) => Rr(e, n, d) && !Ar(e, n, d),
    ),
    Cr = createFieldFn('media-duration-in-milliseconds', (e, n, d) => {
      var p;
      const h =
        null === (p = zt(e, n, d)) || void 0 === p ? void 0 : p['event-type'];
      if (h === Ct.LYRIC_DISPLAY) return 0;
      if ($r(e, n, d)) return 0;
      const y = Math.round(1e3 * e.duration);
      if (h === Ct.PLAY_START) return y;
      var _, m;
      const g =
        null !== (m = e.startPositionInMilliseconds) && void 0 !== m
          ? m
          : Math.round(
              1e3 * (null !== (_ = e.position) && void 0 !== _ ? _ : 0),
            );
      return g > 1e3 * e.duration ? g : y;
    }),
    { AUDIO: Mr, VIDEO: Dr } = Dt,
    xr = createFieldFn('media-type', (e, n, d) => {
      var p;
      if (
        (null === (p = zt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) === Ct.LYRIC_DISPLAY
      )
        return Mr;
      const { kind: h, mediaType: y } = e;
      if ('number' == typeof y) return y;
      const _ = 'string' == typeof y ? y : h;
      return _ && /video/i.test(_) ? Dr : Mr;
    }),
    Lr = createClientFieldFn('metrics-client-id', 'metricsClientId'),
    Nr = createFieldFn('offline', () => !1),
    jr = createFieldFn('persistent-id', () => generateUUID()),
    Ur = createFieldFn('play-mode', (e, n, d) => {
      var p, h, y, _, m;
      if (
        (null === (p = zt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) === Ct.LYRIC_DISPLAY ||
        (null === (h = ir(e, n, d)) || void 0 === h ? void 0 : h.type) ===
          Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return {
          'auto-play-mode':
            null !== (y = Ur.autoplayMode) && void 0 !== y ? y : 0,
          'repeat-play-mode':
            null !== (_ = Ur.repeatPlayMode) && void 0 !== _ ? _ : 0,
          'shuffle-play-mode':
            null !== (m = Ur.shufflePlayMode) && void 0 !== m ? m : 0,
        };
      const g = invoke(e.playMode);
      var b, S, P;
      return void 0 !== g
        ? {
            'auto-play-mode':
              null !== (b = g.autoplayMode) && void 0 !== b ? b : 0,
            'repeat-play-mode':
              null !== (S = g.repeatPlayMode) && void 0 !== S ? S : 0,
            'shuffle-play-mode':
              null !== (P = g.shufflePlayMode) && void 0 !== P ? P : 0,
          }
        : void 0;
    }),
    Br = createClientFieldFn('private-enabled', 'privateEnabled'),
    Fr = createFieldFn('reco-data', (e, n, d) => {
      var p, h;
      if (
        (null === (p = zt(e, n, d)) || void 0 === p
          ? void 0
          : p['event-type']) !== Ct.LYRIC_DISPLAY &&
        (null === (h = ir(e, n, d)) || void 0 === h ? void 0 : h.type) !==
          Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
      )
        return e.recoData;
    }),
    Kr = createClientFieldFn('sb-enabled', 'userIsSubscribed'),
    Gr = createClientFieldFn('siri-initiated', 'siriInitiated'),
    Vr = createClientFieldFn('source-type', 'sourceType'),
    Hr = createFieldFn('start-position-in-milliseconds', (e, n, d) => {
      var p, h;
      const y =
        null === (p = zt(e, n, d)) || void 0 === p ? void 0 : p['event-type'];
      return y === Ct.LYRIC_DISPLAY ||
        (null === (h = ir(e, n, d)) || void 0 === h ? void 0 : h.type) ===
          Mt.AGGREGATE_NON_CATALOG_PLAY_TIME ||
        $r(e, n, d)
        ? 0
        : y === Ct.PLAY_START
          ? lr(e, n, d)
          : null !==
                (m =
                  null !== (_ = e.startPositionInMilliseconds) && void 0 !== _
                    ? _
                    : previousPosition(n)) && void 0 !== m
            ? m
            : 0;
      var _, m;
    }),
    previousPosition = (e) =>
      e && void 0 !== e.position ? Math.round(1e3 * e.position) : 0,
    qr = createClientFieldFn('store-front', 'storefrontId'),
    Wr = createFieldFn('timed-metadata', (e, n, d) => {
      const p = e.timedMetadata;
      if (void 0 !== p && shouldSendTimedMetadata(e, n, d))
        return ((e, n = 8) => {
          if (!(e instanceof Uint8Array)) return '';
          const d = Array.prototype.map.call(e, formatByte).join('');
          return 0 === n
            ? d
            : d.replace(new RegExp(`(.{1,${n}})`, 'g'), '$1 ').trim();
        })(p, 0);
    }),
    shouldSendTimedMetadata = (e, n, d) => {
      var p, h;
      return (
        (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
          Mt.TIMED_METADATA_PING ||
        (null === (h = zt(e, n, d)) || void 0 === h
          ? void 0
          : h['event-type']) !== Ct.LYRIC_DISPLAY
      );
    },
    Yr = createFieldFn('timestamp', ({ timestamp: e }, n, d) =>
      null != e ? e : Date.now(),
    ),
    zr = createClientFieldFn('user-agent', 'userAgent'),
    Qr = createFieldFn('user-preference-audio-quality', (e, n, d) => {
      var p;
      if (Qt(e, n, d))
        return null === (p = e.userPreference) || void 0 === p
          ? void 0
          : p.audioQuality;
    }),
    Jr = createFieldFn('user-preference-playback-format', (e, n, d) => {
      var p;
      if (Qt(e, n, d))
        return null === (p = e.userPreference) || void 0 === p
          ? void 0
          : p.playbackFormat;
    }),
    Xr = createFieldFn('user-token', (e, n, { client: d }) => {
      if (!d.preferDSID) return d.musicUserToken;
    }),
    Zr = createFieldFn('utc-offset-in-seconds', (e, n, d) => {
      var p;
      return (null === (p = ir(e, n, d)) || void 0 === p ? void 0 : p.type) ===
        Mt.AGGREGATE_NON_CATALOG_PLAY_TIME
        ? 0
        : d.client.utcOffsetInSeconds;
    }),
    ei = {
      'audio-quality-provided': Jt,
      'audio-quality-targeted': Xt,
      'build-version': Zt,
      'container-ids': ar,
      'container-type': nr,
      'developer-token': sr,
      'device-name': cr,
      'display-type': dr,
      'end-position-in-milliseconds': ur,
      'end-reason-type': hr,
      'event-reason-hint-type': fr,
      'event-type': zt,
      'feature-name': vr,
      guid: mr,
      ids: kr,
      'internal-build': wr,
      'is-collaborative': Ir,
      'lyric-language': Or,
      'media-duration-in-milliseconds': Cr,
      'media-type': xr,
      'metrics-client-id': Lr,
      offline: Nr,
      'persistent-id': jr,
      'play-mode': Ur,
      'private-enabled': Br,
      'reco-data': Fr,
      'sb-enabled': Kr,
      'siri-initiated': Gr,
      'source-type': Vr,
      'start-position-in-milliseconds': Hr,
      'store-front': qr,
      'timed-metadata': Wr,
      timestamp: Yr,
      type: ir,
      'user-agent': zr,
      'user-preference-audio-quality': Qr,
      'user-preference-playback-format': Jr,
      'user-token': Xr,
      'utc-offset-in-seconds': Zr,
    };
  function _define_property$1t(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$z(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1t(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$m(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  let ti = 0;
  function _define_property$1s(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$l(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const buildPlayActivityData$1 = (e, n, d, p = !1) => {
    const h = ((e, ...n) =>
      _object_spread_props$m(_object_spread$z({}, e, Object.assign({}, ...n)), {
        cache: {
          fields: Object.assign(
            {},
            ...n.map((e) => {
              var n, d;
              return null === (d = e) ||
                void 0 === d ||
                null === (n = d.cache) ||
                void 0 === n
                ? void 0
                : n.fields;
            }),
          ),
          helpers: Object.assign(
            {},
            ...n.map((e) => {
              var n, d;
              return null === (d = e) ||
                void 0 === d ||
                null === (n = d.cache) ||
                void 0 === n
                ? void 0
                : n.helpers;
            }),
          ),
        },
      }))(
      'boolean' == typeof p
        ? ((e = {}, n) =>
            _object_spread$z(
              { id: (ti++).toFixed(0), client: n, isAlexa: !1 },
              e,
            ))({ isAlexa: p }, e)
        : _object_spread_props$l(
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                'function' == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$1s(e, n, d[n]);
                  });
              }
              return e;
            })({}, p),
            { client: e },
          ),
    );
    return (
      (n = normalizePlayActivityDescriptor(n)),
      d && (d = normalizePlayActivityDescriptor(d)),
      Object.assign(
        Object.create(null),
        ...Object.values(ei).map((e) => {
          var p;
          return null === (p = e) || void 0 === p ? void 0 : p(n, d, h);
        }),
      )
    );
  };
  function _define_property$1r(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$x(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1r(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$k(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _define_property$1q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$w(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1q(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$j(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function asyncGeneratorStep$$(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$$(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$$(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$$(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1p(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$i(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  class LyricsPlayActivity extends PlayActivityBase {
    get state() {
      return this._machine.state.value;
    }
    play(e) {
      var n = this;
      return _async_to_generator$$(function* () {
        var d;
        if ('playing' === n.state)
          throw Error(
            'lyrics are already being displayed. Did you forget to stop them?',
          );
        if (void 0 === e) throw Error('Missing descriptor for lyrics play');
        Ue.info(
          `Staring tracking: lyricsId=${
            null === (d = e.lyricDescriptor) || void 0 === d ? void 0 : d.id
          }, itemId=${e.id}, catalogId=${e.catalogId}`,
        ),
          (n.startDescriptor = e),
          n._machine.send({ type: 'play' });
      })();
    }
    stop() {
      var e = this;
      return _async_to_generator$$(function* () {
        var n;
        if ('playing' !== e.state)
          throw Error(
            'lyrics are not being displayed. Did you forget to display them?',
          );
        if (void 0 === e.startDescriptor)
          throw Error('Missing start descriptor for lyrics stop');
        Ue.info(
          `Stopping tracking: lyricsId=${
            null === (n = e.startDescriptor.lyricDescriptor) || void 0 === n
              ? void 0
              : n.id
          }, itemId=${e.startDescriptor.id}, catalogId=${
            e.startDescriptor.catalogId
          }`,
        ),
          e._machine.send({ type: 'stop' });
        const d = e._machine.state.context.duration,
          p = JSON.parse(JSON.stringify(e.startDescriptor));
        (p.lyricDescriptor = _object_spread_props$i(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              'function' == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$1p(e, n, d[n]);
                });
            }
            return e;
          })({}, p.lyricDescriptor),
          { duration: Math.round(d) },
        )),
          Ue.debug('Clearing tracked descriptor'),
          (e.startDescriptor = void 0);
        const h = e.build(p, !1);
        try {
          Ue.debug('Sending PAF request with data payload'),
            yield e.send(h),
            Ue.debug('Done sending PAF request');
        } catch (Q) {
          console.error('Error sending Lyrics PAF request: ' + Q.message),
            Ue.error('Error sending Lyrics PAF request: ' + Q.message);
        }
      })();
    }
    exit() {
      return _async_to_generator$$(function* () {})();
    }
    build(e, n) {
      return ((e, n, d) => {
        if (void 0 === n)
          throw new Error('called without a play activity descriptor');
        const p = _object_spread_props$k(_object_spread$x({}, n), {
          eventType: Ct.LYRIC_DISPLAY,
        });
        return ((e, ...n) => n.reduce((e, n) => n(e), e))(
          _object_spread_props$k(
            _object_spread$x({}, buildPlayActivityData$1(e, p, d, !1)),
            {
              'media-duration-in-milliseconds': 0,
              'media-type': Dt.AUDIO,
              'start-position-in-milliseconds': 0,
              'play-mode': {
                'auto-play-mode': 0,
                'repeat-play-mode': 0,
                'shuffle-play-mode': 0,
              },
            },
          ),
          (e) =>
            exceptFields(
              e,
              'character-display-count',
              'event-reason-hint-type',
              'reco-data',
            ),
        );
      })(this, e, n);
    }
    constructor(e, n, d, p) {
      super(e, n, d, p),
        _define_property$1p(this, '_machine', void 0),
        _define_property$1p(this, 'startDescriptor', void 0),
        (this._machine = v(
          s({
            id: 'lpaf',
            initial: 'idle',
            context: { initialShowTime: -1, duration: -1 },
            states: {
              idle: {
                entry: o((e) =>
                  _object_spread_props$j(_object_spread$w({}, e), {
                    initialShowTime: void 0,
                    duration: qt() - e.initialShowTime,
                  }),
                ),
                on: { play: 'playing' },
              },
              playing: {
                entry: o((e) =>
                  _object_spread_props$j(_object_spread$w({}, e), {
                    initialShowTime: qt(),
                  }),
                ),
                on: { stop: 'idle' },
              },
            },
          }),
        ).start());
    }
  }
  var ri;
  !(function (e) {
    e[(e.ALEXA = 13)] = 'ALEXA';
  })(ri || (ri = {}));
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
    write = (e, n, d, p, h, y) => e.set(n, btoa(JSON.stringify(d)), p, h, y);
  function asyncGeneratorStep$_(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$_(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$_(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$_(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1o(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const { AUTO: ii } = xt;
  class PlayActivityBatchableSender {
    flush() {
      var e = this;
      return _async_to_generator$_(function* () {
        const n = read(e.jar, 'amupaee');
        if (void 0 !== n && 0 !== n.length)
          try {
            yield e.sender.send(n), empty(e.jar, 'amupaee');
          } catch ({ message: d }) {
            throw new Error('flush: ' + d);
          }
      })();
    }
    send(n) {
      var d = this;
      return _async_to_generator$_(function* () {
        if (
          d.mode === ii &&
          (Array.isArray(n) ||
            n['end-reason-type'] !==
              e.PlayActivityEndReasonType.EXITED_APPLICATION)
        )
          return d.sender.send(n);
        var p, h, y, _, m, g;
        (p = d.jar),
          (y = n),
          (_ = '/'),
          write(p, (h = 'amupaee'), [...read(p, h), y], _, m, g);
      })();
    }
    constructor(e, n) {
      _define_property$1o(this, 'sender', void 0),
        _define_property$1o(this, 'jar', void 0),
        _define_property$1o(this, 'mode', void 0),
        (this.sender = e),
        (this.jar = n),
        (this.mode = ii);
    }
  }
  function asyncGeneratorStep$Z(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$Z(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$Z(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$Z(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1n(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class Timeline {
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
      var e = this;
      return _async_to_generator$Z(function* () {
        const n = e._keys.pop();
        if (void 0 === n) return Promise.reject('TIMELINE IS EMPTY');
        const d = e._events[n];
        return delete e._events[n], Promise.resolve(d);
      })();
    }
    add(e, n) {
      var d = this;
      return _async_to_generator$Z(function* () {
        return d.push(e, n);
      })();
    }
    push(e, n = Date.now()) {
      var d = this;
      return _async_to_generator$Z(function* () {
        for (; -1 !== d._keys.indexOf(n); ) n++;
        return (d._events[n] = e), d._keys.push(n), Promise.resolve(n);
      })();
    }
    shift() {
      var e = this;
      return _async_to_generator$Z(function* () {
        const n = e._keys.shift();
        if (void 0 === n) return Promise.reject('TIMELINE IS EMPTY');
        const d = e._events[n];
        return delete e._events[n], Promise.resolve(d);
      })();
    }
    unshift(e, n = Date.now()) {
      var d = this;
      return _async_to_generator$Z(function* () {
        for (; -1 !== d._keys.indexOf(n); ) n++;
        return (d._events[n] = e), d._keys.unshift(n), Promise.resolve(n);
      })();
    }
    constructor() {
      _define_property$1n(this, '_events', {}),
        _define_property$1n(this, '_keys', []);
    }
  }
  function asyncGeneratorStep$Y(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1m(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class TimedMetadataTracker {
    get currentValue() {
      return this._currentValue;
    }
    clear() {
      this._currentValue = void 0;
    }
    ping(e, n) {
      var d,
        p = this;
      return ((d = function* () {
        p.timedMetadataChanged(e) &&
          (void 0 !== p._currentValue &&
            (yield p.client.pingTimedMetadata(n, p._currentValue)),
          (p._currentValue = void 0 === e ? void 0 : e.slice(0)));
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);
          function _next(e) {
            asyncGeneratorStep$Y(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$Y(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    timedMetadataChanged(e) {
      const { _currentValue: n } = this;
      return void 0 === n
        ? void 0 !== e
        : void 0 === e || e.length !== n.length || n.some((n, d) => n !== e[d]);
    }
    constructor(e, n) {
      _define_property$1m(this, 'client', void 0),
        _define_property$1m(this, '_currentValue', void 0),
        (this.client = e),
        (this._currentValue = n);
    }
  }
  const transitionEvent = (e) => ({ type: e });
  function deriveTransitionEvent(n) {
    if (n.itemType === Mt.TIMED_METADATA_PING) return !1;
    if (
      (function (e) {
        return e.eventType === Ct.PLAY_START;
      })(n)
    )
      return transitionEvent('play');
    if (
      (function (e) {
        if (e.eventType !== Ct.PLAY_END) return !1;
        if (void 0 === e.endReasonType)
          throw new Error(
            'PLAY_END activity descriptor requires an endReasonType value',
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
  function _define_property$1l(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$u(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1l(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$h(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _object_without_properties$2(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  class MPAFStateMachine {
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
    constructor() {
      _define_property$1l(this, 'machine', void 0),
        _define_property$1l(this, 'machineService', void 0),
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
                      _object_spread_props$h(_object_spread$u({}, e), {
                        stateBeforeScrub: 'idle',
                      }),
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
                      _object_spread_props$h(_object_spread$u({}, e), {
                        stateBeforeScrub: 'playing',
                      }),
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
              clearStateBeforeScrub: o((e) =>
                _object_without_properties$2(e, ['stateBeforeScrub']),
              ),
              setScrubEndError: o((e) =>
                _object_spread_props$h(_object_spread$u({}, e), {
                  errorMessage:
                    'The scrub() method was called with the SCRUB_END action without a previous SCRUB_START descriptor',
                }),
              ),
            },
          },
        )),
        (this.machineService = v(this.machine).start());
    }
  }
  function asyncGeneratorStep$X(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$X(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$X(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$X(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1k(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$t(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1k(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$g(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  class StatelessPlayActivity extends PlayActivityBase {
    build(e, n) {
      return buildPlayActivityData$1(this, e, n, 'JSCLIENT' !== this.clientId);
    }
    constructor(e, n, d, p) {
      super(e, n, d, p);
    }
  }
  class PlayActivity {
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
      var d = this;
      return _async_to_generator$X(function* () {
        yield d._timedMetadataTracker.ping(e, n);
      })();
    }
    activate(n = !1) {
      var d = this;
      return _async_to_generator$X(function* () {
        if (n)
          try {
            yield d.flush();
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
        const p = d.timeline.last;
        if (
          p &&
          p.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION
        )
          return d.timeline.pop();
      })();
    }
    exit(n = 0) {
      var d = this;
      return _async_to_generator$X(function* () {
        yield d.stop(n, e.PlayActivityEndReasonType.EXITED_APPLICATION);
      })();
    }
    pause(n = 0) {
      var d = this;
      return _async_to_generator$X(function* () {
        yield d.stop(n, e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED);
      })();
    }
    pingTimedMetadata(n, d, p = this.previousDescriptor) {
      var h = this;
      return _async_to_generator$X(function* () {
        yield h._addToTimeline(
          _object_spread_props$g(_object_spread$t({}, p), {
            position: n,
            endReasonType: e.PlayActivityEndReasonType.NOT_APPLICABLE,
            eventType: Ct.PLAY_END,
            itemType: Mt.TIMED_METADATA_PING,
            timedMetadata: d,
          }),
        );
      })();
    }
    play(e, n = 0) {
      var d = this;
      return _async_to_generator$X(function* () {
        const p = d.timeline.length > 0;
        if (void 0 === e) {
          if (!p) return;
          const e = d.previousDescriptor;
          return (
            e.eventType === Ct.PLAY_END && delete e.endReasonType,
            void (yield d._addToTimeline(
              _object_spread_props$g(
                _object_spread$t({}, d.sanitizePreviousDescriptor(e)),
                { eventType: Ct.PLAY_START },
              ),
            ))
          );
        }
        if (p) {
          const e = d.previousDescriptor;
          if (
            d._machine.matches('playing') &&
            !(({ id: e, reporting: n = !0, eventType: d }) =>
              ('-1' === e || !n) && d === Ct.PLAY_END)(e)
          )
            return Promise.reject(
              new Error(
                'The play() method was called without a previous stop() or pause() call.',
              ),
            );
        }
        yield d._addToTimeline(
          _object_spread_props$g(_object_spread$t({}, e), {
            eventType: Ct.PLAY_START,
            position: n,
          }),
        );
      })();
    }
    scrub(n = 0, d = e.PlayActivityEndReasonType.SCRUB_BEGIN) {
      var p = this;
      return _async_to_generator$X(function* () {
        yield p._addToTimeline(
          _object_spread_props$g(
            _object_spread$t(
              {},
              p.sanitizePreviousDescriptor(p.previousDescriptor),
            ),
            { eventType: Ct.PLAY_END, endReasonType: d, position: n },
          ),
        );
      })();
    }
    skip(n, d = e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS, p = 0) {
      var h = this;
      return _async_to_generator$X(function* () {
        yield h.stop(p, d), yield h.play(n);
      })();
    }
    stop(n = 0, d = e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK) {
      var p = this;
      return _async_to_generator$X(function* () {
        let h = p.previousDescriptor;
        if (
          (h.endReasonType === e.PlayActivityEndReasonType.EXITED_APPLICATION &&
            (yield p.timeline.pop(),
            empty(p._cookieJar, 'amupaee'),
            (h = p.previousDescriptor)),
          p._machine.matches('playing'))
        ) {
          const e = _object_spread_props$g(
            _object_spread$t({}, p.sanitizePreviousDescriptor(h)),
            {
              eventType: Ct.PLAY_END,
              endReasonType: d,
              position: n,
              timedMetadata: p._timedMetadataTracker.currentValue,
            },
          );
          yield p._addToTimeline(e);
        }
      })();
    }
    build(e, n) {
      if (
        (void 0 === e &&
          void 0 === n &&
          Ue.warn(
            'You are calling build() from a stateful PAF client. Please, use a stateless client or exit(), pause(), play(), scrub(), skip() or stop() instead.',
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
          e.eventType === Ct.PLAY_END
        )
          throw new Error(
            'Cannot build() for PLAY_END descriptors without previous descriptors',
          );
        n = null != n && n;
      }
      return this._paf.build(
        _object_spread_props$g(_object_spread$t({}, e), {
          timedMetadata: this.timedMetadata,
        }),
        n,
      );
    }
    addForPlayParams(e, n, d, p = 0, h = {}) {
      var y = this;
      return _async_to_generator$X(function* () {
        yield y._addToTimeline(y.buildDescriptorForPlayParams(e, n, d, p, h));
      })();
    }
    buildDescriptorForPlayParams(e, n, d, p = 0, h = {}) {
      const y = 'stream' === e.format ? Mt.STREAM : Mt.ITUNES_STORE_CONTENT;
      return normalizePlayActivityDescriptor(
        _object_spread$t(
          _object_spread_props$g(_object_spread$t({}, e), {
            container: d,
            duration: p,
            eventType: n,
            itemType: y,
          }),
          h,
        ),
      );
    }
    flush() {
      return this.sender.flush();
    }
    _addToTimeline(e) {
      var n = this;
      return _async_to_generator$X(function* () {
        e = _object_spread_props$g(_object_spread$t({}, e), {
          timestamp: Date.now(),
        });
        const d = n.timeline.length > 0 && n.timeline.last;
        yield n.timeline.add(e);
        const p = n.build(e, d);
        yield n.send(p, e);
      })();
    }
    get previousDescriptor() {
      const e = this.timeline.last;
      if (void 0 === e)
        throw new Error('A method was called without a previous descriptor');
      return exceptFields(e, 'timestamp');
    }
    buildForPlayParams(e, n, d, p = 0, h = {}, y = !1) {
      return (
        Ue.warn(
          'You are using buildsForPlayParams from a stateful PlayActivity. Please, use StatelessPlayActivity instead',
        ),
        this._paf.buildForPlayParams(e, n, d, p, h, y)
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
        n.itemType === Mt.TIMED_METADATA_PING &&
          (n = exceptFields(n, 'itemType')),
        n
      );
    }
    constructor(e, n, d, p) {
      var h;
      _define_property$1k(this, 'sender', void 0),
        _define_property$1k(this, 'timeline', new Timeline()),
        _define_property$1k(this, '_cookieJar', void 0),
        _define_property$1k(this, '_paf', void 0),
        _define_property$1k(this, '_machine', void 0),
        _define_property$1k(this, '_timedMetadataTracker', void 0),
        (this._paf = new StatelessPlayActivity(e, n, d, p)),
        (this._cookieJar = createCookieJar(
          null === (h = p) || void 0 === h ? void 0 : h.cookieJar,
        )),
        (this.sender = new PlayActivityBatchableSender(
          this._paf.sender,
          this._cookieJar,
        )),
        (this._machine = new MPAFStateMachine()),
        (this._timedMetadataTracker = new TimedMetadataTracker(this));
    }
  }
  const Bind = () => (e, n, d) => {
      if (void 0 === d || 'function' != typeof d.value)
        throw new TypeError(
          `Only methods can be decorated with @Bind, but ${n} is not a method.`,
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
    ni = [
      'exitFullscreen',
      'webkitExitFullscreen',
      'mozCancelFullScreen',
      'msExitFullscreen',
    ],
    oi = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement',
    ],
    ai = [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'mozRequestFullScreen',
      'msRequestFullscreen',
    ],
    noop = () => Promise.resolve(),
    si = ((e) => {
      if (void 0 === e) return noop;
      const n = ni.find((n) => 'function' == typeof e.prototype[n]);
      return 'string' != typeof n
        ? noop
        : (e = self.document) => {
            var d, p;
            return null === (p = e) ||
              void 0 === p ||
              null === (d = p[n]) ||
              void 0 === d
              ? void 0
              : d.call(p);
          };
    })(HTMLDocument),
    ci = ((e) => {
      if (void 0 === e) return () => !1;
      const n = oi.find((n) => n in e.prototype);
      return 'string' != typeof n ? () => !1 : (e = self.document) => !!e[n];
    })(HTMLDocument),
    di = ((e) => {
      if (void 0 === e) return noop;
      const n = ai.find((n) => 'function' == typeof e.prototype[n]);
      return 'string' != typeof n
        ? noop
        : (e) => {
            var d;
            return null === (d = e) || void 0 === d ? void 0 : d[n]();
          };
    })(HTMLElement);
  function asyncGeneratorStep$W(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$W(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$W(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$W(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  class Fullscreen {
    exit() {
      var e = this;
      return _async_to_generator$W(function* () {
        if (e.isInFullscreen())
          return e.stopDispatchingEvents(() => e.exitFullscreen());
      })();
    }
    request(e) {
      var n = this;
      return _async_to_generator$W(function* () {
        if (void 0 !== e)
          return n.stopDispatchingEvents(() =>
            n.requestFullscreenForElement(e),
          );
      })();
    }
    stopDispatchingEvents(e) {
      var n = this;
      return _async_to_generator$W(function* () {
        return n.player.windowHandlers.stopListeningToVisibilityChanges(e);
      })();
    }
    exitFullscreen() {
      return si();
    }
    isInFullscreen() {
      return ci();
    }
    requestFullscreenForElement(e) {
      return di(e);
    }
    constructor(e) {
      var n, d, p;
      (p = void 0),
        (d = 'player') in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p),
        (this.player = e);
    }
  }
  function asyncGeneratorStep$V(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1i(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class UnsupportedSeeker {
    start() {
      je.warn('seeker.start is not supported in this playback method');
    }
    end() {
      je.warn('seeker.end is not supported in this playback method');
    }
    seekToTime(e) {
      return (
        je.warn('seekToTime is not supported in this playback method'),
        Promise.resolve()
      );
    }
    constructor() {
      _define_property$1i(this, 'ended', !1);
    }
  }
  class PlayerSeeker {
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
      je.debug('seeker: end'),
        -1 !== this._startTime
          ? this._ended
            ? je.warn('seeker: Cannot end the same seeker twice.')
            : (this.dispatchStartEvent(), this.dispatchEndEvent())
          : je.warn('seeker: Cannot end a seeker before starting it.');
    }
    seekToTime(e) {
      var n,
        d = this;
      return ((n = function* () {
        if ((je.debug('seeker: seekToTime', e), !d.ended))
          return (
            d.stillPlayingSameItem ||
              ((d._currentItem = d._player.nowPlayingItem), (d._startTime = 0)),
            (d._lastSeekedTime = e),
            d._player.seekToTime(e)
          );
        je.warn('seeker: Cannot seek once the seeker has ended');
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$V(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$V(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    start() {
      je.debug('seeker: start'),
        -1 === this._startTime
          ? ((this._currentItem = this._player.nowPlayingItem),
            (this._startTime = this._player.currentPlaybackTime),
            (this._lastSeekedTime = this._startTime))
          : je.warn('seeker: Cannot start same seeker twice');
    }
    dispatch(e, n) {
      this.isEngagedInPlayback
        ? (je.debug('seeker: dispatch', e), this._player.dispatch(e, n))
        : je.debug(
            'seeker: do not dispatch because isEngagedInPlayback',
            this.isEngagedInPlayback,
          );
    }
    dispatchStartEvent() {
      this.stillPlayingSameItem ||
        ((this._startTime = 0), (this._lastSeekedTime = 0)),
        this.dispatch(_t.playbackScrub, {
          item: this._currentItem,
          position: this._startTime,
        });
    }
    dispatchEndEvent() {
      (this._ended = !0),
        this.dispatch(_t.playbackScrub, {
          item: this._currentItem,
          position: this._lastSeekedTime,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
        });
    }
    constructor(e) {
      _define_property$1i(this, '_ended', !1),
        _define_property$1i(this, '_lastSeekedTime', -1),
        _define_property$1i(this, '_player', void 0),
        _define_property$1i(this, '_startTime', -1),
        _define_property$1i(this, '_currentItem', void 0),
        je.debug('seeker: new'),
        (this._player = e);
    }
  }
  function asyncGeneratorStep$U(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$1h(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$q(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$q(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const {
    visibilityChangeEvent: li,
    visibilityState: ui,
    unloadEventName: pi,
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
    activate(e = self, n = self.document) {
      n.addEventListener(li, this.visibilityChanged),
        e.addEventListener('storage', this.storage, !1),
        e.addEventListener(pi, this.windowUnloaded);
    }
    deactivate() {
      document.removeEventListener(li, this.visibilityChanged),
        window.removeEventListener('storage', this.storage),
        window.addEventListener(pi, this.windowUnloaded);
    }
    stopListeningToVisibilityChanges(e) {
      var n,
        d = this;
      return ((n = function* () {
        d.dispatchVisibilityChanges = !1;
        const n = yield e();
        return (d.dispatchVisibilityChanges = !0), n;
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$U(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$U(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    dispatch(e, n = {}) {
      this.player.dispatch(e, n);
    }
    storage({ key: e, newValue: n }) {
      e === ze && this.player.tsidChanged(n);
    }
    visibilityChanged(e) {
      const n = e.target[ui];
      je.info('dc visibilityState', n, e, ci()),
        this.runtimeEnvironment.os.isIOS &&
          this.dispatchVisibilityChanges &&
          ('hidden' === n
            ? this.dispatch(_t.playerExit, {
                item: this.player.nowPlayingItem,
                position: this.player.currentPlaybackTime,
              })
            : 'visible' === n && this.dispatch(_t.playerActivate));
    }
    windowUnloaded() {
      this.player.isPlaying &&
        this.dispatch(_t.playerExit, {
          item: this.player.nowPlayingItem,
          position: this.player.currentPlaybackTime,
        });
    }
    constructor(e, n) {
      _define_property$1h(this, 'player', void 0),
        _define_property$1h(this, 'runtimeEnvironment', void 0),
        _define_property$1h(this, 'dispatchVisibilityChanges', !0),
        (this.player = e),
        (this.runtimeEnvironment = n);
    }
  }
  function asyncGeneratorStep$T(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$T(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$T(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$T(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1g(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$s(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1g(e, n, d[n]);
        });
    }
    return e;
  }
  function _ts_metadata$p(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$q(
    [
      Bind(),
      _ts_metadata$q('design:type', Function),
      _ts_metadata$q('design:paramtypes', [void 0]),
    ],
    WindowHandlers.prototype,
    'storage',
    null,
  ),
    _ts_decorate$q(
      [
        Bind(),
        _ts_metadata$q('design:type', Function),
        _ts_metadata$q('design:paramtypes', [
          'undefined' == typeof Event ? Object : Event,
        ]),
      ],
      WindowHandlers.prototype,
      'visibilityChanged',
      null,
    ),
    _ts_decorate$q(
      [
        Bind(),
        _ts_metadata$q('design:type', Function),
        _ts_metadata$q('design:paramtypes', []),
      ],
      WindowHandlers.prototype,
      'windowUnloaded',
      null,
    );
  const {
      bufferedProgressDidChange: hi,
      mediaCanPlay: yi,
      mediaElementCreated: _i,
      mediaPlaybackError: fi,
      nowPlayingItemDidChange: vi,
      nowPlayingItemWillChange: mi,
      metadataDidChange: gi,
      primaryPlayerDidChange: bi,
      playbackDurationDidChange: Si,
      playbackProgressDidChange: Pi,
      playbackStateDidChange: Ei,
      playbackRateDidChange: Ti,
      playbackStateWillChange: ki,
      playbackTargetAvailableDidChange: wi,
      playbackTargetIsWirelessDidChange: Ii,
      playbackTimeDidChange: Oi,
      playbackVolumeDidChange: Ai,
    } = vt,
    Ri = [
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
    $i = ['NotAllowedError', 'NotSupportedError'],
    {
      ended: Ci,
      loading: Mi,
      paused: Di,
      playing: xi,
      seeking: Li,
      stopped: Ni,
      waiting: ji,
    } = e.PlaybackStates;
  class BasePlayer {
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
      var n;
      return (
        this._targetElement.currentTime -
        (null !==
          (n =
            null === (e = this._buffer) || void 0 === e
              ? void 0
              : e.currentTimestampOffset) && void 0 !== n
          ? n
          : 0)
      );
    }
    get currentPlaybackDuration() {
      const n = this.nowPlayingItem;
      if (!n) return 0;
      const d =
          n.playbackType === e.PlaybackType.encryptedFull ||
          n.playbackType === e.PlaybackType.unencryptedFull,
        p = n.playbackDuration;
      return d && p
        ? this.calculateTime(p / 1e3)
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
      return this.playbackState === xi;
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
            n.setItem(ze, this._serial)
          : (this._dispatcher.publish(bi, { target: this }),
            this.pause({ userInitiated: !1 })));
    }
    get isReady() {
      return 0 !== this._targetElement.readyState;
    }
    get nowPlayingItem() {
      return this._nowPlayingItem;
    }
    set nowPlayingItem(e) {
      var n, d;
      const p = this._dispatcher;
      if (void 0 === e)
        return (
          p.publish(mi, { item: e }),
          (this._nowPlayingItem = e),
          void p.publish(vi, { item: e })
        );
      const h = this._nowPlayingItem,
        y = this._buffer;
      (null === (n = h) || void 0 === n ? void 0 : n.isEqual(e)) ||
        (p.publish(mi, { item: e }),
        this.isPlaying &&
          (null === (d = y) || void 0 === d ? void 0 : d.currentItem) !== e &&
          this._pauseMedia(),
        h &&
          (je.debug('setting state to ended on ', h.title),
          (h.state = F.ended),
          h.endMonitoringStateDidChange(),
          h.endMonitoringStateWillChange()),
        (this._nowPlayingItem = e),
        je.debug('setting state to playing on ', e.title),
        (e.state = F.playing),
        e && e.info && this._setTargetElementTitle(e.info),
        p.publish(vi, { item: e }),
        p.publish(Si, {
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
      const p = { oldState: d, state: e, nowPlayingItem: n };
      je.debug('BasePlayer.playbackState is changing', p),
        this._dispatcher.publish(ki, p),
        (this._playbackState = e),
        this._dispatcher.publish(Ei, p);
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
        this._dispatcher.publish(wi, { available: e }));
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
        this._dispatcher.publish(Ii, { playing: e }));
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
      var e = this;
      return _async_to_generator$T(function* () {
        je.debug('BasePlayer.initialize'),
          e.isPlayerSupported()
            ? (yield e.initializeMediaElement(),
              yield e.initializeExtension(),
              e.initializeEventHandlers(),
              e._dispatcher.publish(_i, e._targetElement))
            : je.warn('{this.constructor.name} not supported');
      })();
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
          },
        )),
        Ri.forEach((n) => e.addEventListener(n, this)),
        this._dispatcher.publish(_t.playerActivate);
    }
    removeEventHandlers() {
      Ri.forEach((e) => this._targetElement.removeEventListener(e, this)),
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
      var n = this;
      return _async_to_generator$T(function* () {
        je.debug('BasePlayer.stop', e),
          yield n._waitForPendingPlay(),
          n.isPlaying &&
            (je.debug('BasePlayer.play dispatching playbackStop'),
            n.dispatch(
              _t.playbackStop,
              _object_spread$s(
                {
                  item: n.nowPlayingItem,
                  position: n.currentPlaybackTime,
                  startPosition: n.initialBufferPosition,
                  playingDate: n.currentPlayingDate,
                  startPlayingDate: n.initialPlayingDate,
                },
                e,
              ),
            )),
          yield n.stopMediaAndCleanup();
      })();
    }
    stopMediaAndCleanup(e = Ni) {
      var n = this;
      return _async_to_generator$T(function* () {
        je.debug('stopMediaAndCleanup'),
          yield n._stopMediaElement(),
          (n._stopped = !0),
          (n._paused = !1);
        const d = n.nowPlayingItem;
        (n.nowPlayingItem = void 0),
          (n.initialBufferPosition = void 0),
          (n.initialPlayingDate = void 0),
          n.setPlaybackState(e, d);
      })();
    }
    onPlaybackError(n, d) {
      this.resetDeferredPlay(),
        this.stop({
          endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
          userInitiated: !1,
        });
    }
    calculatePlaybackProgress() {
      const e =
        Math.round(
          100 * (this.currentPlaybackTime / this.currentPlaybackDuration || 0),
        ) / 100;
      this._currentPlaybackProgress !== e &&
        ((this._currentPlaybackProgress = e),
        this._dispatcher.publish(Pi, {
          progress: this._currentPlaybackProgress,
        }));
    }
    calculateBufferedProgress(e) {
      const n = Math.round((e / this.currentPlaybackDuration) * 100);
      this._currentBufferedProgress !== n &&
        ((this._currentBufferedProgress = n),
        this._dispatcher.publish(hi, { progress: n }));
    }
    destroy() {
      var e, n;
      if (
        (je.debug('BasePlayer.destroy'),
        (this._isDestroyed = !0),
        this._dispatcher.unsubscribe(fi, this.onPlaybackError),
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
      var d = this;
      return _async_to_generator$T(function* () {
        'timeupdate' !== n.type &&
          je.debug(
            'BasePlayer.handleEvent: ',
            n.type,
            n,
            d.isPaused(),
            d._stopped,
          );
        const { nowPlayingItem: p } = d;
        switch (((n.timestamp = Date.now()), n.type)) {
          case 'canplay':
            d._dispatcher.publish(yi, n),
              d._playbackState !== ji ||
                d._targetElement.paused ||
                d.setPlaybackState(xi, p);
            break;
          case 'durationchange':
            d._targetElement.duration !== 1 / 0 &&
              ((n.duration = d.currentPlaybackDuration),
              d._dispatcher.publish(Si, n),
              d.calculatePlaybackProgress());
            break;
          case 'ended': {
            var h, y;
            if (
              (je.debug('media element "ended" event'),
              null === (h = d.nowPlayingItem) || void 0 === h
                ? void 0
                : h.isLinearStream)
            )
              return void je.warn('ignoring ended event for linear stream', n);
            if (d.isElementCleaned()) {
              je.debug('media element already cleaned, ignoring "ended" event');
              break;
            }
            const p = d.nowPlayingItem,
              _ = (
                null === (y = p) || void 0 === y ? void 0 : y.playbackDuration
              )
                ? p.playbackDuration / 1e3
                : d.currentPlaybackTime,
              m = d.currentPlayingDate;
            yield d.stopMediaAndCleanup(Ci),
              d.dispatch(_t.playbackStop, {
                item: p,
                position: _,
                playingDate: m,
                endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
              });
            break;
          }
          case 'error':
            je.error('Playback Error', n, d._targetElement.error),
              d._dispatcher.publish(
                fi,
                new MKError(MKError.Reason.MEDIA_PLAYBACK, 'Playback Error'),
              );
            break;
          case 'loadedmetadata':
            d._dispatcher.publish(gi, n);
            break;
          case 'loadstart':
            d.setPlaybackState(Mi, p);
            break;
          case 'pause':
            d.setPlaybackState(d._stopped ? Ni : Di, p);
            break;
          case 'play':
          case 'playing':
            (d._paused = !1),
              (d._stopped = !1),
              (d.isPrimaryPlayer = !0),
              d.setPlaybackState(xi, p);
            break;
          case 'progress': {
            const e = d._targetElement.buffered;
            d.handleBufferStart(),
              1 === e.length &&
                0 === e.start(0) &&
                d.calculateBufferedProgress(e.end(0));
            break;
          }
          case 'ratechange':
            d._dispatcher.publish(Ti, n);
            break;
          case 'seeked':
            d._stopped
              ? d.setPlaybackState(Ni, p)
              : d._paused
                ? d.setPlaybackState(Di, p)
                : d.playbackState !== Ci && d.setPlaybackState(xi, p);
            break;
          case 'seeking':
            d.playbackState === Di
              ? (d._paused = !0)
              : d.playbackState === Ni && (d._stopped = !0),
              d.playbackState !== Ci && d.setPlaybackState(Li, p);
            break;
          case 'timeupdate': {
            d._dispatcher.publish(Oi, {
              currentPlaybackDuration: d.currentPlaybackDuration,
              currentPlaybackTime: d.currentPlaybackTime,
              currentPlaybackTimeRemaining: d.currentPlaybackTimeRemaining,
            }),
              d.calculatePlaybackProgress();
            const e = d._buffer;
            e && (e.currentTime = d.currentPlaybackTime);
            break;
          }
          case 'volumechange':
            d._dispatcher.publish(Ai, n);
            break;
          case 'waiting':
            d.setPlaybackState(ji, p);
        }
      })();
    }
    handleBufferStart() {
      const { _targetElement: e } = this;
      void 0 !== this.initialBufferPosition ||
        e.paused ||
        0 === e.buffered.length ||
        ((this.initialBufferPosition = e.buffered.start(0)),
        (this.initialPlayingDate = this.currentPlayingDate),
        je.debug(
          'BasePlayer.handleBufferStart: setting initial buffer position ',
          this.initialBufferPosition,
        ));
    }
    pause(e = {}) {
      var n = this;
      return _async_to_generator$T(function* () {
        yield n._waitForPendingPlay(),
          n.isPlaying &&
            (yield n._pauseMedia(),
            (n._paused = !0),
            n.dispatch(
              _t.playbackPause,
              _object_spread$s(
                {
                  item: n.nowPlayingItem,
                  position: n.currentPlaybackTime,
                  playingDate: n.currentPlayingDate,
                },
                e,
              ),
            ));
      })();
    }
    play(e = !0) {
      var n = this;
      return _async_to_generator$T(function* () {
        if ((je.debug('BasePlayer.play()'), n.nowPlayingItem))
          try {
            yield n._playMedia(),
              je.debug('BasePlayer.play dispatching playbackPlay'),
              n.dispatch(_t.playbackPlay, {
                userInitiated: e,
                item: n.nowPlayingItem,
                position: n.currentPlaybackTime,
                playingDate: n.currentPlayingDate,
              });
          } catch (Ut) {
            var d;
            if (
              (Ut &&
                $i.includes(Ut.name) &&
                je.error('BasePlayer.play() rejected due to', Ut),
              'NotAllowedError' ===
                (null === (d = Ut) || void 0 === d ? void 0 : d.name))
            )
              throw new MKError(
                MKError.Reason.USER_INTERACTION_REQUIRED,
                'Playback of media content requires user interaction first and cannot be automatically started on page load.',
              );
          }
      })();
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
      var e = this;
      return _async_to_generator$T(function* () {
        e._deferredPlay &&
          (yield e._deferredPlay.promise, (e._deferredPlay = void 0));
      })();
    }
    _loadMedia() {
      var e = this;
      return _async_to_generator$T(function* () {
        je.debug('BasePlayer._loadMedia', e._targetElement),
          e._targetElement.load();
      })();
    }
    _pauseMedia() {
      var e = this;
      return _async_to_generator$T(function* () {
        e._targetElement.pause();
      })();
    }
    _playAssetURL(e, n) {
      var d = this;
      return _async_to_generator$T(function* () {
        je.debug('BasePlayer._playAssetURL', e), (d._targetElement.src = e);
        const p = d._loadMedia();
        if (n) return je.debug('BasePlayer.loadOnly'), void (yield p);
        yield d._playMedia();
      })();
    }
    playItemFromUnencryptedSource(e, n, d) {
      var p = this;
      return _async_to_generator$T(function* () {
        var h;
        return (
          (null === (h = d) || void 0 === h ? void 0 : h.startTime) &&
            (e += '#t=' + d.startTime),
          n || p.startPlaybackSequence(),
          yield p._playAssetURL(e, n),
          p.finishPlaybackSequence()
        );
      })();
    }
    _playMedia() {
      var e = this;
      return _async_to_generator$T(function* () {
        je.debug('BasePlayer._playMedia', e._targetElement, e.extension);
        try {
          yield e._targetElement.play(), (e._playbackDidStart = !0);
        } catch (Q) {
          throw (
            (je.error(
              'BasePlayer._playMedia: targetElement.play() rejected',
              Q,
            ),
            Q)
          );
        }
      })();
    }
    _setTargetElementTitle(e) {
      this.hasMediaElement && (this._targetElement.title = e);
    }
    resetDeferredPlay() {
      this._deferredPlay = void 0;
    }
    _stopMediaElement() {
      var e = this;
      return _async_to_generator$T(function* () {
        e.hasMediaElement && (e._targetElement.pause(), e.cleanupElement());
      })();
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
    finishPlaybackSequence() {
      var e;
      je.debug('BasePlayer.finishPlaybackSequence', this._deferredPlay);
      const n =
        null === (e = this._deferredPlay) || void 0 === e
          ? void 0
          : e.resolve(void 0);
      return (this._deferredPlay = void 0), n;
    }
    startPlaybackSequence() {
      return (
        je.debug('BasePlayer.startPlaybackSequence', this._deferredPlay),
        this._deferredPlay &&
          (je.warn('Previous playback sequence not cleared'),
          this.finishPlaybackSequence()),
        (this._deferredPlay = (function () {
          let e, n;
          return {
            promise: new Promise(function (d, p) {
              (e = d), (n = p);
            }),
            resolve(n) {
              var d;
              null === (d = e) || void 0 === d || d(n);
            },
            reject(e) {
              var d;
              null === (d = n) || void 0 === d || d(e);
            },
          };
        })()),
        this._deferredPlay.promise
      );
    }
    constructor(n) {
      var d;
      _define_property$1g(this, 'privateEnabled', !1),
        _define_property$1g(this, 'siriInitiated', !1),
        _define_property$1g(this, 'windowHandlers', void 0),
        _define_property$1g(this, '_dispatcher', void 0),
        _define_property$1g(this, '_buffer', void 0),
        _define_property$1g(this, 'services', void 0),
        _define_property$1g(this, '_context', void 0),
        _define_property$1g(this, '_currentBufferedProgress', 0),
        _define_property$1g(this, 'initialBufferPosition', void 0),
        _define_property$1g(this, 'initialPlayingDate', void 0),
        _define_property$1g(this, '_paused', !1),
        _define_property$1g(this, '_playbackState', e.PlaybackStates.none),
        _define_property$1g(this, '_stopped', !1),
        _define_property$1g(this, '_playbackDidStart', !1),
        _define_property$1g(this, '_nowPlayingItem', void 0),
        _define_property$1g(this, '_bitrateCalculator', void 0),
        _define_property$1g(this, '_currentPlaybackProgress', 0),
        _define_property$1g(this, '_isPrimaryPlayer', !0),
        _define_property$1g(this, '_playbackTargetAvailable', !1),
        _define_property$1g(this, '_playbackTargetIsWireless', !1),
        _define_property$1g(this, '_seeker', void 0),
        _define_property$1g(this, '_serial', Date.now().toString()),
        _define_property$1g(this, '_timing', void 0),
        _define_property$1g(this, 'fullscreen', void 0),
        _define_property$1g(this, '_isDestroyed', !1),
        _define_property$1g(this, '_deferredPlay', void 0),
        (this.services = n.services),
        (this._dispatcher = n.services.dispatcher),
        (this._timing = n.services.timing),
        (this._context = n.context || {}),
        (this.privateEnabled = n.privateEnabled || !1),
        (this.siriInitiated = n.siriInitiated || !1),
        (this._bitrateCalculator = n.services.bitrateCalculator),
        (this.windowHandlers = new WindowHandlers(this, n.services.runtime)),
        (this.fullscreen = new Fullscreen(this)),
        null === (d = getLocalStorage()) ||
          void 0 === d ||
          d.setItem(ze, this._serial),
        this._dispatcher.subscribe(fi, this.onPlaybackError);
    }
  }
  function generateAssetUrl(e, n) {
    if ('Preview' === e.type && isStringNotEmpty(e.previewURL))
      return e.previewURL;
    let d = e.assetURL;
    if (!d) throw new Error('Cannot generate asset URL');
    return (
      n &&
        (n.startOver && (d = addQueryParamsToURL(d, { startOver: !0 })),
        n.bingeWatching && (d = addQueryParamsToURL(d, { bingeWatching: !0 }))),
      e.supportsLinearScrubbing &&
        (d = addQueryParamsToURL(d, { linearScrubbingSupported: !0 })),
      d.match(/xapsub=accepts-css/) ||
        (d = addQueryParamsToURL(d, { xapsub: 'accepts-css' })),
      d
    );
  }
  function restoreSelectedTrack(e, n) {
    je.debug('MEDIA_TRACKS restoreSelectedTrack');
    const d = e.getPersistedTrack(),
      p = e.fields,
      h = n.currentTrack;
    if (!d) return void je.debug('MEDIA_TRACKS no persisted track');
    if (h && trackEquals(h, d, p))
      return void je.debug(
        'MEDIA_TRACKS persisted track is equal to current track, not setting',
      );
    const y = n.tracks;
    if (y && y.length)
      for (let _ = 0; _ < y.length; _++) {
        const e = y[_];
        if (
          (je.debug(
            `MEDIA_TRACKS testing track ${
              e.label
            } against persisted track ${JSON.stringify(d)}`,
          ),
          trackEquals(e, d, p))
        ) {
          je.debug('MEDIA_TRACKS found matching track ' + e.label),
            (n.currentTrack = e);
          break;
        }
      }
  }
  function trackEquals(e, n, d) {
    let p = !0;
    for (let h = 0; h < d.length; h++) {
      const y = d[h];
      if (e[y] !== n[y]) {
        p = !1;
        break;
      }
    }
    return p;
  }
  function _define_property$1f(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$p('design:type', Function),
      _ts_metadata$p('design:paramtypes', [
        String,
        void 0 === MKError ? Object : MKError,
      ]),
    ],
    BasePlayer.prototype,
    'onPlaybackError',
    null,
  );
  class TrackPersistence {
    getPersistedTrack() {
      var e;
      if (!hasLocalStorage()) return !1;
      const n =
        (null === (e = getLocalStorage()) || void 0 === e
          ? void 0
          : e.getItem(this.storageKey)) || '';
      try {
        return JSON.parse(n);
      } catch (Ut) {
        return je.warn('MEDIA_TRACK could not parse persisted value ' + n), !1;
      }
    }
    setPersistedTrack(e) {
      var n, d;
      if (!hasLocalStorage()) return;
      if (
        (je.debug(
          `MEDIA_TRACK setPersistedTrack ${e.language},${e.label},${e.kind} with keys ${this.fields}`,
        ),
        !e)
      )
        return void (
          null === (d = getLocalStorage()) ||
          void 0 === d ||
          d.setItem(this.storageKey, '')
        );
      const p = JSON.stringify(this.extractFieldValuesFromTrack(e));
      je.debug('MEDIA_TRACK Extracted values ' + p),
        null === (n = getLocalStorage()) ||
          void 0 === n ||
          n.setItem(this.storageKey, p);
    }
    extractFieldValuesFromTrack(e) {
      const n = {};
      return (
        this.fields.forEach((d) => {
          const p = e[d];
          null == p &&
            je.warn(
              `MEDIA_TRACK No value for field ${d} on track ${JSON.stringify(
                e,
              )}`,
            ),
            (n[d] = p);
        }),
        n
      );
    }
    constructor(e, n) {
      _define_property$1f(this, 'storageKey', void 0),
        _define_property$1f(this, 'fields', void 0),
        (this.storageKey = e),
        (this.fields = n);
    }
  }
  var Ui;
  !(function (e) {
    (e.Home = 'com.apple.amp.appletv.home-team-radio'),
      (e.Away = 'com.apple.amp.appletv.away-team-radio');
  })(Ui || (Ui = {}));
  class TrackManagerStub {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentTrack() {
      return {};
    }
    set currentTrack(e) {}
    get tracks() {
      return [];
    }
    destroy() {
      this._isDestroyed = !0;
    }
    restoreSelectedTrack() {}
    constructor() {
      var e, n, d;
      (d = !1),
        (n = '_isDestroyed') in (e = this)
          ? Object.defineProperty(e, n, {
              value: d,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[n] = d);
    }
  }
  function _define_property$1d(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const {
      audioTrackAdded: Bi,
      audioTrackChanged: Fi,
      audioTrackRemoved: Ki,
    } = vt,
    { audioTracksSwitched: Gi, audioTracksUpdated: Vi } = Je;
  class AudioTrackManager {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentTrack() {
      return this.tracks.find((e) => e.enabled);
    }
    set currentTrack(e) {
      e &&
        (je.debug('MEDIA_TRACK Setting audio track ' + e.label),
        this.extensionTracks
          ? (je.debug(
              `MEDIA_TRACK Setting track on extension ${e.id}-${e.label}`,
            ),
            (this.extensionTracks.audioTrack = e))
          : (je.debug('MEDIA_TRACK disabling all audio tracks'),
            Array.from(this.mediaElement.audioTracks).forEach((n) => {
              n !== e && (n.enabled = !1);
            }),
            je.debug('MEDIA_TRACK enabling', e),
            (e.enabled = !0)),
        (function (e) {
          return (
            void 0 !== e.characteristics &&
            e.characteristics.includes('com.apple.amp.appletv.home-team-radio')
          );
        })(e) ||
          (function (e) {
            return (
              void 0 !== e.characteristics &&
              e.characteristics.includes(
                'com.apple.amp.appletv.away-team-radio',
              )
            );
          })(e) ||
          this.trackPersistence.setPersistedTrack(e));
    }
    get tracks() {
      return this.extensionTracks
        ? this._extensionTracks || this.extensionTracks.audioTracks || []
        : Array.from(this.mediaElement.audioTracks);
    }
    destroy() {
      if (((this._isDestroyed = !0), this.extensionTracks)) {
        const e = this.extensionTracks;
        e.removeEventListener(Vi, this.onExtensionAudioTracksUpdated),
          e.removeEventListener(Gi, this.onExtensionAudioTrackSwitched);
      } else {
        if (!this.mediaElement.audioTracks) return;
        this.mediaElement.audioTracks.removeEventListener(
          'addtrack',
          this.onAudioTrackAdded,
        ),
          this.mediaElement.audioTracks.removeEventListener(
            'change',
            this.onAudioTrackChanged,
          ),
          this.mediaElement.audioTracks.removeEventListener(
            'removetrack',
            this.onAudioTrackRemoved,
          );
      }
    }
    restoreSelectedTrack() {
      return restoreSelectedTrack(this.trackPersistence, this);
    }
    onExtensionAudioTracksUpdated(e) {
      je.debug(
        'MEDIA_TRACK Extension audio tracks updated ' + JSON.stringify(e),
      ),
        (this._extensionTracks = e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(Bi, e);
    }
    onExtensionAudioTrackSwitched(e) {
      if (
        (je.debug(
          'MEDIA_TRACK Extension audio track switched ' + JSON.stringify(e),
        ),
        this._extensionTracks)
      ) {
        const preserveSelectedTrack = (n) => {
          n.enabled = e.selectedId === n.id;
        };
        this._extensionTracks.forEach(preserveSelectedTrack);
      }
      this.dispatcher.publish(Fi, e);
    }
    onAudioTrackAdded(e) {
      !(function (e, n, d) {
        const p = n.getPersistedTrack();
        p &&
          trackEquals(e, p, n.fields) &&
          (je.debug(
            'MEDIA_TRACK onTrackAdded with track that matches persisted track ' +
              e.label,
          ),
          (d.currentTrack = e));
      })(e.track, this.trackPersistence, this),
        this.dispatcher.publish(Bi, e);
    }
    onAudioTrackChanged(e) {
      this.dispatcher.publish(Fi, e);
    }
    onAudioTrackRemoved(e) {
      this.dispatcher.publish(Ki, e);
    }
    constructor(e, n, d) {
      if (
        (_define_property$1d(this, 'mediaElement', void 0),
        _define_property$1d(this, 'dispatcher', void 0),
        _define_property$1d(this, 'extensionTracks', void 0),
        _define_property$1d(this, '_extensionTracks', void 0),
        _define_property$1d(this, 'trackPersistence', void 0),
        _define_property$1d(this, '_isDestroyed', void 0),
        (this.mediaElement = e),
        (this.dispatcher = n),
        (this.extensionTracks = d),
        (this._extensionTracks = []),
        (this.trackPersistence = new TrackPersistence('mk-audio-track', [
          'label',
          'language',
          'kind',
        ])),
        (this._isDestroyed = !1),
        this.extensionTracks)
      ) {
        je.debug(
          'MEDIA_TRACK Initializing audio track manager for hls track events',
        ),
          (this.onExtensionAudioTracksUpdated =
            this.onExtensionAudioTracksUpdated.bind(this)),
          (this.onExtensionAudioTrackSwitched =
            this.onExtensionAudioTrackSwitched.bind(this));
        const e = this.extensionTracks;
        e.addEventListener(Vi, this.onExtensionAudioTracksUpdated),
          e.addEventListener(Gi, this.onExtensionAudioTrackSwitched);
      } else {
        if (!e.audioTracks) return;
        je.debug(
          'MEDIA_TRACK Initializing audio track manager for native track events',
        ),
          (this.onAudioTrackAdded = this.onAudioTrackAdded.bind(this)),
          (this.onAudioTrackChanged = this.onAudioTrackChanged.bind(this)),
          (this.onAudioTrackRemoved = this.onAudioTrackRemoved.bind(this)),
          e.audioTracks.addEventListener('addtrack', this.onAudioTrackAdded),
          e.audioTracks.addEventListener('change', this.onAudioTrackChanged),
          e.audioTracks.addEventListener(
            'removetrack',
            this.onAudioTrackRemoved,
          );
      }
    }
  }
  const Hi = [],
    qi = [];
  function nextAvailableAudioElement() {
    let e = qi.pop();
    return (
      e
        ? je.debug(`dom-helpers: retrieving audio tag, ${qi.length} remain`)
        : (je.debug('dom-helpers: no available audio tags, creating one'),
          (e = document.createElement('audio'))),
      e
    );
  }
  function deferPlayback() {
    fillAvailableElements('audio', qi),
      fillAvailableElements('video', Hi),
      je.debug(
        `dom-helpers: defer playback called.  There are ${Hi.length} available video elements and ${qi.length} available audio elements.`,
      );
  }
  function fillAvailableElements(e, n) {
    let d = 100 - n.length;
    for (; d > 0; ) {
      const p = document.createElement(e);
      p.load(), n.push(p), d--;
    }
  }
  const Wi = BooleanDevFlag.register('mk-load-manifest-once'),
    shouldLoadManifestOnce = () => !Wi.configured || Wi.enabled;
  var Yi =
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
  var zi = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.isValidScrollSetting =
        n.isValidPositionAlignSetting =
        n.isValidLineAlignSetting =
        n.isValidLineAndPositionSetting =
        n.isValidDirectionSetting =
        n.isValidAlignSetting =
        n.isValidPercentValue =
          void 0),
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
  unwrapExports(zi),
    zi.isValidScrollSetting,
    zi.isValidPositionAlignSetting,
    zi.isValidLineAlignSetting,
    zi.isValidLineAndPositionSetting,
    zi.isValidDirectionSetting,
    zi.isValidAlignSetting,
    zi.isValidPercentValue;
  var Qi = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 });
    const d = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&lrm;': 'â€Ž',
        '&rlm;': 'â€',
        '&nbsp;': 'Â ',
      },
      p = {
        c: 'span',
        i: 'i',
        b: 'b',
        u: 'u',
        ruby: 'ruby',
        rt: 'rt',
        v: 'span',
        lang: 'span',
      },
      h = { v: 'title', lang: 'lang' },
      y = { rt: 'ruby' },
      _ = {
        'text-combine-upright':
          '-webkit-text-combine:horizontal; text-orientation: mixed;',
      };
    class ParserUtility {
      static parseTimeStamp(e) {
        function computeSeconds(e) {
          const [n, d, p, h] = e.map((e) => (e ? parseInt('' + e) : 0));
          return 3600 * n + 60 * d + p + h / 1e3;
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
      static parseContent(e, n, m) {
        let g = n.text;
        function nextToken() {
          if (!g) return null;
          const e = /^([^<]*)(<[^>]+>?)?/.exec(g);
          return (n = e[1] ? e[1] : e[2]), (g = g.substr(n.length)), n;
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
          const g = p[n];
          if (!g) return null;
          const b = e.document.createElement(g);
          b.dataset.localName = g;
          const S = h[n];
          if ((S && y && (b[S] = y.trim()), d))
            if (m[d]) {
              const e = (function (e) {
                let n = '';
                for (const d in e) n += _[d] ? _[d] : d + ':' + e[d] + ';';
                return n;
              })(m[d]);
              b.setAttribute('style', e);
            } else
              console.info(
                `WebVTT: parseContent: Style referenced, but no style defined for '${d}'!`,
              );
          return b;
        }
        const b = e.document.createElement('div'),
          S = [];
        let P,
          E,
          T = b;
        for (; null !== (P = nextToken()); )
          if ('<' !== P[0])
            T.appendChild(e.document.createTextNode(unescape(P)));
          else {
            if ('/' === P[1]) {
              S.length &&
                S[S.length - 1] === P.substr(2).replace('>', '') &&
                (S.pop(), (T = T.parentNode));
              continue;
            }
            const n = ParserUtility.parseTimeStamp(P.substr(1, P.length - 2));
            let d;
            if (n) {
              (d = e.document.createProcessingInstruction(
                'timestamp',
                n.toString(),
              )),
                T.appendChild(d);
              continue;
            }
            if (
              ((E = /^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/.exec(P)),
              !E)
            )
              continue;
            if (((d = createElement(E[1], E[2], E[3])), !d)) continue;
            if (!shouldAdd(T, d)) continue;
            E[2], S.push(E[1]), T.appendChild(d), (T = d);
          }
        return b;
      }
    }
    n.default = ParserUtility;
  });
  unwrapExports(Qi);
  var Ji = createCommonjsModule(function (e, n) {
    var d =
      (Yi && Yi.__decorate) ||
      function (e, n, d, p) {
        var h,
          y = arguments.length,
          _ =
            y < 3
              ? n
              : null === p
                ? (p = Object.getOwnPropertyDescriptor(n, d))
                : p;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          _ = Reflect.decorate(e, n, d, p);
        else
          for (var m = e.length - 1; m >= 0; m--)
            (h = e[m]) &&
              (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
        return y > 3 && _ && Object.defineProperty(n, d, _), _;
      };
    Object.defineProperty(n, '__esModule', { value: !0 }), (n.VTTCue = void 0);
    let p = class {
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
        if (!zi.isValidDirectionSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for vertical: ' + e,
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
        if (!zi.isValidLineAndPositionSetting(e))
          throw new SyntaxError(
            'An invalid number or illegal string was specified for line: ' + e,
          );
        (this._line = e), (this.hasBeenReset = !0);
      }
      get lineAlign() {
        return this._lineAlign;
      }
      set lineAlign(e) {
        if (!zi.isValidLineAlignSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for lineAlign: ' + e,
          );
        (this._lineAlign = e), (this.hasBeenReset = !0);
      }
      get position() {
        return this._position;
      }
      set position(e) {
        if (!zi.isValidLineAndPositionSetting(e))
          throw new Error('Position must be between 0 and 100 or auto: ' + e);
        (this._position = e), (this.hasBeenReset = !0);
      }
      get positionAlign() {
        return this._positionAlign;
      }
      set positionAlign(e) {
        if (!zi.isValidPositionAlignSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for positionAlign: ' +
              e,
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
        if (!zi.isValidAlignSetting(e))
          throw new SyntaxError(
            'An invalid or illegal string was specified for align: ' + e,
          );
        (this._align = e), (this.hasBeenReset = !0);
      }
      getCueAsHTML() {
        return Qi.default.parseContent(window, this, {});
      }
      static create(e) {
        if (
          !e.hasOwnProperty('startTime') ||
          !e.hasOwnProperty('endTime') ||
          !e.hasOwnProperty('text')
        )
          throw new Error(
            'You must at least have start time, end time, and text.',
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
    };
    (p = d(
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
      p,
    )),
      (n.VTTCue = p);
  });
  unwrapExports(Ji), Ji.VTTCue;
  var Xi = createCommonjsModule(function (e, n) {
    var d =
      (Yi && Yi.__decorate) ||
      function (e, n, d, p) {
        var h,
          y = arguments.length,
          _ =
            y < 3
              ? n
              : null === p
                ? (p = Object.getOwnPropertyDescriptor(n, d))
                : p;
        if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
          _ = Reflect.decorate(e, n, d, p);
        else
          for (var m = e.length - 1; m >= 0; m--)
            (h = e[m]) &&
              (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
        return y > 3 && _ && Object.defineProperty(n, d, _), _;
      };
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.VTTRegion = void 0);
    let p = class {
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
        if (!zi.isValidPercentValue(e))
          throw new TypeError('RegionAnchorX must be between 0 and 100.');
        this._regionAnchorX = e;
      }
      get regionAnchorY() {
        return this._regionAnchorY;
      }
      set regionAnchorY(e) {
        if (!zi.isValidPercentValue(e))
          throw new TypeError('RegionAnchorY must be between 0 and 100.');
        this._regionAnchorY = e;
      }
      get scroll() {
        return this._scroll;
      }
      set scroll(e) {
        if ('string' == typeof e) {
          const n = e.toLowerCase();
          if (zi.isValidScrollSetting(n)) return void (this._scroll = n);
        }
        throw new SyntaxError('An invalid or illegal string was specified.');
      }
      get viewportAnchorX() {
        return this._viewportAnchorX;
      }
      set viewportAnchorX(e) {
        if (!zi.isValidPercentValue(e))
          throw new TypeError('ViewportAnchorX must be between 0 and 100.');
        this._viewportAnchorX = e;
      }
      get viewportAnchorY() {
        return this._viewportAnchorY;
      }
      set viewportAnchorY(e) {
        if (!zi.isValidPercentValue(e))
          throw new TypeError('ViewportAnchorY must be between 0 and 100.');
        this._viewportAnchorY = e;
      }
      get width() {
        return this._width;
      }
      set width(e) {
        if (!zi.isValidPercentValue(e))
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
    };
    (p = d(
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
      p,
    )),
      (n.VTTRegion = p);
  });
  unwrapExports(Xi), Xi.VTTRegion;
  var Zi = createCommonjsModule(function (e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 });
  });
  unwrapExports(Zi);
  var en = createCommonjsModule(function (e, n) {
    var d =
        (Yi && Yi.__createBinding) ||
        (Object.create
          ? function (e, n, d, p) {
              void 0 === p && (p = d),
                Object.defineProperty(e, p, {
                  enumerable: !0,
                  get: function () {
                    return n[d];
                  },
                });
            }
          : function (e, n, d, p) {
              void 0 === p && (p = d), (e[p] = n[d]);
            }),
      p =
        (Yi && Yi.__exportStar) ||
        function (e, n) {
          for (var p in e) 'default' === p || n.hasOwnProperty(p) || d(n, e, p);
        };
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.VTTRegion = n.VTTCue = n.WebVTTParser = n.ParsingError = void 0),
      Object.defineProperty(n, 'VTTCue', {
        enumerable: !0,
        get: function () {
          return Ji.VTTCue;
        },
      }),
      Object.defineProperty(n, 'VTTRegion', {
        enumerable: !0,
        get: function () {
          return Xi.VTTRegion;
        },
      });
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
        for (let p = 0; p < d.length; ++p)
          if (n === d[p]) {
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
          } catch (d) {
            return !1;
          }
        return !1;
      }
      constructor() {
        this.values = {};
      }
    }
    class WebVTTParser {
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
      parseOptions(e, n, d, p) {
        const h = p ? e.split(p) : [e];
        for (const y of h) {
          if ('string' != typeof y) continue;
          const e = y.split(d);
          if (2 !== e.length) continue;
          n(e[0], e[1]);
        }
      }
      parseCue(e, n, d) {
        const p = e,
          consumeTimeStamp = () => {
            const n = Qi.default.parseTimeStamp(e);
            if (null === n)
              throw new ParsingError(
                ParsingError.Errors.BadTimeStamp,
                'Malformed timestamp: ' + p,
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
              p,
          );
        (e = e.substr(3)),
          skipWhitespace(),
          (n.endTime = consumeTimeStamp()),
          skipWhitespace(),
          ((e, n) => {
            const p = new Settings();
            this.parseOptions(
              e,
              (e, n) => {
                let h, y;
                switch (e) {
                  case 'region':
                    for (let h = d.length - 1; h >= 0; h--)
                      if (d[h].id === n) {
                        p.set(e, d[h].region);
                        break;
                      }
                    break;
                  case 'vertical':
                    p.alt(e, n, ['rl', 'lr']);
                    break;
                  case 'line':
                    (h = n.split(',')),
                      (y = h[0]),
                      p.integer(e, y),
                      p.percent(e, y) && p.set('snapToLines', !1),
                      p.alt(e, y, ['auto']),
                      2 === h.length &&
                        p.alt('lineAlign', h[1], [
                          'start',
                          'middle',
                          'center',
                          'end',
                        ]);
                    break;
                  case 'position':
                    if (
                      ((h = n.split(',')), p.percent(e, h[0]), 2 === h.length)
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
                      p.alt('positionAlign', h[1], e);
                    }
                    break;
                  case 'size':
                    p.percent(e, n);
                    break;
                  case 'align':
                    let _ = [
                      'start',
                      'center',
                      'end',
                      'left',
                      'right',
                      'middle',
                    ];
                    p.alt(e, n, _);
                }
              },
              /:/,
              /\s/,
            ),
              (n.region = p.get('region', null)),
              (n.vertical = p.get('vertical', '')),
              (n.line = p.get('line', void 0 === n.line ? 'auto' : n.line));
            const h = p.get('lineAlign', 'start');
            (n.lineAlign =
              'center' === h || 'middle' === h ? this.middleOrCenter : h),
              (n.snapToLines = p.get('snapToLines', !0)),
              (n.size = p.get('size', 100));
            const y = p.get('align', 'center');
            (n.align =
              'center' === y || 'middle' === y ? this.middleOrCenter : y),
              (n.position = p.get('position', 'auto'));
            let _ = p.get(
              'positionAlign',
              {
                start: 'start',
                left: 'start',
                center: 'center',
                middle: 'middle',
                right: 'end',
                end: 'end',
              },
              n.align,
            );
            n.positionAlign =
              'center' === _ || 'middle' === _
                ? this.middleOrCenter
                : {
                    start: 'start',
                    'line-left': 'start',
                    left: 'start',
                    center: 'center',
                    middle: 'middle',
                    'line-right': 'end',
                    right: 'end',
                    end: 'end',
                  }[_];
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
                  const p = d.split(',');
                  if (2 !== p.length) break;
                  const h = new Settings();
                  if (
                    (h.percent('x', p[0]),
                    h.percent('y', p[1]),
                    !h.has('x') || !h.has('y'))
                  )
                    break;
                  n.set(e + 'X', h.get('x')), n.set(e + 'Y', h.get('y'));
                  break;
                }
                case 'scroll':
                  n.alt(e, d, ['up']);
              }
            },
            /=/,
            /\s/,
          ),
          n.has('id'))
        ) {
          const e = new Xi.VTTRegion();
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
            for (let p = 0; p < d.length; p++)
              if (d[p].includes(':')) {
                const e = d[p].split(':', 2),
                  h = e[0].trim(),
                  y = e[1].trim();
                '' !== h && '' !== y && (n[h] = y);
              }
            return n;
          },
          n = e.split('}');
        n.pop();
        for (const d of n) {
          let e = null,
            n = null;
          const p = d.split('{');
          p[0] && (e = p[0].trim()),
            p[1] && (n = parseStyles(p[1])),
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
          /:/,
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
              let p = n + 2;
              for (; p < e.length && '>' !== e[p++]; );
              (d.start = n), (d.length = p - n);
            }
            return d;
          };
          let d = { start: e.length, length: 0 };
          for (; n < e.length; ) {
            const p = calculateBreakPosition(e, n);
            if (p.length > 0) {
              d = p;
              break;
            }
            ++n;
          }
          const p = e.substr(0, d.start);
          return (this.buffer = e.substr(d.start + d.length)), p;
        };
        try {
          let e;
          if ('INITIAL' === this.state) {
            if (!/\r\n|\n/.test(this.buffer)) return this;
            (this.alreadyCollectedLine = ''), (e = collectNextLine());
            const n = /^(Ã¯Â»Â¿)?WEBVTT([ \t].*)?$/.exec(e);
            if (!n || !n[0])
              throw new ParsingError(ParsingError.Errors.BadSignature);
            this.state = 'HEADER';
          }
          for (; this.buffer; ) {
            if (!/\r\n|\n/.test(this.buffer)) return this;
            switch (
              (this.alreadyCollectedLine
                ? ((e = this.alreadyCollectedLine),
                  (this.alreadyCollectedLine = ''))
                : (e = collectNextLine()),
              this.state)
            ) {
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
                  ((this.cue = new Ji.VTTCue(0, 0, '')),
                  (this.state = 'CUE'),
                  !e.includes('--\x3e'))
                ) {
                  this.cue.id = e;
                  continue;
                }
              case 'CUE':
                try {
                  this.parseCue(e, this.cue, this.regionList);
                } catch (Ut) {
                  this.reportOrThrowError(Ut),
                    (this.cue = null),
                    (this.state = 'BADCUE');
                  continue;
                }
                this.state = 'CUETEXT';
                continue;
              case 'CUETEXT': {
                const n = e.includes('--\x3e');
                if (!e || n) {
                  (this.alreadyCollectedLine = e),
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
        } catch (Ut) {
          this.reportOrThrowError(Ut),
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
        } catch (Ut) {
          this.reportOrThrowError(Ut);
        }
        return this.onflush && this.onflush(), this;
      }
      styles() {
        return this._styles;
      }
      constructor(e, n, d) {
        (this.window = e),
          (this.state = 'INITIAL'),
          (this.styleCollector = ''),
          (this.buffer = ''),
          (this.decoder = n || new TextDecoder('utf8')),
          (this.regionList = []),
          (this.alreadyCollectedLine = ''),
          (this.onStylesParsedCallback = d),
          (this._styles = {}),
          (this.middleOrCenter = 'center');
        const p = new Ji.VTTCue(0, 0, 'middleOrCenter');
        try {
          (p.align = 'center'),
            'center' !== p.align && (this.middleOrCenter = 'middle');
        } catch (Ut) {
          this.middleOrCenter = 'middle';
        }
      }
    }
    (n.default = WebVTTParser), (n.WebVTTParser = WebVTTParser), p(Zi, n);
  });
  unwrapExports(en), en.VTTRegion, en.VTTCue, en.WebVTTParser, en.ParsingError;
  var tn = createCommonjsModule(function (e, n) {
    var d =
        (Yi && Yi.__createBinding) ||
        (Object.create
          ? function (e, n, d, p) {
              void 0 === p && (p = d),
                Object.defineProperty(e, p, {
                  enumerable: !0,
                  get: function () {
                    return n[d];
                  },
                });
            }
          : function (e, n, d, p) {
              void 0 === p && (p = d), (e[p] = n[d]);
            }),
      p =
        (Yi && Yi.__exportStar) ||
        function (e, n) {
          for (var p in e) 'default' === p || n.hasOwnProperty(p) || d(n, e, p);
        };
    Object.defineProperty(n, '__esModule', { value: !0 }),
      (n.VTTCue =
        n.WebVTTRenderer =
        n.BoxPosition =
        n.CueStyleBox =
        n.StyleBox =
          void 0),
      Object.defineProperty(n, 'VTTCue', {
        enumerable: !0,
        get: function () {
          return Ji.VTTCue;
        },
      });
    const h = [
        /^(::cue\()(\..*)(\))/,
        /^(::cue\()(#.*)(\))/,
        /^(::cue\()(c|i|b|u|ruby|rt|v|lang)(\))/,
      ],
      y = [
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
            if (((n = p.charCodeAt(e)), isContainedInCharacterList(n, y)))
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
      constructor(e, n, d, p, h) {
        super(), (this.cue = n);
        let y =
          {
            start: 'left',
            'line-left': 'left',
            left: 'left',
            center: 'center',
            middle: 'center',
            'line-right': 'right',
            right: 'right',
            end: 'right',
          }[n.positionAlign] || n.align;
        'middle' === y && (y = 'center');
        let _ = { textAlign: y, whiteSpace: 'pre-line', position: 'absolute' };
        (_.direction = this.determineBidi(this.cueDiv)),
          (_.writingMode = this.directionSettingToWritingMode(n.vertical)),
          (_.unicodeBidi = 'plaintext'),
          (this.div = e.document.createElement('div')),
          this.applyStyles(_),
          (_ = { backgroundColor: p.backgroundColor, display: 'inline-block' }),
          this.parseOpacity(_.backgroundColor) &&
            ((_.padding = '5px'), (_.borderRadius = '5px')),
          (this.backgroundDiv = e.document.createElement('div')),
          this.applyStyles(_, this.backgroundDiv),
          (_ = {
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
          (_.writingMode = this.directionSettingToWritingMode(n.vertical)),
          (_.unicodeBidi = 'plaintext'),
          (this.cueDiv = Qi.default.parseContent(e, n, h)),
          this.applyStyles(_, this.cueDiv),
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
    }
    n.CueStyleBox = CueStyleBox;
    class BoxPosition {
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
          p = n.offsetWidth || 0,
          h = n.offsetTop || 0,
          y = h + d,
          _ = n.getBoundingClientRect();
        const { left: m, right: g } = _;
        return (
          _.top && (h = _.top),
          _.height && (d = _.height),
          _.width && (p = _.width),
          _.bottom && (y = _.bottom),
          { left: m, right: g, top: h, height: d, bottom: y, width: p }
        );
      }
      static getBoxPosition(e, n) {
        if (e && e.length > 0) {
          let d = 0,
            p = e[0][n];
          for (let h = 0; h < e.length; h++)
            n in ['top', 'right']
              ? e[h][n] > p && ((d = h), (p = e[h][n]))
              : n in ['bottom', 'left'] &&
                e[h][n] < p &&
                ((d = h), (p = e[h][n]));
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
        const p = e.cue;
        let h,
          y = new BoxPosition(e),
          _ = (function (e) {
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
              p = d.textTrackList;
            for (let h = 0; h < p.length && p[h] !== d; h++)
              'showing' === p[h].mode && n++;
            return -1 * ++n;
          })(p),
          m = [];
        if (p.snapToLines) {
          let e = 0;
          switch (p.vertical) {
            case '':
              (m = ['+y', '-y']), (h = 'height');
              break;
            case 'rl':
              (m = ['+x', '-x']), (h = 'width');
              break;
            case 'lr':
              (m = ['-x', '+x']), (h = 'width');
          }
          const d = y.lineHeight,
            g = n[h] + d,
            b = m[0];
          if (_ < 0) {
            let h = 0;
            switch (p.vertical) {
              case '':
                h = n.height - d - 0.05 * n.height;
                break;
              case 'rl':
              case 'lr':
                h = -n.width + d + 0.05 * n.width;
            }
            (e = h), (m = m.reverse());
          } else {
            switch (p.vertical) {
              case '':
                e = d * Math.round(_);
                break;
              case 'rl':
                e = n.width - d * Math.round(_);
                break;
              case 'lr':
                e = d * Math.round(_);
            }
            Math.abs(e) > g &&
              ((e = e < 0 ? -1 : 1), (e *= Math.ceil(g / d) * d));
          }
          y.move(b, e);
        } else {
          const d = '' === p.vertical ? n.height : n.width,
            h = (y.lineHeight / d) * 100;
          switch (p.lineAlign) {
            case 'center':
            case 'middle':
              _ -= h / 2;
              break;
            case 'end':
              _ -= h;
          }
          switch (p.vertical) {
            case '':
              e.applyStyles({ top: e.formatStyle(_, '%') });
              break;
            case 'rl':
              e.applyStyles({ right: e.formatStyle(_, '%') });
              break;
            case 'lr':
              e.applyStyles({ left: e.formatStyle(_, '%') });
          }
          (m = ['+y', '-y', '+x', '-x']),
            '+y' === p.axis
              ? (m = ['+y', '-y', '+x', '-x'])
              : '-y' === p.axis && (m = ['-y', '+y', '+x', '-x']),
            (y = new BoxPosition(e));
        }
        const g = (function (e, p) {
          let h;
          for (let y = 0; y < p.length; y++) {
            e.moveIfOutOfBounds(n, p[y]);
            let _ = 0,
              m = !1;
            for (; e.overlapsAny(d) && !(_ > 9); )
              m
                ? e.move(p[y])
                : (d &&
                    d.length > 0 &&
                    (h ||
                      (h = {
                        topMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'top',
                        ),
                        bottomMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'bottom',
                        ),
                        leftMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'left',
                        ),
                        rightMostBoxPosition: BoxPosition.getBoxPosition(
                          d,
                          'right',
                        ),
                      }),
                    BoxPosition.moveToMinimumDistancePlacement(e, p[y], h)),
                  (m = !0)),
                _++;
          }
          return e;
        })(y, m);
        e.move(g.toCSSCompatValues(n));
      }
      constructor(e) {
        var n;
        let d, p, h, y, _, m;
        if (
          (e instanceof CueStyleBox && e.cue
            ? (n = e.cue) && '' !== n.vertical
              ? (this.property = 'width')
              : (this.property = 'height')
            : e instanceof BoxPosition &&
              (this.property = e.property || 'height'),
          e instanceof CueStyleBox && e.div)
        ) {
          (h = e.div.offsetHeight),
            (y = e.div.offsetWidth),
            (_ = e.div.offsetTop);
          const n = e.div.firstChild;
          if (
            ((m = n
              ? n.getBoundingClientRect()
              : e.div.getBoundingClientRect()),
            (d = (m && m[this.property]) || null),
            n && n.firstChild)
          ) {
            const e = n.firstChild;
            if (e && 'string' == typeof e.textContent) {
              p = d / this.calculateNewLines(e.textContent);
            }
          }
        } else e instanceof BoxPosition && (m = e);
        (this.left = m.left),
          (this.right = m.right),
          (this.top = m.top || _),
          (this.height = m.height || h),
          (this.bottom = m.bottom || _ + (m.height || h)),
          (this.width = m.width || y),
          (this.lineHeight = null !== d ? d : m.lineHeight),
          (this.singleLineHeight = null !== p ? p : m.singleLineHeight),
          this.singleLineHeight || (this.singleLineHeight = 41);
      }
    }
    n.BoxPosition = BoxPosition;
    class WebVTTRenderer {
      initSubtitleCSS() {
        const e = [
          new Ji.VTTCue(0, 0, "String to init CSS - Won't be visible to user"),
        ];
        (this.paddedOverlay.style.opacity = '0'),
          this.processCues(e),
          this.processCues([]),
          (this.paddedOverlay.style.opacity = '1');
      }
      convertCueToDOMTree(e) {
        return e
          ? Qi.default.parseContent(this.window, e, this.globalStyleCollection)
          : null;
      }
      setStyles(e) {
        function applyStyles(e, n, d) {
          for (const p in n)
            n.hasOwnProperty(p) &&
              ((!0 === d && void 0 !== e[p]) || !1 === d) &&
              (e[p] = n[p]);
        }
        for (const n in e) {
          let d = !1,
            p = null;
          '::cue' === n
            ? ((p = this.foregroundStyleOptions), (d = !0))
            : '::-webkit-media-text-track-display' === n &&
              ((p = this.backgroundStyleOptions), (d = !0));
          const y = e[n];
          if (!0 === d) applyStyles(p, y, d);
          else
            for (let e = 0; e < h.length; e++) {
              const p = h[e].exec(n);
              if (p && 4 === p.length) {
                const e = p[2],
                  n = {};
                applyStyles(n, y, d), (this.globalStyleCollection[e] = n);
              }
            }
        }
        this.initSubtitleCSS(),
          this.loggingEnabled &&
            (console.log(
              'WebVTTRenderer setStyles foregroundStyleOptions: ' +
                JSON.stringify(this.foregroundStyleOptions),
            ),
            console.log(
              'WebVTTRenderer setStyles backgroundStyleOptions: ' +
                JSON.stringify(this.backgroundStyleOptions),
            ),
            console.log(
              'WebVTTRenderer setStyles globalStyleCollection: ' +
                JSON.stringify(this.globalStyleCollection),
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
            for (let p = 0; p < e.length; p++) {
              let h = e[p];
              if ('number' != typeof h.line) return e;
              (d += h.line), n.push(h);
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
        for (let p = 0; p < e.length; p++) {
          let h = e[p],
            y = new CueStyleBox(
              this.window,
              h,
              this.foregroundStyleOptions,
              this.backgroundStyleOptions,
              this.globalStyleCollection,
            );
          this.paddedOverlay.appendChild(y.div),
            BoxPosition.moveBoxToLinePosition(y, d, n),
            (h.displayState = y.div),
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
        const p = e.document.createElement('div');
        (p.style.position = 'absolute'),
          (p.style.left = '0'),
          (p.style.right = '0'),
          (p.style.top = '0'),
          (p.style.bottom = '0'),
          (p.style.margin = '1.5%'),
          (this.paddedOverlay = p),
          n.appendChild(this.paddedOverlay),
          this.initSubtitleCSS();
      }
    }
    (n.default = WebVTTRenderer), (n.WebVTTRenderer = WebVTTRenderer), p(Zi, n);
  });
  unwrapExports(tn),
    tn.VTTCue,
    tn.WebVTTRenderer,
    tn.BoxPosition,
    tn.CueStyleBox,
    tn.StyleBox;
  var rn = createCommonjsModule(function (e, n) {
    var d =
        (Yi && Yi.__createBinding) ||
        (Object.create
          ? function (e, n, d, p) {
              void 0 === p && (p = d),
                Object.defineProperty(e, p, {
                  enumerable: !0,
                  get: function () {
                    return n[d];
                  },
                });
            }
          : function (e, n, d, p) {
              void 0 === p && (p = d), (e[p] = n[d]);
            }),
      p =
        (Yi && Yi.__exportStar) ||
        function (e, n) {
          for (var p in e) 'default' === p || n.hasOwnProperty(p) || d(n, e, p);
        };
    Object.defineProperty(n, '__esModule', { value: !0 }), p(en, n), p(tn, n);
  });
  unwrapExports(rn);
  var nn = rn.WebVTTRenderer;
  function _define_property$1c(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const {
      audioTrackAdded: on,
      audioTrackChanged: an,
      forcedTextTrackChanged: sn,
      textTrackAdded: cn,
      textTrackChanged: dn,
      textTrackRemoved: ln,
    } = vt,
    {
      textTracksSwitched: un,
      textTracksUpdated: pn,
      inlineStylesParsed: hn,
    } = Je;
  class TextTrackManager {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentTrack() {
      return this.tracks.find((e) => 'showing' === e.mode);
    }
    set currentTrack(e) {
      if (!e) return;
      let n;
      this.trackPersistence.setPersistedTrack(e),
        this.extensionTracks
          ? (je.debug('MEDIA_TRACK Setting track on extension ' + e.label),
            'Off' === e.label
              ? (this.clearCurrentlyPlayingTrack(),
                (n = this.extensionTracks.selectForcedTrack()),
                void 0 === n && this.onExtensionTextTrackSwitched({ track: e }))
              : (this.extensionTracks.textTrack = e))
          : (je.debug('MEDIA_TRACK Setting track on element ' + e.label),
            this._tracks.forEach((n) => {
              n !== e && 'showing' === n.mode && (n.mode = 'disabled');
            }),
            e &&
              (je.debug(
                'MEDIA_TRACK setting track mode to showing for ' + e.label,
              ),
              this.isTrackOff(e)
                ? ((this._tracks[0].mode = 'showing'),
                  (n = this.selectNativeForcedTrack(
                    this.mediaElement.audioTracks,
                  )))
                : (e.mode = 'showing'))),
        this.dispatcher.publish(vt.forcedTextTrackChanged, n);
    }
    get tracks() {
      return this._tracks;
    }
    destroy() {
      if (
        ((this._isDestroyed = !0),
        this.clearCurrentlyPlayingTrack(),
        this.extensionTracks)
      ) {
        const e = this.extensionTracks;
        e.removeEventListener(pn, this.onExtensionTextTracksAdded),
          e.removeEventListener(un, this.onExtensionTextTrackSwitched),
          e.removeEventListener(hn, this.onExtensionInlineStylesParsed);
      } else
        this.mediaElement.textTracks.removeEventListener(
          'addtrack',
          this.onTextTrackAdded,
        ),
          this.mediaElement.textTracks.removeEventListener(
            'change',
            this.onTextTrackChanged,
          ),
          this.mediaElement.textTracks.removeEventListener(
            'removetrack',
            this.onTextTrackRemoved,
          ),
          this.mediaElement.removeEventListener('playing', this.onPlayStart);
      this.dispatcher.unsubscribe(an, this.onAudioTrackAddedOrChanged),
        this.dispatcher.unsubscribe(on, this.onAudioTrackAddedOrChanged);
    }
    restoreSelectedTrack() {
      return restoreSelectedTrack(this.trackPersistence, this);
    }
    onExtensionInlineStylesParsed(e) {
      je.debug('MEDIA_TRACK Extension inline styles parsed', e),
        this.renderer.setStyles(e.styles);
    }
    onExtensionTextTracksAdded(e) {
      je.debug(
        'MEDIA_TRACK Extension text tracks updated ' + JSON.stringify(e),
      ),
        this._tracks.push(...e),
        this.restoreSelectedTrack(),
        this.dispatcher.publish(cn, e);
    }
    onExtensionTextTrackSwitched(e) {
      je.debug('MEDIA_TRACKS Extension text track switched ' + e),
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
      this.dispatcher.publish(dn, e);
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
        (je.debug('MEDIA_TRACKS text track manager detects audio track change'),
        this.shouldForceSubtitle())
      )
        if (this.extensionTracks) {
          je.debug('MEDIA_TRACKS selecting forced text track via extension');
          const e = this.extensionTracks.selectForcedTrack();
          e
            ? this.dispatcher.publish(sn, e)
            : this.clearCurrentlyPlayingTrack();
        } else
          je.debug('MEDIA_TRACKS selecting forced text track natively'),
            (this.currentTrack = this._tracks[0]);
    }
    onTextTrackAdded(e) {
      this._tracks.push(e.track), this.dispatcher.publish(cn, e);
    }
    onPlayStart() {
      this.restoreSelectedTrack();
    }
    onTextTrackRemoved(e) {
      this.dispatcher.publish(ln, e);
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
      else this.dispatcher.publish(dn, e);
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
        const p = n[d];
        if ('forced' === p.kind && p.language === e.language) return p;
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
          this.onCueChange,
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
        const p = e[d];
        ('captions' === p.kind ||
          'subtitles' === p.kind ||
          ('metadata' === p.kind && p.customTextTrackCueRenderer)) &&
          n.push(p);
      }
      return n;
    }
    shouldForceSubtitle() {
      je.debug('MEDIA_TRACKS Determining whether to select forced text track');
      const e = this.trackPersistence.getPersistedTrack();
      return !e || this.isTrackOff(e);
    }
    isTrackOff(e) {
      return 'Off' === e.label || 'Auto' === e.label;
    }
    constructor(e, n, d) {
      _define_property$1c(this, 'mediaElement', void 0),
        _define_property$1c(this, 'dispatcher', void 0),
        _define_property$1c(this, 'extensionTracks', void 0),
        _define_property$1c(this, '_tracks', void 0),
        _define_property$1c(this, 'trackPersistence', void 0),
        _define_property$1c(this, 'renderer', void 0),
        _define_property$1c(this, '_currentlyPlayingTrack', void 0),
        _define_property$1c(this, '_isDestroyed', void 0),
        (this.mediaElement = e),
        (this.dispatcher = n),
        (this.extensionTracks = d),
        (this._tracks = []),
        (this.trackPersistence = new TrackPersistence('mk-text-track', [
          'label',
          'language',
          'kind',
        ])),
        (this._isDestroyed = !1);
      const p = this.trackPersistence.getPersistedTrack();
      if (
        (this._tracks.push({
          id: -2,
          label: 'Off',
          language: '',
          kind: 'subtitles',
          mode: !p || this.isTrackOff(p) ? 'showing' : 'disabled',
        }),
        this.extensionTracks)
      ) {
        je.debug(
          'MEDIA_TRACK Initializing text track manager for HLS.js track events',
        );
        const n = e.parentElement;
        (this.renderer = new nn(window, n, !1)),
          this.renderer.setStyles({ '::cue': { fontSize: 'calc(1vw + 1em)' } }),
          (this.onExtensionTextTracksAdded =
            this.onExtensionTextTracksAdded.bind(this)),
          (this.onExtensionTextTrackSwitched =
            this.onExtensionTextTrackSwitched.bind(this)),
          (this.onExtensionInlineStylesParsed =
            this.onExtensionInlineStylesParsed.bind(this)),
          (this.onCueChange = this.onCueChange.bind(this));
        const d = this.extensionTracks;
        d.addEventListener(pn, this.onExtensionTextTracksAdded),
          d.addEventListener(un, this.onExtensionTextTrackSwitched),
          d.addEventListener(hn, this.onExtensionInlineStylesParsed);
      } else
        je.debug(
          'MEDIA_TRACK Initializing text track manager for native track events',
        ),
          (this.onTextTrackAdded = this.onTextTrackAdded.bind(this)),
          (this.onTextTrackChanged = this.onTextTrackChanged.bind(this)),
          (this.onTextTrackRemoved = this.onTextTrackRemoved.bind(this)),
          (this.onPlayStart = this.onPlayStart.bind(this)),
          e.textTracks.addEventListener('addtrack', this.onTextTrackAdded),
          e.textTracks.addEventListener('change', this.onTextTrackChanged),
          e.textTracks.addEventListener('removetrack', this.onTextTrackRemoved),
          e.addEventListener('playing', this.onPlayStart);
      (this.onAudioTrackAddedOrChanged = debounce(
        this.onAudioTrackAddedOrChanged.bind(this),
      )),
        n.subscribe(an, this.onAudioTrackAddedOrChanged),
        n.subscribe(on, this.onAudioTrackAddedOrChanged);
    }
  }
  function asyncGeneratorStep$S(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$S(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$S(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$S(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1b(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$o(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const yn = {
      'picture-in-picture': e.PresentationMode.pictureinpicture,
      inline: e.PresentationMode.inline,
    },
    _n = {};
  (_n[e.PresentationMode.pictureinpicture] = 'picture-in-picture'),
    (_n[e.PresentationMode.inline] = 'inline');
  const { presentationModeDidChange: fn } = vt,
    { playbackLicenseError: vn } = Je,
    { stopped: mn } = e.PlaybackStates;
  class VideoPlayer extends BasePlayer {
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
      return (
        this.video ||
        (function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var d = null != arguments[n] ? arguments[n] : {},
              p = Object.keys(d);
            'function' == typeof Object.getOwnPropertySymbols &&
              (p = p.concat(
                Object.getOwnPropertySymbols(d).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(d, e).enumerable;
                }),
              )),
              p.forEach(function (n) {
                _define_property$1b(e, n, d[n]);
              });
          }
          return e;
        })({}, document.createElement('video'))
      );
    }
    get textTracks() {
      return this._textTrackManager.tracks;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$S(function* () {
        const { os: n } = e.services.runtime;
        e.restrictPlatforms && n.isAndroid
          ? je.warn(
              'videoPlayer.initializeExtension Not supported on the current platform',
            )
          : e.video ||
            je.warn(
              'videoPlayer.initializeExtension No video element, not initializing extension',
            );
      })();
    }
    onPlaybackLicenseError(e) {
      this.resetDeferredPlay(), this._dispatcher.publish(vn, e);
    }
    setupTrackManagers(e) {
      var n, d, p, h;
      null === (d = this._textTrackManager) ||
        void 0 === d ||
        null === (n = d.destroy) ||
        void 0 === n ||
        n.call(d),
        (this._textTrackManager = new TextTrackManager(
          this._targetElement,
          this._dispatcher,
          e,
        )),
        null === (h = this._audioTrackManager) ||
          void 0 === h ||
          null === (p = h.destroy) ||
          void 0 === p ||
          p.call(h),
        (this._audioTrackManager = new AudioTrackManager(
          this._targetElement,
          this._dispatcher,
          e,
        ));
    }
    destroy() {
      this.finishPlaybackSequence(),
        this._textTrackManager.destroy(),
        this._audioTrackManager.destroy(),
        super.destroy();
    }
    initializeEventHandlers() {
      var e = this,
        _superprop_get_initializeEventHandlers = () =>
          super.initializeEventHandlers;
      return _async_to_generator$S(function* () {
        _superprop_get_initializeEventHandlers().call(e),
          e.hasMediaElement &&
            (e._targetElement.addEventListener(
              'webkitpresentationmodechanged',
              e.pipEventHandler,
            ),
            e._targetElement.addEventListener(
              'enterpictureinpicture',
              e.pipEventHandler,
            ),
            e._targetElement.addEventListener(
              'leavepictureinpicture',
              e.pipEventHandler,
            ));
      })();
    }
    removeEventHandlers() {
      if ((super.removeEventHandlers(), !this.hasMediaElement)) return;
      const { _targetElement: e } = this;
      e.removeEventListener(
        'webkitpresentationmodechanged',
        this.pipEventHandler,
      ),
        e.removeEventListener('enterpictureinpicture', this.pipEventHandler),
        e.removeEventListener('leavepictureinpicture', this.pipEventHandler);
    }
    initializeMediaElement() {
      var e = this;
      return _async_to_generator$S(function* () {
        je.debug(
          'videoPlayer.initializeMediaElement Initializing media element',
        );
        const n = e.containerElement;
        n
          ? ((e.video = (function () {
              let e = Hi.pop();
              return (
                e
                  ? je.debug(
                      `dom-helpers: retrieving video tag, ${Hi.length} remain`,
                    )
                  : (je.debug(
                      'dom-helpers: no available video tags, creating one',
                    ),
                    (e = document.createElement('video'))),
                e
              );
            })()),
            (e.video.autoplay = !1),
            (e.video.controls = !1),
            (e.video.playsInline = !0),
            (e.video.id = 'apple-music-video-player'),
            n.appendChild(e.video))
          : je.warn(
              'videoPlayer.initializeMediaElement No video element; no container defined',
            );
      })();
    }
    isPlayerSupported() {
      return this.services.runtime.isES2015Supported;
    }
    _stopMediaElement() {
      var e = this,
        _superprop_get__stopMediaElement = () => super._stopMediaElement;
      return _async_to_generator$S(function* () {
        yield _superprop_get__stopMediaElement().call(e), e.destroy();
      })();
    }
    pipEventHandler(n) {
      switch (n.type) {
        case 'enterpictureinpicture':
          this._dispatcher.publish(fn, {
            mode: e.PresentationMode.pictureinpicture,
          });
          break;
        case 'leavepictureinpicture':
          this._dispatcher.publish(fn, { mode: e.PresentationMode.inline });
          break;
        case 'webkitpresentationmodechanged': {
          const e = this._targetElement;
          this._dispatcher.publish(fn, {
            mode: this._translateStringToPresentationMode(
              e.webkitPresentationMode,
            ),
          });
          break;
        }
      }
    }
    playItemFromEncryptedSource(n, d = !1, p = {}) {
      var h = this;
      return _async_to_generator$S(function* () {
        if (
          (je.debug('videoPlayer.playItemFromEncryptedSource', n, d),
          h.playbackState === mn)
        )
          return void je.debug(
            'video-player.playItemFromEncryptedSource aborting playback because player is stopped',
          );
        (n.playbackType = e.PlaybackType.encryptedFull),
          (h.nowPlayingItem = n),
          (n.state = F.loading),
          (h.userInitiated = d);
        const y = generateAssetUrl(n, p);
        yield h.playHlsStream(y, n, p);
      })();
    }
    playItemFromUnencryptedSource(e, n, d) {
      var p = this;
      return _async_to_generator$S(function* () {
        if (
          (je.debug('videoPlayer.playItemFromUnencryptedSource', e, n),
          p.playbackState === mn)
        )
          return void je.debug(
            'videoPlayer.playItemFromUnencryptedSource aborting playback because player is stopped',
          );
        const [d] = e.split('?');
        d.endsWith('m3u') || d.endsWith('m3u8')
          ? yield p.playHlsStream(e)
          : yield p._playAssetURL(e, n);
      })();
    }
    setPresentationMode(n) {
      var d = this;
      return _async_to_generator$S(function* () {
        const p = d._targetElement;
        if (
          p.webkitSupportsPresentationMode &&
          'function' == typeof p.webkitSetPresentationMode
        )
          return p.webkitSetPresentationMode(
            d._translatePresentationModeToString(n),
          );
        if (p.requestPictureInPicture && document.exitPictureInPicture) {
          if (n === e.PresentationMode.pictureinpicture)
            return p.requestPictureInPicture();
          if (n === e.PresentationMode.inline)
            return document.exitPictureInPicture();
        }
      })();
    }
    _translateStringToPresentationMode(n) {
      let d = yn[n];
      return (
        void 0 === d &&
          (je.warn(
            `videoPlayer._translateStringToPresentationMode ${n} is not a valid presentation mode, setting to inline`,
          ),
          (d = e.PresentationMode.inline)),
        d
      );
    }
    _translatePresentationModeToString(e) {
      let n = _n[e];
      return (
        void 0 === n &&
          (je.warn(
            `videoPlayer._translatePresentationModeToString ${e} is not a valid presentation mode, setting to inline`,
          ),
          (n = 'inline')),
        n
      );
    }
    setNextSeamlessItem(e) {
      return _async_to_generator$S(function* () {})();
    }
    constructor(e) {
      super(e),
        _define_property$1b(this, 'extension', void 0),
        _define_property$1b(this, 'video', void 0),
        _define_property$1b(this, 'mediaPlayerType', 'video'),
        _define_property$1b(this, 'restrictPlatforms', void 0),
        _define_property$1b(this, '_textTrackManager', new TrackManagerStub()),
        _define_property$1b(this, '_audioTrackManager', new TrackManagerStub()),
        _define_property$1b(this, '_shouldLoadManifestsOnce', !1),
        _define_property$1b(this, 'userInitiated', !1),
        (this.restrictPlatforms =
          !('restrict-platforms' in Ye.features) ||
          Ye.features['restrict-platforms']),
        (this.pipEventHandler = this.pipEventHandler.bind(this)),
        (this._shouldLoadManifestsOnce = shouldLoadManifestOnce());
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$o('design:type', Function),
      _ts_metadata$o('design:paramtypes', [void 0]),
    ],
    VideoPlayer.prototype,
    'onPlaybackLicenseError',
    null,
  );
  const decayingOperation = (e, n, d, p = 0) =>
    e().catch((h) => {
      const y = p + 1;
      function possiblyRetry(p) {
        if (p && y < 3) {
          const p = 1e3 * y;
          return new Promise((h, _) => {
            setTimeout(() => {
              decayingOperation(e, n, d, y).then(h, _);
            }, p);
          });
        }
        throw h;
      }
      const _ = n(h);
      return 'boolean' == typeof _ ? possiblyRetry(_) : _.then(possiblyRetry);
    });
  let gn = {
    developerToken: 'developerTokenNotSet',
    musicUserToken: 'musicUserTokenNotSet',
    cid: 'cidNotSet',
  };
  function asyncGeneratorStep$R(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$R(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$R(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$R(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1a(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$q(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1a(e, n, d[n]);
        });
    }
    return e;
  }
  function createHlsOffersLicenseChallengeBody(e) {
    return { 'adam-id': e.id, id: 1 };
  }
  function createStreamingKeysLicenseChallengeBody(e, n, d = 0) {
    var p;
    return _object_spread$q(
      { id: d, 'lease-action': n },
      null !== (p = e.keyServerQueryParameters) && void 0 !== p ? p : {},
    );
  }
  function createLicenseChallengeBody(e, n, d, p, h, y, _) {
    let m;
    const g = {
      challenge: p.challenge || Ie(p.licenseChallenge),
      'key-system': h,
      uri: p.keyuri,
    };
    return (
      _ && (g['extended-lease'] = _),
      (m = d.isUTS
        ? e.startsWith(
            'https://play.itunes.apple.com/WebObjects/MZPlay.woa/web/video/subscription/license',
          )
          ? _object_spread$q(
              {},
              g,
              (function (e, n = 'start') {
                return {
                  'extra-server-parameters': e.keyServerQueryParameters,
                  'license-action': n,
                };
              })(d, n),
            )
          : {
              'streaming-request': {
                version: 1,
                'streaming-keys': [
                  _object_spread$q(
                    {},
                    g,
                    createStreamingKeysLicenseChallengeBody(d, n),
                  ),
                ],
              },
            }
        : d.isLiveRadioStation
          ? _object_spread$q(
              {},
              g,
              (function (e) {
                return { event: e.isLiveAudioStation ? 'beats1' : 'amtv' };
              })(d),
            )
          : d.hasOffersHlsUrl
            ? {
                'license-requests': [
                  _object_spread$q(
                    {},
                    g,
                    createHlsOffersLicenseChallengeBody(d),
                  ),
                ],
              }
            : _object_spread$q(
                {},
                g,
                (function (e, n = !1) {
                  return {
                    adamId: e.songId,
                    isLibrary: e.isCloudItem,
                    'user-initiated': n,
                  };
                })(d, y),
              )),
      m
    );
  }
  class License {
    fetch(e) {
      const n = {
        Authorization: 'Bearer ' + gn.developerToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Apple-Music-User-Token': '' + gn.musicUserToken,
      };
      this.keySystem === We.WIDEVINE && (n['X-Apple-Renewal'] = !0);
      const d = new Headers(n);
      return decayingOperation(
        () =>
          fetch(this.licenseUrl, {
            method: 'POST',
            body: JSON.stringify(e),
            headers: d,
          }),
        (e) => e instanceof TypeError,
        'license fetch',
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
    start(e, n, d, p, h = !1, y = !1) {
      var _ = this;
      return _async_to_generator$R(function* () {
        (_.licenseUrl = e),
          (_.playableItem = n),
          (_.data = d),
          (_.keySystem = p),
          (_.initiated = h);
        const m = d.isRenewalRequest ? 'renew' : 'start',
          g = createLicenseChallengeBody(e, m, n, d, p, h, y);
        n.hasOffersHlsUrl &&
          !_.licenseUrl.includes('start') &&
          (_.licenseUrl += '/' + m),
          (_.startResponse = _.fetch(g));
        try {
          var b, S, P, E, T;
          const e = yield _.startResponse;
          if (!e.ok) {
            let n;
            try {
              n = yield e.json();
            } catch (Ut) {}
            _.processJsonError(n);
          }
          const n = yield e.json();
          let d = n;
          var k;
          return (
            (
              null === (P = n) ||
              void 0 === P ||
              null === (S = P['streaming-response']) ||
              void 0 === S ||
              null === (b = S['streaming-keys']) ||
              void 0 === b
                ? void 0
                : b.length
            )
              ? (d = n['streaming-response']['streaming-keys'][0])
              : (null === (T = n) ||
                void 0 === T ||
                null === (E = T['license-responses']) ||
                void 0 === E
                  ? void 0
                  : E.length) && (d = n['license-responses'][0]),
            (d.status =
              null !== (k = d.status) && void 0 !== k ? k : d.errorCode),
            0 !== d.status && _.processJsonError(d),
            d
          );
        } catch (Q) {
          throw ((_.startResponse = void 0), Q);
        }
      })();
    }
    processJsonError(e) {
      var n, d;
      let p = new MKError(
        MKError.Reason.MEDIA_LICENSE,
        'Error acquiring license',
      );
      if (
        ((null === (n = e) || void 0 === n ? void 0 : n.errorCode) &&
          (e.status = e.errorCode),
        -1021 === (null === (d = e) || void 0 === d ? void 0 : d.status) &&
          (e.status = 190121),
        e && 0 !== e.status)
      ) {
        if (!e.message)
          switch (e.status) {
            case -1004:
              e.message = MKError.Reason.DEVICE_LIMIT;
              break;
            case -1017:
              e.message = MKError.Reason.GEO_BLOCK;
              break;
            default:
              e.message = MKError.Reason.MEDIA_LICENSE;
          }
        (p = MKError.serverError(e)),
          (p.data = e),
          p.reason === MKError.Reason.PLAYREADY_CBC_ENCRYPTION_ERROR &&
            (function () {
              const e = getSessionStorage();
              e && e.setItem('mk-playready-cbcs-unsupported', 'true');
            })();
      }
      throw p;
    }
    stop() {
      var e = this;
      return _async_to_generator$R(function* () {
        if (e.startResponse)
          try {
            yield e.startResponse;
          } catch (Q) {}
        if (!e.playableItem || !e.data || !e.licenseUrl) return;
        if (!e.playableItem.isUTS) return;
        const n = createLicenseChallengeBody(
            e.licenseUrl,
            'stop',
            e.playableItem,
            e.data,
            e.keySystem,
            e.initiated,
          ),
          d = e.fetch(n);
        e.reset();
        try {
          yield d;
        } catch (Q) {
          je.warn('license.stop request error', Q);
        }
      })();
    }
    constructor() {
      _define_property$1a(this, 'licenseUrl', void 0),
        _define_property$1a(this, 'playableItem', void 0),
        _define_property$1a(this, 'data', void 0),
        _define_property$1a(this, 'initiated', void 0),
        _define_property$1a(this, 'keySystem', void 0),
        _define_property$1a(this, 'startResponse', void 0);
    }
  }
  function asyncGeneratorStep$Q(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$Q(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$Q(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$Q(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$19(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$n(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class KeySession extends Notifications {
    get extID() {
      if (this.extURI) return this.extURI.replace('data:;base64,', '');
    }
    get isFairplay() {
      return this.keySystem === We.FAIRPLAY;
    }
    get isPlayReady() {
      return this.keySystem === We.PLAYREADY;
    }
    get isWidevine() {
      return this.keySystem === We.WIDEVINE;
    }
    acquirePlaybackLicense(e, n, d, p) {
      var h = this;
      return _async_to_generator$Q(function* () {
        if (!h.keyServerURL || !h.developerToken || !h.userToken) return;
        const { keyServerURL: d, keySystem: y } = h,
          _ = p.item;
        try {
          return yield h.license.start(
            d,
            _,
            { challenge: n, keyuri: e },
            y,
            h.initiated,
            h.isLegacyEme && _.isUTS,
          );
        } catch (Ut) {
          h.dispatchEvent(Je.playbackLicenseError, Ut);
        }
      })();
    }
    startLicenseSession(e) {
      var n = this;
      return _async_to_generator$Q(function* () {
        let d;
        je.debug('Starting License Session', e);
        const { message: p, target: h, messageType: y } = e;
        if (n.keySystem !== We.FAIRPLAY && 'license-request' !== y)
          return void je.debug('not making license request for', y);
        if (n.isPlayReady) {
          const e = String.fromCharCode.apply(
            null,
            new Uint16Array(p.buffer || p),
          );
          d = new DOMParser()
            .parseFromString(e, 'application/xml')
            .getElementsByTagName('Challenge')[0].childNodes[0].nodeValue;
        } else d = Ie(new Uint8Array(p));
        const _ = h.extURI || n.extURI,
          m = n.mediaKeySessions[_];
        if (!m)
          return void je.debug('no key session info, aborting license request');
        const g = n.acquirePlaybackLicense(_, d, n.initiated, m);
        if (m.delayCdmUpdate) m['license-json'] = g;
        else {
          const e = yield g;
          yield n.handleLicenseJson(e, h, _);
        }
      })();
    }
    setKeyURLs(e) {
      (this.keyCertURL =
        e[this.isFairplay ? 'hls-key-cert-url' : 'widevine-cert-url']),
        (this.keyServerURL = e['hls-key-server-url']);
    }
    dispatchKeyError(e) {
      var n, d, p;
      this.isFairplay &&
      4294955417 ===
        (null === (p = e) ||
        void 0 === p ||
        null === (d = p.target) ||
        void 0 === d ||
        null === (n = d.error) ||
        void 0 === n
          ? void 0
          : n.systemCode)
        ? je.error('Ignoring error', e)
        : (console.error(
            MKError.Reason.MEDIA_KEY + ' error in dispatchKeyError:',
            e,
          ),
          this.dispatchEvent(
            Je.playbackSessionError,
            new MKError(MKError.Reason.MEDIA_KEY, e),
          ));
    }
    dispatchSessionError(e) {
      this.dispatchEvent(
        Je.playbackSessionError,
        new MKError(MKError.Reason.MEDIA_SESSION, e),
      );
    }
    loadCertificateBuffer() {
      var e = this;
      return _async_to_generator$Q(function* () {
        if (!e.keyCertURL)
          return Promise.reject(
            new MKError(MKError.Reason.MEDIA_SESSION, 'No certificate URL'),
          );
        let n;
        try {
          n = yield fetch(`${e.keyCertURL}?t=${Date.now()}`);
        } catch (Q) {
          throw (e.dispatchKeyError(Q), Q);
        }
        const d = yield n.arrayBuffer(),
          p = String.fromCharCode.apply(String, new Uint8Array(d));
        return /^\<\?xml/.test(p)
          ? Promise.reject(
              new MKError(
                MKError.Reason.MEDIA_CERTIFICATE,
                'Invalid certificate.',
              ),
            )
          : d;
      })();
    }
    handleSessionCreation(e) {
      var n = this;
      return _async_to_generator$Q(function* () {
        return n.createSession(e).catch((e) => {
          n.dispatchSessionError(e);
        });
      })();
    }
    handleLicenseJson(e, n, d) {
      var p = this;
      return _async_to_generator$Q(function* () {
        var h;
        if (
          (je.debug(`updating session ${d} with license response`, e),
          null === (h = e) || void 0 === h ? void 0 : h.license)
        ) {
          const d = Te(e.license);
          try {
            yield n.update(d);
          } catch (Ut) {
            je.error('Failed to updated media keys', Ut),
              p.dispatchKeyError(Ut);
          }
        }
      })();
    }
    addMediaKeySessionInfo(e, n, d, p = !1) {
      const h = this.mediaKeySessions[e];
      h
        ? (je.debug(
            `keySession info exists for ${d.title}, making existing session ${h.session.sessionId} the old session`,
          ),
          (h.oldSession = h.session),
          (h.session = n))
        : (je.debug('creating key session info for ' + d.title),
          (this.mediaKeySessions[e] = {
            session: n,
            item: d,
            delayCdmUpdate: p,
          }));
    }
    stopLicenseSession() {
      je.info('key session sending license stop'), this.license.stop();
    }
    constructor() {
      super([Je.playbackLicenseError, Je.playbackSessionError]),
        _define_property$19(this, 'developerToken', void 0),
        _define_property$19(this, 'adamId', void 0),
        _define_property$19(this, 'userToken', void 0),
        _define_property$19(this, 'extURI', void 0),
        _define_property$19(this, 'item', void 0),
        _define_property$19(this, 'initiated', !0),
        _define_property$19(this, 'isLibrary', !1),
        _define_property$19(this, 'keyCertURL', void 0),
        _define_property$19(this, 'keyServerURL', void 0),
        _define_property$19(this, 'keySystem', We.FAIRPLAY),
        _define_property$19(this, 'isLegacyEme', !1),
        _define_property$19(this, 'boundDispatchKeyError', void 0),
        _define_property$19(this, 'boundDispatchSessionError', void 0),
        _define_property$19(this, 'boundHandleSessionCreation', void 0),
        _define_property$19(this, 'boundStartLicenseSession', void 0),
        _define_property$19(this, 'mediaKeySessions', {}),
        _define_property$19(this, '_pendingRenewal', void 0),
        _define_property$19(this, 'license', void 0),
        (this.boundDispatchKeyError = this.dispatchKeyError.bind(this)),
        (this.boundDispatchSessionError = this.dispatchSessionError.bind(this)),
        (this.boundHandleSessionCreation =
          this.handleSessionCreation.bind(this)),
        (this.boundStartLicenseSession = this.startLicenseSession.bind(this)),
        (this.license = new License());
    }
  }
  function asyncGeneratorStep$P(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$P(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$P(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$P(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$18(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$m(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$n('design:type', Function),
      _ts_metadata$n('design:paramtypes', [void 0]),
    ],
    KeySession.prototype,
    'startLicenseSession',
    null,
  );
  class FairplayEncryptedSession extends KeySession {
    attachMedia(e, n) {
      var d = this;
      return _async_to_generator$P(function* () {
        (d.keySystem = n.keySystem),
          (d._keySystemAccess = n),
          e.addEventListener('encrypted', d.boundHandleSessionCreation, !1);
      })();
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
      var n = this;
      return _async_to_generator$P(function* () {
        je.debug('fairplay eme:  createSession', e);
        const d = n._keySystemAccess;
        if (!d) return;
        const { initData: p, target: h, initDataType: y } = e;
        n._mediaKeysPromise ||
          (n._mediaKeysPromise = new Promise(
            (function () {
              var e = _async_to_generator$P(function* (e, p) {
                const y = yield d.createMediaKeys();
                try {
                  yield h.setMediaKeys(y), (n._mediaKeys = y);
                  const e = yield n.loadCertificateBuffer();
                  yield y.setServerCertificate(e);
                } catch (Q) {
                  n.dispatchKeyError(Q), p(Q);
                }
                e(y);
              });
              return function (n, d) {
                return e.apply(this, arguments);
              };
            })(),
          ));
        const _ = yield n._mediaKeysPromise,
          m = new Uint8Array(p),
          g = String.fromCharCode.apply(void 0, Array.from(m));
        if (n.mediaKeySessions[g])
          return void je.error(
            'fairplay eme: not creating new session for extURI',
            g,
          );
        const b = _.createSession();
        je.debug('fairplay eme: creating new key session for', g),
          n.addMediaKeySessionInfo(g, b, n.item),
          b.addEventListener('message', n.startFairplayLicenseSession),
          (b.extURI = g),
          yield b.generateRequest(y, p),
          (n._mediaKeySessions[b.sessionId] = b),
          je.debug('fairplay eme: created session', b);
      })();
    }
    startFairplayLicenseSession(e) {
      const { message: n, target: d } = e,
        p = Ie(new Uint8Array(n)),
        h = d.extURI || this.extURI,
        y = this.mediaKeySessions[h];
      if (y)
        return this.acquirePlaybackLicense(h, p, this.initiated, y).then((e) =>
          this.handleLicenseJson(e, d, h),
        );
      je.debug(
        'fairplay eme: no key session info, aborting license request',
        h,
      );
    }
    handleLicenseJson(e, n, d) {
      var p = this,
        _superprop_get_handleLicenseJson = () => super.handleLicenseJson;
      return _async_to_generator$P(function* () {
        if (!e) return;
        const h = p.mediaKeySessions[d];
        if (!h)
          return void je.debug(
            'fairplay eme: media key session does not exist, not updating',
          );
        const y = e['renew-after'];
        if (e.license && y) {
          je.debug('fairplay eme: got renew after value', y, d);
          const e = p._mediaKeySessionRenewals,
            _ = e[n.sessionId];
          _ && clearTimeout(_),
            (e[n.sessionId] = setTimeout(
              () => p._renewMediaKeySession(h, d),
              1e3 * y,
            ));
        }
        yield _superprop_get_handleLicenseJson().call(p, e, n, d);
      })();
    }
    _renewMediaKeySession(e, n) {
      delete this._mediaKeySessionRenewals[e.session.sessionId],
        je.debug('fairplay eme: renewing session', e),
        e.session.update(ke('renew'));
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e) {
      return _async_to_generator$P(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$P(function* () {})();
    }
    constructor(...e) {
      super(...e),
        _define_property$18(this, '_keySystemAccess', void 0),
        _define_property$18(this, '_mediaKeysPromise', void 0),
        _define_property$18(this, '_mediaKeySessions', {}),
        _define_property$18(this, '_mediaKeySessionRenewals', {}),
        _define_property$18(this, '_mediaKeys', void 0);
    }
  }
  function asyncGeneratorStep$O(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$O(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$O(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$O(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$17(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$m('design:type', Function),
      _ts_metadata$m('design:paramtypes', [void 0]),
    ],
    FairplayEncryptedSession.prototype,
    'startFairplayLicenseSession',
    null,
  );
  const bn = /^(?:.*)(skd:\/\/.+)$/i;
  class WebKitSession extends KeySession {
    get isDestroyed() {
      return this._isDestroyed;
    }
    attachMedia(e, n) {
      return (
        (this.target = e),
        e.addEventListener(
          'webkitneedkey',
          this.boundHandleSessionCreation,
          !1,
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
          !1,
        ),
        e.removeEventListener('webkitkeyerror', this.boundDispatchKeyError));
    }
    destroy() {
      je.debug('FPS destroy'),
        (this._isDestroyed = !0),
        this.detachMedia(this.target),
        this.session &&
          (this.session.removeEventListener(
            'webkitkeyerror',
            this.boundDispatchKeyError,
          ),
          this.session.removeEventListener(
            'webkitkeymessage',
            this.boundStartLicenseSession,
          ));
    }
    createSession(e) {
      je.debug('FPS createSession', e);
      const { initData: n, target: d } = e,
        { item: p } = this;
      if (!p)
        return je.error('Cannot createSession without item'), Promise.resolve();
      const h = this._extractAssetId(n);
      if ((je.debug('extURI', h), !d.webkitKeys && window.WebKitMediaKeys)) {
        const e = new window.WebKitMediaKeys(this.keySystem);
        d.webkitSetMediaKeys(e);
      }
      return this.loadCertificateBuffer().then((e) => {
        const y = this._concatInitDataIdAndCertificate(n, h, e),
          _ = 'VIDEO' === d.tagName ? Xe.AVC1 : Xe.MP4,
          m = d.webkitKeys.createSession(_, y);
        this.addMediaKeySessionInfo(h, m, p),
          (this.session = m),
          (m.extURI = h),
          m.addEventListener('webkitkeyerror', this.boundDispatchKeyError),
          m.addEventListener('webkitkeymessage', this.boundStartLicenseSession);
      });
    }
    _extractAssetId(e) {
      let n = String.fromCharCode.apply(null, new Uint16Array(e.buffer || e));
      const d = n.match(bn);
      return (
        d && d.length >= 2 && (n = d[1]),
        je.debug('Extracted assetId from EXT-X-KEY URI', n),
        n
      );
    }
    _concatInitDataIdAndCertificate(e, n, d) {
      'string' == typeof n && (n = we(n)), (d = new Uint8Array(d));
      let p = 0;
      const h = new ArrayBuffer(
          e.byteLength + 4 + n.byteLength + 4 + d.byteLength,
        ),
        y = new DataView(h);
      new Uint8Array(h, p, e.byteLength).set(e),
        (p += e.byteLength),
        y.setUint32(p, n.byteLength, !0),
        (p += 4);
      const _ = new Uint8Array(h, p, n.byteLength);
      _.set(n), (p += _.byteLength), y.setUint32(p, d.byteLength, !0), (p += 4);
      return (
        new Uint8Array(h, p, d.byteLength).set(d),
        new Uint8Array(h, 0, h.byteLength)
      );
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e) {
      return _async_to_generator$O(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$O(function* () {})();
    }
    constructor(...e) {
      super(...e),
        _define_property$17(this, 'target', void 0),
        _define_property$17(this, 'session', void 0),
        _define_property$17(this, '_isDestroyed', !1),
        _define_property$17(this, 'isLegacyEme', !0);
    }
  }
  function asyncGeneratorStep$N(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$N(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$N(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$N(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
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
      const p = d.msKeys.createSession(Xe.MP4, n);
      return (
        p.addEventListener('mskeyerror', this.dispatchKeyError),
        p.addEventListener('mskeymessage', this.startLicenseSession.bind(this)),
        p
      );
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e) {
      return _async_to_generator$N(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$N(function* () {})();
    }
  }
  const Sn = {
      [We.WIDEVINE]: Ze.WIDEVINE,
      [We.FAIRPLAY]: Ze.FAIRPLAY,
      [We.PLAYREADY]: Ze.PLAYREADY,
    },
    Pn = [
      0, 0, 1, 222, 112, 115, 115, 104, 0, 0, 0, 0, 154, 4, 240, 121, 152, 64,
      66, 134, 171, 146, 230, 91, 224, 136, 95, 149, 0, 0, 1, 190,
    ],
    En = [190, 1, 0, 0, 1, 0, 1, 0, 180, 1];
  function concatenate(e, ...n) {
    let d = 0;
    for (const y of n) d += y.length;
    const p = new e(d);
    let h = 0;
    for (const y of n) p.set(y, h), (h += y.length);
    return p;
  }
  const { WIDEVINE: Tn, PLAYREADY: kn } = We,
    wn = {};
  (wn[Tn] = (e) => {
    je.debug('generating Widevine pssh for keyId');
    const n = new Uint8Array([
      0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121, 214,
      74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1, 18, 16,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    for (let d = 0; d < e.length; d++) n[n.length - 16 + d] = e[d];
    return je.debug('generatePSSH', n), n;
  }),
    (wn[kn] = (e) => {
      je.debug('generating Playready pssh for keyId'),
        ((e) => {
          const swap = (e, n, d) => {
            const p = e[n];
            (e[n] = e[d]), (e[d] = p);
          };
          swap(e, 0, 3), swap(e, 1, 2), swap(e, 4, 5), swap(e, 6, 7);
        })(e);
      const n = Ie(e),
        d =
          '<WRMHEADER xmlns="http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.3.0.0"><DATA><PROTECTINFO><KIDS><KID ALGID="AESCTR" VALUE="[KEYID]"></KID></KIDS></PROTECTINFO></DATA></WRMHEADER>'.replace(
            '[KEYID]',
            n,
          ),
        p = we(d),
        h = new Uint8Array(p.buffer, p.byteOffset, p.byteLength);
      return concatenate(Uint8Array, Pn, En, h);
    });
  function asyncGeneratorStep$M(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$M(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$M(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$M(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$16(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class PreloadingEncryptedSession extends KeySession {
    attachMedia(e, n) {
      (this.keySystem = n.keySystem),
        (this._keySystemAccess = n),
        (this._target = e);
    }
    detachMedia() {
      asAsync(this.clearSessions());
    }
    createSession(e) {
      return _async_to_generator$M(function* () {})();
    }
    _mediaKeysSetup() {
      var e = this;
      return _async_to_generator$M(function* () {
        const n = e._keySystemAccess;
        n &&
          (e._mediaKeysPromise ||
            (e._mediaKeysPromise = new Promise(
              (function () {
                var d = _async_to_generator$M(function* (d, p) {
                  const h = yield n.createMediaKeys();
                  try {
                    var y;
                    yield null === (y = e._target) || void 0 === y
                      ? void 0
                      : y.setMediaKeys(h),
                      (e._mediaKeys = h);
                  } catch (Q) {
                    e.dispatchKeyError(Q), p(Q);
                  }
                  if (e.isWidevine) {
                    const n = yield e.loadCertificateBuffer();
                    yield h.setServerCertificate(n);
                  }
                  d(h);
                });
                return function (e, n) {
                  return d.apply(this, arguments);
                };
              })(),
            )),
          yield e._mediaKeysPromise);
      })();
    }
    createSessionAndGenerateRequest(e, n, d) {
      var p = this;
      return _async_to_generator$M(function* () {
        var h, y, _;
        const m = !!(null === (h = d) || void 0 === h ? void 0 : h.isRenewal),
          g = !!(null === (y = d) || void 0 === y ? void 0 : y.delayCdmUpdate);
        if (!m && p.mediaKeySessions[e]) return;
        je.debug(
          `createSessionAndGenerateRequest for item ${n.title}, isRenewal ${m}`,
        );
        const b =
            null === (_ = p._mediaKeys) || void 0 === _
              ? void 0
              : _.createSession(),
          { keySystem: S } = p;
        if (!b) return;
        p.addMediaKeySessionInfo(e, b, n, g);
        const P = ((e) => {
            if (e.includes('data')) {
              const [n, d] = e.split(',');
              return d;
            }
            return e;
          })(e),
          E = Te(P),
          T = (p.isWidevine && n.isSong) || 16 === E.length;
        let k;
        var w;
        return (
          je.debug('extracted uri', e),
          p.isPlayReady && !T
            ? (je.debug('handling Playready object'),
              (b.extURI = e),
              (w = E),
              (k = concatenate(Uint8Array, new Uint8Array(Pn), w)))
            : T
              ? (je.debug('handling keyId only initData'),
                (b.extURI = 'data:;base64,' + Ie(E)),
                (k = ((e, n) => {
                  const d = wn[n];
                  if (!d) return je.warn('No pssh generator for ', n), e;
                  return d(Uint8Array.from(e));
                })(E, S)))
              : (je.debug('handling pssh initData'), (b.extURI = e), (k = E)),
          b.addEventListener('message', p.startLicenseSession),
          b.generateRequest('cenc', k).catch((e) => {
            if (e.message.match(/generateRequest.*\(75\)/))
              return b.generateRequest('cenc', k);
            throw e;
          })
        );
      })();
    }
    handleLicenseJson(e, n, d) {
      var p = this,
        _superprop_get_handleLicenseJson = () => super.handleLicenseJson;
      return _async_to_generator$M(function* () {
        var h;
        if (!e) return;
        const y = p.mediaKeySessions[d];
        if (!y)
          return void je.debug(
            'media key session does not exist, not updating',
          );
        const _ = e['renew-after'];
        if (e.license && _) {
          je.debug('Got renew after value', _, d);
          const e = p._mediaKeySessionRenewals,
            h = e[n.sessionId];
          h && clearTimeout(h),
            (e[n.sessionId] = setTimeout(
              () => p._renewMediaKeySession(y, d),
              1e3 * _,
            ));
        }
        yield _superprop_get_handleLicenseJson().call(p, e, n, d);
        const m =
          null === (h = p.mediaKeySessions[d]) || void 0 === h
            ? void 0
            : h.oldSession;
        m &&
          (je.debug('removing old key session after updating', d),
          yield p._removeAndCloseSession(m),
          delete p.mediaKeySessions[d].oldSession,
          delete p._mediaKeySessionRenewals[m.sessionId]);
      })();
    }
    _renewMediaKeySession(e, n) {
      delete this._mediaKeySessionRenewals[e.session.sessionId],
        asAsync(
          this.createSessionAndGenerateRequest(n, e.item, { isRenewal: !0 }),
        );
    }
    applyDelayedCdmUpdates() {
      var e = this;
      return _async_to_generator$M(function* () {
        je.debug('applying delayed CDM updates');
        const n = Object.entries(e.mediaKeySessions);
        for (const d of n) {
          const [n, p] = d;
          if (p.delayCdmUpdate) {
            const d = yield p['license-json'];
            je.debug('delayed update of license', d),
              (p.delayCdmUpdate = !1),
              yield e.handleLicenseJson(d, p.session, n);
          }
        }
      })();
    }
    loadKeys(e, n, d) {
      var p = this;
      return _async_to_generator$M(function* () {
        var h;
        yield p._mediaKeysSetup();
        const y = p.filterKeyValues(e);
        for (const e of y) {
          const { dataUri: h } = e;
          yield p.createSessionAndGenerateRequest(h, n, d);
        }
        if (null === (h = n) || void 0 === h ? void 0 : h.isLiveAudioStation) {
          const e = Object.keys(p.mediaKeySessions),
            n = y.reduce((e, n) => ((e[n.dataUri] = !0), e), {});
          for (const d of e) n[d] || (yield p._scheduleRemoveSession(d));
        }
      })();
    }
    filterKeyValues(e) {
      let n;
      if (1 === e.length) n = e;
      else {
        const d = Sn[this.keySystem];
        n = e.filter((e) => e.keyFormat === d);
      }
      return n;
    }
    clearSessions(e) {
      var n = this;
      return _async_to_generator$M(function* () {
        var d;
        const p = n.mediaKeySessions;
        if (null === (d = e) || void 0 === d ? void 0 : d.length) {
          const d = n.filterKeyValues(e);
          for (const e of d) {
            const d = e.dataUri;
            clearTimeout(n._sessionRemovalTimeouts[d]),
              yield n._removeSessionImmediately(d);
          }
        } else {
          Object.values(n._sessionRemovalTimeouts).forEach((e) =>
            clearTimeout(e),
          ),
            je.debug('clearing key sessions', p);
          for (const e of Object.keys(p)) yield n._removeSessionImmediately(e);
        }
      })();
    }
    _scheduleRemoveSession(e) {
      var n = this;
      return _async_to_generator$M(function* () {
        if (!n.mediaKeySessions[e])
          return void je.warn(
            'no session for dataUri, not scheduling remove',
            e,
          );
        if (n._sessionRemovalTimeouts[e]) return;
        const d = setTimeout(() => {
          asAsync(n._removeSessionImmediately(e));
        }, 6e4);
        je.debug('deferring removal of keysession for dataUri', e),
          (n._sessionRemovalTimeouts[e] = d);
      })();
    }
    _removeSessionImmediately(e) {
      var n = this;
      return _async_to_generator$M(function* () {
        const d = n.mediaKeySessions[e];
        if (!d) return void je.warn('no session for dataUri, not removing', e);
        je.debug('removing keysession for', e);
        const { session: p, oldSession: h } = d;
        n._clearSessionRenewal(p),
          delete n.mediaKeySessions[e],
          yield n._removeAndCloseSession(p),
          h && (yield n._removeAndCloseSession(h));
      })();
    }
    _removeAndCloseSession(e) {
      var n = this;
      return _async_to_generator$M(function* () {
        e.removeEventListener('message', n.startLicenseSession),
          je.debug('tearing down session', e.sessionId);
        try {
          yield e.remove();
        } catch (Ut) {
          je.warn('Error invoking session.remove()', Ut);
        } finally {
          try {
            yield e.close();
          } catch (Ut) {
            je.warn('Error invoking session.close()', Ut);
          }
        }
      })();
    }
    _clearSessionRenewal(e) {
      const n = this._mediaKeySessionRenewals[e.sessionId];
      n &&
        (je.debug(
          'clearing scheduled license renewal for session',
          e.sessionId,
        ),
        clearTimeout(n),
        delete this._mediaKeySessionRenewals[e.sessionId]);
    }
    constructor(...e) {
      super(...e),
        _define_property$16(this, '_keySystemAccess', void 0),
        _define_property$16(this, '_mediaKeysPromise', void 0),
        _define_property$16(this, '_mediaKeys', void 0),
        _define_property$16(this, '_target', void 0),
        _define_property$16(this, '_sessionRemovalTimeouts', {}),
        _define_property$16(this, '_mediaKeySessionRenewals', {});
    }
  }
  function asyncGeneratorStep$L(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$L(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$L(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$L(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$15(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const In = BooleanDevFlag.register('mk-safari-modern-eme');
  class MediaExtension extends Notifications {
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
      var n = this;
      return _async_to_generator$L(function* () {
        var d;
        return null === (d = n.session) || void 0 === d
          ? void 0
          : d.clearSessions(e);
      })();
    }
    initializeKeySystem() {
      var e = this;
      return _async_to_generator$L(function* () {
        yield e._attachSession();
        const { _session: n } = e;
        n &&
          [Je.playbackLicenseError, Je.playbackSessionError].forEach((d) => {
            n.addEventListener(d, (n) => {
              e.dispatchEvent(d, n);
            });
          });
      })();
    }
    _requestModernFairplayAccess() {
      var e = this;
      return _async_to_generator$L(function* () {
        const { contentType: n } = e,
          d = [
            {
              initDataTypes: ['skd'],
              audioCapabilities: [{ contentType: n, robustness: '' }],
              videoCapabilities: [{ contentType: n, robustness: '' }],
              distinctiveIdentifier: 'not-allowed',
              persistentState: 'not-allowed',
              sessionTypes: ['temporary'],
            },
          ],
          [, p] = yield findMediaKeySystemAccess([We.FAIRPLAY], d);
        return p;
      })();
    }
    _attachSession() {
      var e = this;
      return _async_to_generator$L(function* () {
        var n, d;
        const { mediaElement: p, contentType: h } = e;
        if (
          null === (n = window.WebKitMediaKeys) || void 0 === n
            ? void 0
            : n.isTypeSupported(We.FAIRPLAY + '.1_0', Xe.MP4)
        ) {
          let n;
          In.enabled &&
            e.hasMediaKeySupport &&
            (n = yield e._requestModernFairplayAccess()),
            n
              ? (je.warn('media-extension: Using Fairplay modern EME'),
                (e._session = new FairplayEncryptedSession()),
                e._session.attachMedia(p, n))
              : (je.warn('media-extension: Using Fairplay legacy EME'),
                (e._session = new WebKitSession()),
                e._session.attachMedia(p, { keySystem: We.FAIRPLAY }));
        } else if (
          null === (d = window.MSMediaKeys) || void 0 === d
            ? void 0
            : d.isTypeSupported(We.PLAYREADY, Xe.MP4)
        )
          (e._session = new MSSession()),
            e._session.attachMedia(p, { keySystem: We.PLAYREADY });
        else if (e.hasMediaKeySupport && p.canPlayType(h)) {
          e._session = new PreloadingEncryptedSession();
          const n = [
              {
                initDataTypes: ['cenc', 'keyids'],
                audioCapabilities: [{ contentType: h }],
                distinctiveIdentifier: 'optional',
                persistentState: 'required',
              },
            ],
            d = potentialKeySystemsForAccess(),
            [, _] = yield findMediaKeySystemAccess(d, n);
          var y;
          if (_)
            null === (y = e._session) || void 0 === y || y.attachMedia(p, _);
          else je.warn('media-extension: No keysystem detected!');
        }
      })();
    }
    setMediaItem(e) {
      !(function (e, n) {
        n.keyURLs &&
          ((e.developerToken = gn.developerToken),
          (e.userToken = gn.musicUserToken),
          (e.item = n),
          (e.adamId = n.songId),
          (e.isLibrary = n.isCloudItem),
          e.setKeyURLs(n.keyURLs));
      })(this._session, e);
    }
    destroy(e) {
      var n;
      null === (n = this._session) || void 0 === n || n.detachMedia(e);
    }
    constructor(e, n) {
      super([Je.playbackLicenseError, Je.playbackSessionError]),
        _define_property$15(this, '_session', void 0),
        _define_property$15(this, 'mediaElement', void 0),
        _define_property$15(this, 'contentType', void 0),
        (this.mediaElement = e),
        (this.contentType = n);
    }
  }
  const On = BooleanDevFlag.register('mk-force-audio-mse'),
    shouldForceAudioMse = () => On.enabled;
  function asyncGeneratorStep$K(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$14(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class ByteRangeSegment {
    load() {
      var e,
        n = this;
      return ((e = function* () {
        const { url: e, range: d } = n;
        if (!e) return new Uint8Array();
        const p = new Headers();
        p.append('Range', d);
        const h = yield fetch(e, { headers: p }),
          y = yield h.arrayBuffer();
        return new Uint8Array(y);
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);
          function _next(e) {
            asyncGeneratorStep$K(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$K(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    constructor({ url: e, startByte: n, length: d, isInitSegment: p = !1 }) {
      _define_property$14(this, 'url', void 0),
        _define_property$14(this, 'range', void 0),
        _define_property$14(this, 'startByte', void 0),
        _define_property$14(this, 'endByte', void 0),
        _define_property$14(this, 'length', void 0),
        _define_property$14(this, 'startTime', void 0),
        _define_property$14(this, 'endTime', void 0),
        _define_property$14(this, 'isInitSegment', void 0),
        (this.url = e),
        (this.isInitSegment = p),
        (this.startByte = parseInt(n, 10)),
        (this.length = parseInt(d, 10)),
        (this.endByte = this.startByte + this.length - 1),
        (this.range = `bytes=${this.startByte}-${this.endByte}`);
    }
  }
  function asyncGeneratorStep$J(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$13(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class ContinuousSegment {
    load() {
      var e,
        n = this;
      return ((e = function* () {
        const { url: e } = n;
        if (!e) return new Uint8Array();
        const d = yield fetch(e),
          p = yield d.arrayBuffer();
        return new Uint8Array(p);
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);
          function _next(e) {
            asyncGeneratorStep$J(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$J(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    constructor(e, n = !1) {
      _define_property$13(this, 'url', void 0),
        _define_property$13(this, 'isInitSegment', void 0),
        (this.url = e),
        (this.isInitSegment = n);
    }
  }
  function _define_property$12(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const An = /^#EXT-X-BYTERANGE:([^\n]+)\n/gim,
    Rn = /^#EXT-X-MAP:([^\n]+)\n/im,
    $n = /#EXTINF:\d*\.\d*\,[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim,
    Cn =
      /#EXTINF:\d*\.\d*,\s*#EXT-X-BITRATE:\d{1,3}[\n](.+)|^#EXT-X-MAP:URI="([^"]*)"/gim;
  class SegmentList {
    get segments() {
      return this._segments;
    }
    addSegment(e, n) {
      this._addedSegments[n] ||
        (je.debug('Adding segment', n),
        this._segments.push(e),
        (this._addedSegments[n] = !0));
    }
    extractLiveRadioSegments(e, n) {
      this._extractContinuousSegments($n, e, n);
    }
    extractHlsOffersSegments(e, n) {
      this._extractContinuousSegments(Cn, e, n);
    }
    _extractContinuousSegments(e, n, d) {
      if (!n || !e.test(n)) return;
      let p;
      for (e.lastIndex = 0; (p = e.exec(n)); ) {
        const e = p[0].startsWith('#EXT-X-MAP') ? p[2] : p[1],
          n = rewriteLastUrlPath(d, e),
          h = p[0].startsWith('#EXT-X-MAP');
        this.addSegment(new ContinuousSegment(n, h), e);
      }
    }
    extractByteRangeSegments(e, n) {
      if (!e || !An.test(e)) return;
      const d = (function (e) {
        if (!e || !Rn.test(e)) return;
        const [, n] = e.match(Rn);
        return n.split(',').reduce((e, n) => {
          const [d, p] = n.split('=');
          return (e[d.toLowerCase()] = p.replace(/\"/gi, '')), e;
        }, {});
      })(e);
      var p;
      const h = null !== (p = n.split('/').pop()) && void 0 !== p ? p : '',
        y = n.replace(h, d.uri),
        [_, m] = d.byterange.split('@'),
        g = new ByteRangeSegment({ url: y, startByte: m, length: _ });
      var b;
      this.addSegment(g, g.range),
        (null !== (b = e.match(An)) && void 0 !== b ? b : []).forEach((e) => {
          const [, n, d] = e.match(/^#EXT-X-BYTERANGE:(\d+)@(\d+)\n/),
            p = new ByteRangeSegment({ url: y, startByte: d, length: n });
          this.addSegment(p, p.range);
        });
    }
    constructor() {
      _define_property$12(this, '_segments', []),
        _define_property$12(this, '_addedSegments', {});
    }
  }
  var Mn;
  function asyncGeneratorStep$I(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$I(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$I(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$I(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$11(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$l(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e) {
    e.keysParsed = 'keysParsed';
  })(Mn || (Mn = {}));
  const Dn = /^#EXT-X-TARGETDURATION:(\d+)/im,
    xn = /^#EXT-X-KEY:[^\n]+URI="([^"]+)"/im,
    Ln = /^#EXT-X-KEY:[^\n]+URI="([^"]+)",KEYFORMAT="([^"]+)"/gim;
  function loadManifestData(e) {
    return _loadManifestData.apply(this, arguments);
  }
  function _loadManifestData() {
    return (_loadManifestData = _async_to_generator$I(function* (e) {
      return (yield fetch(e)).text();
    })).apply(this, arguments);
  }
  class Manifest extends Notifications {
    parse() {
      const e = this._item,
        n = this._data;
      if (et !== We.FAIRPLAY || shouldForceAudioMse())
        if ((this._detectKeyTags(), e.hasOffersHlsUrl))
          this._segmentList.extractHlsOffersSegments(n, e.assetURL);
        else if (e.isLiveRadioStation) {
          this._segmentList.extractLiveRadioSegments(n, e.assetURL);
          const [, d] = this._data.match(Dn);
          je.debug(
            `manifest: setting up manifest refresh interval at ${d} seconds`,
          );
          const p = 1e3 * parseInt(d, 10);
          this._manifestRefreshInterval = setInterval(this.liveRadioRefresh, p);
        } else this._segmentList.extractByteRangeSegments(n, e.assetURL);
    }
    static load(e, n = !0) {
      var d = this;
      return _async_to_generator$I(function* () {
        var p;
        je.debug('loading manifest for item', e.title);
        const h = e.assetURL;
        let y;
        const _ = getSessionStorage(),
          m = !!_ && n;
        var g;
        if (
          m &&
          ((y = null === (g = _) || void 0 === g ? void 0 : g.getItem(h)), y)
        )
          return new d(y, e);
        const b = new Date().getTime();
        y = yield loadManifestData(h);
        const S = new d(y, e);
        return (
          (S.downlink = (function (e, n) {
            return (8 * n.length) / ((new Date().getTime() - e) / 1e3) / 1024;
          })(b, y)),
          m && (null === (p = _) || void 0 === p || p.setItem(h, y)),
          Promise.resolve(S)
        );
      })();
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
      var e = this;
      return _async_to_generator$I(function* () {
        const n = yield loadManifestData(e._url);
        (e._data = n),
          e._detectKeyTags(),
          e._segmentList.extractLiveRadioSegments(n, e._url),
          e.dispatchEvent(Je.manifestParsed);
      })();
    }
    segmentsForTimeRange(e) {
      const n = Math.floor(e.start / 10) + 1,
        d = Math.floor(e.end / 10) + 1,
        { segments: p } = this;
      return [p[0], ...p.slice(n, d + 1)];
    }
    get segments() {
      return this._segmentList.segments;
    }
    get extURI() {
      if (!this._extURI) {
        const e = this._data.match(xn);
        je.debug('manifest: EXT_X_KEY_URI matches', e),
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
        this.dispatchEvent(Mn.keysParsed, { item: this.mediaItem, keys: e });
    }
    get _legacyKeys() {
      const e = this._data.match(xn);
      je.debug('manifest: EXT_X_KEY_URI matches', e);
      const n = (e && e[1]) || void 0;
      this._extURI = n;
      const d = [];
      return n && d.push({ keyFormat: Ze.WIDEVINE, dataUri: n }), d;
    }
    get _modernKeys() {
      let e;
      Ln.lastIndex = 0;
      const n = [];
      for (; (e = Ln.exec(this._data)); ) {
        const [d, p, h] = e;
        n.push({ keyFormat: h, dataUri: p });
      }
      return n;
    }
    stop() {
      this._manifestRefreshInterval &&
        clearInterval(this._manifestRefreshInterval);
    }
    constructor(e, n) {
      super([Je.manifestParsed, Mn.keysParsed]),
        _define_property$11(this, '_data', void 0),
        _define_property$11(this, '_downlink', 0),
        _define_property$11(this, '_extURI', void 0),
        _define_property$11(this, '_url', void 0),
        _define_property$11(this, '_item', void 0),
        _define_property$11(this, '_segmentList', new SegmentList()),
        _define_property$11(this, '_manifestRefreshInterval', void 0),
        (this._data = e),
        (this._item = n),
        (this._url = n.assetURL);
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$l('design:type', Function),
      _ts_metadata$l('design:paramtypes', []),
    ],
    Manifest.prototype,
    'liveRadioRefresh',
    null,
  );
  const Nn = 'seamlessAudioTransition',
    jn = 'bufferTimedMetadataDidChange',
    Un = 'loadSegmentError',
    Bn = isNodeEnvironment$1() ? require('util').TextDecoder : self.TextDecoder;
  function encodedArrayToString(e, n = 'utf-8') {
    if ('iso-8859-1' === n) return String.fromCharCode(...e);
    return new Bn(n).decode(e);
  }
  function readNullTerminatedString(e, n = 0, d) {
    const p = [];
    d = null != d ? d : e.length;
    for (let h = n; h < d; h++) {
      const n = e[h];
      if ('\0' === String.fromCharCode(n)) break;
      p.push(String.fromCharCode(n));
    }
    return [p.join(''), p.length];
  }
  function isBitAtPositionOn(e, n) {
    return 0 != (e & (1 << n));
  }
  function _define_property$10(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class BaseMp4Box {
    get size() {
      return this.end - this.start;
    }
    get rawBytes() {
      return this.data.slice(this.start, this.end);
    }
    constructor(e, n, d, p) {
      _define_property$10(this, 'id', void 0),
        _define_property$10(this, 'data', void 0),
        _define_property$10(this, 'start', void 0),
        _define_property$10(this, 'end', void 0),
        (this.id = e),
        (this.data = n),
        (this.start = d),
        (this.end = p);
    }
  }
  const Fn = [
    237, 239, 139, 169, 121, 214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237,
  ];
  class PsshBox extends BaseMp4Box {
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
        p = n + 32;
      return e.slice(p, p + d);
    }
    get keyBytes() {
      const { psshData: e } = this;
      return e.slice(2, 18);
    }
    get isWidevine() {
      return arrayEquals(this.systemId, Fn);
    }
    constructor(e, n, d) {
      var p, h, y;
      super('pssh', e, n, d),
        (y = void 0),
        (h = 'view') in (p = this)
          ? Object.defineProperty(p, h, {
              value: y,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (p[h] = y),
        (this.view = new DataView(e.buffer, n));
    }
  }
  function _define_property$_(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class TencBox extends BaseMp4Box {
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
      for (let p = 0; p < e.length; p++) n[p + d + 16] = e[p];
    }
    constructor(e, n, d) {
      super('tenc', e, n, d),
        _define_property$_(this, 'data', void 0),
        _define_property$_(this, 'start', void 0),
        _define_property$_(this, 'end', void 0),
        (this.data = e),
        (this.start = n),
        (this.end = d);
    }
  }
  function findBox(e, n, d = []) {
    for (let p = n; p < e.length; ) {
      if (0 === d.length) return;
      const n = new DataView(e.buffer, p).getUint32(0),
        h = encodedArrayToString(e.subarray(p + 4, p + 8)),
        y = p + n;
      if (1 === d.length && h === d[0]) return new BaseMp4Box(h, e, p, y);
      if (h === d[0]) return findBox(e, p + 8, d.slice(1));
      p += n;
    }
  }
  const rewriteDefaultKid = (e) => {
    const [n] = (function (e) {
      const n = findBox(e, 0, ['moov', 'trak', 'mdia', 'minf', 'stbl', 'stsd']),
        d = [];
      if (!n) return d;
      for (let p = n.start + 16; p < n.end; ) {
        let h = findBox(e, p, ['enca']),
          y = 36;
        if ((h || ((h = findBox(e, p, ['encv'])), (y = 86)), !h)) return d;
        const _ = findBox(e, h.start + y, ['sinf', 'schi', 'tenc']);
        _
          ? (d.push(new TencBox(_.data, _.start, _.end)), (p = _.end))
          : (p = n.end);
      }
      return d;
    })(e);
    if (!n) return;
    const d = (function (e) {
      const n = findBox(e, 0, ['moov']),
        d = [];
      if (!n) return d;
      const p = new DataView(e.buffer, 0);
      for (let h = n.start + 8; h < n.size; ) {
        const n = p.getUint32(h);
        'pssh' === encodedArrayToString(e.subarray(h + 4, h + 8)) &&
          d.push(new PsshBox(e, h, h + n)),
          (h += n);
      }
      return d;
    })(e).find((e) => e.isWidevine);
    d && (n.defaultKeyId = d.keyBytes);
  };
  function _define_property$Z(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function readSynchSafeUint32(e) {
    return (
      2097152 * (127 & e[0]) +
      16384 * (127 & e[1]) +
      128 * (127 & e[2]) +
      (127 & e[3])
    );
  }
  const Kn = { 0: 'iso-8859-1', 1: 'utf-16', 2: 'utf-16be', 3: 'utf-8' },
    Gn = { TPE1: !0, TIT2: !0, WXXX: !0, PRIV: !0, TALB: !0, CHAP: !0 };
  class ID3 {
    _parseID3Flags(e) {
      (this.unsynchronized = isBitAtPositionOn(e, 7)),
        (this.hasExtendedHeader = isBitAtPositionOn(e, 6)),
        (this.isExperimental = isBitAtPositionOn(e, 5)),
        (this.hasFooter = isBitAtPositionOn(e, 4));
    }
    _parseID3Frames(e, n, d, p) {
      const h = new DataView(n.buffer, 0, p),
        { minor: y } = this;
      for (; d + 8 <= p; ) {
        const _ = Ee(n.subarray(d, d + 4));
        d += 4;
        const m =
          4 === y ? readSynchSafeUint32(n.subarray(d, d + 4)) : h.getUint32(d);
        if (((d += 4), n[d++], n[d++], Gn[_])) {
          const h = d,
            y = this._extractID3FramePayload(n, _, m, h, p);
          if (y) {
            const n = this.decodeID3Frame(y);
            n && e.frames.push(n);
          }
          d += m;
        } else d += m;
      }
    }
    _extractID3FramePayload(e, n, d, p, h) {
      const y = p + d;
      let _;
      return y <= h && (_ = { type: n, size: d, data: e.slice(p, y) }), _;
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
        p = { key: 'CHAP', frames: [] };
      let [h, y] = readNullTerminatedString(n, 0, n.length);
      return (
        (p.id = h),
        y++,
        (p.startTime = d.getUint32(y)),
        (y += 4),
        (p.endTime = d.getUint32(y)),
        (y += 4),
        (y += 4),
        (y += 4),
        this._parseID3Frames(p, n, y, n.length),
        p
      );
    }
    decodeTextFrame(e) {
      const { data: n } = e,
        d = Kn[n[0]],
        p = encodedArrayToString(n.subarray(1), d);
      return { key: e.type, text: p };
    }
    decodeWxxxFrame(e) {
      const { data: n } = e,
        d = Kn[n[0]];
      let p = 1;
      const h = encodedArrayToString(n.subarray(p), d);
      p += h.length + 1;
      return {
        key: 'WXXX',
        description: h,
        text: encodedArrayToString(n.subarray(p)),
      };
    }
    decodePrivFrame(e) {
      const n = encodedArrayToString(e.data);
      if (!n) return;
      return { key: 'PRIV', info: n, data: e.data.slice(n.length + 1) };
    }
    constructor(e) {
      _define_property$Z(this, 'minor', void 0),
        _define_property$Z(this, 'revision', void 0),
        _define_property$Z(this, 'frameLength', void 0),
        _define_property$Z(this, 'endPos', void 0),
        _define_property$Z(this, 'frames', []),
        _define_property$Z(this, 'unsynchronized', !1),
        _define_property$Z(this, 'hasExtendedHeader', !1),
        _define_property$Z(this, 'hasFooter', !1),
        _define_property$Z(this, 'isExperimental', !1);
      let n = 0;
      const d = Ee(e.subarray(n, n + 3));
      if (((n += 3), 'ID3' !== d)) return;
      (this.minor = e[n++]), (this.revision = e[n++]);
      const p = e[n++];
      this._parseID3Flags(p);
      const h = readSynchSafeUint32(e.subarray(n, n + 4));
      (n += 4), (this.frameLength = h);
      const y = n + h;
      if (((this.endPos = y), this.hasExtendedHeader)) {
        n += readSynchSafeUint32(e.subarray(n, n + 4));
      }
      this.minor > 2 && this._parseID3Frames(this, e, n, y);
    }
  }
  var Vn;
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
        var n;
        return (
          (null === (n = e) || void 0 === n ? void 0 : n.length) >= 8 &&
          checkBoxName(e, 4, [102, 116, 121, 112])
        );
      })(e)
    )
      return d;
    for (let p = 0; p < n; p++) {
      if (checkBoxName(e, p, [109, 111, 111, 102])) return d;
      if (checkBoxName(e, p, [101, 109, 115, 103])) {
        const n = p - 4,
          h = new DataView(e.buffer, n).getUint32(0),
          y = e.subarray(n, n + h);
        (p = p + h - 1), d.push(y);
      }
    }
    return d;
  }
  function _define_property$Y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e) {
    (e[(e.THREE = 51)] = 'THREE'),
      (e[(e.C_A = 65)] = 'C_A'),
      (e[(e.C_C = 67)] = 'C_C'),
      (e[(e.C_D = 68)] = 'C_D'),
      (e[(e.C_H = 72)] = 'C_H'),
      (e[(e.C_I = 73)] = 'C_I'),
      (e[(e.C_P = 80)] = 'C_P'),
      (e[(e.A = 97)] = 'A'),
      (e[(e.C = 99)] = 'C'),
      (e[(e.D = 100)] = 'D'),
      (e[(e.E = 101)] = 'E'),
      (e[(e.F = 102)] = 'F'),
      (e[(e.G = 103)] = 'G'),
      (e[(e.H = 104)] = 'H'),
      (e[(e.I = 105)] = 'I'),
      (e[(e.K = 107)] = 'K'),
      (e[(e.M = 109)] = 'M'),
      (e[(e.O = 111)] = 'O'),
      (e[(e.P = 112)] = 'P'),
      (e[(e.S = 115)] = 'S'),
      (e[(e.T = 116)] = 'T'),
      (e[(e.V = 118)] = 'V'),
      (e[(e.Y = 121)] = 'Y');
  })(Vn || (Vn = {}));
  const Hn = { TALB: 'album', TIT2: 'title', TPE1: 'performer' },
    qn = ['performer', 'title', 'album'];
  class TimedMetadata {
    resolveAdamIdFromStorefront(e) {
      const n = this.storefrontToIds[e];
      this._adamId = n;
    }
    get adamId() {
      return this._adamId;
    }
    equals(e) {
      if (!qn.every((n) => this[n] === e[n])) return !1;
      const { links: n } = this,
        d = e.links;
      if (n.length !== d.length) return !1;
      for (let p = 0; p < n.length; p++) {
        const e = n[p].description === d[p].description,
          h = n[p].url === d[p].url;
        if (!e || !h) return !1;
      }
      return !0;
    }
    constructor(e) {
      _define_property$Y(this, 'performer', void 0),
        _define_property$Y(this, 'title', void 0),
        _define_property$Y(this, 'album', void 0),
        _define_property$Y(this, 'links', []),
        _define_property$Y(this, 'storefrontToIds', {}),
        _define_property$Y(this, '_adamId', void 0),
        e.forEach((e) => {
          const { key: n } = e,
            d = Hn[n];
          var p;
          if (d)
            this[d] =
              null === (p = e.text) || void 0 === p
                ? void 0
                : p.replace(/\0/g, '');
          else if ('WXXX' === e.key) {
            if (e.description) {
              const [n, d] = e.description.split('\0');
              this.links.push({ description: n, url: d });
            }
          } else if ('PRIV' === e.key) {
            var h;
            const n =
              null === (h = e.info) || void 0 === h ? void 0 : h.split('\0');
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
  }
  function _define_property$X(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class Emsg {
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
    constructor(e) {
      _define_property$X(this, 'data', void 0),
        _define_property$X(this, 'schemeIdUri', void 0),
        _define_property$X(this, 'eventDuration', void 0),
        _define_property$X(this, 'presentationTime', void 0),
        _define_property$X(this, 'payload', void 0),
        _define_property$X(this, 'timeScale', void 0),
        _define_property$X(this, 'id3', void 0),
        _define_property$X(this, 'id', void 0),
        _define_property$X(this, '_timedMetadata', void 0),
        (this.data = e);
      const n = new DataView(e.buffer);
      let d = 8;
      if (1 !== e[d]) return;
      (d += 4), (this.timeScale = n.getUint32(d)), (d += 4);
      const p = n.getUint32(d);
      d += 4;
      const h = n.getUint32(d);
      if (
        ((d += 4),
        (this.presentationTime = Math.pow(2, 32) * p + h),
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
      const [y, _] = readNullTerminatedString(e, d);
      (d += _ + 1), (this.schemeIdUri = y);
      const [m, g] = readNullTerminatedString(e, d);
      (d += g + 1),
        (this.payload = e.subarray(d, e.byteLength)),
        (this.id3 = new ID3(this.payload));
    }
  }
  function _define_property$W(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class TimedMetadataManager {
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
        p = [],
        h = Object.keys(n);
      for (let m = 0; m < h.length; m++) {
        const e = parseInt(h[m], 10);
        if (!(e < d)) break;
        p.push(e);
      }
      const y = p.pop();
      if (y) {
        var _;
        const e = n[y];
        if (!e) return;
        const { _currentEmsg: d, _onDidChange: p } = this,
          h = null === (_ = d) || void 0 === _ ? void 0 : _.payload,
          m = e.payload;
        (h && arrayEquals(h, m)) || ((this._currentEmsg = e), p(e)),
          this._cleanupEmsgs(y);
      }
    }
    _cleanupEmsgs(e) {
      const { _emsgLookup: n } = this;
      Object.keys(n).forEach((d) => {
        parseInt(d, 10) < e && delete n[d];
      });
    }
    constructor(e, n) {
      _define_property$W(this, '_currentTime', void 0),
        _define_property$W(this, '_onDidChange', void 0),
        _define_property$W(this, '_currentEmsgInterval', void 0),
        _define_property$W(this, '_emsgLookup', void 0),
        _define_property$W(this, '_currentEmsg', void 0),
        (this._currentTime = e),
        (this._onDidChange = n),
        (this._emsgLookup = {}),
        (this._getCurrentEmsg = this._getCurrentEmsg.bind(this));
    }
  }
  function _define_property$V(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class SegmentProcessor {
    process(e, n) {
      const { _item: d } = this;
      try {
        d.isLiveRadioStation
          ? this._processLiveRadioSegment(n)
          : d.hasOffersHlsUrl && this._processHlsOffersSegment(e, n);
      } catch (Ut) {
        je.error('Error processing segment', Ut);
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
    constructor(e, n, d) {
      _define_property$V(this, '_item', void 0),
        _define_property$V(this, '_timedMetadataManager', void 0),
        (this._item = e),
        (this._timedMetadataManager = new TimedMetadataManager(
          () => n.currentTime,
          (e) => {
            d.publish(jn, e.timedMetadata);
          },
        ));
    }
  }
  function asyncGeneratorStep$H(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$H(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$H(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$H(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$U(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$k(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$k(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const Wn = je.createChild('mse'),
    Yn = BooleanDevFlag.get('mk-mse-buffer'),
    { manifestParsed: zn } = Je;
  class MseBuffer {
    onSourceOpen() {
      Wn.debug('mediaSource open handler');
      const { mediaSource: e } = this;
      if (e.activeSourceBuffers.length > 0)
        return void Wn.debug('not adding new source buffer');
      Wn.debug('adding new source buffer');
      const n = e.addSourceBuffer(Qe);
      (this.sourceBuffer = n),
        n.addEventListener('updateend', this.updateEndHandler);
      const { clip: d, hasAppendWindowSupport: p } = this;
      d &&
        (p
          ? (Wn.debug('appendWindowStart/End', d.start, d.end),
            (n.appendWindowStart = d.start),
            (n.appendWindowEnd = d.end))
          : (Wn.debug('seeking for clip', d.start),
            asAsync(this.seek(d.start)))),
        this.updateSegmentToFetch(0, !0);
    }
    setNextManifest(e) {
      Wn.debug('setting next manifest for ', e.mediaItem.title),
        this.nextSeamlessTransition
          ? (Wn.debug(
              'abandoning transition scheduled for ' +
                this.nextSeamlessTransition,
            ),
            this.revertSeamlessTransition(!0),
            (this.playbackTimeline.next = { manifest: e }))
          : ((this.playbackTimeline.next = { manifest: e }),
            this.isFullyBuffered &&
              (Wn.debug(
                'current song is fully buffered, beginning transition to next',
              ),
              this.transitionToNextManifest()));
    }
    isItemPlaying(e) {
      var n, d;
      const { playbackTimeline: p } = this,
        h = this.nextSeamlessTransition
          ? null === (n = p.previous) || void 0 === n
            ? void 0
            : n.manifest.mediaItem
          : null === (d = p.current) || void 0 === d
            ? void 0
            : d.manifest.mediaItem;
      return (
        !!h &&
        (Wn.debug(`isItemPlaying ${e.title}, ${h.title}, ${e.id === h.id}`),
        e.id === h.id)
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
        Wn.debug('created url', e),
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
      if (((e += this.currentTimestampOffset), this._currentTime === e)) return;
      const { nextSeamlessTransition: n } = this;
      if (n && e >= n) {
        var d, p;
        Wn.debug('setting offset to', n),
          (this.currentTimestampOffset = n || 0),
          (this.nextSeamlessTransition = void 0),
          (this.duration = this.manifest.mediaItem.playbackDuration / 1e3),
          Wn.debug('buffer setting duration to', this.duration);
        const e = {
          previous:
            null === (p = this.playbackTimeline.previous) ||
            void 0 === p ||
            null === (d = p.manifest) ||
            void 0 === d
              ? void 0
              : d.mediaItem,
          current: this.manifest.mediaItem,
        };
        Wn.debug('dispatching seamless audio transition', e),
          this.dispatcher.publish(Nn, e);
      }
      this._currentTime = e;
      const { isOverBufferLimit: h, timeToTrim: y } = this,
        _ = e > this.timeToTrim;
      h &&
        _ &&
        (Wn.debug('buffer over limit, trimming to ', y),
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
      var n = this;
      return _async_to_generator$H(function* () {
        const { duration: d, seekWhenUpdated: p, sourceBuffer: h } = n;
        if (
          (n.resolveSeekPromise(!1),
          Wn.debug('seek to ', e),
          (e = +e) > d &&
            (Wn.debug('rounding seek time to duration', e, d), (e = d)),
          !h)
        )
          return !1;
        if ((n.revertSeamlessTransition(), h.updating))
          return (
            Wn.debug('sourcebuffer updating, deferring seek'),
            new Promise((d) => {
              p && p.resolve(!1),
                (n.seekWhenUpdated = { seek: n.seek.bind(n, e), resolve: d });
            })
          );
        (n.currentlyLoadingSegmentIndex = void 0),
          n.updateSegmentToFetch(0, !0),
          n.removeToTime(e),
          (n.timeToTrim = 10 * Math.floor(e / 10));
        const y = n.getSegmentForTime(e);
        0 !== y && (yield n.firstSegmentLoadPromise),
          Wn.debug('seeking to', e, 'segment', y),
          n.updateSegmentToFetch(y, !0);
        const _ = new Promise((d) => {
          n.seekResolver = { time: e, resolve: d };
        });
        return n.checkSeekBuffered(), _;
      })();
    }
    clearNextManifest() {
      this.revertSeamlessTransition(!0), (this.playbackTimeline.next = void 0);
    }
    revertSeamlessTransition(e = !1) {
      const { playbackTimeline: n, nextSeamlessTransition: d } = this;
      if (!d || !n.previous)
        return void Wn.debug('no need to revert, no transition');
      (this.isAtEndOfStream = e),
        Wn.debug('reverting seamless transition with discardNextManifest', e),
        e ? this.clearBufferToEnd(d) : this.clearBuffer(),
        Wn.debug('abandoning transition to ' + this.manifest.mediaItem.title),
        (n.next = e ? void 0 : n.current),
        (n.current = n.previous),
        (n.previous = void 0);
      const p = this.manifest.mediaItem;
      Wn.debug('current item reverted to ' + p.title),
        (this.nextSeamlessTransition = void 0),
        (this.duration = p.playbackDuration / 1e3),
        Wn.debug('reverted duration to ' + this.duration),
        e ||
          ((this.currentTimestampOffset = 0),
          (this.timestampOffsetAdjustment = 0),
          Wn.debug(
            'reverted currentTimestampOffset and timestampOffsetAdjustment to 0',
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
      Wn.debug('removing sourceBuffer and mediaSource');
      const { sourceBuffer: n, mediaSource: d } = this;
      null === (e = this.seekResolver) || void 0 === e || e.resolve(!1),
        this.manifest.removeEventListener(zn, this.onManifestParsed);
      const p = this._playableUrl;
      p && (Wn.debug('revoking url', p), window.URL.revokeObjectURL(p)),
        d.removeEventListener('sourceopen', this.onSourceOpen),
        n &&
          (n.removeEventListener('updateend', this.updateEndHandler),
          (this.sourceBuffer = void 0));
    }
    onManifestParsed() {
      const e = this.segmentIndexToFetch + 1;
      Wn.debug('manifestParsed, loading segment', e),
        this.updateSegmentToFetch(e, !0);
    }
    updateEndHandler() {
      if ((this.kickstartBuffer(), this.clearDeferredRemove())) return;
      if (
        (Wn.debug('update end', this.seekWhenUpdated), this.seekWhenUpdated)
      ) {
        Wn.debug('updateEndHandler resolving seekWhenUpdated');
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
          const p = d.end(d.length - 1);
          return (
            Wn.debug('clipping sourcebuffer to', e.end, p),
            void n.remove(e.end, p)
          );
        }
      }
      if (this.isAtEndOfStream)
        return (
          Wn.debug('buffer is at end of stream'),
          this.streamHasEnding &&
            (Wn.debug('isAtEndOfStream, not fetching any more segments'),
            this.playbackTimeline.next || this.setEndOfStream(),
            this.transitionToNextManifest()),
          void (this.isAtEndOfStream = !1)
        );
      Wn.debug('updateEndHandler invoking loadSegment'),
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
      Wn.debug('beginning transition to next manifest');
      const { playbackTimeline: n, sourceBuffer: d } = this;
      if (!n.next || !d) return void Wn.debug('no next manifest');
      const p = this.endOfBufferTime || this.currentTimestampOffset;
      Wn.debug('setting seamless transition at', p),
        (this.nextSeamlessTransition = p),
        (this.timestampOffsetAdjustment = p),
        (this.playbackTimeline.current.endTime = p),
        (n.previous = n.current),
        Wn.debug(
          'previous manifest set to',
          null === (e = n.previous) || void 0 === e
            ? void 0
            : e.manifest.mediaItem.title,
        ),
        (n.current = n.next),
        Wn.debug('current manifest set to', n.current.manifest.mediaItem.title),
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
          (Wn.debug('updateSegmentToFetch invoking loadSegment'),
          asAsync(this.loadSegment())));
    }
    loadSegment() {
      var e = this;
      return _async_to_generator$H(function* () {
        const n = e.segmentIndexToFetch,
          d = e.segments[n];
        if (n !== e.currentlyLoadingSegmentIndex) {
          if (d)
            try {
              Wn.debug('begin loadSegment ' + n),
                (e.currentlyLoadingSegmentIndex = n);
              const h = d.load();
              0 === n && (e.firstSegmentLoadPromise = h);
              const y = yield h;
              if (0 !== n && n !== e.segmentIndexToFetch)
                return void Wn.debug(
                  'load segment index to fetch changed, not processing bytes for segment',
                  n,
                );
              e.segmentProcessor.process(d, y),
                Wn.debug('loadSegment processed: ' + n);
              const { sourceBuffer: _, timestampOffsetAdjustment: m } = e;
              if (!_) return;
              try {
                'number' == typeof m &&
                  (Wn.debug('adjusting timestampOffset of sourcebuffer to', m),
                  (_.timestampOffset = m),
                  (e.timestampOffsetAdjustment = void 0)),
                  _.appendBuffer(y),
                  (e.isFullyBuffered = !1),
                  (e.isOverBufferLimit = !1),
                  Wn.debug('appended to buffer', y.length),
                  e.printBufferTimes(),
                  n === e.segments.length - 1
                    ? (e.isAtEndOfStream = !0)
                    : n === e.segmentIndexToFetch &&
                      (Wn.debug(
                        'loadSegment bumping segment index to fetch to ',
                        n + 1,
                      ),
                      e.updateSegmentToFetch(n + 1));
              } catch (p) {
                'QuotaExceededError' === p.name
                  ? ((e.isOverBufferLimit = !0),
                    Wn.debug('reached buffer limit'))
                  : Wn.warn('Error appending to source buffer', p);
              }
            } catch (Ut) {
              Wn.error('Error loading segment', Ut),
                e.dispatcher.publish(Un, Ut);
            } finally {
              e.currentlyLoadingSegmentIndex = void 0;
            }
        } else
          Wn.debug(`segment ${n} is currently loading, not loading it again`);
      })();
    }
    setEndOfStream() {
      const { sourceBuffer: e, mediaSource: n } = this;
      e &&
        'ended' !== n.readyState &&
        (e.updating || 'open' !== n.readyState
          ? Wn.error(
              'Could not end of stream (updating, readyState)',
              e.updating,
              n.readyState,
            )
          : (Wn.debug('mediaSource.endOfStream'),
            n.endOfStream(),
            (this.isFullyBuffered = !0)));
    }
    removeToTime(e) {
      Wn.debug('removing to time', e),
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
        (null === (n = this.playbackTimeline) ||
        void 0 === n ||
        null === (e = n.previous) ||
        void 0 === e
          ? void 0
          : e.endTime) || 0
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
        p = d + n,
        h = this.isTimeBuffered(p);
      Wn.debug('resolving seek for time, adjustedTime, isBuffered', d, p, h),
        this.printBufferTimes(),
        h &&
          (Wn.debug('resolving seek to true for time:', p),
          (this.element.currentTime = p),
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
      for (let p = 0; p < d.length; p++)
        if (
          (Wn.debug('isTimeBuffered', d.start(p), e, d.end(p)),
          e >= d.start(p) && e <= d.end(p))
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
      for (let p = 0; p < n.length; p++)
        d.push(`start ${n.start(p)} end: ${n.end(p)}`);
      return d.join(',');
    }
    printBufferTimes() {
      Yn && Wn.debug('buffer times', this.bufferTimesString);
    }
    getSegmentForTime(e) {
      return Math.floor(e / 10) + 1;
    }
    kickstartBuffer() {
      const { hasKickstarted: e, element: n, clip: d } = this,
        { buffered: p } = n;
      e ||
        (this.manifest.mediaItem.isSong
          ? d &&
            this.isTimeBuffered(d.start) &&
            ((n.currentTime = d.start), (this.hasKickstarted = !0))
          : p.length &&
            ((n.currentTime = p.start(0)), (this.hasKickstarted = !0)));
    }
    printInfo() {
      var e, n;
      const { playbackTimeline: d } = this;
      Wn.info('---- Buffer Info ----'),
        Wn.info('currently buffering item', d.current.manifest.mediaItem.title),
        Wn.info(
          'next item to buffer',
          null === (e = d.next) || void 0 === e
            ? void 0
            : e.manifest.mediaItem.title,
        ),
        Wn.info(
          'previously buffered item',
          null === (n = d.previous) || void 0 === n
            ? void 0
            : n.manifest.mediaItem.title,
        ),
        Wn.info('currentTimestampOffset', this.currentTimestampOffset),
        Wn.info('currentTime', this.currentTime),
        Wn.info('duration', this.duration),
        Wn.info('nextSeamlessTransition', this.nextSeamlessTransition),
        Wn.info('timestampOffsetAdjustment', this.timestampOffsetAdjustment),
        Wn.info('buffered times', this.bufferTimesString),
        Wn.info('isAtEndOfStream', this.isAtEndOfStream),
        Wn.info('isFullyBuffered', this.isFullyBuffered),
        Wn.info('segmentIndexToFetch', this.segmentIndexToFetch),
        Wn.info('segments.length', this.segments.length),
        Wn.info('---- End Buffer Info ----');
    }
    constructor({
      dispatcher: e,
      element: n,
      manifest: d,
      currentTime: p,
      duration: h,
      clip: y,
    }) {
      _define_property$U(this, 'dispatcher', void 0),
        _define_property$U(this, 'mediaSource', void 0),
        _define_property$U(this, 'sourceBuffer', void 0),
        _define_property$U(this, 'element', void 0),
        _define_property$U(this, '_currentTime', void 0),
        _define_property$U(this, 'currentlyLoadingSegmentIndex', void 0),
        _define_property$U(this, 'duration', void 0),
        _define_property$U(this, 'firstSegmentLoadPromise', Promise.resolve()),
        _define_property$U(this, 'hasKickstarted', !1),
        _define_property$U(this, 'isOverBufferLimit', void 0),
        _define_property$U(this, 'seekResolver', void 0),
        _define_property$U(this, 'seekWhenUpdated', void 0),
        _define_property$U(this, 'segmentIndexToFetch', -1),
        _define_property$U(this, 'segmentProcessor', void 0),
        _define_property$U(this, 'timeToTrim', 10),
        _define_property$U(this, 'isAtEndOfStream', !1),
        _define_property$U(this, 'isFullyBuffered', !1),
        _define_property$U(this, '_playableUrl', void 0),
        _define_property$U(this, 'clip', void 0),
        _define_property$U(this, 'deferredRemoves', []),
        _define_property$U(this, 'timestampOffsetAdjustment', void 0),
        _define_property$U(this, 'playbackTimeline', void 0),
        _define_property$U(this, 'currentTimestampOffset', 0),
        _define_property$U(this, 'nextSeamlessTransition', void 0),
        (this.dispatcher = e),
        (this.clip = y),
        (this.element = n),
        (this.mediaSource = new MediaSource()),
        this.mediaSource.addEventListener('sourceopen', this.onSourceOpen),
        (this.segmentProcessor = new SegmentProcessor(d.mediaItem, n, e)),
        (this.playbackTimeline = { current: { manifest: d } }),
        d.addEventListener(zn, this.onManifestParsed),
        (this._currentTime = p || 0),
        (this.duration = h),
        (window.mseBuffer = this);
    }
  }
  function asyncGeneratorStep$G(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$G(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$G(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$G(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$T(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$j(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$j(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$k(
    [
      Bind(),
      _ts_metadata$k('design:type', Function),
      _ts_metadata$k('design:paramtypes', []),
    ],
    MseBuffer.prototype,
    'onSourceOpen',
    null,
  ),
    _ts_decorate$k(
      [
        Bind(),
        _ts_metadata$k('design:type', Function),
        _ts_metadata$k('design:paramtypes', []),
      ],
      MseBuffer.prototype,
      'onManifestParsed',
      null,
    ),
    _ts_decorate$k(
      [
        Bind(),
        _ts_metadata$k('design:type', Function),
        _ts_metadata$k('design:paramtypes', []),
      ],
      MseBuffer.prototype,
      'updateEndHandler',
      null,
    );
  const { mediaPlaybackError: Qn } = vt;
  class AudioPlayer extends BasePlayer {
    destroy() {
      var e = this,
        _superprop_get_destroy = () => super.destroy;
      return _async_to_generator$G(function* () {
        _superprop_get_destroy().call(e),
          e._dispatcher.unsubscribe(Un, e.onLoadSegmentError);
      })();
    }
    onLoadSegmentError(e) {
      this._dispatcher.publish(
        Qn,
        new MKError(MKError.Reason.MEDIA_SESSION, e),
      ),
        this.destroy();
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
    get supportsPreviewImages() {
      return !1;
    }
    get _targetElement() {
      return this.audio;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$G(function* () {
        (e.extension = new MediaExtension(e.audio, Qe)),
          yield e.extension.initializeKeySystem(),
          e.extension.addEventListener(Je.playbackLicenseError, (n) => {
            e.resetDeferredPlay(), e._dispatcher.publish(Qn, n);
          }),
          e.extension.addEventListener(Je.playbackSessionError, (n) => {
            e._dispatcher.publish(
              Qn,
              new MKError(MKError.Reason.MEDIA_SESSION, n),
            ),
              e.destroy();
          });
      })();
    }
    initializeMediaElement() {
      var e = this;
      return _async_to_generator$G(function* () {
        const n = nextAvailableAudioElement();
        (n.autoplay = !1),
          (n.id = 'apple-music-player'),
          (n.controls = !1),
          (n.muted = !1),
          (n.playbackRate = 1),
          (n.preload = 'metadata'),
          (n.volume = 1),
          (e.audio = n),
          document.body.appendChild(n),
          je.debug('initializedMediaElement', n);
      })();
    }
    removeEventHandlers() {
      this._targetElement.removeEventListener('timeupdate', this.onTimeUpdate),
        this._targetElement.removeEventListener(
          'timeupdate',
          this.delayedCdmUpdateCheck,
        ),
        super.removeEventHandlers();
    }
    isPlayerSupported() {
      return !0;
    }
    _stopMediaElement() {
      var e = this,
        _superprop_get__stopMediaElement = () => super._stopMediaElement;
      return _async_to_generator$G(function* () {
        var n;
        yield _superprop_get__stopMediaElement().call(e),
          yield e.tearDownManifests(),
          null === (n = e._buffer) || void 0 === n || n.stop(),
          (e._buffer = void 0);
      })();
    }
    setNextSeamlessItem(e) {
      var n = this;
      return _async_to_generator$G(function* () {
        var d;
        const { extension: p, nextManifest: h } = n,
          y = n._buffer;
        if (!y || !p) return;
        if (
          (null === (d = h) || void 0 === d ? void 0 : d.mediaItem.id) === e.id
        )
          return void je.debug('already have next manifest for ', e.title);
        n._targetElement.removeEventListener('timeupdate', n.onTimeUpdate),
          n._targetElement.addEventListener('timeupdate', n.onTimeUpdate),
          je.debug('player preparing next manifest for', e.title);
        const _ = yield n.loadAndParseManifest(e, !1);
        y.setNextManifest(_),
          p.setMediaItem(e),
          (p.extURI = _.extURI),
          (n.nextManifest = _);
      })();
    }
    playItemFromEncryptedSource(n, d = !1, p) {
      var h = this;
      return _async_to_generator$G(function* () {
        const y = h._paused && !d;
        je.debug('playItemFromEncryptedSource', n.title);
        const _ = y ? void 0 : h.startPlaybackSequence();
        if (n.playRawAssetURL)
          return (
            (n.playbackType = e.PlaybackType.unencryptedFull),
            (h.nowPlayingItem = n),
            yield h._playAssetURL(n.assetURL, y),
            h.finishPlaybackSequence()
          );
        const { extension: m } = h;
        var g, b;
        h.delaySeamlessCdmUpdates &&
          (null === (b = h.extension) ||
            void 0 === b ||
            null === (g = b.session) ||
            void 0 === g ||
            g.applyDelayedCdmUpdates());
        if (!m) return _;
        (m.initiated = d),
          m.setMediaItem(n),
          (n.playbackType = e.PlaybackType.encryptedFull),
          (h.nowPlayingItem = n),
          (n.state = F.loading);
        const S = yield h.getManifestForItem(n);
        h.manifest = S;
        const P = shouldForceAudioMse();
        if (
          ((n.isSong || (m.isFairplay && P)) && (m.extURI = S.extURI),
          (n.state = F.ready),
          m.isFairplay && !P)
        ) {
          var E;
          let e = n.assetURL;
          (null === (E = p) || void 0 === E ? void 0 : E.startTime) &&
            (e += '#t=' + p.startTime),
            yield h._playAssetURL(e, y);
        } else {
          const e = h._buffer;
          e &&
          h.isSeamlessAudioTransitionsEnabled &&
          e.isItemPlaying(S.mediaItem)
            ? je.debug('already have buffer, continuing playback')
            : yield h.beginNewBufferForItem(y, S, p);
        }
        return h.finishPlaybackSequence();
      })();
    }
    getManifestForItem(e) {
      var n = this;
      return _async_to_generator$G(function* () {
        var d, p;
        je.debug('reconciling item to play against playing item');
        const {
            nextManifest: h,
            manifest: y,
            isSeamlessAudioTransitionsEnabled: _,
          } = n,
          m = n._buffer;
        if (!m || !y)
          return (
            je.debug(
              'no buffer or manifest, creating manifest [title, buffer, manifest]',
              e.title,
              !!m,
              !!y,
            ),
            n.loadAndParseManifest(e)
          );
        if (!_)
          return (
            je.debug(
              'seamless transitions disabled, stopping and creating manifest for',
              e.title,
            ),
            yield n.tearDownManifests(),
            n.loadAndParseManifest(e)
          );
        const g = !m.isItemPlaying(e);
        let b;
        if ((je.debug('itemMismatch', g), h && !g))
          je.debug(
            `replacing manifest for ${y.mediaItem.title} with next manifest ${h.mediaItem.title}`,
          ),
            (b = h),
            (n.nextManifest = void 0),
            je.debug(
              'cease listening for keys on manifest for',
              y.mediaItem.title,
            ),
            yield n.tearDownManifest(y);
        else if (g) {
          var S;
          (null === (S = h) || void 0 === S ? void 0 : S.mediaItem.id) !== e.id
            ? (je.debug(
                `item to play ${e.title} does not match playing or next items, tearing down all manifests`,
              ),
              yield n.tearDownManifests(),
              (b = yield n.loadAndParseManifest(e)))
            : (je.debug(
                `item to play ${e.title} matches next item, tearing down current manifest`,
              ),
              yield n.tearDownManifest(y),
              (b = h));
        } else
          je.debug('item is already playing, returning existing manifest'),
            (b = y);
        return (
          je.debug('getManifestForItem loading keys for', y.mediaItem.title),
          null === (p = n.extension) ||
            void 0 === p ||
            null === (d = p.session) ||
            void 0 === d ||
            d.loadKeys(b.keyValues, b.mediaItem),
          b
        );
      })();
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$G(function* () {
        const d = n._buffer;
        if (d) {
          je.debug('audio-player: buffer seek to', e);
          if (!(yield d.seek(e))) return;
          n.isSeamlessAudioTransitionsEnabled && n.onTimeUpdate();
        } else
          je.debug('audio-player: media element seek to', e),
            (n._targetElement.currentTime = e);
      })();
    }
    tearDownManifests() {
      var e = this;
      return _async_to_generator$G(function* () {
        (e.manifest = yield e.tearDownManifest(e.manifest)),
          (e.nextManifest = yield e.tearDownManifest(e.nextManifest));
      })();
    }
    tearDownManifest(e) {
      var n = this;
      return _async_to_generator$G(function* () {
        const { extension: d } = n;
        e &&
          (je.debug('tearing down manifest for', e.mediaItem.title),
          e.stop(),
          d && (yield d.clearSessions(e.keyValues)),
          e.removeEventListener(Mn.keysParsed, n.loadKeysHandler));
      })();
    }
    loadAndParseManifest(e, n = !0) {
      var d = this;
      return _async_to_generator$G(function* () {
        let p;
        je.debug(`will load and parse manifest for ${e.title}, loadKeys ${n}`);
        try {
          return (
            (p = yield Manifest.load(e, !1)),
            n && p.addEventListener(Mn.keysParsed, d.loadKeysHandler),
            p.parse(),
            p
          );
        } catch (Q) {
          d.resetDeferredPlay();
          const n = new MKError(
            MKError.Reason.NETWORK_ERROR,
            'Could not fetch manifest',
          );
          throw ((n.data = Q), d._dispatcher.publish(Qn, n), n);
        }
      })();
    }
    onTimeUpdate() {
      if (!this._buffer) return;
      const {
        currentPlaybackTimeRemaining: e,
        nextManifest: n,
        delaySeamlessCdmUpdates: d,
      } = this;
      if (n && e < 15) {
        var p, h, y, _;
        if ((je.debug('player loading keys for', n.mediaItem.title, d), d))
          null === (h = this.extension) ||
            void 0 === h ||
            null === (p = h.session) ||
            void 0 === p ||
            p.loadKeys(n.keyValues, n.mediaItem, { delayCdmUpdate: !0 }),
            this._targetElement.addEventListener(
              'timeupdate',
              this.delayedCdmUpdateCheck,
            );
        else
          null === (_ = this.extension) ||
            void 0 === _ ||
            null === (y = _.session) ||
            void 0 === y ||
            y.loadKeys(n.keyValues, n.mediaItem);
        this._targetElement.removeEventListener(
          'timeupdate',
          this.onTimeUpdate,
        );
      }
    }
    delayedCdmUpdateCheck() {
      var e;
      const n =
          null === (e = this.nowPlayingItem) || void 0 === e
            ? void 0
            : e.playbackDuration,
        d = n ? n / 1e3 : this.currentPlaybackDuration,
        p = this._currentTime,
        h = Number((d - p).toFixed(3));
      if (h < 1) {
        const e = 1e3 * h;
        je.debug('delayed CDM update in ', e),
          setTimeout(() => {
            var e, n;
            je.debug('applying delayed CDM update'),
              null === (n = this.extension) ||
                void 0 === n ||
                null === (e = n.session) ||
                void 0 === e ||
                e.applyDelayedCdmUpdates();
          }, e),
          this._targetElement.removeEventListener(
            'timeupdate',
            this.delayedCdmUpdateCheck,
          );
      }
    }
    loadKeysHandler(e) {
      var n, d;
      null === (d = this.extension) ||
        void 0 === d ||
        null === (n = d.session) ||
        void 0 === n ||
        n.loadKeys(e.keys, e.item);
    }
    beginNewBufferForItem(e, n, d) {
      var p = this;
      return _async_to_generator$G(function* () {
        if (
          (je.debug('creating new MseBuffer for item', n.mediaItem.title, e),
          p._buffer && (je.debug('stopping old buffer'), p._buffer.stop()),
          (p._buffer = new MseBuffer({
            dispatcher: p._dispatcher,
            element: p._targetElement,
            duration: n.mediaItem.playbackDuration / 1e3,
            manifest: n,
          })),
          yield p._playAssetURL(p._buffer.playableUrl, !0),
          !e)
        ) {
          var h;
          let e = Promise.resolve();
          return (
            (null === (h = d) || void 0 === h ? void 0 : h.startTime) &&
              (e = p.seekToTime(d.startTime)),
            e.then(() => p._playMedia())
          );
        }
      })();
    }
    setPresentationMode(e) {
      return _async_to_generator$G(function* () {
        return Promise.resolve();
      })();
    }
    loadPreviewImage(e) {
      return _async_to_generator$G(function* () {})();
    }
    constructor(e) {
      var n, d;
      super(e),
        _define_property$T(this, 'currentAudioTrack', void 0),
        _define_property$T(this, 'currentTextTrack', void 0),
        _define_property$T(this, 'textTracks', []),
        _define_property$T(this, 'audioTracks', []),
        _define_property$T(this, 'audio', void 0),
        _define_property$T(this, 'isSeamlessAudioTransitionsEnabled', !1),
        _define_property$T(this, 'delaySeamlessCdmUpdates', !1),
        _define_property$T(this, 'extension', void 0),
        _define_property$T(this, 'mediaPlayerType', 'audio'),
        _define_property$T(this, 'manifest', void 0),
        _define_property$T(this, 'nextManifest', void 0);
      const p =
        null !==
          (d = null === (n = e.bag) || void 0 === n ? void 0 : n.features) &&
        void 0 !== d
          ? d
          : {};
      (this.isSeamlessAudioTransitionsEnabled =
        !!p['seamless-audio-transitions']),
        (this.delaySeamlessCdmUpdates = !!p['delay-seamless-cdm-updates']),
        (window.audioPlayer = this),
        this._dispatcher.subscribe(Un, this.onLoadSegmentError);
    }
  }
  function asyncGeneratorStep$F(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$F(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$F(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$F(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$S(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$j(
    [
      Bind(),
      _ts_metadata$j('design:type', Function),
      _ts_metadata$j('design:paramtypes', [void 0]),
    ],
    AudioPlayer.prototype,
    'onLoadSegmentError',
    null,
  ),
    _ts_decorate$j(
      [
        AsyncDebounce(250),
        _ts_metadata$j('design:type', Function),
        _ts_metadata$j('design:paramtypes', [Number]),
      ],
      AudioPlayer.prototype,
      'seekToTime',
      null,
    ),
    _ts_decorate$j(
      [
        Bind(),
        _ts_metadata$j('design:type', Function),
        _ts_metadata$j('design:paramtypes', []),
      ],
      AudioPlayer.prototype,
      'onTimeUpdate',
      null,
    ),
    _ts_decorate$j(
      [
        Bind(),
        _ts_metadata$j('design:type', Function),
        _ts_metadata$j('design:paramtypes', []),
      ],
      AudioPlayer.prototype,
      'delayedCdmUpdateCheck',
      null,
    ),
    _ts_decorate$j(
      [
        Bind(),
        _ts_metadata$j('design:type', Function),
        _ts_metadata$j('design:paramtypes', [void 0]),
      ],
      AudioPlayer.prototype,
      'loadKeysHandler',
      null,
    );
  class EncryptedSession extends KeySession {
    attachMedia(e, n) {
      var d = this;
      return _async_to_generator$F(function* () {
        (d.keySystem = n.keySystem),
          (d._keySystemAccess = n),
          e.addEventListener('encrypted', d.boundHandleSessionCreation, !1);
      })();
    }
    detachMedia(e) {
      e.removeEventListener('encrypted', this.boundHandleSessionCreation);
    }
    createSession(e) {
      var n = this;
      return _async_to_generator$F(function* () {
        je.debug('Encrypted createSession', e);
        const d = n._keySystemAccess;
        if (!d) return;
        const { initData: p, initDataType: h, target: y } = e;
        return (
          n._mediaKeysPromise ||
            (n._mediaKeysPromise = new Promise(
              (function () {
                var e = _async_to_generator$F(function* (e, p) {
                  const h = yield d.createMediaKeys();
                  try {
                    yield y.setMediaKeys(h);
                  } catch (Q) {
                    n.dispatchKeyError(Q), p(Q);
                  }
                  const _ = yield n.loadCertificateBuffer();
                  yield h.setServerCertificate(_),
                    (n._mediaKeysServerCertificate = _),
                    e(h);
                });
                return function (n, d) {
                  return e.apply(this, arguments);
                };
              })(),
            )),
          yield n._mediaKeysPromise,
          n._mediaKeysServerCertificate ? n._createSession(y, p, h) : void 0
        );
      })();
    }
    generatePSSH(e) {
      const n = new Uint8Array([
          0, 0, 0, 52, 112, 115, 115, 104, 0, 0, 0, 0, 237, 239, 139, 169, 121,
          214, 74, 206, 163, 200, 39, 220, 213, 29, 33, 237, 0, 0, 0, 20, 8, 1,
          18, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]),
        d = Te(e);
      for (let p = 0; p < d.length; p++) n[n.length - 16 + p] = d[p];
      return je.debug('generatePSSH', n), n;
    }
    _createSession(e, n, d) {
      const p = e.mediaKeys.createSession(),
        { item: h } = this;
      if (!h) return;
      this._teardownCurrentSession(), je.debug('creating media key session', p);
      let y;
      if (this.isWidevine && h.isSong) y = this.generatePSSH(this.extID);
      else {
        var _;
        const e =
            null ===
              (_ = (function (e) {
                const n = [],
                  d = new DataView(e.buffer);
                for (let p = 0; p < e.length; ) {
                  const h = d.getUint32(p);
                  n.push(new PsshBox(e, p, p + h)), (p += h);
                }
                return n;
              })(new Uint8Array(n)).find((e) => e.isWidevine)) || void 0 === _
              ? void 0
              : _.rawBytes,
          d = Ie(e);
        je.debug('extracted uri', d), (p.extURI = d), (y = n);
      }
      return (
        p.addEventListener('message', this.startLicenseSession),
        (this._currentSession = p),
        p.generateRequest(d, y).catch((e) => {
          if (e.message.match(/generateRequest.*\(75\)/))
            return p.generateRequest(d, y);
          throw e;
        })
      );
    }
    _teardownCurrentSession() {
      this._currentSession &&
        (je.debug('tearing down media key session', this._currentSession),
        this._currentSession.removeEventListener(
          'message',
          this.startLicenseSession,
        ),
        (this._currentSession = void 0));
    }
    applyDelayedCdmUpdates() {}
    loadKeys(e, n, d) {
      return _async_to_generator$F(function* () {})();
    }
    clearSessions() {
      return _async_to_generator$F(function* () {})();
    }
    constructor(...e) {
      super(...e),
        _define_property$S(this, '_currentSession', void 0),
        _define_property$S(this, '_keySystemAccess', void 0),
        _define_property$S(this, '_mediaKeysPromise', void 0),
        _define_property$S(this, '_mediaKeysServerCertificate', void 0);
    }
  }
  function asyncGeneratorStep$E(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$E(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$E(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$E(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$R(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class MediaExtensionStub extends Notifications {
    destroy(e) {}
    setMediaItem(e) {}
    initializeKeySystem() {
      var e = this;
      return _async_to_generator$E(function* () {
        e.session = new EncryptedSession();
      })();
    }
    clearSessions() {
      return _async_to_generator$E(function* () {})();
    }
    constructor(e) {
      super(e),
        _define_property$R(this, 'audioTracks', []),
        _define_property$R(this, 'textTracks', []),
        _define_property$R(this, 'session', void 0),
        _define_property$R(this, 'extURI', void 0),
        _define_property$R(this, 'hasMediaKeySupport', void 0),
        _define_property$R(this, 'hasMediaSession', void 0),
        _define_property$R(this, 'initiated', void 0),
        _define_property$R(this, 'isFairplay', void 0),
        (this.extURI = ''),
        (this.hasMediaKeySupport = !0),
        (this.initiated = !0),
        (this.isFairplay = !0),
        (this.hasMediaKeySupport = !0),
        (this.hasMediaSession = !0);
    }
  }
  function asyncGeneratorStep$D(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$D(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$D(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$D(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$Q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class PlayerStub {
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
          vt.playbackRateDidChange,
          new Event('ratechange'),
        );
    }
    get volume() {
      return this._volume;
    }
    set volume(e) {
      (this._volume = e),
        this._dispatcher.publish(
          vt.playbackVolumeDidChange,
          new Event('volumeChange'),
        );
    }
    destroy() {}
    dispatch() {}
    exitFullscreen() {
      return _async_to_generator$D(function* () {})();
    }
    loadPreviewImage(e) {
      return _async_to_generator$D(function* () {})();
    }
    initialize() {
      return _async_to_generator$D(function* () {})();
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
      return _async_to_generator$D(function* () {})();
    }
    play() {
      return _async_to_generator$D(function* () {})();
    }
    playItemFromEncryptedSource(e, n, d) {
      return _async_to_generator$D(function* () {})();
    }
    playItemFromUnencryptedSource(e, n, d) {
      return _async_to_generator$D(function* () {})();
    }
    preload() {
      return _async_to_generator$D(function* () {})();
    }
    prepareToPlay(e, n, d) {
      return _async_to_generator$D(function* () {})();
    }
    seekToTime(e) {
      return _async_to_generator$D(function* () {})();
    }
    requestFullscreen() {
      return _async_to_generator$D(function* () {})();
    }
    setPlaybackState(e, n) {}
    setPresentationMode(e) {
      return _async_to_generator$D(function* () {})();
    }
    showPlaybackTargetPicker() {}
    stop(e) {
      return _async_to_generator$D(function* () {})();
    }
    stopMediaAndCleanup() {
      return _async_to_generator$D(function* () {})();
    }
    supportsPictureInPicture() {
      return !1;
    }
    tsidChanged() {}
    setNextSeamlessItem(e) {
      return _async_to_generator$D(function* () {})();
    }
    constructor(n) {
      _define_property$Q(this, 'bitrate', e.PlaybackBitrate.STANDARD),
        _define_property$Q(this, 'audioTracks', []),
        _define_property$Q(this, 'currentBufferedProgress', 0),
        _define_property$Q(this, 'currentPlaybackDuration', 0),
        _define_property$Q(this, 'currentPlaybackProgress', 0),
        _define_property$Q(this, 'currentPlaybackTime', 0),
        _define_property$Q(this, 'currentPlaybackTimeRemaining', 0),
        _define_property$Q(this, 'currentPlayingDate', void 0),
        _define_property$Q(this, 'isPlayingAtLiveEdge', !1),
        _define_property$Q(this, 'isPlaying', !1),
        _define_property$Q(this, 'isPrimaryPlayer', !0),
        _define_property$Q(this, 'isReady', !1),
        _define_property$Q(this, 'nowPlayingItem', void 0),
        _define_property$Q(this, 'paused', !1),
        _define_property$Q(this, 'playbackState', e.PlaybackStates.none),
        _define_property$Q(this, 'playbackTargetAvailable', !1),
        _define_property$Q(this, 'playbackTargetIsWireless', !1),
        _define_property$Q(this, 'previewOnly', !1),
        _define_property$Q(this, 'supportsPreviewImages', !1),
        _define_property$Q(this, 'textTracks', []),
        _define_property$Q(this, 'extension', new MediaExtensionStub([])),
        _define_property$Q(this, 'hasAuthorization', !0),
        _define_property$Q(this, 'windowHandlers', void 0),
        _define_property$Q(this, 'isDestroyed', !1),
        _define_property$Q(this, 'services', void 0),
        _define_property$Q(this, '_dispatcher', void 0),
        _define_property$Q(this, '_volume', 1),
        _define_property$Q(this, '_playbackRate', 1),
        _define_property$Q(this, 'currentAudioTrack', void 0),
        _define_property$Q(this, 'currentTextTrack', void 0),
        _define_property$Q(this, 'seekableTimeRanges', void 0),
        (this.services = n.services),
        (this._dispatcher = n.services.dispatcher),
        (this.windowHandlers = new WindowHandlers(this, n.services.runtime));
    }
  }
  class VideoMediaExtension extends MediaExtension {
    destroy(e) {
      var n;
      null === (n = this._session) || void 0 === n || n.stopLicenseSession(),
        super.destroy(e);
    }
  }
  const Jn = BooleanDevFlag.register('mk-send-manifest-headers');
  function asyncGeneratorStep$C(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$C(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$C(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$C(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$P(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const Xn = [
    'https://play.itunes.apple.com/',
    'https://linear.tv.apple.com/',
    'https://play-edge.itunes.apple.com',
  ];
  const Zn = new (class {
    fetchManifest(e) {
      var n = this;
      return _async_to_generator$C(function* () {
        return (
          je.info('fetching manifest at', e),
          shouldLoadManifestOnce() ? n.fetchForCache(e) : n.fetchOnly(e)
        );
      })();
    }
    getManifest(e) {
      return this.cache.get(e);
    }
    clear(e) {
      e ? this.cache.delete(e) : this.cache.clear();
    }
    fetchForCache(e) {
      var n = this;
      return _async_to_generator$C(function* () {
        const d = (function (e) {
            const n = {};
            Xn.some((n) => e.startsWith(n)) &&
              gn.musicUserToken &&
              (!Jn.configured || Jn.enabled) &&
              ((n['media-user-token'] = gn.musicUserToken),
              (n.Authorization = 'Bearer ' + gn.developerToken));
            return n;
          })(e),
          p = yield n.fetch(e, { headers: new Headers(d) });
        let h = yield p.text();
        var y;
        h = ((e, n) => {
          je.info('converting manifest URIs to absolute paths');
          const d = new URL(e);
          let p = n.replace(/URI="([^"]*)"/g, function (e, n) {
            return `URI="${new URL(n, d).href}"`;
          });
          return (
            (p = p.replace(
              /^(#EXT-X-STREAM-INF:[^\n]*\n)(.*$)/gim,
              function (e, n, p) {
                return `${n}${new URL(p, d).href}`;
              },
            )),
            p
          );
        })(e, h);
        const _ = {
          url: e,
          content: h,
          contentType:
            null !== (y = p.headers.get('content-type')) && void 0 !== y
              ? y
              : void 0,
        };
        return n.cache.set(e, _), _;
      })();
    }
    fetchOnly(e) {
      var n = this;
      return _async_to_generator$C(function* () {
        const d = yield n.fetch(e),
          p = yield d.text();
        var h;
        return {
          url: e,
          content: p,
          contentType:
            null !== (h = d.headers.get('content-type')) && void 0 !== h
              ? h
              : void 0,
        };
      })();
    }
    constructor(e = {}) {
      var n, d;
      _define_property$P(this, 'cache', void 0),
        _define_property$P(this, 'fetch', void 0),
        (this.fetch =
          null !== (n = e.fetch) && void 0 !== n ? n : fetch.bind(globalThis)),
        (this.cache = null !== (d = e.cache) && void 0 !== d ? d : new Map());
    }
  })();
  function asyncGeneratorStep$B(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$B(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$B(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$B(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _ts_decorate$i(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$i(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const { mediaPlaybackError: eo } = vt,
    { playbackLicenseError: to, playbackSessionError: ro } = Je;
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
    get supportsPreviewImages() {
      return !1;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$B(function* () {
        if (!e.video)
          return void je.warn(
            'NativeSafariVideoPlayer.initializeExtension No video element, not initializing extension',
          );
        const n = new VideoMediaExtension(
          e.video,
          'video/mp4;codecs="avc1.42E01E"',
        );
        (e.extension = n),
          yield n.initializeKeySystem(),
          n.addEventListener(to, e.onPlaybackLicenseError),
          n.addEventListener(ro, e.onPlaybackSessionError);
      })();
    }
    destroy() {
      je.debug('native-safari-video-player.destroy');
      const { extension: e, video: n } = this;
      this._blobUrl &&
        (URL.revokeObjectURL(this._blobUrl), (this._blobUrl = void 0)),
        e &&
          n &&
          (e.removeEventListener(to, this.onPlaybackLicenseError),
          e.removeEventListener(ro, this.onPlaybackSessionError),
          n.removeEventListener('loadedmetadata', this.onMetadataLoaded),
          super.destroy());
    }
    loadPreviewImage(e) {
      return _async_to_generator$B(function* () {})();
    }
    playHlsStream(e, n, d = {}) {
      var p = this;
      return _async_to_generator$B(function* () {
        je.debug('native-safari-video-player.playHlsStream', e);
        const { video: h } = p;
        if (!h) {
          const e = 'NativeSafariVideoPlayer.playHlsStream(): No video element';
          throw (je.error(e), new Error(e));
        }
        p.setupTrackManagers();
        const y = p.startPlaybackSequence(),
          _ = (
            p._shouldLoadManifestsOnce
              ? p.playByBlob(e, h, d)
              : p.playBySource(e, h, d)
          ).then(() => y);
        var m;
        n && (null === (m = p.extension) || void 0 === m || m.setMediaItem(n));
        return h.addEventListener('loadedmetadata', p.onMetadataLoaded), _;
      })();
    }
    onPlaybackSessionError(e) {
      this._dispatcher.publish(
        eo,
        new MKError(MKError.Reason.MEDIA_SESSION, e),
      );
    }
    onMetadataLoaded() {
      var e = this;
      return _async_to_generator$B(function* () {
        je.debug('native-safari-video-player.onMetadataLoaded');
        const { nowPlayingItem: n } = e;
        n && (n.state = F.ready),
          yield e._playMedia(),
          e.finishPlaybackSequence();
      })();
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$B(function* () {
        je.debug('native-safari-video-player: media element seek to', e),
          (n._targetElement.currentTime = e);
      })();
    }
    playByBlob(e, n, d = {}) {
      var p = this;
      return _async_to_generator$B(function* () {
        je.debug('native-safari-video-player: playing video by blob');
        let h = Zn.getManifest(e);
        if (
          !h &&
          (je.debug('native-safari-video-player: fetching manifest'),
          (h = yield Zn.fetchManifest(e)),
          !h)
        )
          throw (
            (je.error('No manifest for ' + e),
            new MKError(
              MKError.Reason.CONTENT_UNAVAILABLE,
              'Failed to load manifest',
            ))
          );
        je.debug('native-safari-video-player: loaded manifest', !!h),
          Zn.clear(e);
        const y = h.contentType,
          _ = h.content.replace(/^#EXT-X-SESSION-DATA-ITUNES:.*$/gm, ''),
          m = new Blob([_], { type: y });
        (e = URL.createObjectURL(m)), (p._blobUrl = e);
        const g = document.createElement('source');
        g.setAttribute('src', e),
          y && g.setAttribute('type', y),
          je.debug('native-safari-video-player: blob url', e),
          void 0 !== d.startTime && (n.currentTime = d.startTime),
          n.appendChild(g);
      })();
    }
    playBySource(e, n, d = {}) {
      return _async_to_generator$B(function* () {
        je.debug('native-safari-video-player: playing video by source'),
          void 0 !== d.startTime && (e += '#t=' + d.startTime),
          (n.src = e);
      })();
    }
    constructor(...e) {
      var n, d, p;
      super(...e),
        (p = void 0),
        (d = '_blobUrl') in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p);
    }
  }
  function _define_property$N(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$i(
    [
      Bind(),
      _ts_metadata$i('design:type', Function),
      _ts_metadata$i('design:paramtypes', [void 0]),
    ],
    NativeSafariVideoPlayer.prototype,
    'onPlaybackSessionError',
    null,
  ),
    _ts_decorate$i(
      [
        Bind(),
        _ts_metadata$i('design:type', Function),
        _ts_metadata$i('design:paramtypes', []),
      ],
      NativeSafariVideoPlayer.prototype,
      'onMetadataLoaded',
      null,
    ),
    _ts_decorate$i(
      [
        AsyncDebounce(250),
        _ts_metadata$i('design:type', Function),
        _ts_metadata$i('design:paramtypes', [Number]),
      ],
      NativeSafariVideoPlayer.prototype,
      'seekToTime',
      null,
    );
  class HlsJsPreviewImageLoader {
    loadPreviewImage(e) {
      return (
        this.lastPosition === e ||
          ((this.lastPosition = e),
          (this.lastPromise = new Promise((n, d) => {
            this.hls.loadImageIframeData$(e).subscribe((e) => {
              const { data: d } = e,
                p = new Blob([d], { type: 'image/jpeg' });
              n(p);
            });
          }))),
        this.lastPromise
      );
    }
    constructor(e) {
      _define_property$N(this, 'hls', void 0),
        _define_property$N(this, 'lastPosition', void 0),
        _define_property$N(this, 'lastPromise', void 0),
        (this.hls = e);
    }
  }
  function _define_property$M(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$p(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$M(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$f(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _ts_decorate$h(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$h(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const {
    audioTracksSwitched: io,
    audioTracksUpdated: no,
    inlineStylesParsed: oo,
    textTracksSwitched: ao,
    textTracksUpdated: so,
  } = Je;
  class HlsJsTracks extends Notifications {
    get isDestroyed() {
      return this._isDestroyed;
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
        void 0 !== e.id &&
        (this.session.audioSelectedPersistentID = e.id);
    }
    set textTrack(e) {
      var n, d;
      this.session.subtitleSelectedPersistentID =
        null !== (d = null === (n = e) || void 0 === n ? void 0 : n.id) &&
        void 0 !== d
          ? d
          : -1;
    }
    selectForcedTrack() {
      var e, n;
      const { session: d } = this;
      if (!(null === (e = d) || void 0 === e ? void 0 : e.audioTracks)) return;
      const p = d.audioTracks.filter(
          (e) => e.persistentID === d.audioSelectedPersistentID,
        ),
        h = p && p.length && p[0];
      if (!h) return;
      const y =
        null ===
          (n = d.subtitleMediaOptions.filter(
            (e) =>
              0 === e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
              e.MediaSelectionOptionsExtendedLanguageTag === h.lang,
          )) || void 0 === n
          ? void 0
          : n[0];
      let _;
      return (
        y
          ? (je.debug(
              'hlsjsTracks: found forced track for ' +
                y.MediaSelectionOptionsExtendedLanguageTag,
            ),
            (d.subtitleSelectedPersistentID =
              y.MediaSelectionOptionsPersistentID),
            (_ = this.normalizeTextTrack(y)))
          : (d.subtitleSelectedPersistentID = -1),
        _
      );
    }
    audioTracksUpdated(e, n) {
      const d = (
        (n &&
          n.audioMediaSelectionGroup &&
          n.audioMediaSelectionGroup.MediaSelectionGroupOptions) ||
        []
      ).map(this.normalizeAudioTrack, this);
      (this._audioTracks = d), this.dispatchEvent(no, d);
    }
    handleAudioTrackSwitched() {
      this.dispatchEvent(io, {
        selectedId: this.session.audioSelectedPersistentID,
      });
    }
    handleInlineStylesParsed(e, n) {
      this.dispatchEvent(oo, n);
    }
    handleManifestLoaded(e, n) {
      this.audioTracksUpdated(e, n), this.subtitleTracksUpdated(e, n);
    }
    handleSessionDataComplete(e, n) {
      var d, p;
      null === (p = n) ||
        void 0 === p ||
        null === (d = p.itemList) ||
        void 0 === d ||
        d.forEach((e) => {
          if ('_hls.localized-rendition-names' === e['DATA-ID'] && e.VALUE)
            try {
              (this._localizedRenditionNames = JSON.parse(e.VALUE)),
                this._audioTracks.forEach((e) => {
                  var n;
                  const d =
                    null === (n = this._localizedRenditionNames) || void 0 === n
                      ? void 0
                      : n[e.label];
                  d && (e.localizedRenditionNames = d);
                }),
                this.dispatchEvent(no, this._audioTracks);
            } catch (Ut) {
              return void je.error(
                'Failed to parse _hls.localized-rendition-names',
                Ut,
              );
            }
        });
    }
    handleSubtitleTrackSwitch(e, n) {
      this.dispatchEvent(ao, n);
    }
    subtitleTracksUpdated(e, n) {
      const d =
          (n &&
            n.subtitleMediaSelectionGroup &&
            n.subtitleMediaSelectionGroup.MediaSelectionGroupOptions) ||
          [],
        p = [];
      d.forEach((e) => {
        0 !== e.MediaSelectionOptionsDisplaysNonForcedSubtitles &&
          p.push(this.normalizeTextTrack(e));
      }),
        (this._textTracks = p),
        this.dispatchEvent(so, p);
    }
    normalizeAudioTrack(e) {
      const n = e.MediaSelectionOptionsTaggedMediaCharacteristics,
        d = (null != n ? n : []).includes(
          'public.accessibility.describes-video',
        )
          ? 'description'
          : 'main';
      return _object_spread_props$f(
        _object_spread$p({}, this.normalizeSelectionOption(e)),
        { enabled: !1, kind: d, characteristics: n },
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
        _object_spread_props$f(
          _object_spread$p({}, this.normalizeSelectionOption(e)),
          { mode: 'disabled', kind: d },
        )
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
      this._isDestroyed = !0;
      const {
        MANIFEST_LOADED: e,
        AUDIO_TRACK_SWITCHED: n,
        SUBTITLE_TRACK_SWITCH: d,
        INLINE_STYLES_PARSED: p,
        SESSION_DATA_COMPLETE: h,
      } = window.Hls.Events;
      this.session.off(e, this.handleManifestLoaded),
        this.session.off(n, this.handleAudioTrackSwitched),
        this.session.off(d, this.handleSubtitleTrackSwitch),
        this.session.off(p, this.handleInlineStylesParsed),
        this.session.off(h, this.handleSessionDataComplete);
    }
    constructor(e) {
      super([io, no, oo, ao, so]),
        _define_property$M(this, 'session', void 0),
        _define_property$M(this, '_audioTracks', void 0),
        _define_property$M(this, '_textTracks', void 0),
        _define_property$M(this, '_localizedRenditionNames', void 0),
        _define_property$M(this, '_isDestroyed', void 0),
        (this.session = e),
        (this._audioTracks = []),
        (this._textTracks = []),
        (this._isDestroyed = !1);
      const {
        MANIFEST_LOADED: n,
        AUDIO_TRACK_SWITCHED: d,
        SUBTITLE_TRACK_SWITCH: p,
        INLINE_STYLES_PARSED: h,
        SESSION_DATA_COMPLETE: y,
      } = window.Hls.Events;
      this.session.on(n, this.handleManifestLoaded),
        this.session.on(d, this.handleAudioTrackSwitched),
        this.session.on(p, this.handleSubtitleTrackSwitch),
        this.session.on(h, this.handleInlineStylesParsed),
        this.session.on(y, this.handleSessionDataComplete);
    }
  }
  function asyncGeneratorStep$A(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$A(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$A(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$A(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$L(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$g(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$g(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$h(
    [
      Bind(),
      _ts_metadata$h('design:type', Function),
      _ts_metadata$h('design:paramtypes', []),
    ],
    HlsJsTracks.prototype,
    'handleAudioTrackSwitched',
    null,
  ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h('design:type', Function),
        _ts_metadata$h('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsTracks.prototype,
      'handleInlineStylesParsed',
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h('design:type', Function),
        _ts_metadata$h('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsTracks.prototype,
      'handleManifestLoaded',
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h('design:type', Function),
        _ts_metadata$h('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsTracks.prototype,
      'handleSessionDataComplete',
      null,
    ),
    _ts_decorate$h(
      [
        Bind(),
        _ts_metadata$h('design:type', Function),
        _ts_metadata$h('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsTracks.prototype,
      'handleSubtitleTrackSwitch',
      null,
    );
  const co = {
    bufferStalledError: 'bufferStalledError',
    keySystemGenericError: 'keySystemGenericError',
  };
  var lo;
  !(function (e) {
    (e.Seek = 'Seek'),
      (e.HighBuffer = 'HighBuffer'),
      (e.LowBuffer = 'LowBuffer');
  })(lo || (lo = {}));
  const uo = new Set([
      MKError.Reason.DEVICE_LIMIT,
      MKError.Reason.GEO_BLOCK,
      MKError.Reason.WIDEVINE_CDM_EXPIRED,
    ]),
    po = {};
  (po[We.FAIRPLAY] = 'fairplaystreaming'),
    (po[We.PLAYREADY] = 'playready'),
    (po[We.WIDEVINE] = 'widevine');
  const ho = BooleanDevFlag.get('mk-block-report-cdn-server'),
    yo = { nightly: !0, carry: !0 },
    _o = JsonDevFlag.register('mk-hlsjs-config-overrides');
  class HlsJsVideoPlayer extends VideoPlayer {
    get shouldDispatchErrors() {
      return !this.userInitiated || this._playbackDidStart;
    }
    get supportsPreviewImages() {
      var e, n;
      return (
        !this.services.runtime.isMobile &&
        (null === (n = this._hls) ||
        void 0 === n ||
        null === (e = n.iframeVariants) ||
        void 0 === e
          ? void 0
          : e.some((e) => 'mjpg' === e.imageCodec))
      );
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
      var e = this;
      return _async_to_generator$A(function* () {
        e._keySystem = yield findKeySystemPreference(e.services.runtime);
        try {
          var n;
          if (!Ye.urls.hls) throw new Error('bag.urls.hls is not configured');
          yield Promise.all([
            loadScript(Ye.urls.hls),
            null === (n = e._rtcTracker) || void 0 === n
              ? void 0
              : n.loadScript(),
          ]);
        } catch (Ut) {
          throw (
            (je.error(
              'hlsjs-video-player failed to load script ' + Ye.urls.hls,
              Ut,
            ),
            Ut)
          );
        }
      })();
    }
    destroy() {
      var e;
      if (
        (je.debug('hlsjs-video-player.destroy'),
        null === (e = this._hlsJsTracks) || void 0 === e || e.destroy(),
        this._hls)
      ) {
        const {
            ERROR: e,
            INTERNAL_ERROR: n,
            MANIFEST_PARSED: d,
            KEY_REQUEST_STARTED: p,
            LICENSE_CHALLENGE_CREATED: h,
            LEVEL_SWITCHED: y,
            UNRESOLVED_URI_LOADING: _,
          } = window.Hls.Events,
          m = this._hls;
        m.stopLoad(),
          m.detachMedia(),
          m.off(e, this.handleHlsError),
          m.off(n, this.handleHlsError),
          m.off(d, this.handleManifestParsed),
          m.off(p, this.handleKeyRequestStarted),
          m.off(h, this.handleLicenseChallengeCreated),
          m.off(y, this.handleLevelSwitched),
          this._shouldLoadManifestsOnce &&
            m.off(_, this.handleUnresolvedUriLoading),
          m.destroy(),
          (window.hlsSession = void 0);
      }
      super.destroy(), asAsync(this._license.stop());
    }
    playHlsStream(e, n, d = {}) {
      var p = this;
      return _async_to_generator$A(function* () {
        je.debug('hlsjs-video-player.playHlsStream', e, n);
        const { _keySystem: h } = p;
        if (!h) return;
        let y, _;
        (p._unrecoverableError = void 0), p.createHlsPlayer();
        const hasKey = (e, n) => {
          var d, p;
          return (
            void 0 !==
            (null === (p = n) ||
            void 0 === p ||
            null === (d = p.keyURLs) ||
            void 0 === d
              ? void 0
              : d[e])
          );
        };
        h === We.WIDEVINE &&
          hasKey('widevine-cert-url', n) &&
          ((y = 'WIDEVINE_SOFTWARE'),
          (_ = {
            initDataTypes: ['cenc', 'keyids'],
            distinctiveIdentifier: 'optional',
            persistentState: 'required',
          }));
        const m = {
            subs: 'accepts-css',
            platformInfo: {
              requiresCDMAttachOnStart: h !== We.NONE,
              maxSecurityLevel: y,
              keySystemConfig: _,
            },
            appData: { serviceName: Ye.app.name },
          },
          { _rtcTracker: g, _hls: b } = p;
        if (g) {
          const e = g.prepareReportingAgent(n);
          void 0 !== e && (m.appData.reportingAgent = e);
        }
        je.debug('RTC: loadSource with load options', m);
        const S = p.startPlaybackSequence();
        return (
          p._shouldLoadManifestsOnce &&
            ((e = e.replace('https://', 'manifest://')),
            je.info('Manifest already loaded, passing url to HLSJS', e)),
          b.loadSource(e, m, d.startTime),
          b.attachMedia(p.video),
          n &&
            ((p._licenseServerUrl = n.keyURLs['hls-key-server-url']),
            h === We.FAIRPLAY && hasKey('hls-key-cert-url', n)
              ? b.setProtectionData({
                  fairplaystreaming: {
                    serverCertUrl: n.keyURLs['hls-key-cert-url'],
                  },
                })
              : hasKey('widevine-cert-url', n) &&
                b.setProtectionData({
                  widevine: { serverCertUrl: n.keyURLs['widevine-cert-url'] },
                })),
          S
        );
      })();
    }
    createHlsPlayer() {
      const { _keySystem: e } = this,
        { Hls: n } = window,
        d = ue.get(),
        { os: p } = this.services.runtime,
        h = {
          clearMediaKeysOnPromise: !1,
          customTextTrackCueRenderer: !0,
          debug: !!d,
          debugLevel: d,
          enableIFramePreloading: !1,
          enablePerformanceLogging: !!d,
          enablePlayReadyKeySystem: !0,
          enableQueryParamsForITunes: !this._shouldLoadManifestsOnce,
          enableRtcReporting: void 0 !== this._rtcTracker,
          keySystemPreference: po[e],
          useMediaKeySystemAccessFilter: !0,
          nativeControlsEnabled: p.isAndroid,
          enableContentSteering: !0,
          allowFastSwitchUp: !0,
          enableBoss: !1,
        };
      ((e) => {
        const { Hls: n } = window;
        if (n && ho) {
          const d = deepClone(n.DefaultConfig.fragLoadPolicy);
          (d.default.reportCDNServer = !1),
            (d.customURL.reportCDNServer = !1),
            (e.fragLoadPolicy = d);
        }
      })(h),
        ((e) => {
          const n = se.value;
          if (!n) return;
          var d;
          const p =
            null !== (d = determineCdnPathPrefix()) && void 0 !== d ? d : '';
          n.socketurl &&
            isAppleHostname(n.socketurl) &&
            yo[p.split('.')[0]] &&
            ((e.socketurl = n.socketurl),
            (e.socketid = n.socketid),
            (e.log = n.log));
        })(h),
        ((e) => {
          const n = _o.value;
          n && 'object' == typeof n && Object.assign(e, n);
        })(h);
      const y = new n(h),
        {
          ERROR: _,
          INTERNAL_ERROR: m,
          MANIFEST_PARSED: g,
          KEY_REQUEST_STARTED: b,
          LICENSE_CHALLENGE_CREATED: S,
          LEVEL_SWITCHED: P,
          UNRESOLVED_URI_LOADING: E,
        } = n.Events;
      y.on(_, this.handleHlsError),
        y.on(m, this.handleHlsError),
        y.on(g, this.handleManifestParsed),
        y.on(b, this.handleKeyRequestStarted),
        y.on(S, this.handleLicenseChallengeCreated),
        y.on(P, this.handleLevelSwitched),
        this._shouldLoadManifestsOnce &&
          y.on(E, this.handleUnresolvedUriLoading),
        (this._hls = y),
        (window.hlsSession = y),
        (this._hlsJsTracks = new HlsJsTracks(this._hls)),
        this.setupTrackManagers(this._hlsJsTracks),
        (this._hlsPreviewImageLoader = new HlsJsPreviewImageLoader(this._hls));
    }
    handleUnresolvedUriLoading(e, n) {
      var d = this;
      return _async_to_generator$A(function* () {
        const e = d._hls,
          p = n.uri,
          h = p.replace('manifest://', 'https://');
        var y;
        je.debug('handleUnresolvedUriLoading for uri ', p);
        const _ =
          null !== (y = Zn.getManifest(h)) && void 0 !== y
            ? y
            : yield Zn.fetchManifest(h);
        _
          ? (Zn.clear(h),
            e.off(
              window.Hls.Events.UNRESOLVED_URI_LOADING,
              d.handleUnresolvedUriLoading,
            ),
            e.handleResolvedUri(p, { url: h, status: 200, data: _.content }))
          : je.error('No cached manifest for ' + h);
      })();
    }
    handleLevelSwitched(e, n) {
      var d, p, h;
      const { level: y } = n;
      if (!y) return;
      const _ =
        null === (d = this._levels) || void 0 === d
          ? void 0
          : d.find((e) => e.persistentId === y);
      if (
        !_ ||
        (null === (p = this._currentLevel) || void 0 === p
          ? void 0
          : p.persistentId) ===
          (null === (h = _) || void 0 === h ? void 0 : h.persistentId)
      )
        return;
      this._currentLevel = _;
      const m =
        void 0 !== _.audioGroupId
          ? this._channelsByGroup[_.audioGroupId]
          : void 0;
      this._dispatcher.publish(_t.hlsLevelUpdated, { level: _, channels: m });
    }
    handleHlsError(e, n) {
      var d;
      if (
        (je.warn('HLS.js error', JSON.stringify(n)), this._unrecoverableError)
      )
        return;
      let p = new MKError(MKError.Reason.UNSUPPORTED_ERROR, n.reason);
      p.data = n;
      const { bufferStalledError: h, keySystemGenericError: y } = co;
      if (n.details === y) return void this._dispatcher.publish(y, p);
      let _ = !1;
      var m;
      n.details === h &&
        n.stallType === lo.Seek &&
        -12909 ===
          (null === (d = n.response) || void 0 === d ? void 0 : d.code) &&
        ((p = new MKError(MKError.Reason.BUFFER_STALLED_ERROR, n.stallType)),
        (p.data = {
          stallType: n.stallType,
          code: null === (m = n.response) || void 0 === m ? void 0 : m.code,
        }),
        (_ = !0));
      if (
        ('output-restricted' === n.reason &&
          (p = new MKError(MKError.Reason.OUTPUT_RESTRICTED, n.reason)),
        n.fatal)
      ) {
        if ((this._hls.destroy(), !this.shouldDispatchErrors && !_)) throw p;
        this._dispatcher.publish(vt.mediaPlaybackError, p);
      }
    }
    handleManifestParsed(e, n) {
      var d = this;
      return _async_to_generator$A(function* () {
        var e, p;
        let h;
        je.debug('handleManifestParsed', n),
          (d._levels = null !== (e = n.levels) && void 0 !== e ? e : []),
          (d.nowPlayingItem.state = F.ready),
          (d._channelsByGroup = (
            null !== (p = n.audioTracks) && void 0 !== p ? p : []
          ).reduce((e, n) => ((e[n.groupId] = n.channels), e), {}));
        try {
          yield d._playMedia();
        } catch (Ut) {
          throw (
            (je.warn('error from media element, possibly non-fatal', Ut), Ut)
          );
        } finally {
          h = yield d.finishPlaybackSequence();
        }
        return h;
      })();
    }
    handleKeyRequestStarted(e, n) {
      je.debug('hlsjs-video.handleKeyRequestStarted'),
        this._hls.generateKeyRequest(n.keyuri, {});
    }
    handleLicenseChallengeCreated(n, d) {
      var p = this;
      return _async_to_generator$A(function* () {
        const {
          _licenseServerUrl: n,
          nowPlayingItem: h,
          _keySystem: y,
          userInitiated: _,
        } = p;
        try {
          var m, g;
          const e = yield null === (m = p._license) || void 0 === m
              ? void 0
              : m.start(n, h, d, y, _),
            b = { statusCode: e.status };
          (null === (g = e) || void 0 === g ? void 0 : g.license) &&
            (y === We.FAIRPLAY
              ? (b.ckc = Te(e.license))
              : (b.license = Te(e.license)));
          const S = e['renew-after'];
          S && (b.renewalDate = new Date(Date.now() + 1e3 * S)),
            p._hls.setLicenseResponse(d.keyuri, b);
        } catch (Q) {
          var b;
          if (p._unrecoverableError) return;
          const h = Q.data,
            y = {};
          void 0 !== (null === (b = h) || void 0 === b ? void 0 : b.status) &&
            (y.statusCode = +h.status),
            je.warn('Passing license response error to Hls.js', y),
            p._hls.setLicenseResponse(d.keyuri, y),
            MKError.isMKError(Q) &&
              uo.has(Q.reason) &&
              ((p._unrecoverableError = Q),
              p.resetDeferredPlay(),
              yield p.stop({
                endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
                userInitiated: _,
              })),
            p.onPlaybackLicenseError(Q);
        }
      })();
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$A(function* () {
        n._hls
          ? (je.debug('hlsjs-video: hls seekTo', e), (n._hls.seekTo = e))
          : (je.debug('hlsjs-video: media element seek to', e),
            (n._targetElement.currentTime = e));
      })();
    }
    loadPreviewImage(e) {
      var n = this;
      return _async_to_generator$A(function* () {
        var d;
        return null === (d = n._hlsPreviewImageLoader) || void 0 === d
          ? void 0
          : d.loadPreviewImage(e);
      })();
    }
    constructor(e) {
      var n, d;
      super(e),
        _define_property$L(this, '_hls', void 0),
        _define_property$L(this, '_hlsPreviewImageLoader', void 0),
        _define_property$L(this, '_hlsJsTracks', void 0),
        _define_property$L(this, '_keySystem', void 0),
        _define_property$L(this, '_license', void 0),
        _define_property$L(this, '_rtcTracker', void 0),
        _define_property$L(this, '_levels', void 0),
        _define_property$L(this, '_channelsByGroup', {}),
        _define_property$L(this, '_currentLevel', void 0),
        _define_property$L(this, '_licenseServerUrl', void 0),
        _define_property$L(this, '_unrecoverableError', void 0),
        (this._rtcTracker =
          null === (d = e) ||
          void 0 === d ||
          null === (n = d.playbackServices) ||
          void 0 === n
            ? void 0
            : n.getRTCStreamingTracker()),
        (this._license = new License());
    }
  }
  var fo;
  _ts_decorate$g(
    [
      Bind(),
      _ts_metadata$g('design:type', Function),
      _ts_metadata$g('design:paramtypes', [
        String,
        'undefined' == typeof HlsUnresolvedUriData
          ? Object
          : HlsUnresolvedUriData,
      ]),
    ],
    HlsJsVideoPlayer.prototype,
    'handleUnresolvedUriLoading',
    null,
  ),
    _ts_decorate$g(
      [
        Bind(),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsVideoPlayer.prototype,
      'handleLevelSwitched',
      null,
    ),
    _ts_decorate$g(
      [
        Bind(),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsVideoPlayer.prototype,
      'handleHlsError',
      null,
    ),
    _ts_decorate$g(
      [
        Bind(),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsVideoPlayer.prototype,
      'handleManifestParsed',
      null,
    ),
    _ts_decorate$g(
      [
        Bind(),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsVideoPlayer.prototype,
      'handleKeyRequestStarted',
      null,
    ),
    _ts_decorate$g(
      [
        Bind(),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsVideoPlayer.prototype,
      'handleLicenseChallengeCreated',
      null,
    ),
    _ts_decorate$g(
      [
        AsyncDebounce(250),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [Number]),
      ],
      HlsJsVideoPlayer.prototype,
      'seekToTime',
      null,
    ),
    _ts_decorate$g(
      [
        ((fo = 250),
        (e, n, d) => {
          const p = (function (e, n) {
            let d,
              p,
              h = 0;
            const resetState = () => {
              clearTimeout(p), (p = 0), (d = void 0);
            };
            return function (...y) {
              const _ = this;
              return new Promise(function (m, g) {
                const b = Date.now();
                b - h < n
                  ? (d && (d.resolve(void 0), resetState()),
                    (d = { resolve: m, reject: g, args: y }),
                    (p = setTimeout(
                      () => {
                        e.apply(_, d.args).then(d.resolve).catch(d.reject),
                          resetState();
                      },
                      n - (b - h + 1),
                    )))
                  : (resetState(), (h = b), e.apply(_, y).then(m).catch(g));
              });
            };
          })(d.value, fo);
          d.value = p;
        }),
        _ts_metadata$g('design:type', Function),
        _ts_metadata$g('design:paramtypes', [Number]),
      ],
      HlsJsVideoPlayer.prototype,
      'loadPreviewImage',
      null,
    ),
    (e.version = '2.2346.3');
  const vo = e.version.split('.');
  vo[0];
  const mo = vo[vo.length - 1];
  var go, bo;
  (vo[0] = '3'),
    (vo[vo.length - 1] = mo + '-prerelease'),
    (e.version = vo.join('.')),
    (e.PlaybackActions = void 0),
    ((go = e.PlaybackActions || (e.PlaybackActions = {})).REPEAT = 'REPEAT'),
    (go.SHUFFLE = 'SHUFFLE'),
    (go.AUTOPLAY = 'AUTOPLAY'),
    (e.PlaybackMode = void 0),
    ((bo = e.PlaybackMode || (e.PlaybackMode = {}))[(bo.PREVIEW_ONLY = 0)] =
      'PREVIEW_ONLY'),
    (bo[(bo.MIXED_CONTENT = 1)] = 'MIXED_CONTENT'),
    (bo[(bo.FULL_PLAYBACK_ONLY = 2)] = 'FULL_PLAYBACK_ONLY');
  const So = {
    configured: 'musickitconfigured',
    loaded: 'musickitloaded',
    audioTrackAdded: vt.audioTrackAdded,
    audioTrackChanged: vt.audioTrackChanged,
    audioTrackRemoved: vt.audioTrackRemoved,
    authorizationStatusDidChange: xe.authorizationStatusDidChange,
    authorizationStatusWillChange: xe.authorizationStatusWillChange,
    bufferedProgressDidChange: vt.bufferedProgressDidChange,
    capabilitiesChanged: 'capabilitiesChanged',
    autoplayEnabledDidChange: 'autoplayEnabledDidChange',
    drmUnsupported: vt.drmUnsupported,
    eligibleForSubscribeView: xe.eligibleForSubscribeView,
    forcedTextTrackChanged: vt.forcedTextTrackChanged,
    mediaCanPlay: vt.mediaCanPlay,
    mediaElementCreated: vt.mediaElementCreated,
    mediaItemStateDidChange: A.mediaItemStateDidChange,
    mediaItemStateWillChange: A.mediaItemStateWillChange,
    mediaPlaybackError: vt.mediaPlaybackError,
    mediaSkipAvailable: 'mediaSkipAvailable',
    mediaRollEntered: 'mediaRollEntered',
    mediaUpNext: 'mediaUpNext',
    metadataDidChange: vt.metadataDidChange,
    nowPlayingItemDidChange: vt.nowPlayingItemDidChange,
    nowPlayingItemWillChange: vt.nowPlayingItemWillChange,
    playInitiated: 'playInitiated',
    playbackBitrateDidChange: vt.playbackBitrateDidChange,
    playbackDurationDidChange: vt.playbackDurationDidChange,
    playbackProgressDidChange: vt.playbackProgressDidChange,
    playbackRateDidChange: vt.playbackRateDidChange,
    playbackStateDidChange: vt.playbackStateDidChange,
    playbackStateWillChange: vt.playbackStateWillChange,
    playbackTargetAvailableDidChange: vt.playbackTargetAvailableDidChange,
    playbackTargetIsWirelessDidChange: vt.playbackTargetIsWirelessDidChange,
    playbackTimeDidChange: vt.playbackTimeDidChange,
    playbackVolumeDidChange: vt.playbackVolumeDidChange,
    playerTypeDidChange: vt.playerTypeDidChange,
    presentationModeDidChange: vt.presentationModeDidChange,
    primaryPlayerDidChange: vt.primaryPlayerDidChange,
    queueIsReady: 'queueIsReady',
    queueItemsDidChange: 'queueItemsDidChange',
    queueItemForStartPosition: 'queueItemForStartPosition',
    queuePositionDidChange: 'queuePositionDidChange',
    shuffleModeDidChange: 'shuffleModeDidChange',
    repeatModeDidChange: 'repeatModeDidChange',
    storefrontCountryCodeDidChange: xe.storefrontCountryCodeDidChange,
    storefrontIdentifierDidChange: xe.storefrontIdentifierDidChange,
    textTrackAdded: vt.textTrackAdded,
    textTrackChanged: vt.textTrackChanged,
    textTrackRemoved: vt.textTrackRemoved,
    timedMetadataDidChange: vt.timedMetadataDidChange,
    userTokenDidChange: xe.userTokenDidChange,
    webComponentsLoaded: 'musickitwebcomponentsloaded',
  };
  function asyncGeneratorStep$z(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$K(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$f(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class SpanWatcher {
    startMonitor() {
      this.dispatcher.unsubscribe(
        So.playbackTimeDidChange,
        this.handleTimeChange,
      ),
        this.dispatcher.subscribe(
          So.playbackTimeDidChange,
          this.handleTimeChange,
        );
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(
        So.playbackTimeDidChange,
        this.handleTimeChange,
      );
    }
    handleTimeChange(e, { currentPlaybackTime: n }) {
      var d,
        p = this;
      return ((d = function* () {
        !Number.isFinite(n) || n < p.start || n > p.stop
          ? (p.inWatchSpan = !1)
          : p.inWatchSpan ||
            (p.allowMultiple || p.stopMonitor(),
            (p.inWatchSpan = !0),
            yield p.callback(n, p));
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);
          function _next(e) {
            asyncGeneratorStep$z(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$z(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    constructor(e, n, d, p, h = !1) {
      _define_property$K(this, 'dispatcher', void 0),
        _define_property$K(this, 'callback', void 0),
        _define_property$K(this, 'start', void 0),
        _define_property$K(this, 'stop', void 0),
        _define_property$K(this, 'allowMultiple', void 0),
        _define_property$K(this, 'inWatchSpan', void 0),
        (this.dispatcher = e),
        (this.callback = n),
        (this.start = d),
        (this.stop = p),
        (this.allowMultiple = h),
        (this.inWatchSpan = !1);
    }
  }
  function _define_property$J(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$e(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$f('design:type', Function),
      _ts_metadata$f('design:paramtypes', [void 0, void 0]),
    ],
    SpanWatcher.prototype,
    'handleTimeChange',
    null,
  );
  class PlaybackMonitor {
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
    constructor(e) {
      _define_property$J(this, 'isActive', !1),
        _define_property$J(this, 'isMonitoring', !1),
        _define_property$J(this, 'apiManager', void 0),
        _define_property$J(this, 'dispatcher', void 0),
        _define_property$J(this, 'playbackController', void 0),
        _define_property$J(this, 'watchers', []),
        (this.handlePlaybackThreshold =
          this.handlePlaybackThreshold.bind(this)),
        (this.playbackController = e.controller),
        (this.dispatcher = e.services.dispatcher),
        this.dispatcher.subscribe(
          So.nowPlayingItemDidChange,
          this.handleMediaItemChange,
        ),
        (this.apiManager = e.services.apiManager);
    }
  }
  function asyncGeneratorStep$y(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$e('design:type', Function),
      _ts_metadata$e('design:paramtypes', []),
    ],
    PlaybackMonitor.prototype,
    'handleMediaItemChange',
    null,
  );
  class RollMonitor extends PlaybackMonitor {
    handlePlaybackThreshold(e, n) {
      var d,
        p = this;
      return ((d = function* () {
        if (!p.rollMap.has(n)) return;
        const e = p.rollMap.get(n);
        p.dispatcher.publish(So.mediaRollEntered, e), p.rollMap.delete(n);
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);
          function _next(e) {
            asyncGeneratorStep$y(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$y(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
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
        : (function (e, n = ['pre-roll', 'mid-roll', 'post-roll']) {
            if (void 0 === e.hlsMetadata) return [];
            const d = [];
            return (
              n.forEach((n) => {
                const p = parseInt(e.hlsMetadata[n + '.count'], 10);
                if (!isNaN(p))
                  for (let h = 0; h < p; h++) {
                    const p = `${n}.${h}`,
                      y = {
                        index: h,
                        type: n,
                        skippable: 'true' === e.hlsMetadata[p + '.skippable'],
                        'adam-id': e.hlsMetadata[p + '.adam-id'],
                        start: Math.round(
                          parseFloat(e.hlsMetadata[p + '.start']),
                        ),
                        duration: Math.round(
                          parseFloat(e.hlsMetadata[p + '.duration']),
                        ),
                      },
                      _ = p + '.dynamic-slot.data-set-id';
                    void 0 !== e.hlsMetadata[_] &&
                      (y['dynamic-id'] = e.hlsMetadata[_]),
                      d.push(y);
                  }
              }),
              d
            );
          })(e, ['pre-roll', 'post-roll']);
    }
    setupWatchers(e) {
      const n = [];
      e.forEach((e) => {
        const { start: d, duration: p } = e,
          h = new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            d,
            d + p,
          );
        n.push(h), this.rollMap.set(h, e);
      }),
        (this.watchers = n);
    }
    constructor(e) {
      var n, d, p;
      super(e),
        (n = this),
        (d = 'rollMap'),
        (p = new Map()),
        d in n
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p);
    }
  }
  function asyncGeneratorStep$x(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  class SkipAvailable extends PlaybackMonitor {
    handlePlaybackThreshold(e, n) {
      var d,
        p = this;
      return ((d = function* () {
        if (!p.skipMap.has(n)) return;
        const e = p.skipMap.get(n);
        p.dispatcher.publish(So.mediaSkipAvailable, e), p.skipMap.delete(n);
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (p, h) {
          var y = d.apply(e, n);
          function _next(e) {
            asyncGeneratorStep$x(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$x(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
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
        : (function (e) {
            const n = parseInt(e.hlsMetadata['skip.count'], 10),
              d = [];
            if (isNaN(n) || 0 === n) return d;
            for (let p = 0; p < n; p++) {
              const n = {
                start: parseFloat(e.hlsMetadata[`skip.${p}.start`]),
                duration: parseFloat(e.hlsMetadata[`skip.${p}.duration`]),
                target: parseFloat(e.hlsMetadata[`skip.${p}.target`]),
                label: e.hlsMetadata[`skip.${p}.label`],
              };
              void 0 !== e.hlsMetadata[`skip.${p}.promo.enabled`] &&
                (n.promo = {
                  enabled: 'true' === e.hlsMetadata[`skip.${p}.promo.enabled`],
                  image: e.hlsMetadata[`skip.${p}.promo.image`],
                  'image-height': parseInt(
                    e.hlsMetadata[`skip.${p}.promo.image-height`],
                    10,
                  ),
                  'image-width': parseInt(
                    e.hlsMetadata[`skip.${p}.promo.image-width`],
                    10,
                  ),
                  genre: e.hlsMetadata[`skip.${p}.promo.genre`],
                  'release-year': parseInt(
                    e.hlsMetadata[`skip.${p}.promo.release-year`],
                    10,
                  ),
                  'rating-display-name':
                    e.hlsMetadata[`skip.${p}.promo.rating-display-name`],
                  'rating-system':
                    e.hlsMetadata[`skip.${p}.promo.rating-system`],
                  'canonical-id': e.hlsMetadata[`skip.${p}.promo.canonical-id`],
                  title: e.hlsMetadata[`skip.${p}.promo.title`],
                  'rating-tag': e.hlsMetadata[`skip.${p}.promo.rating-tag`],
                  'rating-rank': e.hlsMetadata[`skip.${p}.promo.rating-rank`],
                  'up-next': {
                    'is-added':
                      'true' ===
                      e.hlsMetadata[`skip.${p}.promo.up-next.is-added`],
                    'add-label':
                      e.hlsMetadata[`skip.${p}.promo.up-next.add-label`],
                    'added-label':
                      e.hlsMetadata[`skip.${p}.promo.up-next.added-label`],
                  },
                  runtime: parseInt(
                    e.hlsMetadata[`skip.${p}.promo.runtime`],
                    10,
                  ),
                }),
                d.push(n);
            }
            return d;
          })(e);
    }
    setupWatchers(e) {
      const n = [];
      e.forEach((e) => {
        const { start: d, target: p, duration: h, promo: y } = e,
          _ = new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            d,
            y ? p : d + h,
          );
        n.push(_), this.skipMap.set(_, e);
      }),
        (this.watchers = n);
    }
    constructor(e) {
      var n, d, p;
      super(e),
        (n = this),
        (d = 'skipMap'),
        (p = new Map()),
        d in n
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p);
    }
  }
  function asyncGeneratorStep$w(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$G(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const hasContentCompletionThresholdData = (e) =>
      !isNaN(getUpNextStart(e)) && !isNaN(getWatchedTime(e)),
    getUpNextStart = (e) => parseFloat(e.hlsMetadata['up-next.start']),
    getWatchedTime = (e) => parseFloat(e.hlsMetadata['watched.time']),
    Po = (function () {
      var e,
        n =
          ((e = function* (e, n) {
            if (e.isUTS && e.assetURL)
              try {
                const d = generateAssetUrl(e, n),
                  p = yield Zn.fetchManifest(d);
                e.hlsMetadata = (function (e) {
                  for (var n = 1; n < arguments.length; n++) {
                    var d = null != arguments[n] ? arguments[n] : {},
                      p = Object.keys(d);
                    'function' == typeof Object.getOwnPropertySymbols &&
                      (p = p.concat(
                        Object.getOwnPropertySymbols(d).filter(function (e) {
                          return Object.getOwnPropertyDescriptor(d, e)
                            .enumerable;
                        }),
                      )),
                      p.forEach(function (n) {
                        _define_property$G(e, n, d[n]);
                      });
                  }
                  return e;
                })(
                  {},
                  e.hlsMetadata,
                  (function (e, n = {}) {
                    const d =
                        /^(?:#EXT-X-SESSION-DATA:?)DATA-ID="([^"]+)".+VALUE="([^"]+)".*$/,
                      p = {};
                    for (const h of e.split('\n')) {
                      const e = h.match(d);
                      if (e) {
                        let d = e[1];
                        e[1].startsWith('com.apple.hls.') &&
                          !1 !== n.stripPrefix &&
                          (d = e[1].slice('com.apple.hls.'.length));
                        const h = e[2];
                        p[d] = h;
                      }
                    }
                    return p;
                  })(p.content),
                );
              } catch (Q) {
                Be.error(Q.message, Q);
              }
          }),
          function () {
            var n = this,
              d = arguments;
            return new Promise(function (p, h) {
              var y = e.apply(n, d);
              function _next(e) {
                asyncGeneratorStep$w(y, p, h, _next, _throw, 'next', e);
              }
              function _throw(e) {
                asyncGeneratorStep$w(y, p, h, _next, _throw, 'throw', e);
              }
              _next(void 0);
            });
          });
      return function (e, d) {
        return n.apply(this, arguments);
      };
    })();
  function asyncGeneratorStep$v(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _ts_metadata$d(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class UpNextMonitor extends PlaybackMonitor {
    handlePlaybackThreshold() {
      var e,
        n = this;
      return ((e = function* () {
        n.dispatcher.publish(So.mediaUpNext);
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);
          function _next(e) {
            asyncGeneratorStep$v(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$v(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    shouldMonitor() {
      if (!super.shouldMonitor()) return !1;
      const e = this.playbackController.nowPlayingItem;
      return void 0 !== e && hasContentCompletionThresholdData(e);
    }
    startMonitor() {
      this.setupWatchers(), super.startMonitor();
    }
    setupWatchers() {
      const e = this.playbackController.nowPlayingItem;
      e &&
        hasContentCompletionThresholdData(e) &&
        (this.watchers = [
          new SpanWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            Math.round(this.getStartTime(e)),
            Number.POSITIVE_INFINITY,
          ),
        ]);
    }
    getStartTime(e) {
      const n = getUpNextStart(e);
      return isNaN(n) ? getWatchedTime(e) : n;
    }
    constructor(e) {
      super(e);
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$d('design:type', Function),
      _ts_metadata$d('design:paramtypes', []),
    ],
    UpNextMonitor.prototype,
    'handlePlaybackThreshold',
    null,
  );
  const Eo = getHlsJsCdnConfig(),
    To = {
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
        hls: Eo.hls,
        rtc: Eo.rtc,
        mediaApi: 'https://api.music.apple.com/v1',
        webPlayback: `https://${getCommerceHostname(
          'play',
        )}/WebObjects/MZPlay.woa/wa/webPlayback`,
      },
    },
    ko = JsonDevFlag.register('mk-offers-key-urls').get();
  function asyncGeneratorStep$u(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$u(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$u(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$u(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$F(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$e(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  let wo;
  ko && (To.urls.hlsOffersKeyUrls = ko);
  class Store {
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
      return this.storekit.authorizationStatus === Ae.RESTRICTED;
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
          this._dispatcher.publish(_t.apiStorefrontChanged, {
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
      var e = this;
      return _async_to_generator$u(function* () {
        if (e.storekit.userTokenIsValid) return e.storekit.userToken;
        let n;
        try {
          n = yield e.storekit.requestUserToken();
        } catch (Q) {
          try {
            yield e.unauthorize();
          } catch (Ut) {}
          throw new MKError(MKError.Reason.AUTHORIZATION_ERROR, 'Unauthorized');
        }
        return (
          e._providedRequestUserToken && (e.storekit.userToken = n),
          e.storekit.userTokenIsValid
            ? (yield e.storekit.requestStorefrontCountryCode().catch(
                (function () {
                  var n = _async_to_generator$u(function* (n) {
                    return yield e.unauthorize(), Promise.reject(n);
                  });
                  return function (e) {
                    return n.apply(this, arguments);
                  };
                })(),
              ),
              n)
            : void 0
        );
      })();
    }
    unauthorize() {
      var e = this;
      return _async_to_generator$u(function* () {
        return e.storekit.revokeUserToken();
      })();
    }
    constructor(n, d = {}) {
      _define_property$F(this, 'precache', void 0),
        _define_property$F(this, 'storekit', void 0),
        _define_property$F(this, '_apiStorefrontId', void 0),
        _define_property$F(this, '_defaultStorefrontCountryCode', void 0),
        _define_property$F(this, '_dispatcher', void 0),
        _define_property$F(this, '_hasAuthorized', !1),
        _define_property$F(this, '_metricsClientId', void 0),
        _define_property$F(this, '_providedRequestUserToken', !1),
        _define_property$F(this, '_ageVerificationRequired', (e, n) => !0),
        (this._dispatcher = d.services.dispatcher),
        d.precache && (this.precache = d.precache),
        d.storefrontId && (this.storefrontId = d.storefrontId),
        (this._defaultStorefrontCountryCode = d.storefrontCountryCode),
        (d.affiliateToken || d.campaignToken) &&
          (d.linkParameters = _object_spread_props$e(
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                'function' == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$F(e, n, d[n]);
                  });
              }
              return e;
            })({}, d.linkParameters || {}),
            { at: d.affiliateToken, ct: d.campaignToken },
          )),
        (this.storekit = new StoreKit(n, {
          apiBase: To.urls.mediaApi,
          authenticateMethod: To.features['legacy-authenticate-method']
            ? 'POST'
            : 'GET',
          deeplink: d.linkParameters,
          disableAuthBridge: d.disableAuthBridge,
          iconURL: To.app.icon,
          meParameters: d.meParameters,
          persist: d.persist,
          realm: d.realm || e.SKRealm.MUSIC,
        })),
        this.storekit.addEventListener(So.authorizationStatusDidChange, (e) => {
          const { authorizationStatus: n } = e;
          this._hasAuthorized = [Ae.AUTHORIZED, Ae.RESTRICTED].includes(n);
        });
    }
  }
  function formattedSeconds(e) {
    return {
      hours: Math.floor(e / 3600),
      minutes: Math.floor((e % 3600) / 60),
    };
  }
  function asyncGeneratorStep$t(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$t(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$t(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$t(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function hasAuthorization(e) {
    return (
      void 0 === e && (e = wo && wo.storekit),
      void 0 !== e && e.hasAuthorized && e.userTokenIsValid
    );
  }
  function hasMusicSubscription(e) {
    return _hasMusicSubscription.apply(this, arguments);
  }
  function _hasMusicSubscription() {
    return (_hasMusicSubscription = _async_to_generator$t(function* (e) {
      return void 0 === e && (e = wo && wo.storekit), e.hasMusicSubscription();
    })).apply(this, arguments);
  }
  function _define_property$E(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$c(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$c(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class MediaSessionManager {
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
            null !== (d = e.artistName) && void 0 !== d
              ? d
              : null === (n = e.attributes) || void 0 === n
                ? void 0
                : n.showTitle,
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
    constructor(e, n) {
      _define_property$E(this, 'capabilities', void 0),
        _define_property$E(this, 'dispatcher', void 0),
        _define_property$E(this, 'controller', void 0),
        _define_property$E(this, 'session', void 0),
        (this.capabilities = e),
        (this.dispatcher = n),
        (this.session = navigator.mediaSession),
        this.session &&
          (this.dispatcher.subscribe(
            So.nowPlayingItemDidChange,
            this.onNowPlayingItemDidChange,
          ),
          this.dispatcher.subscribe(
            So.capabilitiesChanged,
            this.onCapabilitiesChanged,
          ),
          this._setMediaSessionHandlers());
    }
  }
  function _define_property$D(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  var Io;
  _ts_decorate$c(
    [
      Bind(),
      _ts_metadata$c('design:type', Function),
      _ts_metadata$c('design:paramtypes', []),
    ],
    MediaSessionManager.prototype,
    'onCapabilitiesChanged',
    null,
  ),
    _ts_decorate$c(
      [
        Bind(),
        _ts_metadata$c('design:type', Function),
        _ts_metadata$c('design:paramtypes', [void 0, void 0]),
      ],
      MediaSessionManager.prototype,
      'onNowPlayingItemDidChange',
      null,
    ),
    (function (e) {
      (e[(e.PAUSE = 0)] = 'PAUSE'),
        (e[(e.EDIT_QUEUE = 1)] = 'EDIT_QUEUE'),
        (e[(e.SEEK = 2)] = 'SEEK'),
        (e[(e.REPEAT = 3)] = 'REPEAT'),
        (e[(e.SHUFFLE = 4)] = 'SHUFFLE'),
        (e[(e.SKIP_NEXT = 5)] = 'SKIP_NEXT'),
        (e[(e.SKIP_PREVIOUS = 6)] = 'SKIP_PREVIOUS'),
        (e[(e.SKIP_TO_ITEM = 7)] = 'SKIP_TO_ITEM'),
        (e[(e.AUTOPLAY = 8)] = 'AUTOPLAY'),
        (e[(e.VOLUME = 9)] = 'VOLUME');
    })(Io || (Io = {}));
  class Capabilities {
    set controller(e) {
      this._mediaSession.controller = e;
    }
    updateChecker(e) {
      this._checkCapability !== e &&
        ((this._checkCapability = e),
        this._dispatcher.publish(So.capabilitiesChanged));
    }
    get canEditPlaybackQueue() {
      return this._checkCapability(Io.EDIT_QUEUE);
    }
    get canPause() {
      return this._checkCapability(Io.PAUSE);
    }
    get canSeek() {
      return this._checkCapability(Io.SEEK);
    }
    get canSetRepeatMode() {
      return this._checkCapability(Io.REPEAT);
    }
    get canSetShuffleMode() {
      return this._checkCapability(Io.SHUFFLE);
    }
    get canSkipToNextItem() {
      return this._checkCapability(Io.SKIP_NEXT);
    }
    get canSkipToMediaItem() {
      return this._checkCapability(Io.SKIP_TO_ITEM);
    }
    get canSkipToPreviousItem() {
      return this._checkCapability(Io.SKIP_PREVIOUS);
    }
    get canAutoplay() {
      return this._checkCapability(Io.AUTOPLAY);
    }
    get canSetVolume() {
      return this._checkCapability(Io.VOLUME);
    }
    constructor(e) {
      _define_property$D(this, '_dispatcher', void 0),
        _define_property$D(this, '_checkCapability', void 0),
        _define_property$D(this, '_mediaSession', void 0),
        (this._dispatcher = e),
        (this._checkCapability = (e) => e === Io.VOLUME),
        (this._mediaSession = new MediaSessionManager(this, e));
    }
  }
  function _define_property$C(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function transform$6(e) {
    return (function (e) {
      for (var n = 1; n < arguments.length; n++) {
        var d = null != arguments[n] ? arguments[n] : {},
          p = Object.keys(d);
        'function' == typeof Object.getOwnPropertySymbols &&
          (p = p.concat(
            Object.getOwnPropertySymbols(d).filter(function (e) {
              return Object.getOwnPropertyDescriptor(d, e).enumerable;
            }),
          )),
          p.forEach(function (n) {
            _define_property$C(e, n, d[n]);
          });
      }
      return e;
    })(
      { attributes: {} },
      transform$8(
        {
          id: 'metadata.itemId',
          type: 'metadata.itemType',
          'attributes.contentRating'() {
            var n, d;
            if (
              1 ===
              (null === (d = e) ||
              void 0 === d ||
              null === (n = d.metadata) ||
              void 0 === n
                ? void 0
                : n.isExplicit)
            )
              return 'explicit';
          },
          'attributes.playParams'() {
            var n, d, p, h, y, _;
            return (
              0 !==
                (null === (d = e) ||
                void 0 === d ||
                null === (n = d.metadata) ||
                void 0 === n
                  ? void 0
                  : n.isPlayable) && {
                id:
                  null === (h = e) ||
                  void 0 === h ||
                  null === (p = h.metadata) ||
                  void 0 === p
                    ? void 0
                    : p.itemId,
                kind:
                  null === (_ = e) ||
                  void 0 === _ ||
                  null === (y = _.metadata) ||
                  void 0 === y
                    ? void 0
                    : y.itemType,
              }
            );
          },
          'container.id': 'metadata.containerId',
          'container.name': 'metadata.containerName',
          'container.type': 'metadata.containerType',
        },
        e,
      ),
    );
  }
  function _define_property$B(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$l(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$B(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$d(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const Oo = {
    condition: () => !0,
    toOptions: (e, n, d) => [
      _object_spread_props$d(_object_spread$l({}, e), { context: d }),
    ],
  };
  function _define_property$A(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$k(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$A(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$c(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const Ao = {
      condition: (e) => {
        var n;
        return (
          'stations' === e.type &&
          (null === (n = e.attributes) || void 0 === n ? void 0 : n.isLive)
        );
      },
      toOptions: (e, n, d) => {
        var p;
        return [
          _object_spread_props$c(_object_spread$k({}, e), {
            context: d,
            container: {
              attributes: e.attributes,
              id: e.id,
              type: e.type,
              name: null === (p = d) || void 0 === p ? void 0 : p.featureName,
            },
          }),
        ];
      },
    },
    typeIs =
      (...e) =>
      ({ type: n }) =>
        e.includes(n),
    withBagPrefix = (e) => {
      if (void 0 === e || '' === e) return;
      const { prefix: n } = To;
      return n ? `${n}:${e}` : e;
    };
  function _define_property$z(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$b(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Ro;
  const getContainerName$1 = (e, n) => {
      var d, p;
      return null !==
        (Ro =
          null != n
            ? n
            : null === (p = e) ||
                void 0 === p ||
                null === (d = p.container) ||
                void 0 === d
              ? void 0
              : d.name) && void 0 !== Ro
        ? Ro
        : mt.SONG;
    },
    $o = {
      toOptions: (e, n, d) => {
        var p;
        const h = _object_spread_props$b(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              'function' == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$z(e, n, d[n]);
                });
            }
            return e;
          })({ id: e.id }, n),
          {
            name: withBagPrefix(
              getContainerName$1(
                e,
                null === (p = d) || void 0 === p ? void 0 : p.featureName,
              ),
            ),
          },
        );
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
    };
  function _define_property$y(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$i(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$y(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$a(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const parseAssets = ({ type: e, attributes: { assetTokens: n } }) =>
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
    Co = {
      condition: typeIs(
        'uploaded-audios',
        'uploadedAudio',
        'uploaded-videos',
        'uploadedVideo',
      ),
      toOptions: (e, n, d) => {
        var p, h, y, _;
        const m = _object_spread_props$a(_object_spread$i({}, e), {
          context: d,
          attributes: _object_spread_props$a(
            _object_spread$i({}, e.attributes),
            {
              assetUrl: parseAssets(e),
              playParams:
                null !==
                  (_ =
                    null === (h = e) ||
                    void 0 === h ||
                    null === (p = h.attributes) ||
                    void 0 === p
                      ? void 0
                      : p.playParams) && void 0 !== _
                  ? _
                  : { id: e.id, kind: e.type },
            },
          ),
        });
        var g;
        (void 0 !== n && (m.container = n),
        void 0 !==
          (null === (y = d) || void 0 === y ? void 0 : y.featureName)) &&
          (m.container = _object_spread_props$a(
            _object_spread$i({}, m.container),
            { name: null === (g = d) || void 0 === g ? void 0 : g.featureName },
          ));
        return [m];
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
              e.movementNumber),
        ).length > 0
      );
    })(e.relationships.tracks.data);
    return 'albums' === e.type || 'library-albums' === e.type
      ? d
        ? mt.ALBUM_CLASSICAL
        : mt.ALBUM
      : 'playlists' === e.type || 'library-playlists' === e.type
        ? d
          ? mt.PLAYLIST_CLASSICAL
          : mt.PLAYLIST
        : void 0;
  };
  var Mo;
  const Do = [
      {
        toOptions: (e, n, d) => {
          var p;
          const h = {
            attributes: e.attributes,
            id: e.id,
            type: e.type,
            name: withBagPrefix(
              getFeatureName(
                e,
                null === (p = d) || void 0 === p ? void 0 : p.featureName,
              ),
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
          ((Mo = 'tracks'),
          (e) => {
            var n, d;
            return !!(null === (d = e.relationships) ||
            void 0 === d ||
            null === (n = d[Mo]) ||
            void 0 === n
              ? void 0
              : n.data);
          }),
        requiredRelationships: ['tracks'],
      },
      $o,
      Ao,
      Co,
    ],
    xo = Do.reduce((e, n) => {
      const d = n.requiredRelationships;
      return d && e.push(...d), e;
    }, []),
    Lo = new Set(xo),
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
    isQueueURLOption = (e) => e && e.url;
  function _define_property$x(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const No = He.linkChild(new Logger('queue')),
    descriptorToMediaItems = (e) => {
      if (!isQueueItems(e) && !isQueueLoaded(e)) return [];
      const n = isQueueLoaded(e)
        ? loadedDescriptorToMediaItem(e)
        : unloadedDescriptorToMediaItem(e);
      return (
        n.forEach(
          (n) =>
            (n.context = (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var d = null != arguments[n] ? arguments[n] : {},
                  p = Object.keys(d);
                'function' == typeof Object.getOwnPropertySymbols &&
                  (p = p.concat(
                    Object.getOwnPropertySymbols(d).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(d, e).enumerable;
                    }),
                  )),
                  p.forEach(function (n) {
                    _define_property$x(e, n, d[n]);
                  });
              }
              return e;
            })({}, e.context, n.context)),
        ),
        n
      );
    },
    unloadedDescriptorToMediaItem = ({ items: e }) =>
      isArrayOf(e, isMPMediaItem)
        ? e.map((e) => new MediaItem(transform$6(e)))
        : isArrayOf(e, isMediaItem)
          ? e.map((e) => new MediaItem(e))
          : [],
    loadedDescriptorToMediaItem = (e) => {
      const n = [],
        { loaded: d, container: p, context: h } = e;
      return void 0 === d
        ? []
        : isArrayOf(d, isDataRecord)
          ? (d.forEach((e) => {
              n.push(...dataRecordToMediaItems(e, p, h));
            }),
            n)
          : isArrayOf(d, isMediaAPIResource)
            ? (d.forEach((e) => {
                n.push(...resourceToMediaItem(e, p, h));
              }),
              n)
            : isDataRecord(d)
              ? dataRecordToMediaItems(d, p, h)
              : isMediaAPIResource(d)
                ? resourceToMediaItem(d, p, h)
                : [];
    },
    dataRecordToMediaItems = (e, n, d = {}) => {
      const { data: p } = e.serialize(!0, void 0, {
        includeRelationships: Lo,
        allowFullDuplicateSerializations: !0,
      });
      return resourceToMediaItem(p, n, d);
    },
    resourceToMediaItem = (e, n, d = {}) => (
      No.debug('_resourceToMediaItem', e),
      ((e, n, d = {}) => {
        var p, h, y, _;
        n =
          null !==
            (y =
              null === (h = n) ||
              void 0 === h ||
              null === (p = h.serialize) ||
              void 0 === p
                ? void 0
                : p.call(h).data) && void 0 !== y
            ? y
            : n;
        return (
          null !== (_ = Do.find((p) => p.condition(e, n, d))) && void 0 !== _
            ? _
            : Oo
        )
          .toOptions(e, n, d)
          .map((e) => new MediaItem(e));
      })(e, n, d)
    );
  function _define_property$w(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  class BaseModifiableQueue {
    append(e) {
      Be.warn('Append is not supported for this type of playback');
    }
    clear() {
      Be.warn('Clear is not supported for this type of playback');
    }
    insertAt(e, n) {
      Be.warn('InsertAt is not supported for this type of playback');
    }
    prepend(e, n = !1) {
      Be.warn('Prepend is not supported for this type of playback');
    }
    constructor() {
      _define_property$w(this, 'queue', void 0),
        _define_property$w(this, 'canModifyQueue', !1);
    }
  }
  class ModifiableQueue {
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
        p = this.queue.position + 1;
      n && this.queue.splice(p, this.queue.length), this.queue.splice(p, 0, d);
    }
    constructor(e, n) {
      _define_property$w(this, 'queue', void 0),
        _define_property$w(this, 'canModifyQueue', !0),
        _define_property$w(this, '_mediaItemPlayback', void 0),
        (this.queue = e),
        (this._mediaItemPlayback = n);
    }
  }
  function _define_property$v(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  var jo;
  (e.PlayerRepeatMode = void 0),
    ((jo = e.PlayerRepeatMode || (e.PlayerRepeatMode = {}))[(jo.none = 0)] =
      'none'),
    (jo[(jo.one = 1)] = 'one'),
    (jo[(jo.all = 2)] = 'all');
  class BaseRepeatable {
    get repeatMode() {
      return e.PlayerRepeatMode.none;
    }
    set repeatMode(e) {
      e !== this.repeatMode &&
        Be.warn('setting repeatMode is not supported in this playback method');
    }
    constructor() {
      _define_property$v(this, 'canSetRepeatMode', !1);
    }
  }
  class Repeatable {
    get repeatMode() {
      return this._repeatMode;
    }
    set repeatMode(n) {
      n in e.PlayerRepeatMode &&
        n !== this._repeatMode &&
        ((this._repeatMode = n),
        this.dispatcher.publish(So.repeatModeDidChange, this._repeatMode));
    }
    constructor(n, d = e.PlayerRepeatMode.none) {
      _define_property$v(this, 'canSetRepeatMode', !0),
        _define_property$v(this, 'dispatcher', void 0),
        _define_property$v(this, '_repeatMode', void 0),
        (this.dispatcher = n),
        (this._repeatMode = d);
    }
  }
  function _define_property$u(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function asyncGeneratorStep$s(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$s(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$s(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$s(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$t(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$u(e, n, d[n]);
        });
    }
  })({}, { NEXT_ITEM: 'NEXT' }, e.PlayActivityEndReasonType);
  const Uo = ['musicVideo'],
    Bo = (function () {
      var e = _async_to_generator$s(function* () {});
      return function () {
        return e.apply(this, arguments);
      };
    })();
  class BaseSeekable {
    getSeekSeconds(e) {
      return (
        Be.warn(
          'Seeking by predetermined amounts are not supported in this playback method',
        ),
        { BACK: 0, FORWARD: 0 }
      );
    }
    seekBackward(e = Bo) {
      Be.warn('seekBackward is not supported in this playback method');
    }
    seekForward(e = Bo) {
      Be.warn('seekForward is not supported in this playback method');
    }
    seekToTime(e, n) {
      return _async_to_generator$s(function* () {
        Be.warn('seekToTime is not supported in this playback method');
      })();
    }
    constructor(e) {
      _define_property$t(this, 'mediaItemPlayback', void 0),
        _define_property$t(this, 'canSeek', void 0),
        (this.mediaItemPlayback = e),
        (this.canSeek = !1);
    }
  }
  class Seekable {
    getSeekSeconds(e) {
      return ((e) => {
        var n, d, p;
        return (null === (n = e) || void 0 === n ? void 0 : n.isUTS) ||
          Uo.includes(null === (d = e) || void 0 === d ? void 0 : d.type)
          ? { FORWARD: 10, BACK: 10 }
          : (null === (p = e) || void 0 === p ? void 0 : p.isAOD)
            ? { FORWARD: 30, BACK: 30 }
            : { FORWARD: 30, BACK: 15 };
      })(e);
    }
    seekBackward(e = this._seekToBeginning) {
      var n = this;
      return _async_to_generator$s(function* () {
        if (void 0 === n.mediaItemPlayback.nowPlayingItem)
          return void Be.warn(
            'Cannot seekBackward when nowPlayingItem is not yet set.',
          );
        const d =
          n.mediaItemPlayback.currentPlaybackTime -
          n.getSeekSeconds(n.mediaItemPlayback.nowPlayingItem).BACK;
        d < 0 ? yield e.call(n) : yield n.seekToTime(d, St.Interval);
      })();
    }
    seekForward(e = this._seekToEnd) {
      var n = this;
      return _async_to_generator$s(function* () {
        if (void 0 === n.mediaItemPlayback.nowPlayingItem)
          return void Be.warn(
            'Cannot seekForward when nowPlayingItem is not yet set.',
          );
        const d =
          n.mediaItemPlayback.currentPlaybackTime +
          n.getSeekSeconds(n.mediaItemPlayback.nowPlayingItem).FORWARD;
        d > n.mediaItemPlayback.currentPlaybackDuration
          ? yield e.call(n)
          : yield n.seekToTime(d, St.Interval);
      })();
    }
    seekToTime(e, n = St.Manual) {
      var d = this;
      return _async_to_generator$s(function* () {
        if (void 0 === d.mediaItemPlayback.nowPlayingItem)
          return void Be.warn(
            'Cannot seekToTime when nowPlayingItem is not yet set.',
          );
        const p = d.mediaItemPlayback.nowPlayingItem,
          h = d.mediaItemPlayback.currentPlaybackTime,
          y = d.mediaItemPlayback.currentPlayingDate,
          _ = Math.min(
            Math.max(0, e),
            d.mediaItemPlayback.currentPlaybackDuration,
          );
        let m;
        if (p.isLinearStream && void 0 !== y) {
          const e = 1e3 * (_ - h);
          m = new Date(y.getTime() + e);
        }
        yield d.mediaItemPlayback.seekToTime(_, n),
          d._dispatcher.publish(_t.playbackSeek, {
            item: p,
            startPosition: h,
            position: _,
            playingDate: m,
            startPlayingDate: y,
            seekReasonType: n,
          });
      })();
    }
    _seekToBeginning() {
      var e = this;
      return _async_to_generator$s(function* () {
        yield e.seekToTime(0, St.Interval);
      })();
    }
    _seekToEnd() {
      var e = this;
      return _async_to_generator$s(function* () {
        yield e.seekToTime(
          e.mediaItemPlayback.currentPlaybackDuration,
          St.Interval,
        );
      })();
    }
    constructor(e, n) {
      _define_property$t(this, '_dispatcher', void 0),
        _define_property$t(this, 'mediaItemPlayback', void 0),
        _define_property$t(this, 'canSeek', void 0),
        (this._dispatcher = e),
        (this.mediaItemPlayback = n),
        (this.canSeek = !0);
    }
  }
  const shuffleCollection = (e) => {
    const n = [...e],
      { length: d } = n;
    for (let p = 0; p < d; ++p) {
      const e = p + Math.floor(Math.random() * (d - p)),
        h = n[e];
      (n[e] = n[p]), (n[p] = h);
    }
    return n;
  };
  function deprecationWarning(e, n = {}) {
    var d;
    const p =
        null !== (d = n.message) && void 0 !== d
          ? d
          : e + ' has been deprecated',
      h = [];
    n.since && h.push('since: ' + n.since),
      n.until && h.push('until: ' + n.until),
      console.warn(
        'Deprecation Warning: ' +
          p +
          (h.length > 0 ? ` (${h.join(', ')})` : ''),
      );
  }
  function _define_property$s(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_without_properties$1(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  const Fo = He.createChild('queue');
  class QueueItem {
    restrict() {
      return this.item.restrict();
    }
    constructor(e, n) {
      var d, p;
      _define_property$s(this, 'isAutoplay', !1),
        _define_property$s(this, 'item', void 0),
        (this.item = e),
        (this.isAutoplay =
          null !==
            (p = null === (d = n) || void 0 === d ? void 0 : d.isAutoplay) &&
          void 0 !== p &&
          p);
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
        d = _object_without_properties$1(e, ['url']),
        { contentId: p, kind: h, storefrontId: y } = formattedMediaURL(n);
      return (
        h && (d[h] = p),
        y && (wo.storefrontId = y),
        Fo.debug('parseQueueURLOption', d),
        d
      );
    },
    { queueItemsDidChange: Ko, queuePositionDidChange: Go } = So;
  class Queue {
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
        this._unplayedQueueItems.filter((e) => !e.isAutoplay),
      );
    }
    get playableItems() {
      return toMediaItems(
        this._queueItems.filter((e) => canPlay(e.item, this.playbackMode)),
      );
    }
    get unplayedPlayableItems() {
      return toMediaItems(
        this._unplayedQueueItems.filter((e) =>
          canPlay(e.item, this.playbackMode),
        ),
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
        (this._nextPlayableItemIndex = this.findPlayableIndexForward()),
        this._nextPlayableItemIndex
      );
    }
    get position() {
      return this._position;
    }
    set position(e) {
      this._updatePosition(e);
    }
    get isInitiated() {
      return this.position >= 0;
    }
    get previousPlayableItem() {
      if (-1 !== this.previousPlayableItemIndex)
        return this.item(this.previousPlayableItemIndex);
    }
    get previousPlayableItemIndex() {
      return this.findPlayableIndexBackward();
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
    updateItems(e) {
      (this._queueItems = toQueueItems(e)),
        this._reindex(),
        this._dispatcher.publish(So.queueItemsDidChange, this.items);
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
        throw new MKError(MKError.Reason.INVALID_ARGUMENTS);
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
    spliceQueueItems(e, n, d = [], p = !0) {
      d = d.filter((e) => {
        var n;
        return isPlayable(
          null === (n = e) || void 0 === n ? void 0 : n.item,
          this.playbackMode,
        );
      });
      const h = this._queueItems.splice(e, n, ...d);
      return (
        this._itemIDs.splice(e, n, ...d.map((e) => e.item.id)),
        p &&
          (this._dispatcher.publish(_t.queueModified, {
            start: e,
            added: toMediaItems(d),
            removed: toMediaItems(h),
          }),
          this._dispatcher.publish(Ko, this.items)),
        h
      );
    }
    reset() {
      const e = this.position;
      (this._position = -1),
        this._dispatcher.publish(Go, {
          oldPosition: e,
          position: this.position,
        });
    }
    _isSameItems(e) {
      if (e.length !== this.length) return !1;
      const n = e.map((e) => e.id).sort(),
        d = [...this._itemIDs].sort();
      let p, h;
      try {
        (p = JSON.stringify(n)), (h = JSON.stringify(d));
      } catch (Ut) {
        return !1;
      }
      return p === h;
    }
    _reindex() {
      this._queueItems &&
        (this._itemIDs = this._queueItems.map((e) => e.item.id));
    }
    _updatePosition(e) {
      if (e === this._position) return;
      const n = this._position;
      this._position = e;
      const d = this.item(e);
      (d && canPlay(d, this.playbackMode)) ||
        (this._position = this.findPlayableIndexForward(e)),
        this._position !== n &&
          this._dispatcher.publish(Go, {
            oldPosition: n,
            position: this._position,
          });
    }
    findPlayableIndexForward(n = this.position) {
      var d;
      if (this.isEmpty) return -1;
      if (this.isInitiated && !indexInBounds([0, this.position], n)) return -1;
      const p =
        null === (d = this.repeatable) || void 0 === d ? void 0 : d.repeatMode;
      if (n < this.length)
        for (let e = n + 1; e < this.length; e++) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      if (p === e.PlayerRepeatMode.all)
        for (let e = 0; e <= n; e++) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      return -1;
    }
    findPlayableIndexBackward(n = this.position) {
      var d;
      if (this.isEmpty) return -1;
      if (!indexInBounds([0, this.position], n)) return -1;
      const p =
        null === (d = this.repeatable) || void 0 === d ? void 0 : d.repeatMode;
      if (n > 0)
        for (let e = n - 1; e >= 0; e--) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
        }
      if (p === e.PlayerRepeatMode.all)
        for (let e = this.length - 1; e >= n; e--) {
          if (canPlay(this.item(e), this.playbackMode)) return e;
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
    constructor(n) {
      if (
        (_define_property$s(this, 'repeatable', void 0),
        _define_property$s(this, 'hasAutoplayStation', !1),
        _define_property$s(this, 'playbackMode', e.PlaybackMode.MIXED_CONTENT),
        _define_property$s(this, '_itemIDs', []),
        _define_property$s(this, '_queueItems', []),
        _define_property$s(this, '_isRestricted', !1),
        _define_property$s(this, '_nextPlayableItemIndex', -1),
        _define_property$s(this, '_position', -1),
        _define_property$s(this, '_dispatcher', void 0),
        (this._dispatcher = n.services.dispatcher),
        (this.playbackMode = n.playbackMode),
        !n.descriptor)
      )
        return;
      const d = descriptorToMediaItems(n.descriptor).filter((e) =>
        isPlayable(e, this.playbackMode),
      );
      (this._queueItems = toQueueItems(d)),
        this._reindex(),
        void 0 !== n.descriptor.startWith &&
          (this.position = this._getStartItemPosition(n.descriptor.startWith));
    }
  }
  function isPlayable(n, d) {
    return (
      n.isPlayable ||
      (d !== e.PlaybackMode.FULL_PLAYBACK_ONLY && void 0 !== n.previewURL)
    );
  }
  function canPlay(e, n) {
    return (
      isPlayable(e, n) &&
      !(function (e) {
        return e.isRestricted;
      })(e) &&
      !(function (e) {
        return e.isUnavailable;
      })(e)
    );
  }
  function indexInBounds(e, n) {
    return e[0] <= n && n <= e[1];
  }
  function _define_property$r(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$b(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  var Vo;
  (e.PlayerShuffleMode = void 0),
    ((Vo = e.PlayerShuffleMode || (e.PlayerShuffleMode = {}))[(Vo.off = 0)] =
      'off'),
    (Vo[(Vo.songs = 1)] = 'songs');
  const Ho = 'Shuffling is not supported in this playback method.';
  class BaseShuffler {
    set shuffle(e) {
      Be.warn(Ho);
    }
    get shuffleMode() {
      return e.PlayerShuffleMode.off;
    }
    set shuffleMode(e) {
      Be.warn(Ho);
    }
    checkAndReshuffle(e) {
      Be.warn(Ho);
    }
    constructor() {
      _define_property$r(this, 'canSetShuffleMode', !1),
        _define_property$r(this, 'queue', void 0);
    }
  }
  class Shuffler {
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
      const { start: d, added: p, removed: h } = n;
      if (h.length > 0) {
        const e = h.map((e) => e.id);
        this._unshuffledIDs = this._unshuffledIDs.filter((n) => !e.includes(n));
      }
      p.length > 0 && this._unshuffledIDs.splice(d, 0, ...p.map((e) => e.id));
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
        (Be.debug(`mk: set shuffleMode from ${this.shuffleMode} to ${n}`),
        (this.mode = n),
        this.mode === e.PlayerShuffleMode.songs
          ? this.shuffleQueue()
          : this.unshuffleQueue(),
        this.controller.nowPlayingItem &&
          (this._queue.position = this._queue.indexForItem(
            this.controller.nowPlayingItem.id,
          )),
        this.dispatcher.publish(So.shuffleModeDidChange, this.shuffleMode));
    }
    checkAndReshuffle(n = !1) {
      this.shuffleMode === e.PlayerShuffleMode.songs && this.shuffleQueue(n);
    }
    shuffleQueue(e = !0) {
      const { userAddedItems: n } = this._queue;
      if (n.length <= 1) return n;
      const d = n.slice(0),
        p = this._queue.position > -1 ? d.splice(this._queue.position, 1) : [];
      let h = [];
      do {
        h = shuffleCollection(d);
      } while (d.length > 1 && arrayEquals(h, d));
      const y = [...p, ...h];
      (this._isSpliceFromShuffle = !0),
        this._queue.spliceQueueItems(0, y.length, toQueueItems(y), e);
    }
    unshuffleQueue(e = !0) {
      let n = [];
      const d = this._unshuffledIDs.reduce((e, n, d) => ((e[n] = d), e), {}),
        p = [];
      let h = 0;
      const y = this._queue.item(this._queue.position);
      this._queue.userAddedItems.forEach((e) => {
        var _;
        const m = d[e.id];
        void 0 === m && p.push(e),
          (n[m] = e),
          e.id === (null === (_ = y) || void 0 === _ ? void 0 : _.id) &&
            (h = m);
      }),
        (n = n.filter(Boolean));
      const _ = n.concat(p);
      (this._isSpliceFromShuffle = !0),
        this._queue.spliceQueueItems(0, _.length, toQueueItems(_), e),
        (this._queue.position = h);
    }
    constructor(n, { dispatcher: d }) {
      _define_property$r(this, 'controller', void 0),
        _define_property$r(this, 'canSetShuffleMode', void 0),
        _define_property$r(this, 'dispatcher', void 0),
        _define_property$r(this, 'mode', void 0),
        _define_property$r(this, '_queue', void 0),
        _define_property$r(this, '_unshuffledIDs', void 0),
        _define_property$r(this, '_isSpliceFromShuffle', void 0),
        (this.controller = n),
        (this.canSetShuffleMode = !0),
        (this.mode = e.PlayerShuffleMode.off),
        (this._unshuffledIDs = []),
        (this._isSpliceFromShuffle = !1),
        (this.dispatcher = d),
        this.dispatcher.subscribe(_t.queueModified, this.queueModifiedHandler),
        (this._queue = n.queue);
    }
  }
  function asyncGeneratorStep$r(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$r(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$r(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$r(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$q(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$f(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$q(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$9(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _ts_metadata$a(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  var qo;
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$b('design:type', Function),
      _ts_metadata$b('design:paramtypes', [String, Object]),
    ],
    Shuffler.prototype,
    'queueModifiedHandler',
    null,
  ),
    (function (e) {
      (e.continuous = 'continuous'), (e.serial = 'serial');
    })(qo || (qo = {}));
  const { queueItemsDidChange: Wo } = So;
  class PlaybackController {
    get isDestroyed() {
      return this._isDestroyed;
    }
    updateAutoplay(e, n) {
      this.autoplayEnabled = n;
    }
    constructContext(e, n) {
      var d;
      let p = e.context;
      var h;
      return (
        void 0 !== e.featureName &&
          void 0 ===
            (null === (d = p) || void 0 === d ? void 0 : d.featureName) &&
          (Be.warn('featureName is deprecated, pass it inside context'),
          p || (p = {}),
          (p.featureName = e.featureName)),
        null !== (h = null != p ? p : n) && void 0 !== h ? h : {}
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
    get playbackMode() {
      return this._playbackMode;
    }
    set playbackMode(e) {
      (this._playbackMode = e), this.queue && (this.queue.playbackMode = e);
    }
    get queue() {
      return this._queue;
    }
    set queue(e) {
      this._prepareQueue(e),
        (this._queue = e),
        (this._shuffler.queue = this._queue),
        (this._queueModifier.queue = this._queue),
        this._dispatcher.publish(Wo, e.items);
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
      if (n) {
        var d = this;
        n.addEventListener(
          xe.authorizationStatusWillChange,
          (function () {
            var n = _async_to_generator$r(function* ({
              authorizationStatus: n,
              newAuthorizationStatus: p,
            }) {
              n > Ae.DENIED && p < Ae.RESTRICTED
                ? yield d.stop({
                    endReasonType:
                      e.PlayActivityEndReasonType.PLAYBACK_SUSPENDED,
                    userInitiated: !1,
                  })
                : yield d.stop({ userInitiated: !1 });
            });
            return function (e) {
              return n.apply(this, arguments);
            };
          })(),
        ),
          (this._storekit = n);
      }
    }
    append(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        const d = yield n._dataForQueueOptions(e);
        return n._queueModifier.append(d), n.queue;
      })();
    }
    insertAt(e, n) {
      var d = this;
      return _async_to_generator$r(function* () {
        const p = yield d._dataForQueueOptions(n);
        return d._queueModifier.insertAt(e, p), d.queue;
      })();
    }
    _dataForQueueOptions(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        const d = n.constructContext(e, n.context);
        return _object_spread_props$9(_object_spread$f({}, e), { context: d });
      })();
    }
    clear() {
      var e = this;
      return _async_to_generator$r(function* () {
        return e._queueModifier.clear(), e.queue;
      })();
    }
    changeToMediaAtIndex(e = 0) {
      var n = this;
      return _async_to_generator$r(function* () {
        var d, p, h, y;
        yield n.stop();
        const _ =
          null === (d = n.queue.item(e)) || void 0 === d ? void 0 : d.id;
        let m =
          (null ===
            (y =
              null === (h = n._mediaItemPlayback) ||
              void 0 === h ||
              null === (p = h.playOptions) ||
              void 0 === p
                ? void 0
                : p.get(_)) || void 0 === y
            ? void 0
            : y.startTime) || 0;
        const g = yield n._changeToMediaAtIndex(e, { userInitiated: !0 });
        g &&
          (g.id !== _ && (m = 0),
          n._dispatcher.publish(_t.playbackPlay, { item: g, position: m }));
      })();
    }
    changeToMediaItem(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        const d = n.queue.indexForItem(e);
        return -1 === d
          ? Promise.reject(new MKError(MKError.Reason.MEDIA_DESCRIPTOR))
          : n.changeToMediaAtIndex(d);
      })();
    }
    activate() {
      Be.debug('mk: base controller - activate'),
        this._dispatcher.unsubscribe(
          So.playbackStateDidChange,
          this.onPlaybackStateDidChange,
        ),
        this._dispatcher.subscribe(
          So.playbackStateDidChange,
          this.onPlaybackStateDidChange,
        ),
        this._skipIntro.activate(),
        this._upNext.activate(),
        this._rollMonitor.activate();
    }
    deactivate() {
      var e = this;
      return _async_to_generator$r(function* () {
        yield e.stop(),
          e._dispatcher.unsubscribe(
            So.playbackStateDidChange,
            e.onPlaybackStateDidChange,
          ),
          e._skipIntro.deactivate(),
          e._upNext.deactivate(),
          e._rollMonitor.deactivate();
      })();
    }
    destroy() {
      var e = this;
      return _async_to_generator$r(function* () {
        (e._isDestroyed = !0),
          yield e.deactivate(),
          e._dispatcher.unsubscribe(
            So.autoplayEnabledDidChange,
            e.updateAutoplay,
          );
      })();
    }
    hasCapabilities(e) {
      switch (e) {
        case Io.SEEK:
          return this._seekable.canSeek;
        case Io.REPEAT:
          return this._repeatable.canSetRepeatMode;
        case Io.SHUFFLE:
          return this._shuffler.canSetShuffleMode;
        case Io.EDIT_QUEUE:
          return this._queueModifier.canModifyQueue;
        case Io.PAUSE:
        case Io.SKIP_NEXT:
        case Io.SKIP_TO_ITEM:
        case Io.AUTOPLAY:
        case Io.VOLUME:
          return !0;
        case Io.SKIP_PREVIOUS:
        default:
          return !1;
      }
    }
    pause(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        return n._mediaItemPlayback.pause(e);
      })();
    }
    play() {
      var e = this;
      return _async_to_generator$r(function* () {
        if (e.nowPlayingItem) return e._mediaItemPlayback.play();
        if (!e._queue || e._queue.isEmpty) return;
        if (e.nowPlayingItemIndex >= 0)
          return e.changeToMediaAtIndex(e.nowPlayingItemIndex);
        const { queue: n } = e;
        if (-1 !== n.nextPlayableItemIndex)
          return e.changeToMediaAtIndex(n.nextPlayableItemIndex);
        n.isRestricted &&
          n.items.every((e) => e.isRestricted) &&
          e._dispatcher.publish(
            So.mediaPlaybackError,
            new MKError(
              MKError.Reason.CONTENT_RESTRICTED,
              'Content restricted',
            ),
          );
      })();
    }
    playSingleMediaItem(e, n) {
      var d = this;
      return _async_to_generator$r(function* () {
        yield Po(e, n), d._dispatcher.publish(So.queueItemsDidChange, [e]);
        const p = yield d._mediaItemPlayback.startMediaItemPlayback(e, !0);
        if (p) {
          var h;
          const e = {
            item: p,
            position:
              null !== (h = d._mediaItemPlayback.currentPlaybackTime) &&
              void 0 !== h
                ? h
                : 0,
            playingDate: d._mediaItemPlayback.currentPlayingDate,
            userInitiated: !0,
          };
          Be.debug(
            'playSingleMediaItem: Dispatching DispatchTypes.playbackPlay event',
            e,
          ),
            d._dispatcher.publish(_t.playbackPlay, e);
        }
      })();
    }
    onPlaybackStateDidChange(n, d) {
      var p = this;
      return _async_to_generator$r(function* () {
        d.state === e.PlaybackStates.ended &&
          (p.continuous || p.repeatMode === e.PlayerRepeatMode.one) &&
          (Be.debug(
            'controller detected track ended event, moving to next item.',
          ),
          p._dispatcher.publish(_t.applicationActivityIntent, {
            endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            userInitiated: !1,
          }),
          yield p._next());
      })();
    }
    preload() {
      var e = this;
      return _async_to_generator$r(function* () {
        return e._mediaItemPlayback.preload();
      })();
    }
    prepend(e, n) {
      var d = this;
      return _async_to_generator$r(function* () {
        const p = yield d._dataForQueueOptions(e);
        return d._queueModifier.prepend(p, n), d.queue;
      })();
    }
    prepareToPlay(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        return n._mediaItemPlayback.prepareToPlay(e);
      })();
    }
    showPlaybackTargetPicker() {
      this._mediaItemPlayback.showPlaybackTargetPicker();
    }
    seekBackward() {
      var e = this;
      return _async_to_generator$r(function* () {
        return e._seekable.seekBackward();
      })();
    }
    seekForward() {
      var e = this;
      return _async_to_generator$r(function* () {
        return e._seekable.seekForward(e.skipToNextItem.bind(e));
      })();
    }
    skipToNextItem() {
      var e = this;
      return _async_to_generator$r(function* () {
        return e._next({ userInitiated: !0 });
      })();
    }
    skipToPreviousItem() {
      var e = this;
      return _async_to_generator$r(function* () {
        return e._previous({ userInitiated: !0 });
      })();
    }
    getNewSeeker() {
      return this._mediaItemPlayback.getNewSeeker();
    }
    seekToTime(e, n) {
      var d = this;
      return _async_to_generator$r(function* () {
        yield d._seekable.seekToTime(e, n);
      })();
    }
    setQueue(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        return (
          yield n.extractGlobalValues(e),
          yield n._mediaItemPlayback.stop(),
          n.returnQueueForOptions(e)
        );
      })();
    }
    extractGlobalValues(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        (n._context = n.constructContext(e)),
          void 0 !== e.featureName &&
            e.context &&
            (Be.warn('featureName is deprecated, pass it inside context'),
            (e.context.featureName = e.featureName));
      })();
    }
    stop(e) {
      var n = this;
      return _async_to_generator$r(function* () {
        yield n._mediaItemPlayback.stop(e);
      })();
    }
    _changeToMediaAtIndex(e = 0, n = {}) {
      var d = this;
      return _async_to_generator$r(function* () {
        if (d.queue.isEmpty) return;
        d.queue.position = e;
        const p = d.queue.item(d.queue.position);
        if (!p) return;
        var h;
        const y = yield d._mediaItemPlayback.startMediaItemPlayback(
          p,
          null !== (h = n.userInitiated) && void 0 !== h && h,
        );
        if (y || p.state !== F.unsupported) return y;
        yield d.skipToNextItem();
      })();
    }
    _next(n = {}) {
      var d = this;
      return _async_to_generator$r(function* () {
        if (d.queue.isEmpty) return;
        const { userInitiated: p = !1 } = n;
        return d.repeatMode === e.PlayerRepeatMode.one &&
          void 0 !== d.queue.currentItem
          ? (yield d.stop(_object_spread$f({ userInitiated: p }, n)),
            void (yield d.play()))
          : (!p &&
              n.seamlessAudioTransition &&
              (d._dispatcher.publish(
                _t.playbackStop,
                _object_spread$f(
                  {
                    userInitiated: p,
                    endReasonType:
                      e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
                  },
                  n,
                ),
              ),
              (n = {
                userInitiated: n.userInitiated,
                seamlessAudioTransition: !0,
              })),
            d._nextAtIndex(d.queue.nextPlayableItemIndex, n));
      })();
    }
    _nextAtIndex(n, d = {}) {
      var p = this;
      return _async_to_generator$r(function* () {
        if (p.queue.isEmpty) return;
        const { _mediaItemPlayback: h } = p;
        var y;
        const _ = null !== (y = d.userInitiated) && void 0 !== y && y;
        if (n < 0)
          return (
            Be.debug(
              'controller/index._next no next item available, stopping playback',
            ),
            yield p.stop({
              userInitiated: _,
              seamlessAudioTransition: d.seamlessAudioTransition,
            }),
            void (h.playbackState = e.PlaybackStates.completed)
          );
        const m = p.isPlaying,
          g = h.currentPlaybackTime,
          b = yield p._changeToMediaAtIndex(n, { userInitiated: _ });
        var S;
        return (
          p._notifySkip(m, b, {
            userInitiated: _,
            seamlessAudioTransition:
              null !== (S = d.seamlessAudioTransition) && void 0 !== S && S,
            position: g,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
          }),
          b
        );
      })();
    }
    _previous(n = {}) {
      var d = this;
      return _async_to_generator$r(function* () {
        if (d.queue.isEmpty) return;
        const { userInitiated: p = !1 } = n;
        if (
          d.repeatMode === e.PlayerRepeatMode.one &&
          void 0 !== d.queue.currentItem
        )
          return (
            yield d.stop({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              userInitiated: p,
            }),
            void (yield d.play())
          );
        const h = d.queue.previousPlayableItemIndex;
        if (
          p &&
          d.repeatMode === e.PlayerRepeatMode.none &&
          void 0 !== d.nowPlayingItem &&
          -1 === h
        )
          return (
            yield d.stop({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              userInitiated: !0,
            }),
            void (yield d.play())
          );
        if (-1 === h) return;
        const y = d.isPlaying,
          _ = d._mediaItemPlayback.currentPlaybackTime,
          m = yield d._changeToMediaAtIndex(h, { userInitiated: p });
        return (
          d._notifySkip(y, m, {
            userInitiated: p,
            seamlessAudioTransition: !1,
            direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            position: _,
          }),
          m
        );
      })();
    }
    _notifySkip(n, d, p) {
      const {
          userInitiated: h,
          direction: y,
          position: _,
          seamlessAudioTransition: m = !1,
        } = p,
        g = this._dispatcher;
      m
        ? (Be.debug('seamlessAudioTransition transition, PAF play'),
          g.publish(_t.playbackPlay, {
            item: d,
            position: 0,
            endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          }))
        : n
          ? d
            ? g.publish(_t.playbackSkip, {
                item: d,
                userInitiated: h,
                direction: y,
                position: _,
              })
            : g.publish(_t.playbackStop, {
                item: d,
                userInitiated: h,
                position: _,
              })
          : d &&
            g.publish(
              _t.playbackPlay,
              _object_spread$f(
                { item: d, position: 0 },
                h
                  ? {
                      endReasonType:
                        e.PlayActivityEndReasonType
                          .MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
                    }
                  : {},
              ),
            );
    }
    _prepareQueue(e) {
      Be.debug('mk: _prepareQueue'),
        this.hasAuthorization &&
          (e.isRestricted = this.storekit.restrictedEnabled || !1),
        (e.repeatable = this._repeatable);
    }
    constructor(e) {
      var n, d;
      _define_property$q(this, '_context', {}),
        _define_property$q(this, '_continuous', void 0),
        _define_property$q(this, '_autoplayEnabled', void 0),
        _define_property$q(this, '_playerOptions', void 0),
        _define_property$q(this, '_queue', void 0),
        _define_property$q(this, '_storekit', void 0),
        _define_property$q(this, '_queueModifier', void 0),
        _define_property$q(this, '_repeatable', void 0),
        _define_property$q(this, '_shuffler', void 0),
        _define_property$q(this, '_seekable', void 0),
        _define_property$q(this, '_services', void 0),
        _define_property$q(this, '_rollMonitor', void 0),
        _define_property$q(this, '_skipIntro', void 0),
        _define_property$q(this, '_upNext', void 0),
        _define_property$q(this, '_playbackMode', void 0),
        _define_property$q(this, '_isDestroyed', !0),
        (this.onPlaybackStateDidChange =
          this.onPlaybackStateDidChange.bind(this)),
        (this._autoplayEnabled =
          null !==
            (d =
              null === (n = e) || void 0 === n ? void 0 : n.autoplayEnabled) &&
          void 0 !== d &&
          d),
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
          So.autoplayEnabledDidChange,
          this.updateAutoplay,
        ),
        (this._playbackMode = e.playbackMode);
    }
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$a('design:type', Function),
      _ts_metadata$a('design:paramtypes', [String, Boolean]),
    ],
    PlaybackController.prototype,
    'updateAutoplay',
    null,
  );
  function rejectOnLast() {
    return Promise.reject(
      'The last middleware in the stack should not call next',
    );
  }
  function processMiddleware(e, ...n) {
    return e.length
      ? (function createNextFunction([e, ...n]) {
          return (...d) => e(createNextFunction(n), ...d);
        })([...e, rejectOnLast])(...n)
      : Promise.reject(
          'processMiddleware requires at mimimum one middleware function',
        );
  }
  function parameterizeString(e, n) {
    return (function (e) {
      try {
        return (function recursiveTokenizeParameterizedString(e, n = []) {
          if (e.startsWith('{{')) {
            const d = e.indexOf('}}');
            if (-1 === d) throw new Error('UNCLOSED_PARAMETER');
            const p = { type: Yo.Parameter, value: e.slice(2, d) };
            return d + 2 < e.length
              ? recursiveTokenizeParameterizedString(e.slice(d + 2), [...n, p])
              : [...n, p];
          }
          {
            const d = e.indexOf('{{');
            return -1 === d
              ? [...n, { type: Yo.Static, value: e }]
              : recursiveTokenizeParameterizedString(e.slice(d), [
                  ...n,
                  { type: Yo.Static, value: e.slice(0, d) },
                ]);
          }
        })(e);
      } catch (Q) {
        if ('UNCLOSED_PARAMETER' === Q.message)
          throw new Error(`Unclosed parameter in path: "${e}"`);
        throw Q;
      }
    })(e)
      .map((e) => {
        switch (e.type) {
          case Yo.Parameter:
            return e.value in n
              ? encodeURIComponent('' + n[e.value])
              : `{{${e.value}}}`;
          case Yo.Static:
          default:
            return e.value;
        }
      })
      .join('');
  }
  var Yo;
  function _define_property$p(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$8(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function constructUrlMiddleware(e, n) {
    let d = n.url;
    return (
      d || (d = addPathToURL(n.baseUrl, n.path)),
      n.urlParameters && (d = parameterizeString(d, n.urlParameters)),
      n.queryParameters && (d = addQueryParamsToURL(d, n.queryParameters)),
      e(
        _object_spread_props$8(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              'function' == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$p(e, n, d[n]);
                });
            }
            return e;
          })({}, n),
          { url: d },
        ),
      )
    );
  }
  function asyncGeneratorStep$q(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$q(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$q(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$q(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function unwrapJSONFromResponse(e) {
    return _unwrapJSONFromResponse.apply(this, arguments);
  }
  function _unwrapJSONFromResponse() {
    return (_unwrapJSONFromResponse = _async_to_generator$q(function* (e) {
      try {
        return yield e.json();
      } catch (Q) {
        return;
      }
    })).apply(this, arguments);
  }
  function fetchMiddlewareFactory(e) {
    return (
      (n = _async_to_generator$q(function* (n, d) {
        const p = yield e(d.url, d.fetchOptions),
          h = {
            request: d,
            response: p,
            data: yield unwrapJSONFromResponse(p),
          };
        if (!p.ok) throw MKError.responseError(p);
        return h;
      })),
      function (e, d) {
        return n.apply(this, arguments);
      }
    );
    var n;
  }
  !(function (e) {
    (e[(e.Static = 0)] = 'Static'), (e[(e.Parameter = 1)] = 'Parameter');
  })(Yo || (Yo = {}));
  const zo = fetchMiddlewareFactory(
    'undefined' != typeof fetch
      ? fetch
      : () => {
          throw new Error('window.fetch is not defined');
        },
  );
  function _define_property$o(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$d(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$o(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$7(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Qo;
  !(function (e) {
    (e.Replace = 'REPLACE'), (e.Merge = 'MERGE');
  })(Qo || (Qo = {}));
  const Jo = ['url'];
  class APISession {
    get config() {
      return this._config;
    }
    request(e, n = {}, d = {}) {
      var p;
      return processMiddleware(
        this.middlewareStack,
        _object_spread_props$7(
          _object_spread$d({}, this.config.defaultOptions, d),
          {
            baseUrl: this.config.url,
            path: e,
            fetchOptions: mergeFetchOptions(
              null === (p = this.config.defaultOptions) || void 0 === p
                ? void 0
                : p.fetchOptions,
              d.fetchOptions,
            ),
            queryParameters: _object_spread$d(
              {},
              this.config.defaultQueryParameters,
              n,
            ),
            urlParameters: _object_spread$d(
              {},
              this.config.defaultUrlParameters,
              d.urlParameters,
            ),
          },
        ),
      );
    }
    reconfigure(e, n = Qo.Replace) {
      n === Qo.Merge && (e = deepmerge(this.config, e)),
        Jo.forEach((n) => {
          if (void 0 === e[n])
            throw new Error(
              `Session requires a valid SessionConfig, missing "${n}"`,
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
        : zo;
    }
    constructor(e) {
      _define_property$o(this, '_config', void 0),
        _define_property$o(this, 'middlewareStack', void 0),
        this.reconfigure(e);
    }
  }
  function _object_without_properties(e, n) {
    if (null == e) return {};
    var d,
      p,
      h = (function (e, n) {
        if (null == e) return {};
        var d,
          p,
          h = {},
          y = Object.keys(e);
        for (p = 0; p < y.length; p++)
          (d = y[p]), n.indexOf(d) >= 0 || (h[d] = e[d]);
        return h;
      })(e, n);
    if (Object.getOwnPropertySymbols) {
      var y = Object.getOwnPropertySymbols(e);
      for (p = 0; p < y.length; p++)
        (d = y[p]),
          n.indexOf(d) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, d) && (h[d] = e[d]));
    }
    return h;
  }
  const Xo = { music: { url: 'https://api.music.apple.com' } };
  class MediaAPIV3 {
    configure(e, n, d = Qo.Merge) {
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
        var h;
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
    constructor(e) {
      var n, d, p;
      (p = void 0),
        (d = 'storefrontId') in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p);
      const { realmConfig: h } = e,
        y = _object_without_properties(e, ['realmConfig']);
      for (const m in Xo) {
        var _;
        let e = deepmerge(Xo[m], y);
        const n = null === (_ = h) || void 0 === _ ? void 0 : _[m];
        n && (e = deepmerge(e, n)), this.configure(m, e);
      }
    }
  }
  function asyncGeneratorStep$p(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$m(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$9(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class StationTrackLoader {
    activate() {
      this.dispatcher.unsubscribe(
        So.queuePositionDidChange,
        this.checkLoadMore,
      ),
        this.dispatcher.subscribe(
          So.queuePositionDidChange,
          this.checkLoadMore,
        ),
        (this.isActive = !0);
    }
    deactivate() {
      this.dispatcher.unsubscribe(
        So.queuePositionDidChange,
        this.checkLoadMore,
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
      var e,
        n = this;
      return ((e = function* () {
        var e;
        let d = [];
        const { apiManager: p } = n;
        if (
          (null === (e = p) || void 0 === e ? void 0 : e.api) instanceof
          MediaAPIV3
        ) {
          var h, y;
          d =
            null ===
              (y = yield p.api.music(
                'v1/me/stations/next-tracks/' + n.station.id,
                void 0,
                { fetchOptions: { method: 'POST' } },
              )) ||
            void 0 === y ||
            null === (h = y.data) ||
            void 0 === h
              ? void 0
              : h.data;
        } else {
          var _;
          const e = {};
          var m;
          To.features['enhanced-hls'] &&
            (e.extend = { songs: ['extendedAssetUrls'] }),
            (d =
              null !==
                (m = yield null === (_ = p.mediaAPI) || void 0 === _
                  ? void 0
                  : _.nextStationTracks(n.station.id, null, {
                      queryParameters: e,
                    })) && void 0 !== m
                ? m
                : []);
        }
        if (0 === d.length)
          throw (
            (Be.warn('No track data is available for the current station', {
              stationId: n.station.id,
            }),
            new MKError(
              MKError.Reason.CONTENT_UNAVAILABLE,
              'No track data is available for the current station.',
            ))
          );
        const g = descriptorToMediaItems({
          context: n.context,
          loaded: d,
          container: n.station,
        });
        n.queue.splice(n.queue.length, 0, g);
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);
          function _next(e) {
            asyncGeneratorStep$p(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$p(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    constructor(e, n, { dispatcher: d, apiManager: p }, h = {}) {
      _define_property$m(this, 'queue', void 0),
        _define_property$m(this, 'station', void 0),
        _define_property$m(this, 'context', void 0),
        _define_property$m(this, 'apiManager', void 0),
        _define_property$m(this, 'dispatcher', void 0),
        _define_property$m(this, 'isActive', void 0),
        (this.queue = e),
        (this.station = n),
        (this.context = h),
        (this.isActive = !1),
        (this.dispatcher = d),
        (this.apiManager = p);
    }
  }
  var Zo, ea;
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$9('design:type', Function),
      _ts_metadata$9('design:paramtypes', []),
    ],
    StationTrackLoader.prototype,
    'checkLoadMore',
    null,
  ),
    (function (e) {
      (e.artist = 'artist'),
        (e.song = 'song'),
        (e.station = 'station'),
        (e.radioStation = 'radioStation');
    })(Zo || (Zo = {})),
    (function (e) {
      e.BEATS1 = 'beats1';
    })(ea || (ea = {}));
  const isIdentityQueue = (e) => e && void 0 !== e.identity;
  function asyncGeneratorStep$o(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$o(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$o(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$o(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$l(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_metadata$8(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const { queueIsReady: ta } = So;
  class ContinuousPlaybackController extends PlaybackController {
    get continuous() {
      return !0;
    }
    set continuous(e) {
      if (!0 !== e)
        throw new MKError(
          MKError.Reason.UNSUPPORTED_ERROR,
          'Continuous playback cannot be disabled for station queues.',
        );
    }
    get context() {
      return (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var d = null != arguments[n] ? arguments[n] : {},
            p = Object.keys(d);
          'function' == typeof Object.getOwnPropertySymbols &&
            (p = p.concat(
              Object.getOwnPropertySymbols(d).filter(function (e) {
                return Object.getOwnPropertyDescriptor(d, e).enumerable;
              }),
            )),
            p.forEach(function (n) {
              _define_property$l(e, n, d[n]);
            });
        }
        return e;
      })({ featureName: mt.STATION }, this._context);
    }
    get isLive() {
      return this._isLive;
    }
    set isLive(e) {
      e !== this._isLive &&
        ((this._isLive = e), this._dispatcher.publish(So.capabilitiesChanged));
    }
    changeToMediaItem(e) {
      var n = this;
      return _async_to_generator$o(function* () {
        n.generateMethodNotAvailable('changeToMediaItem');
      })();
    }
    hasCapabilities(e) {
      switch (e) {
        case Io.PAUSE:
        case Io.SKIP_NEXT:
        case Io.SKIP_PREVIOUS:
          return !this.isLive;
        case Io.SKIP_TO_ITEM:
        case Io.AUTOPLAY:
          return !1;
        default:
          return super.hasCapabilities(e);
      }
    }
    pause(e) {
      var n = this,
        _superprop_get_pause = () => super.pause;
      return _async_to_generator$o(function* () {
        if (!n.isLive) return _superprop_get_pause().call(n, e);
        n.generateMethodNotAvailable('pause');
      })();
    }
    skipToPreviousItem() {
      var e = this,
        _superprop_get_skipToPreviousItem = () => super.skipToPreviousItem;
      return _async_to_generator$o(function* () {
        if (!e.isLive) return _superprop_get_skipToPreviousItem().call(e);
        e.generateMethodNotAvailable('skipToPreviousItem');
      })();
    }
    _dataForQueueOptions(e) {
      var n = this,
        _superprop_get__dataForQueueOptions = () => super._dataForQueueOptions;
      return _async_to_generator$o(function* () {
        const d = yield _superprop_get__dataForQueueOptions().call(n, e);
        return n.isLive && (d.loaded = n.station), d;
      })();
    }
    returnQueueForOptions(e) {
      var n = this;
      return _async_to_generator$o(function* () {
        var d, p, h;
        const y = isIdentityQueue(e)
          ? yield n.loadStationByIdentity(e.identity)
          : yield n.loadStationByStationId(n.generateStationId(e));
        if (void 0 === y)
          return Promise.reject(
            new MKError(
              MKError.Reason.UNSUPPORTED_ERROR,
              'Cannot load requested station',
            ),
          );
        (n.station = y),
          (n.isLive =
            isIdentityQueue(e) ||
            !!(null === (d = y) || void 0 === d ? void 0 : d.isLive) ||
            !!(null === (h = y) ||
            void 0 === h ||
            null === (p = h.attributes) ||
            void 0 === p
              ? void 0
              : p.isLive));
        const _ = {
          services: {
            runtime: n._services.runtime,
            dispatcher: n._services.dispatcher,
          },
          descriptor: yield n._dataForQueueOptions(e),
          playbackMode: n.playbackMode,
        };
        return (
          (n.queue = new Queue(_)),
          n.isLive ||
            ((n.trackLoader = new StationTrackLoader(
              n.queue,
              y,
              { dispatcher: n._dispatcher, apiManager: n._services.apiManager },
              n.context,
            )),
            yield n.trackLoader.start()),
          (n._seekable = n.isLive
            ? new BaseSeekable(n._mediaItemPlayback)
            : new Seekable(n._dispatcher, n._mediaItemPlayback)),
          n._dispatcher.publish(ta, n.queue.items),
          n.queue
        );
      })();
    }
    getNewSeeker() {
      return this.hasCapabilities(Io.SEEK)
        ? super.getNewSeeker()
        : new UnsupportedSeeker();
    }
    skipToNextItem() {
      var e = this,
        _superprop_get_skipToNextItem = () => super.skipToNextItem;
      return _async_to_generator$o(function* () {
        if (!e.isLive) return _superprop_get_skipToNextItem().call(e);
        e.generateMethodNotAvailable('skipToNextItem');
      })();
    }
    generateMethodNotAvailable(e) {
      Be.warn(e + ' is not supported for this type of playback');
    }
    generateStationId(e) {
      let n;
      if (isQueueURLOption(e)) {
        const {
          contentId: d,
          kind: p,
          storefrontId: h,
        } = formattedMediaURL(e.url);
        p && (e[p] = d), h && (wo.storefrontId = h), (n = p);
      }
      const d = e;
      if (d.artist) return 'ra.' + d.artist;
      if (d.song) return 'ra.' + d.song;
      if (d.station) return d.station;
      if (d.radioStation) return d.radioStation;
      throw new MKError(
        MKError.Reason.UNSUPPORTED_ERROR,
        n
          ? n + ' is not a supported option. Use setQueue instead.'
          : 'Unsupported options specified for setStationQueue. You may want setQueue instead.',
      );
    }
    loadStationByIdentity(e) {
      var n = this;
      return _async_to_generator$o(function* () {
        var d, p, h;
        const { apiManager: y } = n._services;
        if (
          (null === (d = y) || void 0 === d ? void 0 : d.api) instanceof
          MediaAPIV3
        ) {
          var _, m, g;
          return null ===
            (g = yield y.api.music('v1/catalog/{{storefrontId}}/stations', {
              filter: { identity: e },
            })) ||
            void 0 === g ||
            null === (m = g.data) ||
            void 0 === m ||
            null === (_ = m.data) ||
            void 0 === _
            ? void 0
            : _[0];
        }
        const b = yield null === (h = y) ||
        void 0 === h ||
        null === (p = h.mediaAPI) ||
        void 0 === p
          ? void 0
          : p.stations(void 0, { filter: { identity: e } });
        return b && b[0];
      })();
    }
    loadStationByStationId(e) {
      var n = this;
      return _async_to_generator$o(function* () {
        var d, p, h;
        const { apiManager: y } = n._services;
        if (
          (null === (d = y) || void 0 === d ? void 0 : d.api) instanceof
          MediaAPIV3
        ) {
          var _, m, g;
          return null ===
            (g = yield y.api.music(
              'v1/catalog/{{storefrontId}}/stations/' + e,
            )) ||
            void 0 === g ||
            null === (m = g.data) ||
            void 0 === m ||
            null === (_ = m.data) ||
            void 0 === _
            ? void 0
            : _[0];
        }
        return null === (h = y) ||
          void 0 === h ||
          null === (p = h.mediaAPI) ||
          void 0 === p
          ? void 0
          : p.station(e);
      })();
    }
    activate() {
      super.activate(), this.trackLoader && this.trackLoader.activate();
    }
    deactivate() {
      var e = this,
        _superprop_get_deactivate = () => super.deactivate;
      return _async_to_generator$o(function* () {
        yield _superprop_get_deactivate().call(e),
          e.trackLoader && e.trackLoader.deactivate();
      })();
    }
    constructor(e) {
      super(e),
        _define_property$l(this, 'type', qo.continuous),
        _define_property$l(this, '_isLive', !1),
        _define_property$l(this, 'trackLoader', void 0),
        _define_property$l(this, 'station', void 0),
        (this._continuous = !0);
    }
  }
  function asyncGeneratorStep$n(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$k(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$7(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$7(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      Bind(),
      _ts_metadata$8('design:type', Function),
      _ts_metadata$8('design:paramtypes', [void 0 === Io ? Object : Io]),
    ],
    ContinuousPlaybackController.prototype,
    'hasCapabilities',
    null,
  );
  class PercentageWatcher {
    startMonitor() {
      this.dispatcher.unsubscribe(
        So.playbackDurationDidChange,
        this.updateThreshold,
      ),
        this.dispatcher.unsubscribe(
          So.playbackTimeDidChange,
          this.handleTimeChange,
        ),
        this.dispatcher.subscribe(
          So.playbackDurationDidChange,
          this.updateThreshold,
        ),
        this.dispatcher.subscribe(
          So.playbackTimeDidChange,
          this.handleTimeChange,
        );
    }
    stopMonitor() {
      this.dispatcher.unsubscribe(
        So.playbackDurationDidChange,
        this.updateThreshold,
      ),
        this.dispatcher.unsubscribe(
          So.playbackTimeDidChange,
          this.handleTimeChange,
        ),
        (this.threshold = -1);
    }
    handleTimeChange(
      e,
      { currentPlaybackDuration: n, currentPlaybackTime: d },
    ) {
      var p,
        h = this;
      return ((p = function* () {
        h.threshold < 0 && h.updateThreshold(e, { duration: n }),
          d < h.threshold || (h.stopMonitor(), yield h.callback(d, h));
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (d, h) {
          var y = p.apply(e, n);
          function _next(e) {
            asyncGeneratorStep$n(y, d, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$n(y, d, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    updateThreshold(e, { duration: n }) {
      this.threshold = n * this.percentage;
    }
    constructor(e, n, d) {
      _define_property$k(this, 'dispatcher', void 0),
        _define_property$k(this, 'callback', void 0),
        _define_property$k(this, 'percentage', void 0),
        _define_property$k(this, 'threshold', void 0),
        (this.dispatcher = e),
        (this.callback = n),
        (this.percentage = d),
        (this.threshold = -1);
    }
  }
  function asyncGeneratorStep$m(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  _ts_decorate$7(
    [
      Bind(),
      _ts_metadata$7('design:type', Function),
      _ts_metadata$7('design:paramtypes', [void 0, void 0]),
    ],
    PercentageWatcher.prototype,
    'handleTimeChange',
    null,
  ),
    _ts_decorate$7(
      [
        Bind(),
        _ts_metadata$7('design:type', Function),
        _ts_metadata$7('design:paramtypes', [void 0, void 0]),
      ],
      PercentageWatcher.prototype,
      'updateThreshold',
      null,
    );
  class Preloader extends PlaybackMonitor {
    handlePlaybackThreshold() {
      var e,
        n = this;
      return ((e = function* () {
        const e = n.getNextPlayableItem();
        e && (yield n.playbackController.prepareToPlay(e, !0));
      }),
      function () {
        var n = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = e.apply(n, d);
          function _next(e) {
            asyncGeneratorStep$m(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$m(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
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
        : n &&
            !(null === (d = e) || void 0 === d ? void 0 : d.isPreparedToPlay);
      var d;
    }
    getNextPlayableItem() {
      return this.playbackController.queue.nextPlayableItem;
    }
    constructor(e) {
      var n, d, p;
      super(e),
        (p = !1),
        (d = 'isSeamlessAudioTransitionsEnabled') in (n = this)
          ? Object.defineProperty(n, d, {
              value: p,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[d] = p),
        (this.watchers = [
          new PercentageWatcher(
            this.dispatcher,
            this.handlePlaybackThreshold,
            0.3,
          ),
        ]),
        (this.isSeamlessAudioTransitionsEnabled =
          To.features['seamless-audio-transitions']);
    }
  }
  function dasherize(e) {
    return e
      .replace(/([A-Z])/g, '-$1')
      .replace(/[-_\s]+/g, '-')
      .toLowerCase();
  }
  function asyncGeneratorStep$l(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$l(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$l(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$l(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$i(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$b(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$i(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$6(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function loadRelationshipData(e, n, d) {
    return _loadRelationshipData.apply(this, arguments);
  }
  function _loadRelationshipData() {
    return (_loadRelationshipData = _async_to_generator$l(function* (
      e,
      n,
      d,
      p = {},
    ) {
      if (void 0 === n) return d;
      void 0 === p.limit && (p.limit = 100),
        void 0 === p.offset && (p.offset = 0);
      const { relationship: h, method: y } = n,
        _ = e[y].bind(e);
      let m;
      return (
        isDataRecord(d)
          ? (void 0 === d[h] && d.setProperty(h, [], 'relationships'),
            (m = d[h]))
          : ((d.relationships = d.relationships || {}),
            void 0 === d.relationships[h] &&
              Object.defineProperty(d.relationships, h, {
                value: { data: [] },
                enumerable: !0,
              }),
            (m = d.relationships[h].data)),
        yield ra(_, [d.id, h, p], m),
        d
      );
    })).apply(this, arguments);
  }
  const ra = (function () {
      var e = _async_to_generator$l(function* (e, n, d) {
        const [p, h, y] = n,
          _ = d.length;
        if (_ > 0 && _ < y.limit + y.offset) return d;
        const m = _object_spread$b({}, y);
        let g;
        m.offset = _;
        try {
          g = yield e(p, h, m);
        } catch (Ut) {
          return d;
        }
        return d.push(...g), g.length < m.limit ? d : ra(e, n, d);
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })(),
    getNamedQueueOptions = (e, n) => {
      const d = [],
        p = e.namedQueueOptions;
      for (const h in n) Object.keys(p).includes(h) && d.push([h, p[h]]);
      return d;
    },
    ia = (function () {
      var e = _async_to_generator$l(function* (e, n, d) {
        const [p] = d,
          h = n[p];
        if (!Array.isArray(h)) return loadSelectedQueueValue(e, n, d, h);
        const y = new Map();
        h.forEach((e) => {
          const n = e.indexOf('.'),
            d = -1 === n ? '' : e.substring(0, n);
          y.has(d) || y.set(d, []);
          const p = y.get(d);
          p && p.push(e);
        });
        const _ = (yield Promise.all(
            [...y.values()].map((p) => loadSelectedQueueValue(e, n, d, p)),
          )).reduce((e, n) => {
            var d;
            return (
              (n = null !== (d = n.data) && void 0 !== d ? d : n).forEach(
                (n) => {
                  e.set(n.id, n);
                },
              ),
              e
            );
          }, new Map()),
          m = [];
        return (
          h.forEach((e) => {
            const n = _.get(e);
            n && m.push(n);
          }),
          m
        );
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })();
  function loadSelectedQueueValue(e, n, d, p) {
    return _loadSelectedQueueValue.apply(this, arguments);
  }
  function _loadSelectedQueueValue() {
    return (_loadSelectedQueueValue = _async_to_generator$l(
      function* (e, n, d, p) {
        const h = yield e.getAPIForItem(Array.isArray(p) ? p[0] : p);
        return h instanceof MediaAPIV3
          ? loadSelectedQueueValueV3(h, n, d, p)
          : loadSelectedQueueValueV2(h, n, d, p);
      },
    )).apply(this, arguments);
  }
  function loadSelectedQueueValueV2(e, n, d, p) {
    return _loadSelectedQueueValueV2.apply(this, arguments);
  }
  function _loadSelectedQueueValueV2() {
    return (_loadSelectedQueueValueV2 = _async_to_generator$l(
      function* (e, n, d, p) {
        const [, h] = d;
        let y = n.parameters;
        To.features['enhanced-hls'] &&
          (y = _object_spread_props$6(_object_spread$b({}, y), {
            extend: { songs: ['extendedAssetUrls'] },
          }));
        let _ = yield e[h.apiMethod](p, y);
        return (
          h.loadedQueueTransform && (_ = h.loadedQueueTransform(_)),
          Array.isArray(p) ||
            (yield loadRelationshipData(e, h.relationshipMethod, _)),
          _
        );
      },
    )).apply(this, arguments);
  }
  function loadSelectedQueueValueV3(e, n, d, p) {
    return _loadSelectedQueueValueV3.apply(this, arguments);
  }
  function _loadSelectedQueueValueV3() {
    return (_loadSelectedQueueValueV3 = _async_to_generator$l(
      function* (e, n, d, p) {
        const [h] = d,
          y = Array.isArray(p),
          _ = T(y ? '' + p[0] : '' + p),
          m = /^(?:playlists?|albums?)$/i.test(h);
        let g = dasherize(h);
        g.endsWith('s') || (g += 's');
        let b =
          (_ ? '/v1/me/library' : '/v1/catalog/{{storefrontId}}') + '/' + g;
        y || (b += '/{{id}}');
        const S = {};
        y && (S.ids = p), _ && m && (S.include = 'tracks');
        const P = yield e.music(b, S, { urlParameters: { id: p } });
        return y ? P.data.data : P.data.data[0];
      },
    )).apply(this, arguments);
  }
  function asyncGeneratorStep$k(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$k(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$k(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$k(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$h(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$a(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$h(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$5(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _ts_decorate$6(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$6(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const na = ['library-songs', 'songs'],
    isAutoplaySupportedForType = (e) => na.includes(e),
    normalizeTypeForAutoplay = (e, n) =>
      (T(e) && !(null != n ? n : '').startsWith('library-') ? 'library-' : '') +
      normalizeContentType(n);
  class AutoplayTrackLoader {
    activate() {
      this.isActive ||
        (this.dispatcher.unsubscribe(
          So.queuePositionDidChange,
          this.onQueueChanged,
        ),
        this.dispatcher.subscribe(
          So.queuePositionDidChange,
          this.onQueueChanged,
        ),
        this.dispatcher.unsubscribe(
          So.repeatModeDidChange,
          this.onRepeatableChanged,
        ),
        this.dispatcher.subscribe(
          So.repeatModeDidChange,
          this.onRepeatableChanged,
        ),
        (this.isActive = !0));
    }
    deactivate() {
      this.isActive &&
        (this.dispatcher.unsubscribe(
          So.queuePositionDidChange,
          this.onQueueChanged,
        ),
        this.dispatcher.unsubscribe(
          So.repeatModeDidChange,
          this.onRepeatableChanged,
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
      var d;
      return null !== (d = null === (e = n) || void 0 === e ? void 0 : e.v3) &&
        void 0 !== d
        ? d
        : n;
    }
    checkLoadMore() {
      var e;
      const n =
          null !== (e = this.queue.unplayedAutoplayItems.length) && void 0 !== e
            ? e
            : 0,
        d = To.autoplay.maxUpcomingTracksToMaintain;
      if (
        !(
          this.queue.isEmpty ||
          this.queue.unplayedUserItems.length >
            To.autoplay.maxQueueSizeForAutoplay
        )
      )
        return n < d ? this.loadNextTracks(d - n) : this.loadNextTracks();
    }
    cleanupQueue() {
      this.queue.removeQueueItems(
        (e, n) => !(n <= this.queue.position) && !!e.isAutoplay,
      );
    }
    loadNextTracks(n = To.autoplay.maxUpcomingTracksToMaintain) {
      var d = this;
      return _async_to_generator$k(function* () {
        var p;
        if (d.repeatable.repeatMode !== e.PlayerRepeatMode.none) return;
        let h,
          { station: y } = d;
        if (d.station) {
          try {
            var _, m;
            (h = yield d.api.music(
              'v1/me/stations/next-tracks/' + d.station.id,
              { limit: n },
              { fetchOptions: { method: 'POST' } },
            )),
              (h =
                null === (m = h) ||
                void 0 === m ||
                null === (_ = m.data) ||
                void 0 === _
                  ? void 0
                  : _.data);
          } catch (Ut) {
            return;
          }
          if (!d.isActive) return;
        } else {
          var g, b;
          const e = yield d.startStation(n);
          if (!e || !d.isActive) return void (d.queue.hasAutoplayStation = !1);
          var S;
          if (
            ((y = d.station = e.station),
            (d.queue.hasAutoplayStation = !0),
            (h = e.tracks),
            !(null === (b = e) ||
            void 0 === b ||
            null === (g = b.tracks) ||
            void 0 === g
              ? void 0
              : g.length))
          )
            Be.warn('No track data is available for the current station', {
              stationId: null === (S = y) || void 0 === S ? void 0 : S.id,
            });
        }
        const P = descriptorToMediaItems({
          context: _object_spread_props$5(_object_spread$a({}, d.context), {
            featureName: 'now_playing',
            reco_id: (
              null === (p = d.context.featureName) || void 0 === p
                ? void 0
                : p.startsWith('listen-now')
            )
              ? void 0
              : d.context.reco_id,
          }),
          loaded: h,
          container: y,
        });
        d.queue.appendQueueItems(toQueueItems(P, { isAutoplay: !0 }));
      })();
    }
    startStation(e) {
      var n = this;
      return _async_to_generator$k(function* () {
        var d;
        const { userAddedItems: p } = n.queue;
        var h;
        const y =
            null ===
              (d =
                null !== (h = p[p.length - 2]) && void 0 !== h
                  ? h
                  : p[p.length - 1]) || void 0 === d
              ? void 0
              : d.container,
          _ = y ? { container: { id: y.id, type: y.type } } : void 0,
          m = n.queue.items
            .slice(-1 * To.autoplay.maxQueueSizeInRequest)
            .reduce((e, { id: d, type: p }) => {
              const h = normalizeTypeForAutoplay(d, p);
              return (
                isAutoplaySupportedForType(h) &&
                  !n.errorIds.has(d) &&
                  e.push({ id: d, type: h, meta: _ }),
                e
              );
            }, []);
        if (0 === m.length) return;
        const g = { data: m };
        let b;
        try {
          var S, P;
          (b = yield n.api.music(
            'v1/me/stations/continuous',
            { 'limit[results:tracks]': e, with: ['tracks'] },
            {
              fetchOptions: {
                method: 'POST',
                body: JSON.stringify(g, void 0, 2),
              },
            },
          )),
            (b =
              null === (P = b) ||
              void 0 === P ||
              null === (S = P.data) ||
              void 0 === S
                ? void 0
                : S.results);
        } catch (Ut) {
          m.forEach((e) => n.errorIds.add(e.id));
        }
        return b;
      })();
    }
    constructor(e, n, { dispatcher: d, apiManager: p }, h = {}) {
      _define_property$h(this, 'queue', void 0),
        _define_property$h(this, 'repeatable', void 0),
        _define_property$h(this, 'context', void 0),
        _define_property$h(this, 'apiManager', void 0),
        _define_property$h(this, 'dispatcher', void 0),
        _define_property$h(this, 'isActive', void 0),
        _define_property$h(this, 'errorIds', void 0),
        _define_property$h(this, 'station', void 0),
        (this.queue = e),
        (this.repeatable = n),
        (this.context = h),
        (this.isActive = !1),
        (this.errorIds = new Set()),
        (this.dispatcher = d),
        (this.apiManager = p);
    }
  }
  function asyncGeneratorStep$j(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$j(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$j(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$j(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$g(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$9(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$g(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$4(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  function _ts_decorate$5(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$5(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$6(
    [
      Bind(),
      _ts_metadata$6('design:type', Function),
      _ts_metadata$6('design:paramtypes', []),
    ],
    AutoplayTrackLoader.prototype,
    'onRepeatableChanged',
    null,
  ),
    _ts_decorate$6(
      [
        Bind(),
        _ts_metadata$6('design:type', Function),
        _ts_metadata$6('design:paramtypes', []),
      ],
      AutoplayTrackLoader.prototype,
      'onQueueChanged',
      null,
    ),
    _ts_decorate$6(
      [
        (e, n, d) => {
          const p = d.value,
            h = '_singlePromise_' + n,
            y = 'undefined' != typeof Symbol ? Symbol(h) : h;
          return (
            (d.value = function (...e) {
              if (this[y]) return this[y];
              const n = (this[y] = p.apply(this, e)),
                reset = () => {
                  this[y] = void 0;
                };
              return n.then(reset, reset), n;
            }),
            d
          );
        },
        _ts_metadata$6('design:type', Function),
        _ts_metadata$6('design:paramtypes', [Number]),
      ],
      AutoplayTrackLoader.prototype,
      'loadNextTracks',
      null,
    );
  const { queueIsReady: oa } = So;
  var aa, sa;
  !(function (e) {
    (e.album = 'album'),
      (e.musicVideo = 'musicVideo'),
      (e.playlist = 'playlist'),
      (e.song = 'song');
  })(aa || (aa = {})),
    (function (e) {
      (e.albums = 'albums'),
        (e.musicVideos = 'musicVideos'),
        (e.playlists = 'playlists'),
        (e.songs = 'songs');
    })(sa || (sa = {}));
  class SerialPlaybackController extends PlaybackController {
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
        this._dispatcher.subscribe(Nn, this.onSeamlessAudioTransition),
        this._dispatcher.subscribe(
          So.repeatModeDidChange,
          this.onRepeatModeChange,
        );
    }
    deactivate() {
      var e = this,
        _superprop_get_deactivate = () => super.deactivate;
      return _async_to_generator$j(function* () {
        var n;
        yield _superprop_get_deactivate().call(e),
          e._preloader.deactivate(),
          e._dispatcher.unsubscribe(Nn, e.onSeamlessAudioTransition),
          e._dispatcher.unsubscribe(
            So.repeatModeDidChange,
            e.onRepeatModeChange,
          ),
          null === (n = e._autoplayTrackLoader) || void 0 === n || n.stop();
      })();
    }
    onSeamlessAudioTransition(n, d) {
      Be.debug('controller handling seamless audio transition, PAF stop', d),
        this._next({
          userInitiated: !1,
          seamlessAudioTransition: !0,
          endReasonType: e.PlayActivityEndReasonType.NATURAL_END_OF_TRACK,
          position: d.previous.playbackDuration / 1e3,
          isPlaying: !1,
        });
    }
    hasCapabilities(e) {
      var n, d, p;
      return (
        e === Io.SKIP_PREVIOUS ||
        (((e !== Io.REPEAT && e !== Io.SHUFFLE) ||
          !(null === (d = this.queue) ||
          void 0 === d ||
          null === (n = d.currentQueueItem) ||
          void 0 === n
            ? void 0
            : n.isAutoplay)) &&
          ((e !== Io.SEEK && e !== Io.PAUSE) ||
            !(null === (p = this.nowPlayingItem) || void 0 === p
              ? void 0
              : p.isAssetScrubbingDisabled)) &&
          super.hasCapabilities(e))
      );
    }
    onRepeatModeChange() {
      var e;
      this.queue.nextPlayableItem &&
        (Be.info(
          'SerialPlaybackController: preparing new item after RepeatMode change',
          null === (e = this.queue.nextPlayableItem) || void 0 === e
            ? void 0
            : e.title,
        ),
        this.prepareToPlay(this.queue.nextPlayableItem, !0));
    }
    prepareToPlay(n, d = !1) {
      var p = this;
      return _async_to_generator$j(function* () {
        if (
          (Be.debug('mk: SerialController - prepareToPlay - ', {
            item: n,
            preload: d,
          }),
          n.isPlayable)
        )
          return p._mediaItemPlayback.prepareToPlay(n).catch((n) => {
            const h =
              !d &&
              -1 ===
                [
                  MKError.Reason.DEVICE_LIMIT,
                  MKError.Reason.STREAM_UPSELL,
                ].indexOf(n.reason);
            if (p.continuous && h)
              return (
                p._dispatcher.publish(_t.applicationActivityIntent, {
                  endReasonType:
                    e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
                  userInitiated: !1,
                }),
                p._next()
              );
            throw n;
          });
      })();
    }
    prepend(e, n) {
      var d = this,
        _superprop_get_prepend = () => super.prepend;
      return _async_to_generator$j(function* () {
        const p = yield _superprop_get_prepend().call(d, e, n);
        if (d.shouldTransitionSeamlessly) {
          const e = d.queue,
            n = e.position,
            p = e.item(n + 1);
          Be.debug('prepend preparing ', p.title),
            yield d._mediaItemPlayback.prepareToPlay(p);
        }
        return p;
      })();
    }
    returnQueueForOptions(e) {
      var n = this;
      return _async_to_generator$j(function* () {
        void 0 !== (e = parseQueueURLOption(e)).startPosition &&
          (deprecationWarning('startPosition', {
            message: 'startPosition has been deprecated in favor of startWith',
          }),
          void 0 === e.startWith && (e.startWith = e.startPosition));
        const d = yield n._dataForQueueOptions(e),
          p = {
            services: {
              runtime: n._services.runtime,
              dispatcher: n._services.dispatcher,
              mediaItemPlayback: n._services.mediaItemPlayback,
            },
            descriptor: d,
            playbackMode: n.playbackMode,
          };
        if (
          (void 0 !== e.shuffleMode && (n.shuffleMode = e.shuffleMode),
          (n.queue = new Queue(p)),
          'number' == typeof e.startTime)
        ) {
          const d = n.queue.nextPlayableItem;
          d &&
            n._mediaItemPlayback.playOptions.set(d.id, {
              startTime: e.startTime,
            });
        }
        if (0 === n.queue.length)
          throw (
            (Be.warn(
              'No item data is available for the current media queue',
              e,
            ),
            new MKError(
              MKError.Reason.CONTENT_UNAVAILABLE,
              'No item data is available for the current media queue.',
            ))
          );
        return (
          n._autoplayTrackLoader && n._autoplayTrackLoader.deactivate(),
          (n._autoplayTrackLoader = new AutoplayTrackLoader(
            n.queue,
            n._repeatable,
            { dispatcher: n._dispatcher, apiManager: n._services.apiManager },
            n._context,
          )),
          n.autoplayEnabled &&
            n.hasCapabilities(Io.AUTOPLAY) &&
            n._autoplayTrackLoader.start(),
          n._dispatcher.publish(oa, n.queue.items),
          n.queue
        );
      })();
    }
    _dataForQueueOptions(e) {
      var n = this,
        _superprop_get__dataForQueueOptions = () => super._dataForQueueOptions;
      return _async_to_generator$j(function* () {
        var d;
        const p = e,
          h = ((e, n) => {
            const d = getNamedQueueOptions(e, n);
            if (d.length > 1)
              throw new MKError(
                MKError.Reason.UNSUPPORTED_ERROR,
                'Queues with multiple media types are not supported.',
              );
            if (0 === d.length) return;
            const [p] = d,
              [h, y] = p;
            if (Array.isArray(n[h]) !== y.isPlural)
              throw new MKError(
                MKError.Reason.UNSUPPORTED_ERROR,
                y.isPlural
                  ? `Queue option ${h} must be an array of id values`
                  : `Queue option ${h} must be a single id value`,
              );
            return p;
          })(n._services.apiManager.apiService, e);
        return (
          void 0 === h ||
            ((null === (d = n.storekit) || void 0 === d
              ? void 0
              : d.restrictedEnabled) &&
              (e.parameters = _object_spread_props$4(
                _object_spread$9({}, e.parameters),
                { restrict: 'explicit' },
              )),
            (p.loaded = yield ia(n._services.apiManager.apiService, e, h))),
          _object_spread$9(
            {},
            yield _superprop_get__dataForQueueOptions().call(n, e),
            p,
          )
        );
      })();
    }
    _changeToMediaAtIndex(e = 0, n = { userInitiated: !1 }) {
      var d = this,
        _superprop_get__changeToMediaAtIndex = () =>
          super._changeToMediaAtIndex;
      return _async_to_generator$j(function* () {
        const p = yield _superprop_get__changeToMediaAtIndex().call(d, e, n),
          h = d.queue.nextPlayableItem;
        return (
          h && d.shouldTransitionSeamlessly && (yield d.prepareToPlay(h)), p
        );
      })();
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
    constructor(e) {
      var n, d;
      super(e),
        _define_property$g(this, 'type', qo.serial),
        _define_property$g(this, '_preloader', void 0),
        _define_property$g(this, '_isSeamlessAudioTransitionsEnabled', void 0),
        _define_property$g(this, '_autoplayTrackLoader', void 0),
        (this._queue = new Queue(e)),
        (this._repeatable = new Repeatable(this._dispatcher)),
        (this._seekable = new Seekable(
          this._dispatcher,
          this._mediaItemPlayback,
        )),
        (this._shuffler = new Shuffler(this, { dispatcher: this._dispatcher })),
        (this._queueModifier = new ModifiableQueue(
          this._queue,
          this._mediaItemPlayback,
        )),
        (this._isSeamlessAudioTransitionsEnabled = !!(null === (d = e) ||
        void 0 === d ||
        null === (n = d.bag) ||
        void 0 === n
          ? void 0
          : n.features['seamless-audio-transitions']));
      const p = { controller: this, services: e.services };
      this._preloader = new Preloader(p);
    }
  }
  function _define_property$f(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$5(
    [
      Bind(),
      _ts_metadata$5('design:type', Function),
      _ts_metadata$5('design:paramtypes', [void 0, void 0]),
    ],
    SerialPlaybackController.prototype,
    'onSeamlessAudioTransition',
    null,
  ),
    _ts_decorate$5(
      [
        Bind(),
        _ts_metadata$5('design:type', Function),
        _ts_metadata$5('design:paramtypes', [void 0 === Io ? Object : Io]),
      ],
      SerialPlaybackController.prototype,
      'hasCapabilities',
      null,
    ),
    _ts_decorate$5(
      [
        Bind(),
        _ts_metadata$5('design:type', Function),
        _ts_metadata$5('design:paramtypes', []),
      ],
      SerialPlaybackController.prototype,
      'onRepeatModeChange',
      null,
    );
  class MKDialog {
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
      let p = `\n      <div id="mk-dialog-body">\n        ${this.message}\n        ${this.explanation}\n      </div>`;
      (p = `\n      ${p}\n      ${this.actions}\n    `),
        (d.innerHTML = p),
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
    constructor(e, n = '') {
      _define_property$f(this, '_message', void 0),
        _define_property$f(this, '_explanation', void 0),
        _define_property$f(this, 'id', void 0),
        _define_property$f(this, 'scrimId', void 0),
        _define_property$f(this, 'styleId', void 0),
        _define_property$f(this, '_cancelButtonString', void 0),
        _define_property$f(this, '_cancelButtonAction', void 0),
        _define_property$f(this, '_okButtonAction', void 0),
        _define_property$f(this, '_okButtonActionURL', void 0),
        _define_property$f(this, '_okButtonString', void 0),
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
          } catch (Ut) {}
        }),
        this._appendStyle(
          '\n#musickit-dialog {\n  --mk-dialog-background: rgba(255, 255, 255, 1);\n  --mk-dialog-text: rgba(0, 0, 0, 0.95);\n  --mk-dialog-border: rgba(0, 0, 0, 0.07);\n  --mk-dialog-scrim: rgba(255, 255, 255, 0.8);\n  --mk-dialog-primary: rgba(0, 122, 255, 1);\n}\n\n@media (prefers-color-scheme: dark) {\n  #musickit-dialog {\n      --mk-dialog-background: rgba(30, 30, 30, 1);\n      --mk-dialog-text: rgba(255, 255, 255, 0.85);\n      --mk-dialog-border: rgba(255, 255, 255, 0.1);\n      --mk-dialog-scrim: rgba(38, 38, 38, 0.8);\n      --mk-dialog-primary: rgba(8, 132, 255, 1);\n  }\n}\n\n#musickit-dialog-scrim {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.35);\n}\n\n#musickit-dialog * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -ms-touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, sans-serif;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n#musickit-dialog *:focus { outline: 0; }\n\n#musickit-dialog {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  -webkit-justify-content: space-between;\n  -moz-justify-content: space-between;\n  justify-content: space-between;\n  min-width: 277px;\n  max-width: 290px;\n  min-height: 109px;\n  background: var(--mk-dialog-background);\n  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.18);\n  border-radius: 10px;\n  color: var(--mk-dialog-text);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-left: -142px;\n  margin-top: -67px;\n  z-index: 9999999999999999999999999;\n}\n\n#musickit-dialog #mk-dialog-body {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  flex-direction: column;\n  flex-grow: 1;\n  -webkit-justify-content: space-evenly;\n  -moz-justify-content: space-evenly;\n  justify-content: space-evenly;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  padding: 10px 20px;\n  min-height: 74px;\n  text-align: center;\n}\n\n#musickit-dialog .mk-dialog h5 {\n  font-weight: 500;\n  line-height: 20px;\n  margin: 7px 0 0 0;\n  padding: 0;\n}\n\n#musickit-dialog .mk-dialog p {\n  margin: 0 0 7px 0;\n  padding: 0;\n  paddin-top: 3px;\n  line-height: 18px;\n  font-size: 13px;\n  font-weight: 300;\n}\n\n#musickit-dialog #mk-dialog-actions {\n  border-top: 1px solid var(--mk-dialog-border);\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  -moz-flex-direction: colrowumn;\n  flex-direction: row;\n  max-height: 41px;\n  min-height: 34px;\n  -webkit-justify-self: flex-end;\n  -moz-justify-self: flex-end;\n  justify-self: flex-end;\n}\n\n#musickit-dialog #mk-dialog-actions button {\n  flex-grow: 1;\n  border: 0;\n  background: none;\n  color: var(--mk-dialog-primary);\n  padding: 0;\n  margin: 0;\n  min-height: 34px;\n  height: 41px;\n  text-align: center;\n}\n\n#musickit-dialog #mk-dialog-actions *:nth-child(2) {\n  border-left: 1px solid var(--mk-dialog-border);\n  font-weight: 500;\n}\n',
        );
    }
  }
  var ca;
  function asyncGeneratorStep$i(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$e(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  !(function (e) {
    (e.MEDIA_API = 'media-api'), (e.UTS_CLIENT = 'uts-client');
  })(ca || (ca = {}));
  class APIServiceManager {
    get api() {
      return this.getApiByType(this._defaultAPI);
    }
    get apiService() {
      if (void 0 !== this._defaultAPI)
        return this._apisByType[this._defaultAPI];
      Be.error('There is no API instance configured');
    }
    get mediaAPI() {
      return this.getApiByType(ca.MEDIA_API);
    }
    get utsClient() {
      return this.getApiByType(ca.UTS_CLIENT);
    }
    getApiByType(e) {
      let n;
      if (
        (void 0 !== e && (n = this._apisByType[e]),
        void 0 === n || void 0 === n.api)
      )
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          'There is no API instance configured for the requested type: ' + e,
        );
      return n.api;
    }
    set defaultApiType(e) {
      this._defaultAPI = e;
    }
    registerAPIService(e) {
      var n,
        d = this;
      return ((n = function* () {
        const { apiType: n, configureFn: p, options: h } = e,
          y = h.apiOptions || {};
        void 0 === d._defaultAPI && (d._defaultAPI = n),
          (d._apisByType[n] = yield p.call(d, {
            apiOptions: y,
            store: d.store,
            dispatcher: d._dispatcher,
          }));
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$i(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$i(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    constructor(e, n) {
      _define_property$e(this, 'store', void 0),
        _define_property$e(this, '_dispatcher', void 0),
        _define_property$e(this, '_apisByType', void 0),
        _define_property$e(this, '_defaultAPI', void 0),
        (this.store = e),
        (this._dispatcher = n),
        (this._apisByType = {});
    }
  }
  const da = {};
  function adaptAddEventListener(e, n, d, p = {}) {
    const { once: h } = p,
      y = (function (e, n) {
        const d = getCallbacksForName(e),
          wrappedCallback = (e, d) => {
            n(d);
          };
        return d.push([n, wrappedCallback]), wrappedCallback;
      })(n, d);
    !0 === h ? e.subscribeOnce(n, y) : e.subscribe(n, y);
  }
  function getCallbacksForName(e) {
    let n = da[e];
    return n || ((n = []), (da[e] = n)), n;
  }
  function asyncGeneratorStep$h(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$h(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$h(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$h(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$d(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  const la = Be.createChild('rtc');
  class RTCStreamingTracker {
    get isConfigured() {
      return void 0 !== this.instance;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$h(function* () {
        n.instance = e.instance;
      })();
    }
    handleEvent(e, n, d) {}
    loadScript() {
      return _async_to_generator$h(function* () {
        if (!To.urls.rtc) throw new Error('bag.urls.rtc is not configured');
        yield loadScript(To.urls.rtc);
      })();
    }
    prepareReportingAgent(e) {
      this.clearReportingAgent();
      const {
        Sender: n,
        ClientName: d,
        ServiceName: p,
        ApplicationName: h,
        ReportingStoreBag: y,
        DeviceName: _,
      } = window.rtc.RTCReportingAgentConfigKeys;
      e = null != e ? e : this.instance.nowPlayingItem;
      const m = (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var d = null != arguments[n] ? arguments[n] : {},
            p = Object.keys(d);
          'function' == typeof Object.getOwnPropertySymbols &&
            (p = p.concat(
              Object.getOwnPropertySymbols(d).filter(function (e) {
                return Object.getOwnPropertyDescriptor(d, e).enumerable;
              }),
            )),
            p.forEach(function (n) {
              _define_property$d(e, n, d[n]);
            });
        }
        return e;
      })(
        {
          firmwareVersion: this.generateBrowserVersion(),
          model: this.options.browserName,
        },
        this.getMediaIdentifiers(e),
      );
      void 0 === this._storeBag && (this._storeBag = this.generateStoreBag());
      const g = {
        [n]: 'HLSJS',
        [d]: this.options.clientName,
        [p]: this.options.serviceName,
        [h]: this.options.applicationName,
        [y]: this._storeBag,
        [_]: this.options.osVersion,
        userInfoDict: m,
      };
      return (
        la.debug('RTC: creating reporting agent with config', g),
        (this.reportingAgent = new window.rtc.RTCReportingAgent(g)),
        la.debug('RTC: created reporting agent', this.reportingAgent),
        this.reportingAgent
      );
    }
    cleanup() {
      var e = this;
      return _async_to_generator$h(function* () {
        e.clearReportingAgent();
      })();
    }
    getMediaIdentifiers(e) {
      var n, d, p;
      const h = null === (n = e) || void 0 === n ? void 0 : n.defaultPlayable;
      if (h) {
        var y;
        const e = {};
        return (
          void 0 !==
            (null === (y = h.mediaMetrics) || void 0 === y
              ? void 0
              : y.MediaIdentifier) &&
            (e.MediaIdentifier = h.mediaMetrics.MediaIdentifier),
          void 0 !== h.channelId && (e.ContentProvider = h.channelId),
          e
        );
      }
      return 'musicVideo' ===
        (null === (d = e) || void 0 === d ? void 0 : d.type)
        ? { MediaIdentifier: 'adamid=' + e.id }
        : (null === (p = e) || void 0 === p ? void 0 : p.isLiveVideoStation)
          ? { MediaIdentifier: 'raid=' + e.id }
          : void 0;
    }
    clearReportingAgent() {
      void 0 !== this.reportingAgent &&
        (this.reportingAgent.destroy(),
        la.debug('RTC: called destroy on reporting agent', this.reportingAgent),
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
          applicationName: p,
          serviceName: h,
          browserName: y,
        } = this.options,
        _ = {
          iTunesAppVersion: `${`${To.app.name}-${To.app.build}`}/${
            null === (e = this.instance) || void 0 === e ? void 0 : e.version
          }`,
        },
        m = new window.rtc.RTCStorebag.RTCReportingStoreBag(n, d, h, p, y, _);
      return la.debug('RTC: created store bag', m), m;
    }
    constructor(e) {
      _define_property$d(this, 'options', void 0),
        _define_property$d(this, 'reportingAgent', void 0),
        _define_property$d(this, 'instance', void 0),
        _define_property$d(this, 'currentMediaItem', void 0),
        _define_property$d(this, '_storeBag', void 0),
        _define_property$d(this, 'requestedEvents', []),
        (this.options = e);
    }
  }
  function asyncGeneratorStep$g(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$c(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$4(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$4(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class PlayActivityService {
    cleanup() {
      this.trackers.forEach((e) => {
        var n, d;
        return null === (n = (d = e).cleanup) || void 0 === n
          ? void 0
          : n.call(d);
      }),
        this.clearIntention(),
        this.teardownListeners(),
        this.registeredEvents.clear();
    }
    configure(e) {
      var n,
        d = this;
      return ((n = function* () {
        d.cleanup(),
          (d.registeredEvents = (function (e) {
            const n = [];
            for (const d of e) n.push(...d.requestedEvents);
            return new Set(n);
          })(d.trackers)),
          d.setupListeners();
        try {
          yield Promise.all(d.trackers.map((n) => n.configure(e)));
        } catch (Ut) {
          Be.error('Error configuring a play activity service', Ut);
        }
      }),
      function () {
        var e = this,
          d = arguments;
        return new Promise(function (p, h) {
          var y = n.apply(e, d);
          function _next(e) {
            asyncGeneratorStep$g(y, p, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$g(y, p, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    getTrackerByType(e) {
      return this.trackers.find((n) => n instanceof e);
    }
    handleEvent(e, n = {}) {
      const d = this.addIntention(e, n);
      e === _t.playerActivate &&
        (d.flush = 'boolean' == typeof n.isPlaying ? !n.isPlaying : void 0);
      for (const p of this.trackers) p.handleEvent(e, d, n.item);
    }
    addIntention(e, n) {
      if (![_t.playbackPause, _t.playbackStop].includes(e)) return n;
      const d = (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var d = null != arguments[n] ? arguments[n] : {},
            p = Object.keys(d);
          'function' == typeof Object.getOwnPropertySymbols &&
            (p = p.concat(
              Object.getOwnPropertySymbols(d).filter(function (e) {
                return Object.getOwnPropertyDescriptor(d, e).enumerable;
              }),
            )),
            p.forEach(function (n) {
              _define_property$c(e, n, d[n]);
            });
        }
        return e;
      })({}, this.lastUserIntent, this.lastApplicationIntent, n);
      return this.clearIntention(), d;
    }
    clearIntention() {
      (this.lastUserIntent = void 0), (this.lastApplicationIntent = void 0);
    }
    recordApplicationIntent(e, n) {
      this.lastApplicationIntent = n;
    }
    recordUserIntent(e, n) {
      this.lastUserIntent = n;
    }
    setupListeners() {
      this.registeredEvents.forEach((e) => {
        this.dispatcher.subscribe(e, this.handleEvent);
      }),
        this.dispatcher.subscribe(_t.userActivityIntent, this.recordUserIntent),
        this.dispatcher.subscribe(
          _t.applicationActivityIntent,
          this.recordApplicationIntent,
        );
    }
    teardownListeners() {
      this.registeredEvents.forEach((e) => {
        this.dispatcher.unsubscribe(e, this.handleEvent);
      }),
        this.dispatcher.unsubscribe(
          _t.userActivityIntent,
          this.recordUserIntent,
        ),
        this.dispatcher.unsubscribe(
          _t.applicationActivityIntent,
          this.recordApplicationIntent,
        );
    }
    constructor(e, n) {
      _define_property$c(this, 'dispatcher', void 0),
        _define_property$c(this, 'trackers', void 0),
        _define_property$c(this, 'registeredEvents', void 0),
        _define_property$c(this, 'lastUserIntent', void 0),
        _define_property$c(this, 'lastApplicationIntent', void 0),
        _define_property$c(this, 'isConfigured', void 0),
        (this.dispatcher = e),
        (this.trackers = n),
        (this.registeredEvents = new Set()),
        (this.isConfigured = !0);
    }
  }
  function asyncGeneratorStep$f(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$f(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$f(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$f(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  _ts_decorate$4(
    [
      Bind(),
      _ts_metadata$4('design:type', Function),
      _ts_metadata$4('design:paramtypes', [String, Object]),
    ],
    PlayActivityService.prototype,
    'handleEvent',
    null,
  ),
    _ts_decorate$4(
      [
        Bind(),
        _ts_metadata$4('design:type', Function),
        _ts_metadata$4('design:paramtypes', [
          String,
          'undefined' == typeof ActivityIntention ? Object : ActivityIntention,
        ]),
      ],
      PlayActivityService.prototype,
      'recordApplicationIntent',
      null,
    ),
    _ts_decorate$4(
      [
        Bind(),
        _ts_metadata$4('design:type', Function),
        _ts_metadata$4('design:paramtypes', [
          String,
          'undefined' == typeof ActivityIntention ? Object : ActivityIntention,
        ]),
      ],
      PlayActivityService.prototype,
      'recordUserIntent',
      null,
    );
  const ua = BooleanDevFlag.register('mk-force-safari-hlsjs');
  function useNativeSafariPlayback() {
    return !ua.enabled;
  }
  function requiresHlsJs(e) {
    return _requiresHlsJs.apply(this, arguments);
  }
  function _requiresHlsJs() {
    return (_requiresHlsJs = _async_to_generator$f(function* (e) {
      const n = null != e ? e : yield findKeySystemPreference(),
        d = !useNativeSafariPlayback();
      return n !== We.FAIRPLAY || d;
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$e(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _define_property$b(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$3(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const pa = (function () {
    var e,
      n =
        ((e = function* (e, n, d) {
          const p = new Headers({
              Authorization: 'Bearer ' + n,
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Apple-Music-User-Token': '' + d,
            }),
            h = urlEncodeParameters(
              _object_spread_props$3(
                (function (e) {
                  for (var n = 1; n < arguments.length; n++) {
                    var d = null != arguments[n] ? arguments[n] : {},
                      p = Object.keys(d);
                    'function' == typeof Object.getOwnPropertySymbols &&
                      (p = p.concat(
                        Object.getOwnPropertySymbols(d).filter(function (e) {
                          return Object.getOwnPropertyDescriptor(d, e)
                            .enumerable;
                        }),
                      )),
                      p.forEach(function (n) {
                        _define_property$b(e, n, d[n]);
                      });
                  }
                  return e;
                })({}, e.playParams),
                { keyFormat: 'web' },
              ),
            ),
            y = `${To.urls.mediaApi}/play/assets?${h}`,
            _ = yield fetch(y, { method: 'GET', headers: p });
          if (500 === _.status) {
            const n = new MKError(MKError.Reason.SERVER_ERROR);
            throw ((n.data = e), n);
          }
          if (403 === _.status) {
            var m, g, b;
            let n;
            try {
              var S, P;
              (n = yield _.json()),
                (n =
                  null === (P = n) ||
                  void 0 === P ||
                  null === (S = P.errors) ||
                  void 0 === S
                    ? void 0
                    : S[0]);
            } catch (Ut) {}
            const d =
              '40303' === (null === (m = n) || void 0 === m ? void 0 : m.code)
                ? MKError.Reason.SUBSCRIPTION_ERROR
                : MKError.Reason.ACCESS_DENIED;
            var E;
            const p = new MKError(
              d,
              null !==
                (E = null === (g = n) || void 0 === g ? void 0 : g.title) &&
              void 0 !== E
                ? E
                : null === (b = n) || void 0 === b
                  ? void 0
                  : b.detail,
            );
            throw ((p.data = e), p);
          }
          if (!_.ok) {
            const n = new MKError(MKError.Reason.CONTENT_UNAVAILABLE);
            throw ((n.data = e), n);
          }
          const T = (yield _.json()).results;
          return (
            Be.debug(`media-item: loaded data from ${y}: ${JSON.stringify(T)}`),
            T
          );
        }),
        function () {
          var n = this,
            d = arguments;
          return new Promise(function (p, h) {
            var y = e.apply(n, d);
            function _next(e) {
              asyncGeneratorStep$e(y, p, h, _next, _throw, 'next', e);
            }
            function _throw(e) {
              asyncGeneratorStep$e(y, p, h, _next, _throw, 'throw', e);
            }
            _next(void 0);
          });
        });
    return function (e, d, p) {
      return n.apply(this, arguments);
    };
  })();
  function asyncGeneratorStep$d(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$d(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$d(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$d(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  const ha = (function () {
      var e = _async_to_generator$d(function* (e, n, d) {
        e.hasOffersHlsUrl
          ? yield ya(e)
          : e.isLiveRadioStation
            ? yield _a(e, n, d)
            : yield va(e, n, d);
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })(),
    ya = (function () {
      var e = _async_to_generator$d(function* (e) {
        var n, d;
        const p = To.urls.hlsOffersKeyUrls;
        if (!p)
          throw new MKError(MKError.Reason.CONTENT_UNSUPPORTED, 'HLS OFFERS');
        var h;
        e.updateWithLoadedKeys(p),
          e.updateWithLoadedAssets(
            void 0,
            null !==
              (h =
                null === (n = e.attributes) || void 0 === n
                  ? void 0
                  : n.assetUrl) && void 0 !== h
              ? h
              : null === (d = e.attributes.offers) || void 0 === d
                ? void 0
                : d[0].hlsUrl,
          ),
          yield fa(e, e.assetURL);
      });
      return function (n) {
        return e.apply(this, arguments);
      };
    })(),
    _a = (function () {
      var e = _async_to_generator$d(function* (e, n, d) {
        if (
          !To.features['playready-live-radio'] &&
          et === We.PLAYREADY &&
          'video' !== e.attributes.mediaKind &&
          !To.features['mse-live-radio']
        )
          throw new MKError(MKError.Reason.CONTENT_UNSUPPORTED, 'LIVE_RADIO');
        const p = (yield pa(e, n, d)).assets[0];
        e.updateWithLoadedKeys({
          'hls-key-cert-url': p.fairPlayKeyCertificateUrl,
          'hls-key-server-url': p.keyServerUrl,
          'widevine-cert-url': p.widevineKeyCertificateUrl,
        }),
          filterUnavailableLiveRadioUrls(p, e),
          e.isLiveVideoStation ? (e.assetURL = p.url) : yield fa(e, p.url);
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })(),
    fa = (function () {
      var e = _async_to_generator$d(function* (e, n) {
        let d;
        try {
          d = yield fetch(n);
        } catch (Ut) {
          throw makeContentUnavailableError(e);
        }
        const p = yield d.text();
        extractAssetsFromMasterManifest(p, n, e);
      });
      return function (n, d) {
        return e.apply(this, arguments);
      };
    })(),
    extractAssetsFromMasterManifest = (e, n, d) => {
      const p =
        /^#EXT-X-STREAM-INF:.*BANDWIDTH=(\d+),CODECS="(.*)"\s*\n(.*$)/gim;
      let h;
      for (; (h = p.exec(e)); ) {
        let [e, p, y, _] = h;
        /^http(s)?:\/\//.test(_) || (_ = rewriteLastUrlPath(n, _)),
          d.assets.push({ bandwidth: Number(p), codec: y, URL: _ });
      }
    },
    filterUnavailableLiveRadioUrls = (e, n) => {
      const d = new URL(e.url);
      if (!d.host.endsWith('.apple.com') && !d.host.endsWith('.applemusic.com'))
        throw makeContentUnavailableError(n);
    },
    makeContentUnavailableError = (e) => {
      const n = new MKError(MKError.Reason.CONTENT_UNAVAILABLE);
      return (n.data = e), n;
    },
    va = (function () {
      var e = _async_to_generator$d(function* (e, n, d) {
        var p;
        if (
          (Be.debug('mk: loadWithMZPlay', e.playParams),
          'podcast-episodes' === e.type)
        )
          return void (e.assetURL = e.attributes.assetUrl);
        if (!(yield hasMusicSubscription())) return;
        const h = null === (p = e.playParams) || void 0 === p ? void 0 : p.id,
          y = new Headers({
            Authorization: 'Bearer ' + n,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Apple-Music-User-Token': '' + d,
          });
        let _ = { salableAdamId: h };
        if (e.isCloudItem) {
          (_ = {}),
            e.playParams.purchasedId &&
              (_.purchaseAdamId = e.playParams.purchasedId),
            e.playParams.catalogId &&
              (_.subscriptionAdamId = e.playParams.catalogId);
          const n = /^a\.(\d+)$/;
          n.test(h)
            ? (_.subscriptionAdamId = h.replace(n, '$1'))
            : T(h) && (_.universalLibraryId = h);
        }
        if (!To.urls.webPlayback)
          throw new Error('bag.urls.webPlayback is not configured');
        const m = yield fetch(To.urls.webPlayback, {
            method: 'POST',
            body: JSON.stringify(_),
            headers: y,
          }),
          g = yield m.text(),
          b = JSON.parse(g);
        if (!b || !b.songList) {
          const n = MKError.serverError(b, MKError.Reason.UNSUPPORTED_ERROR);
          return (
            e.updateFromLoadError(n),
            Be.debug('mk: prepareItemWithMZPlay - rejecting with error', n),
            Promise.reject(n)
          );
        }
        const [S] = b.songList;
        e.updateFromSongList(S);
      });
      return function (n, d, p) {
        return e.apply(this, arguments);
      };
    })();
  function asyncGeneratorStep$c(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$c(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$c(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$c(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function prepareToPlayMediaItem(e, n) {
    return _prepareToPlayMediaItem.apply(this, arguments);
  }
  function _prepareToPlayMediaItem() {
    return (_prepareToPlayMediaItem = _async_to_generator$c(function* (e, n) {
      const { developerToken: d, userToken: p } = e.store;
      if (void 0 === d || void 0 === p)
        return Promise.reject(
          new MKError(
            MKError.Reason.AUTHORIZATION_ERROR,
            'Unable to prepare media item for play.',
          ),
        );
      if (n.isPreparedToPlay) Be.warn('media-item: item is prepared to play');
      else {
        if (
          (Be.debug('media-item: item.prepareToPlay playParams', n.playParams),
          (n.state = F.loading),
          n.isUTS)
        )
          return Promise.reject(
            new MKError(
              MKError.Reason.UNSUPPORTED_ERROR,
              'Item was not prepared to play',
            ),
          );
        yield ha(n, d, p);
      }
    })).apply(this, arguments);
  }
  function _shouldPlayPreview() {
    return (_shouldPlayPreview = _async_to_generator$c(function* (e, n) {
      return (
        !!e.previewURL &&
        (!!n ||
          (!e.playRawAssetURL &&
            ((!e.isUTS && !(yield hasMusicSubscription())) ||
              !hasAuthorization() ||
              !e.isPlayable ||
              (e.isUTS ? 'Preview' === e.type : !supportsDrm()))))
      );
    })).apply(this, arguments);
  }
  function _prepareForEncryptedPlayback() {
    return (_prepareForEncryptedPlayback = _async_to_generator$c(
      function* (e, n, d) {
        if ((Be.debug('prepareForEncryptedPlayback'), !hasAuthorization()))
          return Promise.reject(
            new MKError(
              MKError.Reason.AUTHORIZATION_ERROR,
              'Unable to prepare for playback.',
            ),
          );
        try {
          yield prepareToPlayMediaItem(e, n);
        } catch (Q) {
          if (Q.reason === MKError.Reason.AUTHORIZATION_ERROR)
            yield e.store.storekit.revokeUserToken();
          else if (Q.reason === MKError.Reason.TOKEN_EXPIRED)
            try {
              return (
                yield e.store.storekit.renewUserToken(),
                yield prepareToPlayMediaItem(e, n),
                (n.playbackData = _playbackDataForItem(n, d)),
                n
              );
            } catch (Ut) {}
          if (Q) return Promise.reject(Q);
        }
        return (n.playbackData = _playbackDataForItem(n, d)), n;
      },
    )).apply(this, arguments);
  }
  function _playbackDataForItem(n, d) {
    if ((Be.debug('mk: _playbackDataForItem', n), n.isCloudUpload))
      return n.assets[0];
    if ('musicVideo' !== n.type && !n.isLiveVideoStation) {
      if (!n.isLiveRadioStation) {
        const [e] = n.assets.filter((e) => {
          if (!('flavor' in e)) return !1;
          const n = new RegExp(
            `\\d{1,2}\\:(c${
              (
                null === (p = window.WebKitMediaKeys) || void 0 === p
                  ? void 0
                  : p.isTypeSupported(rt + '.1_0', Xe.AVC1)
              )
                ? 'bc'
                : 'tr'
            }p)(\\d{2,3})`,
            'i',
          );
          var p;
          const h = n.test(e.flavor);
          var y;
          const _ = null !== (y = e.flavor.match(n)) && void 0 !== y ? y : [];
          return h && parseInt(_[2], 10) <= d.bitrate;
        });
        return e;
      }
      {
        var p, h;
        const y = n.assets.reduce((e, n) => {
            const d = n.bandwidth;
            return e[d] || (e[d] = []), e[d].push(n), e;
          }, {}),
          _ = Object.keys(y).sort((e, n) => parseInt(e, 10) - parseInt(n, 10)),
          m = d.bitrate === e.PlaybackBitrate.STANDARD ? _[0] : _[_.length - 1];
        (null === (h = y) || void 0 === h || null === (p = h[m]) || void 0 === p
          ? void 0
          : p[0].URL) && (n.assetURL = y[m][0].URL);
      }
    }
  }
  function asyncGeneratorStep$b(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$b(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$b(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$b(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$a(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$3(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$3(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const ma = { keySystemGenericError: 'keySystemGenericError' },
    ga = new Set([MKError.Reason.DEVICE_LIMIT, MKError.Reason.GEO_BLOCK]),
    ba = {};
  (ba[We.FAIRPLAY] = 'fairplaystreaming'),
    (ba[We.PLAYREADY] = 'playready'),
    (ba[We.WIDEVINE] = 'widevine');
  const Sa = je.createChild('hlsjs-audio'),
    Pa = JsonDevFlag.register('mk-hlsjs-config-overrides');
  class HlsJsAudioPlayer extends BasePlayer {
    loadPreviewImage() {
      return _async_to_generator$b(function* () {})();
    }
    get _targetElement() {
      return this.mediaElement;
    }
    setNextSeamlessItem(e) {
      return _async_to_generator$b(function* () {})();
    }
    setPresentationMode(e) {
      return _async_to_generator$b(function* () {
        return Promise.resolve();
      })();
    }
    get shouldDispatchErrors() {
      return !this.userInitiated || this._playbackDidStart;
    }
    get currentPlayingDate() {
      var e;
      return null === (e = this.hls) || void 0 === e ? void 0 : e.playingDate;
    }
    get isPlayingAtLiveEdge() {
      var e;
      const n = this.hls;
      return (
        !(
          !n ||
          !(null === (e = this.nowPlayingItem) || void 0 === e
            ? void 0
            : e.isLinearStream)
        ) && !!n.isPlayingAtLive
      );
    }
    playItemFromEncryptedSource(n, d = !1, p = {}) {
      var h = this;
      return _async_to_generator$b(function* () {
        h.playbackState !== e.PlaybackStates.stopped
          ? ((n.playbackType = e.PlaybackType.encryptedFull),
            (h.nowPlayingItem = n),
            (n.state = F.loading),
            (h.userInitiated = d),
            yield h.playHlsStream(n.assetURL, n, p))
          : Sa.debug(
              'hlsjsAudioPlayer.playItemFromEncryptedSource aborting playback because player is stopped',
            );
      })();
    }
    isPlayerSupported() {
      return !0;
    }
    initializeMediaElement() {
      var e = this;
      return _async_to_generator$b(function* () {
        const n = nextAvailableAudioElement();
        (n.autoplay = !1),
          (n.id = 'apple-music-player'),
          (n.controls = !1),
          (n.muted = !1),
          (n.playbackRate = 1),
          (n.preload = 'metadata'),
          (n.volume = 1),
          (e.mediaElement = n),
          document.body.appendChild(n),
          Sa.debug('initializedMediaElement', n);
      })();
    }
    get seekableTimeRanges() {
      const e = this.hls;
      return e
        ? e.seekableTimeRanges
        : this.currentPlaybackDuration
          ? [{ start: 0, end: this.currentPlaybackDuration }]
          : void 0;
    }
    initializeExtension() {
      var e = this;
      return _async_to_generator$b(function* () {
        e._keySystem = yield findKeySystemPreference();
        try {
          var n;
          if (!Ye.urls.hls) throw new Error('bag.urls.hls is not configured');
          yield Promise.all([
            loadScript(Ye.urls.hls),
            null === (n = e._rtcTracker) || void 0 === n
              ? void 0
              : n.loadScript(),
          ]);
        } catch (Ut) {
          throw (
            (Sa.error(
              'hlsjs-audio-player failed to load script ' + Ye.urls.hls,
              Ut,
            ),
            Ut)
          );
        }
      })();
    }
    _stopMediaElement() {
      var e = this,
        _superprop_get__stopMediaElement = () => super._stopMediaElement;
      return _async_to_generator$b(function* () {
        yield _superprop_get__stopMediaElement().call(e), e.destroy();
      })();
    }
    destroy() {
      if ((Sa.debug('hlsjs-audio-player.destroy'), this.hls)) {
        const {
            ERROR: e,
            INTERNAL_ERROR: n,
            MANIFEST_PARSED: d,
            KEY_REQUEST_STARTED: p,
            LICENSE_CHALLENGE_CREATED: h,
            LEVEL_SWITCHED: y,
          } = window.Hls.Events,
          _ = this.hls;
        _.stopLoad(),
          _.detachMedia(),
          _.off(e, this.handleHlsError),
          _.off(n, this.handleHlsError),
          _.off(d, this.handleManifestParsed),
          _.off(p, this.handleKeyRequestStarted),
          _.off(h, this.handleLicenseChallengeCreated),
          _.off(y, this.handleLevelSwitched),
          _.destroy();
      }
      super.destroy(), asAsync(this._license.stop());
    }
    playHlsStream(e, n, d = {}) {
      var p = this;
      return _async_to_generator$b(function* () {
        const { _keySystem: h } = p;
        if (!h) return;
        let y, _;
        (p._unrecoverableError = void 0),
          p.createHlsPlayer(),
          h === We.WIDEVINE &&
            ((y = 'WIDEVINE_SOFTWARE'),
            (_ = {
              initDataTypes: ['cenc', 'keyids'],
              distinctiveIdentifier: 'optional',
              persistentState: 'required',
            }));
        const m = {
            subs: 'accepts-css',
            platformInfo: {
              requiresCDMAttachOnStart: h !== We.NONE,
              maxSecurityLevel: y,
              keySystemConfig: _,
            },
            appData: { serviceName: Ye.app.name },
          },
          { _rtcTracker: g, hls: b } = p;
        if (g) {
          const e = g.prepareReportingAgent(n);
          void 0 !== e && (m.appData.reportingAgent = e);
        }
        Sa.debug('RTC: loadSource with load options', m);
        const S = p.startPlaybackSequence();
        return (
          Sa.info('Manifest already loaded, passing url to HLSJS', e),
          b.loadSource(e, m, d.startTime),
          b.attachMedia(p.mediaElement),
          n &&
            ((p._licenseServerUrl = n.keyURLs['hls-key-server-url']),
            h === We.FAIRPLAY
              ? b.setProtectionData({
                  fairplaystreaming: {
                    serverCertUrl: n.keyURLs['hls-key-cert-url'],
                  },
                })
              : b.setProtectionData({
                  widevine: { serverCertUrl: n.keyURLs['widevine-cert-url'] },
                })),
          S
        );
      })();
    }
    createHlsPlayer() {
      const { _keySystem: e } = this,
        { os: n } = this.services.runtime,
        { Hls: d } = window,
        p = ue.get(),
        h = {
          clearMediaKeysOnPromise: !1,
          debug: !!p,
          debugLevel: p,
          enablePerformanceLogging: !!p,
          enablePlayReadyKeySystem: !0,
          enableRtcReporting: void 0 !== this._rtcTracker,
          keySystemPreference: ba[e],
          useMediaKeySystemAccessFilter: !0,
          nativeControlsEnabled: n.isAndroid,
          enableID3Cues: !0,
        };
      ((e) => {
        const n = se.value;
        n &&
          n.socketurl &&
          isAppleHostname(n.socketurl) &&
          'carry-' === determineCdnBasePrefix() &&
          ((e.socketurl = n.socketurl),
          (e.socketid = n.socketid),
          (e.log = n.log));
      })(h),
        ((e) => {
          const n = Pa.value;
          n && 'object' == typeof n && Object.assign(e, n);
        })(h);
      const y = new d(h),
        {
          ERROR: _,
          INTERNAL_ERROR: m,
          MANIFEST_PARSED: g,
          KEY_REQUEST_STARTED: b,
          LICENSE_CHALLENGE_CREATED: S,
          LEVEL_SWITCHED: P,
        } = d.Events;
      y.on(_, this.handleHlsError),
        y.on(m, this.handleHlsError),
        y.on(g, this.handleManifestParsed),
        y.on(b, this.handleKeyRequestStarted),
        y.on(S, this.handleLicenseChallengeCreated),
        y.on(P, this.handleLevelSwitched),
        (this.hls = y);
    }
    handleLevelSwitched(e, n) {
      var d, p, h;
      const { level: y } = n;
      if (!y) return;
      const _ =
        null === (d = this._levels) || void 0 === d
          ? void 0
          : d.find((e) => e.persistentId === y);
      if (
        !_ ||
        (null === (p = this._currentLevel) || void 0 === p
          ? void 0
          : p.persistentId) ===
          (null === (h = _) || void 0 === h ? void 0 : h.persistentId)
      )
        return;
      this._currentLevel = _;
      const m =
        void 0 !== _.audioGroupId
          ? this._channelsByGroup[_.audioGroupId]
          : void 0;
      this._dispatcher.publish(_t.hlsLevelUpdated, { level: _, channels: m });
    }
    handleHlsError(e, n) {
      if (
        (Sa.warn('HLS.js error', JSON.stringify(n)), this._unrecoverableError)
      )
        return;
      let d = new MKError(MKError.Reason.UNSUPPORTED_ERROR, n.reason);
      d.data = n;
      const { keySystemGenericError: p } = ma;
      if (n.details !== p) {
        if (
          ('output-restricted' === n.reason &&
            (d = new MKError(MKError.Reason.OUTPUT_RESTRICTED, n.reason)),
          n.fatal)
        ) {
          if ((this.hls.destroy(), !this.shouldDispatchErrors)) throw d;
          this._dispatcher.publish(vt.mediaPlaybackError, d);
        }
      } else this._dispatcher.publish(p, d);
    }
    handleManifestParsed(e, n) {
      var d = this;
      return _async_to_generator$b(function* () {
        var e, p;
        let h;
        Sa.debug('handleManifestParsed', n),
          (d._levels = null !== (e = n.levels) && void 0 !== e ? e : []),
          (d.nowPlayingItem.state = F.ready),
          (d._channelsByGroup = (
            null !== (p = n.audioTracks) && void 0 !== p ? p : []
          ).reduce((e, n) => ((e[n.groupId] = n.channels), e), {}));
        try {
          yield d._playMedia();
        } catch (Ut) {
          throw (
            (Sa.warn('error from media element, possibly non-fatal', Ut), Ut)
          );
        } finally {
          h = yield d.finishPlaybackSequence();
        }
        return h;
      })();
    }
    handleKeyRequestStarted(e, n) {
      Sa.debug('hlsjs-video.handleKeyRequestStarted'),
        this.hls.generateKeyRequest(n.keyuri, {});
    }
    handleLicenseChallengeCreated(n, d) {
      var p = this;
      return _async_to_generator$b(function* () {
        const {
          _licenseServerUrl: n,
          nowPlayingItem: h,
          _keySystem: y,
          userInitiated: _,
        } = p;
        try {
          var m, g;
          const e = yield null === (m = p._license) || void 0 === m
              ? void 0
              : m.start(n, h, d, y, _),
            b = { statusCode: e.status };
          (null === (g = e) || void 0 === g ? void 0 : g.license) &&
            (y === We.FAIRPLAY
              ? (b.ckc = Te(e.license))
              : (b.license = Te(e.license)));
          const S = e['renew-after'];
          S && (b.renewalDate = new Date(Date.now() + 1e3 * S)),
            p.hls.setLicenseResponse(d.keyuri, b);
        } catch (Ut) {
          var b;
          if (p._unrecoverableError) return;
          const h = Ut.data,
            y = {};
          void 0 !== (null === (b = h) || void 0 === b ? void 0 : b.status) &&
            (y.statusCode = +h.status),
            Sa.warn('Passing license response error to Hls.js', y),
            p.hls.setLicenseResponse(d.keyuri, y),
            ga.has(Ut.name) &&
              ((p._unrecoverableError = Ut),
              p.resetDeferredPlay(),
              yield p.stop({
                endReasonType: e.PlayActivityEndReasonType.FAILED_TO_LOAD,
                userInitiated: _,
              })),
            p.onPlaybackLicenseError(Ut);
        }
      })();
    }
    onPlaybackLicenseError(e) {
      this.resetDeferredPlay(),
        this._dispatcher.publish(Je.playbackLicenseError, e);
    }
    seekToTime(e) {
      var n = this;
      return _async_to_generator$b(function* () {
        n.hls
          ? (Sa.debug('hlsjs-video: hls seekTo', e), (n.hls.seekTo = e))
          : (Sa.debug('hlsjs-video: media element seek to', e),
            (n._targetElement.currentTime = e));
      })();
    }
    constructor(e) {
      var n, d;
      super(e),
        _define_property$a(this, 'currentAudioTrack', void 0),
        _define_property$a(this, 'currentTextTrack', void 0),
        _define_property$a(this, 'textTracks', []),
        _define_property$a(this, 'audioTracks', []),
        _define_property$a(this, 'userInitiated', !1),
        _define_property$a(this, 'mediaElement', void 0),
        _define_property$a(this, 'mediaPlayerType', 'hlsjs-audio'),
        _define_property$a(this, 'hls', void 0),
        _define_property$a(this, 'supportsPreviewImages', !1),
        _define_property$a(this, 'extension', void 0),
        _define_property$a(this, '_keySystem', void 0),
        _define_property$a(this, '_license', void 0),
        _define_property$a(this, '_rtcTracker', void 0),
        _define_property$a(this, '_levels', void 0),
        _define_property$a(this, '_channelsByGroup', {}),
        _define_property$a(this, '_currentLevel', void 0),
        _define_property$a(this, '_licenseServerUrl', void 0),
        _define_property$a(this, '_unrecoverableError', void 0),
        (this._rtcTracker =
          null === (d = e) ||
          void 0 === d ||
          null === (n = d.playbackServices) ||
          void 0 === n
            ? void 0
            : n.getRTCStreamingTracker()),
        (this._license = new License());
    }
  }
  function asyncGeneratorStep$a(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$a(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$a(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$a(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$9(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  _ts_decorate$3(
    [
      Bind(),
      _ts_metadata$3('design:type', Function),
      _ts_metadata$3('design:paramtypes', [void 0, void 0]),
    ],
    HlsJsAudioPlayer.prototype,
    'handleLevelSwitched',
    null,
  ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3('design:type', Function),
        _ts_metadata$3('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsAudioPlayer.prototype,
      'handleHlsError',
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3('design:type', Function),
        _ts_metadata$3('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsAudioPlayer.prototype,
      'handleManifestParsed',
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3('design:type', Function),
        _ts_metadata$3('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsAudioPlayer.prototype,
      'handleKeyRequestStarted',
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3('design:type', Function),
        _ts_metadata$3('design:paramtypes', [void 0, void 0]),
      ],
      HlsJsAudioPlayer.prototype,
      'handleLicenseChallengeCreated',
      null,
    ),
    _ts_decorate$3(
      [
        Bind(),
        _ts_metadata$3('design:type', Function),
        _ts_metadata$3('design:paramtypes', [
          'undefined' == typeof Error ? Object : Error,
        ]),
      ],
      HlsJsAudioPlayer.prototype,
      'onPlaybackLicenseError',
      null,
    ),
    _ts_decorate$3(
      [
        AsyncDebounce(250),
        _ts_metadata$3('design:type', Function),
        _ts_metadata$3('design:paramtypes', [Number]),
      ],
      HlsJsAudioPlayer.prototype,
      'seekToTime',
      null,
    );
  const Ea = BooleanDevFlag.register('mk-force-native-safari-video-player'),
    Ta = BooleanDevFlag.register('mk-force-hlsjs-video-player'),
    ka = BooleanDevFlag.register('mk-force-hls-audio-player'),
    wa = je.createChild('factory');
  class Factory {
    get isDestroyed() {
      return this._isDestroyed;
    }
    getPlayerForMediaItem(e) {
      var n = this;
      return _async_to_generator$a(function* () {
        let d;
        if (
          (wa.debug('Factory.getPlayerForMediaItem', e),
          (function (e) {
            return null != e && !isVideo(e);
          })(e))
        ) {
          const p = n.playersByType.get('audio');
          if (!e.hasOffersHlsUrl && p && !p.isDestroyed)
            return wa.debug('Returning pooled AudioPlayer'), p;
          (d = yield n.createAudioPlayer(e, n.playerOptions)),
            'audio' === d.mediaPlayerType && n.playersByType.set('audio', d);
        } else
          isVideo(e) && (d = yield n.createVideoPlayer(e, n.playerOptions));
        var p;
        if (void 0 === d)
          throw new Error(
            'Unable to create player for MediaItem: ' +
              (null === (p = e) || void 0 === p ? void 0 : p.id),
          );
        return (
          wa.debug('Initializing player: ' + d.constructor.name),
          yield d.initialize(),
          d
        );
      })();
    }
    createAudioPlayer(e, n) {
      return _async_to_generator$a(function* () {
        return e.hasOffersHlsUrl || ka.enabled
          ? (wa.debug('Creating HLSAudioPlayer'), new HlsJsAudioPlayer(n))
          : (wa.debug('Creating AudioPlayer'), new AudioPlayer(n));
      })();
    }
    createVideoPlayer(e, n) {
      return _async_to_generator$a(function* () {
        var d, p, h, y;
        return (
          wa.debug('Creating VideoPlayer'),
          Ea.enabled
            ? (wa.debug(
                'Creating NativeSafariVideoPlayer with mkForceSafariNativeVideoPlayer enabled',
              ),
              new NativeSafariVideoPlayer(n))
            : Ta.enabled
              ? (wa.debug(
                  'Creating HlsJsVideoPlayer with mkForceHlsjsVideoPlayer enabled',
                ),
                new HlsJsVideoPlayer(n))
              : (yield null === (d = n.playbackServices) || void 0 === d
                    ? void 0
                    : d.requiresHlsJs())
                ? (wa.debug(
                    'Creating HlsJsVideoPlayer required for the KeySystem',
                  ),
                  new HlsJsVideoPlayer(n))
                : e.isLiveVideoStation ||
                    e.isLinearStream ||
                    (null === (y = e.defaultPlayable) ||
                    void 0 === y ||
                    null === (h = y.assets) ||
                    void 0 === h ||
                    null === (p = h.fpsKeyServerUrl) ||
                    void 0 === p
                      ? void 0
                      : p.startsWith('https://linear.tv.apple.com'))
                  ? (wa.debug(
                      'Creating HlsJsVideoPlayer for Live Video stream',
                    ),
                    new HlsJsVideoPlayer(n))
                  : (wa.debug(
                      'Creating NativeSafariVideoPlayer as a fall through',
                    ),
                    new NativeSafariVideoPlayer(n))
        );
      })();
    }
    destroy() {
      this._isDestroyed = !0;
      for (const e of this.playersByType.values()) e.destroy();
      this.playersByType.clear();
    }
    constructor(e) {
      _define_property$9(this, 'playerOptions', void 0),
        _define_property$9(this, 'playersByType', void 0),
        _define_property$9(this, '_isDestroyed', !1),
        (this.playersByType = new Map()),
        (this.playerOptions = e);
    }
  }
  function asyncGeneratorStep$9(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$9(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$9(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$9(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$8(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _ts_decorate$2(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$2(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  const { mediaPlaybackError: Ia, playerTypeDidChange: Oa } = vt,
    { playbackLicenseError: Aa } = Je,
    { keySystemGenericError: Ra } = co,
    $a = (function () {
      var e = _async_to_generator$9(function* (e, n) {
        var d, p;
        if (
          null === (p = e.container) ||
          void 0 === p ||
          null === (d = p.attributes) ||
          void 0 === d
            ? void 0
            : d.requiresSubscription
        ) {
          if (!(yield n())) {
            const n = new MKError(MKError.Reason.SUBSCRIPTION_ERROR);
            throw ((n.data = e), n);
          }
        }
      });
      return function (n, d) {
        return e.apply(this, arguments);
      };
    })();
  let Ca = !1;
  class MediaItemPlayback {
    get isDestroyed() {
      return this._isDestroyed;
    }
    get currentPlaybackTime() {
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
      this._previewOnly = e;
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
    get supportsPreviewImages() {
      return this._currentPlayer.supportsPreviewImages;
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
          n.publish(vt.playbackVolumeDidChange, {}));
      this._updatePlayerState('volume', e);
    }
    clearNextManifest() {
      this._currentPlayer.clearNextManifest();
    }
    destroy() {
      var e, n;
      (this._isDestroyed = !0),
        this._playerFactory.destroy(),
        null === (e = this._dispatcher) ||
          void 0 === e ||
          e.unsubscribe(Aa, this.onPlaybackLicenseError),
        null === (n = this._dispatcher) ||
          void 0 === n ||
          n.unsubscribe(Ra, this.onKeySystemGenericError);
    }
    exitFullscreen() {
      return this._currentPlayer.exitFullscreen();
    }
    loadPreviewImage(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        return n._currentPlayer.loadPreviewImage(e);
      })();
    }
    getNewSeeker() {
      return this._currentPlayer.newSeeker();
    }
    mute() {
      (this._volumeAtMute = this.volume), (this.volume = 0);
    }
    pause(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        return n._currentPlayer.pause(e);
      })();
    }
    play() {
      var e = this;
      return _async_to_generator$9(function* () {
        return e._currentPlayer.play();
      })();
    }
    preload() {
      var e = this;
      return _async_to_generator$9(function* () {
        return e._currentPlayer.preload();
      })();
    }
    prepareToPlay(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        var d, p;
        He.debug('invoking prepareToPlay for ', e.title);
        const h = yield n.prepareForEncryptedPlayback(e, {
            bitrate: n._bitrateCalculator.bitrate,
          }),
          y =
            null === (d = n._currentPlayback) || void 0 === d ? void 0 : d.item,
          _ = Ye.features['seamless-audio-transitions'],
          m =
            'song' === (null === (p = y) || void 0 === p ? void 0 : p.type) &&
            'song' === e.type,
          g = !e.playRawAssetURL;
        return (
          _ &&
            m &&
            g &&
            (He.debug(`setting ${e.title} for seamless audio transition`),
            yield n._currentPlayer.setNextSeamlessItem(e)),
          h
        );
      })();
    }
    requestFullscreen(e) {
      return this._currentPlayer.requestFullscreen(e);
    }
    showPlaybackTargetPicker() {
      this._currentPlayer.showPlaybackTargetPicker();
    }
    seekToTime(e, n = St.Manual) {
      var d = this;
      return _async_to_generator$9(function* () {
        yield d._currentPlayer.seekToTime(e, n);
      })();
    }
    setPresentationMode(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        return n._currentPlayer.setPresentationMode(e);
      })();
    }
    startMediaItemPlayback(e, n = !1) {
      var d = this;
      return _async_to_generator$9(function* () {
        var p;
        He.debug('MediaItemPlayback: startMediaItemPlayback', e),
          e.resetState(),
          ((e, n) => {
            const { os: d } = n;
            if (e.isLinearStream && ('ios' === d.name || 'ipados' === d.name)) {
              He.warn('Cannot play linear stream on iOS or iPad');
              const n = new MKError(
                MKError.Reason.CONTENT_UNSUPPORTED,
                'IOS LINEAR',
              );
              throw ((n.data = { item: e }), n);
            }
          })(e, d.services.runtime),
          yield $a(e, d.hasMusicSubscription);
        const h = yield d._getPlayerForMediaItem(e);
        if (
          (yield d.setCurrentPlayer(h),
          !(null === (p = d._currentPlayer) || void 0 === p
            ? void 0
            : p.hasMediaElement))
        )
          return (
            He.warn(
              `MediaItemPlayback: Could not play media of type ${e.type}, marking item as unsupported and skipping.`,
            ),
            void e.notSupported()
          );
        try {
          const { dispatcher: p } = d.services;
          e.beginMonitoringStateDidChange((e) =>
            p.publish(A.mediaItemStateDidChange, e),
          ),
            e.beginMonitoringStateWillChange((e) =>
              p.publish(A.mediaItemStateWillChange, e),
            );
          const h = d.playOptions.get(e.id);
          h && d.playOptions.delete(e.id);
          const y = yield d._playAccordingToPlaybackType(e, n, h);
          return (d._currentPlayback = { item: e, userInitiated: n }), y;
        } catch (Q) {
          throw (e.updateFromLoadError(Q), He.error(Q.message, Q), Q);
        }
      })();
    }
    _playAccordingToPlaybackType(e, n, d) {
      var p = this;
      return _async_to_generator$9(function* () {
        return (yield (function (e, n) {
          return _shouldPlayPreview.apply(this, arguments);
        })(e, p._previewOnly))
          ? p._playPreview(e, n)
          : (function (e) {
                return !(!e.playRawAssetURL || !e.attributes.assetUrl);
              })(e)
            ? p._playRawAsset(e, n, d)
            : isBroadcastRadio(e)
              ? p._playBroadcastRadio(e, n)
              : (((e) => {
                  if (!supportsDrm()) {
                    const n = new MKError(
                      MKError.Reason.CONTENT_UNSUPPORTED,
                      'NO DRM',
                    );
                    throw (
                      ((n.data = { item: e }), He.warn('No DRM detected'), n)
                    );
                  }
                })(e),
                p._playEncryptedFull(e, n, d));
      })();
    }
    _playEncryptedFull(e, n, d) {
      var p = this;
      return _async_to_generator$9(function* () {
        if (
          (He.debug('MediaItemPlayback: play encrypted full', e),
          !e || !e.isPlayable)
        )
          return Promise.reject(
            new MKError(MKError.Reason.MEDIA_PLAYBACK, 'Not Playable'),
          );
        const h = p._currentPlayer;
        try {
          yield p.prepareForEncryptedPlayback(e, {
            bitrate: p._bitrateCalculator.bitrate,
          });
        } catch (Q) {
          return (
            He.error('prepareForEncryptedPlayback Error: userInitiated ' + n),
            h.destroy(),
            n ? Promise.reject(Q) : void h.dispatch(vt.mediaPlaybackError, Q)
          );
        }
        return (
          yield (function (e) {
            return new Promise((n, d) => {
              var p, h;
              const { ageGatePolicy: y } = e;
              if (!y || !y.age || !y.frequencyInMinutes)
                return (
                  Be.debug('No ageGatePolicy. Resolving handleAgeGate()'),
                  n(void 0)
                );
              const _ = getLocalStorage(),
                m =
                  null === (p = _) || void 0 === p
                    ? void 0
                    : p.ageGatePolicyAge,
                g =
                  null === (h = _) || void 0 === h
                    ? void 0
                    : h.ageGatePolicyExpiration;
              if (
                m &&
                g &&
                parseInt(g, 10) > Date.now() &&
                parseInt(m, 10) >= y.age
              )
                return n(void 0);
              MKDialog.clientDialog({
                okButtonString: 'Yes',
                okButtonAction: () => {
                  var e, d;
                  return (
                    null === (e = _) ||
                      void 0 === e ||
                      e.setItem('ageGatePolicyAge', y.age.toString()),
                    null === (d = _) ||
                      void 0 === d ||
                      d.setItem(
                        'ageGatePolicyExpiration',
                        (
                          Date.now() +
                          60 * y.frequencyInMinutes * 1e3
                        ).toString(),
                      ),
                    n(void 0)
                  );
                },
                cancelButtonString: 'No',
                cancelButtonAction: () =>
                  d(new MKError('AGE_GATE', 'Age Gate Declined')),
                explanation: `This content may not be appropriate for ages younger than ${y.age}.`,
                message: `Are you ${y.age} or older?`,
              }).present();
            });
          })(e),
          He.debug('About to play item as encrypted', e),
          yield h.playItemFromEncryptedSource(e, n, d),
          e
        );
      })();
    }
    _playBroadcastRadio(n, d) {
      var p = this;
      return _async_to_generator$9(function* () {
        if (
          (He.debug('MediaItemPlayback: play broadcast radio', n),
          !Ye.features['broadcast-radio'])
        ) {
          const e = new MKError(MKError.Reason.CONTENT_UNAVAILABLE);
          throw ((e.data = n), e);
        }
        const h = p._currentPlayer,
          y = h.isPaused() && !d,
          _ = yield pa(n, gn.developerToken, gn.musicUserToken),
          m = _.assets[0];
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (n.trackInfo = _['track-info']),
          (h.nowPlayingItem = n),
          yield h.playItemFromUnencryptedSource(m.url, y),
          n
        );
      })();
    }
    _playRawAsset(n, d, p) {
      var h = this;
      return _async_to_generator$9(function* () {
        He.debug('MediaItemPlayback: play raw asset', n);
        const y = h._currentPlayer,
          _ = y.isPaused() && !d;
        return (
          (n.playbackType = e.PlaybackType.unencryptedFull),
          (y.nowPlayingItem = n),
          yield y.playItemFromUnencryptedSource(n.attributes.assetUrl, _, p),
          n
        );
      })();
    }
    _playPreview(n, d) {
      var p = this;
      return _async_to_generator$9(function* () {
        He.debug('MediaItemPlayback: play preview', n);
        const h = p._currentPlayer,
          y = h.isPaused() && !d;
        return (
          supportsDrm() || h.dispatch(vt.drmUnsupported, { item: n }),
          (n.playbackType = e.PlaybackType.preview),
          (h.nowPlayingItem = n),
          yield h.playItemFromUnencryptedSource(n.previewURL, y),
          n
        );
      })();
    }
    stop(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        yield n._currentPlayer.stop(e);
      })();
    }
    unmute() {
      this.volume > 0 ||
        ((this.volume = this._volumeAtMute || 1),
        (this._volumeAtMute = void 0));
    }
    _getPlayerForMediaItem(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        He.trace('MediaItemPlayback._getPlayerForMediaItem', e);
        const d = yield n._playerFactory.getPlayerForMediaItem(e);
        return (
          He.trace('Applying default player state', d, n.playerState),
          Object.assign(d, n.playerState),
          d
        );
      })();
    }
    setCurrentPlayer(e) {
      var n = this;
      return _async_to_generator$9(function* () {
        var d;
        n._currentPlayer !== e &&
          (He.debug('MediaItemPlayback: setting currentPlayer', e),
          yield n._currentPlayer.stop(),
          (n._currentPlayer = e),
          null === (d = n._dispatcher) ||
            void 0 === d ||
            d.publish(Oa, { player: e }));
      })();
    }
    getCurrentPlayer() {
      return this._currentPlayer;
    }
    onKeySystemGenericError(e, n) {
      var d = this;
      return _async_to_generator$9(function* () {
        var e;
        Ca
          ? null === (e = d._dispatcher) || void 0 === e || e.publish(Ia, n)
          : ((Ca = !0),
            He.warn('Retrying playback after keysystemGenericError'),
            yield d.restartPlayback());
      })();
    }
    onPlaybackLicenseError(e, n) {
      var d = this;
      return _async_to_generator$9(function* () {
        var e;
        n.reason === MKError.Reason.PLAYREADY_CBC_ENCRYPTION_ERROR
          ? (He.warn(
              'MediaItemPlayback: PLAYREADY_CBC_ENCRYPTION_ERROR...retrying with different key system',
            ),
            yield d.restartPlayback())
          : null === (e = d._dispatcher) || void 0 === e || e.publish(Ia, n);
      })();
    }
    restartPlayback() {
      var e = this;
      return _async_to_generator$9(function* () {
        yield e.stop();
        const { _currentPlayback: n } = e;
        if (n) {
          const { item: d, userInitiated: p } = n;
          d.resetState(), yield e.startMediaItemPlayback(d, p);
        }
      })();
    }
    _updatePlayerState(e, n) {
      (this.playerState[e] = n), (this._currentPlayer[e] = n);
    }
    constructor(e) {
      _define_property$8(this, 'playerState', { playbackRate: 1, volume: 1 }),
        _define_property$8(this, 'playOptions', new Map()),
        _define_property$8(this, 'hasMusicSubscription', void 0),
        _define_property$8(this, 'prepareForEncryptedPlayback', void 0),
        _define_property$8(this, '_currentPlayer', void 0),
        _define_property$8(this, 'services', void 0),
        _define_property$8(this, '_dispatcher', void 0),
        _define_property$8(this, '_playerFactory', void 0),
        _define_property$8(this, '_previewOnly', !1),
        _define_property$8(this, '_volumeAtMute', void 0),
        _define_property$8(this, '_currentPlayback', void 0),
        _define_property$8(this, '_bitrateCalculator', void 0),
        _define_property$8(this, '_isDestroyed', !1);
      const { playbackServices: n } = e;
      var d, p;
      (this.hasMusicSubscription = n.hasMusicSubscription),
        (this.prepareForEncryptedPlayback = n.prepareForEncryptedPlayback),
        (d = e.tokens),
        (gn = d),
        e.bag && ((p = e.bag), Object.assign(Ye, p)),
        (this.services = e.services),
        (this._dispatcher = e.services.dispatcher),
        (this._bitrateCalculator = e.services.bitrateCalculator),
        (this._playerFactory = new Factory(e)),
        (this._currentPlayer = new PlayerStub(e)),
        this._dispatcher.subscribe(Aa, this.onPlaybackLicenseError),
        this._dispatcher.subscribe(Ra, this.onKeySystemGenericError);
    }
  }
  function asyncGeneratorStep$8(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$8(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$8(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$8(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$7(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$5(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$7(e, n, d[n]);
        });
    }
    return e;
  }
  function _ts_decorate$1(e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    return y > 3 && _ && Object.defineProperty(n, d, _), _;
  }
  function _ts_metadata$1(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  _ts_decorate$2(
    [
      Bind(),
      _ts_metadata$2('design:type', Function),
      _ts_metadata$2('design:paramtypes', [void 0, void 0]),
    ],
    MediaItemPlayback.prototype,
    'onKeySystemGenericError',
    null,
  ),
    _ts_decorate$2(
      [
        Bind(),
        _ts_metadata$2('design:type', Function),
        _ts_metadata$2('design:paramtypes', [void 0, void 0]),
      ],
      MediaItemPlayback.prototype,
      'onPlaybackLicenseError',
      null,
    );
  const Ma = [
      MKError.Reason.AGE_VERIFICATION,
      MKError.Reason.CONTENT_EQUIVALENT,
      MKError.Reason.CONTENT_RESTRICTED,
      MKError.Reason.CONTENT_UNAVAILABLE,
      MKError.Reason.CONTENT_UNSUPPORTED,
      MKError.Reason.SERVER_ERROR,
      MKError.Reason.SUBSCRIPTION_ERROR,
      MKError.Reason.UNSUPPORTED_ERROR,
      MKError.Reason.USER_INTERACTION_REQUIRED,
    ],
    Da = JsonDevFlag.register('mk-bag-features-overrides');
  class MKInstance {
    get developerToken() {
      return wo.developerToken;
    }
    get api() {
      return this._services.apiManager.api;
    }
    get audioTracks() {
      return this._mediaItemPlayback.audioTracks;
    }
    get authorizationStatus() {
      return wo.authorizationStatus;
    }
    get bitrate() {
      return this._services.bitrateCalculator.bitrate;
    }
    set bitrate(e) {
      this._services.bitrateCalculator.bitrate = e;
    }
    get browserSupportsPictureInPicture() {
      return detectPictureInPictureSupport();
    }
    get browserSupportsVideoDrm() {
      return supportsDrm();
    }
    get cid() {
      return (
        (this.realm === e.SKRealm.TV || this.sourceType !== Lt.MUSICKIT) &&
        wo.cid
      );
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
    set autoplayEnabled(n) {
      this.realm !== e.SKRealm.MUSIC && (n = !1),
        n !== this.autoplayEnabled &&
          ((this._autoplayEnabled = n),
          this._services.dispatcher.publish(
            So.autoplayEnabledDidChange,
            this.autoplayEnabled,
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
      return wo.isAuthorized;
    }
    get isPlaying() {
      return this._playbackController.isPlaying;
    }
    get isRestricted() {
      return wo.isRestricted;
    }
    get metricsClientId() {
      return wo.metricsClientId;
    }
    set metricsClientId(e) {
      wo.metricsClientId = e;
    }
    get musicUserToken() {
      return wo.musicUserToken;
    }
    set musicUserToken(e) {
      (e && wo.musicUserToken === e) || (wo.musicUserToken = e);
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
      const d = n === e.PlaybackMode.PREVIEW_ONLY,
        p = this._services.mediaItemPlayback;
      p && (p.previewOnly = d),
        this._playbackMode !== n &&
          ((this._playbackController.playbackMode = n),
          (this._playbackMode = n));
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
      return wo.realm;
    }
    get repeatMode() {
      return this._playbackController.repeatMode;
    }
    set repeatMode(e) {
      this._playbackController.repeatMode = e;
    }
    set requestUserToken(e) {
      wo.requestUserToken = e;
    }
    get restrictedEnabled() {
      return wo.restrictedEnabled;
    }
    set restrictedEnabled(e) {
      wo.restrictedEnabled = e;
    }
    get supportsPreviewImages() {
      return this._mediaItemPlayback.supportsPreviewImages;
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
      return wo.storefrontCountryCode;
    }
    get subscribeURL() {
      return wo.subscribeURL;
    }
    get subscribeFamilyURL() {
      return wo.subscribeFamilyURL;
    }
    get subscribeIndividualURL() {
      return wo.subscribeIndividualURL;
    }
    get subscribeStudentURL() {
      return wo.subscribeStudentURL;
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
      return wo.storefrontId;
    }
    set storefrontId(e) {
      wo.storefrontId = e;
    }
    get _mediaItemPlayback() {
      return this._services.mediaItemPlayback;
    }
    get _playbackController() {
      if (void 0 !== this._playbackControllerInternal)
        return this._playbackControllerInternal;
      He.debug('setting _playbackController');
      const e = this._getPlaybackControllerByType(qo.serial);
      return (this._playbackController = e), e;
    }
    set _playbackController(e) {
      (this._playbackControllerInternal = e),
        (this._playbackControllerInternal.autoplayEnabled =
          this._autoplayEnabled),
        this._playbackControllerInternal.activate(),
        this.capabilities.updateChecker(
          this._playbackControllerInternal.hasCapabilities,
        ),
        (this.capabilities.controller = this._playbackControllerInternal);
    }
    addEventListener(e, n, d = {}) {
      adaptAddEventListener(this._services.dispatcher, e, n, d);
    }
    authorize() {
      var e = this;
      return _async_to_generator$8(function* () {
        return e.deferPlayback(), wo.authorize();
      })();
    }
    canAuthorize() {
      return supportsDrm() && !this.isAuthorized;
    }
    canUnauthorize() {
      return supportsDrm() && this.isAuthorized;
    }
    changeToMediaAtIndex(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        n._isPlaybackSupported() &&
          (yield n._validateAuthorization(),
          n._signalChangeItemIntent(),
          yield n._playbackController.changeToMediaAtIndex(e));
      })();
    }
    changeToMediaItem(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        He.debug('instance.changeToMediaItem', e),
          n._isPlaybackSupported() &&
            (yield n._validateAuthorization(),
            n._signalChangeItemIntent(),
            yield n._playbackController.changeToMediaItem(e));
      })();
    }
    changeUserStorefront(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        n.storefrontId = e;
      })();
    }
    cleanup() {
      var n = this;
      return _async_to_generator$8(function* () {
        var d;
        null === (d = n._services.mediaItemPlayback) ||
          void 0 === d ||
          d.destroy(),
          n._signalIntent({
            endReasonType: e.PlayActivityEndReasonType.EXITED_APPLICATION,
          });
        const p = Object.keys(n._playbackControllers).map((e) =>
          n._playbackControllers[e].destroy(),
        );
        try {
          yield Promise.all(p);
        } catch (Ut) {
          He.error('Error cleaning up controller', Ut);
        }
        n._services.dispatcher.clear();
      })();
    }
    configure(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        return (n._whenConfigured = n._configure(e)), n._whenConfigured;
      })();
    }
    _configure(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        yield wo.storekit.whenAuthCompleted;
        const d = e.map(
          n._services.apiManager.registerAPIService,
          n._services.apiManager,
        );
        yield Promise.all(d),
          yield n._configurePlayActivity(),
          n._initializeExternalEventPublishing();
      })();
    }
    deferPlayback() {
      He.debug('deferPlayback', this._playbackControllerInternal),
        deferPlayback();
    }
    me() {
      return _async_to_generator$8(function* () {
        try {
          return yield wo.storekit.me();
        } catch (Ut) {
          return Promise.reject(
            new MKError(MKError.Reason.AUTHORIZATION_ERROR, 'Unauthorized'),
          );
        }
      })();
    }
    hasMusicSubscription() {
      return hasMusicSubscription(wo.storekit);
    }
    mute() {
      return this._mediaItemPlayback.mute();
    }
    pause(n) {
      var d = this;
      return _async_to_generator$8(function* () {
        if (d._isPlaybackSupported()) {
          try {
            d._signalIntent({
              endReasonType:
                e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED,
            }),
              yield d._playbackController.pause(n);
          } catch (Q) {
            d._handlePlaybackError(Q);
          }
          return Promise.resolve();
        }
      })();
    }
    play() {
      var e = this;
      return _async_to_generator$8(function* () {
        if ((He.debug('instance.play()'), e._isPlaybackSupported())) {
          yield e._validateAuthorization();
          try {
            yield e._playbackController.play();
          } catch (Q) {
            e._handlePlaybackError(Q);
          }
          return Promise.resolve();
        }
      })();
    }
    playMediaItem(e, n) {
      var d = this;
      return _async_to_generator$8(function* () {
        var p, h, y, _;
        if (
          (He.debug('mk: playMediaItem', e),
          (null === (p = n) || void 0 === p ? void 0 : p.bingeWatching) ||
            d.deferPlayback(),
          (n = _object_spread$5({}, n)),
          (null === (h = e) || void 0 === h ? void 0 : h.playEvent) &&
            !hasOwn(n, 'startTime'))
        ) {
          const { playEvent: d } = e;
          d.isDone ||
            void 0 === d.playCursorInSeconds ||
            (n.startTime = d.playCursorInSeconds);
        }
        d.services.dispatcher.publish(So.playInitiated, {
          item: e,
          timestamp:
            null !==
              (_ =
                null === (y = n.meta) || void 0 === y
                  ? void 0
                  : y.initiatedTimestamp) && void 0 !== _
              ? _
              : Date.now(),
        });
        try {
          n && d._mediaItemPlayback.playOptions.set(e.id, n);
          const p = yield d._playbackController.playSingleMediaItem(e, n);
          return d.services.dispatcher.publish(So.capabilitiesChanged), p;
        } catch (Q) {
          He.error('mk:playMediaItem error', Q), d._handlePlaybackError(Q);
        }
      })();
    }
    removeEventListener(e, n) {
      !(function (e, n, d) {
        const p = getCallbacksForName(n);
        let h;
        for (let y = p.length - 1; y >= 0; y--) {
          const [e, n] = p[y];
          if (e === d) {
            (h = n), p.splice(y, 1);
            break;
          }
        }
        h && e.unsubscribe(n, h);
      })(this._services.dispatcher, e, n);
    }
    exitFullscreen() {
      return this._mediaItemPlayback.exitFullscreen();
    }
    requestFullscreen(e) {
      return this._mediaItemPlayback.requestFullscreen(e);
    }
    loadPreviewImage(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        return n._mediaItemPlayback.loadPreviewImage(e);
      })();
    }
    getNewSeeker() {
      return this._playbackController.getNewSeeker();
    }
    seekToTime(e, n = St.Manual) {
      var d = this;
      return _async_to_generator$8(function* () {
        if (d._isPlaybackSupported()) {
          yield d._validateAuthorization();
          try {
            yield d._playbackController.seekToTime(e, n);
          } catch (Q) {
            d._handlePlaybackError(Q);
          }
          return Promise.resolve();
        }
      })();
    }
    setPresentationMode(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        return n._mediaItemPlayback.setPresentationMode(e);
      })();
    }
    skipToNextItem() {
      var n = this;
      return _async_to_generator$8(function* () {
        if (n._isPlaybackSupported()) {
          yield n._validateAuthorization(),
            n._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            });
          try {
            yield n._playbackController.skipToNextItem();
          } catch (Q) {
            n._handlePlaybackError(Q);
          }
        }
      })();
    }
    skipToPreviousItem() {
      var n = this;
      return _async_to_generator$8(function* () {
        if (n._isPlaybackSupported()) {
          yield n._validateAuthorization(),
            n._signalIntent({
              endReasonType:
                e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_BACKWARDS,
            });
          try {
            yield n._playbackController.skipToPreviousItem();
          } catch (Q) {
            n._handlePlaybackError(Q);
          }
        }
      })();
    }
    seekForward() {
      var n = this;
      return _async_to_generator$8(function* () {
        if (n._isPlaybackSupported()) {
          yield n._validateAuthorization();
          try {
            n._signalIntent({
              endReasonType: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
              direction: e.PlayActivityEndReasonType.TRACK_SKIPPED_FORWARDS,
            }),
              yield n._playbackController.seekForward();
          } catch (Q) {
            n._handlePlaybackError(Q);
          }
        }
      })();
    }
    seekBackward() {
      var e = this;
      return _async_to_generator$8(function* () {
        if (e._isPlaybackSupported()) {
          yield e._validateAuthorization();
          try {
            yield e._playbackController.seekBackward();
          } catch (Q) {
            e._handlePlaybackError(Q);
          }
        }
      })();
    }
    showPlaybackTargetPicker() {
      this._playbackController.showPlaybackTargetPicker();
    }
    stop(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        var d, p;
        if (n._isPlaybackSupported()) {
          var h;
          n._signalIntent({
            endReasonType:
              null === (d = e) || void 0 === d ? void 0 : d.endReasonType,
            userInitiated:
              null ===
                (h =
                  null === (p = e) || void 0 === p
                    ? void 0
                    : p.userInitiated) ||
              void 0 === h ||
              h,
          });
          try {
            yield n._playbackController.stop(e);
          } catch (Q) {
            n._handlePlaybackError(Q);
          }
        }
      })();
    }
    unauthorize() {
      return _async_to_generator$8(function* () {
        return wo.unauthorize();
      })();
    }
    unmute() {
      return this._mediaItemPlayback.unmute();
    }
    _createPlayerControllerOptions() {
      var e;
      return {
        tokens: wo,
        bag: To,
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
              return _prepareForEncryptedPlayback.apply(this, arguments);
            })(this._services.apiManager, e, n),
          requiresHlsJs: requiresHlsJs,
        },
        services: this._services,
        context: this.context,
        autoplayEnabled: this.autoplayEnabled,
        privateEnabled: this.privateEnabled,
        siriInitiated: this.siriInitiated,
        storekit: null === (e = wo) || void 0 === e ? void 0 : e.storekit,
        playbackMode: this.playbackMode,
      };
    }
    _getPlaybackControllerByType(e) {
      const n = this._playbackControllers[e];
      if (n) return n;
      let d;
      switch (e) {
        case qo.serial:
          d = new SerialPlaybackController(
            this._createPlayerControllerOptions(),
          );
          break;
        case qo.continuous:
          d = new ContinuousPlaybackController(
            this._createPlayerControllerOptions(),
          );
          break;
        default:
          throw new MKError(
            MKError.Reason.UNSUPPORTED_ERROR,
            'Unsupported controller requested: ' + e,
          );
      }
      return (this._playbackControllers[e] = d), d;
    }
    _handlePlaybackError(e) {
      if (
        (He.error('mediaPlaybackError', e),
        MKError.isMKError(e) && Ma.includes(e.reason))
      )
        throw e;
      this._playbackErrorDialog &&
        !this._services.runtime.isNodeEnvironment &&
        MKDialog.presentError(e);
    }
    _initializeInternalEventHandling() {
      wo.storekit.addEventListener(So.userTokenDidChange, () => {
        this._whenConfigured &&
          this._whenConfigured
            .then(() => this._configurePlayActivity().catch())
            .catch();
      });
      const n = this._services.dispatcher;
      n.subscribe(So.mediaPlaybackError, (e, n) =>
        this._handlePlaybackError(n),
      ),
        n.subscribe(So.playbackStateDidChange, (n, d) => {
          d.state === e.PlaybackStates.paused &&
            (He.debug(
              'mk: playbackStateDidChange callback - calling storekit.presentSubscribeViewForEligibleUsers',
            ),
            wo.storekit.presentSubscribeViewForEligibleUsers(
              { state: d.state, item: this.nowPlayingItem },
              !1,
            ));
        });
    }
    _initializeExternalEventPublishing() {
      [
        So.authorizationStatusDidChange,
        So.storefrontCountryCodeDidChange,
        So.storefrontIdentifierDidChange,
        So.userTokenDidChange,
        So.eligibleForSubscribeView,
      ].forEach((e) => {
        wo.storekit.addEventListener(e, (n) =>
          this._services.dispatcher.publish(e, n),
        );
      });
      const e = pt[this.storefrontId.toUpperCase()],
        n = dt[e];
      this._services.dispatcher.subscribe(jn, (e, d) => {
        d.resolveAdamIdFromStorefront(n),
          this._services.dispatcher.publish(So.timedMetadataDidChange, d);
      });
    }
    configureLogger(e) {
      var n;
      He.level === Ge &&
        (!0 === e.debug
          ? setRootLoggingLevel(R.DEBUG)
          : void 0 !== e.logLevel && setRootLoggingLevel(e.logLevel)),
        void 0 !== e.logHandler &&
          ((n = e.logHandler), (He.handlers.external = new CallbackHandler(n)));
    }
    _configurePlayActivity() {
      var e = this;
      return _async_to_generator$8(function* () {
        void 0 !== e._services.playActivity &&
          (yield e._services.playActivity.configure({
            instance: e,
            services: e._services,
          }));
      })();
    }
    _isPlaybackSupported() {
      return (
        !this._services.runtime.isNodeEnvironment ||
        (He.warn('Media playback is not supported in Node environments.'), !1)
      );
    }
    _updatePlaybackController(e) {
      var n = this;
      return _async_to_generator$8(function* () {
        He.debug('mk: _updatePlaybackController', e),
          n._playbackControllerInternal !== e &&
            (n._playbackControllerInternal &&
              (yield n._playbackControllerInternal.deactivate()),
            (n._playbackController = e));
      })();
    }
    _signalChangeItemIntent() {
      this._signalIntent({
        endReasonType:
          e.PlayActivityEndReasonType.MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM,
      });
    }
    _signalIntent(e) {
      this.services.dispatcher.publish(
        _t.userActivityIntent,
        _object_spread$5({ userInitiated: !0 }, e),
      );
    }
    _validateAuthorization(n = !1) {
      var d = this;
      return _async_to_generator$8(function* () {
        (n || d.playbackMode === e.PlaybackMode.FULL_PLAYBACK_ONLY) &&
          ((void 0 !== d._playbackControllerInternal &&
            d._playbackControllerInternal.isReady &&
            d._playbackControllerInternal.isPlaying) ||
            (yield d.authorize()));
      })();
    }
    constructor(n, d, p) {
      if (
        (_define_property$7(this, 'app', void 0),
        _define_property$7(this, 'capabilities', void 0),
        _define_property$7(this, 'context', void 0),
        _define_property$7(this, '_autoplayEnabled', !1),
        _define_property$7(this, 'id', void 0),
        _define_property$7(this, 'prefix', void 0),
        _define_property$7(this, 'privateEnabled', !1),
        _define_property$7(this, 'siriInitiated', !1),
        _define_property$7(this, 'sourceType', Lt.MUSICKIT),
        _define_property$7(this, 'version', e.version),
        _define_property$7(this, 'playbackActions', void 0),
        _define_property$7(this, 'guid', void 0),
        _define_property$7(this, '_bag', To),
        _define_property$7(this, '_playbackControllers', {}),
        _define_property$7(this, '_playbackControllerInternal', void 0),
        _define_property$7(this, '_services', void 0),
        _define_property$7(this, '_playbackErrorDialog', !0),
        _define_property$7(this, '_playbackMode', e.PlaybackMode.MIXED_CONTENT),
        _define_property$7(this, '_whenConfigured', void 0),
        'string' != typeof n)
      )
        throw new Error('MusicKit was initialized without an developerToken.');
      Object.assign(
        To.features,
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
        })(p.features),
      );
      const h = Da.get();
      h &&
        (He.warn('Overriding bag.features with', h),
        (To.features = _object_spread$5({}, To.features, h))),
        Object.assign(To.autoplay, p.autoplay),
        (this.context = {});
      const y = new PubSub();
      (this.capabilities = new Capabilities(y)),
        p.playbackActions && (this.playbackActions = p.playbackActions),
        p.guid && (this.guid = p.guid);
      const _ = new TimingAccuracy(!!To.features['player-accurate-timing']),
        m = new BitrateCalculator(y, p.bitrate);
      (this._services = {
        runtime: d,
        dispatcher: y,
        timing: _,
        bitrateCalculator: m,
      }),
        void 0 !== p.playActivityAPI &&
          (this._services.playActivity = new PlayActivityService(
            y,
            p.playActivityAPI,
          )),
        (p.services = this._services),
        this.configureLogger(p),
        (To.app = p.app || {}),
        (To.store = new DataStore({
          filter: getFilterFromFlags(p.storeFilterTypes || []),
          shouldDisableRecordReuse:
            !!To.features['disable-data-store-record-reuse'],
        })),
        Object.assign(To.urls, p.urls || {});
      const g = (function (e, n) {
        return (wo = new Store(e, n)), wo;
      })(n, p);
      this._services.apiManager = new APIServiceManager(g, y);
      const b = new MediaItemPlayback(this._createPlayerControllerOptions());
      (this._services.mediaItemPlayback = b),
        p.sourceType && (this.sourceType = p.sourceType),
        this._initializeInternalEventHandling(),
        p.bitrate && (this.bitrate = p.bitrate),
        p.prefix &&
          /^(?:web|preview)$/.test(p.prefix) &&
          (this.prefix = To.prefix = p.prefix),
        p.suppressErrorDialog &&
          (this._playbackErrorDialog = !p.suppressErrorDialog),
        void 0 !== p.playbackMode && (this.playbackMode = p.playbackMode),
        (this.privateEnabled = p.privateEnabled || !1),
        (this.siriInitiated = p.siriInitiated || !1),
        (this.id = generateUUID()),
        He.info('MusicKit JS Version: ' + this.version),
        He.info('InstanceId', this.id),
        He.debug('Link Parameters', p.linkParameters),
        To.app && He.debug('App', To.app);
    }
  }
  function asyncGeneratorStep$7(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$7(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$7(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$7(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function dispatchDocumentEvent(e) {
    if (detectNodeEnvironment()) return;
    const n = new Event(e, { bubbles: !0, cancelable: !0 });
    setTimeout(() => document.dispatchEvent(n));
  }
  function _loadWebComponents() {
    return (_loadWebComponents = _async_to_generator$7(function* () {
      var e, n;
      if (detectNodeEnvironment()) return;
      const d = findScript('musickit.js');
      if (
        '' !==
        (null === (n = d) ||
        void 0 === n ||
        null === (e = n.dataset) ||
        void 0 === e
          ? void 0
          : e.webComponents)
      )
        return;
      const p = 'noModule' in d,
        h = `components/musickit-components/musickit-components${
          p ? '.esm' : ''
        }.js`,
        y = 'https:' + cdnBaseURL(h) + h,
        _ = {};
      p && (_.type = 'module'),
        d.hasAttribute('async') && (_.async = ''),
        d.hasAttribute('defer') && (_.defer = ''),
        yield loadScript(y, _),
        dispatchDocumentEvent(So.webComponentsLoaded);
    })).apply(this, arguments);
  }
  function asyncGeneratorStep$6(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$6(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$6(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$6(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$6(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$4(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$6(e, n, d[n]);
        });
    }
    return e;
  }
  _ts_decorate$1(
    [
      AsyncDebounce(250, { isImmediate: !0 }),
      _ts_metadata$1('design:type', Function),
      _ts_metadata$1('design:paramtypes', [
        'undefined' == typeof ActivityNotificationOptions
          ? Object
          : ActivityNotificationOptions,
      ]),
    ],
    MKInstance.prototype,
    'pause',
    null,
  ),
    _ts_decorate$1(
      [
        AsyncDebounce(250, { isImmediate: !0 }),
        _ts_metadata$1('design:type', Function),
        _ts_metadata$1('design:paramtypes', []),
      ],
      MKInstance.prototype,
      'play',
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync('skip'),
        _ts_metadata$1('design:type', Function),
        _ts_metadata$1('design:paramtypes', []),
      ],
      MKInstance.prototype,
      'skipToNextItem',
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync('skip'),
        _ts_metadata$1('design:type', Function),
        _ts_metadata$1('design:paramtypes', []),
      ],
      MKInstance.prototype,
      'skipToPreviousItem',
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync('seek'),
        _ts_metadata$1('design:type', Function),
        _ts_metadata$1('design:paramtypes', []),
      ],
      MKInstance.prototype,
      'seekForward',
      null,
    ),
    _ts_decorate$1(
      [
        SerialAsync('seek'),
        _ts_metadata$1('design:type', Function),
        _ts_metadata$1('design:paramtypes', []),
      ],
      MKInstance.prototype,
      'seekBackward',
      null,
    );
  const xa = 'undefined' != typeof window && 'undefined' != typeof document;
  let La = !1;
  const Na = [];
  function cleanupInstances() {
    return _cleanupInstances.apply(this, arguments);
  }
  function _cleanupInstances() {
    return (_cleanupInstances = _async_to_generator$6(function* () {
      const e = Na.map((e) => e.cleanup());
      yield Promise.all(e), Na.splice(0, Na.length);
    })).apply(this, arguments);
  }
  function configure$2(e) {
    return _configure$1.apply(this, arguments);
  }
  function _configure$1() {
    return (_configure$1 = _async_to_generator$6(function* (
      e,
      n = MKInstance,
      d,
    ) {
      if (!e)
        throw new MKError(
          MKError.Reason.INVALID_ARGUMENTS,
          'configuration required',
        );
      const p = {},
        { developerToken: h, mergeQueryParams: y } = e;
      if (!h)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          'Missing developer token',
        );
      y &&
        xa &&
        window.location &&
        (p.linkParameters = _object_spread$4(
          {},
          e.linkParameters || {},
          parseQueryParams(window.location.href),
        ));
      const _ = yield RuntimeEnvironment.detect();
      yield findKeySystemPreference(_);
      const m = new n(h, _, _object_spread$4({}, e, p));
      return (
        La || (yield cleanupInstances()),
        d && (yield d(m)),
        Na.push(m),
        dispatchDocumentEvent(So.configured),
        m
      );
    })).apply(this, arguments);
  }
  function getInstances() {
    return Na;
  }
  function _define_property$5(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$3(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$5(e, n, d[n]);
        });
    }
    return e;
  }
  function transformStoreData(e) {
    const n = _object_spread$3({}, e),
      { href: d } = n;
    return (
      void 0 !== d &&
        (delete n.href,
        (n.attributes = _object_spread$3({}, n.attributes, { href: d }))),
      n
    );
  }
  function _define_property$4(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  xa &&
    (asAsync(
      (function () {
        return _loadWebComponents.apply(this, arguments);
      })(),
    ),
    dispatchDocumentEvent(So.loaded));
  const ja = ['extend', 'include', 'l', 'platform', 'views'];
  class LocalDataStore {
    get hasDataStore() {
      return this.enableDataStore && void 0 !== this._store;
    }
    delete(e, n) {
      this.hasDataStore && this._store.remove(e, n);
    }
    read(e, n, d, p) {
      p || 'function' != typeof d || ((p = d), (d = void 0));
      const h = {};
      let y = !1;
      if (
        (d &&
          ((y = Object.keys(d).some((e) => /^(fields|extend)/.test(e))),
          d.views && (h.views = d.views),
          d.include && (h.relationships = d.include)),
        this.hasDataStore && !y)
      ) {
        let p,
          y = [];
        if (
          (d &&
            (y = Object.keys(d).reduce(
              (e, n) => (-1 === ja.indexOf(n) && e.push([n, d[n]]), e),
              y,
            )),
          (p =
            y && 1 === y.length
              ? this._store.query(y[0][0], y[0][1])
              : this._store.peek(e, n, h)),
          Array.isArray(p))
        ) {
          if (!d && p.length) return p;
        } else if (p) return p;
      }
      if ('function' == typeof p) return p();
    }
    write(e) {
      return this._prepareDataForDataStore(e, (e) => this._store.save(e));
    }
    parse(e) {
      return this._prepareDataForDataStore(e, (e) =>
        this._store.populateDataRecords(e, {}),
      );
    }
    _prepareDataForDataStore(e, n) {
      return this.hasDataStore
        ? Array.isArray(e)
          ? n({ data: e })
          : Object.keys(e).reduce((d, p) => {
              const h = e[p];
              return (
                hasOwn(h, 'data') && (d[p] = n({ data: h.data })),
                'meta' === p && (d[p] = e[p]),
                d
              );
            }, {})
        : e;
    }
    constructor(e = {}) {
      _define_property$4(this, '_store', void 0),
        _define_property$4(this, 'enableDataStore', !1);
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
  }
  function _define_property$3(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread_props$2(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  var Ua, Ba;
  !(function (e) {
    (e[(e.Global = 0)] = 'Global'),
      (e.Catalog = 'catalog'),
      (e.Personalized = 'me'),
      (e.Editorial = 'editorial'),
      (e.Engagement = 'engagement'),
      (e.Social = 'social');
  })(Ua || (Ua = {})),
    (function (e) {
      (e.songs = 'songs'),
        (e.albums = 'albums'),
        (e.playlists = 'playlists'),
        (e.stations = 'stations'),
        (e['music-videos'] = 'music-videos'),
        (e['library-music-videos'] = 'library-music-videos'),
        (e['library-playlists'] = 'library-playlists'),
        (e['library-songs'] = 'library-songs');
    })(Ba || (Ba = {}));
  class API extends class extends class {
    clearCacheForRequest(e, n) {
      'object' == typeof e && ((n = e), (e = void 0));
      const d = this.constructURL(e, n);
      this.networkCache.removeItemsMatching(d);
    }
    request(e, n, d) {
      var p,
        h = this;
      return ((p = function* () {
        d || 'object' != typeof e || ((d = n || {}), (n = e), (e = void 0));
        let p = {};
        'object' ==
        typeof (d = _object_spread$D(
          { method: h.method, headers: h.headers, reload: !1 },
          h._fetchOptions,
          d,
        )).queryParameters
          ? ((p = d.queryParameters), delete d.queryParameters)
          : ('GET' !== d.method && 'DELETE' !== d.method) || (p = n);
        const y = h.constructURL(e, p),
          { method: _, reload: m = !1, useRawResponse: g } = d;
        if (
          ((d.headers = h.buildHeaders(d)),
          delete d.reload,
          delete d.useRawResponse,
          'GET' === _ && !m)
        ) {
          const e = h.getCacheItem(y);
          if (e) return Promise.resolve(e);
        }
        n &&
          Object.keys(n).length &&
          ('POST' === _ || 'PUT' === _) &&
          ((d.body = d.body || n),
          d.contentType === Gt.FORM
            ? ((d.body = urlEncodeParameters(d.body)),
              d.headers.set('Content-Type', Gt.FORM))
            : ((d.body = JSON.stringify(d.body)),
              d.headers.set('Content-Type', Gt.JSON)));
        const b = yield h._fetchFunction(y, d);
        if (!b.ok) return Promise.reject(b);
        let S;
        try {
          S = yield b.json();
        } catch (Ut) {
          S = {};
        }
        if (S.errors) return Promise.reject(S.errors);
        const P = g ? S : S.results || S.data || S;
        if ('GET' === _) {
          var E;
          const e =
            null !== (E = getMaxAgeFromHeaders(b.headers)) && void 0 !== E
              ? E
              : h.ttl;
          h.setCacheItem(y, P, e);
        }
        return P;
      }),
      function () {
        var e = this,
          n = arguments;
        return new Promise(function (d, h) {
          var y = p.apply(e, n);
          function _next(e) {
            asyncGeneratorStep$10(y, d, h, _next, _throw, 'next', e);
          }
          function _throw(e) {
            asyncGeneratorStep$10(y, d, h, _next, _throw, 'throw', e);
          }
          _next(void 0);
        });
      })();
    }
    buildHeaders({ headers: e, reload: n = !1 } = {}) {
      void 0 === e && (e = this.headers);
      const d = ((e) => new e.constructor(e))(e);
      return n && d.set('Cache-Control', 'no-cache'), d;
    }
    constructURL(e, n) {
      return (
        (d = this.url), (p = n), addQueryParamsToURL(addPathToURL(d, e), p)
      );
      var d, p;
    }
    getCacheItem(e) {
      const n = this.networkCache.storage,
        d = `${this.prefix}${this.prefix}cache-mut`,
        p = n.getItem(d) || null,
        h =
          this.headers.get('Music-User-Token') ||
          this.headers.get('Media-User-Token') ||
          null;
      return (
        h !== p &&
          (this.networkCache.clear(),
          null === h ? n.removeItem(d) : n.setItem(d, h)),
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
          const p = d.split('&').map((e) => e.split('=', 2)),
            h = [...Array(p.length).keys()];
          h.sort((e, n) => {
            const d = p[e],
              h = p[n];
            return d < h ? -1 : d > h ? 1 : e - n;
          });
          const y = h.map((e) => p[e]);
          return `${n}?${y
            .map(([e, n]) => (void 0 !== n ? `${e}=${n}` : e))
            .join('&')}`;
        } catch (Ut) {
          return e;
        }
      })(e)
        .toLowerCase()
        .replace(this.url, '');
      return `${this.prefix}${d.replace(/[^-_0-9a-z]{1,}/g, '.')}`;
    }
    constructor(e, n) {
      if (
        (_define_property$1x(this, 'url', void 0),
        _define_property$1x(this, 'headers', void 0),
        _define_property$1x(this, 'prefix', 'ï£¿'),
        _define_property$1x(this, 'storage', void 0),
        _define_property$1x(this, 'networkCache', void 0),
        _define_property$1x(this, 'ttl', void 0),
        _define_property$1x(this, 'method', 'GET'),
        _define_property$1x(this, '_fetchOptions', void 0),
        _define_property$1x(this, '_fetchFunction', void 0),
        (this.url = e),
        (n = n || {}).storage && n.underlyingStorage)
      )
        throw new Error(
          'only pass storage OR underlyingStorage in sessionOptions to URLSession',
        );
      const d = n.underlyingStorage || {};
      if (
        ((this.storage = n.storage || new GenericStorage(d)),
        (this.networkCache = new NetworkCache({
          storage: this.storage,
          prefix: this.prefix,
          cacheKeyFunction: this._key.bind(this),
        })),
        (this.ttl = n.ttl || 3e5),
        (this._fetchOptions = _object_spread$D({}, n.fetchOptions)),
        'function' != typeof n.fetch && 'function' != typeof fetch)
      )
        throw new Error('window.fetch is not defined');
      var p;
      (this._fetchFunction =
        null !== (p = n.fetch) && void 0 !== p ? p : fetch.bind(window)),
        (this.headers = this._fetchOptions.headers || new Headers()),
        delete this._fetchOptions.headers;
    }
  } {
    get developerToken() {
      return this._developerToken.token;
    }
    constructor(e, n, d) {
      super(e, d),
        _define_property$1x(this, 'userToken', void 0),
        _define_property$1x(this, '_developerToken', void 0),
        (this._developerToken = new DeveloperToken(n)),
        this.headers.set('Authorization', 'Bearer ' + this.developerToken),
        (d = d || {}),
        (this.userToken = d.userToken),
        this.userToken && this.headers.set('Media-User-Token', this.userToken);
    }
  } {
    get needsEquivalents() {
      const { userStorefrontId: e } = this;
      return void 0 !== e && '' !== e && e !== this.storefrontId;
    }
    constructor(e, n, d, p, h, y, _ = {}, m) {
      super(
        e,
        n,
        _object_spread_props$2(
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var d = null != arguments[n] ? arguments[n] : {},
                p = Object.keys(d);
              'function' == typeof Object.getOwnPropertySymbols &&
                (p = p.concat(
                  Object.getOwnPropertySymbols(d).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(d, e).enumerable;
                  }),
                )),
                p.forEach(function (n) {
                  _define_property$3(e, n, d[n]);
                });
            }
            return e;
          })({}, m),
          { userToken: p, storage: y },
        ),
      ),
        _define_property$3(this, '_store', void 0),
        _define_property$3(this, 'v3', void 0),
        _define_property$3(this, 'storefrontId', De.ID),
        _define_property$3(this, 'defaultIncludePaginationMetadata', void 0),
        _define_property$3(this, 'resourceRelatives', {
          artists: {
            albums: { include: 'tracks' },
            playlists: { include: 'tracks' },
            songs: null,
          },
        }),
        _define_property$3(this, 'userStorefrontId', void 0),
        (this.defaultIncludePaginationMetadata =
          _.features && hasOwn(_.features, 'api-pagination-metadata')),
        (this._store = new LocalDataStore(_)),
        d && (this.storefrontId = d.toLowerCase()),
        p && h && (this.userStorefrontId = h.toLowerCase()),
        (this.v3 = new MediaAPIV3({
          developerToken: n,
          mediaUserToken: p,
          storefrontId: d,
          realmConfig: { music: { url: e.replace(/\/v[0-9]+(\/)?$/, '') } },
        }));
    }
  }
  function asyncGeneratorStep$5(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$5(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$5(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$5(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$2(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  let Fa;
  const Ka = (function () {
      var e = _async_to_generator$5(function* (e, n = !1) {
        if (Fa && !n) {
          if (void 0 === e.storefrontId || e.storefrontId === Fa.storefrontId)
            return Fa;
          Fa.clear();
        }
        return (
          (Fa = new MediaAPIService(e.dispatcher)), yield Fa.configure(e), Fa
        );
      });
      return function (n) {
        return e.apply(this, arguments);
      };
    })(),
    Ga = {
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
    get isConfigured() {
      return void 0 !== this._api;
    }
    get api() {
      if (void 0 === this._api)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          'The API cannot be accessed before it is configured.',
        );
      return this._api;
    }
    get storefrontId() {
      return this.store && this.store.storefrontId;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$5(function* () {
        void 0 !== e.store &&
          ((n.store = e.store),
          [
            So.authorizationStatusDidChange,
            So.userTokenDidChange,
            So.storefrontIdentifierDidChange,
            So.storefrontCountryCodeDidChange,
          ].forEach((e) => {
            n.store.storekit.addEventListener(e, () => n.resetAPI());
          }),
          n._initializeAPI(e));
      })();
    }
    clear() {
      this.api && this.api.clearNetworkCache && this.api.clearNetworkCache();
    }
    getAPIForItem(e) {
      var n = this;
      return _async_to_generator$5(function* () {
        return T(e)
          ? (yield n.store.authorize(), n.api.library || n.api)
          : n.api;
      })();
    }
    resetAPI() {
      var e = this;
      return _async_to_generator$5(function* () {
        e.clear(), e._initializeAPI();
      })();
    }
    _initializeAPI(e) {
      var n;
      if (void 0 !== (null === (n = e) || void 0 === n ? void 0 : n.api))
        return void (this._api = e.api);
      const d = (e && e.store) || this.store;
      if (void 0 === d) return;
      const p = To.features['api-session-storage']
          ? getSessionStorage()
          : void 0,
        h = (e && e.storefrontId) || d.storefrontId,
        y = new API(
          this.url,
          d.developerToken,
          h,
          d.storekit.userToken,
          d.storekit.storefrontCountryCode,
          p,
          To,
          e && e.apiOptions && e.apiOptions.sessionOptions,
        );
      this._api = y.v3;
    }
    _updateStorefrontId(e) {
      var n = this;
      return _async_to_generator$5(function* () {
        (n.api && e === n.api.storefrontId) ||
          (yield n.configure({
            dispatcher: n._dispatcher,
            store: n.store,
            storefrontId: e,
          }));
      })();
    }
    constructor(e) {
      if (
        (_define_property$2(this, '_dispatcher', void 0),
        _define_property$2(this, 'namedQueueOptions', void 0),
        _define_property$2(this, 'url', void 0),
        _define_property$2(this, 'store', void 0),
        _define_property$2(this, '_api', void 0),
        (this._dispatcher = e),
        !To.urls.mediaApi)
      )
        throw new Error('bag.urls.mediaApi is not configured');
      (this.url = To.urls.mediaApi), (this.namedQueueOptions = Ga);
      var n = this;
      this._dispatcher.subscribe(
        _t.apiStorefrontChanged,
        (function () {
          var e = _async_to_generator$5(function* (e, { storefrontId: d }) {
            yield n._updateStorefrontId(d);
          });
          return function (n, d) {
            return e.apply(this, arguments);
          };
        })(),
      );
    }
  }
  const Va = [
    'uploadedVideo',
    'uploadedAudio',
    'uploaded-videos',
    'uploaded-audios',
  ];
  function asyncGeneratorStep$4(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$4(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$4(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$4(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property$1(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread$1(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property$1(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props$1(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const Ha = Be.createChild('paf'),
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
  class MPAFTracker {
    get requestedEvents() {
      return Array.from(this.dispatchTable.keys());
    }
    get isConfigured() {
      return void 0 !== this.instance;
    }
    get activityTracker() {
      if (void 0 === this._activityTracker)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          'Play Activity service was called before configuration.',
        );
      return this._activityTracker;
    }
    configure(e) {
      var n = this;
      return _async_to_generator$4(function* () {
        var d, p, h;
        (n.instance = e.instance),
          (n.services = e.services),
          (n._activityTracker =
            ((d = e.instance),
            (p = e.services.runtime),
            new PlayActivity(
              d.developerToken,
              d.musicUserToken,
              d.storefrontCountryCode,
              {
                app: {
                  build: To.app.build,
                  name: null !== (h = To.app.name) && void 0 !== h ? h : '',
                  version: To.app.version,
                },
                fetch: !p.isNodeEnvironment && fetch.bind(globalThis),
                isQA: qa.enabled,
                logInfo: Ha.enabled,
                sourceType: d.sourceType,
                guid: d.guid,
                userIsSubscribed: () =>
                  !(
                    !d.isAuthorized ||
                    !wo.storekit._getIsActiveSubscription.getCachedValue()
                  ),
              },
            )));
      })();
    }
    handleEvent(e, n, d) {
      if (!this.shouldTrackPlayActivity(e, d)) return;
      const p = this.dispatchTable.get(e);
      void 0 !== p && 'function' == typeof this[p] && this[p](d, n);
    }
    activate(e, n = {}) {
      return this.activityTracker.activate(n.flush);
    }
    exit(e, n = {}) {
      return (
        Ha.debug('PAF debug', `client.exit(${n.position})`),
        this.activityTracker.exit(n.position)
      );
    }
    pause(e, n = {}) {
      return 'number' == typeof n.endReasonType
        ? (Ha.debug(
            'PAF debug',
            `client.stop(${n.position}, ${n.endReasonType})`,
          ),
          this.activityTracker.stop(n.position, n.endReasonType))
        : (Ha.debug('PAF debug', `client.pause(${n.position})`),
          this.activityTracker.pause(n.position));
    }
    play(e, n = {}) {
      const d = generateItemDescriptorForPAF(_t.playbackPlay, this.instance, e);
      return (
        isLiveRadioKind(e, 'video') &&
          (this.musicLiveVideoStartTime = Date.now()),
        Ha.debug(
          'PAF debug',
          `client.play(${JSON.stringify(d)}, ${n.position})`,
        ),
        this.activityTracker.play(d, n.position)
      );
    }
    scrub(e, n = {}) {
      return (
        Ha.debug(
          'PAF debug',
          `client.scrub(${n.position}, ${asCode(n.endReasonType)})`,
        ),
        this.activityTracker.scrub(n.position, n.endReasonType)
      );
    }
    seek(n, d = {}) {
      var p = this;
      return _async_to_generator$4(function* () {
        yield p.scrub(n, {
          position: d.startPosition,
          endReasonType: e.PlayActivityEndReasonType.SCRUB_BEGIN,
        }),
          yield p.scrub(n, {
            position: d.position,
            endReasonType: e.PlayActivityEndReasonType.SCRUB_END,
          });
      })();
    }
    skip(e, n = {}) {
      var d = this;
      return _async_to_generator$4(function* () {
        const p = generateItemDescriptorForPAF(_t.playbackSkip, d.instance, e);
        Ha.debug(
          'PAF debug',
          `client.skip(${JSON.stringify(p)}, ${asCode(n.direction)}, ${
            n.position
          })`,
        );
        try {
          yield d.activityTracker.skip(p, n.direction, n.position);
        } catch (Ut) {
          if (
            'A play stop() method was called without a previous play() descriptor' !==
            Ut.message
          )
            return Promise.reject(Ut);
          yield d.play(e, n);
        }
      })();
    }
    stop(n, d = {}) {
      var p, h, y;
      (isLiveRadioKind(n, 'video')
        ? ((d.position = (Date.now() - this.musicLiveVideoStartTime) / 1e3),
          (this.musicLiveVideoStartTime = 0))
        : (null === (p = n) || void 0 === p ? void 0 : p.isLiveRadioStation) &&
          d.position &&
          (d.position = d.position - (d.startPosition || 0)),
      null === (h = n) || void 0 === h ? void 0 : h.isLiveRadioStation) &&
        (d.endReasonType =
          null !== (y = d.endReasonType) && void 0 !== y
            ? y
            : e.PlayActivityEndReasonType.PLAYBACK_MANUALLY_PAUSED);
      return (
        Ha.debug(
          'PAF debug',
          `client.stop(${d.position}, ${asCode(d.endReasonType)})`,
        ),
        this.activityTracker.stop(d.position, d.endReasonType)
      );
    }
    shouldTrackPlayActivity(n, d) {
      const p = hasAuthorization(),
        h = !d || d.playbackType !== e.PlaybackType.preview,
        y = this.alwaysSendForActivityType(n),
        _ = !d || (d && this.mediaRequiresPlayActivity(d));
      return !(!p || !h || (!y && !_));
    }
    alwaysSendForActivityType(e) {
      return e === _t.playerActivate || e === _t.playerExit;
    }
    mediaRequiresPlayActivity(e) {
      return (
        (void 0 !== (n = e.type) && Va.includes(n)) ||
        -1 !== ['musicVideo', 'song', 'radioStation'].indexOf(e.type)
      );
      var n;
    }
    constructor() {
      _define_property$1(this, 'instance', void 0),
        _define_property$1(this, 'services', void 0),
        _define_property$1(this, '_activityTracker', void 0),
        _define_property$1(this, 'musicLiveVideoStartTime', 0),
        _define_property$1(
          this,
          'dispatchTable',
          new Map([
            [_t.playbackPlay, 'play'],
            [_t.playbackPause, 'pause'],
            [_t.playbackScrub, 'scrub'],
            [_t.playbackSeek, 'seek'],
            [_t.playbackSkip, 'skip'],
            [_t.playbackStop, 'stop'],
            [_t.playerActivate, 'activate'],
            [_t.playerExit, 'exit'],
          ]),
        );
    }
  }
  function generateItemDescriptorForPAF(n, d, p) {
    var h;
    const y = _object_spread_props$1(
      _object_spread$1(
        {},
        (function (n, d, p) {
          var h;
          if (
            void 0 ===
              (null === (h = p) || void 0 === h ? void 0 : h.playbackActions) ||
            void 0 === d
          )
            return {};
          const y = {
              [e.PlayerRepeatMode.all]: Ot.REPEAT_ALL,
              [e.PlayerRepeatMode.none]: Ot.REPEAT_OFF,
              [e.PlayerRepeatMode.one]: Ot.REPEAT_ONE,
            },
            _ = {
              [e.PlayerShuffleMode.off]: At.SHUFFLE_OFF,
              [e.PlayerShuffleMode.songs]: At.SHUFFLE_ON,
            };
          return {
            playMode() {
              let n = Ot.REPEAT_UNKNOWN,
                d = At.SHUFFLE_UNKNOWN,
                h = Rt.AUTO_UNKNOWN;
              const { playbackActions: m } = p;
              var g;
              return (
                m &&
                  (m.includes(e.PlaybackActions.REPEAT) &&
                    (n = y[p.repeatMode]),
                  m.includes(e.PlaybackActions.SHUFFLE) &&
                    (d = _[p.shuffleMode]),
                  m.includes(e.PlaybackActions.AUTOPLAY) &&
                    (h = p.autoplayEnabled
                      ? (g = p.queue).hasAutoplayStation &&
                        g.items.some((e) => {
                          const { id: n, type: d, container: p } = e;
                          if (p && 'stations' === p.type && p.name === mt.RADIO)
                            return !1;
                          const h = normalizeTypeForAutoplay(n, d);
                          return isAutoplaySupportedForType(h);
                        })
                        ? Rt.AUTO_ON
                        : Rt.AUTO_ON_CONTENT_UNSUPPORTED
                      : Rt.AUTO_OFF)),
                { repeatPlayMode: n, shufflePlayMode: d, autoplayMode: h }
              );
            },
          };
        })(0, p, d),
        (function (e, n) {
          var d;
          if (!typeRequiresItem(e)) return {};
          if (void 0 === n) return {};
          const p =
            null === (d = n.attributes) || void 0 === d ? void 0 : d.mediaKind;
          return _object_spread$1(
            {},
            void 0 !== p ? { mediaType: p } : {},
            n.playParams,
          );
        })(n, p),
        (function (e, n) {
          if (!typeRequiresItem(e) || void 0 === n) return {};
          const { context: d = {} } = n;
          return { recoData: d.reco_id };
        })(n, p),
        (function (e, n) {
          if (!typeRequiresItem(e) || void 0 === n) return {};
          const d = n.playbackDuration;
          if (!d) return {};
          return { duration: d / 1e3 };
        })(n, p),
        (function (e, n) {
          var d, p, h, y, _, m, g;
          const b = (function (e, n) {
              var d, p;
              return (
                (itemIsRequired(e, n) &&
                  (null === (p = n) ||
                  void 0 === p ||
                  null === (d = p.container) ||
                  void 0 === d
                    ? void 0
                    : d.name)) ||
                null
              );
            })(e, n),
            S = itemIsRequired(e, n)
              ? _object_spread$1(
                  {},
                  null === (d = n) || void 0 === d ? void 0 : d.container,
                  null === (y = n) ||
                    void 0 === y ||
                    null === (h = y.container) ||
                    void 0 === h ||
                    null === (p = h.attributes) ||
                    void 0 === p
                    ? void 0
                    : p.playParams,
                  (null === (g = n) ||
                  void 0 === g ||
                  null === (m = g.container) ||
                  void 0 === m ||
                  null === (_ = m.attributes) ||
                  void 0 === _
                    ? void 0
                    : _.hasCollaboration) && { isCollaborative: !0 },
                )
              : null;
          if (null === b && null === S) return;
          return {
            container: cleanContainer(
              _object_spread$1({}, S, null !== b ? { name: b } : {}),
            ),
          };
        })(n, p),
      ),
      { trackInfo: null === (h = p) || void 0 === h ? void 0 : h.trackInfo },
    );
    return Ha.trace('PAF descriptor', y), y;
  }
  const qa = BooleanDevFlag.register('mk-use-paf-qa-endpoint');
  const typeRequiresItem = (e) =>
      [_t.playbackPlay, _t.playbackSkip].includes(e),
    itemIsRequired = (e, n) => void 0 !== n && typeRequiresItem(e);
  function cleanContainer(e) {
    const n = _object_spread$1({}, e);
    return delete n.attributes, n;
  }
  function asyncGeneratorStep$3(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$3(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$3(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$3(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _define_property(e, n, d) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: d,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = d),
      e
    );
  }
  function _object_spread(e) {
    for (var n = 1; n < arguments.length; n++) {
      var d = null != arguments[n] ? arguments[n] : {},
        p = Object.keys(d);
      'function' == typeof Object.getOwnPropertySymbols &&
        (p = p.concat(
          Object.getOwnPropertySymbols(d).filter(function (e) {
            return Object.getOwnPropertyDescriptor(d, e).enumerable;
          }),
        )),
        p.forEach(function (n) {
          _define_property(e, n, d[n]);
        });
    }
    return e;
  }
  function _object_spread_props(e, n) {
    return (
      (n = null != n ? n : {}),
      Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : (function (e, n) {
            var d = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var p = Object.getOwnPropertySymbols(e);
              n &&
                (p = p.filter(function (n) {
                  return Object.getOwnPropertyDescriptor(e, n).enumerable;
                })),
                d.push.apply(d, p);
            }
            return d;
          })(Object(n)).forEach(function (d) {
            Object.defineProperty(e, d, Object.getOwnPropertyDescriptor(n, d));
          }),
      e
    );
  }
  const Wa = Be.createChild('lyrics');
  class LyricsTracker {
    get requestedEvents() {
      return Array.from(this.dispatchTable.keys());
    }
    get activityTracker() {
      if (void 0 === this.instance || void 0 === this.services)
        throw new MKError(
          MKError.Reason.CONFIGURATION_ERROR,
          'Lyrics Play Activity service was called before configuration.',
        );
      var e, n, d;
      return (
        void 0 === this._activityTracker &&
          (this._activityTracker =
            ((e = this.instance),
            (n = this.services.runtime),
            new LyricsPlayActivity(
              e.developerToken,
              e.musicUserToken,
              e.storefrontCountryCode,
              {
                app: {
                  build: To.app.build,
                  name: null !== (d = To.app.name) && void 0 !== d ? d : '',
                  version: To.app.version,
                },
                fetch: !n.isNodeEnvironment && fetch.bind(globalThis),
                logInfo: Wa.level <= R.INFO,
                sourceType: e.sourceType,
                isQA: Ya.enabled,
                userIsSubscribed: () =>
                  e.isAuthorized &&
                  wo.storekit._getIsActiveSubscription.getCachedValue(),
              },
            ))),
        this._activityTracker
      );
    }
    get isConfigured() {
      return void 0 !== this.instance;
    }
    static configure(e) {
      var n = this;
      return _async_to_generator$3(function* () {
        const d = new n();
        return d.configure(e), d;
      })();
    }
    configure(e) {
      var n = this;
      return _async_to_generator$3(function* () {
        (n.instance = e.instance), (n.services = e.services);
      })();
    }
    handleEvent(e, n, d) {
      const p = this.dispatchTable.get(e);
      void 0 !== p && 'function' == typeof this[p] && this[p](d, n);
    }
    lyricsPlay(e, n) {
      var d = this;
      return _async_to_generator$3(function* () {
        var p;
        const h = null === (p = n) || void 0 === p ? void 0 : p.lyrics;
        if (void 0 === h)
          throw new MKError(
            MKError.Reason.MEDIA_DESCRIPTOR,
            'Key lyrics is missing from descriptor provided to lyricsPlay',
          );
        if (void 0 === e)
          throw new MKError(
            MKError.Reason.MEDIA_DESCRIPTOR,
            'Cannot display lyrics without a MediaItem',
          );
        d.activityTracker.play(
          (function (e, n, d) {
            var p, h, y, _;
            return _object_spread_props(
              _object_spread(
                {
                  id: n.id,
                  duration: 0,
                  eventType: Ct.LYRIC_DISPLAY,
                  container: _object_spread(
                    {},
                    n.container,
                    null === (h = n.container) ||
                      void 0 === h ||
                      null === (p = h.attributes) ||
                      void 0 === p
                      ? void 0
                      : p.playParams,
                  ),
                },
                n.playParams,
              ),
              {
                lyricDescriptor: {
                  id: null !== (_ = d.id) && void 0 !== _ ? _ : n.id,
                  displayType: d.displayType,
                  language: d.language,
                },
                trackInfo: n.trackInfo,
                recoData:
                  null === (y = n.attributes) || void 0 === y
                    ? void 0
                    : y.reco_id,
              },
            );
          })(_t.lyricsPlay, e, h),
        );
      })();
    }
    lyricsStop(e, n) {
      var d = this;
      return _async_to_generator$3(function* () {
        d.activityTracker.stop();
      })();
    }
    exit(e, n) {
      var d = this;
      return _async_to_generator$3(function* () {
        d.activityTracker.exit();
      })();
    }
    constructor() {
      _define_property(
        this,
        'dispatchTable',
        new Map([
          [_t.lyricsPlay, 'lyricsPlay'],
          [_t.lyricsStop, 'lyricsStop'],
          [_t.playerExit, 'exit'],
        ]),
      ),
        _define_property(this, 'instance', void 0),
        _define_property(this, 'services', void 0),
        _define_property(this, '_activityTracker', void 0);
    }
  }
  const Ya = BooleanDevFlag.register('mk-use-paf-qa-endpoint');
  function asyncGeneratorStep$2(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$2(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$2(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$2(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function _ts_metadata(e, n) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
      return Reflect.metadata(e, n);
  }
  class MusicKitInstance extends MKInstance {
    addToLibrary(e, n) {
      var d = this;
      return _async_to_generator$2(function* () {
        let p;
        return (
          yield d.authorize(),
          n || (n = /[a-z]{2}\.[a-z0-9\-]+/i.test(e) ? 'playlists' : 'albums'),
          d.api.music &&
            (p = d.api.music(
              '/v1/me/library',
              { [`ids[${n}]`]: e },
              { fetchOptions: { method: 'POST' } },
            )),
          p
        );
      })();
    }
    changeToMediaItem(e) {
      var n = this,
        _superprop_get_changeToMediaItem = () => super.changeToMediaItem;
      return _async_to_generator$2(function* () {
        return (
          n._checkNeedsEquivalent(),
          _superprop_get_changeToMediaItem().call(n, e)
        );
      })();
    }
    play() {
      var e = this,
        _superprop_get_play = () => super.play;
      return _async_to_generator$2(function* () {
        return e._checkNeedsEquivalent(), _superprop_get_play().call(e);
      })();
    }
    playMediaItem(e, n) {
      var d = this,
        _superprop_get_playMediaItem = () => super.playMediaItem;
      return _async_to_generator$2(function* () {
        if (d._isPlaybackSupported())
          return (
            d._checkNeedsEquivalent(),
            _superprop_get_playMediaItem().call(d, e, n)
          );
      })();
    }
    _isStationQueueOptions(e) {
      return !(
        !((e) =>
          !!e &&
          (!!isIdentityQueue(e) ||
            !!isQueueURLOption(e) ||
            Object.keys(Zo).some((n) => void 0 !== e[n])))(
          (e = parseQueueURLOption(e)),
        ) ||
        ((e) => {
          if (!e) return !1;
          if (isQueueURLOption(e)) return !0;
          if (isQueueItems(e)) return !0;
          return Object.keys(aa)
            .concat(Object.keys(sa))
            .some((n) => void 0 !== e[n]);
        })(e)
      );
    }
    setStationQueue(e) {
      var n = this,
        _superprop_get__validateAuthorization = () =>
          super._validateAuthorization;
      return _async_to_generator$2(function* () {
        if (!n._isPlaybackSupported())
          return void He.warn('Playback is not supported');
        n._signalChangeItemIntent(),
          n.deferPlayback(),
          yield n._updatePlaybackController(
            n._getPlaybackControllerByType(qo.continuous),
          ),
          yield _superprop_get__validateAuthorization().call(n, !0),
          (e = parseQueueURLOption(e));
        const d = n._playbackController.setQueue(e);
        return (
          void 0 !== e.autoplay &&
            (deprecationWarning('autoplay', {
              message: 'autoplay has been deprecated, use startPlaying instead',
            }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield n.play()),
          d
        );
      })();
    }
    setQueue(e) {
      var n = this;
      return _async_to_generator$2(function* () {
        if (
          (He.debug('instance.setQueue()', e),
          n._checkNeedsEquivalent(),
          !n._isPlaybackSupported())
        )
          return void He.warn('Playback is not supported');
        if (n._isStationQueueOptions(e))
          return (
            He.warn(
              'setQueue options contained a station queue request. Changing to setStationQueue mode.',
            ),
            n.setStationQueue(e)
          );
        n._signalChangeItemIntent(),
          n.deferPlayback(),
          yield n._updatePlaybackController(
            n._getPlaybackControllerByType(qo.serial),
          );
        const d = yield n._playbackController.setQueue(e);
        return (
          void 0 !== e.repeatMode &&
            (n._playbackController.repeatMode = e.repeatMode),
          void 0 !== e.autoplay &&
            (deprecationWarning('autoplay', {
              message: 'autoplay has been deprecated, use startPlaying instead',
            }),
            void 0 === e.startPlaying && (e.startPlaying = e.autoplay)),
          e.startPlaying && (yield n.play()),
          d
        );
      })();
    }
    _checkNeedsEquivalent() {
      var n;
      if (
        this.realm === e.SKRealm.MUSIC &&
        !this.previewOnly &&
        (null === (n = this.api) || void 0 === n ? void 0 : n.needsEquivalents)
      )
        throw new MKError(MKError.Reason.CONTENT_EQUIVALENT);
    }
    playNext(e, n = !1) {
      var d = this;
      return _async_to_generator$2(function* () {
        if (d._isPlaybackSupported())
          return d._playbackController.queue
            ? (d.deferPlayback(), d._playbackController.prepend(e, n))
            : d.setQueue(e);
        He.warn('Playback is not supported');
      })();
    }
    playLater(e) {
      var n = this;
      return _async_to_generator$2(function* () {
        if (n._isPlaybackSupported())
          return n._playbackController.queue
            ? (n.deferPlayback(), n._playbackController.append(e))
            : n.setQueue(e);
        He.warn('Playback is not supported');
      })();
    }
    playAt(e, n) {
      var d = this;
      return _async_to_generator$2(function* () {
        if (d._isPlaybackSupported())
          return d._playbackController.queue
            ? (d.deferPlayback(), d._playbackController.insertAt(e, n))
            : d.setQueue(n);
        He.warn('Playback is not supported');
      })();
    }
    clearQueue() {
      var e = this;
      return _async_to_generator$2(function* () {
        return (
          e._mediaItemPlayback.clearNextManifest(),
          e._playbackController.clear()
        );
      })();
    }
  }
  var za;
  function asyncGeneratorStep$1(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator$1(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep$1(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep$1(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  !(function (e, n, d, p) {
    var h,
      y = arguments.length,
      _ =
        y < 3
          ? n
          : null === p
            ? (p = Object.getOwnPropertyDescriptor(n, d))
            : p;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      _ = Reflect.decorate(e, n, d, p);
    else
      for (var m = e.length - 1; m >= 0; m--)
        (h = e[m]) && (_ = (y < 3 ? h(_) : y > 3 ? h(n, d, _) : h(n, d)) || _);
    y > 3 && _ && Object.defineProperty(n, d, _);
  })(
    [
      (e, n, d) => {
        const p = d.value;
        return (
          (d.value = function (...e) {
            if (!this.isInSharePlay) return p.apply(this, e);
            za && this.services.dispatcher.publish(za);
          }),
          d
        );
      },
      _ts_metadata('design:type', Function),
      _ts_metadata('design:paramtypes', [
        Number,
        'undefined' == typeof SerialQueueOptions ? Object : SerialQueueOptions,
      ]),
    ],
    MusicKitInstance.prototype,
    'playAt',
    null,
  );
  function loadLinksData() {
    return _loadLinksData.apply(this, arguments);
  }
  function _loadLinksData() {
    return (_loadLinksData = _async_to_generator$1(function* () {
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
          mediaAPI: { resources: ['artists', 'default-playable-content'] },
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
            (e.requiredQueryParams = Object.keys(e.requiredQueryParams).reduce(
              (n, d) => ((n[d] = new RegExp(e.requiredQueryParams[d])), n),
              {},
            )),
          e
        ),
      );
      return Promise.resolve(e);
    })).apply(this, arguments);
  }
  function meetsLinkRequirements(e, n, d = {}) {
    const [p] = e.split(/\?|\#|\&/),
      h = n.regex.test(p);
    return h && n.requiredQueryParams
      ? Object.keys(n.requiredQueryParams).every((e) => {
          const p = d[e];
          return n.requiredQueryParams[e].test(p);
        })
      : h;
  }
  function filterLinks(e) {
    return _filterLinks.apply(this, arguments);
  }
  function _filterLinks() {
    return (_filterLinks = _async_to_generator$1(function* (e) {
      const n = yield loadLinksData(),
        d = parseQueryParams(e);
      return n.reduce((n, p) => {
        if (meetsLinkRequirements(e, p, d)) {
          if (n.length > 0)
            if (p.requiredQueryParams)
              n = n.filter((e) => e.requiredQueryParams);
            else if (n.some((e) => e.requiredQueryParams)) return n;
          p.requiredQueryParams
            ? (p.mediaAPI.parameters = Object.keys(
                p.requiredQueryParams,
              ).reduce((e, n) => ((e[n] = d[n]), e), {}))
            : p.mediaAPI.parameterMapping &&
              (p.mediaAPI.parameters = transform$8(
                p.mediaAPI.parameterMapping,
                d,
                !0,
              )),
            n.push(p);
        }
        return n;
      }, []);
    })).apply(this, arguments);
  }
  function _resolveCanonical() {
    return (_resolveCanonical = _async_to_generator$1(function* (e) {
      return {
        results: { links: yield filterLinks(e) },
        meta: { originalUrl: e, originalQueryParams: parseQueryParams(e) },
      };
    })).apply(this, arguments);
  }
  function asyncGeneratorStep(e, n, d, p, h, y, _) {
    try {
      var m = e[y](_),
        g = m.value;
    } catch (Q) {
      return void d(Q);
    }
    m.done ? n(g) : Promise.resolve(g).then(p, h);
  }
  function _async_to_generator(e) {
    return function () {
      var n = this,
        d = arguments;
      return new Promise(function (p, h) {
        var y = e.apply(n, d);
        function _next(e) {
          asyncGeneratorStep(y, p, h, _next, _throw, 'next', e);
        }
        function _throw(e) {
          asyncGeneratorStep(y, p, h, _next, _throw, 'throw', e);
        }
        _next(void 0);
      });
    };
  }
  function configure(e) {
    return _configure.apply(this, arguments);
  }
  function _configure() {
    return (_configure = _async_to_generator(function* (e) {
      He.linkChild(Be),
        He.linkChild(je),
        He.linkChild(ye),
        He.linkChild(Ue),
        (e.playActivityAPI = [new MPAFTracker(), new LyricsTracker()]);
      let n = MusicKitInstance;
      return yield configure$2(
        e,
        n,
        (function () {
          var n = _async_to_generator(function* (n) {
            const d = { apiType: ca.MEDIA_API, configureFn: Ka, options: {} };
            yield n.configure([d]),
              e.declarativeMarkup &&
                'undefined' != typeof console &&
                console.warn &&
                console.warn(
                  'The declarativeMarkup configuration option has been removed in MusicKit JS V3',
                );
          });
          return function (e) {
            return n.apply(this, arguments);
          };
        })(),
      );
    })).apply(this, arguments);
  }
  if (xa) {
    const e = (function () {
        function meta(e) {
          var n;
          if (detectNodeEnvironment()) return;
          return (
            (null === (n = document.head.querySelector(`meta[name=${e}]`)) ||
            void 0 === n
              ? void 0
              : n.content) || void 0
          );
        }
        const e = meta('apple-music-developer-token') || meta('JWT'),
          n = meta('apple-music-app-build') || meta('version'),
          d = meta('apple-music-app-name'),
          p = meta('apple-music-app-version');
        let h;
        return (
          (e || n || d || p) &&
            ((h = {}),
            e && (h.developerToken = e),
            (n || d || p) &&
              ((h.app = {}),
              n && (h.app.build = n),
              d && (h.app.name = d),
              p && (h.app.version = p))),
          h
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
  (e.Events = So),
    (e.MKError = MKError),
    (e.MediaItem = MediaItem),
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
      La = !0;
    }),
    (e.formatArtworkURL = formatArtworkURL),
    (e.formatMediaTime = function (e, n = ':') {
      const { hours: d, minutes: p } = formattedSeconds(e);
      e = Math.floor((e % 3600) % 60);
      const h = [];
      return (
        d
          ? (h.push('' + d), h.push(p < 10 ? '0' + p : '' + p))
          : h.push('' + p),
        h.push(e < 10 ? '0' + e : '' + e),
        h.join(n)
      );
    }),
    (e.formattedMediaURL = formattedMediaURL),
    (e.formattedMilliseconds = function (e) {
      return formattedSeconds(e / 1e3);
    }),
    (e.formattedSeconds = formattedSeconds),
    (e.generateEmbedCode = function (e, n = { height: '450', width: '660' }) {
      if (!p.test(e)) throw new Error('Invalid content url');
      var d;
      let _ = null !== (d = n.height) && void 0 !== d ? d : '450';
      var m;
      let g = null !== (m = n.width) && void 0 !== m ? m : '660';
      const { kind: b, isUTS: S } = formattedMediaURL(e),
        P = 'post' === b || 'musicVideo' === b || S;
      'song' === b || 'episode' === b
        ? (_ = '175')
        : P && (_ = '' + Math.round(0.5625 * parseInt(g, 10))),
        (_ = ('' + _).replace(/(\d+)px/i, '$1')),
        (g = ('' + g).replace(/^(\d+)(?!px)%?$/i, '$1px'));
      const E =
        (P ? 'width:' + g : 'width:100%;' + (g ? 'max-width:' + g : '')) +
        ';overflow:hidden;border-radius:10px;';
      return `<iframe ${[
        `allow="${y.join('; ')}"`,
        'frameborder="0"',
        _ ? `height="${_}"` : '',
        `style="${E}"`,
        `sandbox="${h.join(' ')}"`,
        `src="${e.replace(p, 'https://embed.music.apple.com')}"`,
      ].join(' ')}></iframe>`;
    }),
    (e.getHlsJsCdnConfig = getHlsJsCdnConfig),
    (e.getInstance = function (e) {
      if (0 !== Na.length)
        return void 0 === e ? Na[Na.length - 1] : Na.find((n) => n.id === e);
    }),
    (e.getInstances = getInstances),
    (e.getPlayerType = function (e) {
      var n, d, p, h, y, _;
      return (null === (n = e) || void 0 === n ? void 0 : n.isUTS) ||
        re.includes(null === (d = e) || void 0 === d ? void 0 : d.type)
        ? 'video'
        : 'podcast-episodes' ===
            (null === (p = e) || void 0 === p ? void 0 : p.type)
          ? 'audio'
          : null !==
                (_ =
                  null === (y = e) ||
                  void 0 === y ||
                  null === (h = y.attributes) ||
                  void 0 === h
                    ? void 0
                    : h.mediaKind) && void 0 !== _
            ? _
            : 'audio';
    }),
    (e.resolveCanonical = function (e) {
      return _resolveCanonical.apply(this, arguments);
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
