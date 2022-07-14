<script>
  import '../prism-theme.css'
  import '../app.css'
  import GithubBadge from './_githubBadge.svelte'
</script>

<GithubBadge/>

<div id="container">
  <aside class="toc">
    <nav>
      <ul>
        <li>
          <a href="/#installation">Installation</a>
        </li>
        <li>
          <a href="/#docs">Docs</a>

          <ul>
            <li>
              <a href="/#set-up-stripe">Set up Stripe</a>
            </li>
            <li>
              <a href="/#creating-a-payment-intent">Creating a payment intent</a>
            </li>
            <li>
              <a href="/#accepting-payments">Accepting payments</a>

              <ul>
                <li>
                  <a href="/#payment-element">Payment element</a>
                </li>
                <li>
                  <a href="/#link-authentication">Link authentication</a>
                </li>
                <li>
                  <a href="/#credit-cards">Credit cards</a>
                </li>
                <li>
                  <a href="/#googlepay--applepay">GooglePay &amp; ApplePay</a>
                </li>
                <li>
                  <a href="/#sepa">SEPA</a>
                </li>
                <li>
                  <a href="/#ideal">iDEAL</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/#webhooks">Webhooks</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/#styling">Styling</a>
        </li>
        <li>
          <a href="/#examples">Examples</a>
        </li>
        <li>
          <a href="/#sponsors">Sponsors</a>
        </li>
      </ul>
    </nav>
  </aside>

  <main>
    <slot/>
  </main>
</div>
