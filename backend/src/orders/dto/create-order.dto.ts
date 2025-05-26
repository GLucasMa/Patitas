import {
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export enum OrderStatus {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
  CANCELADO = 'cancelado',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
}

export class CreateOrderDto {
  @IsNumber()
  user_id: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus = OrderStatus.PENDIENTE;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

/* 
Este DTO representa toda la orden. El total no se envía desde el cliente, se recomienda calcularlo 
en el backend sumando quantity * unit_price de cada item para evitar fraudes o errores. */