// Placeholder Customer Model (replace with actual ORM model like Mongoose or Sequelize later)

export interface Customer {
  id: string; // Unique identifier
  companyId: string; // ID of the company this customer belongs to
  name: string;
  contact: string;
  address: string;
  department: string;
  city: string;
  phone: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

// In a real application, you would define your database model here
// using an ORM like Mongoose (for MongoDB) or Sequelize (for SQL databases).

/*
Example using Mongoose:

import { Schema, model, Document, Types } from 'mongoose';

export interface ICustomer extends Document {
    companyId: Types.ObjectId;
    name: string;
    contact: string;
    address: string;
    department: string;
    city: string;
    phone: string;
    contactEmail: string;
    createdAt: Date;
    updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>({
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Update updatedAt field on save
customerSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export const CustomerModel = model<ICustomer>('Customer', customerSchema);

*/
