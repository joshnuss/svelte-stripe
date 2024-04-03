import { c as create_ssr_component } from "../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-ayl114_START -->${$$result.title = `<title>svelte-stripe</title>`, ""}<meta name="keywords" content="svelte,stripe,credit,debit,card,payment,applepay,googlepay,sepa,ideal"><meta name="description" content="Everything you need to access Stripe payments with Svelte"><!-- HEAD_svelte-ayl114_END -->`, ""}


<h1 id="svelte-stripe"><a aria-hidden="true" tabindex="-1" href="#svelte-stripe"><span class="icon icon-link"></span></a>svelte-stripe</h1>
<p>Everything you need to add <a href="https://stripe.com/en-gb-us/payments/elements" rel="nofollow">Stripe Elements</a> to your <a href="https://svelte.dev" rel="nofollow">Svelte</a> &amp; <a href="https://kit.svelte.dev" rel="nofollow">SvelteKit</a> projects.</p>
<p>Links:
<a href="https://npmjs.org/package/svelte-stripe" rel="nofollow">npm</a>
<a href="https://github.com/joshnuss/svelte-stripe" rel="nofollow">github</a>
<a href="https://github.com/joshnuss/svelte-stripe/blob/main/CHANGELOG.md" rel="nofollow">changelog</a>
<a href="https://github.com/joshnuss/svelte-stripe/blob/main/LICENSE" rel="nofollow">license</a></p>
<h2 id="installation"><a aria-hidden="true" tabindex="-1" href="#installation"><span class="icon icon-link"></span></a>Installation</h2>
<p>To configure your project, add these 2 packages:</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> stripe svelte-stripe</code>`}<!-- HTML_TAG_END --></pre>
<ul><li><a href="https://npmjs.org/package/stripe" rel="nofollow">stripe</a> is the official server-side version of Stripe.</li>
<li><a href="https://npmjs.org/package/svelte-stripe" rel="nofollow">svelte-stripe</a> is the community-supported wrapper for Stripe Elements.</li></ul>
<h2 id="docs"><a aria-hidden="true" tabindex="-1" href="#docs"><span class="icon icon-link"></span></a>Docs</h2>
<h3 id="set-up-stripe"><a aria-hidden="true" tabindex="-1" href="#set-up-stripe"><span class="icon icon-link"></span></a>Set up Stripe</h3>
<p>Add your private and public keys to your environment:</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash"><span class="token assign-left variable">PUBLIC_STRIPE_KEY</span><span class="token operator">=</span>pk_test_<span class="token punctuation">..</span>.
<span class="token assign-left variable">SECRET_STRIPE_KEY</span><span class="token operator">=</span>sk_test_<span class="token punctuation">..</span>.</code>`}<!-- HTML_TAG_END --></pre>
<p>In your payment page, initialize Stripe and add a <code>&lt;Elements&gt;</code> component:</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> loadStripe <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@stripe/stripe-js'</span>
  <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Elements <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'svelte-stripe'</span>
  <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> onMount <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'svelte'</span>
  <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> <span class="token constant">PUBLIC_STRIPE_KEY</span> <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'$env/static/public'</span>

  <span class="token keyword">let</span> stripe <span class="token operator">=</span> <span class="token keyword">null</span>

  <span class="token function">onMount</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    stripe <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">loadStripe</span><span class="token punctuation">(</span><span class="token constant">PUBLIC_STRIPE_KEY</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- this is where your Stripe components go --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="creating-a-payment-intent"><a aria-hidden="true" tabindex="-1" href="#creating-a-payment-intent"><span class="icon icon-link"></span></a>Creating a payment intent</h3>
<p>Before making a charge, Stripe should be notified by creating a <a href="https://stripe.com/docs/api/payment_intents" rel="nofollow">payment intent</a>. It’s a way to tell Stripe what amount to capture and to attach any relavent metadata, for example, the products they are buying. This must happen server-side to avoid anyone tampering with the amount.</p>
<p>Let’s add an endpoint <code>src/routes/create-payment-intent/+server.js</code> to create the “payment intent”:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">import</span> Stripe <span class="token keyword">from</span> <span class="token string">'stripe'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> <span class="token constant">SECRET_STRIPE_KEY</span> <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'$env/static/private'</span>

