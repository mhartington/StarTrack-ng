/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class e{push(){const t=this.el.closest("ion-nav");if(t){const e=this.url||this.component;return t.setRoot(e,this.componentProps)}return Promise.resolve(null)}static get is(){return"ion-nav-set-root"}static get properties(){return{component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},el:{elementRef:!0},url:{type:String,attr:"url"}}}static get listeners(){return[{name:"child:click",method:"push"}]}}export{e as IonNavSetRoot};