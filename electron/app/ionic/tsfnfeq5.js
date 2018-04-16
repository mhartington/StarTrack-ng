/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{assert as e,now as s}from"./chunk3.js";class i{constructor(t,e,s){this.dirty=!1,this.isPan=0;const i=s*(Math.PI/180);this.isDirX="x"===t,this.maxCosine=Math.cos(i),this.threshold=e*e}start(t,e){this.startX=t,this.startY=e,this.isPan=0,this.dirty=!0}detect(t,e){if(!this.dirty)return!1;const s=t-this.startX,i=e-this.startY,r=s*s+i*i;if(r<this.threshold)return!1;const a=Math.sqrt(r),h=(this.isDirX?s:i)/a;return h>this.maxCosine?this.isPan=1:h<-this.maxCosine?this.isPan=-1:this.isPan=0,this.dirty=!1,!0}isGesture(){return 0!==this.isPan}getDirection(){return this.isPan}}const r={disable:["menu-swipe","goback-swipe"],disableScroll:!0};class a{constructor(){this.positions=[],this.lastTouch=0,this.hasCapturedPan=!1,this.hasPress=!1,this.hasStartedPan=!1,this.hasFiredStart=!0,this.isMoveQueued=!1,this.disabled=!1,this.attachTo="child",this.autoBlockAll=!1,this.disableScroll=!1,this.direction="x",this.gestureName="",this.gesturePriority=0,this.passive=!0,this.maxAngle=40,this.threshold=10,this.type="pan",this.detail={type:"pan",startX:0,startY:0,startTimeStamp:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,timeStamp:0,event:void 0,data:void 0}}async componentWillLoad(){this.gesture=await this.gestureCtrl.create({name:this.gestureName,priority:this.gesturePriority,disableScroll:this.disableScroll})}componentDidLoad(){const t=this.type.replace(/\s/g,"").toLowerCase().split(",");t.indexOf("pan")>-1&&(this.pan=new i(this.direction,this.threshold,this.maxAngle)),this.hasPress=t.indexOf("press")>-1,this.disabledChanged(this.disabled),this.autoBlockAll&&this.gestureCtrl.componentOnReady().then(t=>t.createBlocker(r)).then(t=>this.blocker=t)}disabledChanged(t){(this.pan||this.hasPress)&&(this.enableListener(this,"touchstart",!t,this.attachTo,this.passive),this.enableListener(this,"mousedown",!t,this.attachTo,this.passive),t&&this.abortGesture())}onTouchStart(t){this.lastTouch=s(t),this.pointerDown(t,this.lastTouch)?(this.enableMouse(!1),this.enableTouch(!0)):this.abortGesture()}onMouseDown(t){const e=s(t);(0===this.lastTouch||this.lastTouch+h<e)&&(this.pointerDown(t,e)?(this.enableMouse(!0),this.enableTouch(!1)):this.abortGesture())}pointerDown(t,e){if(!this.gesture||this.hasStartedPan||!this.hasFiredStart)return!1;const s=this.detail;if(o(t,s),s.startX=s.currentX,s.startY=s.currentY,s.startTimeStamp=s.timeStamp=e,s.velocityX=s.velocityY=s.deltaX=s.deltaY=0,s.event=t,this.positions.length=0,this.hasFiredStart,this.hasStartedPan,this.hasCapturedPan,this.isMoveQueued,this.positions.length,this.canStart&&!1===this.canStart(s))return!1;if(this.gesture.release(),!this.gesture.start())return!1;if(this.positions.push(s.currentX,s.currentY,e),this.pan){if(this.hasStartedPan=!0,0===this.threshold)return this.tryToCapturePan();this.pan.start(s.startX,s.startY)}return!0}onTouchMove(t){this.lastTouch=this.detail.timeStamp=s(t),this.pointerMove(t)}onMoveMove(t){const e=s(t);(0===this.lastTouch||this.lastTouch+h<e)&&(this.detail.timeStamp=e,this.pointerMove(t))}pointerMove(t){if(this.pan,this.hasCapturedPan)return void(!this.isMoveQueued&&this.hasFiredStart&&(this.isMoveQueued=!0,this.calcGestureData(t),this.queue.write(this.fireOnMove.bind(this))));const e=this.detail;this.calcGestureData(t),this.pan.detect(e.currentX,e.currentY)&&this.pan.isGesture()&&(this.tryToCapturePan()||this.abortGesture())}fireOnMove(){if(!this.hasCapturedPan)return;const t=this.detail;this.isMoveQueued=!1,this.onMove?this.onMove(t):this.ionGestureMove.emit(t)}calcGestureData(t){const e=this.detail;o(t,e);const s=e.currentX,i=e.currentY,r=e.timeStamp;e.deltaX=s-e.startX,e.deltaY=i-e.startY,e.event=t;const a=r-100,h=this.positions;let n=h.length-1;for(;n>0&&h[n]>a;)n-=3;if(n>1){const t=1/(h[n]-r),a=h[n-1]-i,o=h[n-2]-s;e.velocityX=o*t,e.velocityY=a*t}else e.velocityX=0,e.velocityY=0;h.push(s,i,r)}tryToCapturePan(){if(!this.gesture.capture())return!1;this.hasCapturedPan=!0,this.hasFiredStart=!1;const t=this.detail;return t.startX=t.currentX,t.startY=t.currentY,t.startTimeStamp=t.timeStamp,this.onWillStart?this.onWillStart(this.detail).then(this.fireOnStart.bind(this)):this.fireOnStart(),!0}fireOnStart(){this.hasFiredStart,this.onStart?this.onStart(this.detail):this.ionGestureStart.emit(this.detail),this.hasFiredStart=!0}abortGesture(){this.reset(),this.enable(!1),this.notCaptured&&this.notCaptured(this.detail)}reset(){this.hasCapturedPan=!1,this.hasStartedPan=!1,this.isMoveQueued=!1,this.hasFiredStart=!0,this.gesture&&this.gesture.release()}onTouchCancel(t){this.lastTouch=this.detail.timeStamp=s(t),this.pointerUp(t),this.enableTouch(!1)}onMouseUp(t){const e=s(t);(0===this.lastTouch||this.lastTouch+h<e)&&(this.detail.timeStamp=e,this.pointerUp(t),this.enableMouse(!1))}pointerUp(t){const e=this.hasCapturedPan,s=this.hasFiredStart;if(this.reset(),!s)return;const i=this.detail;if(this.calcGestureData(t),e)return i.type="pan",void(this.onEnd?this.onEnd(i):this.ionGestureEnd.emit(i));this.hasPress&&this.detectPress()||(this.notCaptured?this.notCaptured(i):this.ionGestureNotCaptured.emit(i))}detectPress(){const t=this.detail,e=t.deltaX,s=t.deltaY;return e*e+s*s<100&&(t.type="press",this.onPress?this.onPress(t):this.ionPress.emit(t),!0)}enableMouse(t){this.pan&&this.enableListener(this,"document:mousemove",t,void 0,this.passive),this.enableListener(this,"document:mouseup",t,void 0,this.passive)}enableTouch(t){this.pan&&this.enableListener(this,"touchmove",t,this.attachTo,this.passive),this.enableListener(this,"touchcancel",t,this.attachTo,this.passive),this.enableListener(this,"touchend",t,this.attachTo,this.passive)}enable(t){this.enableMouse(t),this.enableTouch(t)}componentDidUnload(){this.blocker&&(this.blocker.destroy(),this.blocker=void 0),this.gesture.destroy()}static get is(){return"ion-gesture"}static get properties(){return{attachTo:{type:String,attr:"attach-to"},autoBlockAll:{type:Boolean,attr:"auto-block-all"},canStart:{type:"Any",attr:"can-start"},direction:{type:String,attr:"direction"},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},disableScroll:{type:Boolean,attr:"disable-scroll"},enableListener:{context:"enableListener"},gestureCtrl:{connect:"ion-gesture-controller"},gestureName:{type:String,attr:"gesture-name"},gesturePriority:{type:Number,attr:"gesture-priority"},maxAngle:{type:Number,attr:"max-angle"},notCaptured:{type:"Any",attr:"not-captured"},onEnd:{type:"Any",attr:"on-end"},onMove:{type:"Any",attr:"on-move"},onPress:{type:"Any",attr:"on-press"},onStart:{type:"Any",attr:"on-start"},onWillStart:{type:"Any",attr:"on-will-start"},passive:{type:Boolean,attr:"passive"},queue:{context:"queue"},threshold:{type:Number,attr:"threshold"},type:{type:String,attr:"type"}}}static get events(){return[{name:"ionGestureMove",method:"ionGestureMove",bubbles:!0,cancelable:!0,composed:!0},{name:"ionGestureStart",method:"ionGestureStart",bubbles:!0,cancelable:!0,composed:!0},{name:"ionGestureEnd",method:"ionGestureEnd",bubbles:!0,cancelable:!0,composed:!0},{name:"ionGestureNotCaptured",method:"ionGestureNotCaptured",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPress",method:"ionPress",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"touchstart",method:"onTouchStart",disabled:!0,passive:!0},{name:"mousedown",method:"onMouseDown",disabled:!0,passive:!0},{name:"touchmove",method:"onTouchMove",disabled:!0,passive:!0},{name:"document:mousemove",method:"onMoveMove",disabled:!0,passive:!0},{name:"touchcancel",method:"onTouchCancel",disabled:!0,passive:!0},{name:"touchend",method:"onTouchCancel",disabled:!0,passive:!0},{name:"document:mouseup",method:"onMouseUp",disabled:!0,passive:!0}]}}const h=2500;function o(t,e){let s=0,i=0;if(t){const e=t.changedTouches;if(e&&e.length>0){const t=e[0];s=t.clientX,i=t.clientY}else void 0!==t.pageX&&(s=t.pageX,i=t.pageY)}e.currentX=s,e.currentY=i}class n{constructor(t,e,s,i,r){this.id=e,this.name=s,this.priority=i,this.disableScroll=r,this.ctrl=t}canStart(){return!!this.ctrl&&this.ctrl.canStart(this.name)}start(){return!!this.ctrl&&this.ctrl.start(this.name,this.id,this.priority)}capture(){if(!this.ctrl)return!1;const t=this.ctrl.capture(this.name,this.id,this.priority);return t&&this.disableScroll&&this.ctrl.disableScroll(this.id),t}release(){this.ctrl&&(this.ctrl.release(this.id),this.disableScroll&&this.ctrl.enableScroll(this.id))}destroy(){this.release(),this.ctrl=void 0}}class l{constructor(t,e,s,i){this.id=t,this.disable=s,this.disableScroll=i,this.ctrl=e}block(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.disableGesture(t,this.id);this.disableScroll&&this.ctrl.disableScroll(this.id)}}unblock(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.enableGesture(t,this.id);this.disableScroll&&this.ctrl.enableScroll(this.id)}}destroy(){this.unblock(),this.ctrl=void 0}}class c{constructor(){this.gestureId=0,this.requestedStart=new Map,this.disabledGestures=new Map,this.disabledScroll=new Set,this.capturedId=null}create(t){return Promise.resolve(new n(this,this.newID(),t.name,t.priority?t.priority:0,!!t.disableScroll))}createBlocker(t={}){return new l(this.newID(),this,t.disable,!!t.disableScroll)}start(t,e,s){return this.canStart(t)?(this.requestedStart.set(e,s),!0):(this.requestedStart.delete(e),!1)}capture(t,e,s){if(!this.start(t,e,s))return!1;const i=this.requestedStart;let r=-1e4;return i.forEach(t=>{r=Math.max(r,t)}),r===s?(this.capturedId=e,i.clear(),this.ionGestureCaptured&&this.ionGestureCaptured.emit(t),!0):(i.delete(e),!1)}release(t){this.requestedStart.delete(t),this.capturedId&&t===this.capturedId&&(this.capturedId=null)}disableGesture(t,e){let s=this.disabledGestures.get(t);s||(s=new Set,this.disabledGestures.set(t,s)),s.add(e)}enableGesture(t,e){const s=this.disabledGestures.get(t);s&&s.delete(e)}disableScroll(t){this.disabledScroll.add(t)}enableScroll(t){this.disabledScroll.delete(t)}canStart(t){return!this.capturedId&&!this.isDisabled(t)}isCaptured(){return!!this.capturedId}isScrollDisabled(){return this.disabledScroll.size>0}isDisabled(t){const e=this.disabledGestures.get(t);return!!(e&&e.size>0)}newID(){return this.gestureId++,this.gestureId}static get is(){return"ion-gesture-controller"}static get properties(){return{create:{method:!0},createBlocker:{method:!0}}}static get events(){return[{name:"ionGestureCaptured",method:"ionGestureCaptured",bubbles:!0,cancelable:!0,composed:!0}]}}export{a as IonGesture,c as IonGestureController};