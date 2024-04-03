import{S as D,i as R,s as q,k as S,l as v,m as k,h,b as P,F as V,X as Q,Y as W,o as F,w as M,q as A,a as I,y as Y,r as T,c as N,z,n as g,E,A as H,g as J,d as K,B as L,u as X,U as G,O as U,Q as j,V as Z,W as x,R as $}from"../chunks/index.ba8c4f3a.js";import{g as ee}from"../chunks/navigation.640da136.js";import{l as te,P as ne}from"../chunks/public.56157045.js";import{m as se}from"../chunks/util.bb100f75.js";import{E as le}from"../chunks/Elements.5d1cb5c6.js";function ae(l){let e;return{c(){e=S("div")},l(t){e=v(t,"DIV",{}),k(e).forEach(h)},m(t,r){P(t,e,r),l[13](e)},p:V,i:V,o:V,d(t){t&&h(e),l[13](null)}}}function ie(l,e,t){let{classes:r={}}=e,{style:a={}}=e,{supportedCountries:o=[]}=e,{placeholderCountry:i=""}=e,{hideIcon:p=!1}=e,{iconStyle:d="default"}=e,{disabled:f=!1}=e,{element:m=null}=e,u;const n=Q(),{elements:_}=W("stripe");F(()=>(t(1,m=se(u,"iban",_,n,{classes:r,style:a,supportedCountries:o,placeholderCountry:i,disabled:f,hideIcon:p,iconStyle:d})),()=>m.destroy()));function b(){m.blur()}function C(){m.clear()}function w(){m.destroy()}function y(){m.focus()}function c(s){M[s?"unshift":"push"](()=>{u=s,t(0,u)})}return l.$$set=s=>{"classes"in s&&t(2,r=s.classes),"style"in s&&t(3,a=s.style),"supportedCountries"in s&&t(4,o=s.supportedCountries),"placeholderCountry"in s&&t(5,i=s.placeholderCountry),"hideIcon"in s&&t(6,p=s.hideIcon),"iconStyle"in s&&t(7,d=s.iconStyle),"disabled"in s&&t(8,f=s.disabled),"element"in s&&t(1,m=s.element)},[u,m,r,a,o,i,p,d,f,b,C,w,y,c]}class re extends D{constructor(e){super(),R(this,e,ie,ae,q,{classes:2,style:3,supportedCountries:4,placeholderCountry:5,hideIcon:6,iconStyle:7,disabled:8,element:1,blur:9,clear:10,destroy:11,focus:12})}get blur(){return this.$$.ctx[9]}get clear(){return this.$$.ctx[10]}get destroy(){return this.$$.ctx[11]}get focus(){return this.$$.ctx[12]}}function B(l){let e,t=l[1].message+"",r,a;return{c(){e=S("p"),r=A(t),a=A(" Please try again."),this.h()},l(o){e=v(o,"P",{class:!0});var i=k(e);r=T(i,t),a=T(i," Please try again."),i.forEach(h),this.h()},h(){g(e,"class","error svelte-4i9m9b")},m(o,i){P(o,e,i),E(e,r),E(e,a)},p(o,i){i&2&&t!==(t=o[1].message+"")&&X(r,t)},d(o){o&&h(e)}}}function oe(l){let e;return{c(){e=A("Pay")},l(t){e=T(t,"Pay")},m(t,r){P(t,e,r)},d(t){t&&h(e)}}}function ue(l){let e;return{c(){e=A("Processing...")},l(t){e=T(t,"Processing...")},m(t,r){P(t,e,r)},d(t){t&&h(e)}}}function ce(l){let e,t,r,a,o,i,p,d,f,m,u,n;function _(c){l[9](c)}let b={supportedCountries:["SEPA"],classes:{base:"input"}};l[2]!==void 0&&(b.element=l[2]),i=new re({props:b}),M.push(()=>G(i,"element",_));function C(c,s){return c[3]?ue:oe}let w=C(l),y=w(l);return{c(){e=S("form"),t=S("input"),r=I(),a=S("input"),o=I(),Y(i.$$.fragment),d=I(),f=S("button"),y.c(),this.h()},l(c){e=v(c,"FORM",{class:!0});var s=k(e);t=v(s,"INPUT",{name:!0,placeholder:!0,class:!0}),r=N(s),a=v(s,"INPUT",{name:!0,placeholder:!0,type:!0,class:!0}),o=N(s),z(i.$$.fragment,s),d=N(s),f=v(s,"BUTTON",{class:!0});var O=k(f);y.l(O),O.forEach(h),s.forEach(h),this.h()},h(){g(t,"name","name"),g(t,"placeholder","Name"),t.disabled=l[3],g(t,"class","svelte-4i9m9b"),g(a,"name","email"),g(a,"placeholder","E-mail"),g(a,"type","email"),a.disabled=l[3],g(a,"class","svelte-4i9m9b"),f.disabled=l[3],g(f,"class","svelte-4i9m9b"),g(e,"class","svelte-4i9m9b")},m(c,s){P(c,e,s),E(e,t),U(t,l[4]),E(e,r),E(e,a),U(a,l[5]),E(e,o),H(i,e,null),E(e,d),E(e,f),y.m(f,null),m=!0,u||(n=[j(t,"input",l[7]),j(a,"input",l[8]),j(e,"submit",Z(l[6]))],u=!0)},p(c,s){(!m||s&8)&&(t.disabled=c[3]),s&16&&t.value!==c[4]&&U(t,c[4]),(!m||s&8)&&(a.disabled=c[3]),s&32&&a.value!==c[5]&&U(a,c[5]);const O={};!p&&s&4&&(p=!0,O.element=c[2],x(()=>p=!1)),i.$set(O),w!==(w=C(c))&&(y.d(1),y=w(c),y&&(y.c(),y.m(f,null))),(!m||s&8)&&(f.disabled=c[3])},i(c){m||(J(i.$$.fragment,c),m=!0)},o(c){K(i.$$.fragment,c),m=!1},d(c){c&&h(e),L(i),y.d(),u=!1,$(n)}}}function fe(l){let e,t,r,a,o,i,p,d,f,m,u=l[1]&&B(l);return f=new le({props:{stripe:l[0],$$slots:{default:[ce]},$$scope:{ctx:l}}}),{c(){e=S("h1"),t=A("SEPA Example"),r=I(),a=S("nav"),o=S("a"),i=A("View code"),p=I(),u&&u.c(),d=I(),Y(f.$$.fragment),this.h()},l(n){e=v(n,"H1",{});var _=k(e);t=T(_,"SEPA Example"),_.forEach(h),r=N(n),a=v(n,"NAV",{});var b=k(a);o=v(b,"A",{href:!0});var C=k(o);i=T(C,"View code"),C.forEach(h),b.forEach(h),p=N(n),u&&u.l(n),d=N(n),z(f.$$.fragment,n),this.h()},h(){g(o,"href","https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/sepa")},m(n,_){P(n,e,_),E(e,t),P(n,r,_),P(n,a,_),E(a,o),E(o,i),P(n,p,_),u&&u.m(n,_),P(n,d,_),H(f,n,_),m=!0},p(n,[_]){n[1]?u?u.p(n,_):(u=B(n),u.c(),u.m(d.parentNode,d)):u&&(u.d(1),u=null);const b={};_&1&&(b.stripe=n[0]),_&1084&&(b.$$scope={dirty:_,ctx:n}),f.$set(b)},i(n){m||(J(f.$$.fragment,n),m=!0)},o(n){K(f.$$.fragment,n),m=!1},d(n){n&&h(e),n&&h(r),n&&h(a),n&&h(p),u&&u.d(n),n&&h(d),L(f,n)}}}async function me(){const l=await fetch("/examples/sepa/payment-intent",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({amount:2e3})}),{clientSecret:e}=await l.json();return e}function _e(l,e,t){let r=null,a=null,o,i=!1,p,d;F(async()=>{t(0,r=await te(ne))});async function f(){if(i)return;t(3,i=!0);const _=await me(),b=await r.confirmSepaDebitPayment(_,{payment_method:{sepa_debit:o,billing_details:{name:p,email:d}}});console.log({result:b}),b.error?(t(1,a=b.error),t(3,i=!1)):ee("/examples/sepa/thanks")}function m(){p=this.value,t(4,p)}function u(){d=this.value,t(5,d)}function n(_){o=_,t(2,o)}return[r,a,o,i,p,d,f,m,u,n]}class ge extends D{constructor(e){super(),R(this,e,_e,fe,q,{})}}export{ge as component};