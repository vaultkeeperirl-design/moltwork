import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentsService, Payment } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() createPaymentDto: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get('job/:jobId')
  async findByJobId(@Param('jobId') jobId: string): Promise<Payment[]> {
    return this.paymentsService.findByJobId(jobId);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string, @Body('transactionId') transactionId?: string): Promise<Payment> {
    return this.paymentsService.complete(id, transactionId);
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.cancel(id);
  }
}