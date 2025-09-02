import axios from 'axios';

// Currency conversion rates (replicated from shopslug.js for backend use)
const currencyRates = {
  AE: { code: 'AED', symbol: 'د.إ', rate: 3.67 },
  AR: { code: 'ARS', symbol: '$', rate: 817.53 },
  AT: { code: 'EUR', symbol: '€', rate: 0.93 },
  AU: { code: 'AUD', symbol: 'A$', rate: 1.51 },
  BE: { code: 'EUR', symbol: '€', rate: 0.93 },
  BR: { code: 'BRL', symbol: 'R$', rate: 5.05 },
  CA: { code: 'CAD', symbol: 'CA$', rate: 1.35 },
  CH: { code: 'CHF', symbol: 'CHF', rate: 0.91 },
  CL: { code: 'CLP', symbol: 'CLP$', rate: 937.50 },
  CM: { code: 'XAF', symbol: 'FCFA', rate: 608.25 }, // Cameroon
  CN: { code: 'CNY', symbol: '¥', rate: 7.24 },
  CO: { code: 'COP', symbol: 'COL$', rate: 3912.50 },
  CZ: { code: 'CZK', symbol: 'Kč', rate: 23.45 },
  DE: { code: 'EUR', symbol: '€', rate: 0.93 },
  DK: { code: 'DKK', symbol: 'kr', rate: 6.93 },
  EG: { code: 'EGP', symbol: 'E£', rate: 30.90 },
  ES: { code: 'EUR', symbol: '€', rate: 0.93 },
  FI: { code: 'EUR', symbol: '€', rate: 0.93 },
  FR: { code: 'EUR', symbol: '€', rate: 0.93 },
  GB: { code: 'GBP', symbol: '£', rate: 0.79 },
  GH: { code: 'GHS', symbol: 'GH₵', rate: 12.50 },
  GR: { code: 'EUR', symbol: '€', rate: 0.93 },
  HK: { code: 'HKD', symbol: 'HK$', rate: 7.83 },
  HU: { code: 'HUF', symbol: 'Ft', rate: 365.25 },
  ID: { code: 'IDR', symbol: 'Rp', rate: 15887.50 },
  IE: { code: 'EUR', symbol: '€', rate: 0.93 },
  IL: { code: 'ILS', symbol: '₪', rate: 3.73 },
  IN: { code: 'INR', symbol: '₹', rate: 83.32 },
  IT: { code: 'EUR', symbol: '€', rate: 0.93 },
  JP: { code: 'JPY', symbol: '¥', rate: 151.61 },
  KE: { code: 'KES', symbol: 'KSh', rate: 157.50 },
  KR: { code: 'KRW', symbol: '₩', rate: 1351.27 },
  KW: { code: 'KWD', symbol: 'KD', rate: 0.31 },
  MX: { code: 'MXN', symbol: 'MX$', rate: 16.89 },
  MY: { code: 'MYR', symbol: 'RM', rate: 4.74 },
  NG: { code: 'NGN', symbol: '₦', rate: 1505.50 },
  NL: { code: 'EUR', symbol: '€', rate: 0.93 },
  NO: { code: 'NOK', symbol: 'kr', rate: 10.75 },
  NZ: { code: 'NZD', symbol: 'NZ$', rate: 1.66 },
  PE: { code: 'PEN', symbol: 'S/', rate: 3.72 },
  PH: { code: 'PHP', symbol: '₱', rate: 56.45 },
  PK: { code: 'PKR', symbol: '₨', rate: 278.50 },
  PL: { code: 'PLN', symbol: 'zł', rate: 4.15 },
  PT: { code: 'EUR', symbol: '€', rate: 0.93 },
  QA: { code: 'QAR', symbol: 'QR', rate: 3.64 },
  RO: { code: 'RON', symbol: 'lei', rate: 4.62 },
  RU: { code: 'RUB', symbol: '₽', rate: 91.45 },
  SA: { code: 'SAR', symbol: 'SR', rate: 3.75 },
  SE: { code: 'SEK', symbol: 'kr', rate: 10.45 },
  SG: { code: 'SGD', symbol: 'S$', rate: 1.35 },
  TH: { code: 'THB', symbol: '฿', rate: 36.55 },
  TR: { code: 'TRY', symbol: '₺', rate: 32.04 },
  TW: { code: 'TWD', symbol: 'NT$', rate: 31.45 },
  UA: { code: 'UAH', symbol: '₴', rate: 36.57 },
  US: { code: 'USD', symbol: '$', rate: 1 },
  VE: { code: 'VES', symbol: 'Bs.S', rate: 36.23 },
  VN: { code: 'VND', symbol: '₫', rate: 24785.00 },
  ZA: { code: 'ZAR', symbol: 'R', rate: 18.91 },
};

