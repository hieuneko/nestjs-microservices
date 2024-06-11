import { OrderDto } from 'apps/order/src/dtos/order.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  amount: number;

  toDto(): OrderDto {
    const orderDto = new OrderDto();

    orderDto.id = this.id;
    orderDto.userId = this.userId;
    orderDto.productId = this.productId;
    orderDto.amount = this.amount;

    return orderDto;
  }
}
