import { Controller, Get, Post, Body, Put, Delete, Res } from '@nestjs/common';

import { FastifyReply } from 'fastify';

@Controller('api/appointments')
export class AppointmentsController {
  private static hasBody(appointment: Object): boolean {
    return Object.keys(appointment).length > 0;
  }

  @Get()
  getAppointment(@Res() res: FastifyReply<Response>): object {
    return res.send({
      "Client": {
        "appointments": [
          {
            "appointmentId": new Date().toUTCString(),
          },
        ],
      },
    });
  }

  @Post()
  createAppointment(
    @Body() appointment: Body,
    @Res() res: FastifyReply<Response>,
  ) {
    if (AppointmentsController.hasBody(appointment)) {
      appointment['appointmentDate'] = new Date().toISOString();
      appointment[
        'appointmentId'
      ] = `AppId.${appointment['department']}.${appointment['appointmentDate']}`;

      return res.send({
        success: true,
        message: 'appointment created!',
        appointment: appointment,
      });
    }

    return res.status(404).send({
      success: false,
      message: 'no appointment data!',
      appointment: undefined,
    });
  }

  @Put()
  updateAppointment(
    @Body() appointment: Body,
    @Res() res: FastifyReply<Response>,
  ): object {
    if (AppointmentsController.hasBody(appointment)) {
      appointment['isUpdated'] = true;

      return res.send({
        success: true,
        message: 'appointment updated!',
        appointment,
      });
    }

    return res.status(404).send({
      success: false,
      message: 'no appointment data!',
      appointment: undefined,
    });
  }

  @Delete()
  deleteAppointment(
    @Body() appointment: Body,
    @Res() res: FastifyReply<Response>,
  ): object {
    if (AppointmentsController.hasBody(appointment)) {
      appointment['isDeleted'] = true;

      return res.send({
        success: true,
        message: 'appointment deleted!',
        appointment,
      });
    }

    return res.status(404).send({
      success: false,
      message: 'no appointment data!',
      appointment: undefined,
    });
  }
}
