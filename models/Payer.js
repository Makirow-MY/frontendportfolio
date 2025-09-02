const mongoose = require('mongoose');

const UserFormSchema = new mongoose.Schema({
  personal: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    },
    zipCode: {
      type: String,
      default: ''
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'bank'],
      default: 'card'
    },
    cardNumber: {
      type: String,
      default: '',
      trim: true
    },
    cardName: {
      type: String,
      default: '',
      trim: true
    },
    expiry: {
      type: String,
      default: '',
      trim: true
    },
    cvv: {
      type: String,
      default: '',
      trim: true
    },
    bankAccount: {
      type: String,
      default: '',
      trim: true
    },
    bankRouting: {
      type: String,
      default: '',
      trim: true
    },
    bankName: {
      type: String,
      default: '',
      trim: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Payer = models.Payer || model('Payer', UserFormSchema, 'payers');