import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({data})
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({where:{name}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({where:{id},data:updateProductDto});
  }

  remove(id: number) {
    return this.prisma.product.delete({where:{id}});
  }
}
