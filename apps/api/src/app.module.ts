import { Module } from '@nestjs/common';

import { SharedModule } from '@app/shared';

import { AppController } from './app.controller';

@Module({
  imports: [
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.registerRmq(
      'PRODUCT_SERVICE',
      process.env.RABBITMQ_PRODUCT_QUEUE,
    ),
    SharedModule.registerRmq('ORDER_SERVICE', process.env.RABBITMQ_ORDER_QUEUE),
  ],
  controllers: [AppController],
})
export class AppModule {}
