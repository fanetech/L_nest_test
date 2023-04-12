import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Get()
  getpayments(@Req() request: Request, @Res() response: Response) {
    const { page, count } = request.query;
    if (!page || !count) {
      response
        .status(400)
        .send({ msg: 'missing count or page query parameter' });
    } else {
      response.send(200);
    }
  }
}
