/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;import{createThemedClasses as t}from"./chunk1.js";class i{constructor(){this.disabled=!1,this.checked=!1}componentWillLoad(){this.inputId="ion-rb-"+a++,void 0===this.value&&(this.value=this.inputId),this.emitStyle()}componentDidLoad(){this.ionRadioDidLoad.emit({radio:this}),this.nativeInput.checked=this.checked,this.didLoad=!0;const e=this.nativeInput.closest("ion-item");if(e){const t=e.querySelector("ion-label");t&&(t.id=this.inputId+"-lbl",this.nativeInput.setAttribute("aria-labelledby",t.id))}}componentDidUnload(){this.ionRadioDidUnload.emit({radio:this})}colorChanged(){this.emitStyle()}checkedChanged(e){this.nativeInput.checked!==e&&(this.nativeInput.checked=e),clearTimeout(this.checkedTmr),this.checkedTmr=setTimeout(()=>{this.didLoad&&e&&this.ionSelect.emit({checked:e,value:this.value})}),this.emitStyle()}disabledChanged(e){this.nativeInput.disabled=e,this.emitStyle()}emitStyle(){clearTimeout(this.styleTmr),this.styleTmr=setTimeout(()=>{this.ionStyle.emit(Object.assign({},t(this.mode,this.color,"radio"),{"radio-checked":this.checked,"radio-disabled":this.disabled}))})}onClick(){this.checkedChanged(!0)}onChange(){this.checked=!0,this.nativeInput.focus()}onKeyUp(){this.keyFocus=!0}onFocus(){this.ionFocus.emit()}onBlur(){this.keyFocus=!1,this.ionBlur.emit()}hostData(){return{class:{"radio-checked":this.checked,"radio-disabled":this.disabled,"radio-key":this.keyFocus}}}render(){const t={"radio-icon":!0,"radio-checked":this.checked};return[e("div",{class:t},e("div",{class:"radio-inner"})),e("input",{type:"radio",onClick:this.onClick.bind(this),onChange:this.onChange.bind(this),onFocus:this.onFocus.bind(this),onBlur:this.onBlur.bind(this),onKeyUp:this.onKeyUp.bind(this),id:this.inputId,name:this.name,value:this.value,disabled:this.disabled,ref:e=>this.nativeInput=e})]}static get is(){return"ion-radio"}static get host(){return{theme:"radio"}}static get properties(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color",watchCallbacks:["colorChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},keyFocus:{state:!0},mode:{type:"Any",attr:"mode"},name:{type:String,attr:"name"},value:{type:String,attr:"value",mutable:!0}}}static get events(){return[{name:"ionRadioDidLoad",method:"ionRadioDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRadioDidUnload",method:"ionRadioDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ion-radio{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:inline-block}ion-radio input{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}ion-radio input:active,ion-radio input:focus{outline:0}ion-radio .radio-icon{-webkit-box-sizing:border-box;box-sizing:border-box}.radio-md .radio-icon{left:0;top:0;margin:0;border-radius:50%;position:relative;display:block;width:16px;height:16px;border-width:2px;border-style:solid;border-color:var(--ion-text-md-color-step-600,var(--ion-text-color-step-600,#999));contain:layout size style}.radio-md .radio-inner{left:2px;top:2px;border-radius:50%;position:absolute;width:8px;height:8px;background-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff));-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);-webkit-transition:-webkit-transform 280ms cubic-bezier(.4,0,.2,1);transition:-webkit-transform 280ms cubic-bezier(.4,0,.2,1);transition:transform 280ms cubic-bezier(.4,0,.2,1);transition:transform 280ms cubic-bezier(.4,0,.2,1),-webkit-transform 280ms cubic-bezier(.4,0,.2,1)}.radio-md .radio-checked{border-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.radio-md .radio-checked .radio-inner{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}.item-md.item-radio-disabled ion-label,.radio-md.radio-disabled{opacity:.3;pointer-events:none}.radio-key .radio-icon::after{border-radius:50%;left:-12px;top:-12px;position:absolute;display:block;width:36px;height:36px;background:var(--ion-color-md-primary-tint,var(--ion-color-primary-tint,#4c8dff));content:\"\";opacity:.2}.item-md .radio-md{margin:9px 10px 9px 0;position:static;display:block}.item-md .radio-md[slot=start]{margin:11px 36px 10px 4px}.item-radio.item-md ion-label{margin-left:0}.item-radio-checked.item-md ion-label{color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.item-radio-md-primary.item-radio-checked ion-label{color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.radio-md-primary .radio-checked{border-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.radio-md-primary .radio-inner{background-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.item-radio-md-secondary.item-radio-checked ion-label{color:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.radio-md-secondary .radio-checked{border-color:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.radio-md-secondary .radio-inner{background-color:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.item-radio-md-tertiary.item-radio-checked ion-label{color:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#7044ff))}.radio-md-tertiary .radio-checked{border-color:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#7044ff))}.radio-md-tertiary .radio-inner{background-color:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#7044ff))}.item-radio-md-success.item-radio-checked ion-label{color:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.radio-md-success .radio-checked{border-color:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.radio-md-success .radio-inner{background-color:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.item-radio-md-warning.item-radio-checked ion-label{color:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.radio-md-warning .radio-checked{border-color:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.radio-md-warning .radio-inner{background-color:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.item-radio-md-danger.item-radio-checked ion-label{color:var(--ion-color-md-danger,var(--ion-color-danger,#f04141))}.radio-md-danger .radio-checked{border-color:var(--ion-color-md-danger,var(--ion-color-danger,#f04141))}.radio-md-danger .radio-inner{background-color:var(--ion-color-md-danger,var(--ion-color-danger,#f04141))}.item-radio-md-light.item-radio-checked ion-label{color:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.radio-md-light .radio-checked{border-color:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.radio-md-light .radio-inner{background-color:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.item-radio-md-medium.item-radio-checked ion-label{color:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.radio-md-medium .radio-checked{border-color:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.radio-md-medium .radio-inner{background-color:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.item-radio-md-dark.item-radio-checked ion-label{color:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}.radio-md-dark .radio-checked{border-color:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}.radio-md-dark .radio-inner{background-color:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}"}static get styleMode(){return"md"}}let a=0;class o{constructor(){this.radios=[],this.allowEmptySelection=!1,this.disabled=!1}disabledChanged(){this.setDisabled()}valueChanged(){if(void 0===this.value)this.radios.filter(e=>e.checked).forEach(e=>{e.checked=!1});else{let e=!1;this.radios.forEach(t=>{t.value===this.value?(t.checked||e?e&&t.checked&&(t.checked=!1):t.checked=!0,e=!0):t.checked&&(t.checked=!1)})}this.didLoad&&this.ionChange.emit({value:this.value})}onRadioDidLoad(e){const t=e.target;this.radios.push(t),t.name=this.name,void 0!==this.value&&t.value===this.value?t.checked=!0:void 0===this.value&&t.checked?this.value=t.value:t.checked&&(t.checked=!1)}onRadioDidUnload(e){const t=this.radios.indexOf(e.target);t>-1&&this.radios.splice(t,1)}onRadioSelect(e){this.radios.forEach(t=>{t===e.target?t.value!==this.value&&(this.value=t.value):t.checked=!1})}componentWillLoad(){this.name=this.name||"ion-rg-"+s++}componentDidLoad(){let e=this.el.querySelector("ion-list-header");if(e||(e=this.el.querySelector("ion-item-divider")),e){const t=e.querySelector("ion-label");t&&(this.labelId=t.id=this.name+"-lbl")}this.setDisabled(),this.didLoad=!0}setDisabled(){this.radios.forEach(e=>{e.disabled=this.disabled})}hostData(){const e={role:"radiogroup"};return this.labelId&&(e["aria-labelledby"]=this.labelId),e}static get is(){return"ion-radio-group"}static get properties(){return{allowEmptySelection:{type:Boolean,attr:"allow-empty-selection"},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},labelId:{state:!0},name:{type:String,attr:"name",mutable:!0},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0}]}}let s=0;export{i as IonRadio,o as IonRadioGroup};