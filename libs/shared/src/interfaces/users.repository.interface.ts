import { BaseInterfaceRepository } from '@app/shared';

import { UserEntity } from '../entities/user.entity';

export type UserRepositoryInterface = BaseInterfaceRepository<UserEntity>;
