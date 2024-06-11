import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { SharedService } from '@app/shared';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller()
export class ProductController {
  constructor(
    @Inject('ProductServiceInterface')
    private readonly productService: ProductService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-product' })
  async getProduct(
    @Ctx() context: RmqContext,
    @Payload() product: { id: number },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.productService.getProduct(product.id);
  }

  @MessagePattern({ cmd: 'create-product' })
  async createProduct(
    @Ctx() context: RmqContext,
    @Payload() createProduct: CreateProductDto,
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.productService.createProduct(createProduct);
  }
}