<span class="token comment">// initialize Stripe</span>
<span class="token keyword">const</span> stripe <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stripe</span><span class="token punctuation">(</span><span class="token constant">SECRET_STRIPE_KEY</span><span class="token punctuation">)</span>

<span class="token comment">// handle POST /create-payment-intent</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token constant">POST</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// create the payment intent</span>
  <span class="token keyword">const</span> paymentIntent <span class="token operator">=</span> <span class="token keyword">await</span> stripe<span class="token punctuation">.</span>paymentIntents<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">2000</span><span class="token punctuation">,</span>
    <span class="token comment">// note, for some EU-only payment methods it must be EUR</span>
    <span class="token literal-property property">currency</span><span class="token operator">:</span> <span class="token string">'usd'</span><span class="token punctuation">,</span>
    <span class="token comment">// specify what payment methods are allowed</span>
    <span class="token comment">// can be card, sepa_debit, ideal, etc...</span>
    <span class="token literal-property property">payment_method_types</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'card'</span><span class="token punctuation">]</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

  <span class="token comment">// return the clientSecret to the client</span>
  <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
      <span class="token literal-property property">clientSecret</span><span class="token operator">:</span> paymentIntent<span class="token punctuation">.</span>client_secret
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="accepting-payments"><a aria-hidden="true" tabindex="-1" href="#accepting-payments"><span class="icon icon-link"></span></a>Accepting payments</h3>
<p>There are several types of payment you can accept:</p>
<h4 id="payment-element"><a aria-hidden="true" tabindex="-1" href="#payment-element"><span class="icon icon-link"></span></a>Payment Element</h4>
<p>An all-in-one component that supports credit cards, SEPA, GooglePay and ApplePay.</p>
<p>To use it, drop a <code>&lt;PaymentElement&gt;</code> component in your form:</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">on:</span>submit|preventDefault</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;submit&#125;<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span> <span class="token attr-name">&#123;clientSecret&#125;</span> <span class="token attr-name"><span class="token namespace">bind:</span>elements</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PaymentElement</span> <span class="token attr-name">options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;...&#125;</span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Pay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Then when creating the payment intent, enable the <code>automatic_payment_methods:</code> option:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">const</span> paymentIntent <span class="token operator">=</span> <span class="token keyword">await</span> stripe<span class="token punctuation">.</span>paymentIntents<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">2000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">currency</span><span class="token operator">:</span> <span class="token string">'eur'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">automatic_payment_methods</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Once the form is submitted, call <a href="https://stripe.com/docs/js/payment_intents/confirm_payment" rel="nofollow"><code>stripe.confirmPayment()</code></a></p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> stripe<span class="token punctuation">.</span><span class="token function">confirmPayment</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  elements<span class="token punctuation">,</span>
  <span class="token comment">// specify redirect: 'if_required' or a &#96;return_url&#96;</span>
  <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">'if_required'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element" rel="nofollow">code</a>
