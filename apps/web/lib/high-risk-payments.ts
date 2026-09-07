import 'server-only';

/**
 * High-risk payment rails — the ONLY file in the codebase that may talk to
 * a payment processor. CCBill and Segpay exclusively.
 *
 * Low-risk processors (Stripe, PayPal, Braintree, …) are hard-blocked:
 *  - ESLint no-restricted-imports rejects their SDKs anywhere in apps/web.
 *  - scripts/check-brand.mjs fails CI on their integration code in apps/.
 *
 * Nothing here is live yet — Tips checkout flips on with the founding
 * launch, and this module is where it lands so the marketing surface
 * never has to change.
 */

export type HighRiskProcessor = 'ccbill' | 'segpay';

export interface CheckoutRequest {
  processor: HighRiskProcessor;
  /** Minor units (pence/cents). */
  amount: number;
  currency: 'GBP' | 'USD' | 'EUR';
  creatorHandle: string;
  kind: 'access-pass' | 'drop' | 'tip';
}

export interface CheckoutSession {
  processor: HighRiskProcessor;
  redirectUrl: string;
}

const CONFIGURED: Record<HighRiskProcessor, boolean> = {
  ccbill: Boolean(process.env.CCBILL_ACCOUNT && process.env.CCBILL_SALT),
  segpay: Boolean(process.env.SEGPAY_PACKAGE_ID && process.env.SEGPAY_API_KEY),
};

export function isProcessorConfigured(processor: HighRiskProcessor): boolean {
  return CONFIGURED[processor];
}

/**
 * Create a hosted-checkout session. Throws until a high-risk rail is
 * configured — callers must surface the honest state, never a fake flow.
 */
export async function createCheckout(request: CheckoutRequest): Promise<CheckoutSession> {
  if (!isProcessorConfigured(request.processor)) {
    throw new Error(
      `High-risk processor "${request.processor}" is not configured. ` +
        'Checkout opens with the founding launch.',
    );
  }
  // CCBill FlexForms / Segpay one-click integration lands here (W6 per plan).
  throw new Error('Checkout integration ships with the founding launch.');
}
