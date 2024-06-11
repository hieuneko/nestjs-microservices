import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import { OrdersRepository } from '@app/shared/repositories/order.repository';
import { UserDto } from 'apps/auth/src/dtos/user.dto';
import { ProductDto } from 'apps/product/src/dtos/product.dto';
import { OrderDto } from './dtos/order.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderEntity } from '@app/shared/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepositoryInterface')
    private readonly orderRepository: OrdersRepository,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
  ) {}

  async getOrder(id: number): Promise<OrderDto> {
    const orderEntity = await this.orderRepository.findOneById(id);

    const order = orderEntity.toDto();
    order.user = await this.getUser(orderEntity.userId);
    order.product = await this.getProduct(orderEntity.productId);

    return order;
  }

  async createOrder(
    createOrder: CreateOrderDto,
    userId: number,
    productId: number,
  ): Promise<CreateOrderDto> {
    const orderEntity = new OrderEntity();

    orderEntity.userId = userId;
    orderEntity.productId = productId;
    orderEntity.amount = createOrder.amount;

    const newOrder = await this.orderRepository.save(orderEntity);

    return newOrder.toDto();
  }

  private async getUser(id: number): Promise<UserDto> {
    const ob$ = this.authService.send<UserDto>(
      {
        cmd: 'get-user',
      },
      { id },
    );

    try {
      const user = await firstValueFrom(ob$);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  private async getProduct(id: number): Promise<ProductDto> {
    const ob$ = this.productService.send<ProductDto>(
      {
        cmd: 'get-product',
      },
      { id },
    );

    try {
      const product = await firstValueFrom(ob$);
      return product;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