<a href="/examples/payment-element">demo</a></p>
<h4 id="link-authentication"><a aria-hidden="true" tabindex="-1" href="#link-authentication"><span class="icon icon-link"></span></a>Link Authentication</h4>
<p>With <a href="https://link.co" rel="nofollow">Link</a>, customer’s don’t have to re-enter payment and address details for each purchase. Their details are retreived based on their e-mail address.</p>
<p>Once they enter their e-mail they receive an SMS code to verify their identity.</p>
<p>It works in conjuction with <code>&lt;PaymentElement&gt;</code>:</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">on:</span>submit|preventDefault</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;submit&#125;<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span> <span class="token attr-name">&#123;clientSecret&#125;</span> <span class="token attr-name"><span class="token namespace">bind:</span>elements</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LinkAuthenticationElement</span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PaymentElement</span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Pay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element" rel="nofollow">code</a>
<a href="/examples/payment-element">demo</a></p>
<h4 id="credit-cards"><a aria-hidden="true" tabindex="-1" href="#credit-cards"><span class="icon icon-link"></span></a>Credit Cards</h4>
<p>These use the <code>&lt;CardNumber&gt;</code>, <code>&lt;CardExpiry&gt;</code> and <code>&lt;CardCvc&gt;</code> components:</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">on:</span>submit|preventDefault</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;submit&#125;<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CardNumber</span> <span class="token attr-name"><span class="token namespace">bind:</span>element</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;cardElement&#125;<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CardExpiry</span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CardCvc</span> <span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Pay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>When the form submits, pass the <code>cardElement</code> to <a href="https://stripe.com/docs/js/payment_intents/confirm_card_payment" rel="nofollow"><code>stripe.confirmCardPayment()</code></a>, ie:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> stripe
  <span class="token punctuation">.</span><span class="token function">confirmCardPayment</span><span class="token punctuation">(</span>clientSecret<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">payment_method</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
      <span class="token literal-property property">card</span><span class="token operator">:</span> cardElement<span class="token punctuation">,</span>
      <span class="token literal-property property">billing_details</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
        <span class="token operator">...</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/credit-card" rel="nofollow">code</a>
<a href="/examples/credit-card">demo</a></p>
<h4 id="googlepay--applepay"><a aria-hidden="true" tabindex="-1" href="#googlepay--applepay"><span class="icon icon-link"></span></a>GooglePay &amp; ApplePay</h4>
<p>To display a GooglePay or ApplePay button, use the <code>&lt;PaymentRequestButton/&gt;</code>.</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PaymentRequestButton</span> <span class="token attr-name">&#123;paymentRequest&#125;</span> <span class="token attr-name"><span class="token namespace">on:</span>paymentmethod</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;pay&#125;<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>It requires that you pass metadata using the <code>paymentRequest</code> prop:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token comment">// declare payment metadata (amounts must match payment intent)</span>
<span class="token keyword">const</span> paymentRequest <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">country</span><span class="token operator">:</span> <span class="token string">'US'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">currency</span><span class="token operator">:</span> <span class="token string">'usd'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">total</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Demo total'</span><span class="token punctuation">,</span> <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">1099</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">requestPayerName</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">requestPayerEmail</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>And define an event handler for the <code>on:paymentmethod</code> event:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> paymentMethod <span class="token operator">=</span> e<span class="token punctuation">.</span>detail<span class="token punctuation">.</span>paymentMethod

  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">await</span> stripe<span class="token punctuation">.</span><span class="token function">confirmCardPayment</span><span class="token punctuation">(</span>clientSecret<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">payment_method</span><span class="token operator">:</span> paymentMethod<span class="token punctuation">.</span>id
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span>error<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// mark failed</span>
    e<span class="token punctuation">.</span>detail<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token string">'fail'</span><span class="token punctuation">)</span>

    <span class="token comment">// payment failed, notify user</span>
    error <span class="token operator">=</span> result<span class="token punctuation">.</span>error
  <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// mark succeeded</span>
    e<span class="token punctuation">.</span>detail<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span>

    <span class="token comment">// payment succeeded, redirect to "thank you" page</span>
    <span class="token function">goto</span><span class="token punctuation">(</span><span class="token string">'/thanks'</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-request" rel="nofollow">code</a>
<a href="/examples/payment-request">demo</a></p>
<h4 id="sepa"><a aria-hidden="true" tabindex="-1" href="#sepa"><span class="icon icon-link"></span></a>SEPA</h4>
<p>To process SEPA debits, use the <code>&lt;Iban&gt;</code> component:</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">on:</span>submit|preventDefault</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;submit&#125;<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">bind:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;name&#125;<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Name<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!-- customize the list of countries, or use "SEPA" to allow all supported countries --></span>
    &lt;Iban supportedCountries=&#123;['SEPA']&#125; bind:element=&#123;ibanElement&#125;/>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Pay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>To process the payment use <a href="https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment" rel="nofollow"><code>stripe.confirmSepaDebitPayment()</code></a>:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> stripe<span class="token punctuation">.</span><span class="token function">confirmSepaDebitPayment</span><span class="token punctuation">(</span>clientSecret<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">payment_method</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">sepa_debit</span><span class="token operator">:</span> ibanElement<span class="token punctuation">,</span>
    <span class="token literal-property property">billing_details</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
      name<span class="token punctuation">,</span>
      email
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/sepa" rel="nofollow">code</a>
<a href="/examples/sepa">demo</a></p>
<h4 id="ideal"><a aria-hidden="true" tabindex="-1" href="#ideal"><span class="icon icon-link"></span></a>iDEAL</h4>
<p>To accept iDEAL payments, use the <code>&lt;Ideal&gt;</code> component:</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span> <span class="token attr-name">&#123;stripe&#125;</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name"><span class="token namespace">on:</span>submit|preventDefault</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;submit&#125;<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">bind:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;name&#125;<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Name<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">bind:</span>value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;email&#125;<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>E-mail<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Ideal</span> <span class="token attr-name"><span class="token namespace">bind:</span>element</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>&#123;idealElement&#125;<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Pay<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Elements</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>To complete the payment call <a href="https://stripe.com/docs/js/payment_intents/confirm_ideal_payment" rel="nofollow"><code>stripe.confirmIdealPayment()</code></a>, and make sure the pass a <code>return_url</code>:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> stripe<span class="token punctuation">.</span><span class="token function">confirmIdealPayment</span><span class="token punctuation">(</span>clientSecret<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">payment_method</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">ideal</span><span class="token operator">:</span> idealElement<span class="token punctuation">,</span>
    <span class="token literal-property property">billing_details</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
      name<span class="token punctuation">,</span>
      email
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">return_url</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>origin<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">/return</span><span class="token template-punctuation string">&#96;</span></span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/ideal" rel="nofollow">code</a>
<a href="/examples/ideal">demo</a></p>
<h3 id="webhooks"><a aria-hidden="true" tabindex="-1" href="#webhooks"><span class="icon icon-link"></span></a>Webhooks</h3>
<p>After the payment succeeds or fails, Stripe will send out a webhook, which can be used to provision or fulfill the purchase.</p>
<p>The webhook payload contains a signature that should be verified to ensure the data originated from Stripe.</p>
<p>Here’s an example of handling a <code>charge.succeeded</code> webhook with SvelteKit:</p>
<pre class="language-javascript"><!-- HTML_TAG_START -->${`<code class="language-javascript"><span class="token comment">// in src/routes/stripe/webhooks/+server.js</span>
<span class="token keyword">import</span> Stripe <span class="token keyword">from</span> <span class="token string">'stripe'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> error<span class="token punctuation">,</span> json <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@sveltejs/kit'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> env <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'$env/dynamic/private'</span>

<span class="token comment">// init api client</span>
<span class="token keyword">const</span> stripe <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stripe</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span><span class="token constant">SECRET_STRIPE_KEY</span><span class="token punctuation">)</span>

<span class="token comment">// endpoint to handle incoming webhooks</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token constant">POST</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">&#123;</span> request <span class="token punctuation">&#125;</span></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// extract body</span>
  <span class="token keyword">const</span> body <span class="token operator">=</span> <span class="token keyword">await</span> request<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// get the signature from the header</span>
  <span class="token keyword">const</span> signature <span class="token operator">=</span> request<span class="token punctuation">.</span>headers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'stripe-signature'</span><span class="token punctuation">)</span>

  <span class="token comment">// var to hold event data</span>
  <span class="token keyword">let</span> event

  <span class="token comment">// verify it</span>
  <span class="token keyword">try</span> <span class="token punctuation">&#123;</span>
    event <span class="token operator">=</span> stripe<span class="token punctuation">.</span>webhooks<span class="token punctuation">.</span><span class="token function">constructEvent</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> signature<span class="token punctuation">,</span> env<span class="token punctuation">.</span><span class="token constant">STRIPE_WEBHOOK_SECRET</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// signature is invalid!</span>
    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'⚠️  Webhook signature verification failed.'</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span>

    <span class="token comment">// return, because it's a bad request</span>
    <span class="token keyword">throw</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">'Invalid request'</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">// signature has been verified, so we can process events</span>
  <span class="token comment">// full list of events: https://stripe.com/docs/api/events/list</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>type <span class="token operator">==</span> <span class="token string">'charge.succeeded'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// get data object</span>
    <span class="token keyword">const</span> charge <span class="token operator">=</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>object

    <span class="token comment">// TODO: fulfill the order here</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">✅ Charge succeeded </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>charge<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">// return a 200 with an empty JSON response</span>
  <span class="token keyword">return</span> <span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/credit-card/webhooks.js" rel="nofollow">code</a></p>
<p>In development mode, webhooks can be routed to your dev machine using <a href="https://stripe.com/docs/stripe-cli" rel="nofollow">Stripe’s CLI</a>. Example:</p>
<pre class="language-bash"><!-- HTML_TAG_START -->${`<code class="language-bash">stripe listen --forward-to localhost:5173/stripe/webhooks</code>`}<!-- HTML_TAG_END --></pre>
<p>For more information on webhooks, see <a href="https://stripe.com/docs/webhooks" rel="nofollow">Stripe’s Webhook Docs</a>.</p>
<h2 id="styling"><a aria-hidden="true" tabindex="-1" href="#styling"><span class="icon icon-link"></span></a>Styling</h2>
<p>Components can be styled by setting attributes on the <code>&lt;Elements/&gt;</code> container.</p>
<pre class="language-html"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Elements</span>
  <span class="token attr-name">theme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flat<span class="token punctuation">"</span></span>
  <span class="token attr-name">labels</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>floating<span class="token punctuation">"</span></span>
  <span class="token attr-name">variables</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;&#123;</span> <span class="token attr-name"><span class="token namespace">colorPrimary:</span></span> <span class="token attr-name">'pink'</span> <span class="token attr-name">&#125;&#125;</span>
  <span class="token attr-name">rules</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;...&#125;</span>
  <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>See <a href="https://stripe.com/docs/elements/appearance-api" rel="nofollow">appearance docs</a> for more examples.</p>
<h2 id="examples"><a aria-hidden="true" tabindex="-1" href="#examples"><span class="icon icon-link"></span></a>Examples</h2>
<p>All demos are running in test-mode, any of Stripe’s <a href="https://stripe.com/docs/testing#cards" rel="nofollow">test card numbers</a> will work.</p>
<ul><li><a href="/examples/payment-element">Payment Element</a></li>
<li><a href="/examples/express-checkout">Express Checkout</a></li>
<li><a href="/examples/embedded-checkout">Embedded Checkout</a></li>
<li><a href="/examples/credit-card">Credit Card</a></li>
<li><a href="/examples/payment-request">Apple Pay</a></li>
<li><a href="/examples/payment-request">Google Pay</a></li>
<li><a href="/examples/payment-request">Microsoft Pay</a></li>
<li><a href="/examples/sepa">SEPA</a></li>
<li><a href="/examples/ideal">iDEAL</a></li>
<li><a href="/examples/alipay">Alipay</a></li>
<li><a href="/examples/wechat-pay">WeChat Pay</a></li>
<li><a href="/examples/konbini">Konbini</a></li>
<li><a href="/examples/klarna">Klarna</a></li>
<li><a href="/examples/sofort">Sofort</a></li>
<li><a href="/examples/afterpay-clearpay">Afterpay/Clearpay</a></li>
<li><a href="/examples/payment-method-messaging">PaymentMethodMessaging</a></li></ul>
<h2 id="sponsors"><a aria-hidden="true" tabindex="-1" href="#sponsors"><span class="icon icon-link"></span></a>Sponsors</h2>
<p>This project is made possible by:</p>
<a href="https://stripe.com"><img src="/logos/stripe.svg" width="250" alt="Stripe's logo"></a>`;
});
export {
  Page as default
};
