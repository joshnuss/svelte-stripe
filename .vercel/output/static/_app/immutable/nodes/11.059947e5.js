import{S as I,i as R,s as q,k,l as w,m as E,h as p,b,F as T,X as z,Y as F,o as N,w as V,U as J,q as S,a as O,y as j,r as v,c as H,z as A,n as U,E as P,A as B,W as K,g as D,d as L,B as Y,u as W}from"../chunks/index.ba8c4f3a.js";import{g as X}from"../chunks/navigation.640da136.js";import{l as G,P as Q}from"../chunks/public.56157045.js";import{m as Z}from"../chunks/util.bb100f75.js";import{E as $}from"../chunks/Elements.5d1cb5c6.js";function ee(a){let e;return{c(){e=k("div")},l(n){e=w(n,"DIV",{}),E(e).forEach(p)},m(n,o){b(n,e,o),a[12](e)},p:T,i:T,o:T,d(n){n&&p(e),a[12](null)}}}function te(a,e,n){let{buttonHeight:o=void 0}=e,{buttonTheme:l=void 0}=e,{buttonType:r=void 0}=e,{layout:c=void 0}=e,{paymentMethodOrder:d=void 0}=e,{wallets:h=void 0}=e,{element:s=null}=e,_;const m=z(),{elements:u}=F("stripe");N(()=>(n(1,s=Z(_,"expressCheckout",u,m,{buttonHeight:o,buttonTheme:l,buttonType:r,layout:c,paymentMethodOrder:d,wallets:h})),s.on("click",y=>m("click",y)),s.on("cancel",y=>m("cancel",y)),s.on("confirm",y=>m("confirm",y)),s.on("shippingaddresschange",y=>m("shippingaddresschange",y)),s.on("shippingratechange",y=>m("shippingratechange",y)),()=>s.destroy()));function C(){s.blur()}function x(){s.clear()}function t(){s.destroy()}function f(){s.focus()}function g(i){V[i?"unshift":"push"](()=>{_=i,n(0,_)})}return a.$$set=i=>{"buttonHeight"in i&&n(2,o=i.buttonHeight),"buttonTheme"in i&&n(3,l=i.buttonTheme),"buttonType"in i&&n(4,r=i.buttonType),"layout"in i&&n(5,c=i.layout),"paymentMethodOrder"in i&&n(6,d=i.paymentMethodOrder),"wallets"in i&&n(7,h=i.wallets),"element"in i&&n(1,s=i.element)},[_,s,o,l,r,c,d,h,C,x,t,f,g]}class ne extends I{constructor(e){super(),R(this,e,te,ee,q,{buttonHeight:2,buttonTheme:3,buttonType:4,layout:5,paymentMethodOrder:6,wallets:7,element:1,blur:8,clear:9,destroy:10,focus:11})}get blur(){return this.$$.ctx[8]}get clear(){return this.$$.ctx[9]}get destroy(){return this.$$.ctx[10]}get focus(){return this.$$.ctx[11]}}function M(a){let e,n=a[1].message+"",o,l;return{c(){e=k("p"),o=S(n),l=S(" Please try again."),this.h()},l(r){e=w(r,"P",{class:!0});var c=E(e);o=v(c,n),l=v(c," Please try again."),c.forEach(p),this.h()},h(){U(e,"class","error svelte-6ufdvm")},m(r,c){b(r,e,c),P(e,o),P(e,l)},p(r,c){c&2&&n!==(n=r[1].message+"")&&W(o,n)},d(r){r&&p(e)}}}function se(a){let e,n;return e=new ne({props:{buttonHeight:50,buttonTheme:{googlePay:"white"},buttonType:{googlePay:"donate"},paymentMethodOrder:["googlePay","link"]}}),e.$on("confirm",a[3]),e.$on("click",ae),{c(){j(e.$$.fragment)},l(o){A(e.$$.fragment,o)},m(o,l){B(e,o,l),n=!0},p:T,i(o){n||(D(e.$$.fragment,o),n=!0)},o(o){L(e.$$.fragment,o),n=!1},d(o){Y(e,o)}}}function oe(a){let e,n,o,l,r,c,d,h,s,_,m,u=a[1]&&M(a);function C(t){a[4](t)}let x={stripe:a[0],mode:"payment",currency:"usd",amount:1099,$$slots:{default:[se]},$$scope:{ctx:a}};return a[2]!==void 0&&(x.elements=a[2]),s=new $({props:x}),V.push(()=>J(s,"elements",C)),{c(){e=k("h1"),n=S("Express Checkout Example"),o=O(),l=k("nav"),r=k("a"),c=S("View code"),d=O(),u&&u.c(),h=O(),j(s.$$.fragment),this.h()},l(t){e=w(t,"H1",{});var f=E(e);n=v(f,"Express Checkout Example"),f.forEach(p),o=H(t),l=w(t,"NAV",{});var g=E(l);r=w(g,"A",{href:!0});var i=E(r);c=v(i,"View code"),i.forEach(p),g.forEach(p),d=H(t),u&&u.l(t),h=H(t),A(s.$$.fragment,t),this.h()},h(){U(r,"href","https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/express-checkout")},m(t,f){b(t,e,f),P(e,n),b(t,o,f),b(t,l,f),P(l,r),P(r,c),b(t,d,f),u&&u.m(t,f),b(t,h,f),B(s,t,f),m=!0},p(t,[f]){t[1]?u?u.p(t,f):(u=M(t),u.c(),u.m(h.parentNode,h)):u&&(u.d(1),u=null);const g={};f&1&&(g.stripe=t[0]),f&64&&(g.$$scope={dirty:f,ctx:t}),!_&&f&4&&(_=!0,g.elements=t[2],K(()=>_=!1)),s.$set(g)},i(t){m||(D(s.$$.fragment,t),m=!0)},o(t){L(s.$$.fragment,t),m=!1},d(t){t&&p(e),t&&p(o),t&&p(l),t&&p(d),u&&u.d(t),t&&p(h),Y(s,t)}}}async function re(){const a=await fetch("/examples/express-checkout/payment-intent",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({})}),{clientSecret:e}=await a.json();return e}async function ae(a){const e={emailRequired:!0,phoneNumberRequired:!0,lineItems:[{name:"Rad T-Shirt",amount:1099}]};a.detail.resolve(e)}function ie(a,e,n){let o=null,l=null,r,c=!1;N(async()=>{n(0,o=await G(Q))});async function d(){if(c)return;c=!0;let s=await r.submit();if(s.error){n(1,l=s.error),c=!1;return}const _=await re(),m=new URL("/examples/express-checkout/thanks",window.location.origin).toString();s=await o.confirmPayment({elements:r,clientSecret:_,confirmParams:{return_url:m}}),console.log({result:s}),s.error?(n(1,l=s.error),c=!1):X("/examples/express-checkout/thanks")}function h(s){r=s,n(2,r)}return[o,l,r,d,h]}class he extends I{constructor(e){super(),R(this,e,ie,oe,q,{})}}export{he as component};