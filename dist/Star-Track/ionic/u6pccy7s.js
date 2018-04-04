/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class n{push(){const t=this.el.closest("ion-nav"),n=this.url||this.component;return t&&n?t.push(n,this.componentProps):Promise.resolve(null)}static get is(){return"ion-nav-push"}static get properties(){return{component:{type:"Any",attr:"component"},componentProps:{type:"Any",attr:"component-props"},el:{elementRef:!0},url:{type:String,attr:"url"}}}}export{n as IonNavPush};