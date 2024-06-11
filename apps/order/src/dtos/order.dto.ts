import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'apps/auth/src/dtos/user.dto';
import { ProductDto } from 'apps/product/src/dtos/product.dto';

export class OrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  product: ProductDto;

  @ApiProperty()
  amount: number;
}
