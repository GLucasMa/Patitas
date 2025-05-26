import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const total = createOrderDto.items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0,
    );

    const order = this.orderRepository.create({
      user_id: createOrderDto.user_id,
      total,
      status: createOrderDto.status || OrderStatus.PENDIENTE,
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = createOrderDto.items.map((item) =>
      this.orderItemRepository.create({
        order: savedOrder,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }),
    );

    const savedItems = await this.orderItemRepository.save(orderItems);

    return {
      order: savedOrder,
      items: savedItems,
    };
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['items'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return { message: `Order ${id} deleted` };
  }
}
