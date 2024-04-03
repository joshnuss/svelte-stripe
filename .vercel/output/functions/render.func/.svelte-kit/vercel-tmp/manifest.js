export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".well-known/apple-developer-merchantid-domain-association","favicon.png","logos/stripe.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.d0b67713.js","app":"_app/immutable/entry/app.8913a7fd.js","imports":["_app/immutable/entry/start.d0b67713.js","_app/immutable/chunks/index.ba8c4f3a.js","_app/immutable/chunks/singletons.1cf45adc.js","_app/immutable/chunks/paths.52e6513e.js","_app/immutable/entry/app.8913a7fd.js","_app/immutable/chunks/index.ba8c4f3a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js')),
			__memo(() => import('../output/server/nodes/14.js')),
			__memo(() => import('../output/server/nodes/15.js')),
			__memo(() => import('../output/server/nodes/16.js')),
			__memo(() => import('../output/server/nodes/17.js')),
			__memo(() => import('../output/server/nodes/18.js')),
			__memo(() => import('../output/server/nodes/19.js')),
			__memo(() => import('../output/server/nodes/20.js')),
			__memo(() => import('../output/server/nodes/21.js')),
			__memo(() => import('../output/server/nodes/22.js')),
			__memo(() => import('../output/server/nodes/23.js')),
			__memo(() => import('../output/server/nodes/24.js')),
			__memo(() => import('../output/server/nodes/25.js')),
			__memo(() => import('../output/server/nodes/26.js')),
			__memo(() => import('../output/server/nodes/27.js')),
			__memo(() => import('../output/server/nodes/28.js')),
			__memo(() => import('../output/server/nodes/29.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/examples/afterpay-clearpay",
				pattern: /^\/examples\/afterpay-clearpay\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/examples/afterpay-clearpay/payment-intent",
				pattern: /^\/examples\/afterpay-clearpay\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/afterpay-clearpay/payment-intent/_server.js'))
			},
			{
				id: "/examples/afterpay-clearpay/return",
				pattern: /^\/examples\/afterpay-clearpay\/return\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/afterpay-clearpay/return/_server.js'))
			},
			{
				id: "/examples/afterpay-clearpay/thanks",
				pattern: /^\/examples\/afterpay-clearpay\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/examples/alipay",
				pattern: /^\/examples\/alipay\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/examples/alipay/payment-intent",
				pattern: /^\/examples\/alipay\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/alipay/payment-intent/_server.js'))
			},
			{
				id: "/examples/alipay/return",
				pattern: /^\/examples\/alipay\/return\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/alipay/return/_server.js'))
			},
			{
				id: "/examples/alipay/thanks",
				pattern: /^\/examples\/alipay\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/examples/credit-card",
				pattern: /^\/examples\/credit-card\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/examples/credit-card/payment-intent",
				pattern: /^\/examples\/credit-card\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/credit-card/payment-intent/_server.js'))
			},
			{
				id: "/examples/credit-card/thanks",
				pattern: /^\/examples\/credit-card\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/examples/credit-card/webhooks",
				pattern: /^\/examples\/credit-card\/webhooks\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/credit-card/webhooks/_server.js'))
			},
			{
				id: "/examples/embedded-checkout",
				pattern: /^\/examples\/embedded-checkout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/examples/embedded-checkout/thanks",
				pattern: /^\/examples\/embedded-checkout\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/examples/express-checkout",
				pattern: /^\/examples\/express-checkout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/examples/express-checkout/payment-intent",
				pattern: /^\/examples\/express-checkout\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/express-checkout/payment-intent/_server.js'))
			},
			{
				id: "/examples/express-checkout/thanks",
				pattern: /^\/examples\/express-checkout\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/examples/ideal",
				pattern: /^\/examples\/ideal\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/examples/ideal/payment-intent",
				pattern: /^\/examples\/ideal\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/ideal/payment-intent/_server.js'))
			},
			{
				id: "/examples/ideal/return",
				pattern: /^\/examples\/ideal\/return\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/ideal/return/_server.js'))
			},
			{
				id: "/examples/ideal/thanks",
				pattern: /^\/examples\/ideal\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/examples/klarna",
				pattern: /^\/examples\/klarna\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/examples/klarna/payment-intent",
				pattern: /^\/examples\/klarna\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/klarna/payment-intent/_server.js'))
			},
			{
				id: "/examples/klarna/return",
				pattern: /^\/examples\/klarna\/return\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/klarna/return/_server.js'))
			},
			{
				id: "/examples/klarna/thanks",
				pattern: /^\/examples\/klarna\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/examples/konbini",
				pattern: /^\/examples\/konbini\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/examples/konbini/next-steps",
				pattern: /^\/examples\/konbini\/next-steps\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/examples/konbini/payment-intent",
				pattern: /^\/examples\/konbini\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/konbini/payment-intent/_server.js'))
			},
			{
				id: "/examples/payment-element",
				pattern: /^\/examples\/payment-element\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/examples/payment-element/payment-intent",
				pattern: /^\/examples\/payment-element\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/payment-element/payment-intent/_server.js'))
			},
			{
				id: "/examples/payment-element/thanks",
				pattern: /^\/examples\/payment-element\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/examples/payment-method-messaging",
				pattern: /^\/examples\/payment-method-messaging\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/examples/payment-request",
				pattern: /^\/examples\/payment-request\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/examples/payment-request/payment-intent",
				pattern: /^\/examples\/payment-request\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/payment-request/payment-intent/_server.js'))
			},
			{
				id: "/examples/payment-request/thanks",
				pattern: /^\/examples\/payment-request\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/examples/sepa",
				pattern: /^\/examples\/sepa\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/examples/sepa/payment-intent",
				pattern: /^\/examples\/sepa\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/sepa/payment-intent/_server.js'))
			},
			{
				id: "/examples/sepa/thanks",
				pattern: /^\/examples\/sepa\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/examples/sofort",
				pattern: /^\/examples\/sofort\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/examples/sofort/payment-intent",
				pattern: /^\/examples\/sofort\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/sofort/payment-intent/_server.js'))
			},
			{
				id: "/examples/sofort/return",
				pattern: /^\/examples\/sofort\/return\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/sofort/return/_server.js'))
			},
			{
				id: "/examples/sofort/thanks",
				pattern: /^\/examples\/sofort\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/examples/wechat-pay",
				pattern: /^\/examples\/wechat-pay\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/examples/wechat-pay/payment-intent",
				pattern: /^\/examples\/wechat-pay\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/examples/wechat-pay/payment-intent/_server.js'))
			},
			{
				id: "/examples/wechat-pay/thanks",
				pattern: /^\/examples\/wechat-pay\/thanks\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
