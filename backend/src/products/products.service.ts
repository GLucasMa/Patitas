import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(queryParams: QueryProductsDto): Promise<[Product[], number]> {
    const { category, search, page = 1, limit = 10 } = queryParams;
    
    const query = this.productsRepository.createQueryBuilder('product');
    
    // Apply category filter
    if (category) {
      query.andWhere('product.category = :category', { category });
    }
    
    // Apply search filter
    if (search) {
      query.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    
    // Apply pagination
    query.skip((page - 1) * limit);
    query.take(limit);
    
    // Order by newest first
    query.orderBy('product.createdAt', 'DESC');
    
    return query.getManyAndCount();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    const updatedProduct = this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
  
  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    
    // Ensure stock doesn't go below 0
    if (product.stock + quantity < 0) {
      throw new Error(`Not enough stock for product ${product.name}`);
    }
    
    product.stock += quantity;
    return this.productsRepository.save(product);
  }
}