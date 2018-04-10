/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{openURL as e}from"./chunk1.js";class n{onClick(t){const n=this.el.closest("ion-nav");n&&n.canGoBack()?(t.preventDefault(),n.pop()):this.defaultHref&&e(this.defaultHref,t,!0)}hostData(){return{class:{"show-back-button":!!this.defaultHref}}}render(){const e=this.icon||this.config.get("backButtonIcon","arrow-back"),n=null!=this.text?this.text:this.config.get("backButtonText","Back");return t("button",{class:"back-button-inner",onClick:t=>this.onClick(t)},e&&t("ion-icon",{name:e}),"ios"===this.mode&&n&&t("span",{class:"button-text"},n),"md"===this.mode&&t("ion-ripple-effect",{useTapClick:!0}))}static get is(){return"ion-back-button"}static get host(){return{theme:"back-button"}}static get properties(){return{config:{context:"config"},defaultHref:{type:String,attr:"default-href"},el:{elementRef:!0},icon:{type:String,attr:"icon"},mode:{type:"Any",attr:"mode"},text:{type:"Any",attr:"text"}}}static get style(){return".back-button{display:none}.back-button.show-back-button,.can-go-back>ion-header .back-button{display:inline-block}.back-button button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-align:center;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;position:relative;z-index:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;border:0;outline:0;line-height:1;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;cursor:pointer;vertical-align:top;vertical-align:-webkit-baseline-middle;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-font-kerning:none;font-kerning:none}.back-button .button-inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.back-button-text{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.back-button-md .back-button-inner{margin:2px 6px 0 0;padding:0 5px;min-width:44px;height:32px;border:0;font-size:14px;font-weight:500;text-transform:uppercase;color:var(--ion-toolbar-md-text-color,var(--ion-toolbar-text-color,#424242));background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.back-button-md .back-button-inner.activated{opacity:.4}.back-button-md ion-icon{padding-right:.3em;margin:0;padding:0 6px;text-align:left;text-align:start;font-size:24px;font-weight:400;line-height:.67;pointer-events:none}"}static get styleMode(){return"md"}}export{n as IonBackButton};