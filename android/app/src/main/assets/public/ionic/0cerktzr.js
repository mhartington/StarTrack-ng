/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class o{constructor(){this.duration=300}onStatusTap(){this.dom.read(()=>{const t=window.innerWidth,o=window.innerWidth,n=document.elementFromPoint(t/2,o/2);if(!n)return null;const i=n.closest("ion-scroll");i&&i.componentOnReady().then(()=>{this.dom.write(()=>{i.scrollToTop(this.duration)})})})}static get is(){return"ion-status-tap"}static get properties(){return{dom:{context:"dom"},duration:{type:Number,attr:"duration"}}}}export{o as IonStatusTap};