import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'apps/order/src/dtos/create-order.dto';
import { CreateProductDto } from 'apps/product/src/dtos/create-product.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
  ) {}

  @Get('users')
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: number) {
    return this.productService.send({ cmd: 'get-product' }, { id });
  }

  @Post('products')
  async createProduct(@Body() createProduct: CreateProductDto) {
    return this.productService.send({ cmd: 'create-product' }, createProduct);
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: number) {
    return this.orderService.send({ cmd: 'get-order' }, { id });
  }

  @Post('orders')
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Body('userId') userId: number,
    @Body('productId') productId: number,
  ) {
    return this.orderService.send(
      { cmd: 'create-order' },
      { createOrder, userId, productId },
    );
  }
}
