import { Inject, Injectable } from '@nestjs/common';

import { ProductsRepository } from '@app/shared/repositories/product.repository';
import { ProductEntity } from '@app/shared/entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductDto } from './dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductsRepository,
  ) {}

  async getProduct(id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOneById(id);

    return product.toDto();
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductDto> {
    const product = new ProductEntity();

    product.name = createProduct.name;
    product.code = createProduct.code;

    const newProduct = await this.productRepository.save(product);

    return newProduct.toDto();
  }
}
