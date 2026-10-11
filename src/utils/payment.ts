// UPI Payment Handoff Utility
// The UPI ID is configured here but never displayed in the UI.
// In production, this should come from server-side configuration.

const UPI_CONFIG = {
  // Payee VPA - stored here, not shown in UI
  vpa: 'raghavkashyap2229@oksbi',
  payeeName: 'TOM Project',
  currency: 'INR',
  note: 'TOM donation support',
};

export interface UpPaymentParams {
  amount: number;
  transactionNote?: string;
}

/**
 * Build a properly URL-encoded UPI deep link.
 * UPI specification: upi://pay?pa=<vpa>&pn=<name>&am=<amount>&cu=<currency>&tn=<note>
 * Note: Values in the query string must be URL-encoded per the UPI spec.
 */
export function buildUpiDeepLink(params: UpPaymentParams): string {
  const { amount, transactionNote } = params;

  if (!amount || amount <= 0) {
    throw new Error('Invalid amount');
  }

  // UPI deep link format - parameters must be URL-encoded
  const searchParams = new URLSearchParams();
  searchParams.set('pa', UPI_CONFIG.vpa);
  searchParams.set('pn', UPI_CONFIG.payeeName);
  searchParams.set('am', amount.toFixed(2));
  searchParams.set('cu', UPI_CONFIG.currency);
  searchParams.set('tn', transactionNote || UPI_CONFIG.note);

  return `upi://pay?${searchParams.toString()}`;
}

/**
 * Attempt to launch a UPI payment app.
 * Returns true if the navigation was attempted, false if blocked.
 */
export function launchUpiPayment(params: UpPaymentParams): { success: boolean; link: string; method: string } {
  const link = buildUpiDeepLink(params);

  // Detect if we're on mobile (where UPI apps are likely installed)
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // On mobile, try direct navigation to UPI deep link
    // This will trigger the OS to show a chooser for UPI apps
    try {
      window.location.href = link;
      return { success: true, link, method: 'direct' };
    } catch {
      return { success: false, link, method: 'direct-failed' };
    }
  } else {
    // On desktop, UPI apps are typically not available
    // Provide the link for manual use or show QR code
    return { success: false, link, method: 'desktop' };
  }
}

/**
 * Generate alternative payment methods for desktop users
 */
export function getDesktopPaymentOptions(amount: number): { label: string; url: string }[] {
  const link = buildUpiDeepLink({ amount });
  return [
    { label: 'Google Pay', url: `tez://upi/pay?${new URLSearchParams({ pa: UPI_CONFIG.vpa, pn: UPI_CONFIG.payeeName, am: amount.toFixed(2), cu: 'INR', tn: UPI_CONFIG.note }).toString()}` },
    { label: 'PhonePe', url: `phonepe://pay?${new URLSearchParams({ pa: UPI_CONFIG.vpa, pn: UPI_CONFIG.payeeName, am: amount.toFixed(2), cu: 'INR', tn: UPI_CONFIG.note }).toString()}` },
    { label: 'Paytm', url: `paytmmp://pay?${new URLSearchParams({ pa: UPI_CONFIG.vpa, pn: UPI_CONFIG.payeeName, am: amount.toFixed(2), cu: 'INR', tn: UPI_CONFIG.note }).toString()}` },
    { label: 'Copy UPI Link', url: link },
  ];
}

/**
 * WhatsApp link builder
 * Uses the international format with country code (91 for India)
 */
export function buildWhatsAppLink(message: string): string {
  // International number: +91 9693747328 → digits only: 919693747328
  const phoneNumber = '919693747328';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
