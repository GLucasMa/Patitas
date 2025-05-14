import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private productsService: ProductsService,
    private dataSource: DataSource,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    // Start a transaction to ensure all operations succeed or fail together
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // Create the order
      const order = new Order();
      order.userId = userId;
      order.total = 0;
      order.status = OrderStatus.PENDING;
      
      const savedOrder = await queryRunner.manager.save(order);
      
      // Create order items and calculate total
      let orderTotal = 0;
      const orderItems: OrderItem[] = [];
      
      for (const item of createOrderDto.items) {
        const product = await this.productsService.findOne(item.productId);
        
        // Check if there's enough stock
        if (product.stock < item.quantity) {
          throw new BadRequestException(`Not enough stock for product: ${product.name}`);
        }
        
        // Update product stock
        await this.productsService.updateStock(product.id, -item.quantity);
        
        const orderItem = new OrderItem();
        orderItem.orderId = savedOrder.id;
        orderItem.productId = product.id;
        orderItem.quantity = item.quantity;
        orderItem.price = product.price;
        
        orderItems.push(orderItem);
        orderTotal += product.price * item.quantity;
      }
      
      // Save order items
      await queryRunner.manager.save(OrderItem, orderItems);
      
      // Update order total
      savedOrder.total = orderTotal;
      await queryRunner.manager.save(Order, savedOrder);
      
      // Commit transaction
      await queryRunner.commitTransaction();
      
      // Return the order with items
      return this.findOne(savedOrder.id);
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }

  async updateStatus(id: number, updateStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.findOne(id);
    
    order.status = updateStatusDto.status;
    
    return this.ordersRepository.save(order);
  }
}