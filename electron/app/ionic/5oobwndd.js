/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{now as e}from"./chunk3.js";class i{constructor(){this.lastClick=-1e4,this.useTapClick=!1}tapClickChanged(t){this.enableListener(this,"parent:ionActivated",t),this.enableListener(this,"touchstart",!t),this.enableListener(this,"mousedown",!t)}ionActivated(t){this.addRipple(t.detail.x,t.detail.y)}touchStart(t){this.lastClick=e(t);const i=t.touches[0];this.addRipple(i.clientX,i.clientY)}mouseDown(t){const i=e(t);this.lastClick<i-1e3&&this.addRipple(t.pageX,t.pageY)}componentDidLoad(){this.tapClickChanged(this.useTapClick)}addRipple(t,e){let i,s,a;this.dom.read(()=>{const n=this.el.getBoundingClientRect(),l=n.width,o=n.height;a=Math.min(2*Math.sqrt(l*l+o*o),600),i=t-n.left-a/2,s=e-n.top-a/2}),this.dom.write(()=>{const t=document.createElement("div");t.classList.add("ripple-effect");const e=t.style,n=Math.max(800*Math.sqrt(a/350)+.5,260);e.top=s+"px",e.left=i+"px",e.width=a+"px",e.height=a+"px",e.animationDuration=n+"ms",this.el.appendChild(t),setTimeout(()=>t.remove(),n+50)})}static get is(){return"ion-ripple-effect"}static get properties(){return{addRipple:{method:!0},dom:{context:"dom"},el:{elementRef:!0},enableListener:{context:"enableListener"},useTapClick:{type:Boolean,attr:"use-tap-click",watchCallbacks:["tapClickChanged"]}}}static get style(){return"ion-ripple-effect{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict}.ripple-effect{border-radius:50%;position:absolute;background-color:var(--ion-ripple-background-color,#000);opacity:0;will-change:transform,opacity;pointer-events:none;-webkit-animation-name:rippleAnimation;animation-name:rippleAnimation;-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;contain:strict}\@-webkit-keyframes rippleAnimation{0%{opacity:.2;-webkit-transform:scale(.05);transform:scale(.05)}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}\@keyframes rippleAnimation{0%{opacity:.2;-webkit-transform:scale(.05);transform:scale(.05)}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}"}}export{i as IonRippleEffect};