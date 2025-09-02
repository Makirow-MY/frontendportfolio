import axios from 'axios';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { action, amount, currency, transactionId } = body;
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET; // Add to .env
    const paypalApi = 'https://api-m.sandbox.paypal.com';

    try {
      // Get PayPal access token
      const authResponse = await axios.post(
        `${paypalApi}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          auth: {
            username: clientId,
            password: clientSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const accessToken = authResponse.data.access_token;

      if (action === 'create') {
        // Create PayPal order
        const response = await axios.post(
          `${paypalApi}/v2/checkout/orders`,
          {
            intent: 'CAPTURE',
            purchase_units: [
              {
                reference_id: transactionId,
                amount: {
                  currency_code: currency,
                  value: amount.toString(),
                },
              },
            ],
            application_context: {
              return_url: `${req.headers.origin}/shopslug`,
              cancel_url: `${req.headers.origin}/shopslug`,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        return res.status(200).json({
          orderId: response.data.id,
          approveUrl: response.data.links.find(link => link.rel === 'approve').href,
        });
      } else if (action === 'capture') {
        // Capture PayPal order
        const response = await axios.post(
          `${paypalApi}/v2/checkout/orders/${transactionId}/capture`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        return res.status(200).json({
          status: response.data.status,
          transactionId: response.data.purchase_units[0].reference_id,
        });
      }
    } catch (error) {
      console.error('PayPal Error:', error.response?.data || error.message);
      return res.status(500).json({ error: 'Payment processing failed' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}