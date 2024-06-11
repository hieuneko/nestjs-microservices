import { BaseInterfaceRepository } from '@app/shared';

import { OrderEntity } from '../entities/order.entity';

export type OrderRepositoryInterface = BaseInterfaceRepository<OrderEntity>;
