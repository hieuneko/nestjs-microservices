import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderDto } from '../dtos/order.dto';

export interface OrderServiceInterface {
  getOrder(): Promise<OrderDto>;
  createOrder(createOrder: CreateOrderDto): Promise<OrderDto>;
}
