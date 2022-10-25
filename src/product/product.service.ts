import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.prismaService.products.create({
      data: {
        name: createProductDto.name,
        price: +createProductDto.price,
        category: createProductDto.sup,
        quantity: +createProductDto.quantity,
        sunlight: createProductDto.sunlight ? +createProductDto.sunlight : null,
        temprature: createProductDto.temprature
          ? +createProductDto.temprature
          : null,
        water: createProductDto.water ? +createProductDto.water : null,
        informations: createProductDto.information,
      },
    });
    const upsertUser = await this.prismaService.subCategory.upsert({
      where: {
        name: createProductDto.subCategory,
      },
      update: {
        name: createProductDto.subCategory,
      },
      create: {
        name: createProductDto.subCategory,
        
      },
    });
    return { newProduct };
  }
  // ask about filters
  async findAll(query: any) {}

  async findOne(id: string) {
    const product = await this.prismaService.products.findFirst({
      where: { id: id },
    });
    return product;
  }
  //ADMIN ROLE
  // ask for data should be updated
  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const deletedProduct = await this.prismaService.products.delete({
      where: { id: id },
    });
    return { message: 'product deleted successfully', deletedProduct };
  }
}
