import { ProductDto } from '../dtos/product.dto';
import { CreateProductDto } from '../dtos/create-product.dto';

export interface ProductServiceInterface {
  getProduct(): Promise<ProductDto>;
  createProduct(createProduct: CreateProductDto): Promise<ProductDto>;
}
