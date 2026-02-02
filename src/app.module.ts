import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { AgentsModule } from './agents/agents.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [AuthModule, JobsModule, AgentsModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}