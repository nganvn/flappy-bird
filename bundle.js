!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=3)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(t,e){this._node=new Array,this.opacity=100,this.opacityInc=!1,this.isKeydown=!1,this.getRandomInt=t=>Math.floor(Math.random()*t),this.canvas=document.getElementById("canvas"),this.canvas.width=t,this.canvas.height=e,this.ctx=this.canvas.getContext("2d")}static getInstance(){return s.instance||(s.instance=new s(450,800)),this.instance}runWithSence(t){self.requestAnimationFrame(()=>t.start())}getCtx(){return this.ctx}getCanvas(){return this.canvas}}e.default=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.size=e.v2=e.Size=e.Vec2=void 0;class s{constructor(t,e){this.x=t,this.y=e}neg(){return new s(-this.x,-this.y)}add(t){this.x+=t.x,this.y+=t.y}plus(t){return new s(this.x+t.x,this.y+t.y)}sqrt(){return Math.sqrt(this.x*this.x+this.y*this.y)}scale(t){return new s(this.x*t,this.y*t)}}e.Vec2=s;class n{constructor(t,e){this.width=t,this.height=e}}e.Size=n,e.v2=function(t,e){return new s(t,e)},e.size=function(t,e){return new n(t,e)}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(1);e.default=class{constructor(){this.name="",this.position=s.v2(0,0),this.color="black",this.action=null,this.velocity=s.v2(0,0),this.force=s.v2(0,0)}checkClick(t){return!1}setName(t){this.name=t}getName(){return this.name}setPosition(t){this.position=t}getPosition(){return this.position}setColor(t){this.color=t}getColor(){return this.color}update(t){this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t+this.force.y*t*t/2,this.velocity.y+=this.force.y*t}render(){}runAction(t){this.action&&!this.action.isEndAction()?this.position.add(this.action.getDtv2(t)):this.action=null}addAction(t){this.action=t}setVelocity(t){this.velocity=t}addVelocity(t){this.velocity.add(t)}getVelocity(){return this.velocity}addForce(t){this.force.add(t)}setForce(t){this.force=t}getForce(){return this.force}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i(4);const s=i(0),n=i(9);window.onload=()=>{!function(){let t=new n.default;t.initAwaitScreen(),s.default.getInstance().runWithSence(t)}()}},function(t,e,i){var s=i(5);"string"==typeof s&&(s=[[t.i,s,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(7)(s,n);s.locals&&(t.exports=s.locals)},function(t,e,i){(t.exports=i(6)(!1)).push([t.i,"html, body {\r\n    height: 100%;\r\n    background-color: rgb(47, 47, 47);\r\n    margin: 0px;\r\n}\r\n\r\ncanvas {\r\n    background-color: rgb(179, 255, 255);\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: block;\r\n    width: 450px;\r\n    height:800px;\r\n}",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",s=t[3];if(!s)return i;if(e&&"function"==typeof btoa){var n=(o=s,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),r=s.sources.map((function(t){return"/*# sourceURL="+s.sourceRoot+t+" */"}));return[i].concat(r).concat([n]).join("\n")}var o;return[i].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i})).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},n=0;n<this.length;n++){var r=this[n][0];"number"==typeof r&&(s[r]=!0)}for(n=0;n<t.length;n++){var o=t[n];"number"==typeof o[0]&&s[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),e.push(o))}},e}},function(t,e,i){var s,n,r={},o=(s=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===n&&(n=s.apply(this,arguments)),n}),a=function(t){return document.querySelector(t)},h=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var i=a.call(this,t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}}(),c=null,l=0,u=[],d=i(8);function f(t,e){for(var i=0;i<t.length;i++){var s=t[i],n=r[s.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](s.parts[o]);for(;o<s.parts.length;o++)n.parts.push(y(s.parts[o],e))}else{var a=[];for(o=0;o<s.parts.length;o++)a.push(y(s.parts[o],e));r[s.id]={id:s.id,refs:1,parts:a}}}}function p(t,e){for(var i=[],s={},n=0;n<t.length;n++){var r=t[n],o=e.base?r[0]+e.base:r[0],a={css:r[1],media:r[2],sourceMap:r[3]};s[o]?s[o].parts.push(a):i.push(s[o]={id:o,parts:[a]})}return i}function v(t,e){var i=h(t.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var s=u[u.length-1];if("top"===t.insertAt)s?s.nextSibling?i.insertBefore(e,s.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),u.push(e);else if("bottom"===t.insertAt)i.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=h(t.insertInto+" "+t.insertAt.before);i.insertBefore(e,n)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function b(t){var e=document.createElement("style");return t.attrs.type="text/css",m(e,t.attrs),v(t,e),e}function m(t,e){Object.keys(e).forEach((function(i){t.setAttribute(i,e[i])}))}function y(t,e){var i,s,n,r;if(e.transform&&t.css){if(!(r=e.transform(t.css)))return function(){};t.css=r}if(e.singleton){var o=l++;i=c||(c=b(e)),s=S.bind(null,i,o,!1),n=S.bind(null,i,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",m(e,t.attrs),v(t,e),e}(e),s=_.bind(null,i,e),n=function(){g(i),i.href&&URL.revokeObjectURL(i.href)}):(i=b(e),s=j.bind(null,i),n=function(){g(i)});return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else n()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=o()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var i=p(t,e);return f(i,e),function(t){for(var s=[],n=0;n<i.length;n++){var o=i[n];(a=r[o.id]).refs--,s.push(a)}t&&f(p(t,e),e);for(n=0;n<s.length;n++){var a;if(0===(a=s[n]).refs){for(var h=0;h<a.parts.length;h++)a.parts[h]();delete r[a.id]}}}};var w,x=(w=[],function(t,e){return w[t]=e,w.filter(Boolean).join("\n")});function S(t,e,i,s){var n=i?"":s.css;if(t.styleSheet)t.styleSheet.cssText=x(e,n);else{var r=document.createTextNode(n),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}function j(t,e){var i=e.css,s=e.media;if(s&&t.setAttribute("media",s),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}function _(t,e,i){var s=i.css,n=i.sourceMap,r=void 0===e.convertToAbsoluteUrls&&n;(e.convertToAbsoluteUrls||r)&&(s=d(s)),n&&(s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var o=new Blob([s],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var i=e.protocol+"//"+e.host,s=i+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var n,r=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(n=0===r.indexOf("//")?r:0===r.indexOf("/")?i+r:s+r.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")}))}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(0),n=i(10),r=i(1),o=i(11),a=i(12);var h;!function(t){t[t.Await=0]="Await",t[t.Playing=1]="Playing",t[t.GameOver=2]="GameOver"}(h||(h={}));class c{}c.PIPEDELAY=1400;class l extends n.default{constructor(){super(),this.isKeydown=!1,this.play=t=>{this.bird.setVelocity(r.v2(0,-400)),this.bird.setForce(r.v2(0,1200)),this.canvas.removeEventListener("mousedown",this.play),this._addScore=setTimeout(this.addScore,4300),this._appPipe=setTimeout(()=>this.addpipe(),2e3),this.canvas.addEventListener("mousedown",this.clickEvent),this.gameState=h.Playing,this.removeByName("helper")},this.replay=t=>{this.removeAll(),this.initAwaitScreen(),this._pipes.splice(0,this._pipes.length),this.canvas.removeEventListener("mousedown",this.replay)},this.endGame=()=>{this._pipes.forEach(t=>{t.pipeUp.setVelocity(r.v2(0,0)),t.pipeDown.setVelocity(r.v2(0,0))}),clearTimeout(this._appPipe),clearTimeout(this._addScore),this.gameState=h.GameOver,this.intScore>this.highScore&&(this.highScore=this.intScore),this.canvas.removeEventListener("mousedown",this.clickEvent),setTimeout(()=>this.canvas.addEventListener("mousedown",this.replay),1500);let t=new a.default("Game Over");t.setFont("60px Gotham, Helvetica Neue, sans-serif"),t.setPosition(r.v2(this.canvas.width/2,200)),t.setColor("blue"),t.setName("helper"),t.setAlign("center");let e=new a.default("Highscore: "+this.highScore);e.setFont("50px Gotham, Helvetica Neue, sans-serif"),e.setPosition(r.v2(this.canvas.width/2,280)),e.setColor("blue"),e.setName("helper"),e.setAlign("center");let i=new a.default("Tap to replay");i.setFont("60px Gotham, Helvetica Neue, sans-serif"),i.setPosition(r.v2(this.canvas.width/2,400)),i.setColor("blue"),i.setName("helper"),i.setAlign("center"),setTimeout(()=>this.add(t,100),200),setTimeout(()=>this.add(e,100),600),setTimeout(()=>this.add(i,100),1e3)},this.addScore=()=>{this.intScore++,this.score.setText("Score: "+this.intScore),this._addScore=setTimeout(this.addScore,c.PIPEDELAY)},this.clickEvent=t=>{if(!this.gameState){let t=this.canvas;return this.bird.setPosition(r.v2(t.width/4,t.height/2-this.bird.getSize().height/2)),this.gameState=h.Playing,void(this.intScore=0)}this.gameState=h.Playing;let e=t.x-this.canvas.offsetLeft,i=t.y-this.canvas.offsetTop;this.bird.setVelocity(r.v2(0,-400)),this.bird.setForce(r.v2(0,1200));this.checkClick(r.v2(e,i))},this.gameState=h.Await,this.intScore=0,this.highScore=0,this._pipes=new Array;let t=s.default.getInstance();this.ctx=t.getCtx(),this.canvas=t.getCanvas()}initAwaitScreen(){let t=this.canvas;this.background=new o.default(r.size(t.width,t.height)),this.background.setColor("rgb(153, 209, 209)"),this.ground=new o.default(r.size(t.width,200)),this.ground.setPosition(r.v2(0,t.height-200)),this.ground.setColor("rgb(189, 118,79)"),this.grass=new o.default(r.size(t.width,50)),this.grass.setPosition(r.v2(0,t.height-200)),this.grass.setColor("rgb(14, 176, 55)"),this.bird=new o.default(r.size(32,32)),this.bird.setPosition(r.v2(t.width/4,t.height/2-this.bird.getSize().height/2)),this.bird.setColor("rgb(207, 37, 46)"),this.score=new a.default("Score: 0"),this.score.setPosition(r.v2(20,40)),this.score.setColor("red"),this.helper=new a.default("Tap to play"),this.helper.setFont("60px Gotham, Helvetica Neue, sans-serif"),this.helper.setPosition(r.v2(this.canvas.width/2,200)),this.helper.setColor("red"),this.helper.setName("helper"),this.helper.setAlign("center"),this.add(this.background,0),this.add(this.ground,10),this.add(this.grass,11),this.add(this.bird,20),this.add(this.score,30),this.add(this.helper,60),this.canvas.addEventListener("mousedown",this.play),this.gameState=h.Await,this.intScore=0}addpipe(){let t=this.randomInt(220),e=this.randomInt(100)+50,i=this.randomInt(100)+50,s=this.randomInt(100)+50,n=new o.default(r.size(50,500));n.setColor(`rgb(${e}, ${i}, ${s})`),n.setPosition(r.v2(450,-380+t)),n.setVelocity(r.v2(-150,0));let a=new o.default(r.size(50,500));a.setColor(`rgb(${e}, ${i}, ${s})`),a.setPosition(r.v2(450,300+t)),a.setVelocity(r.v2(-150,0)),this.add(n,1),this.add(a,1),this._pipes.push({pipeUp:a,pipeDown:n}),this._appPipe=setTimeout(()=>this.addpipe(),c.PIPEDELAY)}isRectCollieRect(t,e){let i=t.getPosition(),s=t.getSize(),n=e.getPosition(),r=e.getSize();return Math.abs(i.x-n.x+(s.width-r.width)/2)<=(s.width+r.width)/2&&Math.abs(i.y-n.y+(s.height-r.height)/2)<=(s.height+r.height)/2}isCollisionWithPipe(){return this._pipes.filter(t=>this.isRectCollieRect(this.bird,t.pipeDown)||this.isRectCollieRect(this.bird,t.pipeUp)).length>0}update(t){this.gameState==h.Playing&&(this.isCollisionWithPipe()||s.default.getInstance().getCanvas().height<=this.bird.getPosition().y+220)&&this.endGame(),this.gameState==h.GameOver&&s.default.getInstance().getCanvas().height<=this.bird.getPosition().y+220&&(this.bird.setForce(r.v2(0,0)),this.bird.setVelocity(r.v2(0,0))),super.update(t)}randomInt(t){return Math.round(Math.random()*t)}}e.default=l},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(0);e.default=class{constructor(){this._subject=new Array,this.previous=new Date}add(t,e){let i=this._subject.findIndex(t=>t.index>e);if(-1==i)this._subject.push({subject:t,index:e});else{let s=this._subject.splice(i,this._subject.length-i);this._subject.push({subject:t,index:e}),this._subject.push(...s)}}removeByName(t){const e=this._subject.findIndex(e=>e.subject.getName()==t);e>-1&&this._subject.splice(e,1)}removeAll(){this._subject.splice(0,this._subject.length)}processInput(){}start(){this.update(0)}update(t){let e=new Date,i=(e.getTime()-this.previous.getTime())/1e3;this.previous=e,this.processInput(),this._subject.forEach(t=>{t.subject.update(i),t.subject.runAction(i)}),this.clear(),this.render(),this.loopEvent=window.requestAnimationFrame(()=>this.update(t))}stop(){window.cancelAnimationFrame(this.loopEvent)}render(){this._subject.forEach(t=>t.subject.render())}clear(){let t=s.default.getInstance().getCanvas();s.default.getInstance().getCtx().clearRect(0,0,t.width,t.height)}checkClick(t){for(let e=this._subject.length-1;e>=0;e--)if(this._subject[e].subject.checkClick(t))return this._subject[e].subject;return null}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(2),n=i(0);class r extends s.default{constructor(t){super(),this.size=t}setSize(t){this.size=t}getSize(){return this.size}render(){let t=n.default.getInstance().getCtx();t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)}checkClick(t){let e=t.x-this.position.x,i=t.y-this.position.y;return e>=0&&i>=0&&e<=this.size.width&&i<=this.size.height}}e.default=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(2),n=i(0);class r extends s.default{constructor(t){super(),this.text=t,this.font="40px Gotham, Helvetica Neue, sans-serif",this.align="left"}setFont(t){this.font=t}setAlign(t){this.align=t}setText(t){this.text=t}update(t){}render(){let t=n.default.getInstance().getCtx();t.font=this.font,t.fillStyle=this.color,t.textAlign=this.align,t.fillText(this.text,this.position.x,this.position.y)}}e.default=r}]);
//# sourceMappingURL=bundle.js.map