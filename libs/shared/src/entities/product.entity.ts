import { ProductDto } from 'apps/product/src/dtos/product.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  toDto(): ProductDto {
    const productDto = new ProductDto();

    productDto.id = this.id;
    productDto.name = this.name;
    productDto.code = this.code;

    return productDto;
  }
}
