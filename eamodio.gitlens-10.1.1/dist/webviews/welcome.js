!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="#{root}/dist/webviews/",n(n.s=10)}([function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.getElementById=function(t){return document.getElementById(t)},t.listenAll=function(t,e,n){const r=document.querySelectorAll(t);for(const t of r)t.addEventListener(e,n,!1)}}(r||(r={}))},function(t,e,n){"use strict";n.d(e,"e",(function(){return o})),n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return u})),n.d(e,"c",(function(){return c}));class r{constructor(t){this.method=t}}class i{constructor(t){this.method=t}}function o(t,e,n){n(e.params)}const s=new r("configuration/didChange"),a=new i("webview/ready"),u=new i("configuration/update"),c=new r("settings/jumpTo")},function(t,e,n){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",o="week",s="month",a="quarter",u="year",c=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,l=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},h={s:d,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+d(r,2,"0")+":"+d(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,s),i=e-r<0,o=t.clone().add(n+(i?-1:1),s);return Number(-(n+(e-r)/(i?r-o:o-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(c){return{M:s,y:u,w:o,d:i,h:r,m:n,s:e,ms:t,Q:a}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},p="en",g={};g[p]=f;var m=function(t){return t instanceof b},y=function(t,e,n){var r;if(!t)return p;if("string"==typeof t)g[t]&&(r=t),e&&(g[t]=e,r=t);else{var i=t.name;g[i]=t,r=i}return n||(p=r),r},v=function(t,e,n){if(m(t))return t.clone();var r=e?"string"==typeof e?{format:e,pl:n}:e:{};return r.date=t,new b(r)},$=h;$.l=y,$.i=m,$.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u})};var b=function(){function d(t){this.$L=this.$L||y(t.locale,null,!0),this.parse(t)}var h=d.prototype;return h.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if($.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(c);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},h.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},h.$utils=function(){return $},h.isValid=function(){return!("Invalid Date"===this.$d.toString())},h.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},h.isAfter=function(t,e){return v(t)<this.startOf(e)},h.isBefore=function(t,e){return this.endOf(e)<v(t)},h.$g=function(t,e,n){return $.u(t)?this[e]:this.set(n,t)},h.year=function(t){return this.$g(t,"$y",u)},h.month=function(t){return this.$g(t,"$M",s)},h.day=function(t){return this.$g(t,"$W",i)},h.date=function(t){return this.$g(t,"$D","date")},h.hour=function(t){return this.$g(t,"$H",r)},h.minute=function(t){return this.$g(t,"$m",n)},h.second=function(t){return this.$g(t,"$s",e)},h.millisecond=function(e){return this.$g(e,"$ms",t)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(t,a){var c=this,l=!!$.u(a)||a,d=$.p(t),h=function(t,e){var n=$.w(c.$u?Date.UTC(c.$y,e,t):new Date(c.$y,e,t),c);return l?n:n.endOf(i)},f=function(t,e){return $.w(c.toDate()[t].apply(c.toDate(),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),c)},p=this.$W,g=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case u:return l?h(1,0):h(31,11);case s:return l?h(1,g):h(0,g+1);case o:var v=this.$locale().weekStart||0,b=(p<v?p+7:p)-v;return h(l?m-b:m+(6-b),g);case i:case"date":return f(y+"Hours",0);case r:return f(y+"Minutes",1);case n:return f(y+"Seconds",2);case e:return f(y+"Milliseconds",3);default:return this.clone()}},h.endOf=function(t){return this.startOf(t,!1)},h.$set=function(o,a){var c,l=$.p(o),d="set"+(this.$u?"UTC":""),h=(c={},c[i]=d+"Date",c.date=d+"Date",c[s]=d+"Month",c[u]=d+"FullYear",c[r]=d+"Hours",c[n]=d+"Minutes",c[e]=d+"Seconds",c[t]=d+"Milliseconds",c)[l],f=l===i?this.$D+(a-this.$W):a;if(l===s||l===u){var p=this.clone().set("date",1);p.$d[h](f),p.init(),this.$d=p.set("date",Math.min(this.$D,p.daysInMonth())).toDate()}else h&&this.$d[h](f);return this.init(),this},h.set=function(t,e){return this.clone().$set(t,e)},h.get=function(t){return this[$.p(t)]()},h.add=function(t,a){var c,l=this;t=Number(t);var d=$.p(a),h=function(e){var n=v(l);return $.w(n.date(n.date()+Math.round(e*t)),l)};if(d===s)return this.set(s,this.$M+t);if(d===u)return this.set(u,this.$y+t);if(d===i)return h(1);if(d===o)return h(7);var f=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[d]||1,p=this.valueOf()+t*f;return $.w(p,this)},h.subtract=function(t,e){return this.add(-1*t,e)},h.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=$.z(this),i=this.$locale(),o=this.$H,s=this.$m,a=this.$M,u=i.weekdays,c=i.months,d=function(t,r,i,o){return t&&(t[r]||t(e,n))||i[r].substr(0,o)},h=function(t){return $.s(o%12||12,t,"0")},f=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:$.s(a+1,2,"0"),MMM:d(i.monthsShort,a,c,3),MMMM:c[a]||c(this,n),D:this.$D,DD:$.s(this.$D,2,"0"),d:String(this.$W),dd:d(i.weekdaysMin,this.$W,u,2),ddd:d(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(o),HH:$.s(o,2,"0"),h:h(1),hh:h(2),a:f(o,s,!0),A:f(o,s,!1),m:String(s),mm:$.s(s,2,"0"),s:String(this.$s),ss:$.s(this.$s,2,"0"),SSS:$.s(this.$ms,3,"0"),Z:r};return n.replace(l,(function(t,e){return e||p[t]||r.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(t,c,l){var d,h=$.p(c),f=v(t),p=6e4*(f.utcOffset()-this.utcOffset()),g=this-f,m=$.m(this,f);return m=(d={},d[u]=m/12,d[s]=m,d[a]=m/3,d[o]=(g-p)/6048e5,d[i]=(g-p)/864e5,d[r]=g/36e5,d[n]=g/6e4,d[e]=g/1e3,d)[h]||g,l?m:$.a(m)},h.daysInMonth=function(){return this.endOf(s).$D},h.$locale=function(){return g[this.$L]},h.locale=function(t,e){if(!t)return this.$L;var n=this.clone();return n.$L=y(t,e,!0),n},h.clone=function(){return $.w(this.toDate(),this)},h.toDate=function(){return new Date(this.$d)},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},d}();return v.prototype=b.prototype,v.extend=function(t,e){return t(e,b,v),v},v.locale=y,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=g[p],v.Ls=g,v}()},function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){var r=e.prototype,i=r.format;n.en.ordinal=function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"},r.format=function(t){var e=this,n=this.$locale(),r=this.$utils(),o=(t||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|gggg|Do|X|x|k{1,2}|S/g,(function(t){switch(t){case"Q":return Math.ceil((e.$M+1)/3);case"Do":return n.ordinal(e.$D);case"gggg":return e.weekYear();case"wo":return n.ordinal(e.week(),"W");case"k":case"kk":return r.s(String(0===e.$H?24:e.$H),"k"===t?1:2,"0");case"X":return Math.floor(e.$d.getTime()/1e3);case"x":return e.$d.getTime();default:return t}}));return i.bind(this)(o)}}}()},function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){var r=e.prototype;n.en.relativeTime={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};var i=function(t,e,r,i){for(var o,s,a=r.$locale().relativeTime,u=[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],c=u.length,l=0;l<c;l+=1){var d=u[l];d.d&&(o=i?n(t).diff(r,d.d,!0):r.diff(t,d.d,!0));var h=Math.round(Math.abs(o));if(h<=d.r||!d.r){1===h&&l>0&&(d=u[l-1]),s=a[d.l].replace("%d",h);break}}return e?s:(o>0?a.future:a.past).replace("%s",s)};r.to=function(t,e){return i(t,e,this,!0)},r.from=function(t,e){return i(t,e,this)};var o=function(t){return t.$u?n.utc():n()};r.toNow=function(t){return this.to(o(this),t)},r.fromNow=function(t){return this.from(o(this),t)}}}()},function(t,e,n){"use strict";var r=n(1),i=n(0);const o=/^(?:(#?)([0-9a-f]{3}|[0-9a-f]{6})|((?:rgb|hsl)a?)\((-?\d+%?)[,\s]+(-?\d+%?)[,\s]+(-?\d+%?)[,\s]*(-?[\d.]+%?)?\))$/i;function s(t,e){const n=t+e,r=e<0?n<0?0:n:n>255?255:n;return Math.round(r)}function a(t,e){return u(t,-e)}function u(t,e){const n=l(t);if(null==n)return t;const[r,i,o,a]=n,u=255*e/100;return`rgba(${s(r,u)}, ${s(i,u)}, ${s(o,u)}, ${a})`}function c(t,e){const n=l(t);if(null==n)return t;const[r,i,o,s]=n;return`rgba(${r}, ${i}, ${o}, ${s*(e/100)})`}function l(t){t=t.trim();const e=o.exec(t);if(null==e)return null;if("#"===e[1]){const t=e[2];switch(t.length){case 3:return[parseInt(t[0]+t[0],16),parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),1];case 6:return[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16),1]}return null}switch(e[3]){case"rgb":return[parseInt(e[4],10),parseInt(e[5],10),parseInt(e[6],10),1];case"rgba":return[parseInt(e[4],10),parseInt(e[5],10),parseInt(e[6],10),parseFloat(e[7])];default:return null}}let d=0;class h{constructor(t,e){this.appName=t,this.log(`${this.appName}.ctor`),this._api=acquireVsCodeApi(),function(){const t=()=>{const t=document.body,e=window.getComputedStyle(t),n=t.style,r=e.getPropertyValue("--vscode-font-family").trim();r?(n.setProperty("--font-family",r),n.setProperty("--font-size",e.getPropertyValue("--vscode-font-size").trim()),n.setProperty("--font-weight",e.getPropertyValue("--vscode-font-weight").trim())):(n.setProperty("--font-family",e.getPropertyValue("--vscode-editor-font-family").trim()),n.setProperty("--font-size",e.getPropertyValue("--vscode-editor-font-size").trim()),n.setProperty("--font-weight",e.getPropertyValue("--vscode-editor-font-weight").trim()));let i=e.getPropertyValue("--vscode-editor-background").trim();n.setProperty("--color-background",i),n.setProperty("--color-background--lighten-05",u(i,5)),n.setProperty("--color-background--darken-05",a(i,5)),n.setProperty("--color-background--lighten-075",u(i,7.5)),n.setProperty("--color-background--darken-075",a(i,7.5)),n.setProperty("--color-background--lighten-15",u(i,15)),n.setProperty("--color-background--darken-15",a(i,15)),n.setProperty("--color-background--lighten-30",u(i,30)),n.setProperty("--color-background--darken-30",a(i,30)),n.setProperty("--color-background--lighten-50",u(i,50)),n.setProperty("--color-background--darken-50",a(i,50)),i=e.getPropertyValue("--vscode-button-background").trim(),n.setProperty("--color-button-background",i),n.setProperty("--color-button-background--darken-30",a(i,30)),i=e.getPropertyValue("--vscode-button-foreground").trim(),n.setProperty("--color-button-foreground",i),(i=e.getPropertyValue("--vscode-editor-foreground").trim())||(i=e.getPropertyValue("--vscode-foreground").trim()),n.setProperty("--color-foreground",i),n.setProperty("--color-foreground--85",c(i,85)),n.setProperty("--color-foreground--75",c(i,75)),n.setProperty("--color-foreground--65",c(i,65)),n.setProperty("--color-foreground--50",c(i,50)),i=e.getPropertyValue("--vscode-focusBorder").trim(),n.setProperty("--color-focus-border",i),i=e.getPropertyValue("--vscode-textLink-foreground").trim(),n.setProperty("--color-link-foreground",i),n.setProperty("--color-link-foreground--darken-20",a(i,20)),n.setProperty("--color-link-foreground--lighten-20",u(i,20))},e=new MutationObserver(t);e.observe(document.body,{attributes:!0,attributeFilter:["class"]}),t()}(),this.state=e,setTimeout(()=>{this.log(`${this.appName}.initializing`),void 0!==this.onInitialize&&this.onInitialize(),void 0!==this.onBind&&this.onBind(this),void 0!==this.onMessageReceived&&window.addEventListener("message",this.onMessageReceived.bind(this)),this.sendCommand(r.b,{}),void 0!==this.onInitialized&&this.onInitialized(),setTimeout(()=>{document.body.classList.remove("preload")},500)},0)}log(t){console.log(t)}sendCommand(t,e){return this.postMessage({id:this.nextIpcId(),method:t.method,params:e})}nextIpcId(){return d===Number.MAX_SAFE_INTEGER?d=1:d++,`webview:${d}`}postMessage(t){this._api.postMessage(t)}}var f,p,g=n(2),m=n(3),y=n(4);g.extend(m),g.extend(y),(p=f||(f={})).MillisecondsPerMinute=6e4,p.MillisecondsPerHour=36e5,p.MillisecondsPerDay=864e5,p.getFormatter=function(t){return g(t)},n.d(e,"a",(function(){return $}));const v=f.getFormatter(new Date("Wed Jul 25 2018 19:18:00 GMT-0400"));class $ extends h{constructor(t,e){super(t,e),this._changes=Object.create(null),this._updating=!1}onInitialized(){this.setState()}onBind(t){i.a.listenAll("input[type=checkbox][data-setting]","change",(function(){return t.onInputChecked(this)})),i.a.listenAll("input[type=text][data-setting], input:not([type])[data-setting]","blur",(function(){return t.onInputBlurred(this)})),i.a.listenAll("input[type=text][data-setting], input:not([type])[data-setting]","focus",(function(){return t.onInputFocused(this)})),i.a.listenAll("input[type=text][data-setting][data-setting-preview]","input",(function(){return t.onInputChanged(this)})),i.a.listenAll("select[data-setting]","change",(function(){return t.onInputSelected(this)})),i.a.listenAll(".popup","mousedown",(function(e){return t.onPopupMouseDown(this,e)}))}onMessageReceived(t){const e=t.data;switch(e.method){case r.a.method:Object(r.e)(r.a,e,t=>{this.state.config=t.config,this.setState()});break;default:void 0!==super.onMessageReceived&&super.onMessageReceived(t)}}applyChanges(){this.sendCommand(r.d,{changes:{...this._changes},removes:Object.keys(this._changes).filter(t=>void 0===this._changes[t]),scope:this.getSettingsScope()}),this._changes=Object.create(null)}getSettingsScope(){return"user"}onInputBlurred(t){this.log(`${this.appName}.onInputBlurred: name=${t.name}, value=${t.value}`);const e=document.getElementById(`${t.name}.popup`);null!=e&&e.classList.add("hidden");let n=t.value;null!=n&&0!==n.length||void 0===(n=t.dataset.defaultValue)&&(n=null),this._changes[t.name]=n,this.applyChanges()}onInputChanged(t){if(!this._updating)for(const e of document.querySelectorAll(`span[data-setting-preview="${t.name}"]`))this.updatePreview(e,t.value)}onInputChecked(t){if(!this._updating){switch(this.log(`${this.appName}.onInputChecked: name=${t.name}, checked=${t.checked}, value=${t.value}`),t.dataset.settingType){case"object":{const e=t.name.split("."),n=e.splice(0,1)[0],r=this.getSettingValue(n)||Object.create(null);t.checked?S(r,e.join("."),M(t.value)):S(r,e.join("."),!1),this._changes[n]=r;break}case"array":{const e=this.getSettingValue(t.name)||[];if(Array.isArray(e)){if(t.checked)e.includes(t.value)||e.push(t.value);else{const n=e.indexOf(t.value);-1!==n&&e.splice(n,1)}this._changes[t.name]=e}break}default:t.checked?this._changes[t.name]=M(t.value):this._changes[t.name]=null!=t.dataset.valueOff&&t.dataset.valueOff}this.setAdditionalSettings(t.checked?t.dataset.addSettingsOn:t.dataset.addSettingsOff),this.applyChanges()}}onInputFocused(t){this.log(`${this.appName}.onInputFocused: name=${t.name}, value=${t.value}`);const e=document.getElementById(`${t.name}.popup`);if(null!=e){if(0===e.childElementCount){const t=document.querySelector("#token-popup"),n=document.importNode(t.content,!0);e.appendChild(n)}e.classList.remove("hidden")}}onInputSelected(t){if(this._updating)return;const e=t.options[t.selectedIndex].value;this.log(`${this.appName}.onInputSelected: name=${t.name}, value=${e}`),this._changes[t.name]=b(e),this.applyChanges()}onPopupMouseDown(t,e){e.preventDefault();const n=e.target;n&&n.matches("[data-token]")&&this.onTokenMouseDown(n,e)}onTokenMouseDown(t,e){if(this._updating)return;this.log(`${this.appName}.onTokenClicked: id=${t.id}`);const n=t.closest(".setting");if(null==n)return;const r=n.querySelector("input[type=text], input:not([type])");null!=r&&(r.value+=`\${${t.dataset.token}}`,e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault())}evaluateStateExpression(t,e){let n=!1;for(const r of t.trim().split("&")){const[t,i,o]=w(r);switch(i){case"=":{let r=e[t];void 0===r&&(r=this.getSettingValue(t)||!1),n=void 0!==o?o===String(r):Boolean(r);break}case"!":{let r=e[t];void 0===r&&(r=this.getSettingValue(t)||!1),n=void 0!==o?o!==String(r):!r;break}case"+":if(void 0!==o){const e=this.getSettingValue(t);n=void 0!==e&&e.includes(o.toString())}}if(!n)break}return n}getSettingValue(t){return function(t,e){return e.split(".").reduce((t={},e)=>null==t?void 0:t[e],t)}(this.state.config,t)}setState(){this._updating=!0;try{for(const t of document.querySelectorAll("input[type=checkbox][data-setting]"))if("array"===t.dataset.settingType)t.checked=(this.getSettingValue(t.name)||[]).includes(t.value);else if(null!=t.dataset.valueOff){const e=this.getSettingValue(t.name);t.checked=t.dataset.valueOff!==e}else t.checked=this.getSettingValue(t.name)||!1;for(const t of document.querySelectorAll("input[type=text][data-setting], input:not([type])[data-setting]"))t.value=this.getSettingValue(t.name)||"";for(const t of document.querySelectorAll("select[data-setting]")){const e=this.getSettingValue(t.name),n=t.querySelector(`option[value='${e}']`);null!=n&&(n.selected=!0)}for(const t of document.querySelectorAll("span[data-setting-preview]"))this.updatePreview(t)}finally{this._updating=!1}const t=function t(e,n){const r={};for(const i in e){const o=e[i];Array.isArray(o)||("object"==typeof o?Object.assign(r,t(o,void 0===n?i:`${n}.${i}`)):r[void 0===n?i:`${n}.${i}`]=o)}return r}(this.state.config);this.setVisibility(t),this.setEnablement(t)}setAdditionalSettings(t){if(!t)return;const e=function(t){return t.trim().split(",").map(t=>{const[e,n]=t.split("=");return[e,b(n)]})}(t);for(const[t,n]of e)this._changes[t]=n}setEnablement(t){for(const e of document.querySelectorAll("[data-enablement]")){const n=!this.evaluateStateExpression(e.dataset.enablement,t);if(n?e.setAttribute("disabled",""):e.removeAttribute("disabled"),e.matches("input,select"))e.disabled=n;else{const t=e.querySelector("input,select");if(null==t)continue;t.disabled=n}}}setVisibility(t){for(const e of document.querySelectorAll("[data-visibility]"))e.classList.toggle("hidden",!this.evaluateStateExpression(e.dataset.visibility,t))}updatePreview(t,e){switch(t.dataset.settingPreviewType){case"date":void 0===e&&(e=this.getSettingValue(t.dataset.settingPreview)),null!=e&&0!==e.length||(e=t.dataset.settingPreviewDefault),t.innerText=null==e?"":v.format(e)}}}function b(t){return"true"===t||"false"!==t&&t}function S(t,e,n){const r=e.split("."),i=r.length,o=i-1;let s=-1,a=t;for(;null!=a&&++s<i;){const t=r[s];let e=n;if(s!==o){const n=a[t];e="object"==typeof n?n:{}}a[t]=e,a=a[t]}return t}function w(t){const[e,n,r]=t.trim().split(/([=+!])/);return[e.trim(),void 0!==n?n.trim():"=",void 0!==r?r.trim():r]}function M(t){switch(t){case"on":return!0;case"null":return null;case"undefined":return;default:return t}}},,,,,function(t,e,n){t.exports=n(11)},function(t,e,n){"use strict";n.r(e),n.d(e,"WelcomeApp",(function(){return i}));var r=n(5);class i extends r.a{constructor(){super("WelcomeApp",window.bootstrap),window.bootstrap=void 0}}new i}]);