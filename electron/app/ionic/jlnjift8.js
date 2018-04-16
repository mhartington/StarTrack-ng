/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class e{constructor(){this.duration=300}onStatusTap(){this.queue.read(()=>{const t=window.innerWidth,e=window.innerWidth,n=document.elementFromPoint(t/2,e/2);if(!n)return;const o=n.closest("ion-scroll");o&&o.componentOnReady().then(()=>{this.queue.write(()=>{o.scrollToTop(this.duration)})})})}static get is(){return"ion-status-tap"}static get properties(){return{duration:{type:Number,attr:"duration"},queue:{context:"queue"}}}static get listeners(){return[{name:"window:statusTap",method:"onStatusTap"}]}}export{e as IonStatusTap};