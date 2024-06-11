import { BaseInterfaceRepository } from '@app/shared';

import { ProductEntity } from '../entities/product.entity';

export type ProductRepositoryInterface = BaseInterfaceRepository<ProductEntity>;