// Recipient's MoMo account details (replace with actual details)
const RECIPIENT_PHONE = '+237672470081'; // Example: Your MTN MoMo phone number in Cameroon

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, transactionId, amount, currency, phoneNumber } = body;

  const primaryKey = process.env.MOMO_PRIMARY_KEY;
  const secondaryKey = process.env.MOMO_SECONDARY_KEY;
  const apiUrl = process.env.MOMO_API_URL || 'https://sandbox.mtnapi.com';
console.log("{ action, transactionId, amount, currency, phoneNumber } ",
    { action, transactionId, amount, currency, phoneNumber, primaryKey, secondaryKey } 
)
  try {
    if (action === 'initiate') {
      // Validate inputs
      if (!transactionId || !amount || !currency || !phoneNumber) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Convert amount to XAF
      const userCurrencyRate = currencyRates[currency]?.rate || 1; // Default to USD if currency not found
      const xafRate = currencyRates['CM'].rate; // XAF rate (608.25)
      const amountInUSD = parseFloat(amount) / userCurrencyRate; // Convert to USD (base currency)
      const amountInXAF = (amountInUSD * xafRate).toFixed(2); // Convert to XAF

      // Validate phone number (basic validation, adjust as needed)
      const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
      if (!cleanedPhoneNumber || cleanedPhoneNumber.length < 8) {
        return res.status(400).json({ error: 'Invalid phone number' });
      }

      // Request to pay in XAF
      const response = await axios.post(
        `${apiUrl}/collection/v1_0/requesttopay`,
        {
          amount: amountInXAF,
          currency: 'XAF', // Always XAF for recipient
          externalId: transactionId,
          payer: {
            partyIdType: 'MSISDN',
            partyId: cleanedPhoneNumber,
          },
          payee: {
            partyIdType: 'MSISDN',
            partyId: RECIPIENT_PHONE, // Recipient's MoMo account in Cameroon
          },
          payerMessage: `Payment of ${amount} ${currency} for order (converted to ${amountInXAF} XAF)`,
          payeeNote: 'Shop purchase',
        },
        {
          headers: {
            'X-Reference-Id': transactionId,
            'Ocp-Apim-Subscription-Key': primaryKey,
            Authorization: `Bearer ${secondaryKey}`,
            'X-Target-Environment': 'sandbox',
            'Content-Type': 'application/json',
          },
        }
      );

      return res.status(200).json({ status: 'pending', transactionId, amountInXAF });
    } else if (action === 'check-status') {
      // Check transaction status
      const response = await axios.get(
        `${apiUrl}/collection/v1_0/requesttopay/${transactionId}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': primaryKey,
            Authorization: `Bearer ${secondaryKey}`,
            'X-Target-Environment': 'sandbox',
          },
        }
      );

      return res.status(200).json({
        status: response.data.status,
        transactionId,
        amountInXAF: response.data.amount, // Return XAF amount for confirmation
      });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('MoMo Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Payment processing failed', details: error.response?.data });
  }
}