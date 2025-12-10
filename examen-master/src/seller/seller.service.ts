import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SellerService {
  create(createSellerDto: CreateSellerDto) {
    return this.prisma.seller.create({data:createSellerDto});
  }

  findAll() {
    return this.prisma.seller.findMany();
  }

  findOne(id: number) {
    return this.prisma.seller.findUnique({where:{id}});
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return this.prisma.seller.update({where:{id},data:updateSellerDto});
  }

  remove(id: number) {
    return this.prisma.seller.delete({where:{id}});
  }
}
