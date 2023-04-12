import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  const statusResponseMock = {
    send: jest.fn((y) => y),
  };

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as undefined as Response;

  const requestMock = {
    query: {},
  } as undefined as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getpayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'missing count or page query parameter',
      });
    });

    it('should return a status of 200 when query params are present', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getpayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });
});
