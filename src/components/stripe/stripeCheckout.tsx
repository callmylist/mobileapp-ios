import {SUCCESSURL} from './stripeSettings';

export function stripeCheckoutRedirectHTML(stripeKey, sessionID) {
    return `
  <html>
    <body>
      <!-- Load Stripe.js on your website. -->
      <script src="https://js.stripe.com/v3"></script>
      <h1>Loading...</h1>
      <div id="error-message"></div>
      <script>
        (function () {
          var stripe = Stripe('${stripeKey}');
          window.onload = function () {
            // When the customer clicks on the button, redirect
            // them to Checkout.
            stripe.redirectToCheckout({
                sessionId: '${sessionID}',
                // successUrl: '${SUCCESSURL}',
                // cancelUrl: '${SUCCESSURL}',
            })
              .then(function (result) {
                if (result.error) {
                  // If redirectToCheckout fails due to a browser or network
                  // error, display the localized error message to your customer.
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              });
          };
        })();
      </script>
    </body>
  </html>
  `;
}
