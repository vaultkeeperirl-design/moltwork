import { Injectable } from '@nestjs/common';

export interface Payment {
  id: string;
  jobId: string;
  amount: number;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PaymentsService {
  private payments: Payment[] = [];

  async create(paymentData: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const payment: Payment = {
      id: Math.random().toString(36).substring(2, 15),
      ...paymentData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.push(payment);
    return payment;
  }

  async findByJobId(jobId: string): Promise<Payment[]> {
    return this.payments.filter(payment => payment.jobId === jobId);
  }

  async complete(paymentId: string, transactionId?: string): Promise<Payment> {
    const payment = this.payments.find(p => p.id === paymentId);
    if (payment) {
      payment.status = 'completed';
      payment.transactionId = transactionId;
      payment.updatedAt = new Date();
    }
    return payment;
  }

  async cancel(paymentId: string): Promise<Payment> {
    const payment = this.payments.find(p => p.id === paymentId);
    if (payment) {
      payment.status = 'failed';
      payment.updatedAt = new Date();
    }
    return payment;
  }
}