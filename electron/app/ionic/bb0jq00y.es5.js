/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("bb0jq00y",["exports"],function(e){var t=window.Ionic.h,r=function(){function e(){this.appliedStyles=!1,this.didStart=!1,this.progress=0,this.scrollEl=null,this.state=1,this.pullMin=60,this.pullMax=this.pullMin+60,this.closeDuration="280ms",this.snapbackDuration="280ms",this.disabled=!0,this.gestureConfig={canStart:this.canStart.bind(this),onStart:this.onStart.bind(this),onMove:this.onMove.bind(this),onEnd:this.onEnd.bind(this),gestureName:"refresher",gesturePriority:10,type:"pan",passive:!1,direction:"y",threshold:0,attachTo:"window"}}return e.prototype.componentDidLoad=function(){if("fixed"===this.el.getAttribute("slot")){var e=this.el.parentElement;e?(this.scrollEl=e.querySelector("ion-scroll"),this.scrollEl||console.error("ion-refresher didn't attached, make sure if parent is a ion-content")):console.error("ion-refresher is not attached")}else console.error('Make sure you use: <ion-refresher slot="fixed">')},e.prototype.componentDidUnload=function(){this.scrollEl=null},e.prototype.complete=function(){this.close(32,"120ms")},e.prototype.cancel=function(){this.close(16,"")},e.prototype.getProgress=function(){return this.progress},e.prototype.canStart=function(){return!(!this.scrollEl||1!==this.state||this.scrollEl.scrollTop>0)},e.prototype.onStart=function(){this.progress=0,this.state=1},e.prototype.onMove=function(e){if(!this.scrollEl)return 0;var t=e.event;if(t.touches&&t.touches.length>1)return 1;if(56&this.state)return 2;var r=e.deltaY;if(r<=0)return this.progress=0,this.state=1,this.appliedStyles?(this.setCss(0,"",!1,""),5):6;if(1===this.state){if(this.scrollEl.scrollTop>0)return this.progress=0,7;this.state=2}if(t.preventDefault(),this.setCss(r,"0ms",!0,""),!r)return this.progress=0,8;var n=this.pullMin;return this.progress=r/n,this.didStart||(this.didStart=!0,this.ionStart.emit(this)),this.ionPull.emit(this),r<n?(this.state=2,2):r>this.pullMax?(this.beginRefresh(),3):(this.state=4,4)},e.prototype.onEnd=function(){4===this.state?this.beginRefresh():2===this.state&&this.cancel()},e.prototype.beginRefresh=function(){this.state=8,this.setCss(this.pullMin,this.snapbackDuration,!0,""),this.ionRefresh.emit(this)},e.prototype.close=function(e,t){var r=this;setTimeout(function(){r.state=1,r.progress=0,r.didStart=!1,r.setCss(0,"0ms",!1,"")},600),this.state=e,this.setCss(0,"",!0,t)},e.prototype.setCss=function(e,t,r,n){var i=this;this.appliedStyles=e>0,this.queue.write(function(){if(i.scrollEl){var s=i.scrollEl.style;s.transform=e>0?"translateY("+e+"px) translateZ(0px)":"translateZ(0px)",s.transitionDuration=t,s.transitionDelay=n,s.overflow=r?"hidden":""}})},e.prototype.hostData=function(){return{class:{"refresher-active":1!==this.state,"refresher-pulling":2===this.state,"refresher-ready":4===this.state,"refresher-refreshing":8===this.state,"refresher-cancelling":16===this.state,"refresher-completing":32===this.state}}},e.prototype.render=function(){return t("ion-gesture",Object.assign({},this.gestureConfig,{disabled:this.disabled}),t("slot",null))},Object.defineProperty(e,"is",{get:function(){return"ion-refresher"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"refresher"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{cancel:{method:!0},closeDuration:{type:String,attr:"close-duration"},complete:{method:!0},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},getProgress:{method:!0},pullMax:{type:Number,attr:"pull-max"},pullMin:{type:Number,attr:"pull-min"},queue:{context:"queue"},snapbackDuration:{type:String,attr:"snapback-duration"},state:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionRefresh",method:"ionRefresh",bubbles:!0,cancelable:!0,composed:!0},{name:"ionPull",method:"ionPull",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStart",method:"ionStart",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-refresher{left:0;top:0;position:absolute;top:0;z-index:0;display:none;width:100%;height:60px}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{text-align:center;-webkit-transform-origin:center;transform-origin:center;font-size:30px;-webkit-transition:.2s;transition:.2s}.refresher-pulling-text,.refresher-refreshing-text{text-align:center;font-size:16px}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-md .refresher-pulling-icon,.refresher-md .refresher-refreshing-icon{color:var(--ion-text-md-color,var(--ion-text-color,#000))}.refresher-md .refresher-pulling-text,.refresher-md .refresher-refreshing-text{color:var(--ion-text-md-color,var(--ion-text-color,#000))}.refresher-md .refresher-refreshing .spinner-crescent circle,.refresher-md .refresher-refreshing .spinner-lines-md line,.refresher-md .refresher-refreshing .spinner-lines-small-md line{stroke:var(--ion-text-md-color,var(--ion-text-color,#000))}.refresher-md .refresher-refreshing .spinner-bubbles circle,.refresher-md .refresher-refreshing .spinner-circles circle,.refresher-md .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-md-color,var(--ion-text-color,#000))}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}(),n=function(){function e(){}return e.prototype.componentDidLoad=function(){this.pullingIcon||(this.pullingIcon=this.config.get("ionPullIcon","arrow-down")),this.refreshingSpinner||(this.refreshingSpinner=this.config.get("ionRefreshingSpinner",this.config.get("spinner","lines")))},e.prototype.render=function(){return[t("div",{class:"refresher-pulling"},this.pullingIcon&&t("div",{class:"refresher-pulling-icon"},t("ion-icon",{name:this.pullingIcon})),this.pullingText&&t("div",{class:"refresher-pulling-text",innerHTML:this.pullingText})),t("div",{class:"refresher-refreshing"},this.refreshingSpinner&&t("div",{class:"refresher-refreshing-icon"},t("ion-spinner",{name:this.refreshingSpinner})),this.refreshingText&&t("div",{class:"refresher-refreshing-text",innerHTML:this.refreshingText}))]},Object.defineProperty(e,"is",{get:function(){return"ion-refresher-content"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{config:{context:"config"},pullingIcon:{type:String,attr:"pulling-icon",mutable:!0},pullingText:{type:String,attr:"pulling-text"},refreshingSpinner:{type:String,attr:"refreshing-spinner",mutable:!0},refreshingText:{type:String,attr:"refreshing-text"}}},enumerable:!0,configurable:!0}),e}();e.IonRefresher=r,e.IonRefresherContent=n,Object.defineProperty(e,"__esModule",{value:!0})});