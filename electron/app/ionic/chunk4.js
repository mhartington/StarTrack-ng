/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:n}=window.Ionic;function t(){const n=window.TapticEngine;n&&n.selection()}function i(){const n=window.TapticEngine;n&&n.gestureSelectionStart()}function e(){const n=window.TapticEngine;n&&n.gestureSelectionChanged()}function o(){const n=window.TapticEngine;n&&n.gestureSelectionEnd()}export{e as hapticSelectionChanged,o as hapticSelectionEnd,i as hapticSelectionStart,t as hapticSelection};