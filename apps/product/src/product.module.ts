import { Module } from '@nestjs/common';

import { RedisModule, PostgresDBModule, UserEntity } from '@app/shared';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@app/shared/entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsRepository } from '@app/shared/repositories/product.repository';

@Module({
  imports: [
    PostgresDBModule,
    RedisModule,
    TypeOrmModule.forFeature([UserEntity, ProductEntity]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductsRepository,
    },
  ],
})
export class ProductModule {}
