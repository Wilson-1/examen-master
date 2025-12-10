export class CreateOrderDto {
  owner: string;
  product: string;
  quantity_product: number;
  total: number;
  time_exit?: Date;
}