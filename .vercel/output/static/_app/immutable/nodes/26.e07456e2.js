import{S as H,i as K,s as Q,k as w,q as U,a as T,l as E,m as N,r as q,h as f,c as I,n as m,b as y,E as b,O as R,Q as g,V as Y,F as M,R as z,o as G}from"../chunks/index.ba8c4f3a.js";import"../chunks/paths.52e6513e.js";import{l as J,P as W}from"../chunks/public.56157045.js";function D(s){let t,l;return{c(){t=w("p"),l=U("Payment failed. Please try again."),this.h()},l(r){t=E(r,"P",{class:!0});var o=N(t);l=q(o,"Payment failed. Please try again."),o.forEach(f),this.h()},h(){m(t,"class","error svelte-4i9m9b")},m(r,o){y(r,t,o),b(t,l)},d(r){r&&f(t)}}}function X(s){let t;return{c(){t=U("Pay with Sofort")},l(l){t=q(l,"Pay with Sofort")},m(l,r){y(l,t,r)},d(l){l&&f(t)}}}function Z(s){let t;return{c(){t=U("Processing...")},l(l){t=q(l,"Processing...")},m(l,r){y(l,t,r)},d(l){l&&f(t)}}}function $(s){let t,l,r,o,p,P,_,v,c,i,S,a,V,d,j,A,u=s[0]&&D();function B(e,n){return e[1]?Z:X}let O=B(s),h=O(s);return{c(){t=w("h1"),l=U("Sofort Example"),r=T(),o=w("nav"),p=w("a"),P=U("View code"),_=T(),u&&u.c(),v=T(),c=w("form"),i=w("input"),S=T(),a=w("input"),V=T(),d=w("button"),h.c(),this.h()},l(e){t=E(e,"H1",{});var n=N(t);l=q(n,"Sofort Example"),n.forEach(f),r=I(e),o=E(e,"NAV",{});var C=N(o);p=E(C,"A",{href:!0});var F=N(p);P=q(F,"View code"),F.forEach(f),C.forEach(f),_=I(e),u&&u.l(e),v=I(e),c=E(e,"FORM",{class:!0});var k=N(c);i=E(k,"INPUT",{name:!0,placeholder:!0,type:!0,class:!0}),S=I(k),a=E(k,"INPUT",{name:!0,placeholder:!0,type:!0,class:!0}),V=I(k),d=E(k,"BUTTON",{class:!0});var L=N(d);h.l(L),L.forEach(f),k.forEach(f),this.h()},h(){m(p,"href","https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/sofort"),m(i,"name","name"),m(i,"placeholder","Name"),m(i,"type","text"),i.required=!0,i.disabled=s[1],m(i,"class","svelte-4i9m9b"),m(a,"name","email"),m(a,"placeholder","E-mail"),m(a,"type","email"),a.required=!0,a.disabled=s[1],m(a,"class","svelte-4i9m9b"),d.disabled=s[1],m(d,"class","svelte-4i9m9b"),m(c,"class","svelte-4i9m9b")},m(e,n){y(e,t,n),b(t,l),y(e,r,n),y(e,o,n),b(o,p),b(p,P),y(e,_,n),u&&u.m(e,n),y(e,v,n),y(e,c,n),b(c,i),R(i,s[3]),b(c,S),b(c,a),R(a,s[2]),b(c,V),b(c,d),h.m(d,null),j||(A=[g(i,"input",s[5]),g(a,"input",s[6]),g(c,"submit",Y(s[4]))],j=!0)},p(e,[n]){e[0]?u||(u=D(),u.c(),u.m(v.parentNode,v)):u&&(u.d(1),u=null),n&2&&(i.disabled=e[1]),n&8&&i.value!==e[3]&&R(i,e[3]),n&2&&(a.disabled=e[1]),n&4&&a.value!==e[2]&&R(a,e[2]),O!==(O=B(e))&&(h.d(1),h=O(e),h&&(h.c(),h.m(d,null))),n&2&&(d.disabled=e[1])},i:M,o:M,d(e){e&&f(t),e&&f(r),e&&f(o),e&&f(_),u&&u.d(e),e&&f(v),e&&f(c),h.d(),j=!1,z(A)}}}async function x(){const s=await fetch("/examples/sofort/payment-intent",{method:"POST",headers:{"content-type":"application/json"}}),{clientSecret:t}=await s.json();return t}function ee(s,t,l){let r=null,o=null,p=!1,P,_;G(async()=>{r=await J(W);const S=new URLSearchParams(window.location.search);l(0,o=S.get("error"))});async function v(){if(p)return;l(1,p=!0);const S=await x(),a=await r.confirmSofortPayment(S,{payment_method:{sofort:{country:"DE"},billing_details:{name:_,email:P}},return_url:`${window.location.origin}/examples/sofort/return`});console.log({result:a}),a.error&&(l(0,o=a.error),l(1,p=!1))}function c(){_=this.value,l(3,_)}function i(){P=this.value,l(2,P)}return[o,p,P,_,v,c,i]}class ae extends H{constructor(t){super(),K(this,t,ee,$,Q,{})}}export{ae as component};