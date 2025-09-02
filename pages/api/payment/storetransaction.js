import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "mongodb";

export default async function handler(req, res) {
    await mongooseConnect()
     const {method} = req;
  if (method === 'POST') {
    const { transactionId, formData, cartItems, paymentMethod, amount, currency } = req.body;

    try {
      // Simulate database storage (replace with your database logic, e.g., MongoDB, Firebase)
      console.log('Storing transaction:', {
        transactionId,
        formData,
        cartItems,
        paymentMethod,
        amount,
        currency,
        timestamp: new Date().toISOString(),
      });

     const transaction = new Transaction({
        transactionId,
        personal: formData.personal,
        payment: {
          ...formData.payment,
          method: paymentMethod, // Override method to ensure consistency
        },
        cartItems,
        amount,
        currency,
      });

      // Save to database
      await transaction.save();

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Database Error:', error.message);
      return res.status(500).json({ error: 'Failed to store transaction' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}