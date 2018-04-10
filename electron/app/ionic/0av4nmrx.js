/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{openURL as r}from"./chunk1.js";class o{constructor(){this.goBack=!1}render(){return t("a",{href:this.href,onClick:t=>r(this.href,t,this.goBack)},t("slot",null))}static get is(){return"ion-anchor"}static get properties(){return{goBack:{type:Boolean,attr:"go-back"},href:{type:String,attr:"href"}}}}export{o as IonAnchor};