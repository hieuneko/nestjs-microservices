import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { OrderEntity } from '../entities/order.entity';
import { OrderRepositoryInterface } from '../interfaces/order.repository.interface';

@Injectable()
export class OrdersRepository
  extends BaseAbstractRepository<OrderEntity>
  implements OrderRepositoryInterface
{
  constructor(
    @InjectRepository(OrderEntity)
    private readonly OrdersRepository: Repository<OrderEntity>,
  ) {
    super(OrdersRepository);
  }
}
