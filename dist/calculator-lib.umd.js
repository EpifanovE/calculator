(function(a,r){typeof exports=="object"&&typeof module<"u"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(a=typeof globalThis<"u"?globalThis:a||self,r(a.CalculatorLib={}))})(this,function(a){"use strict";var y=Object.defineProperty;var f=(a,r,n)=>r in a?y(a,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[r]=n;var i=(a,r,n)=>(f(a,typeof r!="symbol"?r+"":r,n),n);class r{constructor(t,e){i(this,"_modifiers",[]);i(this,"_params");i(this,"_config");i(this,"addModifier",t=>{this.modifiers=[...this.modifiers,new n(t)]});i(this,"removeModifier",t=>{this.modifiers=this.modifiers.filter(e=>e.id!==t)});i(this,"setParam",(t,e)=>{this.params={...this.params,[t]:e}});i(this,"calculate",()=>{var e,o;const t=(e=this._config)!=null&&e.calculate?this._config.calculate(this.params):this.calculatorCallback(this.params);return(o=this._config)==null||o.onChange(t),t});i(this,"calculatorCallback",t=>!t||!t.price||!t.qty?0:this.applyModifiers(this.applyModifiers(t.price,this.modifiers.filter(e=>e.scope==="price").sort((e,o)=>e.priority-o.priority))*t.qty,this.modifiers.filter(e=>e.scope==="total").sort((e,o)=>e.priority-o.priority)));i(this,"applyModifiers",(t,e)=>e.reduce((o,u)=>u.handle(o),t));this._params=t,this._config={...e},this.calculate()}get modifiers(){return this._modifiers}set modifiers(t){this._modifiers=t,this.calculate()}get params(){return this._params}set params(t){this._params=t,this.calculate()}}class n{constructor(t){i(this,"id");i(this,"value");i(this,"scope");i(this,"priority",10);i(this,"operationStrategy");i(this,"operationTypeStrategy");switch(this.id=t.id,this.value=t.value,this.scope=t.scope,this.priority=t.priority||10,t.operation){case"sub":this.operationStrategy=l;break;case"multiple":this.operationStrategy=h;break;default:this.operationStrategy=p;break}switch(t.type){case"percent":this.operationTypeStrategy=c;break;default:this.operationTypeStrategy=d;break}}handle(t){return!this.operationStrategy||!this.operationTypeStrategy?t:this.operationStrategy.handle(t,this.operationTypeStrategy.handle(t,this.value||0))}}const p={handle:(s,t)=>s+t},l={handle:(s,t)=>s-t},h={handle:(s,t)=>s*t},c={handle:(s,t)=>s+s*t/100},d={handle:(s,t)=>t};a.Calculator=r,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});