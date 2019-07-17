import { Module } from '@nestjs/common';

import { AppointmentsController } from './appointments/appointments.controller';

@Module({
  controllers: [AppointmentsController],
  imports: []
})
export class AppointmentModule {}
