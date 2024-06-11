import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  PostgresDBModule,
  RedisModule,
  SharedModule,
  UserEntity,
} from '@app/shared';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from '@app/shared/entities/order.entity';
import { OrdersRepository } from '@app/shared/repositories/order.repository';

@Module({
  imports: [
    PostgresDBModule,
    RedisModule,
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq(
      'PRODUCT_SERVICE',
      process.env.RABBITMQ_PRODUCT_QUEUE,
    ),
    TypeOrmModule.forFeature([UserEntity, OrderEntity]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrdersRepository,
    },
  ],
})
export class OrderModule {}
