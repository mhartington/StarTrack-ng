/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class o{push(){const t=this.el.closest("ion-nav");if(t){const o=this.url||this.component;return t.setRoot(o,this.componentProps)}return Promise.resolve(null)}static get is(){return"ion-nav-set-root"}static get properties(){return{component:{type:"Any",attr:"component"},componentProps:{type:"Any",attr:"component-props"},el:{elementRef:!0},url:{type:String,attr:"url"}}}}export{o as IonNavSetRoot};