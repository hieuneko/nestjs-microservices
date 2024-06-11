import { Controller, Inject } from '@nestjs/common';

import { OrderService } from './order.service';
import { SharedService } from '@app/shared';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller()
export class OrderController {
  constructor(
    @Inject('OrderServiceInterface')
    private readonly orderService: OrderService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-order' })
  async getProduct(
    @Ctx() context: RmqContext,
    @Payload() order: { id: number },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.orderService.getOrder(order.id);
  }

  @MessagePattern({ cmd: 'create-order' })
  async createOrder(
    @Ctx() context: RmqContext,
    @Payload()
    data: { createOrder: CreateOrderDto; userId: number; productId: number },
  ) {
    const { createOrder, userId, productId } = data;
    this.sharedService.acknowledgeMessage(context);
    return this.orderService.createOrder(createOrder, userId, productId);
  }
}
